"use client";

import React from "react";
import { Edit3, MapPin, CheckCircle2 } from "lucide-react";
import { BatchItem } from "@/types/procurement";

interface BatchTableProps {
  batches: BatchItem[];
  onEditBatch: (batch: BatchItem) => void;
}

export function BatchTable({ batches, onEditBatch }: BatchTableProps) {
  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "RAW":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "SORTED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "PROCESSED_BALED":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "FINISHED_GOODS":
        return "bg-emerald-50 text-[#006B3C] border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#EEF5ED] text-[#52605A] uppercase border-b border-[#DDE5DC]">
            <tr>
              <th className="py-3 px-4">Batch Code</th>
              <th className="py-3 px-4">Stage</th>
              <th className="py-3 px-4">Yard Location</th>
              <th className="py-3 px-4 text-right">Intake Mass (kg)</th>
              <th className="py-3 px-4 text-right">Available Mass (kg)</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4">Logged At</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {batches.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#7B8580]">
                  No inventory batches registered under this filter.
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-[#FDF8EE] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#006B3C]">
                    {batch.batch_code}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${getStageBadge(
                        batch.stage
                      )}`}
                    >
                      {batch.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {batch.yard_location ? (
                      <span className="flex items-center gap-1 text-[#171F1B]">
                        <MapPin className="h-3 w-3 text-[#006B3C] shrink-0" />
                        {batch.yard_location}
                      </span>
                    ) : (
                      <span className="text-[#A7BAAC] italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-[#52605A]">
                    {Number(batch.initial_quantity_kg ?? batch.current_quantity_kg).toFixed(2)} kg
                  </td>
                  <td className="py-3 px-4 text-right font-black text-sm text-[#171F1B]">
                    {Number(batch.current_quantity_kg).toFixed(2)} kg
                  </td>
                  <td className="py-3 px-4 text-center">
                    {batch.is_consumed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                        <CheckCircle2 className="h-3 w-3 text-gray-500" />
                        Consumed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#7B8580]">
                    {new Date(batch.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onEditBatch(batch)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Stage / Bay</span>
                    </button>
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