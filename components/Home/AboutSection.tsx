"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STRENGTHS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Superfast Response",
    description: "Quick turnaround on enquiries and orders with dedicated support teams.",
    color: "#f59e0b",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Customized Products",
    description: "Tailored coating solutions designed to meet your exact specifications.",
    color: "#16a34a",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Dedicated Sales Team",
    description: "Expert representatives who understand your industry and requirements.",
    color: "#0891b2",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Strong R&D",
    description: "Continuous innovation backed by rigorous research and development.",
    color: "#7c3aed",
  },
];

const STATS = [
  { value: "25+", label: "Years" },
  { value: "500+", label: "Clients" },
  { value: "15+", label: "Product Categories" },
  { value: "9+", label: "Chemistries" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const strengthsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (strengthsRef.current) {
        gsap.fromTo(
          strengthsRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: strengthsRef.current, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative py-14 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdfbf7 0%, #fefdfb 50%, #fdfbf7 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-amber-100/40 blur-3xl" />
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[3%] w-48 h-48 rounded-full bg-emerald-100/30 blur-3xl" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[40%] w-40 h-40 rounded-full bg-cyan-100/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 border border-amber-200/50">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
            About KMOPL
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}
          >
            Specialty Coatings for{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>
              Every Industry
            </span>
          </h2>
        </motion.div>

        {/* ─── MAIN CONTENT: Description + Visual ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-14">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <p className="text-stone-600 text-[15px] leading-[1.9] mb-5" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Krishna Murari Organosys Pvt. Ltd. (KMOPL) is a leading manufacturer of Speciality coatings
              and industrial chemicals based in Noida, U.P. Since <span className="font-bold text-amber-600">1998</span>, we have been delivering
              high-performance coating solutions to the automotive, consumer goods, home furnishing,
              and general industry sectors.
            </p>
            <p className="text-stone-500 text-[14px] leading-[1.9] mb-8" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Our comprehensive product range includes primers, putty, base coats, and top coats
              available in pearl, metallic, opaque, and clear finishes — serving substrates from
              sheet metal and glass to wood and plastics.
            </p>

            {/* Stats inline */}
            <div className="flex items-center gap-3 flex-wrap">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2.5 px-4 py-3 bg-white border border-stone-200/80 rounded-xl shadow-sm"
                >
                  <span className="text-xl font-bold text-stone-900">{stat.value}</span>
                  <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual coating layers card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative bg-white rounded-3xl border border-stone-200/80 shadow-lg overflow-hidden">
              {/* Coating layers visualization */}
              <div className="p-6 space-y-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Coating System Layers</span>
                {[
                  { label: "Top Coat", color: "#f59e0b", opacity: "100%" },
                  { label: "Base Coat", color: "#d97706", opacity: "85%" },
                  { label: "Primer", color: "#78716c", opacity: "70%" },
                  { label: "Substrate", color: "#a8a29e", opacity: "50%" },
                ].map((layer, i) => (
                  <motion.div
                    key={layer.label}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                    className="origin-left"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${layer.color}10` }}>
                      <div className="w-full h-5 rounded-lg relative overflow-hidden" style={{ background: `${layer.color}20` }}>
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={inView ? { width: layer.opacity } : {}}
                          transition={{ delay: 0.7 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                          className="absolute inset-y-0 left-0 rounded-lg"
                          style={{ background: `linear-gradient(90deg, ${layer.color}, ${layer.color}aa)` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-600 whitespace-nowrap w-20">{layer.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Substrates served */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  {[
                    { icon: "🛡️", label: "Metal" },
                    { icon: "🪵", label: "Wood" },
                    { icon: "🪟", label: "Glass" },
                  ].map((sub) => (
                    <div key={sub.label} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-white transition-colors">
                      <span className="text-base">{sub.icon}</span>
                      <span className="text-[11px] font-semibold text-stone-600">{sub.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── STRENGTHS GRID ─── */}
        <div ref={strengthsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STRENGTHS.map((strength) => (
            <motion.div
              key={strength.title}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative overflow-hidden p-6 bg-white border border-stone-200/80 rounded-2xl shadow-sm opacity-0 group"
            >
              {/* Hover glow */}
              <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                style={{ background: strength.color }} />

              {/* Colored left accent on hover */}
              <div className="absolute top-0 left-0 w-1 h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(180deg, ${strength.color}, transparent)` }} />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 group-hover:shadow-md duration-300"
                style={{ background: `${strength.color}10`, border: `1px solid ${strength.color}20`, color: strength.color }}>
                {strength.icon}
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-bold text-stone-800 mb-2 group-hover:text-stone-900 transition-colors"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                {strength.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-stone-500 leading-relaxed">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/products"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-[14px] shadow-lg shadow-stone-900/20 hover:shadow-xl transition-all"
              style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
              Explore Our Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
