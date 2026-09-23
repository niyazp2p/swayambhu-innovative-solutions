"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Search, RefreshCw, Filter } from "lucide-react";
import { Buyer, BuyerCreatePayload, BuyerUpdatePayload } from "@/types/sales";
import { salesService } from "@/lib/services/sales";
import { BuyerStatsHeader } from "@/components/sales/buyers/BuyerStatsHeader";
import { BuyerTable } from "@/components/sales/buyers/BuyerTable";
import { BuyerCreateModal } from "@/components/sales/buyers/BuyerCreateModal";
import { BuyerDetailModal } from "@/components/sales/buyers/BuyerDetailModal";
import { BuyerEditModal } from "@/components/sales/buyers/BuyerEditModal";

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ACTIVE");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null);

  const fetchBuyers = useCallback(async () => {
    try {
      setRefreshing(true);
      const data = await salesService.getBuyers({
        is_active: statusFilter === "ALL" ? undefined : statusFilter === "ACTIVE",
      });
      setBuyers(data);
    } catch (err) {
      console.error("Failed to fetch buyers", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchBuyers();
  }, [fetchBuyers]);

  // Client-side search filtering
  const filteredBuyers = useMemo(() => {
    const q = search.toLowerCase().trim();
    return buyers.filter((b) => {
      return (
        !q ||
        b.name.toLowerCase().includes(q) ||
        (b.gstin && b.gstin.toLowerCase().includes(q)) ||
        (b.contact_phone && b.contact_phone.includes(q)) ||
        (b.contact_person && b.contact_person.toLowerCase().includes(q))
      );
    });
  }, [buyers, search]);

  const handleCreateBuyer = async (payload: BuyerCreatePayload) => {
    const created = await salesService.createBuyer(payload);
    setBuyers((prev) => [created, ...prev]);
  };

  const handleUpdateBuyer = async (buyerId: string, payload: BuyerUpdatePayload) => {
    const updated = await salesService.updateBuyer(buyerId, payload);
    setBuyers((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#006B3C] font-bold">
            Customer Directory & Statutory Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Offtaker Buyers
          </h1>
          <p className="text-xs text-[#52605A] mt-0.5">
            Manage recyclers, FMCG brand owners, and statutory billing details for GST invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchBuyers}
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
            <span>Add Offtaker</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <BuyerStatsHeader buyers={buyers} />

      {/* Search & Status Filters */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
          <input
            type="text"
            placeholder="Search company, GSTIN, or representative..."
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
            <option value="ACTIVE">Active Purchasers</option>
            <option value="ALL">All Offtakers</option>
          </select>
        </div>
      </div>

      {/* Buyers Data Table */}
      <BuyerTable
        buyers={filteredBuyers}
        loading={loading}
        onView={(b) => setSelectedBuyer(b)}
        onEdit={(b) => setEditingBuyer(b)}
      />

      {/* Create Modal */}
      <BuyerCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateBuyer}
      />

      {/* Detail Inspector Modal */}
      <BuyerDetailModal
        buyer={selectedBuyer}
        isOpen={Boolean(selectedBuyer)}
        onClose={() => setSelectedBuyer(null)}
        onEdit={(b) => setEditingBuyer(b)}
      />

      {/* Edit Profile Modal */}
      <BuyerEditModal
        buyer={editingBuyer}
        isOpen={Boolean(editingBuyer)}
        onClose={() => setEditingBuyer(null)}
        onSubmit={handleUpdateBuyer}
      />
    </div>
  );
}