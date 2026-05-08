import { NextRequest, NextResponse } from "next/server";
import { createOtpCode } from "@/lib/otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createOtpCode(body.phone);

    return NextResponse.json({ ok: true, phone: result.phone });
  } catch (error) {
    console.error("POST /api/auth/send-code error:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "otp_send_failed" },
      { status: 400 }
    );
  }
}
