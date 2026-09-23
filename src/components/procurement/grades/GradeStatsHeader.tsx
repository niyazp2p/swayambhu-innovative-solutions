"use client";

import React from "react";
import { Layers, IndianRupee, ShieldCheck } from "lucide-react";
import { WasteGrade } from "@/types/procurement";

interface GradeStatsHeaderProps {
  grades: WasteGrade[];
}

export function GradeStatsHeader({ grades }: GradeStatsHeaderProps) {
  const activeCount = grades.filter((g) => g.is_active).length;
  const avgRate = grades.length
    ? grades.reduce((acc, curr) => acc + Number(curr.current_rate_per_kg), 0) / grades.length
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Total Catalog Items
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {grades.length}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Active Procurement
          </span>
          <span className="text-xl font-black font-mono text-[#006B3C]">
            {activeCount} Active
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <IndianRupee className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Average Base Rate
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            ₹{avgRate.toFixed(2)}/kg
          </span>
        </div>
      </div>
    </div>
  );
}