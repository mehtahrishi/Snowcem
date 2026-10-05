"use client";

import React from "react";
import Link from "next/link";
import { History, Building2, Users, Award, ArrowRight } from "lucide-react";

interface AboutUsMegaMenuProps {
  onClose?: () => void;
}

const ABOUT_CARDS = [
  {
    title: "The Snowcem Story",
    subtitle: "Pioneers of cement paints & waterproofing in India since 1959.",
    href: "/about-us/the-snowcem-story",
    icon: History,
    color: "from-blue-600 to-indigo-700",
    tag: "Est. 1959",
  },
  {
    title: "About Mehta Group",
    subtitle: "Decades of industrial excellence, global trust & manufacturing legacy.",
    href: "/about-us/about-mehta-group",
    icon: Building2,
    color: "from-amber-500 to-orange-600",
    tag: "Conglomerate",
  },
  {
    title: "Team & Leadership",
    subtitle: "Visionary leadership, chemical engineering experts & industry leaders.",
    href: "/about-us/about-mehta-group",
    icon: Users,
    color: "from-emerald-500 to-teal-600",
    tag: "Leadership",
  },
  {
    title: "Awards & Life @ Snowcem",
    subtitle: "National industry accolades, brand trust & vibrant employee culture.",
    href: "/life-at-snowcem",
    icon: Award,
    color: "from-pink-500 to-rose-600",
    tag: "Culture & Trust",
  },
];

export default function AboutUsMegaMenu({ onClose }: AboutUsMegaMenuProps) {
  return (
    <div
      className="w-full bg-[#FAF7F2] border-b border-[#D6C5B3] shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {ABOUT_CARDS.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                onClick={onClose}
                className="group p-4 rounded-xl border border-[#D6C5B3] bg-[#FFFFFF] hover:bg-[#F7F3ED] hover:border-[#DF3F6F] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <IconComp className="w-5 h-5 text-[#5B5BAB] group-hover:text-[#DF3F6F] group-hover:scale-110 transition-all" />
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#5A5148] uppercase tracking-widest font-label border border-[#D6C5B3]">
                      {card.tag}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-[#1E1F24] group-hover:text-[#DF3F6F] transition-colors mb-1 font-heading">
                    {card.title}
                  </h5>
                  <p className="text-[11px] text-[#5A5148] line-clamp-2 leading-relaxed mb-2">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D6C5B3] flex items-center text-[11px] font-bold text-[#1E1F24] group-hover:text-[#DF3F6F] transition-colors font-heading">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#DF3F6F] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
