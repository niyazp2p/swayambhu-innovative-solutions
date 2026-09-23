"use client";

import React, { useState } from "react";
import { AlertTriangle, X, ShieldAlert } from "lucide-react";
import { UserItem } from "@/types/users";
import { usersApi } from "@/lib/services/users";

interface Props {
  user: UserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserDeleteModal({ user, isOpen, onClose, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !user) return null;

  const handleDelete = async () => {
    setErrorMsg("");
    try {
      setSubmitting(true);
      await usersApi.deleteUser(user.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed to deactivate account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs font-sans">
      <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="text-sm font-bold">Deactivate Operator Account</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2 text-xs font-medium text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="mt-4 space-y-2">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to deactivate <span className="font-bold text-[#171F1B]">{user.full_name}</span> ({user.email})?
          </p>
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-800 space-y-1">
            <span className="font-bold block">Audit Trail Preservation:</span>
            <span>Historical weighbridge receipts, payroll runs, and dispatch manifests signed by this user will remain immutable[cite: 1, 3]. Access tokens will be invalidated immediately[cite: 1, 3].</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#DDE5DC] px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            className="rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {submitting ? "Deactivating..." : "Confirm Deactivation"}
          </button>
        </div>
      </div>
    </div>
  );
}