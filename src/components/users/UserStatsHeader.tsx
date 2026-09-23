"use client";

import React from "react";
import { UserItem } from "@/types/users";
import { Users, ShieldAlert, Building2, CheckCircle2 } from "lucide-react";

interface Props {
  users: UserItem[];
}

export default function UserStatsHeader({ users }: Props) {
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.is_active).length;
  const superAdmins = users.filter((u) => u.role === "SUPER_ADMIN").length;
  const plantManagers = users.filter((u) => u.role === "PLANT_MANAGER").length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <div className="rounded-xl border border-[#DDE5DC] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Users</span>
          <span className="rounded-lg bg-[#FDF8EE] p-2 text-[#006B3C]">
            <Users className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-[#063D2A]">{totalUsers}</div>
        <p className="mt-1 text-xs text-slate-500">Across all operational nodes</p>
      </div>

      <div className="rounded-xl border border-[#DDE5DC] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Access</span>
          <span className="rounded-lg bg-[#EEF5ED] p-2 text-[#28A745]">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-[#006B3C]">{activeUsers}</div>
        <p className="mt-1 text-xs text-slate-500">{totalUsers - activeUsers} accounts deactivated</p>
      </div>

      <div className="rounded-xl border border-[#DDE5DC] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Super Admins</span>
          <span className="rounded-lg bg-amber-50 p-2 text-amber-700">
            <ShieldAlert className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-amber-900">{superAdmins}</div>
        <p className="mt-1 text-xs text-slate-500">Global system clearance</p>
      </div>

      <div className="rounded-xl border border-[#DDE5DC] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Plant Managers</span>
          <span className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
            <Building2 className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-[#063D2A]">{plantManagers}</div>
        <p className="mt-1 text-xs text-slate-500">Facility node operational leads</p>
      </div>
    </div>
  );
}