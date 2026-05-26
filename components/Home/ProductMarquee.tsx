"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products, substrates } from "@/data/products";

export default function ProductMarquee() {
  // Duplicate for seamless loop
  const items = [...products, ...products];

  return (
    <section className="relative py-12 overflow-hidden bg-stone-50 border-t border-stone-200/60">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Our Coating Solutions
            </h3>
            <p className="text-[13px] text-stone-400 mt-0.5">Scroll through our product range</p>
          </div>
          <Link href="/products"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 text-[13px] font-semibold text-stone-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-all">
            View All
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-stone-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-stone-50 to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {items.map((product, i) => {
            const info = substrates[product.substrate];
            return (
              <Link key={`${product.id}-${i}`} href={`/products/${product.substrate}/${product.id}`}
                className="block group shrink-0 w-[260px]">
                <div className="relative overflow-hidden bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-lg hover:border-amber-200 transition-all h-full">
                  {/* Top accent */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}40)` }} />
                  {/* Visual */}
                  <div className="relative h-20 overflow-hidden" style={{ background: `linear-gradient(135deg, ${info.color}10, transparent)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl opacity-40 group-hover:scale-110 transition-transform">{product.icon}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: info.color }} />
                      <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: info.color }}>{product.chemistry}</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug line-clamp-1"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">{product.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
