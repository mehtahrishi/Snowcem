"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS_DATA, ProductData } from "@/data/productsData";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import {
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

export default function CollectionPaintsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Categories list for tabs
  const categories = useMemo(() => {
    return [
      { id: "all", name: "All Products", slug: "all" },
      ...CATEGORIES_DATA,
    ];
  }, []);

  // Filtered products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((prod) => {
      const matchesCategory =
        selectedCategory === "all" || prod.categorySlug === selectedCategory;
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prod.tagline && prod.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (prod.finish && prod.finish.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PaintLoader />

      {/* Sticky Top Header */}
      <div className="sticky top-0 z-40 bg-white shadow-2xs">
        <Header />
      </div>

      <main className="flex-grow">
        {/* HERO SECTION WITH ANIMATED HEADER & SMALL DESCRIPTION */}
        <section className="relative w-full pt-14 sm:pt-18 md:pt-22 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80 overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#5c249c]/5 via-[#e91e63]/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10 space-y-4 sm:space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide uppercase font-heading shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Complete Architectural Paint Catalog</span>
            </div>

            {/* Animated Gradient Wave Header */}
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-heading animate-gradient-wave inline-block">
                Explore Entire Snowcem Catalog
              </h1>
            </div>

            {/* Small Description */}
            <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed px-2">
              Discover India&apos;s most trusted architectural paints, exterior coatings, luxury emulsions, and waterproofing systems — engineered with 60+ years of proven resilience for enduring beauty and protection.
            </p>

            {/* Search Input Bar */}
            <div className="max-w-lg mx-auto pt-2 sm:pt-4">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, finish, or category..."
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5c249c]/30 focus:border-[#5c249c] shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 text-xs text-slate-400 hover:text-slate-700 font-bold bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER TABS */}
        <section className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                const count =
                  cat.slug === "all"
                    ? PRODUCTS_DATA.length
                    : PRODUCTS_DATA.filter((p) => p.categorySlug === cat.slug).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-heading transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs scale-102"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRODUCTS GRID SECTION */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Summary Counter */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-100">
            <p className="text-xs sm:text-sm font-semibold text-slate-600 font-heading">
              Showing <span className="font-extrabold text-slate-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "Product" : "Products"}
            </p>
            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="text-xs font-bold text-[#5c249c] hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Grid of Product Cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((prod: ProductData) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.categorySlug}/${prod.slug}`}
                  title={prod.name}
                  className="group bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Image Stage with Hover BG Image */}
                  <div
                    title={prod.name}
                    className="relative w-full h-64 sm:h-72 bg-slate-50/70 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden"
                  >
                    {/* Warranty Tag */}
                    {prod.warranty && (
                      <span className="absolute top-3.5 right-3.5 text-[10px] font-extrabold text-slate-700 bg-white px-2.5 py-1 rounded-full shadow-2xs border border-slate-200 font-heading z-20">
                        {prod.warranty}
                      </span>
                    )}

                    {/* Range Tag if available */}
                    {prod.range && (
                      <span className="absolute top-3.5 left-3.5 text-[10px] font-bold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-full border border-slate-200 font-heading z-20 truncate max-w-[120px]">
                        {prod.range}
                      </span>
                    )}

                    {/* Background Image on Hover Only */}
                    {prod.bgImage && (
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none">
                        <Image
                          src={prod.bgImage}
                          alt={`${prod.name} setting`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Product Bucket Image (Fades out when bgImage is hovered) */}
                    {prod.image ? (
                      <div
                        className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-300 ${
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

                  {/* Card Body Details */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-3">
                    <div className="space-y-2">
                      {/* Category Pill */}
                      <span className="inline-block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider font-heading bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                        {prod.categoryName}
                      </span>

                      {/* Product Name */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-heading group-hover:text-[#5c249c] transition-colors line-clamp-1">
                        {prod.name}
                      </h3>

                      {/* Finish & Tagline */}
                      {prod.tagline && (
                        <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                          {prod.tagline}
                        </p>
                      )}
                    </div>

                    {/* Bottom Row: Finish & View Arrow */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold font-heading">
                      <span className="text-slate-500 text-[11px] font-medium truncate max-w-[130px]">
                        {prod.finish || "Premium Architectural Finish"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#5c249c] group-hover:translate-x-1 transition-transform">
                        <span>View Specs</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* No Results Found State */
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold font-heading text-slate-800 mb-1">
                No Products Found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-4">
                We couldn&apos;t find any paints matching &quot;{searchQuery}&quot;. Try selecting another category or clear your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-heading hover:bg-slate-800 transition-all cursor-pointer"
              >
                Show All Products
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
