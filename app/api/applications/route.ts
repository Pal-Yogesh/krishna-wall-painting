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

// GET all career applications (admin)
export async function GET() {
  try {
    const snap = await adminDb.collection("career_applications").orderBy("createdAt", "desc").get();
    const applications = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ applications }, { status: 200 });
  } catch (err) {
    console.error("[Applications API GET Error]", err);
    return NextResponse.json({ applications: [] }, { status: 500 });
  }
}

// POST - submit a new career application (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, qualification, expertise, resumeUrl, jobTitle } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    const applicationData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city || "",
      qualification: qualification || "",
      expertise: expertise || "",
      resumeUrl: resumeUrl || "",
      jobTitle: jobTitle || "",
      createdAt: Timestamp.now(),
    };

    const docRef = await adminDb.collection("career_applications").add(applicationData);
    return NextResponse.json({ id: docRef.id, ...applicationData }, { status: 201 });
  } catch (err) {
    console.error("[Applications API POST Error]", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

// DELETE - remove an application (admin)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    await adminDb.collection("career_applications").doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Applications API DELETE Error]", err);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
