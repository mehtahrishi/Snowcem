"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  compact?: boolean;
  whiteBg?: boolean;
}

export default function Logo({
  className = "",
  compact = false,
  whiteBg = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center group ${
        whiteBg
          ? `bg-white rounded-xl shadow-xs border border-[#D8C7B3]/40 transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
              compact ? "px-2.5 py-1" : "px-3.5 py-1.5"
            }`
          : ""
      } ${className}`}
    >
      <img
        src="/image.png"
        alt="Snowcem Paints Logo"
        className={`w-auto object-contain ${
          compact ? "h-7 sm:h-8" : "h-9 sm:h-10"
        }`}
      />
    </Link>
  );
}

