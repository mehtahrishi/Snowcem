"use client";

import React, { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calculator,
  Palette,
  MapPin,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: { categorySlug: string; productSlug: string };
}) {
  const category = CATEGORIES_DATA.find((cat) => cat.slug === params.categorySlug);
  const product =
    PRODUCTS_DATA.find(
      (prod) => prod.slug === params.productSlug && prod.categorySlug === params.categorySlug
    ) || PRODUCTS_DATA.find((prod) => prod.slug === params.productSlug);

  const categoryName = category ? category.name : "Products";
  const productName = product ? product.name : "Snowcem Paint Solution";

  // Similar Products from the same range / category
  const similarProducts = useMemo(() => {
    if (!product) return [];
    // 1. Same range & category
    let list = PRODUCTS_DATA.filter(
      (p) =>
        p.categorySlug === product.categorySlug &&
        p.range === product.range &&
        p.id !== product.id
    );
    // 2. If fewer than 3, fallback to same category
    if (list.length < 3) {
      const more = PRODUCTS_DATA.filter(
        (p) =>
          p.categorySlug === product.categorySlug &&
          p.id !== product.id &&
          !list.some((item) => item.id === p.id)
      );
      list = [...list, ...more];
    }
    return list.slice(0, 4);
  }, [product]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] font-sans">
      <PaintLoader />

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0B0B0E] shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow space-y-12 sm:space-y-16 py-8 sm:py-14">
        {product ? (
          <>
            {/* 1. SEAMLESS HERO SHOWCASE: LEFT STUDIO BG + BUCKET IMAGE, RIGHT DETAILS (NO ENCLOSING BORDER / DIV) */}
            <section className="px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Left Column: Studio Background with Product Packshot (5.5 cols) */}
                <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center">
                  <div className="relative w-full aspect-4/3 sm:aspect-square max-w-lg rounded-3xl overflow-hidden shadow-md">
                    {/* Studio / Room Background Image */}
                    {product.bgImage ? (
                      <img
                        src={product.bgImage}
                        alt={`${product.name} Studio Setting`}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-purple-100 via-indigo-50 to-pink-100" />
                    )}

                    {/* Centered Floating Product Packshot Bucket */}
                    {product.image && (
                      <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 z-10 pointer-events-none">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)] hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Floating Warranty Badge */}
                    {product.warranty && (
                      <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-white/90 backdrop-blur-md text-emerald-800 shadow-sm border border-white/40">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{product.warranty} Warranty</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Column: Clean Product Details on Page (6.5 cols, No Enclosing Border) */}
                <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                  
                  {/* Category Pill & Product Title */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-label text-[#5B6BB5] bg-indigo-50 border border-indigo-100 px-3.5 py-1 rounded-full inline-block">
                      {product.categoryName}
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                      {product.name}
                    </h1>

                    <p className="text-base sm:text-lg font-semibold text-[#DF3F6F]">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Product Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {product.description}
                  </p>

                  {/* Specifications (Finish & Warranty) */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {product.finish && (
                      <div className="bg-slate-50 border border-gray-200 px-4 py-2.5 rounded-xl">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Finish & Sheen
                        </span>
                        <span className="text-xs font-bold text-slate-800">{product.finish}</span>
                      </div>
                    )}

                    {product.warranty && (
                      <div className="bg-slate-50 border border-gray-200 px-4 py-2.5 rounded-xl">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Performance Guarantee
                        </span>
                        <span className="text-xs font-bold text-slate-800">{product.warranty} Warranty</span>
                      </div>
                    )}
                  </div>

                  {/* Minimal & Clean Features List */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Key Highlights & Benefits
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#5B6BB5] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTAs: Download PDF & Dealer Inquiry */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                    {product.pdf && (
                      <a
                        href={product.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <FileText className="w-4 h-4 text-orange-400" />
                        <span>Download Technical PDF</span>
                      </a>
                    )}

                    <Link
                      href="/find-dealer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Find Nearest Dealer</span>
                    </Link>
                  </div>

                </div>
              </div>
            </section>

            {/* 2. EXPLORE COLOUR CATALOGUE & PAINT COST ESTIMATOR */}
            <section className="px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Card 1: Calculate Paint Budget & Litres */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#e91e63] flex items-center justify-center">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                      Calculate Paint Budget & Litres
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Enter your carpet area in square feet to instantly calculate exact litres of {product.name}, primer undercoats, wall putty, and estimated costs.
                    </p>
                  </div>

                  <Link
                    href="/paint-calculator"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#DF3F6F] hover:text-[#5B6BB5] transition-colors"
                  >
                    <span>Open Paint Budget Calculator</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Card 2: Explore 1,800+ Shades in Colour Catalogue */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B6BB5] flex items-center justify-center">
                      <Palette className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                      Explore 1,800+ Curated Color Shades
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Discover the perfect wall color combinations for {product.name}. Browse genre-based palettes for living rooms, bedrooms, kitchens, and exterior facades.
                    </p>
                  </div>

                  <Link
                    href="/color-catalogue"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#5B6BB5] hover:text-[#DF3F6F] transition-colors"
                  >
                    <span>Browse Color Catalogue</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </section>

            {/* 3. PRODUCT FAQS (IF AVAILABLE) */}
            {product.faqs && product.faqs.length > 0 && (
              <section className="px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto w-full">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6">
                  <div className="text-left space-y-1">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Application guidelines, drying time, and care instructions for {product.name}.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {product.faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group bg-slate-50 rounded-2xl border border-gray-200 overflow-hidden transition-all"
                      >
                        <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-slate-900 text-xs sm:text-sm cursor-pointer select-none group-open:bg-slate-100 transition-colors">
                          <span>{faq.question}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-90 shrink-0" />
                        </summary>
                        <div className="p-4 sm:p-5 pt-2 text-xs text-slate-600 leading-relaxed border-t border-gray-200/60 bg-white">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 4. SIMILAR PRODUCTS FROM THIS RANGE (PLACED BELOW FAQ, CENTERED HEADER) */}
            {similarProducts.length > 0 && (
              <section className="px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto w-full space-y-5">
                {/* Centered Heading */}
                <div className="text-center space-y-1">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    Similar Products from {product.range || product.categoryName}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Explore other high-performance paint solutions in this category
                  </p>
                </div>

                {/* Minimal Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {similarProducts.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all group text-center"
                    >
                      <div>
                        {/* Product Image */}
                        <div className="relative w-full aspect-square rounded-xl bg-slate-50 p-4 flex items-center justify-center border border-gray-100 overflow-hidden mb-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <div className="text-[10px] text-slate-400">Snowcem</div>
                          )}
                        </div>

                        {/* Name */}
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2a1b92] transition-colors line-clamp-1">
                          {item.name}
                        </h3>

                        {/* Year Thing / Warranty Badge */}
                        <div className="mt-1.5 flex justify-center">
                          {item.warranty ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <ShieldCheck className="w-3 h-3" />
                              <span>{item.warranty} Warranty</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              <span>Snowcem Shield</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Know More Action */}
                      <div className="pt-4 mt-2 border-t border-gray-100">
                        <Link
                          href={`/products/${item.categorySlug}/${item.slug}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-[#5B6BB5] hover:to-[#DF3F6F] hover:text-white text-slate-800 text-xs font-bold transition-all"
                        >
                          <span>Know More</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. PAINTING SERVICE QUERY BANNER */}
            <PaintingServiceQueryBanner sourceContext={`product_${product.slug}`} />

            {/* 6. NEARBY DEALER & PAINTER SUPPORT TABS */}
            <div className="pt-4">
              <ToolsSupportTabs toolType="calculator" />
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Product Details Coming Soon</h2>
            <Link
              href="/products"
              className="mt-4 inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-xs font-bold"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
