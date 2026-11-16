"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  Send,
  Sparkles,
  Upload,
} from "lucide-react";

interface DbJob {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  experience: string | null;
  ctc: string | null;
  summary: string | null;
  contentMd: string;
}

const inputClasses =
  "w-full rounded-xl border border-[#D8C5B3]/20 bg-[#061C18] px-4 py-3 text-sm text-[#EDE4D8] placeholder:text-[#C2B69D]/50 outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]";

const labelClasses = "mb-2 block font-label text-[11px] font-bold uppercase tracking-wider text-[#C2B69D]";

function renderJobContent(md: string) {
  if (!md) return null;

  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-3 space-y-2.5">
          {currentList.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[#EDE4D8]/90"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h4
          key={idx}
          className="mt-5 mb-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F3E5AB]"
        >
          {line.slice(4)}
        </h4>
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      const headingText = line.slice(3);
      elements.push(
        <div key={idx} className="mt-8 mb-3 first:mt-1 border-b border-[#D8C5B3]/10 pb-2.5">
          <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#D4AF37] flex items-center gap-2">
            <span className="h-2 w-2 rounded-xs bg-[#D4AF37]" />
            {headingText}
          </h3>
        </div>
      );
      return;
    }

    if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h2 key={idx} className="mt-6 mb-3 text-base sm:text-lg font-bold text-white">
          {line.slice(2)}
        </h2>
      );
      return;
    }

    if (line.startsWith("- ") || line.startsWith("* ") || line.startsWith("• ")) {
      const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1");
      currentList.push(text);
      return;
    }

    flushList();
    elements.push(
      <p key={idx} className="my-2.5 text-xs sm:text-sm leading-relaxed text-[#EDE4D8]/85">
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
      </p>
    );
  });

  flushList();
  return elements;
}

export default function JobOpeningPage() {
  const params = useParams<{ jobId: string }>();
  const [job, setJob] = useState<DbJob | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state starts clean with no prefilled values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function loadJob() {
      try {
        const res = await fetch(`/api/jobs?slug=${encodeURIComponent(params.jobId)}`);
        const data = await res.json();
        if (data?.job) {
          setJob(data.job);
        }
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setLoading(false);
      }
    }
    if (params.jobId) loadJob();
  }, [params.jobId]);

  if (!loading && !job) notFound();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSizeBytes = 2 * 1024 * 1024;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setFileError("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          city: formData.location,
          inquiryType: `Job Application: ${job?.title || "Career"}`,
          message: `Application for ${job?.title} (${job?.department || "General"}). Resume attached: ${resumeFile.name}`,
          metadata: {
            source: "careers_dedicated_role_page",
            jobId: params.jobId,
            jobTitle: job?.title,
            fileName: resumeFile.name,
            fileSize: resumeFile.size,
          },
        }),
      });
    } catch (err) {
      console.error("Job inquiry error:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061C18] font-sans flex items-center justify-center">
        <PaintLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061C18] text-[#EDE4D8] font-sans">
      <PaintLoader />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Openings</span>
          </Link>
        </div>

        {/* Hero Role Banner */}
        <div className="mb-10 rounded-2xl border border-[#D8C5B3]/15 bg-gradient-to-r from-[#0A2621] via-[#0F332D] to-[#0A2621] p-6 sm:p-10 shadow-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold text-[#D4AF37]">
              {job?.department || "Career Opportunity"}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl tracking-tight leading-tight">
            {job?.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3 text-xs">
            {job?.location && (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8C5B3]/15 bg-[#061C18]/60 px-3.5 py-2 font-medium text-[#EDE4D8]">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>{job.location}</span>
              </span>
            )}
            {job?.experience && (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8C5B3]/15 bg-[#061C18]/60 px-3.5 py-2 font-medium text-[#EDE4D8]">
                <Briefcase className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Experience: {job.experience}</span>
              </span>
            )}
            {job?.ctc && (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8C5B3]/15 bg-[#061C18]/60 px-3.5 py-2 font-medium text-[#EDE4D8]">
                <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Compensation: {job.ctc}</span>
              </span>
            )}
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column: Job Description & Specifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            {job?.summary && (
              <div className="rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#123B34] to-[#0A2621] p-6 sm:p-7 shadow-lg">
                <h3 className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Role Overview</span>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#EDE4D8]">
                  {job.summary}
                </p>
              </div>
            )}

            {/* Markdown Specifications Card */}
            <div className="rounded-2xl border border-[#D8C5B3]/15 bg-[#0A2621] p-6 sm:p-8 shadow-xl">
              {job?.contentMd ? (
                renderJobContent(job.contentMd)
              ) : (
                <p className="text-xs sm:text-sm text-[#C2B69D]">
                  No detailed job specifications provided for this role.
                </p>
              )}
            </div>

            {/* Equal Opportunity Note */}
            <div className="rounded-xl border border-[#D8C5B3]/10 bg-[#061C18] p-5 text-xs leading-relaxed text-[#C2B69D]/80">
              <span className="font-bold text-[#EDE4D8]">Equal Opportunity Employer:</span>{" "}
              Snowcem Paints fosters a culture of meritocracy, diversity, and mutual respect. We do
              not discriminate based on gender, race, religion, or background.
            </div>
          </div>

          {/* Right Column: Dedicated Application Form */}
          <div className="lg:col-span-1">
            <div
              id="apply-form"
              className="sticky top-28 rounded-2xl border border-[#D8C5B3]/15 bg-[#0A2621] p-6 sm:p-7 text-[#EDE4D8] shadow-2xl"
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                Apply for this Position
              </h3>
              <p className="mt-1 text-xs text-[#C2B69D]">
                Role: <span className="font-semibold text-[#D4AF37]">{job?.title}</span>
              </p>

              {submitSuccess ? (
                <div className="mt-8 rounded-xl border border-[#D4AF37]/30 bg-white/5 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#D4AF37]" />
                  <h4 className="mt-4 text-base font-bold text-[#EDE4D8]">
                    Application Submitted
                  </h4>
                  <p className="mt-2 text-xs text-[#C2B69D] leading-relaxed">
                    Thank you for applying to Snowcem Paints. Our recruitment team will review your
                    credentials and reach out shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setResumeFile(null);
                      setFormData({ name: "", email: "", phone: "", location: "" });
                    }}
                    className="mt-5 rounded-lg border border-[#D4AF37]/40 px-4 py-2 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/10 transition cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className={labelClasses}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Current Location</label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Resume / CV (PDF, DOCX) *</label>
                    <div className="relative">
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx,.rtf,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#C2B69D]/40 bg-[#061C18] px-4 py-3 text-xs text-[#C2B69D] hover:border-[#D4AF37] hover:text-[#EDE4D8] transition-colors"
                      >
                        <Upload className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                        <span className="truncate">
                          {resumeFile ? resumeFile.name : "Select File (Max 2MB)"}
                        </span>
                      </label>
                    </div>
                    {fileError && (
                      <p className="mt-1.5 text-[11px] text-red-400">{fileError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] py-3.5 text-xs font-bold uppercase tracking-wider text-[#061C18] hover:brightness-110 disabled:opacity-50 transition-all shadow-md cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
