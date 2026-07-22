"use client";

import React, { useState, useEffect } from "react";

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: "/hero1.png",
    alt: "Snowcem Luxury Architectural Home Exterior",
  },
  {
    id: 2,
    image: "/hero2.png",
    alt: "Snowcem Zenita Luxury Living Room Interior",
  },
  {
    id: 3,
    image: "/hero3.png",
    alt: "Snowcem All Guard Waterproof Exterior Villa",
  },
];

interface HeroProps {
  onWatchVideoClick?: () => void;
}

export default function Hero({ onWatchVideoClick }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic carousel transition every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-white flex flex-col">
      
      {/* Classic Full-Width Edge-to-Edge Banner Image Carousel */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:h-[540px] overflow-hidden bg-slate-100">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Pure Un-obscured Photographic Banner Image */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Clean Slide Indicator Dots Centered Below Carousel (No dark bg bar or text) */}
      <div className="w-full bg-white py-4 flex items-center justify-center">
        <div className="flex items-center space-x-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full h-2.5 ${
                idx === currentIndex
                  ? "w-8 bg-gradient-to-r from-[#2a1b92] to-[#e91e63] shadow-xs"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
