"use client";

import React from "react";
import { Scale, Activity, TrendingUp, AlertTriangle } from "lucide-react";

interface KpiProps {
  loading: boolean;
  intakeKg: number | string | null | undefined;
  yieldPct: number | string | null | undefined;
  outputKg: number | string | null | undefined;
  revenue: number | string | null | undefined;
  ebitda: number | string | null | undefined;
  downtimeMins: number | string | null | undefined;
  downtimeReason?: string | null;
}

export function OperationalKpiGrid({
  loading,
  intakeKg,
  yieldPct,
  outputKg,
  revenue,
  ebitda,
  downtimeMins,
  downtimeReason = "Operational",
}: KpiProps) {
  const numIntakeKg = Number(intakeKg) || 0;
  const numYieldPct = Number(yieldPct) || 0;
  const numOutputKg = Number(outputKg) || 0;
  const numRevenue = Number(revenue) || 0;
  const numEbitda = Number(ebitda) || 0;
  const numDowntimeMins = Math.round(Number(downtimeMins) || 0);

  const formatMT = (kg: number) => `${(kg / 1000).toFixed(2)} MT`;
  const formatINR = (val: number) => `₹${val.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Feedstock Intake */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#52605A]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
            Intake (MTD)
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
            <Scale className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xl sm:text-2xl font-black font-mono text-[#063D2A] block tracking-tight">
            {loading ? "—" : formatMT(numIntakeKg)}
          </span>
          <span className="text-[10px] font-mono text-[#006B3C] font-semibold block mt-1">
            Weighbridge Gross
          </span>
        </div>
      </div>

      {/* Recovery Yield */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#52605A]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
            Recovery Yield
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xl sm:text-2xl font-black font-mono text-[#063D2A] block tracking-tight">
            {loading ? "—" : `${numYieldPct.toFixed(1)}%`}
          </span>
          <span className="text-[10px] font-mono text-[#52605A] block mt-1">
            Baled: {loading ? "—" : formatMT(numOutputKg)}
          </span>
        </div>
      </div>

      {/* Total Sales Dispatched */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#52605A]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
            Revenue (MTD)
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xl sm:text-2xl font-black font-mono text-[#063D2A] block tracking-tight truncate">
            {loading ? "—" : formatINR(numRevenue)}
          </span>
          <span className="text-[10px] font-mono text-[#006B3C] font-semibold block mt-1 truncate">
            EBITDA: {loading ? "—" : formatINR(numEbitda)}
          </span>
        </div>
      </div>

      {/* Machine Downtime */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#52605A]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
            Downtime (MTD)
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#FFF8E6] border border-[#FCD34D] flex items-center justify-center text-[#D97706]">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xl sm:text-2xl font-black font-mono text-[#063D2A] block tracking-tight">
            {loading ? "—" : `${numDowntimeMins} min`}
          </span>
          <span className="text-[10px] font-mono text-[#52605A] block mt-1 truncate">
            RCA: {downtimeReason || "Operational"}
          </span>
        </div>
      </div>
    </section>
  );
}