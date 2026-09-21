"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Eye,
  ArrowUpRight,
} from "lucide-react";

export interface ColorShade {
  role: "Base (60%)" | "Accent (30%)" | "Trim (10%)";
  usage: string;
  name: string;
  shadeCode: string;
  hex: string;
  finish: string;
}

export interface TrendyColorSet {
  id: string;
  number: string;
  title: string;
  theme: string;
  bestFor: string;
  description: string;
  shades: [ColorShade, ColorShade, ColorShade]; // Exactly 3 colors
}

export const FIVE_TRENDY_COLOR_SETS: TrendyColorSet[] = [
  {
    id: "nature-wellness",
    number: "01",
    title: "Nature & Wellness",
    theme: "Biophilic Earth & Daylight Balance",
    bestFor: "Living Rooms, Bedrooms & Garden Facing Walls",
    description:
      "Inspired by organic foliage and morning mist. Diffuses daylight evenly, reduces eye strain, and infuses restorative tranquility throughout the home.",
    shades: [
      {
        role: "Base (60%)",
        usage: "Main Walls & Ceilings",
        name: "Almond Pearl",
        shadeCode: "SC-1028",
        hex: "#F4EFE6",
        finish: "Velvet Matte",
      },
      {
        role: "Accent (30%)",
        usage: "Feature & TV Unit Wall",
        name: "Earthy Sage",
        shadeCode: "SC-7124",
        hex: "#72866D",
        finish: "Luxury Emulsion",
      },
      {
        role: "Trim (10%)",
        usage: "Cornices, Doors & Trims",
        name: "Mineral Slate",
        shadeCode: "SC-8402",
        hex: "#586266",
        finish: "Satin Lustre",
      },
    ],
  },
  {
    id: "warm-minimalism",
    number: "02",
    title: "Warm Minimalism",
    theme: "Earthy Terracotta & Dune Sands",
    bestFor: "Dining Rooms, Kitchen Niches & Courtyards",
    description:
      "Rooted in baked Indian clay and desert sands. Creates an inviting, sunlit atmosphere that pairs effortlessly with natural timber and brass accents.",
    shades: [
      {
        role: "Base (60%)",
        usage: "Primary Living Walls",
        name: "Dune Sand",
        shadeCode: "SC-2041",
        hex: "#D9CEBE",
        finish: "Soft Sheen",
      },
      {
        role: "Accent (30%)",
        usage: "Accent Dining Wall",
        name: "Baked Terracotta",
        shadeCode: "SC-3219",
        hex: "#C26A53",
        finish: "Luxury Emulsion",
      },
      {
        role: "Trim (10%)",
        usage: "Pillars & Window Borders",
        name: "Espresso Umber",
        shadeCode: "SC-9114",
        hex: "#3A3230",
        finish: "Eggshell Enamel",
      },
    ],
  },
  {
    id: "indigo-serenity",
    number: "03",
    title: "Indigo Serenity",
    theme: "Rhythm of Blues & Modern Luxury",
    bestFor: "Master Suites, Study Libraries & Exterior Accents",
    description:
      "A meditative, timeless indigo symphony celebrating deep oceanic depth. Accented with crisp white architecture for commanding modern luxury.",
    shades: [
      {
        role: "Base (60%)",
        usage: "Spacious Ambient Walls",
        name: "Mellow Mist",
        shadeCode: "SC-5021",
        hex: "#BDCAD4",
        finish: "Silk Sheen",
      },
      {
        role: "Accent (30%)",
        usage: "Master Bedroom Headboard",
        name: "Heritage Indigo",
        shadeCode: "SC-9042",
        hex: "#21334E",
        finish: "Velvet Emulsion",
      },
      {
        role: "Trim (10%)",
        usage: "Ceiling & Architraves",
        name: "Snow Alabaster",
        shadeCode: "SC-1002",
        hex: "#FAF8F5",
        finish: "High-Gloss Lustre",
      },
    ],
  },
  {
    id: "architectural-greige",
    number: "04",
    title: "Architectural Greige",
    theme: "Modern Stone & Urban Contemporary",
    bestFor: "Open-Plan Living, Modern Facades & Foyers",
    description:
      "A balanced stone palette pairing warm greiges with bold basalt darks. Designed to highlight high ceilings and minimalist modern structural geometry.",
    shades: [
      {
        role: "Base (60%)",
        usage: "General Circulation Walls",
        name: "Urban Greige",
        shadeCode: "SC-4015",
        hex: "#CDC6B8",
        finish: "Matte Emulsion",
      },
      {
        role: "Accent (30%)",
        usage: "Staircase & Architectural Niche",
        name: "Basalt Charcoal",
        shadeCode: "SC-8209",
        hex: "#43484C",
        finish: "Low Sheen Emulsion",
      },
      {
        role: "Trim (10%)",
        usage: "Baseboards & Door Frames",
        name: "Pure Chalk",
        shadeCode: "SC-1010",
        hex: "#F8F7F3",
        finish: "Smooth Satin",
      },
    ],
  },
  {
    id: "sunlit-heritage",
    number: "05",
    title: "Sunlit Heritage",
    theme: "Jaipur Ochre & Warm Royal Ivory",
    bestFor: "Verandas, Pooja Spaces & Heritage Facades",
    description:
      "Captures the eternal radiance of Indian golden hour. Harmonizes warm marigold-ochre with creamy ivory and deeply polished dark woods.",
    shades: [
      {
        role: "Base (60%)",
        usage: "Welcoming Hallways & Facades",
        name: "Royal Ivory",
        shadeCode: "SC-2009",
        hex: "#F5EEDB",
        finish: "All-Weather Sheen",
      },
      {
        role: "Accent (30%)",
        usage: "Temple Alcove & Courtyard Wall",
        name: "Sunlit Ochre",
        shadeCode: "SC-3088",
        hex: "#D69342",
        finish: "Luxury Velvet",
      },
      {
        role: "Trim (10%)",
        usage: "Wooden Rafters & Balustrades",
        name: "Carved Teak",
        shadeCode: "SC-9240",
        hex: "#583928",
        finish: "Protective Polyurethane",
      },
    ],
  },
];

export default function TrendyColoursDeck() {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [activeCardInSet, setActiveCardInSet] = useState(1); // Default to Accent card in center
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Swipe detection
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const sets = FIVE_TRENDY_COLOR_SETS;
  const totalSets = sets.length;
  const currentSet = sets[activeSetIndex];

  const nextSet = useCallback(() => {
    setActiveSetIndex((prev) => (prev + 1) % totalSets);
  }, [totalSets]);

  const prevSet = useCallback(() => {
    setActiveSetIndex((prev) => (prev - 1 + totalSets) % totalSets);
  }, [totalSets]);

  // Copy HEX code
  const handleCopyHex = (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Keyboard navigation for sets
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSet();
      } else if (e.key === "ArrowRight") {
        nextSet();
      }
    },
    [prevSet, nextSet]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setTouchDeltaX(0);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diffX = e.touches[0].clientX - touchStartX;
    const diffY = e.touches[0].clientY - touchStartY;
    if (!isSwiping && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      setIsSwiping(true);
    }
    if (isSwiping) {
      setTouchDeltaX(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      if (touchDeltaX < -45) nextSet();
      else if (touchDeltaX > 45) prevSet();
    }
    setTouchDeltaX(0);
    setIsSwiping(false);
  };

  return (
    <section
      className="w-full bg-[#DDC7BB] py-14 sm:py-18 md:py-22 border-b border-stone-200/60 overflow-hidden relative select-none"
      aria-label="5 Trendy 3-Colour Palettes for Your House"
    >
      {/* Dynamic Ambient Background Glow matched to the active set's accent color */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700 opacity-5"
        style={{ backgroundColor: currentSet.shades[1].hex }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            5 Trendy 3-Colour Palettes for Your House
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Curated by Snowcem colour architects based on the golden 60-30-10 rule.
            Explore five trending trios of harmonized paint shades for your home.
          </p>
        </div>

        {/* DECKED CAROUSEL: 3 Stacked Color Cards with Left & Right Navigation Arrows */}
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center">
          {/* Left Navigation Arrow Button */}
          <button
            type="button"
            onClick={prevSet}
            aria-label="Previous trendy palette"
            className="absolute -left-2 sm:left-0 md:-left-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-lg flex items-center justify-center focus:outline-none transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 stroke-current -translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Navigation Arrow Button */}
          <button
            type="button"
            onClick={nextSet}
            aria-label="Next trendy palette"
            className="absolute -right-2 sm:right-0 md:-right-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-lg flex items-center justify-center focus:outline-none transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 stroke-current translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* 3D Stacked Cards Stage */}
          <div
            className="relative w-full max-w-4xl mx-auto h-[460px] sm:h-[490px] md:h-[510px] flex items-center justify-center pt-2 pb-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: "1200px" }}
          >
            {currentSet.shades.map((shade, idx) => {
              // Deck positions relative to activeCardInSet
              // idx 0 = Base (60%), idx 1 = Accent (30%), idx 2 = Trim (10%)
              const offset = idx - activeCardInSet;

              let transformClass = "";
              let zIndex = 20;
              let opacity = 0.95;

              if (offset === 0) {
                // Active focused card: Center, front & elevated
                zIndex = 30;
                opacity = 1;
                transformClass =
                  "translate-x-0 translate-y-0 scale-100 rotate-0 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.22)]";
              } else if (offset === -1 || offset === 2) {
                // Left stacked card (usually Base 60%)
                zIndex = 10;
                opacity = 0.88;
                transformClass =
                  "-translate-x-24 sm:-translate-x-36 md:-translate-x-48 translate-y-4 sm:translate-y-5 scale-[0.91] sm:scale-[0.93] -rotate-[5deg] shadow-[0_16px_35px_-10px_rgba(0,0,0,0.16)] hover:scale-[0.95] hover:-rotate-[2deg]";
              } else {
                // Right stacked card (usually Trim 10%)
                zIndex = 15;
                opacity = 0.88;
                transformClass =
                  "translate-x-24 sm:translate-x-36 md:translate-x-48 translate-y-4 sm:translate-y-5 scale-[0.91] sm:scale-[0.93] rotate-[5deg] shadow-[0_16px_35px_-10px_rgba(0,0,0,0.16)] hover:scale-[0.95] hover:rotate-[2deg]";
              }

              return (
                <div
                  key={shade.shadeCode}
                  onClick={() => setActiveCardInSet(idx)}
                  className={`absolute w-[220px] sm:w-[260px] md:w-[290px] h-[360px] sm:h-[400px] md:h-[420px] bg-white rounded-3xl border border-slate-200/90 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer flex flex-col ${transformClass}`}
                  style={{
                    zIndex,
                    opacity,
                  }}
                >
                  {/* Upper 68%: Pure Architectural Paint Swatch Block */}
                  <div
                    className="relative w-full h-[65%] sm:h-[68%] transition-colors duration-500 flex flex-col justify-between p-4"
                    style={{ backgroundColor: shade.hex }}
                  >
                    {/* Subtle realistic satin paint reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />

                    {/* Top Badge: 60% / 30% / 10% Role */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[11px] font-black font-heading px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 shadow-2xs border border-white/60">
                        {shade.role}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-white border border-white/10">
                        {shade.shadeCode}
                      </span>
                    </div>

                    {/* Bottom Swatch Copy Pill */}
                    <div className="relative z-10 self-end">
                      <button
                        type="button"
                        onClick={(e) => handleCopyHex(shade.hex, e)}
                        title="Copy HEX"
                        className="flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm border border-slate-200/80 transition-all active:scale-95"
                      >
                        <span>{shade.hex}</span>
                        {copiedHex === shade.hex ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Lower 32%: Clean Designer Swatch Footer (Pantone Style) */}
                  <div className="w-full flex-grow p-4 flex flex-col justify-between bg-white">
                    <div>
                      <h4 className="text-base sm:text-lg font-black font-heading text-slate-900 tracking-tight leading-tight">
                        {shade.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        {shade.usage}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[10px] font-medium text-slate-400">
                        {shade.finish}
                      </span>
                      <span className="text-[10px] font-bold font-heading text-[#5c249c] hover:underline">
                        Snowcem Quality
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 60-30-10 Proportional Visualizer Bar (Shows the 3 colors working together) */}
        <div className="max-w-xl mx-auto mt-6 mb-6 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 font-heading mb-2.5">
            <span>60-30-10 House Distribution Rule</span>
            <span className="text-slate-400 font-mono text-[11px]">
              Complete Exterior / Interior Balance
            </span>
          </div>

          {/* Connected Color Bar */}
          <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-black/10">
            {currentSet.shades.map((s, idx) => {
              const widths = ["w-[60%]", "w-[30%]", "w-[10%]"];
              return (
                <div
                  key={s.name}
                  className={`${widths[idx]} h-full relative transition-all duration-500 flex items-center justify-center group`}
                  style={{ backgroundColor: s.hex }}
                  title={`${s.name} (${s.role})`}
                >
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-black/40 text-white backdrop-blur-xs hidden sm:inline-block">
                    {s.role.split(" ")[1]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Labels under the bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-1 text-center">
            {currentSet.shades.map((s) => (
              <div key={s.name} className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-800 font-heading truncate w-full">
                  {s.name}
                </span>
                <span className="text-[10px] text-slate-500">
                  {s.role.split(" ")[0]} Wall
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Visualizer */}
        <div className="text-center pt-8 sm:pt-10">
          <Link
            href={`/tools/visualizer?color=${currentSet.shades[1].hex.replace("#", "")}&name=${encodeURIComponent(currentSet.shades[1].name)}`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white text-xs sm:text-sm font-bold font-heading shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Test {currentSet.title} in Room Visualizer</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </Link>
        </div>
      </div>
    </section>
  );
}
