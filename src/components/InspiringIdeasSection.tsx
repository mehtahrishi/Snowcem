"use client";

import React from "react";
import Link from "next/link";
import { INSPIRING_IDEAS_VIDEOS } from "@/data/inspiringIdeasData";
import { Sparkles, ArrowRight } from "lucide-react";

export default function InspiringIdeasSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f36c21]/10 text-[#f36c21] text-xs font-extrabold uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Transformations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave">
              Inspiring Ideas For You
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Explore breathtaking home makeovers, stunning exterior elevations, and designer interior shade combinations crafted with Snowcem Paints.
            </p>
          </div>

          <Link
            href="/products/interior-paints"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#2a1b92] hover:text-[#e91e63] transition-colors group self-start sm:self-auto shrink-0 font-heading bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-full"
          >
            <span>Explore Shade Range</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
          {INSPIRING_IDEAS_VIDEOS.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="group relative bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 transition-all duration-300 transform hover:-translate-y-1"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block rounded-2xl sm:rounded-3xl pointer-events-none group-hover:scale-105 transition-transform duration-500"
              >
                <source src={item.videoUrl} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              
              {/* Subtle glass reflection & dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
                <span className="text-white text-xs sm:text-sm font-bold font-heading drop-shadow-md">
                  Snowcem Makeover #{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
