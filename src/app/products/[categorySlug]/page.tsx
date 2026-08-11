"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA, ProductData } from "@/data/productsData";
import { ArrowRight, ChevronRight, ShieldCheck, Package, FileText } from "lucide-react";

type RangeType = "All" | "Luxury Products" | "Premium Emulsion" | "Midrange Emulsions" | "Economy Range Emulsion";

const RANGE_TABS: { label: string; value: RangeType }[] = [
  { label: "Luxury Products", value: "Luxury Products" },
  { label: "Premium Emulsion", value: "Premium Emulsion" },
  { label: "Midrange Emulsions", value: "Midrange Emulsions" },
  { label: "Economy Range Emulsion", value: "Economy Range Emulsion" },
];

export default function CategoryProductsPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = CATEGORIES_DATA.find((cat) => cat.slug === params.categorySlug);
  const categoryProducts = PRODUCTS_DATA.filter(
    (prod) => prod.categorySlug === params.categorySlug
  );

  // Extract dynamic range tabs present in this category's products
  const categoryRanges = Array.from(
    new Set(categoryProducts.map((p) => p.range).filter(Boolean))
  ) as string[];

  const [activeRange, setActiveRange] = useState<string>(
    categoryRanges[0] || "All"
  );

  const categoryName = category ? category.name : "Products Catalog";
  const categoryDesc = category
    ? category.description
    : "Explore Snowcem's high-performance paint and wall-care solutions.";

  const hasRanges = categoryRanges.length > 0;

  const filteredProducts = hasRanges
    ? categoryProducts.filter((p) => p.range === activeRange)
    : categoryProducts;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* HERO HEADER */}
        <section className="bg-white py-6 md:py-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">
              {categoryName}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto font-light leading-relaxed">
              {categoryDesc}
            </p>
          </div>
        </section>

        {/* RANGE TABS BAR (Centered, Uncut & Responsive) */}
        {hasRanges && (
          <section className="bg-white border-b border-slate-200 shadow-xs w-full">
            <div className="w-full">
              <div className="flex items-center justify-center overflow-x-auto no-scrollbar scroll-smooth w-full border-x border-slate-200">
                {categoryRanges.map((rangeName) => {
                  const isActive = activeRange === rangeName;
                  const count = categoryProducts.filter((p) => p.range === rangeName).length;

                  return (
                    <button
                      key={rangeName}
                      onClick={() => setActiveRange(rangeName)}
                      className={`py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-heading font-extrabold tracking-wide transition-all flex-1 min-w-max text-center flex items-center justify-center gap-2 border-r border-slate-200 last:border-r-0 ${
                        isActive
                          ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-xs"
                          : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="whitespace-nowrap">{rangeName}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-heading font-extrabold shrink-0 ${
                          isActive
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
          </section>
        )}

        {/* PRODUCTS GRID */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-slate-200/90 transition-all flex flex-col justify-between group relative"
                >
                  {/* Top Background Banner & Floating Product Container */}
                  <div className="relative w-full h-44 sm:h-48 rounded-t-3xl overflow-visible">
                    {/* Background environment image cleanly contained in top frame */}
                    <div className="absolute inset-0 rounded-t-3xl overflow-hidden">
                      {prod.bgImage ? (
                        <Image
                          src={prod.bgImage}
                          alt={`${prod.name} background`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-50" />
                      )}
                    </div>

                    {/* ONLY Product Bucket floats half up in background banner & half down into details card */}
                    {prod.image && (
                      <div className="absolute -bottom-10 right-4 sm:right-6 w-32 h-40 sm:w-36 sm:h-44 z-30 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] pointer-events-none">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain object-bottom"
                        />
                      </div>
                    )}
                  </div>

                  {/* Details Card Section */}
                  <div className="relative z-10 bg-white p-5 sm:p-6 pt-6 rounded-b-3xl flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Responsive Pill Badge Row */}
                      <div className="flex flex-wrap items-center gap-2 max-w-[calc(100%-80px)] sm:max-w-[calc(100%-100px)]">
                        <span className="text-[10px] font-heading font-extrabold text-slate-700 uppercase tracking-wide bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                          {prod.categoryName}
                        </span>
                        {prod.range && (
                          <span className="text-[10px] font-heading font-extrabold text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-2.5 py-1 rounded-lg shadow-2xs">
                            {prod.range}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug pb-0.5 group-hover:bg-gradient-to-r group-hover:from-[#2a1b92] group-hover:via-[#5c249c] group-hover:to-[#e91e63] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                        {prod.name}
                      </h2>
                      <p className="text-xs font-semibold bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-normal pb-1 block">
                        {prod.tagline}
                      </p>
                      <p className="text-sm text-slate-800 font-normal leading-relaxed line-clamp-3">
                        {prod.description}
                      </p>

                      {/* Features list */}
                      <div className="pt-3 space-y-2 border-t border-slate-100">
                        {prod.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                      {prod.pdf && (
                        <a
                          href={prod.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-all border border-slate-800 group"
                        >
                          <svg className="w-0 h-0 absolute">
                            <linearGradient id={`pdfGradientIcon-${prod.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#2a1b92" />
                              <stop offset="50%" stopColor="#5c249c" />
                              <stop offset="100%" stopColor="#e91e63" />
                            </linearGradient>
                          </svg>
                          <FileText
                            className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform"
                            style={{ stroke: `url(#pdfGradientIcon-${prod.id})` }}
                          />
                          <span className="whitespace-nowrap">Download PDF</span>
                        </a>
                      )}

                      <Link
                        href={`/products/${prod.categorySlug}/${prod.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 text-white text-xs font-extrabold py-2.5 px-3 rounded-xl transition-all text-center"
                      >
                        <span className="whitespace-nowrap">View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-3">
              <Package className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">No Products in this Range</h3>
              <p className="text-xs text-slate-500">
                Select another range tab above to view products.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
