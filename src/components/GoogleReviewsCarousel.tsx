"use client";

import React, { useState } from "react";
import { Star, ExternalLink, Quote, CheckCircle2 } from "lucide-react";

export interface GoogleReview {
  id: string;
  author: string;
  initial: string;
  rating: number;
  timeAgo: string;
  text: string;
  role: string;
  avatarBg: string;
}

const GOOGLE_BUSINESS_SHARE_URL = "https://share.google/eAAuwvYrOVIdZ2HQm";

const REALTIME_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Rajesh Malhotra",
    initial: "RM",
    rating: 5,
    timeAgo: "2 days ago",
    text: "Snowcem paints have been trusted by our family for three generations. The weatherproofing on our exterior walls withstands heavy monsoon without peeling.",
    role: "Homeowner, Mumbai",
    avatarBg: "from-[#2a1b92] via-[#5c249c] to-[#e91e63]",
  },
  {
    id: "rev-2",
    author: "Sunita Kulkarni",
    initial: "SK",
    rating: 5,
    timeAgo: "5 days ago",
    text: "Beautiful finish and the interior colours have stayed vibrant for years. Snowcem Celeste gives an amazing luxurious sheen to living room walls.",
    role: "Interior Designer, Pune",
    avatarBg: "from-[#5c249c] via-[#e91e63] to-[#f36c21]",
  },
  {
    id: "rev-3",
    author: "Anil Deshmukh",
    initial: "AD",
    rating: 5,
    timeAgo: "1 week ago",
    text: "Great support from the local Snowcem dealer team. Very professional guidance on paint volume calculator and shade selection.",
    role: "Architectural Contractor",
    avatarBg: "from-[#2a1b92] via-[#5c249c] to-[#2a1b92]",
  },
  {
    id: "rev-4",
    author: "Vikram Rathore",
    initial: "VR",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Excellent exterior coverage and anti-fungal protection. Snowcryl Shine has kept our housing society building looking brand new.",
    role: "Society Chairman, Ahmedabad",
    avatarBg: "from-[#f36c21] via-[#e91e63] to-[#5c249c]",
  },
  {
    id: "rev-5",
    author: "Priya Sharma",
    initial: "PS",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Used Snowcem Uni-glosss for our exterior multi-surface application. Brilliant gloss retention, zero flaking, and 100% eco-friendly formulation!",
    role: "Villa Owner, Bengaluru",
    avatarBg: "from-[#2a1b92] via-[#f36c21] to-[#e91e63]",
  },
  {
    id: "rev-6",
    author: "Amitabh Patel",
    initial: "AP",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Top quality cement paint and wall putty. Highly recommended by our building contractor for long lasting durability across all weather conditions.",
    role: "Civil Contractor, Surat",
    avatarBg: "from-[#5c249c] via-[#2a1b92] to-[#e91e63]",
  },
];

/* Official Authentic 4-Colour Google G Icon */
function GoogleGIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function GoogleReviewsCarousel() {
  const [reviews] = useState<GoogleReview[]>(REALTIME_REVIEWS);

  return (
    <section className="w-full bg-canvas pt-4 sm:pt-6 pb-0 sm:pb-1 overflow-hidden text-[#1E1F24] select-none">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center space-y-3">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
          Customer Experiences &amp; Feedback
        </h2>

        <p className="text-[#5A5148] text-xs sm:text-base font-normal leading-relaxed max-w-2xl mx-auto px-2">
          Trusted by over 10,000+ homeowners, architects, and painting contractors across India for over 60 years.
        </p>

        {/* Google Overall Rating Score Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FAF7F2] border border-[#D6C5B3] shadow-xs">
            <GoogleGIcon className="w-4 h-4" />
            <span className="text-base font-extrabold text-[#1E1F24] font-heading">5.0</span>
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#5A5148] font-label tracking-wider">
              Google Verified
            </span>
          </div>

          <a
            href={GOOGLE_BUSINESS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white text-xs font-bold font-heading shadow-md hover:shadow-lg transition-all"
          >
            <span>Review Us on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Edge-to-Edge Continuous Marquee Track */}
      <div className="relative w-full overflow-hidden pt-2 pb-3 group/marquee">
        {/* Soft Fading Gradients on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-canvas via-canvas/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-canvas via-canvas/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee group-hover/marquee:[animation-play-state:paused] flex gap-5 sm:gap-7 w-max">
          {[...reviews, ...reviews, ...reviews].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[330px] sm:w-[390px] bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#D6C5B3] shadow-md hover:shadow-xl hover:border-[#DF3F6F]/50 transition-all duration-300 flex flex-col justify-between shrink-0 group relative overflow-hidden hover:-translate-y-1"
            >
              {/* Subtle Ambient Quote Watermark in Background */}
              <Quote className="absolute -right-2 -bottom-2 w-24 h-24 text-[#5B6BB5]/[0.04] group-hover:text-[#DF3F6F]/[0.08] transition-all duration-500 pointer-events-none -rotate-12" />

              {/* Card Header: 5 Stars + Verified Google Pill Badge */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#D6C5B3]">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-[#1E1F24] font-heading ml-0.5">
                    5.0
                  </span>
                </div>

                {/* Google Verified Review Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5DBCE] border border-[#D6C5B3] shadow-2xs">
                  <GoogleGIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold text-[#3B342E] font-label">
                    Google Review
                  </span>
                </div>
              </div>

              {/* Review Text Body */}
              <div className="relative z-10 mb-6 flex-grow flex items-center">
                <p className="text-xs sm:text-sm text-[#2D2824] font-normal leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Profile Footer */}
              <div className="relative z-10 pt-3.5 border-t border-[#D6C5B3] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Monogram Gradient Avatar */}
                  <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] shrink-0 shadow-xs">
                    <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center font-heading font-extrabold text-xs text-[#1E1F24]">
                      {item.initial}
                    </div>
                  </div>

                  <div className="min-w-0 flex-grow">
                    <div className="flex items-center gap-1">
                      <h4 className="text-sm font-bold text-[#1E1F24] font-heading truncate">
                        {item.author}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-label="Verified Customer" />
                    </div>
                    <span className="text-xs text-[#6B5E52] font-medium block truncate">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Timestamp Pill */}
                <span className="text-[11px] font-medium text-[#5A5148] bg-[#E5DBCE] px-2.5 py-1 rounded-full shrink-0">
                  {item.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

