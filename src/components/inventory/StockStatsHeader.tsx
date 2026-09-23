"use client";

import React from "react";
import { Boxes, PackageCheck, IndianRupee, Layers } from "lucide-react";
import { formatCurrency, formatMetricTon } from "@/lib/utils/formatters";

interface StockStatsHeaderProps {
  totalStockKg: number;
  totalBales: number;
  totalValuationInr: number;
  totalGrades: number;
}

export function StockStatsHeader({
  totalStockKg,
  totalBales,
  totalValuationInr,
  totalGrades,
}: StockStatsHeaderProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Boxes className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#7B8580] block font-bold">
            Total Inventory Mass
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {formatMetricTon(totalStockKg)}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <PackageCheck className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#7B8580] block font-bold">
            Bales in Floor Stock
          </span>
          <span className="text-xl font-black text-[#006B3C]">
            {totalBales.toLocaleString("en-IN")}{" "}
            <span className="text-xs font-normal text-[#52605A]">Units</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <IndianRupee className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#7B8580] block font-bold">
            Holding Valuation
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {formatCurrency(totalValuationInr)}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#7B8580] block font-bold">
            Active Catalog Grades
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {totalGrades}{" "}
            <span className="text-xs font-normal text-[#52605A]">Grades</span>
          </span>
        </div>
      </div>
    </div>
  );
}