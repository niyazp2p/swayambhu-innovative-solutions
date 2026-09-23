"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/types/auth";
import { apiClient } from "@/lib/api-client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  selectedPlantId: string | null;
  setSelectedPlantId: (plantId: string | null) => void;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await apiClient.get<User>("/auth/me");
      setUser(data);

      if (data.plant_id) {
        setSelectedPlantId(data.plant_id);
      } else {
        // Super Admin fallback: fetch provisioned plant facilities
        const plantsRes = await apiClient.get("/admin/plants").catch(() => null);
        const fallbackId = plantsRes?.data?.[0]?.id || plantsRes?.data?.items?.[0]?.id;
        if (fallbackId) {
          setSelectedPlantId(fallbackId);
        }
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  const login = async (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
    await fetchProfile();
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");
    }
    setUser(null);
    setSelectedPlantId(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        selectedPlantId,
        setSelectedPlantId,
        login,
        logout,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
};