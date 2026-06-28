"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const PRODUCTS = [
  {
    image: "/our-product/1.jpeg",
    title: "Strong Foundation",
    description: "We founded M/s Krishna Acid and Chemicals, our journey began with a strong foundation on trading industrial chemicals, primarily serving the automotive sector.",
    color: "#16a34a",
  },
  {
    image: "/our-product/2.jpeg",
    title: "Expansion",
    description: "We launched Krishna Organics, marking our entry into manufacturing. This expansion allowed us to produce industrial resins, solvents, and engage in petrochemical distillation.",
    color: "#0891b2",
  },
  {
    image: "/our-product/3.jpeg",
    title: "Adaptability",
    description: "Our sample production capacity allows us to support our clients effectively while remaining agile.",
    color: "#d97706",
  },
  {
    image: "/our-product/4.jpeg",
    title: "Sustainability",
    description: "Our unwavering focus on innovation and sustainability drives our continuous expansion and enhancement of services.",
    color: "#7c3aed",
  }, 
  {
    image: "/our-product/5.jpeg",
    title: "Eco Friendly",
    description: "Designed to protect materials while minimizing environmental and health impacts.",
    color: "#7c3aed",
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-14 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fefdfb 0%, #fcfaf6 100%)" }}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5">
            Our Products
          </span>
          <h2
            className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-stone-900 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}
          >
            Products available for a variety of substrates including{" "}
            <span className="text-amber-500">metal, glass</span> and{" "}
            <span className="text-amber-500">wood</span>
          </h2>
        </motion.div>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
            >
              <Link href="/products" className="block group h-full">
                <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl transition-all h-full bg-white">
                  {/* Image */}
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    {/* Color accent */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${product.color}, ${product.color}50)` }} />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className="text-lg sm:text-xl font-extrabold text-white mb-1.5 drop-shadow-md uppercase tracking-wide"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-[13px] text-white/85 leading-relaxed font-medium line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
