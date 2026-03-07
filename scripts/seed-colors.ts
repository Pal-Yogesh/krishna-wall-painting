// scripts/seed-colors.ts
// Run with: npx tsx scripts/seed-colors.ts
// Seeds the Firestore "colors" collection with the existing paint colors

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore(app);

const PAINT_COLORS = [
  { name: "Ivory Mist",     hex: "#F5F0E8", family: "Whites" },
  { name: "Soft Linen",     hex: "#EDE0CF", family: "Whites" },
  { name: "Warm Cream",     hex: "#F2E4C4", family: "Whites" },
  { name: "Pearl White",    hex: "#F8F4EE", family: "Whites" },
  { name: "Antique White",  hex: "#FAEBD7", family: "Whites" },
  { name: "Sandy Beige",    hex: "#D4B896", family: "Neutrals" },
  { name: "Warm Greige",    hex: "#C4A882", family: "Neutrals" },
  { name: "Clay Dust",      hex: "#C8A97A", family: "Neutrals" },
  { name: "Toasted Wheat",  hex: "#D2A679", family: "Neutrals" },
  { name: "Driftwood",      hex: "#B8956A", family: "Neutrals" },
  { name: "Terracotta",     hex: "#C1623F", family: "Warm" },
  { name: "Burnt Sienna",   hex: "#A0522D", family: "Warm" },
  { name: "Apricot Blush",  hex: "#E8A87C", family: "Warm" },
  { name: "Dusty Rose",     hex: "#D4898A", family: "Warm" },
  { name: "Copper Glow",    hex: "#CB7A4B", family: "Warm" },
  { name: "Tuscan Red",     hex: "#8B3A3A", family: "Warm" },
  { name: "Ocean Breeze",   hex: "#7BB8D4", family: "Blues" },
  { name: "Steel Blue",     hex: "#5B8DB8", family: "Blues" },
  { name: "Midnight Navy",  hex: "#2C3E6B", family: "Blues" },
  { name: "Sky Whisper",    hex: "#A8CBE0", family: "Blues" },
  { name: "Denim Wash",     hex: "#6B8FAB", family: "Blues" },
  { name: "Powder Blue",    hex: "#B0C4DE", family: "Blues" },
  { name: "Sage Leaf",      hex: "#8FAF7E", family: "Greens" },
  { name: "Eucalyptus",     hex: "#6D9E8C", family: "Greens" },
  { name: "Forest Moss",    hex: "#4A6741", family: "Greens" },
  { name: "Mint Frost",     hex: "#A8C5B5", family: "Greens" },
  { name: "Olive Branch",   hex: "#7A8C5A", family: "Greens" },
  { name: "Hunter Green",   hex: "#355E3B", family: "Greens" },
  { name: "Silver Mist",    hex: "#C8C8C8", family: "Greys" },
  { name: "Pebble Grey",    hex: "#A8A8A8", family: "Greys" },
  { name: "Charcoal",       hex: "#4A4A4A", family: "Greys" },
  { name: "Storm Cloud",    hex: "#7A8A94", family: "Greys" },
  { name: "Warm Stone",     hex: "#9E9589", family: "Greys" },
  { name: "Emerald Luxe",   hex: "#2A6049", family: "Statement" },
  { name: "Velvet Plum",    hex: "#5C3A5E", family: "Statement" },
  { name: "Golden Hour",    hex: "#D4A017", family: "Statement" },
  { name: "Teal Depth",     hex: "#1A6B73", family: "Statement" },
  { name: "Blush Mauve",    hex: "#C48B9F", family: "Statement" },
  { name: "Ink Black",      hex: "#1C1C2E", family: "Statement" },
];

async function seed() {
  const batch = db.batch();
  for (const color of PAINT_COLORS) {
    const ref = db.collection("colors").doc();
    batch.set(ref, {
      ...color,
      finish: "matte",
      active: true,
      createdAt: Timestamp.now(),
    });
  }
  await batch.commit();
  console.log(`✅ Seeded ${PAINT_COLORS.length} colors to Firestore`);
}

seed().catch(console.error);
