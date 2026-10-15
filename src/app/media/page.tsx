"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Image from "next/image";
import { MEDIA_VIDEOS } from "@/data/mediaData";
import { ExternalLink } from "lucide-react";

export default function MediaPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  const filteredVideos = useMemo(() => {
    if (selectedLanguage === "All") return MEDIA_VIDEOS;
    return MEDIA_VIDEOS.filter((v) => v.language === selectedLanguage);
  }, [selectedLanguage]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-slate-900 font-sans">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* =========================================================================
            SECTION 1: MEDIA & CAMPAIGNS
            ========================================================================= */}
        <section className="bg-canvas pt-14 pb-16 sm:pt-20 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section 1 Heading */}
            <div className="max-w-4xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] bg-clip-text text-transparent font-heading pb-1 inline-block">
                Media &amp; Campaigns
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Official commercials, regional brand films, and press coverage from across India.
              </p>
            </div>

            {/* Minimal Language Filter */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto py-1">
              {["All", "Hindi", "Bengali", "Oriya", "Marathi", "Gujarati"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedLanguage === lang
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 border border-black/5"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredVideos.map((video) => (
                <article
                  key={video.id}
                  className="bg-white rounded-3xl border border-[#C2A99A]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
                >
                  {/* YouTube Video Player Embed */}
                  <div className="relative aspect-video w-full bg-slate-950">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  {/* Video Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-400">
                        {video.language} Edition
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#5B6BB5] transition-colors"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FULL-WIDTH NICE DARK SEPARATOR
            ========================================================================= */}
        <div className="w-full border-t-2 border-slate-900/30 shadow-xs" />

        {/* =========================================================================
            SECTION 2: PRESS COVERAGE (ON CANVAS WITH BRAND COLOR COMBO HEADING)
            ========================================================================= */}
        <section className="bg-canvas py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section 2 Heading matching Section 1 */}
            <div className="max-w-4xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] bg-clip-text text-transparent font-heading pb-1 inline-block">
                Press Coverage
              </h2>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Editorial features and stories covering our initiatives and heritage across India.
              </p>
            </div>

            {/* Press Cards Grid on Brand Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Card 1: Finixx Feature */}
              <article className="bg-white rounded-3xl border border-[#C2A99A]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
                <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                  <Image
                    src="/media/finxx.png"
                    alt="Finixx Press Coverage - Snowcem 6 Decades"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                      Finixx • Press Feature
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Snowcem Paints celebrates six decades of legacy with the Rangon Ki Virasat campaign, honoring generations of trust and craftsmanship.
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Featured in Finixx, highlighting Snowcem&apos;s pioneering waterproof technology and heritage in Indian architecture.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href="https://www.finixx.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-[#5B6BB5] transition-colors"
                    >
                      <img
                        src="https://www.google.com/s2/favicons?domain=finixx.com&sz=64"
                        alt=""
                        className="w-3.5 h-3.5 rounded-xs"
                      />
                      <span>Read on Finixx</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              </article>

              {/* Card 2: MediaBrief Feature */}
              <article className="bg-white rounded-3xl border border-[#C2A99A]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
                <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                  <Image
                    src="/media/mediabrief.png"
                    alt="MediaBrief Coverage - Rangon Ki Virasat"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                      MediaBrief • Press Feature
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Rangon Ki Virasat is a nationwide initiative celebrating the enduring relationships between Snowcem, painters, contractors, dealers, and homeowners.
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Featured in MediaBrief, highlighting nationwide empowerment across contractor communities, painter reward programs, and heritage wall restoration.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href="https://mediabrief.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-[#5B6BB5] transition-colors"
                    >
                      <img
                        src="https://www.google.com/s2/favicons?domain=mediabrief.com&sz=64"
                        alt=""
                        className="w-3.5 h-3.5 rounded-xs"
                      />
                      <span>Read on MediaBrief</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
