"use client";

// components/home/WhyChooseUs.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Why Choose Us — Benefits & Trust section
//
// Design: Bold warm-dark split layout — left side is a deep charcoal panel
// with large animated stat counters, right side is a warm cream panel with
// 6 benefit cards in a 2×3 grid. Animated number counters on scroll entry.
// A horizontal testimonial ticker strip runs across the full width at bottom.
//
// Features:
//  - Animated count-up stats (triggered on scroll into view)
//  - 6 benefit cards with custom SVG icons, hover lift + glow
//  - Full-width scrolling testimonial ticker
//  - CTA with social proof
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";

// ── Stats data ────────────────────────────────────────────────────────────────
const STATS = [
  { value: 500,  suffix: "+", label: "Happy Clients",     sublabel: "across India"        },
  { value: 36,   suffix: "+", label: "Paint Shades",      sublabel: "hand-curated"        },
  { value: 98,   suffix: "%", label: "Satisfaction Rate", sublabel: "from lead surveys"   },
  { value: 24,   suffix: "h", label: "Response Time",     sublabel: "guaranteed callback" },
];

// ── Benefits data ─────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    id: 1,
    title: "Realistic Lighting",
    description: "Our visualizer preserves shadows, highlights and furniture depth so every preview looks exactly like real life.",
    color: "#d97706",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
        <circle cx="24" cy="24" r="5" fill="#d97706"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 24 + 13 * Math.cos(rad);
          const y1 = 24 + 13 * Math.sin(rad);
          const x2 = 24 + 18 * Math.cos(rad);
          const y2 = 24 + 18 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="2.2" strokeLinecap="round"/>;
        })}
      </svg>
    ),
  },
  {
    id: 2,
    title: "Zero App Download",
    description: "Works entirely in your browser — desktop, tablet, or mobile. No installs, no sign-ups, no friction whatsoever.",
    color: "#0891b2",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="10" y="6" width="28" height="36" rx="5" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
        <rect x="14" y="12" width="20" height="14" rx="2" fill="#0891b2" opacity="0.2"/>
        <circle cx="24" cy="36" r="2.5" fill="#0891b2"/>
        <path d="M18 19l6 6 6-6" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="24" y1="25" x2="24" y2="14" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "36+ Curated Shades",
    description: "Every color in our palette is selected for Indian light conditions — warm morning sun to cool evening tones.",
    color: "#16a34a",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
        {[
          {cx:24,cy:10,r:4,fill:"#ef4444"},{cx:35,cy:17,r:4,fill:"#f97316"},
          {cx:37,cy:30,r:4,fill:"#eab308"},{cx:28,cy:39,r:4,fill:"#22c55e"},
          {cx:16,cy:38,r:4,fill:"#0891b2"},{cx:10,cy:29,r:4,fill:"#8b5cf6"},
          {cx:12,cy:16,r:4,fill:"#ec4899"},
        ].map((c,i) => <circle key={i} {...c}/>)}
        <circle cx="24" cy="24" r="6" fill="white" stroke="#16a34a" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Matte, Satin & Gloss",
    description: "Simulate three finish types in real time. See exactly how each finish alters the look before committing.",
    color: "#7c3aed",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="16" width="32" height="20" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
        <rect x="8" y="16" width="10" height="20" rx="4" fill="#7c3aed" opacity="0.85"/>
        <rect x="19" y="16" width="10" height="20" fill="#7c3aed" opacity="0.45"/>
        <rect x="30" y="16" width="10" height="20" rx="4" fill="#7c3aed" opacity="0.15"/>
        <text x="10" y="29" fontSize="5.5" fill="white" fontWeight="700">M</text>
        <text x="21" y="29" fontSize="5.5" fill="#7c3aed" fontWeight="700">S</text>
        <text x="32" y="29" fontSize="5.5" fill="#7c3aed" fontWeight="700">G</text>
        <path d="M18 8 L24 14 L30 8" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Instant Lead Capture",
    description: "Love a color? Submit your enquiry with a tap — color name is auto-filled, and our team calls back within 24h.",
    color: "#b45309",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="6" y="12" width="36" height="28" rx="5" fill="#fef3c7" stroke="#b45309" strokeWidth="2"/>
        <path d="M6 18 L24 28 L42 18" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="36" cy="12" r="7" fill="#b45309"/>
        <text x="33" y="16" fontSize="9" fill="white" fontWeight="900">!</text>
      </svg>
    ),
  },
  {
    id: 6,
    title: "100% Free Forever",
    description: "The visualizer is completely free to use — unlimited color tries, no watermarks, no hidden paywalls. Ever.",
    color: "#be185d",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="16" fill="#fce7f3" stroke="#be185d" strokeWidth="2"/>
        <path d="M18 24l4 4 8-8" stroke="#be185d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
];

// ── Testimonials ticker ───────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Priya Sharma",   city: "Mumbai",    text: "Saved us so much time deciding between shades. Picked Terracotta on first try!" },
  { name: "Rahul Mehta",    city: "Delhi",     text: "The gloss finish preview is incredibly accurate. Exactly what we got painted." },
  { name: "Anita Joshi",    city: "Bangalore", text: "Finally a tool that works without downloading an app. Used it on my phone!" },
  { name: "Vikram Singh",   city: "Pune",      text: "Hunter Green on our feature wall — couldn't have decided without the visualizer." },
  { name: "Deepa Nair",     city: "Chennai",   text: "The enquiry form was so smooth. Team called back in 3 hours. Excellent service!" },
  { name: "Arjun Kapoor",   city: "Hyderabad", text: "Tried 12 colors before settling on Ocean Breeze. Zero regrets — it's perfect." },
];

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);

  return count;
}

// ── Animated stat card ────────────────────────────────────────────────────────
function StatCard({ stat, index, trigger }: { stat: typeof STATS[0]; index: number; trigger: boolean }) {
  const count = useCountUp(stat.value, 1.8, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-1 p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 group"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        className="text-[3.2rem] font-black leading-none tabular-nums"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          letterSpacing: "-0.04em",
          color: "white",
        }}
      >
        {count}
        <span style={{ color: "#f59e0b" }}>{stat.suffix}</span>
      </div>
      <p className="text-[15px] font-bold text-white/80 leading-tight mt-1"
        style={{ fontFamily: "'Georgia', serif" }}>
        {stat.label}
      </p>
      <p className="text-xs text-white/35 font-medium tracking-wide uppercase">
        {stat.sublabel}
      </p>
      {/* Accent line */}
      <div
        className="mt-3 h-0.5 rounded-full w-8 group-hover:w-16 transition-all duration-500"
        style={{ background: "linear-gradient(to right, #f59e0b, transparent)" }}
      />
    </motion.div>
  );
}

// ── Benefit card ──────────────────────────────────────────────────────────────
function BenefitCard({ benefit, index, trigger }: { benefit: typeof BENEFITS[0]; index: number; trigger: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 rounded-3xl cursor-default transition-all duration-300 group"
      style={{
        background: hovered ? "white" : "rgba(255,255,255,0.7)",
        border: `1.5px solid ${hovered ? benefit.color + "40" : "#f0ece4"}`,
        boxShadow: hovered
          ? `0 20px 48px ${benefit.color}18, 0 4px 16px rgba(0,0,0,0.05)`
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 mb-5 transition-transform duration-300"
        style={{ transform: hovered ? "scale(1.12)" : "scale(1)" }}
      >
        {benefit.icon}
      </div>

      {/* Text */}
      <h3
        className="text-[16px] font-black text-stone-900 mb-2 leading-snug"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" }}
      >
        {benefit.title}
      </h3>
      <p className="text-[13.5px] text-stone-500 leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
        {benefit.description}
      </p>

      {/* Color accent bottom bar */}
      <div
        className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-500"
        style={{
          background: `linear-gradient(to right, ${benefit.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

// ── Testimonial ticker ────────────────────────────────────────────────────────
function TestimonialTicker() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden py-5" style={{ background: "rgba(0,0,0,0.15)" }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(28,25,23,0.8), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(28,25,23,0.8), transparent)" }} />

      <motion.div
        animate={{ x: [0, -(TESTIMONIALS.length * 380)] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 w-max"
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-start gap-3 px-5 py-3 rounded-2xl w-[360px]"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
              style={{ background: "#d97706", color: "white", fontFamily: "'Georgia', serif" }}
            >
              {t.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white/80" style={{ fontFamily: "'Georgia', serif" }}>{t.name}</span>
                <span className="text-[10px] text-white/35 font-medium">{t.city}</span>
                <div className="flex gap-0.5 ml-auto">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="#f59e0b">
                      <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed line-clamp-2"
                style={{ fontFamily: "'Georgia', serif" }}>
                "{t.text}"
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Main WhyChooseUs ──────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const sectionRef  = useRef<HTMLElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsInView    = useInView(statsRef,    { once: true, margin: "-80px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-80px" });
  const headingInView  = useInView(sectionRef,  { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative overflow-hidden"
    >
      {/* ── Top half: Dark stats panel ────────────────────────────────── */}
      <div
        className="relative py-20"
        style={{ background: "linear-gradient(135deg, #1c1917 0%, #292524 60%, #1c1917 100%)" }}
      >
        {/* BG decoration */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}/>
          <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}/>
          {/* Subtle diagonal lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag)"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ background: "rgba(217,119,6,0.15)", color: "#fbbf24", border: "1px solid rgba(217,119,6,0.2)" }}
              >
                Why Choose KMOPL
              </span>
              <h2
                className="text-[clamp(2rem,4vw,3.4rem)] font-black text-white leading-tight"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.04em" }}
              >
                Numbers That
                <br />
                <span style={{ color: "#f59e0b" }}>Speak for Themselves</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[14.5px] leading-relaxed max-w-sm lg:text-right"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Georgia', serif" }}
            >
              Trusted by homeowners across India to make confident, lasting color decisions.
            </motion.p>
          </div>

          {/* Stats grid */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} trigger={statsInView} />
            ))}
          </div>
        </div>

        {/* Testimonial ticker */}
        <div className="mt-16">
          <TestimonialTicker />
        </div>
      </div>

      {/* ── Bottom half: Light benefits grid ──────────────────────────── */}
      <div
        className="relative py-20"
        style={{ background: "linear-gradient(180deg, #faf7f2 0%, #f0e8d8 100%)" }}
      >
        {/* BG decoration */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }}/>
          <svg className="absolute bottom-0 left-0 w-56 h-56 opacity-[0.05]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="#d97706" strokeWidth="2" fill="none" strokeDasharray="8 8"/>
            <circle cx="100" cy="100" r="50" stroke="#d97706" strokeWidth="1.5" fill="none" strokeDasharray="6 6"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sub-heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3
              className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-stone-900 leading-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.03em" }}
            >
              Built for the Way
              <span style={{ color: "#d97706" }}> India Decides</span>
            </h3>
            <p className="mt-3 text-[14px] text-stone-500 max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Georgia', serif" }}>
              Every feature is designed around one goal: helping you pick the right color with total confidence.
            </p>
          </motion.div>

          {/* Benefits 2×3 grid */}
          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, i) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={i} trigger={benefitsInView} />
            ))}
          </div>

          {/* CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#visualizer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-[15px]"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  boxShadow: "0 8px 28px rgba(217,119,6,0.38)",
                  fontFamily: "'Georgia', serif",
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                </svg>
                Experience It Yourself — Free
              </Link>
            </motion.div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {["#C1623F","#7BB8D4","#8FAF7E","#5C3A5E","#D4A017"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-black text-white shadow-sm"
                    style={{ background: c, zIndex: 5 - i }}
                  >
                    {["P","R","A","V","D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-stone-500" style={{ fontFamily: "'Georgia', serif" }}>
                <strong className="text-stone-700">500+</strong> homeowners already love it
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}