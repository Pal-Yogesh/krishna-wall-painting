"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SEGMENTS = [
  {
    icon: "�️",
    title: "Metal Coating",
    description:
      "Anti-corrosion primers, base coats, and top coats for sheet metal, aluminium, brass, and copper substrates.",
    clients: [
      "Automotive Parts",
      "Industrial Equipment",
      "Consumer Appliances",
    ],
    color: "#d97706",
    bg: "bg-amber-50",
    border: "border-amber-200",
    href: "/products/metal",
  },
  {
    icon: "🪵",
    title: "Wood Coating",
    description:
      "Protective and decorative finishes for furniture, handicrafts, and wooden surfaces with UV-cured and PU chemistries.",
    clients: ["Furniture Exporters", "IKEA", "Handicraft Industry"],
    color: "#16a34a",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    href: "/products/wood",
  },
  {
    icon: "�",
    title: "Glass Coating",
    description:
      "Speciality coatings for glass articles, decorative glassware, and architectural glass with superior adhesion and clarity.",
    clients: ["Glass Articles", "Decorative Ware", "Lighting Industry"],
    color: "#0891b2",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    href: "/products/glass",
  },
];

export default function MarketSegments() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="market-segments"
      className="relative py-14 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fdfbf7 0%, #fefdfb 50%, #fdfbf7 100%)",
      }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-100/30 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern
              id="seg-dots"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#78716c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#seg-dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5">
            Industries We Serve
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-stone-900 leading-tight"
            style={{
              fontFamily: "var(--font-raleway), sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Market Segments &
            <br />
            <span className="text-amber-500">Applications</span>
          </h2>
          <p
            className="mt-4 text-stone-500 text-[15px] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            From automotive to solar energy, our coatings serve diverse
            industries with precision-engineered solutions.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SEGMENTS.map((segment) => (
            <Link
              key={segment.title}
              href={segment.href}
              className="block opacity-0 group"
            >
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 48px rgba(0,0,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative p-6 bg-white border border-stone-200 rounded-2xl shadow-sm cursor-pointer h-full`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${segment.bg} ${segment.border} border flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {segment.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-[16px] font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {segment.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-stone-500 leading-relaxed mb-4">
                  {segment.description}
                </p>

                {/* Client tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {segment.clients.map((client) => (
                    <span
                      key={client}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg"
                      style={{
                        background: `${segment.color}10`,
                        color: segment.color,
                        border: `1px solid ${segment.color}25`,
                      }}
                    >
                      {client}
                    </span>
                  ))}
                </div>

                {/* View Products link indicator */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                  View Products
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                {/* Accent bar on hover */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, ${segment.color}, transparent)`,
                  }}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
