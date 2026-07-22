"use client";

import React from "react";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <a href="#" className={`inline-flex items-center group ${className}`}>
      {/* Brand logo image with smooth CSS height transition (no re-mount / buffering) */}
      <img
        src="/image.png"
        alt="Snowcem Paints Logo"
        className={`w-auto object-contain transition-all duration-300 ease-in-out transform-gpu group-hover:opacity-90 ${
          compact ? "h-7 md:h-8" : "h-10 md:h-12"
        }`}
      />
    </a>
  );
}
