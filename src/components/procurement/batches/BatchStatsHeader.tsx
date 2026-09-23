"use client";

import React from "react";
import { Layers, Box, Cpu, CheckCircle2 } from "lucide-react";
import { BatchItem } from "@/types/procurement";

interface BatchStatsHeaderProps {
  batches: BatchItem[];
}

export function BatchStatsHeader({ batches }: BatchStatsHeaderProps) {
  const rawCount = batches.filter((b) => b.stage === "RAW").length;
  const sortedCount = batches.filter((b) => b.stage === "SORTED").length;
  const baledCount = batches.filter((b) => b.stage === "PROCESSED_BALED").length;
  const finishedCount = batches.filter((b) => b.stage === "FINISHED_GOODS").length;

  const totalRawWeight = batches
    .filter((b) => b.stage === "RAW")
    .reduce((acc, curr) => acc + Number(curr.current_quantity_kg), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Raw Staging Intake
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {rawCount} <span className="text-xs font-normal text-[#52605A]">({totalRawWeight.toFixed(0)} kg)</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Cpu className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            On Sorting Line
          </span>
          <span className="text-xl font-black font-mono text-[#006B3C]">
            {sortedCount} Batches
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Box className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Processed & Baled
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {baledCount} Batches
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Finished Goods
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {finishedCount} Batches
          </span>
        </div>
      </div>
    </div>
  );
}