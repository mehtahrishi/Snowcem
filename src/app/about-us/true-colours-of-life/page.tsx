"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import {
  Sparkles,
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  Server,
  Users,
  ArrowRight,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TrueColoursOfLifePage() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const shades = [
    {
      id: "shade-1",
      title: "Continuous Innovation",
      subtitle: "Pioneering Eco-Formulations",
      description: "Constantly evolving our paint formulations with zero-VOC, weather-proof, and eco-friendly technologies.",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50 border-blue-100 text-blue-600",
    },
    {
      id: "shade-2",
      title: "Consistent Quality",
      subtitle: "Uncompromising Excellence",
      description: "Rigorous quality control and premium raw materials ensuring flawless finish and decades of durability.",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
    {
      id: "shade-3",
      title: "Customer Satisfaction",
      subtitle: "At the Heart of Everything",
      description: "Dedicated to creating beautiful, joyful spaces and delivering exceptional technical service to homeowners.",
      icon: HeartHandshake,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50 border-amber-100 text-amber-600",
    },
    {
      id: "shade-4",
      title: "Robust Backend",
      subtitle: "Supply Chain Precision",
      description: "Strengthened by advanced manufacturing units, automated logistics, and a dependable stockist network.",
      icon: Server,
      color: "from-purple-500 to-indigo-500",
      bgLight: "bg-purple-50 border-purple-100 text-purple-600",
    },
    {
      id: "shade-5",
      title: "Strong Core Team",
      subtitle: "Powered by Passion",
      description: "A united family of passionate experts, field officers, and leaders working together to bring True Colours to Life.",
      icon: Users,
      color: "from-rose-500 to-pink-500",
      bgLight: "bg-rose-50 border-rose-100 text-rose-600",
    },
  ];

  const events = [
    {
      id: "event-1",
      title: "Business Partners Meet, Puri",
      location: "Puri, Odisha",
      description: "Our dealers in Puri meet for an evening of networking, recognition, and the latest updates at Snowcem Paints.",
      imageUrl: "/true-colors/business-event-puri.png",
    },
    {
      id: "event-2",
      title: "Business Partners Meet, Dubai",
      location: "Dubai, UAE",
      description: "Some of our top dealers and partners travel to Dubai for an exclusive partners’ meet and greet.",
      imageUrl: "/true-colors/business-event-dubai.png",
    },
    {
      id: "event-3",
      title: "Business Partners Meet, Durgapur",
      location: "Durgapur, West Bengal",
      description: "Recognising our dealers over an evening of networking.",
      imageUrl: "/true-colors/business-event-durgapur.png",
    },
    {
      id: "event-4",
      title: "Business Partners Meet, Thailand",
      location: "Thailand",
      description: "A special networking evening filled with new opportunities at Snowcem Paints.",
      imageUrl: "/true-colors/business-event-thailand.png",
    },
    {
      id: "event-5",
      title: "Annual Business Partners Convention",
      location: "Regional Hub",
      description: "Bringing together key trade partners and stockists to celebrate growth and launch innovative paint solutions.",
      imageUrl: "/true-colors/business-partner-meet.png",
    },
    {
      id: "event-6",
      title: "Dealers Excellence Summit, Ahmedabad",
      location: "Ahmedabad, Gujarat",
      description: "Gathering leading Gujarat applicators, contractors, and stockists for interactive product demonstrations.",
      imageUrl: "/true-colors/event-ahmedabad.png",
    },
    {
      id: "event-7",
      title: "Regional Trade Connect, Kolhapur",
      location: "Kolhapur, Maharashtra",
      description: "Empowering southern Maharashtra sales leaders and stockist partners with market growth strategies.",
      imageUrl: "/true-colors/event-kolhapur.png",
    },
    {
      id: "event-8",
      title: "Grand Dealers Gala, Puri",
      location: "Puri, Odisha",
      description: "Celebrating outstanding sales performance and long-standing partnerships in coastal Odisha.",
      imageUrl: "/true-colors/event-puri.png",
    },
    {
      id: "event-9",
      title: "Painters & Partners Meet, Rajkot",
      location: "Rajkot, Gujarat",
      description: "Technical training and color trends orientation session for Saurashtra region applicators and stockists.",
      imageUrl: "/true-colors/event-rajkot.png",
    },
    {
      id: "event-10",
      title: "Southern Region Business Meet, Salem",
      location: "Salem, Tamil Nadu",
      description: "Recognising top-performing dealers and launching new exterior emulsion lines in Tamil Nadu.",
      imageUrl: "/true-colors/event-salem.png",
    },
    {
      id: "event-11",
      title: "Metropolitan Dealers Forum, Thane",
      location: "Thane, Maharashtra",
      description: "Engaging Mumbai metropolitan area trade partners with consultative selling and digital tools.",
      imageUrl: "/true-colors/event-thane.png",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -350 : 350;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-white py-14 md:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2">
                True Colours of Life
              </h1>
              
              <p className="text-slate-700 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
                We all play many roles in life and are coloured by a spectrum of emotions. We grow and evolve, making some parts of us the primary colours of our personality, and some secondary—mixed to make us whole. Make us true.
              </p>

              <div className="pt-4 max-w-2xl mx-auto">
                <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed italic border-l-4 border-snowcem-orange pl-4 text-left">
                  &ldquo;It is with this philosophy that Snowcem Paints has the vision to be the change leaders and the most trusted brand in home painting services — by being true to who we are, what we do, and celebrating the True Colours of Life.&rdquo;
                </p>
              </div>

              <div className="pt-6 flex justify-center">
                <Link
                  href="/about-us/about-mehta-group"
                  className="inline-flex items-center gap-2.5 bg-snowcem-navy hover:bg-slate-800 text-white font-bold py-3.5 px-7 rounded-2xl transition-all shadow-md text-sm sm:text-base"
                >
                  <span>View The Snowcem Story</span>
                  <ArrowRight className="w-4 h-4 text-snowcem-orange" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SHADES THAT MAKE US WHO WE ARE */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Shades That Make Us Who We Are
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
              Our 5 foundational pillars that blend together to create unmatched quality, trust, and vibrant homes across India.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shades.slice(0, 3).map((shade) => {
                const IconComponent = shade.icon;
                return (
                  <div
                    key={shade.id}
                    className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-snowcem-orange transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl ${shade.bgLight} border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        {shade.subtitle}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1 mb-3">
                        {shade.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {shade.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto">
              {shades.slice(3, 5).map((shade) => {
                const IconComponent = shade.icon;
                return (
                  <div
                    key={shade.id}
                    className="flex-1 max-w-md w-full bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-snowcem-orange transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl ${shade.bgLight} border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        {shade.subtitle}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1 mb-3">
                        {shade.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {shade.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EVENTS AT SNOWCEM PAINTS (INTERACTIVE DRAGGABLE & SWIPEABLE CAROUSEL) */}
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Events at Snowcem Paints
                </h2>
                <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
                  Celebrating partner milestones, regional conventions, and international business partner meets across the globe.
                </p>
              </div>

              {/* Navigation Arrow Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-slate-400 hidden md:inline-block">
                  Hold & slide to explore
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollByAmount("left")}
                    aria-label="Scroll left"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-snowcem-navy hover:text-white text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollByAmount("right")}
                    aria-label="Scroll right"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-snowcem-navy hover:text-white text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* DRAGGABLE & SWIPEABLE CAROUSEL TRACK */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex items-start gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-1 scroll-smooth select-none cursor-grab active:cursor-grabbing border-b border-transparent"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className="snap-start w-[290px] sm:w-[320px] md:w-[350px] shrink-0 bg-white rounded-3xl border border-slate-200/90 hover:border-snowcem-orange transition-all duration-300 overflow-hidden group"
                >
                  {/* Event Photo Frame with Location Badge */}
                  <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      draggable={false}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-snowcem-orange" />
                      {event.location}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-snowcem-navy transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="px-5 pb-4 pt-2 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Snowcem Events</span>
                    <Calendar className="w-4 h-4 text-snowcem-orange" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
