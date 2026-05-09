import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiAdmin } from "@/lib/permissions";
import { reorderAdminProducts } from "@/lib/admin-products";

export async function PATCH(request: NextRequest) {
  try {
    const auth = await requireApiAdmin();
    if (auth.response) return auth.response;

    const body = await request.json();
    const products = await reorderAdminProducts(
      Array.isArray(body.productIds) ? body.productIds.map(String) : []
    );

    revalidatePath("/");
    revalidatePath("/catalog");
    revalidatePath("/admin/products");

    return NextResponse.json({ products });
  } catch (error) {
    console.error("PATCH /api/admin/products/reorder error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "product_reorder_failed" },
      { status: 400 }
    );
  }
}
