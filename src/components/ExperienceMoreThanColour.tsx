"use client";

import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import Link from "next/link";

export interface ExperienceItem {
  id: string;
  name: string;
  src: string;
  href: string;
}

/**
 * ============================================================================
 * EXPERIENCE SECTION IMAGES, ROOM NAMES & PAGE LINKS
 * ============================================================================
 * 6 authentic room experiences. Finite (non-looping) slider.
 * All images maintain their authentic 1:1 square dimensions with zero cropping.
 * ============================================================================
 */
export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "living-room",
    name: "Living Room",
    src: "/experience/hall.png",
    href: "/spaces/living-room",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    src: "/experience/bedroom.png",
    href: "/spaces/bedroom",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    src: "/experience/kitchen.png",
    href: "/spaces/kitchen",
  },
  {
    id: "study-room",
    name: "Study Room",
    src: "/experience/study.png",
    href: "/spaces/study-room",
  },
  {
    id: "washroom",
    name: "Washroom",
    src: "/experience/washroom.png",
    href: "/spaces/washroom",
  },
  {
    id: "pooja-room",
    name: "Pooja Room",
    src: "/experience/pooja.png",
    href: "/spaces/pooja-room",
  },
  {
    id: "dinning-room",
    name: "Dinning Room",
    src: "/experience/dining.png",
    href: "/spaces/dinning-room",
  },
];

export const EXPERIENCE_IMAGES = EXPERIENCE_ITEMS.map((item) => item.src);

export default function ExperienceMoreThanColour() {
  const items = EXPERIENCE_ITEMS;
  const N = items.length;

  // Current active index starts at 0 (Living Room). Strictly bounded [0, N - 1] with NO looping.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive Card & Viewport Dimensions
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [cardWidth, setCardWidth] = useState(400);
  const [gap, setGap] = useState(24);
  const [isMounted, setIsMounted] = useState(false);

  // Mobile Touch Swipe State Only (Direction-locked)
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchOffset, setTouchOffset] = useState(0);
  const [isSwipingHorizontal, setIsSwipingHorizontal] = useState(false);

  // Broken image tracker
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (src: string) => {
    setImageErrors((prev) => ({ ...prev, [src]: true }));
  };

  // Calculate card dimensions dynamically based on window width
  const updateDimensions = useCallback(() => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    setViewportWidth(w);

    if (w < 640) {
      setCardWidth(Math.min(Math.max(w * 0.82, 280), 340));
      setGap(16);
    } else if (w < 1024) {
      setCardWidth(340);
      setGap(20);
    } else if (w < 1440) {
      setCardWidth(380);
      setGap(24);
    } else {
      setCardWidth(420);
      setGap(28);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Exact step between adjacent cards
  const step = cardWidth + gap;

  // Total width occupied by all cards and their gaps
  const totalContentWidth = N * cardWidth + (N - 1) * gap;

  // Responsive edge padding so cards start neatly near screen edges without giant voids
  const paddingX = viewportWidth < 640 ? 16 : viewportWidth < 1024 ? 28 : 56;

  // Maximum scroll distance so the last card aligns with the right padding (no empty right void)
  const maxScroll = Math.max(0, totalContentWidth + 2 * paddingX - viewportWidth);
  const maxIndex = step > 0 && maxScroll > 0 ? Math.min(N - 1, Math.ceil(maxScroll / step)) : 0;

  // Keep currentIndex bounded when viewport resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  // Navigate to Next Card (clamped at maxIndex, NO looping)
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  // Navigate to Previous Card (clamped at 0, NO looping)
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Touch Swipe Handlers for Mobile & Tablet Only
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsTouchActive(true);
    setHasDragged(false);
    setIsSwipingHorizontal(false);
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setTouchOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchActive) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX;
    const diffY = currentY - touchStartY;

    if (!isSwipingHorizontal) {
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 8) {
        setIsTouchActive(false);
        setTouchOffset(0);
        return;
      }
      if (Math.abs(diffX) > 8) {
        setIsSwipingHorizontal(true);
        setHasDragged(true);
      }
    }

    if (isSwipingHorizontal) {
      // Add subtle resistance when pulling past the first or last card
      if ((currentIndex <= 0 && diffX > 0) || (currentIndex >= maxIndex && diffX < 0)) {
        setTouchOffset(diffX * 0.3);
      } else {
        setTouchOffset(diffX);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isTouchActive && !isSwipingHorizontal) return;
    setIsTouchActive(false);
    setIsSwipingHorizontal(false);

    const threshold = Math.min(cardWidth * 0.18, 45);

    if (touchOffset < -threshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (touchOffset > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    setTouchOffset(0);
    setTimeout(() => setHasDragged(false), 80);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  if (N === 0) return null;

  // Navigation boundary checks
  const isAtStart = currentIndex <= 0;
  const isAtEnd = currentIndex >= maxIndex || maxScroll === 0;

  // Calculate translateX: starts at paddingX (no empty left void), clamps at end (no empty right void)
  const startOffset = maxScroll > 0 ? paddingX : Math.max(paddingX, (viewportWidth - totalContentWidth) / 2);
  const targetTranslateX = startOffset - currentIndex * step;
  const minTranslateX = maxScroll > 0 ? startOffset - maxScroll : startOffset;
  const clampedTranslateX = Math.max(minTranslateX, Math.min(startOffset, targetTranslateX));
  const translateX = isMounted ? clampedTranslateX + touchOffset : 0;

  return (
    <section
      className="w-full bg-[#DDC7BB] pt-10 sm:pt-14 md:pt-16 pb-10 sm:pb-14 border-b border-stone-200/60 overflow-hidden relative select-none"
      aria-label="Experience More Than Colour"
    >
      {/* Section Header with Description */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4 space-y-2.5 sm:space-y-3">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
          Experience More Than Colour
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          From soothing bedroom sanctuaries to durable kitchen finishes — discover designer palettes and protective coatings tailored to every corner of your home.
        </p>
      </div>

      {/* Whole-Width Carousel Stage: 100% width, non-looping */}
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative w-full overflow-hidden py-2 touch-pan-y focus:outline-none"
      >
        {/* Left Navigation Arrow Button (Hidden / Disabled when at first item) */}
        <button
          type="button"
          disabled={isAtStart}
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Room"
          className={`absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-lg flex items-center justify-center focus:outline-none transition-all duration-200 ${isAtStart
              ? "opacity-0 pointer-events-none scale-90"
              : "opacity-100 cursor-pointer hover:bg-white hover:scale-105 active:scale-95"
            }`}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 stroke-current -translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Navigation Arrow Button (Hidden / Disabled when at last item) */}
        <button
          type="button"
          disabled={isAtEnd}
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Room"
          className={`absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-lg flex items-center justify-center focus:outline-none transition-all duration-200 ${isAtEnd
              ? "opacity-0 pointer-events-none scale-90"
              : "opacity-100 cursor-pointer hover:bg-white hover:scale-105 active:scale-95"
            }`}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 stroke-current translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>


        {/* Sliding Track: Exactly 6 finite cards, strictly bounded, zero looping */}
        <div
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
            gap: `${gap}px`,
          }}
          className="flex items-start will-change-transform"
        >
          {items.map((item) => {
            const hasError = imageErrors[item.src];

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (hasDragged || Math.abs(touchOffset) > 6) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                style={{ width: `${cardWidth}px` }}
                className="experience-card shrink-0 flex flex-col items-center cursor-pointer focus:outline-none"
              >
                {hasError ? (
                  <div className="w-full aspect-square rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 text-center select-none bg-slate-100 border border-slate-200">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-3 text-[#5c249c]">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200">
                      {item.src}
                    </span>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-square object-cover rounded-2xl sm:rounded-3xl block select-none pointer-events-none"
                    onError={() => handleImageError(item.src)}
                  />
                )}

                {/* Bottom Bar: Left = Room Name, Right = Clean Wave Gradient Arrow */}
                <div className="w-full flex items-center justify-between pt-3 sm:pt-3.5 px-1">
                  {/* Left: Room Name */}
                  <span className="text-base sm:text-lg md:text-xl font-bold font-heading text-slate-900 tracking-tight text-left">
                    {item.name}
                  </span>

                  {/* Right: Just the bare arrow icon with animation wave, no box, no bg, nothing */}
                  <span
                    aria-hidden="true"
                    className="text-xl sm:text-2xl md:text-3xl font-extrabold animate-gradient-wave inline-block leading-none select-none"
                  >
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
