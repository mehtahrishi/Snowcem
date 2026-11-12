"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { DbCategory, DbProduct, fetchCategories, fetchProducts } from "@/lib/catalogClient";
import { ChevronRight, PaintBucket } from "lucide-react";

interface ProductsMegaMenuProps {
  onClose?: () => void;
}

export default function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("exterior-emulsion-paints");

  useEffect(() => {
    fetchCategories().then((cats) => {
      setCategories(cats);
      if (cats.length > 0) {
        setSelectedSlug((prev) => (cats.some((c) => c.slug === prev) ? prev : cats[0].slug));
      }
    });
    fetchProducts().then(setProducts);
  }, []);

  const allCategoryProducts = useMemo(() => {
    return products.filter((p) => p.categorySlug === selectedSlug);
  }, [products, selectedSlug]);

  // Group products by range
  const groupedRanges = useMemo(() => {
    const map = new Map<string, DbProduct[]>();
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
      className="w-full bg-[#061C18] border-b border-[#D8C7B3]/25 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column: Category Navigation Tabs (2.5 cols) */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2.5 xl:col-span-2 border-r border-[#D8C7B3]/20 pr-3 space-y-1">
            {categories.map((cat) => {
              const isSelected = cat.slug === selectedSlug;
              const count = products.filter((p) => p.categorySlug === cat.slug).length;

              return (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  onMouseEnter={() => setSelectedSlug(cat.slug)}
                  onClick={onClose}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-left text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-sm font-bold font-heading"
                      : "text-[#C2B69D] hover:bg-white/5 hover:text-[#EDE4D8]"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <div className="flex items-center space-x-1 shrink-0 ml-1">
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                        isSelected ? "bg-[#061C18]/20 text-[#061C18] font-bold" : "text-[#C2B69D] bg-[#0A2621] border border-[#D8C7B3]/20"
                      }`}
                    >
                      {count}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-[#061C18] translate-x-0.5" : "text-[#C2B69D]"
                      }`}
                    />
                  </div>
                </Link>
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
                  <div className="pb-1 border-b border-[#D8C7B3]/20">
                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] font-label">
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
                        className="group relative flex items-center space-x-3 p-2.5 rounded-xl overflow-hidden transition-all duration-150 cursor-pointer"
                      >
                        {/* Product Packshot Thumbnail */}
                        <div className="relative z-10 w-12 h-12 rounded-lg p-1 flex items-center justify-center shrink-0">
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                              loading="lazy"
                            />
                          ) : (
                            <PaintBucket className="w-5 h-5 text-[#C2B69D]" />
                          )}
                        </div>

                        {/* Product Name */}
                        <div className="relative z-10 min-w-0 flex-1 flex flex-col justify-center">
                          <span className="text-xs font-bold text-[#EDE4D8] group-hover:text-[#D4AF37] transition-colors leading-tight font-heading">
                            {prod.name}
                          </span>
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
