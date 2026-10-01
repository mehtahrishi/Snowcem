"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function CustomModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = "lg",
}: CustomModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  }[maxWidth];

  return createPortal(
    <div className="fixed inset-0 z-[99999] overflow-y-auto">
      {/* 1. Dark Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* 2. Centering Wrapper */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 md:p-6 text-center">
        {/* 3. Modal Dialog Card */}
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className={`relative z-10 w-full ${maxWidthClasses} bg-white rounded-3xl border border-[#E5DDD5] shadow-2xl overflow-hidden flex flex-col text-left transition-all duration-200`}
        >
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-[#EFE9E2] flex items-center justify-between bg-[#FAF8F5] shrink-0">
            <div className="flex items-center space-x-3">
              {icon && (
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#E0D7CE] flex items-center justify-center text-[#f36c21] shadow-xs shrink-0">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="font-bold text-[#0D1B3E] text-base sm:text-lg leading-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-slate-500 mt-0.5 font-medium leading-normal">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Body with maxHeight */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-90px)]">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
