'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Collections', href: '/admin/collections', icon: FolderTree },
  { name: 'Customers', href: '/admin/customers', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white text-slate-800 flex flex-col border-r border-slate-200 shadow-sm relative z-30 shrink-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse / Expand Toggle Button on Right Border */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className="absolute -right-3.5 top-6 w-7 h-7 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-snowcem-navy hover:scale-110 transition-all z-40"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-snowcem-orange" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-snowcem-navy" />
        )}
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (Boolean(pathname) &&
              item.href !== '/admin' &&
              (pathname?.startsWith(item.href) ?? false));

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                isCollapsed ? 'justify-center px-0' : ''
              } ${
                isActive
                  ? 'bg-snowcem-navy text-white shadow-md shadow-snowcem-navy/20 font-bold'
                  : 'text-slate-600 hover:text-snowcem-navy hover:bg-slate-100/80'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                  isActive ? 'text-snowcem-orange' : 'text-slate-400'
                }`}
              />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
