"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SUBSTRATES = [
  {
    key: "wood",
    label: "Wood Coating",
    description: "From raw timber to premium finished furniture",
    color: "#16a34a",
    before: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0001.jpg",
    after: "/coating/wood-coating.jpeg",
    features: ["UV Protection", "Scratch Resistant", "Grain Enhancement", "Long-lasting Finish"],
  },
  {
    key: "metal",
    label: "Metal Coating",
    description: "From bare metal to corrosion-protected surfaces",
    color: "#d97706",
    before: "/our-product/3.jpeg",
    after: "/coating/metal-coating.jpeg",
    features: ["Anti-Corrosion", "Weather Resistant", "High Gloss", "Chemical Protection"],
  },
  {
    key: "glass",
    label: "Glass Coating",
    description: "From plain glass to decorative coated finish",
    color: "#0891b2",
    before: "/our-product/4.jpeg",
    after: "/coating/glass-coating.jpeg",
    features: ["Superior Adhesion", "Optical Clarity", "Decorative Effects", "UV Stable"],
  },
];

function ComparisonSlider({ beforeSrc, afterSrc }: { beforeSrc: string; afterSrc: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { handleMove(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full background) */}
      <img src={afterSrc} alt="After coating" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* Before image (clipped by slider) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img
          src={beforeSrc}
          alt="Before coating"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${containerRef.current ? containerRef.current.offsetWidth : 1000}px`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div className="absolute top-0 bottom-0 w-[3px] bg-white z-10 shadow-xl" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-stone-200">
          <svg className="w-6 h-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[11px] font-bold text-white uppercase tracking-wider z-20">
        Before
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-stone-800 uppercase tracking-wider z-20">
        After
      </div>
    </div>
  );
}

export default function BeforeAfterPage() {
  const [activeSubstrate, setActiveSubstrate] = useState(0);
  const current = SUBSTRATES[activeSubstrate];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(160deg, #fef3c720 0%, #fefdfb 50%, #faf9f7 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 border border-amber-200/50">
              Before & After
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
              See the{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>
                Transformation
              </span>
            </h1>
            <p className="mt-4 text-stone-500 text-[15px] max-w-lg mx-auto leading-relaxed">
              Drag the slider to compare raw surfaces with our premium coating finishes on wood, metal, and glass.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Substrate tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {SUBSTRATES.map((sub, i) => (
            <button
              key={sub.key}
              onClick={() => setActiveSubstrate(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                activeSubstrate === i
                  ? "text-white shadow-lg"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
              style={activeSubstrate === i ? { background: sub.color } : {}}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Comparison slider */}
        <motion.div
          key={current.key}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="relative w-full h-[50vh] sm:h-[55vh] lg:h-[65vh] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/50">
            <ComparisonSlider beforeSrc={current.before} afterSrc={current.after} />
          </div>

          {/* Info bar below slider */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ background: current.color }} />
                <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                  {current.label}
                </h3>
              </div>
              <p className="text-sm text-stone-500">{current.description}</p>
            </div>
            <Link href={`/products/${current.key}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all shrink-0"
              style={{ background: current.color }}>
              View Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {current.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-200/80 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${current.color}15` }}>
                <svg className="w-4 h-4" style={{ color: current.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-stone-700">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* All substrates comparison */}
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-6" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            All Substrate Comparisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SUBSTRATES.map((sub, i) => (
              <motion.div
                key={sub.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="cursor-pointer group"
                onClick={() => { setActiveSubstrate(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all h-48">
                  {/* Split view thumbnail */}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full overflow-hidden">
                      <img src={sub.before} alt="Before" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/2 h-full overflow-hidden">
                      <img src={sub.after} alt="After" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {/* Center divider */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white z-10" />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  {/* Labels */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                    <span className="text-[13px] font-bold text-white drop-shadow-md">{sub.label}</span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold text-white" style={{ background: `${sub.color}cc` }}>
                      Compare →
                    </span>
                  </div>
                  {/* Top labels */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 rounded text-[9px] font-bold text-white uppercase z-20">Before</div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/80 rounded text-[9px] font-bold text-stone-800 uppercase z-20">After</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact-us"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-[14px] shadow-lg shadow-stone-900/15 hover:shadow-xl transition-all"
              style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
              Get a Quote for Your Project
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
