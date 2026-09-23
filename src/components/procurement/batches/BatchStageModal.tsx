"use client";

import React, { useState } from "react";
import { X, Loader2, RefreshCw, AlertCircle, MapPin, Layers } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { BatchItem, BatchStage } from "@/types/procurement";

interface BatchStageModalProps {
  batch: BatchItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updatedBatch: BatchItem) => void;
}

export default function BatchStageModal({
  batch,
  isOpen,
  onClose,
  onUpdated,
}: BatchStageModalProps) {
  const [stage, setStage] = useState<BatchStage>(batch?.stage || "RAW");
  const [yardLocation, setYardLocation] = useState<string>(batch?.yard_location || "");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !batch) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await apiClient.patch<BatchItem>(`/procurement/batches/${batch.id}/stage`, {
        stage,
        yard_location: yardLocation.trim() || undefined,
      });

      onUpdated(res.data);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update batch status.");
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
              Update Batch Lifecycle
            </h3>
            <span className="text-[10px] font-mono text-[#7B8580]">
              {batch.batch_code}
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
          <div className="p-3 rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] text-xs font-mono">
            <div className="flex justify-between items-center text-[#52605A]">
              <span>Current Stored Mass:</span>
              <span className="font-bold text-[#171F1B]">{Number(batch.current_quantity_kg).toFixed(2)} kg</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold flex items-center gap-1">
              <Layers className="h-3 w-3 text-[#006B3C]" />
              <span>Lifecycle Stage</span>
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as BatchStage)}
              className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            >
              <option value="RAW">RAW (Intake Inward Yard)</option>
              <option value="SORTED">SORTED (Feeding Sorting Line)</option>
              <option value="PROCESSED_BALED">PROCESSED_BALED (Mechanical Baling)</option>
              <option value="FINISHED_GOODS">FINISHED_GOODS (Ready for Dispatch)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold flex items-center gap-1">
              <MapPin className="h-3 w-3 text-[#006B3C]" />
              <span>Yard / Bin Storage Location</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Bay-03, North Shed, Hopper 2"
              value={yardLocation}
              onChange={(e) => setYardLocation(e.target.value)}
              className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-[#EEF5ED]">
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
              className="px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Committing...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Update Batch</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}