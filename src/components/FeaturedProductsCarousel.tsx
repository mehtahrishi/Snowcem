"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PRODUCTS_DATA, ProductData } from "@/data/productsData";

const FEATURED_SLUGS = [
  "sentino-easy-2-wash",
  "uni-glosss-18",
  "zenita-velvet-finish",
];

export default function FeaturedProductsCarousel() {
  const featured = FEATURED_SLUGS.map(
    (slug) => PRODUCTS_DATA.find((p) => p.slug === slug)
  ).filter((p): p is ProductData => Boolean(p));

  if (featured.length === 0) return null;

  return (
    <section className="w-full bg-[#061C18] pt-10 pb-14 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-9 max-w-3xl space-y-2 px-4 text-center sm:mb-11">
          <h2 className="inline-block text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Featured Products
          </h2>
          <p className="mx-auto max-w-2xl text-xs font-medium leading-relaxed text-[#C2B69D] sm:text-sm md:text-base">
            Discover Snowcem&apos;s trusted range of interior, exterior, waterproofing, and
            finishing solutions, made to bring lasting colour and protection to every space.
          </p>
        </div>

        {/* Product cards */}
        <div
          className={`grid grid-cols-1 gap-7 sm:grid-cols-2 ${
            featured.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {featured.map((prod) => (
            <article
              key={prod.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#C2B69D] bg-[#D8C5B3] shadow-[0_16px_34px_-28px_rgba(6,28,24,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-26px_rgba(187,160,133,0.5)]"
            >
              {/* Packshot stage */}
              <div
                className="relative h-64 shrink-0 overflow-hidden"
                style={{
                  background: prod.stageBg
                    ? `linear-gradient(165deg, #D8C5B3 0%, ${prod.stageBg}55 100%)`
                    : "#C2B69D",
                }}
              >
                {prod.image && (
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-7 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
              </div>

              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <p className="font-label text-[9px] text-[#061C18]/50">
                  {prod.categoryName}
                </p>

                <h3 className="mt-2 font-display text-[1.35rem] leading-tight text-[#061C18]">
                  {prod.name}
                </h3>

                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                  <Link
                    href={`/products/${prod.categorySlug}/${prod.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#061C18]"
                  >
                    <span>View details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  {prod.warranty && (
                    <span className="font-label text-[10px] text-[#061C18]/55">
                      {prod.warranty}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
