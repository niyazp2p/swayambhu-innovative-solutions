import { apiClient } from "@/lib/api-client";
import {
  Vendor,
  WasteGrade,
  GRNCreatePayload,
  GRNRecord,
  DPRCreatePayload,
  Employee,
  AttendancePayload,
  AdvancePayload,
  PayrollRunPayload,
} from "@/types/admin";

// Procurement Endpoints
export const procurementApi = {
  getVendors: () => apiClient.get<Vendor[]>("/procurement/vendors").then((r) => r.data),
  createVendor: (payload: Partial<Vendor>) =>
    apiClient.post<Vendor>("/procurement/vendors", payload).then((r) => r.data),

  getGrades: () => apiClient.get<WasteGrade[]>("/procurement/grades").then((r) => r.data),
  createGrade: (payload: Partial<WasteGrade>) =>
    apiClient.post<WasteGrade>("/procurement/grades", payload).then((r) => r.data),

  createGRN: (payload: GRNCreatePayload) =>
    apiClient.post<GRNRecord>("/procurement/grn", payload).then((r) => r.data),
  getGRNList: () => apiClient.get<GRNRecord[]>("/procurement/grn").then((r) => r.data),
};

// Operations Endpoints
export const operationsApi = {
  submitDPR: (payload: DPRCreatePayload) =>
    apiClient.post("/operations/dpr", payload).then((r) => r.data),
  getDPRLogs: (date?: string) =>
    apiClient.get("/operations/dpr", { params: { date } }).then((r) => r.data),
};

// HR & Payroll Endpoints
export const hrApi = {
  getEmployees: () => apiClient.get<Employee[]>("/hr/employees").then((r) => r.data),
  createEmployee: (payload: Partial<Employee>) =>
    apiClient.post<Employee>("/hr/employees", payload).then((r) => r.data),

  recordAttendance: (payload: AttendancePayload) =>
    apiClient.post("/hr/attendance", payload).then((r) => r.data),

  issueAdvance: (payload: AdvancePayload) =>
    apiClient.post("/hr/advances", payload).then((r) => r.data),

  processPayroll: (payload: PayrollRunPayload) =>
    apiClient.post("/hr/payroll/process", payload).then((r) => r.data),

  getPayslipPdfUrl: (payslipId: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/payslip/${payslipId}/pdf`,
};

// Inventory & Dispatches
export const inventoryApi = {
  getStockLedger: () => apiClient.get("/inventory/stock").then((r) => r.data),
  getDispatches: () => apiClient.get("/sales/dispatch").then((r) => r.data),
};