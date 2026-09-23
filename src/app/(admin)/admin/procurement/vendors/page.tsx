"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Users, Plus, Search, RefreshCw, Filter } from "lucide-react";
import { procurementService } from "@/lib/services/procurement";
import { Vendor } from "@/types/procurement";
import { VendorStatsHeader } from "@/components/procurement/vendors/VendorStatsHeader";
import { VendorTable } from "@/components/procurement/vendors/VendorTable";

// Lazy load dialog modals to preserve fast initialization
const VendorCreateModal = dynamic(
  () => import("@/components/procurement/vendors/VendorCreateModal"),
  { ssr: false }
);
const VendorDeleteModal = dynamic(
  () => import("@/components/procurement/vendors/VendorDeleteModal"),
  { ssr: false }
);
const VendorDetailModal = dynamic(
  () => import("@/components/procurement/vendors/VendorDetailModal"),
  { ssr: false }
);

export default function VendorRegistryPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  // Modal dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [vendorToView, setVendorToView] = useState<Vendor | null>(null);
  const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const data = await procurementService.getVendors();
      setVendors(data);
    } catch (err) {
      console.error("Failed to load vendor registry", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filteredVendors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return vendors.filter((v) => {
      const matchesQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        (v.contact_phone && v.contact_phone.includes(q)) ||
        (v.address && v.address.toLowerCase().includes(q));

      const matchesType = typeFilter === "ALL" || v.vendor_type === typeFilter;

      return matchesQuery && matchesType;
    });
  }, [vendors, searchQuery, typeFilter]);

  const handleVendorCreated = (newVendor: Vendor) => {
    setVendors((prev) => [newVendor, ...prev]);
  };

  const handleVendorDeleted = (deletedId: string, action: "DELETED" | "DEACTIVATED") => {
    if (action === "DELETED") {
      setVendors((prev) => prev.filter((v) => v.id !== deletedId));
    } else {
      // If soft-archived, toggle local active state
      setVendors((prev) =>
        prev.map((v) => (v.id === deletedId ? { ...v, is_active: false } : v))
      );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#006B3C] uppercase font-bold tracking-widest">
            <Users className="w-4 h-4" />
            <span>Procurement & Supplier Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Vendor Registry
          </h1>
          <p className="text-xs sm:text-sm text-[#52605A] font-sans mt-0.5">
            Manage registered scrap aggregators, industrial generators, and municipal waste suppliers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchVendors}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono font-medium text-[#171F1B] hover:bg-[#EEF5ED] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vendor</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <VendorStatsHeader vendors={vendors} />

      {/* Search & Filter Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
          <input
            type="text"
            placeholder="Search by vendor name, phone, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-none focus:border-[#006B3C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-[#7B8580] shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-white border border-[#DDE5DC] text-xs font-mono text-[#171F1B] focus:outline-none focus:border-[#006B3C]"
          >
            <option value="ALL">All Classifications</option>
            <option value="KABADIWALA">Kabadiwala</option>
            <option value="INDUSTRIAL_GENERATOR">Industrial Generator</option>
            <option value="MUNICIPAL">Municipal</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Main Vendor Data Table */}
      <VendorTable
        vendors={filteredVendors}
        onViewVendor={(vendor) => setVendorToView(vendor)}
        onDeleteVendor={(vendor) => setVendorToDelete(vendor)}
      />

      {/* Dynamic Slide-Overs and Dialogs */}
      {isCreateOpen && (
        <VendorCreateModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onVendorCreated={handleVendorCreated}
        />
      )}

      {vendorToView && (
        <VendorDetailModal
          vendor={vendorToView}
          isOpen={!!vendorToView}
          onClose={() => setVendorToView(null)}
        />
      )}

      {vendorToDelete && (
        <VendorDeleteModal
          vendor={vendorToDelete}
          isOpen={!!vendorToDelete}
          onClose={() => setVendorToDelete(null)}
          onSuccess={handleVendorDeleted}
        />
      )}
    </div>
  );
}