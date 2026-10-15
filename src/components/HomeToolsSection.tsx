"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Calculator, Palette } from "lucide-react";

interface ToolCardItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  href: string;
  actionText: string;
}

const TOOLS_DATA: ToolCardItem[] = [
  {
    id: "visualizer",
    title: "Colour Visualiser",
    badge: "AI Powered",
    description: "Upload your room photo or pick sample spaces to preview Snowcem wall colors and accents before painting.",
    image: "/visual.png",
    href: "/color-visualizer",
    actionText: "Launch Visualiser",
  },
  {
    id: "calculator",
    title: "Paint Budget Calculator",
    badge: "Instant Estimate",
    description: "Get an accurate estimate of paint volume in litres, primer, wall putty, and budget in just 2 simple steps.",
    image: "/calculator.png",
    href: "/paint-calculator",
    actionText: "Open Calculator",
  },
  {
    id: "catalogue",
    title: "Colour Catalogue",
    badge: "1,800+ Shades",
    description: "Browse 1,800+ curated shade formulations organized by architectural room genres, moods, and lighting performance.",
    image: "/color-shades.png",
    href: "/color-catalogue",
    actionText: "Explore Catalogue",
  },
];

const TABS = [
  { id: "visualizer", label: "Colour Visualiser", icon: Compass },
  { id: "calculator", label: "Paint Calculator", icon: Calculator },
  { id: "catalogue", label: "Colour Catalogue", icon: Palette },
];

export default function HomeToolsSection() {
  const [activeTab, setActiveTab] = useState<string>("visualizer");

  const displayedTools = TOOLS_DATA.filter((tool) => tool.id === activeTab);

  return (
    <section className="relative bg-canvas-soft pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Seamless Curvy Wave Transition */}
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
            fill="#061C18"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 md:-mt-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block leading-tight">
            Smart Painting Tools
          </h2>
          <p className="text-[#C2B69D] text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Explore Snowcem&apos;s smart tools — test wall colors on room photos, calculate exact paint requirement, and browse 1,800+ shade cards.
          </p>
        </div>

        {/* Tab Navbar Selector */}
        <div className="mb-8 sm:mb-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Smart painting tools navigation"
            className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#0A2621] border border-[#D8C7B3]/40 shadow-sm max-w-full overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap snap-x"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 font-heading shrink-0 snap-start cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-md scale-[1.02]"
                      : "text-[#C2B69D] hover:text-[#EDE4D8] hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#061C18]" : "text-[#C2B69D]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Smart Painting Tools Card (Rectangular: Image on Top, Title + Desc below, Right Arrow) */}
        <div className="max-w-2xl mx-auto transition-all duration-300">
          {displayedTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group flex flex-col bg-[#0A2621] rounded-3xl overflow-hidden border border-[#D8C7B3]/30 hover:border-[#D4AF37] shadow-xl hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer focus:outline-none"
            >
              {/* Top Area: Image */}
              <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden bg-[#041411]">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold font-heading uppercase tracking-wider bg-[#061C18]/85 text-[#D4AF37] border border-[#D8C7B3]/40 backdrop-blur-md shadow-xs">
                    {tool.badge}
                  </span>
                </div>
              </div>

              {/* Below Area: Tool Name, Description & Right Arrow */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-5">
                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#EDE4D8] group-hover:text-[#D4AF37] transition-colors font-heading tracking-tight leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C2B69D] leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Row: Tool Action Text & Right Arrow Button */}
                <div className="pt-3 flex items-center justify-between border-t border-[#D8C7B3]/20">
                  <span className="text-xs sm:text-sm font-bold text-[#EDE4D8] group-hover:text-[#D4AF37] transition-colors font-heading">
                    {tool.actionText}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#061C18] border border-[#D8C7B3]/40 text-[#EDE4D8] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#C59B27] group-hover:text-[#061C18] group-hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-md group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
