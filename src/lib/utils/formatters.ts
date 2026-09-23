export const formatCurrency = (val: number | string): string => {
  const num = typeof val === "string" ? parseFloat(val) : val;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(num || 0);
};

export const formatWeight = (kg: number | string): string => {
  const num = typeof kg === "string" ? parseFloat(kg) : kg;
  return `${(num || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })} kg`;
};

export const formatMetricTon = (kg: number | string): string => {
  const num = typeof kg === "string" ? parseFloat(kg) : kg;
  return `${((num || 0) / 1000).toFixed(2)} MT`;
};