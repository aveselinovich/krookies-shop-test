import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: ButtonVariant };
type ButtonLinkProps = { children: ReactNode; href: string; variant?: ButtonVariant; className?: string };

function getButtonClasses(variant: ButtonVariant = "primary") {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#54342C] text-white",
    secondary: "bg-[#E6AECB] text-[#54342C]",
    ghost: "bg-white text-[#54342C] ring-1 ring-black/5 shadow",
  };
  return `${base} ${variants[variant]}`;
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${getButtonClasses(variant)} ${className}`.trim()} {...props}>{children}</button>;
}

export function ButtonLink({ children, href, variant = "primary", className = "" }: ButtonLinkProps) {
  return <Link href={href} className={`${getButtonClasses(variant)} ${className}`.trim()}>{children}</Link>;
}
