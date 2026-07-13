import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const name = req.nextUrl.searchParams.get("name") || "document.pdf";

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();

    // Sanitize filename — remove unsafe characters
    const safeFilename = name.replace(/[^a-zA-Z0-9._\- ()]/g, "_");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Length": String(buffer.byteLength),
      },
    });
  } catch (err) {
    console.error("[Download PDF Error]", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
