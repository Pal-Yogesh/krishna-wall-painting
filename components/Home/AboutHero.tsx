"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const IMG = {
  hero: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  portrait: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
};

const STATS = [
  { value: "25+", label: "Years of Excellence", color: "#d97706" },
  { value: "36+", label: "Coating Products", color: "#16a34a" },
  { value: "500+", label: "Happy Clients", color: "#0891b2" },
  { value: "4", label: "Manufacturing Units", color: "#7c3aed" },
];

const CLIENT_LOGOS = Array.from({ length: 13 }, (_, i) => `/client-logos/client-logo-${String(i + 1).padStart(2, "0")}.jpg`);

export default function AboutHero() {
  const doubledLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 z-20" style={{ background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, #fff8ee 0%, #fefdfb 45%, #faf9f7 100%)" }} />
        {/* dotted texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs>
            <pattern id="ah-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#78716c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ah-dots)" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-amber-200/50">
                About Our Company
              </span>
              <h1 className="text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold text-stone-900 leading-[1.08]"
                style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.04em" }}>
                Coatings that work
                <br />
                for your <span className="text-amber-500">business</span>
              </h1>
              <p className="mt-5 text-[16px] text-stone-500 max-w-md leading-relaxed">
                From a chemical trading firm in 1998 to a diversified coatings powerhouse — we engineer durable, high-performance finishes for wood, metal, and glass that industries across India rely on.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-lg shadow-amber-200 hover:shadow-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", fontFamily: "var(--font-raleway), sans-serif" }}>
                  Explore Products
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/contact-us"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-stone-800 font-bold text-sm bg-white border border-stone-200 hover:border-amber-300 transition-all">
                  Contact Us
                </Link>
              </div>
            </motion.div>

            {/* Right: image with blob */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="relative">
              <div aria-hidden className="absolute -top-6 -right-4 w-28 h-28 rounded-full" style={{ background: "#f59e0b", opacity: 0.18 }} />
              <div aria-hidden className="absolute -bottom-6 -left-6 w-36 h-36 rounded-[2.5rem]" style={{ background: "#16a34a", opacity: 0.12 }} />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.hero} alt="KMOPL team at work" className="w-full h-full object-cover" />
              </div>
              {/* Floating since-badge */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 right-6 bg-white rounded-2xl shadow-xl border border-stone-100 px-5 py-3">
                <p className="text-2xl font-bold text-amber-500 leading-none" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>1998</p>
                <p className="text-[11px] text-stone-400 font-semibold mt-1">Trusted since</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
                <div className="w-3 h-12 rounded-full shrink-0" style={{ background: s.color }} />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums leading-none" style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
                    {s.value}
                  </p>
                  <p className="text-[12px] text-stone-400 font-medium mt-1.5">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PEOPLE / QUALITY FIRST ═══════════════ */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
              We Believe Great Products
              <br />
              Always Put <span className="text-amber-500">Quality First</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Portrait with colorful blobs */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative flex justify-center">
              <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-0 w-72 h-56 rounded-[3rem]" style={{ background: "#f9a8c4", opacity: 0.5 }} />
              <div aria-hidden className="absolute left-8 top-6 w-20 h-20 rounded-full" style={{ background: "#c4b5fd", opacity: 0.6 }} />
              <div aria-hidden className="absolute right-10 bottom-6 w-16 h-16 rounded-full" style={{ background: "#fcd34d", opacity: 0.7 }} />
              <div className="relative w-64 h-72 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.portrait} alt="Quality at KMOPL" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Quote card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative bg-white border border-stone-200/80 rounded-3xl p-8 shadow-sm">
              <div className="absolute top-0 left-8 w-12 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #f59e0b, #d97706)" }} />
              <h3 className="text-xl font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                Our Standards Prove Themselves in Every Finish
              </h3>
              <p className="text-[14.5px] text-stone-500 leading-relaxed">
                Every batch we ship is built on premium raw materials, rigorous testing, and decades of formulation expertise. We don't just meet specifications — we set them, so your products perform exactly as promised, every single time.
              </p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-stone-100">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                  K
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">KMOPL Quality Team</p>
                  <p className="text-xs text-stone-400">Research &amp; Development</p>
                </div>
                <svg className="w-9 h-9 text-amber-200 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUSTED BRANDS ═══════════════ */}
      <section className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, #fcfaf6 0%, #fefdfb 50%, #fcfaf6 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}>
            Brands &amp; Partnerships
          </span>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
            We&apos;re happy to work with <span className="text-amber-500">leading brands</span>
          </h2>
        </div>

        {/* Logo marquee */}
        <div className="relative overflow-hidden py-2">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #fcfaf6, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #fcfaf6, transparent)" }} />
          <motion.div
            animate={{ x: [0, -(CLIENT_LOGOS.length * 180)] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-6 w-max px-6"
          >
            {doubledLogos.map((src, i) => (
              <div key={i} className="shrink-0 w-40 h-32 bg-white border border-stone-200/80 rounded-2xl shadow-sm flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Client logo" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
