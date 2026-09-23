"use client";

import React from "react";
import { X, Building2, Phone, MapPin, CreditCard, ShieldCheck, Calendar, FileText } from "lucide-react";
import { Vendor } from "@/types/procurement";

interface VendorDetailModalProps {
  vendor: Vendor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VendorDetailModal({
  vendor,
  isOpen,
  onClose,
}: VendorDetailModalProps) {
  if (!isOpen || !vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EEF5ED]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase font-mono text-[#171F1B]">
                Vendor Profile Verification
              </h3>
              <span className="text-[10px] font-mono text-[#7B8580]">
                Procurement & Inward Intake Master Ledger
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED] hover:text-[#171F1B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 font-mono">
          {/* Main Identifier Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-[#FDF8EE] border border-[#DDE5DC]">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#7B8580] font-bold block">
                Registered Legal Name
              </span>
              <span className="text-base font-black text-[#171F1B] leading-tight">
                {vendor.name}
              </span>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#EEF5ED] text-[#006B3C] border border-[#006B3C]/20">
                {vendor.vendor_type}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  vendor.is_active
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                {vendor.is_active ? "Active" : "Archived"}
              </span>
            </div>
          </div>

          {/* Statutory Tax Identification (GSTIN & PAN) */}
          <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC] space-y-2">
            <span className="text-[9px] text-[#7B8580] uppercase tracking-wider flex items-center gap-1 font-bold">
              <FileText className="h-3 w-3 text-[#006B3C]" /> Statutory Compliance & Tax IDs
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[9px] text-[#7B8580] block uppercase">GSTIN Identifier</span>
                <span className="font-bold text-[#171F1B] break-all">
                  {vendor.gstin || <span className="text-[#A7BAAC] font-normal">Not Provided</span>}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[#7B8580] block uppercase">PAN Reference</span>
                <span className="font-bold text-[#006B3C] break-all">
                  {vendor.pan_number || <span className="text-[#A7BAAC] font-normal">Not Provided</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#DDE5DC] space-y-1">
              <span className="text-[9px] text-[#7B8580] uppercase tracking-wider flex items-center gap-1 font-bold">
                <Phone className="h-3 w-3 text-[#006B3C]" /> Contact Phone
              </span>
              <span className="font-semibold text-[#171F1B] block">
                {vendor.contact_phone || "No phone registered"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#DDE5DC] space-y-1">
              <span className="text-[9px] text-[#7B8580] uppercase tracking-wider flex items-center gap-1 font-bold">
                <MapPin className="h-3 w-3 text-[#006B3C]" /> Location / Yard
              </span>
              <span className="text-[#52605A] block truncate" title={vendor.address || ""}>
                {vendor.address || "No address on file"}
              </span>
            </div>
          </div>

          {/* Banking / Financial Information */}
          <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC] space-y-2">
            <span className="text-[9px] text-[#7B8580] uppercase tracking-wider flex items-center gap-1 font-bold">
              <CreditCard className="h-3 w-3 text-[#006B3C]" /> Direct Settlement Account
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[9px] text-[#7B8580] block">Account Number</span>
                <span className="font-bold text-[#171F1B]">
                  {vendor.bank_account_no || "—"}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[#7B8580] block">IFSC Code</span>
                <span className="font-bold text-[#006B3C]">
                  {vendor.bank_ifsc || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Audit Reference & Facility Tag */}
          <div className="pt-2 border-t border-[#EEF5ED] flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-[#7B8580] gap-1">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Registered: {new Date(vendor.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="truncate text-[9px]">ID: {vendor.id}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-[#006B3C]">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>Facility Node HW-01 Verified Entity</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EEF5ED] flex justify-end bg-[#FAF8F5]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}