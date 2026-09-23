export type UserRole =
  | "SUPER_ADMIN"
  | "PLANT_MANAGER"
  | "WEIGHBRIDGE_OPERATOR"
  | "HR_OFFICER"
  | "LOGISTICS";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  plant_id: string | null;
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}