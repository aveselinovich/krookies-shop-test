"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LogoutButtonProps = {
  variant?: "dark" | "light" | "accent";
  className?: string;
};

export function LogoutButton({ variant = "light", className = "" }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  const baseClassName =
    variant === "dark"
      ? "rounded-full bg-[#54342C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3F2721] disabled:opacity-50"
      : variant === "accent"
        ? "rounded-2xl bg-[#54342C] px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(84,52,44,0.24)] ring-2 ring-[#E6AECB] transition hover:-translate-y-0.5 hover:bg-[#3F2721] disabled:opacity-50"
        : "rounded-full bg-[#FFF4F8] px-5 py-3 text-sm font-semibold text-[#54342C] transition hover:bg-[#E6AECB] disabled:opacity-50";

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isLoading}
      className={`${baseClassName} ${className}`.trim()}
    >
      {isLoading ? "Выходим..." : "Выйти из аккаунта"}
    </button>
  );
}
