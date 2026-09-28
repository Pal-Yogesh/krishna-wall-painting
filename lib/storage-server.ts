// Server-only: file storage on the second Firebase project (the *_2 env vars).
// That project is used for Storage only — Firestore/Auth stay on the main project.
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import crypto from "crypto";

const APP_NAME = "storage";
const BUCKET = (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_2 || "").replace(/"/g, "");

function storageApp(): App {
  const existing = getApps().find((a) => a.name === APP_NAME);
  if (existing) return existing;
  return initializeApp(
    {
      credential: cert({
        projectId: (process.env.FIREBASE_PROJECT_ID_2 || "").replace(/"/g, ""),
        clientEmail: (process.env.FIREBASE_CLIENT_EMAIL_2 || "").replace(/"/g, ""),
        privateKey: process.env.FIREBASE_PRIVATE_KEY_2?.replace(/\\n/g, "\n"),
      }),
      storageBucket: BUCKET,
    },
    APP_NAME
  );
}

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
export const DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/** Uploads a file and returns a public Firebase download URL (same format as the console's "Access token" link). */
export async function uploadToStorage(file: File, folder: string) {
  if (!BUCKET) throw new Error("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_2 is not set");

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-120);
  const path = `${folder.replace(/^\/+|\/+$/g, "")}/${Date.now()}-${safeName}`;
  const token = crypto.randomUUID();

  await getStorage(storageApp())
    .bucket(BUCKET)
    .file(path)
    .save(Buffer.from(await file.arrayBuffer()), {
      resumable: false,
      contentType: file.type || "application/octet-stream",
      metadata: {
        contentDisposition: `inline; filename="${safeName}"`,
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });

  const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
  return { url, path, name: file.name };
}
