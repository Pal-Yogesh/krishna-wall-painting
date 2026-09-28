import { NextRequest, NextResponse } from "next/server";
import { uploadToStorage, DOCUMENT_TYPES } from "@/lib/storage-server";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!DOCUMENT_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF and DOCX files are allowed" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 10 MB limit" }, { status: 400 });
    }

    const { url, path, name } = await uploadToStorage(file, "wall-paint-docs/tds");
    return NextResponse.json({ url, publicId: path, name }, { status: 200 });
  } catch (err) {
    console.error("[Upload Product PDF Error]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
