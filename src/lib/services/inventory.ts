import { apiClient } from "@/lib/api-client";
import {
  PaginatedStockResponse,
  InventoryStockItem,
  StockAdjustmentPayload,
  StockLedgerEntry,
} from "@/types/inventory";

export const inventoryService = {
  getCurrentStock: async (params?: {
    plant_id?: string;
    search?: string;
    category?: string;
  }) => {
    const res = await apiClient.get<PaginatedStockResponse>("/inventory/stock", {
      params,
    });
    return res.data;
  },

  adjustStock: async (payload: StockAdjustmentPayload, plantId?: string) => {
    const params = plantId ? { plant_id: plantId } : {};
    const res = await apiClient.post<InventoryStockItem>(
      "/inventory/adjustments",
      payload,
      { params }
    );
    return res.data;
  },

  getGradeLedger: async (
    gradeId: string,
    params?: { plant_id?: string; limit?: number }
  ) => {
    const res = await apiClient.get<StockLedgerEntry[]>(
      `/inventory/ledger/${gradeId}`,
      { params }
    );
    return res.data;
  },
};