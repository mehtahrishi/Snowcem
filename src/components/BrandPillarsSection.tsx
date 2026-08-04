"use client";

import React from "react";
import { Award, Leaf, Compass, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function BrandPillarsSection() {
  const pillars = [
    {
      id: "legacy",
      icon: Award,
      badge: "60+ Years Trust",
      title: "6+ Decades of Colouring Lives",
      subtitle: "With Snowcem Paints",
      description: "Pioneering waterproof cement paints and premium emulsions across India since 1959. Built on generations of durability, heritage, and architectural excellence.",
      gradient: "from-[#2a1b92] via-[#5c249c] to-[#e91e63]",
      accentBg: "bg-purple-50",
      accentBorder: "border-purple-100",
      iconColor: "text-[#5c249c]",
    },
    {
      id: "eco",
      icon: Leaf,
      badge: "Non-Toxic & Safe",
      title: "Lead, Mercury, and Chromium-Free",
      subtitle: "Eco-Friendly Paints",
      description: "Engineered with zero toxic heavy metals and low-VOC formulations, ensuring healthy indoor air quality and eco-safe protection for your family and home.",
      gradient: "from-emerald-600 via-[#5c249c] to-[#2a1b92]",
      accentBg: "bg-emerald-50",
      accentBorder: "border-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "services",
      icon: Compass,
      badge: "End-to-End Support",
      title: "360° Range of Services",
      subtitle: "Inspections, Budgeting & Testing",
      description: "From site inspections and interactive paint budget calculators to sample application testing, our team supports you every step of the way.",
      gradient: "from-[#f36c21] via-[#e91e63] to-[#5c249c]",
      accentBg: "bg-orange-50",
      accentBorder: "border-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3.5 py-1.5 rounded-full shadow-2xs inline-flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            Why Choose Snowcem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            The Snowcem Commitment
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Combining six decades of heritage with eco-friendly innovation and 360° painting solutions for every space.
          </p>
        </div>

        {/* 3 Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Color Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient}`} />

                <div className="space-y-5">
                  {/* Icon Stage */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${item.accentBg} ${item.accentBorder} border flex items-center justify-center ${item.iconColor} shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="text-[10px] font-heading font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight font-heading leading-snug group-hover:bg-gradient-to-r group-hover:from-[#2a1b92] group-hover:via-[#5c249c] group-hover:to-[#e91e63] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-purple-700 font-heading uppercase tracking-wide">
                      {item.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
