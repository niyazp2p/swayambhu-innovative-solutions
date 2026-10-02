"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Layers, FolderPlus, CheckCircle2 } from "lucide-react";
import { MaterialCategory, MaterialSubCategory } from "@/types/products";
import { productsService } from "@/lib/services/products";

interface SubCategoryManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  subCategories: MaterialSubCategory[];
  onSubCategoryAdded: (newSub: MaterialSubCategory) => void;
}

export default function SubCategoryManageModal({
  isOpen,
  onClose,
  subCategories,
  onSubCategoryAdded,
}: SubCategoryManageModalProps) {
  const [categories, setCategories] = useState<MaterialCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  
  // Subcategory fields
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  
  // Quick Category creation toggle & inputs
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const data = await productsService.getCategories();
      setCategories(data);
      if (data.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(data[0].id);
      }
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCategories();
      setError(null);
      setSuccessMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Parent Category Submission
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const created = await productsService.createCategory({
        name: newCatName.trim(),
        description: newCatDesc.trim() || undefined,
      });
      setCategories((prev) => [...prev, created]);
      setSelectedCategoryId(created.id);
      setNewCatName("");
      setNewCatDesc("");
      setIsCreatingCategory(false);
      setSuccessMsg(`Category "${created.name}" created! You can now link subcategories.`);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to create parent category.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Subcategory Submission
  const handleCreateSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      setError("Please select or create a parent category first.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const created = await productsService.createSubCategory({
        category_id: selectedCategoryId,
        name: name.trim(),
        code: code.trim().toUpperCase(),
        description: description.trim() || undefined,
      });
      onSubCategoryAdded(created);
      setName("");
      setCode("");
      setDescription("");
      setSuccessMsg(`Subcategory "${created.name}" registered successfully!`);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to create subcategory.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063D2A]/30 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-white border border-[#DDE5DC] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DDE5DC] flex justify-between items-center bg-[#FDF8EE]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shrink-0">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-black uppercase text-[#063D2A] tracking-tight">
                Categories & Subcategories
              </h2>
              <p className="text-xs text-[#52605A]">
                Organize waste classifications (e.g. Plastic → Polyal, HM, Tube)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#52605A] hover:text-[#171F1B] hover:bg-[#EEF5ED] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
          {error && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-sans">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-[#006B3C] rounded-xl text-xs font-sans font-medium flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Category Inline Creation Toggle */}
          {isCreatingCategory ? (
            <form onSubmit={handleCreateCategory} className="p-3.5 bg-[#EEF5ED] border border-[#DDE5DC] rounded-xl space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B3C]">
                  + New Parent Category
                </span>
                <button
                  type="button"
                  onClick={() => setIsCreatingCategory(false)}
                  className="text-xs text-[#52605A] hover:underline"
                >
                  Cancel
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Category Name (e.g. Plastic, Paper)"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="bg-white border border-[#DDE5DC] rounded-lg px-2.5 py-1.5 text-xs text-[#171F1B] focus:border-[#006B3C] focus:outline-hidden"
                />
                <input
                  type="text"
                  placeholder="Short Description (optional)"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="bg-white border border-[#DDE5DC] rounded-lg px-2.5 py-1.5 text-xs text-[#171F1B] focus:border-[#006B3C] focus:outline-hidden"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 py-1.5 bg-[#006B3C] hover:bg-[#063D2A] text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Save Category
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center p-2.5 bg-[#FDF8EE] border border-[#DDE5DC] rounded-xl">
              <span className="text-xs text-[#52605A]">
                Need a new parent classification?
              </span>
              <button
                type="button"
                onClick={() => setIsCreatingCategory(true)}
                className="inline-flex items-center gap-1 text-xs text-[#006B3C] font-bold hover:underline"
              >
                <FolderPlus className="h-3.5 w-3.5" />
                <span>+ Create Category</span>
              </button>
            </div>
          )}

          {/* Subcategory Registration Form */}
          <form
            onSubmit={handleCreateSubCategory}
            className="p-4 bg-[#FAF8F5] border border-[#DDE5DC] rounded-xl space-y-3"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B3C] block">
              + Register Subcategory
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                  Parent Category *
                </label>
                <select
                  required
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full bg-white border border-[#DDE5DC] rounded-lg px-2.5 py-1.5 text-[#171F1B] text-xs focus:outline-hidden focus:border-[#006B3C]"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                  Name (e.g. Polyal) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Polyal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#DDE5DC] rounded-lg px-2.5 py-1.5 text-[#171F1B] text-xs focus:outline-hidden focus:border-[#006B3C]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#52605A] mb-1">
                  Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="SUB_POLYAL"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-white border border-[#DDE5DC] rounded-lg px-2.5 py-1.5 text-[#171F1B] text-xs focus:outline-hidden focus:border-[#006B3C]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Optional description / resin specifications"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 bg-white border border-[#DDE5DC] rounded-lg px-2.5 py-1.5 text-[#171F1B] text-xs focus:outline-hidden focus:border-[#006B3C]"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 bg-[#006B3C] hover:bg-[#063D2A] text-white rounded-lg font-bold text-xs disabled:opacity-50 transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{loading ? "Adding..." : "Add Subcategory"}</span>
              </button>
            </div>
          </form>

          {/* Active Subcategories Directory */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52605A] block mb-2">
              Registered Subcategories ({subCategories.length})
            </span>
            <div className="divide-y divide-[#EEF5ED] border border-[#DDE5DC] rounded-xl overflow-hidden bg-white max-h-48 overflow-y-auto">
              {subCategories.length === 0 ? (
                <div className="p-4 text-center text-[#7B8580] text-xs">
                  No material subcategories registered yet.
                </div>
              ) : (
                subCategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-2.5 px-3 flex justify-between items-center hover:bg-[#FDF8EE] transition-colors"
                  >
                    <div>
                      <span className="font-bold text-[#171F1B] text-xs block">{sub.name}</span>
                      <span className="text-[10px] text-[#7B8580]">{sub.code}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#006B3C] text-[11px] font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Active</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DDE5DC] bg-[#FAF8F5] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-[#EEF5ED] text-[#52605A] border border-[#DDE5DC] rounded-xl font-bold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}