"use client";

import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";
import { 
  ArrowLeft, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Home, 
  Link as LinkIcon, 
  ArrowDown, 
  Sun, 
  ShieldAlert, 
  Ban, 
  Layers,
  FileText
} from "lucide-react";

// Helper function to pick relevant Lucide icon for feature text
function getFeatureIcon(featureText: string) {
  const lower = featureText.toLowerCase();
  if (lower.includes("durable") || lower.includes("rich finish") || lower.includes("link")) {
    return <LinkIcon className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />;
  }
  if (lower.includes("adhesion")) {
    return <ArrowDown className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />;
  }
  if (lower.includes("sheen")) {
    return <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />;
  }
  if (lower.includes("algae") || lower.includes("fungi")) {
    return <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />;
  }
  if (lower.includes("yellowing")) {
    return <Layers className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />;
  }
  if (lower.includes("heavy metal") || lower.includes("lead") || lower.includes("free")) {
    return <Ban className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />;
  }
  if (lower.includes("warranty")) {
    return <Award className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />;
  }
  return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />;
}

export default function ProductDetailPage({
  params,
}: {
  params: { categorySlug: string; productSlug: string };
}) {
  const category = CATEGORIES_DATA.find((cat) => cat.slug === params.categorySlug);
  const product = PRODUCTS_DATA.find(
    (prod) => prod.slug === params.productSlug && prod.categorySlug === params.categorySlug
  ) || PRODUCTS_DATA.find((prod) => prod.slug === params.productSlug);

  const categoryName = category ? category.name : "Products";
  const productName = product ? product.name : "Snowcem Paint Solution";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PaintLoader />
      {/* Pinned Sticky Header Wrapper */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
        
        {/* Sticky Sub Navbar (Back Button & Home Icon) */}
        <div className="bg-white/95 backdrop-blur-md border-t border-b border-slate-200/80 shadow-2xs py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              href={`/products/${params.categorySlug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-snowcem-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>Back to {categoryName}</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link
                href="/"
                className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-2xs"
                title="Go to Home"
              >
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold truncate max-w-[150px] sm:max-w-none">{productName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Full Width Environment Hero Banner */}
        {product && (product.bgImage || product.image) && (
          <div className="relative w-full py-6 sm:py-10 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
              {/* Background Environment Image - Pure Uncropped */}
              {product.bgImage && (
                <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-3xl overflow-hidden">
                  <Image
                    src={product.bgImage}
                    alt={`${product.name} background`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Overlapping Floating Product Bucket Container */}
              {product.image && (
                <div className="absolute -bottom-8 sm:-bottom-12 right-6 sm:right-16 w-44 sm:w-60 md:w-72 h-52 sm:h-72 md:h-80 z-30 pointer-events-none">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCT DETAILS CONTENT */}
        <section className="bg-white pt-16 sm:pt-20 pb-12 md:pb-16 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Product Header & Feature Aura Tiles */}
            {product ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-12 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3 py-1 rounded-full shadow-xs">
                        {product.categoryName}
                      </span>
                      {product.warranty && (
                        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          {product.warranty} Warranty
                        </span>
                      )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2 inline-block">
                      {product.name}
                    </h1>

                    <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-snug pb-1 block">
                      {product.tagline}
                    </p>

                    <p className="text-slate-700 text-sm sm:text-base font-normal leading-relaxed max-w-4xl">
                      {product.description}
                    </p>

                    {/* Specifications */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      {product.finish && (
                        <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] shadow-xs">
                          <div className="bg-white px-5 py-3 rounded-[14px]">
                            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                              Sheen & Finish
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">{product.finish}</span>
                          </div>
                        </div>
                      )}
                      {product.warranty && (
                        <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] shadow-xs">
                          <div className="bg-white px-5 py-3 rounded-[14px]">
                            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                              Performance Guarantee
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">{product.warranty} Warranty</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* COMPACT INLINE BADGE PILLS (OPTION 1) WITH ANNOUNCEMENT BAR COLOR COMBO & BLOBS */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-snowcem-orange" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                      Product Highlights & Features
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {product.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-xs hover:shadow-md hover:scale-[1.03] transition-all duration-300 group inline-flex items-center border border-white/10"
                      >
                        {/* Animated Floating Glow Blobs */}
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/20 rounded-full blur-md pointer-events-none transition-all duration-500 group-hover:scale-150" />
                        <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-white/15 rounded-full blur-md pointer-events-none transition-all duration-500 group-hover:scale-150" />

                        <span className="relative z-10 text-xs sm:text-sm font-bold tracking-wide drop-shadow-xs">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Centered Download Technical PDF Button Below Features */}
                  {product.pdf && (
                    <div className="pt-6 flex justify-center">
                      <a
                        href={product.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-md hover:shadow-xl border border-slate-800 group hover:scale-[1.02]"
                      >
                        {/* SVG Gradient definition for the FileText icon stroke */}
                        <svg className="w-0 h-0 absolute">
                          <linearGradient id="brandGradientIcon" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2a1b92" />
                            <stop offset="50%" stopColor="#5c249c" />
                            <stop offset="100%" stopColor="#e91e63" />
                          </linearGradient>
                        </svg>

                        <FileText
                          className="w-5 h-5 group-hover:scale-110 transition-transform"
                          style={{ stroke: "url(#brandGradientIcon)" }}
                        />
                        <span>Download Technical PDF</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-slate-900">Product Details Coming Soon</h2>
              </div>
            )}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQS) ACCORDION SECTION */}
        {product && product.faqs && product.faqs.length > 0 && (
          <section className="bg-slate-50 py-8 sm:py-12 border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Frequently Asked Questions (FAQs)
                </h2>
                <p className="text-sm text-slate-600 max-w-xl mx-auto">
                  Everything you need to know about Snowcem {product.name} application, coverage, drying time, and care.
                </p>
              </div>

              <div className="space-y-4">
                {product.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-300"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-extrabold text-slate-900 text-base sm:text-lg cursor-pointer select-none group-open:bg-slate-50 transition-colors">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                          Q{idx + 1}
                        </span>
                        <span className="text-slate-900 font-bold">{faq.question}</span>
                      </span>
                      <ChevronRight className="w-5 h-5 text-slate-500 transition-transform duration-300 group-open:rotate-90 shrink-0" />
                    </summary>
                    <div className="p-6 pt-4 text-sm sm:text-base font-normal text-slate-800 leading-relaxed border-t border-slate-200/80 bg-white">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
