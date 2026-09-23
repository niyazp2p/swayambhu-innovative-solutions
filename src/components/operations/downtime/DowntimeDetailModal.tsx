"use client";

import React from "react";
import { X, Clock, AlertTriangle, Calendar, Layers } from "lucide-react";
import { DowntimeLogResponse } from "@/types/operations";

interface DowntimeDetailModalProps {
  log: DowntimeLogResponse | null;
  onClose: () => void;
}

export function DowntimeDetailModal({ log, onClose }: DowntimeDetailModalProps) {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#006B3C] font-bold">
              Line Stoppage Audit
            </span>
            <h3 className="text-lg font-bold text-[#063D2A]">
              {log.equipment_name || "Unspecified Machinery"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Specs */}
        <div className="p-4 rounded-xl bg-[#F7FAF7] border border-[#DDE5DC] space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#DDE5DC]">
            <span className="text-[#52605A] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#006B3C]" /> Duration:
            </span>
            <span className="font-bold text-[#171F1B]">{log.duration_minutes} Minutes</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#DDE5DC]">
            <span className="text-[#52605A] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> Cause:
            </span>
            <span className="font-bold text-amber-900">{log.reason}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#DDE5DC]">
            <span className="text-[#52605A] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#006B3C]" /> Timestamp:
            </span>
            <span className="text-[#171F1B]">
              {new Date(log.created_at).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#52605A] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#006B3C]" /> Context:
            </span>
            <span className="text-[#171F1B]">
              {log.dpr_id ? `Tied to DPR (${log.dpr_id.slice(0, 8)})` : "Standalone Shift Log"}
            </span>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-[#52605A] block">
            Incident Description & Remediation
          </span>
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 font-sans leading-relaxed">
            {log.description || "No mechanical or operator remarks provided for this incident."}
          </div>
        </div>
      </div>
    </div>
  );
}