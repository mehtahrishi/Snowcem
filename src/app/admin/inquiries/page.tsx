"use client";

import React, { useEffect, useState } from "react";
import { Mail, CheckCircle2, Clock, Trash2, Phone, Calendar, User } from "lucide-react";

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
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  async function load() {
    setLoading(true);
    try {
      const url = filterStatus === "all" ? "/api/admin/inquiries" : `/api/admin/inquiries?status=${filterStatus}`;
      const res = await fetch(url);
      const json = await res.json();
      setInquiries(Array.isArray(json?.data) ? json.data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filterStatus]);

  async function updateStatus(id: string, newStatus: string) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
    );
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this inquiry record?")) return;
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    if (res.ok) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#EDE4D8] flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#D4AF37]" />
            <span>Customer Inquiries &amp; Leads</span>
          </h1>
          <p className="text-xs text-[#C2B69D] mt-1">
            Submissions received from the Contact Us form and support channels
          </p>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#0A2621] border border-white/15 text-xs text-[#EDE4D8] font-bold"
        >
          <option value="all">All Inquiries ({inquiries.length})</option>
          <option value="unread">Unread</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="bg-[#0A2621] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-[#C2B69D]">Loading customer inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#C2B69D]">No inquiries found.</div>
        ) : (
          <div className="divide-y divide-white/10">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-5 hover:bg-white/[0.02] flex flex-col md:flex-row gap-4 justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#EDE4D8] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {inq.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                      {inq.inquiryType}
                    </span>
                    <span className="text-[11px] text-[#C2B69D] flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {new Date(inq.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#C2B69D]">
                    <a href={`tel:${inq.mobile}`} className="flex items-center gap-1 hover:text-[#D4AF37] font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {inq.mobile}
                    </a>
                    {inq.email && (
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-[#D4AF37]">
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {inq.email}
                      </a>
                    )}
                    {inq.city && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-[#EDE4D8]">
                        City: <strong>{inq.city}</strong>
                      </span>
                    )}
                    {inq.pincode && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-[#EDE4D8] font-mono">
                        PIN: <strong>{inq.pincode}</strong>
                      </span>
                    )}
                  </div>

                  {inq.message && (
                    <p className="text-xs text-[#EDE4D8]/90 bg-[#041411] p-3 rounded-xl border border-white/10 leading-relaxed">
                      &quot;{inq.message}&quot;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                      inq.status === "resolved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : inq.status === "in_progress"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    <option value="unread">Unread</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
