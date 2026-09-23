"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar as CalIcon, Clock, AlertTriangle, Save } from "lucide-react";
import { Employee, AttendanceRecord, AttendanceStatus } from "@/types/hr";
import { hrService } from "@/lib/services/hr";

interface DrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  currentYear: number;
  currentMonth: number;
}

export default function EmployeeAttendanceDrawer({
  employee,
  isOpen,
  onClose,
  currentYear,
  currentMonth,
}: DrawerProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employee && isOpen) {
      loadHistory();
    }
  }, [employee, isOpen, currentYear, currentMonth]);

  const loadHistory = async () => {
    if (!employee) return;
    setLoading(true);
    try {
      const data = await hrService.getAttendance({
        employee_id: employee.id,
        month: currentMonth,
        year: currentYear,
      });
      setRecords(data);
    } catch (err) {
      console.error("Failed to load monthly attendance history", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !employee) return null;

  const handleUpdateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;
    setSaving(true);
    try {
      await hrService.updateAttendance(editingRecord.id, {
        status: editingRecord.status,
        check_in: editingRecord.check_in,
        check_out: editingRecord.check_out,
        is_late: editingRecord.is_late,
        overtime_hours: Number(editingRecord.overtime_hours),
      });
      setEditingRecord(null);
      await loadHistory();
    } catch (err) {
      console.error("Failed to update punch", err);
    } finally {
      setSaving(false);
    }
  };

  const statusBadge = (st: AttendanceStatus) => {
    switch (st) {
      case "PRESENT":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">PRESENT</span>;
      case "HALF_DAY":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold">HALF-DAY</span>;
      case "ABSENT":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-bold">ABSENT</span>;
      case "ON_LEAVE":
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">LEAVE</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end font-mono">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-[#DDE5DC] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#EEF5ED] flex items-center justify-between bg-[#FDF8EE]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              <CalIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase text-[#171F1B]">{employee.full_name}</h3>
              <span className="text-[10px] text-[#7B8580]">
                {employee.employee_code} • Period: {String(currentMonth).padStart(2, "0")}/{currentYear}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {editingRecord && (
            <form onSubmit={handleUpdateRecord} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#006B3C] block">
                Correcting Punch: {editingRecord.attendance_date}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] uppercase text-[#7B8580] block">Status</label>
                  <select
                    value={editingRecord.status}
                    onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value as AttendanceStatus })}
                    className="w-full mt-1 p-1.5 rounded-lg border border-[#DDE5DC] bg-white text-xs"
                  >
                    <option value="PRESENT">PRESENT</option>
                    <option value="HALF_DAY">HALF_DAY</option>
                    <option value="ABSENT">ABSENT</option>
                    <option value="ON_LEAVE">ON_LEAVE</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] uppercase text-[#7B8580] block">Overtime (hrs)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingRecord.overtime_hours}
                    onChange={(e) => setEditingRecord({ ...editingRecord, overtime_hours: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 p-1.5 rounded-lg border border-[#DDE5DC] bg-white text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingRecord.is_late}
                    onChange={(e) => setEditingRecord({ ...editingRecord, is_late: e.target.checked })}
                    className="rounded text-[#006B3C]"
                  />
                  <span>Flagged as Late</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingRecord(null)}
                    className="px-3 py-1 rounded-lg border border-[#DDE5DC] text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-3 py-1 rounded-lg bg-[#006B3C] text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="divide-y divide-[#EEF5ED]">
            {loading ? (
              <div className="text-center py-8 text-xs text-[#7B8580]">Fetching timesheets...</div>
            ) : records.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#7B8580]">No attendance recorded this month.</div>
            ) : (
              records.map((r) => (
                <div key={r.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#171F1B] block">{r.attendance_date}</span>
                    <span className="text-[10px] text-[#7B8580]">
                      {r.check_in || "--:--"} - {r.check_out || "--:--"}
                      {r.overtime_hours > 0 && ` • OT: ${r.overtime_hours}h`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.is_late && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">
                        LATE
                      </span>
                    )}
                    {statusBadge(r.status)}
                    <button
                      onClick={() => setEditingRecord(r)}
                      className="px-2 py-1 rounded border border-[#DDE5DC] text-[10px] text-[#52605A] hover:bg-[#FAF8F5]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}