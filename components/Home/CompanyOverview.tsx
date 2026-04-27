"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MILESTONES = [
  {
    year: "1998",
    title: "The Beginning",
    subtitle: "M/s Krishna Acid and Chemicals",
    description:
      "Our journey began with a strong focus on trading industrial chemicals, primarily serving the automotive sector. We quickly established relationships with notable clients, including Delphi Automotives, Hero, Yamaha, and New Holland Tractors.",
    icon: "🏭",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    year: "2004",
    title: "Manufacturing Entry",
    subtitle: "Krishna Organics",
    description:
      "We launched Krishna Organics, marking our entry into manufacturing. This expansion allowed us to produce industrial resins, solvents, and engage in petrochemical distillation, significantly diversifying our product offerings.",
    icon: "⚗️",
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    year: "2008",
    title: "Specialty Coatings",
    subtitle: "Krishna Murari Organosys Pvt. Ltd.",
    description:
      "We initiated the production of specialty coatings. Our products catered to esteemed clients such as IKEA and other reputable buying houses, primarily supplying major furniture exporters serving the U.S. and European markets.",
    icon: "🎨",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    year: "2019",
    title: "High-Purity Chemicals",
    subtitle: "Krishna PV Resources Pvt. Ltd.",
    description:
      "We expanded our manufacturing capabilities, focusing on high-purity electronic-grade chemicals. This strategic move allowed us to serve distinguished clients like Adani and Tata Solar, reinforcing our commitment to quality and innovation.",
    icon: "⚡",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
];

const CLIENTS = [
  "Delphi Automotives", "Hero", "Yamaha", "New Holland Tractors",
  "IKEA", "Adani", "Tata Solar",
];

export default function CompanyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true } }
      );
      gsap.fromTo(timelineRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%", once: true } }
      );
      gsap.fromTo(futureRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: futureRef.current, start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #faf7f2 0%, #f5ede0 50%, #faf7f2 100%)" }}
    >
      {/* Decorative background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-stone-200/60 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="co-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#78716c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#co-dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            Our Journey
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-stone-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Company Overview
            <br />
            <span className="text-amber-500">&amp; Milestones</span>
          </h2>
          <p className="mt-4 text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 1998 as M/s Krishna Acid and Chemicals, we have grown from a chemical trading firm
            into a diversified manufacturing powerhouse serving global markets.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-stone-200 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={m.year} className={`relative flex flex-col sm:flex-row items-start gap-6 ${!isLeft ? "sm:flex-row-reverse" : ""}`}>
                  {/* Timeline dot (desktop) */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${m.color} flex items-center justify-center text-xl text-white shadow-lg`}>
                      {m.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`w-full sm:w-[calc(50%-40px)] ${isLeft ? "sm:pr-4" : "sm:pl-4"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`${m.bg} border ${m.border} rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-shadow`}
                    >
                      {/* Mobile icon + year */}
                      <div className="flex items-center gap-3 mb-3 sm:hidden">
                        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${m.color} flex items-center justify-center text-lg text-white shadow-md`}>
                          {m.icon}
                        </div>
                        <span className="text-2xl font-black text-stone-800" style={{ fontFamily: "'Georgia', serif" }}>{m.year}</span>
                      </div>

                      {/* Desktop year */}
                      <span className="hidden sm:block text-3xl font-black text-stone-800 mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                        {m.year}
                      </span>

                      <h3 className="text-lg font-bold text-stone-800">{m.title}</h3>
                      <p className="text-sm font-semibold text-amber-600 mt-0.5">{m.subtitle}</p>
                      <p className="text-sm text-stone-600 leading-relaxed mt-3">{m.description}</p>
                    </motion.div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden sm:block w-[calc(50%-40px)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Trusted Clients */}
        <div className="mt-16 text-center">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-6">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CLIENTS.map((client) => (
              <motion.span
                key={client}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-default"
              >
                {client}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div ref={futureRef} className="mt-20 opacity-0">
          <div className="relative bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-100/40 blur-3xl -translate-y-12 translate-x-12" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-white shadow-md"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                >
                  🚀
                </div>
                <h3 className="text-xl font-bold text-stone-800" style={{ fontFamily: "'Georgia', serif" }}>
                  A Futuristic Approach to Market Needs
                </h3>
              </div>
              <p className="text-stone-600 leading-relaxed max-w-3xl">
                As we look to the future, we are well-equipped to meet the growing demands of our dynamic economy.
                Our ample production capacity allows us to support our clients effectively while remaining agile to
                adapt to market changes. Our unwavering focus on innovation and sustainability drives our continuous
                expansion and enhancement of services.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: "💡", label: "Innovation Driven" },
                  { icon: "🌱", label: "Sustainability Focus" },
                  { icon: "🏗️", label: "Ample Capacity" },
                  { icon: "🤝", label: "Client Agility" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 p-3 bg-stone-50 border border-stone-100 rounded-xl">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-semibold text-stone-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
