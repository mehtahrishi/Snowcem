'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { logoutAdminAction } from '@/actions/admin-login';

export default function AdminHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs w-full">
      {/* Left: Website Brand Logo */}
      <Link href="/admin" className="block shrink-0">
        <img
          src="/image.png"
          alt="Snowcem Paints Logo"
          className="h-9 sm:h-10 w-auto object-contain"
        />
      </Link>

      {/* Right: Account Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl hover:bg-slate-100/80 transition-colors border border-slate-200/80 focus:outline-none"
          aria-label="Account menu"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-snowcem-navy to-snowcem-magenta text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800">Account</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180 text-snowcem-orange' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-100">
              <p className="text-xs font-bold text-snowcem-navy">Admin Account</p>
              <p className="text-[10px] text-slate-400">admin@snowcem.com</p>
            </div>

            <button
              onClick={() => {
                setDropdownOpen(false);
                logoutAdminAction();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/80 transition-colors"
            >
              <span>Logout</span>
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
