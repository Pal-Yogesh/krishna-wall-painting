"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { substrates, useProducts } from "@/context/ProductContext";

const substrateKeys = Object.keys(substrates) as (keyof typeof substrates)[];

const CHEMISTRIES = [
  { name: "Polyurethane", color: "#7c3aed" },
  { name: "Nitrocellulose", color: "#dc2626" },
  { name: "Epoxy", color: "#0891b2" },
  { name: "Acrylic", color: "#2563eb" },
  { name: "UV Curable", color: "#ea580c" },
  { name: "Water-Based", color: "#0284c7" },
  { name: "Heat Resistant", color: "#b91c1c" },
  { name: "Polyester", color: "#7c2d12" },
];

export default function ProductsPage() {
  const { products } = useProducts();

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* ═══ HERO BANNER with right-side substrate cards ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex z-10">
          {["#d97706", "#16a34a", "#0891b2", "#7c3aed", "#dc2626", "#ea580c", "#0284c7", "#b91c1c"].map((c, i) => (
            <div key={i} className="flex-1 h-full" style={{ background: c }} />
          ))}
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #fef3c720 0%, #fefdfb 25%, #f0fdf4 50%, #ecfeff 75%, #fefdfb 100%)" }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <motion.div animate={{ y: [0, -15, 0], x: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 right-[8%] w-48 h-48 rounded-full bg-amber-200/30 blur-3xl" />
          <motion.div animate={{ y: [0, 12, 0], x: [0, -8, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-[5%] w-36 h-36 rounded-full bg-emerald-200/25 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 border border-amber-200/50">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
                Coating Solutions
              </span>
              <h1 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold text-stone-900 leading-[1.1] mb-5"
                style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
                Premium{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #16a34a, #0891b2)" }}>
                  Industrial Coatings
                </span>
                {" "}for Every Surface
              </h1>
              <p className="text-[15px] text-stone-500 leading-relaxed max-w-lg mb-8">
                From wood furniture to automotive metal, glass decoratives to ABS plastics — engineered coating solutions with 9+ chemistry types and precision-tested formulations.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6">
                {[
                  { value: `15+`, label: "Categories" },
                  { value: "3", label: "Substrates" },
                  { value: "9+", label: "Chemistries" },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center">
                    <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
                    <div className="text-[11px] text-stone-400 font-medium mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Substrate cards */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-3">
              {substrateKeys.map((key, i) => {
                const info = substrates[key];
                const count = products.filter(p => p.substrate === key).length;
                const imgMap: Record<string, string> = { wood: "/coating/wood-coating.jpeg", metal: "/coating/metal-coating.jpeg", glass: "/coating/glass-coating.jpeg" };
                return (
                  <motion.div key={key} whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`${i === 0 ? "col-span-2" : ""}`}>
                    <Link href={`/products/${key}`} className="block group">
                      <div className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all ${i === 0 ? "h-44" : "h-40"}`}>
                        <img src={imgMap[key]} alt={info.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}60)` }} />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-[15px] font-bold text-white drop-shadow-md" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                            {info.label}
                          </h3>
                          <p className="text-[11px] text-white/70 mt-0.5">{count} products</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CHEMISTRY STRIP ═══ */}
      <section className="border-y border-stone-200/80 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0">Chemistries:</span>
            {CHEMISTRIES.map((chem) => (
              <div key={chem.name} className="shrink-0 flex items-center gap-2 px-3.5 py-2 bg-stone-50 border border-stone-200/80 rounded-xl">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: chem.color }} />
                <span className="text-[12px] font-semibold text-stone-700 whitespace-nowrap">{chem.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3 SUBSTRATE CARDS (main section) ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14" style={{ background: "linear-gradient(160deg, #fef3c720 0%, #fefdfb 25%, #f0fdf4 50%, #ecfeff 75%, #fefdfb 100%)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {substrateKeys.map((key, i) => {
            const info = substrates[key];
            const count = products.filter(p => p.substrate === key).length;
            const imgMap: Record<string, string> = { wood: "/coating/wood-coating.jpeg", metal: "/coating/metal-coating.jpeg", glass: "/coating/glass-coating.jpeg" };
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Link href={`/products/${key}`} className="block group">
                  <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all h-80">
                    <img src={imgMap[key]} alt={info.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}60)` }} />
                    <div className="absolute inset-y-0 -left-full w-1/2 bg-linear-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-xl font-bold text-white mb-1 drop-shadow-md" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                        {info.label}
                      </h2>
                      <p className="text-[13px] text-white/80 leading-relaxed line-clamp-2 mb-4">{info.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-white/20 backdrop-blur-sm text-white">
                          {count} products
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-white">
                          Explore
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact-us"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-white font-bold text-[14px] shadow-lg shadow-stone-900/15 hover:shadow-xl transition-all"
              style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
              Get a Custom Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
