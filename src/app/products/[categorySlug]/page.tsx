"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowUpRight, Sparkles } from "lucide-react";

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
        {/* Range subcategory navigation */}
        <section className="w-full bg-canvas py-5 sm:py-6">
          <div className="mx-auto flex max-w-[1180px] justify-center px-6 sm:px-10 lg:px-14">
            {hasRanges && (
              <nav aria-label="Product subcategories" className="flex max-w-full justify-center overflow-hidden">
                <div className="scrollbar-none inline-flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-[#CBB3A5] bg-[#D8C5B3] p-1.5 shadow-sm sm:gap-2">
                  {categoryRanges.map((rangeName) => {
                    const isActive = rangeName === effectiveRange;
                    return (
                      <button
                        key={rangeName}
                        type="button"
                        onClick={() => setActiveRange(rangeName)}
                        aria-pressed={isActive}
                        className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-heading font-bold transition-all sm:px-5 sm:py-2.5 sm:text-sm ${
                          isActive
                            ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-md shadow-[#D4AF37]/25"
                            : "text-[#252220] hover:bg-black/5 hover:text-[#8A6A12]"
                        }`}
                      >
                        {rangeName}
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>
        </section>

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
            <div className="grid grid-cols-2 justify-items-center gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {filteredProducts.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.categorySlug}/${prod.slug}`}
                  title={prod.name}
                  className="product-card group relative flex h-[21rem] w-full max-w-[17rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#C2B69D] bg-[#D8C5B3] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#BBA085]/20 isolate [transform:translateZ(0)] sm:h-[24rem] sm:max-w-[20rem]"
                >
                  <div
                    className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-t-2xl bg-[#C2B69D] p-5 sm:p-6"
                  >
                    {prod.bgImage && (
                      <Image
                        src={prod.bgImage}
                        alt=""
                        fill
                        className="rounded-t-2xl object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden="true"
                      />
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

                  <div className="relative z-10 flex items-center justify-between rounded-b-2xl bg-[#D8C5B3] px-4 py-3">
                    <span className="truncate pr-2 text-xs font-bold uppercase tracking-wider text-[#061C18]">
                      {prod.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#061C18] stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
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
