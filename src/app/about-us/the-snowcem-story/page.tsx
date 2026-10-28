import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const NETWORK_STATS = [
  { value: "Mumbai", label: "Head Office" },
  { value: "3", label: "Manufacturing Plants" },
  { value: "21", label: "Distribution Centers" },
  { value: "3,500+", label: "Dealers" },
];

export default function TheSnowcemStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-[#041411]">
          <Image
            src="/story/image.png"
            alt="A couple taking a break while painting their wall yellow"
            width={750}
            height={500}
            priority
            className="block h-auto max-h-[340px] w-full object-cover object-center sm:max-h-[420px] lg:max-h-[540px]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061C18] via-[#061C18]/70 to-transparent px-6 pb-9 pt-20 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[1180px]">
              <p className="font-label text-[10px] text-[#D4AF37]">The Snowcem Story</p>
              <h1 className="mt-3 text-[2.1rem] leading-[1.08] text-[#EDE4D8] sm:text-[2.9rem] lg:text-[3.4rem]">
                Snowcem gets a Splash of New.
              </h1>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.85] text-[#EDE4D8]/75">
                60+ years of experience is evolving with a modern palette of freshness.
                Introducing Snowcem Paints with a larger, more comprehensive product range.
              </p>
            </div>
          </div>
        </section>

        {/* A Colourful History with a Fresh Coat */}
        <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10 sm:py-16 lg:px-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="font-label text-[10px] text-[#D4AF37]">Since 1990</p>
              <h2 className="mt-3 text-[1.9rem] leading-[1.12] text-[#EDE4D8] sm:text-[2.2rem]">
                A Colourful History with a Fresh Coat.
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
                Pioneers in the paint and wall-care industry, Snowcem Paints is adored in the
                construction sector for our value-for-money offerings. Producing Sandtex Matt and
                Unigloss way back in 1990, our brand is synonymous with exterior home painting
                across the country, while we continue to strengthen our foundation in home
                interior painting.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
                Now, as part of Saurashtra Cement Limited &ndash; Paint Division under The Mehta
                Group, we are bolder, brighter, and bigger with a new spectrum of colours and home
                painting services. All with a unified philosophy to celebrate the True Colours of
                Life.
              </p>
              <Link
                href="/about-us/true-colours-of-life"
                className="mt-7 inline-flex items-center gap-2 border-b border-[#D8C7B3]/25 pb-1 text-[0.8125rem] text-[#EDE4D8]/75 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <span>Learn more about True Colours of Life</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#D6C5B3]/40">
                <Image
                  src="/story/image2.png"
                  alt="A building facade painted in bold stripes of colour"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Evergreen Commitment */}
        <section className="w-full bg-[#0A2621] py-14 sm:py-16">
          <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-14">
            <p className="font-label text-[10px] text-[#D4AF37]">Sustainability</p>
            <h2 className="mt-3 max-w-3xl text-[1.9rem] leading-[1.12] text-[#EDE4D8] sm:text-[2.2rem]">
              Green isn&apos;t just a Colour for us. It&apos;s our Evergreen Commitment.
            </h2>
            <p className="mt-5 max-w-3xl text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              Before and above everything else, the health and safety of our planet and people is
              our goal and responsibility. The research we do, the technology we develop, and the
              highly advanced system we use to treat our factory effluents are all to nurture our
              ecosystem and paint a brighter future.
            </p>
          </div>
        </section>

        {/* Mehta Group legacy */}
        <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10 sm:py-16 lg:px-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="font-label text-[10px] text-[#D4AF37]">The Mehta Group</p>
              <h2 className="mt-3 text-[1.9rem] leading-[1.12] text-[#EDE4D8] sm:text-[2.2rem]">
                Part of a 124-Year Legacy.
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
                The year was 1900. Mr. Nanji Kalidas Mehta, then a 13-year old boy left his native
                land in a country vessel, with a bag full of dreams. Today, Snowcem Paints is proud
                to be a part of this 124-year legacy.
              </p>
              <Link
                href="/about-us/about-mehta-group"
                className="mt-7 inline-flex items-center gap-2 border-b border-[#D8C7B3]/25 pb-1 text-[0.8125rem] text-[#EDE4D8]/75 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <span>Learn more about The Mehta Group</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#D8C5B3] px-8 py-10 sm:px-10">
                <Image
                  src="/story/mehta.png"
                  alt="The Mehta Group"
                  width={1463}
                  height={419}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pan-India distribution network */}
        <section className="w-full bg-[#041411] py-14 sm:py-16">
          <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-14">
            <p className="font-label text-[10px] text-[#D4AF37]">Nationwide Operations</p>
            <h2 className="mt-3 max-w-3xl text-[1.9rem] leading-[1.12] text-[#EDE4D8] sm:text-[2.2rem]">
              A Robust Pan-India Distribution Network for a Colourful Country.
            </h2>

            <div className="relative mt-8 aspect-[1320/622] w-full overflow-hidden border border-[#D6C5B3]/40">
              <Image
                src="/story/india.png"
                alt="Map of India showing Snowcem distribution centers, manufacturing plants and head office"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {NETWORK_STATS.map((stat) => (
                <div key={stat.label} className="bg-[#D8C5B3] px-5 py-6">
                  <p className="font-display text-[1.6rem] leading-none text-[#061C18]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.75rem] font-medium text-[#061C18]/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
