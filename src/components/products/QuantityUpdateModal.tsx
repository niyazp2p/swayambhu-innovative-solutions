"use client";

import React, { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/products";
import { productsService } from "@/lib/services/products";

interface QuantityUpdateModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (productId: string, updatedQty: number) => void;
}

export default function QuantityUpdateModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: QuantityUpdateModalProps) {
  const [quantity, setQuantity] = useState<number>(product?.total_quantity ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await productsService.updateQuantity(product.id, {
        total_quantity: Number(quantity),
      });
      onSuccess(product.id, res.total_quantity);
      onClose();
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to update stock quantity.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063D2A]/30 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-white border border-[#DDE5DC] rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase text-[#063D2A] tracking-tight">
                Adjust Yard Stock
              </h3>
              <p className="text-[10px] font-mono text-[#006B3C] font-bold">{product.sku}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#52605A] hover:text-[#171F1B] hover:bg-[#EEF5ED]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 mb-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
              Available Units ({product.unit_measure})
            </label>
            <input
              type="number"
              min="0"
              required
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl px-3 py-2 text-[#171F1B] text-sm font-bold focus:outline-hidden focus:border-[#006B3C] focus:bg-white transition-colors"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#EEF5ED] text-[#52605A] border border-[#DDE5DC] rounded-xl font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#006B3C] hover:bg-[#063D2A] text-white rounded-xl font-bold text-xs disabled:opacity-50 transition-colors shadow-xs"
            >
              {loading ? "Updating..." : "Save Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}