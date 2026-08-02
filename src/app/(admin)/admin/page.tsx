import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import PageHeader from '@/components/admin/PageHeader';
import AdminMetricCard from '@/components/admin/AdminMetricCard';
import AdminChart from '@/components/admin/AdminChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import Footer from '@/components/Footer';
import { FolderTree, ArrowRight, Package } from 'lucide-react';

import { getProducts } from '@/services/productsService';
import { getOrders } from '@/services/ordersService';
import { getCustomers } from '@/services/customersService';
import { getCollections } from '@/services/collectionsService';
import Link from 'next/link';

export const revalidate = 0; // Fresh server-side rendering

export default async function AdminDashboardPage() {
  const [products, orders, customers, collections] = await Promise.all([
    getProducts(),
    getOrders(),
    getCustomers(),
    getCollections(),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeProducts = products.filter((p) => p.status === 'Active').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Full-width Top Admin Navbar */}
      <AdminHeader />

      {/* Main Body with Sidebar & Content */}
      <div className="flex flex-1 min-w-0">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="p-8 space-y-8 max-w-7xl mx-auto w-full flex-grow">
            <PageHeader
              title="Dashboard Overview"
              description="Real-time analytics for Snowcem Paints catalog, orders, and customer inquiries."
            />
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminMetricCard
                title="Total Revenue"
                value={`₹${totalRevenue.toLocaleString()}`}
                change="+18.4%"
                isPositive={true}
                iconType="dollar"
                color="navy"
              />
              <AdminMetricCard
                title="Total Orders"
                value={orders.length}
                change="+12.5%"
                isPositive={true}
                iconType="orders"
                color="magenta"
              />
              <AdminMetricCard
                title="Active Products"
                value={activeProducts}
                change="+5 new"
                isPositive={true}
                iconType="products"
                color="orange"
              />
              <AdminMetricCard
                title="Total Customers"
                value={customers.length}
                change="+22.1%"
                isPositive={true}
                iconType="customers"
                color="emerald"
              />
            </div>

            {/* Main Grid Section: Sales Chart & Collections Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AdminChart />
              </div>

              {/* Collections Summary Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-snowcem-navy flex items-center gap-2">
                      <FolderTree className="w-5 h-5 text-snowcem-magenta" /> Paint Collections
                    </h3>
                    <span className="text-xs font-bold text-snowcem-magenta bg-snowcem-magenta/10 px-2 py-0.5 rounded-full border border-snowcem-magenta/20">
                      {collections.length} collections
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {collections.slice(0, 5).map((col) => {
                      const count = products.filter((p) => (p.collectionId || p.categoryId) === col.id).length;
                      return (
                        <div
                          key={col.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between"
                        >
                          <div className="truncate pr-2">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {col.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">/{col.slug}</p>
                          </div>
                          <span className="text-xs font-bold text-snowcem-navy bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0 flex items-center gap-1">
                            <Package className="w-3 h-3 text-snowcem-orange inline" />
                            {count} products
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href="/admin/collections"
                  className="mt-6 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-snowcem-navy text-xs font-bold transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Manage Collections</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-snowcem-navy">
                    Recent Customer Orders
                  </h3>
                  <p className="text-xs text-slate-500">
                    Latest order transactions placed across authorized stores.
                  </p>
                </div>
                <Link
                  href="/admin/orders"
                  className="text-xs font-bold text-snowcem-magenta hover:underline flex items-center gap-1"
                >
                  View all orders <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <RecentOrdersTable orders={orders} />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
