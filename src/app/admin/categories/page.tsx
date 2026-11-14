"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Edit2, FolderTree, Plus, Trash2, Upload } from "lucide-react";
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
  selectCls,
  textareaCls,
  trCls,
  useConfirm,
  useToast,
} from "@/components/admin/ui";

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  description: string | null;
  badge: string | null;
  banner: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface CategoryFormState {
  name: string;
  slug: string;
  parentId: string;
  description: string;
  badge: string;
  banner: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyForm: CategoryFormState = {
  name: "",
  slug: "",
  parentId: "",
  description: "",
  badge: "",
  banner: "",
  sortOrder: 0,
  isActive: true,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminCategoriesPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [parentFilter, setParentFilter] = useState<"all" | "top" | "sub">("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const json = await res.json();
      setCategories(Array.isArray(json.data) ? json.data : []);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topLevelCategories = useMemo(
    () => categories.filter((c) => !c.parentId),
    [categories]
  );

  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categories) {
      map.set(c.id, c.name);
    }
    return map;
  }, [categories]);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories.filter((c) => {
      if (parentFilter === "top" && c.parentId) return false;
      if (parentFilter === "sub" && !c.parentId) return false;
      if (!q) return true;
      const parentName = c.parentId ? categoryNameById.get(c.parentId) || "" : "";
      return (
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.badge || "").toLowerCase().includes(q) ||
        parentName.toLowerCase().includes(q)
      );
    });
  }, [categories, parentFilter, search, categoryNameById]);

  const openAddModal = () => {
    setEditing(null);
    setFormData(emptyForm);
    setSlugTouched(false);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditing(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId || "",
      description: cat.description || "",
      badge: cat.badge || "",
      banner: cat.banner || "",
      sortOrder: cat.sortOrder ?? 0,
      isActive: cat.isActive ?? true,
    });
    setSlugTouched(true);
    setIsModalOpen(true);
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "categories");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setFormData((prev) => ({ ...prev, banner: data.url }));
      toast.success("Banner uploaded");
    } catch (err: any) {
      toast.error(err?.message || "Failed to upload banner");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.slug.trim()) {
      toast.error("Name and slug are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        parentId: formData.parentId || null,
        description: formData.description.trim() || null,
        badge: formData.badge.trim() || null,
        banner: formData.banner.trim() || null,
        sortOrder: Number(formData.sortOrder) || 0,
        isActive: formData.isActive,
      };

      const url = editing ? `/api/admin/categories/${editing.id}` : "/api/admin/categories";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json.error || `Failed to ${editing ? "update" : "create"} category`);
        return;
      }

      toast.success(editing ? "Category updated" : "Category created");
      setIsModalOpen(false);
      await loadCategories();
    } catch {
      toast.error("Network error while saving category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    const ok = await confirm({
      title: `Delete "${cat.name}"?`,
      description:
        "This will permanently delete this category along with any products directly assigned to it. Subcategories under it will become top-level.",
      confirmLabel: "Delete Category",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/categories/${cat.id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json.error || "Failed to delete category");
        return;
      }
      toast.success("Category deleted");
      await loadCategories();
    } catch {
      toast.error("Network error while deleting category");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FolderTree}
        title="Categories"
        description="Manage product categories and subcategories shown across your storefront navigation and catalog."
        actions={
          <Button variant="primary" icon={Plus} onClick={openAddModal}>
            Add Category
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search name, slug, badge…"
        />
        <select
          aria-label="Filter by hierarchy level"
          value={parentFilter}
          onChange={(e) => setParentFilter(e.target.value as "all" | "top" | "sub")}
          className={`${selectCls} w-full sm:w-52`}
        >
          <option value="all">All Levels ({categories.length})</option>
          <option value="top">Top-Level Only ({topLevelCategories.length})</option>
          <option value="sub">
            Subcategories ({categories.length - topLevelCategories.length})
          </option>
        </select>
        <span className="text-xs text-[#C2B69D]/70 sm:ml-auto">
          Showing {filteredCategories.length} of {categories.length}
        </span>
      </Toolbar>

      {loading ? (
        <LoadingState rows={6} />
      ) : filteredCategories.length === 0 ? (
        <EmptyState
          icon={FolderTree}
          title={categories.length === 0 ? "No categories yet" : "No matching categories"}
          description={
            categories.length === 0
              ? "Create your first product category to organize your range."
              : "Try clearing your search or level filter."
          }
          action={
            categories.length === 0 ? (
              <Button variant="primary" icon={Plus} onClick={openAddModal}>
                Add Category
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setParentFilter("all");
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
              <Th>Category</Th>
              <Th>Slug</Th>
              <Th>Level / Parent</Th>
              <Th align="center">Order</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => {
              const parentName = cat.parentId ? categoryNameById.get(cat.parentId) : null;
              return (
                <tr key={cat.id} className={trCls}>
                  <Td>
                    <div className="flex items-center gap-3">
                      {cat.banner ? (
                        <img
                          src={cat.banner}
                          alt={cat.name}
                          className="h-9 w-12 shrink-0 rounded-lg border border-[#D8C7B3]/15 object-cover bg-[#041411]"
                        />
                      ) : (
                        <div className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg border border-[#D8C7B3]/15 bg-[#041411] text-[10px] text-[#C2B69D]/50">
                          No img
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 font-medium text-[#EDE4D8]">
                          <span className="truncate">{cat.name}</span>
                          {cat.badge && <Badge tone="gold">{cat.badge}</Badge>}
                        </div>
                        {cat.description && (
                          <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-[#C2B69D]/70">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <code className="rounded bg-[#041411] px-2 py-0.5 text-xs text-[#C2B69D]">
                      {cat.slug}
                    </code>
                  </Td>
                  <Td>
                    {parentName ? (
                      <Badge tone="info">Sub of {parentName}</Badge>
                    ) : (
                      <Badge tone="neutral">Top-level</Badge>
                    )}
                  </Td>
                  <Td align="center">
                    <span className="font-mono text-xs text-[#EDE4D8]">{cat.sortOrder}</span>
                  </Td>
                  <Td>
                    <Badge tone={cat.isActive ? "success" : "danger"}>
                      {cat.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Td>
                  <Td align="right">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      <IconButton
                        icon={Edit2}
                        label={`Edit ${cat.name}`}
                        tone="gold"
                        onClick={() => openEditModal(cat)}
                      />
                      <IconButton
                        icon={Trash2}
                        label={`Delete ${cat.name}`}
                        tone="danger"
                        onClick={() => handleDelete(cat)}
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
        title={editing ? `Edit Category — ${editing.name}` : "Add New Category"}
        subtitle="Configure category hierarchy, display badge, banner, and visibility."
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid cols={2}>
            <Field label="Category Name" required>
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
                placeholder="e.g. Exterior Emulsions"
                className={inputCls}
              />
            </Field>

            <Field label="URL Slug" required hint="Used in /products/[slug]">
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
                }}
                placeholder="exterior-emulsions"
                className={inputCls}
              />
            </Field>

            <Field label="Parent Category" hint="Leave empty for top-level">
              <select
                value={formData.parentId}
                onChange={(e) => setFormData((prev) => ({ ...prev, parentId: e.target.value }))}
                className={selectCls}
              >
                <option value="">None (Top-level Category)</option>
                {topLevelCategories
                  .filter((c) => c.id !== editing?.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </Field>

            <Field label="Badge" hint="Optional short tag (e.g. NEW)">
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                placeholder="e.g. Premium Range"
                className={inputCls}
              />
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

            <Field label="Status">
              <label className="flex h-[42px] cursor-pointer items-center gap-2.5 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] px-3.5 text-sm text-[#EDE4D8]">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className={checkboxCls}
                />
                <span>Active on storefront</span>
              </label>
            </Field>
          </FormGrid>

          <Field label="Banner Image URL">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={formData.banner}
                onChange={(e) => setFormData((prev) => ({ ...prev, banner: e.target.value }))}
                placeholder="/uploads/categories/banner.jpg or https://..."
                className={inputCls}
              />
              <label className="inline-flex h-[42px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#D8C7B3]/20 bg-white/[0.04] px-4 text-xs font-semibold text-[#EDE4D8] transition hover:border-[#D4AF37]/40 hover:bg-white/[0.08]">
                <Upload className="h-3.5 w-3.5 text-[#D4AF37]" />
                {uploading ? "Uploading…" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={handleBannerUpload}
                  className="hidden"
                />
              </label>
            </div>
            {formData.banner && (
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] p-2">
                <img
                  src={formData.banner}
                  alt="Category banner preview"
                  className="h-12 w-24 rounded-lg object-cover"
                />
                <span className="truncate text-xs text-[#C2B69D]">{formData.banner}</span>
              </div>
            )}
          </Field>

          <Field label="Description">
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Short SEO & overview description for this category…"
              className={textareaCls}
            />
          </Field>

          <FormActions>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Create Category"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
