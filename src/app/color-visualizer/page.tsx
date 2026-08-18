import React from "react";
import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import PaintLoader from "@/components/PaintLoader";
import Footer from "@/components/Footer";
import ColorVisualizer from "@/components/ColorVisualizer";

export const metadata: Metadata = {
  title: "3D Color Visualizer | Snowcem Paints",
  description:
    "Preview authentic Snowcem wall paints and shade colours in real-time. Test living room, bedroom, dining, and exterior villa paint color combinations virtually.",
};

export default function ColorVisualizerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header Wrapper */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Interactive Studio Canvas */}
      <main className="flex-grow">
        <ColorVisualizer />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
