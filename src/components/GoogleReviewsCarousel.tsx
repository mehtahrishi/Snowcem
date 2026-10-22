"use client";

import React, { useState } from "react";
import { Star, ExternalLink, Quote, CheckCircle2 } from "lucide-react";

export interface GoogleReview {
  id: string;
  author: string;
  initial: string;
  text: string;
  role: string;
}

const GOOGLE_BUSINESS_SHARE_URL = "https://share.google/eAAuwvYrOVIdZ2HQm";
const OVERALL_RATING = 4.2;

const REALTIME_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Rajesh Malhotra",
    initial: "RM",
    text: "Snowcem paints have been trusted by our family for three generations. The weatherproofing on our exterior walls withstands heavy monsoon without peeling.",
    role: "Homeowner, Mumbai",
  },
  {
    id: "rev-2",
    author: "Sunita Kulkarni",
    initial: "SK",
    text: "Beautiful finish and the interior colours have stayed vibrant for years. Snowcem Celeste gives an amazing luxurious sheen to living room walls.",
    role: "Interior Designer, Pune",
  },
  {
    id: "rev-3",
    author: "Anil Deshmukh",
    initial: "AD",
    text: "Great support from the local Snowcem dealer team. Very professional guidance on paint volume calculator and shade selection.",
    role: "Architectural Contractor",
  },
  {
    id: "rev-4",
    author: "Vikram Rathore",
    initial: "VR",
    text: "Excellent exterior coverage and anti-fungal protection. Snowcryl Shine has kept our housing society building looking brand new.",
    role: "Society Chairman, Ahmedabad",
  },
  {
    id: "rev-5",
    author: "Priya Sharma",
    initial: "PS",
    text: "Used Snowcem Uni-glosss for our exterior multi-surface application. Brilliant gloss retention, zero flaking, and 100% eco-friendly formulation!",
    role: "Villa Owner, Bengaluru",
  },
  {
    id: "rev-6",
    author: "Amitabh Patel",
    initial: "AP",
    text: "Top quality cement paint and wall putty. Highly recommended by our building contractor for long lasting durability across all weather conditions.",
    role: "Civil Contractor, Surat",
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
    <section className="w-full bg-canvas pt-1 sm:pt-2 pb-0 sm:pb-1 overflow-hidden text-[#EDE4D8] select-none">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center space-y-3">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white inline-block">
          Voices of Trust
        </h2>

        <p className="text-[#C2B69D] text-xs sm:text-base font-normal leading-relaxed max-w-2xl mx-auto px-2">
          Trusted by 10,000+ homeowners, architects and painting contractors across India for over 60 years.
        </p>

        {/* Google Overall Rating Score Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#D8C5B3] border border-[#C2B69D]">
            <GoogleGIcon className="w-4 h-4" />
            <span className="text-base font-extrabold text-[#061C18] font-heading">
              {OVERALL_RATING.toFixed(1)}
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => {
                const fill = Math.max(0, Math.min(1, OVERALL_RATING - i));
                return (
                  <span key={i} className="relative inline-flex w-4 h-4">
                    <Star className="w-4 h-4 text-amber-400/35" />
                    <span
                      className="absolute inset-y-0 left-0 overflow-hidden"
                      style={{ width: `${fill * 100}%` }}
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </span>
                  </span>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-[#061C18]/65 font-label tracking-wider">
              Google Verified
            </span>
          </div>

          <a
            href={GOOGLE_BUSINESS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] text-xs font-bold font-heading shadow-md hover:brightness-110 hover:shadow-lg transition-all"
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
              className="w-[330px] sm:w-[390px] bg-[#D8C5B3] rounded-2xl p-6 sm:p-7 border border-[#C2B69D] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between shrink-0 group relative overflow-hidden hover:-translate-y-1"
            >
              {/* Subtle Ambient Quote Watermark in Background */}
              <Quote className="absolute -right-2 -bottom-2 w-24 h-24 text-[#061C18]/[0.06] transition-all duration-500 pointer-events-none -rotate-12" />

              {/* Card Header: Verified Google Source Label */}
              <div className="relative z-10 flex items-center gap-1.5 mb-4">
                <GoogleGIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold text-[#061C18]/70 font-label">
                  Google Review
                </span>
              </div>

              {/* Review Text Body */}
              <div className="relative z-10 mb-6 flex-grow flex items-center">
                <p className="text-xs sm:text-sm text-[#061C18] font-normal leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Profile Footer */}
              <div className="relative z-10 flex items-center gap-3 min-w-0">
                {/* Monogram Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#061C18] flex items-center justify-center shrink-0">
                  <span className="font-heading font-extrabold text-xs text-[#EDE4D8]">
                    {item.initial}
                  </span>
                </div>

                <div className="min-w-0 flex-grow">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-[#061C18] font-heading truncate">
                      {item.author}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-label="Verified Customer" />
                  </div>
                  <span className="text-xs text-[#061C18]/65 font-medium block truncate">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

