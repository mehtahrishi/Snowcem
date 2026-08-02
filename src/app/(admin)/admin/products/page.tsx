'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import PageHeader from '@/components/admin/PageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import AdminModal from '@/components/admin/AdminModal';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import Footer from '@/components/Footer';
import {
  getProductsAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from '@/actions/product-actions';
import { getCollectionsAction } from '@/actions/collection-actions';
import type { Product } from '@/services/productsService';
import type { Collection } from '@/services/collectionsService';
import { slugify } from '@/lib/slugify';
import { Plus, Edit2, Trash2, Package, Filter, Sparkles } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('All');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Form state for Create Modal
  const [createTitle, setCreateTitle] = useState('');
  const [createSku, setCreateSku] = useState('');
  const [isCreateSkuTouched, setIsCreateSkuTouched] = useState(false);

  // Form state for Edit Modal
  const [editTitle, setEditTitle] = useState('');
  const [editSku, setEditSku] = useState('');
  const [isEditSkuTouched, setIsEditSkuTouched] = useState(false);

  async function loadData() {
    const [prods, cols] = await Promise.all([
      getProductsAction(),
      getCollectionsAction(),
    ]);
    setProducts(prods);
    setCollections(cols);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setEditTitle(editingProduct.title);
      setEditSku(editingProduct.sku);
      setIsEditSkuTouched(false);
    }
  }, [editingProduct]);

  const filteredProducts = products.filter((p) =>
    selectedCollection === 'All' ? true : String(p.collectionId) === selectedCollection
  );

  function handleCreateTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCreateTitle(value);
    if (!isCreateSkuTouched) {
      const generated = value ? `SNC-${slugify(value).toUpperCase().slice(0, 12)}` : '';
      setCreateSku(generated);
    }
  }

  function handleEditTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEditTitle(value);
    if (!isEditSkuTouched) {
      const generated = value ? `SNC-${slugify(value).toUpperCase().slice(0, 12)}` : '';
      setEditSku(generated);
    }
  }

  async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createProductAction(formData);
    setIsCreateModalOpen(false);
    setCreateTitle('');
    setCreateSku('');
    setIsCreateSkuTouched(false);
    await loadData();
  }

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProduct) return;
    const formData = new FormData(e.currentTarget);
    await updateProductAction(editingProduct.id, formData);
    setEditingProduct(null);
    await loadData();
  }

  const columns: Column<Product>[] = [
    {
      header: 'Product Details',
      accessorKey: 'title',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-snowcem-navy">
            {row.image ? (
              <img
                src={row.image}
                alt={row.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900">{row.title}</p>
            <p className="text-[10px] text-slate-400 font-mono">{row.sku}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Collection',
      accessorKey: 'collectionSlug',
      cell: (row) => {
        const col = collections.find((c) => c.id === row.collectionId);
        return (
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200">
            {col ? col.name : row.collectionSlug || 'General'}
          </span>
        );
      },
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (row) => (
        <p className="text-xs text-slate-600 max-w-xs truncate">
          {row.description || 'No description provided.'}
        </p>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const statusColors: Record<string, string> = {
          Active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          Draft: 'bg-amber-100 text-amber-800 border-amber-200',
          Archived: 'bg-slate-100 text-slate-700 border-slate-200',
        };
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              statusColors[row.status] || 'bg-slate-100 text-slate-800'
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingProduct(row)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-snowcem-navy hover:bg-slate-100 transition-colors"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingProduct(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Product"
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
              title="Paint Catalog & Products"
              description="Manage Snowcem paints, specifications, and collections."
            >
              <button
                onClick={() => {
                  setCreateTitle('');
                  setCreateSku('');
                  setIsCreateSkuTouched(false);
                  setIsCreateModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </PageHeader>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-snowcem-magenta/40"
              >
                <option value="All">All Collections ({products.length})</option>
                {collections.map((col) => (
                  <option key={col.id} value={String(col.id)}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <AdminDataTable
              data={filteredProducts}
              columns={columns}
              searchPlaceholder="Search product title, SKU..."
            />
          </main>
        </div>
      </div>

      <Footer />

      {/* Create Product Modal */}
      {isCreateModalOpen && (
        <AdminModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Add New Paint Product"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={createTitle}
                onChange={handleCreateTitleChange}
                required
                placeholder="e.g. Snowcryl XT Premium Paint"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    SKU Code
                  </label>
                  <span className="text-[10px] text-snowcem-magenta font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 inline" /> Real-time auto
                  </span>
                </div>
                <input
                  type="text"
                  name="sku"
                  value={createSku}
                  onChange={(e) => {
                    setCreateSku(e.target.value);
                    setIsCreateSkuTouched(true);
                  }}
                  required
                  placeholder="SNC-EXT-004"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Collection
                </label>
                <select
                  name="collectionId"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
                >
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue="Active"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Product details and specifications..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Image Path / URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue="/hero1.png"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-snowcem-navy text-white font-bold text-xs hover:bg-slate-800 shadow-md"
              >
                Create Product
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <AdminModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          title={`Edit Product - ${editingProduct.title}`}
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={editTitle}
                onChange={handleEditTitleChange}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    SKU Code
                  </label>
                  <span className="text-[10px] text-snowcem-magenta font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 inline" /> Real-time auto
                  </span>
                </div>
                <input
                  type="text"
                  name="sku"
                  value={editSku}
                  onChange={(e) => {
                    setEditSku(e.target.value);
                    setIsEditSkuTouched(true);
                  }}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Collection
                </label>
                <select
                  name="collectionId"
                  defaultValue={editingProduct.collectionId}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
                >
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={editingProduct.status}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                defaultValue={editingProduct.description}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Image Path / URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={editingProduct.image}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-snowcem-magenta text-white font-bold text-xs hover:bg-snowcem-navy transition-colors shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Delete Product Confirmation Modal */}
      {deletingProduct && (
        <ConfirmDeleteModal
          isOpen={!!deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={async () => {
            await deleteProductAction(deletingProduct.id);
            await loadData();
          }}
          title="Delete Paint Product"
          itemName={deletingProduct.title}
          description="Are you sure you want to remove this product from the Snowcem catalog? It will be deleted from your MySQL database."
        />
      )}
    </div>
  );
}
