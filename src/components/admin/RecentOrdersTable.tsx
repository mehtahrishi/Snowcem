'use client';

import React from 'react';
import AdminDataTable, { Column } from './AdminDataTable';
import { Order } from '@/services/ordersService';

interface RecentOrdersTableProps {
  orders: Order[];
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const orderColumns: Column<Order>[] = [
    {
      header: 'Order ID',
      accessorKey: 'orderNumber',
      cell: (row) => (
        <span className="font-bold text-snowcem-navy">{row.orderNumber}</span>
      ),
    },
    {
      header: 'Customer',
      accessorKey: 'customerName',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.customerName}</p>
          <p className="text-[10px] text-slate-400">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
      cell: (row) => (
        <span className="font-bold text-slate-900">
          ₹{row.totalAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const badgeColors: Record<string, string> = {
          Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          Shipped: 'bg-blue-100 text-blue-800 border-blue-200',
          Processing: 'bg-amber-100 text-amber-800 border-amber-200',
          Pending: 'bg-slate-100 text-slate-800 border-slate-200',
          Cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
        };
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              badgeColors[row.status] || 'bg-slate-100 text-slate-800'
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (row) => (
        <span className="text-slate-500 text-[11px]">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return <AdminDataTable data={orders} columns={orderColumns} pageSize={5} />;
}
