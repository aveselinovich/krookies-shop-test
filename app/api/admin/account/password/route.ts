import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/permissions";
import { changeAdminPassword } from "@/lib/admin-passwords";

export async function PATCH(request: NextRequest) {
  try {
    const auth = await requireApiAdmin();
    if (auth.response) return auth.response;

    const body = await request.json();
    await changeAdminPassword(
      auth.user.id,
      String(body.currentPassword || ""),
      String(body.nextPassword || "")
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/admin/account/password error:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "password_change_failed" },
      { status: 400 }
    );
  }
}
