"use client";

import React, { useState, useEffect } from "react";
import { X, UserCheck, ShieldAlert, Phone, CreditCard, Building, Calendar, Edit3, Save } from "lucide-react";
import { Employee, EmployeeRole, WageType } from "@/types/hr";
import { hrService } from "@/lib/services/hr";

interface DrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export default function EmployeeDetailDrawer({ employee, isOpen, onClose, onRefresh }: DrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    role: "SORTER" as EmployeeRole,
    wage_type: "DAILY_WAGE" as WageType,
    base_rate: 0,
    phone: "",
    bank_account_no: "",
    bank_ifsc: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        full_name: employee.full_name,
        role: employee.role,
        wage_type: employee.wage_type,
        base_rate: Number(employee.base_rate),
        phone: employee.phone || "",
        bank_account_no: employee.bank_account_no || "",
        bank_ifsc: employee.bank_ifsc || "",
      });
      setIsEditing(false);
    }
  }, [employee]);

  if (!isOpen || !employee) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await hrService.updateEmployee(employee.id, formData);
      setIsEditing(false);
      onRefresh();
    } catch (err) {
      console.error("Failed to update employee", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivate = async () => {
    if (!confirm(`Deactivate employee ${employee.full_name}? Active payroll runs will exclude this worker.`)) return;
    setSubmitting(true);
    try {
      await hrService.deactivateEmployee(employee.id);
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Failed to deactivate", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-[#DDE5DC] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#EEF5ED] flex items-center justify-between bg-[#FDF8EE]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center font-bold">
              {employee.employee_code.substring(0, 3)}
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase font-mono text-[#171F1B]">{employee.full_name}</h3>
              <span className="text-[10px] font-mono text-[#7B8580]">{employee.employee_code} • {employee.plant_id.substring(0, 8)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 rounded-lg border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-white"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-[#7B8580] hover:bg-[#EEF5ED]">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 font-mono text-xs">
          {isEditing ? (
            <form id="edit-emp-form" onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-[10px] text-[#7B8580] uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full mt-1 p-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] text-[#171F1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[#7B8580] uppercase">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as EmployeeRole })}
                    className="w-full mt-1 p-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5]"
                  >
                    {["SORTER", "OPERATOR", "DRIVER", "ADMIN", "SUPERVISOR"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-[#7B8580] uppercase">Wage Type</label>
                  <select
                    value={formData.wage_type}
                    onChange={(e) => setFormData({ ...formData, wage_type: e.target.value as WageType })}
                    className="w-full mt-1 p-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5]"
                  >
                    <option value="DAILY_WAGE">DAILY WAGE</option>
                    <option value="MONTHLY_FIXED">MONTHLY FIXED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#7B8580] uppercase">
                  Base Rate (₹ {formData.wage_type === "DAILY_WAGE" ? "per day" : "per month"})
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.base_rate}
                  onChange={(e) => setFormData({ ...formData, base_rate: parseFloat(e.target.value) || 0 })}
                  className="w-full mt-1 p-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#7B8580] uppercase">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 p-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[#7B8580] uppercase">Bank Account</label>
                  <input
                    type="text"
                    value={formData.bank_account_no}
                    onChange={(e) => setFormData({ ...formData, bank_account_no: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#7B8580] uppercase">IFSC</label>
                  <input
                    type="text"
                    value={formData.bank_ifsc}
                    onChange={(e) => setFormData({ ...formData, bank_ifsc: e.target.value })}
                    className="w-full mt-1 p-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5]"
                  />
                </div>
              </div>
            </form>
          ) : (
            <>
              {/* Status Header */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#7B8580] block">Employment Status</span>
                  <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    employee.is_active ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {employee.is_active ? "ACTIVE ROSTER" : "DEACTIVATED"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#7B8580] block">Compensation</span>
                  <span className="text-sm font-bold text-[#006B3C]">
                    ₹{Number(employee.base_rate).toLocaleString("en-IN")} / {employee.wage_type === "DAILY_WAGE" ? "Day" : "Mo"}
                  </span>
                </div>
              </div>

              {/* Work Profile Details */}
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-wider text-[#7B8580] font-bold block border-b border-[#EEF5ED] pb-1">
                  Designation & Operational Role
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-[#DDE5DC] rounded-xl">
                    <span className="text-[9px] text-[#7B8580] block">Assigned Role</span>
                    <span className="font-bold text-[#171F1B] mt-0.5 block">{employee.role}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#DDE5DC] rounded-xl">
                    <span className="text-[9px] text-[#7B8580] block">Wage Model</span>
                    <span className="font-bold text-[#171F1B] mt-0.5 block">{employee.wage_type}</span>
                  </div>
                </div>
              </div>

              {/* Direct Banking Settlement */}
              <div className="p-3.5 bg-white border border-[#DDE5DC] rounded-xl space-y-2">
                <span className="text-[9px] text-[#7B8580] uppercase tracking-wider flex items-center gap-1 font-bold">
                  <CreditCard className="h-3.5 w-3.5 text-[#006B3C]" /> Direct Salary Remittance
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[9px] text-[#7B8580] block">Account Number</span>
                    <span className="font-bold text-[#171F1B]">{employee.bank_account_no || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#7B8580] block">IFSC Code</span>
                    <span className="font-bold text-[#006B3C]">{employee.bank_ifsc || "Not Provided"}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#EEF5ED] flex items-center gap-1.5 text-[#52605A]">
                  <Phone className="h-3 w-3 text-[#006B3C]" />
                  <span>{employee.phone || "No phone linked"}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EEF5ED] bg-[#FAF8F5] flex items-center justify-between">
          {employee.is_active ? (
            <button
              onClick={handleDeactivate}
              disabled={submitting}
              className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-[11px] font-mono flex items-center gap-1 transition-colors"
            >
              <ShieldAlert className="h-3.5 w-3.5" /> Deactivate
            </button>
          ) : (
            <span className="text-[10px] font-mono text-[#7B8580]">Worker Deactivated</span>
          )}

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="edit-emp-form"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-mono font-bold flex items-center gap-1"
                >
                  <Save className="h-3.5 w-3.5" /> Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-white"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}