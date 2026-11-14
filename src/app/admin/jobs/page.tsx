"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Briefcase, Plus, Trash2, RefreshCw } from "lucide-react";
import {
  PageHeader,
  Card,
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
  monoTextareaCls,
  useToast,
  useConfirm,
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

const DEFAULT_MD = "## Job Description\n\n- \n\n## Key Requirements\n\n- ";

export default function AdminJobsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    experience: "",
    ctc: "",
    summary: "",
    contentMd: DEFAULT_MD,
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load job postings");
      setJobs(Array.isArray(data?.data) ? data.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Failed to publish job");
      toast.success("Job opening published");
      setForm({
        title: "",
        department: "",
        location: "",
        experience: "",
        ctc: "",
        summary: "",
        contentMd: DEFAULT_MD,
      });
      load();
    } catch (err: any) {
      toast.error(err?.message || "Failed to publish job");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(job: JobRow) {
    const ok = await confirm({
      title: `Delete "${job.title}"?`,
      description: "This job posting will be permanently removed from the Careers page.",
      confirmLabel: "Delete Job",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(job.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      toast.success("Job opening deleted");
      load();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const filtered = jobs.filter((job) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      (job.department || "").toLowerCase().includes(q) ||
      (job.location || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Briefcase}
        title="Career Openings"
        description="Publish and manage job openings shown on the public Careers page."
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
            Refresh
          </Button>
        }
      />

      <Card
        title="Post New Opening"
        description="Fill in the role details below to publish it immediately to /careers."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGrid cols={3}>
            <Field label="Job Title" required>
              <input
                required
                placeholder="e.g. R & D Manager / Head"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Department">
              <input
                placeholder="e.g. Sales, R&D, Marketing"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Location">
              <input
                placeholder="e.g. Mumbai"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={2}>
            <Field label="Experience">
              <input
                placeholder="e.g. 9-15 Years"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="CTC / Compensation">
              <input
                placeholder="e.g. Upto 45 LPA"
                value={form.ctc}
                onChange={(e) => setForm({ ...form, ctc: e.target.value })}
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Short Summary" hint="Optional one-line overview shown in job details">
            <textarea
              rows={2}
              placeholder="Brief overview of the role and key responsibilities..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className={textareaCls}
            />
          </Field>

          <Field
            label="Job Description & Requirements"
            required
            hint="Use ## for section headings (e.g. ## Job Description) and - for bullet points."
          >
            <textarea
              required
              rows={8}
              placeholder="## Job Description&#10;&#10;- Manage day-to-day operations..."
              value={form.contentMd}
              onChange={(e) => setForm({ ...form, contentMd: e.target.value })}
              className={monoTextareaCls}
            />
          </Field>

          <FormActions>
            <Button type="submit" variant="primary" icon={Plus} loading={saving}>
              Publish Job
            </Button>
          </FormActions>
        </form>
      </Card>

      <Toolbar className="justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search openings by title, department, or location..."
        />
        <Badge tone="gold">
          {filtered.length} {filtered.length === 1 ? "opening" : "openings"}
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No job openings found"
          description={
            search
              ? "No postings match your search query."
              : "Publish your first opening using the form above."
          }
        />
      ) : (
        <DataTable>
          <thead>
            <tr>
              <Th>Role</Th>
              <Th>Department</Th>
              <Th>Location</Th>
              <Th>Experience</Th>
              <Th>CTC</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id} className={trCls}>
                <Td>
                  <div className="font-semibold text-[#EDE4D8]">{job.title}</div>
                  {job.summary && (
                    <div className="mt-0.5 max-w-md truncate text-xs text-[#C2B69D]/80">
                      {job.summary}
                    </div>
                  )}
                </Td>
                <Td>
                  <Badge tone="neutral">{job.department || "General"}</Badge>
                </Td>
                <Td>{job.location || "—"}</Td>
                <Td>{job.experience || "—"}</Td>
                <Td>{job.ctc || "—"}</Td>
                <Td>
                  <Badge tone={job.isActive ? "success" : "neutral"}>
                    {job.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Td>
                <Td align="right">
                  <IconButton
                    icon={Trash2}
                    label="Delete job"
                    tone="danger"
                    onClick={() => handleDelete(job)}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}
    </div>
  );
}
