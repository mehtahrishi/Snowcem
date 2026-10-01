"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Paintbrush,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  X,
  RefreshCw,
  MapPin,
  Phone,
  AlertTriangle,
  Briefcase,
  ShieldCheck,
  Upload,
  FileSpreadsheet,
  Download,
  Check,
} from "lucide-react";
import * as XLSX from "xlsx";
import CustomModal from "@/components/admin/CustomModal";

interface Painter {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  pincode?: string;
  experienceYears?: number;
  specialization?: string;
  rating?: string | number;
  status?: string;
  verified?: boolean;
}

export default function AdminPaintersPage() {
  const [painters, setPainters] = useState<Painter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingPainter, setEditingPainter] = useState<Painter | null>(null);

  // Bulk Selection & Delete States
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);

  // File Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSummary, setUploadSummary] = useState<{
    totalRows: number;
    inserted: number;
    updated: number;
    skipped: number;
    errors?: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    experienceYears: 3,
    specialization: "Exterior Textures & Emulsions",
    rating: "4.8",
    status: "active",
    verified: false,
  });

  async function fetchPainters() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter && statusFilter !== "all") params.append("status", statusFilter);

      const res = await fetch(`/api/admin/painters?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setPainters(data.data || []);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to load painters" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Failed to fetch painters" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPainters();
  }, [search, statusFilter]);

  // Selection handlers
  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === painters.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(painters.map((p) => p.id));
    }
  }

  async function handleBulkDelete() {
    if (selectedIds.length === 0 && !deleteAllConfirm) return;

    setBulkDeleting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/painters/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          deleteAllConfirm ? { all: true } : { ids: selectedIds }
        ),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bulk delete failed");

      setMessage({
        type: "success",
        text: deleteAllConfirm
          ? "All painters have been deleted successfully."
          : `Successfully deleted ${selectedIds.length} painters!`,
      });

      setSelectedIds([]);
      setBulkDeleteModalOpen(false);
      setDeleteAllConfirm(false);
      fetchPainters();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to delete painters" });
    } finally {
      setBulkDeleting(false);
    }
  }

  function openCreateModal() {
    setEditingPainter(null);
    setFormData({
      name: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      experienceYears: 3,
      specialization: "Exterior Textures & Emulsions",
      rating: "4.8",
      status: "active",
      verified: true,
    });
    setModalOpen(true);
  }

  function openEditModal(p: Painter) {
    setEditingPainter(p);
    setFormData({
      name: p.name || "",
      phone: p.phone || "",
      city: p.city || "",
      state: p.state || "",
      pincode: p.pincode || "",
      experienceYears: p.experienceYears || 3,
      specialization: p.specialization || "Exterior Textures & Emulsions",
      rating: String(p.rating || "4.8"),
      status: p.status || "active",
      verified: Boolean(p.verified),
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    try {
      if (editingPainter) {
        const res = await fetch(`/api/admin/painters/${editingPainter.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update painter");
        setMessage({ type: "success", text: "Painter updated successfully!" });
      } else {
        const res = await fetch(`/api/admin/painters`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add painter");
        setMessage({ type: "success", text: "New contractor added successfully!" });
      }

      setModalOpen(false);
      fetchPainters();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/painters/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setMessage({ type: "success", text: "Painter removed successfully." });
      setDeleteConfirmId(null);
      fetchPainters();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  }

  async function handleUploadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setUploadSummary(null);

    try {
      const uploadData = new FormData();
      uploadData.append("file", selectedFile);

      const res = await fetch("/api/admin/painters/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadSummary(data.stats);
      setMessage({
        type: "success",
        text: data.message || "XLSX imported successfully!",
      });
      fetchPainters();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
    }
  }

  function downloadSampleXlsx() {
    const sampleData = [
      {
        mobile_number: "6003847066",
        first_name: "Intejul Rehman",
        "City Name": "Goalpara",
        Pincode: "783129",
        "State Name": "Assam",
      },
      {
        mobile_number: "9876543210",
        first_name: "Ramesh Sharma",
        "City Name": "Mumbai",
        Pincode: "400001",
        "State Name": "Maharashtra",
      },
      {
        mobile_number: "9831099887",
        first_name: "Amit Mondal",
        "City Name": "Kolkata",
        Pincode: "700017",
        "State Name": "West Bengal",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Painters");
    XLSX.writeFile(workbook, "snowcem_painters_template.xlsx");
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Paintbrush size={22} />
            </div>
            <h1 className="text-2xl font-black text-[#0D1B3E] tracking-tight">
              Manage Certified Painters
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Directory of certified Snowcem painters, application specialists, and contractors.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => {
              setSelectedFile(null);
              setUploadSummary(null);
              setUploadModalOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-200 shadow-sm transition-all"
          >
            <Upload size={15} />
            <span>Upload XLSX</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#f36c21] hover:bg-[#e05307] text-white shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={16} />
            <span>Add Painter</span>
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`flex items-center justify-between p-3.5 rounded-xl text-xs ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Bulk Selection Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 text-white p-3.5 px-5 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="bg-[#f36c21] text-white px-2.5 py-1 rounded-lg">
              {selectedIds.length} Selected
            </span>
            <span className="text-slate-300">
              out of {painters.length} painters
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              Deselect All
            </button>
            <button
              onClick={() => {
                setDeleteAllConfirm(false);
                setBulkDeleteModalOpen(true);
              }}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5DDD5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by painter name, phone, city, state, or pincode..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs flex-wrap gap-2">
          <div className="flex items-center space-x-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#E0D7CE]">
            {["all", "active", "pending", "inactive"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all ${
                  statusFilter === st
                    ? "bg-[#0D1B3E] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
            <span>Total:</span>
            <span className="font-bold text-[#0D1B3E] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#E0D7CE]">
              {painters.length}
            </span>
          </div>

          {painters.length > 0 && (
            <button
              onClick={() => {
                setDeleteAllConfirm(true);
                setBulkDeleteModalOpen(true);
              }}
              className="text-rose-600 hover:text-rose-700 font-bold hover:underline text-xs flex items-center gap-1 cursor-pointer pl-2 border-l border-slate-200"
              title="Delete all painters from database"
            >
              <Trash2 size={13} />
              <span>Delete All</span>
            </button>
          )}

          <button
            onClick={fetchPainters}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
            title="Refresh list"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Painters Table */}
      <div className="bg-white border border-[#E5DDD5] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#E5DDD5] text-slate-600 uppercase font-bold tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={painters.length > 0 && selectedIds.length === painters.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#f36c21] focus:ring-[#f36c21] cursor-pointer"
                    title="Select all"
                  />
                </th>
                <th className="py-4 px-5">Painter Name</th>
                <th className="py-4 px-5">Location &amp; Pincode</th>
                <th className="py-4 px-5">Specialization &amp; Exp</th>
                <th className="py-4 px-5">Mobile / Contact</th>
                <th className="py-4 px-5">Status &amp; Verification</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9E2] text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-slate-400">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-[#f36c21]" />
                    Loading painters from database...
                  </td>
                </tr>
              ) : painters.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-slate-500 font-medium">
                    No painters registered. Use &ldquo;Upload XLSX&rdquo; or click &ldquo;Add Painter&rdquo; to add contacts.
                  </td>
                </tr>
              ) : (
                painters.map((p) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-[#FAF8F5]/80 transition-all ${
                      selectedIds.includes(p.id) ? "bg-orange-50/40" : ""
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        className="w-4 h-4 rounded border-slate-300 text-[#f36c21] focus:ring-[#f36c21] cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#0D1B3E] text-sm flex items-center space-x-1.5">
                        <span>{p.name}</span>
                        {p.verified && (
                          <span title="Snowcem Certified">
                            <ShieldCheck size={15} className="text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-[11px] text-amber-700 mt-0.5">
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        <span>{p.rating || "4.8"} rating</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-1.5 text-slate-800 font-medium">
                        <MapPin size={13} className="text-[#f36c21] flex-shrink-0" />
                        <span>{p.city}, {p.state}</span>
                      </div>
                      {p.pincode && (
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          PIN: {p.pincode}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-[#0D1B3E] font-semibold">{p.specialization}</div>
                      <div className="flex items-center space-x-1 text-[11px] text-slate-500 mt-0.5">
                        <Briefcase size={12} />
                        <span>{p.experienceYears || 3} yrs experience</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-1.5 font-mono text-slate-800 font-medium">
                        <Phone size={13} className="text-slate-400" />
                        <span>{p.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          p.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : p.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {p.status || "active"}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all"
                          title="Edit Painter"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-all"
                          title="Delete Painter"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOM BULK UPLOAD MODAL */}
      <CustomModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Bulk Upload Painters"
        subtitle="Import verified painter records from Excel spreadsheet (.xlsx, .xls)"
        icon={<FileSpreadsheet size={20} />}
        maxWidth="lg"
      >
        <div className="space-y-4">
          {/* Expected Columns Format Guide */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E0D7CE] text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0D1B3E]">Expected Column Headers:</span>
              <button
                type="button"
                onClick={downloadSampleXlsx}
                className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                <Download size={13} />
                <span>Download Sample (.xlsx)</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "mobile_number",
                "first_name",
                "City Name",
                "Pincode",
                "State Name",
              ].map((col) => (
                <code
                  key={col}
                  className="px-2.5 py-0.5 rounded-lg bg-white text-emerald-800 border border-emerald-200 text-[11px] font-mono font-medium shadow-2xs"
                >
                  {col}
                </code>
              ))}
            </div>
          </div>

          {/* Upload summary stats if completed */}
          {uploadSummary && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1.5 text-emerald-900">
              <div className="font-bold flex items-center space-x-1.5 text-emerald-800">
                <Check size={15} />
                <span>Bulk Import Completed!</span>
              </div>
              <div className="text-slate-700 text-[11px] font-medium">
                Successfully inserted <strong className="text-emerald-700 font-bold">{uploadSummary.inserted}</strong> painters.
              </div>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D6C2B4] hover:border-emerald-500 rounded-3xl p-7 text-center cursor-pointer bg-[#FCFAF7] transition-all group"
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".xlsx, .xls, .csv"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E0D7CE] text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs group-hover:scale-105 transition-transform">
                <Upload size={20} />
              </div>
              {selectedFile ? (
                <div>
                  <span className="text-xs font-bold text-emerald-800 block truncate max-w-xs mx-auto">
                    {selectedFile.name}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {(selectedFile.size / 1024).toFixed(1)} KB - Click to replace
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-[#0D1B3E] block">
                    Click to choose or drop your .xlsx file here
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block font-medium">
                    Supports Excel files containing painter records
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={!selectedFile || uploading}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
              >
                {uploading ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <Upload size={13} />
                    <span>Start Bulk Import</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>

      {/* CUSTOM ADD / EDIT PAINTER MODAL */}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPainter ? "Edit Painter Record" : "Add Painter / Contractor"}
        subtitle="Manage certified painting specialist details and service area"
        icon={<Paintbrush size={20} />}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Intejul Rehman"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Mobile Number *</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 6003847066"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Goalpara"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">State *</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Assam"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="783129"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Experience (Years)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.experienceYears}
                onChange={(e) =>
                  setFormData({ ...formData, experienceYears: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Specialization</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Exterior Textures, Uni-glosss"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900"
              >
                <option value="active">Active</option>
                <option value="pending">Pending Verification</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Rating (1 to 5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <input
              type="checkbox"
              id="verifiedPainter"
              checked={formData.verified}
              onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
              className="rounded border-[#E0D7CE] text-emerald-600 focus:ring-emerald-500 h-4 w-4"
            />
            <label htmlFor="verifiedPainter" className="text-slate-800 cursor-pointer font-bold">
              Snowcem Certified &amp; Verified Contractor
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-5 border-t border-[#EFE9E2]">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#f36c21] hover:bg-[#e05307] text-white font-bold shadow-md shadow-orange-500/20 cursor-pointer"
            >
              {editingPainter ? "Update Painter" : "Save Painter"}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* CUSTOM BULK DELETE CONFIRMATION MODAL */}
      <CustomModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        title="Confirm Bulk Deletion"
        icon={<AlertTriangle size={20} className="text-rose-600" />}
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {deleteAllConfirm
              ? `Are you sure you want to permanently delete ALL ${painters.length} certified painters from the database? This action cannot be undone.`
              : `Are you sure you want to permanently delete the ${selectedIds.length} selected painters from the database? This action cannot be undone.`}
          </p>
          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              onClick={() => setBulkDeleteModalOpen(false)}
              disabled={bulkDeleting}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md cursor-pointer flex items-center gap-1.5"
            >
              {bulkDeleting ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={13} />
                  <span>Confirm Delete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </CustomModal>

      {/* CUSTOM DELETE CONFIRMATION MODAL */}
      <CustomModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Removal"
        icon={<AlertTriangle size={20} className="text-rose-600" />}
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to remove this painter from the certified directory? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="px-4 py-2 rounded-xl text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold shadow cursor-pointer"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
