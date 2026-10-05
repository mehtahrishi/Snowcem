"use client";

import React from "react";

interface SectionDividerProps {
  variant?: "wave" | "curve" | "slant" | "glow-line" | "paint-drip";
  position?: "top" | "bottom";
  fillColor?: string;
  className?: string;
}

export default function SectionDivider({
  variant = "wave",
  position = "bottom",
  fillColor = "#FAF8F5",
  className = "",
}: SectionDividerProps) {
  if (variant === "glow-line") {
    return (
      <div className={`w-full flex items-center justify-center py-2 ${className}`}>
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] rounded-xs shadow-xs shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />
        </div>
      </div>
    );
  }

  const isFlipped = position === "top";

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        isFlipped ? "rotate-180 -mt-px" : "-mb-px"
      } ${className}`}
      aria-hidden="true"
    >
      {variant === "wave" && (
        <svg
          viewBox="0 0 1440 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C320,64 480,0 720,28 C960,56 1120,8 1440,36 L1440,68 L0,68 Z"
            fill={fillColor}
          />
        </svg>
      )}

      {variant === "curve" && (
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-10 md:h-12 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,48 1440,0 L1440,48 L0,48 Z"
            fill={fillColor}
          />
        </svg>
      )}

      {variant === "slant" && (
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-5 sm:h-8 md:h-10 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 L1440,0 L1440,40 Z"
            fill={fillColor}
          />
        </svg>
      )}

      {variant === "paint-drip" && (
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-14 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,18 C180,35 260,10 440,25 C620,40 700,5 880,30 C1060,55 1200,15 1440,22 L1440,60 L0,60 Z"
            fill={fillColor}
          />
        </svg>
      )}
    </div>
  );
}
