"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  EXTERIOR_EMULSIONS_CATALOGUE,
  INTERIOR_EMULSIONS_CATALOGUE,
  SNOWCEM_SHADES_CATALOGUE,
} from "@/data/colourCatalogueData";
import {
  Palette,
  PhoneCall,
  Mail,
  Download,
  Sparkles,
  Search,
  CheckCircle2,
  Layers,
  Award,
} from "lucide-react";

export default function ColourCataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>("Uni-glosss");

  const filteredShades = SNOWCEM_SHADES_CATALOGUE.filter((shade) => {
    const matchesSearch =
      shade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shade.code.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedProductFilter === "All") return matchesSearch;
    return matchesSearch && shade.category === selectedProductFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-white py-8 sm:py-12 border-b border-slate-100 text-center">
          <div className="w-full px-4 sm:px-8 md:px-12 space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2">
              Colour Catalogue & Shade Card
            </h1>
            <p className="max-w-3xl mx-auto text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Explore our complete spectrum of vibrant interior & exterior emulsion shades, architectural paint systems, and get your free physical shade sample delivered to your doorstep.
            </p>
          </div>
        </section>

        {/* EXTERIOR & INTERIOR EMULSIONS OVERVIEW */}
        <section className="py-10 bg-slate-50 border-b border-slate-200/80 w-full">
          <div className="w-full px-4 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* EXTERIOR EMULSIONS CARD */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-xs">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">
                      Exterior Emulsion Paints
                    </h2>
                    <p className="text-xs font-semibold text-slate-500">
                      7 Weatherproof Range Systems
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {EXTERIOR_EMULSIONS_CATALOGUE.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedProductFilter(item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                        selectedProductFilter === item
                          ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white border-transparent shadow-xs"
                          : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* INTERIOR EMULSIONS CARD */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">
                      Interior Emulsion Paints
                    </h2>
                    <p className="text-xs font-semibold text-slate-500">
                      5 Smooth Velvet Finish Tiers
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {INTERIOR_EMULSIONS_CATALOGUE.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedProductFilter(item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                        selectedProductFilter === item
                          ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white border-transparent shadow-xs"
                          : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SHADE CARD PALETTE GRID - FULL WIDTH */}
        <section className="py-12 w-full px-4 sm:px-8 md:px-12">
          <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                  {selectedProductFilter} Shades Collection ({filteredShades.length} Shades)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Select any category pill above to view its dedicated shade palette
                </p>
              </div>
            </div>

            {/* Shades Grid - Responsive Fluid Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 w-full">
              {filteredShades.map((shade) => (
                <div
                  key={`${shade.name}-${shade.code}`}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  {/* Swatch Color Box */}
                  <div
                    className="w-full h-24 transition-transform group-hover:scale-105 duration-300"
                    style={{ backgroundColor: shade.hex || "#E2E8F0" }}
                  />

                  {/* Swatch Name & Code Details */}
                  <div className="p-3 bg-white space-y-1">
                    <h3 className="text-xs font-extrabold text-slate-900 truncate font-heading">
                      {shade.name}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono font-bold">
                      <span>Code:</span>
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{shade.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredShades.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <p className="text-sm font-semibold">No shades found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>

        {/* GET FREE SAMPLE CALL-TO-ACTION BANNER */}
        <section className="py-12 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold text-white uppercase tracking-widest border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Complimentary Service</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading">
                Get Your Free Sample Today
              </h2>
              
              <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto font-normal">
                Want to test real paint swatches on your home walls? Reach out to our customer care team to request physical shade swatches delivered to your address.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Phone Link Button */}
                <a
                  href="tel:18008913541"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 hover:bg-slate-100 font-extrabold px-6 py-3.5 rounded-2xl transition-all shadow-md text-sm"
                >
                  <PhoneCall className="w-4 h-4 text-purple-700" />
                  <span>Toll Free: 1800-891-3541</span>
                </a>

                {/* Email Link Button */}
                <a
                  href="mailto:customercare.scl@snowcempaints.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 text-white font-extrabold px-6 py-3.5 rounded-2xl border border-white/30 transition-all text-sm"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>customercare.scl@snowcempaints.com</span>
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
