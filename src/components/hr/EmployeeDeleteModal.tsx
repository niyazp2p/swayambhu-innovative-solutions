"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2, Trash2, X, ShieldAlert } from "lucide-react";
import { hrService } from "@/lib/services/hr";
import { Employee } from "@/types/hr";

interface EmployeeDeleteModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
}

export default function EmployeeDeleteModal({
  employee,
  isOpen,
  onClose,
  onSuccess,
}: EmployeeDeleteModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !employee) return null;

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await hrService.deactivateEmployee(employee.id);
      onSuccess(employee.id);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to deactivate worker.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#EEF5ED] bg-[#FDF8EE]">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="text-sm font-bold uppercase text-[#171F1B]">
              Deactivate Worker
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-white hover:text-[#171F1B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
            {error}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-[#52605A] leading-relaxed">
            Are you sure you want to deactivate{" "}
            <span className="font-bold text-[#171F1B]">{employee.full_name}</span> (
            <span className="text-[#006B3C]">{employee.employee_code}</span>)?
          </p>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 leading-snug space-y-1">
            <div className="flex items-center gap-1 font-bold">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>Audit & Compliance Notice</span>
            </div>
            <p className="text-[10px] text-amber-700">
              Hard deletes are restricted to protect historical timesheets, advance ledgers, and disbursed payslips. This action sets employment status to <strong>Inactive</strong>, immediately excluding this worker from upcoming automated monthly payroll runs[cite: 1, 5].
            </p>
          </div>

          {/* Action Triggers */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs text-[#52605A] hover:bg-[#FAF8F5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Confirm Deactivation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}