"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, Check } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const consent = localStorage.getItem("snowcem_cookie_consent");
    if (!consent) {
      // Show consent banner after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("snowcem_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("snowcem_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-40 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-4 sm:p-5 transition-all duration-300 animate-fadeIn">
      <div className="flex items-start justify-between gap-3">
        
        {/* Cookie Icon & Text */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">
              We Value Your Privacy
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Snowcem Paints uses cookies to enhance your browsing experience, deliver tailored color recommendations, and analyze site performance.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDecline}
          className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Close cookie banner"
        >
          <X className="w-4 h-4" />
        </button>

      </div>

      {/* Buttons Action Bar */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
        <button
          onClick={handleDecline}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          Decline
        </button>

        <button
          onClick={handleAccept}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[#2a1b92] to-[#e91e63] shadow-md hover:opacity-90 transition-all transform hover:scale-105"
        >
          <Check className="w-3.5 h-3.5 text-white" />
          <span>Accept All</span>
        </button>
      </div>
    </div>
  );
}
