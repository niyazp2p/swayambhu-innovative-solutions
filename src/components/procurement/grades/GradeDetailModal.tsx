"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2, ShieldCheck, Tag } from "lucide-react";
import { procurementService } from "@/lib/services/procurement";
import { WasteGrade } from "@/types/procurement";

interface GradeDetailModalProps {
  gradeId: string | null;
  onClose: () => void;
}

export default function GradeDetailModal({ gradeId, onClose }: GradeDetailModalProps) {
  const [data, setData] = useState<WasteGrade | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gradeId) return;

    let isSubscribed = true;
    const fetchSingleGrade = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await procurementService.getGradeById(gradeId);
        if (isSubscribed) setData(result);
      } catch (err: any) {
        if (isSubscribed) {
          setError(err.response?.data?.detail || "Failed to load grade details.");
        }
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchSingleGrade();
    return () => {
      isSubscribed = false;
    };
  }, [gradeId]);

  if (!gradeId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#EEF5ED]">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-[#006B3C]" />
            <h3 className="text-xs font-bold uppercase font-mono text-[#171F1B]">
              Waste Grade Verification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED] hover:text-[#171F1B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#006B3C]" />
              <span className="text-[11px] font-mono text-[#7B8580]">
                Fetching from registry...
              </span>
            </div>
          ) : error ? (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-mono rounded-xl">
              {error}
            </div>
          ) : data ? (
            <div className="space-y-4 font-mono">
              <div>
                <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
                  Grade Code
                </span>
                <span className="text-lg font-black text-[#006B3C]">{data.grade_code}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EEF5ED]">
                <div>
                  <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
                    Category
                  </span>
                  <span className="text-xs font-bold text-[#171F1B]">{data.category_name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
                    Base Rate
                  </span>
                  <span className="text-xs font-bold text-[#171F1B]">
                    ₹{Number(data.current_rate_per_kg).toFixed(2)}/kg
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EEF5ED]">
                <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
                  Deduction Strategy
                </span>
                <span className="text-xs text-[#171F1B]">{data.deduction_method}</span>
              </div>

              <div className="pt-2 border-t border-[#EEF5ED]">
                <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
                  System Reference UUID
                </span>
                <span className="text-[9px] text-[#7B8580] break-all">{data.id}</span>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[#006B3C] text-[10px]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified in Plant Production Scope</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}