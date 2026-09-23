"use client";

import React from "react";
import { ReceiptText, FileSpreadsheet, Landmark, Layers } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface InvoiceStatsHeaderProps {
  dispatches: DispatchOrder[];
}

export function InvoiceStatsHeader({ dispatches }: InvoiceStatsHeaderProps) {
  const totalTaxable = dispatches.reduce(
    (acc, d) => acc + (Number(d.taxable_amount) || 0),
    0
  );

  const totalCgst = dispatches.reduce(
    (acc, d) => acc + (Number(d.cgst_amount) || 0),
    0
  );

  const totalSgst = dispatches.reduce(
    (acc, d) => acc + (Number(d.sgst_amount) || 0),
    0
  );

  const totalIgst = dispatches.reduce(
    (acc, d) => acc + (Number(d.igst_amount) || 0),
    0
  );

  const totalGrossInvoiceValue = dispatches.reduce(
    (acc, d) => acc + (Number(d.total_amount) || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <ReceiptText className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Taxable Base Turnover
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            ₹{totalTaxable.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Landmark className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Output CGST + SGST (Local)
          </span>
          <span className="text-xl font-black text-[#006B3C]">
            ₹{(totalCgst + totalSgst).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Output IGST (Interstate)
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            ₹{totalIgst.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#FAF8F5] text-[#171F1B] flex items-center justify-center shrink-0">
          <FileSpreadsheet className="h-5 w-5 text-[#006B3C]" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Total Billed Invoice Value
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            ₹{totalGrossInvoiceValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}