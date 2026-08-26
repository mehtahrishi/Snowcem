"use client";

import React, { useState, useEffect } from "react";
import { Cookie, Check, X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("snowcem_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      {/* Top gradient accent line matching AnnouncementBar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-3">

        {/* Icon + Text */}
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2a1b92] to-[#e91e63] flex items-center justify-center shrink-0">
            <Cookie className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-900">We use cookies</span> to enhance your experience, deliver tailored colour recommendations, and analyse site performance. Read our{" "}
            <Link href="/privacy-policy" className="font-semibold text-[#2a1b92] hover:text-[#e91e63] underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-gray-500 border border-gray-300 hover:border-gray-400 hover:text-gray-700 transition-all"
          >
            <X className="w-3.5 h-3.5" />
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-90 transition-all shadow-md"
          >
            <Check className="w-3.5 h-3.5" />
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
