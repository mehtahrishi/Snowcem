"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ChatbotWidget from "@/components/ChatbotWidget";
import CookieConsent from "@/components/CookieConsent";
import {
  SNOWCEM_VALUES,
  EMPLOYEE_VOICES,
  CULTURE_MOMENTS,
} from "@/data/lifeAtSnowcemData";
import {
  Eye,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Users,
  Quote,
  ArrowRight,
  Sparkles,
  Heart,
  TrendingUp,
  Briefcase,
  Compass,
  Smile,
} from "lucide-react";

export default function LifeAtSnowcemPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredMoments =
    activeCategory === "All"
      ? CULTURE_MOMENTS
      : CULTURE_MOMENTS.filter((m) => m.category === activeCategory);

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
        <section className="bg-white py-14 md:py-20 border-b border-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2 mb-4">
              Life @ Snowcem
            </h1>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Empowering people, fostering innovation, and building meaningful long-term careers in an environment that truly cares about growth, balance, and integrity.
            </p>
          </div>
        </section>

        {/* MESSAGE FROM THE CHRO */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 relative overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row items-stretch">
            
            {/* LEFT COLUMN: FULL HEIGHT/WIDTH CHRO IMAGE */}
            <div className="w-full md:w-5/12 min-h-[320px] md:min-h-[420px] relative overflow-hidden shrink-0 bg-slate-100">
              <img
                src="/life-culture/image.png"
                alt="CHRO Snowcem Paints"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* RIGHT COLUMN: QUOTE & CONTEXT */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Message from the CHRO
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-5">
                  Chief Human Resources Officer
                </p>

                <Quote className="w-9 h-9 text-snowcem-orange/40 mb-3" />
                <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-700 italic">
                  &ldquo;At Snowcem, we believe in creating a workplace where individuals feel valued, empowered, and inspired to grow. Our focus is on nurturing talent, encouraging innovation, and building a culture of trust, collaboration, and continuous learning.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
                <span>&ldquo;Together, we are shaping a stronger, more sustainable future—one built on the strength of our people and the power of our shared values.&rdquo;</span>
              </div>
            </div>

          </div>
        </section>

        {/* DRIVEN BY VALUES GRID */}
        <section className="py-14 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Driven by Values
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
                Our core values guide how we work together, support each other, and serve our stockists and customers every day.
              </p>
            </div>

            {/* 5 Core Values Pyramid Layout (Top Row: 3 Cards, Bottom Row: 2 Cards Centered) */}
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Top Row: 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SNOWCEM_VALUES.slice(0, 3).map((val) => (
                  <div
                    key={val.id}
                    className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-snowcem-orange transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white border shadow-xs group-hover:scale-105 transition-transform ${val.gradient}`}
                      >
                        {val.iconName === "Eye" && <Eye className="w-6 h-6" />}
                        {val.iconName === "ShieldCheck" && (
                          <ShieldCheck className="w-6 h-6" />
                        )}
                        {val.iconName === "Award" && (
                          <Award className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        {val.subtitle}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-0.5 mb-2">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row: 2 Cards Centered */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto">
                {SNOWCEM_VALUES.slice(3, 5).map((val) => (
                  <div
                    key={val.id}
                    className="flex-1 max-w-md w-full bg-slate-50/90 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-snowcem-orange transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white border shadow-xs group-hover:scale-105 transition-transform ${val.gradient}`}
                      >
                        {val.iconName === "Zap" && <Zap className="w-6 h-6" />}
                        {val.iconName === "CheckCircle2" && (
                          <CheckCircle2 className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        {val.subtitle}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-0.5 mb-2">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NURTURING TALENT & MORE THAN JUST WORK */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* NURTURING TALENT CARD */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-snowcem-navy mb-5">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                  Your Growth. Our Priority
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                  We invest in your future through focused initiatives designed to unlock potential and accelerate career growth. Our approach includes <strong className="text-slate-800">Leadership Development</strong>, along with continuous hand holding and skill empowerment of the front line sales team to strengthen capabilities, build confidence, and drive long-term success.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3 text-xs font-bold text-snowcem-navy">
                <Compass className="w-4 h-4 text-snowcem-navy shrink-0" />
                <span>Mentorship & Continuous Sales Empowerment</span>
              </div>
            </div>

            {/* MORE THAN JUST WORK CARD */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-snowcem-orange mb-5">
                  <Smile className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                  More Than Just Work
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                  Life at Snowcem is about building meaningful careers in an environment that truly cares. We foster a culture that encourages ownership, innovation, and mutual respect.
                </p>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3">
                  Our commitment goes beyond professional development—we ensure employees enjoy a healthy work-life balance, feel supported in their roles, and have the opportunity to make a real impact. Here, you&apos;re not just an employee; you&apos;re a valued member of a community dedicated to excellence and growth.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3 text-xs font-bold text-snowcem-orange">
                <Heart className="w-4 h-4 text-snowcem-orange shrink-0" />
                <span>Healthy Work-Life Balance & Mutual Respect</span>
              </div>
            </div>

          </div>
        </section>

        {/* VOICES OF SNOWCEM (MINIMAL CONTINUOUS TRAIN TICKER) */}
        <section className="py-12 bg-white border-t border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Voices of Snowcem
            </h2>
            <p className="mt-1 text-slate-500 text-xs sm:text-sm font-light">
              Real experiences from our team across India
            </p>
          </div>

          {/* Continuous Train Slider (No buttons, no indicators, pauses on hover) */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee gap-5">
              {[...EMPLOYEE_VOICES, ...EMPLOYEE_VOICES, ...EMPLOYEE_VOICES].map((v, idx) => (
                <div
                  key={`${v.id}-${idx}`}
                  className="w-[300px] sm:w-[340px] bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between shrink-0 hover:border-purple-300 transition-colors"
                >
                  <p className="text-xs text-slate-700 font-normal leading-relaxed italic">
                    &ldquo;{v.quote}&rdquo;
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-heading">
                        {v.name}
                      </h4>
                      <p className="text-[11px] font-medium text-purple-700">
                        {v.role}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                      {v.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CULTURE IN ACTION GALLERY */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Culture in Action
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
              See how our values come to life through the moments that matter—from learning and development to celebrations that bring us together.
            </p>
          </div>

          {/* 3 Images Side-by-Side Grid (1 Beside Other) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredMoments.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-snowcem-orange transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={m.imageUrl}
                    alt={m.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
                    {m.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-snowcem-navy transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Snowcem Culture</span>
                    <Sparkles className="w-4 h-4 text-snowcem-orange" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GROW WITH SNOWCEM & JOIN THE SNOWCEM FAMILY CTA */}
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-snowcem-orange flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Grow with Snowcem
              </h2>

              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto">
                Your career path at Snowcem is designed to evolve with your ambitions and aspirations. At Snowcem, your career grows alongside you. We&apos;re committed to supporting long-term career journeys that align with your personal and professional goals.
              </p>
              
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-3xl mx-auto">
                Whether you&apos;re exploring new areas, deepening your expertise, or stepping into leadership roles, we provide the resources, guidance, and opportunities you need to succeed. Your growth is our success, and we&apos;re invested in making sure you reach your full potential.
              </p>

              <div className="pt-6 border-t border-slate-200 max-w-2xl mx-auto">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  Join the Snowcem Family
                </h3>
                <p className="text-slate-600 text-sm font-light mb-6">
                  If you&apos;re ready to build a meaningful career in an environment that nurtures your potential, we&apos;d love to hear from you.
                </p>

                <a
                  href="/careers"
                  className="inline-flex items-center justify-center gap-2 bg-snowcem-orange hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
                >
                  <span>View Current Opportunities</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Floating Utilities & Footer */}
      <ChatbotWidget />
      <CookieConsent />
      <Footer />
    </div>
  );
}
