"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Image from "next/image";
import Link from "next/link";
import { CULTURE_PILLARS } from "@/data/careersData";
import { CheckCircle2, Eye, FileText, Send, Upload } from "lucide-react";

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

const PILLAR_ICONS: Record<string, string> = {
  TrendingUp: "/careers/brain.png",
  Users: "/careers/hand.png",
  Award: "/careers/thumbsup.png",
};

const sectionTitle =
  "text-center text-[1.6rem] uppercase leading-tight tracking-[0.06em] text-[#EDE4D8] sm:text-[2rem]";

export default function CareersPage() {
  const [jobsList, setJobsList] = useState<DbJob[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "",
  });

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.jobs)) {
          setJobsList(d.jobs);
        }
      })
      .catch(() => {});
  }, []);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    setFileError(null);
    if (!formData.phone.trim()) {
      setFileError("Please enter your phone number.");
      return;
    }
    if (!resumeFile) {
      setFileError("Resume upload is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("applicationType", "general");
      payload.append("fullName", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("areaOfInterest", formData.areaOfInterest.trim());
      payload.append("resume", resumeFile);

      const res = await fetch("/api/job-applications", {
        method: "POST",
        body: payload,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFileError(json?.error || "Failed to submit application. Please try again.");
        return;
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", areaOfInterest: "" });
      setResumeFile(null);
    } catch (err) {
      console.error("General career application error:", err);
      setFileError("Failed to submit application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {/* Banner */}
        <section className="w-full">
          <div className="relative aspect-[2.93/1] w-full">
            <Image
              src="/careers/image.png"
              alt="Build your career with Snowcem"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="w-full py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 px-6 sm:px-10 md:grid-cols-12 md:gap-8 lg:px-14">
            <div className="text-center md:col-span-5">
              <Image
                src="/careers/eye.png"
                alt=""
                width={80}
                height={80}
                className="mx-auto h-20 w-20 object-contain"
              />
              <h2 className="mt-4 text-[1.3rem] uppercase tracking-[0.08em] text-[#EDE4D8] sm:text-[1.45rem]">
                Our Vision
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
                To be the{" "}
                <span className="text-[#EDE4D8]">Change Leader &amp; Most Trusted Brand</span> in
                the Paint Industry, while continuing to market eco-friendly products.
              </p>
            </div>

            <div className="hidden md:col-span-2 md:block" />

            <div className="text-center md:col-span-5">
              <Image
                src="/careers/mission.png"
                alt=""
                width={80}
                height={80}
                className="mx-auto h-20 w-20 object-contain"
              />
              <h2 className="mt-4 text-[1.3rem] uppercase tracking-[0.08em] text-[#EDE4D8] sm:text-[1.45rem]">
                Our Mission
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
                Driven by <span className="text-[#EDE4D8]">Continuous Innovation</span>, supported
                by <span className="text-[#EDE4D8]">Consistent Quality</span>, focused on{" "}
                <span className="text-[#EDE4D8]">Customer Satisfaction</span>, strengthened by a{" "}
                <span className="text-[#EDE4D8]">Robust Backend</span>, and powered by a{" "}
                <span className="text-[#EDE4D8]">Strong Core Team</span>.
              </p>
            </div>
          </div>
        </section>

        {/* What awaits you at Snowcem */}
        <section className="w-full bg-[#0A2621] py-14 sm:py-16">
          <h2 className={sectionTitle}>What awaits you at Snowcem</h2>

          <div className="mx-auto mt-12 grid w-full max-w-[1180px] grid-cols-1 gap-12 px-6 sm:grid-cols-3 sm:gap-8 sm:px-10 lg:px-14">
            {CULTURE_PILLARS.map((pillar) => (
              <div key={pillar.id} className="text-center">
                <Image
                  src={PILLAR_ICONS[pillar.iconName]}
                  alt=""
                  width={80}
                  height={80}
                  className="mx-auto h-24 w-24 object-contain"
                />
                <p className="mt-5 text-[1.05rem] font-bold leading-snug text-[#EDE4D8]">
                  {pillar.title}
                  <br />
                  {pillar.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Job Openings */}
        <section className="w-full bg-[#0A2621] px-6 py-16 sm:px-10 sm:py-20">
          <h2 className={sectionTitle}>Current Job Openings</h2>

          {jobsList.length === 0 ? (
            <div className="mx-auto mt-10 w-full max-w-[1180px] rounded-3xl border border-[#D4AF37]/30 bg-[#123B34] px-6 py-10 text-center shadow-xl sm:px-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15 text-2xl text-[#D4AF37]">
                &#128203;
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#EDE4D8]">No current openings</h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#C2B69D]">
                We do not have any open positions at the moment. You can still share your resume
                below, and our team will contact you when a suitable opportunity becomes available.
              </p>
            </div>
          ) : (
            <div className="mx-auto mt-10 w-full max-w-[1180px] overflow-hidden rounded-xl border-l-[3px] border-[#D4AF37] bg-[#061C18] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
              <ul className="flex flex-col gap-[3px]">
                {jobsList.map((job, index) => {
                  const meta = [
                    { label: "Location", value: job.location },
                    { label: "Department", value: job.department },
                    { label: "Experience", value: job.experience },
                    { label: "CTC", value: job.ctc },
                  ].filter((m) => m.value);
                  const jobUrl = `/careers/${job.slug || job.id}`;
                  return (
                    <li
                      key={job.id}
                      className={`px-5 py-4 sm:px-6 sm:py-5 transition-colors ${
                        index % 2 === 0 ? "bg-[#123B34]" : "bg-[#0F332D]"
                      } hover:bg-[#164840]`}
                    >
                      <h3 className="text-base font-bold leading-snug text-[#EDE4D8] sm:text-lg">
                        {job.title}
                      </h3>

                      {meta.length > 0 && (
                        <dl className="mt-1.5 flex flex-wrap gap-x-8 gap-y-1 text-xs text-[#C2B69D] sm:text-[13px]">
                          {meta.map((m) => (
                            <div key={m.label} className="flex gap-1">
                              <dt>{m.label}:</dt>
                              <dd className="text-[#EDE4D8]">{m.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      <div className="mt-3 flex items-center justify-between gap-4">
                        <Link
                          href={jobUrl}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] transition hover:text-[#F3E5AB]"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </Link>
                        <Link
                          href={`${jobUrl}#apply-form`}
                          className="shrink-0 rounded-md bg-[#EDE4D8] px-3.5 py-1.5 text-xs font-bold text-[#061C18] shadow-sm transition hover:bg-[#D4AF37]"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        {/* Didn't find the right role */}
        <section id="apply-form" className="relative w-full overflow-hidden">
          <Image
            src="/careers/search.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5ECDA]/95 via-[#F5ECDA]/80 to-[#F5ECDA]/55" />

          <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-12 md:items-center md:gap-10 lg:px-14">
            {/* Left: Content */}
            <div className="md:col-span-6 lg:col-span-5">
              <h2 className="font-heading text-3xl font-extrabold leading-[1.12] text-[#061C18] sm:text-4xl lg:text-[2.75rem]">
                Didn’t Find
                <br />
                the Right Role?
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#3E3428] max-w-md">
                We are always looking for talented individuals to join our team. Share your resume
                with us, and our HR team will reach out when a suitable opportunity becomes
                available.
              </p>
            </div>

            {/* Right: Clean Pill Form */}
            <div className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-full border border-[#061C18]/15 bg-white/95 px-6 py-3.5 text-sm text-[#061C18] placeholder:text-[#3E3428]/60 shadow-sm outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/25"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-full border border-[#061C18]/15 bg-white/95 px-6 py-3.5 text-sm text-[#061C18] placeholder:text-[#3E3428]/60 shadow-sm outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/25"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-full border border-[#061C18]/15 bg-white/95 px-6 py-3.5 text-sm text-[#061C18] placeholder:text-[#3E3428]/60 shadow-sm outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/25"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Area of Interest"
                    value={formData.areaOfInterest}
                    onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                    className="w-full rounded-full border border-[#061C18]/15 bg-white/95 px-6 py-3.5 text-sm text-[#061C18] placeholder:text-[#3E3428]/60 shadow-sm outline-none transition focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/25"
                  />
                </div>

                <div className="pt-1">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx,.rtf,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label
                      htmlFor="resume-upload"
                      className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#061C18]/20 bg-white/95 px-6 py-3.5 text-sm font-semibold text-[#061C18] shadow-sm hover:bg-white hover:border-[#D4AF37] transition cursor-pointer text-center truncate"
                      title={resumeFile ? resumeFile.name : "Resume Upload"}
                    >
                      <Upload className="h-4 w-4 text-[#8A6A12] shrink-0" />
                      <span className="truncate">
                        {resumeFile ? resumeFile.name : "Resume Upload *"}
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#061C18]/20 px-8 py-3.5 text-sm font-bold text-[#061C18] shadow-sm transition hover:bg-gradient-to-r hover:from-[#D4AF37] hover:via-[#F3E5AB] hover:to-[#C59B27] hover:border-transparent disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                    </button>
                  </div>

                  {fileError && (
                    <p role="alert" className="mt-2 text-center text-xs font-bold text-[#8A2F2B]">
                      {fileError}
                    </p>
                  )}
                  {resumeFile && (
                    <p className="mt-1.5 text-center text-xs text-[#3E3428]/80 font-mono">
                      Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Submission success modal */}
        {submitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061C18]/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md border border-[#D8C7B3]/25 bg-[#0A2621] p-8 text-center">
              <CheckCircle2 className="mx-auto h-9 w-9 text-[#D4AF37]" />
              <h3 className="mt-4 text-[1.5rem] leading-tight text-[#EDE4D8]">
                Application Received!
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#C2B69D]">
                Thank you for applying to Snowcem Paints. Our HR talent team will review your
                application and reach out soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="mt-6 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] py-3 text-xs font-bold text-[#061C18] transition-all hover:brightness-110"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
