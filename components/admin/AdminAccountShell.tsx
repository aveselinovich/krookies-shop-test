import Link from "next/link";
import { User } from "@prisma/client";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { AdminHeader } from "@/components/layout/AdminHeader";

export type AdminAccountTab = "profile" | "admins";

function menuClass(isActive: boolean) {
  return `inline-flex w-full min-w-0 min-h-10 items-center justify-center whitespace-nowrap rounded-2xl px-2.5 py-3 text-center text-[13px] font-semibold transition sm:min-h-11 sm:px-5 sm:text-sm lg:flex lg:w-full lg:justify-start lg:py-4 lg:text-left ${
    isActive
      ? "bg-[#54342C] text-white"
      : "bg-white text-[#54342C] shadow-lg ring-1 ring-black/5 hover:bg-[#FFFFFF]"
  }`;
}

export function AdminAccountShell({
  user,
  active,
  children,
}: {
  user: User;
  active: AdminAccountTab;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#FFF9FB]">
      <AdminHeader user={user} />

      <section className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-5 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="min-w-0">
            <h1 className="text-3xl font-black uppercase leading-tight text-[#54342C] sm:text-4xl">
              Личный
              <br className="hidden lg:block" />
              <span className="ml-2 lg:ml-0 lg:inline">кабинет</span>
            </h1>

            <nav className="mt-7 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 lg:block lg:space-y-3">
              <Link href="/admin/account/profile" className={menuClass(active === "profile")}>Мои данные</Link>

              <Link href="/admin/admins" className={menuClass(active === "admins")}>Администраторы</Link>

              <div className="hidden pt-2 lg:block">
                <LogoutButton variant="accent" className="w-full justify-center" />
              </div>
            </nav>
          </aside>

          <div className="min-w-0">
            {children}

            <div className="mt-6 overflow-hidden lg:hidden">
              <LogoutButton variant="accent" className="w-full justify-center rounded-3xl px-6 py-5 text-base font-black tracking-normal" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
