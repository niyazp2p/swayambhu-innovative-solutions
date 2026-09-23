"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FileSpreadsheet, Plus, Search, RefreshCw } from "lucide-react";
import { procurementService } from "@/lib/services/procurement";
import { WasteGrade } from "@/types/procurement";
import { GradeStatsHeader } from "@/components/procurement/grades/GradeStatsHeader";
import { GradeTable } from "@/components/procurement/grades/GradeTable";

// Lazy load dialog modals to keep the page shell lightweight
const GradeCreateModal = dynamic(
  () => import("@/components/procurement/grades/GradeCreateModal"),
  { ssr: false }
);
const GradeDetailModal = dynamic(
  () => import("@/components/procurement/grades/GradeDetailModal"),
  { ssr: false }
);

export default function WasteGradesPricingPage() {
  const [grades, setGrades] = useState<WasteGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await procurementService.getGrades();
      setGrades(data);
    } catch (err) {
      console.error("Failed to load waste grade catalog", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  // Filter list by category or code
  const filteredGrades = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return grades;
    return grades.filter(
      (g) =>
        g.grade_code.toLowerCase().includes(q) ||
        g.category_name.toLowerCase().includes(q)
    );
  }, [grades, searchQuery]);

  const handleGradeCreated = (newGrade: WasteGrade) => {
    setGrades((prev) => [newGrade, ...prev]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#006B3C] uppercase font-bold tracking-widest">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Master Catalog & Pricing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171F1B] uppercase tracking-tight mt-1">
            Grades & Pricing
          </h1>
          <p className="text-xs sm:text-sm text-[#52605A] font-sans mt-0.5">
            Configure raw waste categories, active intake rates per kg, and automated moisture deduction profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchGrades}
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
            <span>New Waste Grade</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <GradeStatsHeader grades={grades} />

      {/* Search Input Filter */}
      <div className="relative max-w-md">
        <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8580]" />
        <input
          type="text"
          placeholder="Filter by grade code (e.g. HDPE) or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#171F1B] placeholder:text-[#A7BAAC] focus:outline-none focus:border-[#006B3C]"
        />
      </div>

      {/* Catalog Table */}
      <GradeTable grades={filteredGrades} onViewGrade={(id) => setSelectedGradeId(id)} />

      {/* Dynamic Modals */}
      {isCreateOpen && (
        <GradeCreateModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onGradeCreated={handleGradeCreated}
        />
      )}

      {selectedGradeId && (
        <GradeDetailModal
          gradeId={selectedGradeId}
          onClose={() => setSelectedGradeId(null)}
        />
      )}
    </div>
  );
}