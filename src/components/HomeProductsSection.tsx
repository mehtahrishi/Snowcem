"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_DATA, ProductData } from "@/data/productsData";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomeProductsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden w-full border-t border-slate-100">
      <div className="w-full px-4 sm:px-8 md:px-12">
        
        {/* SEO & Context-Rich Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3.5 sm:px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Snowcem Product Range &amp; Catalog
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Architectural Paint Systems &amp; Finishes
          </h2>

          <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed px-2">
            Explore Snowcem&apos;s complete architectural range — engineered for extreme weather protection, UV resistance, high-gloss elegance, and 60+ years of proven legacy across India.
          </p>
        </div>

        {/* Full-Width Products Track — Side-by-Side Row, Center-Aligned, Pill Category, Solid Black Title, No Hover Effects */}
        <div className="flex items-start gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 px-1 scroll-smooth snap-x no-scrollbar w-full">
          {PRODUCTS_DATA.map((prod: ProductData) => (
            <Link
              key={prod.id}
              href={`/products/${prod.categorySlug}/${prod.slug}`}
              className="w-56 sm:w-64 shrink-0 snap-start bg-transparent border-0 shadow-none flex flex-col items-center text-center"
            >
              {/* Product Image Stage (No hover lift, no hover scale, no background animation) */}
              <div className="relative w-full h-60 sm:h-68 rounded-3xl bg-slate-50/70 p-5 flex items-center justify-center border border-slate-100 overflow-hidden">
                
                {/* Floating Warranty Tag if available */}
                {prod.warranty && (
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold text-slate-700 bg-white px-2.5 py-1 rounded-full shadow-2xs border border-slate-200 font-heading z-10">
                    {prod.warranty}
                  </span>
                )}

                {prod.image ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={prod.image}
                      alt={`${prod.name} - ${prod.categoryName}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Sparkles className="w-8 h-8 opacity-40 mb-2 text-slate-500" />
                    <span className="text-xs font-semibold">Snowcem Quality</span>
                  </div>
                )}
              </div>

              {/* Below Image: Centered Category Pill & Solid Black Product Name (No hover color change, all centered) */}
              <div className="pt-4 flex flex-col items-center text-center space-y-2 w-full">
                {/* Category Name Pill */}
                <span className="inline-block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider font-heading bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                  {prod.categoryName}
                </span>

                {/* Solid Black Product Name (No hover color change) */}
                <h3 className="text-base sm:text-lg font-extrabold text-black tracking-tight font-heading truncate w-full">
                  {prod.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center pt-8 sm:pt-10">
          <Link
            href="/products"
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
