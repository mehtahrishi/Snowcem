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

          <p className="text-[#C2B69D] text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Beyond just paint on walls, Snowcem represents six decades of trust, emotional bond, and enduring architectural beauty across Indian homes.
          </p>
        </div>

        {/* Main Content Grid — Video + Story Box */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

          {/* Left — YouTube Video Banner */}
          <div className="w-full lg:w-1/2 shrink-0">
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
          <div className="w-full lg:w-1/2 space-y-6">

            {/* Headline */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C2B69D] font-label">
                Our Brand Meaning &amp; Promise
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#EDE4D8] tracking-tight font-heading leading-tight">
                Har Brush Stroke Ke Peeche{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] bg-clip-text text-transparent">
                  Ek Kahani
                </span>{" "}
                Hai.
              </h3>
            </div>

            {/* Quote Card Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#D8C5B3] border border-[#C2B69D] space-y-3">
              <p className="text-xs sm:text-sm text-[#061C18]/75 leading-relaxed font-normal">
                Ek rishta hai jo generations se chala aa raha hai. Dada ke zamaane ke traditional havelis ho ya aaj ke minimal, modern ghar — style badalta rehta hai, lekin ek cheez constant rehti hai:{" "}
                <span className="font-bold text-[#061C18]">Snowcem ka bharosa.</span>
              </p>
              <p className="text-xs sm:text-sm text-[#061C18]/75 leading-relaxed font-normal">
                Yeh hai{" "}
                <span className="font-extrabold text-[#061C18]">
                  &apos;Rangon Ki Virasat&apos;
                </span>{" "}
                — jahan har rang ek kahani sunata hai, aur har ghar Snowcem ki virasat ka hissa banta hai.
              </p>
            </div>

            {/* 3 Brand Core Meaning Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#D8C5B3] border border-[#C2B69D] text-center space-y-1">
                <History className="w-5 h-5 text-[#D4AF37] mx-auto" />
                <div className="text-xs font-bold text-[#061C18] font-heading">60+ Years</div>
                <div className="text-[10px] text-[#061C18]/60 font-medium">Heritage</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#D8C5B3] border border-[#C2B69D] text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] mx-auto" />
                <div className="text-xs font-bold text-[#061C18] font-heading">100% Trust</div>
                <div className="text-[10px] text-[#061C18]/60 font-medium">Quality</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#D8C5B3] border border-[#C2B69D] text-center space-y-1">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37] mx-auto" />
                <div className="text-xs font-bold text-[#061C18] font-heading">Generations</div>
                <div className="text-[10px] text-[#061C18]/60 font-medium">Bond</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
