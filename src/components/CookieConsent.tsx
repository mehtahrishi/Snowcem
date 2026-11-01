"use client";

import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#061C18]/95 backdrop-blur-md border-t border-[#D8C7B3]/25 shadow-[0_-8px_30px_rgba(11,11,14,0.45)] text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">

        {/* Icon + Text */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] flex items-center justify-center shrink-0 shadow-md">
            <Cookie className="w-5 h-5 text-[#061C18]" />
          </div>
          <p className="text-xs sm:text-sm text-[#C2B69D] leading-relaxed max-w-4xl">
            <span className="font-extrabold text-white font-heading mr-1">We use cookies</span> to enhance your browsing experience, deliver tailored colour recommendations, and analyse site performance.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-[#EDE4D8] bg-transparent hover:bg-white/10 border border-[#D8C7B3]/40 shadow-2xs transition-all cursor-pointer active:scale-95 text-center"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-[#061C18] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:brightness-110 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 text-center"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
