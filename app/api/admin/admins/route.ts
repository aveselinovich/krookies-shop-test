import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createOrPromoteAdmin } from "@/lib/admin-users";
import { requireApiAdmin } from "@/lib/permissions";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireApiAdmin();
    if (auth.response) return auth.response;

    const body = await request.json();
    const result = await createOrPromoteAdmin(body);

    return NextResponse.json({
      created: result.created,
      user: result.user,
    });
  } catch (error) {
    console.error("POST /api/admin/admins error:", error);

    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      (error instanceof Error && "code" in error && error.code === "P1001")
    ) {
      return NextResponse.json(
        { error: "database_unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "admin_create_failed" },
      { status: 400 }
    );
  }
}
