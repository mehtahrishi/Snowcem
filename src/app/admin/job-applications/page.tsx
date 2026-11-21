"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  Download,
  FileText,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Trash2,
  User,
  UserCheck,
} from "lucide-react";
import {
  Badge,
  Button,
  EmptyState,
  IconButton,
  LoadingState,
  PageHeader,
  SearchInput,
  Toolbar,
  selectCls,
  useConfirm,
  useToast,
} from "@/components/admin/ui";

interface JobApplicationRow {
  id: string;
  applicationType: "job_specific" | "general";
  jobId: string | null;
  jobTitle: string | null;
  areaOfInterest: string | null;
  fullName: string;
  email: string;
  phone: string;
  location: string | null;
  resumeFileName: string;
  resumePath: string;
  resumeSize: number | null;
  status: "new" | "reviewing" | "shortlisted" | "rejected" | "hired";
  notes: string | null;
  createdAt: string;
}

export default function AdminJobApplicationsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [applications, setApplications] = useState<JobApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.set("status", filterStatus);
      if (filterType !== "all") params.set("type", filterType);
      const qs = params.toString();
      const url = qs ? `/api/admin/job-applications?${qs}` : "/api/admin/job-applications";
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load job applications");
      setApplications(Array.isArray(json?.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load job applications");
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterType, toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/job-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Status update failed");
      }
      setApplications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus as JobApplicationRow["status"] } : item
        )
      );
      toast.success("Application status updated");
    } catch (err: any) {
      toast.error(err?.message || "Could not update status");
    }
  }

  async function handleDelete(app: JobApplicationRow) {
    const ok = await confirm({
      title: `Delete application from "${app.fullName}"?`,
      description:
        "This job application record and its uploaded resume file will be permanently deleted.",
      confirmLabel: "Delete Application",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/job-applications/${app.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      setApplications((prev) => prev.filter((item) => item.id !== app.id));
      toast.success("Job application deleted");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const filtered = applications.filter((app) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      app.fullName.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.phone.toLowerCase().includes(q) ||
      (app.jobTitle || "").toLowerCase().includes(q) ||
      (app.areaOfInterest || "").toLowerCase().includes(q) ||
      (app.location || "").toLowerCase().includes(q) ||
      app.resumeFileName.toLowerCase().includes(q)
    );
  });

  const statusTone = (status: JobApplicationRow["status"]) => {
    if (status === "new") return "gold";
    if (status === "reviewing") return "info";
    if (status === "shortlisted" || status === "hired") return "success";
    if (status === "rejected") return "danger";
    return "neutral";
  };

  const formatBytes = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={UserCheck}
        title="Job Applications"
        description={`Dedicated HR queue for role applications and general talent-pool resumes (${applications.length} total).`}
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
            Refresh
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search candidate, role, email, phone, location…"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`${selectCls} w-auto min-w-[175px]`}
        >
          <option value="all">All Sources</option>
          <option value="job_specific">Specific Roles</option>
          <option value="general">General / Talent Pool</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`${selectCls} w-auto min-w-[165px]`}
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </select>
      </Toolbar>

      {loading ? (
        <LoadingState rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={UserCheck}
          title={
            search || filterStatus !== "all" || filterType !== "all"
              ? "No matching job applications"
              : "No job applications yet"
          }
          description="Applications from specific job listings and the general career form will appear here."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl border border-white/10 bg-[#0A2621] p-5 transition-colors hover:border-[#D4AF37]/30"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={statusTone(app.status)}>{app.status.toUpperCase()}</Badge>
                    <Badge tone={app.applicationType === "job_specific" ? "gold" : "neutral"}>
                      {app.applicationType === "job_specific" ? "Specific Role" : "General / Talent Pool"}
                    </Badge>
                    {app.jobTitle && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-2.5 py-0.5 text-xs font-semibold text-[#F3E5AB]">
                        <Briefcase className="h-3 w-3 text-[#D4AF37]" />
                        {app.jobTitle}
                      </span>
                    )}
                    {app.areaOfInterest && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-[#EDE4D8]">
                        Area: {app.areaOfInterest}
                      </span>
                    )}
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-[#C2B69D]/80 lg:ml-2">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(app.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-0.5 text-sm">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                      <User className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {app.fullName}
                    </span>
                    <a
                      href={`mailto:${app.email}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#C2B69D] hover:text-[#D4AF37]"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {app.email}
                    </a>
                    <a
                      href={`tel:${app.phone}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#D4AF37] hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {app.phone}
                    </a>
                    {app.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#C2B69D]">
                        <MapPin className="h-3.5 w-3.5 text-[#D4AF37]/80" />
                        {app.location}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-[#061C18] px-3.5 py-2.5 text-xs">
                    <div className="flex min-w-0 items-center gap-2 text-[#EDE4D8]">
                      <FileText className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                      <span className="truncate font-medium">{app.resumeFileName}</span>
                      {app.resumeSize ? (
                        <span className="shrink-0 font-mono text-[11px] text-[#C2B69D]/70">
                          ({formatBytes(app.resumeSize)})
                        </span>
                      ) : null}
                    </div>
                    <a
                      href={`/api/admin/job-applications/${app.id}/resume`}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] px-3 py-1.5 text-[11px] font-bold text-[#061C18] transition hover:brightness-110"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 border-t border-white/10 pt-3 lg:border-t-0 lg:pt-0">
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className={`${selectCls} w-auto min-w-[140px] py-2 text-xs`}
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <IconButton
                    icon={Trash2}
                    label="Delete application"
                    tone="danger"
                    onClick={() => handleDelete(app)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
