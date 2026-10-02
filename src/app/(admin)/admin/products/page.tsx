"use client";

import React, { useEffect, useState } from "react";
import { Plus, Tag, RefreshCw } from "lucide-react";
import { ProductStatsHeader } from "@/components/products/ProductStatsHeader";
import ProductTable from "@/components/products/ProductTable";
import ProductCreateModal from "@/components/products/ProductCreateModal";
import SubCategoryManageModal from "@/components/products/SubCategoryManageModal";
import QuantityUpdateModal from "@/components/products/QuantityUpdateModal";
import MaterialBreakdownDrawer from "@/components/products/MaterialBreakdownDrawer";
import { Product, MaterialSubCategory } from "@/types/products";
import { productsService } from "@/lib/services/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<MaterialSubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog Controls
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubManageOpen, setIsSubManageOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQtyOpen, setIsQtyOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prods, subs] = await Promise.all([
        productsService.getProducts(),
        productsService.getSubCategories(),
      ]);
      setProducts(prods);
      setSubCategories(subs);
    } catch (err) {
      console.error("Failed to load products telemetry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenQty = (prod: Product) => {
    setSelectedProduct(prod);
    setIsQtyOpen(true);
  };

  const handleOpenBreakdown = (prod: Product) => {
    setSelectedProduct(prod);
    setIsDrawerOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product.");
    }
  };

  const handleQuantitySuccess = (productId: string, updatedQty: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, total_quantity: updatedQty } : p))
    );
  };

  const handleProductCreated = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleSubCategoryAdded = (newSub: MaterialSubCategory) => {
    setSubCategories((prev) => [...prev, newSub]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
            Catalog & Circular Formulation
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#063D2A] mt-1">
            Products & Materials
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-mono text-[#063D2A] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#006B3C]" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => setIsSubManageOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-xs font-bold font-mono text-[#006B3C] transition-colors shadow-xs"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Categories & Subcategories</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-[#FDF8EE] text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <ProductStatsHeader products={products} />

      {/* Table Section */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-xs font-mono text-[#7B8580]">
          Loading products ledger...
        </div>
      ) : (
        <ProductTable
          products={products}
          onOpenQuantityModal={handleOpenQty}
          onOpenBreakdown={handleOpenBreakdown}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {/* Dialog Modals */}
      <ProductCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        subCategories={subCategories}
        onSuccess={handleProductCreated}
      />

      <SubCategoryManageModal
        isOpen={isSubManageOpen}
        onClose={() => setIsSubManageOpen(false)}
        subCategories={subCategories}
        onSubCategoryAdded={handleSubCategoryAdded}
      />

      <QuantityUpdateModal
        isOpen={isQtyOpen}
        onClose={() => setIsQtyOpen(false)}
        product={selectedProduct}
        onSuccess={handleQuantitySuccess}
      />

      <MaterialBreakdownDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}