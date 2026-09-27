"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import {
  CURATED_COLOR_SHADES,
  CURATED_COLOR_CATEGORIES,
  SUBCATEGORIES_BY_CATEGORY,
  CuratedColorShade,
} from "@/data/curatedShadesData";
import {
  Palette,
  Search,
  Sparkles,
  MapPin,
  Eye,
  ArrowRight,
  SlidersHorizontal,
  Layers,
} from "lucide-react";

const DISPLAY_CATEGORIES = [
  { id: "All", label: "All Shades" },
  { id: "Most Searched: Living Room", label: "Living Room" },
  { id: "Most Searched: Exterior of House", label: "Exterior" },
  { id: "Most Searched: Kitchen", label: "Kitchen" },
  { id: "Most Searched: Bedroom", label: "Bedroom" },
  { id: "Trendy Across All Spaces", label: "Trendy" },
  { id: "Aesthetic Feel Giver, Calm & Vibrant", label: "Aesthetic & Vibrant" },
];

export default function ColourCataloguePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered Shades
  const filteredShades = useMemo(() => {
    return CURATED_COLOR_SHADES.filter((shade) => {
      const matchCat = activeCategory === "All" || shade.category === activeCategory;
      const matchSearch =
        searchTerm === "" ||
        shade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shade.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shade.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shade.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const copyShade = (shade: CuratedColorShade) => {
    navigator.clipboard.writeText(`${shade.name} (${shade.id} - ${shade.hex})`);
    setCopiedId(shade.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        
      {/* 1. FULL WIDTH EDGE-TO-EDGE BANNER */}
      <section className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] overflow-hidden bg-slate-900">
        <img
          src="/tools/color-shades.png"
          alt="Snowcem Colour Catalogue & Genre Palette"
          className="w-full h-full object-cover object-center"
        />
        {/* Full-Width Gradient Scrim for High Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-14">
          <div className="max-w-7xl mx-auto w-full space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-[#DF3F6F] text-white shadow-md w-fit">
              Interactive Tool
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Colour Catalogue
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
              Explore 1,800+ curated shade formulations organized by architectural room genres, moods, and lighting performance.
            </p>
          </div>
        </div>
      </section>

        {/* CATEGORY FILTER PILLS & SEARCH BAR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            
            {/* Unified Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full pb-1">
              {DISPLAY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-heading transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-md shadow-[#5B6BB5]/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search shades by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B6BB5]"
              />
            </div>
          </div>
        </section>

        {/* SHADES GRID PALETTE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
              Showing {filteredShades.length} Shades {activeCategory !== "All" ? `in ${DISPLAY_CATEGORIES.find(c => c.id === activeCategory)?.label || activeCategory}` : ""}
            </span>
            <Link
              href="/color-visualizer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2a1b92] hover:text-[#e91e63] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview on Room Photo</span>
            </Link>
          </div>

          <div
            key={`${activeCategory}-${searchTerm}`}
            className="color-catalogue-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {filteredShades.slice(0, 180).map((shade) => (
              <div
                key={shade.id}
                onClick={() => copyShade(shade)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Color Swatch Stage with Row-Wise Stagger Fill Animation */}
                <div className="w-full h-28 relative overflow-hidden bg-black/[0.05]">
                  <div
                    className="w-full h-full swatch-fill-anim transition-transform duration-300 group-hover:scale-105 flex items-end justify-end p-2"
                    style={{ backgroundColor: shade.hex }}
                  >
                    <span className="text-[10px] font-mono font-bold bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedId === shade.id ? "Copied!" : shade.hex}
                    </span>
                  </div>
                </div>

                {/* Shade Details */}
                <div className="p-3 bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {shade.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono font-bold">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{shade.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredShades.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-500">
                No shades found matching "{searchTerm}".
              </p>
            </div>
          )}
        </section>

      </main>

      {/* Support & Connectivity Pill Tabs */}
      <ToolsSupportTabs toolType="colorvisualizer" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
