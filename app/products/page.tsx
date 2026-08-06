"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ACCENT = "#C05A28";
const NAVY = "#0B1D36";

const CATEGORIES = [
  {
    key: "wood",
    title: "Wood Coatings",
    description:
      "High-performance coatings for furniture, interiors, and industrial wood applications.",
    href: "/products/wood",
    image: "/paint-images/images/2.jpg",
    color: "#C05A28",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V10M12 10c-2.5-1.5-4-4-4-7 0 0 2.5 1 4 3 1.5-2 4-3 4-3 0 3-1.5 5.5-4 7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14c-2 1-3.5 3-3.5 5.5M16 14c2 1 3.5 3 3.5 5.5" />
      </svg>
    ),
  },
  {
    key: "metal",
    title: "Metal Coatings",
    description:
      "Protective and decorative coatings for industrial and automotive metal surfaces.",
    href: "/products/metal",
    image: "/paint-images/images/6.jpg",
    color: "#0B1D36",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M8 20V8l4-5 4 5v12M8 12h8" />
      </svg>
    ),
  },
  {
    key: "glass",
    title: "Glass Coatings",
    description:
      "Specialised coatings for glass substrates offering clarity, colour, and durability.",
    href: "/products/glass",
    image: "/new/glass-product.jpeg",
    color: "#0d9488",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="4" width="7" height="16" rx="1" />
        <rect x="14" y="4" width="7" height="16" rx="1" />
        <path strokeLinecap="round" d="M6.5 4v16M17.5 4v16" />
      </svg>
    ),
  },
  {
    key: "dyestuff",
    title: "Dyestuff Solutions",
    description:
      "Industrial dyes and colourants engineered for consistent, vibrant results.",
    href: "/contact-us",
    image: "/paint-images/images/4.jpg",
    color: "#3b82f6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5c0 0-6 7.2-6 11.2a6 6 0 0012 0C18 9.7 12 2.5 12 2.5z" />
      </svg>
    ),
  },
  {
    key: "auxiliaries",
    title: "Wood Auxiliaries",
    description:
      "Complementary products that enhance coating performance and application.",
    href: "/contact-us",
    image: "/paint-images/images/5.jpg",
    color: "#92400e",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v3H9zM8 6h8l-1 14H9L8 6z" />
        <path strokeLinecap="round" d="M10 10h4M10 14h4" />
      </svg>
    ),
  },
];

const TRUST_ITEMS = [
  {
    label: "25+ Years of Expertise",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-3.5 2 1-4L6.5 10l4.1-.3L12 6l1.4 3.7 4.1.3-3 2.9 1 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8M9 17.5V20M15 17.5V20" />
      </svg>
    ),
  },
  {
    label: "500+ Industrial Customers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="3.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a3.5 3.5 0 00-2.5-3.35M16.5 3.7a3.5 3.5 0 010 6.6" />
      </svg>
    ),
  },
  {
    label: "In-house R&D Laboratory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v7.5L4.5 19a2 2 0 001.7 3h11.6a2 2 0 001.7-3L14.5 10.5V3" />
        <path strokeLinecap="round" d="M8 3h8M8.5 14h7" />
      </svg>
    ),
  },
  {
    label: "Consistent Quality Assured",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5.5c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function ArrowIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section
        className="relative h-[300px] sm:h-[380px] lg:h-[440px] overflow-hidden bg-no-repeat"
        style={{
          backgroundImage: "url('/paint-images/images/banner.jpg')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
        aria-label="Our Product Portfolio"
      >
        {/* Soft left overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,12,8,0.78) 0%, rgba(20,12,8,0.5) 28%, rgba(20,12,8,0.18) 48%, transparent 68%)",
          }}
        />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[420px]"
          >
            <p
              className="text-[11px] sm:text-xl font-bold uppercase tracking-[0.22em] mb-3"
              style={{ color: ACCENT, fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Coating Solutions
            </p>
            <h1
              className="text-[clamp(1.9rem,4.2vw,2.9rem)] font-bold text-white leading-[1.1] mb-3"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Our Product Portfolio
            </h1>
            <div className="w-12 h-1 mb-4" style={{ background: ACCENT }} />
            <p className="text-[13px] sm:text-[18px] text-white/90 leading-relaxed max-w-xs">
              Explore our range of high-performance coating solutions engineered
              for diverse industrial applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ PRODUCT CATEGORIES ═══ */}
      <section className="bg-[#f7f8fa] py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-0.5 w-8 sm:w-10 rounded-full" style={{ background: ACCENT }} />
              <h2
                className="text-xl sm:text-3xl lg:text-[1.75rem] font-bold"
                style={{ color: NAVY, fontFamily: "var(--font-raleway), sans-serif" }}
              >
                Our Product Categories
              </h2>
              <span className="h-0.5 w-8 sm:w-10 rounded-full" style={{ background: ACCENT }} />
            </div>
            <p className="text-[13px] sm:text-xl text-stone-500 max-w-lg mx-auto">
              Explore our complete range of high-performance coating solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={cat.href}
                  className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(11,29,54,0.06)] hover:shadow-[0_10px_32px_rgba(11,29,54,0.12)] transition-shadow duration-300"
                >
                  <div className="relative h-40 sm:h-36 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  </div>

                  <div className="relative flex flex-col flex-1 px-4 pb-5 pt-7">
                    <div
                      className="absolute -top-8 left-4 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md"
                      style={{ background: cat.color }}
                    >
                      {cat.icon}
                    </div>

                    <h3
                      className="text-[15px] sm:text-xl font-bold my-2"
                      style={{ color: NAVY, fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-[12px] sm:text-sm text-stone-500 leading-relaxed mb-4 flex-1">
                      {cat.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-[14px] font-bold group-hover:gap-2.5 transition-all"
                      style={{ color: cat.color }}
                    >
                      Explore
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECHNICAL ASSISTANCE ═══ */}
      <section className="bg-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#f0f1f3] rounded-2xl px-5 py-6 sm:px-7 sm:py-7 flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-6"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ background: NAVY }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke={ACCENT} strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0115 0v5.25a1.5 1.5 0 01-1.5 1.5h-1.5V12a4.5 4.5 0 10-9 0v6.75H6a1.5 1.5 0 01-1.5-1.5V12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75a2.25 2.25 0 002.25-2.25H9.75A2.25 2.25 0 0012 21.75z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className="text-base sm:text-2xl font-bold mb-1"
                style={{ color: NAVY, fontFamily: "var(--font-raleway), sans-serif" }}
              >
                Need Technical Assistance?
              </h3>
              <p className="text-[13px] sm:text-lg text-stone-500 leading-relaxed max-w-xl">
                Our technical team is ready to help you select the ideal coating
                solution for your application.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 w-full lg:w-auto">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[12px] sm:text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Talk to Our Technical Team
                <ArrowIcon />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[12px] sm:text-[13px] font-semibold text-stone-700 bg-white border border-stone-300 hover:border-stone-400 transition-colors"
              >
                Request a Sample
                <ArrowIcon />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[12px] sm:text-[13px] font-semibold text-stone-700 bg-white border border-stone-300 hover:border-stone-400 transition-colors"
              >
                Contact Us
                <ArrowIcon />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 py-6 sm:py-7 px-4"
              >
                <span className="text-white/90 shrink-0">{item.icon}</span>
                <span
                  className="text-[13px] sm:text-sm font-medium text-white whitespace-nowrap"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
