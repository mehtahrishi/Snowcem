"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import ExperienceMoreThanColour from "@/components/ExperienceMoreThanColour";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import {
  Calculator,
  Check,
  Printer,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  ArrowLeft,
  Download,
  Phone,
  Mail,
  User,
  MapPin,
  Clock,
  Paintbrush,
  MessageCircle,
} from "lucide-react";
import {
  PaintCategory,
  calculatePaintBudget,
  CalculatedSolution,
} from "@/data/paintCalculatorData";

type NeedType = "fresh" | "repainting";
type StartTimeline = "Immediate" | "Within a month" | "After 1 month";
type LocalPainterHired = "Yes" | "No";

interface LeadFormState {
  fullName: string;
  email: string;
  phone: string;
  pincode: string;
  whatsappUpdates: boolean;
  startTimeline: StartTimeline;
  localPainterHired: LocalPainterHired;
}

export default function PaintCalculatorPage() {
  // Step 1: Input | Step 2: Lead Form | Step 3: Recommendation Stack of Cards
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // 1. Initial Inputs
  const [category, setCategory] = useState<PaintCategory>("interior");
  const [need, setNeed] = useState<NeedType>("repainting");
  const [carpetArea, setCarpetArea] = useState<string>("500");

  // 2. Lead Capture Form State
  const [leadForm, setLeadForm] = useState<LeadFormState>({
    fullName: "",
    email: "",
    phone: "",
    pincode: "",
    whatsappUpdates: true,
    startTimeline: "Immediate",
    localPainterHired: "No",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // 3. Solution Stack Index (Active Card in Stack Carousel)
  const [activeSolutionIndex, setActiveSolutionIndex] = useState<number>(0);

  // 4. Interactive FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Parse entered area number
  const parsedArea = useMemo(() => {
    const val = parseFloat(carpetArea);
    return isNaN(val) || val <= 0 ? 0 : val;
  }, [carpetArea]);

  // Compute Paint Calculation Result dynamically from Backend Engine
  const calculationResult = useMemo(() => {
    return calculatePaintBudget(parsedArea, category);
  }, [parsedArea, category]);

  const solutions = calculationResult.solutions;
  const currentSolution: CalculatedSolution | undefined = solutions[activeSolutionIndex] || solutions[0];

  // Navigate next/prev solution in stack
  const handlePrevSolution = () => {
    setActiveSolutionIndex((prev) => (prev > 0 ? prev - 1 : solutions.length - 1));
  };

  const handleNextSolution = () => {
    setActiveSolutionIndex((prev) => (prev < solutions.length - 1 ? prev + 1 : 0));
  };

  // Step 1 -> Step 2 validation
  const handleProceedToLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedArea <= 0) return;
    setCurrentStep(2);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Step 2 -> Step 3 lead submission validation
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!leadForm.fullName.trim()) errors.fullName = "Full name is required";
    if (!leadForm.email.trim() || !leadForm.email.includes("@"))
      errors.email = "Valid email is required";
    if (!leadForm.phone.trim() || leadForm.phone.replace(/\D/g, "").length < 10)
      errors.phone = "Valid 10-digit mobile number is required";
    if (!leadForm.pincode.trim() || leadForm.pincode.length < 6)
      errors.pincode = "Valid 6-digit PIN code is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setActiveSolutionIndex(0);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetToStep1 = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      {/* Header Wrapper */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      {/* =========================================================================
          STEP 1: USER INPUTS (CATEGORY, NEED, AREA)
          ========================================================================= */}
      {currentStep === 1 && (
        <>
          {/* Hero Banner */}
          <section className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] overflow-hidden bg-slate-900">
            <img
              src="/tools/calculator.png"
              alt="Snowcem Paint Budget Calculator"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-14">
              <div className="max-w-7xl mx-auto w-full space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider">
                  <Calculator className="w-3.5 h-3.5 text-yellow-300" />
                  Indicative Paint Budget Planner
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  Paint Budget Calculator
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
                  Get an indicative estimate of wall paint quantity in litres, primer, wall putty and budget in just 2 simple steps.
                </p>
              </div>
            </div>
          </section>

          {/* Main Input Form */}
          <main className="flex-grow py-8 sm:py-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
            <form onSubmit={handleProceedToLead} className="space-y-6">
              {/* Top Container: Need & Space Selectors */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Select Your Need: Fresh Painting vs Repainting */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-center text-slate-900 uppercase tracking-wider mb-5">
                      Select Your Need
                    </h3>
                    <div className="flex items-center justify-center gap-6 sm:gap-8">
                      {/* Fresh Painting */}
                      <button
                        type="button"
                        onClick={() => setNeed("fresh")}
                        className="flex flex-col items-center group focus:outline-none"
                      >
                        <div
                          className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                            need === "fresh"
                              ? "border-[#5B6BB5] scale-105 shadow-md"
                              : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                          }`}
                        >
                          <img
                            src="/tools/fresh.png"
                            alt="Fresh Painting"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-1 flex justify-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                need === "fresh"
                                  ? "bg-[#5B6BB5] text-white shadow-md scale-110"
                                  : "bg-black/40 text-transparent"
                              }`}
                            >
                              {need === "fresh" && (
                                <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                            need === "fresh"
                              ? "text-[#5B6BB5]"
                              : "text-slate-600 group-hover:text-slate-900"
                          }`}
                        >
                          Fresh Painting
                        </span>
                      </button>

                      {/* Repainting */}
                      <button
                        type="button"
                        onClick={() => setNeed("repainting")}
                        className="flex flex-col items-center group focus:outline-none"
                      >
                        <div
                          className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                            need === "repainting"
                              ? "border-[#5B6BB5] scale-105 shadow-md"
                              : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                          }`}
                        >
                          <img
                            src="/tools/repainting.png"
                            alt="Repainting"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-1 flex justify-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                need === "repainting"
                                  ? "bg-[#5B6BB5] text-white shadow-md scale-110"
                                  : "bg-black/40 text-transparent"
                              }`}
                            >
                              {need === "repainting" && (
                                <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                            need === "repainting"
                              ? "text-[#5B6BB5]"
                              : "text-slate-600 group-hover:text-slate-900"
                          }`}
                        >
                          Repainting
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Select Your Space: Interior vs Exterior */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-center text-slate-900 uppercase tracking-wider mb-5">
                      Select Your Space
                    </h3>
                    <div className="flex items-center justify-center gap-6 sm:gap-8">
                      {/* Interior Walls */}
                      <button
                        type="button"
                        onClick={() => setCategory("interior")}
                        className="flex flex-col items-center group focus:outline-none"
                      >
                        <div
                          className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                            category === "interior"
                              ? "border-[#5B6BB5] scale-105 shadow-md"
                              : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                          }`}
                        >
                          <img
                            src="/tools/interior.png"
                            alt="Interior Walls"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-1 flex justify-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                category === "interior"
                                  ? "bg-[#5B6BB5] text-white shadow-md scale-110"
                                  : "bg-black/40 text-transparent"
                              }`}
                            >
                              {category === "interior" && (
                                <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                            category === "interior"
                              ? "text-[#5B6BB5]"
                              : "text-slate-600 group-hover:text-slate-900"
                          }`}
                        >
                          Interior Walls (3.5×)
                        </span>
                      </button>

                      {/* Exterior Walls */}
                      <button
                        type="button"
                        onClick={() => setCategory("exterior")}
                        className="flex flex-col items-center group focus:outline-none"
                      >
                        <div
                          className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 transition-all duration-200 ${
                            category === "exterior"
                              ? "border-[#5B6BB5] scale-105 shadow-md"
                              : "border-slate-200 opacity-80 group-hover:opacity-100 group-hover:border-slate-300"
                          }`}
                        >
                          <img
                            src="/tools/exterior.png"
                            alt="Exterior Walls"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-1 flex justify-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                category === "exterior"
                                  ? "bg-[#5B6BB5] text-white shadow-md scale-110"
                                  : "bg-black/40 text-transparent"
                              }`}
                            >
                              {category === "exterior" && (
                                <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                            category === "exterior"
                              ? "text-[#5B6BB5]"
                              : "text-slate-600 group-hover:text-slate-900"
                          }`}
                        >
                          Exterior Walls (2.5×)
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card: Carpet Area Input */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-4 font-heading">
                  Enter Wall Area or Carpet Space
                </h2>

                <div className="max-w-xl mx-auto space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full">
                      <input
                        type="number"
                        min="1"
                        value={carpetArea}
                        onChange={(e) => setCarpetArea(e.target.value)}
                        placeholder="Enter carpet area in Sq.Ft."
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-300 bg-white text-base font-bold text-gray-900 focus:border-[#5B6BB5] focus:ring-4 focus:ring-[#5B6BB5]/10 outline-none"
                        required
                      />
                      <span className="absolute right-4 top-4 text-xs font-bold text-gray-400 uppercase">
                        Sq.Ft.
                      </span>
                    </div>

                    {/* Quick Area Presets */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {["500", "1000", "1500", "2000"].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setCarpetArea(preset)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                            carpetArea === preset
                              ? "bg-[#5B6BB5] text-white border-[#5B6BB5]"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Multiplier Note */}
                  <div className="pt-1 flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span>
                      Multiplier:{" "}
                      <strong className="text-slate-800">
                        {category === "exterior" ? "2.5× for Exterior" : "3.5× for Interior"}
                      </strong>
                    </span>
                    <span className="font-extrabold text-[#5B6BB5]">
                      Total Area: {calculationResult.totalPaintingArea.toLocaleString()} Sq.Ft.
                    </span>
                  </div>

                  {/* Submit Button to Step 2 */}
                  <div className="pt-3 flex justify-center">
                    <button
                      type="submit"
                      disabled={parsedArea <= 0}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#5B6BB5] hover:bg-[#4a5899] disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>Calculate &amp; View Solutions</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Informative Painting Cost & Estimation Guide */}
            <section className="mt-14 pt-8 border-t border-gray-200 space-y-8">
              <div className="max-w-3xl space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                  Estimate Your Wall Painting Cost Easily
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Thinking of refreshing your interiors with a velvet finish, or protecting your exterior facade before the monsoon? The Snowcem Paint Budget Calculator gives an accurate, multi-step projection of paint quantity, putty, primer, and labour budget to help you plan ahead with confidence.
                </p>
              </div>

              {/* 4 Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Predefined Combinations</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Automatic system pairing from master data: Primer, Putty, and Topcoat layers mapped seamlessly.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Budget Planning</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Primer, wall putty and wall emulsion can be considered together while planning your budget.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Multiplier Factors</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Multiplies carpet area by 2.5× for Exterior and 3.5× for Interior to account for full wall perimeter.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Informed Choices</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Compare product options based on finish, coverage and intended use before deciding.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </>
      )}

      {/* =========================================================================
          STEP 2: LEAD CAPTURE FORM ("Your estimate is almost ready")
          ========================================================================= */}
      {currentStep === 2 && (
        <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
          {/* Back button */}
          <button
            type="button"
            onClick={handleResetToStep1}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Area &amp; Space Selection</span>
          </button>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-6">
            {/* Header */}
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5B6BB5]">
                Final Step
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                Your estimate is almost ready
              </h1>
              <p className="text-sm text-slate-600">
                Share your details to receive the painting estimate.
              </p>
            </div>

            {/* Input Summary Pill */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs">
              <div className="text-slate-700">
                <span className="font-bold text-slate-900 capitalize">{category} Walls</span> •{" "}
                <span className="capitalize">{need}</span> •{" "}
                <span className="font-extrabold text-[#5B6BB5]">{parsedArea} Sq.Ft.</span> (Total: {calculationResult.totalPaintingArea} Sq.Ft.)
              </div>
              <button
                type="button"
                onClick={handleResetToStep1}
                className="font-bold text-[#5B6BB5] hover:underline"
              >
                Change
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLeadSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    placeholder="e.g. Hridhi Mehta"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold text-slate-900 outline-none focus:ring-2 ${
                      formErrors.fullName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-[#5B6BB5] focus:ring-[#5B6BB5]/20"
                    }`}
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="e.g. mehtahrishi45@gmail.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold text-slate-900 outline-none focus:ring-2 ${
                      formErrors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-[#5B6BB5] focus:ring-[#5B6BB5]/20"
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Phone & PIN Code Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-xs font-bold text-slate-600">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="9892090398"
                      className={`w-full px-3.5 py-3 rounded-r-xl border text-sm font-semibold text-slate-900 outline-none focus:ring-2 ${
                        formErrors.phone
                          ? "border-red-500 focus:ring-red-200"
                          : "border-slate-300 focus:border-[#5B6BB5] focus:ring-[#5B6BB5]/20"
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    PIN Code *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      maxLength={6}
                      value={leadForm.pincode}
                      onChange={(e) => setLeadForm({ ...leadForm, pincode: e.target.value })}
                      placeholder="401107"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold text-slate-900 outline-none focus:ring-2 ${
                        formErrors.pincode
                          ? "border-red-500 focus:ring-red-200"
                          : "border-slate-300 focus:border-[#5B6BB5] focus:ring-[#5B6BB5]/20"
                      }`}
                    />
                  </div>
                  {formErrors.pincode && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.pincode}</p>
                  )}
                </div>
              </div>

              {/* WhatsApp Updates Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="whatsappCheck"
                  checked={leadForm.whatsappUpdates}
                  onChange={(e) =>
                    setLeadForm({ ...leadForm, whatsappUpdates: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#5B6BB5] focus:ring-[#5B6BB5] border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="whatsappCheck"
                  className="text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                  Get updates on WhatsApp
                </label>
              </div>

              {/* Timeline Radio Pills */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  When do you plan to start with the painting? *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Immediate", "Within a month", "After 1 month"] as StartTimeline[]).map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setLeadForm({ ...leadForm, startTimeline: opt })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          leadForm.startTimeline === opt
                            ? "bg-[#5B6BB5] text-white border-[#5B6BB5] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Local Painter Hired Radio Pills */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Is there a local painter hired? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["Yes", "No"] as LocalPainterHired[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setLeadForm({ ...leadForm, localPainterHired: opt })}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                        leadForm.localPainterHired === opt
                          ? "bg-[#5B6BB5] text-white border-[#5B6BB5] shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Disclaimer Consent Text */}
              <div className="pt-2 text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                By proceeding, I authorize Snowcem Paints and its authorized contractors/partners to contact me via WhatsApp, phone calls, SMS and e-mail and I agree to the Terms &amp; Conditions and Privacy Policy.
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#5B6BB5] hover:bg-[#4a5899] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>View Painting Estimate</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* =========================================================================
          STEP 3: RECOMMENDATION SYSTEM (STACK OF CARDS CAROUSEL - ASIAN PAINTS STYLE)
          ========================================================================= */}
      {currentStep === 3 && currentSolution && (
        <main className="flex-grow bg-slate-50/70 text-slate-900 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 w-full">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Top Navigation */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <button
                type="button"
                onClick={handleResetToStep1}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#5B6BB5]" />
                <span>Calculate again</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>System</span>
                <span className="font-extrabold text-slate-900">
                  {activeSolutionIndex + 1} of {solutions.length}
                </span>
              </div>
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Recommendation Explanations */}
              <div className="lg:col-span-5 space-y-6 pt-2">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading text-slate-900">
                    Our expert recommendation
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Choose from the best recommended Painting systems for your space.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                    This estimate includes
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B6BB5] mt-2 shrink-0" />
                      <span>
                        <strong className="text-slate-900">Product and labour cost:</strong> The calculator provides an estimated cost of materials and labour.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B6BB5] mt-2 shrink-0" />
                      <span>
                        <strong className="text-slate-900">Quantity required:</strong> The quantity may vary depending on substrate condition.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B6BB5] mt-2 shrink-0" />
                      <span>
                        <strong className="text-slate-900">Application process:</strong> The output includes a recommended painting process for optimal results.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Quick dots navigation on left */}
                <div className="pt-4 border-t border-slate-200 flex items-center gap-1.5 flex-wrap">
                  {solutions.map((sol, idx) => (
                    <button
                      key={sol.id}
                      type="button"
                      onClick={() => setActiveSolutionIndex(idx)}
                      title={sol.name}
                      className={`h-2 rounded-full transition-all ${
                        activeSolutionIndex === idx
                          ? "w-8 bg-[#5B6BB5]"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Stack of Cards with Arrows */}
              <div className="lg:col-span-7 flex flex-col items-center">
                {/* Arrow Controllers & Main Card Container */}
                <div className="relative w-full max-w-xl">
                  {/* Prev Button (Floating Left) */}
                  <button
                    type="button"
                    onClick={handlePrevSolution}
                    aria-label="Previous System"
                    className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xl flex items-center justify-center transition-all hover:scale-105 focus:outline-none"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                  </button>

                  {/* Next Button (Floating Right) */}
                  <button
                    type="button"
                    onClick={handleNextSolution}
                    aria-label="Next System"
                    className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xl flex items-center justify-center transition-all hover:scale-105 focus:outline-none"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                  </button>

                  {/* 3D STACKED CARD EFFECT (Cards stacked underneath) */}
                  <div className="relative">
                    {/* Layer 2 (Deepest) */}
                    <div className="absolute -bottom-3 inset-x-6 h-10 bg-slate-200/60 rounded-3xl -z-20 blur-[0.5px] shadow-sm" />
                    {/* Layer 1 (Middle) */}
                    <div className="absolute -bottom-1.5 inset-x-3 h-10 bg-slate-300/60 rounded-3xl -z-10 shadow-sm" />

                    {/* MAIN ACTIVE RECOMMENDATION CARD (Matching image.png & image copy.png) */}
                    <div className="relative bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
                      {/* Top Header Label in Amber / Gold */}
                      <div className="text-center">
                        <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-amber-600 font-heading">
                          Best Recommended System
                        </span>
                      </div>

                      {/* Main Product Overview Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pb-2">
                        {/* Main Product Image */}
                        <div className="sm:col-span-5 flex justify-center">
                          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-white border border-slate-100 p-2 flex items-center justify-center shadow-2xs">
                            <img
                              src={currentSolution.mainImage}
                              alt={currentSolution.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Title, Pricing & Per SQFT Metrics */}
                        <div className="sm:col-span-7 space-y-2">
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight">
                            {currentSolution.name}
                          </h3>

                          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">
                                Total Estimated cost for {parsedArea} sqft
                              </span>
                              <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                                Rs.{currentSolution.totalEstimatedCost.toFixed(2)}{" "}
                                <span className="text-red-500">*</span>
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">
                                Total area for painting ( {parsedArea} x {currentSolution.multiplier} )
                              </span>
                              <span className="font-bold text-slate-800">
                                {currentSolution.totalPaintingArea} sqft
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">Per SQFT cost</span>
                              <span className="font-bold text-slate-900">
                                Rs.{currentSolution.costPerSqFtML.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="pt-1">
                            <Link
                              href={currentSolution.productLink || "/products"}
                              className="text-xs font-bold text-[#DF3F6F] hover:underline"
                            >
                              View product
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Products in the system & quantity Section */}
                      <div className="space-y-3 pt-2 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-900">
                          Products in the system &amp; quantity
                        </h4>

                        {/* Sub-cards Grid (Primer, Putty, Emulsion) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentSolution.steps.map((step) => (
                            <div
                              key={step.stepNumber}
                              className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2 text-center"
                            >
                              <div className="space-y-1.5">
                                <span className="text-[11px] font-bold text-slate-800 line-clamp-1 block">
                                  {step.productName}
                                </span>
                                <div className="w-16 h-16 mx-auto rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center">
                                  <img
                                    src={step.productImage}
                                    alt={step.productName}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                              </div>

                              <div>
                                <span className="text-xs font-black text-slate-900 block">
                                  {step.materialRequired.toFixed(1)} {step.unit}
                                </span>
                                <span className="text-[10px] text-slate-500 block">Required</span>

                                <div className="mt-1.5">
                                  <Link
                                    href={step.productLink || "/products"}
                                    className="text-[11px] font-bold text-[#DF3F6F] hover:underline"
                                  >
                                    View product
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Disclaimer Footnote */}
                      <p className="text-[11px] text-slate-500 leading-relaxed italic pt-1">
                        <span className="text-red-500">*</span> The total estimated product cost may vary based on the chosen shade and finish. Labour cost may vary depending on your location
                      </p>

                      {/* Bottom Download PDF & Actions Divider */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-slate-600 text-center sm:text-left max-w-xs">
                          Download the PDF to get more details about the painting process &amp; products.
                        </p>

                        <button
                          type="button"
                          onClick={handlePrint}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-xs font-bold transition-colors"
                        >
                          <span>Download PDF</span>
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 4. EXPERIENCE MORE THAN COLOUR SECTION */}
      <ExperienceMoreThanColour />

      {/* 5. PAINTING SERVICE QUERY BANNER */}
      <PaintingServiceQueryBanner sourceContext="paint_calculator_page" />

      {/* 6. SUPPORT & CONNECTIVITY PILL TABS */}
      <ToolsSupportTabs toolType="calculator" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
