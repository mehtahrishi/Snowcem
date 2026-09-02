"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import { LIVING_ROOM_THEMES_DATA, RoomTheme, ColorCombo } from "@/data/roomThemesData";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react";

export default function LivingRoomSpacesPage() {
  const data = LIVING_ROOM_THEMES_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // All 15 combinations across themes
  const displayedCombos = data.themes.flatMap((t) =>
    t.combos.map((c) => ({ ...c, themeName: t.name, themeId: t.id }))
  );

  const currentCombo = displayedCombos[currentIndex] || displayedCombos[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayedCombos.length);
  }, [displayedCombos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + displayedCombos.length) % displayedCombos.length);
  }, [displayedCombos.length]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <Header />
      </div>

      {/* Clean Centered Header with Word Animated Title */}
      <section className="w-full pt-8 sm:pt-10 pb-4 px-4 sm:px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Living Room Colour Combinations
          </h1>
        </div>
      </section>

      {/* FULL-WIDTH CLEAN IMMERSIVE CAROUSEL STAGE */}
      <main className="w-full flex-grow relative bg-white select-none py-4 sm:py-6">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          {currentCombo && (
            <div className="relative">
              {/* Main Content Grid: Full-Width Clean Image + Color Info & Description */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center"
              >
                {/* Left: Pure Clean Room Image (No dark scrims / No backdrops, Full Width) */}
                <div className="lg:col-span-8 xl:col-span-9">
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] xl:aspect-[2.2/1] rounded-2xl sm:rounded-3xl bg-slate-100 overflow-hidden shadow-sm border border-slate-200/80">
                    {!imageErrors[currentCombo.id] ? (
                      <img
                        src={currentCombo.imagePath}
                        alt={`${currentCombo.themeName} - ${currentCombo.title}`}
                        onError={() => handleImageError(currentCombo.id)}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      /* Multi-Color Stripe Fallback */
                      <div className="w-full h-full flex">
                        {currentCombo.colors.map((c, i) => (
                          <div
                            key={i}
                            className="flex-1 h-full"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Theme, Title, Small Description & Color Swatches */}
                <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-center space-y-4">
                  {/* Theme Tag & Slide Counter */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-extrabold text-[#f36c21] font-heading">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentCombo.themeName} Theme</span>
                    </div>

                    <span className="text-xs font-mono font-extrabold text-slate-400">
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(displayedCombos.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Combo Title */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                    {currentCombo.title}
                  </h2>

                  {/* Small Description */}
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {currentCombo.description}
                  </p>

                  {/* 3 Color Swatches (Click to Copy Hex) */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-heading block">
                      Color Palette (Click to Copy Hex)
                    </span>

                    <div className="space-y-2">
                      {currentCombo.colors.map((c) => {
                        const isCopied = copiedHex === c.hex;
                        return (
                          <button
                            key={c.name}
                            onClick={() => handleCopy(c.hex)}
                            className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all text-left group/swatch"
                            title={`Click to copy ${c.name} (${c.hex})`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Swatch Circle */}
                              <div
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/10 shadow-inner flex items-center justify-center shrink-0 transition-transform group-hover/swatch:scale-110"
                                style={{ backgroundColor: c.hex }}
                              >
                                {isCopied && (
                                  <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                                )}
                              </div>

                              <span className="text-xs sm:text-sm font-bold text-slate-800 font-heading">
                                {c.name}
                              </span>
                            </div>

                            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-mono font-bold text-slate-700 uppercase group-hover/swatch:border-slate-400 transition-colors">
                              {isCopied ? "COPIED" : c.hex}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous combination"
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next combination"
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
        </div>

        {/* FULL-WIDTH SWIPEABLE QUICK JUMP PALETTES (EDGE-TO-EDGE) */}
        <div className="w-full mt-8 sm:mt-12 pt-6 border-t border-slate-100 bg-slate-50/50 py-6 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-heading">
                Swipe All Combinations ({displayedCombos.length})
              </span>
            </div>

            {/* Horizontal Swipeable Track across Full Width */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2 pt-1 w-full">
              {displayedCombos.map((c, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`shrink-0 snap-start w-48 sm:w-56 p-3 rounded-2xl border text-left transition-all flex flex-col gap-2.5 ${
                      isActive
                        ? "bg-white border-[#f36c21] shadow-md ring-2 ring-[#f36c21]/20"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* 3 mini color stripes */}
                    <div className="flex h-3.5 w-full rounded-md overflow-hidden shadow-2xs">
                      {c.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-full"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#f36c21] block font-heading">
                        {c.themeName}
                      </span>
                      <span className="text-xs font-bold text-slate-800 line-clamp-1 font-heading">
                        {c.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Query Banner */}
      <PaintingServiceQueryBanner
        titlePrefix="Living Room Painting Support"
        sourceContext="living_room_spaces"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
