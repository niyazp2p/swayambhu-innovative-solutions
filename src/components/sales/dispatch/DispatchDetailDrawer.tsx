"use client";

import React from "react";
import { X, Truck, Scale, FileText, Building2, User } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface DispatchDetailDrawerProps {
  dispatch: DispatchOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadGatePass: (dispatchId: string, dispatchNumber: string) => void;
}

export function DispatchDetailDrawer({
  dispatch,
  isOpen,
  onClose,
  onDownloadGatePass,
}: DispatchDetailDrawerProps) {
  if (!isOpen || !dispatch) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 font-mono">
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div>
            <span className="text-[10px] uppercase text-[#006B3C] font-bold">
              Consignment Telemetry
            </span>
            <h3 className="text-xl font-bold text-[#171F1B]">
              {dispatch.dispatch_number}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Consignee Profile */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-2">
          <span className="text-xs font-bold uppercase text-[#52605A] flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-[#006B3C]" />
            Offtaker Buyer Details
          </span>
          <div className="text-xs space-y-1 text-[#171F1B]">
            <p className="font-bold">{dispatch.buyer?.name || "N/A"}</p>
            <p className="text-[#52605A] text-[11px]">
              GSTIN: {dispatch.buyer?.gstin || "URP"} | State: {dispatch.buyer?.state_code || "N/A"}
            </p>
            <p className="text-[#52605A] text-[11px]">
              {dispatch.buyer?.billing_address}
            </p>
          </div>
        </div>

        {/* Weighbridge Audit Breakdown */}
        <div className="p-4 rounded-xl bg-white border border-[#DDE5DC] space-y-3 shadow-xs">
          <span className="text-xs font-bold uppercase text-[#52605A] flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-[#006B3C]" />
            Weight Telemetry
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px]">Gross Weight:</span>
              <span className="font-bold">{Number(dispatch.gross_weight_kg).toLocaleString()} kg</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">Tare Weight:</span>
              <span className="font-bold">{Number(dispatch.tare_weight_kg).toLocaleString()} kg</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">Net Outward:</span>
              <span className="font-black text-[#006B3C]">
                {Number(dispatch.net_weight_kg).toLocaleString()} kg
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">Bales Loaded:</span>
              <span className="font-bold">{dispatch.bales_count} units</span>
            </div>
          </div>
        </div>

        {/* Transport & Driver */}
        <div className="p-4 rounded-xl bg-white border border-[#DDE5DC] space-y-2 shadow-xs">
          <span className="text-xs font-bold uppercase text-[#52605A] flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-[#006B3C]" />
            Haulage Telemetry
          </span>
          <div className="text-xs space-y-1">
            <p className="font-bold text-[#171F1B]">{dispatch.vehicle_number}</p>
            <p className="text-[#52605A] text-[11px]">
              Driver: {dispatch.driver_name || "N/A"} ({dispatch.driver_phone || "N/A"})
            </p>
            <p className="text-[#52605A] text-[11px]">
              Transporter: {dispatch.transporter_name || "Self Haulage"}
            </p>
            <p className="text-[#52605A] text-[11px]">
              E-Way Bill: {dispatch.eway_bill_number || "Not Recorded"}
            </p>
          </div>
        </div>

        {/* Valuation & Tax Formulation */}
        <div className="p-4 rounded-xl bg-[#063D2A] text-white space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#DDE5DC]/70">Taxable Value:</span>
            <span className="font-bold">₹{Number(dispatch.taxable_amount).toFixed(2)}</span>
          </div>
          {Number(dispatch.igst_amount) > 0 ? (
            <div className="flex justify-between items-center text-xs text-amber-300">
              <span>IGST:</span>
              <span>₹{Number(dispatch.igst_amount).toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex justify-between items-center text-xs text-amber-300">
              <span>CGST + SGST:</span>
              <span>
                ₹{(Number(dispatch.cgst_amount) + Number(dispatch.sgst_amount)).toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t border-white/10 pt-2 flex justify-between items-center text-sm font-bold">
            <span className="text-[#88C34A]">Grand Total:</span>
            <span className="font-black text-white">
              ₹{Number(dispatch.total_amount).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={() =>
            onDownloadGatePass(dispatch.id, dispatch.dispatch_number)
          }
          className="w-full py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <FileText className="h-4 w-4" /> Download Official Gate Pass
        </button>
      </div>
    </div>
  );
}