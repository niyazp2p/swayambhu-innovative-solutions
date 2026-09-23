"use client";

import React, { useState, useMemo } from "react";
import { X, Truck, Loader2, ArrowRight, ShieldAlert, Scale, DollarSign } from "lucide-react";
import { Buyer, DispatchOrderCreatePayload } from "@/types/sales";
import { WasteGrade } from "@/types/procurement";
import { calculateLiveDispatch } from "@/lib/utils/sales-calculations";

interface CreateDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: DispatchOrderCreatePayload) => Promise<void>;
  buyers: Buyer[];
  grades: WasteGrade[];
}

export function CreateDispatchModal({
  isOpen,
  onClose,
  onSubmit,
  buyers,
  grades,
}: CreateDispatchModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [buyerId, setBuyerId] = useState("");
  const [wasteGradeId, setWasteGradeId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [ewayBillNumber, setEwayBillNumber] = useState("");
  const [tareWeight, setTareWeight] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [balesCount, setBalesCount] = useState("0");
  const [ratePerKg, setRatePerKg] = useState("");
  const [gstRatePercent, setGstRatePercent] = useState("18.0");
  const [isInterstate, setIsInterstate] = useState(false);
  const [dispatchDate, setDispatchDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [remarks, setRemarks] = useState("");

  // Populate default grade rate on selection
  const handleGradeChange = (gradeId: string) => {
    setWasteGradeId(gradeId);
    const selected = grades.find((g) => g.id === gradeId);
    if (selected && (!ratePerKg || Number(ratePerKg) === 0)) {
      setRatePerKg(String(selected.current_rate_per_kg));
    }
  };

  // Live Outward Weighbridge Math
  const calculations = useMemo(() => {
    const gross = parseFloat(grossWeight) || 0;
    const tare = parseFloat(tareWeight) || 0;
    const rate = parseFloat(ratePerKg) || 0;
    const gstPct = parseFloat(gstRatePercent) || 0;

    return calculateLiveDispatch(gross, tare, rate, gstPct, isInterstate);
  }, [grossWeight, tareWeight, ratePerKg, gstRatePercent, isInterstate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!calculations.isValid) {
      setError(calculations.error || "Verify weighbridge measurements.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        buyer_id: buyerId,
        waste_grade_id: wasteGradeId,
        vehicle_number: vehicleNumber.trim().toUpperCase(),
        driver_name: driverName.trim() || undefined,
        driver_phone: driverPhone.trim() || undefined,
        transporter_name: transporterName.trim() || undefined,
        eway_bill_number: ewayBillNumber.trim() || undefined,
        tare_weight_kg: parseFloat(tareWeight),
        gross_weight_kg: parseFloat(grossWeight),
        bales_count: parseInt(balesCount, 10) || 0,
        rate_per_kg: parseFloat(ratePerKg),
        gst_rate_percent: parseFloat(gstRatePercent),
        is_interstate: isInterstate,
        dispatch_date: dispatchDate,
        remarks: remarks.trim() || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to commit outward dispatch order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EEF5ED]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase font-mono text-[#171F1B]">
                Outward Weighbridge Terminal & Gate Pass
              </h3>
              <p className="text-[11px] font-mono text-[#7B8580]">
                Direct finished goods dispatch with inventory deduction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED] hover:text-[#171F1B] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Inputs Section */}
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Buyer Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    Consignee (Buyer) *
                  </label>
                  <select
                    value={buyerId}
                    onChange={(e) => setBuyerId(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono focus:outline-[#006B3C]"
                  >
                    <option value="">Select Buyer</option>
                    {buyers.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.state_code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Waste Grade Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    Finished Grade *
                  </label>
                  <select
                    value={wasteGradeId}
                    onChange={(e) => handleGradeChange(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono focus:outline-[#006B3C]"
                  >
                    <option value="">Select Scrap Grade</option>
                    {grades.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.grade_code} - {g.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Vehicle Plate */}
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    Vehicle Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="UK07CA1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono uppercase focus:outline-[#006B3C]"
                  />
                </div>

                {/* Driver Name */}
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ramesh Chand"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono focus:outline-[#006B3C]"
                  />
                </div>

                {/* Driver Phone */}
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    Driver Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono focus:outline-[#006B3C]"
                  />
                </div>
              </div>

              {/* Weighbridge Measurements */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-3">
                <span className="text-[10px] font-mono uppercase font-bold text-[#006B3C] flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5" /> Weighbridge Gross & Tare (kg)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#52605A] block mb-1">
                      Tare Wt (Truck Empty) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 8500"
                      value={tareWeight}
                      onChange={(e) => setTareWeight(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#52605A] block mb-1">
                      Gross Wt (Loaded) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 18500"
                      value={grossWeight}
                      onChange={(e) => setGrossWeight(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#52605A] block mb-1">
                      Bales Count Loaded
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={balesCount}
                      onChange={(e) => setBalesCount(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDE5DC] bg-white text-xs font-mono focus:outline-[#006B3C]"
                    />
                  </div>
                </div>
              </div>

              {/* Commercial Valuation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    Rate per kg (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="34.50"
                    value={ratePerKg}
                    onChange={(e) => setRatePerKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono focus:outline-[#006B3C]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    GST Rate (%)
                  </label>
                  <select
                    value={gstRatePercent}
                    onChange={(e) => setGstRatePercent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono focus:outline-[#006B3C]"
                  >
                    <option value="5.0">5.0%</option>
                    <option value="12.0">12.0%</option>
                    <option value="18.0">18.0% (Standard Scrap)</option>
                    <option value="0.0">0.0% (Exempt)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-[#52605A] block mb-1">
                    Dispatch Date
                  </label>
                  <input
                    type="date"
                    value={dispatchDate}
                    onChange={(e) => setDispatchDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono focus:outline-[#006B3C]"
                  />
                </div>
              </div>

              {/* Interstate Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="interstate_toggle"
                  checked={isInterstate}
                  onChange={(e) => setIsInterstate(e.target.checked)}
                  className="rounded border-[#DDE5DC] text-[#006B3C] focus:ring-[#006B3C]"
                />
                <label
                  htmlFor="interstate_toggle"
                  className="text-xs font-mono font-bold text-[#52605A] cursor-pointer"
                >
                  Inter-state Consignment (Apply 100% IGST instead of CGST+SGST)
                </label>
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-[#063D2A] text-[#FAF8F5] rounded-2xl p-5 space-y-4 shadow-md">
                <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#88C34A] font-bold">
                    Weighbridge HUD
                  </span>
                  <span className="text-[11px] font-mono text-[#DDE5DC]">
                    Live Telemetry
                  </span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-[#DDE5DC]/70">
                    <span>Net Outward Mass:</span>
                    <span className="font-bold text-white text-sm">
                      {calculations.net_weight_kg.toFixed(2)} kg
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#DDE5DC]/70">
                    <span>Taxable Base Value:</span>
                    <span className="font-bold text-white">
                      ₹{calculations.taxable_amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {isInterstate ? (
                    <div className="flex justify-between items-center text-amber-300">
                      <span>IGST ({gstRatePercent}%):</span>
                      <span>+₹{calculations.igst_amount.toFixed(2)}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center text-amber-300">
                        <span>CGST ({(Number(gstRatePercent) / 2).toFixed(1)}%):</span>
                        <span>+₹{calculations.cgst_amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-amber-300">
                        <span>SGST ({(Number(gstRatePercent) / 2).toFixed(1)}%):</span>
                        <span>+₹{calculations.sgst_amount.toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                    <span className="text-sm font-bold text-[#88C34A]">
                      Invoice Total:
                    </span>
                    <span className="text-xl font-black text-white">
                      ₹{calculations.total_amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transit Details */}
              <div className="p-3.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] space-y-2 text-xs font-mono">
                <input
                  type="text"
                  placeholder="Transporter Name (e.g. VRL Logistics)"
                  value={transporterName}
                  onChange={(e) => setTransporterName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDE5DC] bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="E-Way Bill Number"
                  value={ewayBillNumber}
                  onChange={(e) => setEwayBillNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDE5DC] bg-white text-xs"
                />
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={submitting || !calculations.isValid}
                className="w-full py-3 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Committing Outward Consignment...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Gate Pass & Commit</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}