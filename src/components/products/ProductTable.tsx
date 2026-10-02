"use client";

import React from "react";
import { Download, SlidersHorizontal, Trash2, Layers } from "lucide-react";
import { Product } from "@/types/products";
import { productsService } from "@/lib/services/products";

interface ProductTableProps {
  products: Product[];
  onOpenQuantityModal: (product: Product) => void;
  onOpenBreakdown: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function ProductTable({
  products,
  onOpenQuantityModal,
  onOpenBreakdown,
  onDeleteProduct,
}: ProductTableProps) {
  const handleDownloadPdf = async (product: Product) => {
    try {
      await productsService.downloadProductPdf(product.id, product.sku);
    } catch {
      alert("Failed to download product spec sheet.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#EEF5ED] text-[#52605A] uppercase border-b border-[#DDE5DC]">
            <tr>
              <th className="py-3 px-4">SKU / Item Code</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Dimensions</th>
              <th className="py-3 px-4">Stock In Hand</th>
              <th className="py-3 px-4">Unit Weight</th>
              <th className="py-3 px-4">Material Formulation</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#7B8580]">
                  No products registered yet. Click &quot;Add Product&quot; to define finished goods.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-[#FDF8EE] transition-colors">
                  <td className="py-3 px-4 font-black text-[#006B3C]">{p.sku}</td>
                  <td className="py-3 px-4 font-bold text-[#171F1B]">{p.name}</td>
                  <td className="py-3 px-4 text-[#52605A]">{p.dimensions || "—"}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF5ED] text-[#006B3C] border border-[#DDE5DC]">
                      {p.total_quantity} {p.unit_measure}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#171F1B]">
                    {Number(p.total_weight_kg).toFixed(3)} kg
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onOpenBreakdown(p)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#006B3C] hover:text-[#063D2A] font-bold hover:underline"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      <span>{p.materials_used?.length || 0} Materials</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenQuantityModal(p)}
                        title="Adjust Stock Count"
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] hover:bg-[#EEF5ED] transition-colors"
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(p)}
                        title="Download Spec Sheet PDF"
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#006B3C] hover:bg-[#EEF5ED] transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        title="Delete Product"
                        className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-red-500 text-[#52605A] hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}