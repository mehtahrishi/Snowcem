"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Headphones,
  Navigation,
  MessageCircle,
} from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    inquiryType: "Customer Support",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const corporateAddress =
    "3rd Floor, Agrima Business Centre, N. K. Mehta International House, 178, Backbay Reclamation, Babubhai Chinai Marg, Mumbai - 400 020. MAHARASHTRA";
  const embedMapUrl =
    "https://maps.google.com/maps?q=N.+K.+Mehta+International+House,+Backbay+Reclamation,+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const mapsDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=N.+K.+Mehta+International+House,+Backbay+Reclamation,+Mumbai";

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
      setFormData({
        name: "",
        email: "",
        mobile: "",
        inquiryType: "Customer Support",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#061C18] text-[#D8C5B3] flex flex-col justify-between font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-[#061C18]">
        <Header />
      </div>

      <main className="flex-grow">
        <Image
          src="/contact.png"
          alt="Get in Touch"
          width={1320}
          height={500}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
        <h1 className="sr-only">Contact Us</h1>
        <section aria-label="Contact details" className="w-full px-6 pt-10 sm:px-10 lg:px-14 lg:pt-12">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="flex flex-col items-start self-start rounded-2xl bg-[#0A2621] p-6 sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D8C5B3] text-[#061C18]">
                <Building2 aria-hidden="true" className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-3xl text-white">Corporate Office</h2>
              <div className="mt-4 flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />
                <p className="max-w-md text-sm leading-7 text-[#D8C5B3] sm:text-base">{corporateAddress}</p>
              </div>
              <div className="mt-6">
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-5 py-3 text-sm font-bold text-[#061C18] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
                >
                  <Navigation aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Get Directions on Map
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 rounded-2xl bg-[#0A2621] p-5 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-x-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8C5B3] text-[#061C18] sm:h-12 sm:w-12">
                  <Headphones aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">Toll-Free Helpline</h3>
                  <p className="mt-1 text-sm leading-6 text-[#C2B69D]">
                    Speak directly with our technical support and customer care team for immediate assistance.
                  </p>
                </div>
                <a
                  href="tel:18008913541"
                  aria-label="Call Helpline Now: 1800-891-3541"
                  className="col-span-2 mt-3 inline-flex w-fit items-center gap-2 rounded-md text-xl font-bold text-[#EDE4D8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] sm:col-span-1 sm:col-start-2"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-[#D4AF37]" />
                  1800-891-3541
                </a>
              </div>

              <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 rounded-2xl bg-[#0A2621] p-5 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-x-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8C5B3] text-[#061C18] sm:h-12 sm:w-12">
                  <Mail aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">Email Support</h3>
                  <p className="mt-1 text-sm leading-6 text-[#C2B69D]">
                    Send us your inquiries, dealership requests, or bulk architectural project requirements.
                  </p>
                </div>
                <a
                  href="mailto:customercare.scl@snowcempaints.com"
                  aria-label="Send Email Inquiry to customercare.scl@snowcempaints.com"
                  className="col-span-2 mt-3 w-fit max-w-full rounded-md text-sm font-semibold leading-6 text-[#EDE4D8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] sm:col-span-1 sm:col-start-2 sm:text-base"
                >
                  customercare.scl@<wbr />snowcempaints.com
                </a>
              </div>

              <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 rounded-2xl bg-[#0A2621] p-5 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-x-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8C5B3] text-[#061C18] sm:h-12 sm:w-12">
                  <MessageCircle aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">WhatsApp Support</h3>
                  <p className="mt-1 text-sm leading-6 text-[#C2B69D]">
                    Chat directly with our paint advisors for instant shade recommendations &amp; product queries.
                  </p>
                </div>
                <div className="col-span-2 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 sm:col-span-1 sm:col-start-2">
                  <a
                    href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp: +91 81046 97547"
                    className="rounded-md text-lg font-bold text-[#EDE4D8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
                  >
                    +91 81046 97547
                  </a>
                  <span className="text-xs text-[#C2B69D]">Tag: #snowsense</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <h2 className="text-xl font-extrabold text-white">
                    Locate Our Corporate Office
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#D8C5B3] leading-relaxed font-normal">
                  Located at Backbay Reclamation, Babubhai Chinai Marg, South Mumbai. Visit us during business hours (Mon-Fri, 9:30 AM - 6:00 PM).
                </p>

                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D8C5B3]/15 bg-[#0A2621]">
                  <iframe
                    title="Snowcem Paints Corporate Office Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={embedMapUrl}
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="flex items-center text-xs font-medium text-[#C2B69D]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    Business Hours: Mon - Fri (9:30 AM - 6:00 PM)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#0A2621] rounded-3xl border border-[#D8C5B3]/15 p-6 sm:p-8 md:p-10">
                <div className="mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
                    Direct Inquiry Form
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-3 mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D8C5B3] font-light">
                    Fill in your details below and our customer support specialist will respond within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-[#D8C5B3] uppercase tracking-wider mb-1.5">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full bg-[#EDE4D8] border border-[#D8C5B3] text-[#041411] placeholder:text-[#0A2621]/70 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-[#D8C5B3] uppercase tracking-wider mb-1.5">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-[#EDE4D8] border border-[#D8C5B3] text-[#041411] placeholder:text-[#0A2621]/70 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-mobile" className="block text-xs font-bold text-[#D8C5B3] uppercase tracking-wider mb-1.5">
                        Mobile*
                      </label>
                      <input
                        id="contact-mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#EDE4D8] border border-[#D8C5B3] text-[#041411] placeholder:text-[#0A2621]/70 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-inquiry-type" className="block text-xs font-bold text-[#D8C5B3] uppercase tracking-wider mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        id="contact-inquiry-type"
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#EDE4D8] border border-[#D8C5B3] text-[#041411] text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors cursor-pointer font-medium"
                      >
                        <option value="Customer Support">Customer Support</option>
                        <option value="Dealer Inquiry">Dealer Partnership Inquiry</option>
                        <option value="Product Query">Product & Shade Query</option>
                        <option value="Architect & Project">Architect / Builder Project</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-[#D8C5B3] uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your inquiry or requirement..."
                      className="w-full bg-[#EDE4D8] border border-[#D8C5B3] text-[#041411] placeholder:text-[#0A2621]/70 text-sm rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:opacity-95 text-[#041411] font-bold text-sm py-3.5 px-6 rounded-xl transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2621]"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {submitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041411]/80 backdrop-blur-xs">
            <div className="bg-[#0A2621] rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative border border-[#D8C5B3]/15">
              <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-2xl font-extrabold text-white mb-2">Message Sent!</h3>
              <p className="text-sm text-[#D8C5B3] font-normal leading-relaxed mb-6">
                Thank you for reaching out to Snowcem Paints. Your inquiry has been received and our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#041411] font-bold text-xs py-3 rounded-xl hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2621]"
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
