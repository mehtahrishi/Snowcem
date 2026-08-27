"use client";

import React from "react";
import { Sparkles, ShieldCheck, HeartHandshake, History, Award } from "lucide-react";

export default function RangonKiVirasat() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/70 to-white border-t border-slate-200/80 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Rangon Ki Virasat — The Legacy of Colors
          </h2>

          <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed px-2">
            Beyond just paint on walls, Snowcem represents six decades of trust, emotional bond, and enduring architectural beauty across Indian homes.
          </p>
        </div>

        {/* Main Content Grid — Video + Story Box */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

          {/* Left — YouTube Video Banner */}
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-slate-200/90 aspect-video group">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/FdgAkp6WUP8?list=PLCjFG8oS61HE"
                title="Snowcem Paints - Rangon Ki Virasat"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right — Story Content & Brand Pillars */}
          <div className="w-full lg:w-1/2 space-y-6">

            {/* Headline */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#f36c21] font-heading">
                Our Brand Meaning &amp; Promise
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                Har Brush Stroke Ke Peeche{" "}
                <span className="bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">
                  Ek Kahani
                </span>{" "}
                Hai.
              </h3>
            </div>

            {/* Quote Card Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-50/70 via-pink-50/40 to-amber-50/50 border border-purple-100 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Ek rishta hai jo generations se chala aa raha hai. Dada ke zamaane ke traditional havelis ho ya aaj ke minimal, modern ghar — style badalta rehta hai, lekin ek cheez constant rehti hai:{" "}
                <span className="font-bold text-slate-900">Snowcem ka bharosa.</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Yeh hai{" "}
                <span className="font-extrabold bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">
                  &apos;Rangon Ki Virasat&apos;
                </span>{" "}
                — jahan har rang ek kahani sunata hai, aur har ghar Snowcem ki virasat ka hissa banta hai.
              </p>
            </div>

            {/* 3 Brand Core Meaning Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1">
                <History className="w-5 h-5 text-[#2a1b92] mx-auto" />
                <div className="text-xs font-bold text-slate-900 font-heading">60+ Years</div>
                <div className="text-[10px] text-slate-500 font-medium">Heritage</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#5c249c] mx-auto" />
                <div className="text-xs font-bold text-slate-900 font-heading">100% Trust</div>
                <div className="text-[10px] text-slate-500 font-medium">Quality</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1">
                <HeartHandshake className="w-5 h-5 text-[#f36c21] mx-auto" />
                <div className="text-xs font-bold text-slate-900 font-heading">Generations</div>
                <div className="text-[10px] text-slate-500 font-medium">Bond</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
