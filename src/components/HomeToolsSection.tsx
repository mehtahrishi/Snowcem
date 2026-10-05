"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calculator,
  Compass,
  Palette,
  Brush,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type ToolTab = "visualizer" | "calculator" | "catalogue" | "festive";

export default function HomeToolsSection() {
  const [activeTab, setActiveTab] = useState<ToolTab>("visualizer");

  return (
    <section className="relative bg-canvas-soft bg-canvas-grid pb-8 sm:pb-10 md:pb-12 overflow-hidden">
      {/* Seamless Curvy Wave Transition: #16181B upper canvas curves down, revealing the real continuous tools grid */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-px" aria-hidden="true">
        <svg
          viewBox="0 0 1440 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,36 C1120,8 960,56 720,28 C480,0 320,64 0,32 Z"
            fill="#EDE4D8"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 md:-mt-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-8 space-y-1.5 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block leading-tight">
            Smart Painting Tools
          </h2>
          <p className="text-[#5A5148] text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Explore Snowcem&apos;s smart tools — test wall colors on room photos, calculate exact paint requirement, and browse 1,800+ shade cards.
          </p>
        </div>

        {/* Touch-Scrollable Centered Tab Bar */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#FAF7F2]/80 backdrop-blur-xs border border-[#D6C5B3] shadow-2xs max-w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap snap-x">
            {[
              { id: "visualizer" as ToolTab, label: "Colour Visualiser", icon: Compass },
              { id: "calculator" as ToolTab, label: "Paint Calculator", icon: Calculator },
              { id: "catalogue" as ToolTab, label: "Colour Catalogue", icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 font-heading shrink-0 snap-start cursor-pointer ${isActive
                    ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-md scale-[1.02]"
                    : "text-[#5A5148] hover:text-[#1E1F24] hover:bg-black/5"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#7C736A]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TOOL TAB SHOWCASE CONTAINER */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#D6C5B3] shadow-2xl overflow-hidden transition-all duration-300">

          {/* TAB 1: COLOUR VISUALISER */}
          {activeTab === "visualizer" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] flex items-center justify-center text-white shadow-md">
                    <Compass className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1F24] font-heading">
                      Colour Visualiser
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5148] font-normal leading-relaxed">
                      Upload your room photo or pick sample spaces to preview Snowcem wall colors before painting.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Upload custom room photo</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Instant wall color preview</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Accent wall combination guide</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/color-visualizer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Launch Colour Visualiser</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-[#E5DBCE] border-t lg:border-t-0 lg:border-l border-[#D6C5B3] overflow-hidden">
                <Image
                  src="/visual.png"
                  alt="Colour Visualiser Tool Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PAINT CALCULATOR */}
          {activeTab === "calculator" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] flex items-center justify-center text-white shadow-md">
                    <Calculator className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1F24] font-heading">
                      Paint Calculator
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5148] font-normal leading-relaxed">
                      Calculate paint volume (litres) and budget required for your home based on room size or carpet area.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Carpet area &amp; wall area calculator</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Pack sizes (1L, 4L, 10L, 20L)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Prevents paint wastage &amp; overspending</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/paint-calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Open Paint Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-[#E5DBCE] border-t lg:border-t-0 lg:border-l border-[#D6C5B3] overflow-hidden">
                <Image
                  src="/calculator.png"
                  alt="Paint Calculator Tool Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* TAB 3: COLOUR CATALOGUE */}
          {activeTab === "catalogue" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] flex items-center justify-center text-white shadow-md">
                    <Palette className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1F24] font-heading">
                      Colour Catalogue
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5148] font-normal leading-relaxed">
                      Browse 500+ interior and exterior shade decks with RGB, HEX codes, LRV specs, and downloadable PDF shade cards.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>500+ Interior &amp; Exterior Shades</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>RGB, HEX, &amp; LRV color values</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3B342E] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Downloadable PDF shade decks</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/color-catalogue"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Explore Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-[#E5DBCE] border-t lg:border-t-0 lg:border-l border-[#D6C5B3] overflow-hidden">
                <Image
                  src="/color-shades.png"
                  alt="Colour Catalogue Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* TAB 4: FESTIVE STUDIO (Temporarily commented out) */}
          {/*
          {activeTab === "festive" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] flex items-center justify-center text-[#ffffff] shadow-md">
                    <Brush className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#252220] font-heading">
                      Festive Studio
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C534D] font-normal leading-relaxed">
                      Digital canvas for festival art — color Ganesh Chaturthi, Diwali, Navratri, and Holi templates or paint your custom artwork.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3F3934] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Flood Fill &amp; Precision Brush Tools</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3F3934] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ganesh, Diwali &amp; Festival Art Templates</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#3F3934] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Download High-Res Branded Artwork</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/festive-studio"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Open Festive Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-[#F3ECE6] border-t lg:border-t-0 lg:border-l border-[#E2D2C7] overflow-hidden">
                <Image
                  src="/festive.png"
                  alt="Festive Studio Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}
          */}

        </div>

      </div>
    </section>
  );
}
