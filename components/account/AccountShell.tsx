import Link from "next/link";
import { User } from "@prisma/client";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export type AccountTab = "overview" | "orders" | "profile";

function menuClass(isActive: boolean) {
  return `inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-2xl px-3 py-3 text-center text-sm font-semibold transition sm:min-h-11 sm:px-5 lg:flex lg:w-full lg:justify-start lg:py-4 lg:text-left ${
    isActive
      ? "bg-[#54342C] text-white"
      : "bg-white text-[#54342C] shadow-lg ring-1 ring-black/5 hover:bg-[#FFFFFF]"
  }`;
}

export function AccountShell({
  user,
  active,
  children,
}: {
  user: User;
  active: AccountTab;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-[#FFF9FB]">
      <SiteHeader />

      <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="min-w-0">
            <h1 className="text-3xl font-black uppercase leading-tight text-[#54342C] sm:text-4xl">
              Личный
              <br className="hidden lg:block" />
              <span className="lg:ml-0 ml-2 lg:inline">кабинет</span>
            </h1>

            <nav className="mt-7 grid grid-cols-3 gap-3 lg:block lg:space-y-3">
              <Link href="/account" className={menuClass(active === "overview")}>Обзор</Link>

              <Link href="/account/orders" className={menuClass(active === "orders")}>Мои заказы</Link>

              <Link href="/account/profile" className={menuClass(active === "profile")}>Профиль</Link>

              <div className="hidden pt-2 lg:block">
                <LogoutButton variant="accent" className="w-full justify-center" />
              </div>
            </nav>
          </aside>

          <div className="min-w-0">
            {children}

            <div className="mt-6 lg:hidden">
              <LogoutButton variant="accent" className="w-full justify-center rounded-3xl px-6 py-5 text-base font-black tracking-normal" />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
