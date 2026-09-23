"use client";

import React, { useState } from "react";
import { UserRole } from "@/types/users";
import { usersApi } from "@/lib/services/users";
import { X, UserPlus, Eye, EyeOff } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plants: { id: string; name: string; code: string }[];
}

export default function CreateUserModal({ isOpen, onClose, onSuccess, plants }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("WEIGHBRIDGE_OPERATOR");
  const [plantId, setPlantId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (role !== "SUPER_ADMIN" && !plantId) {
      setErrorMsg("Plant assignment is required for non-Super Admin roles.");
      return;
    }

    try {
      setSubmitting(true);
      await usersApi.createUser({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        plant_id: role === "SUPER_ADMIN" ? null : plantId,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed to provision new user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[#DDE5DC] bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#DDE5DC] pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-[#EEF5ED] p-2 text-[#006B3C]">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#063D2A]">Provision Operational User</h3>
              <p className="text-xs text-slate-500">Configure credentials and assign RBAC clearance</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ramesh Chandra"
              className="mt-1 w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-sm text-[#063D2A] outline-none focus:border-[#006B3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@swayambhuinfo.com"
              className="mt-1 w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-sm text-[#063D2A] outline-none focus:border-[#006B3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 pr-10 text-sm text-[#063D2A] outline-none focus:border-[#006B3C]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">User Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="mt-1 w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-sm font-medium text-[#063D2A] outline-none focus:border-[#006B3C]"
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN (Global)</option>
                <option value="PLANT_MANAGER">PLANT_MANAGER</option>
                <option value="WEIGHBRIDGE_OPERATOR">WEIGHBRIDGE_OPERATOR</option>
                <option value="HR_OFFICER">HR_OFFICER</option>
                <option value="SALES_LOGISTICS">SALES_LOGISTICS</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Facility Node {role === "SUPER_ADMIN" ? "(Disabled)" : "(Required)"}
              </label>
              <select
                disabled={role === "SUPER_ADMIN"}
                value={plantId}
                onChange={(e) => setPlantId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-sm font-medium text-[#063D2A] outline-none focus:border-[#006B3C] disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">{role === "SUPER_ADMIN" ? "Global Scope (NULL)" : "-- Select Plant --"}</option>
                {plants.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#DDE5DC] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#DDE5DC] px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-[#006B3C] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#063D2A] disabled:opacity-50"
            >
              {submitting ? "Provisioning..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}