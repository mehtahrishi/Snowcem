"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Sparkles, Sparkle, ArrowRight, Palette } from "lucide-react";

interface ToolsMegaMenuProps {
  onClose?: () => void;
}

const TOOLS_LIST = [
  {
    title: "Colour Catalogue",
    subtitle: "Browse 1,800+ interior and exterior shades, organised by room type, mood and colour family.",
    href: "/color-catalogue",
    icon: Palette,
    badge: "1,800+ Shades",
    cta: "Browse 1800+ Shades",
  },
  {
    title: "Paint Budget Calculator",
    subtitle: "Get an indicative estimate of paint quantity and budget for interior and exterior walls.",
    href: "/paint-calculator",
    icon: Calculator,
    badge: "Estimator",
    cta: "Estimate Litres",
  },
  {
    title: "Colour Visualizer",
    subtitle: "Upload wall photos & preview 1,800+ Snowcem paint shades on screen.",
    href: "/color-visualizer",
    icon: Sparkles,
    badge: "Visualizer",
    cta: "Launch Visualizer",
  },
  /*
  {
    title: "Festive Studio & Virasat",
    subtitle: "Curated Indian festive themes, heritage color palettes, and traditional home styles.",
    href: "/festive-studio",
    icon: Sparkle,
    badge: "Heritage",
    cta: "Explore Studio",
  },
  */
];

export default function ToolsMegaMenu({ onClose }: ToolsMegaMenuProps) {
  return (
    <div
      className="w-full bg-[#FAF7F2] border-b border-[#D6C5B3] shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-4">
          {TOOLS_LIST.map((tool, idx) => {
            const IconComp = tool.icon;
            return (
              <Link
                key={idx}
                href={tool.href}
                onClick={onClose}
                className="group p-4 rounded-xl border border-[#D6C5B3] bg-[#FFFFFF] hover:bg-[#F7F3ED] hover:border-[#DF3F6F] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <IconComp className="w-5 h-5 text-[#5B5BAB] group-hover:text-[#DF3F6F] group-hover:scale-110 transition-all" />
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#DF3F6F] uppercase tracking-widest font-label border border-[#D6C5B3]">
                      {tool.badge}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-[#1E1F24] group-hover:text-[#DF3F6F] transition-colors mb-1 font-heading">
                    {tool.title}
                  </h5>
                  <p className="text-[11px] text-[#5A5148] line-clamp-2 leading-relaxed mb-2">
                    {tool.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D6C5B3] flex items-center justify-between text-[11px] font-bold text-[#1E1F24] group-hover:text-[#DF3F6F] transition-colors font-heading">
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DF3F6F] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
