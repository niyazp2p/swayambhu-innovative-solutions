export type DispatchStatus = "PENDING" | "WEIGHED_OUT" | "DISPATCHED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID";

// --- Nested Summaries ---
export interface PlantSummary {
  id: string;
  name: string;
  code: string;
}

export interface WasteGradeSummary {
  id: string;
  category_name: string;
  grade_code: string;
  current_rate_per_kg: number;
}

// --- Buyer Models ---
export interface Buyer {
  id: string;
  name: string;
  gstin?: string | null;
  pan_number?: string | null;
  state_code: string;
  contact_person?: string | null;
  contact_phone: string;
  billing_address: string;
  shipping_address?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface BuyerCreatePayload {
  name: string;
  gstin?: string | null;
  pan_number?: string | null;
  state_code?: string;
  contact_person?: string | null;
  contact_phone: string;
  billing_address: string;
  shipping_address?: string | null;
}

export interface BuyerUpdatePayload {
  name?: string;
  gstin?: string | null;
  pan_number?: string | null;
  state_code?: string;
  contact_person?: string | null;
  contact_phone?: string;
  billing_address?: string;
  shipping_address?: string | null;
  is_active?: boolean;
}

// --- Outward Dispatch & Gate Pass Models ---
export interface DispatchOrderCreatePayload {
  buyer_id: string;
  waste_grade_id: string;
  vehicle_number: string;
  driver_name?: string;
  driver_phone?: string;
  transporter_name?: string;
  eway_bill_number?: string;
  tare_weight_kg: number;
  gross_weight_kg: number;
  bales_count?: number;
  rate_per_kg: number;
  gst_rate_percent?: number;
  is_interstate?: boolean;
  dispatch_date?: string;
  remarks?: string;
}

export interface DispatchOrder {
  id: string;
  dispatch_number: string;
  plant_id: string;
  buyer_id: string;
  waste_grade_id: string;
  vehicle_number: string;
  driver_name?: string | null;
  driver_phone?: string | null;
  transporter_name?: string | null;
  eway_bill_number?: string | null;
  tare_weight_kg: number;
  gross_weight_kg: number;
  net_weight_kg: number;
  bales_count: number;
  rate_per_kg: number;
  taxable_amount: number;
  cgst_rate: number;
  cgst_amount: number;
  sgst_rate: number;
  sgst_amount: number;
  igst_rate: number;
  igst_amount: number;
  total_amount: number;
  amount_paid: number;
  status: DispatchStatus;
  payment_status: PaymentStatus;
  dispatch_date: string;
  remarks?: string | null;
  created_at: string;
  updated_at?: string;

  // Eager-loaded relations
  buyer?: Buyer;
  plant?: PlantSummary;
  waste_grade?: WasteGradeSummary;
}

// --- Financial Settlement ---
export interface PaymentUpdatePayload {
  payment_amount: number;
  payment_reference?: string;
}

// --- Query Filters ---
export interface DispatchFilterParams {
  plant_id?: string;
  buyer_id?: string;
  payment_status?: PaymentStatus;
  from_date?: string;
  to_date?: string;
  limit?: number;
  offset?: number;
}