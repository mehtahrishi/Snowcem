"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Palette,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  Wand2,
} from "lucide-react";
import { getClosestColorName } from "@/lib/colors/namer";
import CustomModal from "@/components/admin/CustomModal";
import {
  PageHeader,
  Toolbar,
  FormGrid,
  Field,
  FormActions,
  Button,
  IconButton,
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
  checkboxCls,
  useToast,
  useConfirm,
} from "@/components/admin/ui";

interface ColorItem {
  id: string;
  name: string;
  code: string;
  hex: string;
  category: string;
  finish?: string;
  popular?: boolean;
}

export default function AdminColorsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [colors, setColors] = useState<ColorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<ColorItem | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    hex: "#1A365D",
    category: "Uni-glosss",
    finish: "Gloss",
    popular: false,
  });

  const [detectedColorName, setDetectedColorName] = useState("Cosmic Ocean");
  const [colorPaletteInfo, setColorPaletteInfo] = useState<{
    pantone: string;
    ntc: string;
  }>({ pantone: "", ntc: "" });

  useEffect(() => {
    if (formData.hex) {
      try {
        const result = getClosestColorName(formData.hex);
        setDetectedColorName(result.name);
        setColorPaletteInfo({
          ntc: result.allMatches.ntc?.[0]?.name || result.name,
          pantone: result.allMatches.pantone?.[0]?.name || "",
        });
      } catch {
        // ignore invalid partial hex
      }
    }
  }, [formData.hex]);

  const fetchColors = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (categoryFilter && categoryFilter !== "all") params.append("category", categoryFilter);

      const res = await fetch(`/api/admin/colors?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setColors(data.data || []);
      } else {
        toast.error(data.error || "Failed to load color catalogue");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch colors");
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, toast]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  function openCreateModal() {
    setEditingColor(null);
    const initialHex = "#EAA221";
    const initialResult = getClosestColorName(initialHex);
    setFormData({
      name: initialResult.name,
      code: "S" + initialHex.replace("#", "").slice(0, 4).toUpperCase(),
      hex: initialHex,
      category: "Uni-glosss",
      finish: "Gloss",
      popular: false,
    });
    setModalOpen(true);
  }

  function openEditModal(c: ColorItem) {
    setEditingColor(c);
    setFormData({
      name: c.name || "",
      code: c.code || "",
      hex: c.hex || "#000000",
      category: c.category || "Uni-glosss",
      finish: c.finish || "Gloss",
      popular: Boolean(c.popular),
    });
    setModalOpen(true);
  }

  function handleAutoFillName() {
    if (detectedColorName) {
      setFormData((prev) => ({
        ...prev,
        name: detectedColorName,
        code: prev.code || `S${prev.hex.replace("#", "").slice(0, 4).toUpperCase()}`,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      if (editingColor) {
        const res = await fetch(`/api/admin/colors/${editingColor.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update shade");
        toast.success("Color shade updated successfully");
      } else {
        const res = await fetch("/api/admin/colors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add shade");
        toast.success("New shade added to catalogue");
      }

      setModalOpen(false);
      fetchColors();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save shade");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(c: ColorItem) {
    const ok = await confirm({
      title: `Delete "${c.name}"?`,
      description: `Shade ${c.code} (${c.hex}) will be permanently removed from the colour catalogue.`,
      confirmLabel: "Delete Shade",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/colors/${c.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete shade");
      toast.success("Color shade deleted from catalogue");
      fetchColors();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  function copyHex(hex: string) {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast.info(`Copied ${hex}`);
    setTimeout(() => setCopiedHex(null), 1500);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Palette}
        title="Color Catalogue"
        description="Manage Snowcem shade palettes, finish types, and automatic colour naming."
        actions={
          <>
            <Button variant="secondary" icon={RefreshCw} onClick={fetchColors} loading={loading}>
              Refresh
            </Button>
            <Button variant="primary" icon={Plus} onClick={openCreateModal}>
              Add New Shade
            </Button>
          </>
        }
      />

      <Toolbar className="justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by shade name, code, or hex..."
            className="sm:max-w-sm"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className={`${selectCls} sm:w-52`}
          >
            <option value="all">All Categories</option>
            <option value="Uni-glosss">Uni-glosss</option>
            <option value="Exterior Emulsions">Exterior Emulsions</option>
            <option value="Interior Emulsions">Interior Emulsions</option>
            <option value="Cement Paints">Cement Paints</option>
          </select>
        </div>

        <Badge tone="gold">{colors.length} {colors.length === 1 ? "shade" : "shades"}</Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={6} />
      ) : colors.length === 0 ? (
        <EmptyState
          icon={Palette}
          title="No color shades found"
          description={
            search || categoryFilter !== "all"
              ? "Try clearing your search or category filter."
              : "No color shades are registered yet. Add your first shade to build the catalogue."
          }
          action={
            <Button variant="primary" icon={Plus} onClick={openCreateModal}>
              Add New Shade
            </Button>
          }
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th>Swatch &amp; Shade</Th>
              <Th>Code</Th>
              <Th>Hex</Th>
              <Th>Category</Th>
              <Th>Finish</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {colors.map((c) => (
              <tr key={c.id} className={trCls}>
                <Td>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 w-9 shrink-0 rounded-xl border border-white/15 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 font-semibold text-[#EDE4D8]">
                        <span className="truncate">{c.name}</span>
                        {c.popular && <Badge tone="gold">Popular</Badge>}
                      </div>
                      <div className="text-[11px] text-[#C2B69D]/70">Snowcem Certified Palette</div>
                    </div>
                  </div>
                </Td>
                <Td className="font-mono font-semibold text-[#EDE4D8]">{c.code}</Td>
                <Td>
                  <button
                    type="button"
                    onClick={() => copyHex(c.hex)}
                    title="Copy hex code"
                    className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#041411] px-2.5 py-1 font-mono text-xs text-[#EDE4D8] transition hover:border-[#D4AF37]/40 cursor-pointer"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border border-white/15"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.hex}</span>
                    {copiedHex === c.hex ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3 text-[#C2B69D]/60 opacity-0 transition group-hover:opacity-100" />
                    )}
                  </button>
                </Td>
                <Td>
                  <Badge tone="neutral">{c.category}</Badge>
                </Td>
                <Td>{c.finish || "Gloss"}</Td>
                <Td align="right">
                  <div className="inline-flex items-center justify-end gap-1">
                    <IconButton icon={Edit2} label="Edit shade" onClick={() => openEditModal(c)} />
                    <IconButton icon={Trash2} label="Delete shade" tone="danger" onClick={() => handleDelete(c)} />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}

      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingColor ? "Edit Color Shade" : "Add New Color Shade"}
        subtitle="Pick a hex colour or enter one to detect the closest shade name automatically."
        icon={<Palette className="h-5 w-5" />}
        maxWidth="lg"
      >
        <div className="space-y-5">
          {/* Live Color Detector Card */}
          <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#041411] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <div
                className="h-12 w-12 shrink-0 rounded-xl border border-white/15 shadow-md transition-colors"
                style={{ backgroundColor: formData.hex }}
              />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#C2B69D]/70">
                  Detected Shade Match
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-sm font-bold text-[#EDE4D8]">
                  <span>{detectedColorName}</span>
                  {colorPaletteInfo.pantone && (
                    <span className="text-xs font-normal text-[#C2B69D]">
                      ({colorPaletteInfo.pantone})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button variant="secondary" size="sm" icon={Wand2} onClick={handleAutoFillName}>
              Auto-Fill Name
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormGrid cols={2}>
              <Field label="Hex Colour" required>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    aria-label="Pick colour"
                    value={formData.hex.startsWith("#") && formData.hex.length === 7 ? formData.hex : "#1A365D"}
                    onChange={(e) => setFormData({ ...formData, hex: e.target.value.toUpperCase() })}
                    className="h-10 w-11 shrink-0 cursor-pointer rounded-xl border border-white/12 bg-[#041411] p-1"
                  />
                  <input
                    type="text"
                    required
                    value={formData.hex}
                    onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                    placeholder="#1A365D"
                    className={`${inputCls} font-mono`}
                  />
                </div>
              </Field>

              <Field label="Shade Code" required>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. S1175"
                  className={`${inputCls} font-mono`}
                />
              </Field>
            </FormGrid>

            <Field label="Shade Name" required>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Cosmic Ocean"
                className={inputCls}
              />
            </Field>

            <FormGrid cols={2}>
              <Field label="Category">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={selectCls}
                >
                  <option value="Uni-glosss">Uni-glosss</option>
                  <option value="Exterior Emulsions">Exterior Emulsions</option>
                  <option value="Interior Emulsions">Interior Emulsions</option>
                  <option value="Sandtex Matt">Sandtex Matt</option>
                  <option value="Pentasia">Pentasia</option>
                  <option value="Snowcem Plus">Snowcem Plus</option>
                </select>
              </Field>

              <Field label="Finish">
                <select
                  value={formData.finish}
                  onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                  className={selectCls}
                >
                  <option value="Gloss">Gloss</option>
                  <option value="High Gloss">High Gloss</option>
                  <option value="Matt">Matt</option>
                  <option value="Silk">Silk</option>
                  <option value="Satin">Satin</option>
                  <option value="Textured">Textured</option>
                </select>
              </Field>
            </FormGrid>

            <label htmlFor="popularShade" className="flex cursor-pointer items-center gap-2.5 pt-1 text-xs font-medium text-[#EDE4D8]">
              <input
                type="checkbox"
                id="popularShade"
                checked={formData.popular}
                onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                className={checkboxCls}
              />
              <span>Feature as Popular Trending Shade</span>
            </label>

            <FormActions>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={saving}>
                {editingColor ? "Update Shade" : "Save Shade"}
              </Button>
            </FormActions>
          </form>
        </div>
      </CustomModal>
    </div>
  );
}
