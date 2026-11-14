"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Layers, Plus, Trash2, Upload, RefreshCw } from "lucide-react";
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
  slug: string;
  description: string | null;
  badge: string | null;
  banner: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminCategoriesPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "main" | "sub">("all");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    parentId: "",
    description: "",
    badge: "",
    banner: "",
    sortOrder: 0,
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load categories");
      setRows(Array.isArray(data?.data) ? data.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load categories");
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
      fd.append("folder", "categories");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      if (data?.url) {
        setForm((prev) => ({ ...prev, banner: data.url }));
        toast.success("Banner uploaded and converted to WebP");
      }
    } catch (err: any) {
      toast.error(err?.message || "Banner upload failed");
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
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          parentId: form.parentId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save category");
      toast.success("Category saved successfully");
      setForm({ name: "", slug: "", parentId: "", description: "", badge: "", banner: "", sortOrder: 0 });
      load();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(row: CategoryRow) {
    const ok = await confirm({
      title: `Delete "${row.name}"?`,
      description: row.parentId
        ? "This subcategory/range will be permanently removed."
        : "This main category will be permanently removed.",
      confirmLabel: "Delete Category",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/categories/${row.id}`, { method: "DELETE" });
      const err = res.ok ? null : await res.json().catch(() => null);
      if (!res.ok) throw new Error(err?.error || "Delete failed");
      toast.success("Category deleted");
      load();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const mainCats = rows.filter((r) => !r.parentId);
  const catMap = new Map(rows.map((r) => [r.id, r.name]));

  const filtered = rows.filter((r) => {
    if (typeFilter === "main" && r.parentId) return false;
    if (typeFilter === "sub" && !r.parentId) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.slug.toLowerCase().includes(q) ||
      (r.parentId && (catMap.get(r.parentId) || "").toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Layers}
        title="Categories & Subcategories"
        description="Organize top-level product categories and their product ranges or subcategories."
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
            Refresh
          </Button>
        }
      />

      <Card
        title="Add Category or Subcategory"
        description="Leave parent empty to create a main category, or choose a parent to create a range."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid cols={3}>
            <Field label="Name" required>
              <input
                required
                placeholder="e.g. Exterior Emulsion Paints"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="URL Slug" hint="Auto-generated if left blank">
              <input
                placeholder="e.g. exterior-emulsion-paints"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={`${inputCls} font-mono`}
              />
            </Field>
            <Field label="Parent Category">
              <select
                value={form.parentId}
                onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                className={selectCls}
              >
                <option value="">None (Main Category)</option>
                {mainCats.map((c) => (
                  <option key={c.id} value={c.id}>
                    Subcategory of: {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </FormGrid>

          <FormGrid cols={3}>
            <Field label="Badge Label" hint="Optional highlight pill">
              <input
                placeholder="e.g. Popular"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Sort Order">
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })}
                className={inputCls}
              />
            </Field>
            <Field label="Banner Image" hint="Auto-converts uploaded image to WebP">
              <div className="flex gap-2">
                <input
                  placeholder="/uploads/categories/..."
                  value={form.banner}
                  onChange={(e) => setForm({ ...form, banner: e.target.value })}
                  className={`${inputCls} font-mono text-xs`}
                />
                <label className={buttonCls("secondary", "md", "shrink-0")}>
                  <Upload className="h-4 w-4 text-[#D4AF37]" />
                  <span>{uploading ? "Uploading..." : "Upload"}</span>
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            </Field>
          </FormGrid>

          <Field label="Description">
            <textarea
              rows={2}
              placeholder="Short overview shown on the category landing page..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={textareaCls}
            />
          </Field>

          <FormActions>
            <Button type="submit" variant="primary" icon={Plus} loading={saving}>
              Save Category
            </Button>
          </FormActions>
        </form>
      </Card>

      <Toolbar className="justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search categories or slugs..."
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | "main" | "sub")}
            aria-label="Filter by category type"
            className={`${selectCls} sm:w-48`}
          >
            <option value="all">All Types</option>
            <option value="main">Main Categories</option>
            <option value="sub">Subcategories</option>
          </select>
        </div>
        <Badge tone="gold">
          {filtered.length} {filtered.length === 1 ? "category" : "categories"}
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No categories found"
          description={
            search || typeFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Create your first main category using the form above."
          }
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Slug</Th>
              <Th>Banner</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className={trCls}>
                <Td>
                  <div className="flex flex-wrap items-center gap-2 font-semibold text-[#EDE4D8]">
                    <span>{r.name}</span>
                    {r.badge && <Badge tone="gold">{r.badge}</Badge>}
                  </div>
                </Td>
                <Td>
                  {r.parentId ? (
                    <Badge tone="neutral">Subcategory: {catMap.get(r.parentId) || r.parentId}</Badge>
                  ) : (
                    <Badge tone="gold">Main Category</Badge>
                  )}
                </Td>
                <Td className="font-mono text-xs">{r.slug}</Td>
                <Td className="max-w-[220px]">
                  {r.banner ? (
                    <span className="block truncate font-mono text-xs text-[#E3C25A]" title={r.banner}>
                      {r.banner}
                    </span>
                  ) : (
                    <span className="text-[#C2B69D]/40">—</span>
                  )}
                </Td>
                <Td align="right">
                  <IconButton
                    icon={Trash2}
                    label="Delete category"
                    tone="danger"
                    onClick={() => handleDelete(r)}
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
