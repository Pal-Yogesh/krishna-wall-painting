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

// GET all jobs (optionally only active ones via ?active=true)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";

    const snap = await adminDb.collection("jobs").orderBy("createdAt", "desc").get();
    let jobs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (activeOnly) {
      jobs = jobs.filter((j) => (j as { active?: boolean }).active !== false);
    }

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (err) {
    console.error("[Jobs API GET Error]", err);
    return NextResponse.json({ jobs: [] }, { status: 500 });
  }
}

// POST - create a new job
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title, location, qualification, experience, industry,
      description, applyEmail, active,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    const jobData = {
      title: title.trim(),
      location: location || "",
      qualification: qualification || "",
      experience: experience || "",
      industry: industry || "",
      description: description || "",
      applyEmail: applyEmail || "",
      active: active !== false,
      createdAt: Timestamp.now(),
    };

    const docRef = await adminDb.collection("jobs").add(jobData);
    return NextResponse.json({ id: docRef.id, ...jobData }, { status: 201 });
  } catch (err) {
    console.error("[Jobs API POST Error]", err);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

// PUT - update a job
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    await adminDb.collection("jobs").doc(id).update(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Jobs API PUT Error]", err);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE - remove a job
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    await adminDb.collection("jobs").doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Jobs API DELETE Error]", err);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
