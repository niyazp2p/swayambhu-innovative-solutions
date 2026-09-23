"use client";

import React from "react";
import { Check, X, Clock, AlertCircle } from "lucide-react";
import { Employee, AttendanceStatus, AttendanceCreatePayload } from "@/types/hr";

export interface AttendanceRowState {
  employee: Employee;
  recordId?: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string;
  isLate: boolean;
  overtimeHours: number;
  isModified: boolean;
}

interface GridProps {
  rows: AttendanceRowState[];
  onUpdateRow: (employeeId: string, patch: Partial<AttendanceRowState>) => void;
  onInspectEmployee: (employee: Employee) => void;
  loading: boolean;
}

export default function BulkAttendanceGrid({
  rows,
  onUpdateRow,
  onInspectEmployee,
  loading,
}: GridProps) {
  const statusOptions: { value: AttendanceStatus; label: string; activeClass: string }[] = [
    { value: "PRESENT", label: "P", activeClass: "bg-[#006B3C] text-white border-[#006B3C]" },
    { value: "HALF_DAY", label: "HD", activeClass: "bg-amber-600 text-white border-amber-600" },
    { value: "ABSENT", label: "A", activeClass: "bg-red-600 text-white border-red-600" },
    { value: "ON_LEAVE", label: "LV", activeClass: "bg-blue-600 text-white border-blue-600" },
  ];

  return (
    <div className="rounded-2xl border border-[#DDE5DC] bg-white overflow-hidden shadow-xs font-mono">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F5] border-b border-[#DDE5DC] text-[10px] text-[#7B8580] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Worker Name</th>
              <th className="py-3 px-4">Role / Model</th>
              <th className="py-3 px-4 text-center">Status Toggle</th>
              <th className="py-3 px-4 text-center">Check-In / Out</th>
              <th className="py-3 px-4 text-center">Late Flag</th>
              <th className="py-3 px-4 text-center">OT Hours</th>
              <th className="py-3 px-4 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF5ED]">
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-[#7B8580]">
                  Loading active shift roster...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-[#7B8580]">
                  No active workers available in the plant roster.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.employee.id}
                  className={`hover:bg-[#FAF8F5] transition-colors ${
                    row.isModified ? "bg-amber-50/40" : ""
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-[#171F1B]">{row.employee.employee_code}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onInspectEmployee(row.employee)}
                      className="font-bold text-[#171F1B] hover:text-[#006B3C] text-left underline decoration-dotted"
                    >
                      {row.employee.full_name}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#EEF5ED] text-[#006B3C] font-semibold text-[10px]">
                      {row.employee.role}
                    </span>
                    <span className="ml-1 text-[10px] text-[#7B8580]">
                      {row.employee.wage_type === "DAILY_WAGE" ? "Daily" : "Fixed"}
                    </span>
                  </td>

                  {/* Fast Pill Status Buttons */}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      {statusOptions.map((opt) => {
                        const active = row.status === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => onUpdateRow(row.employee.id, { status: opt.value, isModified: true })}
                            className={`w-7 h-7 rounded-lg text-[10px] font-bold border transition-all ${
                              active
                                ? opt.activeClass
                                : "border-[#DDE5DC] bg-[#FAF8F5] text-[#7B8580] hover:bg-white"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Punch Times */}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <input
                        type="time"
                        value={row.checkIn}
                        onChange={(e) => onUpdateRow(row.employee.id, { checkIn: e.target.value, isModified: true })}
                        className="p-1 rounded-md border border-[#DDE5DC] bg-[#FAF8F5] text-[10px] w-20 text-center"
                      />
                      <span className="text-[#7B8580]">-</span>
                      <input
                        type="time"
                        value={row.checkOut}
                        onChange={(e) => onUpdateRow(row.employee.id, { checkOut: e.target.value, isModified: true })}
                        className="p-1 rounded-md border border-[#DDE5DC] bg-[#FAF8F5] text-[10px] w-20 text-center"
                      />
                    </div>
                  </td>

                  {/* Late Arrival Checkbox */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={row.isLate}
                      onChange={(e) => onUpdateRow(row.employee.id, { isLate: e.target.checked, isModified: true })}
                      className="h-4 w-4 rounded-md text-[#006B3C] border-[#DDE5DC] focus:ring-0 cursor-pointer"
                    />
                  </td>

                  {/* Overtime Stepper */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="16"
                      value={row.overtimeHours}
                      onChange={(e) =>
                        onUpdateRow(row.employee.id, {
                          overtimeHours: Math.max(0, parseFloat(e.target.value) || 0),
                          isModified: true,
                        })
                      }
                      className="w-16 p-1 rounded-md border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-bold text-center text-[#006B3C]"
                    />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onInspectEmployee(row.employee)}
                      className="px-2 py-1 rounded-lg border border-[#DDE5DC] text-[10px] text-[#52605A] hover:bg-white"
                    >
                      History
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