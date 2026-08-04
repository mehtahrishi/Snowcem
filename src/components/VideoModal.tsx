"use client";

import React from "react";
import { X, Play, Volume2, ShieldAlert } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  if (!isOpen) return null;

  const activeUrl = videoUrl || "https://www.youtube.com/embed/-umd2knGfUo?autoplay=1&rel=0";
  const activeTitle = title || 'Snowcem Paints TV Commercial | "Jab Snowcem lagega..."';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-0.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] my-auto max-h-[92vh] flex flex-col">
        <div className="bg-slate-900 rounded-[14px] sm:rounded-[22px] overflow-hidden flex flex-col flex-grow">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] shrink-0">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white animate-pulse shrink-0"></div>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide truncate font-heading">
                {activeTitle}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 text-white/90 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all shrink-0"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Video Player Canvas (YouTube Embed) */}
          <div className="relative w-full aspect-video bg-black shrink-0">
            <iframe
              className="w-full h-full border-0"
              src={activeUrl}
              title={activeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Modal Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 shrink-0">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
              <span>Snowcem Official Media & TV Commercial</span>
            </div>
            <a
              href="#tools"
              onClick={onClose}
              className="w-full sm:w-auto text-center bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold text-white transition-all shadow-md"
            >
              Explore Products & Shades &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
