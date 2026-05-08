import Link from "next/link";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";
import { getAdminProducts } from "@/lib/admin-products";
import { requireAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Товары — KROOKIES Admin" };

export default async function AdminProductsPage() {
  const user = await requireAdmin();
  const products = await getAdminProducts();

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <AdminHeader user={user} />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#54342C] md:text-6xl">
              Товары
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#54342C] sm:text-lg sm:leading-8">
              Управляйте ценой, описанием, составом, наличием и публикацией
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex w-full justify-center rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3F2721] sm:w-auto"
          >
            Добавить товар
          </Link>
        </div>

        <AdminProductsTable products={products} />
      </section>
    </main>
  );
}
