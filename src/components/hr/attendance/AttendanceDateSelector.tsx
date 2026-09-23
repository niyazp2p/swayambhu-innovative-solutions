"use client";

import React from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  AlertTriangle 
} from "lucide-react";

interface TelemetryProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  stats: {
    total: number;
    present: number;
    absent: number;
    halfDay: number;
    late: number;
    totalOt: number;
  };
  onMarkAllPresent: () => void;
  isSaving: boolean;
}

export default function AttendanceDateSelector({
  selectedDate,
  onDateChange,
  stats,
  onMarkAllPresent,
  isSaving,
}: TelemetryProps) {
  const handleShiftDay = (delta: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + delta);
    onDateChange(current.toISOString().split("T")[0]);
  };

  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4 font-mono">
      {/* Date Navigation & Fast Fill Ribbon */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] p-1">
            <button
              onClick={() => handleShiftDay(-1)}
              className="p-1.5 rounded-lg hover:bg-white text-[#52605A] transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 px-3">
              <CalendarIcon className="h-4 w-4 text-[#006B3C]" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#171F1B] outline-none cursor-pointer"
              />
            </div>
            <button
              onClick={() => handleShiftDay(1)}
              className="p-1.5 rounded-lg hover:bg-white text-[#52605A] transition-colors"
              title="Next Day"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {!isToday && (
            <button
              onClick={() => onDateChange(new Date().toISOString().split("T")[0])}
              className="px-3 py-2 rounded-xl border border-[#DDE5DC] bg-white text-[11px] font-bold text-[#006B3C] hover:bg-[#EEF5ED] transition-colors"
            >
              Jump to Today
            </button>
          )}
        </div>

        <button
          onClick={onMarkAllPresent}
          disabled={isSaving || stats.total === 0}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/20 hover:bg-[#006B3C] text-[#006B3C] hover:text-white text-xs font-bold transition-all disabled:opacity-50"
        >
          Mark Remaining Present
        </button>
      </div>

      {/* Real-time Telemetry Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC]">
          <span className="text-[9px] uppercase tracking-wider text-[#7B8580] block">Shift Roster</span>
          <span className="text-xl font-black text-[#171F1B] mt-0.5 block">{stats.total}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC]">
          <span className="text-[9px] uppercase tracking-wider text-[#7B8580] block">Present</span>
          <span className="text-xl font-black text-[#006B3C] mt-0.5 block">{stats.present}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC]">
          <span className="text-[9px] uppercase tracking-wider text-[#7B8580] block">Absent</span>
          <span className="text-xl font-black text-red-600 mt-0.5 block">{stats.absent}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC]">
          <span className="text-[9px] uppercase tracking-wider text-[#7B8580] block">Half-Day</span>
          <span className="text-xl font-black text-amber-600 mt-0.5 block">{stats.halfDay}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC]">
          <span className="text-[9px] uppercase tracking-wider text-[#7B8580] flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-amber-500" /> Late Marks
          </span>
          <span className="text-xl font-black text-amber-700 mt-0.5 block">{stats.late}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#DDE5DC]">
          <span className="text-[9px] uppercase tracking-wider text-[#7B8580] flex items-center gap-1">
            <Clock className="h-3 w-3 text-[#006B3C]" /> Overtime
          </span>
          <span className="text-xl font-black text-[#006B3C] mt-0.5 block">{stats.totalOt.toFixed(1)}h</span>
        </div>
      </div>
    </div>
  );
}