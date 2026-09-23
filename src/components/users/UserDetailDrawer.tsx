"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Shield, Building, UserCheck, UserX, KeyRound } from "lucide-react";
import { UserItem, UserRole } from "@/types/users";
import { usersApi } from "@/lib/services/users";

interface DrawerProps {
  user: UserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onOpenResetPassword: (user: UserItem) => void;
  plants: { id: string; name: string; code: string }[];
}

export default function UserDetailDrawer({
  user,
  isOpen,
  onClose,
  onRefresh,
  onOpenResetPassword,
  plants,
}: DrawerProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("WEIGHBRIDGE_OPERATOR");
  const [plantId, setPlantId] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setRole(user.role);
      setPlantId(user.plant_id || "");
      setIsActive(user.is_active);
      setErrorMsg("");
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (role !== "SUPER_ADMIN" && !plantId) {
      setErrorMsg("Plant assignment is required for operational roles.");
      return;
    }

    try {
      setSubmitting(true);
      await usersApi.updateUser(user.id, {
        full_name: fullName.trim(),
        role,
        plant_id: role === "SUPER_ADMIN" ? null : plantId,
        is_active: isActive,
      });
      onRefresh();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed to update user profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end font-sans">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#DDE5DC] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#DDE5DC] flex items-center justify-between bg-[#FDF8EE]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#EEF5ED] text-[#006B3C] font-bold flex items-center justify-center font-mono">
              {user.full_name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#171F1B] leading-tight">{user.full_name}</h3>
              <p className="text-[11px] font-mono text-[#7B8580]">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#EEF5ED]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {errorMsg && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          <form id="edit-user-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-xs text-[#171F1B] focus:border-[#006B3C] focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Role Clearance
              </label>
              <select
                value={role}
                onChange={(e) => {
                  const nextRole = e.target.value as UserRole;
                  setRole(nextRole);
                  if (nextRole === "SUPER_ADMIN") setPlantId("");
                }}
                className="mt-1 w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-xs font-semibold text-[#171F1B] focus:border-[#006B3C] outline-none"
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN (Global Clearance)</option>
                <option value="PLANT_MANAGER">PLANT_MANAGER</option>
                <option value="WEIGHBRIDGE_OPERATOR">WEIGHBRIDGE_OPERATOR</option>
                <option value="HR_OFFICER">HR_OFFICER</option>
                <option value="SALES_LOGISTICS">SALES_LOGISTICS</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Facility Node Scope {role === "SUPER_ADMIN" ? "(Global / None)" : "(Required)"}
              </label>
              <select
                disabled={role === "SUPER_ADMIN"}
                value={plantId}
                onChange={(e) => setPlantId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-xs font-semibold text-[#171F1B] focus:border-[#006B3C] outline-none disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">{role === "SUPER_ADMIN" ? "Global Scope (NULL)" : "-- Select Plant Node --"}</option>
                {plants.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Operational Status
              </label>
              <div className="mt-2 flex items-center gap-3">
                <label className="inline-flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="account_status"
                    checked={isActive}
                    onChange={() => setIsActive(true)}
                    className="text-[#006B3C]"
                  />
                  <span className="font-semibold text-[#006B3C]">Active Clearance</span>
                </label>
                <label className="inline-flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="account_status"
                    checked={!isActive}
                    onChange={() => setIsActive(false)}
                    className="text-rose-600"
                  />
                  <span className="font-semibold text-rose-600">Deactivated</span>
                </label>
              </div>
            </div>
          </form>

          {/* Security Credentials Action */}
          <div className="pt-4 border-t border-[#DDE5DC] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Security Credentials
            </span>
            <button
              type="button"
              onClick={() => onOpenResetPassword(user)}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
            >
              <KeyRound className="h-4 w-4 text-amber-600" /> Reset Operator Password
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#DDE5DC] bg-[#FAF8F5] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#DDE5DC] text-xs font-semibold text-slate-600 hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-user-form"
            disabled={submitting}
            className="flex items-center gap-1.5 rounded-lg bg-[#006B3C] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#063D2A] disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}