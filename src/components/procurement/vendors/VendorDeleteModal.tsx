"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { procurementService } from "@/lib/services/procurement";
import { Vendor } from "@/types/procurement";

interface VendorDeleteModalProps {
  vendor: Vendor | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deletedId: string, action: "DELETED" | "DEACTIVATED") => void;
}

export default function VendorDeleteModal({
  vendor,
  isOpen,
  onClose,
  onSuccess,
}: VendorDeleteModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !vendor) return null;

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      setError(null);
      const res = await procurementService.deleteVendor(vendor.id);
      onSuccess(vendor.id, res.action);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to remove vendor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-[#EEF5ED]">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="text-sm font-bold uppercase font-mono text-[#171F1B]">
              Remove Vendor Record
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED] hover:text-[#171F1B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono">
            {error}
          </div>
        )}

        <div className="p-5 space-y-4">
          <p className="text-xs font-mono text-[#52605A] leading-relaxed">
            Are you sure you want to remove{" "}
            <span className="font-bold text-[#171F1B]">{vendor.name}</span> (
            <span className="text-[#006B3C]">{vendor.vendor_type}</span>)?
          </p>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] font-mono text-amber-800 leading-snug">
            <strong>Audit Notice:</strong> If this vendor is associated with past inward GRN slips, their status will safely change to <strong>Inactive</strong> to preserve weighbridge ledger compliance.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-[#EEF5ED] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Confirm Removal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}