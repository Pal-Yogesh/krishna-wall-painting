"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CLIENTS = [
  "Delphi Automotives",
  "Hero",
  "Yamaha",
  "New Holland Tractors",
  "IKEA",
  "Adani",
  "Tata Solar",
  "Maruti Suzuki",
  "Havells",
  "Crompton",
  "Bajaj",
  "Godrej",
  "LG",
  "Whirlpool",
  "Orient",
  "Polycab",
  "Luminous",
];

// Colors for client badges
const BADGE_COLORS = [
  "#d97706", "#0891b2", "#16a34a", "#7c3aed", "#be185d",
  "#ea580c", "#0284c7", "#b45309", "#059669", "#6d28d9",
  "#dc2626", "#0d9488", "#ca8a04", "#4f46e5", "#c026d3",
  "#2563eb", "#65a30d",
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Double the clients for seamless loop
  const doubledClients = [...CLIENTS, ...CLIENTS];

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative py-5 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fcfaf6 0%, #fefdfb 50%, #fcfaf6 100%)" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-stone-200/40 blur-3xl" />
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
            Trusted Partners
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}
          >
            Clients Who Trust
            <br />
            <span className="text-amber-500">Our Expertise</span>
          </h2>
          <p
            className="mt-4 text-stone-500 text-[15px] max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Serving industry leaders across automotive, consumer goods, solar energy, and more.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative overflow-hidden mb-4">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fdfbf7, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fdfbf7, transparent)" }}
        />

        <motion.div
          animate={{ x: [0, -(CLIENTS.length * 200)] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {doubledClients.map((client, i) => (
            <div
              key={`row1-${i}`}
              className="shrink-0 flex items-center gap-3 px-6 py-3.5 bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: BADGE_COLORS[i % BADGE_COLORS.length] }}
              >
                {client[0]}
              </div>
              <span
                className="text-[13px] font-semibold text-stone-700 whitespace-nowrap"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 - Right to Left */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fdfbf7, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fdfbf7, transparent)" }}
        />

        <motion.div
          animate={{ x: [-(CLIENTS.length * 200), 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {[...doubledClients].reverse().map((client, i) => (
            <div
              key={`row2-${i}`}
              className="shrink-0 flex items-center gap-3 px-6 py-3.5 bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: BADGE_COLORS[(BADGE_COLORS.length - 1 - i) % BADGE_COLORS.length] }}
              >
                {client[0]}
              </div>
              <span
                className="text-[13px] font-semibold text-stone-700 whitespace-nowrap"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
