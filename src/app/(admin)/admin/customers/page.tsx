'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import PageHeader from '@/components/admin/PageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import Footer from '@/components/Footer';
import { updateCustomerStatusAction } from '@/actions/customer-actions';
import { getCustomersAction } from '@/actions/customer-actions';
import type { Customer } from '@/services/customersService';
import { Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function loadCustomers() {
    const data = await getCustomersAction();
    setCustomers(data);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleToggleStatus(customer: Customer) {
    const newStatus = customer.status === 'Active' ? 'Inactive' : 'Active';
    await updateCustomerStatusAction(customer.id, newStatus);
    await loadCustomers();
  }

  const columns: Column<Customer>[] = [
    {
      header: 'Customer',
      accessorKey: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-snowcem-navy text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {row.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <p className="font-bold text-slate-900">{row.name}</p>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" /> {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      accessorKey: 'phone',
      cell: (row) => (
        <div>
          <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" /> {row.phone}
          </p>
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" /> {row.city}
          </p>
        </div>
      ),
    },
    {
      header: 'Orders',
      accessorKey: 'totalOrders',
      cell: (row) => (
        <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 inline-flex items-center gap-1">
          <ShoppingBag className="w-3.5 h-3.5 text-snowcem-magenta" />
          {row.totalOrders} orders
        </span>
      ),
    },
    {
      header: 'Lifetime Spend',
      accessorKey: 'totalSpent',
      cell: (row) => (
        <span className="font-black text-slate-900 text-sm">
          ₹{row.totalSpent.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Account Status',
      accessorKey: 'status',
      cell: (row) => (
        <button
          onClick={() => handleToggleStatus(row)}
          className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
            row.status === 'Active'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200'
              : 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200'
          }`}
        >
          {row.status}
        </button>
      ),
    },
    {
      header: 'Customer Since',
      accessorKey: 'joinedAt',
      cell: (row) => (
        <span className="text-xs text-slate-500 font-medium">
          {new Date(row.joinedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Full-width Top Admin Navbar */}
      <AdminHeader />

      <div className="flex flex-1 min-w-0">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="p-8 space-y-6 max-w-7xl mx-auto w-full flex-grow">
            <PageHeader
              title="Customer Directory"
              description={`Viewing ${customers.length} registered dealers, contractor contacts, and purchase logs.`}
            />

            <AdminDataTable
              data={customers}
              columns={columns}
              searchPlaceholder="Search customer name, email, phone, city..."
            />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
