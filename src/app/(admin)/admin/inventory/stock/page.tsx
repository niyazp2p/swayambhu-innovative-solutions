"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PackageCheck, Search, Filter, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  InventoryStockItem,
  PaginatedStockResponse,
  StockAdjustmentPayload,
} from "@/types/inventory";
import { inventoryService } from "@/lib/services/inventory";
import { StockStatsHeader } from "@/components/inventory/StockStatsHeader";
import { StockBalanceTable } from "@/components/inventory/StockBalanceTable";
import { StockAdjustmentModal } from "@/components/inventory/StockAdjustmentModal";
import { GradeMovementLedgerDrawer } from "@/components/inventory/GradeMovementLedgerDrawer";

export default function FinishedGoodsStockPage() {
  const { selectedPlantId } = useAuth();

  const [data, setData] = useState<PaginatedStockResponse>({
    total_grades: 0,
    total_stock_kg: 0,
    total_bales: 0,
    total_valuation_inr: 0,
    items: [],
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const [selectedLedgerItem, setSelectedLedgerItem] =
    useState<InventoryStockItem | null>(null);
  const [selectedAdjustmentItem, setSelectedAdjustmentItem] =
    useState<InventoryStockItem | null>(null);

  const fetchStock = useCallback(async () => {
    try {
      setLoading(true);
      const res = await inventoryService.getCurrentStock({
        plant_id: selectedPlantId || undefined,
        search: search || undefined,
        category: category === "ALL" ? undefined : category,
      });
      setData(res);
    } catch (err) {
      console.error("Failed to load inventory stock", err);
    } finally {
      setLoading(false);
    }
  }, [selectedPlantId, search, category]);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  const handleAdjustmentSubmit = async (payload: StockAdjustmentPayload) => {
    await inventoryService.adjustStock(payload, selectedPlantId || undefined);
    await fetchStock();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-[#171F1B] selection:bg-[#006B3C] selection:text-white pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#006B3C] uppercase font-bold tracking-widest">
            <PackageCheck className="w-4 h-4" />
            <span>MRF Plant Floor Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063D2A] uppercase tracking-tight mt-1">
            Finished Goods Stock Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#52605A] font-sans mt-0.5">
            Real-time finished goods baled inventory, valuation, and audited stock movement passbook.
          </p>
        </div>

        <button
          onClick={fetchStock}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:text-[#063D2A] hover:bg-[#EEF5ED] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#006B3C]" : ""}`} />
          <span>Sync Floor Stock</span>
        </button>
      </div>

      {/* KPI HUD Strip */}
      <StockStatsHeader
        totalStockKg={Number(data.total_stock_kg)}
        totalBales={data.total_bales}
        totalValuationInr={Number(data.total_valuation_inr)}
        totalGrades={data.total_grades}
      />

      {/* Search and Category Filtering Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
          <input
            type="text"
            placeholder="Search grade code (e.g. PET, HDPE, PP)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-none focus:border-[#006B3C] shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-[#7B8580] shrink-0" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C] shadow-xs cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Plastic">Plastics (Rigid/Flexible)</option>
            <option value="Paper">Paper & Cardboard</option>
            <option value="Metal">Ferrous / Non-Ferrous</option>
            <option value="Glass">Glass Cullet</option>
          </select>
        </div>
      </div>

      {/* Main Stock Table */}
      <StockBalanceTable
        items={data.items}
        onOpenLedger={(item) => setSelectedLedgerItem(item)}
        onOpenAdjustment={(item) => setSelectedAdjustmentItem(item)}
      />

      {/* Stock Adjustment Modal */}
      {selectedAdjustmentItem && (
        <StockAdjustmentModal
          item={selectedAdjustmentItem}
          isOpen={!!selectedAdjustmentItem}
          onClose={() => setSelectedAdjustmentItem(null)}
          onSubmit={handleAdjustmentSubmit}
        />
      )}

      {/* Movement Ledger Audit Drawer */}
      {selectedLedgerItem && (
        <GradeMovementLedgerDrawer
          item={selectedLedgerItem}
          isOpen={!!selectedLedgerItem}
          onClose={() => setSelectedLedgerItem(null)}
          plantId={selectedPlantId || undefined}
        />
      )}
    </div>
  );
}