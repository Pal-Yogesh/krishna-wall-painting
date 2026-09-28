import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

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

// GET all products
export async function GET() {
  try {
    const snap = await adminDb.collection("products").orderBy("name").get();
    const products = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error("[Products API Error]", err);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}

type ProductItem = { id: string; name: string; image: string; tdsUrl: string; tdsName: string };

// Builds the stored product from the admin form. Also fills the older fields
// (image, chemistry, features, ...) that the listing pages still read.
function toProductData(body: Record<string, unknown>) {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const items: ProductItem[] = Array.isArray(body.items)
    ? body.items
        .map((i: Record<string, unknown>) => ({
          id: str(i.id) || Math.random().toString(36).slice(2, 10),
          name: str(i.name),
          image: str(i.image),
          tdsUrl: str(i.tdsUrl),
          tdsName: str(i.tdsName),
        }))
        .filter((i) => i.name)
    : [];
  const banner = str(body.banner);
  return {
    name: str(body.name),
    substrate: str(body.substrate),
    description: str(body.description),
    banner,
    sectionTitle: str(body.sectionTitle),
    items,
    image: banner,
    chemistry: "",
    features: [],
    applications: [],
    finishes: [],
  };
}

// POST - create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = toProductData(body);

    if (!data.name || !data.substrate) {
      return NextResponse.json({ error: "Heading and category are required" }, { status: 400 });
    }

    // Generate slug ID; never overwrite an existing product
    const base = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "product";
    let slug = base;
    for (let n = 2; (await adminDb.collection("products").doc(slug).get()).exists; n++) slug = `${base}-${n}`;

    const productData = { ...data, active: true, createdAt: Timestamp.now() };
    await adminDb.collection("products").doc(slug).set(productData);
    return NextResponse.json({ id: slug, ...productData }, { status: 201 });
  } catch (err) {
    console.error("[Products POST Error]", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// PUT - update a product (full form save, or a partial change such as { active })
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const data = "items" in rest ? toProductData(rest) : rest;
    await adminDb.collection("products").doc(id).update(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Products PUT Error]", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE - remove a product
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await adminDb.collection("products").doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Products DELETE Error]", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
