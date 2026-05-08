import { NextRequest, NextResponse } from "next/server";
import { handleYookassaWebhook } from "@/lib/orders";
import { YookassaWebhookBody } from "@/lib/yookassa";
export async function POST(request: NextRequest) { try { const body=(await request.json()) as YookassaWebhookBody; const result=await handleYookassaWebhook(body); return NextResponse.json(result, { status: 200 }); } catch(error) { console.error("POST /api/payment/webhook error:", error); return NextResponse.json({ error: "webhook_processing_failed" }, { status: 400 }); } }
