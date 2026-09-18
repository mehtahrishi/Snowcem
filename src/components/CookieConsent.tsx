"use client";

import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("snowcem_cookie_consent");
    if (!consent) {
      document.body.setAttribute("data-cookie-consent-active", "true");
      window.dispatchEvent(new CustomEvent("snowcem-cookie-consent", { detail: { active: true } }));
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => {
        clearTimeout(timer);
      };
    } else {
      document.body.removeAttribute("data-cookie-consent-active");
      window.dispatchEvent(new CustomEvent("snowcem-cookie-consent", { detail: { active: false } }));
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("snowcem_cookie_consent", "accepted");
    document.body.removeAttribute("data-cookie-consent-active");
    window.dispatchEvent(new CustomEvent("snowcem-cookie-consent", { detail: { active: false } }));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("snowcem_cookie_consent", "declined");
    document.body.removeAttribute("data-cookie-consent-active");
    window.dispatchEvent(new CustomEvent("snowcem-cookie-consent", { detail: { active: false } }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-6px_25px_rgba(0,0,0,0.07)] text-slate-800 transition-all duration-300">
      {/* Top gradient accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">

        {/* Icon + Text */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B6BB5] to-[#DF3F6F] flex items-center justify-center shrink-0 shadow-sm text-white">
            <Cookie className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            <span className="font-bold text-slate-900">We use cookies</span> to enhance your experience, deliver tailored colour recommendations, and analyse site performance. Read our{" "}
            <Link
              href="/privacy-policy"
              className="font-bold text-[#DF3F6F] hover:text-[#5B6BB5] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-heading font-medium text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/90 transition-all cursor-pointer active:scale-95 text-center"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 text-center"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
