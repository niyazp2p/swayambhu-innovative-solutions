export type WeightUnit = "KG" | "GRAMS" | "MT";

export interface MaterialCategory {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string;
}

export interface MaterialCategoryCreatePayload {
  name: string;
  description?: string;
}

export interface MaterialSubCategory {
  id: string;
  category_id: string;
  name: string;
  code: string; // e.g. SUB_POLYAL, SUB_HM, SUB_TUBE
  description?: string | null;
  created_at: string;
}

export interface MaterialSubCategoryCreatePayload {
  category_id: string;
  name: string;
  code: string;
  description?: string;
}

export interface ProductMaterialItem {
  id?: string;
  sub_category_id: string;
  sub_category_name?: string;
  sub_category_code?: string;
  weight: number;
  unit: WeightUnit;
  percentage_share?: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  dimensions?: string | null;
  total_quantity: number;
  unit_measure: string;
  total_weight_kg: number;
  is_active: boolean;
  materials_used: ProductMaterialItem[];
  created_at: string;
  updated_at?: string | null;
}

export interface ProductCreatePayload {
  sku: string;
  name: string;
  description?: string;
  dimensions?: string;
  total_quantity: number;
  unit_measure: string;
  materials: {
    sub_category_id: string;
    weight: number;
    unit: WeightUnit;
  }[];
}

export interface ProductUpdatePayload {
  name?: string;
  description?: string;
  dimensions?: string;
  unit_measure?: string;
  is_active?: boolean;
}

export interface QuantityUpdatePayload {
  total_quantity: number;
}