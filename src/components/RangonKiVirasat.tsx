import React from "react";
import { Sparkles } from "lucide-react";

export default function RangonKiVirasat() {
  return (
    <section className="pt-8 pb-16 bg-gradient-to-b from-white via-slate-50/60 to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Label */}
        <div className="mb-10 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3.5 py-1.5 rounded-full shadow-2xs inline-flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            Brand Meaning
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left — YouTube Video */}
          <div className="w-full lg:w-1/2 shrink-0">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/FdgAkp6WUP8?list=PLCjFG8oS61HE"
                title="Snowcem Paints- Rangon Ki Virasat"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right — Text Content */}
          <div className="w-full lg:w-1/2 space-y-5">

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Har Brush Stroke Ke{" "}
              <span className="bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">
                Peeche Ek Kahani
              </span>{" "}
              Hai.
            </h2>

            {/* Subheading */}
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#5c249c] font-heading">
              "Rangon Ki Virasat"
            </p>

            {/* Body paragraphs */}
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Ek rishta hai jo generations se chala aa raha hai. Dada ke zamaane ke traditional havelis ho ya aaj ke minimal, modern ghar — style badalta rehta hai, lekin ek cheez constant rehti hai:{" "}
                <span className="font-semibold text-slate-900">Snowcem ka bharosa.</span>
              </p>
              <p>
                Kisi ke ghar ki pehli painting, kisi ke naye office ka pehla coat, kisi virasat ka agla adhyaay — Snowcem ne har generation ke saath apna colour palette badla hai, par apna vaada nahi:{" "}
                <span className="font-semibold text-slate-900">quality, durability aur trust jo sirf Snowcem deta hai.</span>
              </p>
              <p>
                Yeh hai{" "}
                <span className="font-extrabold bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">
                  'Rangon Ki Virasat'
                </span>{" "}
                — jahan har rang ek kahani sunata hai, aur har ghar Snowcem ki virasat ka hissa banta hai.
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-gradient-to-r from-[#e91e63] to-transparent opacity-30" />
              <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-slate-400">
                Since 1959
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#2a1b92] to-transparent opacity-30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
