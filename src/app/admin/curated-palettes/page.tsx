"use client";

import React, { useEffect, useState } from "react";
import { SlidersHorizontal, Plus, Trash2, Search } from "lucide-react";

interface CuratedRow {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  hex: string;
  recommendedSurface: string | null;
  moodAndDescription: string | null;
  sortOrder: number;
}

export default function AdminCuratedPalettesPage() {
  const [shades, setShades] = useState<CuratedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    category: "Most Searched: Living Room",
    subcategory: "Warm Neutrals & Greiges",
    name: "",
    hex: "#",
    recommendedSurface: "Interior Accent Wall",
    moodAndDescription: "",
    sortOrder: "0",
  });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/curated-palettes?limit=300");
      const json = await res.json();
      setShades(Array.isArray(json?.data) ? json.data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/curated-palettes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        category: "Most Searched: Living Room",
        subcategory: "Warm Neutrals & Greiges",
        name: "",
        hex: "#",
        recommendedSurface: "Interior Accent Wall",
        moodAndDescription: "",
        sortOrder: "0",
      });
      load();
    } else {
      const err = await res.json();
      alert(err?.error || "Failed to add shade");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this curated shade?")) return;
    const res = await fetch(`/api/admin/curated-palettes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setShades((prev) => prev.filter((s) => s.id !== id));
    }
  }

  const filtered = shades.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.subcategory.toLowerCase().includes(search.toLowerCase()) ||
      s.hex.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#EDE4D8] flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-[#D4AF37]" />
            <span>Curated Color Decks &amp; Palettes</span>
          </h1>
          <p className="text-xs text-[#C2B69D] mt-1">
            Editorial room color palettes for living rooms, bedrooms, kitchens, and exteriors
          </p>
        </div>
        <span className="text-xs font-bold text-[#D4AF37] px-3 py-1 bg-[#D4AF37]/10 rounded-full">
          {shades.length} Shades in Database
        </span>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-[#0A2621] p-5 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-sm font-bold text-[#EDE4D8] uppercase tracking-wider">Add Curated Palette Shade</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            required
            placeholder="Room Category (e.g. Most Searched: Living Room) *"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            required
            placeholder="Subcategory / Mood (e.g. Warm Neutrals) *"
            value={form.subcategory}
            onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            required
            placeholder="Shade Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={form.hex.startsWith("#") && form.hex.length === 7 ? form.hex : "#C2B69D"}
              onChange={(e) => setForm({ ...form, hex: e.target.value.toUpperCase() })}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              required
              placeholder="#HEX *"
              value={form.hex}
              onChange={(e) => setForm({ ...form, hex: e.target.value })}
              className="flex-1 px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8] font-mono"
            />
          </div>
          <input
            placeholder="Recommended Surface"
            value={form.recommendedSurface}
            onChange={(e) => setForm({ ...form, recommendedSurface: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="Mood Description"
            value={form.moodAndDescription}
            onChange={(e) => setForm({ ...form, moodAndDescription: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            type="number"
            placeholder="Order (e.g. 1)"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#061C18] text-xs font-black hover:brightness-110 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Curated Decks</span>
        </button>
      </form>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C2B69D]" />
        <input
          type="text"
          placeholder="Search by shade name, hex, room category, mood..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#0A2621] border border-white/10 rounded-xl text-xs text-[#EDE4D8]"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.slice(0, 72).map((s) => (
          <div key={s.id} className="bg-[#0A2621] border border-white/10 rounded-xl overflow-hidden p-3 flex flex-col justify-between">
            <div>
              <div
                className="w-full h-16 rounded-lg mb-2 shadow-inner border border-white/10"
                style={{ backgroundColor: s.hex }}
              />
              <h4 className="text-xs font-bold text-[#EDE4D8] truncate">{s.name}</h4>
              <p className="text-[10px] font-mono text-[#D4AF37]">{s.hex}</p>
              <p className="text-[10px] text-[#C2B69D] truncate mt-0.5">{s.subcategory}</p>
            </div>
            <div className="pt-2 mt-2 border-t border-white/10 flex justify-end">
              <button
                onClick={() => handleDelete(s.id)}
                className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
