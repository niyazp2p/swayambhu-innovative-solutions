"use client";

import React from "react";
import { HandCoins, Eye, AlertCircle } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface ReceivablesTableProps {
  dispatches: DispatchOrder[];
  loading: boolean;
  onRecordPayment: (dispatch: DispatchOrder) => void;
  onInspect: (dispatch: DispatchOrder) => void;
}

export function ReceivablesTable({
  dispatches,
  loading,
  onRecordPayment,
  onInspect,
}: ReceivablesTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PARTIAL":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  const calculateAgingDays = (dispatchDate: string) => {
    const today = new Date();
    const date = new Date(dispatchDate);
    const diffTime = Math.abs(today.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs font-mono">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F5] text-[#52605A] uppercase border-b border-[#DDE5DC] text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Dispatch Ref</th>
              <th className="py-3 px-4">Date / Aging</th>
              <th className="py-3 px-4">Offtaker (Buyer)</th>
              <th className="py-3 px-4 text-right">Invoice Total (₹)</th>
              <th className="py-3 px-4 text-right">Settled Amount (₹)</th>
              <th className="py-3 px-4 text-right">Balance Due (₹)</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-[#7B8580]">
                  Loading accounts receivable ledger...
                </td>
              </tr>
            ) : dispatches.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-[#7B8580]">
                  No outstanding receivables or dispatch invoices found.
                </td>
              </tr>
            ) : (
              dispatches.map((dispatch) => {
                const total = Number(dispatch.total_amount) || 0;
                const paid = Number(dispatch.amount_paid) || 0;
                const balance = Math.max(0, total - paid);
                const aging = calculateAgingDays(dispatch.dispatch_date);
                const isPaid = dispatch.payment_status === "PAID";

                return (
                  <tr key={dispatch.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#006B3C]">
                      {dispatch.dispatch_number}
                    </td>
                    <td className="py-3 px-4 text-[#7B8580]">
                      <span className="block text-[#171F1B] font-medium">
                        {dispatch.dispatch_date}
                      </span>
                      <span
                        className={`text-[10px] ${
                          aging > 30 && !isPaid
                            ? "text-rose-600 font-bold"
                            : "text-[#7B8580]"
                        }`}
                      >
                        {aging} days old
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#171F1B] block">
                        {dispatch.buyer?.name || "Direct Offtaker"}
                      </span>
                      <span className="text-[10px] text-[#7B8580]">
                        GSTIN: {dispatch.buyer?.gstin || "URP"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#171F1B]">
                      ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#006B3C]">
                      ₹{paid.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-rose-600">
                      ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          dispatch.payment_status
                        )}`}
                      >
                        {dispatch.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onInspect(dispatch)}
                          className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                          title="View Dispatch Breakdown"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        {!isPaid && (
                          <button
                            onClick={() => onRecordPayment(dispatch)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#006B3C] hover:bg-[#00542E] text-white font-bold text-[11px] transition-colors cursor-pointer"
                            title="Record Buyer Payment"
                          >
                            <HandCoins className="h-3.5 w-3.5" />
                            <span>Collect</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}