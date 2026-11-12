"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { DbCategory, DbProduct, fetchCategories, fetchProducts } from "@/lib/catalogClient";
import {
  Sparkles,
  Search,
  ArrowUpRight,
} from "lucide-react";

export default function CollectionPaintsPage() {
  const [categoriesList, setCategoriesList] = useState<DbCategory[]>([]);
  const [productsList, setProductsList] = useState<DbProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchCategories().then(setCategoriesList);
    fetchProducts().then(setProductsList);
  }, []);

  // Categories list for tabs
  const categories = useMemo(() => {
    return [
      { id: "all", name: "All Products", slug: "all" },
      ...categoriesList,
    ];
  }, [categoriesList]);

  // Filtered products based on category and search query
  const filteredProducts = useMemo(() => {
    return productsList.filter((prod) => {
      const matchesCategory =
        selectedCategory === "all" || prod.categorySlug === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        prod.name.toLowerCase().includes(q) ||
        (prod.categoryName && prod.categoryName.toLowerCase().includes(q)) ||
        (prod.tagline && prod.tagline.toLowerCase().includes(q)) ||
        (prod.range && prod.range.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [productsList, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans text-[#EDE4D8]">
      <PaintLoader />

      {/* Sticky Top Header */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {/* HERO SECTION WITH ANIMATED HEADER & SMALL DESCRIPTION */}
        <section className="relative w-full pt-14 sm:pt-18 md:pt-22 pb-12 sm:pb-16 bg-canvas overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#D4AF37]/10 via-[#F3E5AB]/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10 space-y-4 sm:space-y-5">
            {/* Animated Gradient Wave Header */}
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-heading animate-gradient-wave inline-block">
                Explore Entire Snowcem Catalog
              </h1>
            </div>

            {/* Small Description */}
            <p className="text-[#C2B69D] text-xs sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed px-2">
              Discover India&apos;s most trusted architectural paints, exterior coatings, luxury emulsions, and waterproofing systems — engineered with 60+ years of proven resilience for enduring beauty and protection.
            </p>

            {/* Search Input Bar */}
            <div className="max-w-lg mx-auto pt-2 sm:pt-4">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[#C2B69D] absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, finish, or category..."
                  className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-2xl bg-[#EDE4D8] border border-[#C2B69D] text-[#061C18] placeholder:text-[#061C18]/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 text-xs text-[#061C18]/60 hover:text-[#061C18] font-bold bg-[#D8C5B3] rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER TABS */}
        <section className="sticky top-[68px] z-30 bg-canvas-soft/95 pt-3 pb-2 sm:pt-4 sm:pb-3 backdrop-blur-md">
          <div className="w-full px-4 sm:px-6">
            <div className="flex w-full items-center justify-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#0A2621]/90 backdrop-blur-md border border-[#D8C7B3]/40 shadow-sm overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                const count =
                  cat.slug === "all"
                    ? productsList.length
                    : productsList.filter((p) => p.categorySlug === cat.slug).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`shrink-0 flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold font-heading transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-md scale-[1.02]"
                        : "text-[#C2B69D] hover:text-[#EDE4D8] hover:bg-white/10"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Active category banner */}
        {selectedCategory !== "all" &&
          (() => {
            const cat = categoriesList.find((c) => c.slug === selectedCategory);
            if (!cat) return null;
            return (
              <section className="relative isolate mx-auto w-full max-w-[1400px] overflow-hidden px-4 pt-6 sm:px-8">
                <div className="relative min-h-[220px] overflow-hidden rounded-3xl sm:min-h-[280px]">
                  {cat.banner && (
                    <Image
                      src={cat.banner}
                      alt={`${cat.name} overview`}
                      fill
                      priority
                      className="z-0 object-cover object-center sm:object-right"
                      sizes="(max-width: 1400px) 100vw, 1400px"
                    />
                  )}
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#061C18] via-[#061C18]/75 to-transparent" />
                  <div className="relative z-20 flex h-full max-w-xl flex-col justify-center p-6 sm:p-10">
                    <h2 className="text-xl font-extrabold leading-tight tracking-tight font-heading text-[#EDE4D8] sm:text-3xl">
                      {cat.name}
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-[#C2B69D] sm:text-sm">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </section>
            );
          })()}

        {/* PRODUCTS GRID SECTION */}
        <section className="w-full overflow-hidden bg-canvas-soft bg-canvas-grid py-12 sm:py-16">
          <div className="w-full">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto no-scrollbar scroll-smooth px-4 pb-4 sm:px-8 lg:px-12">
              <div className="flex w-max gap-4 sm:gap-5">
                {filteredProducts.map((prod: DbProduct) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.categorySlug}/${prod.slug}`}
                    title={prod.name}
                    className="product-card group relative flex h-[21rem] w-[17rem] shrink-0 flex-col rounded-2xl border border-[#C2B69D] bg-[#D8C5B3] shadow-sm hover:shadow-xl hover:shadow-[#BBA085]/20 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer sm:h-[24rem] sm:w-[20rem] overflow-hidden isolate [transform:translateZ(0)]"
                  >
                  <div
                    title={prod.name}
                    className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#C2B69D] p-5 sm:p-6 rounded-t-2xl"
                  >
                    {prod.bgImage && (
                      <Image src={prod.bgImage} alt="" fill className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-2xl" aria-hidden="true" />
                    )}

                    <span className="absolute left-4 top-4 z-20 max-w-[70%] truncate font-label text-[9px] text-[#061C18]/55">
                      {prod.categoryName}
                    </span>

                    {prod.warranty && (
                      <span className="absolute right-4 top-4 z-20 font-label text-[9px] text-[#061C18]/55">
                        {prod.warranty}
                      </span>
                    )}

                    {prod.image ? (
                      <div className={`relative z-10 h-44 w-44 transition-all duration-500 ease-out group-hover:scale-105 sm:h-52 sm:w-52 ${prod.bgImage ? "group-hover:opacity-0" : ""}`}>
                        <Image src={prod.image} alt={`${prod.name} - ${prod.categoryName}`} fill className="object-contain" />
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center justify-center text-[#061C18]/45">
                        <Sparkles className="mb-1 h-6 w-6 opacity-60" />
                        <span className="text-[10px] font-semibold">Snowcem Quality</span>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 flex items-center justify-between bg-[#D8C5B3] px-4 py-3 rounded-b-2xl">
                    <span className="truncate pr-2 text-xs font-bold uppercase tracking-wider text-[#061C18]">
                      {prod.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#061C18] stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* No Results Found State */
            <div className="text-center py-16 bg-[#0E302A] rounded-3xl border border-[#D4AF37]/25 p-8">
              <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold font-heading text-[#EDE4D8] mb-1">
                No Products Found
              </h3>
              <p className="text-xs sm:text-sm text-[#C2B69D] max-w-sm mx-auto mb-4">
                We couldn&apos;t find any paints matching &quot;{searchQuery}&quot;. Try selecting another category or clear your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] text-xs font-bold font-heading hover:opacity-90 transition-all cursor-pointer"
              >
                Show All Products
              </button>
            </div>
          )}
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
