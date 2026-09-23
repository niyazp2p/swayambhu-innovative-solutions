"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  Fuel,
  PackageCheck,
  Calendar,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  Activity,
  Factory,
  BarChart3,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { analyticsService, UtilityEfficiencyResponse } from "@/lib/services/analytics";

export default function UtilityAnalyticsPage() {
  const { selectedPlantId } = useAuth();

  // Current month default range
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() => new Date().toISOString().split("T")[0]);

  const [data, setData] = useState<UtilityEfficiencyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUtilities = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      setRefreshing(true);
      setError(null);
      try {
        const res = await analyticsService.getUtilityMetrics(fromDate, toDate, selectedPlantId);
        setData(res);
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to load utility telemetry data.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [fromDate, toDate, selectedPlantId]
  );

  useEffect(() => {
    fetchUtilities();
  }, [fetchUtilities]);

  // Derived figures & operational cost estimations (Standard Industrial Baselines)
  const derived = useMemo(() => {
    if (!data) {
      return {
        kwh: 0,
        diesel: 0,
        wire: 0,
        kwhPerTon: 0,
        dieselPerTon: 0,
        wirePerBaledTon: 0,
        estGridCostInr: 0,
        estDieselCostInr: 0,
        estWireCostInr: 0,
        totalUtilitySpendInr: 0,
      };
    }

    const kwh = Number(data.total_electricity_kwh) || 0;
    const diesel = Number(data.total_diesel_liters) || 0;
    const wire = Number(data.total_strapping_wire_kg) || 0;

    const kwhPerTon = Number(data.kwh_per_ton_processed) || 0;
    const dieselPerTon = Number(data.diesel_liters_per_ton_processed) || 0;
    const wirePerBaledTon = Number(data.wire_kg_per_baled_ton) || 0;

    // Industrial baseline cost rates: Electricity ~₹9.20/kWh, Diesel ~₹90.00/L, Baler Wire ~₹75.00/kg
    const estGridCostInr = kwh * 9.2;
    const estDieselCostInr = diesel * 90.0;
    const estWireCostInr = wire * 75.0;
    const totalUtilitySpendInr = estGridCostInr + estDieselCostInr + estWireCostInr;

    return {
      kwh,
      diesel,
      wire,
      kwhPerTon,
      dieselPerTon,
      wirePerBaledTon,
      estGridCostInr,
      estDieselCostInr,
      estWireCostInr,
      totalUtilitySpendInr,
    };
  }, [data]);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12 font-sans selection:bg-[#006B3C] selection:text-white text-[#171F1B]">
      {/* 1. HEADER & DATE SELECTOR */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              Tab 2 // Resource Telemetry
            </span>
            <span className="h-1 w-1 rounded-full bg-[#DDE5DC]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#7B8580]">
              Endpoint: /api/v1/analytics/utilities
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#063D2A]">
            Utilities & Consumables Efficiency
          </h1>
        </div>

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
            onClick={() => fetchUtilities(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:text-[#063D2A] transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
            <span className="hidden sm:inline">Refresh Sync</span>
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
            onClick={() => fetchUtilities(false)}
            className="underline font-bold text-[#006B3C] hover:text-[#063D2A] ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. THREE CORE RESOURCE SCORECARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Electricity (kWh) Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE5DC]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A]">
                Grid Electricity
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#7B8580] uppercase">Sorting Line & Drives</span>
          </div>

          <div className="my-5">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#171F1B] block tracking-tight">
              {loading ? "..." : `${derived.kwh.toLocaleString()} kWh`}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-md bg-[#EEF5ED] text-[#006B3C] text-[11px] font-mono font-bold">
                {loading ? "..." : `${derived.kwhPerTon.toFixed(2)} kWh / MT`}
              </span>
              <span className="text-[11px] font-mono text-[#7B8580]">raw processed</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDE5DC] flex items-center justify-between text-[11px] font-mono text-[#7B8580]">
            <span>Est. Power OPEX</span>
            <span className="font-bold text-[#171F1B]">
              ₹{derived.estGridCostInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* Diesel Fuel (Liters) Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE5DC]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFF8E6] border border-[#FCD34D]/40 flex items-center justify-center text-[#D97706]">
                <Fuel className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A]">
                Generator & Yard Diesel
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#7B8580] uppercase">DG Genset / Forklifts</span>
          </div>

          <div className="my-5">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#171F1B] block tracking-tight">
              {loading ? "..." : `${derived.diesel.toLocaleString()} L`}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-md bg-[#FFF8E6] text-[#B45309] text-[11px] font-mono font-bold">
                {loading ? "..." : `${derived.dieselPerTon.toFixed(2)} L / MT`}
              </span>
              <span className="text-[11px] font-mono text-[#7B8580]">raw processed</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDE5DC] flex items-center justify-between text-[11px] font-mono text-[#7B8580]">
            <span>Est. Fuel OPEX</span>
            <span className="font-bold text-[#171F1B]">
              ₹{derived.estDieselCostInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* Strapping Wire (kg) Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE5DC]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] flex items-center justify-center text-[#52605A]">
                <PackageCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A]">
                Baler Strapping Wire
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#7B8580] uppercase">Packaging Consumables</span>
          </div>

          <div className="my-5">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#171F1B] block tracking-tight">
              {loading ? "..." : `${derived.wire.toLocaleString()} kg`}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-md bg-[#EEF5ED] text-[#006B3C] text-[11px] font-mono font-bold">
                {loading ? "..." : `${derived.wirePerBaledTon.toFixed(2)} kg / MT`}
              </span>
              <span className="text-[11px] font-mono text-[#7B8580]">baled finished goods</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDE5DC] flex items-center justify-between text-[11px] font-mono text-[#7B8580]">
            <span>Est. Wire OPEX</span>
            <span className="font-bold text-[#171F1B]">
              ₹{derived.estWireCostInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </section>

      {/* 3. UNIT ECONOMICS INTENSITY MATRIX */}
      <section className="rounded-2xl bg-[#063D2A] text-[#FDF8EE] p-5 sm:p-6 shadow-md border border-[#006B3C]/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#88C34A]" />
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#FDF8EE] font-bold">
              Plant Resource Consumption Intensity
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#88C34A] tracking-wider">
            Aggregated from Verified DPR Shift Reports
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="bg-black/25 rounded-xl p-4 border border-white/10">
            <span className="text-[10px] font-mono text-[#FDF8EE]/60 uppercase block">Specific Power Consumption</span>
            <span className="text-xl font-bold font-mono text-white mt-1 block">
              {loading ? "..." : `${derived.kwhPerTon.toFixed(2)} kWh/MT`}
            </span>
            <span className="text-[10px] font-mono text-[#88C34A] mt-1 block">
              {derived.kwhPerTon < 45 ? "Optimal Grid Efficiency" : "Elevated Line Load"}
            </span>
          </div>

          <div className="bg-black/25 rounded-xl p-4 border border-white/10">
            <span className="text-[10px] font-mono text-[#FDF8EE]/60 uppercase block">Specific Diesel Consumption</span>
            <span className="text-xl font-bold font-mono text-white mt-1 block">
              {loading ? "..." : `${derived.dieselPerTon.toFixed(2)} L/MT`}
            </span>
            <span className="text-[10px] font-mono text-[#FCD34D] mt-1 block">
              {derived.dieselPerTon > 2 ? "High DG Generator Reliance" : "Standard Yard Run-Rate"}
            </span>
          </div>

          <div className="bg-black/25 rounded-xl p-4 border border-white/10">
            <span className="text-[10px] font-mono text-[#FDF8EE]/60 uppercase block">Specific Wire Usage Rate</span>
            <span className="text-xl font-bold font-mono text-white mt-1 block">
              {loading ? "..." : `${derived.wirePerBaledTon.toFixed(2)} kg/Baled MT`}
            </span>
            <span className="text-[10px] font-mono text-[#88C34A] mt-1 block">
              Directly correlated with bale compression
            </span>
          </div>
        </div>
      </section>

      {/* 4. UTILITY RECONCILIATION SUMMARY TABLE */}
      <section className="rounded-2xl bg-white border border-[#DDE5DC] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-[#006B3C]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#063D2A]">
              Consumables Ledger & Cost Absorption
            </h3>
          </div>
          <Link
            href="/admin/operations/dpr"
            className="text-[10px] font-mono uppercase text-[#006B3C] hover:underline flex items-center gap-1 font-bold"
          >
            <span>DPR Logs</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#DDE5DC] text-[#7B8580] uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Utility / Resource</th>
                <th className="pb-3 text-right font-semibold">Total Consumed</th>
                <th className="pb-3 text-right font-semibold">Intensity Per Metric Ton</th>
                <th className="pb-3 text-right font-semibold">Est. Rate Basis</th>
                <th className="pb-3 text-right font-semibold">Absorbed OPEX</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE5DC]/60">
              <tr className="hover:bg-[#EEF5ED]/50 transition-colors">
                <td className="py-3 font-bold text-[#063D2A] flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#006B3C]" />
                  <span>Grid Electricity (`total_electricity_kwh`)</span>
                </td>
                <td className="py-3 text-right text-[#171F1B] font-bold">
                  {derived.kwh.toLocaleString()} kWh
                </td>
                <td className="py-3 text-right text-[#006B3C] font-bold">
                  {derived.kwhPerTon.toFixed(2)} kWh / MT
                </td>
                <td className="py-3 text-right text-[#7B8580]">₹9.20 / unit</td>
                <td className="py-3 text-right font-bold text-[#171F1B]">
                  ₹{derived.estGridCostInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>

              <tr className="hover:bg-[#EEF5ED]/50 transition-colors">
                <td className="py-3 font-bold text-[#063D2A] flex items-center gap-2">
                  <Fuel className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Diesel Fuel (`total_diesel_liters`)</span>
                </td>
                <td className="py-3 text-right text-[#171F1B] font-bold">
                  {derived.diesel.toLocaleString()} Liters
                </td>
                <td className="py-3 text-right text-[#B45309] font-bold">
                  {derived.dieselPerTon.toFixed(2)} L / MT
                </td>
                <td className="py-3 text-right text-[#7B8580]">₹90.00 / Liter</td>
                <td className="py-3 text-right font-bold text-[#171F1B]">
                  ₹{derived.estDieselCostInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>

              <tr className="hover:bg-[#EEF5ED]/50 transition-colors">
                <td className="py-3 font-bold text-[#063D2A] flex items-center gap-2">
                  <PackageCheck className="w-3.5 h-3.5 text-[#52605A]" />
                  <span>Strapping Wire (`total_strapping_wire_kg`)</span>
                </td>
                <td className="py-3 text-right text-[#171F1B] font-bold">
                  {derived.wire.toLocaleString()} kg
                </td>
                <td className="py-3 text-right text-[#006B3C] font-bold">
                  {derived.wirePerBaledTon.toFixed(2)} kg / MT
                </td>
                <td className="py-3 text-right text-[#7B8580]">₹75.00 / kg</td>
                <td className="py-3 text-right font-bold text-[#171F1B]">
                  ₹{derived.estWireCostInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#DDE5DC] font-bold">
                <td className="pt-3 text-[#063D2A] uppercase">Total Estimated Utility Cost</td>
                <td colSpan={3} className="pt-3 text-right text-[#7B8580] text-[10px]">
                  Absorbed directly into Plant EBITDA
                </td>
                <td className="pt-3 text-right text-[#063D2A] text-sm">
                  ₹{derived.totalUtilitySpendInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}