"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
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

export default function ColourCataloguePage() {
  const [activeCategory, setActiveCategory] = useState<string>(CURATED_COLOR_CATEGORIES[0]);
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Subcategories for Active Category
  const subcategories = useMemo(() => {
    return ["All", ...(SUBCATEGORIES_BY_CATEGORY[activeCategory] || [])];
  }, [activeCategory]);

  // Filtered Shades
  const filteredShades = useMemo(() => {
    return CURATED_COLOR_SHADES.filter((shade) => {
      const matchCat = shade.category === activeCategory;
      const matchSub = activeSubcategory === "All" || shade.subcategory === activeSubcategory;
      const matchSearch =
        searchTerm === "" ||
        shade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shade.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shade.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shade.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCat && matchSub && matchSearch;
    });
  }, [activeCategory, activeSubcategory, searchTerm]);

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
        
        {/* HERO SECTION */}
        <section className="bg-canvas py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Colour Catalogue & Genre Palette
            </h1>
            <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Explore 1,800+ curated shade formulations organized by architectural room genres, moods, and lighting performance.
            </p>
          </div>
        </section>

        {/* GENRE CATEGORY TABS BAR */}
        <section className="bg-canvas sticky top-16 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-3">
              {CURATED_COLOR_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveSubcategory("All");
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#2a1b92] text-white shadow-sm scale-102"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* SUBCATEGORY PILLS & SEARCH BAR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            
            {/* Subcategory Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full pb-1">
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeSubcategory === sub
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {sub}
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
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2a1b92]"
              />
            </div>
          </div>
        </section>

        {/* SHADES GRID PALETTE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {filteredShades.length} Shades in {activeCategory}
            </span>
            <Link
              href="/color-visualizer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2a1b92] hover:text-[#e91e63] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview on Room Photo</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredShades.slice(0, 180).map((shade) => (
              <div
                key={shade.id}
                onClick={() => copyShade(shade)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Color Swatch Stage */}
                <div
                  className="w-full h-28 relative transition-transform duration-300 group-hover:scale-102 flex items-end justify-end p-2"
                  style={{ backgroundColor: shade.hex }}
                >
                  <span className="text-[10px] font-mono font-bold bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedId === shade.id ? "Copied!" : shade.hex}
                  </span>
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

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
