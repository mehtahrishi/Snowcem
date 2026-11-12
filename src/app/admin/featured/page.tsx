"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Plus, Trash2, Upload } from "lucide-react";

interface FeaturedRow {
  id: string;
  productId: string;
  image: string;
  alt: string | null;
  sortOrder: number;
}

interface ProductOption {
  id: string;
  name: string;
}

export default function AdminFeaturedPage() {
  const [items, setItems] = useState<FeaturedRow[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ productId: "", image: "", alt: "", sortOrder: 0 });

  async function load() {
    const [fRes, pRes] = await Promise.all([
      fetch("/api/admin/featured-products"),
      fetch("/api/admin/products"),
    ]);
    const fData = await fRes.json();
    const pData = await pRes.json();
    setItems(Array.isArray(fData?.data) ? fData.data : []);
    setProducts(Array.isArray(pData?.data) ? pData.data : []);
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
      fd.append("folder", "featured");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data?.url) setForm((prev) => ({ ...prev, image: data.url }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/featured-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ productId: "", image: "", alt: "", sortOrder: 0 });
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove from Explore Our Best?")) return;
    await fetch(`/api/admin/featured-products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    load();
  }

  const prodMap = new Map(products.map((p) => [p.id, p.name]));

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-black text-[#EDE4D8] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#D4AF37]" />
          <span>Explore Our Best (Featured Carousel)</span>
        </h1>
        <p className="text-xs text-[#C2B69D] mt-1">
          Separate table linking a carousel WebP banner directly to a product.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0A2621] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            required
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          >
            <option value="">Select Product *</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input
            placeholder="Alt text (e.g. Uni-Glosss 18)"
            value={form.alt}
            onChange={(e) => setForm({ ...form, alt: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            type="number"
            placeholder="Order (0, 1, 2...)"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            required
            placeholder="Banner Image Path (/uploads/featured/...)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="flex-1 px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#123B34] border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Converting..." : "Upload Banner (WebP)"}</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#061C18] text-xs font-black">
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0A2621] border border-white/10 rounded-2xl p-4 space-y-3">
            <img src={item.image} alt={item.alt || ""} className="w-full h-36 object-contain bg-[#041411] rounded-xl" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#EDE4D8]">{prodMap.get(item.productId) || item.productId}</p>
                <p className="text-[11px] text-[#C2B69D] font-mono">Order: {item.sortOrder}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

