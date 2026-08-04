"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Image from "next/image";
import { MEDIA_VIDEOS } from "@/data/mediaData";
import { Play, ExternalLink, Film, Globe } from "lucide-react";

interface MediaOutlet {
  name: string;
  url: string;
  domain: string;
}

const MEDIA_OUTLETS: MediaOutlet[] = [
  { name: "Adgully", url: "https://www.adgully.com/", domain: "adgully.com" },
  { name: "MediaBrief", url: "https://mediabrief.com/", domain: "mediabrief.com" },
  { name: "Finixx", url: "https://www.finixx.com/", domain: "finixx.com" },
  { name: "Datamatix", url: "https://www.datamatixgroup.com/", domain: "datamatixgroup.com" },
];

export default function MediaPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  const filteredVideos = useMemo(() => {
    if (selectedLanguage === "All") return MEDIA_VIDEOS;
    return MEDIA_VIDEOS.filter((v) => v.language === selectedLanguage);
  }, [selectedLanguage]);

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2 mb-4">
                Media & Brand Campaigns
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Explore official TV commercials, regional brand films, and press coverage celebrating Snowcem Paints&apos; legacy of color, durability, and weather protection across India.
              </p>
            </div>
          </div>
        </section>

        {/* VIDEOS GALLERY SECTION */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Language Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {["All", "Hindi", "Bengali", "Oriya", "Marathi", "Gujarati"].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedLanguage === lang
                    ? "bg-snowcem-navy text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang}</span>
              </button>
            ))}
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-snowcem-orange transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* YouTube Video Player Embed */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Video Info Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-snowcem-orange bg-orange-50 border border-orange-200 px-3 py-1 rounded-full inline-flex items-center gap-1">
                        <Film className="w-3 h-3 text-snowcem-orange" />
                        {video.language} Edition
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {video.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-snowcem-navy transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-snowcem-navy hover:text-snowcem-orange transition-colors"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <Play className="w-3.5 h-3.5 text-slate-400" />
                      <span>HD TVC</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PRESS & MEDIA COVERAGE SECTION */}
          <div className="mt-16 pt-16 border-t border-slate-200/80">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-snowcem-orange bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full inline-block">
                  Press & Media Features
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Rangon Ki Virasat in the Spotlight
                </h2>
                <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                  Discover how Snowcem Paints and the Rangon Ki Virasat initiative are being featured across India&apos;s leading media platforms.
                </p>
              </div>

              {/* Media Articles Cards Grid (Compact Heights) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start">
                {/* Card 1: Finixx Feature */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-snowcem-orange transition-all overflow-hidden flex flex-col group">
                  {/* Article Image Banner */}
                  <div className="relative w-full h-52 bg-slate-100 overflow-hidden border-b border-slate-100">
                    <Image
                      src="/media/finxx.png"
                      alt="Finixx Press Coverage - Snowcem 6 Decades"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[11px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                        Finixx Press Feature
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-snowcem-navy uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                          Snowcem Press Coverage
                        </span>
                        <span className="text-xs font-semibold text-slate-400">6 Decades Legacy</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-snowcem-navy transition-colors leading-snug">
                        Snowcem Paints celebrates six decades of legacy with the Rangon Ki Virasat campaign, honoring generations of trust and craftsmanship.
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        Featured in Finixx, highlighting Snowcem&apos;s pioneering waterproof technology and heritage in Indian architecture.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href="https://www.finixx.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 px-4 py-2 rounded-xl transition-all shadow-xs"
                      >
                        <img
                          src="https://www.google.com/s2/favicons?domain=finixx.com&sz=64"
                          alt="Finixx logo"
                          className="w-3.5 h-3.5 rounded-xs bg-white p-0.5 object-contain"
                        />
                        <span>Read on Finixx</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 2: MediaBrief Feature */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-snowcem-orange transition-all overflow-hidden flex flex-col group">
                  {/* Article Image Banner */}
                  <div className="relative w-full h-52 bg-slate-100 overflow-hidden border-b border-slate-100">
                    <Image
                      src="/media/mediabrief.png"
                      alt="MediaBrief Coverage - Rangon Ki Virasat"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[11px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                        MediaBrief Feature
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-snowcem-navy uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                          Snowcem Media Coverage
                        </span>
                        <span className="text-xs font-semibold text-slate-400">Nationwide Initiative</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-snowcem-navy transition-colors leading-snug">
                        Rangon Ki Virasat is a nationwide initiative celebrating the enduring relationships between Snowcem, painters, contractors, dealers, and homeowners.
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        Featured in MediaBrief, highlighting nationwide empowerment across contractor communities, painter reward programs, and heritage wall restoration.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href="https://mediabrief.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 px-4 py-2 rounded-xl transition-all shadow-xs"
                      >
                        <img
                          src="https://www.google.com/s2/favicons?domain=mediabrief.com&sz=64"
                          alt="MediaBrief logo"
                          className="w-3.5 h-3.5 rounded-xs bg-white p-0.5 object-contain"
                        />
                        <span>Read on MediaBrief</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEDIA OUTLETS BANNER WITH SNOWCEM BRAND GRADIENT & LIVE FAVICONS */}
              <div className="bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] rounded-3xl p-8 text-white shadow-xl text-center space-y-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-white/90">
                  Featured Across Leading Indian Media Platforms
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {MEDIA_OUTLETS.map((outlet) => (
                    <a
                      key={outlet.name}
                      href={outlet.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/15 backdrop-blur-md hover:bg-white text-white hover:text-snowcem-navy rounded-2xl py-3.5 px-4 text-sm font-extrabold border border-white/20 hover:border-white transition-all shadow-sm flex items-center justify-center gap-2 group"
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${outlet.domain}&sz=64`}
                        alt={`${outlet.name} logo`}
                        className="w-4 h-4 rounded-xs bg-white/80 p-0.5 object-contain shrink-0"
                      />
                      <span>{outlet.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
