import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/permissions";
import { markPaymentLinkSent } from "@/lib/orders";
export async function PATCH(_request: Request, { params }: { params: { id: string } }) { try { const auth=await requireApiAdmin(); if(auth.response) return auth.response; const order=await markPaymentLinkSent(params.id); return NextResponse.json({ order }); } catch(error) { console.error("PATCH /api/admin/orders/[id]/payment-link-sent error:", error); return NextResponse.json({ error: error instanceof Error ? error.message : "payment_link_sent_update_failed" }, { status: 400 }); } }
