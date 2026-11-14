"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SlidersHorizontal, Plus, Trash2, RefreshCw } from "lucide-react";
import {
  PageHeader,
  Card,
  Toolbar,
  FormGrid,
  Field,
  FormActions,
  Button,
  IconButton,
  Badge,
  SearchInput,
  EmptyState,
  LoadingState,
  inputCls,
  selectCls,
  useToast,
  useConfirm,
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
}

export default function AdminCuratedPalettesPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [shades, setShades] = useState<CuratedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [form, setForm] = useState({
    category: "Most Searched: Living Room",
    subcategory: "Warm Neutrals & Greiges",
    name: "",
    hex: "#",
    recommendedSurface: "Interior Accent Wall",
    moodAndDescription: "",
    sortOrder: "0",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/curated-palettes?limit=300");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load curated palettes");
      setShades(Array.isArray(json?.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load curated palettes");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/curated-palettes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Shade added to curated decks");
        setForm({
          category: "Most Searched: Living Room",
          subcategory: "Warm Neutrals & Greiges",
          name: "",
          hex: "#",
          recommendedSurface: "Interior Accent Wall",
          moodAndDescription: "",
          sortOrder: "0",
        });
        load();
      } else {
        const err = await res.json().catch(() => null);
        toast.error(err?.error || "Failed to add shade");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to add shade");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: CuratedRow) {
    const ok = await confirm({
      title: `Delete "${s.name}"?`,
      description: `This curated shade (${s.hex}) will be permanently removed from ${s.category}.`,
      confirmLabel: "Delete Shade",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/curated-palettes/${s.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      setShades((prev) => prev.filter((item) => item.id !== s.id));
      toast.success("Curated shade deleted");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const categories = Array.from(new Set(shades.map((s) => s.category))).sort();

  const filtered = shades.filter((s) => {
    if (categoryFilter !== "all" && s.category !== categoryFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.subcategory.toLowerCase().includes(q) ||
      s.hex.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={SlidersHorizontal}
        title="Curated Color Palettes"
        description="Editorial room colour palettes for living rooms, bedrooms, kitchens, and exteriors."
        actions={
          <>
            <Badge tone="gold">{shades.length} Shades in Database</Badge>
            <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
              Refresh
            </Button>
          </>
        }
      />

      <Card
        title="Add Curated Palette Shade"
        description="Assign a colour swatch to a room category and mood collection."
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <FormGrid cols={3}>
            <Field label="Room Category" required>
              <input
                required
                placeholder="e.g. Most Searched: Living Room"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Subcategory / Mood" required>
              <input
                required
                placeholder="e.g. Warm Neutrals & Greiges"
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Shade Name" required>
              <input
                required
                placeholder="e.g. Sandstone Mist"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={4}>
            <Field label="Hex Colour" required>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  aria-label="Pick palette colour"
                  value={form.hex.startsWith("#") && form.hex.length === 7 ? form.hex : "#C2B69D"}
                  onChange={(e) => setForm({ ...form, hex: e.target.value.toUpperCase() })}
                  className="h-10 w-11 shrink-0 cursor-pointer rounded-xl border border-white/12 bg-[#041411] p-1"
                />
                <input
                  required
                  placeholder="#C2B69D"
                  value={form.hex}
                  onChange={(e) => setForm({ ...form, hex: e.target.value })}
                  className={`${inputCls} font-mono`}
                />
              </div>
            </Field>
            <Field label="Recommended Surface">
              <input
                placeholder="e.g. Interior Accent Wall"
                value={form.recommendedSurface}
                onChange={(e) => setForm({ ...form, recommendedSurface: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Mood Description">
              <input
                placeholder="Calm, sunlit earth tone"
                value={form.moodAndDescription}
                onChange={(e) => setForm({ ...form, moodAndDescription: e.target.value })}
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

          <FormActions>
            <Button type="submit" variant="primary" icon={Plus} loading={saving}>
              Add to Curated Decks
            </Button>
          </FormActions>
        </form>
      </Card>

      <Toolbar className="justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by shade name, hex, room category, or mood..."
            className="sm:max-w-sm"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by room category"
            className={`${selectCls} sm:w-64`}
          >
            <option value="all">All Room Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Badge tone="neutral">
          Showing {Math.min(filtered.length, 72)} of {filtered.length}
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={SlidersHorizontal}
          title="No curated shades found"
          description={
            search || categoryFilter !== "all"
              ? "Try adjusting your search or room category filter."
              : "Add your first curated colour swatch using the form above."
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.slice(0, 72).map((s) => (
            <div
              key={s.id}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0A2621] p-3"
            >
              <div>
                <div
                  className="mb-2.5 h-16 w-full rounded-lg border border-white/10 shadow-inner"
                  style={{ backgroundColor: s.hex }}
                />
                <h4 className="truncate text-xs font-semibold text-[#EDE4D8]" title={s.name}>
                  {s.name}
                </h4>
                <p className="mt-0.5 font-mono text-[11px] text-[#E3C25A]">{s.hex}</p>
                <p className="mt-0.5 truncate text-[10px] text-[#C2B69D]" title={s.subcategory}>
                  {s.subcategory}
                </p>
              </div>
              <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2">
                <span className="truncate text-[10px] text-[#C2B69D]/60" title={s.category}>
                  {s.category}
                </span>
                <IconButton
                  icon={Trash2}
                  label={`Delete ${s.name}`}
                  tone="danger"
                  onClick={() => handleDelete(s)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
