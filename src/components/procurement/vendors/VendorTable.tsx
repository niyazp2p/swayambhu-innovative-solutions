"use client";

import React from "react";
import { Phone, MapPin, Eye, Trash2, FileText } from "lucide-react";
import { Vendor } from "@/types/procurement";

interface VendorTableProps {
  vendors: Vendor[];
  onViewVendor: (vendor: Vendor) => void;
  onDeleteVendor: (vendor: Vendor) => void;
}

export function VendorTable({ vendors, onViewVendor, onDeleteVendor }: VendorTableProps) {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "KABADIWALA":
        return "bg-emerald-50 text-[#006B3C] border-emerald-200";
      case "INDUSTRIAL_GENERATOR":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "MUNICIPAL":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#EEF5ED] text-[#52605A] uppercase border-b border-[#DDE5DC]">
            <tr>
              <th className="py-3 px-4">Vendor Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Address / Shed</th>
              <th className="py-3 px-4">GSTIN & PAN</th>
              <th className="py-3 px-4">Bank IFSC / A/C</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#7B8580]">
                  No scrap suppliers or vendors found matching your filter criteria.
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-[#FDF8EE] transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#171F1B] block">{vendor.name}</span>
                    <span className="text-[10px] text-[#7B8580]">
                      Registered {new Date(vendor.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${getBadgeStyle(
                        vendor.vendor_type
                      )}`}
                    >
                      {vendor.vendor_type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {vendor.contact_phone ? (
                      <span className="flex items-center gap-1.5 text-[#171F1B]">
                        <Phone className="h-3 w-3 text-[#006B3C] shrink-0" />
                        {vendor.contact_phone}
                      </span>
                    ) : (
                      <span className="text-[#A7BAAC]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 max-w-[180px] truncate">
                    {vendor.address ? (
                      <span className="flex items-center gap-1.5 text-[#52605A]" title={vendor.address}>
                        <MapPin className="h-3 w-3 shrink-0 text-[#7B8580]" />
                        <span className="truncate">{vendor.address}</span>
                      </span>
                    ) : (
                      <span className="text-[#A7BAAC]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-[#171F1B]">
                        GST: {vendor.gstin || <span className="text-[#A7BAAC] font-normal">N/A</span>}
                      </span>
                      <span className="text-[10px] text-[#52605A]">
                        PAN: {vendor.pan_number || <span className="text-[#A7BAAC]">N/A</span>}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {vendor.bank_account_no ? (
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#171F1B]">
                          {vendor.bank_account_no}
                        </span>
                        <span className="text-[10px] text-[#7B8580]">
                          IFSC: {vendor.bank_ifsc || "N/A"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#A7BAAC]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        vendor.is_active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}
                    >
                      {vendor.is_active ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onViewVendor(vendor)}
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                        title="View Full Vendor Profile"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteVendor(vendor)}
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-rose-300 text-[#7B8580] hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete / Archive Vendor"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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