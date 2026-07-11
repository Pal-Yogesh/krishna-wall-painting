"use client";

// components/Home/AboutContent.tsx
// ─────────────────────────────────────────────────────────────────────────────
// About content: "Why Choose Us" (6 icon cards, 2×3) and
// "Our Manufacturing Process" (6 connected process steps / timeline).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Why Choose Us data ─────────────────────────────────────────────────────────
const REASONS = [
  {
    title: "Advanced Coating Expertise",
    description:
      "With decades of experience, we develop coating solutions that combine durability, aesthetics, and performance for a wide range of industrial applications.",
    color: "#d97706",
    image: "/about/why-choose-us/advance-coating.jpeg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Premium Quality Standards",
    description:
      "Every product is manufactured using high-quality raw materials and stringent quality control processes to ensure consistent results.",
    color: "#16a34a",
    image: "/about/why-choose-us/premium-quality.jpeg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Wide Product Portfolio",
    description:
      "From PU, NC, Epoxy, UV, Acrylic, and Water-Based Coatings, we offer comprehensive solutions for wood, metal, glass, and other engineered surfaces.",
    color: "#0891b2",
    image: "/about/why-choose-us/wide-product.jpeg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
  },
  {
    title: "Customer-Centric Solutions",
    description:
      "We understand that every project is unique. Our team works closely with customers to provide coating solutions tailored to their specific requirements.",
    color: "#7c3aed",
    image: "/about/why-choose-us/customer-ceramic.jpeg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Innovation & Technology",
    description:
      "We continuously adopt advanced technologies and modern manufacturing practices to deliver products that meet evolving industry demands.",
    color: "#b45309",
    image: "/about/why-choose-us/innovation-technology.jpeg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "Trusted Industry Partner",
    description:
      "Our commitment to reliability, technical support, and long-term customer relationships has made KMOPL a trusted name in the coatings industry.",
    color: "#be185d",
    image: "/about/why-choose-us/trusted-industry.jpeg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

// ── Manufacturing process data ──────────────────────────────────────────────────
const PROCESS = [
  {
    step: "01",
    title: "Research & Product Development",
    image: "/about/how-we-work/reasearch-product-development.jpeg",
    description:
      "Every formulation begins with extensive research to develop coatings that deliver superior performance, durability, and finish.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Raw Material Selection",
    image: null,
    description:
      "We carefully source premium-quality raw materials to ensure consistency and high product standards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Precision Manufacturing",
    image: "/about/how-we-work/precision-manufacturing.jpeg",
    description:
      "Our manufacturing process follows controlled production methods using advanced equipment and strict quality parameters.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Quality Testing",
    image: "/about/how-we-work/quality-testing.jpeg",
    description:
      "Each batch undergoes rigorous testing for finish, durability, adhesion, consistency, and overall performance before approval.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Packaging & Dispatch",
    image: "/about/how-we-work/packaging-dispatch.jpeg",
    description:
      "After successful quality checks, products are securely packed and prepared for timely delivery while maintaining product integrity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    step: "06",
    title: "Customer Support",
    image: null,
    description:
      "Our relationship continues beyond delivery through technical guidance and customer support to help achieve the best application results.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
];

// ── Why Choose Us card ──────────────────────────────────────────────────────────
function ReasonCard({ reason, index, trigger }: { reason: typeof REASONS[0]; index: number; trigger: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Top accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${reason.color}, ${reason.color}40)` }}
      />
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={reason.image} alt={reason.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <div
          className="absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
          style={{ background: reason.color, color: "#fff" }}
        >
          {reason.icon}
        </div>
      </div>
      {/* Text */}
      <div className="p-6">
        <h3
          className="text-[16px] font-bold text-stone-900 mb-2 leading-snug"
          style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.02em" }}
        >
          {reason.title}
        </h3>
        <p className="text-[13px] text-stone-500 leading-relaxed">
          {reason.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Process step card ────────────────────────────────────────────────────────────
function ProcessStep({ step, index, trigger }: { step: typeof PROCESS[0]; index: number; trigger: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="group relative h-full rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 overflow-hidden">
        {/* Image (if available) */}
        {step.image && (
          <div className="h-40 overflow-hidden relative">
            <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            <div
              className="absolute bottom-3 left-4 w-9 h-9 rounded-xl flex items-center justify-center shadow-md text-white"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              {step.icon}
            </div>
          </div>
        )}
        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            {!step.image && (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                {step.icon}
              </div>
            )}
            <span
              className="text-3xl font-bold leading-none tabular-nums"
              style={{ fontFamily: "var(--font-raleway), sans-serif", color: "#f0ece4" }}
            >
              {step.step}
            </span>
          </div>
          <h3
            className="text-[15px] font-bold text-stone-900 mb-2 leading-snug"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.02em" }}
          >
            {step.title}
          </h3>
          <p className="text-[13px] text-stone-500 leading-relaxed">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────
export default function AboutContent() {
  const reasonsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const reasonsInView = useInView(reasonsRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="relative py-20 overflow-hidden" style={{ background: "#faf9f7" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.04em" }}
            >
              The KMOPL <span className="text-amber-500">Advantage</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-[15px] text-stone-500 max-w-2xl mx-auto leading-relaxed"
            >
              Six reasons industries across India trust us for their coating needs.
            </motion.p>
          </div>

          {/* 2 × 3 grid */}
          <div ref={reasonsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((reason, i) => (
              <ReasonCard key={i} reason={reason} index={i} trigger={reasonsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MANUFACTURING PROCESS ═══ */}
      <section className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #fefdfb 0%, #f5efe4 60%, #faf8f4 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #fed7aa 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}
            >
              How We Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.04em" }}
            >
              Our Manufacturing <span className="text-amber-500">Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-[15px] text-stone-500 max-w-2xl mx-auto leading-relaxed"
            >
              From research to support — a controlled, six-stage journey behind every coating.
            </motion.p>
          </div>

          {/* Connected process timeline */}
          <div ref={processRef} className="relative">
            {/* Horizontal connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[34px] left-0 right-0 h-0.5 -z-0"
              style={{ background: "linear-gradient(90deg, transparent, #f59e0b40 10%, #f59e0b40 90%, transparent)" }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROCESS.map((step, i) => (
                <ProcessStep key={i} step={step} index={i} trigger={processInView} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
