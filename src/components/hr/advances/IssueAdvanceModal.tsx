"use client";

import React, { useState, useMemo } from "react";
import { X, HandCoins, AlertCircle, Calculator } from "lucide-react";
import { Employee, AdvanceCreatePayload } from "@/types/hr";
import { hrService } from "@/lib/services/hr";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  employees: Employee[];
}

export default function IssueAdvanceModal({
  isOpen,
  onClose,
  onSuccess,
  employees,
}: ModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AdvanceCreatePayload>({
    employee_id: "",
    principal_amount: 5000,
    tenure_months: 3,
  });

  const activeEmployees = useMemo(
    () => employees.filter((e) => e.is_active),
    [employees]
  );

  const selectedWorker = useMemo(
    () => employees.find((e) => e.id === formData.employee_id),
    [employees, formData.employee_id]
  );

  const calculatedEmi = useMemo(() => {
    if (!formData.principal_amount || !formData.tenure_months) return 0;
    return (
      Math.round(
        (Number(formData.principal_amount) / Number(formData.tenure_months)) *
          100
      ) / 100
    );
  }, [formData.principal_amount, formData.tenure_months]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employee_id) {
      setError("Select an employee to disburse funds.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await hrService.issueAdvance({
        employee_id: formData.employee_id,
        principal_amount: Number(formData.principal_amount),
        tenure_months: Number(formData.tenure_months),
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to disburse salary advance."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EEF5ED] bg-[#FDF8EE]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <HandCoins className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase text-[#171F1B]">
                Issue Salary Advance
              </h3>
              <span className="text-[10px] text-[#7B8580]">
                Loan Ledger Entry & Auto-Deduction Schedule
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="m-5 mb-0 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          <div>
            <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
              Select Worker *
            </label>
            <select
              value={formData.employee_id}
              onChange={(e) => {
                setFormData({ ...formData, employee_id: e.target.value });
                setError(null);
              }}
              required
              className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-[#171F1B] focus:border-[#006B3C] outline-none"
            >
              <option value="">-- Choose active worker --</option>
              {activeEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.employee_code} - {emp.full_name} ({emp.role})hrService
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
                Principal Amount (₹) *
              </label>
              <input
                type="number"
                min="100"
                step="100"
                required
                value={formData.principal_amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    principal_amount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-[#171F1B]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
                Tenure (Months) *
              </label>
              <input
                type="number"
                min="1"
                max="24"
                required
                value={formData.tenure_months}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tenure_months: parseInt(e.target.value, 10) || 1,
                  })
                }
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-[#171F1B]"
              />
            </div>
          </div>

          {/* Real-time EMI Telemetry HUD */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#7B8580] flex items-center gap-1 font-bold">
                <Calculator className="h-3.5 w-3.5 text-[#006B3C]" /> Monthly
                EMI Offset
              </span>
              <span className="text-base font-black text-[#006B3C]">
                ₹{calculatedEmi.toLocaleString("en-IN")} / month
              </span>
            </div>
            {selectedWorker && (
              <div className="pt-2 border-t border-[#EEF5ED] text-[10px] text-[#52605A] flex justify-between">
                <span>Base Rate: ₹{Number(selectedWorker.base_rate).toLocaleString("en-IN")} ({selectedWorker.wage_type})</span>
                <span className="text-amber-700 font-semibold">
                  Offset Cap: 1 EMI/month
                </span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#EEF5ED] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-[#52605A] hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Committing..." : "Disburse Loan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}