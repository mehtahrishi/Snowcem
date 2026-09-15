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
  ChevronDown,
  UserCheck,
} from "lucide-react";

// Authentic WhatsApp icon
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="0"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

  // Keyboard accessibility: ESC closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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

  const selectedCat =
    CATEGORY_OPTIONS.find((c) => c.value === formData.category) ||
    CATEGORY_OPTIONS[0];
  const SelectedIcon = selectedCat.icon;

  return (
    <>
      {/* Right-Center Sticky Tab: Icon Only (Snowcem brand styled) */}
      <aside
        aria-label="Who You Are - Connect"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-auto select-none"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-center pl-2 sm:pl-2.5 pr-1 sm:pr-1.5 py-1.5 sm:py-2 rounded-l-full bg-white border-2 border-r-0 border-[#DF3F6F]/40 hover:border-[#DF3F6F] shadow-lg hover:-translate-x-1 hover:shadow-2xl transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Connect With Us / Who You Are"
          title="Connect With Us / Who You Are"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#5B6BB5] to-[#DF3F6F] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
          </div>
        </button>
      </aside>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Floating Right-Side Card (Opens from right side, Not Full Height) */}
      <div
        className={`fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-50 w-[calc(100vw-1rem)] sm:w-[410px] max-w-full bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden max-h-[88vh] transition-all duration-300 ease-out transform ${
          isOpen
            ? "translate-x-0 opacity-100 scale-100 pointer-events-auto"
            : "translate-x-10 opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="who-you-are-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card Top Strip with Brand Logo & Close Button */}
        <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <Image
              src="/image.png"
              alt="Snowcem Paints"
              width={85}
              height={24}
              className="object-contain"
              priority
            />
            <span className="text-[10px] font-medium text-[#DF3F6F] uppercase tracking-widest font-label bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100/80">
              Since 1959
            </span>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer border border-slate-200/80 shadow-xs"
            aria-label="Close panel"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Brand Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] shrink-0" />

        {/* Scrollable Form Content */}
        <div className="p-4 sm:p-5 overflow-y-auto overscroll-contain flex-1">
          {!isSubmitted ? (
            <div>
              <div className="text-center space-y-1 mb-3.5 pt-0.5">
                <h2
                  id="who-you-are-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-heading"
                >
                  Connect With Us
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto font-normal">
                  Select your role for tailored shade &amp; dealer support.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Category Dropdown */}
                <div>
                  <label
                    htmlFor="role-select"
                    className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-1 font-heading"
                  >
                    I am a... <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <SelectedIcon className="w-4 h-4 text-[#5c249c] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                    <select
                      id="role-select"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as UserCategory,
                        })
                      }
                      className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50/80 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c249c] focus:border-[#5c249c] transition-all appearance-none cursor-pointer font-heading"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option
                          key={cat.value}
                          value={cat.value}
                          className="text-slate-800 font-semibold py-1"
                        >
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Full Name */}
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
                      className={`w-full pl-8 pr-2.5 py-1.5 rounded-lg border text-xs text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5c249c] transition-all ${
                        errors.name ? "border-rose-400" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-rose-500 text-[9px] mt-0.5 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone & City Grid */}
                <div className="grid grid-cols-2 gap-2">
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
                        className={`w-full pl-8 pr-2 py-1.5 rounded-lg border text-xs text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5c249c] transition-all ${
                          errors.phone ? "border-rose-400" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-rose-500 text-[9px] mt-0.5 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

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
                        className={`w-full pl-8 pr-2 py-1.5 rounded-lg border text-xs text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5c249c] transition-all ${
                          errors.city ? "border-rose-400" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.city && (
                      <p className="text-rose-500 text-[9px] mt-0.5 font-medium">
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white font-heading font-bold text-xs shadow-xs active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? "Submitting..." : "Submit & Continue"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success View */
            <div className="text-center py-6 space-y-2.5 animate-in zoom-in-95">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                Thank You, {formData.name}!
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto">
                Our Snowcem representative will reach out shortly to support you
                as a{" "}
                <span className="font-bold text-[#5c249c]">
                  {formData.category}
                </span>.
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-heading font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Continue Exploring
                </button>
                <a
                  href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>Chat</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
