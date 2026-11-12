"use client";

import React, { useEffect, useState } from "react";
import { Package, Plus, Trash2, Upload, RefreshCw } from "lucide-react";

interface CategoryRow {
  id: string;
  parentId: string | null;
  name: string;
}

interface ProductRow {
  id: string;
  categoryId: string;
  subcategoryId: string | null;
  name: string;
  slug: string;
  tagline: string | null;
  warranty: string | null;
  image: string | null;
  bgImage: string | null;
  sortOrder: number;
}

export default function AdminProductsPage() {
  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [form, setForm] = useState({
    categoryId: "",
    subcategoryId: "",
    name: "",
    slug: "",
    tagline: "",
    description: "",
    warranty: "",
    image: "",
    bgImage: "",
    highlightImagesText: "",
    featuresText: "",
    pdf: "",
    sortOrder: "0",
  });

  async function load() {
    setLoading(true);
    try {
      const [cRes, pRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/products"),
      ]);
      const cData = await cRes.json();
      const pData = await pRes.json();
      setCats(Array.isArray(cData?.data) ? cData.data : []);
      setProducts(Array.isArray(pData?.data) ? pData.data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadWebp(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "bgImage" | "highlight"
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(field);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "products");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data?.url) {
        if (field === "highlight") {
          setForm((prev) => ({
            ...prev,
            highlightImagesText: prev.highlightImagesText
              ? `${prev.highlightImagesText}\n${data.url}`
              : data.url,
          }));
        } else {
          setForm((prev) => ({ ...prev, [field]: data.url }));
        }
      }
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId: form.categoryId,
        subcategoryId: form.subcategoryId || null,
        name: form.name,
        slug: form.slug,
        tagline: form.tagline,
        description: form.description,
        warranty: form.warranty,
        image: form.image,
        bgImage: form.bgImage,
        pdf: form.pdf,
        highlightImages: form.highlightImagesText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        features: form.featuresText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        sortOrder: Number(form.sortOrder) || 0,
      }),
    });
    if (res.ok) {
      setForm({
        categoryId: "",
        subcategoryId: "",
        name: "",
        slug: "",
        tagline: "",
        description: "",
        warranty: "",
        image: "",
        bgImage: "",
        highlightImagesText: "",
        featuresText: "",
        pdf: "",
        sortOrder: "0",
      });
      load();
    } else {
      const err = await res.json();
      alert(err?.error || "Failed to add product");
    }
  }

  async function updateSortOrder(id: string, newOrder: number) {
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sortOrder: newOrder }),
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, sortOrder: newOrder } : p))
    );
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  const mainCats = cats.filter((c) => !c.parentId);
  const subCats = cats.filter((c) => c.parentId === form.categoryId);
  const catMap = new Map(cats.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#EDE4D8] flex items-center gap-2">
            <Package className="w-6 h-6 text-[#D4AF37]" />
            <span>Manage Products</span>
          </h1>
          <p className="text-xs text-[#C2B69D] mt-1">
            Add products under categories & subcategories. All uploaded images auto-convert to WebP in /uploads/products.
          </p>
        </div>
        <button onClick={load} className="px-3 py-2 rounded-xl bg-[#0A2621] border border-white/10 text-xs font-bold flex items-center gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0A2621] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value, subcategoryId: "" })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          >
            <option value="">Select Category *</option>
            {mainCats.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={form.subcategoryId}
            onChange={(e) => setForm({ ...form, subcategoryId: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          >
            <option value="">Select Subcategory / Range</option>
            {subCats.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input
            required
            placeholder="Product Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            placeholder="Slug (auto if blank)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="Tagline"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="Warranty (e.g. 11 Years)"
            value={form.warranty}
            onChange={(e) => setForm({ ...form, warranty: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            type="number"
            placeholder="Sort Order (e.g. 1, 2)"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>

        <textarea
          required
          rows={3}
          placeholder="Product Description *"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2">
            <input
              placeholder="Packshot Image (/uploads/products/...)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="flex-1 px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
            />
            <label className="px-3 py-2.5 rounded-xl bg-[#123B34] border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] cursor-pointer flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingField === "image" ? "..." : "Packshot"}</span>
              <input type="file" accept="image/*" onChange={(e) => uploadWebp(e, "image")} className="hidden" />
            </label>
          </div>

          <div className="flex gap-2">
            <input
              placeholder="Card BG Image (/uploads/products/...)"
              value={form.bgImage}
              onChange={(e) => setForm({ ...form, bgImage: e.target.value })}
              className="flex-1 px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
            />
            <label className="px-3 py-2.5 rounded-xl bg-[#123B34] border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] cursor-pointer flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingField === "bgImage" ? "..." : "Card BG"}</span>
              <input type="file" accept="image/*" onChange={(e) => uploadWebp(e, "bgImage")} className="hidden" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#C2B69D]">Mnemonic Highlight Images (1 per line)</span>
              <label className="text-[11px] font-bold text-[#D4AF37] cursor-pointer">+ Upload WebP
                <input type="file" accept="image/*" onChange={(e) => uploadWebp(e, "highlight")} className="hidden" />
              </label>
            </div>
            <textarea
              rows={3}
              placeholder="/uploads/products/common/..."
              value={form.highlightImagesText}
              onChange={(e) => setForm({ ...form, highlightImagesText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#041411] border border-white/15 text-xs text-[#EDE4D8]"
            />
          </div>
          <div>
            <span className="text-xs text-[#C2B69D] block mb-1">Features (1 per line)</span>
            <textarea
              rows={3}
              placeholder="High gloss finish&#10;11-year performance warranty"
              value={form.featuresText}
              onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#041411] border border-white/15 text-xs text-[#EDE4D8]"
            />
          </div>
        </div>

        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#061C18] text-xs font-black">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </form>

      <div className="bg-[#0A2621] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#041411] text-[#C2B69D] uppercase">
            <tr>
              <th className="p-3 w-20">Order</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Subcategory</th>
              <th className="p-3">Warranty</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="p-3">
                  <input
                    type="number"
                    defaultValue={p.sortOrder ?? 0}
                    onBlur={(e) => updateSortOrder(p.id, parseInt(e.target.value) || 0)}
                    className="w-14 px-2 py-1 bg-[#041411] border border-white/20 rounded text-center text-xs text-[#EDE4D8]"
                  />
                </td>
                <td className="p-3 font-bold text-[#EDE4D8]">{p.name}</td>
                <td className="p-3 text-[#C2B69D]">{catMap.get(p.categoryId) || p.categoryId}</td>
                <td className="p-3 text-[#C2B69D]">{p.subcategoryId ? catMap.get(p.subcategoryId) || p.subcategoryId : "—"}</td>
                <td className="p-3 text-[#D4AF37]">{p.warranty || "—"}</td>
                <td className="p-3 text-right">
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg">
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

