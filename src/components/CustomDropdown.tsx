"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export interface SimpleDropdownItem {
  id: string;
  name: string;
  href?: string;
  badge?: string;
}

export interface CustomDropdownProps {
  items: SimpleDropdownItem[];
  width?: string;
  onClose?: () => void;
}

export default function CustomDropdown({
  items,
  width = "w-64",
  onClose,
}: CustomDropdownProps) {
  return (
    <div
      className={`${width} bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden`}
    >
      <div className="py-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href || "#"}
            onClick={onClose}
            className="group flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-900 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#2a1b92] hover:via-[#5c249c] hover:to-[#e91e63]"
            style={{ color: "#0f172a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#0f172a";
            }}
          >
            <span className="tracking-wide">
              {item.name}
            </span>
            <div className="flex items-center space-x-1.5">
              {item.badge && (
                <span className="text-[10px] font-bold bg-gray-100 group-hover:bg-white/20 group-hover:text-white px-1.5 py-0.5 rounded transition-colors">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
