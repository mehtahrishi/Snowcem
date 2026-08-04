"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ChatbotWidget from "@/components/ChatbotWidget";
import CookieConsent from "@/components/CookieConsent";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Headphones,
  Navigation,
} from "lucide-react";

export default function ContactUsPage() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    inquiryType: "Customer Support",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const corporateAddress =
    "3rd Floor, Agrima Business Centre, N. K. Mehta International House, 178, Backbay Reclamation, Babubhai Chinai Marg, Mumbai - 400 020. MAHARASHTRA";
  const embedMapUrl =
    "https://maps.google.com/maps?q=N.+K.+Mehta+International+House,+Backbay+Reclamation,+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const mapsDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=N.+K.+Mehta+International+House,+Backbay+Reclamation,+Mumbai";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(corporateAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        inquiryType: "Customer Support",
        message: "",
      });
    }, 1200);
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
        <section className="bg-white py-12 md:py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2 mb-4">
                Get in Touch with Snowcem Paints
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Whether you have product queries, require technical paint consultation, want to locate a dealer, or explore business partnerships, our corporate team is here to assist you.
              </p>
            </div>
          </div>
        </section>

        {/* 3 CORE CONTACT CARDS */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* CARD 1: CORPORATE OFFICE */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-snowcem-orange transition-all duration-300 shadow-xs hover:shadow-lg group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-snowcem-orange mb-5 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  Corporate Office
                </h3>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4 relative">
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed flex items-start gap-2 pr-6">
                    <MapPin className="w-4 h-4 text-snowcem-orange shrink-0 mt-0.5" />
                    <span>{corporateAddress}</span>
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="absolute right-2 top-2 p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
                    title="Copy Address"
                  >
                    {copiedAddress ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-snowcem-orange border border-orange-200/80 text-xs font-bold transition-all text-center mt-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Map</span>
              </a>
            </div>

            {/* CARD 2: TOLL-FREE HELPLINE */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-snowcem-navy transition-all duration-300 shadow-xs hover:shadow-lg group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-snowcem-navy mb-5 group-hover:scale-105 transition-transform">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  Toll-Free Helpline
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                  Speak directly with our technical support and customer care team for immediate assistance.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4 text-center">
                  <span className="text-slate-500 text-xs font-semibold block mb-1">Toll-Free Number</span>
                  <a
                    href="tel:18008913541"
                    className="text-xl sm:text-2xl font-extrabold text-snowcem-navy hover:text-snowcem-orange transition-colors"
                  >
                    1800-891-3541
                  </a>
                </div>
              </div>

              <a
                href="tel:18008913541"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center mt-2"
              >
                <Phone className="w-4 h-4 text-snowcem-navy" />
                <span>Call Helpline Now</span>
              </a>
            </div>

            {/* CARD 3: EMAIL SUPPORT */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300 shadow-xs hover:shadow-lg group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  Email Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                  Send us your inquiries, dealership requests, or bulk architectural project requirements.
                </p>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4 text-center">
                  <span className="text-slate-500 text-xs font-semibold block mb-1">Official Support Mail</span>
                  <a
                    href="mailto:customercare.scl@snowcempaints.com"
                    className="text-xs sm:text-sm font-bold text-slate-900 hover:text-snowcem-orange transition-colors break-all"
                  >
                    customercare.scl@snowcempaints.com
                  </a>
                </div>
              </div>

              <a
                href="mailto:customercare.scl@snowcempaints.com"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 text-xs font-bold transition-all text-center mt-2"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Send Email Inquiry</span>
              </a>
            </div>

          </div>
        </section>

        {/* EMBEDDED GOOGLE MAP & INQUIRY FORM SECTION */}
        <section className="py-14 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
              
              {/* LEFT: EMBEDDED GOOGLE MAP OF CORPORATE OFFICE */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-snowcem-orange" />
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Locate Our Corporate Office
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Located at Backbay Reclamation, Babubhai Chinai Marg, South Mumbai. Visit us during business hours (Mon-Fri, 9:30 AM - 6:00 PM).
                </p>

                {/* Google Map iframe */}
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                  <iframe
                    title="Snowcem Paints Corporate Office Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={embedMapUrl}
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-500" />
                    Business Hours: Mon - Fri (9:30 AM - 6:00 PM)
                  </span>
                </div>
              </div>

              {/* RIGHT: INTERACTIVE CONTACT INQUIRY FORM */}
              <div className="lg:col-span-7 bg-slate-50/80 rounded-3xl border border-slate-200 p-6 sm:p-8 md:p-10 shadow-lg">
                <div className="mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-snowcem-orange bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                    Direct Inquiry Form
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-light">
                    Fill in your details below and our customer support specialist will respond within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mobile*
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all cursor-pointer font-medium"
                      >
                        <option value="Customer Support">Customer Support</option>
                        <option value="Dealer Inquiry">Dealer Partnership Inquiry</option>
                        <option value="Product Query">Product & Shade Query</option>
                        <option value="Architect & Project">Architect / Builder Project</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your inquiry or requirement..."
                      className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-snowcem-orange hover:bg-orange-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* SUCCESS CONFIRMATION MODAL */}
        {submitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Thank you for reaching out to Snowcem Paints. Your inquiry has been received and our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="w-full bg-snowcem-navy text-white font-bold text-xs py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Utilities & Footer */}
      <ChatbotWidget />
      <CookieConsent />
      <Footer />
    </div>
  );
}
