export type UserRole =
  | "SUPER_ADMIN"
  | "PLANT_MANAGER"
  | "WEIGHBRIDGE_OPERATOR"
  | "HR_OFFICER"
  | "SALES_LOGISTICS";

export interface PlantReference {
  id: string;
  name: string;
  code: string;
}

export interface UserItem {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  plant_id: string | null;
  plant?: PlantReference | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserCreatePayload {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  plant_id?: string | null;
}

export interface UserUpdatePayload {
  full_name?: string;
  role?: UserRole;
  plant_id?: string | null;
  is_active?: boolean;
}