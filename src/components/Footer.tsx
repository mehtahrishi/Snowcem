"use client";

import React from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Simple Firm Header Row Above Columns (Left Brand Logo, Right Summary Text) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-10 mb-12 border-b border-gray-200 gap-6">
          <Logo compact={false} />
          <p className="text-sm md:text-base text-gray-600 max-w-xl font-normal leading-relaxed">
            Snowcem Paints is India's pioneer in high-performance interior & exterior emulsions, cement paints, waterproofing coats, and primers since 1959. Part of the renowned Mehta Group legacy.
          </p>
        </div>

        {/* 4 Footer Columns Matching Screenshot Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          
          {/* Column 1: About us */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#0c1446]">
              About us
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  The Snowcem Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  True Colours of Life
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  About Mehta Group
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#0c1446]">
              Products
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Exterior Emulsion Paints
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Interior Emulsion Paints
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Primers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Waterproofing Paints
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Cement Paints
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Putty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Snowcare Range
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Distemper
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Textures
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#0c1446]">
              Tools
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Paint Budget Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Colour Catalogue
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Colour Visualiser
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#0c1446]">
              Connect
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Find Dealer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-snowcem-orange transition-colors block">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-normal">
          <p>© {new Date().getFullYear()} Snowcem Paints India Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Use</a>
            <a href="#" className="hover:text-gray-900">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
