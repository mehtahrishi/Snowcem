"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  MapPin,
  Search,
  Phone,
  Paintbrush,
  MessageCircle,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  SlidersHorizontal,
  Sparkles,
  Star,
  ShieldCheck,
  Briefcase,
  UserCheck,
} from "lucide-react";

interface Painter {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  pincode?: string;
  experienceYears?: number;
  specialization?: string;
  rating?: string | number;
  status?: string;
  verified?: boolean;
}

export default function FindPaintersPage() {
  const [painters, setPainters] = useState<Painter[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Progressive pagination limit (default 48 to ensure instant initial render, with "Show All" toggle)
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

  // Available states from painter records
  const availableStates = useMemo(() => {
    const states = new Set(painters.map((p) => p.state).filter(Boolean));
    return ["All", ...Array.from(states).sort()];
  }, [painters]);

  // Available cities based on selected state
  const availableCities = useMemo(() => {
    let list = painters;
    if (selectedState !== "All") {
      list = list.filter((p) => p.state === selectedState);
    }
    const cities = new Set(list.map((p) => p.city).filter(Boolean));
    return ["All", ...Array.from(cities).sort()];
  }, [painters, selectedState]);

  // Filtered painters
  const filteredPainters = useMemo(() => {
    return painters.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        (p.pincode && p.pincode.includes(q)) ||
        (p.specialization && p.specialization.toLowerCase().includes(q)) ||
        p.phone.includes(q);

      const matchesState = selectedState === "All" || p.state === selectedState;
      const matchesCity = selectedCity === "All" || p.city === selectedCity;

      return matchesQuery && matchesState && matchesCity;
    });
  }, [painters, searchQuery, selectedState, selectedCity]);

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
              <Paintbrush size={14} className="text-[#f36c21]" />
              <span>Certified Painting Contractors &amp; Specialists</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight bg-gradient-to-r from-[#f36c21] via-[#DF3F6F] to-[#5B6BB5] bg-clip-text text-transparent leading-tight pb-2">
              Connect with Certified Snowcem Painters Near You
            </h1>

            <p className="mt-3.5 text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Find verified painting contractors trained in genuine Snowcem emulsions, exterior textures, waterproofing barriers, and long-lasting wall systems.
            </p>

            {/* Quick Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#E0D7CE] px-3 py-1.5 rounded-xl shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified &amp; Certified Contractors
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#E0D7CE] px-3 py-1.5 rounded-xl shadow-2xs">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Application &amp; Texture Specialists
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#E0D7CE] px-3 py-1.5 rounded-xl shadow-2xs">
                <UserCheck className="w-4 h-4 text-sky-600" />
                Direct Contact &amp; WhatsApp Quotes
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
                  Search Painter / Name / City / PIN / Phone
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
                    placeholder="Search by painter name, city, state, postal code, skill..."
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
                  {filteredPainters.length} {filteredPainters.length === 1 ? "Painter" : "Painters"} Found
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

        {/* PAINTERS LISTINGS */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPainters.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Paintbrush className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Painters Found</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                No certified painters match your current location or filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#0D1B3E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
              >
                Show All Painters ({painters.length})
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPainters.slice(0, displayLimit).map((painter) => (
                  <PainterCard
                    key={painter.id}
                    painter={painter}
                    copiedId={copiedId}
                    onCopy={handleCopy}
                  />
                ))}
              </div>

              {/* Load More & Show All Controls */}
              {filteredPainters.length > displayLimit ? (
                <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 48)}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-slate-300 hover:border-[#f36c21] text-slate-800 hover:text-[#f36c21] font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Load More (+48 Painters)</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                      {filteredPainters.length - displayLimit} remaining
                    </span>
                  </button>
                  <button
                    onClick={() => setDisplayLimit(filteredPainters.length)}
                    className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#f36c21] to-[#e05307] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Show All ({filteredPainters.length}) Certified Painters
                  </button>
                </div>
              ) : filteredPainters.length > 48 ? (
                <div className="mt-10 text-center text-xs text-slate-500 font-semibold tracking-wide">
                  ✓ Showing all {filteredPainters.length} certified painters across India
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

/* PREMIUM PAINTER CARD FOR CUSTOMERS */
function PainterCard({
  painter,
  copiedId,
  onCopy,
}: {
  painter: Painter;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const cleanPhone = painter.phone ? painter.phone.replace(/[^0-9+]/g, "") : "";
  const formattedPhone = painter.phone.startsWith("+91")
    ? painter.phone
    : `+91 ${painter.phone}`;

  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=Hello%20${encodeURIComponent(
    painter.name
  )},%20I%20found%20your%20profile%20on%20the%20Snowcem%20Paints%20Certified%20Painter%20Directory%20and%20would%20like%20to%20inquire%20about%20painting%20services.`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#f36c21]/60 transition-all duration-300 shadow-sm hover:shadow-xl p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        {/* Top Header: Painter Name & Rating */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-extrabold text-[#0D1B3E] text-lg font-heading group-hover:text-[#f36c21] transition-colors leading-snug">
              {painter.name}
            </h3>
            <div className="flex items-center space-x-1.5 mt-1">
              <div className="flex items-center text-amber-500">
                <Star size={13} className="fill-amber-400" />
              </div>
              <span className="text-xs font-bold text-slate-800">{painter.rating || "4.8"}</span>
              <span className="text-slate-400 text-xs">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Rated Specialist</span>
            </div>
          </div>

          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold shrink-0">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>{painter.verified ? "Certified Specialist" : "Verified Painter"}</span>
          </span>
        </div>

        {/* Location & Pincode Box */}
        <div className="bg-[#FAF8F5] rounded-2xl p-3.5 border border-[#EFE9E2] mb-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
            <MapPin size={14} className="text-[#f36c21] shrink-0" />
            <span>{painter.city}, {painter.state}</span>
          </div>
          {painter.pincode && (
            <div className="text-[11px] text-slate-500 font-mono mt-1.5 ml-5 flex items-center gap-1.5">
              <span>PIN Code:</span>
              <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {painter.pincode}
              </span>
            </div>
          )}
        </div>

        {/* Direct Phone Number Pill with 1-Click Copy */}
        <div className="mb-3.5 flex items-center justify-between bg-orange-50/70 border border-orange-200/80 rounded-xl px-3 py-2 text-xs">
          <div className="flex items-center space-x-2">
            <Phone size={13} className="text-[#f36c21]" />
            <span className="font-mono font-bold text-slate-800 tracking-wide">
              {formattedPhone}
            </span>
          </div>
          <button
            onClick={() => onCopy(painter.id, painter.phone)}
            className="text-[11px] font-semibold text-orange-700 hover:text-orange-900 bg-orange-100 hover:bg-orange-200 px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            title="Copy Phone Number"
          >
            {copiedId === painter.id ? (
              <>
                <Check size={11} className="text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Specialization & Experience */}
        <div className="space-y-1.5 mb-5 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Paintbrush size={14} className="text-[#5B6BB5] shrink-0" />
            <span className="font-medium text-slate-800">
              {painter.specialization || "Exterior Textures & Emulsions"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-slate-500">
            <Briefcase size={14} className="text-slate-400 shrink-0" />
            <span>{painter.experienceYears || 3} Years Professional Experience</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Direct Call & WhatsApp */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all text-center cursor-pointer"
        >
          <Phone size={14} className="text-[#0D1B3E]" />
          <span>Call Now</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all text-center cursor-pointer"
        >
          <MessageCircle size={14} />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
