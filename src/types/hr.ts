export type EmployeeRole = "SORTER" | "OPERATOR" | "DRIVER" | "ADMIN" | "SUPERVISOR";
export type WageType = "DAILY_WAGE" | "MONTHLY_FIXED";
export type AttendanceStatus = "PRESENT" | "ABSENT" | "HALF_DAY" | "ON_LEAVE";
export type AdvanceStatus = "ACTIVE" | "REPAID";

export interface Employee {
  id: string;
  plant_id: string;
  employee_code: string;
  full_name: string;
  role: EmployeeRole;
  wage_type: WageType;
  base_rate: number;
  phone?: string | null;
  bank_account_no?: string | null;
  bank_ifsc?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface EmployeeCreatePayload {
  employee_code: string;
  full_name: string;
  role: EmployeeRole;
  wage_type: WageType;
  base_rate: number;
  phone?: string;
  bank_account_no?: string;
  bank_ifsc?: string;
}

export interface EmployeeUpdatePayload {
  full_name?: string;
  role?: EmployeeRole;
  wage_type?: WageType;
  base_rate?: number;
  phone?: string;
  bank_account_no?: string;
  bank_ifsc?: string;
  is_active?: boolean;
}

export interface AttendanceRecord {
  id: string;
  plant_id: string;
  employee_id: string;
  attendance_date: string;
  status: AttendanceStatus;
  check_in?: string | null;
  check_out?: string | null;
  is_late: boolean;
  overtime_hours: number;
  created_at?: string;
}

export interface AttendanceCreatePayload {
  employee_id: string;
  attendance_date: string;
  status: AttendanceStatus;
  check_in?: string | null;
  check_out?: string | null;
  is_late: boolean;
  overtime_hours: number;
}

export interface SalaryAdvance {
  id: string;
  plant_id: string;
  employee_id: string;
  principal_amount: number;
  tenure_months: number;
  monthly_emi: number;
  remaining_balance: number;
  status: AdvanceStatus;
  created_at?: string;
}

export interface AdvanceCreatePayload {
  employee_id: string;
  principal_amount: number;
  tenure_months: number;
}

export interface Payslip {
  id: string;
  plant_id: string;
  employee_id: string;
  month: number;
  year: number;
  gross_earnings: number;
  overtime_earnings: number;
  absence_deduction: number;
  late_deduction: number;
  advance_emi_deduction: number;
  total_deductions: number;
  net_salary: number;
  created_at?: string;
}

export interface ProcessPayrollPayload {
  month: number;
  year: number;
  working_days: number;
}