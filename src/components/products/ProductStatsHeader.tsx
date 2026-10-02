"use client";

import React from "react";
import { Package, Layers, Scale } from "lucide-react";
import { Product } from "@/types/products";

interface ProductStatsHeaderProps {
  products: Product[];
}

export function ProductStatsHeader({ products }: ProductStatsHeaderProps) {
  const totalSkus = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + (p.total_quantity || 0), 0);
  const totalRecycledMassKg = products.reduce(
    (acc, p) => acc + (Number(p.total_weight_kg) || 0) * (p.total_quantity || 0),
    0
  );
  const totalRecycledMassMT = (totalRecycledMassKg / 1000).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Package className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Registered SKUs
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {totalSkus} Products
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Available Yard Inventory
          </span>
          <span className="text-xl font-black font-mono text-[#006B3C]">
            {totalStockUnits.toLocaleString()} Units
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#DDE5DC] p-4 shadow-xs flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
          <Scale className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580] block font-bold">
            Upcycled Circular Mass
          </span>
          <span className="text-xl font-black font-mono text-[#171F1B]">
            {totalRecycledMassMT} <span className="text-xs font-normal text-[#52605A]">MT</span>
          </span>
        </div>
      </div>
    </div>
  );
}