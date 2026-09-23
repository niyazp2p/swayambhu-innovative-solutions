"use client";

import React from "react";
import { Truck, Scale, AlertCircle, CheckCircle2 } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface DispatchStatsHeaderProps {
  dispatches: DispatchOrder[];
}

export function DispatchStatsHeader({ dispatches }: DispatchStatsHeaderProps) {
  const totalOutwardKg = dispatches.reduce(
    (acc, d) => acc + (Number(d.net_weight_kg) || 0),
    0
  );
  const totalOutwardMT = (totalOutwardKg / 1000).toFixed(2);

  const totalRevenue = dispatches.reduce(
    (acc, d) => acc + (Number(d.total_amount) || 0),
    0
  );

  const activeTransitCount = dispatches.filter(
    (d) => d.status === "DISPATCHED"
  ).length;

  const unpaidCount = dispatches.filter(
    (d) => d.payment_status === "UNPAID"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Scale className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Total Outward Mass
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {totalOutwardMT} <span className="text-xs font-normal text-[#52605A]">MT</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Truck className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Consignments Dispatched
          </span>
          <span className="text-xl font-black font-mono text-[#006B3C]">
            {activeTransitCount} Consignments
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Gross Billed Value
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            ₹{totalRevenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Pending Settlements
          </span>
          <span className="text-xl font-black font-mono text-amber-700">
            {unpaidCount} Invoices Unpaid
          </span>
        </div>
      </div>
    </div>
  );
}