import { ProductListItem } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

type ProductGridProps = { products: ProductListItem[] };

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <div className="rounded-3xl bg-white p-8 text-center shadow-lg ring-1 ring-black/5">Сейчас товары временно недоступны</div>;
  }
  return <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
