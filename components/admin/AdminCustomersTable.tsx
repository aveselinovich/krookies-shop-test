import Link from "next/link";
import { User } from "@prisma/client";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function AdminCustomersTable({ users }: { users: User[] }) {
  if (!users.length) {
    return (
      <div className="rounded-3xl bg-[#FFFFFF] p-8 text-center text-[#54342C] shadow-lg ring-1 ring-black/5">
        Пользователей пока нет
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#FFFFFF] shadow-lg ring-1 ring-black/5">
      <div className="grid gap-4 p-4 lg:hidden">
        {users.map((user) => (
          <article key={user.id} className="rounded-2xl bg-[#FFF9FB] p-4 ring-1 ring-[#E6AECB]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-black text-[#54342C]">{user.name || "Без имени"}</p>
              </div>
              <p className="text-sm text-[#54342C]">{formatDate(user.createdAt)}</p>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-[#54342C]">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Телефон</p>
                <p className="mt-1 font-semibold text-[#54342C]">{user.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#8A6A62]">Почта</p>
                <p className="mt-1 break-all">{user.email || "—"}</p>
              </div>
            </div>

            <Link
              href={`/admin/users/${user.id}`}
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
              <th className="px-5 py-4 text-left">Пользователь</th>
              <th className="px-5 py-4">Телефон</th>
              <th className="px-5 py-4">Почта</th>
              <th className="px-5 py-4">Дата регистрации</th>
              <th className="px-5 py-4">Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#E6AECB] text-center last:border-b-0">
                <td className="px-5 py-4 text-left">
                  <div>
                    <p className="font-semibold text-[#54342C]">{user.name || "Без имени"}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-[#54342C]">{user.phone}</td>
                <td className="px-5 py-4 text-[#54342C]">{user.email || "—"}</td>
                <td className="px-5 py-4 text-sm text-[#54342C]">{formatDate(user.createdAt)}</td>
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/users/${user.id}`}
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
