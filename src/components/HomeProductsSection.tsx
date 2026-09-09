"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_DATA, ProductData } from "@/data/productsData";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";

export default function HomeProductsSection() {
  // Exactly 9 iconic products, each selected from a distinct collection range
  const nineCollectionProducts = useMemo(() => {
    return CATEGORIES_DATA.slice(0, 9)
      .map((cat) => {
        return PRODUCTS_DATA.find((p) => p.categorySlug === cat.slug);
      })
      .filter(Boolean) as ProductData[];
  }, []);

  return (
    <section className="py-10 sm:py-14 md:py-18 bg-white overflow-hidden w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO & Context-Rich Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Explore Our Products
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed px-2">
            9 iconic formulations across 9 distinct architectural collections — engineered for extreme weather protection, UV resistance, high-gloss elegance, and 60+ years of proven legacy across India.
          </p>
        </div>

        {/* 9-PRODUCT ARCHITECTURAL TABLE GRID (Compact 3x3 Table Layout) */}
        <div className="w-full border-t border-l border-neutral-300 bg-neutral-300 shadow-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3">
            {nineCollectionProducts.map((prod: ProductData, idx: number) => {
              const isLastOdd = idx === 8;
              return (
                <Link
                  key={prod.id}
                  href={`/products/${prod.categorySlug}/${prod.slug}`}
                  title={prod.name}
                  className={`group flex flex-col bg-white border-r border-b border-neutral-300 overflow-hidden transition-colors hover:bg-neutral-50/70 cursor-pointer ${
                    isLastOdd ? "col-span-2 sm:col-span-1" : "col-span-1"
                  }`}
                >
                  {/* Top: Compact Image Stage with Hover Background Reveal */}
                  <div
                    title={prod.name}
                    className="relative w-full h-36 sm:h-44 md:h-48 p-3 sm:p-4 flex items-center justify-center overflow-hidden bg-white"
                  >
                    {/* Category Range Pill (Top Left) */}
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-heading z-20 truncate max-w-[55%]">
                      {prod.categoryName}
                    </span>

                    {/* Floating Warranty Tag (Top Right) */}
                    {prod.warranty && (
                      <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] font-bold text-neutral-700 bg-white/95 px-2 py-0.5 rounded-full border border-neutral-200 shadow-2xs font-heading z-20">
                        {prod.warranty}
                      </span>
                    )}

                    {/* Background Image on Hover Only */}
                    {prod.bgImage && (
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none">
                        <Image
                          src={prod.bgImage}
                          alt={`${prod.name} background`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Product Bucket Image (Proportionally sized, not oversized) */}
                    {prod.image ? (
                      <div
                        className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-400 ${
                          prod.bgImage ? "group-hover:opacity-0 group-hover:scale-95" : "group-hover:scale-105"
                        }`}
                      >
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                          <Image
                            src={prod.image}
                            alt={`${prod.name} - ${prod.categoryName}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center justify-center text-slate-400">
                        <Sparkles className="w-6 h-6 opacity-40 mb-1 text-slate-500" />
                        <span className="text-[10px] font-semibold">Snowcem Quality</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Bar: Uppercase Product Name on Left & ArrowUpRight on Right */}
                  <div className="border-t border-neutral-300 py-2.5 sm:py-3 px-3 sm:px-4 flex items-center justify-between bg-white group-hover:bg-neutral-50 transition-colors">
                    <span className="text-xs sm:text-xs font-bold font-heading text-neutral-900 uppercase tracking-wider truncate pr-2">
                      {prod.name}
                    </span>

                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-900 stroke-[2] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All Products CTA */}
        <div className="text-center pt-8 sm:pt-10">
          <Link
            href="/collection/paints"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore Entire Snowcem Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
