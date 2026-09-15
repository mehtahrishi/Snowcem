"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Logo from "./Logo";
import { X, ChevronDown, ChevronRight, Phone } from "lucide-react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  name: string;
  href?: string;
  isExternal?: boolean;
  subItems?: { name: string; href: string; isExternal?: boolean }[];
}

const MENU_ITEMS: NavItem[] = [
  {
    id: "products",
    name: "PRODUCTS",
    subItems: [
      { name: "Exterior Emulsion Paints", href: "/products/exterior-emulsion-paints" },
      { name: "Interior Emulsion Paints", href: "/products/interior-emulsion-paints" },
      { name: "Waterproofing Solutions", href: "/products/waterproofing-paints" },
      { name: "Primers & Undercoats", href: "/products/primers" },
      { name: "Cement Paints", href: "/products/cement-paints" },
      { name: "Wall Putty & Care", href: "/products/putty" },
      { name: "Textures", href: "/products/textures" },
      { name: "Snowcare Range", href: "/products/snowcare-range" },
      { name: "Distemper", href: "/products/distemper" },
    ],
  },
  {
    id: "colours",
    name: "COLOURS",
    subItems: [
      { name: "Colour Catalogue (1,800+ Shades)", href: "/color-catalogue" },
      { name: "Colour Inspiration", href: "/festive-studio" },
      { name: "Colour Blogs & Guides", href: "/blogs" },
    ],
  },
  {
    id: "tools",
    name: "TOOLS",
    subItems: [
      { name: "Paint Calculator", href: "/paint-calculator" },
      { name: "Colour Visualizer", href: "/color-visualizer" },
      { name: "Festive Studio", href: "/festive-studio" },
    ],
  },
  {
    id: "about",
    name: "ABOUT SNOWCEM",
    subItems: [
      { name: "The Snowcem Story (Est. 1959)", href: "/about-us/the-snowcem-story" },
      { name: "About Mehta Group", href: "/about-us/about-mehta-group" },
      { name: "Team & Leadership", href: "/about-us/about-mehta-group" },
      { name: "Awards & Recognition", href: "/about-us/the-snowcem-story" },
      { name: "Life @ Snowcem", href: "/life-at-snowcem" },
    ],
  },
  {
    id: "support",
    name: "SUPPORT",
    subItems: [
      { name: "Call Support (1800-209-5656)", href: "tel:18002095656", isExternal: true },
      {
        name: "WhatsApp Support (+91 81046 97547)",
        href: "https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0",
        isExternal: true,
      },
      { name: "Chat Support & Consultation", href: "/contact-us" },
      { name: "Technical Advisory & Inquiries", href: "/contact-us" },
    ],
  },
  {
    id: "dealer",
    name: "DEALER NEAR YOU",
    href: "/find-dealer",
  },
  {
    id: "painter",
    name: "PAINTER NEAR YOU",
    href: "/find-dealer",
  },
  {
    id: "media",
    name: "MEDIA & NEWS",
    href: "/media",
  },
  {
    id: "careers",
    name: "CAREERS",
    href: "/careers",
  },
  {
    id: "contact",
    name: "CONTACT US",
    href: "/contact-us",
  },
];

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>("products");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Dark Overlay Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Right Slide-over Panel */}
      <aside
        className={`fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#0B0B0E] text-white shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-white/10 z-[10000] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0B0B0E] sticky top-0 z-10">
          <div className="bg-white/95 px-2.5 py-1 rounded-lg">
            <Logo compact={true} />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items with Accordion Sub-options */}
        <div className="p-4 flex-grow space-y-1">
          {MENU_ITEMS.map((item) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="border-b border-white/10 last:border-b-0">
                {hasSub ? (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center justify-between py-3 px-2 text-xs font-bold text-slate-200 hover:text-[#DF3F6F] transition-colors text-left uppercase tracking-wider font-heading"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#DF3F6F]" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={onClose}
                    className="group flex items-center justify-between py-3 px-2 text-xs font-bold text-slate-200 hover:text-[#DF3F6F] transition-colors uppercase tracking-wider font-heading"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#DF3F6F] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}

                {/* Sub-options Accordion Dropdown */}
                {hasSub && isExpanded && (
                  <div className="pl-3 pb-2 space-y-1 bg-[#15151B] rounded-xl p-2 my-1 border border-white/10">
                    {item.subItems!.map((sub, sIdx) => {
                      if (sub.isExternal) {
                        return (
                          <a
                            key={sIdx}
                            href={sub.href}
                            onClick={onClose}
                            className="group flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <span>{sub.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#DF3F6F] transition-colors" />
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={onClose}
                          className="group flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <span>{sub.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#DF3F6F] transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support */}
        <div className="p-4 border-t border-white/10 bg-[#070709] text-white space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#5B6BB5]" />
              <span className="text-xs font-bold font-heading">1800-209-5656</span>
            </div>
            <a
              href="tel:18002095656"
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white"
            >
              Toll Free
            </a>
          </div>
          <p className="text-[10px] text-slate-400 font-normal text-center pt-1">
            © Snowcem Paints India Ltd. All rights reserved.
          </p>
        </div>
      </aside>
    </div>,
    document.body
  );
}

