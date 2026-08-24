"use client";

import React from "react";
import PaintLoader from "@/components/PaintLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeProductsSection from "@/components/HomeProductsSection";
import BrandPillarsSection from "@/components/BrandPillarsSection";
import VirasatStoriesSection from "@/components/VirasatStoriesSection";
import RangonKiVirasat from "@/components/RangonKiVirasat";
import CookieConsent from "@/components/CookieConsent";
import WhoYouAreModal from "@/components/WhoYouAreModal";
import Footer from "@/components/Footer";
import RoomCategoryIcons from "@/components/RoomCategoryIcons";

export default function Home() {
  const handleOpenVideo = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Animated Flowing Paint Stroke Preloader */}
      <PaintLoader />

      {/* Sticky Header Navbar pinned at top */}
      <div className="sticky top-0 z-40 bg-white">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-white">
        {/* Hero Banner Placeholder */}
        <Hero onWatchVideoClick={handleOpenVideo} />

        {/* Room Category SVG Icons Bar */}
        <RoomCategoryIcons />

        {/* Complete Products Catalog Grid */}
        <HomeProductsSection />

        {/* Rangon Ki Virasat — Brand Story */}
        <RangonKiVirasat />

        {/* 3 Brand Pillars (60+ Years Heritage, Eco-Friendly, 360 Services) */}
        <BrandPillarsSection />

        {/* Virasat Stories — In Their Words (Painter, Contractor, Dealer) */}
        <VirasatStoriesSection />
      </main>

      {/* Cookie Consent Toast Banner */}
      <CookieConsent />

      {/* Who You Are Popup Lead Banner Modal */}
      <WhoYouAreModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

