"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import { MEDIA_VIDEOS, MediaVideo } from "@/data/mediaData";
import { Play, ExternalLink, Film, Globe } from "lucide-react";

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
                Media &{" "}
                <span className="bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent">
                  Brand Campaigns
                </span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Explore official TV commercials, regional brand films, and media coverage celebrating Snowcem Paints&apos; legacy of color, durability, and weather protection across India.
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
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
