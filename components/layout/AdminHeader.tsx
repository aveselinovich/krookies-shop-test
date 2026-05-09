"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User } from "@prisma/client";
import { MenuIcon, UserIcon, XIcon } from "@/components/ui/Icons";

const PINK = "#E6AECB";
const BROWN = "#54342C";

function AdminLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-2 text-center font-semibold shadow hover:opacity-90"
      style={{ backgroundColor: PINK, color: BROWN }}
    >
      {children}
    </Link>
  );
}

export function AdminHeader({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 backdrop-blur supports-[backdrop-filter]:bg-white/60" style={{ backgroundColor: "rgba(255,249,251,0.7)" }}>
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-3 md:min-w-0 md:flex-1">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <Image src="/logo-cookie.png" alt="KROOKIES" width={44} height={44} className="h-10 w-auto -translate-y-1" />
            <div className="min-w-0">
              <p className="truncate text-base font-black tracking-wide sm:text-lg" style={{ color: BROWN }}>KROOKIES</p>
              <p className="truncate text-xs" style={{ color: "rgba(84,52,44,0.7)" }}>{user.phone}</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow md:hidden"
            style={{ backgroundColor: PINK, color: BROWN }}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        <div className="hidden shrink-0 flex-wrap items-center justify-end gap-2 md:flex">
          <AdminLink href="/admin">Главная</AdminLink>
          <AdminLink href="/admin/orders">Заказы</AdminLink>
          <AdminLink href="/admin/products">Товары</AdminLink>
          <AdminLink href="/admin/users">Пользователи</AdminLink>
          <Link
            href="/admin/account/profile"
            className="hidden min-h-11 items-center gap-2 rounded-2xl px-4 py-2 font-semibold shadow hover:opacity-90 md:inline-flex"
            style={{ backgroundColor: PINK, color: BROWN }}
          >
            <UserIcon size={18} /> ЛК
          </Link>
        </div>

        {isOpen ? (
          <div className="grid gap-2 rounded-3xl bg-white p-3 shadow-lg ring-1 ring-black/5 md:hidden">
            <AdminLink href="/admin" onClick={closeMenu}>Главная</AdminLink>
            <AdminLink href="/admin/orders" onClick={closeMenu}>Заказы</AdminLink>
            <AdminLink href="/admin/products" onClick={closeMenu}>Товары</AdminLink>
            <AdminLink href="/admin/users" onClick={closeMenu}>Пользователи</AdminLink>
            <Link
              href="/admin/account/profile"
              onClick={closeMenu}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-center font-semibold shadow hover:opacity-90"
              style={{ backgroundColor: PINK, color: BROWN }}
            >
              <UserIcon size={18} /> ЛК
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
