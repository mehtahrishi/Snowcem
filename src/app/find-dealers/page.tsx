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
  Sparkles,
  Star,
  ExternalLink,
  ShieldCheck,
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

  // Progressive pagination limit (default 48 to ensure instant render, with "Show All" toggle)
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

  // Available states from dealer records
  const availableStates = useMemo(() => {
    const states = new Set(dealers.map((d) => d.state).filter(Boolean));
    return ["All", ...Array.from(states).sort()];
  }, [dealers]);

  // Available cities based on selected state
  const availableCities = useMemo(() => {
    let list = dealers;
    if (selectedState !== "All") {
      list = list.filter((d) => d.state === selectedState);
    }
    const cities = new Set(list.map((d) => d.city).filter(Boolean));
    return ["All", ...Array.from(cities).sort()];
  }, [dealers, selectedState]);

  // Filtered dealers
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

      {/* Header */}
      <div className="sticky top-0 z-40 bg-canvas">
        <Header />
      </div>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-canvas py-10 sm:py-14 md:py-16 border-b border-[#E5DDD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D6C2B4] shadow-xs text-xs font-bold text-[#0D1B3E] mb-4">
              <Store size={14} className="text-[#f36c21]" />
              <span>Official Retail &amp; Stockist Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight bg-gradient-to-r from-[#5B6BB5] via-[#DF3F6F] to-[#f36c21] bg-clip-text text-transparent leading-tight pb-2">
              Find Authorized Snowcem Dealers Near You
            </h1>

            <p className="mt-3.5 text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Connect with verified stockists for genuine Snowcem exterior emulsions, waterproof cement paints, computerized tinting shade cards, and technical advice.
            </p>

            {/* Quick Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#E0D7CE] px-3 py-1.5 rounded-xl shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Genuine Paint Guarantee
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#E0D7CE] px-3 py-1.5 rounded-xl shadow-2xs">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Instant Computerized Tinting
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#E0D7CE] px-3 py-1.5 rounded-xl shadow-2xs">
                <Building2 className="w-4 h-4 text-sky-600" />
                Pan-India Network
              </span>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER CONTROLS */}
        <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 md:p-6 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Bar Input */}
              <div className="md:col-span-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Search Dealer / Store / Area / PIN
                </label>
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setDisplayLimit(48);
                    }}
                    placeholder="Search by store name, customer code, city, street, or phone..."
                    className="w-full bg-[#FAF8F5] border border-slate-200 text-slate-900 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21] transition-all placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 rounded-full px-2 py-0.5 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* State Select Dropdown */}
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Filter State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity("All");
                    setDisplayLimit(48);
                  }}
                  className="w-full bg-[#FAF8F5] border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21] transition-all cursor-pointer font-medium"
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

              {/* City Select Dropdown */}
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Filter City / Region
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setDisplayLimit(48);
                  }}
                  className="w-full bg-[#FAF8F5] border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21] transition-all cursor-pointer font-medium"
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

            {/* Filter Summary */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-900 font-bold px-3 py-1 rounded-lg">
                  {filteredDealers.length} {filteredDealers.length === 1 ? "Dealer" : "Dealers"} Found
                </span>
                {(searchQuery || selectedState !== "All" || selectedCity !== "All") && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[#f36c21] font-bold hover:underline flex items-center gap-1 ml-2 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DEALERS LISTINGS */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDealers.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 text-[#f36c21] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Dealers Found</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                We couldn&apos;t find any authorized stockist matching your current search or filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#0D1B3E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
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

              {/* Load More & Show All Controls */}
              {filteredDealers.length > displayLimit ? (
                <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 48)}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-slate-300 hover:border-[#5B6BB5] text-slate-800 font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Load More Dealers</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                      +{Math.min(48, filteredDealers.length - displayLimit)}
                    </span>
                  </button>
                  <button
                    onClick={() => setDisplayLimit(filteredDealers.length)}
                    className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Show All ({filteredDealers.length}) Dealers
                  </button>
                </div>
              ) : filteredDealers.length > 48 ? (
                <div className="mt-10 text-center text-xs text-slate-500 font-semibold tracking-wide">
                  ✓ Showing all {filteredDealers.length} authorized dealers across India
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

/* PREMIUM DEALER CARD FOR CUSTOMERS */
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
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#5B6BB5]/70 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between group w-full">
      {/* 1. Live Google Map Header Embed */}
      <div className="w-full h-44 sm:h-48 bg-slate-100 relative border-b border-slate-100 overflow-hidden">
        <iframe
          title={`Map for ${dealer.name}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={embedMapUrl}
          loading="lazy"
          className="w-full h-full border-0"
        />
        {dealer.featured && (
          <span className="absolute top-3 left-3 bg-[#0D1B3E] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Featured Stockist
          </span>
        )}
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Top Title & Badges */}
          <div className="flex items-start justify-between gap-2.5 mb-2.5">
            <div>
              <h3 className="font-extrabold text-[#0D1B3E] text-base sm:text-lg leading-snug group-hover:text-[#5B6BB5] transition-colors font-heading">
                {dealer.name}
              </h3>
              <div className="flex items-center space-x-1.5 mt-1">
                <div className="flex items-center text-amber-500">
                  <Star size={13} className="fill-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-800">{dealer.rating || "4.8"}</span>
                <span className="text-slate-400 text-xs">&bull;</span>
                <span className="text-[11px] text-slate-500 font-medium">Authorized Stockist</span>
              </div>
            </div>

            <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Stockist
            </span>
          </div>

          {/* Customer Code if present */}
          {dealer.customerCode && (
            <div className="mb-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
              <Hash size={11} className="text-slate-400" />
              <span>Dealer Code: <strong className="text-slate-700">{dealer.customerCode}</strong></span>
            </div>
          )}

          {/* Full Address Box with Quick Copy */}
          <div className="bg-[#FAF8F5] rounded-2xl p-3.5 border border-[#EFE9E2] mb-3 relative">
            <p className="text-xs text-slate-700 font-medium leading-relaxed flex items-start gap-2 pr-6">
              <MapPin className="w-4 h-4 text-[#f36c21] shrink-0 mt-0.5" />
              <span className="break-words">{dealer.address}</span>
            </p>

            <button
              onClick={() => onCopy(dealer.id, `${dealer.name}, ${dealer.address}`)}
              className="absolute right-2 top-2 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Copy address"
            >
              {copiedId === dealer.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Region, Pincode & Direct Phone Info Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              {dealer.city}, {dealer.state}
            </span>
            {dealer.pincode && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px]">
                PIN: {dealer.pincode}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 font-mono font-bold text-xs">
              <Phone className="w-3 h-3 text-[#f36c21]" />
              {dealer.phone}
            </span>
          </div>
        </div>

        {/* 3. Action Buttons Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 w-full">
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center min-w-0 cursor-pointer"
            title="Call Dealer"
          >
            <Phone className="w-3.5 h-3.5 text-[#0D1B3E] shrink-0" />
            <span>Call</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all text-center min-w-0 cursor-pointer"
            title="WhatsApp Inquiry"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>WhatsApp</span>
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#f36c21] border border-orange-200 text-xs font-bold transition-all text-center min-w-0 cursor-pointer"
            title="Get Directions"
          >
            <Navigation className="w-3.5 h-3.5 text-[#f36c21] shrink-0" />
            <span>Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
