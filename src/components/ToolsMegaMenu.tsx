"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Sparkles, Sparkle, ArrowRight } from "lucide-react";

interface ToolsMegaMenuProps {
  onClose?: () => void;
}

const TOOLS_LIST = [
  {
    title: "Paint Budget Calculator",
    subtitle: "Calculate exact paint litres and estimated budget for rooms and exterior walls.",
    href: "/paint-calculator",
    icon: Calculator,
    color: "from-emerald-500 to-teal-600",
    badge: "Estimator",
    cta: "Calculate Litres",
  },
  {
    title: "Colour Visualizer",
    subtitle: "Upload wall photos & preview 1,800+ Snowcem paint shades in real time.",
    href: "/color-visualizer",
    icon: Sparkles,
    color: "from-purple-600 to-indigo-600",
    badge: "Visualizer",
    cta: "Launch Visualizer",
  },
  {
    title: "Festive Studio & Virasat",
    subtitle: "Curated Indian festive themes, heritage color palettes, and traditional home styles.",
    href: "/festive-studio",
    icon: Sparkle,
    color: "from-pink-500 to-rose-600",
    badge: "Heritage",
    cta: "Explore Festive Studio",
  },
];

export default function ToolsMegaMenu({ onClose }: ToolsMegaMenuProps) {
  return (
    <div
      className="w-full bg-canvas border-b border-[#cbb3a5]/70 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOOLS_LIST.map((tool, idx) => {
            const IconComp = tool.icon;
            return (
              <Link
                key={idx}
                href={tool.href}
                onClick={onClose}
                className="group p-4 rounded-xl border border-stone-300/60 bg-white/70 hover:bg-white hover:border-[#D83E78]/50 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5BAB] to-[#D83E78] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform"
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-stone-200/80 text-[#D83E78] uppercase tracking-widest font-label border border-stone-300/60">
                      {tool.badge}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#D83E78] transition-colors mb-1 font-heading">
                    {tool.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                    {tool.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors font-heading">
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D83E78] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
