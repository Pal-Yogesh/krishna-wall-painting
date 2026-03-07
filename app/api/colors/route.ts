import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

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

export async function GET() {
  try {
    const snap = await adminDb.collection("colors").where("active", "==", true).orderBy("name").get();
    const colors = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ colors }, { status: 200 });
  } catch (err) {
    console.error("[Colors API Error]", err);
    return NextResponse.json({ colors: [] }, { status: 500 });
  }
}
