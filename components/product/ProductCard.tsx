import Image from "next/image";
import Link from "next/link";
import { ProductListItem } from "@/types/product";
import { Price } from "@/components/ui/Price";
import { ProductBadge } from "@/components/product/ProductBadge";
import { ProductCardActions } from "@/components/catalog/ProductCardActions";

const BROWN = "#54342C";

type ProductCardProps = { product: ProductListItem };

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5 transition hover:-translate-y-1">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative">
          {product.badge ? (
            <span className="absolute left-3 top-3 z-10">
              <ProductBadge badge={product.badge} />
            </span>
          ) : null}

          <div className="relative aspect-[4/3] bg-white">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm opacity-70">
                Нет фото
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-lg font-extrabold" style={{ color: BROWN }}>
              {product.title}
            </h3>
          </Link>
          <Price price={product.price} oldPrice={product.oldPrice} />
        </div>

        {product.shortDescription ? (
          <p className="mt-1 min-h-[40px] text-sm opacity-80">
            {product.shortDescription}
          </p>
        ) : null}

        <div className="mt-5 flex justify-center">
          {product.isAvailable ? (
            <ProductCardActions
              product={{
                productId: product.id,
                title: product.title,
                slug: product.slug,
                imageUrl: product.imageUrl,
                price: product.price,
              }}
            />
          ) : (
            <button disabled className="w-full rounded-2xl bg-[#FFF4F8] px-5 py-3 font-semibold opacity-70">
              Нет в наличии
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
