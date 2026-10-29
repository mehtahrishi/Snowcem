"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GoogleReviewsCarousel from "./GoogleReviewsCarousel";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full max-w-full overflow-hidden bg-canvas text-[#C2B69D] pt-0 pb-8 sm:pb-12">
      {/* 1. TOP FULL-WIDTH REVIEWS MARQUEE / SOCIAL PROOF BRIDGE */}
      <GoogleReviewsCarousel />

      {/* SEPARATOR BELOW GOOGLE REVIEWS CAROUSEL */}
      <div className="w-full border-t border-[#D8C7B3]/25 mt-0 mb-6 sm:mb-8" />

      {/* 2. MAIN FOOTER CONTENT WRAPPER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* BRAND INTRO HEADER */}
        <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-[#D8C7B3]/25 gap-6 md:gap-10">
          <div className="shrink-0">
            <Logo compact={false} />
          </div>
          <p className="text-sm sm:text-base text-[#EDE4D8]/80 font-normal leading-relaxed max-w-xl text-left">
            Since 1959, India&apos;s heritage in high-performance architectural wall care, interior emulsions, cement paints, and exterior weatherproof protection. Part of the renowned Mehta Group legacy.
          </p>
        </div>

        {/* 3. BALANCED 4-COLUMN RESPONSIVE NAVIGATION GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 pb-10 sm:pb-12">
          {/* Column 1: Heritage & Story */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#D4AF37] uppercase tracking-wider font-heading">
              About Snowcem
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#C2B69D]">
              <li>
                <a href="/about-us/the-snowcem-story" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  The Snowcem Story
                </a>
              </li>
              <li>
                <a href="/about-us/true-colours-of-life" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  True Colours of Life
                </a>
              </li>
              <li>
                <a href="/about-us/about-mehta-group" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  About Mehta Group
                </a>
              </li>
              <li>
                <a href="/media" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Media &amp; Press
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Careers at Snowcem
                </a>
              </li>
              <li>
                <a href="/life-at-snowcem" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Life @ Snowcem
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Products & Finishes */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#D4AF37] uppercase tracking-wider font-heading">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#C2B69D]">
              {CATEGORIES_DATA.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="hover:text-[#D4AF37] transition-colors block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 text-[#D4AF37] font-semibold hover:underline text-xs"
                >
                  <span>Explore All Finishes</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Painting Tools & Inspiration */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#D4AF37] uppercase tracking-wider font-heading">
              Painting Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#C2B69D]">
              <li>
                <Link href="/paint-calculator" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Paint Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/color-visualizer" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Virtual Colour Visualizer
                </Link>
              </li>
              <li>
                <Link href="/color-catalogue" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  1,800+ Colour Catalogue
                </Link>
              </li>
              <li>
                <a href="/blogs" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Inspiration &amp; Decor Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Network & Direct Support */}
          <div className="space-y-3.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-[#D4AF37] uppercase tracking-wider font-heading">
              Connect &amp; Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#C2B69D]">
              <li>
                <a href="/find-dealer" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Find Nearest Dealer
                </a>
              </li>
              <li>
                <a href="/find-painter" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Find Certified Painter
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-[#D4AF37] transition-colors block py-0.5">
                  Corporate Contact Us
                </a>
              </li>
              <li className="pt-1.5">
                <a
                  href="tel:18002095656"
                  className="flex items-center gap-2 text-xs font-semibold text-[#EDE4D8] hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>1800-209-5656 (Toll-Free)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-[#EDE4D8] hover:text-[#D4AF37] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>WhatsApp (#snowsense)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:customercare@snowcempaints.com"
                  className="flex items-center gap-2 text-xs text-[#C2B69D] hover:text-[#D4AF37] transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C2B69D] shrink-0" />
                  <span className="truncate">customercare@snowcempaints.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. BOTTOM BAR WITH COPYRIGHT, UNIFIED SOCIALS, & VIRTU MEDIA BADGE */}
        <div className="pt-6 sm:pt-8 border-t border-[#D8C7B3]/25 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-[#C2B69D] font-normal">
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
              className="w-9 h-9 rounded-full bg-[#0A2621] border border-[#D8C7B3]/35 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C59B27] text-[#EDE4D8] hover:text-[#061C18] flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@snowcempaintsofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-[#0A2621] border border-[#D8C7B3]/35 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C59B27] text-[#EDE4D8] hover:text-[#061C18] flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/snowcem-paints/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-[#0A2621] border border-[#D8C7B3]/35 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C59B27] text-[#EDE4D8] hover:text-[#061C18] flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/snowcempaints_official?igsh=MXdxdjVjbm1xMHBhcQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#0A2621] border border-[#D8C7B3]/35 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C59B27] text-[#EDE4D8] hover:text-[#061C18] flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/SnowcemPaintsOfficial?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#0A2621] border border-[#D8C7B3]/35 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C59B27] text-[#EDE4D8] hover:text-[#061C18] flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </a>
            <a
              href="https://in.pinterest.com/SnowcemPaints/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="w-9 h-9 rounded-full bg-[#0A2621] border border-[#D8C7B3]/35 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C59B27] text-[#EDE4D8] hover:text-[#061C18] flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0" />
              </svg>
            </a>
          </div>

          {/* Legal Links & Virtu Media Attribution */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-5">
            <a href="/terms-and-conditions" className="hover:text-[#D4AF37] transition-colors">
              Terms &amp; Conditions
            </a>
            <span className="text-[#C4B2A0] hidden sm:inline">|</span>
            <p className="text-[#C2B69D] font-medium flex items-center gap-1.5">
              <span>Developed by</span>
              <a
                href="https://virtumedia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 group/virtu hover:text-[#D4AF37] transition-colors"
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
                <span className="font-semibold text-[#EDE4D8] tracking-wide group-hover/virtu:text-[#D4AF37] transition-colors">
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
