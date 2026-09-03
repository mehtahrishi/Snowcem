"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroSlide {
  id: string;
  type: "video" | "image";
  src: string;
  alt?: string;
  title?: string;
}

interface HeroProps {
  slides?: HeroSlide[];
  onWatchVideoClick?: (videoUrl?: string, title?: string) => void;
  bannerSrc?: string;
  bannerAlt?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "hero-video",
    type: "video",
    src: "/video-banner.mp4",
    alt: "Snowcem Paints - Video Banner",
  },
  {
    id: "hero-uni-gloss",
    type: "image",
    src: "/banner.png",
    alt: "Snowcem UNI-GLOSSS - One paint rules them all",
  },
  {
    id: "hero-rangon",
    type: "image",
    src: "/rangon.png",
    alt: "Rangon Ki Virasat Stories - Built by Snowcem",
  },
];

export default function Hero({
  slides = DEFAULT_SLIDES,
  onWatchVideoClick,
  bannerSrc,
  bannerAlt,
}: HeroProps) {
  // If specific bannerSrc is passed as custom override, assemble slides
  const activeSlides = bannerSrc
    ? [
        { id: "hero-video", type: "video" as const, src: "/video-banner.mp4", alt: "Snowcem Video Banner" },
        { id: "hero-image", type: "image" as const, src: bannerSrc, alt: bannerAlt || "Snowcem Banner" },
        { id: "hero-rangon", type: "image" as const, src: "/rangon.png", alt: "Rangon Ki Virasat Stories" },
      ]
    : slides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  // Handle slide transitions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Play video when on video slide, pause when switched away
  useEffect(() => {
    if (currentSlide.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentIndex, currentSlide.type]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section className="relative w-full bg-slate-900 flex flex-col select-none overflow-hidden group">
      {/* Banner Display Stage */}
      <div
        className="relative w-full aspect-[1920/600] overflow-hidden bg-slate-950 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slide.type === "video" ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={isActive ? videoRef : null}
                    src={slide.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                  <img
                    src={slide.src}
                    alt={slide.alt || "Snowcem Banner"}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Previous Arrow Navigation Button */}
        {activeSlides.length > 1 && (
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md transition-all duration-200 border border-white/20 shadow-lg hover:scale-110 opacity-70 sm:opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Next Arrow Navigation Button */}
        {activeSlides.length > 1 && (
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md transition-all duration-200 border border-white/20 shadow-lg hover:scale-110 opacity-70 sm:opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Carousel Indicator Dots / Pills */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-md">
            {activeSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-5 sm:w-8 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] shadow-xs"
                      : "w-1.5 sm:w-2.5 bg-white/50 hover:bg-white/90"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

