'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import PageHeader from '@/components/admin/PageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import Footer from '@/components/Footer';
import { CATEGORIES_DATA, CategoryData } from '@/data/categoriesData';
import { PRODUCTS_DATA } from '@/data/productsData';
import { FolderTree } from 'lucide-react';

export default function AdminCollectionsPage() {
  const columns: Column<CategoryData>[] = [
    {
      header: 'Category Name',
      cell: (row: CategoryData) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-snowcem-navy/10 text-snowcem-navy flex items-center justify-center font-bold">
            <FolderTree className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">{row.name}</p>
            <p className="text-xs text-slate-500 font-mono">/{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Description',
      cell: (row: CategoryData) => (
        <p className="text-xs text-slate-600 font-normal line-clamp-2">{row.description}</p>
      ),
    },
    {
      header: 'Products Count',
      cell: (row: CategoryData) => {
        const count = PRODUCTS_DATA.filter((p) => p.categorySlug === row.slug).length;
        return (
          <span className="text-xs font-bold text-snowcem-navy bg-slate-100 px-2.5 py-1 rounded-full">
            {count} products
          </span>
        );
      },
    },
    {
      header: 'Badge',
      cell: (row: CategoryData) => (
        row.badge ? (
          <span className="text-xs font-bold text-snowcem-orange bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
            {row.badge}
          </span>
        ) : (
          <span className="text-xs text-slate-400 font-normal">Standard</span>
        )
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AdminHeader />
      <div className="flex flex-1 min-w-0">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow">
            <PageHeader
              title="Paint Categories & Collections"
              description="Static category definitions and product counts across Snowcem ranges."
            />

            {/* Catalog Table */}
            <AdminDataTable
              data={CATEGORIES_DATA}
              columns={columns}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
