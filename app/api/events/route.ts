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

// GET all events (optionally only active ones via ?active=true)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";

    const snap = await adminDb.collection("events").orderBy("eventDate", "desc").get();
    let events = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (activeOnly) {
      events = events.filter((e) => (e as { active?: boolean }).active !== false);
    }

    return NextResponse.json({ events }, { status: 200 });
  } catch (err) {
    console.error("[Events API GET Error]", err);
    return NextResponse.json({ events: [] }, { status: 500 });
  }
}

// POST - create a new event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, location, eventDate, description, coverImage, gallery, active } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Event title is required" }, { status: 400 });
    }

    const eventData = {
      title: title.trim(),
      location: location || "",
      eventDate: eventDate || new Date().toISOString().slice(0, 10),
      description: description || "",
      coverImage: coverImage || "",
      gallery: Array.isArray(gallery) ? gallery : [],
      active: active !== false,
      createdAt: Timestamp.now(),
    };

    const docRef = await adminDb.collection("events").add(eventData);
    return NextResponse.json({ id: docRef.id, ...eventData }, { status: 201 });
  } catch (err) {
    console.error("[Events API POST Error]", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

// PUT - update an event
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await adminDb.collection("events").doc(id).update(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Events API PUT Error]", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// DELETE - remove an event
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await adminDb.collection("events").doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Events API DELETE Error]", err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
