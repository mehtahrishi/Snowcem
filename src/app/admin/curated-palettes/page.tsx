"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, Palette, Plus, Trash2 } from "lucide-react";
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
  SearchInput,
  Toolbar,
  checkboxCls,
  inputCls,
  selectCls,
  textareaCls,
  useConfirm,
  useToast,
} from "@/components/admin/ui";

interface CuratedRow {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  hex: string;
  recommendedSurface: string | null;
  moodAndDescription: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface CuratedFormState {
  category: string;
  subcategory: string;
  name: string;
  hex: string;
  recommendedSurface: string;
  moodAndDescription: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyForm: CuratedFormState = {
  category: "",
  subcategory: "",
  name: "",
  hex: "#D4AF37",
  recommendedSurface: "",
  moodAndDescription: "",
  sortOrder: 0,
  isActive: true,
};

export default function AdminCuratedPalettesPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [shades, setShades] = useState<CuratedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<CuratedRow | null>(null);
  const [formData, setFormData] = useState<CuratedFormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/curated-palettes?limit=500");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load curated palettes");
      setShades(Array.isArray(json.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load curated palettes");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const s of shades) {
      if (s.category) set.add(s.category);
    }
    return Array.from(set).sort();
  }, [shades]);

  const filteredShades = useMemo(() => {
    const q = search.trim().toLowerCase();
    return shades.filter((s) => {
      if (categoryFilter !== "all" && s.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.hex.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.subcategory.toLowerCase().includes(q) ||
        (s.recommendedSurface || "").toLowerCase().includes(q)
      );
    });
  }, [shades, categoryFilter, search]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({
      ...emptyForm,
      category: categories[0] || "",
      sortOrder: shades.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (shade: CuratedRow) => {
    setEditing(shade);
    setFormData({
      category: shade.category,
      subcategory: shade.subcategory,
      name: shade.name,
      hex: shade.hex || "#D4AF37",
      recommendedSurface: shade.recommendedSurface || "",
      moodAndDescription: shade.moodAndDescription || "",
      sortOrder: shade.sortOrder ?? 0,
      isActive: shade.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.category.trim() ||
      !formData.subcategory.trim() ||
      !formData.name.trim() ||
      !formData.hex.trim()
    ) {
      toast.error("Category, subcategory, shade name, and hex color are required");
      return;
    }

    setSaving(true);
    try {
      const normalizedHex = formData.hex.trim().startsWith("#")
        ? formData.hex.trim().toUpperCase()
        : `#${formData.hex.trim().toUpperCase()}`;

      const payload = {
        category: formData.category.trim(),
        subcategory: formData.subcategory.trim(),
        name: formData.name.trim(),
        hex: normalizedHex,
        recommendedSurface: formData.recommendedSurface.trim(),
        moodAndDescription: formData.moodAndDescription.trim(),
        sortOrder: Number(formData.sortOrder) || 0,
        isActive: formData.isActive,
      };

      const url = editing
        ? `/api/admin/curated-palettes/${editing.id}`
        : "/api/admin/curated-palettes";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || `Failed to ${editing ? "update" : "create"} curated shade`);
        return;
      }

      toast.success(editing ? "Curated shade updated" : "Curated shade added");
      setIsModalOpen(false);
      await load();
    } catch {
      toast.error("Network error while saving curated shade");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (shade: CuratedRow) => {
    const ok = await confirm({
      title: `Delete "${shade.name}"?`,
      description: `This will remove ${shade.hex} from curated palettes.`,
      confirmLabel: "Delete Shade",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/curated-palettes/${shade.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || "Failed to delete shade");
        return;
      }
      toast.success("Curated shade deleted");
      await load();
    } catch {
      toast.error("Network error while deleting shade");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Palette}
        title="Curated Palettes"
        description="Manage editorial colour inspirations, surface guidance, and mood swatches."
        actions={
          <Button variant="primary" icon={Plus} onClick={openAddModal}>
            Add Curated Shade
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search shade name, hex, surface…"
        />
        <select
          aria-label="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`${selectCls} w-full sm:w-56`}
        >
          <option value="all">All Categories ({shades.length})</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="text-xs text-[#C2B69D]/70 sm:ml-auto">
          Showing {filteredShades.length} of {shades.length}
        </span>
      </Toolbar>

      {loading ? (
        <LoadingState rows={5} />
      ) : filteredShades.length === 0 ? (
        <EmptyState
          icon={Palette}
          title={shades.length === 0 ? "No curated shades yet" : "No matching shades"}
          description={
            shades.length === 0
              ? "Add designer-curated colour recommendations for the Colour Catalogue."
              : "Try clearing your search or category filter."
          }
          action={
            shades.length === 0 ? (
              <Button variant="primary" icon={Plus} onClick={openAddModal}>
                Add Curated Shade
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredShades.map((shade) => (
            <article
              key={shade.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#D8C7B3]/15 bg-[#0A2621] transition hover:border-[#D4AF37]/35"
            >
              <div
                className="relative h-28 w-full border-b border-[#D8C7B3]/10"
                style={{ backgroundColor: shade.hex }}
              >
                <span className="absolute bottom-2.5 left-3 rounded-md bg-black/55 px-2 py-0.5 font-mono text-xs font-medium text-white backdrop-blur-sm">
                  {shade.hex}
                </span>
                <div className="absolute right-2.5 top-2.5">
                  <Badge tone={shade.isActive ? "success" : "danger"}>
                    {shade.isActive ? "Active" : "Hidden"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <div>
                  <h2 className="text-sm font-semibold text-[#EDE4D8]">{shade.name}</h2>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <Badge tone="gold">{shade.category}</Badge>
                    <Badge tone="neutral">{shade.subcategory}</Badge>
                  </div>
                  {shade.recommendedSurface && (
                    <p className="mt-2 text-xs text-[#C2B69D]">
                      <span className="text-[#C2B69D]/60">Surface:</span> {shade.recommendedSurface}
                    </p>
                  )}
                  {shade.moodAndDescription && (
                    <p className="mt-1 line-clamp-2 text-xs text-[#C2B69D]/75">
                      {shade.moodAndDescription}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[#D8C7B3]/10 pt-3">
                  <span className="font-mono text-[11px] text-[#C2B69D]/60">
                    Order #{shade.sortOrder}
                  </span>
                  <div className="inline-flex items-center gap-1.5">
                    <IconButton
                      icon={Edit2}
                      label={`Edit ${shade.name}`}
                      tone="gold"
                      onClick={() => openEditModal(shade)}
                    />
                    <IconButton
                      icon={Trash2}
                      label={`Delete ${shade.name}`}
                      tone="danger"
                      onClick={() => handleDelete(shade)}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => !saving && setIsModalOpen(false)}
        title={editing ? `Edit Shade — ${editing.name}` : "Add Curated Shade"}
        subtitle="Define palette taxonomy, hex value, recommended surfaces, and mood description."
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid cols={2}>
            <Field label="Shade Name" required>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Sunlit Ivory"
                className={inputCls}
              />
            </Field>

            <Field label="Hex Colour" required>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  aria-label="Pick shade hex colour"
                  value={
                    formData.hex.startsWith("#") && formData.hex.length === 7
                      ? formData.hex
                      : "#D4AF37"
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, hex: e.target.value.toUpperCase() }))
                  }
                  className="h-10 w-11 shrink-0 cursor-pointer rounded-xl border border-[#D8C7B3]/15 bg-[#041411] p-1"
                />
                <input
                  type="text"
                  required
                  value={formData.hex}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, hex: e.target.value.toUpperCase() }))
                  }
                  placeholder="#D4AF37"
                  className={`${inputCls} font-mono`}
                />
              </div>
            </Field>

            <Field label="Category" required>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="e.g. Warm Neutrals, Exterior Heritage"
                className={inputCls}
              />
            </Field>

            <Field label="Subcategory" required>
              <input
                type="text"
                required
                value={formData.subcategory}
                onChange={(e) => setFormData((prev) => ({ ...prev, subcategory: e.target.value }))}
                placeholder="e.g. Soft Creams, Earthy Terracottas"
                className={inputCls}
              />
            </Field>

            <Field label="Recommended Surface">
              <input
                type="text"
                value={formData.recommendedSurface}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, recommendedSurface: e.target.value }))
                }
                placeholder="e.g. Exterior Facade, Living Room Feature Wall"
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
          </FormGrid>

          <Field label="Mood & Description">
            <textarea
              rows={3}
              value={formData.moodAndDescription}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, moodAndDescription: e.target.value }))
              }
              placeholder="Design inspiration, lighting notes, and pairing suggestions…"
              className={textareaCls}
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] px-3.5 py-2.5 text-sm text-[#EDE4D8]">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
              className={checkboxCls}
            />
            <span>Active in Curated Palettes</span>
          </label>

          <FormActions>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Add Shade"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
