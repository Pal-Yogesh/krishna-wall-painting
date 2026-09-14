import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "kmopl-tds-pdfs";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF and DOCX files are allowed" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5 MB limit" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "application/octet-stream";
    const base64 = `data:${mimeType};base64,${buffer.toString("base64")}`;

    // Sign only folder + timestamp + use_filename (no resource_type in signature)
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}&use_filename=true`;
    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + API_SECRET)
      .digest("hex");

    const uploadForm = new URLSearchParams();
    uploadForm.append("file", base64);
    uploadForm.append("folder", folder);
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("use_filename", "true");
    uploadForm.append("api_key", API_KEY);
    uploadForm.append("signature", signature);

    // Use /raw/upload so PDFs are served directly without Cloudinary's image restriction
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      { method: "POST", body: uploadForm }
    );

    const result = await response.json();

    if (result.secure_url) {
      return NextResponse.json({
        url: result.secure_url,
        publicId: result.public_id,
        name: file.name,
      }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: result.error?.message || "Upload failed" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[Upload Product PDF Error]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
