"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import { CheckCircle2, Send } from "lucide-react";

const inputClasses =
  "w-full border border-[#D8C7B3]/25 bg-[#061C18] px-4 py-3 text-sm text-[#EDE4D8] placeholder:text-[#C2B69D]/40 outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

const labelClasses = "mb-2 block font-label text-[10px] text-[#C2B69D]/60";

const BULB_STEMS = [10, 16, 22, 26, 28, 26, 22, 16, 10, 14, 20, 26, 28, 26, 20, 14];
const BULB_COLORS = ["#D4AF37", "#F3E5AB", "#E8A33D"];

function StringLights() {
  return (
    <div aria-hidden className="relative h-11 w-full">
      <div className="absolute inset-x-0 top-0 h-px bg-[#D8C7B3]/30" />
      <div className="flex justify-between px-2 sm:px-6">
        {BULB_STEMS.map((stem, i) => (
          <span
            key={i}
            className={
              i % 2 === 1
                ? "hidden flex-col items-center sm:flex"
                : "flex flex-col items-center"
            }
          >
            <span className="w-px bg-[#D8C7B3]/40" style={{ height: stem }} />
            <span
              className="diwali-bulb h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: BULB_COLORS[i % BULB_COLORS.length],
                animationDelay: `${(i % 5) * 0.35}s`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function DiyaRow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center gap-5 pb-1.5 sm:gap-9"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className={
            i > 4 ? "hidden flex-col items-center sm:flex" : "flex flex-col items-center"
          }
        >
          <span
            className="diwali-flame h-3.5 w-2 rounded-full bg-gradient-to-t from-[#C59B27] via-[#F3E5AB] to-[#FFF6D8]"
            style={{ animationDelay: `${(i % 4) * 0.28}s` }}
          />
          <span className="mt-0.5 h-3 w-9 rounded-b-full bg-gradient-to-b from-[#C59B27] to-[#8A6A12] shadow-[0_2px_10px_rgba(212,175,55,0.35)]" />
        </span>
      ))}
    </div>
  );
}

export default function DiwaliPage() {
  const [formData, setFormData] = useState({ name: "", mobile: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert("Please enter your name and mobile number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <style>{`
        @keyframes diwali-twinkle {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px 2px rgba(212, 175, 55, 0.55); }
          50% { opacity: 0.5; box-shadow: 0 0 4px 0 rgba(212, 175, 55, 0.2); }
        }
        @keyframes diwali-flicker {
          0%, 100% { transform: scale(1); opacity: 0.95; box-shadow: 0 0 12px 3px rgba(243, 229, 171, 0.45); }
          25% { transform: scale(1.08, 0.94); opacity: 0.8; box-shadow: 0 0 8px 2px rgba(243, 229, 171, 0.3); }
          50% { transform: scale(0.94, 1.06); opacity: 1; box-shadow: 0 0 14px 4px rgba(243, 229, 171, 0.5); }
          75% { transform: scale(1.04, 0.98); opacity: 0.85; box-shadow: 0 0 9px 2px rgba(243, 229, 171, 0.35); }
        }
        .diwali-bulb { animation: diwali-twinkle 2.2s ease-in-out infinite; }
        .diwali-flame { animation: diwali-flicker 1.6s ease-in-out infinite; }
      `}</style>

      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
        <StringLights />
      </div>

      <main className="flex-grow">
        <section className="relative w-full overflow-hidden px-6 pb-24 pt-14 sm:px-10 sm:pt-20">
          <div className="pointer-events-none absolute left-1/2 top-6 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-xl text-center">
            <p className="font-label text-[10px] text-[#D4AF37]">Festival of Lights</p>
            <h1 className="mt-4 text-[2.2rem] leading-tight text-[#EDE4D8] sm:text-[2.8rem]">
              Happy Diwali
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              May your home glow with new light and fresh colour this Diwali. Share your details
              and our team will help you pick the right paint for the festival.
            </p>

            <div className="mt-10 border border-[#D8C7B3]/25 bg-[#0A2621] p-6 text-left sm:p-8">
              {submitted ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto h-9 w-9 text-[#D4AF37]" />
                  <h2 className="mt-4 text-[1.35rem] leading-tight text-[#EDE4D8]">
                    Thank you, {formData.name}!
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#C2B69D]">
                    Our team will call you on {formData.mobile} shortly. Happy Diwali!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="diwali-name" className={labelClasses}>
                      Name
                    </label>
                    <input
                      id="diwali-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="diwali-mobile" className={labelClasses}>
                      Mobile
                    </label>
                    <input
                      id="diwali-mobile"
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="Enter mobile number"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="diwali-message" className={labelClasses}>
                      Message
                    </label>
                    <textarea
                      id="diwali-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you want to paint this Diwali..."
                      className={inputClasses}
                    />
                  </div>

                  <div className="pt-1 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-9 py-3.5 text-[0.8125rem] font-bold text-[#061C18] transition-all hover:brightness-110 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? "Sending..." : "Send My Details"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <DiyaRow />
      </main>

      <ToolsSupportTabs toolType="calculator" />

      <PaintingServiceQueryBanner sourceContext="diwali_page" />

      <Footer />
    </div>
  );
}
