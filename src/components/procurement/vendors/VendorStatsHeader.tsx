"use client";

import React from "react";
import { Users, Truck, Factory, Building } from "lucide-react";
import { Vendor } from "@/types/procurement";

interface VendorStatsHeaderProps {
  vendors: Vendor[];
}

export function VendorStatsHeader({ vendors }: VendorStatsHeaderProps) {
  const kabadiwalaCount = vendors.filter((v) => v.vendor_type === "KABADIWALA").length;
  const industrialCount = vendors.filter((v) => v.vendor_type === "INDUSTRIAL_GENERATOR").length;
  const municipalCount = vendors.filter((v) => v.vendor_type === "MUNICIPAL").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Total Vendors
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {vendors.length}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Truck className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Kabadiwalas
          </span>
          <span className="text-xl font-black font-mono text-[#006B3C]">
            {kabadiwalaCount}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Factory className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Industrial
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {industrialCount}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Building className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Municipal
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {municipalCount}
          </span>
        </div>
      </div>
    </div>
  );
}