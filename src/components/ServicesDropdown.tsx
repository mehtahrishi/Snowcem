"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";

interface ServicesDropdownProps {
  onClose?: () => void;
}

const SUPPORT_LIST = [
  {
    title: "Call Support (1800-209-5656)",
    subtitle: "Toll-free nationwide helpline for technical advice, waterproofing solutions, and product assistance.",
    href: "tel:18002095656",
    icon: Phone,
    color: "from-amber-500 to-orange-600",
    badge: "1800-209-5656",
    cta: "Call Helpline (Toll Free)",
    isExternal: true,
  },
  {
    title: "WhatsApp Chat Support (#snowsense)",
    subtitle: "Connect directly with our paint & colour experts on WhatsApp (+91 81046 97547).",
    href: "https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0",
    icon: MessageCircle,
    color: "from-emerald-500 to-teal-600",
    badge: "Instant WhatsApp",
    cta: "Chat on WhatsApp",
    isExternal: true,
  },
  {
    title: "Technical Advisory & Queries",
    subtitle: "Submit project inquiries, warranty questions, or request official technical paint datasheets.",
    href: "/contact-us",
    icon: HelpCircle,
    color: "from-blue-600 to-indigo-600",
    badge: "Expert Team",
    cta: "Submit Inquiry",
    isExternal: false,
  },
];

export default function ServicesDropdown({ onClose }: ServicesDropdownProps) {
  return (
    <div
      className="w-full bg-canvas border-b border-[#cbb3a5]/70 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SUPPORT_LIST.map((item, idx) => {
            const IconComp = item.icon;
            
            // Helper for the card structure to avoid duplication
            const CardContent = (
              <div className="group p-4 rounded-xl border border-stone-300/60 bg-white/70 hover:bg-white hover:border-[#D83E78]/50 shadow-xs transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5B5BAB] to-[#D83E78] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform"
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-stone-200/80 text-slate-700 uppercase tracking-widest font-label border border-stone-300/60">
                      {item.badge}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#D83E78] transition-colors mb-1 font-heading">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors font-heading">
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#D83E78] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );

            if (item.isExternal) {
              return (
                <a key={idx} href={item.href} onClick={onClose}>
                  {CardContent}
                </a>
              );
            }

            return (
              <Link key={idx} href={item.href} onClick={onClose}>
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
