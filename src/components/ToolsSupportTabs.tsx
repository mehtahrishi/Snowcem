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
} from "lucide-react";

interface ToolsSupportTabsProps {
  toolType?: "colorvisualizer" | "calculator";
}

export default function ToolsSupportTabs({ toolType = "colorvisualizer" }: ToolsSupportTabsProps) {
  const [activeTab, setActiveTab] = useState<"dealer" | "painter" | "call" | "chat">("dealer");

  const basePath = `/tools/${toolType}`;

  const tabsData = {
    dealer: {
      title: "Find Authorized Snowcem Dealer Near You",
      subtitle:
        "Locate certified retail stores near you for authentic Snowcem emulsions, waterproof cement paints, and computerized tinting machines.",
      image: `${basePath}/dealer.png`,
      ctaText: "Find a Dealer Near Me",
      ctaLink: "/find-dealer",
      isExternal: false,
    },
    painter: {
      title: "Connect with Certified Professional Painters",
      subtitle:
        "Get in touch with trained and verified Snowcem painting contractors with guaranteed surface preparation, primer sealing, and immaculate finish.",
      image: `${basePath}/painter.png`,
      ctaText: "Find a Painter Near Me",
      ctaLink: "/find-dealer?type=painter",
      isExternal: false,
    },
    call: {
      title: "Speak Directly with Snowcem Paint Specialists",
      subtitle:
        "Need instant advice on paint quantity estimation, water-proofing solutions, or substrate priming? Our toll-free helpline is available Mon-Sat (9 AM - 6 PM).",
      image: `${basePath}/call-support.png`,
      ctaText: "Call 1800-209-5656",
      ctaLink: "tel:18002095656",
      isExternal: true,
    },
    chat: {
      title: "Online Chat & Expert Colour Consultation",
      subtitle:
        "Chat directly with our shade styling specialists on WhatsApp (+91 81046 97547) for personalized palettes, exterior contrast matching, and technical guidance.",
      image: `${basePath}/chat.png`,
      ctaText: "Chat on WhatsApp (#snowsense)",
      ctaLink: "https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0",
      isExternal: true,
    },
  };

  const current = tabsData[activeTab];

  return (
    <section className="py-10 sm:py-14 bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Pill Tab Bar (Matching Exact Screenshot Styling) */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-full border border-gray-200 shadow-md inline-flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full scrollbar-none">
            
            {/* Tab 1: Dealer Near Me */}
            <button
              type="button"
              onClick={() => setActiveTab("dealer")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === "dealer"
                  ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Store className="w-4 h-4 shrink-0" />
              <span>Dealer Near Me</span>
            </button>

            {/* Tab 2: Painter Near Me */}
            <button
              type="button"
              onClick={() => setActiveTab("painter")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === "painter"
                  ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Paintbrush className="w-4 h-4 shrink-0" />
              <span>Painter Near Me</span>
            </button>

            {/* Tab 3: Call Support */}
            <button
              type="button"
              onClick={() => setActiveTab("call")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === "call"
                  ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Support</span>
            </button>

            {/* Tab 4: Online Chat */}
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === "chat"
                  ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Online Chat</span>
            </button>

          </div>
        </div>

        {/* Tab Active Content Showcase Card (Compact overlay, fully visible image) */}
        <div className="relative h-[340px] sm:h-[390px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-end p-4 sm:p-6 transition-all duration-300">
          <img
            key={current.image}
            src={current.image}
            alt={current.title}
            className="absolute inset-0 w-full h-full object-cover object-center animate-in fade-in duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

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
                    <Phone className="w-3.5 h-3.5 text-[#e91e63]" />
                  )}
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              ) : (
                <Link
                  href={current.ctaLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 border border-white/40 font-bold text-xs tracking-wide shadow-md transition-all active:scale-95"
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
