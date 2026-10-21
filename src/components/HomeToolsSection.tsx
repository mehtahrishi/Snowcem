"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ToolCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  actionText: string;
}

const TOOLS_DATA: ToolCardItem[] = [
  {
    id: "visualizer",
    title: "Colour Visualiser",
    description: "Upload your room photo or pick sample spaces to preview Snowcem wall colors and accents before painting.",
    image: "/visual.png",
    href: "/color-visualizer",
    actionText: "Launch Visualiser",
  },
  {
    id: "calculator",
    title: "Paint Budget Calculator",
    description: "Get an accurate estimate of paint volume in litres, primer, wall putty, and budget in just 2 simple steps.",
    image: "/calculator.png",
    href: "/paint-calculator",
    actionText: "Open Calculator",
  },
  {
    id: "catalogue",
    title: "Colour Catalogue",
    description: "Browse 1,800+ curated shade formulations organized by architectural room genres, moods, and lighting performance.",
    image: "/color-shades.png",
    href: "/color-catalogue",
    actionText: "Explore Catalogue",
  },
];

export default function HomeToolsSection() {
  return (
    <section className="relative bg-canvas-soft pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Seamless Curvy Wave Transition */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-px" aria-hidden="true">
        <svg
          viewBox="0 0 1440 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,36 C1120,8 960,56 720,28 C480,0 320,64 0,32 Z"
            fill="#061C18"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 md:-mt-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pt-5 sm:pt-7 mb-7 sm:mb-8 space-y-2 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white inline-block leading-tight">
            Smart Painting Tools
          </h2>
          <p className="text-[#C2B69D] text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Explore Snowcem&apos;s smart tools — test wall colors on room photos, calculate exact paint requirement, and browse 1,800+ shade cards.
          </p>
        </div>

        {/* Two stacked cards on the left, one tall card beside them */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:grid-rows-[1fr_1fr]">
          {TOOLS_DATA.map((tool, index) => (
            <Link
              key={tool.id}
              href={tool.href}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-[#C2B69D] bg-[#D8C5B3] shadow-[0_16px_34px_-28px_rgba(6,28,24,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-26px_rgba(187,160,133,0.5)] ${
                index === 2
                  ? "lg:col-start-2 lg:row-start-1 lg:row-span-2"
                  : index === 0
                  ? "lg:col-start-1 lg:row-start-1"
                  : "lg:col-start-1 lg:row-start-2"
              }`}
            >
              {/* Tool image */}
              <div className="relative w-full min-h-[11.5rem] flex-grow overflow-hidden border-b border-[#C2B69D] bg-[#C2B69D] sm:min-h-[13rem]">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Tool details */}
              <div className="p-5 sm:p-6 flex flex-col flex-shrink-0">
                <h3 className="font-display text-[1.2rem] leading-tight text-[#061C18]">
                  {tool.title}
                </h3>
                <p className="mt-1.5 text-xs leading-[1.6] text-[#061C18]/65 line-clamp-2">
                  {tool.description}
                </p>

                <div className="mt-3.5 flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-[#061C18]">
                    {tool.actionText}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#061C18] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
