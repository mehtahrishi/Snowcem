import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";

export default function TheSnowcemStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {/* Hero: text panel | image */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#061C18] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <h1 className="text-[2.1rem] leading-[1.08] text-[#EDE4D8] sm:text-[2.9rem] lg:text-[3.4rem]">
              Snowcem gets a Splash of New.
            </h1>
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.85] text-[#C2B69D]">
              60+ years of experience is evolving with a modern palette of freshness. Introducing
              Snowcem Paints with a larger, more comprehensive product range.
            </p>
          </div>

          <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[640px]">
            <Image
              src="/story/image.png"
              alt="A couple taking a break while painting their wall yellow"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </section>

        {/* History: image | text panel */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[640px]">
            <Image
              src="/story/image2.png"
              alt="A building facade painted in bold stripes of colour"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#D8C5B3] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <h2 className="text-[1.9rem] leading-[1.12] text-[#061C18] sm:text-[2.2rem]">
              A Colourful History with a Fresh Coat.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#061C18]/70">
              Pioneers in the paint and wall-care industry, Snowcem Paints is adored in the
              construction sector for our value-for-money offerings. Producing Sandtex Matt and
              Unigloss way back in 1990, our brand is synonymous with exterior home painting across
              the country, while we continue to strengthen our foundation in home interior
              painting.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#061C18]/70">
              Now, as part of Saurashtra Cement Limited &ndash; Paint Division under The Mehta
              Group, we are bolder, brighter, and bigger with a new spectrum of colours and home
              painting services. All with a unified philosophy to celebrate the True Colours of
              Life.
            </p>
            <Link
              href="/about-us/true-colours-of-life"
              className="mt-8 inline-flex w-fit items-center justify-center border border-[#061C18]/50 px-8 py-3 text-[0.8125rem] font-bold text-[#061C18] transition-colors hover:border-[#8A6A12] hover:text-[#8A6A12]"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </section>

        {/* Pan-India distribution network */}
        <section className="relative aspect-[1320/622] w-full">
          <Image
            src="/story/india.png"
            alt="Map of India showing Snowcem distribution centers, manufacturing plants and head office"
            fill
            className="object-cover object-center"
          />
        </section>

        {/* Evergreen Commitment */}
        <section className="w-full bg-[#0A2621] py-16 lg:py-24">
          <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-14">
            <h2 className="max-w-2xl text-[1.9rem] leading-[1.12] text-[#EDE4D8] sm:text-[2.2rem]">
              Green isn&apos;t just a Colour for us. It&apos;s our Evergreen Commitment.
            </h2>
            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              Before and above everything else, the health and safety of our planet and people is
              our goal and responsibility. The research we do, the technology we develop, and the
              highly advanced system we use to treat our factory effluents are all to nurture our
              ecosystem and paint a brighter future.
            </p>
          </div>
        </section>

        {/* Mehta Group legacy: logo | text */}
        <section className="grid grid-cols-1 pb-16 sm:pb-20 lg:grid-cols-2">
          <div className="flex items-center justify-center bg-white px-8 py-14 sm:px-10 lg:px-14 lg:py-20">
            <Image
              src="/story/mehta.png"
              alt="The Mehta Group"
              width={1463}
              height={419}
              className="h-auto w-full max-w-[520px]"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#061C18] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <p className="max-w-xl text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              The year was 1900. Mr. Nanji Kalidas Mehta, then a 13-year old boy left his native
              land in a country vessel, with a bag full of dreams. Today, Snowcem Paints is proud
              to be a part of this 124-year legacy.
            </p>
            <Link
              href="/about-us/about-mehta-group"
              className="mt-8 inline-flex w-fit items-center justify-center border border-[#D8C7B3]/40 px-8 py-3 text-[0.8125rem] font-bold text-[#EDE4D8] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
