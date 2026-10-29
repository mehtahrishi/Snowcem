"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import { SNOWCEM_VALUES, CULTURE_MOMENTS } from "@/data/lifeAtSnowcemData";
import { ArrowRight } from "lucide-react";

export default function LifeAtSnowcemPage() {
  const [activeMoment, setActiveMoment] = useState(1);
  const [cultureHovered, setCultureHovered] = useState(false);
  const [cultureFocused, setCultureFocused] = useState(false);
  const [cultureDragging, setCultureDragging] = useState(false);
  const reducedMotion = useReducedMotion();

  const changeMoment = (direction: number) => {
    setActiveMoment((current) => (current + direction + CULTURE_MOMENTS.length) % CULTURE_MOMENTS.length);
  };

  useEffect(() => {
    if (cultureHovered || cultureFocused || cultureDragging || reducedMotion) return;
    const timer = window.setTimeout(() => {
      setActiveMoment((current) => (current + 1) % CULTURE_MOMENTS.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [activeMoment, cultureHovered, cultureFocused, cultureDragging, reducedMotion]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <h1 className="sr-only">Life @ Snowcem</h1>
        <Image
          src="/life-culture/life@.png"
          alt="Life @ Snowcem Paints — Building Careers. Nurturing People."
          width={2037}
          height={772}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />

        <section aria-labelledby="chro-heading" className="grid w-full grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[636/663] w-full lg:aspect-auto lg:min-h-[520px]">
            <Image
              src="/life-culture/image.png"
              alt="Snowcem Paints Chief Human Resources Officer"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#061C18] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <h2 id="chro-heading" className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
              Message from the CHRO
            </h2>
            <p className="mt-3 text-sm text-[#C2B69D]">Chief Human Resources Officer</p>
            <p className="mt-6 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              &ldquo;At Snowcem, we believe in creating a workplace where individuals feel valued,
              empowered, and inspired to grow. Our focus is on nurturing talent, encouraging
              innovation, and building a culture of trust, collaboration, and continuous
              learning.&rdquo;
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              &ldquo;Together, we are shaping a stronger, more sustainable future—one built on the
              strength of our people and the power of our shared values.&rdquo;
            </p>
          </div>
        </section>

        <section aria-labelledby="values-heading" className="w-full bg-[#0A2621] px-3 py-14 sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-[1240px] text-center">
            <h2 id="values-heading" className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
              Driven by Values
            </h2>
            <div className="mt-10 grid grid-cols-5 gap-2 sm:gap-5">
              {SNOWCEM_VALUES.map((value) => (
                <div key={value.id} className="flex min-w-0 flex-col items-center">
                  <Image
                    src={value.image}
                    alt=""
                    width={160}
                    height={160}
                    className="h-auto w-full max-w-[88px] object-contain"
                  />
                  <h3 className="mt-5 max-w-[200px] text-[9px] font-semibold leading-4 text-white sm:text-xs sm:leading-6 lg:text-[0.9375rem]">
                    {value.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="talent-heading" className="w-full bg-[#061C18] px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-[1180px] text-center">
            <h2 id="talent-heading" className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
              Nurturing Talent
            </h2>
            <h3 className="mt-5 text-xl font-semibold text-white">Your Growth. Our Priority</h3>
            <p className="mx-auto mt-5 max-w-4xl text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              We invest in your future through focused initiatives designed to unlock potential and
              accelerate career growth. Our approach includes Leadership Development, along with
              continuous hand holding and skill empowerment of the front line sales team to
              strengthen capabilities, build confidence, and drive long-term success
            </p>
          </div>
        </section>

        <section aria-labelledby="work-heading" className="grid w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#0A2621] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <h2 id="work-heading" className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
              More Than Just Work
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              Life at Snowcem is about building meaningful careers in an environment that truly
              cares. We foster a culture that encourages ownership, innovation, and mutual respect.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              Our commitment goes beyond professional development—we ensure employees enjoy a
              healthy work-life balance, feel supported in their roles, and have the opportunity to
              make a real impact. Here, you&apos;re not just an employee; you&apos;re a valued member
              of a community dedicated to excellence and growth.
            </p>
            <p className="mt-6 text-sm font-semibold text-white">
              Healthy Work-Life Balance &amp; Mutual Respect
            </p>
          </div>
          <div className="relative aspect-[1040/695] w-full lg:aspect-auto">
            <Image
              src="/life-culture/peace.png"
              alt="Snowcem colleagues enjoying time together outdoors"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        <section
          aria-labelledby="culture-heading"
          aria-roledescription="carousel"
          className="w-full overflow-hidden bg-[#061C18] px-6 py-14 sm:px-10 lg:px-14 lg:py-16"
          onMouseEnter={() => setCultureHovered(true)}
          onMouseLeave={() => setCultureHovered(false)}
          onFocus={() => setCultureFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setCultureFocused(false);
          }}
        >
          <div className="mx-auto max-w-[1320px]">
            <h2 id="culture-heading" className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
              Culture in Action
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              See how our values come to life through the moments that matter—from learning and
              development to celebrations that bring us together.
            </p>

            <motion.div
              role="group"
              tabIndex={0}
              aria-label="Culture moments. Swipe or use the left and right arrow keys to browse."
              className="relative mx-auto mt-12 h-[340px] max-w-[1000px] touch-pan-y cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] sm:mt-16 sm:h-[360px]"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDragStart={() => setCultureDragging(true)}
              onDragEnd={(_, info) => {
                setCultureDragging(false);
                if (Math.abs(info.offset.x) > 40) changeMoment(info.offset.x < 0 ? 1 : -1);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  changeMoment(event.key === "ArrowLeft" ? -1 : 1);
                }
              }}
            >
              {CULTURE_MOMENTS.map((moment, index) => {
                const relativeIndex = (index - activeMoment + CULTURE_MOMENTS.length) % CULTURE_MOMENTS.length;
                const offset = relativeIndex === CULTURE_MOMENTS.length - 1 ? -1 : relativeIndex;
                const isActive = index === activeMoment;

                return (
                  <motion.button
                    key={moment.id}
                    type="button"
                    aria-label={`Show ${moment.title}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveMoment(index)}
                    initial={false}
                    animate={{ x: `${offset * 78 - 50}%`, scale: isActive ? 1 : 0.78, opacity: isActive ? 1 : 0.5 }}
                    transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ zIndex: isActive ? 20 : 10 }}
                    className="absolute left-1/2 top-0 flex h-full w-[78%] max-w-[356px] select-none flex-col overflow-hidden rounded-3xl bg-[#0A2621] text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
                  >
                    <span className="relative block aspect-[2/1] w-full shrink-0">
                      <Image
                        src={moment.imageUrl}
                        alt={moment.imageAlt}
                        fill
                        sizes="(min-width: 640px) 356px, 78vw"
                        draggable={false}
                        className="pointer-events-none object-cover object-center"
                      />
                    </span>
                    <span className="flex flex-1 flex-col items-center px-5 py-6 sm:px-8">
                      <span className="text-lg font-bold leading-7 text-white sm:text-[1.375rem]">
                        {moment.title}
                      </span>
                      <span className="mt-1 max-w-[240px] text-base leading-7 text-[#C2B69D] sm:text-lg">
                        {moment.description}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
            <p className="sr-only" aria-live={cultureHovered || cultureFocused ? "polite" : "off"} aria-atomic="true">
              {CULTURE_MOMENTS[activeMoment].title}, slide {activeMoment + 1} of {CULTURE_MOMENTS.length}
            </p>
          </div>
        </section>

        <section aria-labelledby="growth-heading" className="grid w-full grid-cols-1 text-left lg:grid-cols-[3fr_2fr]">
          <div className="bg-[#0A2621] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <h2 id="growth-heading" className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
              Grow with Snowcem
            </h2>
            <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              <p>
                Your career path at Snowcem is designed to evolve with your ambitions and aspirations.
              </p>
              <p>
                At Snowcem, your career grows alongside you. We&apos;re committed to supporting
                long-term career journeys that align with your personal and professional goals.
              </p>
              <p>
                Whether you&apos;re exploring new areas, deepening your expertise, or stepping into
                leadership roles, we provide the resources, guidance, and opportunities you need to
                succeed.
              </p>
              <p>
                Your growth is our success, and we&apos;re invested in making sure you reach your
                full potential.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center bg-[#041411] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Join the Snowcem Family</h3>
            <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              If you&apos;re ready to build a meaningful career in an environment that nurtures your
              potential, we&apos;d love to hear from you.
            </p>
            <Link
              href="/careers"
              className="mt-7 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-6 py-3 text-sm font-bold text-[#061C18] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            >
              <span>View Current Opportunities</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </section>

        <Image
          src="/life-culture/timeline.png"
          alt="Career journey at Snowcem: Join, Learn, Contribute, Lead."
          width={1619}
          height={971}
          sizes="100vw"
          className="block h-auto max-h-[640px] w-full object-contain"
        />
      </main>

      {/* Floating Utilities & Footer */}
      <Footer />
    </div>
  );
}
