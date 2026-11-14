"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Sparkles, Plus, Trash2, Upload, RefreshCw } from "lucide-react";
import {
  PageHeader,
  Card,
  FormGrid,
  Field,
  FormActions,
  Button,
  IconButton,
  buttonCls,
  Badge,
  EmptyState,
  LoadingState,
  inputCls,
  selectCls,
  useToast,
  useConfirm,
} from "@/components/admin/ui";

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
  const toast = useToast();
  const confirm = useConfirm();

  const [items, setItems] = useState<FeaturedRow[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ productId: "", image: "", alt: "", sortOrder: 0 });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [fRes, pRes] = await Promise.all([
        fetch("/api/admin/featured-products"),
        fetch("/api/admin/products"),
      ]);
      const fData = await fRes.json();
      const pData = await pRes.json();
      if (!fRes.ok || !pRes.ok) {
        throw new Error(fData?.error || pData?.error || "Failed to load featured slides");
      }
      setItems(Array.isArray(fData?.data) ? fData.data : []);
      setProducts(Array.isArray(pData?.data) ? pData.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load featured items");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

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
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      if (data?.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
        toast.success("Banner uploaded and converted to WebP");
      }
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/featured-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Failed to add slide");
      toast.success("Featured slide added");
      setForm({ productId: "", image: "", alt: "", sortOrder: 0 });
      load();
    } catch (err: any) {
      toast.error(err?.message || "Failed to add slide");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: FeaturedRow, productName: string) {
    const ok = await confirm({
      title: `Remove "${productName}" slide?`,
      description: "This banner slide will be removed from the Explore Our Best carousel.",
      confirmLabel: "Remove Slide",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/featured-products?id=${encodeURIComponent(item.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      toast.success("Slide removed from Explore Our Best");
      load();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const prodMap = new Map(products.map((p) => [p.id, p.name]));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Sparkles}
        title="Explore Our Best"
        description="Featured homepage carousel slides linked directly to products."
        actions={
          <>
            <Badge tone="gold">{items.length} {items.length === 1 ? "slide" : "slides"}</Badge>
            <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
              Refresh
            </Button>
          </>
        }
      />

      <Card
        title="Add Featured Slide"
        description="Choose a product and upload its carousel banner image."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid cols={3}>
            <Field label="Linked Product" required>
              <select
                required
                value={form.productId}
                onChange={(e) => setForm({ ...form, productId: e.target.value })}
                className={selectCls}
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Alt Text" hint="Accessible image label">
              <input
                placeholder="e.g. Uni-Glosss 18"
                value={form.alt}
                onChange={(e) => setForm({ ...form, alt: e.target.value })}
                className={inputCls}
              />
            </Field>

            <Field label="Display Order" hint="Lower numbers appear first">
              <input
                type="number"
                placeholder="0"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Banner Image Path" required hint="Stored as WebP under /uploads/featured">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                required
                placeholder="/uploads/featured/..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className={`${inputCls} font-mono text-xs`}
              />
              <label className={buttonCls("secondary", "md", "shrink-0")}>
                <Upload className="h-4 w-4 text-[#D4AF37]" />
                <span>{uploading ? "Converting..." : "Upload Banner (WebP)"}</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
          </Field>

          <FormActions>
            <Button type="submit" variant="primary" icon={Plus} loading={saving}>
              Add Slide
            </Button>
          </FormActions>
        </form>
      </Card>

      {loading ? (
        <LoadingState rows={3} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No featured slides yet"
          description="Add a featured product slide above to populate the Explore Our Best carousel."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const productName = prodMap.get(item.productId) || item.productId;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-[#0A2621] p-4"
              >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#041411] p-2">
                  <img
                    src={item.image}
                    alt={item.alt || productName}
                    className="h-40 w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#EDE4D8]">{productName}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge tone="gold">Order: {item.sortOrder}</Badge>
                      {item.alt && (
                        <span className="truncate text-[11px] text-[#C2B69D]/80">{item.alt}</span>
                      )}
                    </div>
                  </div>
                  <IconButton
                    icon={Trash2}
                    label="Remove slide"
                    tone="danger"
                    onClick={() => handleDelete(item, productName)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
