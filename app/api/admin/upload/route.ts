import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { requireApiAdmin } from "@/lib/permissions";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function getExtension(file: File) {
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireApiAdmin();
    if (auth.response) return auth.response;

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file_required" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "unsupported_file_type" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = getExtension(file);
    const filename = `product-${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "products");
    const filePath = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, buffer);

    return NextResponse.json({ imageUrl: `/images/products/${filename}` });
  } catch (error) {
    console.error("POST /api/admin/upload error:", error);
    return NextResponse.json({ error: "upload_failed" }, { status: 400 });
  }
}
