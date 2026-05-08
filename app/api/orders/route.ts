import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
export async function POST(request: NextRequest) { try { const body=await request.json(); const order=await createOrder(body); return NextResponse.json(order,{status:201}); } catch(error) { console.error("POST /api/orders error:", error); return NextResponse.json({ error: error instanceof Error ? error.message : "order_create_failed" }, { status: 400 }); } }
