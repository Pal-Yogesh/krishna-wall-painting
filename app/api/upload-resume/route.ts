import { NextRequest, NextResponse } from "next/server";
import { uploadToStorage, DOCUMENT_TYPES } from "@/lib/storage-server";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB limit

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!DOCUMENT_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF or Word document." },
        { status: 400 }
      );
    }

    // Validate file size (max 5 MB)
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum allowed size is 5 MB." },
        { status: 400 }
      );
    }

    const { url, path } = await uploadToStorage(file, "wall-paint-docs/resumes");
    const format = file.name.split(".").pop()?.toLowerCase() || "";
    return NextResponse.json({ url, publicId: path, format }, { status: 200 });
  } catch (err) {
    console.error("[Resume Upload API Error]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
