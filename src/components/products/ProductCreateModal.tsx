"use client";

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { MaterialSubCategory, Product, ProductCreatePayload, WeightUnit } from "@/types/products";
import { productsService } from "@/lib/services/products";

interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  subCategories: MaterialSubCategory[];
  onSuccess: (newProduct: Product) => void;
}

interface MaterialRow {
  sub_category_id: string;
  weight: number;
  unit: WeightUnit;
}

export default function ProductCreateModal({
  isOpen,
  onClose,
  subCategories,
  onSuccess,
}: ProductCreateModalProps) {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [description, setDescription] = useState("");
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [unitMeasure, setUnitMeasure] = useState("PIECES");
  const [materials, setMaterials] = useState<MaterialRow[]>([
    { sub_category_id: "", weight: 0, unit: "KG" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddMaterialRow = () => {
    setMaterials([...materials, { sub_category_id: "", weight: 0, unit: "KG" }]);
  };

  const handleRemoveMaterialRow = (index: number) => {
    setMaterials(materials.filter((_, idx) => idx !== index));
  };

  const handleMaterialChange = (index: number, field: keyof MaterialRow, value: string | number) => {
    const updated = [...materials];
    updated[index] = { ...updated[index], [field]: value };
    setMaterials(updated);
  };

  const calculatedUnitWeight = materials.reduce((acc, row) => {
    const w = Number(row.weight) || 0;
    return acc + (row.unit === "GRAMS" ? w / 1000 : w);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validMaterials = materials.filter((m) => m.sub_category_id && Number(m.weight) > 0);
    if (validMaterials.length === 0) {
      setError("Please assign at least one material with weight greater than 0.");
      setLoading(false);
      return;
    }

    try {
      const payload: ProductCreatePayload = {
        sku: sku.trim().toUpperCase(),
        name: name.trim(),
        description: description.trim() || undefined,
        dimensions: dimensions.trim() || undefined,
        total_quantity: Number(totalQuantity),
        unit_measure: unitMeasure,
        materials: validMaterials.map((m) => ({
          sub_category_id: m.sub_category_id,
          weight: Number(m.weight),
          unit: m.unit,
        })),
      };

      const created = await productsService.createProduct(payload);
      onSuccess(created);
      onClose();
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to create product.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063D2A]/30 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-white border border-[#DDE5DC] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DDE5DC] flex justify-between items-center bg-[#FDF8EE]">
          <div>
            <h2 className="text-base font-black uppercase text-[#063D2A] tracking-tight">
              Create New Upcycled Product
            </h2>
            <p className="text-xs text-[#52605A]">
              Define item attributes, dimensions, and material mass balance
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#52605A] hover:text-[#171F1B] hover:bg-[#EEF5ED] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs font-mono">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-sans">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                SKU / Item Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SIS-BOARD-12MM"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl px-3 py-2 text-[#171F1B] focus:outline-hidden focus:border-[#006B3C] focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 100% Recycled Composite Board"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl px-3 py-2 text-[#171F1B] focus:outline-hidden focus:border-[#006B3C] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                Dimensions
              </label>
              <input
                type="text"
                placeholder="8x4 ft x 12mm"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl px-3 py-2 text-[#171F1B] focus:outline-hidden focus:border-[#006B3C] focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                Initial Stock Qty
              </label>
              <input
                type="number"
                min="0"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl px-3 py-2 text-[#171F1B] focus:outline-hidden focus:border-[#006B3C] focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                Unit of Measure
              </label>
              <select
                value={unitMeasure}
                onChange={(e) => setUnitMeasure(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl px-3 py-2 text-[#171F1B] focus:outline-hidden focus:border-[#006B3C] focus:bg-white transition-colors"
              >
                <option value="PIECES">PIECES</option>
                <option value="UNITS">UNITS</option>
                <option value="SHEETS">SHEETS</option>
                <option value="SETS">SETS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
              Specification Notes
            </label>
            <textarea
              rows={2}
              placeholder="High density waterproof composite sheet upcycled from segregated scrap."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl px-3 py-2 text-[#171F1B] focus:outline-hidden focus:border-[#006B3C] focus:bg-white transition-colors font-sans text-xs"
            />
          </div>

          {/* Material Composition Section */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B3C]">
                Material Composition (Per Item Unit)
              </span>
              <button
                type="button"
                onClick={handleAddMaterialRow}
                className="inline-flex items-center gap-1 text-[11px] bg-[#EEF5ED] hover:bg-[#ddeade] text-[#006B3C] font-bold px-2.5 py-1 rounded-lg border border-[#DDE5DC] transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add Material</span>
              </button>
            </div>

            <div className="space-y-2">
              {materials.map((row, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 items-center bg-[#FAF8F5] p-2.5 rounded-xl border border-[#DDE5DC]"
                >
                  <select
                    required
                    value={row.sub_category_id}
                    onChange={(e) => handleMaterialChange(idx, "sub_category_id", e.target.value)}
                    className="flex-1 bg-white border border-[#DDE5DC] rounded-lg px-2.5 py-1.5 text-[#171F1B] text-xs focus:outline-hidden focus:border-[#006B3C]"
                  >
                    <option value="">Select Subcategory (Polyal, HM, Tube...)</option>
                    {subCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} ({sub.code})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    required
                    placeholder="Weight"
                    value={row.weight || ""}
                    onChange={(e) =>
                      handleMaterialChange(idx, "weight", parseFloat(e.target.value) || 0)
                    }
                    className="w-28 bg-white border border-[#DDE5DC] rounded-lg px-2 py-1.5 text-[#171F1B] text-xs focus:outline-hidden focus:border-[#006B3C]"
                  />

                  <select
                    value={row.unit}
                    onChange={(e) => handleMaterialChange(idx, "unit", e.target.value as WeightUnit)}
                    className="w-24 bg-white border border-[#DDE5DC] rounded-lg px-2 py-1.5 text-[#171F1B] text-xs focus:outline-hidden focus:border-[#006B3C]"
                  >
                    <option value="KG">KG</option>
                    <option value="GRAMS">GRAMS</option>
                  </select>

                  {materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterialRow(idx)}
                      className="p-1 rounded-md text-[#52605A] hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between items-center text-xs px-2 text-[#52605A] border-t border-[#DDE5DC] pt-2">
              <span>Calculated Net Unit Weight:</span>
              <span className="font-mono text-[#006B3C] font-bold text-sm">
                {calculatedUnitWeight.toFixed(3)} KG
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE5DC] flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#EEF5ED] text-[#52605A] border border-[#DDE5DC] rounded-xl font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#006B3C] hover:bg-[#063D2A] text-white rounded-xl font-bold text-xs disabled:opacity-50 transition-colors shadow-xs"
            >
              {loading ? "Registering..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}