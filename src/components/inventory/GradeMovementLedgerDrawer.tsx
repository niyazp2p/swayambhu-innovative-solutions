"use client";

import React, { useEffect, useState } from "react";
import { X, ArrowDownLeft, ArrowUpRight, RotateCcw, ShieldAlert } from "lucide-react";
import { InventoryStockItem, StockLedgerEntry } from "@/types/inventory";
import { inventoryService } from "@/lib/services/inventory";

interface GradeMovementLedgerDrawerProps {
  item: InventoryStockItem;
  isOpen: boolean;
  onClose: () => void;
  plantId?: string;
}

export function GradeMovementLedgerDrawer({
  item,
  isOpen,
  onClose,
  plantId,
}: GradeMovementLedgerDrawerProps) {
  const [ledger, setLedger] = useState<StockLedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && item) {
      setLoading(true);
      inventoryService
        .getGradeLedger(item.waste_grade_id, { plant_id: plantId, limit: 50 })
        .then(setLedger)
        .catch((err) => console.error("Error fetching ledger", err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, item, plantId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs font-sans text-[#171F1B]">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#DDE5DC]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#DDE5DC] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#006B3C]">
              Passbook Audit Ledger
            </span>
            <h3 className="text-base font-bold text-[#171F1B] mt-0.5">
              {item.waste_grade_code} Movements
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7B8580] hover:text-[#171F1B] hover:bg-[#EEF5ED]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ledger Movement Flow */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#DDE5DC]/60 font-mono">
          {loading ? (
            <div className="py-12 text-center text-xs text-[#7B8580]">
              Loading balance passbook...
            </div>
          ) : ledger.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#7B8580]">
              No transactions logged for this waste grade yet.
            </div>
          ) : (
            ledger.map((entry) => {
              const isInflow = Number(entry.delta_weight_kg) > 0;
              return (
                <div key={entry.id} className="py-3.5 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold">
                      {entry.movement_type === "PRODUCTION_INFLOW" && (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-[#006B3C]" />
                      )}
                      {entry.movement_type === "DISPATCH_OUTFLOW" && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      {(entry.movement_type === "STOCK_ADJUSTMENT" ||
                        entry.movement_type === "AUDIT_RECONCILIATION") && (
                        <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span className="text-[#171F1B]">{entry.movement_type}</span>
                    </div>

                    <span
                      className={`font-black ${
                        isInflow ? "text-[#006B3C]" : "text-rose-600"
                      }`}
                    >
                      {isInflow ? `+${entry.delta_weight_kg}` : entry.delta_weight_kg} kg
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#7B8580]">
                    <span>
                      {new Date(entry.created_at).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                    <span>
                      Balance: <strong className="text-[#171F1B]">{entry.balance_weight_kg} kg</strong>
                    </span>
                  </div>

                  {entry.remarks && (
                    <p className="text-[10px] text-[#52605A] italic bg-[#FAF8F5] p-1.5 rounded-lg border border-[#DDE5DC]/50 mt-1">
                      {entry.remarks}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DDE5DC] bg-[#FAF8F5] text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono font-bold text-[#171F1B] hover:bg-[#EEF5ED]"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
}