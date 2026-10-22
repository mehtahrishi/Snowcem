"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Paintbrush,
  Palette,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      fetch("/api/admin/auth/me")
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Not logged in");
        })
        .then((data) => {
          if (!data.isLoggedIn) {
            router.push("/admin/login");
          }
        })
        .catch(() => {
          router.push("/admin/login");
        });
    }
  }, [pathname, isLoginPage, router]);

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#061C18] text-[#EDE4D8] font-sans">
        {children}
      </div>
    );
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Manage Dealers",
      href: "/admin/dealers",
      icon: Store,
      active: pathname.startsWith("/admin/dealers"),
    },
    {
      name: "Manage Painters",
      href: "/admin/painters",
      icon: Paintbrush,
      active: pathname.startsWith("/admin/painters"),
    },
    {
      name: "Color Catalogue",
      href: "/admin/colors",
      icon: Palette,
      active: pathname.startsWith("/admin/colors"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#061C18] text-[#EDE4D8] flex flex-col md:flex-row font-sans">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between px-5 py-3.5 bg-[#041411] text-[#EDE4D8] border-b border-[#D8C7B3]/[0.10]">
        <Link href="/admin" className="flex items-center space-x-2.5">
          <div className="bg-white px-2.5 py-1 rounded-xl flex items-center justify-center">
            <img
              src="/image.png"
              alt="Snowcem Paints Logo"
              className="h-6 w-auto object-contain"
            />
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-[#D8C7B3]/[0.08] text-[#C2B69D] hover:text-[#EDE4D8]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen bg-[#041411] text-[#C2B69D] border-r border-[#D8C7B3]/[0.10] flex flex-col justify-between transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        } ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Top Brand Accent Gradient Bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#8B7355] via-[#D8C5B3] to-[#D4AF37]" />

          {/* Brand Logo & Collapse Header */}
          <div className="p-4 border-b border-[#D8C7B3]/[0.10] relative flex items-center justify-between min-h-[76px] bg-[#041411]">
            {!collapsed ? (
              <Link href="/admin" className="flex items-center group">
                <div className="bg-white px-3.5 py-1.5 rounded-xl border border-[#D8C7B3]/[0.20] flex items-center justify-center group-hover:scale-102 transition-transform">
                  <img
                    src="/image.png"
                    alt="Snowcem Paints Logo"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </Link>
            ) : (
              <Link href="/admin" className="mx-auto" title="Snowcem Home">
                <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
                  <img
                    src="/image.png"
                    alt="Snowcem"
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </Link>
            )}

            {/* Desktop Collapse Toggle Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-[#D8C7B3]/[0.08] hover:bg-[#D8C7B3]/[0.16] text-[#C2B69D] hover:text-[#EDE4D8] transition-all ml-1 cursor-pointer"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
            {!collapsed && (
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#C2B69D]/70 px-3 mb-2">
                Management
              </div>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  title={collapsed ? item.name : undefined}
                  className={`flex items-center ${
                    collapsed ? "justify-center px-0 py-3" : "space-x-3 px-3.5 py-2.5"
                  } rounded-xl font-medium text-sm transition-all group ${
                    item.active
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-lg shadow-[#D4AF37]/20 font-bold"
                      : "text-[#C2B69D] hover:text-[#EDE4D8] hover:bg-[#D8C7B3]/[0.08]"
                  }`}
                >
                  <Icon size={19} className="flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}

            <div className="pt-6">
              {!collapsed && (
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#C2B69D]/70 px-3 mb-2">
                  External
                </div>
              )}
              <Link
                href="/"
                target="_blank"
                title={collapsed ? "View Public Site" : undefined}
                className={`flex items-center ${
                  collapsed ? "justify-center px-0 py-3" : "justify-between px-3.5 py-2.5"
                } rounded-xl text-sm font-medium text-[#C2B69D] hover:text-[#EDE4D8] hover:bg-[#D8C7B3]/[0.08] transition-all`}
              >
                <span className="flex items-center space-x-3">
                  <ExternalLink size={18} className="flex-shrink-0" />
                  {!collapsed && <span>View Public Site</span>}
                </span>
              </Link>
            </div>
          </nav>

          {/* Footer: Admin Badge ABOVE Logout Option */}
          <div className="p-3 border-t border-[#D8C7B3]/[0.10] bg-[#041411]">
            {!collapsed ? (
              <div className="flex items-center justify-between px-3 py-2 mb-2.5 rounded-xl bg-[#D8C7B3]/[0.05] border border-[#D8C7B3]/[0.10]">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/[0.12] flex items-center justify-center">
                    <Shield size={14} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#EDE4D8] uppercase tracking-wider leading-none">
                      Admin Portal
                    </div>
                    <div className="text-[9px] text-[#C2B69D] font-medium leading-none mt-1">
                      System Active
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 bg-[#D4AF37]/[0.12] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3E5AB] animate-pulse" />
                  <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">Live</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-2.5" title="Admin Portal - Live">
                <div className="w-8 h-8 rounded-xl bg-[#D8C7B3]/[0.06] border border-[#D8C7B3]/[0.10] flex items-center justify-center relative">
                  <Shield size={14} className="text-[#D4AF37]" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#F3E5AB] animate-pulse" />
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title={collapsed ? "Log Out" : undefined}
              className={`w-full flex items-center ${
                collapsed ? "justify-center p-2.5" : "justify-center space-x-2 px-3 py-2.5"
              } rounded-xl text-xs font-bold text-[#E8A0A0] bg-[#7A2E2E]/40 hover:bg-[#7A2E2E]/60 border border-[#E8A0A0]/25 hover:border-[#E8A0A0]/45 transition-all cursor-pointer group`}
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              {!collapsed && <span>Log Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-5 sm:p-7 md:p-9 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
