"use client";

import React, { useState, useMemo } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import ChatbotWidget from "@/components/ChatbotWidget";
import CookieConsent from "@/components/CookieConsent";
import { SNOWCEM_DEALERS, Dealer } from "@/data/dealerData";
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
} from "lucide-react";

export default function FindDealerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique states
  const availableStates = useMemo(() => {
    const states = new Set(SNOWCEM_DEALERS.map((d) => d.state));
    return ["All", ...Array.from(states).sort()];
  }, []);

  // Extract unique cities based on selected state
  const availableCities = useMemo(() => {
    let dealers = SNOWCEM_DEALERS;
    if (selectedState !== "All") {
      dealers = dealers.filter((d) => d.state === selectedState);
    }
    const cities = new Set(dealers.map((d) => d.city));
    return ["All", ...Array.from(cities).sort()];
  }, [selectedState]);

  // Filtered dealers
  const filteredDealers = useMemo(() => {
    return SNOWCEM_DEALERS.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.phone.includes(q);

      const matchesState = selectedState === "All" || d.state === selectedState;
      const matchesCity = selectedCity === "All" || d.city === selectedCity;

      return matchesQuery && matchesState && matchesCity;
    });
  }, [searchQuery, selectedState, selectedCity]);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedState("All");
    setSelectedCity("All");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* HERO BANNER SECTION */}
        <section className="bg-white py-8 sm:py-12 md:py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-2">
                Find Your Nearest Authorized Snowcem Dealer
              </h1>

              <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Connect with official stockists for authentic exterior emulsions, waterproof cement paints, shade cards, and expert color consultation.
              </p>

              {/* Quick Feature Badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-700">
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Genuine Stockists
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Live Shade Samples
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  15+ Verified Locations
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER CONTROLS BAR */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 md:p-6 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Bar Input */}
              <div className="md:col-span-6 relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Search Dealer / Area / Landmark
                </label>
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by store name, street, city, state, or phone..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 rounded-full px-2 py-0.5"
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
                  }}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all cursor-pointer font-medium"
                >
                  <option value="All">All States ({availableStates.length - 1})</option>
                  {availableStates.filter((s) => s !== "All").map((state) => (
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
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-snowcem-navy focus:border-transparent transition-all cursor-pointer font-medium"
                >
                  <option value="All">All Cities / Regions</option>
                  {availableCities.filter((c) => c !== "All").map((city) => (
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
                <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md">
                  {filteredDealers.length} {filteredDealers.length === 1 ? "Dealer" : "Dealers"} Found
                </span>
                {(searchQuery || selectedState !== "All" || selectedCity !== "All") && (
                  <button
                    onClick={handleResetFilters}
                    className="text-snowcem-orange font-bold hover:underline flex items-center gap-1 ml-2"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DEALER LISTINGS SECTION */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDealers.length === 0 ? (
            /* EMPTY STATE */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 text-snowcem-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Dealers Found</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                We couldn&apos;t find any authorized stockist matching your current search or filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-snowcem-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-md"
              >
                Show All Dealers ({SNOWCEM_DEALERS.length})
              </button>
            </div>
          ) : (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredDealers.map((dealer) => (
                <DealerGridCard
                  key={dealer.id}
                  dealer={dealer}
                  copiedId={copiedId}
                  onCopy={handleCopyAddress}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Utilities & Footer */}
      <ChatbotWidget />
      <CookieConsent />
      <Footer />
    </div>
  );
}

/* DEALER CARD COMPONENT WITH LIVE MAP EMBED */
function DealerGridCard({
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

  const cleanPhone = dealer.phone.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=Hello%20${encodeURIComponent(
    dealer.name
  )},%20I%20am%20inquiring%20about%20Snowcem%20Paints%20availability.`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-snowcem-orange/80 transition-all duration-300 shadow-xs hover:shadow-xl overflow-hidden flex flex-col justify-between group w-full">
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
      </div>

      {/* 2. Card Content Body */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Top Title & Stockist Badge */}
          <div className="flex items-start justify-between gap-2.5 mb-3">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-snowcem-navy transition-colors">
              {dealer.name}
            </h3>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Stockist
            </span>
          </div>

          {/* Address Box */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3 relative">
            <p className="text-xs text-slate-600 font-medium leading-relaxed flex items-start gap-2 pr-6">
              <MapPin className="w-4 h-4 text-snowcem-orange shrink-0 mt-0.5" />
              <span className="break-words">{dealer.address}</span>
            </p>

            <button
              onClick={() => onCopy(dealer.id, `${dealer.name}, ${dealer.address}`)}
              className="absolute right-2 top-2 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              title="Copy address"
            >
              {copiedId === dealer.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Region & Phone Info Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {dealer.city}, {dealer.state}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {dealer.phone}
            </span>
          </div>
        </div>

        {/* 3. Action Buttons Footer */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 w-full">
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center min-w-0"
            title="Call Dealer"
          >
            <Phone className="w-3.5 h-3.5 text-snowcem-navy shrink-0" />
            <span className="hidden sm:inline truncate">Call</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 text-xs font-bold transition-all text-center min-w-0"
            title="WhatsApp Inquiry"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline truncate">WhatsApp</span>
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-snowcem-orange border border-orange-200/80 text-xs font-bold transition-all text-center min-w-0"
            title="Get Directions"
          >
            <Navigation className="w-3.5 h-3.5 text-snowcem-orange shrink-0" />
            <span className="hidden sm:inline truncate">Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}


