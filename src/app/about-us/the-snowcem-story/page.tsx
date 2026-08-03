"use client";

import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import {
  Sparkles,
  History,
  Award,
  Globe2,
  Leaf,
  ShieldCheck,
  Building2,
  MapPin,
  Factory,
  Store,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function TheSnowcemStoryPage() {
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
        <section className="bg-white py-14 md:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Snowcem gets a{" "}
                <span className="bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent">
                  Splash of New
                </span>
              </h1>
              
              <p className="text-slate-700 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
                60+ years of experience is evolving with a modern palette of freshness. Introducing Snowcem Paints with a larger, more comprehensive product range.
              </p>
            </div>
          </div>
        </section>

        {/* A COLOURFUL HISTORY WITH A FRESH COAT */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md max-w-5xl mx-auto space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                A Colourful History with a Fresh Coat
              </h2>
              <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-6">
                Pioneers in the paint and wall-care industry, Snowcem Paints is adored in the construction sector for our value-for-money offerings. Producing Sandtex Matt and Unigloss way back in 1990, our brand is synonymous with exterior home painting across the country, while we continue to strengthen our foundation in home interior painting.
              </p>
              <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed">
                Now, as part of Saurashtra Cement Limited &ndash; Paint Division under The Mehta Group, we are bolder, brighter, and bigger with a new spectrum of colours and home painting services. All with a unified philosophy to celebrate the True Colours of Life.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                href="/about-us/true-colours-of-life"
                className="inline-flex items-center gap-2 bg-snowcem-navy hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-sm text-sm"
              >
                <span>Learn More about True Colours of Life</span>
                <ArrowRight className="w-4 h-4 text-snowcem-orange" />
              </Link>
            </div>
          </div>
        </section>

        {/* PAN-INDIA DISTRIBUTION NETWORK */}
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                A Robust Pan-India Distribution Network for a Colourful Country
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
                Delivering excellence to millions of homes through nationwide infrastructure and stockist partnerships.
              </p>
            </div>

            {/* DISTRIBUTION NETWORK METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              
              {/* METRIC 1: HEAD OFFICE */}
              <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/90 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Head Office</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mumbai, Maharashtra</p>
                <p className="text-xs text-slate-600 font-normal">Strategic corporate & operational headquarters.</p>
              </div>

              {/* METRIC 2: MANUFACTURING PLANTS */}
              <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/90 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-snowcem-navy flex items-center justify-center mx-auto">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">3 Plants</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Manufacturing Units</p>
                <p className="text-xs text-slate-600 font-normal">State-of-the-art automated production facilities.</p>
              </div>

              {/* METRIC 3: DISTRIBUTION CENTERS */}
              <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/90 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">21 Centers</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Distribution Hubs</p>
                <p className="text-xs text-slate-600 font-normal">Ensuring rapid supply to every region in India.</p>
              </div>

              {/* METRIC 4: DEALERS */}
              <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/90 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-snowcem-orange flex items-center justify-center mx-auto">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">3,500+ Dealers</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Retail Trade Network</p>
                <p className="text-xs text-slate-600 font-normal">Trusted stockist partners serving customers nationwide.</p>
              </div>

            </div>
          </div>
        </section>

        {/* GREEN COMMITMENT & SUSTAINABILITY */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl max-w-5xl mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Leaf className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Green isn&apos;t just a Colour for us. It&apos;s our Evergreen Commitment.
            </h2>

            <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
              Before and above everything else, the health and safety of our planet and people is our goal and responsibility. The research we do, the technology we develop, and the highly advanced system we use to treat our factory effluents are all to nurture our ecosystem and paint a brighter future.
            </p>

            <div className="pt-4 border-t border-emerald-800/80 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-emerald-300">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero-VOC Eco-Friendly Paints
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Advanced Effluent Treatment Systems
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ISO Certified Quality Standards
              </span>
            </div>
          </div>
        </section>

        {/* MEHTA GROUP 124-YEAR LEGACY CALLOUT */}
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-snowcem-orange mx-auto">
              <History className="w-7 h-7" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Part of a 124-Year Legacy
            </h2>

            <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
              The year was 1900. Mr. Nanji Kalidas Mehta, then a 13-year old boy left his native land in a country vessel, with a bag full of dreams. Today, Snowcem Paints is proud to be a part of this 124-year legacy.
            </p>

            <div className="pt-2">
              <Link
                href="/about-us/about-mehta-group"
                className="inline-flex items-center gap-2.5 bg-snowcem-navy hover:bg-slate-800 text-white font-bold py-3.5 px-7 rounded-2xl transition-all shadow-md text-sm sm:text-base"
              >
                <span>Learn More about The Mehta Group</span>
                <ArrowRight className="w-4 h-4 text-snowcem-orange" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
