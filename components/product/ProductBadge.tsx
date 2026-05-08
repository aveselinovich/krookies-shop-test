import { ProductBadge as ProductBadgeType } from "@/types/product";

type ProductBadgeProps = { badge: ProductBadgeType | null };

const LABELS: Record<ProductBadgeType, string> = {
  hit: "Хит",
  new: "Новинка",
  limited: "Лимитка",
};

export function ProductBadge({ badge }: ProductBadgeProps) {
  if (!badge) return null;
  return <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: "#E6AECB", color: "#54342C" }}>{LABELS[badge]}</span>;
}
