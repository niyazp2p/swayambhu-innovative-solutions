import { apiClient } from "@/lib/api-client";
import {
  Buyer,
  BuyerCreatePayload,
  BuyerUpdatePayload,
  DispatchOrder,
  DispatchOrderCreatePayload,
  PaymentUpdatePayload,
  DispatchFilterParams,
} from "@/types/sales";

export const salesService = {
  // =========================================================================
  // 1. Offtaker Buyers Endpoints (/api/v1/sales/buyers)
  // =========================================================================

  getBuyers: async (params?: { search?: string; is_active?: boolean }): Promise<Buyer[]> => {
    const res = await apiClient.get<Buyer[]>("/sales/buyers", { params });
    return res.data;
  },

  getBuyerById: async (buyerId: string): Promise<Buyer> => {
    const res = await apiClient.get<Buyer>(`/sales/buyers/${buyerId}`);
    return res.data;
  },

  createBuyer: async (payload: BuyerCreatePayload): Promise<Buyer> => {
    const res = await apiClient.post<Buyer>("/sales/buyers", payload);
    return res.data;
  },

  updateBuyer: async (buyerId: string, payload: BuyerUpdatePayload): Promise<Buyer> => {
    const res = await apiClient.patch<Buyer>(`/sales/buyers/${buyerId}`, payload);
    return res.data;
  },

  // =========================================================================
  // 2. Outward Dispatches & Manifests (/api/v1/sales/dispatch)
  // =========================================================================

  getDispatches: async (params?: DispatchFilterParams): Promise<DispatchOrder[]> => {
    const res = await apiClient.get<DispatchOrder[]>("/sales/dispatch", { params });
    return res.data;
  },

  getDispatchById: async (dispatchId: string): Promise<DispatchOrder> => {
    const res = await apiClient.get<DispatchOrder>(`/sales/dispatch/${dispatchId}`);
    return res.data;
  },

  createDispatch: async (
    payload: DispatchOrderCreatePayload,
    plantId?: string
  ): Promise<DispatchOrder> => {
    const res = await apiClient.post<DispatchOrder>("/sales/dispatch", payload, {
      params: plantId ? { plant_id: plantId } : undefined,
    });
    return res.data;
  },

  // =========================================================================
  // 3. Accounts Receivable & Settlement Endpoints
  // =========================================================================

  recordPayment: async (
    dispatchId: string,
    payload: PaymentUpdatePayload
  ): Promise<DispatchOrder> => {
    const res = await apiClient.post<DispatchOrder>(
      `/sales/dispatch/${dispatchId}/payment`,
      payload
    );
    return res.data;
  },

  // =========================================================================
  // 4. Authenticated Document Engine Streamers (Gate Pass & Tax Invoice)
  // =========================================================================

  getGatePassPdfBlob: async (dispatchId: string): Promise<Blob> => {
    const res = await apiClient.get(`/sales/dispatch/${dispatchId}/gate-pass`, {
      responseType: "blob",
    });
    return new Blob([res.data], { type: "application/pdf" });
  },

  getTaxInvoicePdfBlob: async (dispatchId: string): Promise<Blob> => {
    const res = await apiClient.get(`/sales/dispatch/${dispatchId}/invoice`, {
      responseType: "blob",
    });
    return new Blob([res.data], { type: "application/pdf" });
  },

  getGatePassDirectUrl: (dispatchId: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
    return `${baseUrl}/sales/dispatch/${dispatchId}/gate-pass`;
  },

  getTaxInvoiceDirectUrl: (dispatchId: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
    return `${baseUrl}/sales/dispatch/${dispatchId}/invoice`;
  },
};