"use client";

import React from "react";
import { X, Play, Volume2, ShieldAlert } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm font-bold text-white tracking-wide">
              Snowcem Paints TV Commercial | "Jab Snowcem lagega..."
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Canvas */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          
          {/* Simulated Video Frame */}
          <div className="relative w-full h-full bg-gradient-to-tr from-amber-600 via-orange-600 to-red-700 flex flex-col items-center justify-center p-8 text-center">
            
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center mb-6 shadow-2xl animate-bounce">
              <Play className="w-10 h-10 text-white fill-current translate-x-1" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white max-w-xl leading-snug drop-shadow-md">
              "Jab Snowcem lagega, toh aur kuch nahi dikhega."
            </h3>
            
            <p className="text-white/80 text-sm mt-2 max-w-md">
              Watch how Snowcem Sentino acrylic emulsion turns ordinary walls into stunning velvet masterpieces.
            </p>

            <div className="mt-6 flex items-center gap-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-xs">
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Full HD 1080p | Official Snowcem TV Commercial</span>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldAlert className="w-4 h-4 text-snowcem-orange" />
            <span>Featured Product: Sentino Superior Emulsion</span>
          </div>
          <a
            href="#tools"
            onClick={onClose}
            className="bg-snowcem-orange hover:bg-orange-600 px-5 py-2 rounded-full text-xs font-bold text-white transition-colors"
          >
            Explore Sentino Shades &rarr;
          </a>
        </div>

      </div>
    </div>
  );
}
