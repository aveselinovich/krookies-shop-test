import Link from "next/link";
import { requireAdmin } from "@/lib/permissions";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminProductForm } from "@/components/admin/AdminProductForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Добавить товар — KROOKIES Admin" };

export default async function NewAdminProductPage() {
  const user = await requireAdmin();

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <AdminHeader user={user} />

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-8">
          <Link
            href="/admin/products"
            className="inline-flex w-full justify-center rounded-full bg-[#FFF4F8] px-5 py-3 text-sm font-semibold text-[#54342C] transition hover:bg-[#E6AECB] sm:w-auto"
          >
            ← Назад к товарам
          </Link>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#54342C]">
            NEW PRODUCT
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#54342C] md:text-6xl">
            Добавить товар
          </h1>
          <p className="mt-5 text-base leading-7 text-[#54342C] sm:text-lg sm:leading-8">
            Создайте новый товар. Системный slug сформируется автоматически на основе названия
          </p>
        </div>

        <AdminProductForm mode="create" />
      </section>
    </main>
  );
}
