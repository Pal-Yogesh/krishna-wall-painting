"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const NAVY = "#0f1c35";
const GOLD = "#b8922a";

const FEATURES = [
  {
    title: "Advanced\nInfrastructure",
    desc: "State-of-the-art facility with modern production capabilities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Quality\nYou Can Trust",
    desc: "Rigorous testing and quality control at every stage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Built for\nReliability",
    desc: "Efficient processes ensuring timely and dependable delivery.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} id="products" className="relative py-14 bg-white overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── MAIN HERO BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-md"
          style={{ minHeight: 380, background: "#fff" }}
        >
          {/* LEFT: text */}
          <div className="flex flex-col justify-center px-8 sm:px-12 py-12 bg-white z-10">
            {/* Eyebrow */}
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] mb-3" style={{ color: GOLD }}>
              Manufacturing Excellence
            </p>
            {/* Gold short line */}
            <div className="w-8 h-0.5 mb-6 rounded-full" style={{ background: GOLD }} />

            {/* Headline */}
            <h2
              className="font-extrabold leading-[1.1] mb-2"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
              }}
            >
              Where Precision<br />
              Meets Performance
              <span style={{ color: GOLD }}>.</span>
            </h2>

            {/* Gold short line below headline */}
            <div className="w-8 h-0.5 mt-4 mb-6 rounded-full" style={{ background: GOLD }} />

            <p className="text-stone-500 text-[14px] leading-relaxed mb-9 max-w-xs">
              Our advanced manufacturing facility and robust quality systems ensure consistent quality in every batch.
            </p>

            {/* CTA button — dark navy, outlined */}
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg font-bold text-[11.5px] uppercase tracking-[0.18em] self-start transition-all hover:bg-opacity-90"
              style={{ background: NAVY, color: "#fff" }}
            >
              Explore Our Manufacturing
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* RIGHT: image */}
          <div className="relative hidden lg:block overflow-hidden">
            {/* Rounded left edge clip */}
            <div
              className="absolute inset-0"
              style={{ clipPath: "ellipse(110% 100% at 100% 50%)" }}
            >
              <img
                src="/new-images-update/products.PNG"
                alt="KMOPL Manufacturing Facility"
                className="w-full h-full object-cover object-center"
              />
              {/* Left blend */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.7) 0%, transparent 25%)" }}
              />
            </div>

            {/* Bottom info strip */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center gap-4 px-6 py-3.5 z-10"
              style={{ background: "rgba(15,28,53,0.82)", backdropFilter: "blur(6px)" }}
            >
              {/* Gold circle icon */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(184,146,42,0.18)", border: `1.5px solid ${GOLD}` }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke={GOLD} strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <p className="text-white/85 text-[12px] font-medium tracking-wide">
                Modern Infrastructure &nbsp;•&nbsp; Advanced Technology &nbsp;•&nbsp; Consistent Quality
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 3 FEATURE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.45 }}
              className="flex items-start gap-4 px-6 py-6 rounded-2xl border-t-[3px] overflow-hidden"
              style={{ background: "#f4f5f7", borderTopColor: NAVY }}
            >
              {/* Navy circle icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white"
                style={{ background: NAVY }}
              >
                {f.icon}
              </div>
              <div>
                <h3
                  className="font-bold text-[15px] leading-snug mb-2 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-raleway), sans-serif", color: NAVY }}
                >
                  {f.title}
                </h3>
                {/* Gold underline */}
                <div className="w-6 h-0.5 mb-2 rounded-full" style={{ background: GOLD }} />
                <p className="text-stone-500 text-[12.5px] leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM TRUST BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-5 rounded-2xl border-t-[3px]"
          style={{ background: "#f4f5f7", borderTopColor: NAVY }}
        >
          <div className="flex items-center gap-4">
            {/* Gold certificate icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(184,146,42,0.10)", border: `1.5px solid ${GOLD}40` }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke={GOLD} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
              </svg>
            </div>
            <p
              className="text-[14px] font-semibold text-stone-800"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Delivering high-performance coating solutions for over{" "}
              <span className="font-extrabold" style={{ color: GOLD }}>500+</span>{" "}
              industrial customers across India.
            </p>
          </div>

          {/* Right CTA — vertical divider on desktop */}
          <div className="hidden sm:block w-px h-10 bg-stone-300 shrink-0" />
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 font-extrabold text-[12px] uppercase tracking-[0.18em] whitespace-nowrap transition-all hover:gap-4"
            style={{ color: NAVY }}
          >
            See How We Manufacture
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
