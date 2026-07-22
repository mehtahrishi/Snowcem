"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import ProductsMegaMenu from "./ProductsMegaMenu";
import SidebarDrawer from "./SidebarDrawer";
import { Menu } from "lucide-react";

export default function Header() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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
            <a
              href="#"
              onClick={() => setIsProductsOpen(false)}
              className="hover:text-snowcem-orange transition-colors"
            >
              ABOUT US
            </a>

            {/* PRODUCTS Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`hover:text-snowcem-orange transition-colors uppercase font-semibold tracking-wider py-1 flex items-center gap-1 ${
                  isProductsOpen ? "text-snowcem-orange border-b-2 border-snowcem-orange" : ""
                }`}
              >
                PRODUCTS
              </button>

              {/* PRODUCTS Mega Menu matching Screenshot 2 */}
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-0 pt-0">
                  <ProductsMegaMenu onClose={() => setIsProductsOpen(false)} />
                </div>
              )}
            </div>

            <a
              href="#"
              onClick={() => setIsProductsOpen(false)}
              className="hover:text-snowcem-orange transition-colors"
            >
              FIND DEALER
            </a>
            <a
              href="#"
              onClick={() => setIsProductsOpen(false)}
              className="hover:text-snowcem-orange transition-colors"
            >
              TOOLS
            </a>
          </nav>

          {/* Center Brand Logo Component for Desktop */}
          <div className="flex items-center justify-center px-4">
            <Logo compact={isScrolled} />
          </div>

          {/* Right Navigation Links */}
          <nav className="flex items-center space-x-7 text-sm font-semibold tracking-wider text-gray-800 uppercase">
            <a
              href="#"
              onClick={() => setIsProductsOpen(false)}
              className="hover:text-snowcem-orange transition-colors"
            >
              MEDIA
            </a>
            <a
              href="#"
              onClick={() => setIsProductsOpen(false)}
              className="hover:text-snowcem-orange transition-colors"
            >
              LIFE @ SNOWCEM
            </a>
            <a
              href="#"
              onClick={() => setIsProductsOpen(false)}
              className="hover:text-snowcem-orange transition-colors"
            >
              CAREERS
            </a>
            <a
              href="#"
              onClick={() => setIsProductsOpen(false)}
              className="hover:text-snowcem-orange transition-colors"
            >
              CONTACT US
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
