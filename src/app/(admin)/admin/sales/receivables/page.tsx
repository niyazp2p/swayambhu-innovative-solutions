"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, RefreshCw, Filter } from "lucide-react";
import { DispatchOrder, PaymentUpdatePayload, PaymentStatus } from "@/types/sales";
import { salesService } from "@/lib/services/sales";
import { ReceivablesStatsHeader } from "@/components/sales/receivables/ReceivablesStatsHeader";
import { ReceivablesTable } from "@/components/sales/receivables/ReceivablesTable";
import { RecordPaymentModal } from "@/components/sales/receivables/RecordPaymentModal";
import { ReceivablesDetailDrawer } from "@/components/sales/receivables/ReceivablesDetailDrawer";

export default function ReceivablesPage() {
  const [dispatches, setDispatches] = useState<DispatchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modals & Drawers
  const [selectedForPayment, setSelectedForPayment] = useState<DispatchOrder | null>(null);
  const [selectedForDetail, setSelectedForDetail] = useState<DispatchOrder | null>(null);

  const fetchReceivables = useCallback(async () => {
    try {
      setRefreshing(true);
      const data = await salesService.getDispatches({
        payment_status: statusFilter === "ALL" ? undefined : (statusFilter as PaymentStatus),
      });
      setDispatches(data);
    } catch (err) {
      console.error("Failed to load receivables ledger", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchReceivables();
  }, [fetchReceivables]);

  // Client-side search filtering
  const filteredDispatches = useMemo(() => {
    const q = search.toLowerCase().trim();
    return dispatches.filter((d) => {
      return (
        !q ||
        d.dispatch_number.toLowerCase().includes(q) ||
        d.vehicle_number.toLowerCase().includes(q) ||
        (d.buyer?.name && d.buyer.name.toLowerCase().includes(q)) ||
        (d.remarks && d.remarks.toLowerCase().includes(q))
      );
    });
  }, [dispatches, search]);

  const handleRecordPayment = async (
    dispatchId: string,
    payload: PaymentUpdatePayload
  ) => {
    const updated = await salesService.recordPayment(dispatchId, payload);
    setDispatches((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#006B3C] font-bold">
            Treasury & Accounts Receivable
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Receivables & Settlements
          </h1>
          <p className="text-xs text-[#52605A] mt-0.5">
            Monitor outstanding balances from scrap dispatches, track overdue invoices, and post incoming settlements.
          </p>
        </div>

        <button
          onClick={fetchReceivables}
          disabled={refreshing}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs text-[#52605A] hover:bg-[#EEF5ED] transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
          <span>Sync</span>
        </button>
      </div>

      {/* KPI Header */}
      <ReceivablesStatsHeader dispatches={dispatches} />

      {/* Search & Filter Strip */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
          <input
            type="text"
            placeholder="Search dispatch ref, vehicle, or buyer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] rounded-xl border border-[#DDE5DC] text-xs text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-[#006B3C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-[#7B8580] shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs text-[#171F1B] focus:outline-[#006B3C]"
          >
            <option value="ALL">All Settlement Statuses</option>
            <option value="UNPAID">Unpaid Only</option>
            <option value="PARTIAL">Partial Only</option>
            <option value="PAID">Fully Settled</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <ReceivablesTable
        dispatches={filteredDispatches}
        loading={loading}
        onRecordPayment={(d) => setSelectedForPayment(d)}
        onInspect={(d) => setSelectedForDetail(d)}
      />

      {/* Settlement Modal */}
      <RecordPaymentModal
        dispatch={selectedForPayment}
        isOpen={Boolean(selectedForPayment)}
        onClose={() => setSelectedForPayment(null)}
        onSubmit={handleRecordPayment}
      />

      {/* Detail Inspector Drawer */}
      <ReceivablesDetailDrawer
        dispatch={selectedForDetail}
        isOpen={Boolean(selectedForDetail)}
        onClose={() => setSelectedForDetail(null)}
        onRecordPayment={(d) => setSelectedForPayment(d)}
      />
    </div>
  );
}