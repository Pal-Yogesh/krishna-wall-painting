"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHEMISTRIES = [
  { name: "Polyurethanes", icon: "🧪", color: "#d97706" },
  { name: "Epoxies", icon: "🔗", color: "#0891b2" },
  { name: "TSA", icon: "⚗️", color: "#16a34a" },
  { name: "TPA", icon: "🧬", color: "#7c3aed" },
  { name: "Silicones", icon: "💧", color: "#be185d" },
  { name: "Alkyds", icon: "🛢️", color: "#ea580c" },
  { name: "Water-based", icon: "💦", color: "#0284c7" },
  { name: "Solvent-based", icon: "🌡️", color: "#b45309" },
  { name: "UV Cured", icon: "☀️", color: "#7c2d12" },
];

const PRODUCT_TYPES = [
  { name: "Primers", description: "Foundation coats for superior adhesion", color: "#78716c" },
  { name: "Putty", description: "Surface leveling and filling compounds", color: "#a8a29e" },
  { name: "Base Coats", description: "Color and effect layers for substrates", color: "#d97706" },
  { name: "Top Coats", description: "Protective and decorative final layers", color: "#1c1917" },
];

const EFFECTS = [
  { name: "Pearl", gradient: "linear-gradient(135deg, #fef3c7, #fde68a, #fef3c7)" },
  { name: "Metallic", gradient: "linear-gradient(135deg, #d6d3d1, #a8a29e, #d6d3d1)" },
  { name: "Opaque", gradient: "linear-gradient(135deg, #1c1917, #44403c)" },
  { name: "Clear", gradient: "linear-gradient(135deg, #ecfeff, #cffafe, #ecfeff)" },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chemRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (chemRef.current) {
        gsap.fromTo(
          chemRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chemRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #faf7f2 0%, #f0e8d8 100%)" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="prod-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#78716c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prod-dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5">
            Our Products
          </span>
          <h2
            className="text-[clamp(1.8rem,3.5vw,3rem)] font-black text-stone-900 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.03em" }}
          >
            Products available for a variety of substrates including{" "}
            <span className="text-amber-500">sheet metal, glass, wood</span> and{" "}
            <span className="text-amber-500">plastics</span>
          </h2>
        </motion.div>

        {/* Chemistry types - horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-14"
        >
          <h3
            className="text-sm font-bold text-stone-400 uppercase tracking-[0.15em] mb-5"
          >
            Chemistry Types
          </h3>
          <div
            ref={chemRef}
            className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {CHEMISTRIES.map((chem) => (
              <motion.div
                key={chem.name}
                whileHover={{ y: -3, scale: 1.03 }}
                className="shrink-0 flex items-center gap-2.5 px-5 py-3 bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-default opacity-0"
              >
                <span className="text-lg">{chem.icon}</span>
                <span
                  className="text-[13px] font-bold text-stone-700 whitespace-nowrap"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {chem.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product types + Effects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Types */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-sm font-bold text-stone-400 uppercase tracking-[0.15em] mb-5"
            >
              Product Types
            </h3>
            <div className="space-y-3">
              {PRODUCT_TYPES.map((product, i) => (
                <motion.div
                  key={product.name}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0"
                    style={{ background: product.color, opacity: 0.85 }}
                  />
                  <div>
                    <h4
                      className="text-[14px] font-bold text-stone-800"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {product.name}
                    </h4>
                    <p className="text-[12px] text-stone-500">{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Effects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-sm font-bold text-stone-400 uppercase tracking-[0.15em] mb-5"
            >
              Visual Effects
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {EFFECTS.map((effect) => (
                <motion.div
                  key={effect.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative overflow-hidden rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-shadow cursor-default"
                >
                  <div
                    className="h-28 w-full"
                    style={{ background: effect.gradient }}
                  />
                  <div className="p-4 bg-white">
                    <h4
                      className="text-[14px] font-bold text-stone-800"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {effect.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">Finish type</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
