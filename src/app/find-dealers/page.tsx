"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  MapPin,
  Search,
  Phone,
  Navigation,
  Store,
  MessageCircle,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  SlidersHorizontal,
  Star,
  Hash,
} from "lucide-react";

interface Dealer {
  id: string;
  customerCode?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  pincode?: string;
  landmark?: string;
  rating?: string | number;
  featured?: boolean;
}

export default function FindDealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [displayLimit, setDisplayLimit] = useState(48);

  useEffect(() => {
    async function loadDealers() {
      setLoading(true);
      try {
        const res = await fetch("/api/dealers");
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setDealers(json.data);
        }
      } catch (err) {
        console.error("Failed to load dealers:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDealers();
  }, []);

  const availableStates = useMemo(() => {
    const states = new Set(dealers.map((d) => d.state).filter(Boolean));
    return ["All", ...Array.from(states).sort()];
  }, [dealers]);

  const availableCities = useMemo(() => {
    let list = dealers;
    if (selectedState !== "All") {
      list = list.filter((d) => d.state === selectedState);
    }
    const cities = new Set(list.map((d) => d.city).filter(Boolean));
    return ["All", ...Array.from(cities).sort()];
  }, [dealers, selectedState]);

  const filteredDealers = useMemo(() => {
    return dealers.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        (d.customerCode && d.customerCode.toLowerCase().includes(q)) ||
        d.address.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        (d.pincode && d.pincode.includes(q)) ||
        d.phone.includes(q);

      const matchesState = selectedState === "All" || d.state === selectedState;
      const matchesCity = selectedCity === "All" || d.city === selectedCity;

      return matchesQuery && matchesState && matchesCity;
    });
  }, [dealers, searchQuery, selectedState, selectedCity]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
        <h1 className="sr-only">Find Authorized Snowcem Dealers Near You</h1>
        <img
          src="/dealer/image.png"
          alt="Find a Snowcem Paints Dealer Near You"
          width={2038}
          height={771}
          className="block h-auto w-full"
        />

        {/* SEARCH & FILTER */}
        <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0A2621] p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-6">
                <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#EDE4D8]">
                  Search Dealer / Store / Area / PIN
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
                    placeholder="Store name, customer code, city, phone..."
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
              <span className="rounded-lg bg-[#D4AF37]/15 px-3 py-1 font-bold text-[#D4AF37]">
                {filteredDealers.length} {filteredDealers.length === 1 ? "Dealer" : "Dealers"} Found
              </span>
              {(searchQuery || selectedState !== "All" || selectedCity !== "All") && (
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
          {filteredDealers.length === 0 ? (
            <div className="mx-auto my-8 max-w-md rounded-2xl bg-[#0A2621] p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/15">
                <Store className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">No Dealers Found</h3>
              <p className="mb-6 text-sm leading-relaxed text-[#C2B69D]">
                We couldn&apos;t find any authorized stockist matching your search or filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-6 py-2.5 text-sm font-bold text-[#061C18] transition hover:brightness-110 cursor-pointer"
              >
                Show All Dealers
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDealers.slice(0, displayLimit).map((dealer) => (
                  <DealerCard
                    key={dealer.id}
                    dealer={dealer}
                    copiedId={copiedId}
                    onCopy={handleCopy}
                  />
                ))}
              </div>

              {filteredDealers.length > displayLimit ? (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 48)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8C5B3]/25 px-6 py-3 text-sm font-bold text-[#D8C5B3] transition hover:border-[#D4AF37] hover:text-[#D4AF37] cursor-pointer"
                  >
                    <span>Load More Dealers</span>
                    <span className="rounded-full bg-[#D8C5B3]/10 px-2 py-0.5 font-mono text-xs text-[#C2B69D]">
                      +{Math.min(48, filteredDealers.length - displayLimit)}
                    </span>
                  </button>
                  <button
                    onClick={() => setDisplayLimit(filteredDealers.length)}
                    className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-7 py-3 text-sm font-bold text-[#061C18] transition hover:brightness-110 cursor-pointer"
                  >
                    Show All ({filteredDealers.length}) Dealers
                  </button>
                </div>
              ) : filteredDealers.length > 48 ? (
                <div className="mt-10 text-center text-xs font-semibold tracking-wide text-[#C2B69D]">
                  Showing all {filteredDealers.length} authorized dealers across India
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

function DealerCard({
  dealer,
  copiedId,
  onCopy,
}: {
  dealer: Dealer;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${dealer.name}, ${dealer.address}`
  )}`;

  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${dealer.name}, ${dealer.address}`
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  const cleanPhone = dealer.phone ? dealer.phone.replace(/\s+/g, "") : "";
  const whatsappUrl = `https://wa.me/${cleanPhone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
    dealer.name
  )},%20I%20am%20inquiring%20about%20Snowcem%20Paints%20availability.`;

  return (
    <div className="flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#0A2621] transition-shadow duration-300 hover:shadow-xl hover:shadow-black/20 group">
      <div className="relative h-44 border-b border-[#D8C5B3]/10 sm:h-48">
        <iframe
          title={`Map for ${dealer.name}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={embedMapUrl}
          loading="lazy"
          className="h-full w-full"
        />
        {dealer.featured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#D4AF37] px-2.5 py-1 text-[10px] font-bold text-[#061C18] shadow-md">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-grow flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="mb-2.5 flex items-start justify-between gap-2.5">
            <div>
              <h3 className="font-heading text-base font-extrabold leading-snug text-white sm:text-lg">
                {dealer.name}
              </h3>
              <div className="mt-1 flex items-center gap-1.5">
                {dealer.rating && (
                  <>
                    <Star size={13} className="fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="text-xs font-bold text-white">{dealer.rating}</span>
                    <span className="text-xs text-[#C2B69D]/50">&bull;</span>
                  </>
                )}
                <span className="text-[11px] font-medium text-[#C2B69D]">Authorized Stockist</span>
              </div>
            </div>

            <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37]">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </span>
          </div>

          {dealer.customerCode && (
            <div className="mb-2 flex items-center gap-1 font-mono text-[10px] text-[#C2B69D]">
              <Hash size={11} className="text-[#C2B69D]/60" />
              <span>Code: <strong className="text-[#D8C5B3]">{dealer.customerCode}</strong></span>
            </div>
          )}

          <div className="relative mb-3 rounded-xl bg-[#061C18] p-3.5">
            <p className="flex items-start gap-2 break-words pr-6 text-xs font-medium leading-relaxed text-[#D8C5B3]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <span>{dealer.address}</span>
            </p>
            <button
              onClick={() => onCopy(dealer.id, `${dealer.name}, ${dealer.address}`)}
              className="absolute right-2 top-2 rounded-md p-1.5 text-[#C2B69D]/50 hover:text-[#D4AF37] cursor-pointer"
              title="Copy address"
            >
              {copiedId === dealer.id ? (
                <Check className="h-3.5 w-3.5 text-[#D4AF37]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#C2B69D]">
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#D8C5B3]/10 px-2.5 py-1 font-medium text-[#D8C5B3]">
              <Building2 className="h-3.5 w-3.5" />
              {dealer.city}, {dealer.state}
            </span>
            {dealer.pincode && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-[#D8C5B3]/10 px-2 py-1 font-mono text-[11px]">
                PIN: {dealer.pincode}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#D4AF37]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#D4AF37]">
              <Phone className="h-3 w-3" />
              {dealer.phone}
            </span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-2 border-t border-[#D8C5B3]/10 pt-4">
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#D8C5B3]/10 px-2 py-2.5 text-center text-xs font-bold text-[#D8C5B3] transition hover:bg-[#D8C5B3]/20 cursor-pointer"
            title="Call Dealer"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>Call</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#D4AF37]/10 px-2 py-2.5 text-center text-xs font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/20 cursor-pointer"
            title="WhatsApp Inquiry"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" />
            <span>WhatsApp</span>
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-2 py-2.5 text-center text-xs font-bold text-[#061C18] transition hover:brightness-110 cursor-pointer"
            title="Get Directions"
          >
            <Navigation className="h-3.5 w-3.5 shrink-0" />
            <span>Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
