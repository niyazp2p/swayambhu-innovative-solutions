"use client";

import React from "react";
import { Coins, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface ReceivablesStatsHeaderProps {
  dispatches: DispatchOrder[];
}

export function ReceivablesStatsHeader({ dispatches }: ReceivablesStatsHeaderProps) {
  const totalBilled = dispatches.reduce(
    (acc, d) => acc + (Number(d.total_amount) || 0),
    0
  );

  const totalCollected = dispatches.reduce(
    (acc, d) => acc + (Number(d.amount_paid) || 0),
    0
  );

  const outstandingReceivables = Math.max(0, totalBilled - totalCollected);

  const unpaidCount = dispatches.filter(
    (d) => d.payment_status === "UNPAID"
  ).length;

  const partialCount = dispatches.filter(
    (d) => d.payment_status === "PARTIAL"
  ).length;

  const recoveryRate =
    totalBilled > 0 ? ((totalCollected / totalBilled) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Total Outstanding Due
          </span>
          <span className="text-xl font-black text-rose-600">
            ₹{outstandingReceivables.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Coins className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Realized Collections
          </span>
          <span className="text-xl font-black text-[#006B3C]">
            ₹{totalCollected.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#FAF8F5] text-[#171F1B] flex items-center justify-center shrink-0">
          <Clock className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Pending / Partial Dispatches
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {unpaidCount + partialCount}{" "}
            <span className="text-xs font-normal text-[#52605A]">
              ({unpaidCount} Unpaid)
            </span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Collection Recovery Rate
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {recoveryRate}%
          </span>
        </div>
      </div>
    </div>
  );
}