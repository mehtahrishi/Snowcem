"use client";

import React from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface InstagramPostItem {
  id: string;
  title: string;
  caption: string;
  tags: string[];
  likes: string;
  comments: string;
  date: string;
  // When an iframe URL is available, set this to e.g. "https://www.instagram.com/p/{POST_ID}/embed/"
  iframeSrc?: string;
}

const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/snowcempaints_official/?hl=en";

const SAMPLE_POSTS: InstagramPostItem[] = [
  {
    id: "post-1",
    title: "Rangon Ki Virasat — Legacy of Colors",
    caption:
      "60+ years of vibrant trust. Honoring master painters, contractors & dealers across India with high performance Snowcem protection.",
    tags: ["#SnowcemPaints", "#RangonKiVirasat", "#IndianHomes"],
    likes: "1,482",
    comments: "94",
    date: "2 days ago",
    iframeSrc: "", // Paste Instagram post embed iframe URL here
  },
  {
    id: "post-2",
    title: "Zenita Luxury Matte Emulsion",
    caption:
      "Bringing velvet touch finish and rich contrast to contemporary living rooms. Long-lasting anti-stain washable surface.",
    tags: ["#ZenitaLuxury", "#InteriorWallDecor", "#VelvetMatte"],
    likes: "2,310",
    comments: "158",
    date: "4 days ago",
    iframeSrc: "", // Paste Instagram post embed iframe URL here
  },
  {
    id: "post-3",
    title: "Sentino Acrylic Weatherproof Shield",
    caption:
      "Engineered to withstand heavy monsoons, harsh sun, and algal dampness. Exterior masonry that never loses its true color.",
    tags: ["#SentinoExterior", "#Waterproofing", "#AllWeatherPaint"],
    likes: "1,940",
    comments: "112",
    date: "1 week ago",
    iframeSrc: "", // Paste Instagram post embed iframe URL here
  },
  {
    id: "post-4",
    title: "Festive Studio & Heritage Palettes",
    caption:
      "Brighten up every corner with our curated festive shade harmonies. Personalize your home with timeless Snowcem hues.",
    tags: ["#FestiveStudio", "#ColourCatalogue", "#HomeTransformation"],
    likes: "3,450",
    comments: "246",
    date: "2 weeks ago",
    iframeSrc: "", // Paste Instagram post embed iframe URL here
  },
];

export default function InstagramFeedSection() {
  return (
    <section className="py-16 bg-[#FAFAFC] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header (Centered without pill, matching Virasat Stories & Rangon Ki Virasat) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
            Snowcem on Instagram
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Follow{" "}
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#5B6BB5] hover:text-[#DF3F6F] underline underline-offset-2 transition-colors"
            >
              @snowcempaints_official
            </a>{" "}
            for wall transformations, curated designer palettes, and craft stories from across India.
          </p>
        </div>

        {/* Posts Grid — Supports Live Iframes or Clean Text Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {SAMPLE_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top Subtle Brand Gradient Accent Line matching Virasat Stories */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F]" />

              {post.iframeSrc ? (
                /* Live Instagram Post Iframe */
                <div className="w-full flex-grow">
                  <iframe
                    src={post.iframeSrc}
                    className="w-full min-h-[480px] border-0"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency
                    allow="encrypted-media"
                    title={post.title}
                  />
                </div>
              ) : (
                /* Placeholder Post Container (Text only, zero public images) */
                <div className="flex flex-col h-full">
                  {/* Instagram Post Header */}
                  <div className="p-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] shrink-0">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-heading font-extrabold text-[10px] text-[#5B6BB5]">
                          SC
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            snowcempaints_official
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2a1b92] shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-none mt-0.5">
                          {post.date}
                        </span>
                      </div>
                    </div>

                    <a
                      href={INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#2a1b92] hover:text-[#e91e63] transition-colors"
                    >
                      Follow
                    </a>
                  </div>

                  {/* Post Media Placeholder Box — Text-only layout */}
                  <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50 to-slate-100/50 flex flex-col items-center justify-center p-6 text-center border-b border-slate-100 group-hover:bg-slate-100/70 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <InstagramIcon className="w-6 h-6 text-[#2a1b92]" />
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1 px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">
                      Instagram Post Iframe
                    </span>

                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading line-clamp-2 mt-1">
                      {post.title}
                    </h3>

                    <p className="text-[10px] text-slate-500 mt-2 max-w-[200px] leading-relaxed">
                      Embed iframe placeholder. Ready for post embed code.
                    </p>
                  </div>

                  {/* Post Interaction Bar */}
                  <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-slate-600 mb-2">
                        <div className="flex items-center gap-3">
                          <Heart className="w-4 h-4 text-[#e91e63] fill-[#e91e63]" />
                          <MessageCircle className="w-4 h-4 hover:text-[#2a1b92] transition-colors cursor-pointer" />
                          <Send className="w-4 h-4 hover:text-[#2a1b92] transition-colors cursor-pointer" />
                        </div>
                        <Bookmark className="w-4 h-4 hover:text-slate-900 transition-colors cursor-pointer" />
                      </div>

                      <p className="text-xs font-bold text-slate-900">
                        {post.likes} likes
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed mt-1 line-clamp-2">
                        <span className="font-bold text-slate-900 mr-1.5">
                          snowcempaints_official
                        </span>
                        {post.caption}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold text-[#2a1b92]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Post CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {post.comments} comments
                      </span>
                      <a
                        href={INSTAGRAM_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#2a1b92] hover:text-[#e91e63] transition-colors"
                      >
                        <span>View on Instagram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Banner with Handle & CTA */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left max-w-5xl mx-auto">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] shrink-0">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <InstagramIcon className="w-5 h-5 text-[#5B6BB5]" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                Join our Paint Community on Instagram
              </h4>
              <p className="text-xs text-slate-500">
                Tag <span className="font-bold text-slate-800">@snowcempaints_official</span> or use <span className="font-bold text-slate-800">#SnowcemPaints</span> to be featured.
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 shadow-sm hover:shadow-md transition-all font-heading cursor-pointer active:scale-95 shrink-0"
          >
            <span>Follow @snowcempaints_official</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
