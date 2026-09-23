"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Scale, 
  Truck, 
  User, 
  Layers, 
  Percent, 
  AlertOctagon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  History,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Clock
} from "lucide-react";
import { procurementService } from "@/lib/services/procurement";
import { calculateLiveGRN } from "@/lib/utils/procurement-calculations";
import { Vendor, WasteGrade, GRNRecord } from "@/types/procurement";

export default function WeighbridgeGRNPage() {
  // Master state
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [grades, setGrades] = useState<WasteGrade[]>([]);
  const [grnList, setGrnList] = useState<GRNRecord[]>([]);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Notifications
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [vendorId, setVendorId] = useState<string>("");
  const [wasteGradeId, setWasteGradeId] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [grossWeight, setGrossWeight] = useState<string>("");
  const [tareWeight, setTareWeight] = useState<string>("");
  const [moisturePercentage, setMoisturePercentage] = useState<string>("0");
  const [contaminationKg, setContaminationKg] = useState<string>("0");
  const [isManualOverride, setIsManualOverride] = useState<boolean>(false);
  const [overrideReason, setOverrideReason] = useState<string>("");

  // Fetch initial dependencies
  const loadData = async () => {
    try {
      setLoadingInitial(true);
      const [fetchedVendors, fetchedGrades, fetchedGRNs] = await Promise.all([
        procurementService.getVendors(),
        procurementService.getGrades(),
        procurementService.getGRNList(),
      ]);
      setVendors(fetchedVendors.filter((v) => v.is_active));
      setGrades(fetchedGrades.filter((g) => g.is_active));
      setGrnList(fetchedGRNs);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.response?.data?.detail || "Failed to load weighbridge master records.",
      });
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Selected grade rate per kg
  const selectedGrade = useMemo(() => {
    return grades.find((g) => g.id === wasteGradeId) || null;
  }, [wasteGradeId, grades]);

  // Live Formula Calculations
  const calculations = useMemo(() => {
    const gross = parseFloat(grossWeight) || 0;
    const tare = parseFloat(tareWeight) || 0;
    const moisture = parseFloat(moisturePercentage) || 0;
    const contamination = parseFloat(contaminationKg) || 0;
    const rate = selectedGrade ? Number(selectedGrade.current_rate_per_kg) : 0;

    return calculateLiveGRN(gross, tare, moisture, contamination, rate);
  }, [grossWeight, tareWeight, moisturePercentage, contaminationKg, selectedGrade]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!vendorId || !wasteGradeId || !vehicleNumber) {
      setFeedback({ type: "error", message: "Please complete all mandatory intake fields." });
      return;
    }

    if (!calculations.isValid) {
      setFeedback({ 
        type: "error", 
        message: calculations.error || "Please verify gross and tare weight values." 
      });
      return;
    }

    if (isManualOverride && !overrideReason.trim()) {
      setFeedback({ 
        type: "error", 
        message: "An audit reason is required when manual override is enabled." 
      });
      return;
    }

    setSubmitting(true);
    try {
      await procurementService.createGRN({
        vendor_id: vendorId,
        waste_grade_id: wasteGradeId,
        vehicle_number: vehicleNumber.toUpperCase().trim(),
        gross_weight: parseFloat(grossWeight),
        tare_weight: parseFloat(tareWeight),
        moisture_percentage: parseFloat(moisturePercentage) || 0,
        contamination_deduction_kg: parseFloat(contaminationKg) || 0,
        is_manual_override: isManualOverride,
        override_reason: isManualOverride ? overrideReason.trim() : undefined,
      });

      setFeedback({ type: "success", message: "GRN logged successfully. Raw batch initialized." });
      
      // Reset input form
      setVehicleNumber("");
      setGrossWeight("");
      setTareWeight("");
      setMoisturePercentage("0");
      setContaminationKg("0");
      setIsManualOverride(false);
      setOverrideReason("");

      // Refresh recent intake log
      const updatedList = await procurementService.getGRNList();
      setGrnList(updatedList);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.response?.data?.detail || "Failed to record inward intake GRN.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#006B3C] uppercase font-bold tracking-widest">
            <Scale className="w-4 h-4" />
            <span>Operational Intake Module</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Weighbridge Logging (GRN)
          </h1>
          <p className="text-xs sm:text-sm text-[#52605A] font-sans mt-0.5">
            Capture inward gross/tare weights, deduct moisture/contamination, and generate Goods Receipt Notes.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loadingInitial}
          className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono font-medium text-[#171F1B] hover:bg-[#EEF5ED] transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingInitial ? "animate-spin" : ""}`} />
          <span>Sync Master Data</span>
        </button>
      </div>

      {/* Alerts */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-xs font-mono ${
            feedback.type === "success"
              ? "bg-[#EEF5ED] border border-[#006B3C]/30 text-[#006B3C]"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Intake Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Intake Entry Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-2xl border border-[#DDE5DC] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="border-b border-[#EEF5ED] pb-3">
            <h2 className="text-sm font-bold text-[#171F1B] uppercase font-mono tracking-wider">
              Consignment Weigh-in Entry
            </h2>
            <p className="text-[11px] text-[#7B8580] font-mono">
              Haridwar MRF Scale Node #01
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vendor Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#006B3C]" />
                <span>Vendor / Collector</span>
              </label>
              <select
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                required
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2.5 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              >
                <option value="">Select Registered Vendor</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.vendor_type})
                  </option>
                ))}
              </select>
            </div>

            {/* Waste Grade Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#006B3C]" />
                <span>Waste Classification</span>
              </label>
              <select
                value={wasteGradeId}
                onChange={(e) => setWasteGradeId(e.target.value)}
                required
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2.5 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              >
                <option value="">Select Scrap Grade</option>
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.grade_code} - {g.category_name} (₹{Number(g.current_rate_per_kg).toFixed(2)}/kg)
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Number */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#006B3C]" />
                <span>Vehicle Registration Plate</span>
              </label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
                placeholder="e.g. UK08AB1234 / DL01AA9999"
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2.5 text-xs font-mono uppercase text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            {/* Gross Weight */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Gross Weight (kg)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={grossWeight}
                onChange={(e) => setGrossWeight(e.target.value)}
                required
                placeholder="0.00"
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2.5 text-xs font-mono text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            {/* Tare Weight */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Tare Weight (kg)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={tareWeight}
                onChange={(e) => setTareWeight(e.target.value)}
                required
                placeholder="0.00"
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2.5 text-xs font-mono text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            {/* Moisture Deduction */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold flex items-center gap-1.5">
                <Percent className="w-3 h-3 text-[#006B3C]" />
                <span>Moisture (%)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={moisturePercentage}
                onChange={(e) => setMoisturePercentage(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2.5 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            {/* Contamination Deduction */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold flex items-center gap-1.5">
                <AlertOctagon className="w-3 h-3 text-[#006B3C]" />
                <span>Contamination (kg)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={contaminationKg}
                onChange={(e) => setContaminationKg(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2.5 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>
          </div>

          {/* Audit & Manual Override Toggle */}
          <div className="pt-2 border-t border-[#EEF5ED] space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="manual_override"
                checked={isManualOverride}
                onChange={(e) => setIsManualOverride(e.target.checked)}
                className="rounded border-[#DDE5DC] text-[#006B3C] focus:ring-[#006B3C]"
              />
              <label htmlFor="manual_override" className="text-xs font-mono font-bold text-[#52605A] flex items-center gap-1 cursor-pointer">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Flag Manual Override & Discrepancy</span>
              </label>
            </div>

            {isManualOverride && (
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#7B8580] font-bold">
                  Override Justification (Required for Audit)
                </label>
                <textarea
                  rows={2}
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  placeholder="State reason for weight or quality deduction variance..."
                  className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] p-2.5 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
                />
              </div>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-[#FDF8EE] text-xs font-mono uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Recording Goods Receipt Note...</span>
              </>
            ) : (
              <>
                <span>Commit GRN & Raw Intake</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Right Column: Live Computation HUD */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#063D2A] text-[#FDF8EE] rounded-2xl p-5 sm:p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#88C34A] font-bold">
                Telemetry Preview
              </span>
              <span className="text-xs font-mono text-[#DDE5DC]">
                Rate: ₹{selectedGrade ? Number(selectedGrade.current_rate_per_kg).toFixed(2) : "0.00"}/kg
              </span>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#DDE5DC]/70">Net Weight (Gross - Tare):</span>
                <span className="font-bold text-white">{calculations.net_weight.toFixed(2)} kg</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#DDE5DC]/70">Moisture Loss:</span>
                <span className="text-amber-300">-{calculations.moisture_deduction_kg.toFixed(2)} kg</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#DDE5DC]/70">Contamination Loss:</span>
                <span className="text-amber-300">-{parseFloat(contaminationKg || "0").toFixed(2)} kg</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-sm">
                <span className="text-[#88C34A] font-bold">Accepted Net Weight:</span>
                <span className="text-white font-black">{calculations.accepted_net_weight.toFixed(2)} kg</span>
              </div>
            </div>

            {/* Payable Summary Box */}
            <div className="rounded-xl bg-white/[0.08] p-4 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-[#DDE5DC]/70 uppercase tracking-widest block">
                Total Payable Amount
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                ₹{calculations.total_payable_amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#DDE5DC] p-4 shadow-xs text-xs font-mono text-[#52605A] space-y-2">
            <div className="font-bold text-[#171F1B] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#006B3C]" />
              <span>Intake Pipeline Rule</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every committed GRN instantly instantiates a corresponding <span className="font-bold text-[#006B3C]">RAW batch</span> in the warehouse ledger, reserving material ready for the sorting line.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent GRN Records */}
      <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#DDE5DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#006B3C]" />
            <h3 className="text-sm font-bold text-[#171F1B] uppercase font-mono tracking-wider">
              Recent Inward Intake History
            </h3>
          </div>
          <span className="text-xs font-mono text-[#7B8580]">
            {grnList.length} Total Receipts
          </span>
        </div>

        <div className="overflow-x-auto">
  <table className="w-full text-left text-xs font-mono">
    <thead className="bg-[#EEF5ED] text-[#52605A] uppercase border-b border-[#DDE5DC]">
      <tr>
        <th className="py-3 px-4">GRN #</th>
        <th className="py-3 px-4">Timestamp</th>
        <th className="py-3 px-4">Vehicle</th>
        <th className="py-3 px-4 text-right">Net Intake</th>
        <th className="py-3 px-4 text-right">Accepted Wt</th>
        <th className="py-3 px-4 text-right">Rate</th>
        <th className="py-3 px-4 text-right">Total (₹)</th>
        <th className="py-3 px-4 text-center">Settlement</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
      {grnList.length === 0 ? (
        <tr>
          <td colSpan={8} className="py-8 text-center text-[#7B8580]">
            No inward goods receipts recorded yet.
          </td>
        </tr>
      ) : (
        grnList.slice(0, 10).map((record) => (
          <tr key={record.id} className="hover:bg-[#FDF8EE] transition-colors">
            <td className="py-3 px-4 font-bold text-[#006B3C]">{record.grn_number}</td>
            <td className="py-3 px-4 text-[#7B8580]">
              {new Date(record.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td className="py-3 px-4 font-semibold">{record.vehicle_number}</td>
            <td className="py-3 px-4 text-right">{Number(record.net_weight).toFixed(2)} kg</td>
            <td className="py-3 px-4 text-right font-bold text-[#006B3C]">
              {Number(record.accepted_net_weight).toFixed(2)} kg
            </td>
            <td className="py-3 px-4 text-right">₹{Number(record.rate_per_kg).toFixed(2)}</td>
            <td className="py-3 px-4 text-right font-black">
              ₹{Number(record.total_payable_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </td>
            <td className="py-3 px-4 text-center">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  record.payment_status === "PAID"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : record.payment_status === "PARTIAL"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {record.payment_status || "UNPAID"}
              </span>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
          
      </div>
    </div>
  );
}