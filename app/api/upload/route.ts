import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const CLOUD_NAME = "dxfkygu6e";
const API_KEY = process.env.CLOUDINARY_API_KEY || "Y4iNDLC_qI8BNn4ef0_qahA1fQo";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    if (!API_SECRET) {
      return NextResponse.json({ error: "Cloudinary API secret not configured" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "kmopl-products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Generate signature
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto.createHash("sha1").update(paramsToSign + API_SECRET).digest("hex");

    // Upload to Cloudinary
    const uploadForm = new URLSearchParams();
    uploadForm.append("file", base64);
    uploadForm.append("folder", folder);
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("api_key", API_KEY);
    uploadForm.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    const result = await response.json();

    if (result.secure_url) {
      return NextResponse.json({ url: result.secure_url, publicId: result.public_id }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error?.message || "Upload failed" }, { status: 500 });
    }
  } catch (err) {
    console.error("[Upload API Error]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
