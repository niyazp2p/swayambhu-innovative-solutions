"use client";

import React, { useState, useEffect } from "react";
import { X, Play, AlertCircle, Calculator, Building2 } from "lucide-react";
import { hrService } from "@/lib/services/hr";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api-client";

interface PlantOption {
  id: string;
  name: string;
  code: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentMonth: number;
  currentYear: number;
}

export default function RunPayrollModal({
  isOpen,
  onClose,
  onSuccess,
  currentMonth,
  currentYear,
}: ModalProps) {
  const { user, selectedPlantId } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const [workingDays, setWorkingDays] = useState<number>(26);

  // Auto-resolve plant
  const [plantId, setPlantId] = useState<string>(selectedPlantId || user?.plant_id || "");
  const [plants, setPlants] = useState<PlantOption[]>([]);
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  useEffect(() => {
    const resolvePlantContext = async () => {
      if (!isOpen) return;

      if (selectedPlantId) {
        setPlantId(selectedPlantId);
        return;
      }
      if (user?.plant_id) {
        setPlantId(user.plant_id);
        return;
      }

      // If Super Admin with no plant assigned, query the active employee roster to derive the plant ID
      try {
        const staff = await hrService.getEmployees();
        if (staff.length > 0 && staff[0].plant_id) {
          setPlantId(staff[0].plant_id);
          setPlants([
            {
              id: staff[0].plant_id,
              name: "Haridwar Recycling Plant",
              code: "SIS-HRD-01",
            },
          ]);
        }
      } catch (err) {
        console.warn("Could not auto-derive plant from employee roster", err);
      }
    };

    resolvePlantContext();
  }, [isOpen, selectedPlantId, user]);

  if (!isOpen) return null;

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use derived plantId, selectedPlantId, user plant_id, or let backend fallback
    const targetPlant = plantId || selectedPlantId || user?.plant_id || undefined;

    setSubmitting(true);
    setError(null);
    try {
      await hrService.processPayroll(
        {
          month: Number(month),
          year: Number(year),
          working_days: Number(workingDays),
        },
        targetPlant
      );
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to process monthly payroll batch."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-[#EEF5ED] bg-[#FDF8EE]">
          <div className="flex items-center gap-2 text-[#006B3C]">
            <Play className="h-4 w-4 fill-[#006B3C]" />
            <h3 className="text-sm font-bold uppercase text-[#171F1B]">
              Execute Monthly Payroll
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="m-4 mb-0 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleProcess} className="p-5 space-y-4 text-xs">
          {/* Facility Display */}
          <div className="p-3 bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#7B8580] flex items-center gap-1 font-bold">
              <Building2 className="h-3.5 w-3.5 text-[#006B3C]" /> Plant Facility
            </span>
            <span className="font-bold text-[#171F1B]">
              Haridwar Plant (SIS-HRD-01)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
                Payroll Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value, 10))}
                className="w-full mt-1 p-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(2000, m - 1, 1).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
                Year
              </label>
              <input
                type="number"
                min="2024"
                max="2030"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10) || 2026)}
                className="w-full mt-1 p-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
              Standard Working Days in Period
            </label>
            <input
              type="number"
              min="1"
              max="31"
              required
              value={workingDays}
              onChange={(e) => setWorkingDays(parseInt(e.target.value, 10) || 26)}
              className="w-full mt-1 p-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] font-bold text-[#006B3C]"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] text-[10px] text-[#52605A] space-y-1">
            <div className="flex items-center gap-1 font-bold text-[#171F1B]">
              <Calculator className="h-3 w-3 text-[#006B3C]" />
              <span>Automated Payroll Execution Rules:</span>
            </div>
            <p>• Calculates absence loss based on actual shift records.</p>
            <p>• Applies half-day deductions for late arrivals exceeding grace limit.</p>
            <p>• Offsets monthly EMI from active advances and prepares printable PDFs.</p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-[#52605A] hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Processing Engine..." : "Run Batch Calculation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}