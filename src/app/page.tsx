"use client";

import React, { useState } from "react";
import PaintLoader from "@/components/PaintLoader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeProductsSection from "@/components/HomeProductsSection";
import BrandPillarsSection from "@/components/BrandPillarsSection";
import VirasatStoriesSection from "@/components/VirasatStoriesSection";
import RangonKiVirasat from "@/components/RangonKiVirasat";
import VideoModal from "@/components/VideoModal";
import CookieConsent from "@/components/CookieConsent";
import WhoYouAreModal from "@/components/WhoYouAreModal";
import Footer from "@/components/Footer";

import RoomCategoryIcons from "@/components/RoomCategoryIcons";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | undefined>();
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | undefined>();

  const handleOpenVideo = (url?: string, title?: string) => {
    setActiveVideoUrl(url);
    setActiveVideoTitle(title);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Animated Flowing Paint Stroke Preloader */}
      <PaintLoader />

      {/* Sticky Header Wrapper combining Announcement Bar & Navbar pinned together at top */}
      <div className="sticky top-0 z-40 bg-white">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-white">
        {/* Automatic Hero Carousel (Zero manual buttons, smooth 4s auto loop) */}
        <Hero onWatchVideoClick={handleOpenVideo} />

        {/* Room Category SVG Icons Bar */}
        <RoomCategoryIcons />

        {/* Complete Products Catalog Grid without background images */}
        <HomeProductsSection />

        {/* Rangon Ki Virasat — Brand Story with TVC */}
        <RangonKiVirasat />

        {/* 3 Brand Pillars (60+ Years Heritage, Eco-Friendly, 360 Services) */}
        <BrandPillarsSection />

        {/* Virasat Stories — In Their Words (Painter, Contractor, Dealer) */}
        <VirasatStoriesSection />
      </main>

      {/* TVC Video Modal Overlay */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={activeVideoUrl}
        title={activeVideoTitle}
      />

      {/* Cookie Consent Toast Banner */}
      <CookieConsent />

      {/* Who You Are Popup Lead Banner Modal */}
      <WhoYouAreModal />

      {/* Global Footer with simple firm header row & 4 columns */}
      <Footer />
    </div>
  );
}
