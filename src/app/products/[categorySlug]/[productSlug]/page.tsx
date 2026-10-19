"use client";

import React, { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowRight, ChevronRight, FileText, MapPin } from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: { categorySlug: string; productSlug: string };
}) {
  const product =
    PRODUCTS_DATA.find(
      (prod) => prod.slug === params.productSlug && prod.categorySlug === params.categorySlug
    ) || PRODUCTS_DATA.find((prod) => prod.slug === params.productSlug);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    let list = PRODUCTS_DATA.filter(
      (p) =>
        p.categorySlug === product.categorySlug &&
        p.range === product.range &&
        p.id !== product.id
    );
    if (list.length < 4) {
      const more = PRODUCTS_DATA.filter(
        (p) =>
          p.categorySlug === product.categorySlug &&
          p.id !== product.id &&
          !list.some((item) => item.id === p.id)
      );
      list = [...list, ...more];
    }
    return list.slice(0, 4);
  }, [product]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {product ? (
          <>
            {/* Breadcrumb */}
            <nav className="mx-auto w-full max-w-[1180px] px-6 pt-8 sm:px-10 lg:px-14">
              <div className="flex items-center gap-2 font-label text-[10px] text-[#C2B69D]/60">
                <Link
                  href={`/products/${product.categorySlug}`}
                  className="transition-colors hover:text-[#D4AF37]"
                >
                  {product.categoryName}
                </Link>
                <ChevronRight className="h-3 w-3 text-[#D4AF37]/50" />
                <span className="text-[#EDE4D8]/80">{product.name}</span>
              </div>
            </nav>

            {/* Hero */}
            <section className="mx-auto w-full max-w-[1180px] px-6 pb-14 pt-10 sm:px-10 sm:pt-14 lg:px-14">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Packshot stage */}
                <div className="lg:col-span-6">
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] border border-[#D6C5B3]/40 sm:aspect-[4/3] lg:aspect-[5/6]"
                    style={{
                      background: product.stageBg
                        ? `linear-gradient(160deg, #F8F4EE 0%, ${product.stageBg}66 100%)`
                        : "#F3EEE6",
                    }}
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        className="object-contain p-10 sm:p-14"
                      />
                    )}

                    {product.warranty && (
                      <div className="absolute bottom-0 left-0 flex items-center gap-3 border-t border-r border-[#061C18]/10 bg-[#FAF7F2]/85 px-5 py-3 backdrop-blur-sm">
                        <span className="h-[2px] w-6 bg-[#D4AF37]" />
                        <span className="font-label text-[10px] text-[#061C18]/70">
                          {product.warranty} Warranty
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-6">
                  <p className="font-label text-[10px] text-[#D4AF37]">
                    {product.range || product.categoryName}
                  </p>

                  <h1 className="mt-4 text-[2.15rem] leading-[1.06] text-[#EDE4D8] sm:text-[2.9rem] lg:text-[3.4rem]">
                    {product.name}
                  </h1>

                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#EDE4D8]/55 italic">
                    {product.tagline}
                  </p>

                  <p className="mt-7 max-w-xl text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
                    {product.description}
                  </p>

                  {/* Specification rows */}
                  {(product.finish || product.warranty) && (
                    <dl className="mt-9 max-w-xl border-t border-[#D8C7B3]/15">
                      {product.finish && (
                        <div className="flex items-baseline justify-between gap-6 border-b border-[#D8C7B3]/15 py-3.5">
                          <dt className="font-label text-[10px] text-[#C2B69D]/60">
                            Finish &amp; sheen
                          </dt>
                          <dd className="text-right text-[0.8125rem] text-[#EDE4D8]">
                            {product.finish}
                          </dd>
                        </div>
                      )}
                      {product.warranty && (
                        <div className="flex items-baseline justify-between gap-6 border-b border-[#D8C7B3]/15 py-3.5">
                          <dt className="font-label text-[10px] text-[#C2B69D]/60">
                            Performance guarantee
                          </dt>
                          <dd className="text-right text-[0.8125rem] text-[#EDE4D8]">
                            {product.warranty}
                          </dd>
                        </div>
                      )}
                    </dl>
                  )}

                  {/* Highlights */}
                  <div className="mt-9 max-w-xl">
                    <p className="font-label text-[10px] text-[#C2B69D]/60">Highlights</p>
                    <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {product.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-[#EDE4D8]/75"
                        >
                          <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#D4AF37]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-11 flex flex-wrap items-center gap-7">
                    <Link
                      href="/find-dealer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-7 py-3 font-label text-[11px] text-[#061C18] shadow-[0_14px_30px_-14px_rgba(212,175,55,0.6)] transition-all hover:brightness-110"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Find a dealer</span>
                    </Link>

                    {product.pdf && (
                      <a
                        href={product.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-b border-[#D8C7B3]/25 pb-1 text-[0.8125rem] text-[#EDE4D8]/75 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>Technical PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Tools */}
            <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 sm:px-10 lg:px-14">
              <div className="border-y border-[#D8C7B3]/15">
                <Link
                  href="/paint-calculator"
                  className="group flex flex-col gap-3 border-b border-[#D8C7B3]/12 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
                >
                  <div className="max-w-2xl">
                    <p className="font-label text-[10px] text-[#D4AF37]">Estimate</p>
                    <h2 className="mt-2.5 text-[1.55rem] leading-tight text-[#EDE4D8] sm:text-[1.75rem]">
                      Calculate paint budget &amp; litres
                    </h2>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#C2B69D]">
                      Enter your carpet area to work out litres of {product.name}, primer
                      undercoats, wall putty and the estimated cost.
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-bold text-[#EDE4D8] transition-colors group-hover:text-[#D4AF37]">
                    <span>Open calculator</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/color-catalogue"
                  className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
                >
                  <div className="max-w-2xl">
                    <p className="font-label text-[10px] text-[#D4AF37]">Shades</p>
                    <h2 className="mt-2.5 text-[1.55rem] leading-tight text-[#EDE4D8] sm:text-[1.75rem]">
                      Explore 1,800+ curated colours
                    </h2>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#C2B69D]">
                      Browse genre-based palettes and find the right shade for {product.name}
                      across living rooms, bedrooms, kitchens and facades.
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-bold text-[#EDE4D8] transition-colors group-hover:text-[#D4AF37]">
                    <span>Browse catalogue</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </section>

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 sm:px-10 lg:px-14">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <p className="font-label text-[10px] text-[#D4AF37]">Guidance</p>
                    <h2 className="mt-4 text-[1.9rem] leading-[1.12] text-[#EDE4D8] sm:text-[2.2rem]">
                      Frequently asked
                    </h2>
                    <p className="mt-4 text-[0.8125rem] leading-[1.85] text-[#C2B69D]">
                      Application guidelines, drying time and care instructions for{" "}
                      {product.name}.
                    </p>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="border-t border-[#D8C7B3]/15">
                      {product.faqs.map((faq, idx) => (
                        <details
                          key={idx}
                          className="group border-b border-[#D8C7B3]/15"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[0.9375rem] text-[#EDE4D8] transition-colors hover:text-[#D4AF37] [&::-webkit-details-marker]:hidden">
                            <span>{faq.question}</span>
                            <ChevronRight className="h-4 w-4 shrink-0 text-[#D4AF37]/60 transition-transform duration-200 group-open:rotate-90" />
                          </summary>
                          <p className="max-w-2xl pb-6 text-[0.875rem] leading-[1.9] text-[#C2B69D]">
                            {faq.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Similar products */}
            {similarProducts.length > 0 && (
              <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 sm:px-10 lg:px-14">
                <div className="flex items-end justify-between gap-6 border-b border-[#D8C7B3]/15 pb-5">
                  <div>
                    <p className="font-label text-[10px] text-[#D4AF37]">
                      {product.range || product.categoryName}
                    </p>
                    <h2 className="mt-3 text-[1.7rem] leading-tight text-[#EDE4D8] sm:text-[2rem]">
                      Other products in this range
                    </h2>
                  </div>
                  <Link
                    href={`/products/${product.categorySlug}`}
                    className="hidden shrink-0 items-center gap-2 text-[0.8125rem] font-bold text-[#EDE4D8]/70 transition-colors hover:text-[#D4AF37] sm:inline-flex"
                  >
                    <span>View all</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-5 py-9 sm:gap-6 lg:grid-cols-4">
                  {similarProducts.map((item) => (
                    <article
                      key={item.id}
                      className="group flex flex-col rounded-[3px] border border-[#D6C5B3]/50 bg-[#FAF7F2] shadow-[0_18px_40px_-28px_rgba(6,28,24,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DF3F6F]/40 hover:shadow-[0_26px_54px_-26px_rgba(187,160,133,0.55)]"
                    >
                      <div
                        className="relative aspect-square overflow-hidden rounded-t-[3px] border-b border-[#D6C5B3]/40"
                        style={{
                          background: item.stageBg
                            ? `linear-gradient(165deg, #F6F1E9 0%, ${item.stageBg}55 100%)`
                            : "#F3EEE6",
                        }}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        )}
                      </div>

                      <div className="flex flex-grow flex-col p-5">
                        <h3 className="font-display text-[1.15rem] leading-tight text-[#061C18]">
                          {item.name}
                        </h3>
                        <p className="mt-1.5 text-[0.75rem] leading-snug text-[#061C18]/55 line-clamp-2">
                          {item.tagline}
                        </p>

                        <Link
                          href={`/products/${item.categorySlug}/${item.slug}`}
                          className="mt-5 inline-flex items-center gap-2 border-t border-[#061C18]/10 pt-4 text-[0.75rem] font-bold text-[#061C18] transition-colors hover:text-[#DF3F6F]"
                        >
                          <span>View details</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <PaintingServiceQueryBanner sourceContext={`product_${product.slug}`} />

            <div className="pt-4">
              <ToolsSupportTabs toolType="calculator" />
            </div>
          </>
        ) : (
          <section className="mx-auto w-full max-w-[1180px] px-6 py-28 text-center sm:px-10 lg:px-14">
            <p className="font-label text-[10px] text-[#D4AF37]">Snowcem</p>
            <h1 className="mt-4 text-[2.1rem] leading-tight text-[#EDE4D8] sm:text-[2.6rem]">
              Product details coming soon
            </h1>
            <Link
              href={`/products/${params.categorySlug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-7 py-3 font-label text-[11px] text-[#061C18] transition-all hover:brightness-110"
            >
              <span>Browse this collection</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
