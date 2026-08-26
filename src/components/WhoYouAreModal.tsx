"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Building2,
  Paintbrush2,
  Store,
  HardHat,
  HelpCircle,
} from "lucide-react";

export type UserCategory =
  | "Home Owner"
  | "Painter"
  | "Dealer"
  | "Contractor"
  | "Other";

interface CategoryOption {
  value: UserCategory;
  label: string;
  icon: React.ElementType;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "Home Owner", label: "Home Owner", icon: Building2 },
  { value: "Painter", label: "Painter", icon: Paintbrush2 },
  { value: "Dealer", label: "Dealer", icon: Store },
  { value: "Contractor", label: "Contractor", icon: HardHat },
  { value: "Other", label: "Other", icon: HelpCircle },
];

export default function WhoYouAreModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    category: "Home Owner" as UserCategory,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    try {
      const profile = localStorage.getItem("snowcem_user_profile");
      if (profile) return; // already submitted — never show again
    } catch {}

    const show = () => setIsOpen(true);
    const timer = setTimeout(show, 2500);
    const interval = setInterval(show, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!/^[0-9+\-\s]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Valid 10-digit required";
    }
    if (!formData.city.trim()) newErrors.city = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        localStorage.setItem("snowcem_user_profile", JSON.stringify(formData));
      } catch {}
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs transition-all duration-300 animate-in fade-in">
      <div
        className="relative w-full max-w-sm md:max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile top brand strip */}
        <div className="flex md:hidden items-center justify-center px-4 pt-4 pb-2 border-b border-slate-100">
          <Image src="/image.png" alt="Snowcem Paints" width={100} height={28} className="object-contain" priority />
        </div>

        {/* Brand Image Panel — desktop only */}
        <div className="hidden md:flex relative w-52 shrink-0 flex-col items-center justify-center p-6 gap-4 border-r border-slate-100">
          <Image src="/image.png" alt="Snowcem Paints" width={140} height={40} className="object-contain" priority />
          <div className="w-10 h-[2px] bg-[#f36c21] rounded-full" />
          <p className="text-slate-500 text-[11px] text-center leading-relaxed font-normal">
            India's pioneer in waterproofing &amp; cement paints since <span className="text-[#f36c21] font-bold">1959</span>.
          </p>
        </div>

        {/* Close Button — desktop only */}
        <button
          onClick={handleClose}
          className="hidden md:flex absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100/90 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors items-center justify-center z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Compact Scrollable Container */}
        <div className="p-4 sm:p-5 overflow-y-auto overscroll-contain flex-1">
          {!isSubmitted ? (
            <div>
              {/* Clean Header Copy (No top border, no badge, centered) */}
              <div className="text-center space-y-1 mb-3.5 pt-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
                  Connect With Us
                </h2>

                <p className="text-slate-500 text-xs leading-tight max-w-xs mx-auto font-normal">
                  Select your role for tailored shade &amp; dealer support.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Category Chips */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider font-heading">
                      I am a... <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[9px] text-slate-400 sm:hidden">Swipe &rarr;</span>
                  </div>

                  <div className="p-1.5 rounded-xl bg-slate-50/90 border border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.category === cat.value;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.value })}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-center transition-all shrink-0 whitespace-nowrap ${isSelected
                              ? "border-[#5c249c] bg-white text-[#5c249c] font-extrabold ring-1 ring-purple-300 shadow-2xs"
                              : "border-slate-200 bg-white/80 text-slate-600 hover:bg-white"
                            }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#5c249c]" : "text-slate-400"}`} />
                          <span className="text-[11px] font-heading font-bold">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-0.5 font-heading">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`w-full pl-8 pr-2.5 py-1.5 rounded-lg border text-xs text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5c249c] transition-all ${errors.name ? "border-rose-400" : "border-slate-200"
                        }`}
                    />
                  </div>
                  {errors.name && <p className="text-rose-500 text-[9px] mt-0.5 font-medium">{errors.name}</p>}
                </div>

                {/* Phone & City Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-0.5 font-heading">
                      Mobile <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        className={`w-full pl-8 pr-2 py-1.5 rounded-lg border text-xs text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5c249c] transition-all ${errors.phone ? "border-rose-400" : "border-slate-200"
                          }`}
                      />
                    </div>
                    {errors.phone && <p className="text-rose-500 text-[9px] mt-0.5 font-medium">{errors.phone}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-0.5 font-heading">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="City Name"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          if (errors.city) setErrors({ ...errors, city: "" });
                        }}
                        className={`w-full pl-8 pr-2 py-1.5 rounded-lg border text-xs text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5c249c] transition-all ${errors.city ? "border-rose-400" : "border-slate-200"
                          }`}
                      />
                    </div>
                    {errors.city && <p className="text-rose-500 text-[9px] mt-0.5 font-medium">{errors.city}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 text-white font-heading font-extrabold text-xs shadow-xs active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit & Continue"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Skip Link */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-[10px] text-slate-400 hover:text-slate-600 font-medium transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success View */
            <div className="text-center py-4 space-y-2 animate-in zoom-in-95">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                Thank You, {formData.name}!
              </h3>
              <p className="text-slate-600 text-xs max-w-xs mx-auto">
                Our Snowcem representative will reach out shortly.
              </p>
              <div className="pt-1">
                <button
                  onClick={handleClose}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-heading font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
