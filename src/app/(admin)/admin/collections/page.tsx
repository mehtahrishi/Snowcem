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
  getCollectionsAction,
  createCollectionAction,
  updateCollectionAction,
  deleteCollectionAction,
} from '@/actions/collection-actions';
import { getProductsAction } from '@/actions/product-actions';
import type { Collection } from '@/services/collectionsService';
import type { Product } from '@/services/productsService';
import { slugify } from '@/lib/slugify';
import { Plus, Edit2, Trash2, FolderTree, Package, Sparkles } from 'lucide-react';

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [deletingCollection, setDeletingCollection] = useState<Collection | null>(null);

  // Form states for Create Modal
  const [createName, setCreateName] = useState('');
  const [createSlug, setCreateSlug] = useState('');
  const [isCreateSlugTouched, setIsCreateSlugTouched] = useState(false);

  // Form states for Edit Modal
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [isEditSlugTouched, setIsEditSlugTouched] = useState(false);

  async function loadData() {
    const [cols, prods] = await Promise.all([
      getCollectionsAction(),
      getProductsAction(),
    ]);
    setCollections(cols);
    setProducts(prods);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editingCollection) {
      setEditName(editingCollection.name);
      setEditSlug(editingCollection.slug);
      setIsEditSlugTouched(false);
    }
  }, [editingCollection]);

  const collectionWithCounts = collections.map((col) => {
    const count = products.filter((p) => (p.collectionId || p.categoryId) === col.id).length;
    return { ...col, productCount: count };
  });

  function handleCreateNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCreateName(value);
    if (!isCreateSlugTouched) {
      setCreateSlug(slugify(value));
    }
  }

  function handleCreateSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCreateSlug(e.target.value);
    setIsCreateSlugTouched(true);
  }

  function handleEditNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEditName(value);
    if (!isEditSlugTouched) {
      setEditSlug(slugify(value));
    }
  }

  function handleEditSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditSlug(e.target.value);
    setIsEditSlugTouched(true);
  }

  async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createCollectionAction(formData);
    setIsCreateModalOpen(false);
    setCreateName('');
    setCreateSlug('');
    setIsCreateSlugTouched(false);
    await loadData();
  }

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingCollection) return;
    const formData = new FormData(e.currentTarget);
    await updateCollectionAction(editingCollection.id, formData);
    setEditingCollection(null);
    await loadData();
  }

  type CollectionWithCount = Collection & { productCount: number };

  const columns: Column<CollectionWithCount>[] = [
    {
      header: 'Collection Image & Name',
      accessorKey: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-snowcem-navy shadow-sm">
            {row.image ? (
              <img
                src={row.image}
                alt={row.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FolderTree className="w-5 h-5 text-snowcem-magenta" />
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900">{row.name}</p>
            <p className="text-[10px] text-slate-400 font-mono">/{row.slug}</p>
          </div>
        </div>
      ),
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
      header: 'Products Count',
      accessorKey: 'productCount',
      cell: (row) => (
        <span className="font-extrabold text-xs text-snowcem-navy bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 inline-flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-snowcem-orange" />
          {row.productCount} products
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            row.status === 'Active'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingCollection(row)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-snowcem-navy hover:bg-slate-100 transition-colors"
            title="Edit Collection"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingCollection(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Collection"
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
              title="Paint Collections"
              description="Organize Snowcem paint lines into collections (Exterior, Interior, Waterproofing, Primers, Textures)."
            >
              <button
                onClick={() => {
                  setCreateName('');
                  setCreateSlug('');
                  setIsCreateSlugTouched(false);
                  setIsCreateModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-snowcem-navy via-snowcem-magenta to-snowcem-orange text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Collection</span>
              </button>
            </PageHeader>

            <AdminDataTable
              data={collectionWithCounts}
              columns={columns}
              searchPlaceholder="Search collection name, slug..."
            />
          </main>
        </div>
      </div>

      <Footer />

      {/* Create Collection Modal */}
      {isCreateModalOpen && (
        <AdminModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create Paint Collection"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Collection Name
              </label>
              <input
                type="text"
                name="name"
                value={createName}
                onChange={handleCreateNameChange}
                required
                placeholder="e.g. Designer Textures"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  URL Slug
                </label>
                <span className="text-[10px] text-snowcem-magenta font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 inline" /> Real-time auto-generated
                </span>
              </div>
              <input
                type="text"
                name="slug"
                value={createSlug}
                onChange={handleCreateSlugChange}
                required
                placeholder="designer-textures"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Collection Image URL / Dummy Path
              </label>
              <input
                type="text"
                name="image"
                defaultValue="/hero1.png"
                placeholder="/hero1.png"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Use dummy paths like <code className="font-bold text-slate-600">/hero1.png</code>, <code className="font-bold text-slate-600">/hero2.png</code>, <code className="font-bold text-slate-600">/hero3.png</code> or an image URL.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief collection overview for customer navigation..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              ></textarea>
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
                <option value="Archived">Archived</option>
              </select>
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
                Create Collection
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Edit Collection Modal */}
      {editingCollection && (
        <AdminModal
          isOpen={!!editingCollection}
          onClose={() => setEditingCollection(null)}
          title={`Edit Collection - ${editingCollection.name}`}
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Collection Name
              </label>
              <input
                type="text"
                name="name"
                value={editName}
                onChange={handleEditNameChange}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  URL Slug
                </label>
                <span className="text-[10px] text-snowcem-magenta font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 inline" /> Real-time auto-generated
                </span>
              </div>
              <input
                type="text"
                name="slug"
                value={editSlug}
                onChange={handleEditSlugChange}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Collection Image URL / Dummy Path
              </label>
              <input
                type="text"
                name="image"
                defaultValue={editingCollection.image || '/hero1.png'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                defaultValue={editingCollection.description}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={editingCollection.status}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-snowcem-magenta"
              >
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingCollection(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-snowcem-magenta text-white font-bold text-xs hover:bg-snowcem-navy transition-colors shadow-md"
              >
                Save Collection
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Delete Collection Confirmation Modal */}
      {deletingCollection && (
        <ConfirmDeleteModal
          isOpen={!!deletingCollection}
          onClose={() => setDeletingCollection(null)}
          onConfirm={async () => {
            await deleteCollectionAction(deletingCollection.id);
            await loadData();
          }}
          title="Delete Paint Collection"
          itemName={deletingCollection.name}
          description="Are you sure you want to delete this collection? Any linked products in MySQL will be updated accordingly."
        />
      )}
    </div>
  );
}
