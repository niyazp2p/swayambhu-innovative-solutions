"use client";

import React, { useState } from "react";
import { X, Plus, AlertTriangle } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { DowntimeReason, DowntimeLogResponse } from "@/types/operations";

interface DowntimeLogModalProps {
  isOpen: boolean;
  plantId?: string;
  onClose: () => void;
  onSuccess: (newLog: DowntimeLogResponse) => void;
}

export function DowntimeLogModal({
  isOpen,
  plantId,
  onClose,
  onSuccess,
}: DowntimeLogModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reason, setReason] = useState<DowntimeReason>(DowntimeReason.MACHINE_BREAKDOWN);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [equipmentName, setEquipmentName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (durationMinutes <= 0) {
      setError("Duration must be greater than 0 minutes.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const query = plantId ? `?plant_id=${plantId}` : "";
      const res = await apiClient.post<DowntimeLogResponse>(`/operations/downtime${query}`, {
        reason,
        duration_minutes: Number(durationMinutes),
        equipment_name: equipmentName || undefined,
        description: description || undefined,
      });

      onSuccess(res.data);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to record machine stoppage.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-[#DDE5DC] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-[#DDE5DC] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#006B3C] font-bold">
              Rapid Stoppage Logging
            </span>
            <h3 className="text-lg font-bold text-[#063D2A]">Record Standalone Downtime</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#EEF5ED] text-[#52605A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="m-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 space-y-4 font-sans text-xs">
          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1 font-bold">
              Root Cause Category *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as DowntimeReason)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] font-mono bg-white focus:outline-[#006B3C]"
            >
              {Object.values(DowntimeReason).map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#52605A] block mb-1 font-bold">
                Stoppage Duration (Mins) *
              </label>
              <input
                type="number"
                min="1"
                value={durationMinutes || ""}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] font-mono focus:outline-[#006B3C]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#52605A] block mb-1 font-bold">
                Equipment Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Baler #02, Conveyor A"
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] font-mono focus:outline-[#006B3C]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1 font-bold">
              Maintenance / Incident Observations
            </label>
            <textarea
              rows={3}
              placeholder="Detail mechanical breakdown, power grid trip, or parts replacement needed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] font-sans focus:outline-[#006B3C]"
            />
          </div>

          <div className="pt-3 border-t border-[#DDE5DC] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] font-mono text-[#52605A] hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{submitting ? "Logging..." : "Log Incident"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}