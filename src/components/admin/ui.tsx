"use client";

/**
 * Shared admin UI kit — use these everywhere in /admin so every page
 * looks and behaves the same.
 *
 *   <PageHeader icon={Layers} title="Categories" description="…" actions={<Button …/>} />
 *   <Card title="Add category" description="…"> … </Card>
 *   <Field label="Name" hint="Shown on site" required><input className={inputCls} /></Field>
 *   <Button variant="primary|secondary|ghost|danger" icon={Plus} loading={busy}>Save</Button>
 *   <DataTable> <thead><tr><Th>…</Th></tr></thead> <tbody><tr className={trCls}><Td>…</Td></tr></tbody> </DataTable>
 *   <EmptyState icon={Briefcase} title="No jobs yet" description="…" action={…} />
 *   <LoadingState rows={4} />
 *   <Badge tone="success|warning|danger|neutral|gold">Active</Badge>
 *   <SearchInput value={q} onChange={setQ} placeholder="Search…" />
 *   <Toolbar> …filters… </Toolbar>
 *   const toast = useToast();   toast.success("Saved"); toast.error("Failed");
 *   const confirm = useConfirm(); if (!(await confirm({ title: "Delete job?", tone: "danger" }))) return;
 */

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Inbox,
  Info,
  Loader2,
  Search,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens (class strings)                                       */
/* ------------------------------------------------------------------ */

export const inputCls =
  "w-full rounded-xl border border-white/12 bg-[#041411] px-3.5 py-2.5 text-sm text-[#EDE4D8] placeholder:text-[#C2B69D]/45 outline-none transition focus:border-[#D4AF37]/70 focus:ring-2 focus:ring-[#D4AF37]/20 disabled:cursor-not-allowed disabled:opacity-50";
export const selectCls = `${inputCls} appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C2B69D' stroke-width='2'><path d='m6 9 6 6 6-6'/></svg>")] bg-[length:14px] bg-[right_0.85rem_center] bg-no-repeat pr-9`;
export const textareaCls = `${inputCls} min-h-[84px] resize-y leading-relaxed`;
export const monoTextareaCls = `${textareaCls} font-mono text-xs`;
export const checkboxCls =
  "h-4 w-4 rounded border-white/20 bg-[#041411] accent-[#D4AF37] cursor-pointer";

export const trCls = "transition-colors hover:bg-white/[0.03]";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon?: LucideIcon;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 items-start gap-3.5">
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight text-[#EDE4D8] sm:text-2xl">{title}</h1>
          {description && (
            <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#C2B69D]">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  title,
  description,
  actions,
  children,
  className = "",
  bodyClassName = "p-5 sm:p-6",
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0A2621] ${className}`}>
      {(title || actions) && (
        <header className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            {title && <h2 className="text-[15px] font-semibold text-[#EDE4D8]">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-[#C2B69D]">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/** Horizontal bar for search + filters above a list. */
export function Toolbar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>{children}</div>;
}

export function FormGrid({ cols = 2, children }: { cols?: 1 | 2 | 3 | 4; children: React.ReactNode }) {
  const map = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
  return <div className={`grid grid-cols-1 gap-4 ${map[cols]}`}>{children}</div>;
}

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  error?: string | null;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-xs font-medium text-[#C2B69D]">
        {label}
        {required && <span className="ml-0.5 text-[#D4AF37]">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-[11px] text-[#E8A0A0]">{error}</p>
      ) : hint ? (
        <p className="text-[11px] leading-snug text-[#C2B69D]/60">{hint}</p>
      ) : null}
    </div>
  );
}

export function FormActions({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/10 pt-4">{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Buttons & badges                                                    */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-[#D4AF37] text-[#061C18] hover:bg-[#E3C25A] shadow-sm shadow-[#D4AF37]/20",
  secondary: "border border-white/12 bg-white/[0.04] text-[#EDE4D8] hover:bg-white/[0.08] hover:border-white/20",
  ghost: "text-[#C2B69D] hover:bg-white/[0.06] hover:text-[#EDE4D8]",
  danger: "border border-[#E8A0A0]/25 bg-[#7A2E2E]/35 text-[#F0B4B4] hover:bg-[#7A2E2E]/60",
};
const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-[13px] gap-2",
};

export function buttonCls(variant: ButtonVariant = "secondary", size: ButtonSize = "md", extra = "") {
  return `inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40 cursor-pointer ${buttonVariants[variant]} ${buttonSizes[size]} ${extra}`;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: LucideIcon;
    loading?: boolean;
  }
>(function Button({ variant = "secondary", size = "md", icon: Icon, loading, className = "", children, disabled, type = "button", ...rest }, ref) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <button ref={ref} type={type} disabled={disabled || loading} className={buttonCls(variant, size, className)} {...rest}>
      {loading ? <Loader2 className={`${iconSize} animate-spin`} /> : Icon ? <Icon className={iconSize} /> : null}
      {children}
    </button>
  );
});

/** Square icon-only button (edit / delete in table rows). Always pass a `label`. */
export function IconButton({
  icon: Icon,
  label,
  tone = "neutral",
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: LucideIcon; label: string; tone?: "neutral" | "danger" | "gold" }) {
  const tones = {
    neutral: "text-[#C2B69D] hover:bg-white/[0.07] hover:text-[#EDE4D8]",
    danger: "text-[#E8A0A0]/80 hover:bg-[#7A2E2E]/40 hover:text-[#F0B4B4]",
    gold: "text-[#D4AF37] hover:bg-[#D4AF37]/10",
  };
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition cursor-pointer disabled:opacity-40 ${tones[tone]} ${className}`}
      {...rest}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "gold" | "info";
const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-white/[0.06] text-[#C2B69D] border-white/10",
  success: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  warning: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  danger: "bg-red-500/10 text-red-300 border-red-400/20",
  gold: "bg-[#D4AF37]/10 text-[#E3C25A] border-[#D4AF37]/25",
  info: "bg-sky-500/10 text-sky-300 border-sky-400/20",
};
export function Badge({ tone = "neutral", children, className = "" }: { tone?: BadgeTone; children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-medium ${badgeTones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Lists                                                               */
/* ------------------------------------------------------------------ */

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full sm:max-w-xs ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C2B69D]/60" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputCls} pl-9`}
      />
    </div>
  );
}

/** Responsive table shell. Scrolls horizontally on small screens. */
export function DataTable({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0A2621] ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13px] [&_tbody]:divide-y [&_tbody]:divide-white/[0.06]">
          {children}
        </table>
      </div>
    </div>
  );
}
const alignCls = { left: "text-left", right: "text-right", center: "text-center" } as const;
export function Th({ children, className = "", align = "left" }: { children?: React.ReactNode; className?: string; align?: "left" | "right" | "center" }) {
  return (
    <th
      className={`whitespace-nowrap border-b border-white/10 bg-[#041411]/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#C2B69D]/80 ${alignCls[align]} ${className}`}
    >
      {children}
    </th>
  );
}
export function Td({ children, className = "", align = "left" }: { children?: React.ReactNode; className?: string; align?: "left" | "right" | "center" }) {
  return <td className={`px-4 py-3 align-middle text-[#C2B69D] ${alignCls[align]} ${className}`}>{children}</td>;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className = "",
}: {
  icon?: LucideIcon;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 px-6 py-14 text-center ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-[#C2B69D]/70">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[#EDE4D8]">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-xs leading-relaxed text-[#C2B69D]/80">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ rows = 4, className = "" }: { rows?: number; className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`} aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-xl bg-white/[0.04]" style={{ opacity: 1 - i * 0.15 }} />
      ))}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, hint }: { icon?: LucideIcon; label: string; value: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0A2621] p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#C2B69D]">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-[#D4AF37]/80" />}
      </div>
      <div className="mt-2 text-2xl font-bold text-[#EDE4D8]">{value}</div>
      {hint && <div className="mt-1 text-[11px] text-[#C2B69D]/70">{hint}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toasts + confirm dialog (replace window.alert / window.confirm)     */
/* ------------------------------------------------------------------ */

type ToastKind = "success" | "error" | "info";
type ToastItem = { id: number; kind: ToastKind; message: string };
type ConfirmOptions = {
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "default";
};

type AdminUiCtx = {
  toast: { success: (m: string) => void; error: (m: string) => void; info: (m: string) => void };
  confirm: (o: ConfirmOptions) => Promise<boolean>;
};

const Ctx = createContext<AdminUiCtx | null>(null);

export function AdminUiProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [dialog, setDialog] = useState<(ConfirmOptions & { resolve: (v: boolean) => void }) | null>(null);
  const [mounted, setMounted] = useState(false);
  const idRef = useRef(0);

  useEffect(() => setMounted(true), []);

  const push = useCallback((kind: ToastKind, message: string) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, kind, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), kind === "error" ? 6000 : 3500);
  }, []);

  const toast = React.useMemo(
    () => ({
      success: (m: string) => push("success", m),
      error: (m: string) => push("error", m),
      info: (m: string) => push("info", m),
    }),
    [push]
  );

  const confirm = useCallback(
    (o: ConfirmOptions) => new Promise<boolean>((resolve) => setDialog({ ...o, resolve })),
    []
  );

  const close = (v: boolean) => {
    dialog?.resolve(v);
    setDialog(null);
  };

  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog]);

  const toastIcon = { success: CheckCircle2, error: XCircle, info: Info };
  const toastTone = {
    success: "border-emerald-400/25 text-emerald-200",
    error: "border-red-400/25 text-red-200",
    info: "border-[#D4AF37]/25 text-[#F3E5AB]",
  };

  return (
    <Ctx.Provider value={{ toast, confirm }}>
      {children}
      {mounted &&
        createPortal(
          <>
            <div className="pointer-events-none fixed bottom-4 right-4 z-[100000] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" aria-live="polite">
              {toasts.map((t) => {
                const I = toastIcon[t.kind];
                return (
                  <div
                    key={t.id}
                    role="status"
                    className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-[#0A2621] px-4 py-3 text-[13px] shadow-2xl shadow-black/40 ${toastTone[t.kind]}`}
                  >
                    <I className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="flex-1 leading-snug text-[#EDE4D8]">{t.message}</span>
                    <button
                      type="button"
                      aria-label="Dismiss"
                      onClick={() => setToasts((all) => all.filter((x) => x.id !== t.id))}
                      className="text-[#C2B69D]/60 hover:text-[#EDE4D8]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {dialog && (
              <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => close(false)} />
                <div role="alertdialog" aria-modal="true" className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0A2621] p-6 shadow-2xl">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        dialog.tone === "danger" ? "bg-red-500/10 text-red-300" : "bg-[#D4AF37]/10 text-[#D4AF37]"
                      }`}
                    >
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-semibold text-[#EDE4D8]">{dialog.title}</h3>
                      {dialog.description && <p className="mt-1 text-[13px] leading-relaxed text-[#C2B69D]">{dialog.description}</p>}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => close(false)}>
                      {dialog.cancelLabel || "Cancel"}
                    </Button>
                    <Button autoFocus variant={dialog.tone === "danger" ? "danger" : "primary"} onClick={() => close(true)}>
                      {dialog.confirmLabel || (dialog.tone === "danger" ? "Delete" : "Confirm")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>,
          document.body
        )}
    </Ctx.Provider>
  );
}

function useAdminUi() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast/useConfirm must be used inside <AdminUiProvider> (admin layout)");
  return ctx;
}
export const useToast = () => useAdminUi().toast;
export const useConfirm = () => useAdminUi().confirm;
