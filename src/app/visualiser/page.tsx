import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import PaintLoader from "@/components/PaintLoader";
import Footer from "@/components/Footer";
import ExperienceMoreThanColour from "@/components/ExperienceMoreThanColour";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";

const ColourVisualizer = dynamic(
  () => import("@/components/colour-visualizer/ColourVisualizer"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Colour Visualiser | Snowcem Paints",
  description:
    "Upload your room photo and preview Snowcem wall paints and colours in real-time. Test living room, bedroom, dining area, study room, pooja room, and exterior paint color combinations.",
};

export default function VisualiserPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      {/* Main Interactive Visualizer Workspace */}
      <main className="flex-grow pt-4">
        <ColourVisualizer />
      </main>

      <ExperienceMoreThanColour />
      <PaintingServiceQueryBanner sourceContext="color_visualizer_page" />
      <Footer />
    </div>
  );
}
