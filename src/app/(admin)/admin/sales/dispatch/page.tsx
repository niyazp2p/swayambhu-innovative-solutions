"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Search, RefreshCw, Filter } from "lucide-react";
import { DispatchOrder, Buyer, DispatchOrderCreatePayload } from "@/types/sales";
import { WasteGrade } from "@/types/procurement";
import { salesService } from "@/lib/services/sales";
import { procurementService } from "@/lib/services/procurement";
import { DispatchStatsHeader } from "@/components/sales/dispatch/DispatchStatsHeader";
import { DispatchTable } from "@/components/sales/dispatch/DispatchTable";
import { CreateDispatchModal } from "@/components/sales/dispatch/CreateDispatchModal";
import { DispatchDetailDrawer } from "@/components/sales/dispatch/DispatchDetailDrawer";

export default function DispatchesPage() {
  const [dispatches, setDispatches] = useState<DispatchOrder[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [grades, setGrades] = useState<WasteGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("ALL");

  // Dialog Controls
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState<DispatchOrder | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const loadAllData = useCallback(async () => {
    try {
      setRefreshing(true);
      const [dispatchData, buyerData, gradeData] = await Promise.all([
        salesService.getDispatches(),
        salesService.getBuyers({ is_active: true }),
        procurementService.getGrades(),
      ]);
      setDispatches(dispatchData);
      setBuyers(buyerData);
      setGrades(gradeData);
    } catch (err) {
      console.error("Failed to load dispatch records", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Client-side search and filtering
  const filteredDispatches = useMemo(() => {
    const q = search.toLowerCase().trim();
    return dispatches.filter((d) => {
      const matchesSearch =
        !q ||
        d.dispatch_number.toLowerCase().includes(q) ||
        d.vehicle_number.toLowerCase().includes(q) ||
        (d.buyer?.name && d.buyer.name.toLowerCase().includes(q));

      const matchesPayment =
        paymentFilter === "ALL" || d.payment_status === paymentFilter;

      return matchesSearch && matchesPayment;
    });
  }, [dispatches, search, paymentFilter]);

  // Submission handler
  const handleCreateDispatch = async (payload: DispatchOrderCreatePayload) => {
    const newRecord = await salesService.createDispatch(payload);
    setDispatches((prev) => [newRecord, ...prev]);
  };

  // Secure Gate Pass Download Trigger
  const handleDownloadGatePass = async (
    dispatchId: string,
    dispatchNumber: string
  ) => {
    try {
      setDownloadingId(dispatchId);
      const blob = await salesService.getGatePassPdfBlob(dispatchId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `GatePass_${dispatchNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download Gate Pass PDF", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#006B3C] font-bold">
            Outward Weighbridge Terminal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Dispatches & Gate Passes
          </h1>
          <p className="text-xs text-[#52605A] mt-0.5">
            Record outward scrap consignments, compute statutory net tonnage, and issue gate passes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAllData}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs text-[#52605A] hover:bg-[#EEF5ED] transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Dispatch</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Metrics Header */}
      <DispatchStatsHeader dispatches={dispatches} />

      {/* 3. Search & Quick Filters */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
          <input
            type="text"
            placeholder="Search dispatch #, vehicle, or buyer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] rounded-xl border border-[#DDE5DC] text-xs text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-[#006B3C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-[#7B8580] shrink-0" />
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs text-[#171F1B] focus:outline-[#006B3C]"
          >
            <option value="ALL">All Settlements</option>
            <option value="UNPAID">Unpaid Only</option>
            <option value="PARTIAL">Partial Only</option>
            <option value="PAID">Settled (Paid)</option>
          </select>
        </div>
      </div>

      {/* 4. Ledger Table */}
      <DispatchTable
        dispatches={filteredDispatches}
        loading={loading}
        onInspect={(record) => setSelectedDispatch(record)}
        onDownloadGatePass={handleDownloadGatePass}
        downloadingId={downloadingId}
      />

      {/* 5. Modals & Drawers */}
      <CreateDispatchModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateDispatch}
        buyers={buyers}
        grades={grades}
      />

      <DispatchDetailDrawer
        dispatch={selectedDispatch}
        isOpen={Boolean(selectedDispatch)}
        onClose={() => setSelectedDispatch(null)}
        onDownloadGatePass={handleDownloadGatePass}
      />
    </div>
  );
}