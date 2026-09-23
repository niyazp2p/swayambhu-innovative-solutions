export interface YieldAnalyticsResponse {
  plant_id: string;
  from_date: string;
  to_date: string;
  total_raw_processed_kg: number;
  total_output_kg: number;
  total_inert_waste_kg: number;
  total_variance_kg: number;
  overall_recovery_rate_pct: number;
  output_breakdown_by_grade: Record<string, number>;
}

export interface AnalyticsDateFilter {
  fromDate: string;
  toDate: string;
}