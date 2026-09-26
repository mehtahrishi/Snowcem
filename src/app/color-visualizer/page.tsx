import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import PaintLoader from "@/components/PaintLoader";
import Footer from "@/components/Footer";
import ColorVisualizer from "@/components/ColorVisualizer";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import ExperienceMoreThanColour from "@/components/ExperienceMoreThanColour";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";

export const metadata: Metadata = {
  title: "Colour Visualiser | Snowcem Paints",
  description:
    "Upload your room photo and preview Snowcem wall paints and colours in real-time. Test living room, bedroom, dining area, study room, pooja room, washroom, and exterior paint color combinations.",
};

export default function ColorVisualizerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      {/* Header Wrapper */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      {/* 1. FULL WIDTH EDGE-TO-EDGE BANNER */}
      <section className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] overflow-hidden bg-slate-900">
        <img
          src="/tools/colorvisualizer/visual.png"
          alt="Snowcem Color Visualizer Before and After"
          className="w-full h-full object-cover object-center"
        />
        {/* Full-Width Gradient Scrim for High Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-14">
          <div className="max-w-7xl mx-auto w-full space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-[#DF3F6F] text-white shadow-md w-fit">
              Interactive Tool
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Colour Visualizer
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
              Try Snowcem colours on real room photos in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE VISUALIZER WORKSPACE */}
      <main className="flex-grow">
        <ColorVisualizer />
      </main>

      {/* 3. EXPERIENCE MORE THAN COLOUR SECTION */}
      <ExperienceMoreThanColour />

      {/* 4. PAINTING SERVICE QUERY BANNER */}
      <PaintingServiceQueryBanner sourceContext="color_visualizer_page" />

      {/* 5. SUPPORT & CONNECTIVITY PILL TABS: DEALER, PAINTER, CALL, ONLINE CHAT */}
      <ToolsSupportTabs toolType="colorvisualizer" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
