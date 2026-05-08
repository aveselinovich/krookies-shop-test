import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = { title: "ЛК администратора — KROOKIES" };

export default async function AdminAccountPage() {
  redirect("/admin/account/profile");
}
