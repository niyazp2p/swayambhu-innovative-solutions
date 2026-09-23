"use client";

import React, { useState } from "react";
import { AlertTriangle, X, Trash2, Loader2, Building2, Mail, ShieldAlert } from "lucide-react";
import { UserItem } from "@/types/users";
import { usersApi } from "@/lib/services/users";

interface Props {
  user: UserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
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
      onSuccess(user.id);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed to permanently delete user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs font-sans">
      <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-100 bg-[#FDF8EE] p-4">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#171F1B]">
              Permanently Delete User
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-[#171F1B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="m-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Content Details */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-[#52605A] leading-relaxed">
            Are you sure you want to completely erase the account for{" "}
            <span className="font-bold text-[#171F1B]">{user.full_name}</span>?
          </p>

          {/* User Record Card */}
          <div className="rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] p-3 text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#171F1B] font-semibold">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
              <span>Role: <strong className="text-[#063D2A]">{user.role}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              <span>
                Scope:{" "}
                {user.plant ? `${user.plant.name} (${user.plant.code})` : "Global (Super Admin)"}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] text-amber-800 space-y-1">
            <span className="font-bold block">Destructive Action:</span>
            <span>
              This will permanently purge this operator account from the database. All login credentials and session tokens will be eliminated immediately.
            </span>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-[#DDE5DC] px-4 py-2 text-xs font-semibold text-[#52605A] hover:bg-[#FAF8F5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-rose-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Purge User</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}