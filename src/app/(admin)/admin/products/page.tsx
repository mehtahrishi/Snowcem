'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import PageHeader from '@/components/admin/PageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import Footer from '@/components/Footer';
import { PRODUCTS_DATA, ProductData } from '@/data/productsData';
import { CATEGORIES_DATA } from '@/data/categoriesData';
import { Filter } from 'lucide-react';

export default function AdminProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.categorySlug === selectedCategory);

  const columns: Column<ProductData>[] = [
    {
      header: 'Product Name',
      cell: (row: ProductData) => (
        <div>
          <p className="font-bold text-slate-900 text-sm">{row.name}</p>
          <p className="text-xs text-slate-500 font-mono">/{row.slug}</p>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (row: ProductData) => (
        <span className="text-xs font-bold text-snowcem-navy bg-slate-100 px-2.5 py-1 rounded-full">
          {row.categoryName}
        </span>
      ),
    },
    {
      header: 'Tagline',
      cell: (row: ProductData) => (
        <p className="text-xs font-medium text-snowcem-orange line-clamp-1">{row.tagline}</p>
      ),
    },
    {
      header: 'Finish',
      cell: (row: ProductData) => (
        <span className="text-xs text-slate-700 font-medium">{row.finish || 'N/A'}</span>
      ),
    },
    {
      header: 'Warranty',
      cell: (row: ProductData) => (
        <span className="text-xs font-bold text-emerald-700">{row.warranty || 'Standard'}</span>
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
              title="Product Catalog"
              description="Static catalog definitions for Snowcem interior, exterior, waterproofing, and care products."
            />

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700">Category Filter:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-snowcem-orange"
              >
                <option value="All">All Categories ({PRODUCTS_DATA.length})</option>
                {CATEGORIES_DATA.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Catalog Table */}
            <AdminDataTable
              data={filteredProducts}
              columns={columns}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
