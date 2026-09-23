"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, RefreshCw, Filter } from "lucide-react";
import { DispatchOrder } from "@/types/sales";
import { salesService } from "@/lib/services/sales";
import { InvoiceStatsHeader } from "@/components/sales/invoices/InvoiceStatsHeader";
import { InvoiceTable } from "@/components/sales/invoices/InvoiceTable";
import { InvoiceDetailDrawer } from "@/components/sales/invoices/InvoiceDetailDrawer";
import { InvoicePdfModal } from "@/components/sales/invoices/InvoicePdfModal";

export default function InvoicesPage() {
  const [dispatches, setDispatches] = useState<DispatchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [taxTypeFilter, setTaxTypeFilter] = useState("ALL");

  // Modals & Drawers
  const [selectedForDetail, setSelectedForDetail] = useState<DispatchOrder | null>(null);
  const [selectedForPdf, setSelectedForPdf] = useState<DispatchOrder | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setRefreshing(true);
      const data = await salesService.getDispatches();
      setDispatches(data);
    } catch (err) {
      console.error("Failed to load invoice records", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Client-side search and GST type filtering
  const filteredDispatches = useMemo(() => {
    const q = search.toLowerCase().trim();
    return dispatches.filter((d) => {
      const matchesSearch =
        !q ||
        d.dispatch_number.toLowerCase().includes(q) ||
        d.vehicle_number.toLowerCase().includes(q) ||
        (d.buyer?.name && d.buyer.name.toLowerCase().includes(q)) ||
        (d.buyer?.gstin && d.buyer.gstin.toLowerCase().includes(q));

      const isInterstate = Number(d.igst_amount) > 0;
      const matchesTax =
        taxTypeFilter === "ALL" ||
        (taxTypeFilter === "INTERSTATE" && isInterstate) ||
        (taxTypeFilter === "INTRASTATE" && !isInterstate);

      return matchesSearch && matchesTax;
    });
  }, [dispatches, search, taxTypeFilter]);

  const handleDownloadPdf = async (dispatchId: string, dispatchNumber: string) => {
    try {
      setDownloadingId(dispatchId);
      const blob = await salesService.getTaxInvoicePdfBlob(dispatchId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `TaxInvoice_${dispatchNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download PDF invoice", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#006B3C] font-bold">
            Commercial Billing & Statutory Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Tax Invoices & GST Register
          </h1>
          <p className="text-xs text-[#52605A] mt-0.5">
            Audit outbound scrap consignments, calculate output CGST/SGST/IGST tax splits, and issue certified GST invoices.
          </p>
        </div>

        <button
          onClick={fetchInvoices}
          disabled={refreshing}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs text-[#52605A] hover:bg-[#EEF5ED] transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#006B3C]" : ""}`} />
          <span>Sync</span>
        </button>
      </div>

      {/* KPI Header */}
      <InvoiceStatsHeader dispatches={dispatches} />

      {/* Search & Filter Strip */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
          <input
            type="text"
            placeholder="Search invoice #, consignee, or GSTIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] rounded-xl border border-[#DDE5DC] text-xs text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-[#006B3C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-[#7B8580] shrink-0" />
          <select
            value={taxTypeFilter}
            onChange={(e) => setTaxTypeFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs text-[#171F1B] focus:outline-[#006B3C]"
          >
            <option value="ALL">All Tax Regimes</option>
            <option value="INTRASTATE">Intra-State (CGST + SGST)</option>
            <option value="INTERSTATE">Inter-State (IGST Only)</option>
          </select>
        </div>
      </div>

      {/* GST Invoicing Ledger */}
      <InvoiceTable
        dispatches={filteredDispatches}
        loading={loading}
        onInspect={(d) => setSelectedForDetail(d)}
        onViewPdf={(d) => setSelectedForPdf(d)}
        onDownloadPdf={handleDownloadPdf}
        downloadingId={downloadingId}
      />

      {/* Invoice Data Inspector Drawer */}
      <InvoiceDetailDrawer
        dispatch={selectedForDetail}
        isOpen={Boolean(selectedForDetail)}
        onClose={() => setSelectedForDetail(null)}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* Authenticated In-Browser PDF Stream Modal */}
      <InvoicePdfModal
        dispatch={selectedForPdf}
        isOpen={Boolean(selectedForPdf)}
        onClose={() => setSelectedForPdf(null)}
      />
    </div>
  );
}