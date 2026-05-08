import { formatPrice } from "@/lib/money";

type PriceProps = { price: number; oldPrice?: number | null; className?: string };

export function Price({ price, oldPrice, className }: PriceProps) {
  return (
    <div className={className}>
      <span className="font-bold" style={{ color: "#54342C" }}>{formatPrice(price)}</span>
      {oldPrice ? <span className="ml-2 text-sm opacity-50 line-through">{formatPrice(oldPrice)}</span> : null}
    </div>
  );
}
