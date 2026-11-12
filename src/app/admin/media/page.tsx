"use client";

import React, { useEffect, useState } from "react";
import { Video, Plus, Trash2, ExternalLink } from "lucide-react";

interface MediaRow {
  id: string;
  title: string;
  language: string;
  youtubeId: string;
  youtubeUrl: string;
  description: string;
  tag: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminMediaPage() {
  const [videos, setVideos] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    language: "Hindi",
    youtubeId: "",
    youtubeUrl: "",
    description: "",
    tag: "National TVC",
    sortOrder: "0",
  });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const json = await res.json();
      setVideos(Array.isArray(json?.data) ? json.data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        title: "",
        language: "Hindi",
        youtubeId: "",
        youtubeUrl: "",
        description: "",
        tag: "National TVC",
        sortOrder: "0",
      });
      load();
    } else {
      const err = await res.json();
      alert(err?.error || "Failed to add video");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black text-[#EDE4D8] flex items-center gap-2">
            <Video className="w-6 h-6 text-[#D4AF37]" />
            <span>Manage Media &amp; TVCs</span>
          </h1>
          <p className="text-xs text-[#C2B69D] mt-1">
            Publish TV commercials, regional brand films, and press releases
          </p>
        </div>
        <span className="text-xs font-bold text-[#D4AF37] px-3 py-1 bg-[#D4AF37]/10 rounded-full">
          {videos.length} Videos Active
        </span>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-[#0A2621] p-5 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-sm font-bold text-[#EDE4D8] uppercase tracking-wider">Add New TVC / Media Video</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            required
            placeholder="Title (e.g. Snowcem Commercial - Hindi) *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            required
            placeholder="Language (e.g. Hindi, Bengali) *"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <input
            required
            placeholder="YouTube ID (e.g. -umd2knGfUo) *"
            value={form.youtubeId}
            onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="YouTube Full URL (optional)"
            value={form.youtubeUrl}
            onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
          <select
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          >
            <option value="National TVC">National TVC</option>
            <option value="Regional TVC">Regional TVC</option>
            <option value="Press / News">Press / News</option>
          </select>
          <input
            type="number"
            placeholder="Sort Order (e.g. 1)"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            className="px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
          />
        </div>

        <textarea
          rows={2}
          placeholder="Video Description / Caption"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-[#041411] border border-white/15 text-sm text-[#EDE4D8]"
        />

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#061C18] text-xs font-black hover:brightness-110 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Video</span>
        </button>
      </form>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v) => (
          <div key={v.id} className="bg-[#0A2621] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="aspect-video relative bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${v.youtubeId}`}
                title={v.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#D4AF37] px-2 py-0.5 bg-[#D4AF37]/10 rounded-full">
                    {v.tag} • {v.language}
                  </span>
                  <span className="text-[10px] text-[#C2B69D]">Order: {v.sortOrder}</span>
                </div>
                <h3 className="text-sm font-bold text-[#EDE4D8]">{v.title}</h3>
                <p className="text-xs text-[#C2B69D] mt-1 line-clamp-2">{v.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <a
                  href={`https://youtu.be/${v.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Video</span>
                </a>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
