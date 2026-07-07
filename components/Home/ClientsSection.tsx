"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const CLIENT_LOGOS = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `/client-logos/client-logo-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Client ${i + 1}`,
}));

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Double for seamless loop
  const doubledLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative py-14 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fcfaf6 0%, #fefdfb 50%, #fcfaf6 100%)" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl" />
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

      {/* Single row marquee with logos */}
      <div className="relative overflow-visible py-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #fdfbf7, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #fdfbf7, transparent)" }} />

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: [0, -(CLIENT_LOGOS.length * 180)] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 w-max px-8 py-4"
          >
          {doubledLogos.map((logo, i) => (
            <motion.div
              key={`logo-${i}`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="shrink-0 w-52  h-36 px-4  bg-white border  border-stone-200/80 rounded-xl shadow-sm flex items-center justify-center hover:shadow-md hover:border-amber-200 cursor-pointer"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`object-cover ${logo.src.includes("client-logo-01") ? "w-20 h-20" : "w-full h-full"}`}
              />
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
