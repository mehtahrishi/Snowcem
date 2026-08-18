import React from "react";
import { Paintbrush, HardHat, Store, Video, ExternalLink } from "lucide-react";

interface StoryItem {
  id: string;
  category: string;
  roleTitle: string;
  badgeIcon: React.ElementType;
  heading: string;
  description: string;
  youtubeId: string;
  gradient: string;
  accentBg: string;
  accentBorder: string;
  iconColor: string;
}

export default function VirasatStoriesSection() {
  const stories: StoryItem[] = [
    {
      id: "painter-story",
      category: "Painter Story",
      roleTitle: "Painter",
      badgeIcon: Paintbrush,
      heading: "The Painter's Craft",
      description:
        "Three generations of brushwork — trusting Snowcem colours to hold their promise, coat after coat.",
      youtubeId: "cXNEgvKbZAk",
      gradient: "from-[#2a1b92] via-[#5c249c] to-[#e91e63]",
      accentBg: "bg-purple-50",
      accentBorder: "border-purple-100",
      iconColor: "text-[#5c249c]",
    },
    {
      id: "contractor-story",
      category: "Contractor Story",
      roleTitle: "Contractor",
      badgeIcon: HardHat,
      heading: "Building With Trust",
      description:
        "From site to street — a contractor on why Snowcem stays the specification of choice, project after project.",
      youtubeId: "1IdlI29XjFs",
      gradient: "from-emerald-600 via-[#5c249c] to-[#2a1b92]",
      accentBg: "bg-emerald-50",
      accentBorder: "border-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "dealer-story",
      category: "Dealer Story",
      roleTitle: "Dealer",
      badgeIcon: Store,
      heading: "Six Decades on the Shelf",
      description:
        "A dealer reflects on watching families return, generation after generation, for the same trusted tins.",
      youtubeId: "P5meTn4OyWQ",
      gradient: "from-[#f36c21] via-[#e91e63] to-[#5c249c]",
      accentBg: "bg-orange-50",
      accentBorder: "border-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3.5 py-1.5 rounded-full shadow-2xs inline-flex items-center gap-1.5 font-heading">
            <Video className="w-3.5 h-3.5" />
            In Their Words
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Virasat Stories
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Real stories and experiences from painters, contractors, and dealers who have partnered with Snowcem across generations.
          </p>
        </div>

        {/* 3 Story Cards with Clean 16:9 Video Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story) => {
            const IconComponent = story.badgeIcon;
            return (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Subtle Color Accent Line */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${story.gradient}`} />

                <div>
                  {/* Clean 16:9 Video Embed Container */}
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${story.youtubeId}`}
                      title={`${story.category}: ${story.heading}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  {/* Story Information Container */}
                  <div className="p-6 sm:p-7 space-y-3">
                    {/* Category & Role Tag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${story.accentBg} ${story.accentBorder} border flex items-center justify-center ${story.iconColor}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-700 font-heading">
                          {story.roleTitle}
                        </span>
                      </div>

                      <span className="text-[10px] font-heading font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                        {story.category}
                      </span>
                    </div>

                    {/* Single Clean Heading */}
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight font-heading leading-snug group-hover:bg-gradient-to-r group-hover:from-[#2a1b92] group-hover:via-[#5c249c] group-hover:to-[#e91e63] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                      {story.heading}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>

                {/* Footer link to watch on YouTube */}
                <div className="px-6 sm:px-7 pb-6 pt-0">
                  <a
                    href={`https://youtu.be/${story.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-slate-700 group-hover:text-[#5c249c] transition-colors"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Playlist on YouTube Link */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/playlist?list=PLCjFG8oS61HE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-sm font-extrabold font-heading rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Video className="w-4 h-4" />
            Watch All Virasat Stories
          </a>
        </div>
      </div>
    </section>
  );
}
