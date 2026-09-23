// --- Core & Auth ---
export type UserRole =
  | "SUPER_ADMIN"
  | "PLANT_MANAGER"
  | "WEIGHBRIDGE_OPERATOR"
  | "HR_OFFICER"
  | "LOGISTICS";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  plant_id: string | null;
  is_active: boolean;
}

// --- Procurement & Inward ---
export interface Vendor {
  id: string;
  name: string;
  vendor_type: "KABADIWALA" | "INDUSTRIAL" | "MUNICIPAL";
  contact_phone: string;
  address?: string;
  bank_account_no?: string;
  bank_ifsc?: string;
}

export interface WasteGrade {
  id: string;
  category_name: string;
  grade_code: string;
  current_rate_per_kg: number;
  deduction_method: "FLAT_PERCENTAGE" | "SLAB";
}

export interface GRNCreatePayload {
  vendor_id: string;
  waste_grade_id: string;
  vehicle_number: string;
  gross_weight: number;
  tare_weight: number;
  moisture_percentage: number;
  contamination_deduction_kg: number;
  is_manual_override?: boolean;
}

export interface GRNRecord {
  id: string;
  grn_number: string;
  vendor_id: string;
  waste_grade_id: string;
  vehicle_number: string;
  gross_weight: number;
  tare_weight: number;
  net_weight: number;
  moisture_deduction_kg: number;
  contamination_deduction_kg: number;
  accepted_net_weight: number;
  total_payable_amount: number;
  created_at: string;
}

// --- Operations & DPR ---
export interface ProductionItem {
  waste_grade_id: string;
  output_weight_kg: number;
  bales_produced: number;
}

export interface DowntimeLog {
  reason: "MAINTENANCE" | "POWER_OUTAGE" | "NO_FEEDSTOCK" | "OTHER";
  duration_minutes: number;
  description?: string;
}

export interface DPRCreatePayload {
  report_date: string;
  electricity_kwh: number;
  diesel_liters: number;
  strapping_wire_kg: number;
  total_raw_processed_kg: number;
  total_inert_waste_kg: number;
  remarks?: string;
  production_items: ProductionItem[];
  downtime_logs: DowntimeLog[];
}

// --- HR & Payroll ---
export interface Employee {
  id: string;
  employee_code: string;
  full_name: string;
  role: string;
  wage_type: "MONTHLY_FIXED" | "DAILY_WAGE";
  base_rate: number;
  phone?: string;
  is_active: boolean;
}

export interface AttendancePayload {
  employee_id: string;
  attendance_date: string;
  status: "PRESENT" | "ABSENT" | "HALF_DAY";
  is_late: boolean;
  overtime_hours: number;
}

export interface AdvancePayload {
  employee_id: string;
  principal_amount: number;
  tenure_months: number;
}

export interface PayrollRunPayload {
  month: number;
  year: number;
  working_days: number;
}