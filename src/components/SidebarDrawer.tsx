"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo";
import { X, ChevronDown, ChevronRight } from "lucide-react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  name: string;
  href?: string;
  subItems?: { name: string; href: string }[];
}

const MENU_ITEMS: NavItem[] = [
  {
    id: "about",
    name: "ABOUT US",
    subItems: [
      { name: "The Snowcem Story", href: "/about-us/the-snowcem-story" },
      { name: "True Colours of Life", href: "/about-us/true-colours-of-life" },
      { name: "About Mehta Group", href: "/about-us/about-mehta-group" },
    ],
  },
  {
    id: "products",
    name: "PRODUCTS",
    subItems: [
      { name: "Exterior Emulsion Paints (All Guard, Snowcryl)", href: "#" },
      { name: "Interior Emulsion Paints (Sentino, Zenita)", href: "#" },
      { name: "Waterproofing Paints (Waterproof Plus)", href: "#" },
      { name: "Primers & Undercoats", href: "#" },
      { name: "Cement Paints (Snowcem Plus)", href: "#" },
      { name: "Wall Putty & Care", href: "#" },
      { name: "Designer Textures", href: "#" },
    ],
  },
  {
    id: "dealer",
    name: "FIND DEALER",
    href: "/find-dealer",
  },
  {
    id: "tools",
    name: "TOOLS",
    subItems: [
      { name: "Paint Budget Calculator", href: "#" },
      { name: "Colour Catalogue PDF", href: "#" },
      { name: "Colour Visualiser", href: "#" },
    ],
  },
  {
    id: "media",
    name: "MEDIA",
    href: "/media",
  },
  {
    id: "life",
    name: "LIFE @ SNOWCEM",
    href: "/life-at-snowcem",
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
    subItems: [
      { name: "Customer Support Helpline", href: "/contact-us" },
      { name: "Dealer Inquiry", href: "/contact-us" },
      { name: "Head Office Location", href: "/contact-us" },
    ],
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
        className={`fixed inset-y-0 right-0 w-80 sm:w-96 bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200 z-[10000] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10 shadow-xs">
          <Logo compact={true} />
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-snowcem-orange rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items with Accordion Sub-options */}
        <div className="p-5 flex-grow space-y-1">
          {MENU_ITEMS.map((item) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                {hasSub ? (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center justify-between py-3.5 px-2 text-sm font-semibold text-gray-800 hover:text-snowcem-orange transition-colors text-left"
                  >
                    <span className="tracking-wider">{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-snowcem-orange" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href || "#"}
                    onClick={onClose}
                    className="group flex items-center justify-between py-3.5 px-2 text-sm font-semibold text-gray-800 hover:text-snowcem-orange transition-colors"
                  >
                    <span className="tracking-wider">{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-snowcem-orange group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}

                {/* Sub-options Accordion Dropdown */}
                {hasSub && isExpanded && (
                  <div className="pl-3 pb-3 space-y-1 bg-gray-50/80 rounded-xl p-2 my-1 border border-gray-100">
                    {item.subItems!.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href={sub.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold text-gray-700 hover:text-snowcem-orange hover:bg-white transition-all"
                      >
                        <span>{sub.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400 font-normal">
          © Snowcem Paints India Ltd. All rights reserved.
        </div>
      </aside>
    </div>,
    document.body
  );
}
