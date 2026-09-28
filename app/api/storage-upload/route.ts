import { NextRequest, NextResponse } from "next/server";
import { uploadToStorage, IMAGE_TYPES, DOCUMENT_TYPES } from "@/lib/storage-server";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const FOLDERS = {
  image: "wall-paint-images/products",
  document: "wall-paint-docs/tds",
} as const;

// Admin uploads for products: banners, item images and TDS documents
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const kind = formData.get("kind") === "document" ? "document" : "image";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const allowed = kind === "document" ? DOCUMENT_TYPES : IMAGE_TYPES;
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: kind === "document" ? "Only PDF and Word files are allowed" : "Only JPG, PNG, WEBP, AVIF or GIF images are allowed" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File is larger than 10 MB" }, { status: 400 });
    }

    const result = await uploadToStorage(file, FOLDERS[kind]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[Storage Upload Error]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
