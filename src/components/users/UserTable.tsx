"use client";

import React, { useState } from "react";
import { UserItem, UserRole } from "@/types/users";
import { Shield, Building, Edit3, KeyRound, Trash2, Search, Filter } from "lucide-react";

interface Props {
  users: UserItem[];
  currentUserId?: string;
  onEditUser: (user: UserItem) => void;
  onResetPassword: (user: UserItem) => void;
  onDeleteUser: (user: UserItem) => void;
}

export default function UserTable({
  users,
  currentUserId,
  onEditUser,
  onResetPassword,
  onDeleteUser,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-800">SUPER ADMIN</span>;
      case "PLANT_MANAGER":
        return <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-800">PLANT MANAGER</span>;
      case "WEIGHBRIDGE_OPERATOR":
        return <span className="rounded-md border border-blue-300 bg-blue-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-800">WEIGHBRIDGE</span>;
      case "HR_OFFICER":
        return <span className="rounded-md border border-purple-300 bg-purple-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-800">HR OFFICER</span>;
      case "SALES_LOGISTICS":
        return <span className="rounded-md border border-orange-300 bg-orange-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-orange-800">SALES LOGISTICS</span>;
    }
  };

  return (
    <div className="rounded-xl border border-[#DDE5DC] bg-white shadow-sm font-sans">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 border-b border-[#DDE5DC] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by full name or email address..."
            className="w-full rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] py-2 pl-9 pr-3 text-xs text-[#171F1B] outline-none focus:border-[#006B3C]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-[#DDE5DC] bg-[#FAF8F5] px-3 py-2 text-xs font-semibold text-[#171F1B] outline-none focus:border-[#006B3C]"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="PLANT_MANAGER">PLANT_MANAGER</option>
            <option value="WEIGHBRIDGE_OPERATOR">WEIGHBRIDGE_OPERATOR</option>
            <option value="HR_OFFICER">HR_OFFICER</option>
            <option value="SALES_LOGISTICS">SALES_LOGISTICS</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#DDE5DC] bg-[#FAF8F5] text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Account Name</th>
              <th className="px-4 py-3">Clearance</th>
              <th className="px-4 py-3">Assigned Plant</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE5DC]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  No accounts found matching your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const isSelf = u.id === currentUserId;
                return (
                  <tr key={u.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-[#171F1B] flex items-center gap-1.5">
                        {u.full_name}
                        {isSelf && (
                          <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-mono text-emerald-800">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">{u.email}</div>
                    </td>
                    <td className="px-4 py-3">{getRoleBadge(u.role)}</td>
                    <td className="px-4 py-3 font-medium text-slate-600">
                      {u.plant ? (
                        <span className="flex items-center gap-1.5">
                          <Building className="h-3.5 w-3.5 text-slate-400" />
                          {u.plant.name} ({u.plant.code})
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-800">
                          <Shield className="h-3.5 w-3.5 text-amber-600" />
                          Global Scope
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {u.is_active ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#006B3C]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#28A745]" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onEditUser(u)}
                          title="Edit Profile & Plant Scope"
                          className="rounded p-1.5 text-slate-500 hover:bg-[#FAF8F5] hover:text-[#006B3C]"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onResetPassword(u)}
                          title="Reset Password"
                          className="rounded p-1.5 text-slate-500 hover:bg-[#FAF8F5] hover:text-amber-700"
                        >
                          <KeyRound className="h-3.5 w-3.5" />
                        </button>
                        <button
                          disabled={isSelf}
                          onClick={() => onDeleteUser(u)}
                          title={isSelf ? "Self-deletion disabled" : "Deactivate Account"}
                          className={`rounded p-1.5 transition-colors ${
                            isSelf
                              ? "opacity-30 cursor-not-allowed text-slate-400"
                              : "text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                          }`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}