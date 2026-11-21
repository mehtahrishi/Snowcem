"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, Layers, Plus, Star, Trash2, X } from "lucide-react";
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

interface StepConfig {
  stepNumber: number;
  type: "PRIMER" | "WALL PUTTY" | "FINAL LAYER" | "BASECOAT";
  productId: string;
  coats: number;
}

interface CombinationRow {
  id: string;
  name: string;
  group: string;
  category: "interior" | "exterior";
  topcoatId: string;
  tagline: string | null;
  description: string | null;
  warranty: string | null;
  finish: string | null;
  steps: StepConfig[];
  recommended: boolean;
  sortOrder: number;
  isActive: boolean;
}

interface MaterialOption {
  id: string;
  name: string;
  category: string;
  group: string;
}

interface ComboFormState {
  name: string;
  group: "Luxury" | "Premium" | "Economy";
  category: "interior" | "exterior";
  topcoatId: string;
  tagline: string;
  description: string;
  warranty: string;
  finish: string;
  steps: StepConfig[];
  recommended: boolean;
  sortOrder: number;
  isActive: boolean;
}

const STEP_TYPES: StepConfig["type"][] = ["BASECOAT", "PRIMER", "WALL PUTTY", "FINAL LAYER"];

const emptyForm: ComboFormState = {
  name: "",
  group: "Premium",
  category: "interior",
  topcoatId: "",
  tagline: "",
  description: "",
  warranty: "",
  finish: "",
  steps: [{ stepNumber: 1, type: "FINAL LAYER", productId: "", coats: 2 }],
  recommended: true,
  sortOrder: 0,
  isActive: true,
};

export default function CombinationsTab() {
  const toast = useToast();
  const confirm = useConfirm();

  const [combos, setCombos] = useState<CombinationRow[]>([]);
  const [materials, setMaterials] = useState<MaterialOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [recFilter, setRecFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<CombinationRow | null>(null);
  const [formData, setFormData] = useState<ComboFormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [comboRes, matRes] = await Promise.all([
        fetch("/api/admin/calculator/combinations"),
        fetch("/api/admin/calculator/materials"),
      ]);
      const [comboJson, matJson] = await Promise.all([comboRes.json(), matRes.json()]);
      if (!comboRes.ok) throw new Error(comboJson?.error || "Failed to load combinations");
      setCombos(Array.isArray(comboJson.data) ? comboJson.data : []);
      setMaterials(Array.isArray(matJson.data) ? matJson.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load calculator combinations");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const materialNameMap = useMemo(() => {
    const m: Record<string, string> = {};
    for (const item of materials) m[item.id] = item.name;
    return m;
  }, [materials]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return combos.filter((c) => {
      if (catFilter !== "all" && c.category !== catFilter) return false;
      if (recFilter === "recommended" && !c.recommended) return false;
      if (recFilter === "non_recommended" && c.recommended) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        (materialNameMap[c.topcoatId] || "").toLowerCase().includes(q)
      );
    });
  }, [combos, catFilter, recFilter, search, materialNameMap]);

  function openCreate() {
    setEditing(null);
    const defaultMat = materials[0]?.id || "";
    setFormData({
      ...emptyForm,
      topcoatId: defaultMat,
      steps: [{ stepNumber: 1, type: "FINAL LAYER", productId: defaultMat, coats: 2 }],
    });
    setIsModalOpen(true);
  }

  function openEdit(c: CombinationRow) {
    setEditing(c);
    setFormData({
      name: c.name,
      group: (c.group as ComboFormState["group"]) || "Premium",
      category: c.category === "exterior" ? "exterior" : "interior",
      topcoatId: c.topcoatId,
      tagline: c.tagline || "",
      description: c.description || "",
      warranty: c.warranty || "",
      finish: c.finish || "",
      steps:
        Array.isArray(c.steps) && c.steps.length > 0
          ? c.steps.map((s, idx) => ({ ...s, stepNumber: idx + 1 }))
          : [{ stepNumber: 1, type: "FINAL LAYER", productId: c.topcoatId, coats: 2 }],
      recommended: Boolean(c.recommended),
      sortOrder: c.sortOrder || 0,
      isActive: Boolean(c.isActive),
    });
    setIsModalOpen(true);
  }

  function addStep() {
    const defaultMat = formData.topcoatId || materials[0]?.id || "";
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          stepNumber: prev.steps.length + 1,
          type: "PRIMER",
          productId: defaultMat,
          coats: 1,
        },
      ],
    }));
  }

  function removeStep(index: number) {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, stepNumber: i + 1 })),
    }));
  }

  function updateStep(index: number, patch: Partial<StepConfig>) {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  async function toggleRecommended(c: CombinationRow) {
    const next = !c.recommended;
    try {
      const res = await fetch(`/api/admin/calculator/combinations/${c.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommended: next }),
      });
      if (!res.ok) throw new Error("Update failed");
      setCombos((prev) => prev.map((item) => (item.id === c.id ? { ...item, recommended: next } : item)));
      toast.success(next ? "Marked as Recommended (visible on calculator)" : "Removed from Recommended");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.topcoatId) {
      toast.error("System name and topcoat material are required");
      return;
    }
    if (formData.steps.length === 0) {
      toast.error("Add at least one application step");
      return;
    }

    setSaving(true);
    try {
      const url = editing
        ? `/api/admin/calculator/combinations/${editing.id}`
        : "/api/admin/calculator/combinations";
      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to save combination");

      toast.success(editing ? "Combination updated" : "Combination created");
      setIsModalOpen(false);
      await load();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save combination");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(c: CombinationRow) {
    const ok = await confirm({
      title: `Delete "${c.name}"?`,
      description: "This paint system combination will be permanently removed from the calculator.",
      confirmLabel: "Delete System",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/calculator/combinations/${c.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setCombos((prev) => prev.filter((item) => item.id !== c.id));
      toast.success("Combination deleted");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete");
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        icon={Layers}
        title="Calculator System Combinations"
        description="Manage Interior & Exterior paint recipes, step coats, and which cards appear on the live Paint Calculator."
        actions={
          <Button variant="primary" icon={Plus} onClick={openCreate}>
            Add Combination
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search system name, tier, topcoat…"
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className={`${selectCls} w-auto min-w-[150px]`}
        >
          <option value="all">All Spaces</option>
          <option value="interior">Interior</option>
          <option value="exterior">Exterior</option>
        </select>
        <select
          value={recFilter}
          onChange={(e) => setRecFilter(e.target.value)}
          className={`${selectCls} w-auto min-w-[175px]`}
        >
          <option value="all">All Systems</option>
          <option value="recommended">Recommended (Live)</option>
          <option value="non_recommended">Hidden (Not Rec.)</option>
        </select>
      </Toolbar>

      {loading ? (
        <LoadingState rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No combinations found"
          description="Add a paint system combination to show it as a recommended solution card on /paint-calculator."
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th>System Name</Th>
              <Th>Space & Tier</Th>
              <Th>Steps Recipe</Th>
              <Th>Live Card</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className={trCls}>
                <Td>
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="mt-0.5 text-xs text-[#C2B69D]">
                    Topcoat: {materialNameMap[c.topcoatId] || c.topcoatId}
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge tone={c.category === "exterior" ? "info" : "neutral"}>
                      {c.category.toUpperCase()}
                    </Badge>
                    <Badge tone={c.group === "Luxury" ? "gold" : "neutral"}>{c.group}</Badge>
                  </div>
                </Td>
                <Td>
                  <div className="space-y-1 text-xs text-[#EDE4D8]">
                    {(c.steps || []).map((s, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-[#D4AF37]">
                          {idx + 1}. {s.type} ({s.coats}c):
                        </span>
                        <span className="truncate text-[#C2B69D]">
                          {materialNameMap[s.productId] || s.productId}
                        </span>
                      </div>
                    ))}
                  </div>
                </Td>
                <Td>
                  <button
                    type="button"
                    onClick={() => toggleRecommended(c)}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                      c.recommended
                        ? "border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#D4AF37]"
                        : "border-white/15 bg-white/5 text-[#C2B69D] hover:border-white/30"
                    }`}
                  >
                    <Star className={`h-3 w-3 ${c.recommended ? "fill-[#D4AF37]" : ""}`} />
                    <span>{c.recommended ? "Recommended" : "Hidden"}</span>
                  </button>
                </Td>
                <Td>
                  <Badge tone={c.isActive ? "success" : "danger"}>
                    {c.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Td>
                <Td align="right">
                  <div className="inline-flex items-center gap-1.5">
                    <IconButton icon={Edit2} label="Edit combination" onClick={() => openEdit(c)} />
                    <IconButton
                      icon={Trash2}
                      label="Delete combination"
                      tone="danger"
                      onClick={() => handleDelete(c)}
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
        onClose={() => setIsModalOpen(false)}
        title={editing ? `Edit: ${editing.name}` : "Add Calculator Combination"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid cols={2}>
            <Field label="System Name *">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Zenita Velvet Finish System"
                className={inputCls}
              />
            </Field>

            <Field label="Topcoat Material *">
              <select
                required
                value={formData.topcoatId}
                onChange={(e) => setFormData((p) => ({ ...p, topcoatId: e.target.value }))}
                className={selectCls}
              >
                <option value="">Select Topcoat…</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.category} • {m.group})
                  </option>
                ))}
              </select>
            </Field>
          </FormGrid>

          <FormGrid cols={4}>
            <Field label="Space">
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    category: e.target.value as "interior" | "exterior",
                  }))
                }
                className={selectCls}
              >
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
              </select>
            </Field>

            <Field label="Tier">
              <select
                value={formData.group}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    group: e.target.value as ComboFormState["group"],
                  }))
                }
                className={selectCls}
              >
                <option value="Luxury">Luxury</option>
                <option value="Premium">Premium</option>
                <option value="Economy">Economy</option>
              </select>
            </Field>

            <Field label="Warranty (optional)">
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) => setFormData((p) => ({ ...p, warranty: e.target.value }))}
                placeholder="e.g. 8 Years"
                className={inputCls}
              />
            </Field>

            <Field label="Finish (optional)">
              <input
                type="text"
                value={formData.finish}
                onChange={(e) => setFormData((p) => ({ ...p, finish: e.target.value }))}
                placeholder="e.g. Velvet Sheen"
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={2}>
            <Field label="Tagline">
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData((p) => ({ ...p, tagline: e.target.value }))}
                placeholder="Short one-line benefit…"
                className={inputCls}
              />
            </Field>

            <Field label="Sort Order">
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, sortOrder: Number(e.target.value) || 0 }))
                }
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Description">
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              placeholder="Detailed overview shown on the solution card…"
              className={textareaCls}
            />
          </Field>

          {/* Visual Step Builder */}
          <div className="space-y-3 rounded-xl border border-white/10 bg-[#061C18] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Application Steps ({formData.steps.length})
              </span>
              <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={addStep}>
                Add Step
              </Button>
            </div>

            <div className="space-y-2.5">
              {formData.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 gap-2.5 rounded-lg border border-white/10 bg-[#0A2621] p-3 sm:grid-cols-12 sm:items-center"
                >
                  <div className="sm:col-span-3">
                    <select
                      value={step.type}
                      onChange={(e) =>
                        updateStep(idx, { type: e.target.value as StepConfig["type"] })
                      }
                      className={`${selectCls} py-2 text-xs`}
                    >
                      {STEP_TYPES.map((t) => (
                        <option key={t} value={t}>
                          Step {idx + 1}: {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <select
                      value={step.productId}
                      onChange={(e) => updateStep(idx, { productId: e.target.value })}
                      className={`${selectCls} py-2 text-xs`}
                    >
                      <option value="">Select Material…</option>
                      {materials.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={step.coats}
                      onChange={(e) =>
                        updateStep(idx, { coats: Math.max(1, Number(e.target.value) || 1) })
                      }
                      className={`${inputCls} py-2 text-xs`}
                      placeholder="Coats"
                    />
                  </div>

                  <div className="flex justify-end sm:col-span-1">
                    {formData.steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(idx)}
                        className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/15 cursor-pointer"
                        title="Remove step"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#EDE4D8]">
              <input
                type="checkbox"
                checked={formData.recommended}
                onChange={(e) => setFormData((p) => ({ ...p, recommended: e.target.checked }))}
                className={checkboxCls}
              />
              <span>Recommended (Show on public /paint-calculator)</span>
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#EDE4D8]">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))}
                className={checkboxCls}
              />
              <span>Active</span>
            </label>
          </div>

          <FormActions>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Create Combination"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
