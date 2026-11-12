"use client";

import React, { useEffect, useState } from "react";
import {
  Calculator,
  Search,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Layers,
  Sparkles,
} from "lucide-react";

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
  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MaterialRow>>({});

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/calculator/materials");
      const json = await res.json();
      setMaterials(Array.isArray(json?.data) ? json.data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(item: MaterialRow) {
    setEditingId(item.id);
    setEditForm(item);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function saveEdit(id: string) {
    await fetch(`/api/admin/calculator/materials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    setMaterials((prev) =>
      prev.map((item) => (item.id === id ? ({ ...item, ...editForm } as MaterialRow) : item))
    );
    setEditingId(null);
  }

  async function removeMaterial(id: string) {
    if (!confirm("Delete this material?")) return;
    await fetch(`/api/admin/calculator/materials/${id}`, { method: "DELETE" });
    setMaterials((prev) => prev.filter((item) => item.id !== id));
  }

  const filtered = materials.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.group.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-2xl font-black text-[#EDE4D8]">
              Paint Calculator Materials &amp; Rates
            </h1>
          </div>
          <p className="text-xs text-[#C2B69D] mt-1 font-medium">
            Live database records for paint products, coverage parameters, pack sizes, and labor costs used in calculations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#C2B69D] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search product, category, tier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0A2621] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#EDE4D8] placeholder-[#C2B69D]/50 focus:border-[#D4AF37] outline-none"
            />
          </div>
          <button
            onClick={load}
            className="p-2 bg-[#0A2621] border border-white/10 hover:border-[#D4AF37] rounded-xl text-[#C2B69D] hover:text-[#EDE4D8]"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="bg-[#0A2621] border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/20">
        {loading ? (
          <div className="p-8 text-center text-xs text-[#C2B69D]">Loading materials...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#C2B69D]">No materials found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#EDE4D8]">
              <thead className="bg-[#041411] text-[10px] font-bold uppercase tracking-wider text-[#C2B69D] border-b border-white/10">
                <tr>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Tier</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Cost/Unit</th>
                  <th className="p-3.5">Coverage (sq.ft)</th>
                  <th className="p-3.5">Default Coats</th>
                  <th className="p-3.5">Labour Rate</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-sans">
                {filtered.map((item) => {
                  const isEditing = editingId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-bold">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.name || ""}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="bg-black/30 border border-white/20 rounded px-2 py-1 text-xs text-white"
                          />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-bold text-[10px] uppercase">
                          {item.group}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-[11px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.costPerUnit || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, costPerUnit: e.target.value })
                            }
                            className="w-20 bg-black/30 border border-white/20 rounded px-2 py-1 text-xs text-white"
                          />
                        ) : (
                          `₹${Number(item.costPerUnit).toFixed(2)} / ${item.unit}`
                        )}
                      </td>
                      <td className="p-3.5 font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.coverage || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, coverage: e.target.value })
                            }
                            className="w-16 bg-black/30 border border-white/20 rounded px-2 py-1 text-xs text-white"
                          />
                        ) : (
                          item.coverage
                        )}
                      </td>
                      <td className="p-3.5 font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.defaultCoats || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, defaultCoats: Number(e.target.value) })
                            }
                            className="w-12 bg-black/30 border border-white/20 rounded px-2 py-1 text-xs text-white"
                          />
                        ) : (
                          item.defaultCoats
                        )}
                      </td>
                      <td className="p-3.5 font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.labourRate || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, labourRate: e.target.value })
                            }
                            className="w-16 bg-black/30 border border-white/20 rounded px-2 py-1 text-xs text-white"
                          />
                        ) : (
                          `₹${Number(item.labourRate).toFixed(2)}/sq.ft`
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => saveEdit(item.id)}
                              className="p-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30"
                              title="Save"
                            >
                              <Check size={13} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1.5 bg-white/10 text-white/70 rounded-lg hover:bg-white/20"
                              title="Cancel"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => startEdit(item)}
                              className="p-1.5 bg-white/5 hover:bg-white/10 text-[#C2B69D] hover:text-[#EDE4D8] rounded-lg"
                              title="Edit"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => removeMaterial(item.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
