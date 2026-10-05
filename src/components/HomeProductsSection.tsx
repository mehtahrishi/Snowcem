"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA, ProductData } from "@/data/productsData";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";

export default function HomeProductsSection() {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const filteredProducts = useMemo(
    () =>
      selectedCategorySlug === ""
        ? PRODUCTS_DATA
        : PRODUCTS_DATA.filter(
            (prod) => prod.categorySlug === selectedCategorySlug
          ),
    [selectedCategorySlug]
  );

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategorySlug((currentSlug) =>
      currentSlug === categorySlug ? "" : categorySlug
    );
    window.requestAnimationFrame(() => {
      carouselRef.current?.scrollTo({ left: 0 });
    });
  };

  return (
    <section className="w-full overflow-hidden bg-canvas-soft bg-canvas-grid pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 relative">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Explore Our Products
          </h2>
          <p className="text-[#5A5148] text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Explore Snowcem&apos;s complete range of trusted formulations, engineered for lasting protection, rich colour, and beautiful Indian homes.
          </p>
        </div>

        <div className="mb-6 sm:mb-8 flex justify-center">
          <div
            className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#FAF7F2]/80 backdrop-blur-md border border-[#D6C5B3] shadow-sm max-w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap snap-x"
            role="tablist"
            aria-label="Product categories"
          >
            {CATEGORIES_DATA.map((category) => ({
              id: category.slug,
              label: category.name,
            })).map((tab) => {
              const isActive = selectedCategorySlug === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 font-heading shrink-0 snap-start cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-md scale-[1.02]"
                      : "text-[#5A5148] hover:text-[#1E1F24] hover:bg-black/5"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={carouselRef} className="w-full overflow-x-auto overscroll-x-contain px-4 pb-4 snap-x snap-mandatory no-scrollbar sm:px-8 lg:px-12">
          <div className="flex w-max gap-4 sm:gap-5">
            {filteredProducts.map((prod: ProductData) => (
              <Link
                key={prod.id}
                href={`/products/${prod.categorySlug}/${prod.slug}`}
                title={prod.name}
                className="product-card group relative flex h-[21rem] w-[17rem] shrink-0 snap-start flex-col rounded-2xl border border-[#D6C5B3] bg-[#FAF7F2] shadow-sm hover:shadow-xl hover:shadow-[#BBA085]/20 hover:border-[#DF3F6F]/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer sm:h-[24rem] sm:w-[20rem] overflow-hidden isolate [transform:translateZ(0)]"
              >
                <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#E5DBCE]/60 p-5 sm:p-6 rounded-t-2xl">
                  {prod.bgImage && (
                    <Image
                      src={prod.bgImage}
                      alt=""
                      fill
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-2xl"
                      aria-hidden="true"
                    />
                  )}

                  <span className="absolute left-4 top-4 z-20 max-w-[70%] truncate bg-[#FAF7F2]/95 border border-[#D6C5B3] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#2D2824] shadow-xs rounded-sm">
                    {prod.categoryName}
                  </span>

                  {prod.warranty && (
                    <span className="absolute right-4 top-4 z-20 rounded-full border border-[#D6C5B3] bg-[#FAF7F2]/95 px-2 py-0.5 text-[9px] font-bold text-[#2D2824] shadow-xs">
                      {prod.warranty}
                    </span>
                  )}

                  {prod.image ? (
                    <div className={`relative z-10 h-44 w-44 transition-all duration-500 ease-out group-hover:scale-105 sm:h-52 sm:w-52 ${prod.bgImage ? "group-hover:opacity-0" : ""}`}>
                      <Image src={prod.image} alt={`${prod.name} - ${prod.categoryName}`} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center text-slate-400">
                      <Sparkles className="mb-1 h-6 w-6 text-slate-400 opacity-60" />
                      <span className="text-[10px] font-semibold">Snowcem Quality</span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-[#D6C5B3] bg-[#FAF7F2] px-4 py-3 transition-colors duration-300 group-hover:bg-[#EFE8DF] rounded-b-2xl">
                  <span className="truncate pr-2 text-xs font-bold uppercase tracking-wider text-[#1E1F24] transition-colors duration-300 group-hover:text-[#DF3F6F]">
                    {prod.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#2D2824] stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#DF3F6F]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4 text-center sm:pt-6">
          <Link
            href="/collection/paints"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] px-6 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg sm:px-7 sm:py-3 sm:text-sm"
          >
            <span>Explore Entire Snowcem Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
