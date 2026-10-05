"use client";

import React, { useState, useEffect } from "react";

export default function PaintLoader() {
  const [revealed, setRevealed] = useState(false);
  const [flying, setFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [backdropOpacity, setBackdropOpacity] = useState(1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 1. Lock body scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Step 1: Smoothly reveal logo IN PLACE at center (at 80ms)
    // No movement — strictly at (50%, 50%)
    const revealTimer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    // Step 2: Now that logo is revealed at center, trigger smooth movement to navbar (at 1000ms)
    const flyTimer = setTimeout(() => {
      const isMobile = window.innerWidth < 1024;
      const targetContainer = isMobile
        ? document.getElementById("navbar-logo-mobile")
        : document.getElementById("navbar-logo-desktop");

      const targetImg = targetContainer?.querySelector("img") || targetContainer;

      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      let deltaX = isMobile ? (80 - screenCenterX) : (120 - screenCenterX);
      let deltaY = isMobile ? (32 - screenCenterY) : (52 - screenCenterY);
      let scale = isMobile ? 0.75 : 0.95;

      if (targetImg) {
        const rect = targetImg.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          deltaX = targetCenterX - screenCenterX;
          deltaY = targetCenterY - screenCenterY;
          // Initial logo height is 48px on desktop, 36px on mobile
          const initialH = isMobile ? 36 : 48;
          scale = rect.height / initialH;
        }
      }

      setFlying(true);
      setFlyStyle({
        transform: `translate3d(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px), 0) scale(${scale})`,
        transition: "transform 1150ms cubic-bezier(0.2, 0.9, 0.25, 1)",
      });
    }, 1000);

    // Step 3: Fade out dark canvas as logo settles into the navbar (at 1750ms)
    const fadeTimer = setTimeout(() => {
      setBackdropOpacity(0);
    }, 1750);

    // Step 4: Complete and unmount (at 2350ms)
    const doneTimer = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = prevOverflow;
    }, 2350);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(flyTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none"
      style={{
        opacity: backdropOpacity,
        transition: "opacity 600ms ease-out",
      }}
    >
      {/* Champagne Gold Canvas Backdrop */}
      <div className="absolute inset-0 bg-[#EDE4D8]" />

      {/* Subtle Ambient Radial Glow Behind Center (fades as logo flies) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
          flying ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-[#5B6BB5]/25 via-[#DF3F6F]/20 to-transparent blur-3xl" />
      </div>

      {/* Centered Logo Anchor (Always stays centered, only flies when flying state is triggered) */}
      <div
        className="fixed left-1/2 top-1/2 pointer-events-none"
        style={
          flying
            ? flyStyle
            : {
                transform: `translate3d(-50%, -50%, 0) scale(${revealed ? 1 : 0.9})`,
                opacity: revealed ? 1 : 0,
                transition: "opacity 600ms ease-out, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform, opacity",
              }
        }
      >
        <img
          src="/image.png"
          alt="Snowcem Paints"
          className="w-auto h-9 sm:h-12 object-contain filter drop-shadow-md"
        />
      </div>
    </div>
  );
}
