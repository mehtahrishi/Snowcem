"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import { CheckCircle2, FileText, Send, Upload, Briefcase, MapPin, Clock } from "lucide-react";

const inputClasses =
  "w-full border border-[#061C18]/25 bg-[#061C18] px-4 py-3 text-sm text-[#EDE4D8] placeholder:text-[#C2B69D]/60 outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

const labelClasses = "mb-2 block font-label text-[10px] text-[#4A3F33]";

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

export default function JobOpeningPage() {
  const params = useParams<{ jobId: string }>();
  const [job, setJob] = useState<DbJob | null>(null);
  const [loading, setLoading] = useState(true);

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
        const res = await fetch(`/api/jobs?slug=${params.jobId}`);
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
    // Connect to inquiries lead pipeline
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
          message: `Application for ${job?.title} (${job?.department || "General"}). Resume attached locally: ${resumeFile.name}`,
          metadata: {
            source: "careers_application_form",
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
      <div className="min-h-screen bg-canvas font-sans flex items-center justify-center">
        <PaintLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas font-sans">
      <PaintLoader />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column: Job Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-[#061C18]/15 pb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                {job?.department || "Opportunities"}
              </span>
              <h1 className="mt-2 text-3xl font-extrabold text-[#061C18] sm:text-4xl">
                {job?.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#4A3F33]">
                {job?.location && (
                  <span className="flex items-center gap-1.5 bg-[#EDE4D8] px-3 py-1.5 rounded-lg border border-[#C2A99A]">
                    <MapPin className="h-4 w-4 text-[#061C18]" />
                    {job.location}
                  </span>
                )}
                {job?.experience && (
                  <span className="flex items-center gap-1.5 bg-[#EDE4D8] px-3 py-1.5 rounded-lg border border-[#C2A99A]">
                    <Briefcase className="h-4 w-4 text-[#061C18]" />
                    {job.experience}
                  </span>
                )}
                {job?.ctc && (
                  <span className="flex items-center gap-1.5 bg-[#EDE4D8] px-3 py-1.5 rounded-lg border border-[#C2A99A]">
                    <Clock className="h-4 w-4 text-[#061C18]" />
                    {job.ctc}
                  </span>
                )}
              </div>
            </div>

            {/* Markdown Specifications */}
            <div className="bg-[#EDE4D8] border border-[#C2A99A] p-6 sm:p-8 rounded-2xl space-y-4 text-xs sm:text-sm text-[#252220] leading-relaxed">
              {job?.summary && (
                <p className="font-semibold text-base text-[#061C18] mb-4">
                  {job.summary}
                </p>
              )}
              {job?.contentMd?.split("\n").map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={idx} className="h-2" />;
                if (trimmed.startsWith("## ")) {
                  return (
                    <h3
                      key={idx}
                      className="font-black text-sm uppercase tracking-wider text-[#061C18] mt-4 mb-2"
                    >
                      {trimmed.slice(3)}
                    </h3>
                  );
                }
                if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
                  return (
                    <li key={idx} className="ml-5 list-disc text-xs sm:text-sm text-[#4A3F33]">
                      {trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}
                    </li>
                  );
                }
                return (
                  <p key={idx} className="text-xs sm:text-sm text-[#4A3F33]">
                    {trimmed.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-[#061C18] p-6 sm:p-8 text-[#EDE4D8] border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold font-heading text-[#EDE4D8]">
                Apply for this Position
              </h3>
              <p className="mt-1 text-xs text-[#C2B69D]">
                Submit your profile directly to our recruitment team.
              </p>

              {submitSuccess ? (
                <div className="mt-8 rounded-xl bg-white/5 border border-[#D4AF37]/30 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#D4AF37]" />
                  <h4 className="mt-4 text-base font-bold text-[#EDE4D8]">
                    Application Submitted
                  </h4>
                  <p className="mt-2 text-xs text-[#C2B69D]">
                    Thank you for applying to Snowcem Paints. Our HR team will review your credentials and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className={labelClasses}>FULL NAME *</label>
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
                    <label className={labelClasses}>EMAIL ADDRESS *</label>
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
                    <label className={labelClasses}>PHONE NUMBER *</label>
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
                    <label className={labelClasses}>CURRENT LOCATION</label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>RESUME / CV (PDF, DOCX) *</label>
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
                        className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-[#C2B69D]/40 bg-[#041411] px-4 py-3 text-xs text-[#C2B69D] hover:border-[#D4AF37] hover:text-[#EDE4D8] transition-colors"
                      >
                        <Upload className="h-4 w-4" />
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
                    className="mt-6 flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] py-3.5 text-xs font-bold uppercase tracking-wider text-[#061C18] hover:brightness-110 disabled:opacity-50 transition-all shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Application</span>
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
