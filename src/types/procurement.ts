export type VendorType = "KABADIWALA" | "INDUSTRIAL_GENERATOR" | "MUNICIPAL" | "OTHER";
export type BatchStage = "RAW" | "SORTED" | "PROCESSED_BALED" | "FINISHED_GOODS";
export type DeductionMethod = "FLAT_PERCENTAGE" | "SLAB" | "MANUAL_ASSESSMENT";
export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID";

export interface Vendor {
  id: string;
  plant_id: string;
  name: string;
  vendor_type: VendorType;
  contact_phone?: string | null;
  address?: string | null;
  bank_account_no?: string | null;
  bank_ifsc?: string | null;
  gstin?: string | null;
  pan_number?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface VendorCreatePayload {
  name: string;
  vendor_type: VendorType;
  contact_phone?: string;
  address?: string;
  bank_account_no?: string;
  bank_ifsc?: string;
  gstin?: string;
  pan_number?: string;
}

export interface WasteGrade {
  id: string;
  plant_id: string;
  category_name: string;
  grade_code: string;
  current_rate_per_kg: number;
  deduction_method: DeductionMethod;
  is_active: boolean;
}

export interface WasteGradeCreatePayload {
  category_name: string;
  grade_code: string;
  current_rate_per_kg: number;
  deduction_method: DeductionMethod;
}

export interface GRNCreatePayload {
  vendor_id: string;
  waste_grade_id: string;
  vehicle_number: string;
  gross_weight: number;
  tare_weight: number;
  moisture_percentage?: number;
  contamination_deduction_kg?: number;
  is_manual_override?: boolean;
  override_reason?: string;
  load_photo_url?: string;
}

export interface GRNRecord {
  id: string;
  grn_number: string;
  plant_id: string;
  vendor_id: string;
  waste_grade_id: string;
  vehicle_number: string;
  gross_weight: number;
  tare_weight: number;
  net_weight: number;
  accepted_net_weight: number;
  rate_per_kg: number;
  total_payable_amount: number;
  payment_status: PaymentStatus;
  amount_settled: number;
  is_manual_override?: boolean;
  override_reason?: string | null;
  load_photo_url?: string | null;
  created_at: string;
  vendor?: Vendor;
}

export interface BatchItem {
  id: string;
  plant_id: string;
  batch_code: string;
  grn_id?: string | null;
  stage: BatchStage;
  yard_location?: string | null;
  initial_quantity_kg: number;
  current_quantity_kg: number;
  is_consumed: boolean;
  created_at: string;
}