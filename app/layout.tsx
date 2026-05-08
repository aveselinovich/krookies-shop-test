import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KROOKIES Shop",
  description: "Интернет-магазин KROOKIES",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
