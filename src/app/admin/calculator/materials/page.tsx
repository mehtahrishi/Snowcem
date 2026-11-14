"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calculator, Edit2, Plus, Trash2, Upload } from "lucide-react";
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
  trCls,
  useConfirm,
  useToast,
} from "@/components/admin/ui";

interface MaterialRow {
  id: string;
  name: string;
  group: string;
  category: string;
  unit: string;
  mrp: string | number;
  dpl: string | number;
  pack: string | number;
  costPerUnit: string | number;
  coverage: string | number;
  defaultCoats: number;
  labourRate: string | number;
  image: string | null;
  tagline: string | null;
  warranty: string | null;
  finish: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface MaterialFormState {
  name: string;
  group: string;
  category: string;
  unit: string;
  mrp: string;
  dpl: string;
  pack: string;
  costPerUnit: string;
  coverage: string;
  defaultCoats: number;
  labourRate: string;
  image: string;
  tagline: string;
  warranty: string;
  finish: string;
  sortOrder: number;
  isActive: boolean;
}

const DEFAULT_GROUPS = ["Luxury", "Premium", "Economy", "Specialty"];
const DEFAULT_CATEGORIES = [
  { value: "Ext", label: "Ext — Exterior" },
  { value: "Int", label: "Int — Interior" },
  { value: "WP", label: "WP — Waterproofing" },
  { value: "PRI", label: "PRI — Primer" },
  { value: "PUTTY", label: "PUTTY — Wall Putty" },
  { value: "DIST", label: "DIST — Distemper" },
];

const emptyForm: MaterialFormState = {
  name: "",
  group: "Premium",
  category: "Int",
  unit: "Ltr",
  mrp: "0.00",
  dpl: "0.00",
  pack: "1.00",
  costPerUnit: "0.00",
  coverage: "120.00",
  defaultCoats: 2,
  labourRate: "12.00",
  image: "",
  tagline: "",
  warranty: "",
  finish: "",
  sortOrder: 0,
  isActive: true,
};

function fmtNum(val: string | number | null | undefined): string {
  const num = Number(val);
  return Number.isFinite(num) ? num.toFixed(2) : "0.00";
}

export default function AdminCalculatorMaterialsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<MaterialRow | null>(null);
  const [formData, setFormData] = useState<MaterialFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/calculator/materials");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load materials");
      setMaterials(Array.isArray(json.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load calculator materials");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const groupOptions = useMemo(() => {
    const set = new Set<string>(DEFAULT_GROUPS);
    for (const m of materials) if (m.group) set.add(m.group);
    return Array.from(set);
  }, [materials]);

  const categoryOptions = useMemo(() => {
    const known = new Map<string, string>(DEFAULT_CATEGORIES.map((c) => [c.value, c.label]));
    for (const m of materials) {
      if (m.category && !known.has(m.category)) known.set(m.category, m.category);
    }
    return Array.from(known.entries()).map(([value, label]) => ({ value, label }));
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    const q = search.trim().toLowerCase();
    return materials.filter((m) => {
      if (groupFilter !== "all" && m.group !== groupFilter) return false;
      if (categoryFilter !== "all" && m.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.group.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        (m.finish || "").toLowerCase().includes(q) ||
        (m.tagline || "").toLowerCase().includes(q)
      );
    });
  }, [materials, groupFilter, categoryFilter, search]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({ ...emptyForm, sortOrder: materials.length });
    setIsModalOpen(true);
  };

  const openEditModal = (mat: MaterialRow) => {
    setEditing(mat);
    setFormData({
      name: mat.name,
      group: mat.group || "Premium",
      category: mat.category || "Int",
      unit: mat.unit || "Ltr",
      mrp: String(mat.mrp ?? "0.00"),
      dpl: String(mat.dpl ?? "0.00"),
      pack: String(mat.pack ?? "1.00"),
      costPerUnit: String(mat.costPerUnit ?? "0.00"),
      coverage: String(mat.coverage ?? "0.00"),
      defaultCoats: mat.defaultCoats ?? 2,
      labourRate: String(mat.labourRate ?? "0.00"),
      image: mat.image || "",
      tagline: mat.tagline || "",
      warranty: mat.warranty || "",
      finish: mat.finish || "",
      sortOrder: mat.sortOrder ?? 0,
      isActive: mat.isActive ?? true,
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
      fd.append("folder", "calculator");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      setFormData((prev) => ({ ...prev, image: json.url }));
      toast.success("Material image uploaded");
    } catch (err: any) {
      toast.error(err?.message || "Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Material product name is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        group: formData.group.trim() || "Premium",
        category: formData.category.trim() || "Int",
        unit: formData.unit.trim() || "Ltr",
        mrp: formData.mrp || "0.00",
        dpl: formData.dpl || "0.00",
        pack: formData.pack || "1.00",
        costPerUnit: formData.costPerUnit || "0.00",
        coverage: formData.coverage || "0.00",
        defaultCoats: Number(formData.defaultCoats) || 1,
        labourRate: formData.labourRate || "0.00",
        image: formData.image.trim() || null,
        tagline: formData.tagline.trim() || null,
        warranty: formData.warranty.trim() || null,
        finish: formData.finish.trim() || null,
        sortOrder: Number(formData.sortOrder) || 0,
        isActive: formData.isActive,
      };

      const url = editing
        ? `/api/admin/calculator/materials/${editing.id}`
        : "/api/admin/calculator/materials";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || `Failed to ${editing ? "update" : "create"} material`);
        return;
      }

      toast.success(editing ? "Material updated" : "Material created");
      setIsModalOpen(false);
      await load();
    } catch {
      toast.error("Network error while saving material");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (mat: MaterialRow) => {
    const ok = await confirm({
      title: `Delete "${mat.name}"?`,
      description: "This will permanently remove this product from the Paint Calculator rates.",
      confirmLabel: "Delete Material",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/calculator/materials/${mat.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || "Failed to delete material");
        return;
      }
      toast.success("Material deleted");
      await load();
    } catch {
      toast.error("Network error while deleting material");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Calculator}
        title="Calculator Materials"
        description="Configure paint pricing, coverage rates, default coats, pack sizes, and labour charges for the Paint Calculator."
        actions={
          <Button variant="primary" icon={Plus} onClick={openAddModal}>
            Add Material
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search material name, finish, tagline…"
        />
        <select
          aria-label="Filter by group"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className={`${selectCls} w-full sm:w-44`}
        >
          <option value="all">All Tiers</option>
          {groupOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`${selectCls} w-full sm:w-48`}
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <span className="text-xs text-[#C2B69D]/70 sm:ml-auto">
          Showing {filteredMaterials.length} of {materials.length}
        </span>
      </Toolbar>

      {loading ? (
        <LoadingState rows={6} />
      ) : filteredMaterials.length === 0 ? (
        <EmptyState
          icon={Calculator}
          title={materials.length === 0 ? "No calculator materials yet" : "No matching materials"}
          description={
            materials.length === 0
              ? "Add materials and estimation rates for the Paint Calculator."
              : "Try clearing your search or tier/category filters."
          }
          action={
            materials.length === 0 ? (
              <Button variant="primary" icon={Plus} onClick={openAddModal}>
                Add Material
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setGroupFilter("all");
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
              <Th>Material</Th>
              <Th>Tier / Category</Th>
              <Th>Pack &amp; Pricing</Th>
              <Th>Estimation Specs</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((m) => (
              <tr key={m.id} className={trCls}>
                <Td>
                  <div className="flex items-center gap-3">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="h-10 w-10 shrink-0 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D8C7B3]/15 bg-[#041411] text-[10px] text-[#C2B69D]/50">
                        {m.category}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-[#EDE4D8]">{m.name}</div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#C2B69D]/70">
                        {m.finish && <span>Finish: {m.finish}</span>}
                        {m.warranty && <span>• Warranty: {m.warranty}</span>}
                      </div>
                    </div>
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge tone="gold">{m.group}</Badge>
                    <Badge tone="info">{m.category}</Badge>
                  </div>
                </Td>
                <Td>
                  <div className="text-xs text-[#EDE4D8]">
                    Pack {fmtNum(m.pack)} {m.unit} • MRP ₹{fmtNum(m.mrp)}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#C2B69D]/75">
                    DPL ₹{fmtNum(m.dpl)} • Cost/unit ₹{fmtNum(m.costPerUnit)}
                  </div>
                </Td>
                <Td>
                  <div className="text-xs text-[#EDE4D8]">
                    {fmtNum(m.coverage)} sq.ft/{m.unit} • {m.defaultCoats} coat
                    {m.defaultCoats === 1 ? "" : "s"}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#C2B69D]/75">
                    Labour ₹{fmtNum(m.labourRate)}/sq.ft
                  </div>
                </Td>
                <Td>
                  <Badge tone={m.isActive ? "success" : "danger"}>
                    {m.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Td>
                <Td align="right">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    <IconButton
                      icon={Edit2}
                      label={`Edit ${m.name}`}
                      tone="gold"
                      onClick={() => openEditModal(m)}
                    />
                    <IconButton
                      icon={Trash2}
                      label={`Delete ${m.name}`}
                      tone="danger"
                      onClick={() => handleDelete(m)}
                    />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => !saving && setIsModalOpen(false)}
        title={editing ? `Edit Material — ${editing.name}` : "Add Calculator Material"}
        subtitle="Configure pricing, pack specifications, coverage, default coats, and labour rates."
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid cols={2}>
            <Field label="Material Name" required>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Snowcryl XT"
                className={inputCls}
              />
            </Field>

            <Field label="Tier / Group" required>
              <select
                required
                value={formData.group}
                onChange={(e) => setFormData((prev) => ({ ...prev, group: e.target.value }))}
                className={selectCls}
              >
                {groupOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Category" required>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className={selectCls}
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Unit" required>
              <select
                required
                value={formData.unit}
                onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                className={selectCls}
              >
                <option value="Ltr">Litre (Ltr)</option>
                <option value="Kg">Kilogram (Kg)</option>
              </select>
            </Field>
          </FormGrid>

          <FormGrid cols={4}>
            <Field label="MRP (₹)" required>
              <input
                type="number"
                step="0.01"
                required
                value={formData.mrp}
                onChange={(e) => setFormData((prev) => ({ ...prev, mrp: e.target.value }))}
                className={inputCls}
              />
            </Field>

            <Field label="DPL (₹)" required>
              <input
                type="number"
                step="0.01"
                required
                value={formData.dpl}
                onChange={(e) => setFormData((prev) => ({ ...prev, dpl: e.target.value }))}
                className={inputCls}
              />
            </Field>

            <Field label={`Pack (${formData.unit})`} required>
              <input
                type="number"
                step="0.01"
                required
                value={formData.pack}
                onChange={(e) => setFormData((prev) => ({ ...prev, pack: e.target.value }))}
                className={inputCls}
              />
            </Field>

            <Field label={`Cost / ${formData.unit} (₹)`} required>
              <input
                type="number"
                step="0.01"
                required
                value={formData.costPerUnit}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, costPerUnit: e.target.value }))
                }
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={3}>
            <Field label={`Coverage (sq.ft/${formData.unit})`} required>
              <input
                type="number"
                step="0.01"
                required
                value={formData.coverage}
                onChange={(e) => setFormData((prev) => ({ ...prev, coverage: e.target.value }))}
                className={inputCls}
              />
            </Field>

            <Field label="Default Coats" required>
              <input
                type="number"
                min={1}
                step={1}
                required
                value={formData.defaultCoats}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, defaultCoats: Number(e.target.value) || 1 }))
                }
                className={inputCls}
              />
            </Field>

            <Field label="Labour Rate (₹/sq.ft)" required>
              <input
                type="number"
                step="0.01"
                required
                value={formData.labourRate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, labourRate: e.target.value }))
                }
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={3}>
            <Field label="Finish">
              <input
                type="text"
                value={formData.finish}
                onChange={(e) => setFormData((prev) => ({ ...prev, finish: e.target.value }))}
                placeholder="e.g. Sheen / Matt"
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
          </FormGrid>

          <FormGrid cols={2}>
            <Field label="Tagline">
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
                placeholder="Short recommendation highlight…"
                className={inputCls}
              />
            </Field>

            <Field label="Product Image URL">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="/uploads/calculator/pack.png"
                  className={inputCls}
                />
                <label className="inline-flex h-[42px] shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[#D8C7B3]/20 bg-white/[0.04] px-3 text-xs font-semibold text-[#EDE4D8] hover:border-[#D4AF37]/40 hover:bg-white/[0.08]">
                  <Upload className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {uploading ? "…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </Field>
          </FormGrid>

          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] px-3.5 py-2.5 text-sm text-[#EDE4D8]">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
              className={checkboxCls}
            />
            <span>Active in Paint Calculator</span>
          </label>

          <FormActions>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Create Material"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
