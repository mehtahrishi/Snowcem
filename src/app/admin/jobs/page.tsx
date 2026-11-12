"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Plus, Trash2 } from "lucide-react";

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

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    experience: "",
    ctc: "",
    summary: "",
    contentMd: "## Job Description\n\n- \n\n## Key Requirements\n\n- ",
  });

  async function load() {
    const res = await fetch("/api/admin/jobs");
    const data = await res.json();
    setJobs(Array.isArray(data?.data) ? data.data : []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({
        title: "",
        department: "",
        location: "",
        experience: "",
        ctc: "",
        summary: "",
        contentMd: "## Job Description\n\n- \n\n## Key Requirements\n\n- ",
      });
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this job posting?")) return;
    await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-black text-[#EDE4D8] flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#D4AF37]" />
          <span>Manage Jobs (Markdown)</span>
        </h1>
        <p className="text-xs text-[#C2B69D] mt-1">
          Job postings appear dynamically on /careers with Markdown Job Description & Key Requirements.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0A2621] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            required
            placeholder="Job Title (e.g. R & D Manager / Head)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Experience (e.g. 9-15 Years)"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            placeholder="CTC (e.g. Upto 45 LPA)"
            value={form.ctc}
            onChange={(e) => setForm({ ...form, ctc: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>
        <textarea
          rows={2}
          placeholder="Short Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
        />
        <textarea
          required
          rows={8}
          placeholder="Markdown Content (## Job Description, ## Key Requirements...)"
          value={form.contentMd}
          onChange={(e) => setForm({ ...form, contentMd: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-xs font-mono text-[#EDE4D8]"
        />
        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#061C18] text-xs font-black">
          <Plus className="w-4 h-4" />
          <span>Publish Job</span>
        </button>
      </form>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-[#0A2621] border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#EDE4D8]">{job.title}</h3>
              <p className="text-xs text-[#C2B69D] mt-0.5">
                {job.department || "General"} • {job.experience || "N/A"} • {job.ctc || "N/A"}
              </p>
            </div>
            <button onClick={() => handleDelete(job.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

