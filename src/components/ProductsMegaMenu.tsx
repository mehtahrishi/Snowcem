"use client";

import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
  subItems: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "exterior",
    name: "Exterior Emulsion Paints",
    subItems: ["All Guard", "Snowcryl XT", "Pentacook Exterior", "Ultra Shield", "Exterior Gloss"],
  },
  {
    id: "interior",
    name: "Interior Emulsion Paints",
    subItems: [
      "Zenita",
      "Zenita Velvet Finish",
      "Sentino",
      "Sentino Easy2Wash",
      "Celeste",
      "Snowpearl",
      "Snowcoat",
    ],
  },
  {
    id: "waterproofing",
    name: "Waterproofing Paints",
    subItems: ["Waterproof Plus", "Damp Lock", "Water Block Roof", "Wall Shield Sealer"],
  },
  {
    id: "primers",
    name: "Primers",
    subItems: ["Acrylic Exterior Primer", "Universal Interior Primer", "Solvent Primer", "Wall Undercoat"],
  },
  {
    id: "cement",
    name: "Cement Paints",
    subItems: ["Snowcem Plus", "Eco Snowcem", "Super Snowcem", "Hard Top"],
  },
  {
    id: "putty",
    name: "Putty",
    subItems: ["Acrylic Wall Putty", "Waterproof Exterior Putty", "Smooth Surface Putty"],
  },
  {
    id: "snowcare",
    name: "Snowcare Range",
    subItems: ["Care Guard Anti-Bacterial", "Eco Sanitizing Shield", "Hygiene Clean"],
  },
  {
    id: "distemper",
    name: "Distemper",
    subItems: ["Super Distemper", "Eco Distemper"],
  },
  {
    id: "textures",
    name: "Textures",
    subItems: ["Metallic Finish", "Stucco Decorative", "Granular Exterior", "Heritage Finish"],
  },
];

interface ProductsMegaMenuProps {
  onClose?: () => void;
}

export default function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  // Default selected category is "interior" matching Screenshot 2
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("interior");

  const activeCategory =
    CATEGORIES.find((cat) => cat.id === selectedCategoryId) || CATEGORIES[1];

  return (
    <div className="w-[620px] bg-white shadow-2xl rounded-sm border border-gray-300 overflow-hidden flex z-50">
      
      {/* Left Column: Categories List (Matching Screenshot 2) */}
      <div className="w-[280px] bg-white border-r border-gray-300">
        {CATEGORIES.map((category) => {
          const isActive = category.id === selectedCategoryId;
          return (
            <div
              key={category.id}
              onMouseEnter={() => setSelectedCategoryId(category.id)}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`px-6 py-3.5 text-sm cursor-pointer transition-colors border-b border-gray-200 last:border-b-0 flex items-center justify-between ${
                isActive
                  ? "nav-category-active font-bold text-white shadow-inner"
                  : "text-gray-800 hover:bg-gray-50 font-normal"
              }`}
            >
              <span>{category.name}</span>
            </div>
          );
        })}
      </div>

      {/* Right Column: Sub-items for Active Category (Matching Screenshot 2) */}
      <div className="w-[340px] bg-white flex flex-col justify-start">
        {activeCategory.subItems.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={onClose}
            className="px-8 py-3.5 text-sm text-gray-800 hover:text-snowcem-orange hover:bg-gray-50 border-b border-gray-200 last:border-b-0 block font-normal transition-colors text-center"
          >
            {item}
          </a>
        ))}
      </div>

    </div>
  );
}
