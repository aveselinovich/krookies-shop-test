import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/permissions";
import { updateAdminCustomerProfile } from "@/lib/admin-customers";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireApiAdmin();
    if (auth.response) return auth.response;

    const body = await request.json();
    const user = await updateAdminCustomerProfile(params.id, body);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("PATCH /api/admin/users/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "user_update_failed" },
      { status: 400 }
    );
  }
}
