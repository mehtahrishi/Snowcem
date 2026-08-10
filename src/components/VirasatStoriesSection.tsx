"use client";

import React, { useState } from "react";
import { Play, Paintbrush, HardHat, Store, Video } from "lucide-react";
import VideoModal from "@/components/VideoModal";

interface StoryItem {
  id: string;
  category: string;
  roleTitle: string;
  badgeIcon: React.ElementType;
  heading: string;
  description: string;
  authorName: string;
  location: string;
  youtubeId?: string;
  gradient: string;
  accentBg: string;
  accentBorder: string;
  iconColor: string;
  badge: string;
}

export default function VirasatStoriesSection() {
  const [selectedVideo, setSelectedVideo] = useState<{ url?: string; title?: string } | null>(null);

  const stories: StoryItem[] = [
    {
      id: "painter-story",
      category: "Painter Story",
      roleTitle: "The Painter's Craft",
      badgeIcon: Paintbrush,
      heading: "The Painter's Craft",
      description:
        "Three generations of brushwork — trusting Snowcem colours to hold their promise, coat after coat.",
      authorName: "Painter Story",
      location: "Real Craftsmen Across Generations",
      youtubeId: "",
      gradient: "from-[#2a1b92] via-[#5c249c] to-[#e91e63]",
      accentBg: "bg-purple-50",
      accentBorder: "border-purple-100",
      iconColor: "text-[#5c249c]",
      badge: "Real Painters",
    },
    {
      id: "contractor-story",
      category: "Contractor Story",
      roleTitle: "Building With Trust",
      badgeIcon: HardHat,
      heading: "Building With Trust",
      description:
        "From site to street — a contractor on why Snowcem stays the specification of choice, project after project.",
      authorName: "Contractor Story",
      location: "Project Specifications & Trust",
      youtubeId: "",
      gradient: "from-emerald-600 via-[#5c249c] to-[#2a1b92]",
      accentBg: "bg-emerald-50",
      accentBorder: "border-emerald-100",
      iconColor: "text-emerald-600",
      badge: "On-Site Trust",
    },
    {
      id: "dealer-story",
      category: "Dealer Story",
      roleTitle: "Six Decades on the Shelf",
      badgeIcon: Store,
      heading: "Six Decades on the Shelf",
      description:
        "A dealer reflects on watching families return, generation after generation, for the same trusted tins.",
      authorName: "Dealer Story",
      location: "60+ Years Retail Partnership",
      youtubeId: "",
      gradient: "from-[#f36c21] via-[#e91e63] to-[#5c249c]",
      accentBg: "bg-orange-50",
      accentBorder: "border-orange-100",
      iconColor: "text-orange-600",
      badge: "Retail Heritage",
    },
  ];

  const handlePlayClick = (story: StoryItem) => {
    const videoUrl = story.youtubeId
      ? `https://www.youtube.com/embed/${story.youtubeId}?autoplay=1`
      : undefined;
    setSelectedVideo({
      url: videoUrl,
      title: `${story.category}: ${story.heading}`,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matching BrandPillarsSection layout & color scheme) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3.5 py-1.5 rounded-full shadow-2xs inline-flex items-center gap-1.5 font-heading">
            <Video className="w-3.5 h-3.5" />
            In Their Words
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Virasat Stories
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Short-form clips from real painters, contractors and dealers who&apos;ve worked with Snowcem across generations.
          </p>
        </div>

        {/* 3 Stories Cards Grid (Matching exact 3 Pillars Card styling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story) => {
            const IconComponent = story.badgeIcon;
            return (
              <div
                key={story.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
                onClick={() => handlePlayClick(story)}
              >
                {/* Top Subtle Color Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${story.gradient}`} />

                <div className="space-y-5">
                  {/* Icon & Category Badge Stage */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${story.accentBg} ${story.accentBorder} border flex items-center justify-center ${story.iconColor} shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="text-[10px] font-heading font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                      {story.category}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight font-heading leading-snug group-hover:bg-gradient-to-r group-hover:from-[#2a1b92] group-hover:via-[#5c249c] group-hover:to-[#e91e63] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                      {story.heading}
                    </h3>
                    <p className="text-xs font-bold text-purple-700 font-heading uppercase tracking-wide">
                      {story.category}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-1">
                      {story.description}
                    </p>
                  </div>
                </div>

                {/* Play Action Footer inside Card */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#5c249c] transition-colors">
                  <span className="flex items-center gap-1.5 font-heading">
                    <Play className="w-4 h-4 text-[#f36c21] fill-current" />
                    Watch Short Clip
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    YouTube Video
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Videos Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setSelectedVideo({ url: undefined, title: "Snowcem Virasat Stories Playlist" })}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-sm font-extrabold font-heading rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Video className="w-4 h-4" />
            View More Videos
          </button>
        </div>
      </div>

      {/* TVC Video Modal Overlay */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url}
        title={selectedVideo?.title}
      />
    </section>
  );
}
