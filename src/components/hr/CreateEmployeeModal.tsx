"use client";

import React, { useState } from "react";
import { X, UserPlus, ShieldCheck } from "lucide-react";
import { EmployeeCreatePayload, EmployeeRole, WageType } from "@/types/hr";
import { hrService } from "@/lib/services/hr";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateEmployeeModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<EmployeeCreatePayload>({
    employee_code: "",
    full_name: "",
    role: "SORTER",
    wage_type: "DAILY_WAGE",
    base_rate: 600,
    phone: "",
    bank_account_no: "",
    bank_ifsc: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await hrService.createEmployee(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to onboard employee");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DDE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EEF5ED] bg-[#FDF8EE]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase font-mono text-[#171F1B]">Onboard Worker / Staff</h3>
              <span className="text-[10px] font-mono text-[#7B8580]">Plant Operational Roster Registration</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#7B8580] hover:bg-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">Employee Code *</label>
              <input
                type="text"
                placeholder="e.g. EMP-SRT-01"
                required
                value={formData.employee_code}
                onChange={(e) => setFormData({ ...formData, employee_code: e.target.value.toUpperCase() })}
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">Full Name *</label>
              <input
                type="text"
                placeholder="Worker Name"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">Role Assignment *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as EmployeeRole })}
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              >
                <option value="SORTER">SORTER</option>
                <option value="OPERATOR">OPERATOR</option>
                <option value="DRIVER">DRIVER</option>
                <option value="SUPERVISOR">SUPERVISOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">Wage Model *</label>
              <select
                value={formData.wage_type}
                onChange={(e) => setFormData({ ...formData, wage_type: e.target.value as WageType })}
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              >
                <option value="DAILY_WAGE">DAILY WAGE</option>
                <option value="MONTHLY_FIXED">MONTHLY FIXED</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#7B8580] uppercase font-bold">
              Base Rate (₹ {formData.wage_type === "DAILY_WAGE" ? "Daily Shift Pay" : "Monthly Fixed Salary"}) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.base_rate}
              onChange={(e) => setFormData({ ...formData, base_rate: parseFloat(e.target.value) || 0 })}
              className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#7B8580] uppercase font-bold">Phone Number</label>
            <input
              type="text"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">Bank Account Number</label>
              <input
                type="text"
                placeholder="Direct settlement A/C"
                value={formData.bank_account_no}
                onChange={(e) => setFormData({ ...formData, bank_account_no: e.target.value })}
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#7B8580] uppercase font-bold">Bank IFSC Code</label>
              <input
                type="text"
                placeholder="e.g. HDFC0001234"
                value={formData.bank_ifsc}
                onChange={(e) => setFormData({ ...formData, bank_ifsc: e.target.value.toUpperCase() })}
                className="w-full mt-1 p-2.5 rounded-xl border border-[#DDE5DC] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="p-3 border-t border-[#EEF5ED] flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DDE5DC] text-xs font-mono text-[#52605A] hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#006B3C] hover:bg-[#00542E] text-white text-xs font-mono font-bold transition-all"
            >
              {submitting ? "Registering..." : "Onboard Worker"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}