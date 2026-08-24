"use client";

import React from "react";

interface HeroProps {
  onWatchVideoClick?: (videoUrl?: string, title?: string) => void;
  bannerSrc?: string;
  bannerAlt?: string;
}

export default function Hero({ bannerSrc, bannerAlt = "Snowcem Banner Placeholder" }: HeroProps) {
  return (
    <section className="relative w-full bg-slate-50 flex flex-col">
      {/* Banner Container with Recommended Dimensions (1920x600 px / 21:9 Aspect Ratio) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:h-[500px] xl:h-[560px] overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 border-b border-slate-200 flex items-center justify-center">
        {bannerSrc ? (
          <img
            src={bannerSrc}
            alt={bannerAlt}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none relative group">
            {/* Subtle background decorative grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px]" 
              aria-hidden="true" 
            />

            {/* Inner Content Card */}
            <div className="relative z-10 flex flex-col items-center max-w-xl p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm">
              {/* Photo / Banner Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#2a1b92]/10 via-[#e91e63]/10 to-[#ff9800]/10 border border-slate-300/60 flex items-center justify-center mb-4 shadow-inner">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Title & Dimension Specifications */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Hero Banner Placeholder
              </h2>
              
              <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white font-mono text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
                <span>1920 × 600 px</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-300 font-normal">Aspect Ratio 21:9 or 16:9</span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
                Recommended upload dimensions: <strong>1920 × 600 px</strong> (Desktop) and <strong>1080 × 600 px</strong> (Mobile safe zone).
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

