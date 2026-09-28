import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createZip } from "@/lib/zip";

// Check for the default app by name: lib/storage-server.ts registers a second, storage-only app
if (!getApps().some((a) => a.name === "[DEFAULT]")) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const adminDb = getFirestore();

const safe = (s: string) => s.replace(/[^a-zA-Z0-9._\- ()]+/g, "_").trim() || "file";

// GET /api/download-tds-zip?productId=... — every TDS of one product in a single .zip.
// Only URLs stored on the product are fetched, never a URL from the query string.
export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  try {
    const snap = await adminDb.collection("products").doc(productId).get();
    if (!snap.exists) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    const product = snap.data() as {
      name?: string;
      tdsUrl?: string;
      tdsName?: string;
      items?: { name?: string; tdsUrl?: string; tdsName?: string }[];
    };

    // Older products have one product-level TDS and no items
    const sources = product.items?.length
      ? product.items.filter((i) => i.tdsUrl)
      : product.tdsUrl ? [{ name: product.name, tdsUrl: product.tdsUrl, tdsName: product.tdsName }] : [];
    if (sources.length === 0) {
      return NextResponse.json({ error: "No TDS files for this product" }, { status: 404 });
    }

    const used = new Set<string>();
    const files = await Promise.all(
      sources.map(async (item, idx) => {
        const res = await fetch(item.tdsUrl!);
        if (!res.ok) throw new Error(`Failed to fetch TDS ${idx + 1}`);
        const ext = (item.tdsName?.split(".").pop() || "pdf").toLowerCase();
        let name = `${safe((item.name || `TDS ${idx + 1}`).replace(/\s+/g, " "))}.${ext}`;
        for (let n = 2; used.has(name); n++) name = name.replace(/(\.\w+)$/, ` (${n})$1`);
        used.add(name);
        return { name, data: Buffer.from(await res.arrayBuffer()) };
      })
    );

    const zip = createZip(files);
    return new NextResponse(new Uint8Array(zip), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safe(product.name || "TDS")} - TDS.zip"`,
        "Content-Length": String(zip.length),
      },
    });
  } catch (err) {
    console.error("[Download TDS Zip Error]", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
