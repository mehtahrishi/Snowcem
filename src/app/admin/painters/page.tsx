"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Paintbrush,
  Plus,
  Edit2,
  Trash2,
  Star,
  RefreshCw,
  MapPin,
  Phone,
  Briefcase,
  ShieldCheck,
  Upload,
  FileSpreadsheet,
  Download,
  Check,
} from "lucide-react";
import * as XLSX from "xlsx";
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
  const toast = useToast();
  const confirm = useConfirm();

  const [painters, setPainters] = useState<Painter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editingPainter, setEditingPainter] = useState<Painter | null>(null);

  // Bulk Selection & Delete States
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

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
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    city: string;
    state: string;
    pincode: string;
    experienceYears: string;
    specialization: string;
    rating: string;
    status: string;
    verified: boolean;
  }>({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    experienceYears: "",
    specialization: "",
    rating: "",
    status: "active",
    verified: false,
  });

  const fetchPainters = useCallback(async () => {
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
        toast.error(data.error || "Failed to load painters");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch painters");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, toast]);

  useEffect(() => {
    fetchPainters();
  }, [fetchPainters]);

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

  async function handleBulkDelete(deleteAll: boolean) {
    if ((!deleteAll && selectedIds.length === 0) || bulkDeleting) return;

    const ok = await confirm({
      title: deleteAll ? "Delete all painters?" : `Delete ${selectedIds.length} selected painters?`,
      description: deleteAll
        ? `This will permanently remove all ${painters.length} certified painters from the database. This action cannot be undone.`
        : `This will permanently remove the ${selectedIds.length} selected painters. This action cannot be undone.`,
      confirmLabel: deleteAll ? "Delete All Painters" : "Delete Selected",
      tone: "danger",
    });
    if (!ok) return;

    setBulkDeleting(true);
    try {
      const res = await fetch("/api/admin/painters/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteAll ? { all: true } : { ids: selectedIds }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bulk delete failed");

      toast.success(
        deleteAll
          ? "All painters deleted successfully"
          : `Deleted ${selectedIds.length} painters successfully`
      );
      setSelectedIds([]);
      fetchPainters();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete painters");
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
      experienceYears: "",
      specialization: "",
      rating: "",
      status: "active",
      verified: false,
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
      experienceYears: p.experienceYears != null ? String(p.experienceYears) : "",
      specialization: p.specialization || "",
      rating: p.rating != null ? String(p.rating) : "",
      status: p.status || "active",
      verified: Boolean(p.verified),
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      if (editingPainter) {
        const res = await fetch(`/api/admin/painters/${editingPainter.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update painter");
        toast.success("Painter updated successfully");
      } else {
        const res = await fetch("/api/admin/painters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add painter");
        toast.success("New contractor added successfully");
      }

      setModalOpen(false);
      fetchPainters();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save painter");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(p: Painter) {
    const ok = await confirm({
      title: `Remove "${p.name}"?`,
      description: `This painter in ${p.city}, ${p.state} will be removed from the certified directory.`,
      confirmLabel: "Remove Painter",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/painters/${p.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete painter");
      toast.success("Painter removed successfully");
      setSelectedIds((prev) => prev.filter((item) => item !== p.id));
      fetchPainters();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  async function handleUploadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile || uploading) return;

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
      toast.success(data.message || "Spreadsheet imported successfully");
      fetchPainters();
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
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
    <div className="space-y-6">
      <PageHeader
        icon={Paintbrush}
        title="Manage Certified Painters"
        description="Directory of certified Snowcem painters, application specialists, and contractors."
        actions={
          <>
            <Button variant="secondary" icon={RefreshCw} onClick={fetchPainters} loading={loading}>
              Refresh
            </Button>
            <Button
              variant="secondary"
              icon={FileSpreadsheet}
              onClick={() => {
                setSelectedFile(null);
                setUploadSummary(null);
                setUploadModalOpen(true);
              }}
            >
              Upload XLSX
            </Button>
            <Button variant="primary" icon={Plus} onClick={openCreateModal}>
              Add Painter
            </Button>
          </>
        }
      />

      {/* Bulk Selection Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#D4AF37]/30 bg-[#0A2621] px-5 py-3.5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-xs">
            <Badge tone="gold">{selectedIds.length} Selected</Badge>
            <span className="text-[#C2B69D]">out of {painters.length} painters</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
              Deselect All
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              loading={bulkDeleting}
              onClick={() => handleBulkDelete(false)}
            >
              Delete Selected ({selectedIds.length})
            </Button>
          </div>
        </div>
      )}

      <Toolbar className="justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by painter name, phone, city, state, or pincode..."
            className="sm:max-w-sm"
          />

          <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#041411] p-1">
            {["all", "active", "pending", "inactive"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#D4AF37] text-[#061C18] shadow-sm"
                    : "text-[#C2B69D] hover:text-[#EDE4D8]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="gold">{painters.length} {painters.length === 1 ? "painter" : "painters"}</Badge>
          {painters.length > 0 && (
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              loading={bulkDeleting}
              onClick={() => handleBulkDelete(true)}
            >
              Delete All
            </Button>
          )}
        </div>
      </Toolbar>

      {loading ? (
        <LoadingState rows={6} />
      ) : painters.length === 0 ? (
        <EmptyState
          icon={Paintbrush}
          title="No painters found"
          description={
            search || statusFilter !== "all"
              ? "Try adjusting your search or status filter."
              : "Upload an Excel spreadsheet or add a painter manually."
          }
          action={
            <Button variant="primary" icon={Plus} onClick={openCreateModal}>
              Add Painter
            </Button>
          }
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th align="center" className="w-10">
                <input
                  type="checkbox"
                  aria-label="Select all painters"
                  checked={painters.length > 0 && selectedIds.length === painters.length}
                  onChange={toggleSelectAll}
                  className={checkboxCls}
                />
              </Th>
              <Th>Painter</Th>
              <Th>Location &amp; Pincode</Th>
              <Th>Specialization &amp; Exp</Th>
              <Th>Contact</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {painters.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              const statusTone =
                p.status === "active"
                  ? "success"
                  : p.status === "pending"
                  ? "warning"
                  : "neutral";
              return (
                <tr key={p.id} className={`${trCls} ${isSelected ? "bg-[#D4AF37]/[0.06]" : ""}`}>
                  <Td align="center">
                    <input
                      type="checkbox"
                      aria-label={`Select ${p.name}`}
                      checked={isSelected}
                      onChange={() => toggleSelect(p.id)}
                      className={checkboxCls}
                    />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1.5 font-semibold text-[#EDE4D8]">
                      <span>{p.name}</span>
                      {p.verified && (
                        <span title="Snowcem Certified">
                          <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    {p.rating != null && (
                      <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#E3C25A]">
                        <Star className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                        <span>{p.rating} rating</span>
                      </div>
                    )}
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1.5 font-medium text-[#EDE4D8]">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                      <span>
                        {p.city}, {p.state}
                      </span>
                    </div>
                    {p.pincode && (
                      <div className="mt-0.5 font-mono text-[11px] text-[#C2B69D]/80">
                        PIN: {p.pincode}
                      </div>
                    )}
                  </Td>
                  <Td>
                    {p.specialization && (
                      <div className="font-medium text-[#EDE4D8]">{p.specialization}</div>
                    )}
                    {p.experienceYears != null ? (
                      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#C2B69D]/80">
                        <Briefcase className="h-3 w-3" />
                        <span>{p.experienceYears} yrs experience</span>
                      </div>
                    ) : (
                      !p.specialization && <span className="text-[#C2B69D]/50">Not specified</span>
                    )}
                  </Td>
                  <Td>
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EDE4D8]">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/80" />
                      <span>{p.phone}</span>
                    </div>
                  </Td>
                  <Td>
                    <Badge tone={statusTone} className="capitalize">
                      {p.status || "active"}
                    </Badge>
                  </Td>
                  <Td align="right">
                    <div className="inline-flex items-center justify-end gap-1">
                      <IconButton icon={Edit2} label="Edit painter" onClick={() => openEditModal(p)} />
                      <IconButton icon={Trash2} label="Delete painter" tone="danger" onClick={() => handleDelete(p)} />
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      )}

      {/* Bulk Upload Modal */}
      <CustomModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Bulk Upload Painters"
        subtitle="Import certified painter records from an Excel spreadsheet (.xlsx, .xls, .csv)"
        icon={<FileSpreadsheet className="h-5 w-5" />}
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="space-y-2.5 rounded-xl border border-white/10 bg-[#041411] p-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-[#EDE4D8]">Expected Column Headers</span>
              <button
                type="button"
                onClick={downloadSampleXlsx}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
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
                  className="rounded-md border border-white/10 bg-[#0A2621] px-2 py-0.5 font-mono text-[11px] text-[#E3C25A]"
                >
                  {col}
                </code>
              ))}
            </div>
          </div>

          {uploadSummary && (
            <div className="space-y-1 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="h-4 w-4" />
                <span>Bulk Import Completed</span>
              </div>
              <p className="text-[11px] text-emerald-200/90">
                Successfully inserted <strong>{uploadSummary.inserted}</strong> painters
                {uploadSummary.skipped > 0 ? ` (${uploadSummary.skipped} skipped)` : ""}.
              </p>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-[#041411]/60 p-7 text-center transition hover:border-[#D4AF37]/60"
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
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0A2621] text-[#D4AF37] transition-transform group-hover:scale-105">
                <Upload className="h-5 w-5" />
              </div>
              {selectedFile ? (
                <div>
                  <span className="mx-auto block max-w-xs truncate text-xs font-semibold text-[#EDE4D8]">
                    {selectedFile.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-[#C2B69D]">
                    {(selectedFile.size / 1024).toFixed(1)} KB — Click to replace file
                  </span>
                </div>
              ) : (
                <div>
                  <span className="block text-xs font-semibold text-[#EDE4D8]">
                    Click to choose an Excel or CSV file
                  </span>
                  <span className="mt-1 block text-[11px] text-[#C2B69D]/80">
                    Supports spreadsheets containing painter records
                  </span>
                </div>
              )}
            </div>

            <FormActions>
              <Button variant="ghost" onClick={() => setUploadModalOpen(false)}>
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={Upload}
                loading={uploading}
                disabled={!selectedFile}
              >
                {uploading ? "Importing..." : "Start Bulk Import"}
              </Button>
            </FormActions>
          </form>
        </div>
      </CustomModal>

      {/* Add / Edit Painter Modal */}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPainter ? "Edit Painter Record" : "Add Painter / Contractor"}
        subtitle="Manage certified painting specialist details and service area."
        icon={<Paintbrush className="h-5 w-5" />}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid cols={2}>
            <Field label="Full Name" required>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Intejul Rehman"
                className={inputCls}
              />
            </Field>
            <Field label="Mobile Number" required>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 6003847066"
                className={`${inputCls} font-mono`}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={3}>
            <Field label="City" required>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Goalpara"
                className={inputCls}
              />
            </Field>
            <Field label="State" required>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Assam"
                className={inputCls}
              />
            </Field>
            <Field label="Pincode">
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="e.g. 783129"
                className={`${inputCls} font-mono`}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={2}>
            <Field label="Experience (Years)">
              <input
                type="number"
                min="0"
                max="50"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                placeholder="e.g. 8"
                className={inputCls}
              />
            </Field>
            <Field label="Specialization">
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Exterior Textures, Uni-glosss"
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={2}>
            <Field label="Status">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={selectCls}
              >
                <option value="active">Active</option>
                <option value="pending">Pending Verification</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
            <Field label="Rating (1 to 5)">
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="e.g. 4.8"
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <label htmlFor="verifiedPainter" className="flex cursor-pointer items-center gap-2.5 pt-1 text-xs font-medium text-[#EDE4D8]">
            <input
              type="checkbox"
              id="verifiedPainter"
              checked={formData.verified}
              onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
              className={checkboxCls}
            />
            <span>Snowcem Certified &amp; Verified Contractor</span>
          </label>

          <FormActions>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editingPainter ? "Update Painter" : "Save Painter"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
