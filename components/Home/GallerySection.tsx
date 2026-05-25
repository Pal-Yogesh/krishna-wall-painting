"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_ITEMS = [
  {
    category: "Manufacturing Plant",
    title: "Production Facility",
    color: "#d97706",
    gradient: "linear-gradient(135deg, #f59e0b20, #d9770640)",
    height: "h-64",
  },
  {
    category: "Product Showcase",
    title: "Specialty Coatings",
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b220, #06748540)",
    height: "h-48",
  },
  {
    category: "Team Events",
    title: "Annual Meet 2024",
    color: "#16a34a",
    gradient: "linear-gradient(135deg, #16a34a20, #15803d40)",
    height: "h-56",
  },
  {
    category: "Manufacturing Plant",
    title: "Quality Lab",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed20, #6d28d940)",
    height: "h-52",
  },
  {
    category: "Product Showcase",
    title: "Metallic Finishes",
    color: "#be185d",
    gradient: "linear-gradient(135deg, #be185d20, #9d174d40)",
    height: "h-60",
  },
  {
    category: "Team Events",
    title: "Training Workshop",
    color: "#ea580c",
    gradient: "linear-gradient(135deg, #ea580c20, #c2410c40)",
    height: "h-44",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
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
      id="gallery"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fefdfb 0%, #fdfbf7 100%)" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="gal-dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#78716c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gal-dots)" />
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
            Gallery
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}
          >
            A Glimpse Into
            <br />
            <span className="text-amber-500">Our World</span>
          </h2>
          <p
            className="mt-4 text-stone-500 text-[15px] max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            From our manufacturing plant to team events and product showcases.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`break-inside-avoid ${item.height} rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg overflow-hidden group cursor-pointer opacity-0 relative`}
              style={{ background: item.gradient }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={item.color} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5zm14.25-14.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5"
                  style={{ color: item.color }}
                >
                  {item.category}
                </span>
                <h4
                  className="text-[14px] font-bold text-stone-800"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {item.title}
                </h4>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${item.color}08` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-white font-bold text-[15px]"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 8px 28px rgba(217,119,6,0.35)",
                fontFamily: "var(--font-raleway), sans-serif",
              }}
            >
              View Full Gallery
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
