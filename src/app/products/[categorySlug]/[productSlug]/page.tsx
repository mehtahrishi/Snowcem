"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import Link from "next/link";
import Image from "next/image";
import { DbProduct, fetchProducts } from "@/lib/catalogClient";
import { ArrowRight, ArrowUpRight, ChevronRight, FileText, Sparkles } from "lucide-react";

function formatSlugTitle(slug: string): string {
  try {
    return decodeURIComponent(slug || "")
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch {
    return slug;
  }
}

const HIGHLIGHT_ICONS: { match: RegExp; src: string }[] = [
  { match: /unique formulation/i, src: "/highlights/unique-formulation.png" },
  { match: /gloss/i, src: "/highlights/high-gloss.png" },
  { match: /solar|reflective/i, src: "/highlights/solar-reflective.png" },
  { match: /fungi|algae|algal/i, src: "/highlights/fungi-algae-resistant.png" },
  { match: /eco-friendly|enamels?/i, src: "/highlights/eco-friendly.png" },
  { match: /warranty/i, src: "/highlights/warranty.png" },
];

const highlightIconFor = (feature: string) =>
  HIGHLIGHT_ICONS.find(({ match }) => match.test(feature))?.src;

export default function ProductDetailPage({
  params,
}: {
  params: { categorySlug: string; productSlug: string };
}) {
  const [allProducts, setAllProducts] = useState<DbProduct[]>([]);

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  const product =
    allProducts.find(
      (prod) => prod.slug === params.productSlug && prod.categorySlug === params.categorySlug
    ) || allProducts.find((prod) => prod.slug === params.productSlug);

  const detailImages = product?.detailImages || [];

  const similarProducts = useMemo(() => {
    if (!product) return [];
    let list = allProducts.filter(
      (p) =>
        p.categorySlug === product.categorySlug &&
        p.range === product.range &&
        p.id !== product.id
    );
    if (list.length < 8) {
      const more = allProducts.filter(
        (p) =>
          p.categorySlug === product.categorySlug &&
          p.id !== product.id &&
          !list.some((item) => item.id === p.id)
      );
      list = [...list, ...more];
    }
    return list.slice(0, 8);
  }, [allProducts, product]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {product ? (
          <>
            {/* Hero */}
            <section className="mx-auto w-full max-w-[1180px] px-6 pb-14 pt-10 sm:px-10 sm:pt-14 lg:px-14">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Packshot */}
                <div className="self-start lg:sticky lg:top-24 lg:col-span-5">
                  <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        className="object-contain p-6 sm:p-10"
                      />
                    )}
                  </div>

                  {product.warranty && (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-[3px] w-6 bg-[#D4AF37]" />
                      <span className="font-label text-[10px] text-[#C2B69D]">
                        {product.warranty} Warranty
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="lg:col-span-7">
                  <h1 className="text-[2.15rem] leading-[1.06] text-[#EDE4D8] sm:text-[2.9rem] lg:text-[3.4rem]">
                    {product.name}
                  </h1>

                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#EDE4D8]/55 italic">
                    {product.tagline}
                  </p>

                  <p className="mt-7 max-w-xl text-[0.9375rem] leading-[1.9] text-[#C2B69D]">
                    {product.description}
                  </p>

                  {(product.features?.length ?? 0) > 0 && (
                    <div className="mt-8 max-w-xl">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        {(product.features || []).map((feat, idx) => {
                          const commonImage = product.highlightImages?.[idx];
                          const icon = commonImage || highlightIconFor(feat);
                          return (
                            <div key={idx} className="flex flex-col items-center gap-3 text-center">
                              {icon && (
                                <Image
                                  src={icon}
                                  alt=""
                                  width={48}
                                  height={48}
                                  className={`h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16 ${
                                    commonImage
                                      ? "[filter:brightness(0)_invert(1)]"
                                      : ""
                                  }`}
                                />
                              )}
                              <p className="text-[0.8125rem] leading-[1.65] text-[#EDE4D8]/80">
                                {feat}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </section>

            {/* Product creatives */}
            {detailImages.length > 0 && (
              <section className="mx-auto w-full max-w-[1180px] px-6 pb-12 sm:px-10 lg:px-14">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  {detailImages.map((src, idx) => (
                    <div
                      key={src}
                      className="relative aspect-square w-full overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={src}
                        alt={`${product.name} detail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 92vw, 560px"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical sheet download */}
            {product.pdf && (
              <section className="mx-auto flex w-full max-w-[1180px] justify-center px-6 pb-12 sm:px-10 lg:px-14">
                  <a
                    href={product.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-6 py-3 font-label text-xs text-[#061C18] shadow-[0_14px_30px_-14px_rgba(212,175,55,0.6)] transition-all hover:brightness-110 sm:text-sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Download Technical Sheet</span>
                  </a>
              </section>
            )}

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <section className="mx-auto w-full max-w-[1180px] px-6 pb-6 sm:px-10 lg:px-14">
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
              <section className="w-full pb-4">
                <div className="flex flex-col items-center px-6 text-center sm:px-10 lg:px-14">
                  <p className="font-label text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">
                    {product.range || product.categoryName}
                  </p>
                  <h2 className="mt-2 text-[1.7rem] leading-tight text-[#EDE4D8] sm:text-[2rem]">
                    Other products in this range
                  </h2>
                  <span className="mt-4 h-px w-16 bg-[#D4AF37]/50" aria-hidden="true" />
                </div>

                {/* Centers cards when they fit; scrolls horizontally when they overflow */}
                <div className="snap-x snap-mandatory overflow-x-auto pb-4 pt-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="mx-auto flex w-max gap-4 px-6 sm:gap-5 sm:px-10 lg:px-14">
                  {similarProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.categorySlug}/${item.slug}`}
                      title={item.name}
                      className="product-card group relative flex h-[21rem] w-[17rem] shrink-0 snap-start flex-col rounded-2xl border border-[#C2B69D] bg-[#D8C5B3] shadow-sm hover:shadow-xl hover:shadow-[#BBA085]/20 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer sm:h-[24rem] sm:w-[20rem] overflow-hidden isolate [transform:translateZ(0)]"
                    >
                      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#C2B69D] p-5 sm:p-6 rounded-t-2xl">
                        {item.bgImage && (
                          <Image
                            src={item.bgImage}
                            alt=""
                            fill
                            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-2xl"
                            aria-hidden="true"
                          />
                        )}

                        <span className="absolute left-4 top-4 z-20 max-w-[70%] truncate font-label text-[9px] text-[#061C18]/55">
                          {item.categoryName}
                        </span>

                        {item.warranty && (
                          <span className="absolute right-4 top-4 z-20 font-label text-[9px] text-[#061C18]/55">
                            {item.warranty}
                          </span>
                        )}

                        {item.image ? (
                          <div className={`relative z-10 h-44 w-44 transition-all duration-500 ease-out group-hover:scale-105 sm:h-52 sm:w-52 ${item.bgImage ? "group-hover:opacity-0" : ""}`}>
                            <Image src={item.image} alt={`${item.name} - ${item.categoryName}`} fill className="object-contain" />
                          </div>
                        ) : (
                          <div className="relative z-10 flex flex-col items-center justify-center text-[#061C18]/45">
                            <Sparkles className="mb-1 h-6 w-6 opacity-60" />
                            <span className="text-[10px] font-semibold">Snowcem Quality</span>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10 flex items-center justify-between bg-[#D8C5B3] px-4 py-3 rounded-b-2xl">
                        <span className="truncate pr-2 text-xs font-bold uppercase tracking-wider text-[#061C18]">
                          {item.name}
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#061C18] stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-center px-6">
                  <Link
                    href={`/products/${product.categorySlug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-6 py-2.5 text-[0.8125rem] font-bold text-[#EDE4D8] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#061C18]"
                  >
                    <span>View all {product.categoryName}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </section>
            )}

            <ToolsSupportTabs toolType="calculator" compact />

            <PaintingServiceQueryBanner sourceContext={`product_${product.slug}`} />
          </>
        ) : (
          <section className="mx-auto w-full max-w-[1180px] px-6 py-28 text-center sm:px-10 lg:px-14">
            <p className="font-label text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">
              {formatSlugTitle(params.categorySlug) || "Snowcem Paints"}
            </p>
            <h1 className="mt-4 text-[2.1rem] leading-tight text-[#EDE4D8] sm:text-[2.6rem]">
              {formatSlugTitle(params.productSlug)}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-[1.85] text-[#C2B69D]">
              Explore {formatSlugTitle(params.productSlug)} from Snowcem Paints&apos;{" "}
              {formatSlugTitle(params.categorySlug)} range — engineered for superior coverage,
              durability, and long-lasting protection.
            </p>
            <Link
              href={`/products/${params.categorySlug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-7 py-3 font-label text-[11px] text-[#061C18] transition-all hover:brightness-110"
            >
              <span>Browse {formatSlugTitle(params.categorySlug)}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
