import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { getAdminDashboardStats } from "@/lib/admin-orders";
import { requireAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Админка — KROOKIES" };

export default async function AdminPage() {
  const user = await requireAdmin();
  const stats = await getAdminDashboardStats();

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <AdminHeader user={user} />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#54342C] md:text-6xl">
            Панель менеджера
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#54342C]">
            Заявки, оплаты, производство и ручная Яндекс Доставка
          </p>
          <a
            href="/admin/catalog"
            className="mt-6 inline-flex rounded-full bg-[#FFF4F8] px-5 py-3 text-sm font-semibold text-[#54342C] shadow-sm ring-1 ring-[#E6AECB] transition hover:bg-white"
          >
            Открыть витрину админа
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:[grid-auto-rows:1fr] xl:grid-cols-3">
          <AdminStatsCard
            title="Новые заявки"
            value={stats.pendingConfirmation}
            description="Заказы, которые нужно проверить"
            href="/admin/orders?status=pending_confirmation"
          />
          <AdminStatsCard
            title="Ожидают оплаты"
            value={stats.pendingPayment}
            href="/admin/orders?status=pending_payment"
          />
          <AdminStatsCard
            title="Приняты"
            value={stats.accepted}
            href="/admin/orders?status=accepted"
          />
          <AdminStatsCard
            title="Выпекаются"
            value={stats.baking}
            href="/admin/orders?status=baking"
          />
          <AdminStatsCard
            title="Готовы"
            value={stats.ready}
            href="/admin/orders?status=ready"
          />
          <AdminStatsCard
            title="Доставлены"
            value={stats.delivered}
            href="/admin/orders?status=delivered"
          />
        </div>
      </section>
    </main>
  );
}
