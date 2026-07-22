"use client";

import React, { useState } from "react";
import { Palette, Check, Sparkles, RefreshCw } from "lucide-react";

interface ColorShade {
  id: string;
  name: string;
  code: string;
  hex: string;
  category: "Interior" | "Exterior" | "Luxury";
  description: string;
}

const SHADES: ColorShade[] = [
  {
    id: "sentino-amber",
    name: "Sentino Warm Amber",
    code: "SN-1021",
    hex: "#f59e0b",
    category: "Interior",
    description: "Vibrant and welcoming warm tone designed for high traffic living spaces.",
  },
  {
    id: "zenita-indigo",
    name: "Zenita Deep Indigo",
    code: "ZN-4089",
    hex: "#1e1b4b",
    category: "Luxury",
    description: "Opulent rich velvet finish with deep regal tones.",
  },
  {
    id: "celeste-coral",
    name: "Celeste Sunset Coral",
    code: "CL-2034",
    hex: "#f43f5e",
    category: "Interior",
    description: "Lively matte coral tone for feature accent walls.",
  },
  {
    id: "snow-mint",
    name: "Snowcare Mint Breeze",
    code: "SC-7012",
    hex: "#10b981",
    category: "Interior",
    description: "Soothing natural mint finish with anti-bacterial hygiene protection.",
  },
  {
    id: "snowcoat-pearl",
    name: "Snowcoat Off-White Pearl",
    code: "ST-0010",
    hex: "#e2e8f0",
    category: "Exterior",
    description: "Classic high-reflectance exterior coat for cool walls.",
  },
  {
    id: "allguard-terracotta",
    name: "All Guard Terracotta",
    code: "AG-6055",
    hex: "#c2410c",
    category: "Exterior",
    description: "Heavy duty weatherproof exterior coat with UV shade retention.",
  },
];

export default function ColorVisualizer() {
  const [selectedShade, setSelectedShade] = useState<ColorShade>(SHADES[0]);
  const [activeTab, setActiveTab] = useState<"All" | "Interior" | "Exterior" | "Luxury">("All");

  const filteredShades =
    activeTab === "All"
      ? SHADES
      : SHADES.filter((s) => s.category === activeTab);

  return (
    <section id="tools" className="py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-snowcem-orange font-bold text-xs uppercase tracking-wider mb-3">
            <Palette className="w-4 h-4" />
            <span>Interactive Color Visualizer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Visualize Snowcem Colors On Your Walls
          </h2>
          <p className="mt-3 text-gray-600 text-base font-light">
            Select from our curated palette of premium interior & exterior shades to see how Snowcem paints transform living rooms and home facades.
          </p>
        </div>

        {/* Visualizer Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
          
          {/* Room Canvas */}
          <div
            className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[360px] md:min-h-[420px] flex flex-col justify-between p-6 transition-all duration-500"
            style={{ backgroundColor: selectedShade.hex }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-gray-900 shadow-md">
                <span className="text-xs font-bold text-snowcem-orange uppercase block">Selected Shade</span>
                <span className="text-lg font-black block">{selectedShade.name}</span>
                <span className="text-xs text-gray-500 font-mono">{selectedShade.code}</span>
              </div>

              <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Live Rendering</span>
              </div>
            </div>

            <div className="relative z-10 pt-24 pb-4">
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/60 max-w-md shadow-2xl">
                <p className="text-xs text-gray-600 mb-1 font-semibold uppercase tracking-wider">
                  Shade Characteristics
                </p>
                <p className="text-sm text-gray-900 font-normal">
                  {selectedShade.description}
                </p>
              </div>
            </div>
          </div>

          {/* Palette Selector */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
              {(["All", "Interior", "Exterior", "Luxury"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === tab
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredShades.map((shade) => {
                const isSelected = selectedShade.id === shade.id;
                return (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    className={`group relative p-3 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? "border-snowcem-orange ring-2 ring-orange-400 bg-orange-50/40 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-10 h-10 rounded-xl shadow-inner border border-black/10 flex items-center justify-center"
                        style={{ backgroundColor: shade.hex }}
                      >
                        {isSelected && <Check className="w-5 h-5 text-white drop-shadow" />}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{shade.code}</span>
                    </div>

                    <span className="text-xs font-bold text-gray-800 group-hover:text-snowcem-orange transition-colors truncate block">
                      {shade.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a href="#" className="text-xs font-bold text-snowcem-orange hover:underline">
                Order Free Swatch Card &rarr;
              </a>
              <button
                onClick={() => setSelectedShade(SHADES[0])}
                className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
