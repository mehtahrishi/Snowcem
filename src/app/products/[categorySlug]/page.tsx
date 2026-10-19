"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowRight, FileText } from "lucide-react";

export default function CategoryProductsPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = CATEGORIES_DATA.find((cat) => cat.slug === params.categorySlug);
  const categoryProducts = PRODUCTS_DATA.filter(
    (prod) => prod.categorySlug === params.categorySlug
  );

  const categoryRanges = Array.from(
    new Set(categoryProducts.map((p) => p.range).filter(Boolean))
  ) as string[];

  const [activeRange, setActiveRange] = useState<string>(categoryRanges[0] || "All");

  const categoryName = category ? category.name : "Products Catalog";
  const categoryDesc = category
    ? category.description
    : "Explore Snowcem's high-performance paint and wall-care solutions.";

  const hasRanges = categoryRanges.length > 0;
  const filteredProducts = hasRanges
    ? categoryProducts.filter((p) => p.range === activeRange)
    : categoryProducts;

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {/* Editorial masthead */}
        <section className="mx-auto w-full max-w-[1180px] px-6 pt-12 pb-10 sm:px-10 sm:pt-20 lg:px-14">
          <p className="font-label text-[10px] text-[#D4AF37]">
            Snowcem Collection
          </p>
          <h1 className="mt-4 max-w-4xl text-[2.1rem] leading-[1.08] text-[#EDE4D8] sm:text-5xl lg:text-[3.6rem]">
            {categoryName}
          </h1>

          <div className="mt-9 border-t border-[#D8C7B3]/15 pt-7">
            <p className="max-w-2xl text-[0.9375rem] leading-[1.85] text-[#C2B69D]">
              {categoryDesc}
            </p>
          </div>
        </section>

        {/* Range selector */}
        {hasRanges && (
          <section className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-14">
            <div className="flex items-end gap-7 overflow-x-auto border-b border-[#D8C7B3]/15 pb-px whitespace-nowrap">
              {categoryRanges.map((rangeName) => {
                const isActive = activeRange === rangeName;
                const count = categoryProducts.filter((p) => p.range === rangeName).length;

                return (
                  <button
                    key={rangeName}
                    onClick={() => setActiveRange(rangeName)}
                    className={`group relative shrink-0 pb-4 text-[0.8125rem] tracking-[0.02em] transition-colors ${
                      isActive
                        ? "text-[#EDE4D8]"
                        : "text-[#C2B69D]/60 hover:text-[#EDE4D8]"
                    }`}
                  >
                    <span className="font-medium">{rangeName}</span>
                    <sup
                      className={`ml-1.5 font-label text-[9px] ${
                        isActive ? "text-[#D4AF37]" : "text-[#C2B69D]/40"
                      }`}
                    >
                      {count}
                    </sup>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-300 ${
                        isActive
                          ? "scale-x-100 bg-[#D4AF37]"
                          : "scale-x-0 bg-[#D4AF37]/50 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Product grid */}
        <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10 sm:py-16 lg:px-14">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((prod) => (
                <article
                  key={prod.id}
                  className="group relative flex flex-col rounded-[3px] border border-[#D6C5B3]/50 bg-[#FAF7F2] shadow-[0_18px_40px_-28px_rgba(6,28,24,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DF3F6F]/40 hover:shadow-[0_26px_54px_-26px_rgba(187,160,133,0.55)]"
                >
                  {/* Packshot stage */}
                  <div
                    className="relative h-56 shrink-0 overflow-hidden rounded-t-[3px] border-b border-[#D6C5B3]/40"
                    style={{
                      background: prod.stageBg
                        ? `linear-gradient(165deg, #F6F1E9 0%, ${prod.stageBg}55 100%)`
                        : "#F3EEE6",
                    }}
                  >
                    {prod.image && (
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>

                  <div className="flex flex-grow flex-col p-6 sm:p-7">
                    <p className="font-label text-[9px] text-[#061C18]/45">
                      {prod.range || prod.categoryName}
                    </p>

                    <h3 className="mt-3 font-display text-[1.6rem] leading-[1.15] text-[#061C18]">
                      {prod.name}
                    </h3>

                    <p className="mt-1.5 text-[0.8125rem] text-[#061C18]/55">
                      {prod.tagline}
                    </p>

                    <p className="mt-4 text-[0.8125rem] leading-[1.75] text-[#061C18]/70 line-clamp-3">
                      {prod.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-[#061C18]/10 pt-5">
                      {prod.features.slice(0, 3).map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-[0.8125rem] text-[#061C18]/75"
                        >
                          <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#D4AF37]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#061C18]/10 pt-6">
                      <Link
                        href={`/products/${prod.categorySlug}/${prod.slug}`}
                        className="inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.02em] text-[#061C18] transition-colors hover:text-[#DF3F6F]"
                      >
                        <span className="border-b border-[#061C18]/30 pb-0.5 group-hover:border-[#DF3F6F]/50">
                          View details
                        </span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {prod.pdf && (
                        <a
                          href={prod.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[0.6875rem] font-label tracking-[0.1em] text-[#061C18]/45 transition-colors hover:text-[#061C18]/80"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>PDF</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md border border-[#D8C7B3]/15 bg-[#0A2621] px-8 py-14 text-center">
              <p className="font-label text-[10px] text-[#D4AF37]">This range</p>
              <h3 className="mt-3 text-[1.15rem] text-[#EDE4D8]">
                No products listed yet
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#C2B69D]">
                Choose another range above to see what is available.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
