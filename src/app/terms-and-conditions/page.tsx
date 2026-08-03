"use client";

import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import { FileText, ShieldAlert, Scale, CheckCircle2, HelpCircle } from "lucide-react";

export default function TermsAndConditionsPage() {
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
        {/* HERO HEADER */}
        <section className="bg-white py-12 md:py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
                Terms &amp;{" "}
                <span className="bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent">
                  Conditions
                </span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Snowcem Paints India Ltd. (Saurashtra Cement Limited &ndash; Paint Division, The Mehta Group)
              </p>
            </div>
          </div>
        </section>

        {/* TERMS CONTENT CONTAINER */}
        <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-10 text-slate-700 leading-relaxed font-normal">
            
            {/* 1. ACCEPTANCE OF TERMS */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-snowcem-orange" />
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base">
                Welcome to Snowcem Paints. By accessing or using our website, digital paint tools, dealer locator, or submitting inquiries, you agree to comply with and be bound by these Terms and Conditions.
              </p>
              <p className="text-sm sm:text-base">
                If you do not agree with any portion of these terms, please discontinue accessing or using our services. Snowcem Paints is a division of Saurashtra Cement Limited, an enterprise owned by The Mehta Group.
              </p>
            </div>

            {/* 2. INTELLECTUAL PROPERTY */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-snowcem-navy" />
                2. Intellectual Property Rights
              </h2>
              <p className="text-sm sm:text-base">
                All content published on this website—including but not limited to brand names (Snowcem, Sandtex Matt, Unigloss, All Guard, Waterproof Plus), logos, design graphics, shade cards, images, copy, software, and tools—is the exclusive intellectual property of Saurashtra Cement Limited / The Mehta Group and is protected under Indian and international copyright and trademark laws.
              </p>
              <p className="text-sm sm:text-base">
                Unauthorized reproduction, modification, distribution, or commercial exploitation of any site content without prior written permission is strictly prohibited.
              </p>
            </div>

            {/* 3. PRODUCT INFORMATION & SHADE DISCLAIMER */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                3. Product Specifications & Color Shade Disclaimer
              </h2>
              <p className="text-sm sm:text-base">
                While we strive for maximum accuracy, digital color swatches displayed on screens may vary slightly from actual physical paint finishes due to monitor display calibrations, lighting conditions, and surface textures.
              </p>
              <p className="text-sm sm:text-base">
                We strongly recommend reviewing physical Snowcem shade cards or obtaining sample pots from an authorized dealer prior to committing to full surface application.
              </p>
            </div>

            {/* 4. PAINT CALCULATOR ESTIMATES */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                4. Paint Budget & Coverage Calculators
              </h2>
              <p className="text-sm sm:text-base">
                Our online Paint Budget Calculator and coverage estimators provide approximate guidelines based on standard architectural metrics. Actual paint consumption may vary depending on surface porosity, surface preparation, coat thickness, and application method.
              </p>
            </div>

            {/* 5. LIMITATION OF LIABILITY */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                5. Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base">
                Snowcem Paints and its parent company Saurashtra Cement Limited shall not be liable for any indirect, incidental, consequential, or punitive damages resulting from your use of, or inability to use, our website or reliance on information provided herein.
              </p>
            </div>

            {/* 6. GOVERNING LAW & JURISDICTION */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                6. Governing Law & Jurisdiction
              </h2>
              <p className="text-sm sm:text-base">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes or claims arising out of or related to website usage shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.
              </p>
            </div>

            {/* 7. CONTACT US */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-snowcem-orange" />
                7. Questions & Contact Information
              </h2>
              <p className="text-sm sm:text-base">
                For questions or clarifications regarding these Terms & Conditions, please reach out to our legal department:
              </p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-1 text-sm">
                <p className="font-bold text-slate-900">Snowcem Paints India Ltd. (Legal Desk)</p>
                <p className="text-slate-600">Saurashtra Cement Limited &ndash; Paint Division, The Mehta Group</p>
                <p className="text-slate-600">Mumbai Head Office, Maharashtra, India</p>
                <p className="text-snowcem-navy font-semibold">Email: legal@snowcempaints.com</p>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
