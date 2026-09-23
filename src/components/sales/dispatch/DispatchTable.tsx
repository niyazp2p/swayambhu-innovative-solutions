"use client";

import React from "react";
import { Eye, FileDown, Truck } from "lucide-react";
import { DispatchOrder } from "@/types/sales";

interface DispatchTableProps {
  dispatches: DispatchOrder[];
  loading: boolean;
  onInspect: (dispatch: DispatchOrder) => void;
  onDownloadGatePass: (dispatchId: string, dispatchNumber: string) => void;
  downloadingId: string | null;
}

export function DispatchTable({
  dispatches,
  loading,
  onInspect,
  onDownloadGatePass,
  downloadingId,
}: DispatchTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DISPATCHED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "WEIGHED_OUT":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PARTIAL":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAF8F5] text-[#52605A] uppercase border-b border-[#DDE5DC] text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Dispatch Ref</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Vehicle / Driver</th>
              <th className="py-3 px-4">Consignee (Buyer)</th>
              <th className="py-3 px-4 text-right">Net Wt (kg)</th>
              <th className="py-3 px-4 text-right">Total (₹)</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Settlement</th>
              <th className="py-3 px-4 text-right">Gate Pass</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {loading ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-[#7B8580]">
                  Loading outward dispatch registers...
                </td>
              </tr>
            ) : dispatches.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-[#7B8580]">
                  No outward dispatch orders found matching current filter criteria.
                </td>
              </tr>
            ) : (
              dispatches.map((record) => (
                <tr key={record.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#006B3C]">
                    {record.dispatch_number}
                  </td>
                  <td className="py-3 px-4 text-[#7B8580]">
                    {record.dispatch_date}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#171F1B] flex items-center gap-1">
                      <Truck className="h-3 w-3 text-[#006B3C] shrink-0" />
                      {record.vehicle_number}
                    </span>
                    <span className="text-[10px] text-[#7B8580] block">
                      {record.driver_name || "Driver Unassigned"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#171F1B] block">
                      {record.buyer?.name || "Direct Offtaker"}
                    </span>
                    <span className="text-[10px] text-[#7B8580]">
                      GSTIN: {record.buyer?.gstin || "URP"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-black text-sm text-[#006B3C]">
                    {Number(record.net_weight_kg).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    <span className="text-[10px] font-normal text-[#52605A]">
                      ({record.bales_count} B)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-black text-[#171F1B]">
                    ₹{Number(record.total_amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPaymentBadge(
                        record.payment_status
                      )}`}
                    >
                      {record.payment_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onInspect(record)}
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                        title="Inspect Consignment"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          onDownloadGatePass(record.id, record.dispatch_number)
                        }
                        disabled={downloadingId === record.id}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#EEF5ED] hover:bg-[#DDE5DC] text-[#006B3C] font-bold text-[11px] transition-colors cursor-pointer disabled:opacity-50"
                        title="Download Outward Gate Pass"
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        <span>Pass</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}