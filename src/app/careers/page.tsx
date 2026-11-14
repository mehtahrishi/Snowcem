"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Image from "next/image";
import { CULTURE_PILLARS } from "@/data/careersData";
import { CheckCircle2, Eye, EyeOff, FileText, Send, Upload } from "lucide-react";

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

function renderJobMarkdown(md: string) {
  return md.split("\n").map((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return <div key={idx} className="h-2" />;
    if (line.startsWith("## ")) {
      return (
        <h4 key={idx} className="mt-4 mb-2 text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
          {line.slice(3)}
        </h4>
      );
    }
    if (line.startsWith("- ") || line.startsWith("• ")) {
      const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1");
      return (
        <li key={idx} className="ml-4 list-disc text-xs sm:text-sm leading-relaxed text-[#EDE4D8]/85">
          {text}
        </li>
      );
    }
    return (
      <p key={idx} className="text-xs sm:text-sm leading-relaxed text-[#EDE4D8]/85">
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
      </p>
    );
  });
}

const PILLAR_ICONS: Record<string, string> = {
  TrendingUp: "/careers/brain.png",
  Users: "/careers/hand.png",
  Award: "/careers/thumbsup.png",
};

const sectionTitle =
  "text-center text-[1.6rem] uppercase leading-tight tracking-[0.06em] text-[#EDE4D8] sm:text-[2rem]";

const inputClasses =
  "w-full border border-[#061C18]/25 bg-[#F5ECDA]/75 px-4 py-3 text-sm text-[#061C18] placeholder:text-[#3E3428]/60 outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

const labelClasses = "mb-2 block font-label text-[10px] text-[#4A3F33]";

export default function CareersPage() {
  const [jobsList, setJobsList] = useState<DbJob[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    position: "",
    about: "",
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
            <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[#D4AF37]/30 bg-[#123B34] px-6 py-10 text-center shadow-xl sm:px-12">
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
            <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl border-l-[3px] border-[#D4AF37] bg-[#061C18] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
              <ul className="flex flex-col gap-[3px]">
                {jobsList.map((job, index) => {
                  const isOpen = expandedJobId === job.id;
                  const meta = [
                    { label: "Location", value: job.location },
                    { label: "Department", value: job.department },
                    { label: "Experience", value: job.experience },
                    { label: "CTC", value: job.ctc },
                  ].filter((m) => m.value);
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
                        <button
                          type="button"
                          onClick={() => setExpandedJobId(isOpen ? null : job.id)}
                          aria-expanded={isOpen}
                          aria-controls={`job-details-${job.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] transition hover:text-[#F3E5AB]"
                        >
                          {isOpen ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          <span>{isOpen ? "Hide Details" : "View Details"}</span>
                        </button>
                        <a
                          href="#apply-form"
                          onClick={() => setFormData((prev) => ({ ...prev, position: job.title }))}
                          className="shrink-0 rounded-md bg-[#EDE4D8] px-3.5 py-1.5 text-xs font-bold text-[#061C18] shadow-sm transition hover:bg-[#D4AF37]"
                        >
                          Apply Now
                        </a>
                      </div>

                      {isOpen && (
                        <div
                          id={`job-details-${job.id}`}
                          className="mt-4 space-y-1 border-t border-white/10 pt-4"
                        >
                          {job.summary && (
                            <p className="mb-2 text-sm leading-relaxed text-[#C2B69D]">{job.summary}</p>
                          )}
                          {renderJobMarkdown(job.contentMd)}
                        </div>
                      )}
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

          <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-10 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-12 md:items-center md:gap-12 lg:px-14">
            <div className="md:col-span-4">
              <p className="font-label text-[11px] text-[#8A6A12]">CAREERS AT SNOWCEM</p>
              <h2 className="mt-3 text-[2rem] leading-[1.15] text-[#061C18] sm:text-[2.4rem]">
                No Current
                <br />
                Openings
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#3E3428]">
                There are no open positions right now. Share your resume with us, and our HR team
                will reach out when a suitable opportunity becomes available.
              </p>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="career-name" className={labelClasses}>
                    Name
                  </label>
                  <input
                    id="career-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="career-email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    id="career-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="career-mobile" className={labelClasses}>
                    Mobile*
                  </label>
                  <input
                    id="career-mobile"
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="career-position" className={labelClasses}>
                    Position applying for
                  </label>
                  <input
                    id="career-position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Area Sales Manager, Marketing, R&D"
                    className={inputClasses}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="career-about" className={labelClasses}>
                    Tell us about yourself
                  </label>
                  <textarea
                    id="career-about"
                    rows={4}
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    placeholder="Share a brief overview of your background, key achievements, and career goals..."
                    className={inputClasses}
                  />
                </div>

                <div className="border border-dashed border-[#061C18]/40 p-5 sm:col-span-2">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx,.rtf,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex cursor-pointer items-center justify-center gap-3"
                  >
                    <Upload className="h-5 w-5 text-[#8A6A12]" />
                    <span className="text-sm font-bold text-[#061C18]">
                      {resumeFile ? (
                        <span className="flex items-center gap-1.5 text-[#8A6A12]">
                          <FileText className="h-4 w-4" />
                          {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                        </span>
                      ) : (
                        <span>Resume Upload</span>
                      )}
                    </span>
                  </label>
                  <p className="mt-2 text-center text-xs text-[#3E3428]/80">
                    File size must be less than 2MB. Allowed file types are pdf, doc, docx, rtf,
                    txt
                  </p>

                  {fileError && (
                    <p role="alert" className="mt-2 text-center text-xs font-bold text-[#8A2F2B]">
                      {fileError}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-9 py-3.5 text-[0.8125rem] font-bold text-[#061C18] transition-all hover:brightness-110 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Submitting Application..." : "Join us"}</span>
                  </button>
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
