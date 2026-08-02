'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import PageHeader from '@/components/admin/PageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import Footer from '@/components/Footer';
import { getOrdersAction, updateOrderStatusAction, deleteOrderAction } from '@/actions/order-actions';
import type { Order } from '@/services/ordersService';
import { Eye, Trash2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  async function fetchOrders() {
    setLoading(true);
    const data = await getOrdersAction();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) =>
    statusFilter === 'All' ? true : o.status === statusFilter
  );

  async function handleStatusChange(
    orderId: number,
    newStatus: Order['status'],
    newPayment?: Order['paymentStatus']
  ) {
    await updateOrderStatusAction(orderId, newStatus, newPayment);
    await fetchOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
        ...(newPayment ? { paymentStatus: newPayment } : {}),
      });
    }
  }

  const columns: Column<Order>[] = [
    {
      header: 'Order Number',
      accessorKey: 'orderNumber',
      cell: (row) => (
        <div>
          <span className="font-bold text-snowcem-navy">{row.orderNumber}</span>
          <p className="text-[10px] text-slate-400">
            {new Date(row.createdAt).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      header: 'Customer',
      accessorKey: 'customerName',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.customerName}</p>
          <p className="text-[10px] text-slate-400">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      header: 'Items',
      cell: (row) => (
        <span className="font-semibold text-slate-700">
          {row.items.reduce((sum: number, item) => sum + item.qty, 0)} items (
          {row.items.map((i) => i.title.split(' ')[0]).join(', ')})
        </span>
      ),
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
      cell: (row) => (
        <span className="font-black text-slate-900">
          ₹{row.totalAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Order Status',
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
            className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
              badgeColors[row.status] || 'bg-slate-100 text-slate-800'
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Payment',
      accessorKey: 'paymentStatus',
      cell: (row) => (
        <span
          className={`text-[11px] font-bold ${
            row.paymentStatus === 'Paid'
              ? 'text-emerald-600'
              : row.paymentStatus === 'Refunded'
              ? 'text-rose-600'
              : 'text-amber-600'
          }`}
        >
          ● {row.paymentStatus}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedOrder(row)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-snowcem-navy hover:bg-slate-100 transition-colors"
            title="View Order Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingOrder(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Order"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AdminHeader />

      <div className="flex flex-1 min-w-0">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="p-8 space-y-6 max-w-7xl mx-auto w-full flex-grow">
            <PageHeader
              title="Orders Management"
              description="Track customer purchases, update order dispatch stages, and manage payments."
            />

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
              {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === status
                        ? 'bg-snowcem-navy text-white shadow-md'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>

            {/* Orders Data Table */}
            <AdminDataTable
              data={filteredOrders}
              columns={columns}
              searchPlaceholder="Search order number, customer name, email..."
            />
          </main>
        </div>
      </div>

      <Footer />

      {/* Order Detail Modal */}
      {selectedOrder && (
        <AdminModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order Details - ${selectedOrder.orderNumber}`}
        >
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Customer
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  Payment: {selectedOrder.paymentStatus}
                </span>
              </div>
              <h4 className="text-base font-bold text-snowcem-navy">
                {selectedOrder.customerName}
              </h4>
              <p className="text-xs text-slate-600">{selectedOrder.customerEmail}</p>
            </div>

            {/* Line Items List */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
                Order Line Items
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {item.categoryName || 'Paint Product'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">
                        ₹{item.price.toLocaleString()} × {item.qty}
                      </p>
                      <p className="text-[11px] font-black text-snowcem-magenta">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center font-bold text-slate-900 text-sm">
                <span>Total Amount:</span>
                <span className="text-lg text-snowcem-navy">
                  ₹{selectedOrder.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Change Status Controls */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
                Update Order Status
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    handleStatusChange(selectedOrder.id, 'Processing', 'Paid')
                  }
                  className="py-2.5 px-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs hover:bg-amber-100 transition-colors"
                >
                  Mark Processing
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedOrder.id, 'Shipped', 'Paid')
                  }
                  className="py-2.5 px-3 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 font-bold text-xs hover:bg-blue-100 transition-colors"
                >
                  Mark Shipped
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedOrder.id, 'Delivered', 'Paid')
                  }
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 transition-colors"
                >
                  Mark Delivered
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedOrder.id, 'Cancelled', 'Refunded')
                  }
                  className="py-2.5 px-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs hover:bg-rose-100 transition-colors"
                >
                  Mark Cancelled
                </button>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Delete Order Confirmation Modal */}
      {deletingOrder && (
        <ConfirmDeleteModal
          isOpen={!!deletingOrder}
          onClose={() => setDeletingOrder(null)}
          onConfirm={async () => {
            await deleteOrderAction(deletingOrder.id);
            await fetchOrders();
            if (selectedOrder?.id === deletingOrder.id) setSelectedOrder(null);
          }}
          title="Delete Order Record"
          itemName={deletingOrder.orderNumber}
          description="Are you sure you want to delete this order transaction? This record will be permanently removed from MySQL."
        />
      )}
    </div>
  );
}
