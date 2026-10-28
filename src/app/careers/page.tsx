"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Image from "next/image";
import Link from "next/link";
import { JOB_OPENINGS, CULTURE_PILLARS, JobOpening } from "@/data/careersData";
import { CheckCircle2, FileText, Send, Upload } from "lucide-react";

const PILLAR_ICONS: Record<string, string> = {
  TrendingUp: "/careers/brain.png",
  Users: "/careers/hand.png",
  Award: "/careers/thumbsup.png",
};

const sectionTitle =
  "text-center text-[1.6rem] uppercase leading-tight tracking-[0.06em] text-[#EDE4D8] sm:text-[2rem]";

const inputClasses =
  "w-full border border-[#061C18]/25 bg-[#061C18] px-4 py-3 text-sm text-[#EDE4D8] placeholder:text-[#C2B69D]/60 outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

const labelClasses = "mb-2 block font-label text-[10px] text-[#4A3F33]";

export default function CareersPage() {
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

  const handleApplyClick = (job: JobOpening) => {
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
                width={56}
                height={56}
                className="mx-auto h-14 w-14 object-contain"
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
                width={56}
                height={56}
                className="mx-auto h-14 w-14 object-contain"
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
                  width={59}
                  height={59}
                  className="mx-auto h-[59px] w-[59px] object-contain"
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
        <section className="w-full pb-20 pt-16 sm:pt-20">
          <h2 className={sectionTitle}>Current Job Openings</h2>

          <div className="mx-auto mt-12 flex w-[92%] max-w-[900px] flex-col gap-2.5 border-l-[3px] border-[#D4AF37]">
            {JOB_OPENINGS.map((job) => (
              <div key={job.id} className="bg-[#0A2621] p-5 sm:p-6">
                <h3 className="text-[1.375rem] leading-snug text-[#EDE4D8]">{job.title}</h3>

                <ul className="mt-3 flex flex-wrap list-none gap-x-8 gap-y-1 p-0 text-xs font-bold text-[#C2B69D]">
                  <li>Location: {job.location}</li>
                  <li>Experience: {job.experience}</li>
                </ul>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/careers/${job.id}`}
                    className="flex items-center gap-2.5 text-[0.8125rem] font-bold text-[#D4AF37] transition-colors hover:text-[#F3E5AB]"
                  >
                    <Image
                      src="/careers/eye.png"
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                    />
                    View Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleApplyClick(job)}
                    className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-5 py-2.5 text-xs font-bold text-[#061C18] transition-all hover:brightness-110"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5ECDA]/85 via-[#F5ECDA]/45 to-[#F5ECDA]/25" />

          <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-10 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-12 md:gap-8 lg:px-14">
            <div className="md:col-span-4">
              <h2 className="text-[2rem] leading-[1.15] text-[#061C18] sm:text-[2.4rem]">
                Didn&apos;t Find
                <br />
                the Right Role?
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#3E3428]">
                We are always looking for talented individuals to join our team. Share your resume
                with us, and our HR team will reach out when a suitable opportunity becomes
                available.
              </p>
            </div>

            <div className="hidden md:col-span-2 md:block" />

            <div className="md:col-span-6">
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
