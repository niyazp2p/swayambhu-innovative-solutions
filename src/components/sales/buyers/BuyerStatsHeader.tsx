"use client";

import React from "react";
import { Building2, CheckCircle2, Globe2, MapPin } from "lucide-react";
import { Buyer } from "@/types/sales";

interface BuyerStatsHeaderProps {
  buyers: Buyer[];
}

export function BuyerStatsHeader({ buyers }: BuyerStatsHeaderProps) {
  const totalCount = buyers.length;
  const activeCount = buyers.filter((b) => b.is_active).length;
  // Default plant state code is '05' (Uttarakhand)
  const intrastateCount = buyers.filter((b) => b.state_code === "05").length;
  const interstateCount = buyers.filter((b) => b.state_code !== "05").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Total Offtakers
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {totalCount} <span className="text-xs font-normal text-[#52605A]">Entities</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Active Accounts
          </span>
          <span className="text-xl font-black text-[#006B3C]">
            {activeCount} <span className="text-xs font-normal text-[#52605A]">Approved</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Intra-State (CGST+SGST)
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {intrastateCount} <span className="text-xs font-normal text-[#52605A]">Local (05)</span>
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Globe2 className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Inter-State (IGST)
          </span>
          <span className="text-xl font-black text-[#171F1B]">
            {interstateCount} <span className="text-xs font-normal text-[#52605A]">Offtakers</span>
          </span>
        </div>
      </div>
    </div>
  );
}