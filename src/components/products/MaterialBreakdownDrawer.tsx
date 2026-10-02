"use client";

import React from "react";
import { X, Layers } from "lucide-react";
import { Product } from "@/types/products";

interface MaterialBreakdownDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialBreakdownDrawer({
  product,
  isOpen,
  onClose,
}: MaterialBreakdownDrawerProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#063D2A]/30 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white border-l border-[#DDE5DC] h-full p-6 flex flex-col shadow-2xl">
        <div className="flex justify-between items-center border-b border-[#DDE5DC] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase text-[#063D2A] tracking-tight">
                Material Formulation
              </h3>
              <p className="text-xs font-mono text-[#52605A]">{product.sku}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#52605A] hover:text-[#171F1B] hover:bg-[#EEF5ED] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Total mass summary banner */}
        <div className="my-4 p-3.5 bg-[#FDF8EE] border border-[#DDE5DC] rounded-xl flex justify-between items-center font-mono">
          <span className="text-xs text-[#52605A] uppercase tracking-wider font-bold">
            Total Unit Weight:
          </span>
          <span className="text-[#006B3C] font-black text-base">
            {Number(product.total_weight_kg).toFixed(3)} KG
          </span>
        </div>

        {/* Itemized breakdown cards */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-mono text-xs">
          {product.materials_used && product.materials_used.length > 0 ? (
            product.materials_used.map((mat, i) => (
              <div
                key={i}
                className="p-3 bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl flex justify-between items-center"
              >
                <div>
                  <span className="text-[#171F1B] font-bold block">
                    {mat.sub_category_name || "Component Material"}
                  </span>
                  <span className="text-[10px] text-[#7B8580]">{mat.sub_category_code || "N/A"}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#006B3C] text-sm block">
                    {Number(mat.weight).toFixed(3)} {mat.unit}
                  </span>
                  {mat.percentage_share && (
                    <span className="text-[10px] text-[#52605A] font-bold">
                      {Number(mat.percentage_share).toFixed(1)}% mass share
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-[#7B8580]">No materials assigned to this item.</div>
          )}
        </div>

        <div className="pt-4 border-t border-[#DDE5DC]">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#FAF8F5] hover:bg-[#EEF5ED] text-[#52605A] text-xs font-bold font-mono rounded-xl border border-[#DDE5DC] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}