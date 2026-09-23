"use client";

import React, { useState, useEffect, useMemo } from "react";
import { HandCoins, Plus, Search, CheckCircle2, Clock } from "lucide-react";
import { SalaryAdvance, Employee, AdvanceStatus } from "@/types/hr";
import { hrService } from "@/lib/services/hr";
import IssueAdvanceModal from "@/components/hr/advances/IssueAdvanceModal";
import SettleAdvanceModal from "@/components/hr/advances/SettleAdvanceModal";

export default function SalaryAdvancesPage() {
  const [advances, setAdvances] = useState<SalaryAdvance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [selectedAdvance, setSelectedAdvance] = useState<SalaryAdvance | null>(
    null
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [advData, empData] = await Promise.all([
        hrService.getAdvances(),
        hrService.getEmployees(),
      ]);
      setAdvances(advData);
      setEmployees(empData);
    } catch (err) {
      console.error("Failed to load advances ledger", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const empMap = useMemo(() => {
    const map = new Map<string, Employee>();
    employees.forEach((e) => map.set(e.id, e));
    return map;
  }, [employees]);

  const filteredAdvances = useMemo(() => {
    return advances.filter((adv) => {
      const emp = empMap.get(adv.employee_id);
      const matchesSearch =
        (emp?.full_name &&
          emp.full_name.toLowerCase().includes(search.toLowerCase())) ||
        (emp?.employee_code &&
          emp.employee_code.toLowerCase().includes(search.toLowerCase())) ||
        adv.id.includes(search);
      const matchesStatus =
        statusFilter === "ALL" || adv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [advances, empMap, search, statusFilter]);

  const stats = useMemo(() => {
    const activeLoans = advances.filter((a) => a.status === "ACTIVE");
    const totalPrincipal = activeLoans.reduce(
      (acc, a) => acc + Number(a.principal_amount),
      0
    );
    const totalRemaining = activeLoans.reduce(
      (acc, a) => acc + Number(a.remaining_balance),
      0
    );
    const expectedMonthlyEmi = activeLoans.reduce(
      (acc, a) => acc + Number(a.monthly_emi),
      0
    );
    return {
      activeCount: activeLoans.length,
      totalPrincipal,
      totalRemaining,
      expectedMonthlyEmi,
    };
  }, [advances]);

  return (
    <div className="space-y-6 font-mono">
      {/* Telemetry Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
            Active Loans
          </span>
          <span className="text-2xl font-black text-[#171F1B] mt-1 block">
            {stats.activeCount}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
            Outstanding Capital
          </span>
          <span className="text-2xl font-black text-rose-600 mt-1 block">
            ₹{stats.totalRemaining.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
            Principal Disbursed
          </span>
          <span className="text-2xl font-black text-[#171F1B] mt-1 block">
            ₹{stats.totalPrincipal.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] text-[#7B8580] uppercase tracking-wider block">
            Scheduled Monthly EMI
          </span>
          <span className="text-2xl font-black text-[#006B3C] mt-1 block">
            ₹{stats.expectedMonthlyEmi.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Control & Filter Strip */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8580]" />
            <input
              type="text"
              placeholder="Search code or worker name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="REPAID">REPAID</option>
          </select>
        </div>

        <button
          onClick={() => setIsIssueOpen(true)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Issue Advance
        </button>
      </div>

      {/* Advances Ledger Table */}
      <div className="rounded-2xl border border-[#DDE5DC] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#DDE5DC] text-[10px] text-[#7B8580] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Worker Details</th>
                <th className="py-3 px-4 text-right">Principal</th>
                <th className="py-3 px-4 text-center">Tenure</th>
                <th className="py-3 px-4 text-right">Monthly EMI</th>
                <th className="py-3 px-4 text-right">Remaining Balance</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF5ED]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#7B8580]">
                    Loading advances ledger...
                  </td>
                </tr>
              ) : filteredAdvances.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#7B8580]">
                    No advance records found.
                  </td>
                </tr>
              ) : (
                filteredAdvances.map((adv) => {
                  const emp = empMap.get(adv.employee_id);
                  const isRepaid = adv.status === "REPAID";
                  return (
                    <tr
                      key={adv.id}
                      className="hover:bg-[#FAF8F5] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#171F1B] block">
                          {emp?.full_name || "Unknown"}
                        </span>
                        <span className="text-[10px] text-[#7B8580]">
                          {emp?.employee_code} • {emp?.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#171F1B]">
                        ₹{Number(adv.principal_amount).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-center text-[#52605A]">
                        {adv.tenure_months} mo
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#006B3C]">
                        ₹{Number(adv.monthly_emi).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-rose-600">
                        ₹{Number(adv.remaining_balance).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isRepaid ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                            <CheckCircle2 className="h-3 w-3" /> REPAID
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-bold">
                            <Clock className="h-3 w-3" /> ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {!isRepaid && (
                          <button
                            onClick={() => setSelectedAdvance(adv)}
                            className="px-2.5 py-1 rounded-lg border border-[#DDE5DC] hover:bg-white text-[10px] text-[#006B3C] font-bold"
                          >
                            Settle Cash
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <IssueAdvanceModal
        isOpen={isIssueOpen}
        onClose={() => setIsIssueOpen(false)}
        onSuccess={loadData}
        employees={employees}
      />

      <SettleAdvanceModal
        advance={selectedAdvance}
        employee={
          selectedAdvance ? empMap.get(selectedAdvance.employee_id) : undefined
        }
        isOpen={Boolean(selectedAdvance)}
        onClose={() => setSelectedAdvance(null)}
        onSuccess={loadData}
      />
    </div>
  );
}