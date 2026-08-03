"use client";

import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  Globe,
  TrendingUp,
  Building2,
  Award,
  ExternalLink,
  History,
  CheckCircle2,
} from "lucide-react";

export default function AboutMehtaGroupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-white py-12 md:py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
                The Legacy of{" "}
                <span className="bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent">
                  The Mehta Group
                </span>{" "}
                & Snowcem Paints
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                From a 13-year-old boy leaving his native land in 1900 with a bag full of dreams to a global $500M+ multi-enterprise spanning 3 continents—Snowcem Paints is proud to be part of this 124-year growing legacy.
              </p>
            </div>
          </div>
        </section>

        {/* METRICS & HIGHLIGHTS STATS GRID */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* STAT 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-snowcem-orange transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-snowcem-orange mb-4">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">124-Year Legacy</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Since 1900</p>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Founded when trading currency was cowrie shells, built on over a century of trust and resilience.
              </p>
            </div>

            {/* STAT 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-snowcem-navy transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-snowcem-navy mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">$500M+ Assets</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Global Valuation</p>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Controlling assets worth over USD 500 million in construction, engineering, finance & sports.
              </p>
            </div>

            {/* STAT 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">3 Continents</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Multinational Presence</p>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                A multi-enterprise presence spanning Asia, North America, and Africa.
              </p>
            </div>

            {/* STAT 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">Saurashtra Cement</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Hathi Cement Brand</p>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Home of the renowned &lsquo;Hathi Cement&rsquo; brand in Gujarat and western India.
              </p>
            </div>

          </div>
        </section>

        {/* DETAILED NARRATIVE & LEGACY STORY */}
        <section className="py-12 bg-white border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* SECTION HEADER */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                We Are a Part of The Mehta Group&apos;s Saurashtra Cement Limited
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
                Snowcem Paints is proud and honored to be a part of this growing legacy.
              </p>
            </div>

            {/* STORY CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* CARD 1: THE FOUNDING VISION (1900) */}
              <div className="bg-slate-50 rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-snowcem-orange flex items-center justify-center font-black text-lg">
                  1900
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  The Genesis of a Dream
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  The year was 1900. <strong className="text-slate-900">Mr. Nanji Kalidas Mehta</strong>, then a 13-year-old boy, left his native land in a country vessel with a bag full of dreams.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  Started in an era when the trading currency in regions was cowrie shells, his relentless vision laid the bedrock for what has become a multinational conglomerate. Today, Snowcem Paints is proud to be a part of this <strong className="text-slate-900">124-year legacy</strong>.
                </p>
              </div>

              {/* CARD 2: SAURASHTRA CEMENT & SNOWCEM PAINTS */}
              <div className="bg-slate-50 rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-snowcem-navy flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Acquisition by Saurashtra Cement Limited
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  Snowcem Paints has been acquired by the renowned <strong className="text-slate-900">Saurashtra Cement Limited</strong>, owned by The Mehta Group, and we are proud and honored to be part of this growing family.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  Saurashtra Cement Limited is a premier cement manufacturing company that markets the famous <strong className="text-slate-900">&lsquo;Hathi Cement&rsquo;</strong> across Gujarat and neighboring regions.
                </p>
              </div>

            </div>

            {/* FULL DIVERSIFIED GLOBAL CONGLOMERATE CARD */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 space-y-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 text-snowcem-orange font-bold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4 text-snowcem-orange" />
                <span>Global Diversified Conglomerate</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Multinational Multi-Enterprise Across 3 Continents
              </h3>

              <p className="text-slate-700 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                The Mehta Group runs diversified businesses across the world in various industries like <strong className="text-slate-900 font-semibold">construction, engineering, finance, and sports & entertainment</strong>, to name a few.
              </p>

              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                Today, The Mehta Group controls assets worth more than <strong className="text-slate-900 font-semibold">USD 500 million</strong>, with a global presence spanning across <strong className="text-slate-900 font-semibold">3 continents — Asia, North America, and Africa</strong>.
              </p>

              <div className="pt-5 border-t border-slate-200 flex items-center gap-2 text-snowcem-orange text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-snowcem-orange shrink-0" />
                <span>Giving Snowcem Paints the wings we need to bring True Colours to Life.</span>
              </div>
            </div>

          </div>
        </section>

        {/* READ THE FULL STORY EXTERNAL LINK CTA BANNER */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center max-w-4xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-snowcem-orange mx-auto">
              <ExternalLink className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore the Full History of The Mehta Group
            </h2>

            <p className="text-slate-600 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Learn more about the 124-year heritage, global operations, and philanthropic initiatives of The Mehta Group on their official website.
            </p>

            <div>
              <a
                href="https://www.mehtagroup.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-snowcem-navy via-slate-800 to-snowcem-navy hover:from-slate-800 hover:to-slate-900 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg text-sm sm:text-base"
              >
                <span>Read the Full Story on mehtagroup.com</span>
                <ExternalLink className="w-4 h-4 text-snowcem-orange" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
