"use client";

// components/home/ColorCollectionShowcase.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Color Collection Showcase Section
//
// Design: Magazine-editorial on warm parchment — asymmetric featured color
// spotlight on the left, filterable swatch grid on the right. Large typography,
// animated filter pills, smooth card hover states with color-adaptive shadows.
//
// Features:
//  - Featured color spotlight with large swatch + room tone preview
//  - Filterable grid by color family
//  - Hover: card lifts, shows color name + hex + "Apply" chip
//  - "View All" expands collapsed grid
//  - CTA links to the visualizer with pre-selected color
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Full paint colors data ────────────────────────────────────────────────────
const ALL_COLORS = [
  // Whites
  { id: "w1", name: "Ivory Mist",     hex: "#F5F0E8", family: "Whites",    trending: false },
  { id: "w2", name: "Soft Linen",     hex: "#EDE0CF", family: "Whites",    trending: false },
  { id: "w3", name: "Warm Cream",     hex: "#F2E4C4", family: "Whites",    trending: true  },
  { id: "w4", name: "Pearl White",    hex: "#F8F4EE", family: "Whites",    trending: false },
  // Neutrals
  { id: "e1", name: "Sandy Beige",    hex: "#D4B896", family: "Neutrals",  trending: true  },
  { id: "e2", name: "Warm Greige",    hex: "#C4A882", family: "Neutrals",  trending: false },
  { id: "e3", name: "Clay Dust",      hex: "#C8A97A", family: "Neutrals",  trending: false },
  { id: "e4", name: "Driftwood",      hex: "#B8956A", family: "Neutrals",  trending: true  },
  // Warm
  { id: "r1", name: "Terracotta",     hex: "#C1623F", family: "Warm",      trending: true  },
  { id: "r2", name: "Burnt Sienna",   hex: "#A0522D", family: "Warm",      trending: false },
  { id: "r3", name: "Apricot Blush",  hex: "#E8A87C", family: "Warm",      trending: true  },
  { id: "r4", name: "Dusty Rose",     hex: "#D4898A", family: "Warm",      trending: false },
  { id: "r5", name: "Copper Glow",    hex: "#CB7A4B", family: "Warm",      trending: false },
  { id: "r6", name: "Tuscan Red",     hex: "#8B3A3A", family: "Warm",      trending: false },
  // Blues
  { id: "b1", name: "Ocean Breeze",   hex: "#7BB8D4", family: "Blues",     trending: true  },
  { id: "b2", name: "Steel Blue",     hex: "#5B8DB8", family: "Blues",     trending: false },
  { id: "b3", name: "Midnight Navy",  hex: "#2C3E6B", family: "Blues",     trending: true  },
  { id: "b4", name: "Sky Whisper",    hex: "#A8CBE0", family: "Blues",     trending: false },
  { id: "b5", name: "Denim Wash",     hex: "#6B8FAB", family: "Blues",     trending: false },
  { id: "b6", name: "Powder Blue",    hex: "#B0C4DE", family: "Blues",     trending: false },
  // Greens
  { id: "g1", name: "Sage Leaf",      hex: "#8FAF7E", family: "Greens",    trending: true  },
  { id: "g2", name: "Eucalyptus",     hex: "#6D9E8C", family: "Greens",    trending: false },
  { id: "g3", name: "Forest Moss",    hex: "#4A6741", family: "Greens",    trending: false },
  { id: "g4", name: "Mint Frost",     hex: "#A8C5B5", family: "Greens",    trending: false },
  { id: "g5", name: "Olive Branch",   hex: "#7A8C5A", family: "Greens",    trending: false },
  { id: "g6", name: "Hunter Green",   hex: "#355E3B", family: "Greens",    trending: true  },
  // Greys
  { id: "gr1", name: "Silver Mist",   hex: "#C8C8C8", family: "Greys",     trending: false },
  { id: "gr2", name: "Pebble Grey",   hex: "#A8A8A8", family: "Greys",     trending: false },
  { id: "gr3", name: "Charcoal",      hex: "#4A4A4A", family: "Greys",     trending: true  },
  { id: "gr4", name: "Storm Cloud",   hex: "#7A8A94", family: "Greys",     trending: false },
  { id: "gr5", name: "Warm Stone",    hex: "#9E9589", family: "Greys",     trending: false },
  // Statement
  { id: "s1", name: "Emerald Luxe",   hex: "#2A6049", family: "Statement", trending: true  },
  { id: "s2", name: "Velvet Plum",    hex: "#5C3A5E", family: "Statement", trending: true  },
  { id: "s3", name: "Golden Hour",    hex: "#D4A017", family: "Statement", trending: false },
  { id: "s4", name: "Teal Depth",     hex: "#1A6B73", family: "Statement", trending: true  },
  { id: "s5", name: "Blush Mauve",    hex: "#C48B9F", family: "Statement", trending: false },
  { id: "s6", name: "Ink Black",      hex: "#1C1C2E", family: "Statement", trending: false },
];

const FAMILIES = ["All", "Trending", "Whites", "Neutrals", "Warm", "Blues", "Greens", "Greys", "Statement"];
const FEATURED_DEFAULT = ALL_COLORS.find(c => c.id === "r1")!; // Terracotta
const GRID_INITIAL_COUNT = 12;

// ── Utility: is color light? (for text contrast) ──────────────────────────────
function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

// ── Single color card ─────────────────────────────────────────────────────────
function ColorCard({
  color,
  isFeatured,
  onSelect,
  onSetFeatured,
  index,
}: {
  color: (typeof ALL_COLORS)[0];
  isFeatured: boolean;
  onSelect: (c: typeof ALL_COLORS[0]) => void;
  onSetFeatured: (c: typeof ALL_COLORS[0]) => void;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const light = isLight(color.hex);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, delay: (index % 12) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer"
      onClick={() => onSetFeatured(color)}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          boxShadow: hovered
            ? `0 16px 40px ${color.hex}50, 0 4px 12px rgba(0,0,0,0.08)`
            : isFeatured
            ? `0 0 0 2.5px ${color.hex}, 0 8px 24px ${color.hex}40`
            : "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* Swatch block */}
        <div
          className="relative h-24 w-full transition-all duration-300"
          style={{ backgroundColor: color.hex }}
        >
          {/* Trending badge */}
          {color.trending && (
            <span
              className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
              style={{
                background: light ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.25)",
                color: light ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
              }}
            >
              Trending
            </span>
          )}

          {/* Active checkmark */}
          {isFeatured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: light ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6l2.5 2.5 4.5-5" stroke={light ? "#000" : "#fff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}

          {/* Hover: apply chip */}
          <AnimatePresence>
            {hovered && !isFeatured && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.12)", backdropFilter: "blur(2px)" }}
              >
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: "rgba(255,255,255,0.9)", color: "#1c1917" }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Preview
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info row */}
        <div
          className="px-3 py-2.5 border-t"
          style={{
            background: "white",
            borderColor: "#f0ece4",
          }}
        >
          <p className="text-[12.5px] font-bold text-stone-800 leading-tight truncate">{color.name}</p>
          <div className="flex items-center justify-between mt-0.5">
            <p className="text-[10.5px] font-mono text-stone-400">{color.hex.toUpperCase()}</p>
            <span className="text-[10px] font-semibold text-stone-300 uppercase tracking-wider">{color.family}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Featured color spotlight ───────────────────────────────────────────────────
function FeaturedSpotlight({
  color,
}: {
  color: (typeof ALL_COLORS)[0];
}) {
  const light = isLight(color.hex);

  // Generate complementary wall tone tones for mini palette strip
  const tones = [
    color.hex,
    adjustBrightness(color.hex, 1.15),
    adjustBrightness(color.hex, 0.88),
    adjustBrightness(color.hex, 0.70),
    adjustBrightness(color.hex, 0.52),
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={color.id}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6 h-full"
      >
        {/* Large swatch */}
        <div
          className="relative rounded-3xl overflow-hidden flex-1 min-h-[280px] lg:min-h-[360px]"
          style={{
            backgroundColor: color.hex,
            boxShadow: `0 24px 60px ${color.hex}50, 0 8px 20px rgba(0,0,0,0.1)`,
          }}
        >
          {/* Sheen effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p
                className="text-[11px] font-bold uppercase tracking-[0.25em] mb-2 opacity-70"
                style={{ color: light ? "#000" : "#fff" }}
              >
                Featured Shade
              </p>
              <h3
                className="text-3xl font-black leading-tight"
                style={{
                  fontFamily: "'Georgia', serif",
                  color: light ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.95)",
                  letterSpacing: "-0.03em",
                }}
              >
                {color.name}
              </h3>
              <p
                className="text-sm font-mono mt-1 opacity-60"
                style={{ color: light ? "#000" : "#fff" }}
              >
                {color.hex.toUpperCase()}
              </p>
            </motion.div>
          </div>

          {/* Trending badge */}
          {color.trending && (
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: light ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
                color: light ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              ✦ Trending
            </div>
          )}

          {/* Family badge */}
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.18)",
              color: light ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            {color.family}
          </div>
        </div>

        {/* Tone strip */}
        <div>
          <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.15em] mb-2.5">Shade Tones</p>
          <div className="flex gap-2">
            {tones.map((tone, i) => (
              <div
                key={i}
                className="flex-1 h-10 rounded-xl border border-stone-100 shadow-sm transition-transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: tone }}
                title={tone}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
            <Link
              href="/#visualizer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 6px 20px rgba(217,119,6,0.35)",
                fontFamily: "'Georgia', serif",
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
              Visualize This
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <button
              className="py-3.5 px-4 rounded-2xl border-2 border-stone-200 hover:border-stone-300 transition-colors flex items-center gap-1.5 text-sm font-bold text-stone-500"
              title="Share color"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Save
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Brightness helper ─────────────────────────────────────────────────────────
function adjustBrightness(hex: string, factor: number): string {
  const h = hex.replace("#", "");
  const r = Math.min(255, Math.round(parseInt(h.slice(0, 2), 16) * factor));
  const g = Math.min(255, Math.round(parseInt(h.slice(2, 4), 16) * factor));
  const b = Math.min(255, Math.round(parseInt(h.slice(4, 6), 16) * factor));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ── Main ColorCollectionShowcase ──────────────────────────────────────────────
export default function ColorCollectionShowcase() {
  const [activeFamily, setActiveFamily] = useState("All");
  const [featured, setFeatured]         = useState(FEATURED_DEFAULT);
  const [showAll, setShowAll]           = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");

  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const inView      = useInView(headingRef, { once: true, margin: "-60px" });

  // Filter logic
  const filtered = ALL_COLORS.filter(c => {
    const matchFamily =
      activeFamily === "All"      ? true :
      activeFamily === "Trending" ? c.trending :
      c.family === activeFamily;
    const matchSearch = searchQuery.trim() === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFamily && matchSearch;
  });

  const visible = showAll ? filtered : filtered.slice(0, GRID_INITIAL_COUNT);

  const handleFeatured = useCallback((c: typeof ALL_COLORS[0]) => {
    setFeatured(c);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="colors"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #faf7f2 0%, #f5ede0 100%)" }}
    >
      {/* ── Decorative background ──────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #fed7aa 0%, transparent 70%)" }} />
        {/* Decorative paint strokes */}
        <svg className="absolute top-16 left-8 opacity-[0.06] w-64 h-64" viewBox="0 0 200 200">
          <path d="M20 100 Q60 20 100 100 Q140 180 180 100" stroke="#d97706" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d="M10 130 Q60 60 120 130 Q170 200 190 130" stroke="#d97706" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ─────────────────────────────────────────── */}
        <div ref={headingRef} className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                  style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}
                >
                  Our Paint Collection
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-[clamp(2rem,4vw,3.4rem)] font-black text-stone-900 leading-tight"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.04em" }}
              >
                36+ Hand-Picked
                <br />
                <span style={{ color: "#d97706" }}>Paint Shades</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 text-[14.5px] text-stone-500 max-w-md leading-relaxed"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Each shade is curated for Indian interiors — tested under warm natural
                light to ensure what you see is what you get on your walls.
              </motion.p>
            </div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search shades…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 bg-white/80 backdrop-blur-sm text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-all w-48 lg:w-56"
              />
            </motion.div>
          </div>
        </div>

        {/* ── Filter pills ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FAMILIES.map(family => (
            <motion.button
              key={family}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setActiveFamily(family); setShowAll(false); }}
              className="relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 overflow-hidden"
              style={{
                background: activeFamily === family ? "#d97706" : "white",
                color: activeFamily === family ? "white" : "#78716c",
                border: `1.5px solid ${activeFamily === family ? "#d97706" : "#e7e5e4"}`,
                boxShadow: activeFamily === family ? "0 4px 14px rgba(217,119,6,0.3)" : "none",
              }}
            >
              {family === "Trending" && <span className="mr-1">✦</span>}
              {family}
            </motion.button>
          ))}

          {/* Count badge */}
          <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-stone-400 self-center">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            {filtered.length} shade{filtered.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        {/* ── Main layout: Featured + Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">

          {/* ── Left: Featured spotlight ──────────────────────────────── */}
          <div className="lg:sticky lg:top-24">
            <FeaturedSpotlight color={featured} />
          </div>

          {/* ── Right: Color grid ─────────────────────────────────────── */}
          <div>
            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">🎨</div>
                <p className="text-stone-400 font-semibold">No shades found for "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-amber-600 text-sm font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((color, i) => (
                  <ColorCard
                    key={color.id}
                    color={color}
                    isFeatured={featured.id === color.id}
                    onSelect={() => {}}
                    onSetFeatured={handleFeatured}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Show more / less */}
            {filtered.length > GRID_INITIAL_COUNT && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAll(v => !v)}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl border-2 border-stone-200 hover:border-amber-400 text-stone-600 hover:text-amber-700 font-bold text-sm transition-all bg-white/60 backdrop-blur-sm"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {showAll ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
                      </svg>
                      Show Less
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                      View All {filtered.length} Shades
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* Bottom strip: CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-5"
              style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(217,119,6,0.15)", backdropFilter: "blur(8px)" }}
            >
              {/* Color swatch row preview */}
              <div className="flex -space-x-2 flex-shrink-0">
                {ALL_COLORS.filter(c => c.trending).slice(0, 6).map(c => (
                  <div
                    key={c.id}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-stone-800 text-[15px]" style={{ fontFamily: "'Georgia', serif" }}>
                  Can't decide? Try them all on your wall.
                </p>
                <p className="text-sm text-stone-400 mt-0.5">Pick any shade and see it on your room in seconds.</p>
              </div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex-shrink-0">
                <Link
                  href="/#visualizer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 6px 18px rgba(217,119,6,0.3)", fontFamily: "'Georgia', serif" }}
                >
                  Open Visualizer →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}