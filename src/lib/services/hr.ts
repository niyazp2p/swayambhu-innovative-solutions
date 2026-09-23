import { apiClient } from "@/lib/api-client";
import {
  Employee,
  EmployeeCreatePayload,
  EmployeeUpdatePayload,
  AttendanceRecord,
  AttendanceCreatePayload,
  SalaryAdvance,
  AdvanceCreatePayload,
  Payslip,
  ProcessPayrollPayload,
} from "@/types/hr";

export const hrService = {
  // ----------------- 1. EMPLOYEES -----------------
  getEmployees: async (params?: {
    role?: string;
    wage_type?: string;
    is_active?: boolean;
    plant_id?: string;
  }) => {
    const cleanParams: Record<string, any> = {};
    if (params?.role && params.role !== "ALL") cleanParams.role = params.role;
    if (params?.wage_type && params.wage_type !== "ALL") cleanParams.wage_type = params.wage_type;
    if (typeof params?.is_active === "boolean") cleanParams.is_active = params.is_active;
    if (params?.plant_id) cleanParams.plant_id = params.plant_id;

    const res = await apiClient.get<Employee[]>("/hr/employees", { params: cleanParams });
    return res.data;
  },

  getEmployeeById: async (employeeId: string) => {
    const res = await apiClient.get<Employee>(`/hr/employees/${employeeId}`);
    return res.data;
  },

  createEmployee: async (payload: EmployeeCreatePayload, plantId?: string) => {
    const res = await apiClient.post<Employee>("/hr/employees", payload, {
      params: plantId ? { plant_id: plantId } : undefined,
    });
    return res.data;
  },

  updateEmployee: async (employeeId: string, payload: EmployeeUpdatePayload) => {
    const res = await apiClient.patch<Employee>(`/hr/employees/${employeeId}`, payload);
    return res.data;
  },

  deactivateEmployee: async (employeeId: string) => {
    const res = await apiClient.delete<Employee>(`/hr/employees/${employeeId}`);
    return res.data;
  },

  // ----------------- 2. DAILY ATTENDANCE -----------------
  getAttendance: async (params?: {
    attendance_date?: string;
    employee_id?: string;
    month?: number;
    year?: number;
    plant_id?: string;
  }) => {
    const res = await apiClient.get<AttendanceRecord[]>("/hr/attendance", { params });
    return res.data;
  },

  logAttendance: async (payload: AttendanceCreatePayload) => {
    const res = await apiClient.post<AttendanceRecord>("/hr/attendance", payload);
    return res.data;
  },

  logBulkAttendance: async (records: AttendanceCreatePayload[]) => {
    const res = await apiClient.post<AttendanceRecord[]>("/hr/attendance/bulk", { records });
    return res.data;
  },

  updateAttendance: async (attendanceId: string, payload: Partial<AttendanceCreatePayload>) => {
    const res = await apiClient.patch<AttendanceRecord>(`/hr/attendance/${attendanceId}`, payload);
    return res.data;
  },

  // ----------------- 3. SALARY ADVANCES -----------------
  getAdvances: async (params?: {
    status?: "ACTIVE" | "REPAID";
    employee_id?: string;
    plant_id?: string;
  }) => {
    const res = await apiClient.get<SalaryAdvance[]>("/hr/advances", { params });
    return res.data;
  },

  issueAdvance: async (payload: AdvanceCreatePayload) => {
    const res = await apiClient.post<SalaryAdvance>("/hr/advances", payload);
    return res.data;
  },

  settleAdvanceManually: async (advanceId: string, settlementAmount: number) => {
    const res = await apiClient.patch<SalaryAdvance>(`/hr/advances/${advanceId}/settle`, {
      settlement_amount: settlementAmount,
    });
    return res.data;
  },

  // ----------------- 4. PAYROLL & PAYSLIPS -----------------
  getPayslips: async (params: {
    month: number;
    year: number;
    employee_id?: string;
    plant_id?: string;
  }) => {
    const res = await apiClient.get<Payslip[]>("/hr/payslips", { params });
    return res.data;
  },

  getPayslipDetail: async (payslipId: string) => {
    const res = await apiClient.get<Payslip>(`/hr/payslip/${payslipId}`);
    return res.data;
  },

  processPayroll: async (payload: ProcessPayrollPayload, plantId?: string) => {
    const res = await apiClient.post<Payslip[]>("/hr/payroll/process", payload, {
      params: plantId ? { plant_id: plantId } : undefined,
    });
    return res.data;
  },

  getPayslipPdfUrl: (payslipId: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
    return `${baseUrl}/hr/payslip/${payslipId}/pdf`;
  },
};