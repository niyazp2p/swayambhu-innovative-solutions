"use client";

import React, { useEffect, useState, useCallback } from "react";
import { RefreshCw, Plus, Filter, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { operationsService } from "@/lib/services/operations";
import { DowntimeLogResponse, DowntimeReason } from "@/types/operations";
import { DowntimeStatsHeader } from "@/components/operations/downtime/DowntimeStatsHeader";
import { DowntimeTable } from "@/components/operations/downtime/DowntimeTable";
import { DowntimeLogModal } from "@/components/operations/downtime/DowntimeLogModal";
import { DowntimeDetailModal } from "@/components/operations/downtime/DowntimeDetailModal";

export default function DowntimeTrackerPage() {
  const { selectedPlantId } = useAuth();
  const [logs, setLogs] = useState<DowntimeLogResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Dialogs
  const [filterReason, setFilterReason] = useState<string>("ALL");
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [inspectLog, setInspectLog] = useState<DowntimeLogResponse | null>(null);

  const fetchDowntimes = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const data = await operationsService.getDowntimeList({
        plant_id: selectedPlantId || undefined,
        reason: filterReason !== "ALL" ? filterReason : undefined,
      });
      setLogs(data || []);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load machine downtime logs.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedPlantId, filterReason]);

  useEffect(() => {
    fetchDowntimes();
  }, [fetchDowntimes]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans selection:bg-[#006B3C] selection:text-white">
      {/* 1. Header & Controls */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              Operations Telemetry
            </span>
            <span className="h-1 w-1 rounded-full bg-[#DDE5DC]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#7B8580]">
              Machinery Stoppages
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#063D2A] mt-1">
            Machine Downtime Tracker
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDE5DC] bg-white text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-[#7B8580]" />
            <select
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
              className="bg-transparent focus:outline-none text-[#171F1B] cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {Object.values(DowntimeReason).map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => fetchDowntimes()}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-mono text-[#52605A] transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Stoppage</span>
          </button>
        </div>
      </section>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => fetchDowntimes()} className="underline font-bold text-[#006B3C]">
            Retry
          </button>
        </div>
      )}

      {/* 2. Statistical KPI Strip */}
      <DowntimeStatsHeader logs={logs} />

      {/* 3. Incidents Ledger */}
      <DowntimeTable
        logs={logs}
        loading={loading}
        onInspect={(log) => setInspectLog(log)}
      />

      {/* 4. Standalone Incident Entry Modal */}
      <DowntimeLogModal
        isOpen={isLogModalOpen}
        plantId={selectedPlantId || undefined}
        onClose={() => setIsLogModalOpen(false)}
        onSuccess={(newLog) => setLogs([newLog, ...logs])}
      />

      {/* 5. Detail Inspection Slide-Over */}
      <DowntimeDetailModal
        log={inspectLog}
        onClose={() => setInspectLog(null)}
      />
    </div>
  );
}