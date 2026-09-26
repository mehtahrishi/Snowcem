"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA, ProductData } from "@/data/productsData";
import { ChevronRight, PaintBucket, ShieldCheck } from "lucide-react";

interface ProductsMegaMenuProps {
  onClose?: () => void;
}

export default function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    CATEGORIES_DATA[0]?.slug || "exterior-emulsion-paints"
  );

  const allCategoryProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.categorySlug === selectedSlug);
  }, [selectedSlug]);

  // Group products by range
  const groupedRanges = useMemo(() => {
    const map = new Map<string, ProductData[]>();
    allCategoryProducts.forEach((prod) => {
      const rangeName = prod.range || "Standard Range";
      if (!map.has(rangeName)) {
        map.set(rangeName, []);
      }
      map.get(rangeName)!.push(prod);
    });
    return Array.from(map.entries());
  }, [allCategoryProducts]);

  return (
    <div
      className="w-full bg-canvas border-b border-[#cbb3a5]/70 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column: Category Navigation Tabs (2.5 cols) */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2.5 xl:col-span-2 border-r border-[#cbb3a5]/50 pr-3 space-y-1">
            {CATEGORIES_DATA.map((cat) => {
              const isSelected = cat.slug === selectedSlug;
              const count = PRODUCTS_DATA.filter((p) => p.categorySlug === cat.slug).length;

              return (
                <button
                  key={cat.id}
                  onMouseEnter={() => setSelectedSlug(cat.slug)}
                  onClick={() => setSelectedSlug(cat.slug)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-left text-xs font-semibold transition-all duration-150 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#5B5BAB] to-[#D83E78] text-white shadow-sm font-bold font-heading"
                      : "text-slate-700 hover:bg-black/5 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <div className="flex items-center space-x-1 shrink-0 ml-1">
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                        isSelected ? "bg-white/20 text-white" : "text-slate-600 bg-black/5"
                      }`}
                    >
                      {count}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-white translate-x-0.5" : "text-slate-400"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Range-Wise Products Grid (9.5 cols) */}
          <div className="col-span-12 md:col-span-9 lg:col-span-9.5 xl:col-span-10 pl-2">
            <div
              className={`grid gap-3.5 xl:gap-4 ${
                groupedRanges.length >= 5
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                  : groupedRanges.length === 4
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : groupedRanges.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : groupedRanges.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {groupedRanges.map(([rangeTitle, products], rIdx) => (
                <div key={rIdx} className="space-y-2">
                  {/* Range Header Label */}
                  <div className="pb-1 border-b border-[#cbb3a5]/50">
                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-slate-700 font-label">
                      {rangeTitle}
                    </h5>
                  </div>

                  {/* Range Products List */}
                  <div className="space-y-2">
                    {products.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products/${prod.categorySlug}/${prod.slug}`}
                        onClick={onClose}
                        className="group flex items-center space-x-3 p-2.5 rounded-xl border border-stone-300/60 bg-white/70 hover:bg-white hover:border-[#D83E78]/50 shadow-xs transition-all duration-150"
                      >
                        {/* Product Packshot Thumbnail */}
                        <div className="w-12 h-12 rounded-lg bg-white/80 border border-stone-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#D83E78]">
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                              loading="lazy"
                            />
                          ) : (
                            <PaintBucket className="w-5 h-5 text-slate-400" />
                          )}
                        </div>

                        {/* Product Name & Warranty */}
                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                          <span className="text-xs font-bold text-slate-800 group-hover:text-[#5B5BAB] transition-colors leading-tight font-heading">
                            {prod.name}
                          </span>
                          {prod.warranty && (
                            <div className="mt-1 flex items-center">
                              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-emerald-200">
                                <ShieldCheck className="w-2.5 h-2.5 shrink-0" />
                                <span>{prod.warranty}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
