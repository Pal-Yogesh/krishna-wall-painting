"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Krishna Murari Organosys has been a dependable partner for our coating requirements. Their products consistently meet our quality expectations, and their technical support has helped us achieve excellent finish and durability.",
    name: "Operations Head",
    company: "Furniture Manufacturing Unit",
    initial: "O",
    color: "#d97706",
  },
  {
    quote:
      "What sets KMOPL apart is their responsiveness and commitment to customer satisfaction. From product selection to after-sales support, their team is always proactive and professional.",
    name: "Procurement Manager",
    company: "Industrial Components Ltd.",
    initial: "P",
    color: "#16a34a",
  },
  {
    quote:
      "We have been associated with Krishna Murari Organosys for several years. Their consistent product quality, timely deliveries, and technical expertise make them one of our most trusted suppliers.",
    name: "Supply Chain Director",
    company: "Home Furnishing Exporter",
    initial: "S",
    color: "#0891b2",
  },
  {
    quote:
      "The performance of KMOPL's primers, base coats, and top coats has been consistently impressive. Their products deliver excellent adhesion, finish, and long-term durability.",
    name: "Quality Assurance Head",
    company: "Automotive Components Co.",
    initial: "Q",
    color: "#7c3aed",
  },
];

const AUTO_ADVANCE_MS = 5000;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active]);

  const t = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="relative py-10 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fcfaf6 0%, #fefdfb 50%, #fcfaf6 100%)" }}
    >
      {/* Subtle background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #fed7aa 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}>
            Client Testimonials
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}
          >
            Trusted by Industries <span className="text-orange-500">Across India</span>
          </h2>
        </motion.div>

        {/* Main testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

              {/* Left accent panel */}
              <div
                className="relative flex flex-col items-center justify-center px-10 py-12 lg:py-16"
                style={{ background: `linear-gradient(145deg, ${t.color}15, ${t.color}08)` }}
              >
                {/* Top color bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}60)` }} />

                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-4"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}
                >
                  {t.initial}
                </div>

                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active + "-name"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="font-bold text-stone-900 text-[15px]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                        {t.name}
                      </p>
                      <p className="text-[12px] text-stone-400 mt-1">{t.company}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill={t.color} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Right: quote */}
              <div className="flex flex-col justify-between px-8 sm:px-12 py-10 lg:py-14">
                {/* Big quote icon */}
                <svg className="w-10 h-10 mb-5" style={{ color: t.color, opacity: 0.2 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="text-stone-600 text-[16px] sm:text-[17px] leading-[1.85] flex-1"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    "{t.quote}"
                  </motion.p>
                </AnimatePresence>

                {/* Nav controls */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
                  {/* Dot indicators */}
                  <div className="flex items-center gap-2">
                    {TESTIMONIALS.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="transition-all duration-300"
                        aria-label={`Go to testimonial ${i + 1}`}
                      >
                        <div
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === active ? "24px" : "8px",
                            height: "8px",
                            background: i === active ? item.color : "#e7e5e4",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Prev / Next */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-500 transition-all hover:border-stone-300"
                      aria-label="Previous"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-xl border text-white flex items-center justify-center transition-all hover:brightness-110"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`, borderColor: t.color }}
                      aria-label="Next"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        

      </div>
    </section>
  );
}
