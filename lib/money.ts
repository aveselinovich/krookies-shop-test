export function rubToKopecks(rubles: number): number {
  return Math.round(rubles * 100);
}

export function kopecksToRub(kopecks: number): number {
  return kopecks / 100;
}

export function formatPrice(kopecks: number): string {
  const rubles = kopecksToRub(kopecks);
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(rubles);
}
