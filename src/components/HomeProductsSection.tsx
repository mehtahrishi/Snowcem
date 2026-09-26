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
    <section className="w-full overflow-hidden bg-canvas py-10 sm:py-14 md:py-18">
      <div className="w-full">
        <div className="mx-auto mb-8 max-w-2xl space-y-2.5 px-4 text-center sm:mb-12 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Explore Our Products
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed px-2">
            Explore Snowcem&apos;s complete range of trusted formulations, engineered for lasting protection, rich colour, and beautiful Indian homes.
          </p>
        </div>

        <div className="mb-6 sm:mb-10 flex justify-center">
          <div
            className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-slate-200/60 border border-slate-300/60 max-w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap snap-x"
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
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 font-heading shrink-0 snap-start ${
                    isActive
                      ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
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
                className="product-card group relative flex h-[21rem] w-[17rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-slate-300/60 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer sm:h-[24rem] sm:w-[20rem]"
              >
                <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-white p-5 sm:p-6">
                  {prod.bgImage && (
                    <Image
                      src={prod.bgImage}
                      alt=""
                      fill
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  )}

                  <span className="absolute left-4 top-4 z-20 max-w-[70%] truncate bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-700 shadow-sm">
                    {prod.categoryName}
                  </span>

                  {prod.warranty && (
                    <span className="absolute right-4 top-4 z-20 rounded-full border border-slate-200 bg-white/95 px-2 py-0.5 text-[9px] font-bold text-slate-700 shadow-sm">
                      {prod.warranty}
                    </span>
                  )}

                  {prod.image ? (
                    <div className={`relative z-10 h-44 w-44 transition-all duration-500 ease-out group-hover:scale-105 sm:h-52 sm:w-52 ${prod.bgImage ? "group-hover:opacity-0" : ""}`}>
                      <Image src={prod.image} alt={`${prod.name} - ${prod.categoryName}`} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center text-slate-400">
                      <Sparkles className="mb-1 h-6 w-6 text-slate-500 opacity-40" />
                      <span className="text-[10px] font-semibold">Snowcem Quality</span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 transition-colors duration-300 group-hover:bg-white/95">
                  <span className="truncate pr-2 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors duration-300 group-hover:text-[#5c249c]">
                    {prod.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-900 stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 pt-8 text-center sm:pt-10">
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
