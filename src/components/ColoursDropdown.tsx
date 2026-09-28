"use client";

import React from "react";
import Link from "next/link";
import { Palette, Sparkles, BookOpen, ArrowRight } from "lucide-react";

interface ColoursDropdownProps {
  onClose?: () => void;
}

const COLOUR_COLUMNS = [
  {
    title: "Colour Inspiration & Catalogue",
    subtitle: "Discover curated palettes, modern exterior facades, and 1,800+ interior shade cards.",
    href: "/color-catalogue",
    icon: Sparkles,
    badge: "Shades & Moods",
    cta: "Explore Catalogue",
  },
  {
    title: "Colour Blogs & Guides",
    subtitle: "Expert articles on decor trends, color psychology, surface waterproofing & wall prep.",
    href: "/blogs",
    icon: BookOpen,
    badge: "Decor Guides",
    cta: "Read Colour Blogs",
  },
];

export default function ColoursDropdown({ onClose }: ColoursDropdownProps) {
  return (
    <div
      className="w-full bg-[#DDC7BB] border-b border-[#C2A99A] shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-5">
          {COLOUR_COLUMNS.map((col, idx) => {
            const IconComp = col.icon;
            return (
              <Link
                key={idx}
                href={col.href}
                onClick={onClose}
                className="group p-4 rounded-xl border border-[#CBB3A5] bg-[#FAF7F4] hover:bg-white hover:border-[#D83E78] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <IconComp className="w-5 h-5 text-[#5B5BAB] group-hover:text-[#D83E78] group-hover:scale-110 transition-all" />
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#EAE0D7] text-[#D83E78] uppercase tracking-widest font-label border border-[#CBB3A5]/60">
                      {col.badge}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-[#252220] group-hover:text-[#D83E78] transition-colors mb-1 font-heading">
                    {col.title}
                  </h5>
                  <p className="text-[11px] text-[#5C534D] line-clamp-2 leading-relaxed mb-2.5">
                    {col.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#CBB3A5]/60 flex items-center text-[11px] font-bold text-[#252220] group-hover:text-[#5B5BAB] transition-colors font-heading">
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
