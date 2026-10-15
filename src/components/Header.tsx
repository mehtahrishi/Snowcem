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
      className="w-full relative z-40 bg-[#061C18] border-b border-[#D8C7B3]/25 shadow-md transition-colors duration-300"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* 1. TOP RAZOR-THIN BRAND ACCENT */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]" />

      {/* 2. TOP ANNOUNCEMENT BAR (Media, Careers, Helpline) */}
      <div className="hidden md:block bg-[#0A2621] border-b border-[#D8C7B3]/20 text-[#EDE4D8] text-xs py-1.5 px-6 sm:px-10 lg:px-14">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[11px] font-medium text-[#EDE4D8]/90 tracking-wide font-sans">
              India&apos;s Pioneer in Waterproofing & Cement Paints Since 1959
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px] font-medium">
            <Link
              href="/media"
              className="flex items-center gap-1 text-[#C2B69D] hover:text-[#D4AF37] transition-colors"
            >
              <Newspaper className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Media</span>
            </Link>

            <Link
              href="/careers"
              className="flex items-center gap-1 text-[#C2B69D] hover:text-[#D4AF37] transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Careers</span>
            </Link>

            <a
              href="tel:18002095656"
              className="flex items-center gap-1 text-[#EDE4D8] hover:text-[#D4AF37] font-semibold pl-3 border-l border-[#D8C7B3]/30 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
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
            <nav className="flex items-center space-x-1 xl:space-x-2 text-xs font-semibold tracking-wider text-[#EDE4D8] uppercase font-heading">
              {/* 1. PRODUCTS */}
              <div className="relative py-6">
                <button
                  onMouseEnter={() => setActiveMenu("products")}
                  onClick={() => setActiveMenu(activeMenu === "products" ? null : "products")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap ${activeMenu === "products"
                      ? "text-[#D4AF37] bg-white/10 font-bold"
                      : "text-[#EDE4D8] hover:text-[#D4AF37] hover:bg-white/5"
                    }`}
                >
                  <span>PRODUCTS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "products" ? "rotate-180 text-[#D4AF37]" : "text-[#C2B69D]"
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
                      ? "text-[#D4AF37] bg-white/10 font-bold"
                      : "text-[#EDE4D8] hover:text-[#D4AF37] hover:bg-white/5"
                    }`}
                >
                  <span>TOOLS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "tools" ? "rotate-180 text-[#D4AF37]" : "text-[#C2B69D]"
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
                      ? "text-[#D4AF37] bg-white/10 font-bold"
                      : "text-[#EDE4D8] hover:text-[#D4AF37] hover:bg-white/5"
                    }`}
                >
                  <span>ABOUT SNOWCEM</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "about" ? "rotate-180 text-[#D4AF37]" : "text-[#C2B69D]"
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
                      ? "text-[#D4AF37] bg-white/10 font-bold"
                      : "text-[#EDE4D8] hover:text-[#D4AF37] hover:bg-white/5"
                    }`}
                >
                  <span>SUPPORT</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === "support" ? "rotate-180 text-[#D4AF37]" : "text-[#C2B69D]"
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
                      ? "text-[#D4AF37] bg-white/10 font-bold"
                      : "text-[#EDE4D8] hover:text-[#D4AF37] hover:bg-white/5"
                  }`}
                >
                  <span>COLORED BLOGS</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Right Action: Vanilla Gold Action Buttons */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Dealer Button (Vanilla Gold) */}
            <Link
              href="/find-dealers"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:brightness-110 text-[#061C18] text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap group font-heading"
            >
              <MapPin className="w-3.5 h-3.5 text-[#061C18] group-hover:scale-110 transition-transform" />
              <span>Dealer Near You</span>
            </Link>

            {/* Painter Button */}
            <Link
              href="/find-painters"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A2621] hover:bg-[#0E322B] border border-[#D8C7B3]/40 text-[#EDE4D8] hover:text-[#D4AF37] text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-sm transition-all active:scale-95 whitespace-nowrap group font-heading"
            >
              <Paintbrush className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
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
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] text-[11px] font-extrabold shadow-xs active:scale-95 transition-transform whitespace-nowrap font-heading"
            >
              <MapPin className="w-3 h-3 text-[#061C18]" />
              <span>Dealer</span>
            </Link>

            <Link
              href="/find-painters"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#0A2621] border border-[#D8C7B3]/40 text-[#EDE4D8] text-[11px] font-bold shadow-xs active:scale-95 transition-transform whitespace-nowrap font-heading"
            >
              <Paintbrush className="w-3 h-3 text-[#D4AF37]" />
              <span>Painter</span>
            </Link>

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 text-[#EDE4D8] hover:text-[#D4AF37] focus:outline-none rounded-xl hover:bg-white/10 transition-colors ml-1"
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
          className="absolute top-full left-0 w-full z-[100] bg-[#061C18]"
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



