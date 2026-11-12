"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FeaturedSlide {
  id: string;
  src: string;
  alt: string;
  href: string;
}

// Seconds each image takes to scroll past — higher = slower train.
const SECONDS_PER_SLIDE = 9;

export default function FeaturedProductsCarousel() {
  const [slides, setSlides] = useState<FeaturedSlide[]>([]);

  useEffect(() => {
    fetch("/api/featured-products")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.items) && d.items.length > 0) {
          setSlides(d.items);
        }
      })
      .catch(() => {});
  }, []);

  // Two identical copies so translating by -50% loops seamlessly.
  const track = [...slides, ...slides];

  return (
    <section className="w-full overflow-hidden bg-[#061C18] pt-10 pb-14 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto mb-7 max-w-3xl space-y-2 px-8 text-center sm:mb-9">
        <h2 className="inline-block text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Explore Our Best
        </h2>
        <p className="mx-auto max-w-2xl text-xs font-medium leading-relaxed text-[#C2B69D] sm:text-sm md:text-base">
          Discover Snowcem products made to bring lasting colour and protection to every space.
        </p>
      </div>

      {slides.length > 0 && (
        <div className="relative w-full overflow-hidden" aria-label="Explore our products">
          <div
            className="flex w-max hover:[animation-play-state:paused] motion-reduce:!animate-none"
            style={{ animation: `marquee ${slides.length * SECONDS_PER_SLIDE}s linear infinite` }}
          >
            {track.map((slide, idx) => (
              // pr (not gap) keeps both halves equal width so the -50% loop has no jump
              <div key={`${slide.id}-${idx}`} className="shrink-0 pr-2 sm:pr-3">
                <Link
                  href={slide.href}
                  aria-label={`View ${slide.alt}`}
                  aria-hidden={idx >= slides.length ? true : undefined}
                  tabIndex={idx >= slides.length ? -1 : undefined}
                  className="relative block aspect-[1386/1135] h-[240px] overflow-hidden sm:h-[320px] md:h-[380px]"
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 470px"
                    className="object-cover"
                    draggable={false}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
