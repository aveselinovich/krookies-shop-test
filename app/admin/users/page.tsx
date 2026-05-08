import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminCustomersTable } from "@/components/admin/AdminCustomersTable";
import { getAdminCustomers } from "@/lib/admin-customers";
import { requireAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Пользователи — KROOKIES Admin" };

export default async function AdminUsersPage() {
  const user = await requireAdmin();
  const users = await getAdminCustomers();

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <AdminHeader user={user} />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight text-[#54342C] md:text-6xl">
            Пользователи
          </h1>
          <p className="mt-5 text-base leading-7 text-[#54342C] sm:text-lg sm:leading-8">
            Здесь можно посмотреть пользователей витрины и отредактировать их данные
          </p>
        </div>

        <AdminCustomersTable users={users} />
      </section>
    </main>
  );
}
