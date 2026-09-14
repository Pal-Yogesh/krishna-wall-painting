import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB limit
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
  try {
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "kmopl-resumes";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
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

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Generate signature (params must be in alphabetical order)
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}&use_filename=true`;
    const signature = crypto.createHash("sha1").update(paramsToSign + API_SECRET).digest("hex");

    // Upload to Cloudinary as a RAW resource so PDF/DOC files are delivered
    // directly and aren't blocked by Cloudinary's "image" PDF delivery restriction.
    const uploadForm = new URLSearchParams();
    uploadForm.append("file", base64);
    uploadForm.append("folder", folder);
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("use_filename", "true");
    uploadForm.append("api_key", API_KEY);
    uploadForm.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      { method: "POST", body: uploadForm }
    );

    const result = await response.json();

    if (result.secure_url) {
      return NextResponse.json(
        { url: result.secure_url, publicId: result.public_id, format: result.format },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error?.message || "Upload failed" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[Resume Upload API Error]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
