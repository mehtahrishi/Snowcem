"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import { getRoomThemesData, RoomTheme, ColorCombo } from "@/data/roomThemesData";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react";

interface ThemeCardOption {
  id: string;
  name: string;
  tagline: string;
  imagePath: string;
  colors: string[];
}

const ALL_SPACES = [
  { slug: "living-room", name: "Living Room" },
  { slug: "bedroom", name: "Bedroom" },
  { slug: "kitchen", name: "Kitchen" },
  { slug: "dining-room", name: "Dining Room" },
  { slug: "study-room", name: "Study Room" },
  { slug: "washroom", name: "Washroom" },
  { slug: "pooja-room", name: "Pooja Room" },
];

export default function SpaceThemesPage() {
  const params = useParams();
  const roomSlug = (params?.roomSlug as string) || "living-room";
  const data = getRoomThemesData(roomSlug);

  const [selectedThemeId, setSelectedThemeId] = useState<string>("modern-minimalist");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  // Active theme based on user selection, fallback to first theme
  const activeTheme = data.themes.find((t) => t.id === selectedThemeId) || data.themes[0];
  const activeThemeId = activeTheme?.id || "modern-minimalist";

  // Only the 5 combinations belonging to the selected theme!
  const displayedCombos = (activeTheme?.combos || []).map((c) => ({
    ...c,
    themeName: activeTheme.name,
    themeId: activeTheme.id,
  }));

  const currentCombo = displayedCombos[currentIndex] || displayedCombos[0];

  // Reset index when room changes
  React.useEffect(() => {
    setCurrentIndex(0);
    setActiveColorIdx(0);
  }, [roomSlug]);

  // Dynamic theme options derived directly from the room's themes
  const themeOptions: ThemeCardOption[] = data.themes.map((theme) => {
    const firstCombo = theme.combos[0];
    return {
      id: theme.id,
      name: theme.name,
      tagline: theme.tagline,
      imagePath: firstCombo?.imagePath || "/spaces/living-room/5.png",
      colors: firstCombo?.colors.map((c) => c.hex) || ["#EFE8DC", "#D9CDBF", "#A88665"],
    };
  });

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    setCurrentIndex(0);
    setActiveColorIdx(0);
    const el = document.getElementById("theme-showcase");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayedCombos.length);
    setActiveColorIdx(0);
  }, [displayedCombos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + displayedCombos.length) % displayedCombos.length);
    setActiveColorIdx(0);
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
    <div className="min-h-screen flex flex-col bg-[#DDC7BB] overflow-x-hidden">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#DDC7BB] border-b border-[#E6E3DB] shadow-xs">
        <Header />
      </div>

      {/* Clean Centered Header with Word Animated Title */}
      <section className="w-full pt-8 sm:pt-10 pb-5 px-4 sm:px-8 bg-[#DDC7BB] text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            {data.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-2xl mx-auto">
            {data.heroSubtitle}
          </p>

          {/* Spaces Quick Navigation Pills */}
          <div className="pt-2 flex items-center justify-center flex-wrap gap-2">
            {ALL_SPACES.map((space) => {
              const isCurrent =
                data.slug === space.slug ||
                roomSlug === space.slug ||
                (space.slug === "washroom" && (roomSlug === "wash-room" || roomSlug === "bathroom")) ||
                (space.slug === "study-room" && roomSlug === "study") ||
                (space.slug === "dining-room" && roomSlug === "dinning-room") ||
                (space.slug === "pooja-room" && (roomSlug === "mandir" || roomSlug === "puja-room"));

              return (
                <Link
                  key={space.slug}
                  href={`/spaces/${space.slug}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900 scale-105"
                      : "bg-white/80 border border-[#E6E3DB] text-slate-700 hover:bg-white hover:text-slate-900 shadow-2xs"
                  }`}
                >
                  {space.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT DO YOU WANT THE THEME TO BE LIKE? SELECTOR SECTION */}
      <section className="w-full py-8 sm:py-10 bg-[#D4BEB1]/70 border-y border-[#C8B0A3]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              What do you want the theme to be like?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Select your preferred aesthetic to discover harmonious 3-colour palettes and curated styling tips.
            </p>
          </div>

          {/* Theme Option Cards Grid - 3 Curated Themes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {themeOptions.map((theme) => {
              const isActive = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`group text-left rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col bg-white cursor-pointer ${
                    isActive
                      ? "border-[#DF3F6F] ring-2 ring-[#DF3F6F]/30 shadow-lg -translate-y-1"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {/* Theme Image */}
                  <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={theme.imagePath}
                      alt={theme.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isActive ? (
                      <span className="absolute top-2.5 right-2.5 bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                        Selected
                      </span>
                    ) : (
                      <span className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Choose
                      </span>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        {theme.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {theme.tagline}
                      </p>
                    </div>

                    {/* Mini Swatches Dots */}
                    <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
                      {theme.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                      <span className="text-[10px] font-mono font-bold text-slate-400 ml-auto">
                        View →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH CLEAN IMMERSIVE CAROUSEL STAGE */}
      <main id="theme-showcase" className="w-full flex-grow relative bg-[#DDC7BB] select-none py-6 sm:py-8 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Main Content Sliding Track (Zero remounting, smooth hardware-accelerated glide) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full overflow-hidden"
          >
            <div
              className="flex will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {displayedCombos.map((combo, idx) => (
                <div
                  key={combo.id}
                  className="w-full shrink-0 px-2 sm:px-4"
                >
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-10 py-2">
                    {/* Left: Pure Clean Room Image (Flat, Zero Shadow) */}
                    <div className="w-full lg:w-auto shrink-0 flex justify-center items-center">
                      {!imageErrors[combo.id] ? (
                        <img
                          src={combo.imagePath}
                          alt={`${combo.themeName} - ${combo.title}`}
                          onError={() => handleImageError(combo.id)}
                          className="w-auto h-auto max-h-[540px] lg:max-h-[620px] max-w-full object-contain rounded-2xl border border-slate-200/70"
                        />
                      ) : (
                        /* Multi-Color Stripe Fallback */
                        <div className="w-[340px] sm:w-[420px] h-[460px] flex rounded-2xl overflow-hidden border border-slate-200">
                          {combo.colors.map((c, i) => (
                            <div
                              key={i}
                              className="flex-1 h-full"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Theme, Title, Proportion Bar & Small Hover Card */}
                    <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col justify-center space-y-4">
                      {/* Theme Tag & Slide Counter */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-extrabold text-[#f36c21] font-heading">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{combo.themeName} Theme</span>
                        </div>

                        <span className="text-xs font-mono font-extrabold text-slate-400">
                          {String(idx + 1).padStart(2, "0")} /{" "}
                          {String(displayedCombos.length).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Combo Title */}
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                        {combo.title}
                      </h2>

                      {/* Small Description */}
                      <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                        {combo.description}
                      </p>

                      {/* 60-30-10 HARMONY PROPORTION (VERTICAL BAR & SLIM CARDS) */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-[11px] font-heading">
                          <span className="font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f36c21]" />
                            60-30-10 Harmony Proportion
                          </span>
                          <span className="text-slate-400 text-[10px] font-medium">
                            Click card to copy hex
                          </span>
                        </div>

                        {/* Vertical Bar & Small Compact Cards */}
                        <div className="flex items-stretch gap-3 pt-0.5">
                          {/* Vertical Proportion Bar (Continuous seamless pillar, no borders or gaps) */}
                          <div className="w-16 sm:w-20 flex flex-col shrink-0 self-stretch rounded-xl overflow-hidden">
                            {combo.colors.map((c, cIdx) => {
                              const isSelected = activeColorIdx === cIdx;
                              const flexVal = cIdx === 0 ? 6 : cIdx === 1 ? 3 : 1.3;
                              const pct = cIdx === 0 ? "60%" : cIdx === 1 ? "30%" : "10%";
                              const subLabel = cIdx === 0 ? "Base" : cIdx === 1 ? "Feature" : "Accent";

                              // Calculate brightness for contrast text
                              const hexStr = c.hex.replace("#", "");
                              const r = parseInt(hexStr.substring(0, 2), 16) || 0;
                              const g = parseInt(hexStr.substring(2, 4), 16) || 0;
                              const b = parseInt(hexStr.substring(4, 6), 16) || 0;
                              const isLightColor = (r * 299 + g * 587 + b * 114) / 1000 >= 165;
                              const txtColor = isLightColor ? "text-slate-800" : "text-white";

                              return (
                                <button
                                  key={cIdx}
                                  type="button"
                                  onMouseEnter={() => setActiveColorIdx(cIdx)}
                                  onClick={() => {
                                    setActiveColorIdx(cIdx);
                                    handleCopy(c.hex);
                                  }}
                                  className={`w-full transition-all duration-200 cursor-pointer relative flex flex-col items-center justify-center overflow-hidden bg-slate-100 ${txtColor} ${
                                    isSelected
                                      ? "opacity-100 brightness-105"
                                      : "opacity-85 hover:opacity-100"
                                  }`}
                                  style={{
                                    flex: flexVal,
                                  }}
                                  title={`${c.name} (${pct} ${subLabel}) - Click to copy`}
                                >
                                  {/* Animated Vertical Color Fill */}
                                  <div
                                    className="absolute inset-x-0 bottom-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    style={{
                                      backgroundColor: c.hex,
                                      height: idx === currentIndex ? "100%" : "0%",
                                      transitionDelay: idx === currentIndex ? `${cIdx * 160}ms` : "0ms",
                                    }}
                                  />

                                  {/* Segment Labels */}
                                  <div
                                    className={`relative z-10 flex flex-col items-center justify-center transition-opacity duration-500 ${
                                      idx === currentIndex ? "opacity-100" : "opacity-0"
                                    }`}
                                    style={{
                                      transitionDelay: idx === currentIndex ? `${cIdx * 160 + 100}ms` : "0ms",
                                    }}
                                  >
                                    <span className="text-[11px] sm:text-xs font-mono font-extrabold leading-none">
                                      {pct}
                                    </span>
                                    {cIdx !== 2 && (
                                      <span className="text-[9px] font-heading font-semibold uppercase tracking-wider opacity-85 leading-tight mt-0.5">
                                        {subLabel}
                                      </span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* The 3 Small Color Cards Stacked Vertically */}
                          <div className="flex-1 flex flex-col gap-1.5">
                            {combo.colors.map((c, cIdx) => {
                              const isSelected = activeColorIdx === cIdx;
                              const isCopied = copiedHex === c.hex;
                              const pct = cIdx === 0 ? "60%" : cIdx === 1 ? "30%" : "10%";

                              return (
                                <button
                                  key={cIdx}
                                  type="button"
                                  onMouseEnter={() => setActiveColorIdx(cIdx)}
                                  onClick={() => {
                                    setActiveColorIdx(cIdx);
                                    handleCopy(c.hex);
                                  }}
                                  className={`w-full py-1.5 sm:py-2 px-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer text-left ${
                                    isSelected
                                      ? "bg-slate-50 border-slate-900"
                                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                                  }`}
                                  title={`Click to copy ${c.hex}`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    {/* Color Swatch Dot */}
                                    <span
                                      className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-black/10 shrink-0 flex items-center justify-center transition-transform"
                                      style={{ backgroundColor: c.hex }}
                                    >
                                      {isCopied && (
                                        <Check className="w-3 h-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                                      )}
                                    </span>

                                    {/* Color Name & Description */}
                                    <div className="flex flex-col min-w-0 leading-snug">
                                      <span className="text-xs font-bold text-slate-900 font-heading truncate">
                                        {c.name}
                                      </span>
                                      {c.role && (
                                        <span className="text-[10px] text-slate-500 font-normal truncate">
                                          {c.role}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Hex / Copied Status & Percent */}
                                  <div className="flex items-center gap-2 shrink-0 ml-2">
                                    <span className="text-[10px] font-mono font-medium text-slate-400">
                                      {isCopied ? (
                                        <span className="font-bold text-emerald-600">COPIED!</span>
                                      ) : (
                                        c.hex
                                      )}
                                    </span>
                                    <span
                                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                        isSelected
                                          ? "bg-slate-900 text-white"
                                          : "bg-slate-100 text-slate-700"
                                      }`}
                                    >
                                      {pct}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation & Indicator Bar (Replacing Side Buttons) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100">
            {/* Previous Button */}
            <button
              type="button"
              onClick={prevSlide}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-bold font-heading cursor-pointer order-2 sm:order-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Indicator Dots & Counter */}
            <div className="flex flex-col items-center gap-2 order-1 sm:order-2">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-full">
                {displayedCombos.map((c, i) => {
                  const isActive = i === currentIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        isActive
                          ? "w-6 sm:w-8 h-2.5 bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F]"
                          : "w-2 sm:w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                      title={`Slide ${i + 1}: ${c.title}`}
                    />
                  );
                })}
              </div>
              <span className="text-[11px] font-mono font-semibold text-slate-400">
                Combination {String(currentIndex + 1).padStart(2, "0")} of {String(displayedCombos.length).padStart(2, "0")}
              </span>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextSlide}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-bold font-heading cursor-pointer order-3"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FULL-WIDTH SWIPEABLE QUICK JUMP PALETTES (EDGE-TO-EDGE) */}
        <div className="w-full mt-8 sm:mt-12 pt-6 border-t border-[#C8B0A3]/60 bg-[#D4BEB1]/50 py-6 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-heading">
                Swipe {activeTheme.name} Combinations ({displayedCombos.length})
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
        titlePrefix={`${data.name} Painting Support`}
        sourceContext={`${data.slug}_spaces`}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
