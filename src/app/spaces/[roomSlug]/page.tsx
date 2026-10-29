"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import { getRoomThemesData } from "@/data/roomThemesData";
import {
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

interface ThemeCardOption {
  id: string;
  name: string;
  imagePath: string;
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
      imagePath: firstCombo?.imagePath || "/spaces/living-room/5.png",
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
    <div className="min-h-screen flex flex-col bg-canvas overflow-x-hidden">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-canvas shadow-xs">
        <Header />
      </div>

      <h1 className="sr-only">{data.name} Colour Inspiration</h1>
      <video
        src="/spaces/banner.mp4"
        width={1920}
        height={566}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`${data.name} inspiration`}
        className="block h-auto w-full"
      />

      <section aria-label="Spaces navigation" className="w-full px-4 py-4 sm:px-8 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center flex-wrap gap-2">
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
                  aria-current={isCurrent ? "page" : undefined}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] ${
                    isCurrent
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] border-transparent text-[#061C18]"
                      : "bg-[#0A2621] border-[#D8C5B3]/25 text-white hover:bg-[#0E322B]"
                  }`}
                >
                  {space.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-label="Choose a room theme" className="w-full bg-canvas py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 sm:grid-cols-3 ${themeOptions.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-3.5 sm:gap-4`}>
            {themeOptions.map((theme) => {
              const isActive = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  aria-label={theme.name}
                  aria-pressed={isActive}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`group aspect-[4/3] overflow-hidden rounded-2xl bg-[#0A2621] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] ${
                    isActive ? "ring-2 ring-[#D4AF37]" : "hover:ring-2 hover:ring-[#D8C5B3]/60"
                  }`}
                >
                  <img
                    src={theme.imagePath}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH CLEAN IMMERSIVE CAROUSEL STAGE */}
      <main id="theme-showcase" className="w-full flex-grow relative bg-canvas select-none py-6 sm:py-8 scroll-mt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-32 xl:px-36">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous combination"
            className="absolute left-7 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] transition hover:brightness-110 active:scale-95 sm:left-12 lg:left-16 lg:top-1/2 lg:-translate-y-1/2 xl:left-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
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
                    <div className="w-full min-w-0 lg:w-auto lg:flex-1 flex justify-center items-center">
                      {!imageErrors[combo.id] ? (
                        <img
                          src={combo.imagePath}
                          alt={`${combo.themeName} - ${combo.title}`}
                          onError={() => handleImageError(combo.id)}
                          className="w-auto h-auto max-h-[540px] lg:max-h-[620px] max-w-full object-contain rounded-2xl border border-[#D8C5B3]/20"
                        />
                      ) : (
                        /* Multi-Color Stripe Fallback */
                        <div className="w-[340px] sm:w-[420px] h-[460px] flex rounded-2xl overflow-hidden border border-[#D8C5B3]/20">
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
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-white">
                          {combo.themeName} Theme
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#C2B69D]">
                          {String(idx + 1).padStart(2, "0")} /{" "}
                          {String(displayedCombos.length).padStart(2, "0")}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading leading-tight">
                        {combo.title}
                      </h2>

                      <p className="text-[#C2B69D] text-xs sm:text-sm font-normal leading-relaxed">
                        {combo.description}
                      </p>

                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between gap-3 text-[11px] font-heading">
                          <span className="font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                            60-30-10 Harmony Proportion
                          </span>
                          <span className="text-[#C2B69D] text-[10px] font-medium">
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
                              const txtColor = isLightColor ? "text-[#061C18]" : "text-white";

                              return (
                                <button
                                  key={cIdx}
                                  type="button"
                                  onMouseEnter={() => setActiveColorIdx(cIdx)}
                                  onClick={() => {
                                    setActiveColorIdx(cIdx);
                                    handleCopy(c.hex);
                                  }}
                                  className={`w-full transition-all duration-200 cursor-pointer relative flex flex-col items-center justify-center overflow-hidden bg-[#0A2621] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${txtColor} ${
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
                          <div className="min-w-0 flex-1 flex flex-col gap-1.5">
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
                                  className={`w-full py-1.5 sm:py-2 px-2.5 rounded-xl border transition-colors duration-150 flex items-center justify-between cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                                    isSelected
                                      ? "bg-[#EDE4D8] border-[#D4AF37]"
                                      : "bg-[#D8C5B3] border-transparent hover:bg-[#EDE4D8]"
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
                                      <span className="text-xs font-bold text-[#061C18] font-heading truncate">
                                        {c.name}
                                      </span>
                                      {c.role && (
                                        <span className="text-[10px] text-[#061C18]/70 font-normal truncate">
                                          {c.role}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0 ml-2">
                                    <span className="text-[10px] font-mono font-medium text-[#061C18]/80">
                                      {isCopied ? (
                                        <span className="font-bold text-[#061C18]">COPIED!</span>
                                      ) : (
                                        c.hex
                                      )}
                                    </span>
                                    <span
                                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                        isSelected
                                          ? "bg-[#061C18] text-[#EDE4D8]"
                                          : "bg-[#061C18]/10 text-[#061C18]"
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

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next combination"
            className="absolute right-7 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] transition hover:brightness-110 active:scale-95 sm:right-12 lg:right-16 lg:top-1/2 lg:-translate-y-1/2 xl:right-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

      </main>

      <ToolsSupportTabs toolType="colorvisualizer" />
      <PaintingServiceQueryBanner
        titlePrefix={`${data.name} Painting Support`}
        sourceContext={`${data.slug}_spaces`}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
