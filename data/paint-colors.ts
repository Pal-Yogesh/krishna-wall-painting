// data/paint-colors.ts
// Curated paint color palette organized by color family

import { PaintColor } from "@/lib/canvas-utils";

export const PAINT_COLORS: PaintColor[] = [
  // ── Warm Whites & Creams ──────────────────────────────────────────
  { id: "w1", name: "Ivory Mist",     hex: "#F5F0E8", family: "Whites" },
  { id: "w2", name: "Soft Linen",     hex: "#EDE0CF", family: "Whites" },
  { id: "w3", name: "Warm Cream",     hex: "#F2E4C4", family: "Whites" },
  { id: "w4", name: "Pearl White",    hex: "#F8F4EE", family: "Whites" },
  { id: "w5", name: "Antique White",  hex: "#FAEBD7", family: "Whites" },

  // ── Earthy Neutrals ───────────────────────────────────────────────
  { id: "e1", name: "Sandy Beige",    hex: "#D4B896", family: "Neutrals" },
  { id: "e2", name: "Warm Greige",    hex: "#C4A882", family: "Neutrals" },
  { id: "e3", name: "Clay Dust",      hex: "#C8A97A", family: "Neutrals" },
  { id: "e4", name: "Toasted Wheat",  hex: "#D2A679", family: "Neutrals" },
  { id: "e5", name: "Driftwood",      hex: "#B8956A", family: "Neutrals" },

  // ── Warm Tones ────────────────────────────────────────────────────
  { id: "r1", name: "Terracotta",     hex: "#C1623F", family: "Warm" },
  { id: "r2", name: "Burnt Sienna",   hex: "#A0522D", family: "Warm" },
  { id: "r3", name: "Apricot Blush",  hex: "#E8A87C", family: "Warm" },
  { id: "r4", name: "Dusty Rose",     hex: "#D4898A", family: "Warm" },
  { id: "r5", name: "Copper Glow",    hex: "#CB7A4B", family: "Warm" },
  { id: "r6", name: "Tuscan Red",     hex: "#8B3A3A", family: "Warm" },

  // ── Cool Blues ────────────────────────────────────────────────────
  { id: "b1", name: "Ocean Breeze",   hex: "#7BB8D4", family: "Blues" },
  { id: "b2", name: "Steel Blue",     hex: "#5B8DB8", family: "Blues" },
  { id: "b3", name: "Midnight Navy",  hex: "#2C3E6B", family: "Blues" },
  { id: "b4", name: "Sky Whisper",    hex: "#A8CBE0", family: "Blues" },
  { id: "b5", name: "Denim Wash",     hex: "#6B8FAB", family: "Blues" },
  { id: "b6", name: "Powder Blue",    hex: "#B0C4DE", family: "Blues" },

  // ── Greens ────────────────────────────────────────────────────────
  { id: "g1", name: "Sage Leaf",      hex: "#8FAF7E", family: "Greens" },
  { id: "g2", name: "Eucalyptus",     hex: "#6D9E8C", family: "Greens" },
  { id: "g3", name: "Forest Moss",    hex: "#4A6741", family: "Greens" },
  { id: "g4", name: "Mint Frost",     hex: "#A8C5B5", family: "Greens" },
  { id: "g5", name: "Olive Branch",   hex: "#7A8C5A", family: "Greens" },
  { id: "g6", name: "Hunter Green",   hex: "#355E3B", family: "Greens" },

  // ── Greys ─────────────────────────────────────────────────────────
  { id: "gr1", name: "Silver Mist",   hex: "#C8C8C8", family: "Greys" },
  { id: "gr2", name: "Pebble Grey",   hex: "#A8A8A8", family: "Greys" },
  { id: "gr3", name: "Charcoal",      hex: "#4A4A4A", family: "Greys" },
  { id: "gr4", name: "Storm Cloud",   hex: "#7A8A94", family: "Greys" },
  { id: "gr5", name: "Warm Stone",    hex: "#9E9589", family: "Greys" },

  // ── Statement Colors ──────────────────────────────────────────────
  { id: "s1", name: "Emerald Luxe",   hex: "#2A6049", family: "Statement" },
  { id: "s2", name: "Velvet Plum",    hex: "#5C3A5E", family: "Statement" },
  { id: "s3", name: "Golden Hour",    hex: "#D4A017", family: "Statement" },
  { id: "s4", name: "Teal Depth",     hex: "#1A6B73", family: "Statement" },
  { id: "s5", name: "Blush Mauve",    hex: "#C48B9F", family: "Statement" },
  { id: "s6", name: "Ink Black",      hex: "#1C1C2E", family: "Statement" },
];

export const COLOR_FAMILIES = [
  "All",
  "Whites",
  "Neutrals",
  "Warm",
  "Blues",
  "Greens",
  "Greys",
  "Statement",
];

export const DEFAULT_COLOR = PAINT_COLORS[0];