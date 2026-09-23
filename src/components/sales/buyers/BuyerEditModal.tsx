"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, ArrowRight, ShieldAlert } from "lucide-react";
import { Buyer, BuyerUpdatePayload } from "@/types/sales";

interface BuyerEditModalProps {
  buyer: Buyer | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (buyerId: string, payload: BuyerUpdatePayload) => Promise<void>;
}

export function BuyerEditModal({ buyer, isOpen, onClose, onSubmit }: BuyerEditModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [stateCode, setStateCode] = useState("05");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (buyer) {
      setName(buyer.name);
      setGstin(buyer.gstin || "");
      setPanNumber(buyer.pan_number || "");
      setStateCode(buyer.state_code || "05");
      setContactPerson(buyer.contact_person || "");
      setContactPhone(buyer.contact_phone);
      setBillingAddress(buyer.billing_address);
      setShippingAddress(buyer.shipping_address || "");
      setIsActive(buyer.is_active);
    }
  }, [buyer]);

  if (!isOpen || !buyer) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setSubmitting(true);
    try {
      await onSubmit(buyer.id, {
        name: name.trim(),
        gstin: gstin.trim() || undefined,
        pan_number: panNumber.trim().toUpperCase() || undefined,
        state_code: stateCode.trim(),
        contact_person: contactPerson.trim() || undefined,
        contact_phone: contactPhone.trim(),
        billing_address: billingAddress.trim(),
        shipping_address: shippingAddress.trim() || undefined,
        is_active: isActive,
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update buyer profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EEF5ED]">
          <h3 className="text-sm font-bold uppercase text-[#171F1B]">
            Modify Offtaker Profile: {buyer.name}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                GSTIN
              </label>
              <input
                type="text"
                maxLength={15}
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs uppercase focus:outline-[#006B3C]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                PAN
              </label>
              <input
                type="text"
                maxLength={10}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs uppercase focus:outline-[#006B3C]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                State Code
              </label>
              <input
                type="text"
                required
                maxLength={2}
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                Contact Person
              </label>
              <input
                type="text"
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
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
              Billing Address *
            </label>
            <textarea
              required
              rows={2}
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs focus:outline-[#006B3C]"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="active_status_toggle"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-[#DDE5DC] text-[#006B3C] focus:ring-[#006B3C]"
            />
            <label htmlFor="active_status_toggle" className="text-xs font-bold text-[#52605A] cursor-pointer">
              Active Purchasing Offtaker
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-4"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Profile Changes...</span>
              </>
            ) : (
              <>
                <span>Commit Updates</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}