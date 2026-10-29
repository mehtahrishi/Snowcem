"use client";

import React from "react";
import { Sparkles, ShieldCheck, HeartHandshake, History, Award } from "lucide-react";

export default function RangonKiVirasat() {
  return (
    <section className="pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 bg-canvas-deep w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 space-y-2">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-extrabold tracking-tight font-heading text-white inline-block sm:whitespace-nowrap leading-tight">
            Rangon Ki Virasat: The Legacy of Colors
          </h2>

          <p className="text-[#D8C5B3] text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Beyond just paint on walls, Snowcem represents six decades of trust, emotional bond, and enduring architectural beauty across Indian homes.
          </p>
        </div>

        {/* Main Content Grid — Video + Story Box */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">

          {/* Left — YouTube Video Banner */}
          <div className="min-w-0 w-full">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-[#BFAC97] aspect-video group">
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
          <div className="min-w-0 w-full space-y-6">

            {/* Headline */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#EDE4D8] tracking-tight font-heading leading-tight">
                Har Brush Stroke Ke Peeche{" "}
                <span className="text-[#D4AF37]">
                  Ek Kahani
                </span>{" "}
                Hai.
              </h3>
            </div>

            <div className="text-[#D8C5B3]">
              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed font-normal">
                  Ek rishta hai jo generations se chala aa raha hai. Dada ke zamaane ke traditional havelis ho ya aaj ke minimal, modern ghar — style badalta rehta hai, lekin ek cheez constant rehti hai:{" "}
                  <span className="font-bold text-white">Snowcem ka bharosa.</span>
                </p>
                <p className="text-base sm:text-lg leading-relaxed font-normal">
                  Yeh hai{" "}
                  <span className="font-extrabold text-white">
                    &apos;Rangon Ki Virasat&apos;
                  </span>{" "}
                  — jahan har rang ek kahani sunata hai, aur har ghar Snowcem ki virasat ka hissa banta hai.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[#D4AF37] sm:gap-4">
                <div className="min-w-0 space-y-1">
                  <History aria-hidden="true" className="mx-auto mb-3 h-7 w-7" strokeWidth={1.75} />
                  <div className="whitespace-nowrap text-[11px] font-bold tracking-tight sm:text-sm">60+ Years</div>
                  <div className="text-[11px] font-medium text-[#C2B69D] sm:text-xs">Heritage</div>
                </div>

                <div className="min-w-0 space-y-1">
                  <ShieldCheck aria-hidden="true" className="mx-auto mb-3 h-7 w-7" strokeWidth={1.75} />
                  <div className="whitespace-nowrap text-[11px] font-bold tracking-tight sm:text-sm">100% Trust</div>
                  <div className="text-[11px] font-medium text-[#C2B69D] sm:text-xs">Quality</div>
                </div>

                <div className="min-w-0 space-y-1">
                  <HeartHandshake aria-hidden="true" className="mx-auto mb-3 h-7 w-7" strokeWidth={1.75} />
                  <div className="whitespace-nowrap text-[11px] font-bold tracking-tight sm:text-sm">Generations</div>
                  <div className="text-[11px] font-medium text-[#C2B69D] sm:text-xs">Bond</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
