"use client";

import React from "react";

const WhatsAppIcon = ({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* WhatsApp Speech Bubble Outline */}
    <path
      d="M12.04 2.05C6.67 2.05 2.3 6.42 2.3 11.79c0 1.72.45 3.39 1.3 4.86L2.25 21.75l5.24-1.37c1.42.78 3.03 1.19 4.67 1.19 5.37 0 9.74-4.37 9.74-9.74 0-5.37-4.37-9.78-9.86-9.78z"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Phone receiver inside */}
    <path
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"
      fill="currentColor"
    />
  </svg>
);

export default function ChatbotWidget() {
  const [isHiddenForCookieConsent, setIsHiddenForCookieConsent] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Check initial cookie consent state
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
        className="group relative flex flex-col items-center justify-center w-20 h-20 sm:w-[86px] sm:h-[86px] rounded-full text-black backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 border-2 border-white/95"
        style={{
          background:
            "radial-gradient(130% 130% at 30% 20%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.65) 55%, rgba(240, 245, 250, 0.48) 100%)",
          boxShadow:
            "0 12px 30px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 0 20px 2px rgba(255, 255, 255, 0.75), inset 0 2px 5px rgba(255, 255, 255, 0.98), inset 0 -3px 6px rgba(0, 0, 0, 0.04), inset 0 0 16px rgba(255, 255, 255, 0.7)",
        }}
      >
        {/* Subtle glass reflection highlight */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-transparent to-transparent opacity-90"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center justify-center select-none">
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-black group-hover:scale-110 transition-transform duration-200 shrink-0" />
          <span className="text-[11px] sm:text-xs font-bold font-heading tracking-tight text-black mt-1 leading-none text-center">
            SnowSense
          </span>
        </div>
      </a>
    </aside>
  );
}
