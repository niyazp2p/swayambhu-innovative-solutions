"use client";

import React from "react";
import { Eye, Clock, AlertCircle } from "lucide-react";
import { DowntimeLogResponse, DowntimeReason } from "@/types/operations";

interface DowntimeTableProps {
  logs: DowntimeLogResponse[];
  loading: boolean;
  onInspect: (log: DowntimeLogResponse) => void;
}

export function DowntimeTable({ logs, loading, onInspect }: DowntimeTableProps) {
  const getReasonBadge = (reason: DowntimeReason) => {
    switch (reason) {
      case DowntimeReason.MACHINE_BREAKDOWN:
        return "bg-red-50 text-red-700 border-red-200";
      case DowntimeReason.POWER_OUTAGE:
        return "bg-amber-50 text-amber-800 border-amber-200";
      case DowntimeReason.FEEDSTOCK_SHORTAGE:
        return "bg-blue-50 text-blue-800 border-blue-200";
      case DowntimeReason.MAINTENANCE:
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="p-4 sm:p-5 border-b border-[#DDE5DC] flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#063D2A]">
          Equipment Stoppage Ledger
        </h3>
        <span className="text-xs font-mono text-[#7B8580]">{logs.length} Recorded Halts</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#DDE5DC] bg-[#F7FAF7] text-[#52605A] font-mono uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Recorded At</th>
              <th className="py-3 px-4">Equipment / Line</th>
              <th className="py-3 px-4">Stoppage Reason</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Context</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE5DC]/60 text-[#171F1B]">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#7B8580] font-mono">
                  Loading downtime records...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#7B8580] font-mono">
                  No machinery downtime incidents reported. Continuous line uptime.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F9FCF9] transition-colors">
                  <td className="py-3 px-4 font-mono text-[#52605A]">
                    {new Date(log.created_at).toLocaleDateString()}{" "}
                    <span className="text-[10px] text-neutral-400">
                      {new Date(log.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#063D2A]">
                    {log.equipment_name || "General Facility Line"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getReasonBadge(
                        log.reason
                      )}`}
                    >
                      {log.reason.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#171F1B]">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#52605A]" />
                      {log.duration_minutes} mins
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-[#52605A]">
                    {log.dpr_id ? (
                      <span className="text-[#006B3C] font-semibold">DPR Run</span>
                    ) : (
                      <span>Ad-hoc</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#52605A] max-w-xs truncate font-sans">
                    {log.description || "—"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onInspect(log)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EEF5ED] hover:bg-[#DDE5DC] text-[#063D2A] font-mono text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}