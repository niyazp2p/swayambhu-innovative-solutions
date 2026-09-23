"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserItem } from "@/types/users";
import { usersApi } from "@/lib/services/users";
import UserStatsHeader from "@/components/users/UserStatsHeader";
import UserTable from "@/components/users/UserTable";
import CreateUserModal from "@/components/users/CreateUserModal";
import UserDetailDrawer from "@/components/users/UserDetailDrawer";
import ResetPasswordModal from "@/components/users/ResetPasswordModal";
import UserDeleteModal from "@/components/users/UserDeleteModal";
import { UserPlus, ShieldX, RefreshCw } from "lucide-react";

export default function UsersManagementPage() {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState<UserItem[]>([]);
  const [plantsList, setPlantsList] = useState<{ id: string; name: string; code: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals & Drawers State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // RBAC Access Guard: Strictly SUPER_ADMIN only
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, plantsData] = await Promise.all([
        usersApi.getUsers(),
        usersApi.getPlants().catch(() => [
          { id: "SIS-HRD-01", name: "Haridwar SIDCUL Complex", code: "SIS-HRD-01" },
        ]),
      ]);
      setUsersList(usersData);
      setPlantsList(plantsData);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) {
      loadData();
    }
  }, [isSuperAdmin]);

  if (!isSuperAdmin) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="rounded-full border border-red-200 bg-red-50 p-4 text-red-600">
          <ShieldX className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-[#063D2A]">Restricted Administration View</h2>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          Only accounts with Super Admin privileges are authorized to provision, edit, and audit system users[cite: 1, 4].
        </p>
      </div>
    );
  }

  const handleOpenEdit = (targetUser: UserItem) => {
    setSelectedUser(targetUser);
    setIsDetailDrawerOpen(true);
  };

  const handleOpenResetPassword = (targetUser: UserItem) => {
    setSelectedUser(targetUser);
    setIsResetPasswordOpen(true);
  };

  const handleOpenDelete = (targetUser: UserItem) => {
    setSelectedUser(targetUser);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#063D2A]">User Accounts & Multi-Plant RBAC</h1>
          <p className="text-xs text-slate-500">
            Control user clearance, facility-level assignments, and password lifecycles[cite: 1, 4].
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 rounded-lg border border-[#DDE5DC] bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm hover:bg-[#FAF8F5]"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Sync
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#006B3C] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#063D2A]"
          >
            <UserPlus className="h-4 w-4" /> Provision User
          </button>
        </div>
      </div>

      {/* KPI Headcount Summary */}
      <UserStatsHeader users={usersList} />

      {/* Directory Table with CRUD Action Triggers */}
      <UserTable
        users={usersList}
        currentUserId={user?.id}
        onEditUser={handleOpenEdit}
        onResetPassword={handleOpenResetPassword}
        onDeleteUser={handleOpenDelete}
      />

      {/* Create Modal */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={loadData}
        plants={plantsList}
      />

      {/* Edit & Scope Drawer */}
      <UserDetailDrawer
        user={selectedUser}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onRefresh={loadData}
        onOpenResetPassword={handleOpenResetPassword}
        plants={plantsList}
      />

      {/* Password Reset Modal */}
      <ResetPasswordModal
        user={selectedUser}
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        onSuccess={loadData}
      />

      {/* Soft-Delete Confirmation Modal */}
<UserDeleteModal
  user={selectedUser}
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onSuccess={(deletedId: string, action?: string) => {
    if (action === "DEACTIVATED") {
      setUsersList((prev) =>
        prev.map((u) => (u.id === deletedId ? { ...u, is_active: false } : u))
      );
    } else {
      setUsersList((prev) => prev.filter((u) => u.id !== deletedId));
    }
    setSelectedUser(null);
  }}
/>
    </div>
  );
}