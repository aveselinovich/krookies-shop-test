import { AdminHeader } from "@/components/layout/AdminHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getPublishedProducts } from "@/lib/products";
import { requireAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Каталог — KROOKIES Admin",
  description: "Просмотр клиентской витрины внутри админки",
};

export default async function AdminCatalogPage() {
  const user = await requireAdmin();
  const products = await getPublishedProducts();

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <AdminHeader user={user} />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#54342C] md:text-6xl">
            Каталог
          </h1>

          <p className="mt-5 text-base leading-7 text-[#54342C] sm:text-lg sm:leading-8">
            Так каталог выглядит для пользователей. Здесь можно быстро
            проверить карточки товаров, цены, фото и наличие после изменений
            в админке
          </p>
        </div>

        <ProductGrid products={products} />

        <div className="mt-10 rounded-3xl bg-[#FFF4F8] p-6 text-[#54342C] md:p-8">
          <h2 className="text-xl font-semibold">Как работает заказ?</h2>

          <p className="mt-3 max-w-4xl leading-7 text-[#54342C]">
            Пользователь отправляет заказ на подтверждение. Менеджер проверяет
            адрес, желаемое время доставки и возможность приготовления. После
            подтверждения менеджер отправляет ссылку на оплату печенья.
            Доставка Яндекс оплачивается отдельно
          </p>
        </div>
      </section>
    </main>
  );
}
