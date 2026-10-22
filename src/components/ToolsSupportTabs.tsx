"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  Paintbrush,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Calculator,
} from "lucide-react";

interface ToolsSupportTabsProps {
  toolType?: "colorvisualizer" | "calculator";
}

type SupportTabId = "dealer" | "painter" | "call" | "chat" | "calculator";

export default function ToolsSupportTabs({ toolType = "colorvisualizer" }: ToolsSupportTabsProps) {
  const [activeTab, setActiveTab] = useState<SupportTabId>("calculator");

  const basePath = `/tools/${toolType}`;

  const tabsData: Record<SupportTabId, {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    image: string;
    imagePosition: string;
    ctaText: string;
    ctaLink: string;
    isExternal: boolean;
  }> = {
    calculator: {
      label: "Paint Calculator",
      icon: Calculator,
      title: "Work Out Exactly How Much Paint You Need",
      subtitle:
        "Enter your room size and pick a finish — the calculator tells you the litres of primer, putty and paint for every coat, with no guesswork.",
      image: "/tools/calculator.png",
      imagePosition: "object-[center_15%] sm:object-[center_12%]",
      ctaText: "Open Paint Calculator",
      ctaLink: "/paint-calculator",
      isExternal: false,
    },
    painter: {
      label: "Painter Near Me",
      icon: Paintbrush,
      title: "Connect with Trusted Professional Painters",
      subtitle:
        "Get in touch with trained and verified Snowcem painting contractors with guaranteed surface preparation, primer sealing, and immaculate finish.",
      image: "/tools/painter.png",
      imagePosition: "object-[center_15%] sm:object-[center_12%]",
      ctaText: "Find a Painter Near Me",
      ctaLink: "/find-painters",
      isExternal: false,
    },
    dealer: {
      label: "Dealer Near Me",
      icon: Store,
      title: "Find Authorized Snowcem Dealer Near You",
      subtitle:
        "Locate trusted retail stores near you for authentic Snowcem emulsions, waterproof cement paints, and computerized tinting machines.",
      image: "/tools/dealer.png",
      imagePosition: "object-[center_12%] sm:object-[center_10%]",
      ctaText: "Find a Dealer Near Me",
      ctaLink: "/find-dealers",
      isExternal: false,
    },
    call: {
      label: "Call Support",
      icon: Phone,
      title: "Speak Directly with Snowcem Paint Specialists",
      subtitle:
        "Need instant advice on paint quantity estimation, water-proofing solutions, or substrate priming? Our toll-free helpline is available Mon-Sat (9 AM - 6 PM).",
      image: "/tools/call-support.png",
      imagePosition: "object-[center_15%] sm:object-[center_12%]",
      ctaText: "Call 1800-209-5656",
      ctaLink: "tel:18002095656",
      isExternal: true,
    },
    chat: {
      label: "Online Support",
      icon: MessageSquare,
      title: "Online Support & Expert Colour Consultation",
      subtitle:
        "Chat directly with our shade styling specialists on WhatsApp for personalized palettes, exterior contrast matching, and technical guidance.",
      image: "/tools/chat.png",
      imagePosition: "object-[center_15%] sm:object-[center_12%]",
      ctaText: "Chat on WhatsApp (#snowsense)",
      ctaLink: "https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0",
      isExternal: true,
    },
  };

  const current = tabsData[activeTab];

  return (
    <section className="py-10 sm:py-14 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* Pill Tab Bar */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#FAF7F4] p-1.5 rounded-full border border-[#CBB3A5] shadow-sm inline-flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full scrollbar-none">

            {(Object.keys(tabsData) as SupportTabId[]).map((tabId) => {
              const TabIcon = tabsData[tabId].icon;
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  type="button"
                  onClick={() => setActiveTab(tabId)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${isActive
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-md shadow-[#D4AF37]/25"
                    : "text-[#252220] hover:text-[#D4AF37] hover:bg-black/5"
                    }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span>{tabsData[tabId].label}</span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Tab Active Content Showcase Card */}
        <div className="relative min-h-[440px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[580px] rounded-3xl overflow-hidden shadow-lg border border-[#CBB3A5] flex flex-col justify-end p-5 sm:p-8 transition-all duration-300">
          <img
            key={current.image}
            src={current.image}
            alt={current.title}
            className={`absolute inset-0 w-full h-full object-cover ${current.imagePosition || "object-[center_12%]"} animate-in fade-in duration-300`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

          {/* Compact Frosted Glass Text Overlay Box */}
          <div className="relative z-10 max-w-md space-y-2 bg-black/45 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20">
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              {current.title}
            </h3>
            <p className="text-slate-200 text-xs leading-relaxed line-clamp-2">
              {current.subtitle}
            </p>

            <div className="pt-1">
              {current.isExternal ? (
                <a
                  href={current.ctaLink}
                  target={activeTab === "chat" ? "_blank" : undefined}
                  rel={activeTab === "chat" ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  {activeTab === "chat" ? (
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Phone className="w-3.5 h-3.5 text-[#DF3F6F]" />
                  )}
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              ) : (
                <Link
                  href={current.ctaLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:brightness-110 text-[#061C18] font-bold text-xs tracking-wide shadow-md transition-all active:scale-95"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
