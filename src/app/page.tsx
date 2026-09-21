"use client";

import React from "react";
import PaintLoader from "@/components/PaintLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import HomeProductsSection from "@/components/HomeProductsSection";
import RangonKiVirasat from "@/components/RangonKiVirasat";
import VirasatStoriesSection from "@/components/VirasatStoriesSection";
import InstagramFeedSection from "@/components/InstagramFeedSection";
import Footer from "@/components/Footer";
import ExperienceMoreThanColour from "@/components/ExperienceMoreThanColour";
import TrendyColoursDeck from "@/components/TrendyColoursDeck";
import HomeToolsSection from "@/components/HomeToolsSection";

export default function Home() {
  const handleOpenVideo = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col home-theme bg-[#DDC7BB]">
      {/* Animated Flowing Paint Stroke Preloader */}
      <PaintLoader />

      {/* Sticky Header Navbar pinned at top */}
      <div className="sticky top-0 z-40 bg-[#DDC7BB]">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Banner Carousel (Video Banner + UNI-GLOSSS Image Banner) */}
        <Hero onWatchVideoClick={handleOpenVideo} />

        {/* Experience More Than Colour Full-Width Swipeable Carousel */}
        <ExperienceMoreThanColour />

        {/* Smart Painting Tools Section */}
        <HomeToolsSection />

        {/* Featured Products Full-Width Carousel */}
        <FeaturedProductsCarousel />

        {/* Complete Products Catalog Grid (Explore Our Products) */}
        <HomeProductsSection />

        {/* 5 Trendy 3-Colour Palettes for Your House — Decked Cards Carousel */}
        <TrendyColoursDeck />

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
