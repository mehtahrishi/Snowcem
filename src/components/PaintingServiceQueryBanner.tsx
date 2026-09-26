"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

interface PaintingServiceQueryBannerProps {
  titlePrefix?: string;
  sourceContext?: string;
}

export default function PaintingServiceQueryBanner({
  titlePrefix = "Snowcem",
  sourceContext = "product_or_visualizer_page",
}: PaintingServiceQueryBannerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    whatsappUpdates: true,
    constructionOngoing: false,
    localPainterHired: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert("Please enter your Name and Mobile number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm">
          {submitted ? (
            <div className="py-12 px-6 text-center max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Query Submitted Successfully!
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Thank you, <strong className="text-slate-800">{formData.name}</strong>. Our Snowcem technical painting specialist will get in touch with you at <strong className="text-slate-800">{formData.mobile}</strong> shortly to guide your painting project.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold font-heading transition-all"
              >
                Submit Another Query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Left Column: Heading & Subtitle */}
              <div className="lg:col-span-5 space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f44336] leading-tight tracking-tight font-heading">
                  Need Help? Get in Touch with Us
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1 max-w-md font-normal">
                  Bid goodbye to your home painting hassles with our expert supervision
                </p>

                {/* Subtle Trust Indicators */}
                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    60+ Years Trust
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Free Color Guidance
                  </span>
                </div>
              </div>

              {/* Right Column: 2x2 Input Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* 2x2 Input Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-300 focus:border-[#f44336] focus:ring-2 focus:ring-[#f44336]/10 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-300 focus:border-[#f44336] focus:ring-2 focus:ring-[#f44336]/10 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all bg-white"
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        required
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-300 focus:border-[#f44336] focus:ring-2 focus:ring-[#f44336]/10 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all bg-white"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <input
                        type="text"
                        placeholder="Enter your Pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-300 focus:border-[#f44336] focus:ring-2 focus:ring-[#f44336]/10 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Options Row: WhatsApp Toggle & Checkboxes */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    {/* WhatsApp Toggle */}
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                      <div
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, whatsappUpdates: !prev.whatsappUpdates }))
                        }
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          formData.whatsappUpdates ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            formData.whatsappUpdates ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">
                        Update me on WhatsApp
                      </span>
                    </label>

                    {/* Checkbox Group */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.constructionOngoing}
                          onChange={(e) =>
                            setFormData({ ...formData, constructionOngoing: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[#f44336] focus:ring-[#f44336] border-slate-300"
                        />
                        <span>Construction work going on at my house</span>
                      </label>

                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.localPainterHired}
                          onChange={(e) =>
                            setFormData({ ...formData, localPainterHired: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[#f44336] focus:ring-[#f44336] border-slate-300"
                        />
                        <span>Local painter hired</span>
                      </label>
                    </div>
                  </div>

                  {/* Disclaimer Text */}
                  <p className="text-[11px] sm:text-xs text-slate-400 pt-1 leading-relaxed">
                    By proceeding, you are authorizing Snowcem Paints and its suggested contractors to get in touch with you through calls, sms, or e-mail.
                  </p>

                  {/* Submit Button Row (Right Aligned) */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#f36c21] hover:bg-[#e05e16] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all duration-300 font-heading transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                    >
                      <span>{isSubmitting ? "Submitting..." : "Submit Query"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
