"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Package, Plus, Trash2, Upload, RefreshCw } from "lucide-react";
import {
  PageHeader,
  Card,
  Toolbar,
  FormGrid,
  Field,
  FormActions,
  Button,
  IconButton,
  buttonCls,
  Badge,
  SearchInput,
  DataTable,
  Th,
  Td,
  trCls,
  EmptyState,
  LoadingState,
  inputCls,
  selectCls,
  textareaCls,
  useToast,
  useConfirm,
} from "@/components/admin/ui";

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
  const toast = useToast();
  const confirm = useConfirm();

  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
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
      if (!res.ok) throw new Error(data?.error || "Image upload failed");
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
        toast.success("Image uploaded and converted to WebP");
      }
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
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
        toast.success("Product added to catalogue");
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
        const err = await res.json().catch(() => null);
        toast.error(err?.error || "Failed to add product");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to add product");
    } finally {
      setSaving(false);
    }
  }

  async function updateSortOrder(id: string, currentOrder: number, newOrder: number) {
    if (currentOrder === newOrder) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: newOrder }),
      });
      if (!res.ok) throw new Error("Failed to update sort order");
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, sortOrder: newOrder } : p))
      );
      toast.success("Sort order updated");
    } catch (err: any) {
      toast.error(err?.message || "Could not update sort order");
    }
  }

  async function handleDelete(p: ProductRow) {
    const ok = await confirm({
      title: `Delete "${p.name}"?`,
      description: "This product and its catalogue listing will be permanently removed.",
      confirmLabel: "Delete Product",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      toast.success("Product deleted");
      load();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const mainCats = cats.filter((c) => !c.parentId);
  const subCats = cats.filter((c) => c.parentId === form.categoryId);
  const catMap = new Map(cats.map((c) => [c.id, c.name]));

  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== "all" && p.categoryId !== categoryFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      (catMap.get(p.categoryId) || "").toLowerCase().includes(q) ||
      (p.subcategoryId ? (catMap.get(p.subcategoryId) || "").toLowerCase().includes(q) : false)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Package}
        title="Products"
        description="Add paint products under categories and ranges. Uploaded images automatically convert to WebP."
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
            Refresh
          </Button>
        }
      />

      <Card
        title="Add New Product"
        description="Complete the product details below to publish a new item to the public catalogue."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid cols={3}>
            <Field label="Category" required>
              <select
                required
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value, subcategoryId: "" })}
                className={selectCls}
              >
                <option value="">Select Category</option>
                {mainCats.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Subcategory / Range">
              <select
                value={form.subcategoryId}
                onChange={(e) => setForm({ ...form, subcategoryId: e.target.value })}
                className={selectCls}
              >
                <option value="">None / General</option>
                {subCats.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Product Name" required>
              <input
                required
                placeholder="e.g. Uni-Glosss 18"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={4}>
            <Field label="URL Slug" hint="Auto-generated if blank">
              <input
                placeholder="e.g. uni-glosss-18"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={`${inputCls} font-mono`}
              />
            </Field>
            <Field label="Tagline">
              <input
                placeholder="e.g. Superior Exterior Shield"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Warranty">
              <input
                placeholder="e.g. 11 Years"
                value={form.warranty}
                onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Sort Order">
              <input
                type="number"
                placeholder="0"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Product Description" required>
            <textarea
              required
              rows={3}
              placeholder="Describe the paint's finish, protection benefits, and ideal surfaces..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={textareaCls}
            />
          </Field>

          <FormGrid cols={2}>
            <Field label="Packshot Image" hint="Stored in /uploads/products">
              <div className="flex gap-2">
                <input
                  placeholder="/uploads/products/..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className={`${inputCls} font-mono text-xs`}
                />
                <label className={buttonCls("secondary", "md", "shrink-0")}>
                  <Upload className="h-4 w-4 text-[#D4AF37]" />
                  <span>{uploadingField === "image" ? "Uploading..." : "Packshot"}</span>
                  <input type="file" accept="image/*" onChange={(e) => uploadWebp(e, "image")} className="hidden" />
                </label>
              </div>
            </Field>

            <Field label="Card Background Image" hint="Shown on hover over product cards">
              <div className="flex gap-2">
                <input
                  placeholder="/uploads/products/..."
                  value={form.bgImage}
                  onChange={(e) => setForm({ ...form, bgImage: e.target.value })}
                  className={`${inputCls} font-mono text-xs`}
                />
                <label className={buttonCls("secondary", "md", "shrink-0")}>
                  <Upload className="h-4 w-4 text-[#D4AF37]" />
                  <span>{uploadingField === "bgImage" ? "Uploading..." : "Card BG"}</span>
                  <input type="file" accept="image/*" onChange={(e) => uploadWebp(e, "bgImage")} className="hidden" />
                </label>
              </div>
            </Field>
          </FormGrid>

          <FormGrid cols={2}>
            <Field
              label="Highlight Icons / Images"
              hint={
                <span className="flex items-center justify-between gap-2">
                  <span>One image path per line</span>
                  <label className="cursor-pointer font-semibold text-[#D4AF37] hover:underline">
                    {uploadingField === "highlight" ? "Uploading..." : "+ Upload WebP"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadWebp(e, "highlight")}
                      className="hidden"
                    />
                  </label>
                </span>
              }
            >
              <textarea
                rows={3}
                placeholder="/uploads/products/common/..."
                value={form.highlightImagesText}
                onChange={(e) => setForm({ ...form, highlightImagesText: e.target.value })}
                className={`${textareaCls} font-mono text-xs`}
              />
            </Field>

            <Field label="Key Features" hint="One feature per line">
              <textarea
                rows={3}
                placeholder={"High gloss finish\n11-year performance warranty"}
                value={form.featuresText}
                onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                className={textareaCls}
              />
            </Field>
          </FormGrid>

          <FormActions>
            <Button type="submit" variant="primary" icon={Plus} loading={saving}>
              Add Product
            </Button>
          </FormActions>
        </form>
      </Card>

      <Toolbar className="justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search products by name, slug, or category..."
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className={`${selectCls} sm:w-56`}
          >
            <option value="all">All Categories</option>
            {mainCats.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Badge tone="gold">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={6} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          description={
            search || categoryFilter !== "all"
              ? "No products match your search or category filter."
              : "Add your first product using the form above."
          }
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th className="w-24">Order</Th>
              <Th>Product</Th>
              <Th>Category</Th>
              <Th>Subcategory</Th>
              <Th>Warranty</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className={trCls}>
                <Td>
                  <input
                    type="number"
                    aria-label={`Sort order for ${p.name}`}
                    defaultValue={p.sortOrder ?? 0}
                    onBlur={(e) => updateSortOrder(p.id, p.sortOrder ?? 0, parseInt(e.target.value, 10) || 0)}
                    className={`${inputCls} w-16 px-2 py-1 text-center text-xs`}
                  />
                </Td>
                <Td>
                  <div className="font-semibold text-[#EDE4D8]">{p.name}</div>
                  {p.tagline && <div className="mt-0.5 text-[11px] text-[#C2B69D]/80">{p.tagline}</div>}
                </Td>
                <Td>
                  <Badge tone="neutral">{catMap.get(p.categoryId) || p.categoryId}</Badge>
                </Td>
                <Td>
                  {p.subcategoryId ? (
                    <span className="text-xs text-[#C2B69D]">
                      {catMap.get(p.subcategoryId) || p.subcategoryId}
                    </span>
                  ) : (
                    <span className="text-[#C2B69D]/40">—</span>
                  )}
                </Td>
                <Td>
                  {p.warranty ? (
                    <Badge tone="gold">{p.warranty}</Badge>
                  ) : (
                    <span className="text-[#C2B69D]/40">—</span>
                  )}
                </Td>
                <Td align="right">
                  <IconButton
                    icon={Trash2}
                    label="Delete product"
                    tone="danger"
                    onClick={() => handleDelete(p)}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}
    </div>
  );
}
