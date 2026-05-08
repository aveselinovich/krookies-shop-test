import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
export async function GET() { const user=await getCurrentUser(); return NextResponse.json({ user: user ? { id:user.id, name:user.name, phone:user.phone, email:user.email, role:user.role } : null }); }
