"use client";

import React, { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { SalaryAdvance, Employee } from "@/types/hr";
import { hrService } from "@/lib/services/hr";

interface ModalProps {
  advance: SalaryAdvance | null;
  employee?: Employee;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SettleAdvanceModal({
  advance,
  employee,
  isOpen,
  onClose,
  onSuccess,
}: ModalProps) {
  const [amount, setAmount] = useState<number>(
    advance ? Number(advance.remaining_balance) : 0
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !advance) return null;

  const handleSettle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Settlement amount must be greater than zero.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await hrService.settleAdvanceManually(advance.id, amount);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to process loan settlement."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-[#EEF5ED] bg-[#FDF8EE]">
          <div className="flex items-center gap-2 text-[#006B3C]">
            <CheckCircle className="h-4 w-4" />
            <h3 className="text-sm font-bold uppercase text-[#171F1B]">
              Cash Loan Settlement
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="m-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSettle} className="p-5 space-y-4 text-xs">
          <div className="p-3.5 bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl space-y-1">
            <div className="flex justify-between">
              <span className="text-[#7B8580] text-[10px] uppercase">
                Worker:
              </span>
              <span className="font-bold text-[#171F1B]">
                {employee?.full_name || advance.employee_id.substring(0, 8)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B8580] text-[10px] uppercase">
                Outstanding Balance:
              </span>
              <span className="font-black text-rose-600">
                ₹{Number(advance.remaining_balance).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
              Settlement Amount (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              max={Number(advance.remaining_balance)}
              required
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] font-bold text-[#006B3C]"
            />
            <span className="text-[9px] text-[#7B8580] mt-1 block">
              Entering the full balance will mark the advance record as REPAID.
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
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
              className="px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Settling..." : "Post Cash Settlement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}