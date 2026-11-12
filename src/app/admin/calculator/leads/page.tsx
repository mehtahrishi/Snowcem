"use client";

import React, { useEffect, useState } from "react";
import {
  Calculator,
  User,
  Phone,
  MapPin,
  Calendar,
  Trash2,
  Search,
  RefreshCw,
  Clock,
  Paintbrush,
  Download,
} from "lucide-react";

interface LeadRow {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  startTimeline: string | null;
  localPainterHired: string | null;
  space: string;
  need: string;
  carpetArea: number;
  selectedTier: string | null;
  totalEstimatedCost: string | null;
  status: string;
  createdAt: string;
}

export default function AdminCalculatorLeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const url = search
        ? `/api/admin/calculator/leads?search=${encodeURIComponent(search)}`
        : "/api/admin/calculator/leads";
      const res = await fetch(url);
      const json = await res.json();
      setLeads(Array.isArray(json?.data) ? json.data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [search]);

  async function removeLead(id: string) {
    if (!confirm("Delete this budget estimate lead?")) return;
    await fetch(`/api/admin/calculator/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-2xl font-black text-[#EDE4D8]">
              Paint Calculator Leads
            </h1>
          </div>
          <p className="text-xs text-[#C2B69D] mt-1 font-medium">
            Customer inquiries generated from Step 2 of the Paint Budget Calculator tool.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#C2B69D] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, phone, PIN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0A2621] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#EDE4D8] placeholder-[#C2B69D]/50 focus:border-[#D4AF37] outline-none"
            />
          </div>
          <button
            onClick={load}
            className="p-2 bg-[#0A2621] border border-white/10 hover:border-[#D4AF37] rounded-xl text-[#C2B69D] hover:text-[#EDE4D8]"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="bg-[#0A2621] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-[#C2B69D]">
            Loading calculator estimate leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#C2B69D]">
            No calculator leads found.
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-5 hover:bg-white/[0.02] flex flex-col md:flex-row gap-4 justify-between items-start"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#EDE4D8] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {lead.fullName}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                      {lead.space} • {lead.need}
                    </span>
                    <span className="text-[11px] text-[#C2B69D] flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#C2B69D]">
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1 hover:text-[#D4AF37] font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {lead.phone}
                    </a>
                    <span className="flex items-center gap-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      PIN: <strong>{lead.pincode}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-[#EDE4D8]">
                      Carpet Area: <strong>{lead.carpetArea} sq.ft</strong>
                    </span>
                    {lead.selectedTier && (
                      <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/10 text-[11px] text-[#D4AF37] font-bold">
                        Tier: {lead.selectedTier}
                      </span>
                    )}
                    {lead.totalEstimatedCost && (
                      <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-[11px] text-green-400 font-bold font-mono">
                        Estimate: ₹{Number(lead.totalEstimatedCost).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#C2B69D]/80 pt-1">
                    {lead.startTimeline && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        Timeline: <strong>{lead.startTimeline}</strong>
                      </span>
                    )}
                    {lead.localPainterHired && (
                      <span className="flex items-center gap-1">
                        <Paintbrush className="w-3 h-3 text-[#D4AF37]" />
                        Painter Hired: <strong>{lead.localPainterHired}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => removeLead(lead.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl"
                    title="Delete lead"
                  >
                    <Trash2 size={14} />
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
