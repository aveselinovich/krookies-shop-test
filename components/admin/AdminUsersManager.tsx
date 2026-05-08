"use client";

import { FormEvent, useState } from "react";
import type { AdminUserListItem } from "@/lib/admin-users";

type AdminUsersManagerProps = {
  admins: AdminUserListItem[];
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  password: "",
};

function getAdminErrorMessage(error: string) {
  switch (error) {
    case "invalid_phone":
      return "Проверьте номер телефона";
    case "invalid_email":
      return "Проверьте адрес почты";
    case "email_required":
      return "Укажите почту администратора";
    case "email_already_used":
      return "Эта почта уже используется другим администратором";
    case "password_too_short":
      return "Пароль должен быть не короче 8 символов";
    case "database_unavailable":
      return "Сейчас нет соединения с базой данных";
    case "protected_admin":
      return "KROOKIES Admin нельзя удалить";
    case "admin_not_found":
      return "Администратор не найден";
    default:
      return "Не получилось сохранить администратора";
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function AdminUsersManager({ admins: initialAdmins }: AdminUsersManagerProps) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [form, setForm] = useState(INITIAL_FORM);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          password: form.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "admin_create_failed");
      }

      const nextAdmin = result.user as AdminUserListItem;
      setAdmins((current) => {
        const existing = current.find((item) => item.id === nextAdmin.id);
        if (existing) {
          return current.map((item) => (item.id === nextAdmin.id ? nextAdmin : item));
        }
        return [...current, nextAdmin];
      });
      setForm(INITIAL_FORM);
      setMessage(result.created ? "Администратор добавлен" : "Права администратора обновлены");
    } catch (error) {
      console.error(error);
      setMessage(getAdminErrorMessage(error instanceof Error ? error.message : "admin_create_failed"));
    } finally {
      setIsSaving(false);
    }
  }

  async function removeAdmin(admin: AdminUserListItem) {
    const isConfirmed = window.confirm(
      `Уверены, что хотите удалить администратора ${admin.name || admin.phone}?`
    );

    if (!isConfirmed) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/admins/${admin.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "admin_delete_failed");
      }

      setAdmins((current) => current.filter((item) => item.id !== admin.id));
    } catch (error) {
      console.error(error);
      setMessage(getAdminErrorMessage(error instanceof Error ? error.message : "admin_delete_failed"));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-w-0 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="min-w-0 rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5 md:p-8">
        <h1 className="text-[2rem] font-black text-[#54342C]">Администраторы</h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#54342C]">
          Здесь можно смотреть текущих администраторов и добавлять новых
        </p>

        <div className="mt-8 grid gap-4">
          {admins.map((admin) => (
            <article
              key={admin.id}
              className="rounded-2xl bg-[#FFF9FB] p-5 ring-1 ring-[#E6AECB]"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <h2 className="text-lg font-black text-[#54342C]">
                    {admin.name || "Администратор KROOKIES"}
                  </h2>
                  <p className="mt-1 text-[#54342C]">{admin.phone}</p>
                  {admin.email ? <p className="mt-1 break-all text-sm text-[#54342C]">{admin.email}</p> : null}
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#8A6A62] ring-1 ring-[#E6AECB]">
                    с {formatDate(admin.createdAt.toString())}
                  </span>
                  {admin.isPrimary ? (
                    <span className="inline-flex w-fit rounded-full bg-[#54342C] px-3 py-1 text-xs font-semibold text-white">
                      KROOKIES Admin
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeAdmin(admin)}
                      disabled={isSaving}
                      className="inline-flex w-full justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#54342C] shadow-sm ring-1 ring-[#E6AECB] transition hover:bg-[#FFF4F8] disabled:opacity-50 sm:w-fit"
                    >
                      Удалить
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="min-w-0 rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5 md:p-8">
        <h2 className="text-2xl font-black text-[#54342C]">Добавить администратора</h2>
          <p className="mt-3 leading-7 text-[#54342C]">
            Достаточно телефона. Если пользователь уже существует, мы просто откроем ему доступ
          </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#54342C]">Имя</span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none focus:border-[#54342C]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#54342C]">Телефон</span>
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+7 999 000-00-00"
              inputMode="tel"
              required
              className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none focus:border-[#54342C]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#54342C]">Почта</span>
            <input
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              inputMode="email"
              required
              className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none focus:border-[#54342C]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#54342C]">Новый пароль</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              autoComplete="new-password"
              required
              className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 text-[#54342C] outline-none focus:border-[#54342C]"
            />
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3F2721] disabled:opacity-50"
          >
            {isSaving ? "Сохраняем..." : "Добавить администратора"}
          </button>

          {message ? <p className="text-sm font-semibold text-[#54342C]">{message}</p> : null}
        </form>
      </section>
    </div>
  );
}
