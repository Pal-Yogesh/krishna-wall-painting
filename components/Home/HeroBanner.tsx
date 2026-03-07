"use client";

// components/home/HeroBanner.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Full-screen hero section for KMOPL Paint Visualizer
//
// Design: Editorial luxury — warm editorial palette, asymmetric layout,
// cinematic staggered entrance via GSAP, floating animated room preview,
// live color swatch teaser that cycles through colors.
//
// Structure:
//  Left  → headline + subtext + CTA buttons + stats bar
//  Right → animated SVG room preview with cycling wall color + floating badges
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// ── Accent colors for the cycling room preview ────────────────────────────────
const CYCLE_COLORS = [
  { hex: "#C1623F", name: "Terracotta" },
  { hex: "#7BB8D4", name: "Ocean Breeze" },
  { hex: "#8FAF7E", name: "Sage Leaf" },
  { hex: "#5C3A5E", name: "Velvet Plum" },
  { hex: "#D4A017", name: "Golden Hour" },
  { hex: "#2C3E6B", name: "Midnight Navy" },
  { hex: "#6D9E8C", name: "Eucalyptus" },
  { hex: "#D4898A", name: "Dusty Rose" },
];

// ── Floating badge data ───────────────────────────────────────────────────────
const FLOATING_BADGES = [
  { icon: "✦", text: "36+ Shades",      top: "12%", left: "-8%",  delay: 0.8 },
  { icon: "◈", text: "3 Finish Types",  top: "65%", left: "-6%",  delay: 1.1 },
  { icon: "⟳", text: "Instant Preview", top: "20%", right: "-5%", delay: 1.4 },
  { icon: "✉", text: "Free Enquiry",    top: "72%", right: "-4%", delay: 1.7 },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "36+",  label: "Paint Colors" },
  { value: "3",    label: "Finish Types" },
  { value: "500+", label: "Happy Clients" },
  { value: "100%", label: "Free to Try" },
];

// ── Mini SVG room (hero preview) ──────────────────────────────────────────────
function MiniRoom({ wallColor }: { wallColor: string }) {
  function shade(hex: string, f: number) {
    const h = hex.replace("#", "");
    const r = Math.min(255, Math.round(parseInt(h.slice(0,2),16)*f));
    const g = Math.min(255, Math.round(parseInt(h.slice(2,4),16)*f));
    const b = Math.min(255, Math.round(parseInt(h.slice(4,6),16)*f));
    return `rgb(${r},${g},${b})`;
  }

  return (
    <svg viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="hWall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={shade(wallColor, 1.15)} />
          <stop offset="60%"  stopColor={wallColor} />
          <stop offset="100%" stopColor={shade(wallColor, 0.72)} />
        </linearGradient>
        <linearGradient id="hLWall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={shade(wallColor, 0.52)} />
          <stop offset="100%" stopColor={shade(wallColor, 0.78)} />
        </linearGradient>
        <linearGradient id="hRWall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={shade(wallColor, 0.78)} />
          <stop offset="100%" stopColor={shade(wallColor, 0.60)} />
        </linearGradient>
        <linearGradient id="hFloor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#c8a96a" />
          <stop offset="100%" stopColor="#a07840" />
        </linearGradient>
        <linearGradient id="hCeiling" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#e8dfc8" />
          <stop offset="100%" stopColor="#f5f0e8" />
        </linearGradient>
        <radialGradient id="hWinLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF9E8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFE8A0" stopOpacity="0.1" />
        </radialGradient>
        <filter id="hShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.18)" />
        </filter>
      </defs>

      {/* Ceiling */}
      <polygon points="0,0 560,0 560,80 420,130 140,130 0,80" fill="url(#hCeiling)" />
      <polygon points="0,80 560,80 420,130 140,130" fill="#ddd5c0" opacity="0.5" />

      {/* Back wall */}
      <polygon points="140,130 420,130 420,310 140,310" fill="url(#hWall)" />
      {/* Left wall */}
      <polygon points="0,80 140,130 140,310 0,320" fill="url(#hLWall)" />
      {/* Right wall */}
      <polygon points="420,130 560,80 560,320 420,310" fill="url(#hRWall)" />

      {/* Floor */}
      <polygon points="0,320 140,310 420,310 560,320 560,380 0,380" fill="url(#hFloor)" />
      {/* Floor planks */}
      {[328,342,355,365].map((y,i) => (
        <line key={i} x1="0" y1={y} x2="560" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1"/>
      ))}

      {/* Window */}
      <rect x="210" y="148" width="140" height="105" rx="3" fill="#B8D4E8" />
      <rect x="208" y="146" width="144" height="109" rx="4" fill="none" stroke="#d4c8a8" strokeWidth="5"/>
      <line x1="280" y1="148" x2="280" y2="253" stroke="#d4c8a8" strokeWidth="3"/>
      <line x1="210" y1="200" x2="350" y2="200" stroke="#d4c8a8" strokeWidth="3"/>
      <rect x="210" y="148" width="140" height="105" rx="3" fill="url(#hWinLight)"/>
      <rect x="210" y="148" width="140" height="52" rx="2" fill="#87CEEB" opacity="0.6"/>
      <rect x="210" y="200" width="140" height="53" rx="2" fill="#90EE90" opacity="0.35"/>
      {/* Window sill */}
      <rect x="202" y="253" width="156" height="9" rx="2" fill="#e0d4b8"/>
      {/* Light cast */}
      <polygon points="225,258 335,258 370,310 190,310" fill="#FFF8E0" opacity="0.12"/>

      {/* Skirting */}
      <polygon points="140,296 420,296 420,310 140,310" fill="#e4d8c0"/>

      {/* Sofa */}
      <g filter="url(#hShadow)">
        <rect x="158" y="260" width="244" height="44" rx="6" fill="#5A4A36"/>
        <rect x="164" y="236" width="232" height="32" rx="6" fill="#4A3A28"/>
        <rect x="168" y="263" width="72" height="37" rx="5" fill="#6A5840"/>
        <rect x="244" y="263" width="72" height="37" rx="5" fill="#6A5840"/>
        <rect x="320" y="263" width="72" height="37" rx="5" fill="#6A5840"/>
        <rect x="160" y="244" width="20" height="58" rx="5" fill="#3E2E1C"/>
        <rect x="380" y="244" width="20" height="58" rx="5" fill="#3E2E1C"/>
        {/* Back cushions */}
        <rect x="168" y="238" width="70" height="28" rx="5" fill="#604A34"/>
        <rect x="244" y="238" width="70" height="28" rx="5" fill="#604A34"/>
        <rect x="320" y="238" width="70" height="28" rx="5" fill="#604A34"/>
        {/* Pillows */}
        <rect x="170" y="239" width="34" height="26" rx="6" fill="#B85C38"/>
        <rect x="356" y="239" width="34" height="26" rx="6" fill="#3A6A5A"/>
      </g>

      {/* Coffee table */}
      <g filter="url(#hShadow)">
        <rect x="208" y="291" width="144" height="8" rx="2" fill="#A07820"/>
        <rect x="214" y="283" width="132" height="9" rx="2" fill="#B08930"/>
        <rect x="220" y="299" width="8" height="10" rx="1" fill="#6B4E10"/>
        <rect x="332" y="299" width="8" height="10" rx="1" fill="#6B4E10"/>
        {/* Book on table */}
        <rect x="224" y="276" width="26" height="8" rx="1" fill="#C84B38"/>
        {/* Vase */}
        <ellipse cx="308" cy="282" rx="8" ry="4" fill="#4A7A6A"/>
        <rect x="302" y="272" width="12" height="11" rx="4" fill="#3A6A5A"/>
        <ellipse cx="308" cy="272" rx="6" ry="3" fill="#5A9A8A"/>
        <line x1="308" y1="272" x2="308" y2="264" stroke="#2A5A3A" strokeWidth="1.5"/>
        <circle cx="308" cy="263" r="4" fill="#E8C040"/>
      </g>

      {/* Floor lamp */}
      <g>
        <ellipse cx="406" cy="307" rx="12" ry="4" fill="#2A2016"/>
        <line x1="406" y1="304" x2="406" y2="222" stroke="#4A3820" strokeWidth="3.5" strokeLinecap="round"/>
        <polygon points="390,222 422,222 417,196 395,196" fill="#E8C878"/>
        <ellipse cx="406" cy="220" rx="40" ry="28" fill="#FFF5C0" opacity="0.1"/>
      </g>

      {/* Plant corner */}
      <g>
        <polygon points="144,304 156,304 152,312 148,312" fill="#B06830"/>
        <ellipse cx="150" cy="303" rx="6" ry="2.5" fill="#C07840"/>
        <path d="M150,302 Q143,288 136,285" stroke="#3A7A3A" strokeWidth="2" fill="none"/>
        <path d="M150,302 Q157,284 164,278" stroke="#3A7A3A" strokeWidth="2" fill="none"/>
        <ellipse cx="134" cy="283" rx="8" ry="5" fill="#4A9A4A" transform="rotate(-30 134 283)"/>
        <ellipse cx="166" cy="276" rx="9" ry="5" fill="#3A8A3A" transform="rotate(25 166 276)"/>
        <ellipse cx="144" cy="290" rx="6" ry="4" fill="#5AAA5A" transform="rotate(-15 144 290)"/>
        <ellipse cx="156" cy="290" rx="6" ry="4" fill="#4A9A4A" transform="rotate(20 156 290)"/>
      </g>

      {/* Wall art left */}
      <g filter="url(#hShadow)">
        <rect x="152" y="160" width="46" height="60" rx="3" fill="#1a1a1a"/>
        <rect x="155" y="163" width="40" height="54" rx="2" fill="#F5F0E0"/>
        <ellipse cx="175" cy="182" rx="14" ry="11" fill={shade(wallColor, 0.62)} opacity="0.8"/>
        <ellipse cx="183" cy="198" rx="10" ry="8" fill={shade(wallColor, 1.1)} opacity="0.6"/>
      </g>

      {/* Wall art right */}
      <g filter="url(#hShadow)">
        <rect x="362" y="153" width="40" height="54" rx="3" fill="#1a1a1a"/>
        <rect x="365" y="156" width="34" height="48" rx="2" fill="#F5EED8"/>
        <polygon points="382,168 394,188 370,188" fill={shade(wallColor, 0.65)} opacity="0.7"/>
      </g>

      {/* Ceiling light */}
      <line x1="280" y1="0" x2="280" y2="46" stroke="#C8B890" strokeWidth="2.5"/>
      <ellipse cx="280" cy="50" rx="24" ry="7" fill="#E8D898"/>
      <ellipse cx="280" cy="46" rx="16" ry="5" fill="#F5E8A0"/>

      {/* Corner shadows */}
      <polygon points="140,130 148,134 148,310 140,310" fill="rgba(0,0,0,0.07)"/>
      <polygon points="420,130 412,134 412,310 420,310" fill="rgba(0,0,0,0.07)"/>
    </svg>
  );
}

// ── HeroBanner ────────────────────────────────────────────────────────────────
export default function HeroBanner() {
  const [colorIdx, setColorIdx]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // GSAP refs
  const sectionRef  = useRef<HTMLElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const roomWrapRef = useRef<HTMLDivElement>(null);

  // ── GSAP cinematic entrance ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }, "0"
      )
      .fromTo(h1Ref.current?.querySelectorAll(".word") ?? [],
        { opacity: 0, y: 60, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.08 }, "0.2"
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 }, "0.7"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }, "0.9"
      )
      .fromTo(statsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }, "1.1"
      )
      .fromTo(roomWrapRef.current,
        { opacity: 0, x: 60, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power3.out" }, "0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Auto-cycle wall colors every 2.8s ─────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setColorIdx(i => (i + 1) % CYCLE_COLORS.length);
        setIsAnimating(false);
      }, 300);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const handleColorClick = useCallback((idx: number) => {
    setIsAnimating(true);
    setTimeout(() => { setColorIdx(idx); setIsAnimating(false); }, 200);
  }, []);

  const currentColor = CYCLE_COLORS[colorIdx];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-65px)] overflow-hidden flex items-center"
      style={{
        background: "linear-gradient(160deg, #faf6ef 0%, #f0e8d8 40%, #e8dcc8 100%)",
      }}
    >
      {/* ── Decorative background elements ──────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Large warm circle top-right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #f5deb3 0%, transparent 70%)" }} />
        {/* Bottom-left accent */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #d4a56a 0%, transparent 70%)" }} />
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#78716c" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Diagonal accent stripe */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-[1px] h-full opacity-10"
            style={{ background: "linear-gradient(to bottom, transparent, #d97706 30%, #d97706 70%, transparent)", transform: "translateX(-40vw) rotate(-12deg) scaleY(2)", transformOrigin: "top right" }} />
        </div>
      </div>

      {/* ── Main content grid ─────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ───────────────────────────────────── */}
          <div className="flex flex-col gap-7 lg:pr-6">

            {/* Tagline pill */}
            <div ref={taglineRef} className="opacity-0">
              <div className="inline-flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-amber-200/60 rounded-full px-4 py-2 shadow-sm">
                <span className="flex w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                <span
                  className="text-xs font-bold text-amber-700 tracking-[0.18em] uppercase"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  India's Smart Paint Visualizer
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              ref={h1Ref}
              className="text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.08] font-black text-stone-900"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.04em", perspective: "600px" }}
            >
              {["See", "Your", "Walls", "Come", "to\u00a0Life"].map((word, i) => (
                <span key={i} className="word inline-block opacity-0 mr-[0.22em]">
                  {i === 2 ? (
                    <>
                      <span
                        className="relative inline-block"
                        style={{ color: currentColor.hex, transition: "color 0.4s ease" }}
                      >
                        {word}
                        {/* Underline accent */}
                        <span
                          className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full opacity-60"
                          style={{ background: currentColor.hex, transition: "background 0.4s ease" }}
                        />
                      </span>
                    </>
                  ) : i === 4 ? (
                    <span className="text-stone-400">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
              <br />
              <span
                className="block text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.08]"
                style={{ color: "#1c1917" }}
              >
                Before You Paint
              </span>
            </h1>

            {/* Subtext */}
            <p
              ref={subRef}
              className="opacity-0 text-[1.05rem] text-stone-500 leading-relaxed max-w-[480px]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Pick any shade from our curated palette and watch your room walls
              transform in real time — with accurate lighting, shadows, and finishes.
              No app download. No AI gimmicks. Just instant, honest previews.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4 items-center">
              {/* Primary CTA */}
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/#visualizer"
                  className="group flex items-center gap-3 px-7 py-4 rounded-2xl text-white font-bold text-[15px] tracking-wide shadow-xl transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    boxShadow: "0 8px 28px rgba(217,119,6,0.38), 0 2px 8px rgba(217,119,6,0.2)",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </span>
                  Start Visualizing Free
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/#colors"
                  className="flex items-center gap-2.5 px-6 py-4 rounded-2xl font-semibold text-[14px] text-stone-700 border-2 border-stone-200 hover:border-amber-300 hover:text-amber-700 bg-white/60 backdrop-blur-sm transition-all duration-200"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Explore Colors
                </Link>
              </motion.div>
            </div>

            {/* Stats bar */}
            <div
              ref={statsRef}
              className="opacity-0 flex flex-wrap gap-6 pt-2 border-t border-stone-200/60"
            >
              {STATS.map(({ value, label }, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-2xl font-black text-stone-900 leading-none"
                    style={{ fontFamily: "'Georgia', serif", color: i === 0 ? currentColor.hex : undefined, transition: "color 0.4s" }}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-stone-400 font-semibold tracking-wide mt-0.5 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Animated room preview ─────────────────────────── */}
          <div ref={roomWrapRef} className="opacity-0 relative">
            {/* Floating badges */}
            {FLOATING_BADGES.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.delay, type: "spring", stiffness: 300, damping: 22 }}
                className="absolute z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg shadow-stone-200/60 border border-white"
                style={{
                  top: badge.top,
                  left: (badge as any).left,
                  right: (badge as any).right,
                }}
              >
                <span className="text-amber-500 text-sm font-black">{badge.icon}</span>
                <span className="text-xs font-bold text-stone-700 whitespace-nowrap">{badge.text}</span>
              </motion.div>
            ))}

            {/* Room frame card */}
            <div
              className="relative rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.1)]"
              style={{ border: "1.5px solid rgba(255,255,255,0.8)" }}
            >
              {/* Room scene with color transition */}
              <div
                className="transition-opacity duration-300"
                style={{ opacity: isAnimating ? 0.6 : 1 }}
              >
                <MiniRoom wallColor={currentColor.hex} />
              </div>

              {/* Bottom overlay: active color indicator */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 via-black/10 to-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={colorIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-6 h-6 rounded-lg border-2 border-white/60 shadow flex-shrink-0"
                      style={{ backgroundColor: currentColor.hex }}
                    />
                    <div>
                      <span className="text-white text-sm font-bold block leading-none">{currentColor.name}</span>
                      <span className="text-white/60 text-[11px] font-mono">{currentColor.hex.toUpperCase()}</span>
                    </div>
                    <span className="ml-auto text-white/70 text-xs font-semibold">Live Preview</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Top-right: "Try it" chip */}
              <div className="absolute top-4 right-4">
                <Link
                  href="/#visualizer"
                  className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-stone-700 shadow hover:bg-amber-50 hover:text-amber-700 transition-colors border border-white"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Try It
                </Link>
              </div>
            </div>

            {/* Color cycle dots */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {CYCLE_COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleColorClick(i)}
                  title={c.name}
                  className="rounded-full border-2 transition-all duration-200 cursor-pointer"
                  style={{
                    width: colorIdx === i ? 28 : 14,
                    height: 14,
                    backgroundColor: c.hex,
                    borderColor: colorIdx === i ? "rgba(0,0,0,0.25)" : "transparent",
                    boxShadow: colorIdx === i ? `0 2px 10px ${c.hex}80` : "none",
                  }}
                  aria-label={`Preview ${c.name}`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-stone-400 font-medium mt-2 tracking-wide">
              Auto-cycling · Click any dot to preview
            </p>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-xs font-semibold text-stone-400 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-stone-300 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-stone-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}