"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Image from "next/image";
import { JOB_OPENINGS } from "@/data/careersData";
import { CheckCircle2, FileText, Send, Upload } from "lucide-react";

const inputClasses =
  "w-full border border-[#061C18]/25 bg-[#061C18] px-4 py-3 text-sm text-[#EDE4D8] placeholder:text-[#C2B69D]/60 outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

const labelClasses = "mb-2 block font-label text-[10px] text-[#4A3F33]";

export default function JobOpeningPage() {
  const params = useParams<{ jobId: string }>();
  const job = JOB_OPENINGS.find((item) => item.id === params.jobId);

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

  if (!job) notFound();

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
    if (!resumeFile) {
      setFileError("Resume is required.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", location: "" });
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
        {/* Opening header band */}
        <section className="w-full bg-[#0A2621] py-14 text-center sm:py-16">
          <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-14">
            <h1 className="text-[2rem] leading-tight text-[#EDE4D8] sm:text-[2.8rem]">
              {job.title}
            </h1>

            <ul className="mt-6 flex flex-wrap justify-center list-none p-0">
              <li className="border-r border-[#D8C7B3]/40 px-4 text-xs text-[#C2B69D] sm:text-sm">
                Location: {job.location}
              </li>
              <li className="border-r border-[#D8C7B3]/40 px-4 text-xs text-[#C2B69D] sm:text-sm">
                Department: {job.department}
              </li>
              <li className="px-4 text-xs text-[#C2B69D] sm:text-sm">
                Experience: {job.experience}
              </li>
            </ul>
          </div>
        </section>

        {/* Job details */}
        <section className="w-full py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-14">
            <p className="text-[0.9375rem] leading-[1.9] text-[#C2B69D]">{job.description}</p>

            <h2 className="mt-10 text-[1.5rem] leading-tight text-[#EDE4D8] sm:text-[1.75rem]">
              Job Description:
            </h2>
            <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[0.9375rem] leading-[1.8] text-[#C2B69D]">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-12 text-[1.5rem] leading-tight text-[#EDE4D8] sm:text-[1.75rem]">
              Position Requirement:
            </h2>
            <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[0.9375rem] leading-[1.8] text-[#C2B69D]">
              {job.requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Application form over search.png */}
        <section className="relative w-full overflow-hidden">
          <Image
            src="/careers/search.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5ECDA]/85 via-[#F5ECDA]/45 to-[#F5ECDA]/25" />

          <div className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
            <h2 className="text-center text-[1.8rem] leading-tight text-[#061C18] sm:text-[2.2rem]">
              Application Form
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="hidden md:block" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="apply-name" className={labelClasses}>
                    Name *
                  </label>
                  <input
                    id="apply-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="apply-email" className={labelClasses}>
                    Email *
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your@email.com"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="apply-phone" className={labelClasses}>
                    Phone *
                  </label>
                  <input
                    id="apply-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="apply-location" className={labelClasses}>
                    Location *
                  </label>
                  <input
                    id="apply-location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Your City, Area"
                    className={inputClasses}
                  />
                </div>

                <div className="border border-dashed border-[#061C18]/40 p-5">
                  <input
                    type="file"
                    id="apply-resume"
                    accept=".pdf,.doc,.docx,.rtf,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="apply-resume"
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
                        <span>Resume *</span>
                      )}
                    </span>
                  </label>
                  <p className="mt-2 text-center text-xs text-[#3E3428]/80">
                    Upload resume (PDF or Word document, max 2MB)
                  </p>

                  {fileError && (
                    <p role="alert" className="mt-2 text-center text-xs font-bold text-[#8A2F2B]">
                      {fileError}
                    </p>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full max-w-[400px] items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-10 py-3.5 text-[0.8125rem] font-bold text-[#061C18] transition-all hover:brightness-110 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Submitting Application..." : "Submit Application"}</span>
                  </button>
                </div>

                <p className="text-center text-xs text-[#3E3428]/80">
                  Your information is kept confidential and will only be used for this position.
                </p>
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
                Thank you for applying to the {job.title} role. Our HR talent team will review your
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
