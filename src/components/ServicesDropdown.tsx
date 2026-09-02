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
      className="w-full bg-white border-b border-gray-200 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SUPPORT_LIST.map((item, idx) => {
            const IconComp = item.icon;

            if (item.isExternal) {
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="group p-4 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-orange-200 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        {item.badge}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-gray-900 group-hover:text-snowcem-orange transition-colors mb-1">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-2">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100/80 flex items-center text-[11px] font-bold text-snowcem-navy group-hover:text-snowcem-orange transition-colors">
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className="group p-4 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-purple-200 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {item.badge}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-gray-900 group-hover:text-snowcem-orange transition-colors mb-1">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100/80 flex items-center text-[11px] font-bold text-snowcem-navy group-hover:text-snowcem-orange transition-colors">
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
