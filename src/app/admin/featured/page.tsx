"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, Image as ImageIcon, Plus, Star, Trash2, Upload } from "lucide-react";
import CustomModal from "@/components/admin/CustomModal";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  FormActions,
  FormGrid,
  IconButton,
  LoadingState,
  PageHeader,
  inputCls,
  selectCls,
  useConfirm,
  useToast,
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
  slug: string;
}

interface FeaturedFormState {
  productId: string;
  image: string;
  alt: string;
  sortOrder: number;
}

const emptyForm: FeaturedFormState = {
  productId: "",
  image: "",
  alt: "",
  sortOrder: 0,
};

export default function AdminFeaturedPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [slides, setSlides] = useState<FeaturedRow[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<FeaturedRow | null>(null);
  const [formData, setFormData] = useState<FeaturedFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [fRes, pRes] = await Promise.all([
        fetch("/api/admin/featured-products"),
        fetch("/api/admin/products"),
      ]);
      const fJson = await fRes.json();
      const pJson = await pRes.json();
      if (!fRes.ok || !pRes.ok) {
        throw new Error(fJson?.error || pJson?.error || "Failed to load featured products");
      }
      setSlides(Array.isArray(fJson.data) ? fJson.data : []);
      setProducts(Array.isArray(pJson.data) ? pJson.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load featured slides");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const productMap = useMemo(() => {
    const map = new Map<string, ProductOption>();
    for (const p of products) map.set(p.id, p);
    return map;
  }, [products]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({
      ...emptyForm,
      productId: products[0]?.id || "",
      sortOrder: slides.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (slide: FeaturedRow) => {
    setEditing(slide);
    setFormData({
      productId: slide.productId,
      image: slide.image,
      alt: slide.alt || "",
      sortOrder: slide.sortOrder ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "featured");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      setFormData((prev) => ({ ...prev, image: json.url }));
      toast.success("Slide image uploaded");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId || !formData.image.trim()) {
      toast.error("Linked product and banner image are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...(editing ? { id: editing.id } : {}),
        productId: formData.productId,
        image: formData.image.trim(),
        alt: formData.alt.trim() || null,
        sortOrder: Number(formData.sortOrder) || 0,
      };

      const res = await fetch("/api/admin/featured-products", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || `Failed to ${editing ? "update" : "create"} featured slide`);
        return;
      }

      toast.success(editing ? "Featured slide updated" : "Featured slide added");
      setIsModalOpen(false);
      await load();
    } catch {
      toast.error("Network error while saving featured slide");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slide: FeaturedRow) => {
    const product = productMap.get(slide.productId);
    const ok = await confirm({
      title: `Remove "${product?.name || "Featured Slide"}"?`,
      description: "This will remove the slide from the homepage featured carousel.",
      confirmLabel: "Remove Slide",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/featured-products?id=${encodeURIComponent(slide.id)}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || "Failed to remove featured slide");
        return;
      }
      toast.success("Featured slide removed");
      await load();
    } catch {
      toast.error("Network error while removing slide");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Star}
        title="Featured Carousel"
        description="Manage homepage featured product hero banners and display ordering."
        actions={
          <Button variant="primary" icon={Plus} onClick={openAddModal}>
            Add Featured Slide
          </Button>
        }
      />

      {loading ? (
        <LoadingState rows={4} />
      ) : slides.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No featured slides yet"
          description="Highlight flagship products on the homepage carousel."
          action={
            <Button variant="primary" icon={Plus} onClick={openAddModal}>
              Add Featured Slide
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide) => {
            const product = productMap.get(slide.productId);
            return (
              <article
                key={slide.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#D8C7B3]/15 bg-[#0A2621] transition hover:border-[#D4AF37]/35"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#D8C7B3]/10 bg-[#041411]">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.alt || product?.name || "Featured banner"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#C2B69D]/40">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute left-3 top-3">
                    <Badge tone="gold">Order #{slide.sortOrder}</Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4 p-4">
                  <div>
                    <h2 className="text-sm font-semibold text-[#EDE4D8]">
                      {product?.name || slide.productId}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-xs text-[#C2B69D]/75">
                      {slide.alt || "No alt caption provided"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#D8C7B3]/10 pt-3">
                    <span className="truncate font-mono text-[11px] text-[#C2B69D]/60">
                      {product?.slug || slide.productId}
                    </span>
                    <div className="inline-flex shrink-0 items-center gap-1.5">
                      <IconButton
                        icon={Edit2}
                        label={`Edit slide for ${product?.name || slide.productId}`}
                        tone="gold"
                        onClick={() => openEditModal(slide)}
                      />
                      <IconButton
                        icon={Trash2}
                        label={`Delete slide for ${product?.name || slide.productId}`}
                        tone="danger"
                        onClick={() => handleDelete(slide)}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => !saving && setIsModalOpen(false)}
        title={editing ? "Edit Featured Slide" : "Add Featured Slide"}
        subtitle="Select a product and banner creative for the homepage featured carousel."
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid cols={2}>
            <Field label="Linked Product" required>
              <select
                required
                value={formData.productId}
                onChange={(e) => setFormData((prev) => ({ ...prev, productId: e.target.value }))}
                className={selectCls}
              >
                <option value="">Select a product…</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Sort Order" hint="Lower numbers appear first">
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))
                }
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Banner Image URL" required>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                placeholder="/uploads/featured/slide.jpg"
                className={inputCls}
              />
              <label className="inline-flex h-[42px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#D8C7B3]/20 bg-white/[0.04] px-4 text-xs font-semibold text-[#EDE4D8] hover:border-[#D4AF37]/40 hover:bg-white/[0.08]">
                <Upload className="h-3.5 w-3.5 text-[#D4AF37]" />
                {uploading ? "Uploading…" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {formData.image && (
              <div className="mt-2 overflow-hidden rounded-xl border border-[#D8C7B3]/15 bg-[#041411]">
                <img
                  src={formData.image}
                  alt="Featured preview"
                  className="aspect-[16/9] max-h-48 w-full object-cover"
                />
              </div>
            )}
          </Field>

          <Field label="Alt Text / Caption">
            <input
              type="text"
              value={formData.alt}
              onChange={(e) => setFormData((prev) => ({ ...prev, alt: e.target.value }))}
              placeholder="Descriptive alt text for accessibility & SEO"
              className={inputCls}
            />
          </Field>

          <FormActions>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Add Slide"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
