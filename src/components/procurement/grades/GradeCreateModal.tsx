"use client";

import React, { useState } from "react";
import { X, Loader2, Plus, AlertCircle } from "lucide-react";
import { procurementService } from "@/lib/services/procurement";
import { DeductionMethod, WasteGrade } from "@/types/procurement";

interface GradeCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGradeCreated: (createdGrade: WasteGrade) => void;
}

export default function GradeCreateModal({
  isOpen,
  onClose,
  onGradeCreated,
}: GradeCreateModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [gradeCode, setGradeCode] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [deductionMethod, setDeductionMethod] = useState<DeductionMethod>("FLAT_PERCENTAGE");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numericRate = parseFloat(currentRate);
    if (!categoryName.trim() || !gradeCode.trim() || isNaN(numericRate) || numericRate <= 0) {
      setError("Please provide a valid grade code, category, and a rate greater than zero.");
      return;
    }

    try {
      setSubmitting(true);
      const newGrade = await procurementService.createGrade({
        category_name: categoryName.trim(),
        grade_code: gradeCode.trim().toUpperCase(),
        current_rate_per_kg: numericRate,
        deduction_method: deductionMethod,
      });

      onGradeCreated(newGrade);
      onClose();
      // Reset
      setCategoryName("");
      setGradeCode("");
      setCurrentRate("");
      setDeductionMethod("FLAT_PERCENTAGE");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create waste grade definition.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-[#EEF5ED]">
          <div>
            <h3 className="text-sm font-bold uppercase font-mono text-[#171F1B]">
              New Waste Grade Definition
            </h3>
            <span className="text-[10px] font-mono text-[#7B8580]">
              Adds catalog pricing & deduction rule
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED] hover:text-[#171F1B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
              Waste Category Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rigid Plastic, Ferrous Scrap"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
              Grade Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HDPE, PET-CLEAR, PP"
              value={gradeCode}
              onChange={(e) => setGradeCode(e.target.value)}
              className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono uppercase text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
              Base Rate (₹ / kg)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              placeholder="0.00"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
              className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
              Default Deduction Method
            </label>
            <select
              value={deductionMethod}
              onChange={(e) => setDeductionMethod(e.target.value as DeductionMethod)}
              className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            >
              <option value="FLAT_PERCENTAGE">FLAT_PERCENTAGE (Moisture % + Contamination)</option>
              <option value="SLAB">SLAB (Graduated Moisture Table)</option>
              <option value="MANUAL_ASSESSMENT">MANUAL_ASSESSMENT (Operator Judgement)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-[#EEF5ED] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Grade</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}