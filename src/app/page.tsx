"use client";

import React from "react";
import dynamic from "next/dynamic";
import PaintLoader from "@/components/PaintLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import HomeProductsSection from "@/components/HomeProductsSection";
import Footer from "@/components/Footer";
import ExperienceMoreThanColour from "@/components/ExperienceMoreThanColour";
import HomeToolsSection from "@/components/HomeToolsSection";
import SectionDivider from "@/components/SectionDivider";

const TrendyColoursDeck = dynamic(() => import("@/components/TrendyColoursDeck"), { ssr: false });
const RangonKiVirasat = dynamic(() => import("@/components/RangonKiVirasat"), { ssr: false });
const VirasatStoriesSection = dynamic(() => import("@/components/VirasatStoriesSection"), { ssr: false });
const InstagramFeedSection = dynamic(() => import("@/components/InstagramFeedSection"), { ssr: false });

export default function Home() {
  const handleOpenVideo = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col home-theme bg-canvas">
      {/* Animated Flowing Paint Stroke Preloader */}
      <PaintLoader />

      {/* Sticky Header Navbar pinned at top */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Banner Carousel (Video Banner + UNI-GLOSSS Image Banner) */}
        <Hero onWatchVideoClick={handleOpenVideo} />

        {/* Colour, Crafted for Every Room Full-Width Swipeable Carousel */}
        <ExperienceMoreThanColour />

        {/* Smart Painting Tools Section */}
        <HomeToolsSection />

        {/* Featured Products Full-Width Carousel */}
        <FeaturedProductsCarousel />

        {/* Complete Products Catalog Grid (Explore Our Products) */}
        <HomeProductsSection />

        {/* 5 Trendy 3-Colour Palettes for Your House — Decked Cards Carousel */}
        <TrendyColoursDeck />

        {/* Transition Divider into Rangon Ki Virasat */}
        <SectionDivider variant="slant" fillColor="#08221D" />

        {/* Rangon Ki Virasat — Brand Story */}
        <RangonKiVirasat />

        {/* Painter, Contractor & Dealer Stories */}
        <VirasatStoriesSection />

        {/* Official Instagram Feed & Post Iframes */}
        <InstagramFeedSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
