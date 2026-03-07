"use client";

// components/home/HowItWorks.tsx
// ─────────────────────────────────────────────────────────────────────────────
// How It Works — 3-step process section
//
// Design: Bold editorial with large step numbers, animated SVG connector path,
// alternating card layout (zigzag), and a mini animated illustration per step.
// Dark background creates contrast against the warm hero/visualizer sections.
//
// Steps:
//  1. Choose Your Room  → Pick from preset room types
//  2. Pick a Paint Color → Browse 36+ shades, filter by family
//  3. Visualize & Enquire → See instant result, submit lead
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    title: "Choose Your Room",
    subtitle: "Pick the space you want to reimagine",
    description:
      "Select from our beautifully designed room presets — living room, bedroom, kitchen, or office. Each room is crafted with realistic lighting and furniture so previews look true to life.",
    color: "#d97706",
    lightColor: "#fff7ed",
    borderColor: "#fed7aa",
    tags: ["Living Room", "Bedroom", "Kitchen", "Office"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="16" width="48" height="36" rx="4" fill="#fed7aa" stroke="#d97706" strokeWidth="2"/>
        <rect x="8" y="16" width="48" height="8" rx="4" fill="#d97706" opacity="0.3"/>
        <rect x="16" y="32" width="14" height="12" rx="2" fill="#d97706" opacity="0.7"/>
        <rect x="34" y="28" width="14" height="16" rx="2" fill="#d97706" opacity="0.5"/>
        <circle cx="48" cy="14" r="6" fill="#d97706"/>
        <path d="M45 14l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Pick a Paint Color",
    subtitle: "Browse 36+ curated shades",
    description:
      "Scroll through our hand-curated palette of 36+ paint shades organized into 7 color families. Filter by Warm, Cool, Neutral, or Statement tones. Hover to preview, click to apply.",
    color: "#0891b2",
    lightColor: "#ecfeff",
    borderColor: "#a5f3fc",
    tags: ["36+ Shades", "7 Families", "Matte / Satin / Gloss"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="32" cy="32" r="20" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
        {[
          { cx: 32, cy: 14, fill: "#ef4444" },
          { cx: 46, cy: 22, fill: "#f97316" },
          { cx: 48, cy: 38, fill: "#eab308" },
          { cx: 38, cy: 50, fill: "#22c55e" },
          { cx: 24, cy: 50, fill: "#0891b2" },
          { cx: 16, cy: 38, fill: "#8b5cf6" },
          { cx: 18, cy: 22, fill: "#ec4899" },
        ].map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r="5" fill={c.fill}/>
        ))}
        <circle cx="32" cy="32" r="7" fill="white" stroke="#0891b2" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="3" fill="#0891b2"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Visualize & Enquire",
    subtitle: "See it live, then get a quote",
    description:
      "Watch your selected wall color render instantly with realistic shadows, lighting, and furniture intact. Love what you see? Submit your enquiry and our team will contact you within 24 hours.",
    color: "#16a34a",
    lightColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    tags: ["Instant Preview", "Save Image", "Free Quote"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="12" width="40" height="32" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
        <rect x="14" y="18" width="28" height="20" rx="2" fill="#86efac" opacity="0.6"/>
        <rect x="14" y="18" width="28" height="20" rx="2" fill="#16a34a" opacity="0.15"/>
        {/* Checkmark overlay */}
        <circle cx="44" cy="40" r="10" fill="#16a34a"/>
        <path d="M40 40l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Enquiry form lines */}
        <rect x="12" y="48" width="24" height="3" rx="1.5" fill="#16a34a" opacity="0.4"/>
        <rect x="12" y="54" width="16" height="3" rx="1.5" fill="#16a34a" opacity="0.25"/>
      </svg>
    ),
  },
];

// ── Animated step card ─────────────────────────────────────────────────────────
function StepCard({
  step,
  index,
  isActive,
  onHover,
}: {
  step: (typeof STEPS)[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative flex flex-col group cursor-default"
    >
      {/* Card */}
      <div
        className="relative rounded-3xl p-8 transition-all duration-300 overflow-hidden"
        style={{
          background: isActive ? step.lightColor : "rgba(255,255,255,0.04)",
          border: `1.5px solid ${isActive ? step.borderColor : "rgba(255,255,255,0.08)"}`,
          boxShadow: isActive
            ? `0 20px 60px ${step.color}18, 0 4px 16px ${step.color}10`
            : "none",
          transform: isActive ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        {/* Large decorative number */}
        <span
          className="absolute -top-4 -right-2 text-[110px] font-black leading-none select-none pointer-events-none transition-all duration-300"
          style={{
            fontFamily: "'Georgia', serif",
            color: isActive ? step.color : "rgba(255,255,255,0.04)",
            opacity: isActive ? 0.12 : 1,
          }}
        >
          {step.number}
        </span>

        {/* Step number pill */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-2xl text-sm font-black transition-all duration-300"
            style={{
              background: isActive ? step.color : "rgba(255,255,255,0.1)",
              color: isActive ? "white" : "rgba(255,255,255,0.5)",
              fontFamily: "'Georgia', serif",
            }}
          >
            {step.number}
          </div>
          <div
            className="h-px flex-1 transition-all duration-500"
            style={{
              background: isActive
                ? `linear-gradient(to right, ${step.color}, transparent)`
                : "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 mb-6 transition-transform duration-300"
          style={{ transform: isActive ? "scale(1.1)" : "scale(1)" }}
        >
          {step.icon}
        </div>

        {/* Text */}
        <div className="mb-5">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em] mb-2 transition-colors duration-300"
            style={{ color: isActive ? step.color : "rgba(255,255,255,0.35)" }}
          >
            {step.subtitle}
          </p>
          <h3
            className="text-[1.55rem] font-black leading-tight mb-3 transition-colors duration-300"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: isActive ? "#1c1917" : "rgba(255,255,255,0.85)",
              letterSpacing: "-0.03em",
            }}
          >
            {step.title}
          </h3>
          <p
            className="text-[14.5px] leading-relaxed transition-colors duration-300"
            style={{
              color: isActive ? "#57534e" : "rgba(255,255,255,0.45)",
              fontFamily: "'Georgia', serif",
            }}
          >
            {step.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-300"
              style={{
                background: isActive ? `${step.color}18` : "rgba(255,255,255,0.06)",
                color: isActive ? step.color : "rgba(255,255,255,0.35)",
                border: `1px solid ${isActive ? step.color + "30" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Animated connector SVG (between steps) ─────────────────────────────────────
function StepConnector({ color }: { color: string }) {
  const ref = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true });

  useEffect(() => {
    if (!ref.current || !inView) return;
    const length = ref.current.getTotalLength();
    gsap.fromTo(
      ref.current,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", delay: 0.3 }
    );
  }, [inView]);

  return (
    <div ref={wrapRef} className="hidden lg:flex items-center justify-center self-center -mt-2">
      <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
        <path
          ref={ref}
          d="M 4 20 C 20 20 20 4 40 4 C 60 4 60 36 76 36"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Arrowhead */}
        <path d="M70 30 L76 36 L70 42" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      </svg>
    </div>
  );
}

// ── Main HowItWorks section ───────────────────────────────────────────────────
export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const inView      = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(175deg, #1c1917 0%, #292524 50%, #1c1917 100%)" }}
    >
      {/* ── Background texture ──────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
        {/* Top & bottom fade */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-stone-100/5 to-transparent"/>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-stone-50/5 to-transparent"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ─────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5"
              style={{ background: "rgba(217,119,6,0.15)", color: "#fbbf24", border: "1px solid rgba(217,119,6,0.2)" }}
            >
              Simple 3-Step Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2rem,4.5vw,3.6rem)] font-black text-white leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.04em" }}
          >
            From Doubt to Confident
            <br />
            <span
              className="relative"
              style={{ color: "#fbbf24" }}
            >
              in Three Steps
              <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full origin-left"
                style={{ background: "linear-gradient(to right, #d97706, transparent)" }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 text-[15px] max-w-lg mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Georgia', serif" }}
          >
            No guesswork, no waste. Our visualizer walks you through the entire
            decision in under two minutes — completely free.
          </motion.p>
        </div>

        {/* ── Steps grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-0 items-start">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.number}>
              <StepCard
                step={step}
                index={i}
                isActive={activeStep === i}
                onHover={setActiveStep}
              />
              {i < STEPS.length - 1 && (
                <StepConnector color={STEPS[i + 1].color} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Bottom CTA strip ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* Start button */}
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/#visualizer"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[15px] text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 8px 28px rgba(217,119,6,0.4)",
                fontFamily: "'Georgia', serif",
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Visualizing Now
            </Link>
          </motion.div>

          {/* Divider */}
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.2)" }}>or</span>

          {/* Scroll hint */}
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Georgia', serif" }}
          >
            Scroll down to explore our{" "}
            <Link
              href="/#colors"
              className="underline underline-offset-2 transition-colors"
              style={{ color: "rgba(251,191,36,0.6)" }}
            >
              full color collection →
            </Link>
          </p>
        </motion.div>

        {/* ── Trust micro-strip ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: "🔒", text: "No sign-up required" },
            { icon: "⚡", text: "Instant color change" },
            { icon: "📱", text: "Works on any device" },
            { icon: "💯", text: "Completely free to use" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <span className="text-base">{icon}</span>
              <span style={{ fontFamily: "'Georgia', serif" }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}