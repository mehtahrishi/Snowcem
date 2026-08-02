'use client';

import React, { useState } from 'react';
import AdminModal from './AdminModal';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  itemName?: string;
  description?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  itemName,
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
}: ConfirmDeleteModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6 text-center py-2">
        {/* Warning Icon Circle */}
        <div className="w-14 h-14 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">
            Delete {itemName ? <span className="text-rose-600 font-extrabold">"{itemName}"</span> : 'Record'}?
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-md shadow-rose-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Permanently</span>
              </>
            )}
          </button>
        </div>
      </div>
    </AdminModal>
  );
}
