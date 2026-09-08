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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-6px_24px_rgba(0,0,0,0.09)]">
      {/* Top gradient accent line matching AnnouncementBar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">

        {/* Icon + Text */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center shrink-0 shadow-sm">
            <Cookie className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
            <span className="font-bold text-slate-900">We use cookies</span> to enhance your experience, deliver tailored colour recommendations, and analyse site performance. Read our{" "}
            <Link
              href="/privacy-policy"
              className="font-bold text-[#2a1b92] hover:text-[#e91e63] underline underline-offset-2 transition-colors"
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
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/90 transition-all cursor-pointer active:scale-95 text-center"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-slate-900 hover:bg-[#2a1b92] shadow-sm hover:shadow transition-all cursor-pointer active:scale-95 text-center"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
