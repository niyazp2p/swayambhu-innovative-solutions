"use client";

import React from "react";
import { Eye } from "lucide-react";
import { WasteGrade } from "@/types/procurement";

interface GradeTableProps {
  grades: WasteGrade[];
  onViewGrade: (id: string) => void;
}

export function GradeTable({ grades, onViewGrade }: GradeTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#DDE5DC] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#EEF5ED] text-[#52605A] uppercase border-b border-[#DDE5DC]">
            <tr>
              <th className="py-3 px-4">Grade Code</th>
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4 text-right">Base Rate (₹/kg)</th>
              <th className="py-3 px-4">Deduction Method</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED] text-[#171F1B]">
            {grades.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#7B8580]">
                  No waste grades found matching your search.
                </td>
              </tr>
            ) : (
              grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-[#FDF8EE] transition-colors">
                  <td className="py-3 px-4 font-black text-[#006B3C]">
                    {grade.grade_code}
                  </td>
                  <td className="py-3 px-4 font-medium">{grade.category_name}</td>
                  <td className="py-3 px-4 text-right font-black text-[#171F1B]">
                    ₹{Number(grade.current_rate_per_kg).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#EEF5ED] text-[10px] text-[#52605A] font-bold">
                      {grade.deduction_method}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        grade.is_active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}
                    >
                      {grade.is_active ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onViewGrade(grade.id)}
                      className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors"
                      title="Inspect Grade"
                    >
                      <Eye className="h-3.5 w-3.5" />
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