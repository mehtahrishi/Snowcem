"use client";

import React, { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  "India's Pioneer in Waterproofing & Cement Paints Since 1959",
  "Explore New Sentino Luxury Acrylic Emulsion Paint Series",
  "Call Toll Free: 1800-209-5656 For Free Color Consultation",
  "Over 5,000+ Authorized Snowcem Dealers Across India",
  "10 Years Unbeatable All-Weather Exterior Wall Protection",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const timer = setInterval(() => {
      // Step 1: Smooth fade & slide out
      setFadeState("out");

      // Step 2: Switch message & smooth slide in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFadeState("in");
      }, 400);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange text-white text-xs py-2 px-4 border-b border-white/10 overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center h-5">
        <div
          className={`transition-all duration-500 ease-out transform ${
            fadeState === "in"
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-3 scale-95"
          }`}
        >
          <span className="text-white font-semibold tracking-wide drop-shadow-xs">
            {ANNOUNCEMENTS[currentIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
