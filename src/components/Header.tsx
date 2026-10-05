"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ProductsMegaMenu from "./ProductsMegaMenu";
import ToolsMegaMenu from "./ToolsMegaMenu";
import AboutUsMegaMenu from "./AboutUsMegaMenu";
import ServicesDropdown from "./ServicesDropdown";
import SidebarDrawer from "./SidebarDrawer";
import { Menu, ChevronDown, MapPin, Paintbrush, Phone, Newspaper, Briefcase, MessageCircle } from "lucide-react";

type ActiveMenu = "products" | "tools" | "about" | "support" | null;

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
      className="w-full relative z-40 bg-[#EDE4D8] border-b border-[#D6C5B3] shadow-xs transition-colors duration-300"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* 1. TOP RAZOR-THIN BRAND ACCENT */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F]" />

      {/* 2. TOP ANNOUNCEMENT BAR (Media, Careers, Helpline) */}
      <div className="hidden md:block bg-[#E2D5C5] border-b border-[#D6C5B3] text-[#5A5148] text-xs py-1.5 px-6 sm:px-10 lg:px-14">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DF3F6F] animate-pulse" />
            <span className="text-[11px] font-medium text-[#4A423A] tracking-wide font-sans">
              India&apos;s Pioneer in Waterproofing & Cement Paints Since 1959
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px] font-medium">
            <Link
              href="/media"
              className="flex items-center gap-1 text-[#665D54] hover:text-[#5B6BB5] transition-colors"
            >
              <Newspaper className="w-3.5 h-3.5 text-[#5B6BB5]" />
              <span>Media</span>
            </Link>

            <Link
              href="/careers"
              className="flex items-center gap-1 text-[#665D54] hover:text-[#DF3F6F] transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#DF3F6F]" />
              <span>Careers</span>
            </Link>

            <a
              href="tel:18002095656"
              className="flex items-center gap-1 text-[#3B342E] hover:text-[#5B6BB5] font-semibold pl-3 border-l border-[#D6C5B3] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#5B6BB5]" />
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
            <div id="navbar-logo-desktop" className="flex items-center shrink-0">
              <Logo />
            </div>

            {/* Nav Items Beside Logo */}
            <nav className="flex items-center space-x-1 xl:space-x-2 text-xs font-semibold tracking-wider text-[#2D2824] uppercase font-heading">
              {/* 1. PRODUCTS */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("products")}
                  onClick={() => setActiveMenu(activeMenu === "products" ? null : "products")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${activeMenu === "products"
                      ? "text-[#DF3F6F] bg-black/5 font-bold"
                      : "text-[#2D2824] hover:text-[#DF3F6F] hover:bg-black/5"
                    }`}
                >
                  <span>PRODUCTS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "products" ? "rotate-180 text-[#DF3F6F]" : "text-[#7C736A]"
                      }`}
                  />
                </button>
              </div>

              {/* 2. TOOLS */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("tools")}
                  onClick={() => setActiveMenu(activeMenu === "tools" ? null : "tools")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${activeMenu === "tools"
                      ? "text-[#DF3F6F] bg-black/5 font-bold"
                      : "text-[#2D2824] hover:text-[#DF3F6F] hover:bg-black/5"
                    }`}
                >
                  <span>TOOLS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "tools" ? "rotate-180 text-[#DF3F6F]" : "text-[#7C736A]"
                      }`}
                  />
                </button>
              </div>

              {/* 3. ABOUT SNOWCEM */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("about")}
                  onClick={() => setActiveMenu(activeMenu === "about" ? null : "about")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${activeMenu === "about"
                      ? "text-[#DF3F6F] bg-black/5 font-bold"
                      : "text-[#2D2824] hover:text-[#DF3F6F] hover:bg-black/5"
                    }`}
                >
                  <span>ABOUT SNOWCEM</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "about" ? "rotate-180 text-[#DF3F6F]" : "text-[#7C736A]"
                      }`}
                  />
                </button>
              </div>

              {/* 4. SUPPORT */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("support")}
                  onClick={() => setActiveMenu(activeMenu === "support" ? null : "support")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${activeMenu === "support"
                      ? "text-[#DF3F6F] bg-black/5 font-bold"
                      : "text-[#2D2824] hover:text-[#DF3F6F] hover:bg-black/5"
                    }`}
                >
                  <span>SUPPORT</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "support" ? "rotate-180 text-[#DF3F6F]" : "text-[#7C736A]"
                      }`}
                  />
                </button>
              </div>

              {/* 5. COLORED BLOGS */}
              <div className="relative py-6">
                <Link
                  href="/blogs"
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${
                    pathname === "/blogs" || pathname === "/colour-blogs"
                      ? "text-[#DF3F6F] bg-black/5 font-bold"
                      : "text-[#2D2824] hover:text-[#DF3F6F] hover:bg-black/5"
                  }`}
                >
                  <span>COLORED BLOGS</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Right Action: Dual-Tone Gradient Buttons */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Dealer Button (Primary Gradient) */}
            <Link
              href="/find-dealers"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap group font-heading"
            >
              <MapPin className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
              <span>Dealer Near You</span>
            </Link>

            {/* Painter Button */}
            <Link
              href="/find-painters"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#D6C5B3] text-[#2D2824] text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-sm transition-all active:scale-95 whitespace-nowrap group font-heading"
            >
              <Paintbrush className="w-3.5 h-3.5 text-[#DF3F6F] group-hover:scale-110 transition-transform" />
              <span>Painter Near You</span>
            </Link>
          </div>
        </div>

        {/* MOBILE ROW */}
        <div className="flex lg:hidden items-center justify-between h-16">
          <div id="navbar-logo-mobile" className="flex items-center">
            <Logo compact={true} />
          </div>

          <div className="flex items-center space-x-1.5">
            <Link
              href="/find-dealers"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-[11px] font-bold shadow-xs active:scale-95 transition-transform whitespace-nowrap font-heading"
            >
              <MapPin className="w-3 h-3 text-white" />
              <span>Dealer</span>
            </Link>

            <Link
              href="/find-painters"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D6C5B3] text-[#2D2824] text-[11px] font-bold shadow-xs active:scale-95 transition-transform whitespace-nowrap font-heading"
            >
              <Paintbrush className="w-3 h-3 text-[#DF3F6F]" />
              <span>Painter</span>
            </Link>

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 text-[#2D2824] hover:text-black focus:outline-none rounded-xl hover:bg-black/5 transition-colors ml-1"
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
          onMouseEnter={() => { }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {activeMenu === "products" && (
            <ProductsMegaMenu onClose={() => setActiveMenu(null)} />
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



