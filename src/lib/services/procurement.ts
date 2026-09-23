import { apiClient } from "@/lib/api-client";
import {
  Vendor,
  VendorCreatePayload,
  WasteGrade,
  WasteGradeCreatePayload,
  GRNRecord,
  GRNCreatePayload,
  BatchItem,
} from "@/types/procurement";

export const procurementService = {
  // Vendor Registry
  getVendors: () => apiClient.get<Vendor[]>("/procurement/vendors").then((res) => res.data),
  createVendor: (payload: VendorCreatePayload, plantId?: string) =>
  apiClient.post<Vendor>("/procurement/vendors", payload, {
    params: plantId ? { plant_id: plantId } : undefined,
  }).then((res) => res.data),
  deleteVendor: (id: string) =>
  apiClient.delete<{ message: string; action: "DELETED" | "DEACTIVATED"; vendor_id: string }>(
    `/procurement/vendors/${id}`
  ).then((res) => res.data),

  // Grades & Pricing
  getGrades: () => apiClient.get<WasteGrade[]>("/procurement/grades").then((res) => res.data),
  getGradeById: (id: string) =>
    apiClient.get<WasteGrade>(`/procurement/grades/${id}`).then((res) => res.data),
  createGrade: (payload: WasteGradeCreatePayload) =>
    apiClient.post<WasteGrade>("/procurement/grades", payload).then((res) => res.data),

  // Weighbridge (GRN)
  getGRNList: (params?: { limit?: number; vendor_id?: string }) =>
    apiClient.get<GRNRecord[]>("/procurement/grn", { params }).then((res) => res.data),
  createGRN: (payload: GRNCreatePayload) =>
    apiClient.post<GRNRecord>("/procurement/grn", payload).then((res) => res.data),

  // Intake Batches
  getBatches: (params?: { stage?: string }) =>
    apiClient.get<BatchItem[]>("/procurement/batches", { params }).then((res) => res.data),
  updateBatchLocation: (id: string, yard_location: string) =>
    apiClient.patch<BatchItem>(`/procurement/batches/${id}/location`, { yard_location }).then((res) => res.data),
};