"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { 
  ClipboardList, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  Boxes, 
  Zap, 
  Fuel, 
  Activity, 
  Eye, 
  X,
  Scale
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { operationsService } from "@/lib/services/operations";
import { DPRRecord } from "@/types/operations";
import { formatMetricTon } from "@/lib/utils/formatters";

export default function DailyProgressReportsPage() {
  const { selectedPlantId } = useAuth();
  const [reports, setReports] = useState<DPRRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDPR, setSelectedDPR] = useState<DPRRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadReports = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const data = await operationsService.getDPRList({
        plant_id: selectedPlantId || undefined,
      });
      setReports(data || []);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to synchronize operational reports.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedPlantId]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // Operational telemetry aggregations
  const totalRaw = reports.reduce((acc, r) => acc + Number(r.total_raw_processed_kg), 0);
  const totalOutput = reports.reduce((acc, r) => acc + Number(r.total_output_produced_kg), 0);
  const overallRecoveryRate = totalRaw > 0 ? ((totalOutput / totalRaw) * 100).toFixed(1) : "0.0";
  const totalBales = reports.reduce(
    (acc, r) => acc + (r.production_items?.reduce((b, i) => b + i.bales_produced, 0) || 0),
    0
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans selection:bg-[#006B3C] selection:text-white">
      {/* 1. Header & Quick Action Bar */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              Plant Telemetry & Operations
            </span>
            <span className="h-1 w-1 rounded-full bg-[#DDE5DC]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#7B8580]">
              Daily Logs (DPR)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#063D2A] mt-1">
            Daily Progress Reports
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadReports()}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-mono text-[#52605A] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
            <span>Sync</span>
          </button>

          <Link
            href="/admin/operations/dpr/new"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record New DPR</span>
          </Link>
        </div>
      </section>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-[#FFF8E6] border border-[#FCD34D] text-[#92400E] text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => loadReports()} className="underline font-bold text-[#006B3C]">
            Retry
          </button>
        </div>
      )}

      {/* 2. Operational KPIs Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Total Raw Processed
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] flex items-center justify-center text-[#006B3C]">
              <Scale className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B]">
              {formatMetricTon(totalRaw)}
            </span>
            <span className="text-[10px] font-mono text-[#7B8580] block mt-0.5">
              Historical Intake Processed
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Sorted Output Yield
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] flex items-center justify-center text-[#006B3C]">
              <Boxes className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#006B3C]">
              {formatMetricTon(totalOutput)}
            </span>
            <span className="text-[10px] font-mono text-[#7B8580] block mt-0.5">
              Total Finished Goods
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Recovery Efficiency
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] flex items-center justify-center text-[#006B3C]">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B]">
              {overallRecoveryRate}%
            </span>
            <span className="text-[10px] font-mono text-[#006B3C] font-semibold block mt-0.5">
              (Output / Intake Ratio)
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#7B8580]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#52605A]">
              Total Bales Produced
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] flex items-center justify-center text-[#006B3C]">
              <ClipboardList className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#171F1B]">
              {totalBales} Bales
            </span>
            <span className="text-[10px] font-mono text-[#7B8580] block mt-0.5">
              Inventoried to Warehouse
            </span>
          </div>
        </div>
      </section>

      {/* 3. Master DPR Table */}
      <section className="rounded-2xl bg-white border border-[#DDE5DC] overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-[#DDE5DC] flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#063D2A]">
            Historical Shift Reports
          </h3>
          <span className="text-xs font-mono text-[#7B8580]">
            {reports.length} Reports Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#DDE5DC] bg-[#F7FAF7] text-[#52605A] font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Raw Processed</th>
                <th className="py-3 px-4">Output Produced</th>
                <th className="py-3 px-4">Inert Waste</th>
                <th className="py-3 px-4">Mass Variance</th>
                <th className="py-3 px-4">Utilities (Power / Fuel)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE5DC]/60 text-[#171F1B]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#7B8580] font-mono">
                    Loading daily operational reports...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#7B8580] font-mono">
                    No Daily Progress Reports logged for this facility.
                  </td>
                </tr>
              ) : (
                reports.map((dpr) => {
                  const variancePct =
                    dpr.total_raw_processed_kg > 0
                      ? (Math.abs(Number(dpr.mass_balance_variance_kg)) /
                          Number(dpr.total_raw_processed_kg)) *
                        100
                      : 0;

                  return (
                    <tr key={dpr.id} className="hover:bg-[#F9FCF9] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#063D2A]">
                        {dpr.report_date}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        {Number(dpr.total_raw_processed_kg).toLocaleString()} kg
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#006B3C]">
                        {Number(dpr.total_output_produced_kg).toLocaleString()} kg
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#52605A]">
                        {Number(dpr.total_inert_waste_kg).toLocaleString()} kg
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            variancePct > 5
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          }`}
                        >
                          {Number(dpr.mass_balance_variance_kg) > 0 ? "+" : ""}
                          {Number(dpr.mass_balance_variance_kg).toFixed(1)} kg ({variancePct.toFixed(1)}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#52605A]">
                        {dpr.electricity_kwh} kWh | {dpr.diesel_liters} L
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedDPR(dpr)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EEF5ED] hover:bg-[#DDE5DC] text-[#063D2A] font-mono text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Slide-Over Detail Inspector */}
      {selectedDPR && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#006B3C] font-bold">
                  Shift Report Details
                </span>
                <h3 className="text-xl font-bold text-[#063D2A]">
                  DPR: {selectedDPR.report_date}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDPR(null)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mass Balance Breakdown */}
            <div className="p-4 rounded-xl bg-[#F7FAF7] border border-[#DDE5DC] space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#52605A] block">
                Mass Balance Accounting
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block">Raw Processed:</span>
                  <span className="font-bold">{selectedDPR.total_raw_processed_kg} kg</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Output Produced:</span>
                  <span className="font-bold text-[#006B3C]">
                    {selectedDPR.total_output_produced_kg} kg
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Inert Waste:</span>
                  <span className="font-bold">{selectedDPR.total_inert_waste_kg} kg</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Variance (Loss):</span>
                  <span className="font-bold text-amber-700">
                    {selectedDPR.mass_balance_variance_kg} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Production Items */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#52605A] block">
                Sorted Output Breakdown ({selectedDPR.production_items?.length || 0} Grades)
              </span>
              <div className="divide-y divide-[#DDE5DC] border border-[#DDE5DC] rounded-xl overflow-hidden">
                {selectedDPR.production_items?.map((item) => (
                  <div key={item.id} className="p-3 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-[#171F1B] block">
                        Grade: {item.waste_grade_id.slice(0, 8)}...
                      </span>
                      <span className="text-[10px] font-mono text-[#52605A]">
                        {item.bales_produced} Bales Produced
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#006B3C]">
                      {Number(item.output_weight_kg).toLocaleString()} kg
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Downtime Incidents */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#52605A] block">
                Shift Stoppages ({selectedDPR.downtime_logs?.length || 0} Incidents)
              </span>
              {selectedDPR.downtime_logs?.length === 0 ? (
                <div className="p-3 text-xs font-mono text-neutral-500 rounded-xl bg-neutral-50 border border-neutral-200">
                  Zero downtime reported during this shift.
                </div>
              ) : (
                <div className="divide-y divide-[#DDE5DC] border border-[#DDE5DC] rounded-xl overflow-hidden">
                  {selectedDPR.downtime_logs?.map((dt) => (
                    <div key={dt.id} className="p-3 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-amber-800">
                          {dt.reason}
                        </span>
                        <span className="font-mono font-bold">{dt.duration_minutes} mins</span>
                      </div>
                      {dt.description && (
                        <p className="text-[11px] text-neutral-600 font-sans">
                          {dt.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Utilities */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#52605A] block">
                Consumables & Utilities
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono p-3 rounded-xl bg-[#F7FAF7] border border-[#DDE5DC]">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Electricity</span>
                  <span className="font-bold">{selectedDPR.electricity_kwh} kWh</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Diesel</span>
                  <span className="font-bold">{selectedDPR.diesel_liters} L</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Strapping</span>
                  <span className="font-bold">{selectedDPR.strapping_wire_kg} kg</span>
                </div>
              </div>
            </div>

            {selectedDPR.remarks && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#7B8580] block">
                  Supervisor Notes
                </span>
                <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  {selectedDPR.remarks}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}