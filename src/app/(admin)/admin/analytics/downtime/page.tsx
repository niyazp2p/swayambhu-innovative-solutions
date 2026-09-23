"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Activity,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Wrench,
  ZapOff,
  PackageX,
  Users,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { analyticsService, DowntimeSummaryResponse, DowntimeMetric } from "@/lib/services/analytics";

export default function DowntimeAnalyticsPage() {
  const { selectedPlantId } = useAuth();

  // Default to current month window
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() => new Date().toISOString().split("T")[0]);

  const [data, setData] = useState<DowntimeSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDowntime = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      setRefreshing(true);
      setError(null);
      try {
        const res = await analyticsService.getDowntimeMetrics(fromDate, toDate, selectedPlantId);
        setData(res);
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to load downtime telemetry data.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [fromDate, toDate, selectedPlantId]
  );

  useEffect(() => {
    fetchDowntime();
  }, [fetchDowntime]);

  // Aggregate metrics & dominant root cause analysis
  const metrics = useMemo(() => {
    if (!data) {
      return {
        totalMinutes: 0,
        totalHours: 0,
        uptimePct: 0,
        totalIncidents: 0,
        dominant: null as DowntimeMetric | null,
      };
    }

    const totalMinutes = Number(data.total_downtime_minutes) || 0;
    const totalHours = (totalMinutes / 60).toFixed(1);
    const uptimePct = Number(data.operational_uptime_pct) || 0;

    const breakdown = data.breakdown_by_reason || [];
    const totalIncidents = breakdown.reduce((acc, curr) => acc + curr.incident_count, 0);

    const dominant =
      [...breakdown].sort((a, b) => b.total_minutes - a.total_minutes)[0] || null;

    return {
      totalMinutes,
      totalHours,
      uptimePct,
      totalIncidents,
      dominant,
    };
  }, [data]);

  const getReasonMeta = (reason: string) => {
    switch (reason.toUpperCase()) {
      case "MACHINE_BREAKDOWN":
        return {
          label: "Mechanical Breakdown",
          icon: Wrench,
          color: "text-red-700 bg-red-50 border-red-200",
          barColor: "bg-red-500",
        };
      case "POWER_OUTAGE":
        return {
          label: "Grid Power Outage",
          icon: ZapOff,
          color: "text-amber-800 bg-amber-50 border-amber-200",
          barColor: "bg-amber-500",
        };
      case "FEEDSTOCK_SHORTAGE":
        return {
          label: "Feedstock Starvation",
          icon: PackageX,
          color: "text-blue-800 bg-blue-50 border-blue-200",
          barColor: "bg-blue-500",
        };
      case "MAINTENANCE":
        return {
          label: "Planned Line Service",
          icon: Activity,
          color: "text-emerald-800 bg-[#EEF5ED] border-[#006B3C]/20",
          barColor: "bg-[#006B3C]",
        };
      case "LABOR_UNAVAILABLE":
        return {
          label: "Labor Absence / Shift Lag",
          icon: Users,
          color: "text-purple-800 bg-purple-50 border-purple-200",
          barColor: "bg-purple-500",
        };
      default:
        return {
          label: reason.replace(/_/g, " "),
          icon: HelpCircle,
          color: "text-neutral-700 bg-neutral-100 border-neutral-200",
          barColor: "bg-neutral-400",
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12 font-sans selection:bg-[#006B3C] selection:text-white text-[#171F1B]">
      {/* 1. HEADER & DATE CONTROLS */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              Tab 3 // Machine Health
            </span>
            <span className="h-1 w-1 rounded-full bg-[#DDE5DC]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#7B8580]">
              Endpoint: /api/v1/analytics/downtime
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#063D2A]">
            Downtime Summary & Availability
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-center">
          <div className="flex items-center gap-2 bg-white border border-[#DDE5DC] rounded-xl px-3 py-1.5 shadow-xs">
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
            onClick={() => fetchDowntime(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:text-[#063D2A] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>
      </section>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-[#FFF8E6] border border-[#FCD34D] text-[#92400E] text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchDowntime(false)}
            className="underline font-bold text-[#006B3C] hover:text-[#063D2A] ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. OPERATIONAL AVAILABILITY KPIS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Operational Availability % */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Operational Availability
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#006B3C] block tracking-tight">
              {loading ? "..." : `${metrics.uptimePct.toFixed(2)}%`}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#52605A]">
              <span>Scheduled plant uptime</span>
            </div>
          </div>
        </div>

        {/* Total Lost Minutes */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Cumulative Downtime
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B] block tracking-tight">
              {loading ? "..." : `${metrics.totalMinutes.toLocaleString()} m`}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#7B8580]">
              <span>{metrics.totalHours} productive hours lost</span>
            </div>
          </div>
        </div>

        {/* Total Reported Incidents */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Total Stoppage Events
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B] block tracking-tight">
              {loading ? "..." : metrics.totalIncidents}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#7B8580]">
              <span>Logged shift interruptions</span>
            </div>
          </div>
        </div>

        {/* Primary Critical Bottleneck */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Primary Root Cause
            </span>
            <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm sm:text-base font-black font-mono text-red-800 block truncate">
              {loading
                ? "..."
                : metrics.dominant
                ? getReasonMeta(metrics.dominant.reason).label
                : "None Reported"}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#7B8580]">
              <span>
                {metrics.dominant
                  ? `${metrics.dominant.total_minutes} mins (${(
                      (metrics.dominant.total_minutes / Math.max(metrics.totalMinutes, 1)) *
                      100
                    ).toFixed(0)}% of lost time)`
                  : "Continuous production"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROOT CAUSE DISTRIBUTION BARS */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#063D2A] text-[#FDF8EE] shadow-md border border-[#006B3C]/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-[#88C34A]" />
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#FDF8EE] font-bold">
              Root-Cause Variance Breakdown
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#88C34A] tracking-wider">
            Proportional Share of Line Stoppage
          </span>
        </div>

        {metrics.totalMinutes === 0 ? (
          <div className="py-6 text-center text-xs font-mono text-white/60">
            No downtime recorded for the selected operational period. Line ran at optimal throughput.
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {data?.breakdown_by_reason.map((item) => {
              const meta = getReasonMeta(item.reason);
              const pct = ((item.total_minutes / metrics.totalMinutes) * 100).toFixed(1);
              return (
                <div key={item.reason} className="space-y-1 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <meta.icon className="w-3.5 h-3.5 text-[#88C34A]" />
                      <span className="font-semibold text-white">{meta.label}</span>
                      <span className="text-[10px] text-white/50">({item.incident_count} halts)</span>
                    </div>
                    <span className="text-xs text-[#88C34A] font-bold">
                      {item.total_minutes} mins ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`h-full ${meta.barColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. DOWNTIME SUMMARY LEDGER TABLE */}
      <section className="rounded-2xl bg-white border border-[#DDE5DC] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#006B3C]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#063D2A]">
              Operational Incident Breakdown (`breakdown_by_reason`)
            </h3>
          </div>
          <Link
            href="/admin/operations/downtime"
            className="text-[10px] font-mono uppercase text-[#006B3C] hover:underline flex items-center gap-1 font-bold"
          >
            <span>Stoppage Log</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {!data?.breakdown_by_reason || data.breakdown_by_reason.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-[#7B8580]">
            {loading ? "Aggregating maintenance telemetry..." : "No downtime incidents on record."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#DDE5DC] text-[#7B8580] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Failure / Stoppage Category</th>
                  <th className="pb-3 text-right font-semibold">Incident Count</th>
                  <th className="pb-3 text-right font-semibold">Total Lost Time</th>
                  <th className="pb-3 text-right font-semibold">Mean Duration</th>
                  <th className="pb-3 text-right font-semibold">Impact Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE5DC]/60">
                {data.breakdown_by_reason.map((item) => {
                  const meta = getReasonMeta(item.reason);
                  const sharePct =
                    metrics.totalMinutes > 0
                      ? ((item.total_minutes / metrics.totalMinutes) * 100).toFixed(1)
                      : "0.0";
                  const meanDuration =
                    item.incident_count > 0
                      ? (item.total_minutes / item.incident_count).toFixed(0)
                      : "0";

                  return (
                    <tr key={item.reason} className="hover:bg-[#EEF5ED]/50 transition-colors">
                      <td className="py-3 font-bold text-[#063D2A] flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] ${meta.color}`}>
                          <meta.icon className="w-3 h-3" />
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-3 text-right text-[#171F1B] font-bold">
                        {item.incident_count}
                      </td>
                      <td className="py-3 text-right text-[#171F1B] font-bold">
                        {item.total_minutes} mins{" "}
                        <span className="text-[10px] font-normal text-[#7B8580]">
                          ({(item.total_minutes / 60).toFixed(1)} h)
                        </span>
                      </td>
                      <td className="py-3 text-right text-[#52605A]">
                        ~{meanDuration} mins / event
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[11px] text-[#006B3C] font-bold">{sharePct}%</span>
                          <div className="w-20 bg-[#EEF5ED] rounded-full h-1.5 overflow-hidden border border-[#DDE5DC]">
                            <div
                              className="bg-[#006B3C] h-full rounded-full"
                              style={{ width: `${sharePct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[#DDE5DC] font-bold text-[#063D2A]">
                  <td className="pt-3 uppercase">Total Shift Loss</td>
                  <td className="pt-3 text-right">{metrics.totalIncidents}</td>
                  <td className="pt-3 text-right">
                    {metrics.totalMinutes} mins ({metrics.totalHours} h)
                  </td>
                  <td className="pt-3 text-right text-[#7B8580] text-[10px]">—</td>
                  <td className="pt-3 text-right text-[#006B3C]">100.0%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <div className="pt-3 border-t border-[#DDE5DC] text-[10px] font-mono text-[#7B8580] flex justify-between">
          <span>Formula: Uptime % = (Scheduled Mins − Stoppage Mins) / Scheduled Mins × 100</span>
          <span>Swayambhu Chakra Reliability Engine</span>
        </div>
      </section>
    </div>
  );
}