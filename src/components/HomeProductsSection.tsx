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
    <section className="py-14 sm:py-18 md:py-24 bg-white overflow-hidden w-full border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO & Context-Rich Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Explore Our Products
          </h2>

          <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed px-2">
            9 iconic formulations across 9 distinct architectural collections — engineered for extreme weather protection, UV resistance, high-gloss elegance, and 60+ years of proven legacy across India.
          </p>
        </div>

        {/* 9-PRODUCT ARCHITECTURAL TABLE GRID (3x3 Table Layout) */}
        <div className="w-full border-t border-l border-neutral-900 bg-neutral-900 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {nineCollectionProducts.map((prod: ProductData) => (
              <Link
                key={prod.id}
                href={`/products/${prod.categorySlug}/${prod.slug}`}
                title={prod.name}
                className="group flex flex-col bg-white border-r border-b border-neutral-900 overflow-hidden transition-colors hover:bg-neutral-50/70 cursor-pointer"
              >
                {/* Top: Square Image Stage with Hover Background Reveal */}
                <div
                  title={prod.name}
                  className="relative w-full aspect-square p-6 sm:p-8 md:p-10 flex items-center justify-center overflow-hidden bg-white"
                >
                  {/* Category Range Pill (Top Left) */}
                  <span className="absolute top-3.5 left-3.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider font-heading z-20">
                    {prod.categoryName}
                  </span>

                  {/* Floating Warranty Tag (Top Right) */}
                  {prod.warranty && (
                    <span className="absolute top-3.5 right-3.5 text-[10px] font-extrabold text-neutral-800 bg-white/95 px-2.5 py-1 rounded-full border border-neutral-200 shadow-2xs font-heading z-20">
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

                  {/* Product Bucket Image (Fades out when bgImage is hovered) */}
                  {prod.image ? (
                    <div
                      className={`relative z-10 w-full h-full flex items-center justify-center p-2 transition-all duration-400 ${
                        prod.bgImage ? "group-hover:opacity-0 group-hover:scale-95" : "group-hover:scale-105"
                      }`}
                    >
                      <Image
                        src={prod.image}
                        alt={`${prod.name} - ${prod.categoryName}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center text-slate-400">
                      <Sparkles className="w-8 h-8 opacity-40 mb-2 text-slate-500" />
                      <span className="text-xs font-semibold">Snowcem Quality</span>
                    </div>
                  )}
                </div>

                {/* Bottom Bar: Uppercase Product Name on Left & ArrowUpRight on Right */}
                <div className="border-t border-neutral-900 py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between bg-white group-hover:bg-neutral-50 transition-colors">
                  <span className="text-xs sm:text-sm font-black font-heading text-neutral-950 uppercase tracking-widest truncate pr-2">
                    {prod.name}
                  </span>

                  <ArrowUpRight className="w-5 h-5 text-neutral-950 stroke-[2.5] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Products CTA */}
        <div className="text-center pt-10 sm:pt-14">
          <Link
            href="/collection/paints"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore Entire Snowcem Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
