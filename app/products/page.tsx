"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { substrates, products } from "@/data/products";

const substrateKeys = Object.keys(substrates) as (keyof typeof substrates)[];

const CHEMISTRIES = [
  { name: "Polyurethane", abbr: "PU", color: "#7c3aed" },
  { name: "Nitrocellulose", abbr: "NC", color: "#dc2626" },
  { name: "Epoxy", abbr: "EP", color: "#0891b2" },
  { name: "Acrylic", abbr: "AC", color: "#2563eb" },
  { name: "UV Curable", abbr: "UV", color: "#ea580c" },
  { name: "Water-Based", abbr: "WB", color: "#0284c7" },
  { name: "Heat Resistant", abbr: "HR", color: "#b91c1c" },
  { name: "Polyester", abbr: "PE", color: "#7c2d12" },
];

export default function ProductsPage() {
  const [activeSubstrate, setActiveSubstrate] = useState<keyof typeof substrates | "all">("all");

  const filteredProducts = activeSubstrate === "all"
    ? products
    : products.filter((p) => p.substrate === activeSubstrate);

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* ═══ HERO with paint-themed visuals ═══ */}
      <section className="relative overflow-hidden">
        {/* Multi-color top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex z-10">
          {["#d97706", "#16a34a", "#0891b2", "#7c3aed", "#dc2626", "#ea580c", "#0284c7", "#b91c1c"].map((c, i) => (
            <div key={i} className="flex-1 h-full" style={{ background: c }} />
          ))}
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #fef3c7 0%, #fefdfb 25%, #f0fdf4 50%, #ecfeff 75%, #fefdfb 100%)" }} />

        {/* Floating paint blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <motion.div animate={{ y: [0, -15, 0], x: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 right-[8%] w-48 h-48 rounded-full bg-amber-200/30 blur-3xl" />
          <motion.div animate={{ y: [0, 12, 0], x: [0, -8, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-[5%] w-36 h-36 rounded-full bg-emerald-200/25 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-[20%] w-40 h-40 rounded-full bg-cyan-200/20 blur-3xl" />
          {/* Paint drip SVG */}
          <svg className="absolute top-1.5 left-0 right-0 w-full h-6" viewBox="0 0 1200 24" preserveAspectRatio="none">
            <path d="M0,0 L1200,0 L1200,3 Q1100,3 1060,10 Q1020,18 980,3 L850,3 Q800,3 760,14 Q720,24 680,3 L500,3 Q460,3 420,8 Q380,14 340,3 L200,3 Q160,3 130,12 Q100,20 70,3 L0,3 Z" fill="#d97706" opacity="0.08" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
                Coating Solutions
              </span>
              <h1 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold text-stone-900 leading-[1.1] mb-5"
                style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
                Premium {" "}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #16a34a, #0891b2)" }}>
                    Industrial Coatings
                  </span>
                </span>
                {" "}for Every Surface
              </h1>
              <p className="text-[15px] text-stone-500 leading-relaxed max-w-lg mb-8">
                From wood furniture to automotive metal, glass decoratives to ABS plastics — engineered coating solutions with 9+ chemistry types and precision-tested formulations.
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-6">
                {[
                  { value: `${products.length}+`, label: "Categories" },
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

            {/* Right: Visual substrate cards */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-3">
              {substrateKeys.map((key, i) => {
                const info = substrates[key];
                const count = products.filter(p => p.substrate === key).length;
                return (
                  <motion.div key={key} whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`${i === 0 ? "col-span-2" : ""}`}>
                    <Link href={`/products/${key}`} className="block group">
                      <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm hover:shadow-lg transition-all">
                        {/* Color bar top */}
                        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}60)` }} />
                        <div className={`p-4 ${i === 0 ? "flex items-center gap-4" : ""}`}>
                          <div className={`w-12 h-12 rounded-xl ${info.bg} ${info.border} border flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform`}>
                            {info.icon}
                          </div>
                          <div className={i === 0 ? "" : "mt-3"}>
                            <h3 className="text-[14px] font-bold text-stone-800 group-hover:text-amber-700 transition-colors" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                              {info.label}
                            </h3>
                            <p className="text-[11px] text-stone-400 mt-0.5">{count} products</p>
                          </div>
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

      {/* ═══ CHEMISTRY TYPES STRIP ═══ */}
      <section className="border-y border-stone-200/80 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0">Chemistries:</span>
            {CHEMISTRIES.map((chem) => (
              <motion.div key={chem.name} whileHover={{ scale: 1.05 }}
                className="shrink-0 flex items-center gap-2 px-3.5 py-2 bg-stone-50 border border-stone-200/80 rounded-xl hover:border-stone-300 transition-all cursor-default">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: chem.color }} />
                <span className="text-[12px] font-semibold text-stone-700 whitespace-nowrap">{chem.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FILTER + PRODUCTS GRID ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setActiveSubstrate("all")}
            className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
              activeSubstrate === "all"
                ? "bg-stone-900 text-white shadow-md"
                : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            All Products
            <span className="ml-1 px-2 py-0.5 rounded-md bg-white/20 text-[11px]">{products.length}</span>
          </button>
          {substrateKeys.map((key) => {
            const info = substrates[key];
            const count = products.filter(p => p.substrate === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveSubstrate(key)}
                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  activeSubstrate === key
                    ? "text-white shadow-md"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                }`}
                style={activeSubstrate === key ? { background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)` } : {}}
              >
                <span className="text-base">{info.icon}</span>
                {info.label}
                <span className="ml-1 px-2 py-0.5 rounded-md text-[11px]"
                  style={activeSubstrate === key ? { background: "rgba(255,255,255,0.2)" } : { background: "#f5f5f4" }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubstrate}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredProducts.map((product, i) => {
              const info = substrates[product.substrate];
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                >
                  <Link href={`/products/${product.substrate}/${product.id}`} className="block group h-full">
                    <div className="relative overflow-hidden bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-xl hover:border-stone-300 transition-all h-full flex flex-col">
                      {/* Top color accent */}
                      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}50, transparent)` }} />

                      {/* Coating visual header */}
                      <div className="relative h-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${info.color}10, ${info.color}05, transparent)` }}>
                        {/* Subtle pattern */}
                        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden>
                          <defs>
                            <pattern id={`dots-${product.id}`} width="16" height="16" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill={info.color} />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#dots-${product.id})`} />
                        </svg>
                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            className="text-4xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300"
                          >
                            {product.icon}
                          </motion.span>
                        </div>
                        {/* Shine on hover */}
                        <div className="absolute inset-y-0 -left-full w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Chemistry badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: info.color }} />
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: info.color }}>
                            {product.chemistry}
                          </span>
                        </div>

                        <h3 className="text-[15px] font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors leading-snug"
                          style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                          {product.name}
                        </h3>

                        <p className="text-[12px] text-stone-500 leading-relaxed flex-1 line-clamp-2 mb-4">
                          {product.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${info.bg} ${info.border} border`}>
                              {product.substrate}
                            </span>
                            {product.finishes && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-50 border border-stone-200 text-stone-500">
                                {product.finishes.length} finishes
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[12px] font-semibold text-amber-600 group-hover:gap-2 transition-all">
                            View
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ═══ SUBSTRATE SHOWCASE CARDS ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            Browse by Substrate
          </h2>
          <p className="text-[14px] text-stone-400 mt-1">Explore coating solutions tailored for specific surfaces</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {substrateKeys.map((key, i) => {
            const info = substrates[key];
            const count = products.filter(p => p.substrate === key).length;
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <Link href={`/products/${key}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm hover:shadow-xl transition-all">
                    {/* Colored header area */}
                    <div className="relative h-36 overflow-hidden" style={{ background: `linear-gradient(135deg, ${info.color}20, ${info.color}08)` }}>
                      {/* Animated paint effect */}
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                        className="absolute bottom-0 left-0 right-0 h-1/2"
                        style={{ background: `linear-gradient(180deg, transparent, ${info.color}12)` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{info.icon}</span>
                      </div>
                      {/* Shine */}
                      <div className="absolute inset-y-0 -left-full w-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[16px] font-bold text-stone-800 group-hover:text-amber-700 transition-colors"
                          style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                          {info.label}
                        </h3>
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold" style={{ background: `${info.color}12`, color: info.color }}>
                          {count} products
                        </span>
                      </div>
                      <p className="text-[12px] text-stone-500 leading-relaxed line-clamp-2 mb-4">{info.description}</p>
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: info.color }}>
                        Explore Collection
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background with paint-themed gradient */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)" }} />
          {/* Color accents */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            {["#d97706", "#16a34a", "#0891b2", "#7c3aed", "#dc2626"].map((c, i) => (
              <div key={i} className="flex-1 h-full" style={{ background: c }} />
            ))}
          </div>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative p-8 sm:p-12 text-center">
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 mb-5">
              <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Need the Perfect Coating Solution?
            </h2>
            <p className="text-[14px] text-stone-400 max-w-lg mx-auto mb-8">
              Our technical experts will recommend the ideal chemistry, finish, and application method for your specific substrate and performance requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact-us"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                  Contact Our Experts
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
              <Link href="/visualizer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 font-bold text-sm text-white hover:bg-white/20 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.88V15.12a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                Try Color Visualizer
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
