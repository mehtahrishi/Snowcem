"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { getCollectionsAction } from "@/actions/collection-actions";
import type { Collection } from "@/services/collectionsService";
import { Send, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

const defaultCollections: Partial<Collection>[] = [
  { id: 1, name: "Exterior Emulsions", slug: "exterior-emulsions" },
  { id: 2, name: "Interior Emulsions", slug: "interior-emulsions" },
  { id: 3, name: "Waterproofing Solutions", slug: "waterproofing" },
  { id: 4, name: "Primers & Undercoats", slug: "primers" },
  { id: 5, name: "Cement Paints", slug: "cement-paints" },
  { id: 6, name: "Wall Putty & Fillers", slug: "wall-putty" },
  { id: 7, name: "Designer Textures", slug: "designer-textures" },
];

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
  const [collections, setCollections] = useState<Partial<Collection>[]>(defaultCollections);

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

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await getCollectionsAction();
        if (data && data.length > 0) {
          setCollections(data);
        }
      } catch (err) {
        // Fallback to default collections
      }
    }
    fetchCollections();
  }, []);

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
    <footer className="bg-white text-gray-800 border-t border-gray-200 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
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
              {collections.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/products?category=${item.slug || ""}`}
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
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-normal">
          <p>© {new Date().getFullYear()} Snowcem Paints India Ltd. All rights reserved.</p>
          
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
