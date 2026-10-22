"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
            Our Signature Range
          </h2>
          <p className="mx-auto max-w-2xl text-xs font-medium leading-relaxed text-[#C2B69D] sm:text-sm md:text-base">
            Discover Snowcem's standout products, developed across interior, exterior, waterproofing and finishing needs, to bring lasting colour and protection to every space.
          </p>
        </div>

        {/* Product cards */}
        <div
          className={`grid grid-cols-1 gap-7 sm:grid-cols-2 ${featured.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
        >
          {featured.map((prod) => (
            <Link
              key={prod.id}
              href={`/products/${prod.categorySlug}/${prod.slug}`}
              className="group relative block h-72 shrink-0 overflow-hidden rounded-2xl border border-[#C2B69D] shadow-[0_16px_34px_-28px_rgba(6,28,24,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-26px_rgba(187,160,133,0.5)] sm:h-80"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
