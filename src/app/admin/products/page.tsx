"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, Package, Plus, Trash2, Upload, X } from "lucide-react";
import CustomModal from "@/components/admin/CustomModal";
import {
  Badge,
  Button,
  DataTable,
  EmptyState,
  Field,
  FormActions,
  FormGrid,
  IconButton,
  LoadingState,
  PageHeader,
  SearchInput,
  Td,
  Th,
  Toolbar,
  checkboxCls,
  inputCls,
  monoTextareaCls,
  selectCls,
  textareaCls,
  trCls,
  useConfirm,
  useToast,
} from "@/components/admin/ui";

interface CategoryRow {
  id: string;
  parentId: string | null;
  name: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ProductRow {
  id: string;
  categoryId: string;
  subcategoryId: string | null;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  features: string[] | null;
  highlightImages: string[] | null;
  warranty: string | null;
  image: string | null;
  detailImages: string[] | null;
  bgImage: string | null;
  pdf: string | null;
  faqs: FaqItem[] | null;
  sortOrder: number;
  isActive: boolean;
}

interface ProductFormState {
  categoryId: string;
  subcategoryId: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  warranty: string;
  image: string;
  bgImage: string;
  pdf: string;
  featuresText: string;
  highlightImagesText: string;
  detailImagesText: string;
  faqs: FaqItem[];
  sortOrder: number;
  isActive: boolean;
}

const emptyForm: ProductFormState = {
  categoryId: "",
  subcategoryId: "",
  name: "",
  slug: "",
  tagline: "",
  description: "",
  warranty: "",
  image: "",
  bgImage: "",
  pdf: "",
  featuresText: "",
  highlightImagesText: "",
  detailImagesText: "",
  faqs: [],
  sortOrder: 0,
  isActive: true,
};

function slugify(val: string) {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function linesToArray(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AdminProductsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [formData, setFormData] = useState<ProductFormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [cRes, pRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/products"),
      ]);
      const cData = await cRes.json();
      const pData = await pRes.json();
      if (!cRes.ok || !pRes.ok) {
        throw new Error(pData?.error || cData?.error || "Failed to load products");
      }
      setCats(Array.isArray(cData?.data) ? cData.data : []);
      setProducts(Array.isArray(pData?.data) ? pData.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const topCategories = useMemo(() => cats.filter((c) => !c.parentId), [cats]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, CategoryRow>();
    for (const c of cats) map.set(c.id, c);
    return map;
  }, [cats]);

  const subcategoriesForSelected = useMemo(
    () => cats.filter((c) => c.parentId === formData.categoryId),
    [cats, formData.categoryId]
  );

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.categoryId !== categoryFilter) return false;
      if (!q) return true;
      const catName = categoryMap.get(p.categoryId)?.name || "";
      const subName = p.subcategoryId ? categoryMap.get(p.subcategoryId)?.name || "" : "";
      return (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.tagline || "").toLowerCase().includes(q) ||
        catName.toLowerCase().includes(q) ||
        subName.toLowerCase().includes(q)
      );
    });
  }, [products, categoryFilter, search, categoryMap]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({
      ...emptyForm,
      categoryId: topCategories[0]?.id || cats[0]?.id || "",
    });
    setSlugTouched(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductRow) => {
    setEditing(product);
    setFormData({
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId || "",
      name: product.name,
      slug: product.slug,
      tagline: product.tagline || "",
      description: product.description || "",
      warranty: product.warranty || "",
      image: product.image || "",
      bgImage: product.bgImage || "",
      pdf: product.pdf || "",
      featuresText: Array.isArray(product.features) ? product.features.join("\n") : "",
      highlightImagesText: Array.isArray(product.highlightImages)
        ? product.highlightImages.join("\n")
        : "",
      detailImagesText: Array.isArray(product.detailImages)
        ? product.detailImages.join("\n")
        : "",
      faqs: Array.isArray(product.faqs)
        ? product.faqs.map((f) => ({
            question: f?.question || "",
            answer: f?.answer || "",
          }))
        : [],
      sortOrder: product.sortOrder ?? 0,
      isActive: product.isActive ?? true,
    });
    setSlugTouched(true);
    setIsModalOpen(true);
  };

  const uploadFile = async (
    file: File,
    field: "image" | "bgImage" | "pdf" | "highlightImagesText" | "detailImagesText"
  ) => {
    setUploadingField(field);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "products");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormData((prev) => {
        if (field === "highlightImagesText" || field === "detailImagesText") {
          const existing = prev[field].trim();
          return {
            ...prev,
            [field]: existing ? `${existing}\n${data.url}` : data.url,
          };
        }
        return { ...prev, [field]: data.url };
      });
      toast.success("File uploaded");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploadingField(null);
    }
  };

  const handleInlineSortBlur = async (product: ProductRow, rawValue: string) => {
    const nextSort = Number(rawValue);
    if (!Number.isFinite(nextSort) || nextSort === product.sortOrder) return;
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: nextSort }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json.error || "Failed to update sort order");
        return;
      }
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? { ...item, sortOrder: nextSort } : item))
      );
      toast.success("Order updated");
    } catch {
      toast.error("Failed to update sort order");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.name.trim() || !formData.description.trim()) {
      toast.error("Category, product name, and description are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId || null,
        name: formData.name.trim(),
        slug: slugify(formData.slug || formData.name),
        tagline: formData.tagline.trim() || null,
        description: formData.description.trim(),
        features: linesToArray(formData.featuresText),
        highlightImages: linesToArray(formData.highlightImagesText),
        warranty: formData.warranty.trim() || null,
        image: formData.image.trim() || null,
        detailImages: linesToArray(formData.detailImagesText),
        bgImage: formData.bgImage.trim() || null,
        pdf: formData.pdf.trim() || null,
        faqs: formData.faqs
          .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
          .filter((f) => f.question && f.answer),
        sortOrder: Number(formData.sortOrder) || 0,
        isActive: formData.isActive,
      };

      const url = editing ? `/api/admin/products/${editing.id}` : "/api/admin/products";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json.error || `Failed to ${editing ? "update" : "create"} product`);
        return;
      }

      toast.success(editing ? "Product updated" : "Product created");
      setIsModalOpen(false);
      await load();
    } catch {
      toast.error("Network error while saving product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: ProductRow) => {
    const ok = await confirm({
      title: `Delete "${product.name}"?`,
      description:
        "This will permanently delete this product and remove any featured slides referencing it.",
      confirmLabel: "Delete Product",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json.error || "Failed to delete product");
        return;
      }
      toast.success("Product deleted");
      await load();
    } catch {
      toast.error("Network error while deleting product");
    }
  };

  const addFaqRow = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const updateFaqRow = (idx: number, field: "question" | "answer", value: string) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    }));
  };

  const removeFaqRow = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Package}
        title="Products"
        description="Manage paints, coatings, waterproofing specs, brochures, features, and FAQs."
        actions={
          <Button variant="primary" icon={Plus} onClick={openAddModal}>
            Add Product
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search product name, slug, tagline…"
        />
        <select
          aria-label="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`${selectCls} w-full sm:w-56`}
        >
          <option value="all">All Categories ({products.length})</option>
          {topCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <span className="text-xs text-[#C2B69D]/70 sm:ml-auto">
          Showing {filteredProducts.length} of {products.length}
        </span>
      </Toolbar>

      {loading ? (
        <LoadingState rows={6} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title={products.length === 0 ? "No products yet" : "No matching products"}
          description={
            products.length === 0
              ? "Add your first product to populate the storefront catalog."
              : "Try adjusting your search query or category filter."
          }
          action={
            products.length === 0 ? (
              <Button variant="primary" icon={Plus} onClick={openAddModal}>
                Add Product
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                }}
              >
                Reset Filters
              </Button>
            )
          }
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Category</Th>
              <Th>Warranty</Th>
              <Th align="center">Order</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => {
              const cat = categoryMap.get(p.categoryId);
              const sub = p.subcategoryId ? categoryMap.get(p.subcategoryId) : null;
              return (
                <tr key={p.id} className={trCls}>
                  <Td>
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-11 w-11 shrink-0 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D8C7B3]/15 bg-[#041411] text-[10px] text-[#C2B69D]/50">
                          No img
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-[#EDE4D8]">{p.name}</div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#C2B69D]/70">
                          <code className="rounded bg-[#041411] px-1.5 py-0.5 text-[11px]">
                            {p.slug}
                          </code>
                          {p.tagline && <span className="truncate max-w-[220px]">{p.tagline}</span>}
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge tone="neutral">{cat?.name || "Unknown"}</Badge>
                      {sub && <Badge tone="info">{sub.name}</Badge>}
                    </div>
                  </Td>
                  <Td>
                    {p.warranty ? (
                      <Badge tone="gold">{p.warranty}</Badge>
                    ) : (
                      <span className="text-xs text-[#C2B69D]/50">—</span>
                    )}
                  </Td>
                  <Td align="center">
                    <input
                      type="number"
                      aria-label={`Sort order for ${p.name}`}
                      defaultValue={p.sortOrder}
                      onBlur={(e) => handleInlineSortBlur(p, e.target.value)}
                      className={`${inputCls} w-20 py-1.5 text-center font-mono text-xs`}
                    />
                  </Td>
                  <Td>
                    <Badge tone={p.isActive ? "success" : "danger"}>
                      {p.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Td>
                  <Td align="right">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      <IconButton
                        icon={Edit2}
                        label={`Edit ${p.name}`}
                        tone="gold"
                        onClick={() => openEditModal(p)}
                      />
                      <IconButton
                        icon={Trash2}
                        label={`Delete ${p.name}`}
                        tone="danger"
                        onClick={() => handleDelete(p)}
                      />
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => !saving && setIsModalOpen(false)}
        title={editing ? `Edit Product — ${editing.name}` : "Add New Product"}
        subtitle="Manage product catalog details, imagery, datasheet PDF, technical features, and FAQs."
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid cols={2}>
            <Field label="Category" required>
              <select
                required
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                    subcategoryId: "",
                  }))
                }
                className={selectCls}
              >
                <option value="">Select category…</option>
                {topCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Subcategory" hint="Optional child category">
              <select
                value={formData.subcategoryId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subcategoryId: e.target.value }))
                }
                className={selectCls}
                disabled={subcategoriesForSelected.length === 0}
              >
                <option value="">
                  {subcategoriesForSelected.length === 0
                    ? "No subcategories for selected category"
                    : "None"}
                </option>
                {subcategoriesForSelected.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Product Name" required>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    name: val,
                    slug: !slugTouched ? slugify(val) : prev.slug,
                  }));
                }}
                placeholder="e.g. Trump Interior Emulsion"
                className={inputCls}
              />
            </Field>

            <Field label="URL Slug" required>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
                }}
                placeholder="trump-interior-emulsion"
                className={inputCls}
              />
            </Field>

            <Field label="Tagline">
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
                placeholder="e.g. Ultra-smooth luxury matte finish"
                className={inputCls}
              />
            </Field>

            <Field label="Warranty">
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) => setFormData((prev) => ({ ...prev, warranty: e.target.value }))}
                placeholder="e.g. 7 Years"
                className={inputCls}
              />
            </Field>

            <Field label="Sort Order">
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))
                }
                className={inputCls}
              />
            </Field>

            <Field label="Visibility">
              <label className="flex h-[42px] cursor-pointer items-center gap-2.5 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] px-3.5 text-sm text-[#EDE4D8]">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                  className={checkboxCls}
                />
                <span>Active on website</span>
              </label>
            </Field>
          </FormGrid>

          <Field label="Description" required>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed overview of product performance, surface compatibility, and benefits…"
              className={textareaCls}
            />
          </Field>

          <FormGrid cols={2}>
            <Field label="Product Card Image URL">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="/uploads/products/bucket.png"
                  className={inputCls}
                />
                <label className="inline-flex h-[42px] shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[#D8C7B3]/20 bg-white/[0.04] px-3 text-xs font-semibold text-[#EDE4D8] hover:border-[#D4AF37]/40 hover:bg-white/[0.08]">
                  <Upload className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {uploadingField === "image" ? "…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingField === "image"}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadFile(f, "image");
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </Field>

            <Field label="Hero / Background Image URL">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.bgImage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bgImage: e.target.value }))}
                  placeholder="/uploads/products/hero-bg.jpg"
                  className={inputCls}
                />
                <label className="inline-flex h-[42px] shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[#D8C7B3]/20 bg-white/[0.04] px-3 text-xs font-semibold text-[#EDE4D8] hover:border-[#D4AF37]/40 hover:bg-white/[0.08]">
                  <Upload className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {uploadingField === "bgImage" ? "…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingField === "bgImage"}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadFile(f, "bgImage");
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </Field>
          </FormGrid>

          <Field label="Brochure / Technical PDF URL">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.pdf}
                onChange={(e) => setFormData((prev) => ({ ...prev, pdf: e.target.value }))}
                placeholder="/uploads/products/datasheet.pdf"
                className={inputCls}
              />
              <label className="inline-flex h-[42px] shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[#D8C7B3]/20 bg-white/[0.04] px-3 text-xs font-semibold text-[#EDE4D8] hover:border-[#D4AF37]/40 hover:bg-white/[0.08]">
                <Upload className="h-3.5 w-3.5 text-[#D4AF37]" />
                {uploadingField === "pdf" ? "…" : "Upload PDF"}
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  disabled={uploadingField === "pdf"}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(f, "pdf");
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </Field>

          <Field label="Key Features" hint="Enter one feature per line">
            <textarea
              rows={4}
              value={formData.featuresText}
              onChange={(e) => setFormData((prev) => ({ ...prev, featuresText: e.target.value }))}
              placeholder={"Weather-resistant acrylic formula\nAnti-algal & anti-fungal shield\nLow VOC & eco-friendly"}
              className={textareaCls}
            />
          </Field>

          <FormGrid cols={2}>
            <Field
              label="Highlight Images (One URL per line)"
              hint={
                <label className="inline-flex cursor-pointer items-center gap-1 text-[#D4AF37] hover:underline">
                  <Upload className="h-3 w-3" />
                  {uploadingField === "highlightImagesText" ? "Uploading…" : "Upload & append image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingField === "highlightImagesText"}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadFile(f, "highlightImagesText");
                      e.target.value = "";
                    }}
                  />
                </label>
              }
            >
              <textarea
                rows={4}
                value={formData.highlightImagesText}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, highlightImagesText: e.target.value }))
                }
                placeholder="/uploads/products/highlight-1.png"
                className={monoTextareaCls}
              />
            </Field>

            <Field
              label="Detail Gallery Images (One URL per line)"
              hint={
                <label className="inline-flex cursor-pointer items-center gap-1 text-[#D4AF37] hover:underline">
                  <Upload className="h-3 w-3" />
                  {uploadingField === "detailImagesText" ? "Uploading…" : "Upload & append image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingField === "detailImagesText"}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadFile(f, "detailImagesText");
                      e.target.value = "";
                    }}
                  />
                </label>
              }
            >
              <textarea
                rows={4}
                value={formData.detailImagesText}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, detailImagesText: e.target.value }))
                }
                placeholder="/uploads/products/detail-1.png"
                className={monoTextareaCls}
              />
            </Field>
          </FormGrid>

          <div className="space-y-3 rounded-xl border border-[#D8C7B3]/15 bg-[#041411]/60 p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#EDE4D8]">
                  Product FAQs ({formData.faqs.length})
                </h3>
                <p className="text-[11px] text-[#C2B69D]/65">
                  Optional Q&amp;A shown on the product details page.
                </p>
              </div>
              <Button type="button" size="sm" variant="secondary" icon={Plus} onClick={addFaqRow}>
                Add FAQ
              </Button>
            </div>

            {formData.faqs.length > 0 && (
              <div className="space-y-3">
                {formData.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 rounded-xl border border-[#D8C7B3]/15 bg-[#0A2621]/70 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium text-[#D4AF37]">FAQ #{idx + 1}</span>
                      <IconButton
                        icon={X}
                        label={`Remove FAQ ${idx + 1}`}
                        tone="danger"
                        onClick={() => removeFaqRow(idx)}
                      />
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaqRow(idx, "question", e.target.value)}
                      placeholder="Question…"
                      className={inputCls}
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => updateFaqRow(idx, "answer", e.target.value)}
                      placeholder="Answer…"
                      className={textareaCls}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <FormActions>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Create Product"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
