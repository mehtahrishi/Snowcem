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
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
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
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "2xl": "max-w-2xl",
  }[maxWidth];

  return createPortal(
    <div className="fixed inset-0 z-[99999] overflow-y-auto">
      {/* 1. Dark Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* 2. Centering Wrapper */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 md:p-6 text-center">
        {/* 3. Modal Dialog Card */}
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className={`relative z-10 w-full ${maxWidthClasses} bg-[#0A2621] text-[#EDE4D8] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden flex flex-col text-left transition-all duration-200`}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#041411]/50 shrink-0">
            <div className="flex items-center space-x-3">
              {icon && (
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-[#EDE4D8] text-base sm:text-lg leading-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-[#C2B69D] mt-0.5 leading-normal">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#C2B69D] hover:text-[#EDE4D8] hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
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
