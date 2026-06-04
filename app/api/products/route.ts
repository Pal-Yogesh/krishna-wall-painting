import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

if (getApps().length === 0) {
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

// POST - create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, substrate, chemistry, description, fullDescription, features, applications, finishes, icon, image, recommendedUse, applicationGuidelines, inCanProperties, applicationProperties, filmProperties, delivery } = body;

    if (!name || !substrate || !chemistry) {
      return NextResponse.json({ error: "Name, substrate, and chemistry are required" }, { status: 400 });
    }

    // Generate slug ID
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const productData = {
      name,
      substrate,
      chemistry,
      description: description || "",
      fullDescription: fullDescription || "",
      features: features || [],
      applications: applications || [],
      finishes: finishes || [],
      icon: icon || "🎨",
      image: image || "",
      recommendedUse: recommendedUse || "",
      applicationGuidelines: applicationGuidelines || "",
      inCanProperties: inCanProperties || [],
      applicationProperties: applicationProperties || [],
      filmProperties: filmProperties || [],
      delivery: delivery || [],
      active: true,
      createdAt: Timestamp.now(),
    };

    const docRef = await adminDb.collection("products").doc(slug).set(productData);
    return NextResponse.json({ id: slug, ...productData }, { status: 201 });
  } catch (err) {
    console.error("[Products POST Error]", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// PUT - update a product
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

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
