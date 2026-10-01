"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Store,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  RefreshCw,
  MapPin,
  Phone,
  AlertTriangle,
  Upload,
  FileSpreadsheet,
  Download,
  Check,
  Building2,
  Hash,
} from "lucide-react";
import * as XLSX from "xlsx";
import CustomModal from "@/components/admin/CustomModal";

interface Dealer {
  id: string;
  customerCode?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  pincode?: string;
  landmark?: string;
  rating?: string | number;
  featured?: boolean;
}

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null);

  // Bulk Selection & Delete States
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);

  // Bulk upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSummary, setUploadSummary] = useState<{
    inserted: number;
    skipped: number;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    customerCode: "",
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    pincode: "",
    landmark: "",
    rating: "4.8",
    featured: false,
  });

  async function fetchDealers() {
    setLoading(true);
    try {
      const url = search
        ? `/api/admin/dealers?search=${encodeURIComponent(search)}`
        : `/api/admin/dealers`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setDealers(data.data || []);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to load dealers" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Failed to fetch dealers" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDealers();
  }, [search]);

  // Selection handlers
  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === dealers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dealers.map((d) => d.id));
    }
  }

  async function handleBulkDelete() {
    if (selectedIds.length === 0 && !deleteAllConfirm) return;

    setBulkDeleting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/dealers/bulk-delete", {
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
          ? "All dealers have been deleted successfully."
          : `Successfully deleted ${selectedIds.length} dealers!`,
      });

      setSelectedIds([]);
      setBulkDeleteModalOpen(false);
      setDeleteAllConfirm(false);
      fetchDealers();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to delete" });
    } finally {
      setBulkDeleting(false);
    }
  }

  function openCreateModal() {
    setEditingDealer(null);
    setFormData({
      customerCode: "",
      name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      pincode: "",
      landmark: "",
      rating: "4.8",
      featured: false,
    });
    setModalOpen(true);
  }

  function openEditModal(dealer: Dealer) {
    setEditingDealer(dealer);
    setFormData({
      customerCode: dealer.customerCode || "",
      name: dealer.name || "",
      address: dealer.address || "",
      city: dealer.city || "",
      state: dealer.state || "",
      phone: dealer.phone || "",
      pincode: dealer.pincode || "",
      landmark: dealer.landmark || "",
      rating: String(dealer.rating || "4.8"),
      featured: Boolean(dealer.featured),
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    try {
      if (editingDealer) {
        const res = await fetch(`/api/admin/dealers/${editingDealer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Update failed");
        setMessage({ type: "success", text: "Dealer updated successfully" });
      } else {
        const res = await fetch("/api/admin/dealers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Creation failed");
        setMessage({ type: "success", text: "Dealer created successfully" });
      }

      setModalOpen(false);
      fetchDealers();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/dealers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setMessage({ type: "success", text: "Dealer deleted successfully" });
      setDeleteConfirmId(null);
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      fetchDealers();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  }

  function downloadSampleXlsx() {
    const sampleHeaders = [
      {
        "Customer Code": "CUST1001",
        "Customer Name": "SNOWCEM PAINTS AGENCY",
        "Mobile Number": "9820012345",
        "Address Line 1": "Shop No. 12, Heritage Market",
        "Address Line 2": "Opp. Railway Station",
        "Address Line 3": "Main High Street",
        "Address Line 4": "Near City Post Office",
        "Postal Code": "400001",
        "City": "Mumbai",
        "State": "Maharashtra",
      },
      {
        "Customer Code": "CUST1002",
        "Customer Name": "ROYAL COLOUR MART",
        "Mobile Number": "9845012345",
        "Address Line 1": "Plot 45, Industrial Estate",
        "Address Line 2": "Near Toll Gate",
        "Address Line 3": "",
        "Address Line 4": "",
        "Postal Code": "560001",
        "City": "Bengaluru",
        "State": "Karnataka",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dealers Template");
    XLSX.writeFile(workbook, "snowcem_dealers_bulk_sample.xlsx");
  }

  async function handleBulkUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setUploadSummary(null);
    setMessage(null);

    try {
      const data = new FormData();
      data.append("file", selectedFile);

      const res = await fetch("/api/admin/dealers/upload", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Upload failed");

      setUploadSummary({
        inserted: resData.stats?.inserted || 0,
        skipped: resData.stats?.skipped || 0,
      });

      setMessage({
        type: "success",
        text: `Successfully imported ${resData.stats?.inserted || 0} dealer records into database!`,
      });

      fetchDealers();
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to process XLSX upload" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E5DDD5]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B3E] tracking-tight">
            Manage Dealers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Authorized store stockists, retail outlets, and distribution centers across India.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setUploadSummary(null);
              setUploadModalOpen(true);
            }}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#D6C2B4] hover:border-emerald-600 text-slate-800 hover:text-emerald-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <FileSpreadsheet size={15} className="text-emerald-600" />
            <span>Bulk Upload (.xlsx)</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f36c21] to-[#e05307] hover:from-[#e05307] hover:to-[#c84600] text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Dealer</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700">
            &times;
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
              out of {dealers.length} dealers
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

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5DDD5] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by store name, customer code, city, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-2">
            <span>Total Dealers:</span>
            <span className="font-bold text-[#0D1B3E] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#E0D7CE]">
              {dealers.length}
            </span>
          </div>

          {dealers.length > 0 && (
            <button
              onClick={() => {
                setDeleteAllConfirm(true);
                setBulkDeleteModalOpen(true);
              }}
              className="text-rose-600 hover:text-rose-700 font-bold hover:underline text-xs flex items-center gap-1 cursor-pointer pl-2 border-l border-slate-200"
              title="Delete all dealers from database"
            >
              <Trash2 size={13} />
              <span>Delete All</span>
            </button>
          )}
        </div>
      </div>

      {/* Dealers Data Table */}
      <div className="bg-white rounded-3xl border border-[#E5DDD5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#FAF8F5] text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-[#EFE9E2]">
              <tr>
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={dealers.length > 0 && selectedIds.length === dealers.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#f36c21] focus:ring-[#f36c21] cursor-pointer"
                    title="Select all"
                  />
                </th>
                <th className="py-3.5 px-5">Code / Store</th>
                <th className="py-3.5 px-5">Location & Address</th>
                <th className="py-3.5 px-5">Contact</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9E2]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <RefreshCw size={22} className="animate-spin mx-auto mb-2 text-[#f36c21]" />
                    <span>Loading dealer network...</span>
                  </td>
                </tr>
              ) : dealers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Store size={32} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-medium text-slate-600">No dealers found</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Upload an Excel spreadsheet or click &quot;Add Dealer&quot; to register a stockist.
                    </p>
                  </td>
                </tr>
              ) : (
                dealers.map((d) => (
                  <tr
                    key={d.id}
                    className={`hover:bg-[#FCFAF7] transition-colors ${
                      selectedIds.includes(d.id) ? "bg-orange-50/40" : ""
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(d.id)}
                        onChange={() => toggleSelect(d.id)}
                        className="w-4 h-4 rounded border-slate-300 text-[#f36c21] focus:ring-[#f36c21] cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-2">
                        <div className="font-bold text-[#0D1B3E] text-sm">{d.name}</div>
                        {d.featured && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                        {d.customerCode && (
                          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-semibold">
                            {d.customerCode}
                          </span>
                        )}
                        <span className="flex items-center text-amber-600 font-semibold">
                          <Star size={11} className="fill-amber-400 mr-0.5" />
                          {d.rating || "4.8"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 max-w-sm">
                      <div className="flex items-center space-x-1.5 text-slate-800 font-medium">
                        <MapPin size={13} className="text-[#f36c21] shrink-0" />
                        <span>{d.city}, {d.state}</span>
                        {d.pincode && <span className="text-slate-400 font-mono text-[11px]">({d.pincode})</span>}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5" title={d.address}>
                        {d.address}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-1.5 font-mono text-slate-800 font-medium">
                        <Phone size={13} className="text-slate-400 shrink-0" />
                        <span>{d.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Authorized
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => openEditModal(d)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                          title="Edit Dealer"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(d.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-all cursor-pointer"
                          title="Delete Dealer"
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
        title="Bulk Upload Dealers"
        subtitle="Import official dealer records from an Excel spreadsheet (.xlsx, .xls)"
        icon={<FileSpreadsheet size={20} />}
        maxWidth="lg"
      >
        <div className="space-y-4">
          {/* Instructions Box */}
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
                "Customer Code",
                "Customer Name",
                "Mobile Number",
                "Address Line 1",
                "Address Line 2",
                "Address Line 3",
                "Address Line 4",
                "Postal Code",
                "City",
                "State",
              ].map((col) => (
                <code
                  key={col}
                  className="px-2 py-0.5 rounded-lg bg-white text-emerald-800 border border-emerald-200 text-[11px] font-mono font-medium shadow-2xs"
                >
                  {col}
                </code>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 font-medium pt-1">
              Note: Address Line 1 to 4 will be automatically merged into a single clean address.
            </p>
          </div>

          {/* Upload summary stats if completed */}
          {uploadSummary && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1.5 text-emerald-900">
              <div className="font-bold flex items-center space-x-1.5 text-emerald-800">
                <Check size={15} />
                <span>Bulk Import Completed!</span>
              </div>
              <div className="text-slate-700 text-[11px] font-medium">
                Successfully inserted <strong className="text-emerald-700 font-bold">{uploadSummary.inserted}</strong> dealers.
              </div>
            </div>
          )}

          <form onSubmit={handleBulkUpload} className="space-y-4">
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
                    {(selectedFile.size / 1024).toFixed(1)} KB - Click to change
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-[#0D1B3E] block">
                    Click to choose or drop your .xlsx file here
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block font-medium">
                    Upload your spreadsheet with dealer records
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
                    <span>Import Dealers</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>

      {/* CUSTOM ADD / EDIT DEALER MODAL */}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDealer ? "Edit Dealer Record" : "Add Authorized Dealer"}
        subtitle="Manage official Snowcem stockist details and store location"
        icon={<Store size={20} />}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Customer Code
              </label>
              <input
                type="text"
                value={formData.customerCode}
                onChange={(e) => setFormData({ ...formData, customerCode: e.target.value })}
                placeholder="e.g. CUST-1049"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1.5">
                Store / Customer Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ashok Trading Company"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Phone / Mobile Number *
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98248 68330"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Full Street Address *
            </label>
            <textarea
              required
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Ground Floor, 0 S V P Road near Shitala Chowk..."
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#f36c21]/30 focus:border-[#f36c21]"
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
                placeholder="e.g. Porbandar"
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
                placeholder="e.g. Gujarat"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Postal Code</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="e.g. 360575"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Star Rating</label>
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
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="featuredDealer"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-[#f36c21] rounded border-slate-300 focus:ring-[#f36c21]"
              />
              <label htmlFor="featuredDealer" className="text-slate-800 font-bold cursor-pointer">
                Mark as Featured Stockist
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#EFE9E2]">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0D1B3E] hover:bg-slate-800 text-white shadow-md cursor-pointer"
            >
              {editingDealer ? "Update Dealer" : "Save Dealer"}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* CUSTOM BULK DELETE MODAL */}
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
              ? `Are you sure you want to permanently delete ALL ${dealers.length} dealers from the database? This action cannot be undone.`
              : `Are you sure you want to permanently delete the ${selectedIds.length} selected dealers from the database? This action cannot be undone.`}
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

      {/* CUSTOM SINGLE DELETE CONFIRMATION MODAL */}
      <CustomModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        icon={<AlertTriangle size={20} className="text-rose-600" />}
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to delete this dealer? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
