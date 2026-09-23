"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Layers, Search, RefreshCw, Filter } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { BatchItem, BatchStage } from "@/types/procurement";
import { BatchStatsHeader } from "@/components/procurement/batches/BatchStatsHeader";
import { BatchTable } from "@/components/procurement/batches/BatchTable";

const BatchStageModal = dynamic(
  () => import("@/components/procurement/batches/BatchStageModal"),
  { ssr: false }
);

export default function IntakeBatchesPage() {
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stageFilter, setStageFilter] = useState<string>("ALL");
  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get<BatchItem[]>("/procurement/batches");
      setBatches(res.data);
    } catch (err) {
      console.error("Failed to load batches", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const filteredBatches = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return batches.filter((b) => {
      const matchesSearch =
        !q ||
        b.batch_code.toLowerCase().includes(q) ||
        (b.yard_location && b.yard_location.toLowerCase().includes(q));

      const matchesStage = stageFilter === "ALL" || b.stage === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [batches, searchQuery, stageFilter]);

  const handleBatchUpdated = (updatedBatch: BatchItem) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === updatedBatch.id ? updatedBatch : b))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#006B3C] uppercase font-bold tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Warehouse Lifecycle Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Intake Batches
          </h1>
          <p className="text-xs sm:text-sm text-[#52605A] font-sans mt-0.5">
            Track inward consignments across raw staging, yard bays, and sorting line transitions.
          </p>
        </div>

        <button
          onClick={fetchBatches}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono font-medium text-[#171F1B] hover:bg-[#EEF5ED] transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Sync Batches</span>
        </button>
      </div>

      {/* KPI Counters */}
      <BatchStatsHeader batches={batches} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
          <input
            type="text"
            placeholder="Search batch code (e.g. BATCH-RAW-...) or yard location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-none focus:border-[#006B3C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-[#7B8580] shrink-0" />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
          >
            <option value="ALL">All Lifecycle Stages</option>
            <option value="RAW">RAW Only</option>
            <option value="SORTED">SORTED Only</option>
            <option value="PROCESSED_BALED">PROCESSED_BALED Only</option>
            <option value="FINISHED_GOODS">FINISHED_GOODS Only</option>
          </select>
        </div>
      </div>

      {/* Batches Table */}
      <BatchTable
        batches={filteredBatches}
        onEditBatch={(batch) => setSelectedBatch(batch)}
      />

      {/* Stage Transition & Yard Bay Modal */}
      {selectedBatch && (
        <BatchStageModal
          batch={selectedBatch}
          isOpen={!!selectedBatch}
          onClose={() => setSelectedBatch(null)}
          onUpdated={handleBatchUpdated}
        />
      )}
    </div>
  );
}