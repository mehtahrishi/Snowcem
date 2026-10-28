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
    <div className="min-h-screen flex flex-col bg-canvas text-[#EDE4D8] font-sans">
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
        <section className="bg-canvas pb-14 sm:pb-20">
          <div className="relative aspect-[2.93/1] w-full overflow-hidden">
              <Image
                src="/media/image.png"
                alt="The latest on Snowcem Paints"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
          </div>
          <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">

            {/* Minimal Language Filter */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto py-1">
              {["All", "Hindi", "Bengali", "Oriya", "Marathi", "Gujarati"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedLanguage === lang
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-xs"
                      : "border border-[#D8C7B3]/20 bg-[#0A2621] text-[#C2B69D] hover:border-[#D4AF37]/60 hover:text-[#EDE4D8]"
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
                  className="overflow-hidden flex flex-col border border-[#D8C7B3]/20 bg-[#0A2621] shadow-xs transition-all duration-200 hover:border-[#D4AF37]/40 hover:shadow-md"
                >
                  {/* YouTube Video Player Embed */}
                  <div className="relative aspect-video w-full bg-[#061C18]">
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
                      <p className="text-xs font-semibold text-[#D4AF37]">
                        {video.language} Edition
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-[#EDE4D8] leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#C2B69D] leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#D8C7B3]/15 flex items-center justify-between">
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EDE4D8] hover:text-[#D4AF37] transition-colors"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C2B69D]/60" />
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
        <div className="w-full border-t border-[#D8C7B3]/15" />

        {/* =========================================================================
            SECTION 2: PRESS COVERAGE (ON CANVAS WITH BRAND COLOR COMBO HEADING)
            ========================================================================= */}
        <section className="bg-canvas py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section 2 Heading matching Section 1 */}
            <div className="max-w-4xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] bg-clip-text text-transparent font-heading pb-1 inline-block">
                Press Coverage
              </h2>
              <p className="text-[#C2B69D] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Editorial features and stories covering our initiatives and heritage across India.
              </p>
            </div>

            {/* Press Cards Grid on Brand Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Card 1: Finixx Feature */}
              <article className="overflow-hidden flex flex-col border border-[#D8C7B3]/20 bg-[#0A2621] shadow-xs transition-all duration-200 hover:border-[#D4AF37]/40 hover:shadow-md">
                <div className="relative w-full h-56 bg-[#061C18] overflow-hidden">
                  <Image
                    src="/media/finxx.png"
                    alt="Finixx Press Coverage - Snowcem 6 Decades"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
                      Finixx • Press Feature
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-[#EDE4D8] leading-snug">
                      Snowcem Paints celebrates six decades of legacy with the Rangon Ki Virasat campaign, honoring generations of trust and craftsmanship.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C2B69D] leading-relaxed">
                      Featured in Finixx, highlighting Snowcem&apos;s pioneering waterproof technology and heritage in Indian architecture.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D8C7B3]/15">
                    <a
                      href="https://www.finixx.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#EDE4D8] hover:text-[#D4AF37] transition-colors"
                    >
                      <img
                        src="https://www.google.com/s2/favicons?domain=finixx.com&sz=64"
                        alt=""
                        className="w-3.5 h-3.5 rounded-xs"
                      />
                      <span>Read on Finixx</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C2B69D]/60" />
                    </a>
                  </div>
                </div>
              </article>

              {/* Card 2: MediaBrief Feature */}
              <article className="overflow-hidden flex flex-col border border-[#D8C7B3]/20 bg-[#0A2621] shadow-xs transition-all duration-200 hover:border-[#D4AF37]/40 hover:shadow-md">
                <div className="relative w-full h-56 bg-[#061C18] overflow-hidden">
                  <Image
                    src="/media/mediabrief.png"
                    alt="MediaBrief Coverage - Rangon Ki Virasat"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
                      MediaBrief • Press Feature
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-[#EDE4D8] leading-snug">
                      Rangon Ki Virasat is a nationwide initiative celebrating the enduring relationships between Snowcem, painters, contractors, dealers, and homeowners.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C2B69D] leading-relaxed">
                      Featured in MediaBrief, highlighting nationwide empowerment across contractor communities, painter reward programs, and heritage wall restoration.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D8C7B3]/15">
                    <a
                      href="https://mediabrief.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#EDE4D8] hover:text-[#D4AF37] transition-colors"
                    >
                      <img
                        src="https://www.google.com/s2/favicons?domain=mediabrief.com&sz=64"
                        alt=""
                        className="w-3.5 h-3.5 rounded-xs"
                      />
                      <span>Read on MediaBrief</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C2B69D]/60" />
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
