"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const CERTIFICATES = [
  {
    title: "ISO 9001:2015 — Quality Management",
    image: "/certificates/quality-management.webp",
    pdf: "SAURASHTRA CEMENT LIMITED - QMS.pdf",
  },
  {
    title: "ISO 14001:2015 — Environmental Management",
    image: "/certificates/environmental-management.webp",
    pdf: "SAURASHTRA CEMENT LIMITED - EMS.pdf",
  },
  {
    title: "IGBC Membership — Indian Green Building Council",
    image: "/certificates/snowcem-certification.webp",
    pdf: "Snowcem Paints  Brand of Saurashtra Cement Ltd-Paints Division (1).pdf",
  },
];

export default function CertificateCarousel() {
  const [{ index, direction }, setSlide] = useState({ index: 0, direction: 1 });
  const [paused, setPaused] = useState(false);
  const moving = useRef(false);
  const reducedMotion = useReducedMotion();
  const certificate = CERTIFICATES[index];

  const changeSlide = useCallback((direction: number) => {
    if (moving.current) return;
    moving.current = true;
    setSlide(({ index }) => ({
      index: (index + direction + CERTIFICATES.length) % CERTIFICATES.length,
      direction,
    }));
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => changeSlide(1), 5000);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion, changeSlide]);

  return (
    <section aria-label="Certificates" className="w-full bg-[#061C18] py-14 sm:py-16">
      <div
        className="relative mx-auto w-full max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div id="certificate-slides" className="relative h-[396px] overflow-hidden sm:h-[536px]">
          <AnimatePresence
            initial={false}
            custom={direction}
            onExitComplete={() => { moving.current = false; }}
          >
            <motion.a
              key={index}
              custom={direction}
              variants={{
                enter: (direction: number) => ({ x: reducedMotion ? 0 : `${direction * 100}%` }),
                center: { x: 0 },
                exit: (direction: number) => ({ x: reducedMotion ? 0 : `${direction * -100}%` }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.45, 0, 0.25, 1] }}
              href={`/certificates/${encodeURIComponent(certificate.pdf)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${certificate.title} certificate PDF (new tab)`}
              className="absolute inset-0 block px-12 text-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D4AF37] sm:px-16"
            >
              <div className="relative mx-auto h-[360px] w-full max-w-2xl sm:h-[500px]">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 96px), (max-width: 799px) calc(100vw - 128px), 672px"
                  className="object-contain"
                />
              </div>
              <span className="mt-5 inline-block text-xs font-semibold leading-4 underline underline-offset-4">
                View details
              </span>
            </motion.a>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => changeSlide(-1)}
          aria-label="Previous certificate"
          aria-controls="certificate-slides"
          className="absolute left-1 top-[160px] flex h-10 w-10 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] sm:left-3 sm:top-[230px]"
        >
          <ChevronLeft aria-hidden="true" className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => changeSlide(1)}
          aria-label="Next certificate"
          aria-controls="certificate-slides"
          className="absolute right-1 top-[160px] flex h-10 w-10 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] sm:right-3 sm:top-[230px]"
        >
          <ChevronRight aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
