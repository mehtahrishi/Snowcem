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
    subtitle: "Explore 1,800+ curated Indian interior & exterior shades with custom family and mood filters.",
    href: "/color-catalogue",
    icon: Palette,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    cta: "Browse 1,800+ Shades",
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
    href: "/blogs",
    icon: BookOpen,
    iconColor: "text-pink-600",
    bgColor: "bg-pink-50",
    cta: "Read Colour Blogs",
  },
];

export default function ColoursDropdown({ onClose }: ColoursDropdownProps) {
  return (
    <div
      className="w-full bg-white border-b border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLOUR_COLUMNS.map((col, idx) => {
            const IconComp = col.icon;
            return (
              <Link
                key={idx}
                href={col.href}
                onClick={onClose}
                className="group p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-[#D83E78]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg bg-gray-200 text-[#5B5BAB] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#5B5BAB] group-hover:to-[#D83E78] group-hover:text-white transition-all"
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#D83E78] transition-colors font-heading">
                      {col.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
                    {col.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors font-heading">
                  <span>{col.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#D83E78] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
