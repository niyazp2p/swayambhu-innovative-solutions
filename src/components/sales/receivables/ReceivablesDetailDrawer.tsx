"use client";

import React from "react";
import { X, Building2, Coins, Calendar, FileText } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface ReceivablesDetailDrawerProps {
  dispatch: DispatchOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onRecordPayment: (dispatch: DispatchOrder) => void;
}

export function ReceivablesDetailDrawer({
  dispatch,
  isOpen,
  onClose,
  onRecordPayment,
}: ReceivablesDetailDrawerProps) {
  if (!isOpen || !dispatch) return null;

  const total = Number(dispatch.total_amount) || 0;
  const paid = Number(dispatch.amount_paid) || 0;
  const balance = Math.max(0, total - paid);
  const isPaid = dispatch.payment_status === "PAID";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs font-mono">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div>
            <span className="text-[10px] uppercase text-[#006B3C] font-bold">
              Receivables Audit
            </span>
            <h3 className="text-xl font-bold text-[#171F1B]">
              {dispatch.dispatch_number}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offtaker Info */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-1.5 text-xs">
          <span className="text-[10px] font-bold uppercase text-[#52605A] flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5 text-[#006B3C]" />
            Buyer Entity
          </span>
          <p className="font-bold text-[#171F1B] text-sm">
            {dispatch.buyer?.name || "Direct Offtaker"}
          </p>
          <p className="text-[#7B8580] text-[11px]">
            GSTIN: {dispatch.buyer?.gstin || "URP"} | Phone: {dispatch.buyer?.contact_phone || "N/A"}
          </p>
        </div>

        {/* Financial Formulation */}
        <div className="p-4 rounded-xl bg-[#063D2A] text-white space-y-3 shadow-xs text-xs">
          <span className="text-[10px] font-bold uppercase text-[#88C34A] tracking-wider block">
            Commercial Account Breakdown
          </span>
          <div className="flex justify-between items-center text-[#DDE5DC]/70">
            <span>Taxable Base Value:</span>
            <span className="font-bold text-white">
              ₹{Number(dispatch.taxable_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#DDE5DC]/70">
            <span>Statutory Taxes (GST):</span>
            <span className="font-bold text-white">
              ₹{(total - Number(dispatch.taxable_amount)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between items-center font-bold">
            <span>Grand Total Billed:</span>
            <span className="text-white text-sm">
              ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#88C34A]">
            <span>Amount Realized:</span>
            <span>
              -₹{paid.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between items-center font-black text-sm text-rose-300">
            <span>Remaining Due:</span>
            <span>
              ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Payment Remarks */}
        <div className="space-y-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-[#52605A] block">
            Bank Voucher Remarks & History
          </span>
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-[#171F1B]">
            {dispatch.remarks || "No payment notes or reference numbers logged."}
          </div>
        </div>

        {/* Quick Settle Action */}
        {!isPaid && (
          <button
            onClick={() => {
              onClose();
              onRecordPayment(dispatch);
            }}
            className="w-full py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Coins className="h-4 w-4" /> Collect Outstanding Balance
          </button>
        )}
      </div>
    </div>
  );
}