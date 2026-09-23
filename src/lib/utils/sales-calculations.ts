export interface DispatchMathHUD {
  net_weight_kg: number;
  taxable_amount: number;
  cgst_amount: number;
  sgst_amount: number;
  igst_amount: number;
  total_amount: number;
  isValid: boolean;
  error?: string;
}

export function calculateLiveDispatch(
  grossKg: number,
  tareKg: number,
  ratePerKg: number,
  gstRatePercent: number = 18.0,
  isInterstate: boolean = false,
  availableStockKg?: number
): DispatchMathHUD {
  if (grossKg <= 0 || tareKg < 0) {
    return {
      net_weight_kg: 0,
      taxable_amount: 0,
      cgst_amount: 0,
      sgst_amount: 0,
      igst_amount: 0,
      total_amount: 0,
      isValid: false,
    };
  }

  if (tareKg >= grossKg) {
    return {
      net_weight_kg: 0,
      taxable_amount: 0,
      cgst_amount: 0,
      sgst_amount: 0,
      igst_amount: 0,
      total_amount: 0,
      isValid: false,
      error: "Gross weight must strictly exceed tare weight.",
    };
  }

  const net_weight_kg = Number((grossKg - tareKg).toFixed(2));

  if (availableStockKg !== undefined && net_weight_kg > availableStockKg) {
    return {
      net_weight_kg,
      taxable_amount: 0,
      cgst_amount: 0,
      sgst_amount: 0,
      igst_amount: 0,
      total_amount: 0,
      isValid: false,
      error: `Net outward weight (${net_weight_kg} kg) exceeds available stock (${availableStockKg} kg).`,
    };
  }

  const taxable_amount = Number((net_weight_kg * ratePerKg).toFixed(2));
  let cgst_amount = 0;
  let sgst_amount = 0;
  let igst_amount = 0;

  if (isInterstate) {
    igst_amount = Number((taxable_amount * (gstRatePercent / 100)).toFixed(2));
  } else {
    const halfRate = gstRatePercent / 2 / 100;
    cgst_amount = Number((taxable_amount * halfRate).toFixed(2));
    sgst_amount = Number((taxable_amount * halfRate).toFixed(2));
  }

  const total_amount = Number((taxable_amount + cgst_amount + sgst_amount + igst_amount).toFixed(2));

  return {
    net_weight_kg,
    taxable_amount,
    cgst_amount,
    sgst_amount,
    igst_amount,
    total_amount,
    isValid: true,
  };
}