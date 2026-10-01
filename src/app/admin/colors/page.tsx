"use client";

import React, { useState, useEffect } from "react";
import {
  Palette,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  RefreshCw,
  Copy,
  Check,
  Wand2,
  AlertTriangle,
} from "lucide-react";
import { getClosestColorName } from "@/lib/colors/namer";

interface ColorItem {
  id: string;
  name: string;
  code: string;
  hex: string;
  category: string;
  finish?: string;
  popular?: boolean;
}

export default function AdminColorsPage() {
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingColor, setEditingColor] = useState<ColorItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    hex: "#1A365D",
    category: "Uni-glosss",
    finish: "Gloss",
    popular: false,
  });

  // Real-time Hex-to-Color detection preview inside form
  const [detectedColorName, setDetectedColorName] = useState("Cosmic Ocean");
  const [colorPaletteInfo, setColorPaletteInfo] = useState<{
    pantone: string;
    ntc: string;
  }>({ pantone: "", ntc: "" });

  useEffect(() => {
    if (formData.hex) {
      try {
        const result = getClosestColorName(formData.hex);
        setDetectedColorName(result.name);
        setColorPaletteInfo({
          ntc: result.allMatches.ntc?.[0]?.name || result.name,
          pantone: result.allMatches.pantone?.[0]?.name || "",
        });
      } catch (e) {
        // fallback
      }
    }
  }, [formData.hex]);

  async function fetchColors() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (categoryFilter && categoryFilter !== "all") params.append("category", categoryFilter);

      const res = await fetch(`/api/admin/colors?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setColors(data.data || []);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to load catalogue" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Failed to fetch colors" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchColors();
  }, [search, categoryFilter]);

  function openCreateModal() {
    setEditingColor(null);
    const initialHex = "#EAA221";
    const initialResult = getClosestColorName(initialHex);
    setFormData({
      name: initialResult.name,
      code: "S" + initialHex.replace("#", "").slice(0, 4).toUpperCase(),
      hex: initialHex,
      category: "Uni-glosss",
      finish: "Gloss",
      popular: false,
    });
    setModalOpen(true);
  }

  function openEditModal(c: ColorItem) {
    setEditingColor(c);
    setFormData({
      name: c.name || "",
      code: c.code || "",
      hex: c.hex || "#000000",
      category: c.category || "Uni-glosss",
      finish: c.finish || "Gloss",
      popular: Boolean(c.popular),
    });
    setModalOpen(true);
  }

  function handleAutoFillName() {
    if (detectedColorName) {
      setFormData((prev) => ({
        ...prev,
        name: detectedColorName,
        code: prev.code || `S${prev.hex.replace("#", "").slice(0, 4).toUpperCase()}`,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    try {
      if (editingColor) {
        const res = await fetch(`/api/admin/colors/${editingColor.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update color");
        setMessage({ type: "success", text: "Color shade updated successfully!" });
      } else {
        const res = await fetch(`/api/admin/colors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add shade");
        setMessage({ type: "success", text: "New shade added to catalogue!" });
      }

      setModalOpen(false);
      fetchColors();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/colors/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setMessage({ type: "success", text: "Color shade deleted from catalogue." });
      setDeleteConfirmId(null);
      fetchColors();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  }

  function copyHex(hex: string) {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-orange-50 text-[#f36c21] border border-orange-100">
              <Palette size={22} />
            </div>
            <h1 className="text-2xl font-black text-[#0D1B3E] tracking-tight">
              Color Catalogue &amp; Hex Namer
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage Snowcem shade palettes with automatic Hex-to-Color name detection.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#f36c21] hover:bg-[#e05307] text-white shadow-md shadow-orange-500/20 transition-all"
        >
          <Plus size={16} />
          <span>Add New Shade</span>
        </button>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`flex items-center justify-between p-3.5 rounded-xl text-xs ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by shade name, code, or hex (#1A365D)..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-700 text-xs font-medium focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Uni-glosss">Uni-glosss</option>
            <option value="Exterior Emulsions">Exterior Emulsions</option>
            <option value="Interior Emulsions">Interior Emulsions</option>
            <option value="Cement Paints">Cement Paints</option>
          </select>

          <span className="text-slate-500 font-medium">
            <strong className="text-[#0D1B3E] font-bold">{colors.length}</strong> shades
          </span>

          <button
            onClick={fetchColors}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
            title="Refresh catalogue"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Colors Table */}
      <div className="bg-white border border-[#E5DDD5] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#E5DDD5] text-slate-600 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-4 px-5">Swatch &amp; Shade Name</th>
                <th className="py-4 px-5">Shade Code</th>
                <th className="py-4 px-5">Hex Code</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Finish</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9E2] text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-slate-400">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-[#f36c21]" />
                    Loading shades from database...
                  </td>
                </tr>
              ) : colors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-slate-500 font-medium">
                    No color shades registered yet. Click &ldquo;Add New Shade&rdquo; to add custom colors.
                  </td>
                </tr>
              ) : (
                colors.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF8F5]/80 transition-all">
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-3.5">
                        <div
                          className="w-8 h-8 rounded-xl shadow border border-black/10 flex-shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div>
                          <div className="font-bold text-[#0D1B3E] text-sm flex items-center space-x-1.5">
                            <span>{c.name}</span>
                            {c.popular && (
                              <span className="text-[10px] bg-orange-50 text-[#f36c21] border border-orange-200 px-1.5 py-0.2 rounded-full font-bold">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">Snowcem Certified Palette</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-slate-800">
                      {c.code}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => copyHex(c.hex)}
                        className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 font-mono text-[11px] border border-[#E0D7CE] transition-all group"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.hex}</span>
                        {copiedHex === c.hex ? (
                          <Check size={11} className="text-emerald-600 font-bold" />
                        ) : (
                          <Copy size={11} className="opacity-0 group-hover:opacity-100 text-slate-400" />
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-slate-700 border border-[#E0D7CE] text-[11px] font-semibold">
                        {c.category}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-600 font-medium">
                      {c.finish || "Gloss"}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all"
                          title="Edit Shade"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(c.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-all"
                          title="Delete Shade"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Shade Modal with Live Color-Namer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E5DDD5] rounded-3xl max-w-lg w-full p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EFE9E2] pb-4">
              <h3 className="font-bold text-[#0D1B3E] text-base">
                {editingColor ? "Edit Color Shade" : "Add New Color to Catalogue"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Live Hex-to-Color Namer Card */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E0D7CE] flex items-center justify-between shadow-2xs">
              <div className="flex items-center space-x-3.5">
                <div
                  className="w-12 h-12 rounded-2xl shadow-md border border-black/10 flex-shrink-0 transition-colors"
                  style={{ backgroundColor: formData.hex }}
                />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    Detected Real Color Name (NPM: color-namer)
                  </div>
                  <div className="text-sm font-extrabold text-[#0D1B3E] flex items-center space-x-1.5 mt-0.5">
                    <span>{detectedColorName}</span>
                    {colorPaletteInfo.pantone && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        ({colorPaletteInfo.pantone})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAutoFillName}
                className="flex items-center space-x-1 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-[#f36c21] border border-orange-200 rounded-xl text-xs font-bold transition-all"
                title="Fill Name & Code with detected color"
              >
                <Wand2 size={13} />
                <span>Auto-Fill</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Color Picker & Hex Input */}
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    Visual Color Picker *
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.hex}
                      onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                      className="w-10 h-10 rounded-xl bg-transparent cursor-pointer border border-[#E0D7CE] p-0.5"
                    />
                    <input
                      type="text"
                      required
                      value={formData.hex}
                      onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                      placeholder="#1A365D"
                      className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-mono font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    Shade Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. S1175"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-mono font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Shade Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cosmic Ocean"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Uni-glosss">Uni-glosss</option>
                    <option value="Exterior Emulsions">Exterior Emulsions</option>
                    <option value="Interior Emulsions">Interior Emulsions</option>
                    <option value="Sandtex Matt">Sandtex Matt</option>
                    <option value="Pentasia">Pentasia</option>
                    <option value="Snowcem Plus">Snowcem Plus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Finish</label>
                  <select
                    value={formData.finish}
                    onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Gloss">Gloss</option>
                    <option value="High Gloss">High Gloss</option>
                    <option value="Matt">Matt</option>
                    <option value="Silk">Silk</option>
                    <option value="Satin">Satin</option>
                    <option value="Textured">Textured</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popularShade"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="rounded border-[#E0D7CE] text-[#f36c21] focus:ring-[#f36c21] h-4 w-4"
                />
                <label htmlFor="popularShade" className="text-slate-800 cursor-pointer font-bold">
                  Feature as Popular Trending Shade
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-5 border-t border-[#EFE9E2]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#f36c21] hover:bg-[#e05307] text-white font-bold shadow-md shadow-orange-500/20"
                >
                  {editingColor ? "Update Shade" : "Save Shade"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E5DDD5] rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-600">
              <AlertTriangle size={24} />
              <h3 className="font-bold text-[#0D1B3E] text-base">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this shade from the catalogue?
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
