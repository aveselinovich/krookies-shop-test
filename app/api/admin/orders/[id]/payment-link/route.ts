import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/permissions";
import { createOrderPaymentLink } from "@/lib/orders";
export async function POST(_request: Request, { params }: { params: { id: string } }) { try { const auth=await requireApiAdmin(); if(auth.response) return auth.response; const result=await createOrderPaymentLink(params.id); return NextResponse.json(result); } catch(error) { console.error("POST /api/admin/orders/[id]/payment-link error:", error); return NextResponse.json({ error: error instanceof Error ? error.message : "payment_link_create_failed" }, { status: 400 }); } }
