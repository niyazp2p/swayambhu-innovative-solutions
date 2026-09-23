"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Save } from "lucide-react";
import { Employee, AttendanceRecord, AttendanceStatus, AttendanceCreatePayload } from "@/types/hr";
import { hrService } from "@/lib/services/hr";
import AttendanceDateSelector from "@/components/hr/attendance/AttendanceDateSelector";
import BulkAttendanceGrid, { AttendanceRowState } from "@/components/hr/attendance/BulkAttendanceGrid";
import EmployeeAttendanceDrawer from "@/components/hr/attendance/EmployeeAttendanceDrawer";

export default function DailyAttendancePage() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [rows, setRows] = useState<AttendanceRowState[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [inspectEmployee, setInspectEmployee] = useState<Employee | null>(null);

  const parsedPeriod = useMemo(() => {
    const parts = selectedDate.split("-");
    return {
      year: parseInt(parts[0], 10),
      month: parseInt(parts[1], 10),
    };
  }, [selectedDate]);

  const loadDailyRoster = async () => {
    setLoading(true);
    try {
      const [activeStaff, dailyLogs] = await Promise.all([
        hrService.getEmployees({ is_active: true }),
        hrService.getAttendance({ attendance_date: selectedDate }),
      ]);

      const logMap = new Map<string, AttendanceRecord>();
      dailyLogs.forEach((l) => logMap.set(l.employee_id, l));

      const merged: AttendanceRowState[] = activeStaff.map((emp) => {
        const existing = logMap.get(emp.id);
        if (existing) {
          return {
            employee: emp,
            recordId: existing.id,
            status: existing.status,
            checkIn: existing.check_in || "09:00",
            checkOut: existing.check_out || "17:00",
            isLate: existing.is_late,
            overtimeHours: Number(existing.overtime_hours),
            isModified: false,
          };
        }
        return {
          employee: emp,
          status: "PRESENT" as AttendanceStatus,
          checkIn: "09:00",
          checkOut: "17:00",
          isLate: false,
          overtimeHours: 0,
          isModified: false,
        };
      });

      setRows(merged);
    } catch (err) {
      console.error("Failed to load shift records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDailyRoster();
  }, [selectedDate]);

  const handleUpdateRow = (employeeId: string, patch: Partial<AttendanceRowState>) => {
    setRows((prev) =>
      prev.map((r) => (r.employee.id === employeeId ? { ...r, ...patch } : r))
    );
  };

  const handleMarkAllPresent = () => {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        status: "PRESENT",
        isLate: false,
        isModified: true,
      }))
    );
  };

  const handleSaveShift = async () => {
    setSaving(true);
    try {
      const payload: AttendanceCreatePayload[] = rows.map((r) => ({
        employee_id: r.employee.id,
        attendance_date: selectedDate,
        status: r.status,
        check_in: r.checkIn ? `${r.checkIn}:00` : null,
        check_out: r.checkOut ? `${r.checkOut}:00` : null,
        is_late: r.isLate,
        overtime_hours: r.overtimeHours,
      }));

      await hrService.logBulkAttendance(payload);
      await loadDailyRoster();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to commit daily attendance.");
    } finally {
      setSaving(false);
    }
  };

  const stats = useMemo(() => {
    const total = rows.length;
    const present = rows.filter((r) => r.status === "PRESENT").length;
    const absent = rows.filter((r) => r.status === "ABSENT" || r.status === "ON_LEAVE").length;
    const halfDay = rows.filter((r) => r.status === "HALF_DAY").length;
    const late = rows.filter((r) => r.isLate).length;
    const totalOt = rows.reduce((acc, r) => acc + (Number(r.overtimeHours) || 0), 0);
    return { total, present, absent, halfDay, late, totalOt };
  }, [rows]);

  const hasUnsavedChanges = rows.some((r) => r.isModified);

  return (
    <div className="space-y-6">
      <AttendanceDateSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        stats={stats}
        onMarkAllPresent={handleMarkAllPresent}
        isSaving={saving}
      />

      <BulkAttendanceGrid
        rows={rows}
        onUpdateRow={handleUpdateRow}
        onInspectEmployee={(emp) => setInspectEmployee(emp)}
        loading={loading}
      />

      {/* Persistent Floating Shift Submit Bar */}
      <div className="sticky bottom-4 z-20 flex justify-end">
        <button
          onClick={handleSaveShift}
          disabled={saving || loading}
          className={`px-6 py-3 rounded-2xl font-mono text-xs font-bold flex items-center gap-2 shadow-xl transition-all cursor-pointer ${
            hasUnsavedChanges
              ? "bg-[#006B3C] text-white hover:bg-[#00542E] ring-4 ring-[#006B3C]/20 animate-pulse"
              : "bg-[#171F1B] text-white hover:bg-black"
          }`}
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving Shift Logs..." : "Submit Shift Attendance Sheet"}
        </button>
      </div>

      <EmployeeAttendanceDrawer
        employee={inspectEmployee}
        isOpen={Boolean(inspectEmployee)}
        onClose={() => setInspectEmployee(null)}
        currentYear={parsedPeriod.year}
        currentMonth={parsedPeriod.month}
      />
    </div>
  );
}