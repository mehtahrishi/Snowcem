"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { getCollectionsAction } from "@/actions/collection-actions";
import type { Collection } from "@/services/collectionsService";

const defaultCollections: Partial<Collection>[] = [
  { id: 1, name: "Exterior Emulsions", slug: "exterior-emulsions" },
  { id: 2, name: "Interior Emulsions", slug: "interior-emulsions" },
  { id: 3, name: "Waterproofing Solutions", slug: "waterproofing" },
  { id: 4, name: "Primers & Undercoats", slug: "primers" },
  { id: 5, name: "Cement Paints", slug: "cement-paints" },
  { id: 6, name: "Wall Putty & Fillers", slug: "wall-putty" },
  { id: 7, name: "Designer Textures", slug: "designer-textures" },
];

export default function Footer() {
  const [collections, setCollections] = useState<Partial<Collection>[]>(defaultCollections);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await getCollectionsAction();
        if (data && data.length > 0) {
          setCollections(data);
        }
      } catch (err) {
        // Fallback to default collections if unauthenticated or on public pages
      }
    }
    fetchCollections();
  }, []);

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
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
              About us
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="/about-us/the-snowcem-story" className="hover:text-snowcem-orange transition-colors block">
                  The Snowcem Story
                </a>
              </li>
              <li>
                <a href="/about-us/true-colours-of-life" className="hover:text-snowcem-orange transition-colors block">
                  True Colours of Life
                </a>
              </li>
              <li>
                <a href="/about-us/about-mehta-group" className="hover:text-snowcem-orange transition-colors block">
                  About Mehta Group
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
              Collections
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              {collections.map((col) => (
                <li key={col.id || col.slug}>
                  <Link
                    href={`/collections/${col.slug}`}
                    className="hover:text-snowcem-orange transition-colors block"
                  >
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tools */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
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
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
              Connect
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="/media" className="hover:text-snowcem-orange transition-colors block">
                  Media & Commercials
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-snowcem-orange transition-colors block">
                  Contact us
                </a>
              </li>
              <li>
                <a href="/find-dealer" className="hover:text-snowcem-orange transition-colors block">
                  Find Dealer
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-snowcem-orange transition-colors block">
                  Careers
                </a>
              </li>
              <li>
                <a href="/life-at-snowcem" className="hover:text-snowcem-orange transition-colors block">
                  Life @ Snowcem
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-normal">
          <p>© {new Date().getFullYear()} Snowcem Paints India Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-gray-900 transition-colors">Terms & Conditions</a>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <p className="text-gray-500">
              Developed by{" "}
              <a
                href="https://virtumedia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-700 hover:text-snowcem-orange transition-colors"
              >
                VirtuMedia
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
