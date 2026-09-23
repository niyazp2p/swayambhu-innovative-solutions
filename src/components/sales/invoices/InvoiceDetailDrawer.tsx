"use client";

import React from "react";
import { X, Building2, Factory, FileDown, Layers, MapPin } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface InvoiceDetailDrawerProps {
  dispatch: DispatchOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: (dispatchId: string, dispatchNumber: string) => void;
}

export function InvoiceDetailDrawer({
  dispatch,
  isOpen,
  onClose,
  onDownloadPdf,
}: InvoiceDetailDrawerProps) {
  if (!isOpen || !dispatch) return null;

  const isInterstate = Number(dispatch.igst_amount) > 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs font-mono">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div>
            <span className="text-[10px] uppercase text-[#006B3C] font-bold">
              GST Tax Invoice Ledger
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

        {/* Dual Column: Supplier (Plant) vs Consignee (Buyer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#52605A] flex items-center gap-1">
              <Factory className="h-3 w-3 text-[#006B3C]" />
              Supplier (Plant)
            </span>
            <p className="font-bold text-[#171F1B]">{dispatch.plant?.name || "Haridwar Facility"}</p>
            <p className="text-[10px] text-[#7B8580]">State Code: 05 (Uttarakhand)[cite: 4]</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#52605A] flex items-center gap-1">
              <Building2 className="h-3 w-3 text-[#006B3C]" />
              Consignee (Buyer)
            </span>
            <p className="font-bold text-[#171F1B]">{dispatch.buyer?.name || "Direct Offtaker"}</p>
            <p className="text-[10px] text-[#7B8580]">
              GSTIN: {dispatch.buyer?.gstin || "URP"} (State: {dispatch.buyer?.state_code || "05"})
            </p>
          </div>
        </div>

        {/* Consignment Specs */}
        <div className="p-4 rounded-xl border border-[#DDE5DC] space-y-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-[#52605A] block">
            Product & Transport Details
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[#7B8580] text-[10px] block">Material Stream:</span>
              <span className="font-bold">{dispatch.waste_grade?.grade_code || "Processed Scrap"}</span>
            </div>
            <div>
              <span className="text-[#7B8580] text-[10px] block">Vehicle Number:</span>
              <span className="font-bold">{dispatch.vehicle_number}</span>
            </div>
            <div>
              <span className="text-[#7B8580] text-[10px] block">Billable Net Weight:</span>
              <span className="font-bold">{Number(dispatch.net_weight_kg).toLocaleString()} kg</span>
            </div>
            <div>
              <span className="text-[#7B8580] text-[10px] block">Agreed Rate:</span>
              <span className="font-bold">₹{Number(dispatch.rate_per_kg).toFixed(2)} / kg</span>
            </div>
          </div>
        </div>

        {/* Statutory Tax Breakdown */}
        <div className="p-4 rounded-xl bg-[#063D2A] text-white space-y-2.5 text-xs shadow-md">
          <span className="text-[10px] font-bold uppercase text-[#88C34A] tracking-wider block border-b border-white/10 pb-1.5">
            GST Formulation Ledger
          </span>
          <div className="flex justify-between items-center text-[#DDE5DC]/80">
            <span>Taxable Amount:</span>
            <span className="font-bold text-white">
              ₹{Number(dispatch.taxable_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {isInterstate ? (
            <div className="flex justify-between items-center text-amber-300">
              <span>Integrated GST (IGST {dispatch.igst_rate}%):</span>
              <span>₹{Number(dispatch.igst_amount).toFixed(2)}</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-amber-300">
                <span>Central GST (CGST {dispatch.cgst_rate}%):</span>
                <span>₹{Number(dispatch.cgst_amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-amber-300">
                <span>State GST (SGST {dispatch.sgst_rate}%):</span>
                <span>₹{Number(dispatch.sgst_amount).toFixed(2)}</span>
              </div>
            </>
          )}

          <div className="border-t border-white/10 pt-2 flex justify-between items-center font-black text-sm">
            <span className="text-[#88C34A]">Final Invoice Amount:</span>
            <span className="text-white text-base">
              ₹{Number(dispatch.total_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Download Trigger */}
        <button
          onClick={() => onDownloadPdf(dispatch.id, dispatch.dispatch_number)}
          className="w-full py-3 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <FileDown className="h-4 w-4" /> Download GST Invoice PDF
        </button>
      </div>
    </div>
  );
}