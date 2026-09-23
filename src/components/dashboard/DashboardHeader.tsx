"use client";

import React from "react";
import Link from "next/link";
import { RefreshCw, Scale, ShieldCheck } from "lucide-react";

interface DashboardHeaderProps {
  plantId: string | null;
  refreshing: boolean;
  onRefresh: () => void;
}

export function DashboardHeader({ plantId, refreshing, onRefresh }: DashboardHeaderProps) {
  return (
    <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
            Executive Command Hub
          </span>
          <span className="h-1 w-1 rounded-full bg-[#52605A]/30" />
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#52605A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
            <span>{plantId ? `Node: ${plantId}` : "Haridwar Plant (SIS-HRD-01)"}</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#063D2A]">
          Plant Operations & Overview
        </h1>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-center">
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-mono text-[#063D2A] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
          <span className="hidden sm:inline">Sync Node</span>
        </button>

        <Link
          href="/admin/procurement/grn"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-[#FDF8EE] text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-sm"
        >
          <Scale className="w-4 h-4" />
          <span>New GRN</span>
        </Link>
      </div>
    </section>
  );
}