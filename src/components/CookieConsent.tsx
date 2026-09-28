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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#DDC7BB]/95 backdrop-blur-md border-t border-[#C2A99A] shadow-[0_-8px_30px_rgba(37,34,56,0.16)] text-[#252220] transition-all duration-300">
      {/* Top brand gradient accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#5B5BAB] via-[#D83E78] to-[#f36c21]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">

        {/* Icon + Text */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#5B5BAB] to-[#D83E78] flex items-center justify-center shrink-0 shadow-md text-white">
            <Cookie className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs sm:text-sm text-[#5C534D] leading-relaxed max-w-4xl">
            <span className="font-extrabold text-[#252220] font-heading mr-1">We use cookies</span> to enhance your browsing experience, deliver tailored colour recommendations, and analyse site performance. Read our{" "}
            <Link
              href="/privacy-policy"
              className="font-bold text-[#D83E78] hover:text-[#5B5BAB] underline underline-offset-2 transition-colors"
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
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-[#252220] bg-[#FAF7F4] hover:bg-white border border-[#CBB3A5] hover:border-[#5B5BAB] shadow-2xs transition-all cursor-pointer active:scale-95 text-center"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#5B5BAB] to-[#D83E78] hover:opacity-95 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 text-center"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
