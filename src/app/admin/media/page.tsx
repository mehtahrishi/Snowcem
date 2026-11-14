"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Video, Plus, Trash2, ExternalLink, RefreshCw } from "lucide-react";
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
  EmptyState,
  LoadingState,
  inputCls,
  selectCls,
  textareaCls,
  useToast,
  useConfirm,
} from "@/components/admin/ui";

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
  const toast = useToast();
  const confirm = useConfirm();

  const [videos, setVideos] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [form, setForm] = useState({
    title: "",
    language: "Hindi",
    youtubeId: "",
    youtubeUrl: "",
    description: "",
    tag: "National TVC",
    sortOrder: "0",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load videos");
      setVideos(Array.isArray(json?.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Video added to Media & TVCs");
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
        const err = await res.json().catch(() => null);
        toast.error(err?.error || "Failed to add video");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to add video");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(v: MediaRow) {
    const ok = await confirm({
      title: `Delete "${v.title}"?`,
      description: "This video will be removed from the public Media & TVCs gallery.",
      confirmLabel: "Delete Video",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/media/${v.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      toast.success("Video deleted");
      load();
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  const filtered = videos.filter((v) => {
    if (tagFilter !== "all" && v.tag !== tagFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.language.toLowerCase().includes(q) ||
      v.tag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Video}
        title="Media & TVCs"
        description="Manage TV commercials, regional brand films, and press videos."
        actions={
          <>
            <Badge tone="gold">{videos.length} {videos.length === 1 ? "video" : "videos"}</Badge>
            <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
              Refresh
            </Button>
          </>
        }
      />

      <Card
        title="Add Video"
        description="Embed a YouTube commercial or brand video onto the Media page."
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <FormGrid cols={3}>
            <Field label="Title" required>
              <input
                required
                placeholder="e.g. Snowcem Commercial - Hindi"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Language" required>
              <input
                required
                placeholder="e.g. Hindi, Bengali"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="YouTube Video ID" required hint="The ID after ?v= in the YouTube link">
              <input
                required
                placeholder="e.g. -umd2knGfUo"
                value={form.youtubeId}
                onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                className={`${inputCls} font-mono`}
              />
            </Field>
          </FormGrid>

          <FormGrid cols={3}>
            <Field label="Full YouTube URL" hint="Optional reference URL">
              <input
                placeholder="https://www.youtube.com/watch?v=..."
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Category Tag">
              <select
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className={selectCls}
              >
                <option value="National TVC">National TVC</option>
                <option value="Regional TVC">Regional TVC</option>
                <option value="Press / News">Press / News</option>
              </select>
            </Field>
            <Field label="Sort Order">
              <input
                type="number"
                placeholder="0"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                className={inputCls}
              />
            </Field>
          </FormGrid>

          <Field label="Description / Caption">
            <textarea
              rows={2}
              placeholder="Short caption describing the commercial..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={textareaCls}
            />
          </Field>

          <FormActions>
            <Button type="submit" variant="primary" icon={Plus} loading={saving}>
              Add Video
            </Button>
          </FormActions>
        </form>
      </Card>

      <Toolbar className="justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search videos by title or language..."
          />
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            aria-label="Filter by video tag"
            className={`${selectCls} sm:w-48`}
          >
            <option value="all">All Categories</option>
            <option value="National TVC">National TVC</option>
            <option value="Regional TVC">Regional TVC</option>
            <option value="Press / News">Press / News</option>
          </select>
        </div>
        <Badge tone="neutral">
          {filtered.length} shown
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={3} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Video}
          title="No videos found"
          description={
            search || tagFilter !== "all"
              ? "Try clearing your search or category filter."
              : "Add your first TVC or brand film using the form above."
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <div
              key={v.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A2621]"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge tone="gold">
                      {v.tag} • {v.language}
                    </Badge>
                    <span className="font-mono text-[11px] text-[#C2B69D]/70">
                      Order: {v.sortOrder}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#EDE4D8]">{v.title}</h3>
                  {v.description && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#C2B69D]">
                      {v.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <a
                    href={`https://youtu.be/${v.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D4AF37] hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open on YouTube</span>
                  </a>
                  <IconButton
                    icon={Trash2}
                    label="Delete video"
                    tone="danger"
                    onClick={() => handleDelete(v)}
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
