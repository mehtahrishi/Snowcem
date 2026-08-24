"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Palette,
  Store,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ProfessionalAdviceSection() {
  const adviceServices = [
    {
      id: "01",
      number: "01",
      title: "Interior Designer Near You",
      icon: Compass,
      href: "/store-locator",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      badgeColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      id: "02",
      number: "02",
      title: "Design Consultancy",
      icon: Palette,
      href: "/color-visualizer",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      badgeColor: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      id: "03",
      number: "03",
      title: "Dealer Near You",
      icon: Store,
      href: "/store-locator",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
      badgeColor: "text-pink-600 bg-pink-50 border-pink-100",
    },
    {
      id: "04",
      number: "04",
      title: "Contractor Near You",
      icon: Users,
      href: "/store-locator",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
      badgeColor: "text-orange-600 bg-orange-50 border-orange-100",
    },
  ];

  return (
    <section className="py-14 sm:py-18 md:py-22 bg-slate-50/70 border-t border-slate-200/80 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-3.5 sm:px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Expert Guidance
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Looking For a Professional Advice
          </h2>

          <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed px-2">
            Unsure about the right materials or designs for your project? Connect with our professionals and make confident design choices!
          </p>
        </div>

        {/* Professional Advice Cards Grid (Clean Unobstructed Photography, Number Badge Below Image) */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 pt-2 px-1 scroll-smooth snap-x no-scrollbar">
          {adviceServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="w-[280px] sm:w-auto shrink-0 snap-start bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Clean High-Res Image Container (No Number Overlay) */}
                  <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  {/* Below Image: Number Badge & Service Icon Header Row */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xl sm:text-2xl font-extrabold font-mono text-slate-400 group-hover:text-[#5c249c] transition-colors">
                      {service.number}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs ${service.badgeColor}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight font-heading group-hover:text-[#5c249c] transition-colors leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* View All Link */}
                <div className="pt-5">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold font-heading text-slate-900 group-hover:text-[#5c249c] transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
