"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import {
  Calculator,
  Check,
  Printer,
  Sparkles,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

type SpaceType = "interior" | "exterior";
type NeedType = "fresh" | "repainting";
type ProductTier = "luxury" | "premium" | "economy";

interface TierProduct {
  name: string;
  tagline: string;
  warranty?: string;
  coveragePerLitre2Coats: number; // sq ft per litre for 2 coats
  ratePerLitre: number; // approx in INR
}

const TIER_PRODUCTS: Record<SpaceType, Record<ProductTier, TierProduct>> = {
  interior: {
    luxury: {
      name: "Zenita Luxury Velvet Emulsion",
      tagline: "Ultra-velvet sheen, 100% stain washable with antimicrobial defense",
      warranty: "8 Years",
      coveragePerLitre2Coats: 65,
      ratePerLitre: 420,
    },
    premium: {
      name: "Sentino Acrylic Interior Emulsion",
      tagline: "Rich smooth matte finish with high opacity and scrub resistance",
      warranty: "5 Years",
      coveragePerLitre2Coats: 60,
      ratePerLitre: 280,
    },
    economy: {
      name: "Snowcem Plus Interior Emulsion",
      tagline: "Affordable, breathable wall finish with clean white brightness",
      warranty: "3 Years",
      coveragePerLitre2Coats: 55,
      ratePerLitre: 160,
    },
  },
  exterior: {
    luxury: {
      name: "Uni-glosss 18 Luxury Exterior",
      tagline: "Solar reflective, nano-acrylic gloss with 18-year weather defense",
      warranty: "18 Years",
      coveragePerLitre2Coats: 60,
      ratePerLitre: 490,
    },
    premium: {
      name: "Pentasia Weather-Proof Emulsion",
      tagline: "Heavy-duty silicone exterior emulsion resistant to heavy rain & algae",
      warranty: "8 Years",
      coveragePerLitre2Coats: 55,
      ratePerLitre: 310,
    },
    economy: {
      name: "Super Snowcem Waterproof Cement Paint",
      tagline: "India's iconic exterior waterproof barrier for brick & masonry",
      warranty: "5 Years",
      coveragePerLitre2Coats: 45,
      ratePerLitre: 95,
    },
  },
};

export default function PaintCalculatorPage() {
  // 1. Space Selection (Interior / Exterior)
  const [space, setSpace] = useState<SpaceType>("exterior");

  // 2. Need Selection (Fresh Painting / Repainting)
  const [need, setNeed] = useState<NeedType>("repainting");

  // 3. Wall Carpet Area Input
  const [carpetArea, setCarpetArea] = useState<string>("1000");

  // 4. Product Quality Tier Choice
  const [selectedTier, setSelectedTier] = useState<ProductTier>("premium");

  // 5. Interactive FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Computed Wall Paintable Area
  const wallPaintableArea = useMemo(() => {
    const carpet = parseFloat(carpetArea) || 0;
    const multiplier = space === "interior" ? 2.5 : 1.5;
    return Math.round(carpet * multiplier);
  }, [carpetArea, space]);

  // Computed Materials Breakdown
  const materialBreakdown = useMemo(() => {
    const activeTopcoat = TIER_PRODUCTS[space][selectedTier];

    // 1. Topcoat Wall Emulsion (2 Coats)
    const topcoatLitres = wallPaintableArea > 0
      ? Math.ceil(wallPaintableArea / activeTopcoat.coveragePerLitre2Coats)
      : 0;
    const topcoatCost = topcoatLitres * activeTopcoat.ratePerLitre;

    // 2. Wall Primer (1 Coat: ~120 sq ft / L)
    const primerLitres = wallPaintableArea > 0 ? Math.ceil(wallPaintableArea / 120) : 0;
    const primerRate = space === "interior" ? 140 : 160;
    const primerCost = primerLitres * primerRate;

    // 3. Wall Putty (Fresh: 2 coats ~15 sq ft/kg, Repainting: 1 coat touchup ~35 sq ft/kg)
    const puttyCoverage = need === "fresh" ? 15 : 35;
    const puttyKgs = wallPaintableArea > 0 ? Math.ceil(wallPaintableArea / puttyCoverage) : 0;
    const puttyRate = 28; // INR per kg
    const puttyCost = puttyKgs * puttyRate;

    const grandTotalCost = topcoatCost + primerCost + puttyCost;

    // Pack sizing recommendation
    const packs20L = Math.floor(topcoatLitres / 20);
    let remaining = topcoatLitres % 20;
    const packs10L = Math.floor(remaining / 10);
    remaining = remaining % 10;
    const packs4L = Math.floor(remaining / 4);
    remaining = remaining % 4;
    const packs1L = remaining;

    const packRecommendation = [];
    if (packs20L > 0) packRecommendation.push(`${packs20L} × 20L`);
    if (packs10L > 0) packRecommendation.push(`${packs10L} × 10L`);
    if (packs4L > 0) packRecommendation.push(`${packs4L} × 4L`);
    if (packs1L > 0) packRecommendation.push(`${packs1L} × 1L`);

    return {
      topcoatLitres,
      topcoatCost,
      activeTopcoat,
      primerLitres,
      primerCost,
      puttyKgs,
      puttyCost,
      grandTotalCost,
      packRecommendationText: packRecommendation.join(" + ") || "1 × 1L",
    };
  }, [wallPaintableArea, space, need, selectedTier]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <PaintLoader />

      {/* Header Wrapper */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <Header />
      </div>

      {/* 1. FULL WIDTH HERO BANNER (calculator.png) */}
      <section className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] overflow-hidden bg-slate-900">
        <img
          src="/tools/calculator/calculator.png"
          alt="Snowcem Paint Calculator Banner"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Bottom Full-Width Gradient & Title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-14">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md animate-gradient-wave inline-block">
              Paint Budget Calculator
            </h1>
            <p className="text-slate-200 text-xs sm:text-base mt-1.5 max-w-xl drop-shadow-xs">
              Calculate exact wall paint requirement in litres, primer, wall putty, and estimated budget in just 2 steps.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CALCULATOR WORKSPACE */}
      <main className="flex-grow py-8 sm:py-12 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto w-full">

        {/* TOP HERO CONTAINER: SPACE & NEED SELECTOR (CLEAN WHITE CONTAINER) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left Column: Select Your Space */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-center text-slate-900 uppercase tracking-wider mb-5">
                Select Your Space
              </h3>
              <div className="flex items-center justify-center gap-6 sm:gap-8">
                {/* Interior Option (Circular Card using interior.png) */}
                <button
                  type="button"
                  onClick={() => setSpace("interior")}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                      space === "interior"
                        ? "border-[#2a1b92] scale-105 shadow-md"
                        : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                    }`}
                  >
                    <img
                      src="/tools/calculator/interior.png"
                      alt="Interior Space"
                      className="w-full h-full object-cover"
                    />

                    {/* Circular Check Indicator */}
                    <div className="absolute inset-x-0 bottom-1 flex justify-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          space === "interior"
                            ? "bg-[#2a1b92] text-white shadow-md scale-110"
                            : "bg-black/40 text-transparent"
                        }`}
                      >
                        {space === "interior" ? (
                          <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                      space === "interior" ? "text-[#2a1b92]" : "text-slate-600 group-hover:text-slate-900"
                    }`}
                  >
                    Interior Walls
                  </span>
                </button>

                {/* Exterior Option (Circular Card using exterior.png) */}
                <button
                  type="button"
                  onClick={() => setSpace("exterior")}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                      space === "exterior"
                        ? "border-[#2a1b92] scale-105 shadow-md"
                        : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                    }`}
                  >
                    <img
                      src="/tools/calculator/exterior.png"
                      alt="Exterior Space"
                      className="w-full h-full object-cover"
                    />

                    {/* Circular Check Indicator */}
                    <div className="absolute inset-x-0 bottom-1 flex justify-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          space === "exterior"
                            ? "bg-[#2a1b92] text-white shadow-md scale-110"
                            : "bg-black/40 text-transparent"
                        }`}
                      >
                        {space === "exterior" ? (
                          <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                      space === "exterior" ? "text-[#2a1b92]" : "text-slate-600 group-hover:text-slate-900"
                    }`}
                  >
                    Exterior Walls
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Select Your Need */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-center text-slate-900 uppercase tracking-wider mb-5">
                Select Your Need
              </h3>
              <div className="flex items-center justify-center gap-6 sm:gap-8">
                {/* Fresh Painting (Square Card using freshpaint.png) */}
                <button
                  type="button"
                  onClick={() => setNeed("fresh")}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 bg-slate-100 transition-all duration-200 ${
                      need === "fresh"
                        ? "border-[#2a1b92] scale-105 shadow-md"
                        : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                    }`}
                  >
                    <img
                      src="/tools/calculator/freshpaint.png"
                      alt="Fresh Painting Plaster Base"
                      className="w-full h-full object-cover"
                    />

                    {/* Circular Check Indicator */}
                    <div className="absolute inset-x-0 bottom-1 flex justify-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          need === "fresh"
                            ? "bg-[#2a1b92] text-white shadow-md scale-110"
                            : "bg-black/40 text-transparent"
                        }`}
                      >
                        {need === "fresh" ? (
                          <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                      need === "fresh" ? "text-[#2a1b92]" : "text-slate-600 group-hover:text-slate-900"
                    }`}
                  >
                    Fresh Painting
                  </span>
                </button>

                {/* Repainting (Square Card using repainting.png) */}
                <button
                  type="button"
                  onClick={() => setNeed("repainting")}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 bg-slate-100 transition-all duration-200 ${
                      need === "repainting"
                        ? "border-[#2a1b92] scale-105 shadow-md"
                        : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                    }`}
                  >
                    <img
                      src="/tools/calculator/repainting.png"
                      alt="Repainting Renovation Base"
                      className="w-full h-full object-cover"
                    />

                    {/* Circular Check Indicator */}
                    <div className="absolute inset-x-0 bottom-1 flex justify-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          need === "repainting"
                            ? "bg-[#2a1b92] text-white shadow-md scale-110"
                            : "bg-black/40 text-transparent"
                        }`}
                      >
                        {need === "repainting" ? (
                          <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                      need === "repainting" ? "text-[#2a1b92]" : "text-slate-600 group-hover:text-slate-900"
                    }`}
                  >
                    Repainting
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM CARD CONTAINER: WALL CARPET AREA INPUT */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl mt-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-4">
            Enter Wall Area or Carpet Space
          </h2>

          <div className="max-w-xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <input
                  type="number"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(e.target.value)}
                  placeholder="Enter carpet area in Sq.Ft."
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white text-base font-bold text-gray-900 focus:border-[#2a1b92] focus:ring-2 focus:ring-[#2a1b92]/20"
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold text-gray-400 uppercase">
                  Sq.Ft.
                </span>
              </div>

              {/* Quick Area Presets */}
              <div className="flex items-center gap-1.5 shrink-0">
                {["500", "1000", "1500", "2000"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCarpetArea(preset)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${carpetArea === preset
                        ? "bg-[#2a1b92] text-white border-[#2a1b92]"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Footnote on geometry multiplication */}
            <p className="text-xs text-gray-500 text-center">
              *Estimated paintable wall area is automatically calculated by multiplying carpet area by{" "}
              <span className="font-bold text-gray-700">{space === "interior" ? "2.5×" : "1.5×"}</span>{" "}
              ({space === "interior" ? "4 vertical walls & ceiling standard" : "exterior wall geometry"}).
            </p>
          </div>
        </div>

        {/* DYNAMIC CALCULATION BREAKDOWN & BILL OF MATERIALS */}
        {wallPaintableArea > 0 && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Total Wall Paintable Area
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2a1b92] mt-1">
                  {wallPaintableArea.toLocaleString()} <span className="text-sm font-semibold text-gray-500">Sq.Ft.</span>
                </h3>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Wall Emulsion Required
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#e91e63] mt-1">
                  {materialBreakdown.topcoatLitres} <span className="text-sm font-semibold text-gray-500">Litres (2 Coats)</span>
                </h3>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Estimated Material Budget
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
                  ₹{materialBreakdown.grandTotalCost.toLocaleString()} <span className="text-sm font-semibold text-gray-500">Approx</span>
                </h3>
              </div>
            </div>

          </div>
        )}

        {/* 3. INFORMATIVE PAINTING COST & ESTIMATION GUIDE */}
        <section className="mt-14 pt-10 border-t border-gray-200 space-y-12">

          {/* Main Context Header */}
          <div className="max-w-3xl">

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight font-heading">
              Estimate Your Wall Painting Cost Easily
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
              Planning to revitalize your home interiors with velvet finishes or shield your exterior facade against heavy monsoon moisture? Calculating your paint requirement is the most vital first step. With Snowcem’s precision calculator, you get exact litre quantities and budget clarity upfront, eliminating material wastage and unexpected expenses.
            </p>
          </div>

          {/* 4 Benefits Grid */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 font-heading">
              Why Use the Snowcem Paint Budget Calculator?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="text-sm font-bold text-slate-900">Accurate Litre Quantities</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Real-time spread rate calculations guarantee you buy only what your walls actually consume.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="text-sm font-bold text-slate-900">Transparent Budgeting</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Factor in primer undercoats and acrylic wall putty alongside premium wall emulsions upfront.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="text-sm font-bold text-slate-900">Prevent Cost Overruns</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Accurate multi-coat multipliers for fresh masonry or repaint jobs prevent sudden contractor overcharges.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <h4 className="text-sm font-bold text-slate-900">Optimized Value</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ensure every rupee invested delivers optimal opacity, washability, and long-term weatherproofing.
                </p>
              </div>
            </div>
          </div>

          {/* Key Cost Factors & Additional Considerations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Key Factors That Influence Wall Painting Prices
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a1b92] mt-2 shrink-0" />
                  <span><strong>Paint Formulation:</strong> High-sheen velvet emulsions and silicone weather-guards offer extended durability compared to standard paints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a1b92] mt-2 shrink-0" />
                  <span><strong>Surface Area & Geometry:</strong> Larger carpet footprints require proportional primer and putty volume for seamless adhesion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a1b92] mt-2 shrink-0" />
                  <span><strong>Fresh vs. Repainting Need:</strong> Fresh masonry requires 2 full putty coats and heavy primer, whereas repainting needs minor spot leveling.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Additional Preparation Steps to Account For
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e91e63] mt-2 shrink-0" />
                  <span><strong>Substrate Sanding & Priming:</strong> Sealing masonry porosity ensures vibrant shade depth and stops efflorescence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e91e63] mt-2 shrink-0" />
                  <span><strong>Crack Bridging & Putty Leveling:</strong> Essential for glass-smooth interior walls and weather-sealed exteriors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e91e63] mt-2 shrink-0" />
                  <span><strong>Protective Masking:</strong> Protecting flooring, electrical fixtures, and woodwork during application.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive FAQs Accordion (Open & Collapse) */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Frequently Asked Questions About Paint Estimation
            </h3>
            
            <div className="space-y-3">
              {[
                {
                  q: "How do I calculate the paint required for a 1,000 sq. ft. home?",
                  a: "For interior walls, multiply carpet area by 2.5 (yielding 2,500 sq. ft. of wall + ceiling surface). With a quality Snowcem emulsion delivering ~60 sq. ft. per litre across 2 coats, you will need approximately 42 litres of topcoat emulsion, plus 21 litres of primer.",
                },
                {
                  q: "What is the difference in material required for Fresh Painting vs. Repainting?",
                  a: "Fresh plaster walls absorb more paint and require 2 full coats of white wall putty (~15 sq. ft./kg) and an uninterrupted primer basecoat. Repainting existing sound walls requires only minor putty touch-ups (~35 sq. ft./kg) and 1 coat of primer before 2 topcoats.",
                },
                {
                  q: "Why is applying a primer coat mandatory before wall emulsion?",
                  a: "Snowcem primers penetrate porous cement plaster to create a uniform suction barrier. Without primer, the topcoat emulsion absorbs unevenly, causing patchy coloration, reduced scrub resistance, and premature flaking.",
                },
                {
                  q: "How does Snowcem’s weather-proof exterior paint save long-term costs?",
                  a: "Snowcem exterior formulations (such as Uni-Glosss and Pentasia) feature nano-acrylic silicone polymers that resist tropical rain, algae, and UV discoloration for 8 to 18 years, drastically lowering repainting frequency and recurring scaffolding costs.",
                },
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? "border-[#2a1b92]/40 shadow-sm ring-1 ring-[#2a1b92]/10"
                        : "border-gray-200 hover:border-gray-300 shadow-2xs"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                    >
                      <span className="text-xs sm:text-sm">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#2a1b92]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </section>

      </main>

      {/* 3. SUPPORT & CONNECTIVITY PILL TABS: DEALER, PAINTER, CALL, ONLINE CHAT */}
      <ToolsSupportTabs toolType="calculator" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
