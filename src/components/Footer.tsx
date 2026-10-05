"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GoogleReviewsCarousel from "./GoogleReviewsCarousel";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import {
  Youtube,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full max-w-full overflow-hidden bg-canvas text-[#5A5148] pt-0 pb-8 sm:pb-12">
      {/* 1. TOP FULL-WIDTH REVIEWS MARQUEE / SOCIAL PROOF BRIDGE */}
      <GoogleReviewsCarousel />

      {/* SEPARATOR BELOW GOOGLE REVIEWS CAROUSEL */}
      <div className="w-full border-t border-[#D6C5B3] mt-0 mb-6 sm:mb-8" />

      {/* 2. MAIN FOOTER CONTENT WRAPPER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* BRAND INTRO HEADER */}
        <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-[#D6C5B3] gap-6 md:gap-10">
          <div className="shrink-0">
            <Logo compact={false} />
          </div>
          <p className="text-sm sm:text-base text-[#5A5148] font-normal leading-relaxed max-w-xl text-left">
            India&apos;s heritage in high-performance architectural wall care, interior emulsions, cement paints, and exterior weatherproof protection since 1959. Part of the renowned Mehta Group legacy.
          </p>
        </div>

        {/* 3. BALANCED 4-COLUMN RESPONSIVE NAVIGATION GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 pb-10 sm:pb-12">
          {/* Column 1: Heritage & Story */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#1E1F24] uppercase tracking-wider font-heading">
              About Snowcem
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#5A5148]">
              <li>
                <a href="/about-us/the-snowcem-story" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  The Snowcem Story
                </a>
              </li>
              <li>
                <a href="/about-us/true-colours-of-life" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  True Colours of Life
                </a>
              </li>
              <li>
                <a href="/about-us/about-mehta-group" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  About Mehta Group
                </a>
              </li>
              <li>
                <a href="/media" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Media &amp; Press
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Careers at Snowcem
                </a>
              </li>
              <li>
                <a href="/life-at-snowcem" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Life @ Snowcem
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Products & Finishes */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#1E1F24] uppercase tracking-wider font-heading">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#5A5148]">
              {CATEGORIES_DATA.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="hover:text-[#DF3F6F] transition-colors block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 text-[#5B6BB5] font-semibold hover:underline text-xs"
                >
                  <span>Explore All Finishes</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Painting Tools & Inspiration */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#1E1F24] uppercase tracking-wider font-heading">
              Painting Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#5A5148]">
              <li>
                <Link href="/paint-calculator" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Paint Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/color-visualizer" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Virtual Colour Visualizer
                </Link>
              </li>
              <li>
                <Link href="/color-catalogue" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  1,800+ Colour Catalogue
                </Link>
              </li>
              <li>
                <a href="/blogs" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Inspiration &amp; Decor Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Network & Direct Support */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#1E1F24] uppercase tracking-wider font-heading">
              Connect &amp; Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#5A5148]">
              <li>
                <a href="/find-dealer" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Find Nearest Dealer
                </a>
              </li>
              <li>
                <a href="/find-painter" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Find Certified Painter
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-[#DF3F6F] transition-colors block py-0.5">
                  Corporate Contact Us
                </a>
              </li>
              <li className="pt-1.5">
                <a
                  href="tel:18002095656"
                  className="flex items-center gap-2 text-xs font-semibold text-[#1E1F24] hover:text-[#5B6BB5] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5B6BB5] shrink-0" />
                  <span>1800-209-5656 (Toll-Free)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-[#1E1F24] hover:text-[#DF3F6F] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#DF3F6F] shrink-0" />
                  <span>WhatsApp (#snowsense)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:customercare@snowcempaints.com"
                  className="flex items-center gap-2 text-xs text-[#5A5148] hover:text-[#DF3F6F] transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#9E948A] shrink-0" />
                  <span className="truncate">customercare@snowcempaints.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. BOTTOM BAR WITH COPYRIGHT, UNIFIED SOCIALS, & VIRTU MEDIA BADGE */}
        <div className="pt-6 sm:pt-8 border-t border-[#D6C5B3] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-[#5A5148] font-normal">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Snowcem Paints India Ltd. All rights reserved.
          </p>

          {/* Unified Social Media Links */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D6C5B3] hover:bg-gradient-to-r hover:from-[#5B6BB5] hover:to-[#DF3F6F] text-[#5A5148] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D6C5B3] hover:bg-gradient-to-r hover:from-[#5B6BB5] hover:to-[#DF3F6F] text-[#5A5148] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D6C5B3] hover:bg-gradient-to-r hover:from-[#5B6BB5] hover:to-[#DF3F6F] text-[#5A5148] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D6C5B3] hover:bg-gradient-to-r hover:from-[#5B6BB5] hover:to-[#DF3F6F] text-[#5A5148] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D6C5B3] hover:bg-gradient-to-r hover:from-[#5B6BB5] hover:to-[#DF3F6F] text-[#5A5148] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Legal Links & Virtu Media Attribution */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-5">
            <a href="/privacy-policy" className="hover:text-[#DF3F6F] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="hover:text-[#DF3F6F] transition-colors">
              Terms &amp; Conditions
            </a>
            <span className="text-[#C4B2A0] hidden sm:inline">|</span>
            <p className="text-[#5A5148] font-medium flex items-center gap-1.5">
              <span>Developed by</span>
              <a
                href="https://virtumedia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 group/virtu hover:text-[#DF3F6F] transition-colors"
              >
                <img
                  src="https://virtumedia.in/logo.png"
                  alt="Virtu Media Favicon"
                  className="w-4 h-4 object-contain rounded-xs transition-transform duration-200 group-hover/virtu:scale-110"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = "true";
                      target.src = "https://www.google.com/s2/favicons?domain=virtumedia.in&sz=64";
                    }
                  }}
                />
                <span className="font-semibold text-[#1E1F24] tracking-wide group-hover/virtu:text-[#DF3F6F] transition-colors">
                  Virtu Media
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
