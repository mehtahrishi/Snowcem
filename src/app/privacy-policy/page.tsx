"use client";

import React from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import { ShieldCheck, Lock, Eye, FileText, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                Privacy{" "}
                <span className="bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Snowcem Paints India Ltd. (Saurashtra Cement Limited &ndash; Paint Division, The Mehta Group)
              </p>
            </div>
          </div>
        </section>

        {/* POLICY CONTENT CONTAINER */}
        <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-10 text-slate-700 leading-relaxed font-normal">
            
            {/* 1. INTRODUCTION */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-snowcem-orange" />
                1. Introduction & Commitment
              </h2>
              <p className="text-sm sm:text-base">
                Snowcem Paints (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a division of Saurashtra Cement Limited under The Mehta Group, is committed to safeguarding the privacy and personal data of our website visitors, customers, dealers, and trade partners.
              </p>
              <p className="text-sm sm:text-base">
                This Privacy Policy describes how we collect, use, store, and protect your personal information when you visit our website, submit contact or dealer inquiries, use our paint budget calculators, or interact with our digital services.
              </p>
            </div>

            {/* 2. INFORMATION WE COLLECT */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-snowcem-navy" />
                2. Information We Collect
              </h2>
              <p className="text-sm sm:text-base">
                We collect personal information that you voluntarily provide to us when expressing an interest in our products or services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700">
                <li><strong className="text-slate-900">Personal Identifiers:</strong> Name, email address, phone number, physical address, and pin code.</li>
                <li><strong className="text-slate-900">Inquiry & Business Data:</strong> Dealer partnership requests, store locations, customer support queries, and painter application forms.</li>
                <li><strong className="text-slate-900">Usage & Device Data:</strong> IP addresses, browser types, device operating systems, pages visited, and interaction durations via standard cookies and web analytics.</li>
              </ul>
            </div>

            {/* 3. HOW WE USE YOUR INFORMATION */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                3. How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base">
                We utilize collected information solely for legitimate business purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700">
                <li>To process dealer locator searches and connect you with nearby authorized Snowcem stockists.</li>
                <li>To respond to customer support tickets, sample requests, and technical paint inquiries.</li>
                <li>To calculate paint requirements and estimates submitted through our online tools.</li>
                <li>To evaluate business partnership applications for new dealership opportunities across India.</li>
                <li>To maintain compliance with applicable privacy laws and corporate governance standards.</li>
              </ul>
            </div>

            {/* 4. DATA PROTECTION & SECURITY */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                4. Data Security & Retention
              </h2>
              <p className="text-sm sm:text-base">
                We implement robust technical and organizational security measures to protect your personal data against unauthorized access, loss, alteration, or disclosure. All data transmissions are encrypted using standard Secure Sockets Layer (SSL) technology. We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations.
              </p>
            </div>

            {/* 5. THIRD-PARTY SHARING */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                5. Third-Party Data Sharing
              </h2>
              <p className="text-sm sm:text-base">
                Snowcem Paints does not sell, rent, or trade your personal information to third parties. We may share data only with trusted service providers who assist us in operating our website, conducting business operations, or serving our customers, provided those parties agree to keep this information strictly confidential.
              </p>
            </div>

            {/* 6. CONTACT & DATA RIGHTS */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-snowcem-orange" />
                6. Contact Privacy Desk
              </h2>
              <p className="text-sm sm:text-base">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal data rights, please contact our Privacy Compliance Officer at:
              </p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-1 text-sm">
                <p className="font-bold text-slate-900">Snowcem Paints India Ltd. (Corporate Privacy Desk)</p>
                <p className="text-slate-600">Saurashtra Cement Limited &ndash; Paint Division, The Mehta Group</p>
                <p className="text-slate-600">Mumbai Head Office, Maharashtra, India</p>
                <p className="text-snowcem-navy font-semibold">Email: privacy@snowcempaints.com</p>
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
