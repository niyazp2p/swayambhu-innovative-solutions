"use client";

import React from "react";
import Link from "next/link";
import { History, SlidersHorizontal, Truck } from "lucide-react";
import { InventoryStockItem } from "@/types/inventory";
import { formatCurrency, formatMetricTon } from "@/lib/utils/formatters";

interface StockBalanceTableProps {
  items: InventoryStockItem[];
  onOpenLedger: (item: InventoryStockItem) => void;
  onOpenAdjustment: (item: InventoryStockItem) => void;
}

export function StockBalanceTable({
  items,
  onOpenLedger,
  onOpenAdjustment,
}: StockBalanceTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-12 text-center">
        <p className="text-xs font-mono text-[#7B8580] uppercase tracking-wider">
          No finished goods inventory records matched your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#DDE5DC] bg-[#FAF8F5] text-[10px] font-mono uppercase tracking-wider text-[#52605A]">
              <th className="py-3.5 px-4 font-bold">Waste Grade & Code</th>
              <th className="py-3.5 px-4 font-bold">Category</th>
              <th className="py-3.5 px-4 font-bold text-right">Available Weight</th>
              <th className="py-3.5 px-4 font-bold text-right">Bales</th>
              <th className="py-3.5 px-4 font-bold text-right">Book Value</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE5DC]/60 font-mono text-xs">
            {items.map((item) => {
              const isLowStock = Number(item.current_stock_kg) < 1000;
              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#EEF5ED]/30 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#171F1B] block">
                      {item.waste_grade_code}
                    </span>
                    <span className="text-[10px] text-[#7B8580]">
                      Updated: {new Date(item.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#EEF5ED] text-[#006B3C] border border-[#006B3C]/15 text-[10px] font-bold">
                      {item.category_name}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="font-bold text-[#171F1B] block">
                      {Number(item.current_stock_kg).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      kg
                    </span>
                    <span className="text-[10px] text-[#52605A]">
                      {formatMetricTon(item.current_stock_kg)}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold text-[#006B3C]">
                    {item.bales_in_stock}
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold text-[#171F1B]">
                    {formatCurrency(item.current_valuation_inr)}
                  </td>

                  <td className="py-3.5 px-4">
                    {isLowStock ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Available
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onOpenLedger(item)}
                        className="p-1.5 rounded-lg border border-[#DDE5DC] text-[#52605A] hover:text-[#006B3C] hover:bg-[#EEF5ED] transition-colors"
                        title="View Movement Ledger"
                      >
                        <History className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenAdjustment(item)}
                        className="p-1.5 rounded-lg border border-[#DDE5DC] text-[#52605A] hover:text-[#006B3C] hover:bg-[#EEF5ED] transition-colors"
                        title="Stock Audit / Write-off"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href={`/admin/sales/dispatch?grade_id=${item.waste_grade_id}`}
                        className="p-1.5 rounded-lg border border-[#006B3C]/30 bg-[#EEF5ED] text-[#006B3C] hover:bg-[#006B3C] hover:text-white transition-colors"
                        title="Create Outward Dispatch"
                      >
                        <Truck className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}