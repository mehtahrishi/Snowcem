import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import PaintLoader from "@/components/PaintLoader";
import Footer from "@/components/Footer";
import ColorVisualizer from "@/components/ColorVisualizer";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import InspiringIdeasSection from "@/components/InspiringIdeasSection";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";

export const metadata: Metadata = {
  title: "Colour Visualiser | Snowcem Paints",
  description:
    "Upload your room photo and preview authentic Snowcem wall paints and shade colours in real-time. Test living room, bedroom, dining, and exterior villa paint color combinations.",
};

export default function ColorVisualizerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header Wrapper */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <Header />
      </div>

      {/* 1. FULL WIDTH EDGE-TO-EDGE BANNER */}
      <section className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] overflow-hidden bg-slate-900">
        <img
          src="/tools/colorvisualizer/visual.png"
          alt="Snowcem Color Visualizer Before and After"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Bottom Full-Width Gradient & Title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-14">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md animate-gradient-wave inline-block">
              Colour Visualizer
            </h1>
            <p className="text-slate-200 text-xs sm:text-base mt-1.5 max-w-xl drop-shadow-xs">
              Explore 1,800+ authentic Snowcem room and genre-curated shades in real-time on real room photos.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE VISUALIZER WORKSPACE */}
      <main className="flex-grow">
        <ColorVisualizer />
      </main>

      {/* 3. INSPIRING IDEAS SECTION */}
      <InspiringIdeasSection />

      {/* 4. PAINTING SERVICE QUERY BANNER */}
      <PaintingServiceQueryBanner sourceContext="color_visualizer_page" />

      {/* 5. SUPPORT & CONNECTIVITY PILL TABS: DEALER, PAINTER, CALL, ONLINE CHAT */}
      <ToolsSupportTabs toolType="colorvisualizer" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
