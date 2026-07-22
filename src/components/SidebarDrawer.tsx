"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo";
import { X, ChevronRight } from "lucide-react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { name: "ABOUT US", href: "#" },
  { name: "PRODUCTS", href: "#" },
  { name: "FIND DEALER", href: "#" },
  { name: "TOOLS", href: "#" },
  { name: "MEDIA", href: "#" },
  { name: "LIFE @ SNOWCEM", href: "#" },
  { name: "CAREERS", href: "#" },
  { name: "CONTACT US", href: "#" },
];

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  const [mounted, setMounted] = useState(false);

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

      {/* Clean & Simple Right Slide-over Panel */}
      <aside
        className={`fixed inset-y-0 right-0 w-72 sm:w-80 bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200 z-[10000] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-snowcem-orange rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Simple Navigation Links List */}
        <div className="p-6 flex-grow">
          <ul className="divide-y divide-gray-100">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-3.5 px-2 text-sm font-semibold text-gray-800 hover:text-snowcem-orange transition-colors"
                >
                  <span className="tracking-wider">{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-snowcem-orange group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Simple Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400 font-normal">
          © Snowcem Paints India Ltd.
        </div>
      </aside>
    </div>,
    document.body
  );
}
