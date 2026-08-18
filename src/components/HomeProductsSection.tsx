import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_DATA } from "@/data/productsData";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomeProductsSection() {
  return (
    <section className="py-6 bg-white overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Swipeable Track (4 items in view on Desktop) */}
        <div className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto py-4 px-1 scroll-smooth snap-x snap-mandatory no-scrollbar">
          {PRODUCTS_DATA.map((prod) => (
            <div
              key={prod.id}
              className="w-[260px] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2*1.5rem)/3)] lg:w-[calc((100%-3*1.5rem)/4)] shrink-0 snap-start bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Product Image Stage */}
                <div
                  className="relative w-full h-44 sm:h-48 border-b border-slate-100 flex items-center justify-center p-5 transition-colors duration-500"
                  style={
                    prod.stageBg
                      ? {
                        background: `linear-gradient(135deg, ${prod.stageBg}cc 0%, ${prod.stageBg}99 50%, ${prod.stageBg}cc 100%)`,
                      }
                      : {
                        background:
                          "linear-gradient(to bottom, #f8fafc, #f1f5f9, #f8fafc)",
                      }
                  }
                >
                  {prod.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Sparkles className="w-7 h-7 opacity-40 mb-1.5" />
                      <span className="text-[11px] font-semibold">Snowcem Quality</span>
                    </div>
                  )}
                </div>

                {/* Product Info Details Container */}
                <div className="p-4 sm:p-5 pb-2 space-y-2">
                  {/* Category Name */}
                  <div>
                    <span className="inline-block text-[10px] font-heading font-extrabold text-slate-700 uppercase tracking-wide bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                      {prod.categoryName}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-heading group-hover:bg-gradient-to-r group-hover:from-[#2a1b92] group-hover:via-[#5c249c] group-hover:to-[#e91e63] group-hover:bg-clip-text group-hover:text-transparent transition-colors line-clamp-1">
                    {prod.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {prod.tagline}
                  </p>
                </div>
              </div>

              {/* Read More Link Below It */}
              <div className="px-4 sm:px-5 pb-4 pt-1">
                <Link
                  href={`/products/${prod.categorySlug}/${prod.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-slate-900 group-hover:text-[#5c249c] transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-slate-300 group-hover:decoration-[#5c249c]">Read more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
