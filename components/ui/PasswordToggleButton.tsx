"use client";

import Image from "next/image";

type PasswordToggleButtonProps = {
  shown: boolean;
  onClick: () => void;
  className?: string;
};

export function PasswordToggleButton({
  shown,
  onClick,
  className = "",
}: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={shown ? "Скрыть пароль" : "Показать пароль"}
      title={shown ? "Скрыть пароль" : "Показать пароль"}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center bg-transparent ${className}`.trim()}
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <Image
          src="/logo-cookie.png"
          alt=""
          width={28}
          height={28}
          className={`h-7 w-auto select-none ${shown ? "opacity-100" : "opacity-60"}`}
        />
        <span
          className={`pointer-events-none absolute h-0.5 w-7 rounded-full bg-[#54342C] ${shown ? "opacity-0" : "opacity-100 rotate-[-38deg]"}`}
        />
      </span>
      <span className="sr-only">{shown ? "Скрыть пароль" : "Показать пароль"}</span>
    </button>
  );
}
