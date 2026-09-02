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
    <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-white via-slate-50/70 to-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Experience the True Colours of Life
          </h2>
          <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed px-2">
            Explore Snowcem&apos;s smart tools — test wall colors on room photos, calculate exact paint requirement, browse 1,800+ shade cards, or paint on digital festive art canvas.
          </p>
        </div>

        {/* Touch-Scrollable Centered Tab Bar */}
        <div className="mb-6 sm:mb-10 flex justify-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-slate-100/90 border border-slate-200/80 max-w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap snap-x">
            {[
              { id: "visualizer" as ToolTab, label: "Colour Visualiser", icon: Compass },
              { id: "calculator" as ToolTab, label: "Paint Calculator", icon: Calculator },
              { id: "catalogue" as ToolTab, label: "Colour Catalogue", icon: Palette },
              { id: "festive" as ToolTab, label: "Festive Studio", icon: Brush },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 font-heading shrink-0 snap-start ${
                    isActive
                      ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TOOL TAB SHOWCASE CONTAINER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300">
          
          {/* TAB 1: COLOUR VISUALISER */}
          {activeTab === "visualizer" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                    <Compass className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Colour Visualiser
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Upload your room photo or pick sample spaces to preview Snowcem wall colors before painting.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Upload custom room photo</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Instant wall color preview</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Accent wall combination guide</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/color-visualizer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Launch Colour Visualiser</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
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
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                    <Calculator className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Paint Calculator
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Calculate paint volume (litres) and budget required for your home based on room size or carpet area.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Carpet area &amp; wall area calculator</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Pack sizes (1L, 4L, 10L, 20L)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Prevents paint wastage &amp; overspending</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/paint-calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Open Paint Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
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
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                    <Palette className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Colour Catalogue
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Browse 500+ interior and exterior shade decks with RGB, HEX codes, LRV specs, and downloadable PDF shade cards.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>500+ Interior &amp; Exterior Shades</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>RGB, HEX, &amp; LRV color values</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Downloadable PDF shade decks</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/color-catalogue"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Browse Colour Catalogue</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
                <Image
                  src="/color-shades.png"
                  alt="Colour Catalogue Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* TAB 4: FESTIVE STUDIO */}
          {activeTab === "festive" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-[#ffffff] shadow-md">
                    <Brush className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Festive Studio
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Digital canvas for festival art — color Ganesh Chaturthi, Diwali, Navratri, and Holi templates or paint your custom artwork.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Flood Fill &amp; Precision Brush Tools</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ganesh, Diwali &amp; Festival Art Templates</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Download High-Res Branded Artwork</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/festive-studio"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Open Festive Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
                <Image
                  src="/festive.png"
                  alt="Festive Studio Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
