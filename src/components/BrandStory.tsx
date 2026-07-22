"use client";

import React from "react";
import { Award, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function BrandStory() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Brand Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-br from-orange-50 via-white to-amber-50 p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl text-center flex flex-col items-center group hover:shadow-2xl transition-all duration-300">
              
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-400/20 rounded-full blur-2xl pointer-events-none"></div>

              {/* Brand Image from public/image.png */}
              <div className="relative z-10 my-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
                <img
                  src="/image.png"
                  alt="Snowcem Paints Brand Logo"
                  className="h-16 sm:h-20 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Brand Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Pioneers of Water-Proofing Since 1959</span>
              </div>

            </div>
          </div>

          {/* Right Side: Brand Story & Text */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-snowcem-orange font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>The Snowcem Legacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Transforming Indian Homes With Unmatched Protection & Vibrant Colors
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
              For over six decades, Snowcem Paints has stood as India's most trusted name in home paint solutions. Part of the renowned Mehta Group, Snowcem revolutionized exterior masonry protection with iconic waterproof cement paints and luxury acrylic emulsions.
            </p>

            <p className="text-gray-600 text-base leading-relaxed font-normal">
              Whether it’s our flagship <strong className="text-gray-900 font-bold">Sentino</strong> velvet interior coat or heavy-duty <strong className="text-gray-900 font-bold">All Guard</strong> weather shield, every drop is engineered for high durability, stain resistance, and pure color brilliance.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-snowcem-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all"
              >
                <span>Read The Snowcem Story</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100 px-4 py-3 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Eco-Care Formulation</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
