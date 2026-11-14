"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Calculator, RefreshCw, Edit2, Trash2, Check, X } from "lucide-react";
import {
  PageHeader,
  Toolbar,
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
  useToast,
  useConfirm,
} from "@/components/admin/ui";

interface MaterialRow {
  id: string;
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
  warranty: string | null;
  finish: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminCalculatorMaterialsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MaterialRow>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/calculator/materials");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load materials");
      setMaterials(Array.isArray(json?.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load materials");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: MaterialRow) {
    setEditingId(item.id);
    setEditForm(item);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function saveEdit(id: string) {
    if (savingId) return;
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/calculator/materials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Failed to update material");
      }
      setMaterials((prev) =>
        prev.map((item) => (item.id === id ? ({ ...item, ...editForm } as MaterialRow) : item))
      );
      setEditingId(null);
      toast.success("Material rates updated");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update material");
    } finally {
      setSavingId(null);
    }
  }

  async function removeMaterial(item: MaterialRow) {
    const ok = await confirm({
      title: `Delete "${item.name}"?`,
      description: "This material and its rate specs will be removed from calculator estimates.",
      confirmLabel: "Delete Material",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/calculator/materials/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      setMaterials((prev) => prev.filter((m) => m.id !== item.id));
      toast.success("Material deleted");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const tiers = Array.from(new Set(materials.map((m) => m.group))).sort();

  const filtered = materials.filter((m) => {
    if (tierFilter !== "all" && m.group !== tierFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.group.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Calculator}
        title="Calculator Materials & Rates"
        description="Paint products, coverage rates, default coats, and labour costs used in budget calculations."
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
            Refresh
          </Button>
        }
      />

      <Toolbar className="justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by product, category, or tier..."
            className="sm:max-w-sm"
          />
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            aria-label="Filter by tier"
            className={`${selectCls} sm:w-48`}
          >
            <option value="all">All Tiers</option>
            {tiers.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <Badge tone="gold">
          {filtered.length} {filtered.length === 1 ? "material" : "materials"}
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Calculator}
          title="No materials found"
          description={
            search || tierFilter !== "all"
              ? "Try clearing your search or tier filter."
              : "No calculator materials are configured yet."
          }
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th>Product Name</Th>
              <Th>Tier</Th>
              <Th>Category</Th>
              <Th>Cost / Unit</Th>
              <Th>Coverage (sq.ft)</Th>
              <Th>Default Coats</Th>
              <Th>Labour Rate</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const isEditing = editingId === item.id;
              return (
                <tr key={item.id} className={trCls}>
                  <Td className="font-semibold text-[#EDE4D8]">
                    {isEditing ? (
                      <input
                        type="text"
                        aria-label="Product name"
                        value={editForm.name || ""}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className={`${inputCls} min-w-[160px] py-1.5 text-xs`}
                      />
                    ) : (
                      item.name
                    )}
                  </Td>
                  <Td>
                    <Badge tone="gold" className="uppercase">
                      {item.group}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge tone="neutral" className="font-mono">
                      {item.category}
                    </Badge>
                  </Td>
                  <Td className="font-mono text-[#EDE4D8]">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        aria-label="Cost per unit"
                        value={editForm.costPerUnit || ""}
                        onChange={(e) => setEditForm({ ...editForm, costPerUnit: e.target.value })}
                        className={`${inputCls} w-24 py-1.5 text-xs`}
                      />
                    ) : (
                      `₹${Number(item.costPerUnit).toFixed(2)} / ${item.unit}`
                    )}
                  </Td>
                  <Td className="font-mono text-[#EDE4D8]">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        aria-label="Coverage"
                        value={editForm.coverage || ""}
                        onChange={(e) => setEditForm({ ...editForm, coverage: e.target.value })}
                        className={`${inputCls} w-20 py-1.5 text-xs`}
                      />
                    ) : (
                      item.coverage
                    )}
                  </Td>
                  <Td className="font-mono text-[#EDE4D8]">
                    {isEditing ? (
                      <input
                        type="number"
                        aria-label="Default coats"
                        value={editForm.defaultCoats ?? ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, defaultCoats: Number(e.target.value) })
                        }
                        className={`${inputCls} w-16 py-1.5 text-xs`}
                      />
                    ) : (
                      item.defaultCoats
                    )}
                  </Td>
                  <Td className="font-mono text-[#EDE4D8]">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        aria-label="Labour rate"
                        value={editForm.labourRate || ""}
                        onChange={(e) => setEditForm({ ...editForm, labourRate: e.target.value })}
                        className={`${inputCls} w-20 py-1.5 text-xs`}
                      />
                    ) : (
                      `₹${Number(item.labourRate).toFixed(2)}/sq.ft`
                    )}
                  </Td>
                  <Td align="right">
                    {isEditing ? (
                      <div className="inline-flex items-center justify-end gap-1">
                        <IconButton
                          icon={Check}
                          label="Save changes"
                          tone="gold"
                          disabled={savingId === item.id}
                          onClick={() => saveEdit(item.id)}
                        />
                        <IconButton icon={X} label="Cancel editing" onClick={cancelEdit} />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-end gap-1">
                        <IconButton icon={Edit2} label="Edit material" onClick={() => startEdit(item)} />
                        <IconButton
                          icon={Trash2}
                          label="Delete material"
                          tone="danger"
                          onClick={() => removeMaterial(item)}
                        />
                      </div>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      )}
    </div>
  );
}
