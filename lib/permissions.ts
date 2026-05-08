import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/login");
  return user;
}

export async function requireCustomerName() {
  const user = await requireAuth();

  if (user.role !== "admin" && !user.name?.trim()) {
    redirect("/account/profile?required=name");
  }

  return user;
}

export async function requireApiAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return {
      user: null,
      response: NextResponse.json({ error: "forbidden" }, { status: 403 }),
    };
  }
  return { user, response: null };
}
