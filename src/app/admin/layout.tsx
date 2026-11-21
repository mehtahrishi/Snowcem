"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Paintbrush,
  Palette,
  Layers,
  Package,
  Sparkles,
  Briefcase,
  UserCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Video,
  Mail,
  SlidersHorizontal,
  Calculator,
} from "lucide-react";
import { AdminUiProvider } from "@/components/admin/ui";

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
    document.documentElement.classList.add("admin-no-scrollbar");
    return () => {
      document.documentElement.classList.remove("admin-no-scrollbar");
    };
  }, []);

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
      name: "Categories",
      href: "/admin/categories",
      icon: Layers,
      active: pathname.startsWith("/admin/categories"),
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      active: pathname.startsWith("/admin/products"),
    },
    {
      name: "Explore Our Best",
      href: "/admin/featured",
      icon: Sparkles,
      active: pathname.startsWith("/admin/featured"),
    },
    {
      name: "Jobs",
      href: "/admin/jobs",
      icon: Briefcase,
      active: pathname.startsWith("/admin/jobs"),
    },
    {
      name: "Job Applications",
      href: "/admin/job-applications",
      icon: UserCheck,
      active: pathname.startsWith("/admin/job-applications"),
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
    {
      name: "Curated Palettes",
      href: "/admin/curated-palettes",
      icon: SlidersHorizontal,
      active: pathname.startsWith("/admin/curated-palettes"),
    },
    {
      name: "Media & TVCs",
      href: "/admin/media",
      icon: Video,
      active: pathname.startsWith("/admin/media"),
    },
    {
      name: "Customer Inquiries",
      href: "/admin/inquiries",
      icon: Mail,
      active: pathname.startsWith("/admin/inquiries"),
    },
    {
      name: "Paint Calculator",
      href: "/admin/calculator",
      icon: Calculator,
      active: pathname.startsWith("/admin/calculator"),
    },
  ];

  return (
    <div className="admin-no-scrollbar min-h-screen bg-[#061C18] text-[#EDE4D8] flex flex-col md:flex-row font-sans">
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
          {/* Brand Logo Header (Full White) & Edge Collapse Button */}
          <div className="relative flex items-center justify-center min-h-[76px] bg-white px-4 border-b border-[#D8C7B3]/[0.15]">
            {!collapsed ? (
              <Link href="/admin" className="flex items-center justify-center w-full group">
                <img
                  src="/image.png"
                  alt="Snowcem Paints Logo"
                  className="h-9 w-auto object-contain group-hover:scale-[1.02] transition-transform"
                />
              </Link>
            ) : (
              <Link href="/admin" className="flex items-center justify-center" title="Snowcem Home">
                <img
                  src="/favicon.png"
                  alt="Snowcem"
                  className="h-9 w-9 object-contain"
                />
              </Link>
            )}

            {/* Desktop Collapse Toggle Button positioned right on the sidebar edge line */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex items-center justify-center absolute -right-3.5 top-1/2 -translate-y-1/2 z-50 w-7 h-7 rounded-full bg-[#041411] border border-[#D8C7B3]/30 hover:border-[#D4AF37] text-[#EDE4D8] hover:text-[#D4AF37] shadow-md transition-all cursor-pointer"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
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

          {/* Footer: Logout Option */}
          <div className="p-3 border-t border-[#D8C7B3]/[0.10] bg-[#041411]">
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
        <div className="p-5 sm:p-7 md:p-9 max-w-7xl mx-auto">
          <AdminUiProvider>{children}</AdminUiProvider>
        </div>
      </main>
    </div>
  );
}
