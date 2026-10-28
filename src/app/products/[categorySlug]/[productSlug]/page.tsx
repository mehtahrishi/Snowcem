"use client";

import React, { useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ToolsSupportTabs from "@/components/ToolsSupportTabs";
import PaintingServiceQueryBanner from "@/components/PaintingServiceQueryBanner";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, FileText, Home } from "lucide-react";

const PRODUCT_CATEGORIES = Array.from(
  new Map(PRODUCTS_DATA.map((p) => [p.categorySlug, p.categoryName])).entries()
).map(([slug, name]) => ({ slug, name }));

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
  const router = useRouter();

  const product =
    PRODUCTS_DATA.find(
      (prod) => prod.slug === params.productSlug && prod.categorySlug === params.categorySlug
    ) || PRODUCTS_DATA.find((prod) => prod.slug === params.productSlug);

  const categoryProducts = useMemo(
    () => PRODUCTS_DATA.filter((p) => p.categorySlug === product?.categorySlug),
    [product?.categorySlug]
  );

  const galleryImages = useMemo(
    () => [
      { src: product?.image || "", alt: product?.name || "" },
      { src: "/products/gallery/detail-1.png", alt: `${product?.name || "Product"} detail 1` },
      { src: "/products/gallery/detail-2.png", alt: `${product?.name || "Product"} detail 2` },
      { src: "/products/gallery/detail-3.png", alt: `${product?.name || "Product"} detail 3` },
      { src: "/products/gallery/detail-4.png", alt: `${product?.name || "Product"} detail 4` },
    ],
    [product?.image, product?.name]
  );

  const [activeImage, setActiveImage] = useState(0);

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
            {/* Product sub-navigation */}
            <div className="sticky top-16 z-30 w-full border-b border-[#D8C7B3]/25 bg-[#061C18] lg:top-20">
              <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2 px-6 py-2.5 sm:px-10 lg:px-14">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="Go back"
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#D8C7B3]/25 text-[#C2B69D] transition-colors hover:border-[#D4AF37] hover:bg-[#0A2621] hover:text-[#D4AF37]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <Link
                    href="/"
                    aria-label="Back to home"
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#D8C7B3]/25 text-[#C2B69D] transition-colors hover:border-[#D4AF37] hover:bg-[#0A2621] hover:text-[#D4AF37]"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                </div>

                <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 sm:flex-none">
                  <label className="relative min-w-[136px] flex-1 sm:w-[220px] sm:flex-none">
                    <span className="sr-only">Category</span>
                    <select
                      value={product.categorySlug}
                      onChange={(e) => router.push(`/products/${e.target.value}`)}
                      className="h-9 w-full appearance-none truncate border border-[#D8C7B3]/25 bg-[#061C18] pl-3 pr-8 text-xs text-[#EDE4D8] outline-none transition-colors [color-scheme:dark] hover:border-[#D4AF37]/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25"
                    >
                      {PRODUCT_CATEGORIES.map((category) => (
                        <option
                          key={category.slug}
                          value={category.slug}
                          className="bg-[#061C18] text-[#EDE4D8]"
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#C2B69D]" />
                  </label>

                  <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-[#D4AF37]/50 sm:block" />

                  <label className="relative min-w-[136px] flex-1 sm:w-[220px] sm:flex-none">
                    <span className="sr-only">Product</span>
                    <select
                      value={product.slug}
                      onChange={(e) =>
                        router.push(`/products/${product.categorySlug}/${e.target.value}`)
                      }
                      className="h-9 w-full appearance-none truncate border border-[#D8C7B3]/25 bg-[#061C18] pl-3 pr-8 text-xs text-[#EDE4D8] outline-none transition-colors [color-scheme:dark] hover:border-[#D4AF37]/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25"
                    >
                      {categoryProducts.map((item) => (
                        <option
                          key={item.id}
                          value={item.slug}
                          className="bg-[#061C18] text-[#EDE4D8]"
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#C2B69D]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Hero */}
            <section className="mx-auto w-full max-w-[1180px] px-6 pb-14 pt-10 sm:px-10 sm:pt-14 lg:px-14">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Packshot gallery */}
                <div className="self-start lg:sticky lg:top-36 lg:col-span-5">
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden border border-[#D6C5B3]/40 sm:aspect-[4/3] lg:aspect-[4/5]"
                    style={{
                      background: product.stageBg
                        ? `linear-gradient(160deg, #F8F4EE 0%, ${product.stageBg}66 100%)`
                        : "#F3EEE6",
                    }}
                  >
                    {galleryImages[activeImage].src && (
                      <Image
                        src={galleryImages[activeImage].src}
                        alt={galleryImages[activeImage].alt}
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

                  {/* Thumbnails */}
                  <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
                    {galleryImages.map((image, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImage(idx)}
                        aria-label={`View image ${idx + 1}`}
                        aria-current={activeImage === idx}
                        className={`relative aspect-square overflow-hidden border bg-[#F3EEE6] transition-colors ${
                          activeImage === idx
                            ? "border-[#D4AF37]"
                            : "border-[#D6C5B3]/40 hover:border-[#D4AF37]/60"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          className="object-contain p-1.5"
                          sizes="(max-width: 1024px) 18vw, 96px"
                        />
                      </button>
                    ))}
                  </div>
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

                  {product.features.length > 0 && (
                    <div className="mt-8 max-w-xl">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        {product.features.map((feat, idx) => {
                          const commonImage = product.highlightImages?.[idx];
                          const icon = commonImage || highlightIconFor(feat);
                          return (
                            <div key={idx} className="flex flex-col items-center gap-3 text-center">
                              {icon && (
                                <Image
                                  src={icon}
                                  alt=""
                                  width={80}
                                  height={80}
                                  className={`h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20 ${
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
              <section className="mx-auto w-full max-w-[1180px] px-6 pb-4 sm:px-10 lg:px-14">
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

                <div className="grid grid-cols-2 gap-5 pt-9 pb-3 sm:gap-6 lg:grid-cols-4">
                  {similarProducts.map((item) => (
                    <article
                      key={item.id}
                      className="group flex flex-col rounded-[3px] bg-[#D8C5B3] shadow-[0_18px_40px_-28px_rgba(6,28,24,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E3D5C4] hover:shadow-[0_26px_54px_-26px_rgba(187,160,133,0.55)]"
                    >
                      <div
                        className="relative aspect-square overflow-hidden rounded-t-[3px]"
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

                        {item.warranty && (
                          <p className="mt-1.5 text-[0.75rem] leading-snug text-[#061C18]/70">
                            {item.warranty} warranty
                          </p>
                        )}

                        <Link
                          href={`/products/${item.categorySlug}/${item.slug}`}
                          className="mt-5 inline-flex items-center gap-2 text-[0.75rem] font-bold text-[#061C18] transition-colors hover:text-[#8A6A12]"
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

            <ToolsSupportTabs toolType="calculator" compact />

            <PaintingServiceQueryBanner sourceContext={`product_${product.slug}`} />
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
