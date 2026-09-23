import { apiClient } from "@/lib/api-client";
import { UserItem, UserCreatePayload, UserUpdatePayload } from "@/types/users";

export const usersApi = {
  getUsers: async (params?: { role?: string; plant_id?: string; is_active?: boolean }) => {
    const res = await apiClient.get<UserItem[]>("/users", { params });
    return res.data;
  },

  getUserById: async (userId: string) => {
    const res = await apiClient.get<UserItem>(`/users/${userId}`);
    return res.data;
  },

  createUser: async (payload: UserCreatePayload) => {
    const res = await apiClient.post<UserItem>("/users", payload);
    return res.data;
  },

  updateUser: async (userId: string, payload: UserUpdatePayload) => {
    const res = await apiClient.patch<UserItem>(`/users/${userId}`, payload);
    return res.data;
  },

  toggleUserStatus: async (userId: string, isActive: boolean) => {
    const res = await apiClient.patch<UserItem>(`/users/${userId}/status`, { is_active: isActive });
    return res.data;
  },

  resetPassword: async (userId: string, newPassword: string) => {
    const res = await apiClient.post<{ message: string }>(`/users/${userId}/reset-password`, {
      new_password: newPassword,
    });
    return res.data;
  },

  deleteUser: async (userId: string) => {
    const res = await apiClient.delete<{ message: string; action: string; user_id: string }>(`/users/${userId}`);
    return res.data;
  },

  getPlants: async () => {
    const res = await apiClient.get<{ id: string; name: string; code: string }[]>("/plants");
    return res.data;
  },
};