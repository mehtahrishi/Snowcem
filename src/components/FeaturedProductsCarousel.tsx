"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FEATURED_IMAGES = [
  { src: "/featured/easy2wash.png", alt: "Easy 2 Wash", href: "/products/interior-emulsion-paints/sentino-easy-2-wash" },
  { src: "/featured/pentasiadustguard.png", alt: "Pentasia Dust Guard", href: "/products/exterior-emulsion-paints/pentasia-dust-guard" },
  { src: "/featured/snowcoatpro.png", alt: "Snowcoat Pro", href: "/products/interior-emulsion-paints/snowcoat-pro" },
  { src: "/featured/unigloss-18.png", alt: "Uni-Glosss 18", href: "/products/exterior-emulsion-paints/uni-glosss-18" },
  { src: "/featured/weatherprotek-shine.png", alt: "Weatherprotek Shine", href: "/products/exterior-emulsion-paints/snowcryl-shine" },
  { src: "/featured/zenita.png", alt: "Zenita", href: "/products/interior-emulsion-paints/zenita" },
];

export default function FeaturedProductsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + FEATURED_IMAGES.length) % FEATURED_IMAGES.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % FEATURED_IMAGES.length);
  };

  useEffect(() => {
    const timer = window.setInterval(showNext, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="w-full overflow-hidden bg-[#061C18] pt-10 pb-14 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-3xl space-y-2 px-4 text-center sm:mb-9">
          <h2 className="inline-block text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Explore Our Best
          </h2>
          <p className="mx-auto max-w-2xl text-xs font-medium leading-relaxed text-[#C2B69D] sm:text-sm md:text-base">
            Discover Snowcem products made to bring lasting colour and protection to every space.
          </p>
        </div>

        <div className="relative mx-auto h-[240px] w-full max-w-4xl sm:h-[320px] md:h-[380px]" aria-roledescription="carousel" aria-label="Explore our products">
          <Link
            key={FEATURED_IMAGES[activeIndex].src}
            href={FEATURED_IMAGES[activeIndex].href}
            aria-label={`View ${FEATURED_IMAGES[activeIndex].alt}`}
            className="carousel-image-enter block h-full w-full"
          >
            <img
              src={FEATURED_IMAGES[activeIndex].src}
              alt={FEATURED_IMAGES[activeIndex].alt}
              className="h-full w-full object-contain transition-opacity duration-500"
            />
          </Link>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous product"
            className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-black/70 sm:left-2 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next product"
            className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-black/70 sm:right-2 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2" aria-label="Choose product">
          {FEATURED_IMAGES.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${image.alt}`}
              aria-current={index === activeIndex}
              className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-7 bg-[#D4AF37]" : "w-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
