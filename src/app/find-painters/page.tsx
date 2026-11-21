"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  MapPin,
  Search,
  Paintbrush,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";

interface Painter {
  id: string;
  name: string;
  city: string;
  state: string;
  pincode?: string | null;
  verified?: boolean | null;
}

export default function FindPaintersPage() {
  const [painters, setPainters] = useState<Painter[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const [displayLimit, setDisplayLimit] = useState(48);

  useEffect(() => {
    async function loadPainters() {
      setLoading(true);
      try {
        const res = await fetch("/api/painters");
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setPainters(json.data);
        }
      } catch (err) {
        console.error("Failed to load painters:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPainters();
  }, []);

  const availableStates = useMemo(() => {
    const states = new Set(painters.map((p) => p.state).filter(Boolean));
    return ["All", ...Array.from(states).sort()];
  }, [painters]);

  const availableCities = useMemo(() => {
    let list = painters;
    if (selectedState !== "All") {
      list = list.filter((p) => p.state === selectedState);
    }
    const cities = new Set(list.map((p) => p.city).filter(Boolean));
    return ["All", ...Array.from(cities).sort()];
  }, [painters, selectedState]);

  const filteredPainters = useMemo(() => {
    return painters.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        (p.pincode && p.pincode.includes(q));

      const matchesState = selectedState === "All" || p.state === selectedState;
      const matchesCity = selectedCity === "All" || p.city === selectedCity;

      return matchesQuery && matchesState && matchesCity;
    });
  }, [painters, searchQuery, selectedState, selectedCity]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedState("All");
    setSelectedCity("All");
    setDisplayLimit(48);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        <h1 className="sr-only">Connect with Certified Snowcem Painters Near You</h1>
        <img
          src="/painter/image.png"
          alt="Find a Snowcem Painter Near You"
          width={2039}
          height={771}
          className="block h-auto w-full"
        />

        {/* SEARCH & FILTER */}
        <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0A2621] p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-6">
                <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#EDE4D8]">
                  Search Painter / Name / City / PIN
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C2B69D]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setDisplayLimit(48);
                    }}
                    placeholder="Painter name, city, state, PIN..."
                    className="w-full rounded-xl border border-[#D8C5B3]/25 bg-[#061C18] py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#C2B69D]/60 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/25 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#D8C5B3]/15 px-2 py-0.5 text-xs text-[#C2B69D] hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#EDE4D8]">
                  Filter State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity("All");
                    setDisplayLimit(48);
                  }}
                  className="w-full cursor-pointer rounded-xl border border-[#D8C5B3]/25 bg-[#061C18] px-3.5 py-3 text-sm font-medium text-white focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/25 transition-colors"
                >
                  <option value="All">All States ({availableStates.length - 1})</option>
                  {availableStates
                    .filter((s) => s !== "All")
                    .map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#EDE4D8]">
                  Filter City / Region
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setDisplayLimit(48);
                  }}
                  className="w-full cursor-pointer rounded-xl border border-[#D8C5B3]/25 bg-[#061C18] px-3.5 py-3 text-sm font-medium text-white focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/25 transition-colors"
                >
                  <option value="All">All Cities ({availableCities.length - 1})</option>
                  {availableCities
                    .filter((c) => c !== "All")
                    .map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-[#D8C5B3]/10 pt-4 text-xs text-[#C2B69D]">
              {loading ? (
                <span className="inline-block h-6 w-28 rounded-lg bg-[#D4AF37]/10 animate-pulse" />
              ) : (
                <span className="rounded-lg bg-[#D4AF37]/15 px-3 py-1 font-bold text-[#D4AF37]">
                  {filteredPainters.length} {filteredPainters.length === 1 ? "Painter" : "Painters"} Found
                </span>
              )}
              {!loading && (searchQuery || selectedState !== "All" || selectedCity !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="ml-2 flex items-center gap-1 font-bold text-[#D4AF37] hover:text-[#F3E5AB] cursor-pointer"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* LISTINGS */}
        <section className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-6">
                  <PainterCardSkeleton />
                </div>
              ))}
            </div>
          ) : filteredPainters.length === 0 ? (
            <div className="mx-auto my-8 max-w-md rounded-2xl bg-[#0A2621] p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/15">
                <Paintbrush className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">No Painters Found</h3>
              <p className="mb-6 text-sm leading-relaxed text-[#C2B69D]">
                No certified painters match your current location or filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-6 py-2.5 text-sm font-bold text-[#061C18] transition hover:brightness-110 cursor-pointer"
              >
                Show All Painters ({painters.length})
              </button>
            </div>
          ) : (
            <div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                {filteredPainters.slice(0, displayLimit).map((painter) => (
                  <div key={painter.id} className="break-inside-avoid mb-6">
                    <PainterCard painter={painter} />
                  </div>
                ))}
              </div>

              {filteredPainters.length > displayLimit ? (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 48)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8C5B3]/25 px-6 py-3 text-sm font-bold text-[#D8C5B3] transition hover:border-[#D4AF37] hover:text-[#D4AF37] cursor-pointer"
                  >
                    <span>Load More (+48 Painters)</span>
                    <span className="rounded-full bg-[#D8C5B3]/10 px-2 py-0.5 font-mono text-xs text-[#C2B69D]">
                      {filteredPainters.length - displayLimit} remaining
                    </span>
                  </button>
                  <button
                    onClick={() => setDisplayLimit(filteredPainters.length)}
                    className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-7 py-3 text-sm font-bold text-[#061C18] transition hover:brightness-110 cursor-pointer"
                  >
                    Show All ({filteredPainters.length}) Certified Painters
                  </button>
                </div>
              ) : filteredPainters.length > 48 ? (
                <div className="mt-10 text-center text-xs font-semibold tracking-wide text-[#C2B69D]">
                  Showing all {filteredPainters.length} certified painters across India
                </div>
              ) : null}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PainterCard({ painter }: { painter: Painter }) {
  return (
    <div className="w-full rounded-2xl border border-[#D8C5B3]/10 bg-[#0A2621] p-5 transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-xl hover:shadow-black/25">
      {/* Header */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-base font-extrabold leading-snug text-white sm:text-lg">
            {painter.name}
          </h3>
          <p className="mt-1 text-[11px] font-medium text-[#C2B69D]">Certified Painter</p>
        </div>

        {painter.verified && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37]">
            <ShieldCheck size={12} />
            <span>Certified</span>
          </span>
        )}
      </div>

      {/* Location & PIN */}
      <div className="mt-3.5 flex items-center gap-2 text-xs text-[#D8C5B3]">
        <MapPin size={14} className="shrink-0 text-[#D4AF37]" />
        <span>
          {painter.city}, {painter.state}
          {painter.pincode && (
            <span className="ml-1.5 font-mono text-[11px] text-[#C2B69D]/70">
              (PIN: {painter.pincode})
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function PainterCardSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-[#D8C5B3]/10 bg-[#0A2621] p-5 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-40 rounded-md bg-white/10" />
          <div className="h-3 w-24 rounded bg-white/5" />
        </div>
        <div className="h-5 w-16 rounded-full bg-white/10" />
      </div>

      {/* Location Skeleton */}
      <div className="mt-4">
        <div className="h-3.5 w-3/4 rounded bg-white/5" />
      </div>
    </div>
  );
}
