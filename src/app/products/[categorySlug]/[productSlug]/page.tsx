"use client";

import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowLeft, ChevronRight, ShieldCheck, Award, Sparkles, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* BREADCRUMB & HERO */}
        <section className="bg-white py-12 md:py-16 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mb-6">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href={`/products/${params.categorySlug}`} className="hover:text-slate-900 transition-colors">
                {categoryName}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">{productName}</span>
            </div>

            {/* Back Button */}
            <div className="mb-6">
              <Link
                href={`/products/${params.categorySlug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-snowcem-orange transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to {categoryName}</span>
              </Link>
            </div>

            {/* Product Header Card */}
            {product ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-snowcem-orange bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
                      {product.categoryName}
                    </span>
                    {product.warranty && (
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {product.warranty} Warranty
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    {product.name}
                  </h1>

                  <p className="text-base sm:text-lg font-semibold text-snowcem-orange">
                    {product.tagline}
                  </p>

                  <p className="text-slate-700 text-sm sm:text-base font-normal leading-relaxed">
                    {product.description}
                  </p>

                  {/* Key Specifications */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.finish && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                        <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Sheen & Finish
                        </span>
                        <span className="text-base font-black text-slate-900">{product.finish}</span>
                      </div>
                    )}

                    {product.packagingSizes && product.packagingSizes.length > 0 && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                        <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Available Pack Sizes
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {product.packagingSizes.map((sz) => (
                            <span key={sz} className="text-xs font-bold bg-white text-slate-900 px-2.5 py-0.5 rounded-md border border-slate-200">
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Callout Card */}
                <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-snowcem-navy text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-snowcem-orange">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white mb-2">Key Features</h3>
                    <div className="space-y-3">
                      {product.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <a
                      href="#footer-inquiry"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.querySelector("footer");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-snowcem-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md text-xs sm:text-sm"
                    >
                      <span>Inquire for Home Painting</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-slate-900">Product Details Coming Soon</h2>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
