"use client";

import React, { useState } from "react";
import { Star, ExternalLink, Sparkles, Quote } from "lucide-react";

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
    initial: "R",
    rating: 5,
    timeAgo: "2 days ago",
    text: "Snowcem paints have been trusted by our family for three generations. The weatherproofing on our exterior walls withstands heavy monsoon without peeling.",
    role: "Homeowner, Mumbai",
    avatarBg: "from-[#2a1b92] via-[#5c249c] to-[#e91e63]",
  },
  {
    id: "rev-2",
    author: "Sunita Kulkarni",
    initial: "S",
    rating: 5,
    timeAgo: "5 days ago",
    text: "Beautiful finish and the interior colours have stayed vibrant for years. Snowcem Celeste gives an amazing luxurious sheen to living room walls.",
    role: "Interior Designer, Pune",
    avatarBg: "from-[#5c249c] via-[#e91e63] to-[#f36c21]",
  },
  {
    id: "rev-3",
    author: "Anil Deshmukh",
    initial: "A",
    rating: 5,
    timeAgo: "1 week ago",
    text: "Great support from the local Snowcem dealer team. Very professional guidance on paint volume calculator and shade selection.",
    role: "Architectural Contractor",
    avatarBg: "from-[#2a1b92] via-[#5c249c] to-[#2a1b92]",
  },
  {
    id: "rev-4",
    author: "Vikram Rathore",
    initial: "V",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Excellent exterior coverage and anti-fungal protection. Snowcryl Shine has kept our housing society building looking brand new.",
    role: "Society Chairman, Ahmedabad",
    avatarBg: "from-[#f36c21] via-[#e91e63] to-[#5c249c]",
  },
  {
    id: "rev-5",
    author: "Priya Sharma",
    initial: "P",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Used Snowcem Uni-glosss for our exterior multi-surface application. Brilliant gloss retention, zero flaking, and 100% eco-friendly formulation!",
    role: "Villa Owner, Bengaluru",
    avatarBg: "from-[#2a1b92] via-[#f36c21] to-[#e91e63]",
  },
  {
    id: "rev-6",
    author: "Amitabh Patel",
    initial: "A",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Top quality cement paint and wall putty. Highly recommended by our building contractor for long lasting durability across all weather conditions.",
    role: "Civil Contractor, Surat",
    avatarBg: "from-[#5c249c] via-[#2a1b92] to-[#e91e63]",
  },
];

export default function GoogleReviewsCarousel() {
  const [reviews] = useState<GoogleReview[]>(REALTIME_REVIEWS);

  return (
    <section className="w-full bg-gradient-to-b from-white via-slate-50/70 to-white py-14 sm:py-20 border-t border-slate-200/90 overflow-hidden">

      {/* Section Header with Standardized Brand Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
          Customer Experiences &amp; Feedback
        </h2>

        <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed max-w-2xl mx-auto px-2">
          Trusted by over 10,000+ homeowners, architects, and painting contractors across India for over 60 years.
        </p>

        {/* Google Overall Rating Score Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-base font-extrabold text-slate-900 font-heading">5</span>
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600 font-heading">Google Rating</span>
          </div>

          <a
            href={GOOGLE_BUSINESS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold font-heading shadow-md hover:shadow-lg transition-all"
          >
            <span>Review Us on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Edge-to-Edge Continuous Marquee Track */}
      <div className="relative w-full overflow-hidden pt-2 pb-6">
        {/* Soft Fading Gradients on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 sm:gap-8 w-max">
          {[...reviews, ...reviews, ...reviews].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[320px] sm:w-[380px] bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between shrink-0 group relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63]" />

              <div className="space-y-4 pt-1">
                {/* Header: All 5 Star Icons & Time Ago */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-2xs" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {item.timeAgo}
                  </span>
                </div>

                {/* Review Text Body */}
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed relative">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Profile Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent shrink-0">
                  {item.initial}
                </span>
                <div className="min-w-0 flex-grow">
                  <h4 className="text-sm font-extrabold text-slate-900 font-heading truncate">
                    {item.author}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium block truncate mt-0.5">
                    {item.role}
                  </span>
                </div>

                {/* Decorative Background Quote Symbol */}
                <Quote className="w-7 h-7 text-slate-200 shrink-0 opacity-40" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
