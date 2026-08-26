"use client";

import React from "react";
import Link from "next/link";
import { Palette, Sparkles, BookOpen, ArrowRight } from "lucide-react";

interface ColoursDropdownProps {
  onClose?: () => void;
}

const COLOUR_COLUMNS = [
  {
    title: "Colour Catalogue",
    subtitle: "Explore 100+ curated Indian interior & exterior shades with custom family and mood filters.",
    href: "/color-catalogue",
    icon: Palette,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    cta: "Browse 100+ Shades",
  },
  {
    title: "Colour Inspiration",
    subtitle: "Discover living room palettes, modern exterior facades, and festive temple decor inspirations.",
    href: "/festive-studio",
    icon: Sparkles,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    cta: "Explore Gallery",
  },
  {
    title: "Colour Blogs & Guides",
    subtitle: "Expert articles on decor trends, color psychology, surface waterproofing & wall prep.",
    href: "/about-us/true-colours-of-life",
    icon: BookOpen,
    iconColor: "text-pink-600",
    bgColor: "bg-pink-50",
    cta: "Read Articles",
  },
];

export default function ColoursDropdown({ onClose }: ColoursDropdownProps) {
  return (
    <div
      className="w-full bg-white border-b border-gray-200 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLOUR_COLUMNS.map((col, idx) => {
            const IconComp = col.icon;
            return (
              <Link
                key={idx}
                href={col.href}
                onClick={onClose}
                className="group p-4 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-orange-200 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg ${col.bgColor} ${col.iconColor} flex items-center justify-center shrink-0`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h5 className="text-xs font-bold text-gray-900 group-hover:text-snowcem-orange transition-colors">
                      {col.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-2.5">
                    {col.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center text-[11px] font-bold text-snowcem-navy group-hover:text-snowcem-orange transition-colors">
                  <span>{col.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
