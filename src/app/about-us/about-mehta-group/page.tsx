import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";

export default function AboutMehtaGroupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        <div className="w-full">
          <Image
            src="/mehta-group/image.png"
            alt="The Mehta Group — a legacy that began with Nanji Kalidas Mehta in 1900"
            width={2038}
            height={772}
            priority
            sizes="100vw"
            className="block h-auto w-full"
          />
        </div>

        <section className="grid grid-cols-1 pb-16 sm:pb-20 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#061C18] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <h1 className="text-[1.9rem] leading-[1.12] text-white sm:text-[2.2rem]">
              We Are a Part of
              <br />
              The Mehta Group&rsquo;s Saurashtra Cement Limited.
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              Snowcem Paints has been acquired by the renowned Saurashtra Cement Limited owned
              by The Mehta Group and we are proud and honoured to be a part of this growing legacy.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              The Mehta Group runs diversified businesses across the world in various industries
              like construction, engineering, finance, and sports and entertainment to name a few.
              One of its companies is Saurashtra Cement Limited, a cement business company that
              markets the renowned &lsquo;Hathi Cement&rsquo; in Gujarat and its nearby areas.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
              Today, The Mehta Group controls assets worth more than USD 500 million. It is a
              multinational, multi-enterprise with a global presence spanning across 3 continents
              &ndash; Asia, North America, and Africa. But it all started when the trading currency
              was cowrie shells. And today, it has given Snowcem Paints the wings we need to bring
              True Colours to Life.
            </p>
            <a
              href="https://www.mehtagroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center justify-center border border-[#D8C7B3]/40 px-8 py-3 text-[0.8125rem] font-bold text-white transition-colors hover:border-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            >
              Read the Full Story
            </a>
          </div>

          <div className="relative aspect-[4/3] w-full sm:aspect-[3/2] lg:aspect-auto">
            <Image
              src="/mehta-group/building.png"
              alt="A view looking up at The Mehta Group building"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
