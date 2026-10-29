"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";

const SHADES = [
  { title: "Continuous Innovation", image: "/true-colors/continuous-innovation-white.png" },
  { title: "Consistent Quality", image: "/true-colors/consistent-quality-white.png" },
  { title: "Customer Satisfaction", image: "/true-colors/customer-satisfaction-white.png" },
  { title: "Robust Backend", image: "/true-colors/robust-backend-white.png" },
  { title: "Strong Core Team", image: "/true-colors/strong-core-team-white.png" },
];

const EVENTS = [
  {
    title: "Business Partners Meet, Puri",
    description: "Our dealers in Puri meet for an evening of networking, recognition, and the latest updates at Snowcem Paints.",
    image: "/true-colors/business-event-puri.png",
  },
  {
    title: "Business Partners Meet, Dubai",
    description: "Some of our top dealers and partners travel to Dubai for an exclusive partners’ meet and greet.",
    image: "/true-colors/business-event-dubai.png",
  },
  {
    title: "Business Partners Meet, Durgapur",
    description: "Recognising our dealers over an evening of networking.",
    image: "/true-colors/business-event-durgapur.png",
  },
  {
    title: "Business Partners Meet, Thailand",
    description: "A special networking evening filled with new opportunities at Snowcem Paints.",
    image: "/true-colors/business-event-thailand.png",
  },
  {
    title: "Annual Business Partners Convention",
    description: "Bringing together key trade partners and stockists to celebrate growth and launch innovative paint solutions.",
    image: "/true-colors/business-partner-meet.png",
  },
  {
    title: "Dealers Excellence Summit, Ahmedabad",
    description: "Gathering leading Gujarat applicators, contractors, and stockists for interactive product demonstrations.",
    image: "/true-colors/event-ahmedabad.png",
  },
  {
    title: "Regional Trade Connect, Kolhapur",
    description: "Empowering southern Maharashtra sales leaders and stockist partners with market growth strategies.",
    image: "/true-colors/event-kolhapur.png",
  },
  {
    title: "Grand Dealers Gala, Puri",
    description: "Celebrating outstanding sales performance and long-standing partnerships in coastal Odisha.",
    image: "/true-colors/event-puri.png",
  },
  {
    title: "Painters & Partners Meet, Rajkot",
    description: "Technical training and color trends orientation session for Saurashtra region applicators and stockists.",
    image: "/true-colors/event-rajkot.png",
  },
  {
    title: "Southern Region Business Meet, Salem",
    description: "Recognising top-performing dealers and launching new exterior emulsion lines in Tamil Nadu.",
    image: "/true-colors/event-salem.png",
  },
  {
    title: "Metropolitan Dealers Forum, Thane",
    description: "Engaging Mumbai metropolitan area trade partners with consultative selling and digital tools.",
    image: "/true-colors/event-thane.png",
  },
];

const LOOP_SLIDES = [...EVENTS.slice(-3), ...EVENTS, ...EVENTS.slice(0, 3)];

export default function TrueColoursOfLifePage() {
  const [position, setPosition] = useState(3);
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const moving = useRef(false);
  const pointerStart = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const activeIndex = (position - 3 + EVENTS.length) % EVENTS.length;

  const changeSlide = useCallback((direction: number) => {
    if (moving.current) return;
    if (reducedMotion) {
      setAnimated(false);
      setPosition((current) => ((current - 3 + direction + EVENTS.length) % EVENTS.length) + 3);
      return;
    }
    moving.current = true;
    setAnimated(true);
    setPosition((current) => current + direction);
  }, [reducedMotion]);

  useEffect(() => {
    if (hovered || focused || reducedMotion) return;
    const timer = window.setTimeout(() => changeSlide(1), 5000);
    return () => window.clearTimeout(timer);
  }, [position, hovered, focused, reducedMotion, changeSlide]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        <h1 className="sr-only">True Colours of Life</h1>
        <Image
          src="/true-colors/image.png"
          alt="True Colours of Life — a colourful room with a floor lamp"
          width={1320}
          height={500}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />

        <section className="bg-[#061C18] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-[1180px] text-center">
            <p className="text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              We all play many roles in life and are coloured by a spectrum of emotions. We grow and
              evolve, making some parts of us the primary colours of our personality, and some
              secondary—mixed to make us whole. Make us true.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              It is with this philosophy that Snowcem Paints has the vision to be the change leaders
              and the most trusted brand in home painting services — by being true to who we are,
              what we do, and celebrating the True Colours of Life.
            </p>
            <Link
              href="/about-us/the-snowcem-story"
              className="mt-7 inline-flex items-center justify-center border border-[#D8C7B3]/40 px-7 py-3 text-[0.8125rem] font-bold text-white transition-colors hover:border-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            >
              View The Snowcem Story
            </Link>
          </div>
        </section>

        <section aria-labelledby="shades-heading" className="w-full bg-[#0A2621] px-3 py-14 sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-[1240px] text-center">
            <h2 id="shades-heading" className="font-heading text-xl font-bold text-white sm:text-2xl">
              Shades That Make Us Who We Are
            </h2>
            <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-5">
              {SHADES.map((shade) => (
                <div key={shade.title} className="flex min-w-0 flex-col items-center">
                  <Image
                    src={shade.image}
                    alt=""
                    width={160}
                    height={160}
                    className="h-auto w-full max-w-[132px] object-contain"
                  />
                  <h3 className="mt-3 text-[9px] font-normal leading-4 text-white sm:text-xs sm:leading-6 lg:text-[0.9375rem]">
                    {shade.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="events-heading"
          aria-roledescription="carousel"
          className="w-full bg-[#061C18] px-6 py-14 sm:px-10 lg:px-14 lg:py-16"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-8 flex items-center justify-between gap-5">
              <h2 id="events-heading" className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
                Events at Snowcem Paints
              </h2>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => changeSlide(-1)}
                  aria-label="Previous event"
                  aria-controls="event-slides"
                  className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                >
                  <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => changeSlide(1)}
                  aria-label="Next event"
                  aria-controls="event-slides"
                  className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                >
                  <ChevronRight aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div
              id="event-slides"
              tabIndex={0}
              aria-label="Event photos. Use the left and right arrow keys to browse."
              className="touch-pan-y cursor-grab overflow-hidden active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] [--event-step:calc(100%_+_1.5rem)] sm:[--event-step:calc((100%_+_1.5rem)/2)] lg:[--event-step:calc((100%_+_1.5rem)/3)]"
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  changeSlide(event.key === "ArrowLeft" ? -1 : 1);
                }
              }}
              onPointerDown={(event) => {
                if (!event.isPrimary || event.button !== 0) return;
                pointerStart.current = event.clientX;
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerUp={(event) => {
                if (pointerStart.current === null) return;
                const distance = event.clientX - pointerStart.current;
                pointerStart.current = null;
                if (Math.abs(distance) > 40) changeSlide(distance < 0 ? 1 : -1);
              }}
              onPointerCancel={() => { pointerStart.current = null; }}
            >
              <div
                className={`flex gap-6 ${animated ? "transition-transform duration-[600ms] ease-in-out" : ""}`}
                style={{ transform: `translateX(calc(-${position} * var(--event-step)))` }}
                onTransitionEnd={(event) => {
                  if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
                  moving.current = false;
                  setAnimated(false);
                  setPosition((current) => ((current - 3 + EVENTS.length) % EVENTS.length) + 3);
                }}
              >
                {LOOP_SLIDES.map((event, index) => (
                  <article
                    key={`${event.image}-${index}`}
                    aria-hidden={index < 3 || index >= EVENTS.length + 3 ? true : undefined}
                    className="min-w-0 shrink-0 basis-full select-none sm:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)]"
                  >
                    <div className="relative aspect-[772/428] w-full overflow-hidden bg-[#0A2621]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(min-width: 1440px) 424px, (min-width: 1024px) calc((100vw - 160px) / 3), (min-width: 640px) calc((100vw - 104px) / 2), calc(100vw - 48px)"
                        draggable={false}
                        className="pointer-events-none object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-5 text-base font-semibold leading-6 text-white">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#C2B69D]">
                      {event.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <p className="sr-only" aria-live={hovered || focused ? "polite" : "off"} aria-atomic="true">
              Event {activeIndex + 1} of {EVENTS.length}: {EVENTS[activeIndex].title}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
