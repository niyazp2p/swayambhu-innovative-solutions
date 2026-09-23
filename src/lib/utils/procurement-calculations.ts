export interface WeightCalculationResult {
  net_weight: number;
  moisture_deduction_kg: number;
  accepted_net_weight: number;
  total_payable_amount: number;
  isValid: boolean;
  error?: string;
}

export function calculateLiveGRN(
  gross: number,
  tare: number,
  moisturePct: number,
  contaminationKg: number,
  ratePerKg: number
): WeightCalculationResult {
  if (gross <= 0 || tare < 0) {
    return { net_weight: 0, moisture_deduction_kg: 0, accepted_net_weight: 0, total_payable_amount: 0, isValid: false };
  }
  if (tare >= gross) {
    return { net_weight: 0, moisture_deduction_kg: 0, accepted_net_weight: 0, total_payable_amount: 0, isValid: false, error: "Tare weight cannot exceed gross weight." };
  }

  const net_weight = Number((gross - tare).toFixed(2));
  const moisture_deduction_kg = Number((net_weight * (moisturePct / 100)).toFixed(2));
  const accepted_net_weight = Math.max(0, Number((net_weight - moisture_deduction_kg - contaminationKg).toFixed(2)));
  const total_payable_amount = Number((accepted_net_weight * ratePerKg).toFixed(2));

  return {
    net_weight,
    moisture_deduction_kg,
    accepted_net_weight,
    total_payable_amount,
    isValid: true,
  };
}