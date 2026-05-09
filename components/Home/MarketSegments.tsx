"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SEGMENTS = [
  {
    icon: "🚗",
    title: "Automotive Components",
    description: "High-performance coatings for two-wheelers, tractors, and automotive parts.",
    clients: ["Hero", "Yamaha", "New Holland Tractors"],
    color: "#d97706",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    icon: "🔌",
    title: "Consumer Goods",
    description: "Durable finishes for electrical appliances, fans, LEDs, and household products.",
    clients: ["Havells", "Crompton", "Bajaj", "Orient"],
    color: "#0891b2",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
  },
  {
    icon: "🪑",
    title: "Home Furnishing & Handicraft",
    description: "Premium coatings for furniture exporters serving U.S. and European markets.",
    clients: ["IKEA", "Furniture Exporters"],
    color: "#16a34a",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    icon: "⚙️",
    title: "General Industry",
    description: "Industrial-grade coatings for agriculture equipment and heavy machinery parts.",
    clients: ["Agriculture Equipment", "Industrial Parts"],
    color: "#7c3aed",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    icon: "💎",
    title: "Specialty Coatings",
    description: "Decorative and protective finishes for jewelry, hardware, and accessories.",
    clients: ["Jewelry", "Hardware", "Accessories"],
    color: "#be185d",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
  {
    icon: "☀️",
    title: "Solar & Electronics",
    description: "High-purity electronic-grade chemicals for solar panels and electronics.",
    clients: ["Adani", "Tata Solar"],
    color: "#ea580c",
    bg: "bg-orange-50",
    border: "border-orange-200",
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
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="market-segments"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f5ede0 0%, #faf7f2 50%, #f5ede0 100%)" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-100/30 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="seg-dots" width="32" height="32" patternUnits="userSpaceOnUse">
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
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5">
            Industries We Serve
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.2rem)] font-black text-stone-900 leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.03em" }}
          >
            Market Segments &
            <br />
            <span className="text-amber-500">Applications</span>
          </h2>
          <p
            className="mt-4 text-stone-500 text-[15px] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            From automotive to solar energy, our coatings serve diverse industries with precision-engineered solutions.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SEGMENTS.map((segment) => (
            <motion.div
              key={segment.title}
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative p-6 bg-white border border-stone-200 rounded-2xl shadow-sm opacity-0 group cursor-default`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${segment.bg} ${segment.border} border flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {segment.icon}
              </div>

              {/* Title */}
              <h3
                className="text-[16px] font-bold text-stone-800 mb-2"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {segment.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-stone-500 leading-relaxed mb-4">
                {segment.description}
              </p>

              {/* Client tags */}
              <div className="flex flex-wrap gap-1.5">
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

              {/* Accent bar on hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, ${segment.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
