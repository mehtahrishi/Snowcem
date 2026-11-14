"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Briefcase, Edit2, Plus, Trash2 } from "lucide-react";
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
  monoTextareaCls,
  selectCls,
  textareaCls,
  trCls,
  useConfirm,
  useToast,
} from "@/components/admin/ui";

interface JobRow {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  experience: string | null;
  ctc: string | null;
  summary: string | null;
  contentMd: string;
  isActive: boolean;
}

interface JobFormState {
  title: string;
  slug: string;
  department: string;
  location: string;
  experience: string;
  ctc: string;
  summary: string;
  contentMd: string;
  isActive: boolean;
}

const emptyForm: JobFormState = {
  title: "",
  slug: "",
  department: "",
  location: "",
  experience: "",
  ctc: "",
  summary: "",
  contentMd: "",
  isActive: true,
};

function slugify(val: string) {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminJobsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<JobRow | null>(null);
  const [formData, setFormData] = useState<JobFormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load jobs");
      setJobs(Array.isArray(json.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load job openings");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (statusFilter === "active" && !job.isActive) return false;
      if (statusFilter === "inactive" && job.isActive) return false;
      if (!q) return true;
      return (
        job.title.toLowerCase().includes(q) ||
        job.slug.toLowerCase().includes(q) ||
        (job.department || "").toLowerCase().includes(q) ||
        (job.location || "").toLowerCase().includes(q)
      );
    });
  }, [jobs, search, statusFilter]);

  const openAddModal = () => {
    setEditing(null);
    setFormData(emptyForm);
    setSlugTouched(false);
    setIsModalOpen(true);
  };

  const openEditModal = (job: JobRow) => {
    setEditing(job);
    setFormData({
      title: job.title,
      slug: job.slug,
      department: job.department || "",
      location: job.location || "",
      experience: job.experience || "",
      ctc: job.ctc || "",
      summary: job.summary || "",
      contentMd: job.contentMd || "",
      isActive: job.isActive ?? true,
    });
    setSlugTouched(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.contentMd.trim()) {
      toast.error("Job title and Markdown description are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...(editing ? { id: editing.id } : {}),
        title: formData.title.trim(),
        slug: slugify(formData.slug || formData.title),
        department: formData.department.trim() || null,
        location: formData.location.trim() || null,
        experience: formData.experience.trim() || null,
        ctc: formData.ctc.trim() || null,
        summary: formData.summary.trim() || null,
        contentMd: formData.contentMd,
        isActive: formData.isActive,
      };

      const res = await fetch("/api/admin/jobs", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || `Failed to ${editing ? "update" : "create"} job opening`);
        return;
      }

      toast.success(editing ? "Job opening updated" : "Job opening published");
      setIsModalOpen(false);
      await load();
    } catch {
      toast.error("Network error while saving job opening");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job: JobRow) => {
    const ok = await confirm({
      title: `Delete "${job.title}"?`,
      description: "This will permanently remove the job listing from the Careers page.",
      confirmLabel: "Delete Job",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(job.id)}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || "Failed to delete job");
        return;
      }
      toast.success("Job opening deleted");
      await load();
    } catch {
      toast.error("Network error while deleting job");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Briefcase}
        title="Job Openings"
        description="Manage open career positions displayed on the Careers page."
        actions={
          <Button variant="primary" icon={Plus} onClick={openAddModal}>
            Post Job Opening
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search title, department, location…"
        />
        <select
          aria-label="Filter by job status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
          className={`${selectCls} w-full sm:w-48`}
        >
          <option value="all">All Status ({jobs.length})</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive / Closed</option>
        </select>
        <span className="text-xs text-[#C2B69D]/70 sm:ml-auto">
          Showing {filteredJobs.length} of {jobs.length}
        </span>
      </Toolbar>

      {loading ? (
        <LoadingState rows={5} />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={jobs.length === 0 ? "No job openings yet" : "No matching jobs"}
          description={
            jobs.length === 0
              ? "Post your first role to start receiving applications."
              : "Try adjusting your search or status filter."
          }
          action={
            jobs.length === 0 ? (
              <Button variant="primary" icon={Plus} onClick={openAddModal}>
                Post Job Opening
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
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
              <Th>Role</Th>
              <Th>Department &amp; Location</Th>
              <Th>Experience / CTC</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id} className={trCls}>
                <Td>
                  <div className="font-semibold text-[#EDE4D8]">{job.title}</div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#C2B69D]/70">
                    <code className="rounded bg-[#041411] px-1.5 py-0.5 text-[11px]">
                      {job.slug}
                    </code>
                    {job.summary && <span className="line-clamp-1 max-w-xs">{job.summary}</span>}
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {job.department ? (
                      <Badge tone="gold">{job.department}</Badge>
                    ) : (
                      <span className="text-xs text-[#C2B69D]/50">—</span>
                    )}
                    {job.location && <Badge tone="neutral">{job.location}</Badge>}
                  </div>
                </Td>
                <Td>
                  <div className="text-xs text-[#EDE4D8]">
                    {job.experience || <span className="text-[#C2B69D]/50">—</span>}
                  </div>
                  {job.ctc && (
                    <div className="mt-0.5 text-[11px] text-[#C2B69D]/75">{job.ctc}</div>
                  )}
                </Td>
                <Td>
                  <Badge tone={job.isActive ? "success" : "danger"}>
                    {job.isActive ? "Active" : "Closed"}
                  </Badge>
                </Td>
                <Td align="right">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    <IconButton
                      icon={Edit2}
                      label={`Edit ${job.title}`}
                      tone="gold"
                      onClick={() => openEditModal(job)}
                    />
                    <IconButton
                      icon={Trash2}
                      label={`Delete ${job.title}`}
                      tone="danger"
                      onClick={() => handleDelete(job)}
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
        title={editing ? `Edit Job — ${editing.title}` : "Post New Job Opening"}
        subtitle="Configure role metadata and full Markdown job description."
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGrid cols={2}>
            <Field label="Job Title" required>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    title: val,
                    slug: !slugTouched ? slugify(val) : prev.slug,
                  }));
                }}
                placeholder="e.g. Area Sales Manager"
                className={inputCls}
              />
            </Field>

            <Field label="URL Slug" required>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
                }}
                placeholder="area-sales-manager"
                className={inputCls}
              />
            </Field>

            <Field label="Department">
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                placeholder="e.g. Sales, R&D, Operations"
                className={inputCls}
              />
            </Field>

            <Field label="Location">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Mumbai / Pan India"
                className={inputCls}
              />
            </Field>

            <Field label="Experience">
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                placeholder="e.g. 3-5 Years"
                className={inputCls}
              />
            </Field>

            <Field label="CTC / Compensation">
              <input
                type="text"
                value={formData.ctc}
                onChange={(e) => setFormData((prev) => ({ ...prev, ctc: e.target.value }))}
                placeholder="e.g. Best in Industry"
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Short Summary" hint="Shown in role previews and search snippets">
            <textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
              placeholder="One-paragraph overview of responsibilities…"
              className={textareaCls}
            />
          </Field>

          <Field label="Full Job Description (Markdown)" required>
            <textarea
              required
              rows={8}
              value={formData.contentMd}
              onChange={(e) => setFormData((prev) => ({ ...prev, contentMd: e.target.value }))}
              placeholder={"### Key Responsibilities\n- Manage regional dealer network\n\n### Requirements\n- Proven B2B/decorative paints experience"}
              className={monoTextareaCls}
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] px-3.5 py-2.5 text-sm text-[#EDE4D8]">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
              className={checkboxCls}
            />
            <span>Active — visible on Careers page and accepting applications</span>
          </label>

          <FormActions>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Publish Job"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
