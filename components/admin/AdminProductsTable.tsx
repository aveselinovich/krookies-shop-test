import Link from "next/link";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/money";
import { formatProductWeight } from "@/lib/product-weight";

function truncateWithDots(text: string, maxLength = 58) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function AdminProductsTable({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="rounded-3xl bg-[#FFFFFF] p-8 text-center text-[#54342C]">
        Товаров пока нет
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#FFFFFF] shadow-lg ring-1 ring-black/5">
      <div className="grid gap-4 p-4 lg:hidden">
        {products.map((product) => (
          <article key={product.id} className="rounded-2xl bg-[#FFF9FB] p-4 ring-1 ring-[#E6AECB]">
            <div className="flex gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#FFF4F8]">
                <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#54342C]">{product.title}</p>
                <p className="mt-1 text-sm text-[#54342C]">{truncateWithDots(product.shortDescription, 84)}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-[#54342C] sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Цена</p>
                <p className="mt-1 font-semibold text-[#54342C]">{formatPrice(product.price)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Вес</p>
                <p className="mt-1 font-semibold text-[#54342C]">{formatProductWeight(product.weight)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Наличие</p>
                <span className="mt-1 inline-flex rounded-full bg-[#FFF4F8] px-3 py-1 text-xs font-semibold text-[#54342C]">
                  {product.isAvailable ? "В наличии" : "Нет"}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Опубликовано</p>
                <span className="mt-1 inline-flex rounded-full bg-[#FFF4F8] px-3 py-1 text-xs font-semibold text-[#54342C]">
                  {product.isPublished ? "Да" : "Нет"}
                </span>
              </div>
            </div>

            <Link
              href={`/admin/products/${product.id}`}
              className="mt-4 inline-flex w-full justify-center rounded-full bg-[#54342C] px-4 py-3 text-sm font-semibold text-white"
            >
              Редактировать
            </Link>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E6AECB] text-center text-sm text-[#54342C]">
              <th className="px-5 py-4">Товар</th>
              <th className="px-5 py-4">Цена</th>
              <th className="px-5 py-4">Вес</th>
              <th className="px-5 py-4">Наличие</th>
              <th className="px-5 py-4">Опубликовано</th>
              <th className="px-5 py-4">Действие</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[#E6AECB] text-center last:border-b-0">
                <td className="px-5 py-4 text-left">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-[#FFF4F8]">
                      <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#54342C]">{product.title}</p>
                      <p className="mt-1 max-w-xs overflow-hidden whitespace-nowrap text-sm text-[#54342C]">
                        {truncateWithDots(product.shortDescription)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-semibold text-[#54342C]">{formatPrice(product.price)}</td>
                <td className="px-5 py-4 text-sm text-[#54342C]">{formatProductWeight(product.weight)}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-[#FFF4F8] px-3 py-1 text-xs font-semibold text-[#54342C]">
                    {product.isAvailable ? "В наличии" : "Нет"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-[#FFF4F8] px-3 py-1 text-xs font-semibold text-[#54342C]">
                    {product.isPublished ? "Да" : "Нет"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="inline-flex rounded-full bg-[#54342C] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
