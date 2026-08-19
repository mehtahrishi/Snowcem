"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
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
    // Open on every home page visit smoothly
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Enter your name";
    if (!formData.phone.trim()) {
      newErrors.phone = "Enter mobile number";
    } else if (!/^[0-9+\-\s]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Valid 10-digit number required";
    }
    if (!formData.city.trim()) newErrors.city = "Enter city";

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
      } catch {
        // Fallback
      }
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Gradient Accent Bar */}
        <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] shrink-0" />

        {/* Close Button (Large Touch Target) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-slate-100/90 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.5]" />
        </button>

        {/* Scrollable Container for Mobile */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain">
          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="text-center space-y-1 sm:space-y-1.5 mb-4 sm:mb-5 pr-6 sm:pr-0">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5c249c] text-[10px] sm:text-xs font-bold font-heading">
                  <Sparkles className="w-3 h-3" />
                  <span>Welcome to Snowcem Paints</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                  Who You Are?
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                  Tell us a bit about yourself for personalized shade recommendations & dealer support.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Horizontal Swipeable Category Chips */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider font-heading">
                      I am a... <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400 sm:hidden">Swipe &rarr;</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/90 border border-slate-100/90 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.category === cat.value;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.value })}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-center transition-all shrink-0 whitespace-nowrap ${
                            isSelected
                              ? "border-[#5c249c] bg-white text-[#5c249c] font-bold ring-2 ring-purple-300/60 shadow-xs scale-[1.02]"
                              : "border-slate-200 bg-white/80 text-slate-600 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? "text-[#5c249c]" : "text-slate-400"}`} />
                          <span className="text-xs font-heading font-bold">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c249c] transition-all ${
                        errors.name ? "border-rose-400 ring-1 ring-rose-300" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-rose-500 text-[10px] mt-0.5 font-medium">{errors.name}</p>}
                </div>

                {/* Phone & City Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        className={`w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c249c] transition-all ${
                          errors.phone ? "border-rose-400 ring-1 ring-rose-300" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-rose-500 text-[10px] mt-0.5 font-medium">{errors.phone}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, Pune"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          if (errors.city) setErrors({ ...errors, city: "" });
                        }}
                        className={`w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c249c] transition-all ${
                          errors.city ? "border-rose-400 ring-1 ring-rose-300" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.city && <p className="text-rose-500 text-[10px] mt-0.5 font-medium">{errors.city}</p>}
                  </div>
                </div>

                {/* Privacy Badge */}
                <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Privacy. Zero spam. We protect your data.</span>
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 text-white font-heading font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit & Continue"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Skip Link */}
                <div className="text-center pt-0.5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-[11px] text-slate-400 hover:text-slate-600 font-medium transition-colors py-0.5"
                  >
                    Skip for now
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success View */
            <div className="text-center py-6 sm:py-8 space-y-3 sm:space-y-4 animate-in zoom-in-95">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                Welcome, {formData.name}!
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xs mx-auto">
                Thank you for connecting with Snowcem Paints as a{" "}
                <span className="font-bold text-[#5c249c]">{formData.category}</span>.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl font-heading font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
