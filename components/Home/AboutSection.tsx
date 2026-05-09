"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STRENGTHS = [
  {
    icon: "⚡",
    title: "Superfast Response",
    description: "Quick turnaround on enquiries and orders with dedicated support teams.",
  },
  {
    icon: "🎯",
    title: "Customized Products",
    description: "Tailored coating solutions designed to meet your exact specifications.",
  },
  {
    icon: "🤝",
    title: "Dedicated Sales Team",
    description: "Expert representatives who understand your industry and requirements.",
  },
  {
    icon: "🔬",
    title: "Strong R&D",
    description: "Continuous innovation backed by rigorous research and development.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const strengthsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (strengthsRef.current) {
        gsap.fromTo(
          strengthsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: strengthsRef.current,
              start: "top 85%",
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
      id="about-section"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #faf7f2 0%, #f5ede0 100%)" }}
    >
      {/* Background decorations */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-stone-200/50 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="about-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#78716c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5">
              About KMOPL
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.2rem)] font-black text-stone-900 leading-tight mb-6"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.03em" }}
            >
              Specialty Coatings for
              <br />
              <span className="text-amber-500">Every Industry</span>
            </h2>
            <p
              className="text-stone-600 text-[15px] leading-relaxed mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Krishna Murari Organosys Pvt. Ltd. (KMOPL) is a leading manufacturer of specialty coatings
              and industrial chemicals based in Noida, U.P. Since 1998, we have been delivering
              high-performance coating solutions to the automotive, consumer goods, home furnishing,
              and general industry sectors.
            </p>
            <p
              className="text-stone-500 text-[14px] leading-relaxed mb-8"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Our comprehensive product range includes primers, putty, base coats, and top coats
              available in pearl, metallic, opaque, and clear finishes — serving substrates from
              sheet metal and glass to wood and plastics.
            </p>

            
          </motion.div>

          {/* Right: Strengths grid */}
          <div ref={strengthsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STRENGTHS.map((strength, i) => (
              <motion.div
                key={strength.title}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm opacity-0"
              >
                <span className="text-2xl mb-3 block">{strength.icon}</span>
                <h3
                  className="text-[15px] font-bold text-stone-800 mb-2"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {strength.title}
                </h3>
                <p className="text-[13px] text-stone-500 leading-relaxed">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
