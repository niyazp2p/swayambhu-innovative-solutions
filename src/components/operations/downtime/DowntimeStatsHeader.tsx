"use client";

import React from "react";
import { Clock, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import { DowntimeLogResponse, DowntimeReason } from "@/types/operations";

interface DowntimeStatsHeaderProps {
  logs: DowntimeLogResponse[];
  shiftTotalMinutes?: number;
}

export function DowntimeStatsHeader({
  logs,
  shiftTotalMinutes = 480, // Default 8-hour operational shift
}: DowntimeStatsHeaderProps) {
  const totalDowntimeMinutes = logs.reduce((acc, curr) => acc + curr.duration_minutes, 0);

  // Availability / Uptime % calculation[cite: 8]
  const availabilityPct = Math.max(
    0,
    ((shiftTotalMinutes - totalDowntimeMinutes) / shiftTotalMinutes) * 100
  ).toFixed(1);

  // Compute primary downtime reason
  const reasonFrequencies: Record<string, number> = {};
  logs.forEach((log) => {
    reasonFrequencies[log.reason] = (reasonFrequencies[log.reason] || 0) + log.duration_minutes;
  });

  const dominantReason = Object.entries(reasonFrequencies).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] as DowntimeReason | undefined;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#7B8580]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
            Cumulative Stoppage
          </span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B]">
            {totalDowntimeMinutes} <span className="text-xs font-normal text-[#7B8580]">mins</span>
          </span>
          <span className="text-[10px] font-mono text-[#7B8580] block mt-0.5">
            {(totalDowntimeMinutes / 60).toFixed(1)} Total Hours Lost
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#7B8580]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
            Shift Line Uptime
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl sm:text-2xl font-black font-mono text-[#006B3C]">
            {availabilityPct}%
          </span>
          <span className="text-[10px] font-mono text-[#006B3C] font-semibold block mt-0.5">
            Operational Availability[cite: 8]
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#7B8580]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
            Incidents Count
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center">
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B]">
            {logs.length}
          </span>
          <span className="text-[10px] font-mono text-[#7B8580] block mt-0.5">
            Reported Line Halts
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#7B8580]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
            Primary Bottleneck
          </span>
          <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm sm:text-base font-black font-mono text-red-800 truncate block">
            {dominantReason ? dominantReason.replace("_", " ") : "NONE"}
          </span>
          <span className="text-[10px] font-mono text-[#7B8580] block mt-0.5">
            Dominant Line Stoppage
          </span>
        </div>
      </div>
    </div>
  );
}