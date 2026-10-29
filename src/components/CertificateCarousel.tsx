"use client";

import Image from "next/image";

const CERTIFICATES = [
  {
    title: "ISO 9001:2015",
    description: "Quality Management",
    image: "/certificates/quality-management.webp",
    pdf: "SAURASHTRA CEMENT LIMITED - QMS.pdf",
  },
  {
    title: "ISO 14001:2015",
    description: "Environmental Management",
    image: "/certificates/environmental-management.webp",
    pdf: "SAURASHTRA CEMENT LIMITED - EMS.pdf",
  },
  {
    title: "IGBC Membership",
    description: "Indian Green Building Council",
    image: "/certificates/snowcem-certification.webp",
    pdf: "Snowcem Paints  Brand of Saurashtra Cement Ltd-Paints Division (1).pdf",
  },
];

export default function CertificateCarousel() {
  return (
    <section aria-label="Certificates" className="w-full bg-[#061C18] py-14 sm:py-16">
      <div className="certificate-viewport mx-auto w-full max-w-4xl">
        <div className="certificate-track">
          {[...CERTIFICATES, CERTIFICATES[0]].map((certificate, index) => (
            <a
              key={`${certificate.pdf}-${index}`}
              href={`/certificates/${encodeURIComponent(certificate.pdf)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={index === CERTIFICATES.length ? true : undefined}
              tabIndex={index === CERTIFICATES.length ? -1 : 0}
              aria-label={`Open ${certificate.title} certificate PDF (new tab)`}
              className="certificate-slide px-6 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D4AF37] sm:px-10"
            >
              <div className="relative mx-auto h-[360px] w-full max-w-2xl sm:h-[500px]">
                <Image
                  src={certificate.image}
                  alt={`${certificate.title} — ${certificate.description}`}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 767px) calc(100vw - 80px), 672px"
                  className="object-contain"
                />
              </div>
              <div className="pt-5 text-center text-white">
                <h3 className="text-base sm:text-lg">{certificate.title}</h3>
                <p className="mt-1 text-xs text-[#C2B69D] sm:text-sm">{certificate.description}</p>
                <span className="mt-3 inline-block text-xs font-semibold underline underline-offset-4">
                  View certificate
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .certificate-viewport {
          overflow: hidden;
          scroll-snap-type: x mandatory;
        }
        .certificate-track {
          display: flex;
          width: 100%;
          animation: certificate-slides 15s cubic-bezier(0.45, 0, 0.25, 1) infinite;
        }
        .certificate-slide {
          flex: 0 0 100%;
          min-width: 0;
          scroll-snap-align: center;
        }
        @media (hover: hover) {
          .certificate-viewport:hover .certificate-track {
            animation-play-state: paused;
          }
        }
        .certificate-viewport:focus-within {
          overflow-x: auto;
        }
        .certificate-track:focus-within {
          animation: none;
        }
        .certificate-track:focus-within .certificate-slide[aria-hidden="true"] {
          display: none;
        }
        @keyframes certificate-slides {
          0%, 26% { transform: translateX(0); }
          33.333333%, 59.333333% { transform: translateX(-100%); }
          66.666667%, 92.666667% { transform: translateX(-200%); }
          100% { transform: translateX(-300%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .certificate-viewport {
            overflow-x: auto;
          }
          .certificate-track {
            animation: none;
          }
          .certificate-slide[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
