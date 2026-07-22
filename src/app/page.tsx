"use client";

import React, { useState } from "react";
import PaintLoader from "@/components/PaintLoader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategoryGrid from "@/components/ProductCategoryGrid";
import ColorVisualizer from "@/components/ColorVisualizer";
import DealerLocator from "@/components/DealerLocator";
import VideoModal from "@/components/VideoModal";
import ChatbotWidget from "@/components/ChatbotWidget";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
        <Hero onWatchVideoClick={() => setIsVideoModalOpen(true)} />

        {/* Featured Product Category Showcase */}
        <ProductCategoryGrid />

        {/* Interactive Wall Color Visualizer */}
        <ColorVisualizer />

        {/* Authorized Dealer Finder Widget */}
        <DealerLocator />
      </main>

      {/* TVC Video Modal Overlay */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Cookie Consent Toast Banner */}
      <CookieConsent />

      {/* Floating AI Color Assistant Chatbot */}
      <ChatbotWidget />

      {/* Global Footer with simple firm header row & 4 columns */}
      <Footer />
    </div>
  );
}
