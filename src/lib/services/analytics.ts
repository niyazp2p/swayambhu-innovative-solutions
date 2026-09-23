import { apiClient } from "@/lib/api-client";
import { YieldAnalyticsResponse } from "@/types/analytics";

export interface UtilityEfficiencyResponse {
  plant_id: string;
  from_date: string;
  to_date: string;
  total_electricity_kwh: number;
  total_diesel_liters: number;
  total_strapping_wire_kg: number;
  kwh_per_ton_processed: number;
  diesel_liters_per_ton_processed: number;
  wire_kg_per_baled_ton: number;
}

export interface DowntimeMetric {
  reason: string;
  total_minutes: number;
  incident_count: number;
}

export interface DowntimeSummaryResponse {
  plant_id: string;
  from_date: string;
  to_date: string;
  total_downtime_minutes: number;
  operational_uptime_pct: number;
  breakdown_by_reason: DowntimeMetric[];
}

export const analyticsService = {
  getYieldMetrics: async (fromDate: string, toDate: string, plantId?: string | null) => {
    const params: Record<string, string> = { from_date: fromDate, to_date: toDate };
    if (plantId) params.plant_id = plantId;
    const res = await apiClient.get<YieldAnalyticsResponse>("/analytics/yield", { params });
    return res.data;
  },

  getUtilityMetrics: async (fromDate: string, toDate: string, plantId?: string | null) => {
    const params: Record<string, string> = { from_date: fromDate, to_date: toDate };
    if (plantId) params.plant_id = plantId;
    const res = await apiClient.get<UtilityEfficiencyResponse>("/analytics/utilities", { params });
    return res.data;
  },

  getDowntimeMetrics: async (fromDate: string, toDate: string, plantId?: string | null) => {
    const params: Record<string, string> = { from_date: fromDate, to_date: toDate };
    if (plantId) params.plant_id = plantId;
    const res = await apiClient.get<DowntimeSummaryResponse>("/analytics/downtime", { params });
    return res.data;
  },
};