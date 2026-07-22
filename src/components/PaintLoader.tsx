"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";

export default function PaintLoader() {
  const [phase, setPhase] = useState<"spinning" | "mixing" | "reveal" | "done">("spinning");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Phase 1: 3 Balls rotating like a fidget spinner (0 - 1200ms)
    const timer1 = setTimeout(() => {
      setPhase("mixing");
    }, 1200);

    // Phase 2: Balls merge & mix in center, revealing Brand Logo (1200 - 1700ms)
    const timer2 = setTimeout(() => {
      setPhase("reveal");
    }, 1700);

    // Phase 3: Start fading out preloader overlay (2300ms)
    const timer3 = setTimeout(() => {
      setFadeOut(true);
    }, 2300);

    // Phase 4: Unmount loader component (2800ms)
    const timer4 = setTimeout(() => {
      setPhase("done");
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 3 Color Balls Fidget Spinner Orbiting & Mixing */}
      {(phase === "spinning" || phase === "mixing") && (
        <div className="relative w-32 h-32 flex items-center justify-center">
          
          {/* Fidget Spinner Container */}
          <div
            className={`w-28 h-28 relative flex items-center justify-center ${
              phase === "spinning"
                ? "animate-fidgetSpin"
                : "animate-fidgetMix"
            }`}
          >
            {/* Color Ball 1: Deep Indigo */}
            <div className="absolute top-0 w-8 h-8 rounded-full bg-[#2a1b92] shadow-md" />

            {/* Color Ball 2: Rich Purple */}
            <div className="absolute bottom-1 right-0 w-8 h-8 rounded-full bg-[#7b1fa2] shadow-md" />

            {/* Color Ball 3: Magenta Orange */}
            <div className="absolute bottom-1 left-0 w-8 h-8 rounded-full bg-[#e91e63] shadow-md" />
          </div>

          {/* Center Glow when mixing */}
          {phase === "mixing" && (
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#2a1b92] via-[#7b1fa2] to-[#e91e63] animate-ping" />
          )}

        </div>
      )}

      {/* Clean Brand Logo Revealed (No text below) */}
      {(phase === "reveal" || fadeOut) && (
        <div className="flex flex-col items-center animate-brandFadeIn">
          <Logo size="md" />
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fidgetSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(720deg);
          }
        }

        .animate-fidgetSpin {
          animation: fidgetSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        @keyframes fidgetMix {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(0.2);
            opacity: 0.2;
          }
        }

        .animate-fidgetMix {
          animation: fidgetMix 0.5s ease-in-out forwards;
        }

        @keyframes brandFadeIn {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-brandFadeIn {
          animation: brandFadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
