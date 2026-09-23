"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Play,
  Eye,
  Download,
  Calendar,
  Search,
  CheckCircle2,
  TrendingDown,
  Coins,
} from "lucide-react";
import { Payslip, Employee } from "@/types/hr";
import { hrService } from "@/lib/services/hr";
import PayslipPdfModal from "@/components/hr/payroll/PayslipPDFModal";
import RunPayrollModal from "@/components/hr/payroll/RunPayrollModal";

export default function PayrollPage() {
  const [month, setMonth] = useState<number>(9);
  const [year, setYear] = useState<number>(2026);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [isRunOpen, setIsRunOpen] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [slipData, empData] = await Promise.all([
        hrService.getPayslips({ month, year }),
        hrService.getEmployees(),
      ]);
      setPayslips(slipData);
      setEmployees(empData);
    } catch (err) {
      console.error("Failed to load payroll records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [month, year]);

  const empMap = useMemo(() => {
    const map = new Map<string, Employee>();
    employees.forEach((e) => map.set(e.id, e));
    return map;
  }, [employees]);

  const filteredSlips = useMemo(() => {
    return payslips.filter((slip) => {
      const emp = empMap.get(slip.employee_id);
      const matchesSearch =
        (emp?.full_name && emp.full_name.toLowerCase().includes(search.toLowerCase())) ||
        (emp?.employee_code && emp.employee_code.toLowerCase().includes(search.toLowerCase())) ||
        slip.id.includes(search);
      return matchesSearch;
    });
  }, [payslips, empMap, search]);

  const totals = useMemo(() => {
    const gross = payslips.reduce((acc, s) => acc + Number(s.gross_earnings) + Number(s.overtime_earnings), 0);
    const deductions = payslips.reduce((acc, s) => acc + Number(s.total_deductions), 0);
    const net = payslips.reduce((acc, s) => acc + Number(s.net_salary), 0);
    return { gross, deductions, net };
  }, [payslips]);

  return (
    <div className="space-y-6 font-mono">
      {/* Telemetry Metric Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
            Generated Slips
          </span>
          <span className="text-2xl font-black text-[#171F1B] mt-1 block">
            {payslips.length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
            Gross Disbursed
          </span>
          <span className="text-2xl font-black text-[#171F1B] mt-1 block">
            ₹{totals.gross.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider flex items-center gap-1">
            <TrendingDown className="h-3 w-3 text-rose-500" /> Deductions Withheld
          </span>
          <span className="text-2xl font-black text-rose-600 mt-1 block">
            ₹{totals.deductions.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider flex items-center gap-1">
            <Coins className="h-3 w-3 text-[#006B3C]" /> Net Bank Transfer
          </span>
          <span className="text-2xl font-black text-[#006B3C] mt-1 block">
            ₹{totals.net.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Control Strip */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Month / Year Selector */}
          <div className="flex items-center rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] p-1">
            <div className="flex items-center gap-1.5 px-2">
              <Calendar className="h-3.5 w-3.5 text-[#006B3C]" />
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value, 10))}
                className="bg-transparent text-xs font-bold text-[#171F1B] outline-none cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(2000, m - 1, 1).toLocaleString("en-US", {
                      month: "short",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-[#DDE5DC]">|</span>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              className="bg-transparent text-xs font-bold text-[#171F1B] px-2 outline-none cursor-pointer"
            >
              {[2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8580]" />
            <input
              type="text"
              placeholder="Search code or staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs"
            />
          </div>
        </div>

        <button
          onClick={() => setIsRunOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <Play className="h-3.5 w-3.5 fill-white" /> Run Monthly Payroll
        </button>
      </div>

      {/* Payslips Table */}
      <div className="rounded-2xl border border-[#DDE5DC] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#DDE5DC] text-[10px] text-[#7B8580] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Staff Details</th>
                <th className="py-3 px-4 text-right">Base / Gross</th>
                <th className="py-3 px-4 text-right">Overtime</th>
                <th className="py-3 px-4 text-right">Absence Loss</th>
                <th className="py-3 px-4 text-right">Late Marks</th>
                <th className="py-3 px-4 text-right">Loan EMI</th>
                <th className="py-3 px-4 text-right">Net Salary</th>
                <th className="py-3 px-4 text-center">Slip Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF5ED]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#7B8580]">
                    Loading cycle payslip ledgers...
                  </td>
                </tr>
              ) : filteredSlips.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#7B8580]">
                    No payslips generated for {String(month).padStart(2, "0")}/{year}. Click &quot;Run Monthly Payroll&quot; to calculate.
                  </td>
                </tr>
              ) : (
                filteredSlips.map((slip) => {
                  const emp = empMap.get(slip.employee_id);
                  return (
                    <tr
                      key={slip.id}
                      className="hover:bg-[#FAF8F5] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#171F1B] block">
                          {emp?.full_name || "Employee"}
                        </span>
                        <span className="text-[10px] text-[#7B8580]">
                          {emp?.employee_code} • {emp?.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#171F1B]">
                        ₹{Number(slip.gross_earnings).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-right text-[#006B3C] font-semibold">
                        +₹{Number(slip.overtime_earnings).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-right text-rose-600">
                        {Number(slip.absence_deduction) > 0
                          ? `-₹${Number(slip.absence_deduction).toLocaleString("en-IN")}`
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-right text-rose-600">
                        {Number(slip.late_deduction) > 0
                          ? `-₹${Number(slip.late_deduction).toLocaleString("en-IN")}`
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-right text-amber-700">
                        {Number(slip.advance_emi_deduction) > 0
                          ? `-₹${Number(slip.advance_emi_deduction).toLocaleString("en-IN")}`
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-right font-black text-[#006B3C] text-sm">
                        ₹{Number(slip.net_salary).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedPayslip(slip)}
                          className="p-1.5 rounded-lg border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] transition-colors cursor-pointer"
                          title="View Official Payslip PDF"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF View Modal & Execution Dialog */}
      <PayslipPdfModal
        payslip={selectedPayslip}
        employee={
          selectedPayslip ? empMap.get(selectedPayslip.employee_id) : undefined
        }
        isOpen={Boolean(selectedPayslip)}
        onClose={() => setSelectedPayslip(null)}
      />

      <RunPayrollModal
        isOpen={isRunOpen}
        onClose={() => setIsRunOpen(false)}
        onSuccess={loadData}
        currentMonth={month}
        currentYear={year}
      />
    </div>
  );
}