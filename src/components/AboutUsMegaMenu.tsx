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
      className="w-full bg-white border-b border-gray-200 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {ABOUT_CARDS.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                onClick={onClose}
                className="group p-3.5 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-pink-200 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-200/70 text-gray-700">
                      {card.tag}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-gray-900 group-hover:text-snowcem-orange transition-colors mb-1">
                    {card.title}
                  </h5>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-2">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100/80 flex items-center text-[11px] font-bold text-snowcem-navy group-hover:text-snowcem-orange transition-colors">
                  <span>Learn More</span>
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
