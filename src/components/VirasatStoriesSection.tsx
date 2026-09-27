import React from "react";
import { Video } from "lucide-react";

interface StoryItem {
  id: string;
  category: string;
  description: string;
  youtubeId: string;
  gradient: string;
}

export default function VirasatStoriesSection() {
  const stories: StoryItem[] = [
    {
      id: "painter-story",
      category: "Painter Story",
      description:
        "Three generations of brushwork — trusting Snowcem colours to hold their promise, coat after coat.",
      youtubeId: "cXNEgvKbZAk",
      gradient: "from-[#5B6BB5] to-[#DF3F6F]",
    },
    {
      id: "contractor-story",
      category: "Contractor Story",
      description:
        "From site to street — a contractor on why Snowcem stays the specification of choice, project after project.",
      youtubeId: "1IdlI29XjFs",
      gradient: "from-[#5B6BB5] via-purple-400 to-[#DF3F6F]",
    },
    {
      id: "dealer-story",
      category: "Dealer Story",
      description:
        "A dealer reflects on watching families return, generation after generation, for the same trusted tins.",
      youtubeId: "P5meTn4OyWQ",
      gradient: "from-[#DF3F6F] to-[#5B6BB5]",
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Virasat Stories
          </h2>
          <p className="text-[#5C534D] text-xs sm:text-sm md:text-base font-normal leading-relaxed">
            Real stories and experiences from painters, contractors, and dealers who have partnered with Snowcem across generations.
          </p>
        </div>

        {/* 3 Clean Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-[#FAF7F4] rounded-2xl sm:rounded-3xl border border-[#D6C2B4] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Top Subtle Color Accent Line */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${story.gradient}`} />

              {/* Video Player Embed */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${story.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
                  title={story.category}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Clean Context: Story Title + Description only */}
              <div className="p-5 sm:p-6 space-y-2 flex-grow flex flex-col justify-start">
                <h3 className="text-base sm:text-lg font-bold text-[#252220] font-heading">
                  {story.category}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C534D] font-normal leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View Playlist on YouTube Link */}
        <div className="text-center mt-10 sm:mt-12">
          <a
            href="https://www.youtube.com/playlist?list=PLCjFG8oS61HE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white text-xs sm:text-sm font-extrabold font-heading rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Video className="w-4 h-4" />
            Watch All Virasat Stories
          </a>
        </div>
      </div>
    </section>
  );
}
