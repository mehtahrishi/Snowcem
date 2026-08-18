"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import GoogleReviewsCarousel from "./GoogleReviewsCarousel";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { INSPIRING_IDEAS_VIDEOS } from "@/data/inspiringIdeasData";
import { Send, CheckCircle2, Sparkles, ShieldCheck, Star, Youtube, Linkedin, Instagram, Facebook } from "lucide-react";

const INDIAN_STATES = [
  "Select State",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const ZONES = [
  "Select Zone",
  "North Zone",
  "South Zone",
  "East Zone",
  "West Zone",
  "Central Zone",
];

export default function Footer() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    state: "",
    city: "",
    zone: "",
    message: "",
    agreeConsent: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert("Please fill in your Name and Mobile number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 pt-12 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* PAINT BUDGET CALCULATOR & COLOUR VISUALISER PROMO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Card 1: Paint Budget Calculator */}
          <div className="bg-white text-slate-900 rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            {/* Top gradient strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63]" />
            <div className="space-y-3 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#5c249c] shadow-2xs group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] px-2.5 py-1 rounded-full inline-block shadow-2xs">
                Smart Tool
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading group-hover:bg-gradient-to-r group-hover:from-[#2a1b92] group-hover:via-[#5c249c] group-hover:to-[#e91e63] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                Paint Budget Calculator
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Unsure about your budget? Fill in quick details about your project such as the total area to instantly calculate your required funds.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="/paint-calculator"
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-gradient-to-r hover:from-[#2a1b92] hover:via-[#5c249c] hover:to-[#e91e63] text-white font-bold py-2.5 px-6 rounded-xl transition-all text-xs shadow-xs"
              >
                <span>Explore More</span>
                <span className="text-sm">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Card 2: Colour Visualiser */}
          <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-slate-900 text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-purple-900/50 shadow-md group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-pink-300 bg-white/10 px-2.5 py-1 rounded-md inline-block">
                3D Virtual Tool
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                Colour Visualiser
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                Bring your ideas to life virtually! Test out colour schemes on virtual spaces to visualise how your home can look.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/color-visualizer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 text-white font-bold py-2.5 px-6 rounded-xl transition-all text-xs shadow-xs"
              >
                <span>Explore More</span>
                <span className="text-sm">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* INSPIRING IDEAS FOR YOU - HOME & PAINT SHOWCASE SECTION */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                Inspiring Ideas For You
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Explore breathtaking homes, stunning exterior elevations, and designer interior shade combinations.
              </p>
            </div>
            <Link
              href="/color-visualizer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-snowcem-navy hover:text-snowcem-orange transition-colors group self-start sm:self-auto"
            >
              <span>Try Color Visualizer</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full">
            {INSPIRING_IDEAS_VIDEOS.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-950 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 w-full"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block rounded-xl sm:rounded-2xl pointer-events-none"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
            ))}
          </div>
        </div>

        {/* GLOBAL CONSULTATION & HOME PAINTING SERVICE FORM */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 md:p-12 mb-16 shadow-xs">
          <div className="max-w-3xl mb-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Not sure what you&rsquo;re looking for?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Let us help you find your colour in life with our home painting services.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-emerald-900">Thank You for Reaching Out!</h4>
              <p className="text-sm text-emerald-700 max-w-lg mx-auto">
                Our Snowcem Home Painting Services expert will contact you shortly to help choose your ideal colours and paint solutions.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-snowcem-navy hover:underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ROW 1: NAME & EMAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all"
                  />
                </div>
              </div>

              {/* ROW 2: MOBILE & PINCODE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile*
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pincode*
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all"
                  />
                </div>
              </div>

              {/* ROW 3: SELECT STATE & CITY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all"
                  />
                </div>
              </div>

              {/* ROW 4: ZONE */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Zone*
                </label>
                <select
                  name="zone"
                  required
                  value={formData.zone}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all"
                >
                  {ZONES.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>

              {/* ROW 5: MESSAGE BIG TEXTAREA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message*
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your painting, color, or waterproofing requirement in detail..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-snowcem-orange focus:ring-1 focus:ring-snowcem-orange transition-all resize-y"
                />
              </div>

              {/* ROW 5: CONSENT CHECKBOX & SUBMIT BUTTON */}
              <div className="pt-2 space-y-4">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 font-normal cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeConsent"
                    checked={formData.agreeConsent}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-300 text-snowcem-navy focus:ring-snowcem-navy"
                  />
                  <span>
                    I agree to the terms of Service and Privacy policy. Yes, I would like to receive important updates and notifications through calls, sms or e-mail.
                  </span>
                </label>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-snowcem-navy hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm text-sm"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit</span>
                        <Send className="w-4 h-4 text-snowcem-orange" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* GOOGLE REVIEWS CAROUSEL WIDGET (FULL SCREEN WIDTH) */}
      <GoogleReviewsCarousel />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Simple Firm Header Row Above Columns (Left Brand Logo, Right Summary Text) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-10 mb-12 border-b border-gray-200 gap-6">
          <Logo compact={false} />
          <p className="text-sm md:text-base text-gray-600 max-w-xl font-normal leading-relaxed">
            Snowcem Paints is India's pioneer in high-performance interior & exterior emulsions, cement paints, waterproofing coats, and primers since 1959. Part of the renowned Mehta Group legacy.
          </p>
        </div>

        {/* 4 Footer Columns Matching Screenshot Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          
          {/* Column 1: About us */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
              About us
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="/about-us/the-snowcem-story" className="hover:text-snowcem-orange transition-colors block">
                  The Snowcem Story
                </a>
              </li>
              <li>
                <a href="/about-us/true-colours-of-life" className="hover:text-snowcem-orange transition-colors block">
                  True Colours of Life
                </a>
              </li>
              <li>
                <a href="/about-us/about-mehta-group" className="hover:text-snowcem-orange transition-colors block">
                  About Mehta Group
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
              Products
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              {CATEGORIES_DATA.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="hover:text-snowcem-orange transition-colors block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
              Connect
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="/find-dealer" className="hover:text-snowcem-orange transition-colors block">
                  Find Dealer
                </a>
              </li>
              <li>
                <a href="/media" className="hover:text-snowcem-orange transition-colors block">
                  Media
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-snowcem-orange transition-colors block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-snowcem-navy font-heading">
              Company
            </h4>
            <ul className="space-y-3 text-base font-normal text-gray-600">
              <li>
                <a href="/careers" className="hover:text-snowcem-orange transition-colors block">
                  Careers
                </a>
              </li>
              <li>
                <a href="/life-at-snowcem" className="hover:text-snowcem-orange transition-colors block">
                  Life @ Snowcem
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500 font-normal">
          <p>© {new Date().getFullYear()} Snowcem Paints India Ltd. All rights reserved.</p>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-600 text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0077b5] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#1877f2] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#e60023] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-110"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-gray-900 transition-colors">Terms & Conditions</a>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <p className="text-gray-600 font-medium flex items-center gap-1.5">
              <span>Developed by</span>
              <span className="font-bold text-slate-900 tracking-wide hover:text-snowcem-orange transition-colors">Virtu Media</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
