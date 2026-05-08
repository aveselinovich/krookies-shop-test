export function normalizeWeightValue(value: string | null | undefined) {
  return String(value || "").replace(/\D/g, "");
}

export function formatProductWeight(value: string | null | undefined) {
  const normalized = normalizeWeightValue(value);
  if (!normalized) return "";
  return `${normalized} г`;
}
