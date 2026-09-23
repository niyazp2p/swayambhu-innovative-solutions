"use client";

import React, { useState } from "react";
import { X, Loader2, Plus, AlertCircle } from "lucide-react";
import { procurementService } from "@/lib/services/procurement";
import { Vendor, VendorType } from "@/types/procurement";

interface VendorCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVendorCreated: (createdVendor: Vendor) => void;
}

export default function VendorCreateModal({
  isOpen,
  onClose,
  onVendorCreated,
}: VendorCreateModalProps) {
  const [name, setName] = useState("");
  const [vendorType, setVendorType] = useState<VendorType>("KABADIWALA");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [gstin, setGstin] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Vendor name is required.");
      return;
    }

    try {
      setSubmitting(true);
      const newVendor = await procurementService.createVendor({
        name: name.trim(),
        vendor_type: vendorType,
        contact_phone: contactPhone.trim() || undefined,
        address: address.trim() || undefined,
        bank_account_no: bankAccountNo.trim() || undefined,
        bank_ifsc: bankIfsc.trim().toUpperCase() || undefined,
        gstin: gstin.trim().toUpperCase() || undefined,
        pan_number: panNumber.trim().toUpperCase() || undefined,
      });

      onVendorCreated(newVendor);
      onClose();
      // Reset form
      setName("");
      setVendorType("KABADIWALA");
      setContactPhone("");
      setAddress("");
      setBankAccountNo("");
      setBankIfsc("");
      setGstin("");
      setPanNumber("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to register new vendor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-[#EEF5ED]">
          <div>
            <h3 className="text-sm font-bold uppercase font-mono text-[#171F1B]">
              Register New Vendor
            </h3>
            <span className="text-[10px] font-mono text-[#7B8580]">
              Scrap suppliers, industrial generators & municipal sources
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED] hover:text-[#171F1B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Vendor / Entity Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Green City Scrap Traders"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Vendor Classification *
              </label>
              <select
                value={vendorType}
                onChange={(e) => setVendorType(e.target.value as VendorType)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              >
                <option value="KABADIWALA">KABADIWALA (Local Aggregator)</option>
                <option value="INDUSTRIAL_GENERATOR">INDUSTRIAL_GENERATOR (Commercial)</option>
                <option value="MUNICIPAL">MUNICIPAL (ULB / City Source)</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Contact Phone
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Address / Shed Location
              </label>
              <input
                type="text"
                placeholder="Plot / Sector / Area details"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Bank Account No.
              </label>
              <input
                type="text"
                placeholder="Account number"
                value={bankAccountNo}
                onChange={(e) => setBankAccountNo(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                Bank IFSC Code
              </label>
              <input
                type="text"
                placeholder="e.g. SBIN0001234"
                value={bankIfsc}
                onChange={(e) => setBankIfsc(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono uppercase text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                GSTIN Number (Optional)
              </label>
              <input
                type="text"
                placeholder="22AAAAA0000A1Z5"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono uppercase text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-bold">
                PAN Number (Optional)
              </label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                className="w-full rounded-xl bg-[#FDF8EE] border border-[#DDE5DC] px-3 py-2 text-xs font-mono uppercase text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-[#EEF5ED]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-[#EEF5ED] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  <span>Save Vendor</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}