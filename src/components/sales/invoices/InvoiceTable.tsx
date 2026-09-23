"use client";

import React from "react";
import { Eye, FileDown, Building2, ExternalLink } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface InvoiceTableProps {
  dispatches: DispatchOrder[];
  loading: boolean;
  onInspect: (dispatch: DispatchOrder) => void;
  onViewPdf: (dispatch: DispatchOrder) => void;
  onDownloadPdf: (dispatchId: string, dispatchNumber: string) => void;
  downloadingId: string | null;
}

export function InvoiceTable({
  dispatches,
  loading,
  onInspect,
  onViewPdf,
  onDownloadPdf,
  downloadingId,
}: InvoiceTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs font-mono">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F5] text-[#52605A] uppercase border-b border-[#DDE5DC] text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Invoice / Dispatch #</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Consignee (Buyer)</th>
              <th className="py-3 px-4 text-right">Taxable Base (₹)</th>
              <th className="py-3 px-4 text-right">CGST + SGST (₹)</th>
              <th className="py-3 px-4 text-right">IGST (₹)</th>
              <th className="py-3 px-4 text-right">Gross Total (₹)</th>
              <th className="py-3 px-4 text-center">Tax Split</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {loading ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-[#7B8580]">
                  Loading statutory GST tax invoices...
                </td>
              </tr>
            ) : dispatches.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-[#7B8580]">
                  No GST tax invoices found matching your search.
                </td>
              </tr>
            ) : (
              dispatches.map((record) => {
                const taxable = Number(record.taxable_amount) || 0;
                const localGst =
                  (Number(record.cgst_amount) || 0) + (Number(record.sgst_amount) || 0);
                const igst = Number(record.igst_amount) || 0;
                const grandTotal = Number(record.total_amount) || 0;
                const isInterstate = igst > 0;

                return (
                  <tr key={record.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#006B3C]">
                      {record.dispatch_number}
                    </td>
                    <td className="py-3 px-4 text-[#7B8580]">
                      {record.dispatch_date}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#171F1B] block">
                        {record.buyer?.name || "Direct Offtaker"}
                      </span>
                      <span className="text-[10px] text-[#7B8580]">
                        GSTIN: {record.buyer?.gstin || "URP"} (State {record.buyer?.state_code || "05"})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#171F1B]">
                      ₹{taxable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right text-[#52605A]">
                      {localGst > 0
                        ? `₹${localGst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-right text-[#52605A]">
                      {igst > 0
                        ? `₹${igst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-[#171F1B]">
                      ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          isInterstate
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {isInterstate ? "IGST (Inter)" : "CGST+SGST"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onInspect(record)}
                          className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                          title="Inspect Invoice Data"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onViewPdf(record)}
                          className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                          title="Stream PDF Document"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            onDownloadPdf(record.id, record.dispatch_number)
                          }
                          disabled={downloadingId === record.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EEF5ED] hover:bg-[#DDE5DC] text-[#006B3C] font-bold text-[11px] transition-colors cursor-pointer disabled:opacity-50"
                          title="Download Official Tax Invoice PDF"
                        >
                          <FileDown className="h-3.5 w-3.5" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}