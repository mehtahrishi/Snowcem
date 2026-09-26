"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Tag,
  Share2,
  TrendingUp,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Colour Trends & Decor",
    "Exterior & Waterproofing",
    "Paint Guides & Tips",
    "Room Styling",
  ];

  const blogPosts = [
    {
      id: "top-interior-colour-trends-2026",
      title: "Top 7 Interior Colour Trends for Modern Indian Homes in 2026",
      slug: "top-interior-colour-trends-2026",
      category: "Colour Trends & Decor",
      readTime: "5 min read",
      publishedDate: "August 2026",
      author: "Snowcem Shade Studio",
      image: "/visualizer/sample-living-room.png",
      excerpt:
        "From soothing warm greiges and earthy terracottas to botanical sage greens, discover the standout colour palettes transforming living rooms and bedrooms across India.",
      keyTakeaways: [
        "Warm Neutrals (Swiss Coffee, Alabaster White) maximize natural daylight in urban apartments.",
        "Earthy Terracottas and Rust Accents evoke warm Indian heritage with contemporary flair.",
        "Smooth Satin and Velvet finishes provide 100% stain washability for high-traffic family areas.",
      ],
      tags: ["Interior Trends", "Living Room", "Shade Palette", "Home Decor"],
    },
    {
      id: "exterior-wall-waterproofing-monsoon-guide",
      title: "How Weather-Proof Exterior Wall Paints Prevent Monsoon Seepage & Algae",
      slug: "exterior-wall-waterproofing-monsoon-guide",
      category: "Exterior & Waterproofing",
      readTime: "7 min read",
      publishedDate: "August 2026",
      author: "Snowcem Technical Advisory",
      image: "/visualizer/sample-exterior.png",
      excerpt:
        "Understand the chemistry of nano-silicone acrylic polymers and masonry primers to protect your home's exterior facades against heavy tropical rainfall, dampness, and efflorescence.",
      keyTakeaways: [
        "A 100% waterproof primer basecoat creates a uniform suction barrier on fresh cement plaster.",
        "Silicone-infused exterior emulsions like Uni-Glosss 18 provide up to 18 years of weather and UV defense.",
        "Anti-fungal additives prevent black monsoon patches and green algae on exterior boundary walls.",
      ],
      tags: ["Waterproofing", "Exterior Facade", "Monsoon Care", "Paint Science"],
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      {/* Header Wrapper */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      {/* 1. HERO BANNER */}
      <section className="relative w-full bg-[#0B0B0E] text-white py-12 sm:py-16 px-6 sm:px-10 lg:px-14 overflow-hidden border-b border-slate-800">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5B6BB5]/20 via-[#0B0B0E]/80 to-[#DF3F6F]/20 mix-blend-screen" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Snowcem Colour & Decor Magazine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
            Colour Blogs & Painting Guides
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            In-depth decor insights, shade pairing tips, and professional surface waterproofing advice to inspire your next home transformation.
          </p>
        </div>
      </section>

      {/* 2. SEO STRATEGY & SEARCH VALUE BANNER */}
      <section className="bg-white border-b border-gray-200 py-4 px-6 sm:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-[#5B6BB5] font-bold">
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Organic Search & Discovery Engine:</span>
          </div>
          <p className="text-center sm:text-left text-[11px] sm:text-xs leading-relaxed text-slate-500">
            These SEO-optimized guides target high-volume homeowner queries on Google Search (e.g., <em>“best interior wall colours in India”</em>, <em>“exterior paint waterproofing tips”</em>) to organically connect customers with Snowcem solutions.
          </p>
        </div>
      </section>

      {/* 3. MAIN BLOG DIRECTORY & ARTICLES */}
      <main className="flex-grow max-w-7xl mx-auto w-full py-10 sm:py-14 px-6 sm:px-10 lg:px-14 space-y-10">
        
        {/* Search & Topic Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-200">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-xs"
                    : "bg-white border border-gray-200 text-slate-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search topics, colours, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-200 text-xs text-slate-800 focus:outline-none focus:border-[#5B6BB5]"
            />
          </div>
        </div>

        {/* Featured Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Blog Image Cover */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>

                {/* Article Header & Excerpt */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Meta Bar */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#2a1b92] transition-colors leading-tight font-heading">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Key Takeaways Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[11px] font-label text-[#5B6BB5] block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {post.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold text-slate-500 bg-gray-100 px-2.5 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 flex items-center justify-between border-t border-gray-100">
                <Link
                  href="/color-visualizer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B6BB5] group-hover:text-[#DF3F6F] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preview Shades in Visualizer</span>
                </Link>

                <Link
                  href="/color-catalogue"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-900 hover:bg-gradient-to-r hover:from-[#5B6BB5] hover:to-[#DF3F6F] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 space-y-2">
            <h3 className="text-base font-bold text-slate-800">No blog articles found</h3>
            <p className="text-xs text-slate-500">
              Try searching with different keywords like "interior", "waterproofing", or "living room".
            </p>
          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
