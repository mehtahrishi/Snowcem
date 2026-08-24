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
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3.5 sm:px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            Smart Painting Tools Suite
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Plan, Visualize &amp; Estimate in Seconds
          </h2>
          <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed px-2">
            Everything you need for your painting project — test wall colours on room photos, calculate exact paint volume, explore 500+ shade decks, or paint on digital festive canvas.
          </p>
        </div>

        {/* Mobile-Friendly Touch-Scrollable Tab Navigation */}
        <div className="mb-6 sm:mb-10 flex justify-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-slate-100/90 border border-slate-200/80 max-w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap snap-x">
            {[
              { id: "visualizer" as ToolTab, fullLabel: "Colour Visualiser", shortLabel: "Visualiser", icon: Compass },
              { id: "calculator" as ToolTab, fullLabel: "Paint Budget Calculator", shortLabel: "Calculator", icon: Calculator },
              { id: "catalogue" as ToolTab, fullLabel: "Colour Catalogue", shortLabel: "Catalogue", icon: Palette },
              { id: "festive" as ToolTab, fullLabel: "Festive Art Studio", shortLabel: "Festive Studio", icon: Brush },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 font-heading shrink-0 snap-start ${
                    isActive
                      ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span className="hidden sm:inline">{tab.fullLabel}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CLEAN TAB CONTENT CONTAINER — LEFT: INFO & CTA, RIGHT: PUBLIC IMAGE */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300">
          
          {/* TAB 1: COLOUR VISUALISER */}
          {activeTab === "visualizer" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              {/* Left Info Panel */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                    <Compass className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Room Colour Visualiser
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Upload a photograph of your actual room or choose from our sample spaces to see Snowcem colours live on your walls before buying paint.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Upload your own room photograph</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Instant automatic wall segment painting</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Compare accent wall combinations</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/color-visualizer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Launch Room Visualiser</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Image Showcase: visual.png */}
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

          {/* TAB 2: PAINT BUDGET CALCULATOR */}
          {activeTab === "calculator" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              {/* Left Info Panel */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                    <Calculator className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Paint Volume &amp; Cost Estimator
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Accurately calculate how many litres of primer, emulsion, or exterior paint you need based on carpet area or room dimensions to prevent paint wastage.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Supports Sq.Ft &amp; Square Metres</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Wastage &amp; safety allowance calculator</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Official Snowcem pack sizes (1L, 4L, 10L, 20L)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/paint-calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Calculate My Paint</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Image Showcase: calculator.png */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
                <Image
                  src="/calculator.png"
                  alt="Paint Budget Calculator Tool Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* TAB 3: COLOUR CATALOGUE */}
          {activeTab === "catalogue" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              {/* Left Info Panel */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                    <Palette className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Colour Catalogue &amp; Shade Decks
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Explore 500+ curated architectural interior and exterior shades with instant RGB, HEX codes, LRV specifications, and PDF shade cards.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>7 Weatherproof Exterior Emulsion Decks</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>4 Luxury Interior Emulsion Decks</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Downloadable Official PDF Decks &amp; Samples</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/color-catalogue"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Browse 500+ Shade Cards</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Image Showcase: color-shades.png */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
                <Image
                  src="/color-shades.png"
                  alt="Colour Catalogue & Shade Cards Showcase"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* TAB 4: FESTIVE DIGITAL ART STUDIO */}
          {activeTab === "festive" && (
            <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch">
              {/* Left Info Panel */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                    <Brush className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      Festive Digital Art Studio
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      Interactive digital coloring studio featuring templates for Ganesh Chaturthi, Diwali, Navratri, and Holi — or paint on your custom line art sketch.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Smart Flood Fill &amp; Precision Brush Tools</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Temple Vermillion &amp; Royal Jewel Palettes</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High-Res PNG Export with branded watermark</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/ganpati-canvas"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs sm:text-sm font-extrabold font-heading shadow-md hover:opacity-95 transition-all"
                  >
                    <span>Open Festive Canvas</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Image Showcase: festive.png */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
                <Image
                  src="/festive.png"
                  alt="Festive Digital Art Studio Showcase"
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
