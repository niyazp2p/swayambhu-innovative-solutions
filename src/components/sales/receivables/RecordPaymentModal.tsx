"use client";

import React, { useState } from "react";
import { X, HandCoins, Loader2, ArrowRight, ShieldAlert } from "lucide-react";
import { DispatchOrder, PaymentUpdatePayload } from "@/types/sales";

interface RecordPaymentModalProps {
  dispatch: DispatchOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dispatchId: string, payload: PaymentUpdatePayload) => Promise<void>;
}

export function RecordPaymentModal({
  dispatch,
  isOpen,
  onClose,
  onSubmit,
}: RecordPaymentModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentMode, setPaymentMode] = useState("NEFT");

  if (!isOpen || !dispatch) return null;

  const total = Number(dispatch.total_amount) || 0;
  const paid = Number(dispatch.amount_paid) || 0;
  const remaining = Math.max(0, total - paid);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const amountNum = parseFloat(paymentAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid positive payment amount.");
      return;
    }

    if (amountNum > remaining) {
      setError(`Payment cannot exceed the outstanding balance of ₹${remaining.toFixed(2)}.`);
      return;
    }

    setSubmitting(true);
    try {
      const formattedRef = paymentReference.trim()
        ? `[${paymentMode}] ${paymentReference.trim()}`
        : `[${paymentMode}]`;

      await onSubmit(dispatch.id, {
        payment_amount: amountNum,
        payment_reference: formattedRef,
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to record payment settlement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EEF5ED] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <HandCoins className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase text-[#171F1B]">
                Record Inward Settlement
              </h3>
              <p className="text-[11px] text-[#7B8580]">
                Dispatch Ref: {dispatch.dispatch_number}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Ledger Telemetry HUD */}
        <div className="p-4 bg-[#063D2A] text-[#FAF8F5] flex justify-between items-center text-xs">
          <div>
            <span className="text-[#DDE5DC]/70 uppercase text-[10px] block font-bold">
              Consignee (Buyer)
            </span>
            <span className="font-bold text-white text-sm">
              {dispatch.buyer?.name || "Direct Offtaker"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[#DDE5DC]/70 uppercase text-[10px] block font-bold">
              Outstanding Balance
            </span>
            <span className="text-base font-black text-[#88C34A]">
              ₹{remaining.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] uppercase font-bold text-[#52605A]">
                Settlement Amount (₹) *
              </label>
              <button
                type="button"
                onClick={() => setPaymentAmount(String(remaining))}
                className="text-[10px] text-[#006B3C] font-bold hover:underline cursor-pointer"
              >
                Settle Full Balance
              </button>
            </div>
            <input
              type="number"
              step="0.01"
              required
              max={remaining}
              placeholder={`Max: ${remaining}`}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C] font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                Payment Channel
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
              >
                <option value="NEFT">NEFT Transfer</option>
                <option value="RTGS">RTGS Transfer</option>
                <option value="IMPS">IMPS Immediate</option>
                <option value="CHEQUE">Bank Cheque</option>
                <option value="CASH">Cash Deposit</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                Bank UTR / Cheque Ref
              </label>
              <input
                type="text"
                placeholder="e.g. UTR12345678"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs uppercase focus:outline-[#006B3C]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-4 shadow-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Posting Settlement...</span>
              </>
            ) : (
              <>
                <span>Commit Payment Voucher</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}