"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Store,
  Plus,
  Edit2,
  Trash2,
  Star,
  RefreshCw,
  MapPin,
  Phone,
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
  textareaCls,
  checkboxCls,
  useToast,
  useConfirm,
} from "@/components/admin/ui";

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
  const toast = useToast();
  const confirm = useConfirm();

  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null);

  // Bulk Selection & Delete States
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

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
    rating: "",
    featured: false,
  });

  const fetchDealers = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `/api/admin/dealers?search=${encodeURIComponent(search)}`
        : "/api/admin/dealers";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setDealers(data.data || []);
      } else {
        toast.error(data.error || "Failed to load dealers");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch dealers");
    } finally {
      setLoading(false);
    }
  }, [search, toast]);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

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

  async function handleBulkDelete(deleteAll: boolean) {
    if ((!deleteAll && selectedIds.length === 0) || bulkDeleting) return;

    const ok = await confirm({
      title: deleteAll ? "Delete all dealers?" : `Delete ${selectedIds.length} selected dealers?`,
      description: deleteAll
        ? `This will permanently delete all ${dealers.length} dealer records from the database. This action cannot be undone.`
        : `This will permanently delete the ${selectedIds.length} selected dealers. This action cannot be undone.`,
      confirmLabel: deleteAll ? "Delete All Dealers" : "Delete Selected",
      tone: "danger",
    });
    if (!ok) return;

    setBulkDeleting(true);
    try {
      const res = await fetch("/api/admin/dealers/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteAll ? { all: true } : { ids: selectedIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bulk delete failed");

      toast.success(
        deleteAll
          ? "All dealers deleted successfully"
          : `Deleted ${selectedIds.length} dealers successfully`
      );
      setSelectedIds([]);
      fetchDealers();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete dealers");
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
      rating: "",
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
      rating: dealer.rating != null ? String(dealer.rating) : "",
      featured: Boolean(dealer.featured),
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      if (editingDealer) {
        const res = await fetch(`/api/admin/dealers/${editingDealer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Update failed");
        toast.success("Dealer updated successfully");
      } else {
        const res = await fetch("/api/admin/dealers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Creation failed");
        toast.success("Dealer created successfully");
      }

      setModalOpen(false);
      fetchDealers();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save dealer");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(dealer: Dealer) {
    const ok = await confirm({
      title: `Delete "${dealer.name}"?`,
      description: `This dealer in ${dealer.city}, ${dealer.state} will be permanently removed.`,
      confirmLabel: "Delete Dealer",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/dealers/${dealer.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      toast.success("Dealer deleted successfully");
      setSelectedIds((prev) => prev.filter((item) => item !== dealer.id));
      fetchDealers();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
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
        City: "Mumbai",
        State: "Maharashtra",
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
        City: "Bengaluru",
        State: "Karnataka",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dealers Template");
    XLSX.writeFile(workbook, "snowcem_dealers_bulk_sample.xlsx");
  }

  async function handleBulkUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile || uploading) return;

    setUploading(true);
    setUploadSummary(null);

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

      toast.success(`Imported ${resData.stats?.inserted || 0} dealer records`);
      fetchDealers();
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      toast.error(err?.message || "Failed to process XLSX upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Store}
        title="Manage Dealers"
        description="Authorized store stockists, retail outlets, and distribution centers across India."
        actions={
          <>
            <Button variant="secondary" icon={RefreshCw} onClick={fetchDealers} loading={loading}>
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
              Bulk Upload (.xlsx)
            </Button>
            <Button variant="primary" icon={Plus} onClick={openCreateModal}>
              Add Dealer
            </Button>
          </>
        }
      />

      {/* Bulk Selection Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#D4AF37]/30 bg-[#0A2621] px-5 py-3.5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-xs">
            <Badge tone="gold">{selectedIds.length} Selected</Badge>
            <span className="text-[#C2B69D]">out of {dealers.length} dealers</span>
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
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by store name, customer code, city, or phone..."
          className="sm:max-w-md"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="gold">{dealers.length} {dealers.length === 1 ? "dealer" : "dealers"}</Badge>
          {dealers.length > 0 && (
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
      ) : dealers.length === 0 ? (
        <EmptyState
          icon={Store}
          title="No dealers found"
          description={
            search
              ? "No dealers match your current search query."
              : "Upload an Excel spreadsheet or add a stockist manually to get started."
          }
          action={
            <Button variant="primary" icon={Plus} onClick={openCreateModal}>
              Add Dealer
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
                  aria-label="Select all dealers"
                  checked={dealers.length > 0 && selectedIds.length === dealers.length}
                  onChange={toggleSelectAll}
                  className={checkboxCls}
                />
              </Th>
              <Th>Code / Store</Th>
              <Th>Location &amp; Address</Th>
              <Th>Contact</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {dealers.map((d) => {
              const isSelected = selectedIds.includes(d.id);
              return (
                <tr key={d.id} className={`${trCls} ${isSelected ? "bg-[#D4AF37]/[0.06]" : ""}`}>
                  <Td align="center">
                    <input
                      type="checkbox"
                      aria-label={`Select ${d.name}`}
                      checked={isSelected}
                      onChange={() => toggleSelect(d.id)}
                      className={checkboxCls}
                    />
                  </Td>
                  <Td>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#EDE4D8]">{d.name}</span>
                      {d.featured && <Badge tone="gold">Featured</Badge>}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#C2B69D]">
                      {d.customerCode && (
                        <span className="rounded bg-[#041411] px-1.5 py-0.5 font-mono text-[#EDE4D8]">
                          {d.customerCode}
                        </span>
                      )}
                      {d.rating != null && (
                        <span className="inline-flex items-center gap-1 font-semibold text-[#E3C25A]">
                          <Star className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                          {d.rating}
                        </span>
                      )}
                    </div>
                  </Td>
                  <Td className="max-w-sm">
                    <div className="flex items-center gap-1.5 font-medium text-[#EDE4D8]">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                      <span>
                        {d.city}, {d.state}
                      </span>
                      {d.pincode && (
                        <span className="font-mono text-[11px] text-[#C2B69D]">({d.pincode})</span>
                      )}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-[#C2B69D]/80" title={d.address}>
                      {d.address}
                    </div>
                  </Td>
                  <Td>
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#EDE4D8]">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/80" />
                      <span>{d.phone}</span>
                    </div>
                  </Td>
                  <Td>
                    <Badge tone="success">Authorized</Badge>
                  </Td>
                  <Td align="right">
                    <div className="inline-flex items-center justify-end gap-1">
                      <IconButton icon={Edit2} label="Edit dealer" onClick={() => openEditModal(d)} />
                      <IconButton icon={Trash2} label="Delete dealer" tone="danger" onClick={() => handleDelete(d)} />
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
        title="Bulk Upload Dealers"
        subtitle="Import official dealer records from an Excel spreadsheet (.xlsx, .xls, .csv)"
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
                  className="rounded-md border border-white/10 bg-[#0A2621] px-2 py-0.5 font-mono text-[11px] text-[#E3C25A]"
                >
                  {col}
                </code>
              ))}
            </div>
            <p className="pt-1 text-[11px] text-[#C2B69D]/80">
              Address Line 1 to 4 are automatically merged into a single clean street address.
            </p>
          </div>

          {uploadSummary && (
            <div className="space-y-1 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5 font-semibold">
                <Check className="h-4 w-4" />
                <span>Bulk Import Completed</span>
              </div>
              <p className="text-[11px] text-emerald-200/90">
                Successfully inserted <strong>{uploadSummary.inserted}</strong> dealers
                {uploadSummary.skipped > 0 ? ` (${uploadSummary.skipped} skipped)` : ""}.
              </p>
            </div>
          )}

          <form onSubmit={handleBulkUpload} className="space-y-4">
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
                    {(selectedFile.size / 1024).toFixed(1)} KB — Click to change file
                  </span>
                </div>
              ) : (
                <div>
                  <span className="block text-xs font-semibold text-[#EDE4D8]">
                    Click to choose an Excel or CSV file
                  </span>
                  <span className="mt-1 block text-[11px] text-[#C2B69D]/80">
                    Supports .xlsx, .xls, and .csv spreadsheets
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
                {uploading ? "Importing..." : "Import Dealers"}
              </Button>
            </FormActions>
          </form>
        </div>
      </CustomModal>

      {/* Add / Edit Dealer Modal */}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDealer ? "Edit Dealer Record" : "Add Authorized Dealer"}
        subtitle="Manage official Snowcem stockist details and store location."
        icon={<Store className="h-5 w-5" />}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid cols={3}>
            <Field label="Customer Code">
              <input
                type="text"
                value={formData.customerCode}
                onChange={(e) => setFormData({ ...formData, customerCode: e.target.value })}
                placeholder="e.g. CUST-1049"
                className={`${inputCls} font-mono`}
              />
            </Field>
            <Field label="Store / Customer Name" required className="sm:col-span-2">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ashok Trading Company"
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Phone / Mobile Number" required>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98248 68330"
              className={`${inputCls} font-mono`}
            />
          </Field>

          <Field label="Full Street Address" required>
            <textarea
              required
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Ground Floor, S V P Road near Shitala Chowk..."
              className={textareaCls}
            />
          </Field>

          <FormGrid cols={3}>
            <Field label="City" required>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Porbandar"
                className={inputCls}
              />
            </Field>
            <Field label="State" required>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Gujarat"
                className={inputCls}
              />
            </Field>
            <Field label="Postal Code">
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="e.g. 360575"
                className={`${inputCls} font-mono`}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={2}>
            <Field label="Star Rating" hint="Optional rating from 1.0 to 5.0">
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
            <div className="flex items-center pt-5">
              <label htmlFor="featuredDealer" className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-[#EDE4D8]">
                <input
                  type="checkbox"
                  id="featuredDealer"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className={checkboxCls}
                />
                <span>Mark as Featured Stockist</span>
              </label>
            </div>
          </FormGrid>

          <FormActions>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editingDealer ? "Update Dealer" : "Save Dealer"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
