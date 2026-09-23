"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  Scale, 
  Activity, 
  Zap, 
  AlertTriangle 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { operationsService } from "@/lib/services/operations";
import { procurementService } from "@/lib/services/procurement";
import { DowntimeReason, ProductionLogItem, DowntimeLogItem } from "@/types/operations";
import { WasteGrade } from "@/types/procurement";

export default function NewDPRPage() {
  const router = useRouter();
  const { selectedPlantId } = useAuth();

  const [grades, setGrades] = useState<WasteGrade[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Master DPR Form State
  const [reportDate, setReportDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [rawProcessed, setRawProcessed] = useState<number>(0);
  const [inertWaste, setInertWaste] = useState<number>(0);
  const [electricity, setElectricity] = useState<number>(0);
  const [diesel, setDiesel] = useState<number>(0);
  const [strappingWire, setStrappingWire] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>("");

  // Nested Dynamic Arrays
  const [productionItems, setProductionItems] = useState<ProductionLogItem[]>([]);
  const [downtimeLogs, setDowntimeLogs] = useState<DowntimeLogItem[]>([]);

  useEffect(() => {
    // Load available grades for output selection
    procurementService.getGrades().then((data) => setGrades(data || []));
  }, []);

  // Live Mass Balance Computations
  const totalOutput = productionItems.reduce(
    (acc, curr) => acc + (Number(curr.output_weight_kg) || 0),
    0
  );
  const totalInert = Number(inertWaste) || 0;
  const massBalanceVariance = (Number(rawProcessed) || 0) - (totalOutput + totalInert);
  const recoveryEfficiency =
    rawProcessed > 0 ? ((totalOutput / rawProcessed) * 100).toFixed(1) : "0.0";

  // Production item actions
  const addProductionItem = () => {
    if (grades.length === 0) return;
    setProductionItems([
      ...productionItems,
      { waste_grade_id: grades[0].id, output_weight_kg: 0, bales_produced: 0 },
    ]);
  };

  const updateProductionItem = (index: number, field: keyof ProductionLogItem, value: any) => {
    const updated = [...productionItems];
    updated[index] = { ...updated[index], [field]: value };
    setProductionItems(updated);
  };

  const removeProductionItem = (index: number) => {
    setProductionItems(productionItems.filter((_, i) => i !== index));
  };

  // Downtime item actions
  const addDowntimeItem = () => {
    setDowntimeLogs([
      ...downtimeLogs,
      { reason: DowntimeReason.MAINTENANCE, duration_minutes: 15, description: "" },
    ]);
  };

  const updateDowntimeItem = (index: number, field: keyof DowntimeLogItem, value: any) => {
    const updated = [...downtimeLogs];
    updated[index] = { ...updated[index], [field]: value };
    setDowntimeLogs(updated);
  };

  const removeDowntimeItem = (index: number) => {
    setDowntimeLogs(downtimeLogs.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rawProcessed <= 0) {
      setErrorMessage("Raw processed weight must be greater than 0 kg.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      await operationsService.createDPR(
        {
          report_date: reportDate,
          electricity_kwh: Number(electricity),
          diesel_liters: Number(diesel),
          strapping_wire_kg: Number(strappingWire),
          total_raw_processed_kg: Number(rawProcessed),
          total_inert_waste_kg: Number(inertWaste),
          remarks: remarks || undefined,
          production_items: productionItems.map((p) => ({
            waste_grade_id: p.waste_grade_id,
            output_weight_kg: Number(p.output_weight_kg),
            bales_produced: Number(p.bales_produced),
          })),
          downtime_logs: downtimeLogs.map((d) => ({
            reason: d.reason,
            duration_minutes: Number(d.duration_minutes),
            equipment_name: d.equipment_name || undefined,
            description: d.description || undefined,
          })),
        },
        selectedPlantId || undefined
      );

      router.push("/admin/operations/dpr");
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.detail || "Failed to submit Daily Progress Report."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/operations/dpr"
            className="p-2 rounded-xl border border-[#DDE5DC] hover:bg-[#EEF5ED] text-[#063D2A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#006B3C] font-bold">
              Factory Operational Log
            </span>
            <h1 className="text-2xl font-black text-[#063D2A]">Submit Daily Report (DPR)</h1>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? "Committing..." : "Submit Shift Log"}</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-[#FFF8E6] border border-[#FCD34D] text-[#92400E] text-xs font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Live Mass Balance Telemetry HUD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE5DC]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#006B3C]" />
            Real-Time Mass Balance Verification
          </span>
          <span className="text-[10px] font-mono text-[#7B8580]">
            Formula: Raw = Output + Inert + Variance
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
          <div>
            <span className="text-[10px] font-mono text-[#52605A] uppercase block">
              Raw Intake (kg)
            </span>
            <span className="text-xl font-mono font-bold text-[#171F1B]">
              {Number(rawProcessed).toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#52605A] uppercase block">
              Output Produced (kg)
            </span>
            <span className="text-xl font-mono font-bold text-[#006B3C]">
              {Number(totalOutput).toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#52605A] uppercase block">
              Yield Efficiency
            </span>
            <span className="text-xl font-mono font-bold text-[#171F1B]">
              {recoveryEfficiency}%
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#52605A] uppercase block">
              Process Variance (Loss)
            </span>
            <span
              className={`text-xl font-mono font-bold ${
                massBalanceVariance < 0 ? "text-red-600" : "text-[#171F1B]"
              }`}
            >
              {massBalanceVariance.toFixed(1)} kg
            </span>
          </div>
        </div>
      </div>

      {/* 2. Core Operational Metrics */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDE5DC] space-y-4 shadow-xs">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A]">
          1. Shift Header & Inward Feedstock
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1">
              Report Date *
            </label>
            <input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-[#006B3C]"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1">
              Total Raw Processed (kg) *
            </label>
            <input
              type="number"
              step="0.01"
              value={rawProcessed || ""}
              onChange={(e) => setRawProcessed(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 4000.00"
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-[#006B3C]"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1">
              Total Inert / Reject Waste (kg)
            </label>
            <input
              type="number"
              step="0.01"
              value={inertWaste || ""}
              onChange={(e) => setInertWaste(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 350.00"
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-[#006B3C]"
            />
          </div>
        </div>
      </div>

      {/* 3. Production Outputs & Bales Produced */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDE5DC] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A]">
              2. Production Outputs (Finished Goods)
            </h3>
            <span className="text-[10px] font-mono text-[#7B8580]">
              Posting automatically increments warehouse stock balances.
            </span>
          </div>

          <button
            type="button"
            onClick={addProductionItem}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EEF5ED] hover:bg-[#DDE5DC] text-[#006B3C] text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Output Grade</span>
          </button>
        </div>

        {productionItems.length === 0 ? (
          <div className="p-6 text-center text-xs font-mono text-[#7B8580] bg-[#F7FAF7] rounded-xl border border-dashed border-[#DDE5DC]">
            No production output items added yet. Click &ldquo;Add Output Grade&rdquo; to record baled stock.
          </div>
        ) : (
          <div className="space-y-3">
            {productionItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl bg-[#F7FAF7] border border-[#DDE5DC]"
              >
                <div className="col-span-5">
                  <label className="text-[10px] font-mono text-[#7B8580] block mb-1">
                    Waste Grade
                  </label>
                  <select
                    value={item.waste_grade_id}
                    onChange={(e) => updateProductionItem(idx, "waste_grade_id", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                  >
                    {grades.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.grade_code} - {g.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="text-[10px] font-mono text-[#7B8580] block mb-1">
                    Output Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.output_weight_kg || ""}
                    onChange={(e) =>
                      updateProductionItem(idx, "output_weight_kg", parseFloat(e.target.value) || 0)
                    }
                    placeholder="Output kg"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                    required
                  />
                </div>

                <div className="col-span-3">
                  <label className="text-[10px] font-mono text-[#7B8580] block mb-1">
                    Bales Produced
                  </label>
                  <input
                    type="number"
                    value={item.bales_produced || ""}
                    onChange={(e) =>
                      updateProductionItem(idx, "bales_produced", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="Count"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                    required
                  />
                </div>

                <div className="col-span-1 flex justify-end pt-5">
                  <button
                    type="button"
                    onClick={() => removeProductionItem(idx)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Machine Downtime Logs */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDE5DC] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A]">
            3. Shift Stoppages & Downtime
          </h3>
          <button
            type="button"
            onClick={addDowntimeItem}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFF8E6] hover:bg-[#FDE68A] text-[#92400E] text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stoppage</span>
          </button>
        </div>

        {downtimeLogs.length === 0 ? (
          <div className="p-4 text-center text-xs font-mono text-[#7B8580] bg-[#F7FAF7] rounded-xl border border-dashed border-[#DDE5DC]">
            No stoppages logged for this shift. Continuous line operations assumed.
          </div>
        ) : (
          <div className="space-y-3">
            {downtimeLogs.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl bg-[#F7FAF7] border border-[#DDE5DC]"
              >
                <div className="col-span-4">
                  <label className="text-[10px] font-mono text-[#7B8580] block mb-1">
                    Primary Reason
                  </label>
                  <select
                    value={item.reason}
                    onChange={(e) => updateDowntimeItem(idx, "reason", e.target.value as DowntimeReason)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                  >
                    {Object.values(DowntimeReason).map((r) => (
                      <option key={r} value={r}>
                        {r.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="text-[10px] font-mono text-[#7B8580] block mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={item.duration_minutes || ""}
                    onChange={(e) =>
                      updateDowntimeItem(idx, "duration_minutes", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="Mins"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                    required
                  />
                </div>

                <div className="col-span-4">
                  <label className="text-[10px] font-mono text-[#7B8580] block mb-1">
                    Equipment / Description
                  </label>
                  <input
                    type="text"
                    value={item.description || ""}
                    onChange={(e) => updateDowntimeItem(idx, "description", e.target.value)}
                    placeholder="e.g. Hydraulic Baler belt fault"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                  />
                </div>

                <div className="col-span-1 flex justify-end pt-5">
                  <button
                    type="button"
                    onClick={() => removeDowntimeItem(idx)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Consumables & Utilities */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDE5DC] space-y-4 shadow-xs">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#063D2A]">
          4. Utilities & Consumables Logged
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1">
              Electricity (kWh)
            </label>
            <input
              type="number"
              step="0.01"
              value={electricity || ""}
              onChange={(e) => setElectricity(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 340.50"
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-[#006B3C]"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1">
              Diesel (Liters)
            </label>
            <input
              type="number"
              step="0.01"
              value={diesel || ""}
              onChange={(e) => setDiesel(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 45.00"
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-[#006B3C]"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#52605A] block mb-1">
              Strapping Wire (kg)
            </label>
            <input
              type="number"
              step="0.01"
              value={strappingWire || ""}
              onChange={(e) => setStrappingWire(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 18.20"
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-[#006B3C]"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-mono text-[#52605A] block mb-1">
            Supervisor Remarks
          </label>
          <textarea
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Operational notes, shift capacity remarks, moisture conditions..."
            className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-[#006B3C]"
          />
        </div>
      </div>
    </form>
  );
}