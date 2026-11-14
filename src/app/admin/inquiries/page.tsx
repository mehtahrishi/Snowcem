"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Mail, Trash2, Phone, Calendar, User, RefreshCw } from "lucide-react";
import {
  PageHeader,
  Toolbar,
  Button,
  IconButton,
  Badge,
  SearchInput,
  EmptyState,
  LoadingState,
  selectCls,
  useToast,
  useConfirm,
} from "@/components/admin/ui";

interface InquiryRow {
  id: string;
  name: string;
  email: string | null;
  city: string | null;
  pincode: string | null;
  mobile: string;
  inquiryType: string;
  message: string | null;
  metadata: Record<string, any> | null;
  status: "unread" | "read" | "in_progress" | "resolved";
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        filterStatus === "all"
          ? "/api/admin/inquiries"
          : `/api/admin/inquiries?status=${filterStatus}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load inquiries");
      setInquiries(Array.isArray(json?.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }, [filterStatus, toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Status update failed");
      }
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus as InquiryRow["status"] } : item))
      );
      toast.success("Inquiry status updated");
    } catch (err: any) {
      toast.error(err?.message || "Could not update status");
    }
  }

  async function handleDelete(inq: InquiryRow) {
    const ok = await confirm({
      title: `Delete inquiry from "${inq.name}"?`,
      description: "This customer inquiry record will be permanently deleted.",
      confirmLabel: "Delete Inquiry",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${inq.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      setInquiries((prev) => prev.filter((item) => item.id !== inq.id));
      toast.success("Inquiry record deleted");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const filtered = inquiries.filter((inq) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.mobile.toLowerCase().includes(q) ||
      (inq.email || "").toLowerCase().includes(q) ||
      (inq.city || "").toLowerCase().includes(q) ||
      (inq.pincode || "").toLowerCase().includes(q) ||
      inq.inquiryType.toLowerCase().includes(q) ||
      (inq.message || "").toLowerCase().includes(q)
    );
  });

  const statusTone = (status: InquiryRow["status"]) =>
    status === "resolved" ? "success" : status === "in_progress" ? "warning" : "info";

  const statusLabel = (status: InquiryRow["status"]) =>
    status === "in_progress"
      ? "In Progress"
      : status === "resolved"
      ? "Resolved"
      : status === "read"
      ? "Read"
      : "Unread";

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mail}
        title="Customer Inquiries"
        description="Incoming leads from Contact Us, Let's Connect, and Painting Services."
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
            placeholder="Search by name, mobile, email, city, or message..."
            className="sm:max-w-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter inquiries by status"
            className={`${selectCls} sm:w-48`}
          >
            <option value="all">All Statuses</option>
            <option value="unread">Unread</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <Badge tone="gold">
          {filtered.length} {filtered.length === 1 ? "inquiry" : "inquiries"}
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No inquiries found"
          description={
            search || filterStatus !== "all"
              ? "Try clearing your search or status filter."
              : "Customer inquiries submitted from the website will appear here."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A2621]">
          <div className="divide-y divide-white/[0.06]">
            {filtered.map((inq) => (
              <div
                key={inq.id}
                className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-white/[0.02] md:flex-row md:items-start"
              >
                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#EDE4D8]">
                      <User className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {inq.name}
                    </span>
                    <Badge tone="gold">{inq.inquiryType}</Badge>
                    <Badge tone={statusTone(inq.status)}>{statusLabel(inq.status)}</Badge>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#C2B69D]/80">
                      <Calendar className="h-3 w-3" />
                      {new Date(inq.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#C2B69D]">
                    <a
                      href={`tel:${inq.mobile}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[#EDE4D8] hover:text-[#D4AF37]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {inq.mobile}
                    </a>
                    {inq.email && (
                      <a
                        href={`mailto:${inq.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-[#D4AF37]"
                      >
                        <Mail className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {inq.email}
                      </a>
                    )}
                    {inq.city && (
                      <Badge tone="neutral">City: {inq.city}</Badge>
                    )}
                    {inq.pincode && (
                      <Badge tone="neutral" className="font-mono">
                        PIN: {inq.pincode}
                      </Badge>
                    )}
                  </div>

                  {inq.message && (
                    <p className="rounded-xl border border-white/10 bg-[#041411] p-3 text-xs leading-relaxed text-[#EDE4D8]/90">
                      &ldquo;{inq.message}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2 self-end md:self-center">
                  <select
                    value={inq.status}
                    aria-label={`Update status for ${inq.name}`}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className={`${selectCls} w-36 py-2 text-xs font-semibold`}
                  >
                    <option value="unread">Unread</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <IconButton
                    icon={Trash2}
                    label="Delete inquiry"
                    tone="danger"
                    onClick={() => handleDelete(inq)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
