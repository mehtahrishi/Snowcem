"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  subItems: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "exterior",
    name: "Exterior Emulsions",
    subItems: ["All Guard 100% Acrylic", "Snowcryl XT", "Pentacook Exterior", "Ultra Shield", "Exterior Gloss"],
  },
  {
    id: "interior",
    name: "Interior Emulsions",
    subItems: [
      "Zenita Velvet Sheen",
      "Sentino Acrylic Finish",
      "Sentino Easy2Wash",
      "Celeste Luxury",
      "Snowpearl Silk",
      "Snowcoat Emulsion",
    ],
  },
  {
    id: "waterproofing",
    name: "Waterproofing Paints",
    subItems: ["Waterproof Plus", "Damp Lock Barrier", "Water Block Roof Coating", "Wall Shield Sealer"],
  },
  {
    id: "primers",
    name: "Primers & Undercoats",
    subItems: ["Acrylic Exterior Primer", "Universal Interior Primer", "Solvent Primer", "Wall Undercoat"],
  },
  {
    id: "cement",
    name: "Cement Paints",
    subItems: ["Snowcem Plus Iconic", "Eco Snowcem", "Super Snowcem", "Hard Top Masonry"],
  },
  {
    id: "putty",
    name: "Putty & Wall Care",
    subItems: ["Acrylic Wall Putty", "Waterproof Exterior Putty", "Smooth Surface Putty"],
  },
  {
    id: "textures",
    name: "Designer Textures",
    subItems: ["Metallic Finish", "Stucco Decorative", "Granular Exterior", "Heritage Texture"],
  },
];

interface ProductsMegaMenuProps {
  onClose?: () => void;
}

export default function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("interior");

  const activeCategory =
    CATEGORIES.find((cat) => cat.id === selectedCategoryId) || CATEGORIES[1];

  return (
    <div className="w-[720px] bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden flex z-50 transition-all">
      
      {/* Left Column: Product Categories */}
      <div className="w-[300px] bg-gray-50 border-r border-gray-200 p-2 space-y-1">
        <h4 className="px-4 py-2 text-[11px] font-black uppercase tracking-wider text-gray-400">
          Select Category
        </h4>
        {CATEGORIES.map((category) => {
          const isActive = category.id === selectedCategoryId;
          return (
            <button
              key={category.id}
              onMouseEnter={() => setSelectedCategoryId(category.id)}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`w-full px-4 py-2.5 text-xs rounded-lg transition-all flex items-center justify-between font-semibold text-left ${
                isActive
                  ? "bg-[#0c1446] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200/70 hover:text-gray-900"
              }`}
            >
              <span>{category.name}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-snowcem-orange" : "text-gray-400"}`} />
            </button>
          );
        })}
      </div>

      {/* Right Column: Clickable Sub-options for Selected Category */}
      <div className="w-[420px] bg-white p-6 flex flex-col justify-start">
        <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#0c1446] uppercase tracking-wide">
            {activeCategory.name}
          </h3>
          <span className="text-[10px] font-bold uppercase text-snowcem-orange bg-orange-50 px-2 py-0.5 rounded-full">
            {activeCategory.subItems.length} Products Available
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {activeCategory.subItems.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={onClose}
              className="group flex items-center justify-between p-3 rounded-xl bg-gray-50/80 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 transition-all"
            >
              <span className="text-xs font-semibold text-gray-800 group-hover:text-snowcem-orange">
                {item}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-snowcem-orange group-hover:translate-x-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
