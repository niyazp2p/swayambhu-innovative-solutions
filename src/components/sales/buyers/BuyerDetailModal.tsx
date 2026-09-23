"use client";

import React from "react";
import { X, Building2, Phone, MapPin, ShieldCheck, Calendar } from "lucide-react";
import { Buyer } from "@/types/sales";

interface BuyerDetailModalProps {
  buyer: Buyer | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (buyer: Buyer) => void;
}

export function BuyerDetailModal({ buyer, isOpen, onClose, onEdit }: BuyerDetailModalProps) {
  if (!isOpen || !buyer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#EEF5ED] bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#006B3C]">
                Offtaker Profile
              </span>
              <h3 className="text-base font-bold text-[#171F1B] leading-tight">
                {buyer.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          {/* Statutory Strip */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC]">
            <div>
              <span className="text-[10px] text-[#7B8580] uppercase block">GSTIN</span>
              <span className="font-bold text-[#171F1B] text-sm">
                {buyer.gstin || "Unregistered (URP)"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#7B8580] uppercase block">PAN Card</span>
              <span className="font-bold text-[#171F1B] text-sm">
                {buyer.pan_number || "—"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#7B8580] uppercase block">State Code</span>
              <span className="font-bold text-[#006B3C]">
                {buyer.state_code} {buyer.state_code === "05" ? "(Intra-state)" : "(Inter-state)"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#7B8580] uppercase block">Status</span>
              <span className="font-bold text-emerald-700">
                {buyer.is_active ? "Active Purchaser" : "Inactive Account"}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-3.5 rounded-xl border border-[#DDE5DC] space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#52605A] block">
              Direct Contact
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[#7B8580]">Representative:</span>
              <span className="font-bold text-[#171F1B]">{buyer.contact_person || "Not Listed"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7B8580]">Phone Number:</span>
              <span className="font-bold text-[#171F1B] flex items-center gap-1">
                <Phone className="h-3 w-3 text-[#006B3C]" />
                {buyer.contact_phone}
              </span>
            </div>
          </div>

          {/* Addresses */}
          <div className="space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                Official Billing Address
              </span>
              <p className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] text-[#171F1B]">
                {buyer.billing_address}
              </p>
            </div>
            {buyer.shipping_address && (
              <div>
                <span className="text-[10px] uppercase font-bold text-[#52605A] block mb-1">
                  Delivery / Unloading Yard Address
                </span>
                <p className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] text-[#171F1B]">
                  {buyer.shipping_address}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EEF5ED] flex items-center justify-end gap-2 bg-[#FAF8F5]">
          <button
            onClick={() => {
              onClose();
              onEdit(buyer);
            }}
            className="px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}