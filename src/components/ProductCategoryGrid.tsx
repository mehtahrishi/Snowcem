"use client";

import React from "react";
import { Shield, Sparkles, Droplets, Layers, Building2, Paintbrush, ArrowRight } from "lucide-react";

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  products: string[];
  description: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: "interior",
    title: "Interior Emulsion Paints",
    subtitle: "Zenita & Sentino Series",
    icon: <Sparkles className="w-6 h-6 text-pink-600" />,
    products: ["Zenita Velvet", "Sentino Acrylic", "Sentino Easy2Wash", "Celeste Matte"],
    description: "Ultra-premium washable interior emulsions engineered for smooth velvet touch and superior stain resistance.",
  },
  {
    id: "exterior",
    title: "Exterior Emulsion Paints",
    subtitle: "All Guard & Snowcryl Range",
    icon: <Shield className="w-6 h-6 text-amber-600" />,
    products: ["All Guard 100% Acrylic", "Snowcryl XT", "Pentacook Exterior", "Ultra Shield"],
    description: "Weather-proof exterior emulsions designed to withstand harsh UV rays, monsoon downpours, and thermal stress.",
  },
  {
    id: "waterproofing",
    title: "Waterproofing Paints",
    subtitle: "Waterproof Plus & Damp Lock",
    icon: <Droplets className="w-6 h-6 text-blue-600" />,
    products: ["Waterproof Plus", "Damp Lock Sealer", "Water Block Roof", "Wall Shield"],
    description: "Advanced elastomeric polymer coatings providing 100% anti-dampness and crack-bridging protection.",
  },
  {
    id: "cement",
    title: "Cement Paints",
    subtitle: "The Iconic Snowcem Heritage",
    icon: <Building2 className="w-6 h-6 text-emerald-600" />,
    products: ["Snowcem Plus", "Eco Snowcem", "Super Snowcem", "Hard Top Masonry"],
    description: "India's pioneer waterproof cement paint offering unmatched durability and breathable protection for exterior walls.",
  },
  {
    id: "primers",
    title: "Primers & Undercoats",
    subtitle: "Base Layer Armor",
    icon: <Layers className="w-6 h-6 text-indigo-600" />,
    products: ["Exterior Acrylic Primer", "Universal Interior Primer", "Solvent Sealer"],
    description: "High adhesion priming coats ensuring flawless paint bonding and maximum coverage efficiency.",
  },
  {
    id: "textures",
    title: "Textures & Designer Finishes",
    subtitle: "Artisanal Architectural Textures",
    icon: <Paintbrush className="w-6 h-6 text-purple-600" />,
    products: ["Metallic Finish", "Stucco Italian Plaster", "Granular Finish", "Heritage Stone"],
    description: "Custom decorative textures adding rich tactile depth and modern elegance to accent walls.",
  },
];

export default function ProductCategoryGrid() {
  return (
    <section id="products-grid" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4 border-b border-gray-100 pb-8">
          <div>
            <span className="text-xs font-black tracking-widest text-snowcem-orange uppercase block mb-2">
              Comprehensive Paint Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Explore Our Featured Product Categories
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md font-light">
            From iconic cement paints to luxury velvet interior emulsions and heavy-duty waterproofing shields, Snowcem protects every surface.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.id}
              className="group relative bg-white rounded-3xl p-7 border border-gray-200 hover:border-snowcem-orange shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-snowcem-orange transition-colors">
                  {card.title}
                </h3>
                <span className="text-xs font-semibold text-gray-400 block mb-3">
                  {card.subtitle}
                </span>

                <p className="text-xs text-gray-600 leading-relaxed mb-6 font-light">
                  {card.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Featured Products:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {card.products.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-gray-50 border border-gray-200 rounded-md px-2.5 py-0.5 text-gray-700"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <a href="#" className="text-xs font-bold text-gray-900 group-hover:text-snowcem-orange transition-colors">
                  View Product Range
                </a>
                <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-snowcem-orange text-gray-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
