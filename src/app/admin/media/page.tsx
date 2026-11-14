"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, ExternalLink, Film, Play, Plus, Trash2 } from "lucide-react";
import CustomModal from "@/components/admin/CustomModal";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  FormActions,
  FormGrid,
  IconButton,
  LoadingState,
  PageHeader,
  SearchInput,
  Toolbar,
  checkboxCls,
  inputCls,
  selectCls,
  textareaCls,
  useConfirm,
  useToast,
} from "@/components/admin/ui";

interface MediaRow {
  id: string;
  title: string;
  language: string;
  youtubeId: string;
  youtubeUrl: string;
  description: string | null;
  tag: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface MediaFormState {
  title: string;
  language: string;
  youtubeId: string;
  youtubeUrl: string;
  description: string;
  tag: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyForm: MediaFormState = {
  title: "",
  language: "Hindi",
  youtubeId: "",
  youtubeUrl: "",
  description: "",
  tag: "Regional TVC",
  sortOrder: 0,
  isActive: true,
};

function extractYoutubeId(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  try {
    if (trimmed.includes("youtu.be/")) {
      return trimmed.split("youtu.be/")[1].split(/[?&#/]/)[0] || "";
    }
    if (trimmed.includes("youtube.com")) {
      const url = new URL(trimmed);
      const v = url.searchParams.get("v");
      if (v) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch {
    return "";
  }
  return "";
}

export default function AdminMediaPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [videos, setVideos] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<MediaRow | null>(null);
  const [formData, setFormData] = useState<MediaFormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load media videos");
      setVideos(Array.isArray(json.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load media videos");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const languages = useMemo(() => {
    const set = new Set<string>();
    for (const v of videos) {
      if (v.language) set.add(v.language);
    }
    return Array.from(set).sort();
  }, [videos]);

  const filteredVideos = useMemo(() => {
    const q = search.trim().toLowerCase();
    return videos.filter((v) => {
      if (languageFilter !== "all" && v.language !== languageFilter) return false;
      if (!q) return true;
      return (
        v.title.toLowerCase().includes(q) ||
        v.language.toLowerCase().includes(q) ||
        (v.tag || "").toLowerCase().includes(q) ||
        (v.description || "").toLowerCase().includes(q) ||
        v.youtubeId.toLowerCase().includes(q)
      );
    });
  }, [videos, languageFilter, search]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({ ...emptyForm, sortOrder: videos.length });
    setIsModalOpen(true);
  };

  const openEditModal = (video: MediaRow) => {
    setEditing(video);
    setFormData({
      title: video.title,
      language: video.language,
      youtubeId: video.youtubeId,
      youtubeUrl: video.youtubeUrl || "",
      description: video.description || "",
      tag: video.tag || "Regional TVC",
      sortOrder: video.sortOrder ?? 0,
      isActive: video.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedId = formData.youtubeId.trim() || extractYoutubeId(formData.youtubeUrl);
    if (!formData.title.trim() || !formData.language.trim() || !resolvedId) {
      toast.error("Title, language, and a valid YouTube ID or URL are required");
      return;
    }

    setSaving(true);
    try {
      const resolvedUrl =
        formData.youtubeUrl.trim() || `https://youtu.be/${resolvedId}`;
      const payload = {
        title: formData.title.trim(),
        language: formData.language.trim(),
        youtubeId: resolvedId,
        youtubeUrl: resolvedUrl,
        description: formData.description.trim(),
        tag: formData.tag.trim() || "Regional TVC",
        sortOrder: Number(formData.sortOrder) || 0,
        isActive: formData.isActive,
      };

      const url = editing ? `/api/admin/media/${editing.id}` : "/api/admin/media";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || `Failed to ${editing ? "update" : "create"} video`);
        return;
      }

      toast.success(editing ? "Video updated" : "Video added");
      setIsModalOpen(false);
      await load();
    } catch {
      toast.error("Network error while saving video");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (video: MediaRow) => {
    const ok = await confirm({
      title: `Delete "${video.title}"?`,
      description: "This will permanently remove the video from the Media gallery.",
      confirmLabel: "Delete Video",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/media/${video.id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || "Failed to delete video");
        return;
      }
      toast.success("Video deleted");
      await load();
    } catch {
      toast.error("Network error while deleting video");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Film}
        title="Media & TVCs"
        description="Manage YouTube commercials, regional campaigns, and brand videos shown in the Media center."
        actions={
          <Button variant="primary" icon={Plus} onClick={openAddModal}>
            Add Video
          </Button>
        }
      />

      <Toolbar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search title, language, tag, YouTube ID…"
        />
        <select
          aria-label="Filter by language"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className={`${selectCls} w-full sm:w-48`}
        >
          <option value="all">All Languages ({videos.length})</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <span className="text-xs text-[#C2B69D]/70 sm:ml-auto">
          Showing {filteredVideos.length} of {videos.length}
        </span>
      </Toolbar>

      {loading ? (
        <LoadingState rows={4} />
      ) : filteredVideos.length === 0 ? (
        <EmptyState
          icon={Film}
          title={videos.length === 0 ? "No videos yet" : "No matching videos"}
          description={
            videos.length === 0
              ? "Add your first YouTube TVC or brand campaign video."
              : "Try adjusting your search or language filter."
          }
          action={
            videos.length === 0 ? (
              <Button variant="primary" icon={Plus} onClick={openAddModal}>
                Add Video
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setLanguageFilter("all");
                }}
              >
                Reset Filters
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#D8C7B3]/15 bg-[#0A2621] transition hover:border-[#D4AF37]/35"
            >
              <div className="relative aspect-video w-full overflow-hidden border-b border-[#D8C7B3]/10 bg-[#041411]">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <Badge tone="gold">{video.language}</Badge>
                  {video.tag && <Badge tone="neutral">{video.tag}</Badge>}
                </div>
                <div className="absolute right-3 top-3">
                  <Badge tone={video.isActive ? "success" : "danger"}>
                    {video.isActive ? "Active" : "Hidden"}
                  </Badge>
                </div>
                <a
                  href={video.youtubeUrl || `https://youtu.be/${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Watch on YouTube"
                  className="absolute inset-0 flex items-center justify-center text-white/90 transition hover:scale-105"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#061C18]/85 text-[#D4AF37] shadow-lg">
                    <Play className="ml-0.5 h-5 w-5" />
                  </span>
                </a>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <div>
                  <h2 className="line-clamp-2 text-sm font-semibold text-[#EDE4D8]">
                    {video.title}
                  </h2>
                  {video.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-[#C2B69D]/75">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[#D8C7B3]/10 pt-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#C2B69D]/65">
                    <span className="font-mono">#{video.sortOrder}</span>
                    <span>•</span>
                    <a
                      href={video.youtubeUrl || `https://youtu.be/${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono hover:text-[#D4AF37]"
                    >
                      {video.youtubeId}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="inline-flex shrink-0 items-center gap-1.5">
                    <IconButton
                      icon={Edit2}
                      label={`Edit ${video.title}`}
                      tone="gold"
                      onClick={() => openEditModal(video)}
                    />
                    <IconButton
                      icon={Trash2}
                      label={`Delete ${video.title}`}
                      tone="danger"
                      onClick={() => handleDelete(video)}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => !saving && setIsModalOpen(false)}
        title={editing ? `Edit Video — ${editing.title}` : "Add Media Video"}
        subtitle="Configure YouTube video embed details, language grouping, and visibility."
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Video Title" required>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Snowcem Plus Waterproof TVC (Hindi)"
              className={inputCls}
            />
          </Field>

          <FormGrid cols={2}>
            <Field label="Language" required>
              <input
                type="text"
                required
                value={formData.language}
                onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                placeholder="e.g. Hindi, English, Marathi"
                className={inputCls}
              />
            </Field>

            <Field label="Tag / Campaign Type">
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                placeholder="e.g. Regional TVC"
                className={inputCls}
              />
            </Field>

            <Field label="YouTube Video ID" required hint="11-char ID or auto-filled from URL">
              <input
                type="text"
                required
                value={formData.youtubeId}
                onChange={(e) => setFormData((prev) => ({ ...prev, youtubeId: e.target.value }))}
                placeholder="e.g. dQw4w9WgXcQ"
                className={inputCls}
              />
            </Field>

            <Field label="YouTube Share URL" hint="Pasting a link extracts ID automatically">
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => {
                  const val = e.target.value;
                  const extracted = extractYoutubeId(val);
                  setFormData((prev) => ({
                    ...prev,
                    youtubeUrl: val,
                    youtubeId: extracted || prev.youtubeId,
                  }));
                }}
                placeholder="https://youtu.be/..."
                className={inputCls}
              />
            </Field>

            <Field label="Sort Order">
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))
                }
                className={inputCls}
              />
            </Field>

            <Field label="Visibility">
              <label className="flex h-[42px] cursor-pointer items-center gap-2.5 rounded-xl border border-[#D8C7B3]/15 bg-[#041411] px-3.5 text-sm text-[#EDE4D8]">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                  className={checkboxCls}
                />
                <span>Active in Media Gallery</span>
              </label>
            </Field>
          </FormGrid>

          <Field label="Description">
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief campaign context or summary…"
              className={textareaCls}
            />
          </Field>

          <FormActions>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={saving}>
              {editing ? "Save Changes" : "Add Video"}
            </Button>
          </FormActions>
        </form>
      </CustomModal>
    </div>
  );
}
