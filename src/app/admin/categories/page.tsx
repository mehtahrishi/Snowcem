"use client";

import React, { useEffect, useState } from "react";
import { Layers, Plus, Trash2, Upload, RefreshCw } from "lucide-react";

interface CategoryRow {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string | null;
  badge: string | null;
  banner: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    parentId: "",
    description: "",
    badge: "",
    banner: "",
    sortOrder: 0,
  });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setRows(Array.isArray(data?.data) ? data.data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "categories");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data?.url) setForm((prev) => ({ ...prev, banner: data.url }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        parentId: form.parentId || null,
      }),
    });
    if (res.ok) {
      setForm({ name: "", slug: "", parentId: "", description: "", badge: "", banner: "", sortOrder: 0 });
      load();
    } else {
      const err = await res.json();
      alert(err?.error || "Failed to save category");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category/subcategory?")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) load();
    else {
      const err = await res.json();
      alert(err?.error || "Delete failed");
    }
  }

  const mainCats = rows.filter((r) => !r.parentId);
  const catMap = new Map(rows.map((r) => [r.id, r.name]));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#D8C7B3]/10">
        <div>
          <h1 className="text-2xl font-black text-[#EDE4D8] flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#D4AF37]" />
            <span>Categories & Subcategories</span>
          </h1>
          <p className="text-xs text-[#C2B69D] mt-1">
            Main categories (parent empty) and product subcategories/ranges (select parent category).
          </p>
        </div>
        <button onClick={load} className="px-3 py-2 rounded-xl bg-[#0A2621] border border-white/10 text-xs font-bold flex items-center gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0A2621] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">Add Category / Subcategory</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            required
            placeholder="Name (e.g. Exterior Emulsion Paints)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="Slug (optional, auto-generated)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <select
            value={form.parentId}
            onChange={(e) => setForm({ ...form, parentId: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          >
            <option value="">None (Main Category)</option>
            {mainCats.map((c) => (
              <option key={c.id} value={c.id}>Subcategory of: {c.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <input
            placeholder="Badge (e.g. Popular)"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="Banner WebP path (/uploads/categories/...)"
            value={form.banner}
            onChange={(e) => setForm({ ...form, banner: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#123B34] border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] cursor-pointer hover:bg-[#16473F]">
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Converting to WebP..." : "Upload Banner (WebP)"}</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <textarea
          rows={2}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
        />

        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#061C18] text-xs font-black">
          <Plus className="w-4 h-4" />
          <span>Save Category</span>
        </button>
      </form>

      <div className="bg-[#0A2621] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#041411] text-[#C2B69D] uppercase">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Banner</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-white/5">
                <td className="p-3 font-bold text-[#EDE4D8]">{r.name}</td>
                <td className="p-3 text-[#C2B69D]">
                  {r.parentId ? `Subcategory (${catMap.get(r.parentId) || r.parentId})` : "Main Category"}
                </td>
                <td className="p-3 font-mono text-[#C2B69D]">{r.slug}</td>
                <td className="p-3 font-mono text-[#D4AF37] truncate max-w-[200px]">{r.banner || "—"}</td>
                <td className="p-3 text-right">
                  <button onClick={() => handleDelete(r.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

