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
    image: "/carousel/jab-snowcem-lagega.jpg",
    alt: "Jab Snowcem Lagega Banner",
  },
  {
    id: 2,
    image: "/carousel/rango_ki_virasat_banner.jpeg",
    alt: "Rango Ki Virasat Snowcem Banner",
  },
  {
    id: 3,
    image: "/carousel/truecolors.png",
    alt: "Snowcem True Colors Banner",
  },
];

interface HeroProps {
  onWatchVideoClick?: (videoUrl?: string, title?: string) => void;
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
        {HERO_SLIDES.map((slide, index) => {
          const isJabSnowcem = slide.image.includes("jab-snowcem-lagega");
          const isRangoVirasat = slide.image.includes("rango_ki_virasat");
          const isVideoSlide = isJabSnowcem || isRangoVirasat;

          const videoUrl = isRangoVirasat
            ? "https://www.youtube.com/embed/videoseries?list=PLCjFG8oS61HE&autoplay=1"
            : "https://www.youtube.com/embed/-umd2knGfUo?autoplay=1&rel=0";

          const videoTitle = isRangoVirasat
            ? "Snowcem Paints | Rango Ki Virasat Playlist"
            : 'Snowcem Paints TV Commercial | "Jab Snowcem lagega..."';

          return (
            <div
              key={slide.id}
              onClick={() => {
                if (isVideoSlide && onWatchVideoClick) {
                  onWatchVideoClick(videoUrl, videoTitle);
                }
              }}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              } ${isVideoSlide ? "cursor-pointer group" : ""}`}
            >
              {/* Pure Un-obscured Photographic Banner Image */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
              />

              {/* Interactive Hover Play Badge for Video Slides */}
              {isVideoSlide && (
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
                  ? "w-8 bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange shadow-xs"
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
