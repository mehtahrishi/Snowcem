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
      className={`${width} bg-white rounded-xl shadow-xl border border-gray-100/90 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden`}
    >
      {/* Top accent bar matching announcement bar gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange" />

      <div className="py-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href || "#"}
            onClick={onClose}
            className="group flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="tracking-wide group-hover:bg-gradient-to-r group-hover:from-snowcem-navy group-hover:via-snowcem-magenta group-hover:to-snowcem-orange group-hover:bg-clip-text group-hover:text-transparent transition-all">
              {item.name}
            </span>
            <div className="flex items-center space-x-1.5">
              {item.badge && (
                <span className="text-[10px] font-bold text-snowcem-navy bg-gray-100 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-snowcem-magenta group-hover:translate-x-0.5 transition-all" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
