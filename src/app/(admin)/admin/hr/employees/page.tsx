"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Users, UserPlus, Search, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { Employee } from "@/types/hr";
import { hrService } from "@/lib/services/hr";
import EmployeeDetailDrawer from "@/components/hr/EmployeeDetailDrawer";
import CreateEmployeeModal from "@/components/hr/CreateEmployeeModal";
import EmployeeDeleteModal from "@/components/hr/EmployeeDeleteModal";

export default function EmployeesTab() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [wageFilter, setWageFilter] = useState<string>("ALL");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await hrService.getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load staff roster", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeDeactivated = (deactivatedId: string) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === deactivatedId ? { ...e, is_active: false } : e))
    );
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
        emp.employee_code.toLowerCase().includes(search.toLowerCase()) ||
        (emp.phone && emp.phone.includes(search));
      const matchesRole = roleFilter === "ALL" || emp.role === roleFilter;
      const matchesWage = wageFilter === "ALL" || emp.wage_type === wageFilter;
      return matchesSearch && matchesRole && matchesWage;
    });
  }, [employees, search, roleFilter, wageFilter]);

  const metrics = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.is_active).length;
    const dailyWage = employees.filter((e) => e.wage_type === "DAILY_WAGE").length;
    const monthlyFixed = employees.filter((e) => e.wage_type === "MONTHLY_FIXED").length;
    return { total, active, dailyWage, monthlyFixed };
  }, [employees]);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] font-mono text-[#7B8580] uppercase tracking-wider block">Total Headcount</span>
          <span className="text-2xl font-mono font-black text-[#171F1B] mt-1 block">{metrics.total}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] font-mono text-[#7B8580] uppercase tracking-wider block">Active On Roster</span>
          <span className="text-2xl font-mono font-black text-[#006B3C] mt-1 block">{metrics.active}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] font-mono text-[#7B8580] uppercase tracking-wider block">Daily Wage Sorters</span>
          <span className="text-2xl font-mono font-black text-[#171F1B] mt-1 block">{metrics.dailyWage}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] shadow-xs">
          <span className="text-[10px] font-mono text-[#7B8580] uppercase tracking-wider block">Fixed Staff</span>
          <span className="text-2xl font-mono font-black text-[#171F1B] mt-1 block">{metrics.monthlyFixed}</span>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8580]" />
            <input
              type="text"
              placeholder="Search code, name, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="py-2 px-3 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono"
          >
            <option value="ALL">All Roles</option>
            <option value="SORTER">SORTER</option>
            <option value="OPERATOR">OPERATOR</option>
            <option value="DRIVER">DRIVER</option>
            <option value="SUPERVISOR">SUPERVISOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <select
            value={wageFilter}
            onChange={(e) => setWageFilter(e.target.value)}
            className="py-2 px-3 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5] text-xs font-mono"
          >
            <option value="ALL">All Wage Types</option>
            <option value="DAILY_WAGE">Daily Wage</option>
            <option value="MONTHLY_FIXED">Monthly Fixed</option>
          </select>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <UserPlus className="h-4 w-4" /> Onboard Staff
        </button>
      </div>

      {/* Directory Table */}
      <div className="rounded-2xl border border-[#DDE5DC] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#DDE5DC] text-[10px] text-[#7B8580] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Worker Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Model</th>
                <th className="py-3 px-4">Base Rate</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF5ED]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-[#7B8580]">Loading employee registry...</td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-[#7B8580]">No employees found matching filter criteria.</td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#171F1B]">{emp.employee_code}</td>
                    <td className="py-3 px-4 font-semibold text-[#171F1B]">{emp.full_name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#EEF5ED] text-[#006B3C] font-semibold text-[10px]">
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#52605A]">{emp.wage_type === "DAILY_WAGE" ? "Daily" : "Monthly"}</td>
                    <td className="py-3 px-4 font-bold text-[#171F1B]">
                      ₹{Number(emp.base_rate).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-[#7B8580]">{emp.phone || "—"}</td>
                    <td className="py-3 px-4 text-center">
                      {emp.is_active ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                          <XCircle className="h-3 w-3" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedEmployee(emp)}
                          className="px-2.5 py-1 rounded-lg border border-[#DDE5DC] hover:bg-white text-[11px] text-[#006B3C] font-bold"
                        >
                          Inspect
                        </button>
                        {emp.is_active && (
                          <button
                            onClick={() => setEmployeeToDelete(emp)}
                            className="p-1 rounded-lg border border-[#DDE5DC] hover:border-rose-300 text-[#7B8580] hover:text-rose-600 transition-colors"
                            title="Deactivate Worker"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals and Drawers */}
      <EmployeeDetailDrawer
        employee={selectedEmployee}
        isOpen={Boolean(selectedEmployee)}
        onClose={() => setSelectedEmployee(null)}
        onRefresh={fetchEmployees}
      />

      <CreateEmployeeModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={fetchEmployees}
      />

      <EmployeeDeleteModal
        employee={employeeToDelete}
        isOpen={Boolean(employeeToDelete)}
        onClose={() => setEmployeeToDelete(null)}
        onSuccess={handleEmployeeDeactivated}
      />
    </div>
  );
}