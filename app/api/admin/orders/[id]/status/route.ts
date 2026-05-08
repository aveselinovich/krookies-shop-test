import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { requireApiAdmin } from "@/lib/permissions";
import { updateOrderStatus } from "@/lib/orders";
const ORDER_STATUSES: OrderStatus[] = ["pending_confirmation","pending_payment","accepted","baking","ready","delivered","cancelled"];
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) { try { const auth=await requireApiAdmin(); if(auth.response) return auth.response; const body=await request.json(); const status=body.status as OrderStatus; if(!ORDER_STATUSES.includes(status)) return NextResponse.json({error:"invalid_status"},{status:400}); const order=await updateOrderStatus(params.id,status); return NextResponse.json({order}); } catch(error) { console.error("PATCH /api/admin/orders/[id]/status error:", error); return NextResponse.json({ error: error instanceof Error ? error.message : "order_status_update_failed" }, { status: 400 }); } }
