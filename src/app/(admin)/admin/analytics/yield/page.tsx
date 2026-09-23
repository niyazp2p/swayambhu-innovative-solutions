"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  BadgePercent,
  Scale,
  Boxes,
  Trash2,
  AlertTriangle,
  RefreshCw,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  PieChart as PieChartIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { analyticsService } from "@/lib/services/analytics";
import { YieldAnalyticsResponse } from "@/types/analytics";

export default function YieldAnalyticsPage() {
  const { selectedPlantId } = useAuth();

  // Default to current month window
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() => new Date().toISOString().split("T")[0]);

  const [data, setData] = useState<YieldAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchYield = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      setRefreshing(true);
      setError(null);
      try {
        const res = await analyticsService.getYieldMetrics(fromDate, toDate, selectedPlantId);
        setData(res);
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to load yield analytics telemetry.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [fromDate, toDate, selectedPlantId]
  );

  useEffect(() => {
    fetchYield();
  }, [fetchYield]);

  // Mass Balance computations
  const metrics = useMemo(() => {
    if (!data) {
      return {
        rawKg: 0,
        outKg: 0,
        inertKg: 0,
        varianceKg: 0,
        recoveryPct: 0,
        inertPct: 0,
        variancePct: 0,
      };
    }
    const rawKg = Number(data.total_raw_processed_kg) || 0;
    const outKg = Number(data.total_output_kg) || 0;
    const inertKg = Number(data.total_inert_waste_kg) || 0;
    const varianceKg = Number(data.total_variance_kg) || 0;
    const recoveryPct = Number(data.overall_recovery_rate_pct) || 0;
    const inertPct = rawKg > 0 ? (inertKg / rawKg) * 100 : 0;
    const variancePct = rawKg > 0 ? (varianceKg / rawKg) * 100 : 0;

    return {
      rawKg,
      outKg,
      inertKg,
      varianceKg,
      recoveryPct,
      inertPct,
      variancePct,
    };
  }, [data]);

  // Grade breakdown items sorted by weight descending
  const sortedGrades = useMemo(() => {
    if (!data?.output_breakdown_by_grade) return [];
    return Object.entries(data.output_breakdown_by_grade)
      .map(([code, weight]) => ({
        code,
        weightKg: Number(weight) || 0,
        pctOfTotalOutput:
          metrics.outKg > 0 ? ((Number(weight) || 0) / metrics.outKg) * 100 : 0,
      }))
      .sort((a, b) => b.weightKg - a.weightKg);
  }, [data, metrics.outKg]);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12 font-sans selection:bg-[#006B3C] selection:text-white text-[#171F1B]">
      {/* 1. SECTION HEADER & DATE CONTROLS */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              Tab 1 // Executive Analytics
            </span>
            <span className="h-1 w-1 rounded-full bg-[#DDE5DC]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#7B8580]">
              Endpoint: /api/v1/analytics/yield
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#063D2A]">
            Yield Intelligence & Mass Balance
          </h1>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-center">
          <div className="flex items-center gap-2 bg-white border border-[#DDE5DC] rounded-xl px-3 py-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#006B3C]" />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="text-xs font-mono bg-transparent text-[#171F1B] focus:outline-none"
            />
            <span className="text-xs text-[#7B8580] font-mono">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="text-xs font-mono bg-transparent text-[#171F1B] focus:outline-none"
            />
          </div>

          <button
            onClick={() => fetchYield(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:text-[#063D2A] transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
            <span className="hidden sm:inline">Recalculate</span>
          </button>
        </div>
      </section>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-[#FFF8E6] border border-[#FCD34D] text-[#92400E] text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchYield(false)}
            className="underline font-bold text-[#006B3C] hover:text-[#063D2A] ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. MASS-BALANCE KPI SCORECARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Raw Processed */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Raw Feedstock Processed
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
              <Scale className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B] block tracking-tight">
              {loading ? "..." : `${(metrics.rawKg / 1000).toFixed(2)} MT`}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#7B8580]">
              <span>{metrics.rawKg.toLocaleString()} kg total intake</span>
            </div>
          </div>
        </div>

        {/* Total Baled Output & Recovery % */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Overall Recovery Rate
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
              <BadgePercent className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#006B3C] block tracking-tight">
              {loading ? "..." : `${metrics.recoveryPct.toFixed(2)}%`}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#52605A]">
              <span>Output: {(metrics.outKg / 1000).toFixed(2)} MT</span>
            </div>
          </div>
        </div>

        {/* Inert Waste Fraction */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Inert Waste Discard
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FDF8EE] border border-[#DDE5DC] flex items-center justify-center text-[#7B8580]">
              <Trash2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B] block tracking-tight">
              {loading ? "..." : `${(metrics.inertKg / 1000).toFixed(2)} MT`}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#7B8580]">
              <span>{metrics.inertPct.toFixed(2)}% of intake</span>
            </div>
          </div>
        </div>

        {/* Mass Balance Variance */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Mass Balance Variance
            </span>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                Math.abs(metrics.variancePct) > 5
                  ? "bg-[#FFF8E6] border border-[#FCD34D] text-[#D97706]"
                  : "bg-[#EEF5ED] border border-[#006B3C]/15 text-[#006B3C]"
              }`}
            >
              {Math.abs(metrics.variancePct) > 5 ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
            </div>
          </div>
          <div className="mt-3">
            <span
              className={`text-xl sm:text-2xl font-black font-mono block tracking-tight ${
                Math.abs(metrics.variancePct) > 5 ? "text-[#D97706]" : "text-[#171F1B]"
              }`}
            >
              {loading ? "..." : `${metrics.varianceKg.toFixed(1)} kg`}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#7B8580]">
              <span>{metrics.variancePct >= 0 ? "+" : ""}{metrics.variancePct.toFixed(2)}% discrepancy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MASS BALANCE EQUATION RECONCILIATION BAR */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#063D2A] text-[#FDF8EE] shadow-md border border-[#006B3C]/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#88C34A]" />
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#FDF8EE] font-bold">
              Mass-Balance Reconciliation Flow
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#88C34A] tracking-wider">
            Raw Input = Output + Inert Waste + Variance
          </span>
        </div>

        {/* Stacked Proportional Bar */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-black/30 rounded-full overflow-hidden flex p-0.5 border border-white/10">
            <div
              style={{ width: `${Math.max(0, Math.min(100, metrics.recoveryPct))}%` }}
              className="bg-[#28A745] h-full rounded-l-full transition-all duration-500"
              title={`Output: ${metrics.recoveryPct.toFixed(1)}%`}
            />
            <div
              style={{ width: `${Math.max(0, Math.min(100, metrics.inertPct))}%` }}
              className="bg-[#B69A5B] h-full transition-all duration-500"
              title={`Inert: ${metrics.inertPct.toFixed(1)}%`}
            />
            <div
              style={{ width: `${Math.max(0, Math.min(100, Math.abs(metrics.variancePct)))}%` }}
              className="bg-red-400 h-full rounded-r-full transition-all duration-500"
              title={`Variance: ${metrics.variancePct.toFixed(1)}%`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono pt-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#28A745]" />
              <span>Usable Product ({metrics.recoveryPct.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B69A5B]" />
              <span>Inert Rejects ({metrics.inertPct.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span>Variance ({metrics.variancePct.toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GRADE-WISE OUTPUT LEDGER TABLE */}
      <section className="rounded-2xl bg-white border border-[#DDE5DC] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-[#006B3C]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#063D2A]">
              Production Yield by Waste Grade (`output_breakdown_by_grade`)
            </h3>
          </div>
          <Link
            href="/admin/inventory/stock"
            className="text-[10px] font-mono uppercase text-[#006B3C] hover:underline flex items-center gap-1 font-bold"
          >
            <span>Stock Ledger</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {sortedGrades.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-[#7B8580]">
            {loading ? "Calculating sorting runs..." : "No finished goods logged in this period."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#DDE5DC] text-[#7B8580] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Polymer Grade</th>
                  <th className="pb-3 text-right font-semibold">Output (kg)</th>
                  <th className="pb-3 text-right font-semibold">Tonnage (MT)</th>
                  <th className="pb-3 text-right font-semibold">Share of Output</th>
                  <th className="pb-3 text-right font-semibold">Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE5DC]/60">
                {sortedGrades.map((grade) => (
                  <tr key={grade.code} className="hover:bg-[#EEF5ED]/50 transition-colors">
                    <td className="py-3 font-bold text-[#063D2A] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006B3C]" />
                      <span>{grade.code}</span>
                    </td>
                    <td className="py-3 text-right text-[#171F1B]">
                      {grade.weightKg.toLocaleString()} kg
                    </td>
                    <td className="py-3 text-right font-bold text-[#171F1B]">
                      {(grade.weightKg / 1000).toFixed(3)} MT
                    </td>
                    <td className="py-3 text-right text-[#006B3C] font-bold">
                      {grade.pctOfTotalOutput.toFixed(1)}%
                    </td>
                    <td className="py-3 text-right">
                      <div className="w-24 ml-auto bg-[#EEF5ED] rounded-full h-2 overflow-hidden border border-[#DDE5DC]">
                        <div
                          className="bg-[#006B3C] h-full rounded-full"
                          style={{ width: `${grade.pctOfTotalOutput}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-3 border-t border-[#DDE5DC] text-[10px] font-mono text-[#7B8580] flex justify-between">
          <span>Aggregated from Daily Progress Reports (`ProductionLog`)</span>
          <span>Swayambhu Chakra Yield Engine</span>
        </div>
      </section>
    </div>
  );
}