"use client";

import React, { useState } from "react";
import { X, AlertTriangle, ShieldCheck } from "lucide-react";
import { InventoryStockItem, StockAdjustmentPayload } from "@/types/inventory";

interface StockAdjustmentModalProps {
  item: InventoryStockItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: StockAdjustmentPayload) => Promise<void>;
}

export function StockAdjustmentModal({
  item,
  isOpen,
  onClose,
  onSubmit,
}: StockAdjustmentModalProps) {
  const [adjustedWeight, setAdjustedWeight] = useState(
    Number(item.current_stock_kg)
  );
  const [adjustedBales, setAdjustedBales] = useState(item.bales_in_stock);
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const deltaWeight = adjustedWeight - Number(item.current_stock_kg);
  const deltaBales = adjustedBales - item.bales_in_stock;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks.trim() || remarks.length < 5) {
      setError("Audit remarks must be at least 5 characters detailing physical cause.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await onSubmit({
        waste_grade_id: item.waste_grade_id,
        adjusted_weight_kg: adjustedWeight,
        adjusted_bales: adjustedBales,
        remarks: remarks.trim(),
      });
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to submit adjustment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 font-sans text-[#171F1B]">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl p-6 space-y-5">
        
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#006B3C] uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Physical Audit Adjustment</span>
            </div>
            <h2 className="text-base font-bold text-[#171F1B] mt-0.5">
              Adjust: {item.waste_grade_code}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7B8580] hover:text-[#171F1B] hover:bg-[#EEF5ED]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono text-rose-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-1">
            <div className="flex justify-between text-[#52605A]">
              <span>System Weight Balance:</span>
              <span className="font-bold text-[#171F1B]">{item.current_stock_kg} kg</span>
            </div>
            <div className="flex justify-between text-[#52605A]">
              <span>System Bales Count:</span>
              <span className="font-bold text-[#171F1B]">{item.bales_in_stock}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#52605A] uppercase mb-1">
              Verified Physical Weight (KG)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={adjustedWeight}
              onChange={(e) => setAdjustedWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDE5DC] text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            />
            <span className="text-[10px] text-[#7B8580] mt-1 block">
              Variance:{" "}
              <span className={deltaWeight < 0 ? "text-rose-600 font-bold" : "text-[#006B3C] font-bold"}>
                {deltaWeight > 0 ? `+${deltaWeight}` : deltaWeight} kg
              </span>
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#52605A] uppercase mb-1">
              Verified Physical Bales Count
            </label>
            <input
              type="number"
              min="0"
              required
              value={adjustedBales}
              onChange={(e) => setAdjustedBales(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDE5DC] text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            />
            <span className="text-[10px] text-[#7B8580] mt-1 block">
              Bales Variance:{" "}
              <span className={deltaBales < 0 ? "text-rose-600 font-bold" : "text-[#006B3C] font-bold"}>
                {deltaBales > 0 ? `+${deltaBales}` : deltaBales}
              </span>
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#52605A] uppercase mb-1">
              Audit Justification / Remarks
            </label>
            <textarea
              required
              rows={3}
              placeholder="E.g. Moisture shrinkage, broken strapping, physical recount reconciliation..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDE5DC] text-[#171F1B] focus:outline-none focus:border-[#006B3C] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-[#52605A] hover:bg-[#FAF8F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-[#006B3C] text-white font-bold hover:bg-[#063D2A] transition-colors disabled:opacity-50"
            >
              {submitting ? "Committing..." : "Commit Audit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}