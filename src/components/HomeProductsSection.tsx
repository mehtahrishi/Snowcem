"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_DATA } from "@/data/productsData";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { ArrowRight, Sparkles, Filter, FileText } from "lucide-react";

export default function HomeProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter((p) => p.categorySlug === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-6 bg-white border-t border-slate-100 overflow-hidden w-full space-y-4">
      {/* Swipeable Category Sub-Navbar */}
      <div className="w-full bg-slate-50/70 border-y border-slate-200/80 py-3">
        <div className="flex items-center gap-2 overflow-x-auto px-4 sm:px-8 scroll-smooth no-scrollbar">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full text-xs font-heading font-extrabold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <span>All Products</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-heading font-extrabold ${
                selectedCategory === "All"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              ({PRODUCTS_DATA.length})
            </span>
          </button>

          {CATEGORIES_DATA.map((cat) => {
            const count = PRODUCTS_DATA.filter((p) => p.categorySlug === cat.slug).length;
            if (count === 0) return null;

            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-extrabold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-heading font-extrabold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Full-Width Swipeable Track (Pure Edge-to-Edge Cards) */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle Side Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Swipeable Container (Padded First & Last Cards) */}
        <div className="flex items-start gap-6 overflow-x-auto py-4 px-6 sm:px-12 md:px-16 scroll-smooth snap-x snap-mandatory">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200/90 transition-all duration-300 flex flex-col group overflow-hidden"
            >
              <div>
                {/* Product Image Stage (Dynamic Color-Matched Background Stage) */}
                <div
                  className="relative w-full h-52 sm:h-56 border-b border-slate-100 flex items-center justify-center p-6 transition-colors duration-500"
                  style={
                    prod.stageBg
                      ? {
                        background: `linear-gradient(135deg, ${prod.stageBg}cc 0%, ${prod.stageBg}99 50%, ${prod.stageBg}cc 100%)`,
                      }
                      : {
                        background:
                          "linear-gradient(to bottom, #f8fafc, #f1f5f9, #f8fafc)",
                      }
                  }
                >
                  {prod.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.18)] group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Sparkles className="w-8 h-8 opacity-40 mb-2" />
                      <span className="text-xs font-semibold">Snowcem Quality</span>
                    </div>
                  )}
                </div>

                {/* Product Info Details Container */}
                <div className="p-5 sm:p-6 pb-3 space-y-2">
                  {/* Category Name & Range Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-heading font-extrabold text-slate-700 uppercase tracking-wide bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                      {prod.categoryName}
                    </span>
                    {prod.range && (
                      <span className="text-[10px] font-heading font-extrabold text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-2.5 py-1 rounded-lg shadow-2xs">
                        {prod.range}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:bg-gradient-to-r group-hover:from-[#2a1b92] group-hover:via-[#5c249c] group-hover:to-[#e91e63] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs font-semibold bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">
                    {prod.tagline}
                  </p>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <Link
                  href={`/products/${prod.categorySlug}/${prod.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 text-white font-extrabold py-3 px-5 rounded-2xl transition-all text-xs"
                >
                  <span>View Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
