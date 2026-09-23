import { apiClient } from "@/lib/api-client";
import { DPRCreatePayload, DPRRecord, DowntimeLogResponse } from "@/types/operations";

export const operationsService = {
  // DPR Master Endpoints
  getDPRList: async (params?: { from_date?: string; to_date?: string; plant_id?: string }) => {
    const res = await apiClient.get<DPRRecord[]>("/operations/dpr", { params });
    return res.data;
  },

  getDPRById: async (id: string) => {
    const res = await apiClient.get<DPRRecord>(`/operations/dpr/${id}`);
    return res.data;
  },

  createDPR: async (payload: DPRCreatePayload, plantId?: string) => {
    const query = plantId ? `?plant_id=${plantId}` : "";
    const res = await apiClient.post<DPRRecord>(`/operations/dpr${query}`, payload);
    return res.data;
  },

  // Standalone Downtime Endpoints
  getDowntimeList: async (params?: { plant_id?: string; reason?: string }) => {
    const res = await apiClient.get<DowntimeLogResponse[]>("/operations/downtime", { params });
    return res.data;
  },
};