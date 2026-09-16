"use client";

import React from "react";

export default function ChatbotWidget() {
  const [isHiddenForCookieConsent, setIsHiddenForCookieConsent] = React.useState<boolean>(false);

  React.useEffect(() => {
    const consent = localStorage.getItem("snowcem_cookie_consent");
    if (!consent) {
      setIsHiddenForCookieConsent(true);
    }

    const handleConsentEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      if (customEvent?.detail !== undefined) {
        setIsHiddenForCookieConsent(customEvent.detail.active);
      } else {
        const current = localStorage.getItem("snowcem_cookie_consent");
        setIsHiddenForCookieConsent(!current);
      }
    };

    window.addEventListener("snowcem-cookie-consent", handleConsentEvent);
    return () => {
      window.removeEventListener("snowcem-cookie-consent", handleConsentEvent);
    };
  }, []);

  if (isHiddenForCookieConsent) {
    return null;
  }

  return (
    <aside
      id="snowsense-chatbot-widget"
      aria-label="SnowSense WhatsApp Support"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto select-none transition-opacity duration-300"
    >
      <a
        href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ask SnowSense on WhatsApp"
        title="Ask SnowSense - Chat on WhatsApp"
        className="group relative inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-black transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 border border-slate-200"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 55%, rgba(241,245,249,1) 100%)",
          boxShadow:
            "0 8px 25px -5px rgba(0,0,0,0.08), 0 4px 12px -2px rgba(0,0,0,0.05), inset 0 1px 2px rgba(255,255,255,0.9)",
        }}
      >
        <span className="relative z-10 text-sm sm:text-base font-semibold font-heading tracking-tight text-black leading-none whitespace-nowrap">
          Ask SnowSense
        </span>
      </a>
    </aside>
  );
}
