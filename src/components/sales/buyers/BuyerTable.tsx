"use client";

import React from "react";
import { Phone, Eye, Edit3, Building2, MapPin } from "lucide-react";
import { Buyer } from "@/types/sales";

interface BuyerTableProps {
  buyers: Buyer[];
  loading: boolean;
  onView: (buyer: Buyer) => void;
  onEdit: (buyer: Buyer) => void;
}

export function BuyerTable({ buyers, loading, onView, onEdit }: BuyerTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAF8F5] text-[#52605A] uppercase border-b border-[#DDE5DC] text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Offtaker Company</th>
              <th className="py-3 px-4">GSTIN & PAN</th>
              <th className="py-3 px-4">State Code</th>
              <th className="py-3 px-4">Contact Person</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Billing Address</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-[#7B8580]">
                  Loading buyer records...
                </td>
              </tr>
            ) : buyers.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-[#7B8580]">
                  No offtaker buyer entities found matching criteria.
                </td>
              </tr>
            ) : (
              buyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#006B3C] block text-sm">
                      {buyer.name}
                    </span>
                    <span className="text-[10px] text-[#7B8580]">
                      Registered: {new Date(buyer.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold block text-[#171F1B]">
                      {buyer.gstin || <span className="text-[#7B8580] font-normal italic">URP</span>}
                    </span>
                    <span className="text-[10px] text-[#7B8580]">
                      PAN: {buyer.pan_number || "—"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DDE5DC] text-[10px] font-bold text-[#006B3C]">
                      State {buyer.state_code}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-[#171F1B]">
                    {buyer.contact_person || <span className="text-[#7B8580]">—</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 font-semibold text-[#171F1B]">
                      <Phone className="h-3 w-3 text-[#006B3C] shrink-0" />
                      {buyer.contact_phone}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-[200px] truncate text-[#52605A]" title={buyer.billing_address}>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#7B8580] shrink-0" />
                      <span className="truncate">{buyer.billing_address}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        buyer.is_active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-neutral-100 text-neutral-500 border-neutral-200"
                      }`}
                    >
                      {buyer.is_active ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onView(buyer)}
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                        title="View Full Offtaker Profile"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onEdit(buyer)}
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                        title="Edit Buyer Details"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
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