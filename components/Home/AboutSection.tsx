"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const WHY_KMOPL = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
    color: "#f97316",
    bg: "#fff7ed",
    title: "Advanced R&D",
    desc: "Continuous innovation and development to deliver high-performance coatings.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    color: "#8b5cf6",
    bg: "#f5f3ff",
    title: "Customized Solutions",
    desc: "Tailor-made coating systems designed to meet your exact requirements.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "#10b981",
    bg: "#ecfdf5",
    title: "Cost-Effective Solutions",
    desc: "High-performance coatings that optimize material usage, reduce application costs, and deliver long-term value.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    ),
    color: "#0891b2",
    bg: "#ecfeff",
    title: "25+ Years of Manufacturing",
    desc: "Decades of expertise in speciality coatings with proven industry experience.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "ISO Certified Quality",
    desc: "Manufactured under strict quality standards to ensure consistent performance.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    ),
    color: "#16a34a",
    bg: "#f0fdf4",
    title: "Pan India Supply",
    desc: "Reliable supply chain and on-time delivery across India.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "#ec4899",
    bg: "#fdf2f8",
    title: "Technical Support",
    desc: "Expert technical team providing end-to-end application support.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    color: "#14b8a6",
    bg: "#f0fdfa",
    title: "Sustainability",
    desc: "Environment-friendly formulations that ensure safety and a greener future.",
  },
];

const STATS = [
  { value: "25+", label: "Years of Experience", icon: "🏭" },
  { value: "500+", label: "Industrial Customers", icon: "👥" },
  { value: "15+", label: "Product Categories", icon: "📦" },
  { value: "9+", label: "Chemistry Platforms", icon: "⚗️" },
];

const BOTTOM_BADGES = [
  {
    label: "Premium Quality",
    sub: "Raw Materials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: "State-of-the-art",
    sub: "R&D Laboratory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    label: "Advanced",
    sub: "Manufacturing Facility",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Strict Quality",
    sub: "Control",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
  },
  {
    label: "Environment",
    sub: "Conscious",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const ACCENT_SWATCHES = [
  "#C1623F",
  "#E8A87C",
  "#D4A017",
  "#8FAF7E",
  "#7BB8D4",
  "#5C3A5E",
  "#D4898A",
  "#2C3E6B",
  "#6D9E8C",
  "#B8956A",
  "#355E3B",
  "#4A4A4A",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative overflow-hidden bg-[url('/new-images-update/bg.png')] bg-cover bg-center h-full pt-14 w-full"
    >
      {/* Main content grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Hero headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1
                className="text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold text-stone-900 leading-[1.1] mb-3"
                style={{
                  fontFamily: "var(--font-raleway), sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                Advanced Coating <br /> Solutions for
              </h1>
              <h2 className="text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.1] text-orange-500">
                Wood, Metal &amp; Glass
              </h2>
            </motion.div>

            <div className="flex h-1.5 w-[25%] overflow-hidden">
              {ACCENT_SWATCHES.map((color, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all duration-300 hover:flex-[2]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-stone-600 text-[15px] leading-relaxed my-6 max-w-xl"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Since 1998, Krishna Murari Organosys Pvt. Ltd. (KMOPL) has been a
              trusted manufacturer of high-performance{" "}
              <span className="text-orange-500 font-semibold">
                speciality coatings{" "}
              </span>
              delivering innovative and customized solutions for diverse
              industrial applications across India.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-8"
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 p-4 bg-stone-50 border border-stone-200 rounded-2xl text-center"
                >
                  <span className="text-2xl">{stat.icon}</span>
                  <span
                    className="text-4xl font-extrabold text-stone-900 leading-none"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[16px] font-bold uppercase  text-stone-600 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[14px] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ef4444)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download Product Catalogue
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[14px] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #1c1917, #292524)",
                }}
              >
                Request Technical Consultation
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Why Choose KMOPL ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className=""
          >
            <div className="bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden">
              {/* Header — white bg, bold title, orange underline */}
              <div className="px-6 py-2 text-center ">
                <h3
                  className="text-[20px] font-extrabold uppercase  text-stone-900"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  WHY CHOOSE KMOPL?
                </h3>
                <div className="mx-auto mt-1 w-16 h-[3px] rounded-full bg-orange-500" />
              </div>

              {/* List */}
              <div className="divide-y divide-stone-200">
                {WHY_KMOPL.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-start gap-4 px-5 py-2.5 hover:bg-stone-50 transition-colors"
                  >
                    {/* Large round icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: item.bg, border: `1.5px solid ${item.color}25`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        className="text-[14px] font-extrabold text-stone-900 "
                        style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                      >
                        {item.title}
                      </p>
                      <p className="text-[13px] text-stone-500 ">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM BADGE STRIP ── */}
        <div  className="py-4 bg-[#011B42]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-y-3">
            {BOTTOM_BADGES.map((badge, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <span className="text-white">{badge.icon}</span>
                <div>
                  <p className="text-[12px] font-bold text-white leading-none">
                    {badge.label}
                  </p>
                  <p className="text-[11px] text-white mt-0.5">
                    {badge.sub}
                  </p>
                </div>
                {i < BOTTOM_BADGES.length - 1 && (
                  <span className="hidden sm:block w-px h-8 bg-white ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
