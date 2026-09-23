"use client";

import React, { useState } from "react";
import { X, Building2, Loader2, ArrowRight, ShieldAlert } from "lucide-react";
import { BuyerCreatePayload } from "@/types/sales";

interface BuyerCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: BuyerCreatePayload) => Promise<void>;
}

export function BuyerCreateModal({ isOpen, onClose, onSubmit }: BuyerCreateModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [stateCode, setStateCode] = useState("05"); // Default Uttarakhand
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  if (!isOpen) return null;

  // Derive PAN and State Code automatically from GSTIN if 15 chars provided
  const handleGstinChange = (val: string) => {
    const formatted = val.toUpperCase().trim();
    setGstin(formatted);
    if (formatted.length >= 2) {
      const code = formatted.substring(0, 2);
      if (!isNaN(Number(code))) {
        setStateCode(code);
      }
    }
    if (formatted.length >= 12) {
      setPanNumber(formatted.substring(2, 12));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (gstin && gstin.length !== 15) {
      setError("Standard Indian GSTIN must be exactly 15 alphanumeric characters.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        gstin: gstin.trim() || undefined,
        pan_number: panNumber.trim().toUpperCase() || undefined,
        state_code: stateCode.trim(),
        contact_person: contactPerson.trim() || undefined,
        contact_phone: contactPhone.trim(),
        billing_address: billingAddress.trim(),
        shipping_address: shippingAddress.trim() || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to onboard buyer entity.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EEF5ED]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase text-[#171F1B]">
                Onboard Offtaker / Recycling Buyer
              </h3>
              <p className="text-[11px] text-[#7B8580]">
                Register industrial buyer for finished scrap sales & statutory GST invoicing[cite: 7]
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
              Company / Entity Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. EcoPlast Industries Ltd."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                GSTIN (15 Digits)
              </label>
              <input
                type="text"
                placeholder="05AAAAA0000A1Z5"
                maxLength={15}
                value={gstin}
                onChange={(e) => handleGstinChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs uppercase focus:outline-[#006B3C]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                PAN Number
              </label>
              <input
                type="text"
                placeholder="AAAAA0000A"
                maxLength={10}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs uppercase focus:outline-[#006B3C]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                GST State Code *
              </label>
              <input
                type="text"
                required
                maxLength={2}
                placeholder="05"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                placeholder="Rohan Sharma"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
              Billing Address (for GST Invoices) *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Full official registered address..."
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
              Delivery / Shipping Address (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Leave empty if same as billing address..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm mt-4"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Onboarding Offtaker...</span>
              </>
            ) : (
              <>
                <span>Register Offtaker Buyer</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}