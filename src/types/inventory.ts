export type StockMovementType =
  | "PRODUCTION_INFLOW"
  | "DISPATCH_OUTFLOW"
  | "STOCK_ADJUSTMENT"
  | "AUDIT_RECONCILIATION";

export interface InventoryStockItem {
  id: string;
  plant_id: string;
  waste_grade_id: string;
  waste_grade_code: string;
  category_name: string;
  current_stock_kg: number;
  bales_in_stock: number;
  current_valuation_inr: number;
  updated_at: string;
}

export interface PaginatedStockResponse {
  total_grades: number;
  total_stock_kg: number;
  total_bales: number;
  total_valuation_inr: number;
  items: InventoryStockItem[];
}

export interface StockAdjustmentPayload {
  waste_grade_id: string;
  adjusted_weight_kg: number;
  adjusted_bales: number;
  remarks: string;
}

export interface StockLedgerEntry {
  id: string;
  movement_type: StockMovementType;
  delta_weight_kg: number;
  delta_bales: number;
  balance_weight_kg: number;
  balance_bales: number;
  reference_id?: string | null;
  remarks?: string | null;
  created_at: string;
}