"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { substrates } from "@/context/ProductContext";

const SHOWCASE_PRODUCTS = [
  { name: "PU Coatings", substrate: "wood" as const, chemistry: "Polyurethane", href: "/products/wood/pu-coatings-for-wood" },
  { name: "Epoxy Primers", substrate: "metal" as const, chemistry: "Epoxy", href: "/products/metal/epoxy-anti-corrosion-primers-for-metal" },
  { name: "NC Coatings", substrate: "metal" as const, chemistry: "Nitrocellulose", href: "/products/metal/nc-coatings-for-metal" },
  { name: "UV Coatings", substrate: "wood" as const, chemistry: "UV Curable", href: "/products/wood/uv-coatings-for-wood" },
  { name: "PU for Glass", substrate: "glass" as const, chemistry: "Polyurethane", href: "/products/glass/pu-coatings-for-glass" },
];

// Paint can SVG component
function PaintCan({ color, label, chemistry }: { color: string; label: string; chemistry: string }) {
  return (
    <div className="relative w-44 sm:w-52 lg:w-60 flex flex-col items-center">
      {/* Can body */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl" style={{ background: `linear-gradient(180deg, ${color}20, ${color}40)` }}>
        {/* Can top rim */}
        <div className="absolute top-0 left-0 right-0 h-8 rounded-t-xl" style={{ background: `linear-gradient(180deg, #44403c, #292524)` }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60%] h-3 rounded-full" style={{ background: `linear-gradient(180deg, #57534e, #44403c)`, border: "1px solid #78716c" }} />
        </div>
        {/* Can label area */}
        <div className="absolute inset-x-3 top-12 bottom-3 rounded-lg flex flex-col items-center justify-center p-4 text-center"
          style={{ background: `linear-gradient(135deg, ${color}30, ${color}15)`, border: `1px solid ${color}40` }}>
          {/* Coating drip effect */}
          <svg className="absolute top-0 left-0 right-0 w-full h-6" viewBox="0 0 200 24" preserveAspectRatio="none">
            <path d={`M0,0 L200,0 L200,4 Q180,4 170,10 Q160,16 150,4 L120,4 Q110,4 100,12 Q90,20 80,4 L50,4 Q40,4 30,8 Q20,14 10,4 L0,4 Z`} fill={color} opacity="0.3" />
          </svg>
          <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center" style={{ background: `${color}30`, border: `2px solid ${color}60` }}>
            <svg className="w-5 h-5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color }}>{chemistry}</span>
          <span className="text-[13px] font-bold text-stone-800" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{label}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProductMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Center stays fixed, left/right slide in
  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.6], [-200, 0, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.6], [200, 0, 0]);
  const farLeftX = useTransform(scrollYProgress, [0, 0.5, 0.7], [-350, -50, 0]);
  const farRightX = useTransform(scrollYProgress, [0, 0.5, 0.7], [350, 50, 0]);
  const centerScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.85, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);
  const farOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0.3, 1]);

  return (
    <section ref={sectionRef} className="relative py-14 overflow-hidden">
      {/* Background with subtle marble/texture feel */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 50%, #fafaf9 100%)" }} />
      {/* Subtle radial glow behind center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-[100px] pointer-events-none" />

      {/* Color splash behind products */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden>
        <motion.div style={{ opacity }} className="relative w-80 h-80 hidden lg:block">
          <div className="absolute inset-0 rounded-full bg-amber-200/20 blur-3xl" />
          <div className="absolute top-5 -left-10 w-32 h-32 rounded-full bg-emerald-200/20 blur-2xl" />
          <div className="absolute -top-5 right-0 w-28 h-28 rounded-full bg-cyan-200/20 blur-2xl" />
          <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-rose-200/15 blur-2xl" />
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-amber-200/50">
            Our Products
          </span>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.02em" }}>
            Precision-Engineered{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>
              Coating Solutions
            </span>
          </h2>
          <p className="mt-3 text-stone-500 text-[14px] max-w-md mx-auto">
            Industrial-grade coatings for wood, metal, and glass substrates
          </p>
        </div>
      </div>

      {/* ═══ MOBILE: Stacked product cards with stagger animation ═══ */}
      <div className="block lg:hidden relative max-w-sm mx-auto px-4">
        <div className="space-y-3">
          {SHOWCASE_PRODUCTS.map((product, i) => {
            const info = substrates[product.substrate];
            return (
              <motion.div
                key={`mobile-${product.name}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link href={product.href} className="block group">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                    {/* Color indicator */}
                    <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${info.color}20, ${info.color}40)`, border: `1.5px solid ${info.color}30` }}>
                      <svg className="w-5 h-5" style={{ color: info.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                      </svg>
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: info.color }}>{product.chemistry}</span>
                      <span className="text-[14px] font-bold text-stone-800 block group-hover:text-amber-700 transition-colors" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{product.name}</span>
                    </div>
                    {/* Arrow */}
                    <svg className="w-4 h-4 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ═══ DESKTOP: Parallax paint cans ═══ */}
      <div className="hidden lg:flex items-center justify-center gap-8 min-h-[320px] max-w-6xl mx-auto px-8">
        {/* Far left */}
        <motion.div style={{ x: farLeftX, opacity: farOpacity }}>
          <div className="scale-75 opacity-80">
            <PaintCan color={substrates[SHOWCASE_PRODUCTS[3].substrate].color} label={SHOWCASE_PRODUCTS[3].name} chemistry={SHOWCASE_PRODUCTS[3].chemistry} />
          </div>
        </motion.div>

        {/* Left */}
        <motion.div style={{ x: leftX, opacity: leftOpacity }}>
          <div className="scale-90">
            <PaintCan color={substrates[SHOWCASE_PRODUCTS[1].substrate].color} label={SHOWCASE_PRODUCTS[1].name} chemistry={SHOWCASE_PRODUCTS[1].chemistry} />
          </div>
        </motion.div>

        {/* Center - hero product */}
        <motion.div style={{ scale: centerScale, opacity }} className="z-10">
          <PaintCan color={substrates[SHOWCASE_PRODUCTS[0].substrate].color} label={SHOWCASE_PRODUCTS[0].name} chemistry={SHOWCASE_PRODUCTS[0].chemistry} />
        </motion.div>

        {/* Right */}
        <motion.div style={{ x: rightX, opacity: leftOpacity }}>
          <div className="scale-90">
            <PaintCan color={substrates[SHOWCASE_PRODUCTS[2].substrate].color} label={SHOWCASE_PRODUCTS[2].name} chemistry={SHOWCASE_PRODUCTS[2].chemistry} />
          </div>
        </motion.div>

        {/* Far right */}
        <motion.div style={{ x: farRightX, opacity: farOpacity }}>
          <div className="scale-75 opacity-80">
            <PaintCan color={substrates[SHOWCASE_PRODUCTS[4].substrate].color} label={SHOWCASE_PRODUCTS[4].name} chemistry={SHOWCASE_PRODUCTS[4].chemistry} />
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="relative text-center mt-10 lg:mt-14 max-w-6xl mx-auto px-4">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-white font-bold text-[14px] shadow-lg shadow-stone-900/15 hover:shadow-xl transition-all"
            style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
            Explore All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
