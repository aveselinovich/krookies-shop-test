"use client";

import { FormEvent, useState } from "react";
import { PasswordToggleButton } from "@/components/ui/PasswordToggleButton";

function getPasswordMessage(error: string) {
  switch (error) {
    case "password_required":
      return "Введите текущий пароль";
    case "password_too_short":
      return "Новый пароль должен быть не короче 8 символов";
    case "invalid_current_password":
      return "Текущий пароль введён неверно";
    default:
      return "Не получилось сменить пароль";
  }
}

export function AdminPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNextPassword, setShowNextPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (nextPassword !== repeatPassword) {
      setMessage("Новый пароль и подтверждение не совпадают");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, nextPassword }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "password_change_failed");
      }

      setCurrentPassword("");
      setNextPassword("");
      setRepeatPassword("");
      setMessage("Пароль обновлен");
    } catch (error) {
      setMessage(getPasswordMessage(error instanceof Error ? error.message : "password_change_failed"));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5 md:p-8"
    >
      <h2 className="text-3xl font-black text-[#54342C]">Смена пароля</h2>
      <p className="mt-4 max-w-2xl leading-7 text-[#54342C]">
        Используйте пароль длиной не менее 8 символов
      </p>

      <div className="mt-8 grid gap-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#54342C]">Текущий пароль</span>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 pr-14 text-[#54342C] outline-none focus:border-[#54342C]"
            />
            <PasswordToggleButton
              shown={showCurrentPassword}
              onClick={() => setShowCurrentPassword((current) => !current)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#54342C]">Новый пароль</span>
          <div className="relative">
            <input
              type={showNextPassword ? "text" : "password"}
              value={nextPassword}
              onChange={(event) => setNextPassword(event.target.value)}
              autoComplete="new-password"
              className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 pr-14 text-[#54342C] outline-none focus:border-[#54342C]"
            />
            <PasswordToggleButton
              shown={showNextPassword}
              onClick={() => setShowNextPassword((current) => !current)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#54342C]">Повторите новый пароль</span>
          <div className="relative">
            <input
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              autoComplete="new-password"
              className="w-full rounded-2xl border border-[#E6AECB] bg-white px-4 py-3 pr-14 text-[#54342C] outline-none focus:border-[#54342C]"
            />
            <PasswordToggleButton
              shown={showRepeatPassword}
              onClick={() => setShowRepeatPassword((current) => !current)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-[#54342C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3F2721] disabled:opacity-50"
        >
          {isSaving ? "Сохраняем..." : "Обновить пароль"}
        </button>

        {message ? <p className="text-sm font-semibold text-[#54342C]">{message}</p> : null}
      </div>
    </form>
  );
}
