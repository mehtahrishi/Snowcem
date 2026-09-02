"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ProductsMegaMenu from "./ProductsMegaMenu";
import ColoursDropdown from "./ColoursDropdown";
import ToolsMegaMenu from "./ToolsMegaMenu";
import AboutUsMegaMenu from "./AboutUsMegaMenu";
import ServicesDropdown from "./ServicesDropdown";
import SidebarDrawer from "./SidebarDrawer";
import { Menu, ChevronDown, MapPin, Paintbrush, Phone, Newspaper, Briefcase, MessageCircle } from "lucide-react";

type ActiveMenu = "products" | "colours" | "tools" | "about" | "support" | null;

export default function Header() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close all dropdowns on route change
  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

  return (
    <header
      className="w-full relative z-40 bg-white border-b border-gray-100 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)]"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* 1. TOP RAZOR-THIN BRAND ACCENT */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63]" />

      {/* 2. TOP ANNOUNCEMENT BAR (Media, Careers, Helpline with Authentic Snowcem Chatbot Gradient) */}
      <div className="hidden md:block bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs py-1.5 px-6 sm:px-10 lg:px-14 shadow-xs">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            <span className="text-[11px] font-semibold text-white tracking-wide">
              India's Pioneer in Waterproofing & Cement Paints Since 1959
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px] font-medium">
            <Link
              href="/media"
              className="flex items-center gap-1 text-white/90 hover:text-amber-300 transition-colors"
            >
              <Newspaper className="w-3.5 h-3.5 text-amber-300" />
              <span>Media</span>
            </Link>

            <Link
              href="/careers"
              className="flex items-center gap-1 text-white/90 hover:text-amber-300 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-pink-200" />
              <span>Careers</span>
            </Link>

            <a
              href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-100 font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:18002095656"
              className="flex items-center gap-1 text-white hover:text-amber-300 font-bold pl-3 border-l border-white/20 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>1800-209-5656 (Toll Free)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVBAR */}
      <div className="w-full px-6 sm:px-10 lg:px-14">
        {/* DESKTOP ROW */}
        <div className="hidden lg:flex items-center justify-between gap-6 h-20">
          {/* Left: Brand Logo + Primary Nav Items */}
          <div className="flex items-center space-x-8">
            {/* Logo on Left Side */}
            <div className="flex items-center shrink-0">
              <Logo />
            </div>

            {/* Nav Items Beside Logo */}
            <nav className="flex items-center space-x-1 xl:space-x-2 text-xs font-bold tracking-wider text-gray-800 uppercase">
              {/* 1. PRODUCTS */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("products")}
                  onClick={() => setActiveMenu(activeMenu === "products" ? null : "products")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                    activeMenu === "products"
                      ? "text-[#e91e63] bg-pink-50/80"
                      : "text-gray-800 hover:text-[#e91e63] hover:bg-gray-50"
                  }`}
                >
                  <span>PRODUCTS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeMenu === "products" ? "rotate-180 text-[#e91e63]" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* 2. COLOURS */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("colours")}
                  onClick={() => setActiveMenu(activeMenu === "colours" ? null : "colours")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                    activeMenu === "colours"
                      ? "text-[#2a1b92] bg-indigo-50/80"
                      : "text-gray-800 hover:text-[#2a1b92] hover:bg-gray-50"
                  }`}
                >
                  <span>COLOURS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeMenu === "colours" ? "rotate-180 text-[#2a1b92]" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* 3. TOOLS */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("tools")}
                  onClick={() => setActiveMenu(activeMenu === "tools" ? null : "tools")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                    activeMenu === "tools"
                      ? "text-[#5c249c] bg-purple-50/80"
                      : "text-gray-800 hover:text-[#5c249c] hover:bg-gray-50"
                  }`}
                >
                  <span>TOOLS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeMenu === "tools" ? "rotate-180 text-[#5c249c]" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* 4. ABOUT SNOWCEM */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("about")}
                  onClick={() => setActiveMenu(activeMenu === "about" ? null : "about")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                    activeMenu === "about"
                      ? "text-[#e91e63] bg-pink-50/80"
                      : "text-gray-800 hover:text-[#e91e63] hover:bg-gray-50"
                  }`}
                >
                  <span>ABOUT SNOWCEM</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeMenu === "about" ? "rotate-180 text-[#e91e63]" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* 5. SUPPORT */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("support")}
                  onClick={() => setActiveMenu(activeMenu === "support" ? null : "support")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                    activeMenu === "support"
                      ? "text-[#2a1b92] bg-indigo-50/80"
                      : "text-gray-800 hover:text-[#2a1b92] hover:bg-gray-50"
                  }`}
                >
                  <span>SUPPORT</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeMenu === "support" ? "rotate-180 text-[#2a1b92]" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </nav>
          </div>

          {/* Right Action: Separate Dealer & Painter Buttons using Authentic Brand Gradient Combo */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Dealer Button (Indigo to Purple Gradient) */}
            <Link
              href="/find-dealer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#2a1b92] to-[#5c249c] hover:from-[#21157a] hover:to-[#4a1c80] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap group"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Dealer Near You</span>
            </Link>

            {/* Painter Button (Purple to Magenta Gradient) */}
            <Link
              href="/find-dealer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#5c249c] to-[#e91e63] hover:from-[#4a1c80] hover:to-[#d01755] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap group"
            >
              <Paintbrush className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
              <span>Painter Near You</span>
            </Link>
          </div>
        </div>

        {/* MOBILE ROW */}
        <div className="flex lg:hidden items-center justify-between h-16">
          <div className="flex items-center">
            <Logo compact={true} />
          </div>

          <div className="flex items-center space-x-1.5">
            <Link
              href="/find-dealer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#2a1b92] to-[#5c249c] text-white text-[11px] font-bold shadow-xs active:scale-95 transition-transform whitespace-nowrap"
            >
              <MapPin className="w-3 h-3 text-amber-300" />
              <span>Dealer</span>
            </Link>

            <Link
              href="/find-dealer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#5c249c] to-[#e91e63] text-white text-[11px] font-bold shadow-xs active:scale-95 transition-transform whitespace-nowrap"
            >
              <Paintbrush className="w-3 h-3 text-white" />
              <span>Painter</span>
            </Link>

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 text-gray-700 hover:text-gray-900 focus:outline-none rounded-xl hover:bg-gray-100 transition-colors ml-1"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. FULL-WIDTH MEGA MENU POPOVER CONTAINER */}
      {activeMenu && (
        <div
          className="absolute top-full left-0 w-full z-[100]"
          onMouseEnter={() => {}}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {activeMenu === "products" && (
            <ProductsMegaMenu onClose={() => setActiveMenu(null)} />
          )}
          {activeMenu === "colours" && (
            <ColoursDropdown onClose={() => setActiveMenu(null)} />
          )}
          {activeMenu === "tools" && (
            <ToolsMegaMenu onClose={() => setActiveMenu(null)} />
          )}
          {activeMenu === "about" && (
            <AboutUsMegaMenu onClose={() => setActiveMenu(null)} />
          )}
          {activeMenu === "support" && (
            <ServicesDropdown onClose={() => setActiveMenu(null)} />
          )}
        </div>
      )}

      {/* MOBILE SLIDE-OVER DRAWER */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </header>
  );
}



