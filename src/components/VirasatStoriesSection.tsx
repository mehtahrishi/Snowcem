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
    <section className="bg-canvas-soft bg-canvas-dots pb-6 sm:pb-8 relative overflow-hidden">
      {/* Seamless Curvy Wave Transition: #D5BEAF (Rangon Ki Virasat) curves down into Stories section */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-px" aria-hidden="true">
        <svg
          viewBox="0 0 1440 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,36 C1120,8 960,56 720,28 C480,0 320,64 0,32 Z"
            fill="#D8C7B3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 md:-mt-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 space-y-2 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Virasat Stories
          </h2>
          <p className="text-[#5A5148] text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Real stories and experiences from painters, contractors, and dealers who have partnered with Snowcem across generations.
          </p>
        </div>

        {/* 3 Clean Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-[#FAF7F2] rounded-2xl sm:rounded-3xl border border-[#D6C5B3] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
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
                <h3 className="text-base sm:text-lg font-bold text-[#1E1F24] font-heading">
                  {story.category}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5148] font-normal leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View Playlist on YouTube Link */}
        <div className="text-center mt-6 sm:mt-8">
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
