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
      className="w-full bg-white border-b border-gray-200 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-4">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column: Category Navigation Tabs (2.5 cols) */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2.5 xl:col-span-2 border-r border-gray-100 pr-3 space-y-1">
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
                      ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-sm font-bold"
                      : "text-gray-700 hover:bg-pink-50/60 hover:text-[#e91e63]"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <div className="flex items-center space-x-1 shrink-0 ml-1">
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                        isSelected ? "bg-white/20 text-white" : "text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-amber-300 translate-x-0.5" : "text-gray-300"
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
              className={`grid gap-5 ${
                groupedRanges.length >= 4
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
                  {/* Range Header Label (Clean, no dots) */}
                  <div className="pb-1 border-b border-gray-100">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                      {rangeTitle}
                    </h5>
                  </div>

                  {/* Range Products List with Full Visible Names */}
                  <div className="space-y-2">
                    {products.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products/${prod.categorySlug}/${prod.slug}`}
                        onClick={onClose}
                        className="group flex items-center space-x-3 p-2.5 rounded-xl border border-gray-100/80 bg-gray-50/40 hover:bg-white hover:border-pink-200 hover:shadow-xs transition-all duration-150"
                      >
                        {/* Larger Product Packshot Thumbnail */}
                        <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-pink-200">
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                              loading="lazy"
                            />
                          ) : (
                            <PaintBucket className="w-5 h-5 text-gray-300" />
                          )}
                        </div>

                        {/* Product Name & Warranty (Full name visible with plenty of room) */}
                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                          <span className="text-xs font-bold text-gray-900 group-hover:text-[#e91e63] transition-colors leading-tight">
                            {prod.name}
                          </span>
                          {prod.warranty && (
                            <div className="mt-1 flex items-center">
                              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
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
