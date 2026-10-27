"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Home } from "lucide-react";

const PRODUCT_CATEGORIES = Array.from(
  new Map(PRODUCTS_DATA.map((p) => [p.categorySlug, p.categoryName])).entries()
).map(([slug, name]) => ({ slug, name }));

export default function CategoryProductsPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const router = useRouter();

  const category = CATEGORIES_DATA.find((cat) => cat.slug === params.categorySlug);
  const categoryProducts = PRODUCTS_DATA.filter(
    (prod) => prod.categorySlug === params.categorySlug
  );

  const categoryRanges = Array.from(
    new Set(categoryProducts.map((p) => p.range).filter(Boolean))
  ) as string[];

  const [activeRange, setActiveRange] = useState<string>(categoryRanges[0] || "All");
  const effectiveRange = categoryRanges.includes(activeRange)
    ? activeRange
    : categoryRanges[0] || "All";

  const categoryName = category ? category.name : "Products Catalog";
  const categoryDesc = category
    ? category.description
    : "Explore Snowcem's high-performance paint and wall-care solutions.";

  const hasRanges = categoryRanges.length > 0;
  const filteredProducts = hasRanges
    ? categoryProducts.filter((p) => p.range === effectiveRange)
    : categoryProducts;

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {/* Category sub-navigation */}
        <div className="sticky top-16 z-30 w-full border-b border-[#D8C7B3]/25 bg-[#061C18] lg:top-20">
          <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2 px-6 py-2.5 sm:px-10 lg:px-14">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#D8C7B3]/25 text-[#C2B69D] transition-colors hover:border-[#D4AF37] hover:bg-[#0A2621] hover:text-[#D4AF37]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <Link
                href="/"
                aria-label="Back to home"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#D8C7B3]/25 text-[#C2B69D] transition-colors hover:border-[#D4AF37] hover:bg-[#0A2621] hover:text-[#D4AF37]"
              >
                <Home className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 sm:flex-none">
              <label className="relative min-w-[136px] flex-1 sm:w-[220px] sm:flex-none">
                <span className="sr-only">Category</span>
                <select
                  value={params.categorySlug}
                  onChange={(e) => router.push(`/products/${e.target.value}`)}
                  className="h-9 w-full appearance-none truncate border border-[#D8C7B3]/25 bg-[#061C18] pl-3 pr-8 text-xs text-[#EDE4D8] outline-none transition-colors [color-scheme:dark] hover:border-[#D4AF37]/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25"
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug} className="bg-[#061C18] text-[#EDE4D8]">
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#C2B69D]" />
              </label>

              {hasRanges && (
                <>
                  <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-[#D4AF37]/50 sm:block" />
                  <label className="relative min-w-[136px] flex-1 sm:w-[220px] sm:flex-none">
                    <span className="sr-only">Range</span>
                    <select
                      value={effectiveRange}
                      onChange={(e) => setActiveRange(e.target.value)}
                      className="h-9 w-full appearance-none truncate border border-[#D8C7B3]/25 bg-[#061C18] pl-3 pr-8 text-xs text-[#EDE4D8] outline-none transition-colors [color-scheme:dark] hover:border-[#D4AF37]/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25"
                    >
                      {categoryRanges.map((rangeName) => (
                        <option
                          key={rangeName}
                          value={rangeName}
                          className="bg-[#061C18] text-[#EDE4D8]"
                        >
                          {rangeName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#C2B69D]" />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Masthead */}
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-2 pt-10 sm:px-10 lg:px-14">
          <h1 className="text-[2.1rem] leading-[1.08] text-[#EDE4D8] sm:text-[2.9rem] lg:text-[3.4rem]">
            {categoryName}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-[#C2B69D]">
            {categoryDesc}
          </p>
        </section>

        {/* Product grid */}
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-8 sm:px-10 lg:px-14">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {filteredProducts.map((prod) => (
                <article
                  key={prod.id}
                  className="group flex flex-col rounded-[3px] bg-[#D8C5B3] shadow-[0_18px_40px_-28px_rgba(6,28,24,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E3D5C4] hover:shadow-[0_26px_54px_-26px_rgba(187,160,133,0.55)]"
                >
                  <div
                    className="relative aspect-square overflow-hidden rounded-t-[3px]"
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
                        className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>

                  <div className="flex flex-grow flex-col p-5">
                    <h3 className="font-display text-[1.15rem] leading-tight text-[#061C18]">
                      {prod.name}
                    </h3>

                    {prod.warranty && (
                      <p className="mt-1.5 text-[0.75rem] leading-snug text-[#061C18]/70">
                        {prod.warranty} warranty
                      </p>
                    )}

                    <Link
                      href={`/products/${prod.categorySlug}/${prod.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-[0.75rem] font-bold text-[#061C18] transition-colors hover:text-[#8A6A12]"
                    >
                      <span>View details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md border border-[#D8C7B3]/15 bg-[#0A2621] px-8 py-14 text-center">
              <p className="font-label text-[10px] text-[#D4AF37]">This range</p>
              <h3 className="mt-3 text-[1.15rem] text-[#EDE4D8]">No products listed yet</h3>
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
