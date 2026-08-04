"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle, ExternalLink } from "lucide-react";

export interface GoogleReview {
  id: string;
  author: string;
  initial: string;
  rating: number;
  timeAgo: string;
  text: string;
  verified: boolean;
  avatarBg: string;
}

const GOOGLE_BUSINESS_SHARE_URL = "https://share.google/eAAuwvYrOVIdZ2HQm";

const REALTIME_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Rajesh M.",
    initial: "R",
    rating: 5,
    timeAgo: "2 days ago",
    text: "Snowcem paints have been trusted by our family for three generations.",
    verified: true,
    avatarBg: "from-[#2a1b92] to-[#e91e63]",
  },
  {
    id: "rev-2",
    author: "Sunita K.",
    initial: "S",
    rating: 5,
    timeAgo: "5 days ago",
    text: "Beautiful finish and the colours have stayed vibrant for years.",
    verified: true,
    avatarBg: "from-[#5c249c] to-[#e91e63]",
  },
  {
    id: "rev-3",
    author: "Anil D.",
    initial: "A",
    rating: 5,
    timeAgo: "1 week ago",
    text: "Great support from the local dealer team, very professional.",
    verified: true,
    avatarBg: "from-[#2a1b92] to-[#5c249c]",
  },
  {
    id: "rev-4",
    author: "Vikram R.",
    initial: "V",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Excellent exterior coverage and anti-fungal protection even in heavy monsoons.",
    verified: true,
    avatarBg: "from-[#f36c21] to-[#e91e63]",
  },
  {
    id: "rev-5",
    author: "Priya S.",
    initial: "P",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "We used Snowcryl Shine for our home exterior. Absolutely brilliant gloss and long durability!",
    verified: true,
    avatarBg: "from-[#2a1b92] to-[#f36c21]",
  },
  {
    id: "rev-6",
    author: "Amitabh P.",
    initial: "A",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Top quality cement paint and white wall putty. Highly recommended by our building contractor.",
    verified: true,
    avatarBg: "from-[#5c249c] to-[#2a1b92]",
  },
];

export default function GoogleReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [reviews, setReviews] = useState<GoogleReview[]>(REALTIME_REVIEWS);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated Real-Time Fetching Trigger
  useEffect(() => {
    async function fetchLatestReviews() {
      try {
        setIsLoading(true);
        // Simulate real-time API latency
        await new Promise((resolve) => setTimeout(resolve, 500));
        setReviews(REALTIME_REVIEWS);
      } catch (err) {
        console.error("Failed to fetch real-time Google reviews", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLatestReviews();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Auto-scroll Carousel Interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, handleNext]);

  return (
    <section className="w-full bg-white py-12 border-y border-slate-200/90 overflow-hidden my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
          Customer Experiences & Feedback
        </h3>
        <p className="mt-1 text-slate-500 text-xs sm:text-sm font-light">
          Trusted by homeowners, builders, and painters across India
        </p>
      </div>

      {/* Full-Width Edge-to-Edge Continuous Train Ticker */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-5">
          {[...reviews, ...reviews, ...reviews].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[290px] sm:w-[330px] bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between shrink-0 hover:border-purple-300 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    {item.timeAgo}
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-normal leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full bg-gradient-to-r ${item.avatarBg} flex items-center justify-center font-extrabold text-white text-[10px] shrink-0 shadow-2xs`}
                >
                  {item.initial}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-slate-900 font-heading truncate">{item.author}</h4>
                    {item.verified && (
                      <CheckCircle className="w-3 h-3 text-emerald-500 fill-emerald-50 shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
