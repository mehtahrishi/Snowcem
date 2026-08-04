"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ChatbotWidget from "@/components/ChatbotWidget";
import CookieConsent from "@/components/CookieConsent";
import { JOB_OPENINGS, CULTURE_PILLARS, JobOpening } from "@/data/careersData";
import {
  Briefcase,
  MapPin,
  Clock,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Upload,
  CheckCircle2,
  X,
  FileText,
  Send,
  Sparkles,
  Target,
  Eye,
  ShieldCheck,
} from "lucide-react";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  
  // Application Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    position: "",
    about: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle File Select with size & extension validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSizeBytes = 2 * 1024 * 1024; // 2MB
      const allowedExts = ["pdf", "doc", "docx", "rtf", "txt"];
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "";

      if (!allowedExts.includes(fileExt)) {
        setFileError("Invalid file type. Allowed types are: pdf, doc, docx, rtf, txt");
        setResumeFile(null);
        return;
      }

      if (file.size > maxSizeBytes) {
        setFileError("File size exceeds 2MB limit. Please upload a smaller file.");
        setResumeFile(null);
        return;
      }

      setResumeFile(file);
    }
  };

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(null);
    setFormData((prev) => ({ ...prev, position: job.title }));
    const formEl = document.getElementById("apply-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
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
      setFormData({ name: "", email: "", mobile: "", position: "", about: "" });
      setResumeFile(null);
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
        {/* HERO BANNER & VISION / MISSION SECTION */}
        <section className="bg-white py-12 md:py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2 mb-4">
                Build Your Legacy at Snowcem Paints
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Join India&apos;s pioneer waterproof paint brand. We empower passionate individuals to innovate, lead, and shape the future of eco-friendly architectural coatings.
              </p>
            </div>

            {/* VISION & MISSION DUAL CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* OUR VISION CARD */}
              <div className="bg-slate-50/90 rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-xs hover:border-snowcem-orange/80 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-snowcem-orange flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
                    Our Vision
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    To be the <strong className="text-slate-800">Change Leader & Most Trusted Brand</strong> in the Paint Industry, while continuing to market eco-friendly products.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Eco-Friendly Leadership Since 1959</span>
                </div>
              </div>

              {/* OUR MISSION CARD */}
              <div className="bg-slate-50/90 rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-xs hover:border-snowcem-navy/80 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 text-snowcem-navy flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
                    Our Mission
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    Driven by <strong className="text-slate-800">Continuous Innovation</strong>, supported by <strong className="text-slate-800">Consistent Quality</strong>, focused on <strong className="text-slate-800">Customer Satisfaction</strong>, strengthened by a <strong className="text-slate-800">Robust Backend</strong>, and powered by a <strong className="text-slate-800">Strong Core Team</strong>.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Powered by People & Technology</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT AWAITS YOU AT SNOWCEM (CULTURE & PERKS) */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Awaits You at Snowcem
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
              We foster an environment where talent thrives, achievements are celebrated, and ideas transform into impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CULTURE_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-snowcem-orange transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-snowcem-orange mb-4">
                  {pillar.iconName === "TrendingUp" && <TrendingUp className="w-7 h-7" />}
                  {pillar.iconName === "Users" && <Users className="w-7 h-7" />}
                  {pillar.iconName === "Award" && <Award className="w-7 h-7" />}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CURRENT JOB OPENINGS SECTION */}
        <section className="py-14 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Current Job Openings
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base font-light">
                Explore open positions across sales leadership, regional management, and territory development.
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {JOB_OPENINGS.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-snowcem-orange transition-all duration-300 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {job.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase bg-indigo-50 text-snowcem-navy border border-indigo-200 px-2.5 py-0.5 rounded-full">
                        {job.department}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-snowcem-orange" />
                        Location: <strong>{job.location}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-snowcem-navy" />
                        Experience: <strong>{job.experience}</strong>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center justify-center gap-2 bg-snowcem-navy hover:bg-slate-800 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-xs shrink-0"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIDN'T FIND THE RIGHT ROLE? (RESUME SUBMISSION FORM) */}
        <section id="apply-form" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 md:p-12 max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                Didn&apos;t Find the Right Role?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                We are always looking for talented individuals to join our team. Share your resume with us, and our HR team will reach out when a suitable opportunity becomes available.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Mobile */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mobile*
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                  />
                </div>

                {/* Position applying for */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Position applying for
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Area Sales Manager, Marketing, R&D"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Tell us about yourself */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tell us about yourself
                </label>
                <textarea
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="Share a brief overview of your background, key achievements, and career goals..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all"
                />
              </div>

              {/* Upload Resume Box */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-snowcem-orange transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx,.rtf,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-snowcem-orange flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {resumeFile ? (
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </span>
                    ) : (
                      <span>Upload Resume</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    File size must be less than 2MB. Allowed file types are pdf, doc, docx, rtf, txt
                  </p>
                </label>

                {fileError && (
                  <p className="text-xs text-rose-600 font-bold mt-2">{fileError}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-snowcem-orange hover:bg-orange-600 text-white font-bold text-sm px-10 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Join us</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* JOB DETAILS MODAL */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-100">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-snowcem-orange bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                  {selectedJob.department}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-3 mb-2">
                  {selectedJob.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-snowcem-orange" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-snowcem-navy" />
                    {selectedJob.experience}
                  </span>
                </div>
              </div>

              <div className="space-y-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-5">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">
                    Role Overview
                  </h4>
                  <p>{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">
                    Key Responsibilities
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">
                    Candidate Profile
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApplyClick(selectedJob)}
                  className="px-6 py-2.5 rounded-xl bg-snowcem-orange text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-md flex items-center gap-1.5"
                >
                  <span>Apply for this Role</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBMISSION SUCCESS MODAL */}
        {submitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Application Received!</h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Thank you for applying to Snowcem Paints. Our HR talent team will review your application and reach out soon.
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
