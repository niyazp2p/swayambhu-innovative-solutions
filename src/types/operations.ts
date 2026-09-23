export enum DowntimeReason {
  MACHINE_BREAKDOWN = "MACHINE_BREAKDOWN",
  POWER_OUTAGE = "POWER_OUTAGE",
  FEEDSTOCK_SHORTAGE = "FEEDSTOCK_SHORTAGE",
  MAINTENANCE = "MAINTENANCE",
  LABOR_UNAVAILABLE = "LABOR_UNAVAILABLE",
  OTHER = "OTHER",
}

export interface ProductionLogItem {
  waste_grade_id: string;
  output_weight_kg: number;
  bales_produced: number;
}

export interface ProductionLogResponse extends ProductionLogItem {
  id: string;
  dpr_id: string;
  created_at: string;
}

export interface DowntimeLogItem {
  reason: DowntimeReason;
  duration_minutes: number;
  equipment_name?: string;
  description?: string;
}

export interface DowntimeLogResponse extends DowntimeLogItem {
  id: string;
  plant_id: string;
  dpr_id?: string;
  created_at: string;
}

export interface DPRCreatePayload {
  plant_id?: string;
  report_date: string;
  electricity_kwh: number;
  diesel_liters: number;
  strapping_wire_kg: number;
  total_raw_processed_kg: number;
  total_inert_waste_kg: number;
  remarks?: string;
  production_items: ProductionLogItem[];
  downtime_logs: DowntimeLogItem[];
}

export interface DPRRecord {
  id: string;
  plant_id: string;
  report_date: string;
  supervisor_id: string;
  electricity_kwh: number;
  diesel_liters: number;
  strapping_wire_kg: number;
  total_raw_processed_kg: number;
  total_output_produced_kg: number;
  total_inert_waste_kg: number;
  mass_balance_variance_kg: number;
  remarks?: string;
  production_items: ProductionLogResponse[];
  downtime_logs: DowntimeLogResponse[];
  created_at: string;
  updated_at: string;
}