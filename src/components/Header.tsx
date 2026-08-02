"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import ProductsMegaMenu from "./ProductsMegaMenu";
import AboutUsMegaMenu from "./AboutUsMegaMenu";
import ToolsMegaMenu from "./ToolsMegaMenu";
import SidebarDrawer from "./SidebarDrawer";
import { Menu } from "lucide-react";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth scroll listener for desktop height shrinking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT (Center Brand Logo, Left & Right Nav Links, Shrinks on Scroll) */}
        <div
          className={`hidden lg:flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? "h-14 md:h-16" : "h-20 md:h-24"
          }`}
        >
          {/* Left Navigation Links */}
          <nav className="flex items-center space-x-7 text-sm font-semibold tracking-wider text-gray-800 uppercase">
            {/* ABOUT US Dropdown */}
            <div
              className="relative py-4 group"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className={`relative py-1 flex items-center gap-1 uppercase font-semibold tracking-wider transition-all ${
                  isAboutOpen
                    ? "bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent"
                }`}
              >
                ABOUT US
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange transition-all duration-300 ${
                    isAboutOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </button>

              {/* ABOUT US Mega Menu */}
              {isAboutOpen && (
                <div className="absolute top-full left-0 mt-0 pt-0">
                  <AboutUsMegaMenu onClose={() => setIsAboutOpen(false)} />
                </div>
              )}
            </div>

            {/* PRODUCTS Dropdown */}
            <div
              className="relative py-4 group"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`relative py-1 flex items-center gap-1 uppercase font-semibold tracking-wider transition-all ${
                  isProductsOpen
                    ? "bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent"
                }`}
              >
                PRODUCTS
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange transition-all duration-300 ${
                    isProductsOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </button>

              {/* PRODUCTS Mega Menu */}
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-0 pt-0">
                  <ProductsMegaMenu onClose={() => setIsProductsOpen(false)} />
                </div>
              )}
            </div>

            <a
              href="#"
              onClick={() => {
                setIsAboutOpen(false);
                setIsProductsOpen(false);
                setIsToolsOpen(false);
              }}
              className="relative py-1 group text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent transition-all"
            >
              FIND DEALER
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300" />
            </a>

            {/* TOOLS Dropdown */}
            <div
              className="relative py-4 group"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`relative py-1 flex items-center gap-1 uppercase font-semibold tracking-wider transition-all ${
                  isToolsOpen
                    ? "bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent"
                }`}
              >
                TOOLS
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange transition-all duration-300 ${
                    isToolsOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </button>

              {/* TOOLS Mega Menu */}
              {isToolsOpen && (
                <div className="absolute top-full left-0 mt-0 pt-0">
                  <ToolsMegaMenu onClose={() => setIsToolsOpen(false)} />
                </div>
              )}
            </div>
          </nav>

          {/* Center Brand Logo Component for Desktop */}
          <div className="flex items-center justify-center px-4">
            <Logo compact={isScrolled} />
          </div>

          {/* Right Navigation Links */}
          <nav className="flex items-center space-x-7 text-sm font-semibold tracking-wider text-gray-800 uppercase">
            <a
              href="#"
              onClick={() => {
                setIsAboutOpen(false);
                setIsProductsOpen(false);
                setIsToolsOpen(false);
              }}
              className="relative py-1 group text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent transition-all"
            >
              MEDIA
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300" />
            </a>
            <a
              href="#"
              onClick={() => {
                setIsAboutOpen(false);
                setIsProductsOpen(false);
                setIsToolsOpen(false);
              }}
              className="relative py-1 group text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent transition-all"
            >
              LIFE @ SNOWCEM
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300" />
            </a>
            <a
              href="#"
              onClick={() => {
                setIsAboutOpen(false);
                setIsProductsOpen(false);
                setIsToolsOpen(false);
              }}
              className="relative py-1 group text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent transition-all"
            >
              CAREERS
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300" />
            </a>
            <a
              href="#"
              onClick={() => {
                setIsAboutOpen(false);
                setIsProductsOpen(false);
                setIsToolsOpen(false);
              }}
              className="relative py-1 group text-gray-800 hover:bg-gradient-to-r hover:from-snowcem-navy hover:via-snowcem-magenta hover:to-snowcem-orange hover:bg-clip-text hover:text-transparent transition-all"
            >
              CONTACT US
              <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300" />
            </a>
          </nav>
        </div>

        {/* MOBILE LAYOUT (Compact h-14 sm:h-16 with sleek compact logo) */}
        <div className="flex lg:hidden items-center justify-between h-14 sm:h-16">
          {/* Sleek Compact Logo on Left for Mobile */}
          <div className="flex items-center">
            <Logo compact={true} />
          </div>

          {/* Hamburger Menu Button on Right for Mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-gray-800 hover:text-snowcem-orange focus:outline-none transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

      </div>

      {/* Slide-over Sidebar Drawer on RIGHT (Mobile Only) */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </header>
  );
}
