"use client";

import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowRight, ChevronRight, ShieldCheck, Package } from "lucide-react";

export default function CategoryProductsPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = CATEGORIES_DATA.find((cat) => cat.slug === params.categorySlug);
  const categoryProducts = PRODUCTS_DATA.filter(
    (prod) => prod.categorySlug === params.categorySlug
  );

  const categoryName = category ? category.name : "Products Catalog";
  const categoryDesc = category
    ? category.description
    : "Explore Snowcem's high-performance paint and wall-care solutions.";

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
        <section className="bg-white py-12 md:py-16 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium mb-4">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">{categoryName}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              {categoryName}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-light">
              {categoryDesc}
            </p>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-snowcem-orange transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-snowcem-navy uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full inline-block">
                      {prod.categoryName}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {prod.name}
                    </h2>
                    <p className="text-xs font-semibold text-snowcem-orange">
                      {prod.tagline}
                    </p>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                      {prod.description}
                    </p>

                    {/* Features list */}
                    <div className="pt-2 space-y-1.5 border-t border-slate-100">
                      {prod.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    {prod.finish && (
                      <span className="text-xs font-medium text-slate-500">
                        Finish: <strong className="text-slate-800">{prod.finish}</strong>
                      </span>
                    )}
                    <Link
                      href={`/products/${prod.categorySlug}/${prod.slug}`}
                      className="inline-flex items-center gap-1.5 bg-snowcem-navy hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-snowcem-orange" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-3">
              <Package className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">No Products Found</h3>
              <p className="text-xs text-slate-500">
                Explore our main catalog to view all Snowcem paints and wall-care ranges.
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
