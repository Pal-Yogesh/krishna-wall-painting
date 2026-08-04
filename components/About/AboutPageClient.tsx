"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Users,
  FlaskConical,
  CheckCircle2,
  Microscope,
  Palette,
  ShieldCheck,
  Wrench,
  BadgeCheck,
  TrendingUp,
  Heart,
  Lightbulb,
  Award,
  Target,
  Eye,
  Diamond,
  Calendar,
  MapPin,
  Factory,
  Pencil,
  Package,
  Beaker,
} from "lucide-react";

const ACCENT = "#C05A28";
const NAVY = "#0B1D36";

const CLIENT_LOGOS = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `/client-logos/client-logo-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Client ${i + 1}`,
}));

const HERO_STATS = [
  { value: "Since 1998", label: "Established", icon: Calendar },
  { value: "25+ Years", label: "of Experience", icon: Users },
  { value: "500+", label: "Industrial Customers", icon: Factory },
  { value: "Pan India", label: "Presence", icon: MapPin },
];

const TIMELINE = [
  {
    year: "1998",
    title: "Company Established",
    desc: "Laid the foundation with a commitment to quality.",
    icon: Building2,
  },
  {
    year: "2004",
    title: "Manufacturing Expansion",
    desc: "Expanded production capabilities.",
    icon: Wrench,
  },
  {
    year: "2008",
    title: "In-House R&D Laboratory",
    desc: "Invested in research for better solutions.",
    icon: FlaskConical,
  },
  {
    year: "2010",
    title: "Speciality Coatings Launched",
    desc: "Introduced advanced coating technologies.",
    icon: Target,
  },
  {
    year: "2019",
    title: "High Purity Electronic Grade Chemicals",
    desc: "Diversified into high purity chemical solutions.",
    icon: Users,
  },
  {
    year: "2021",
    title: "500+ Industrial Customers",
    desc: "Crossed a major milestone of customer trust.",
    icon: Pencil,
  },
  {
    year: "Future",
    title: "Continuing to Innovate",
    desc: "Next milestone: Global Expansion.",
    icon: TrendingUp,
    accent: true,
  },
];

const EXPERTISE = [
  { title: "R&D &\nFormulation", icon: FlaskConical },
  { title: "Colour\nMatching", icon: Palette },
  { title: "Application\nSolutions", icon: Wrench },
  { title: "Performance\nTesting", icon: Microscope },
  { title: "Quality\nAssurance", icon: ShieldCheck },
];

const HIGHLIGHTS = [
  { value: "20,000+", label: "Sq. Ft. Facility Area", icon: Building2 },
  { value: "6,000+", label: "MT Annual Capacity", icon: Factory },
  { value: "15+", label: "Product Categories", icon: Package },
  { value: "9", label: "Chemistry Platforms", icon: Beaker },
  { value: "500+", label: "Industrial Customers", icon: Users },
  { value: "25+", label: "Years Experience", icon: Award },
];

const STRENGTHS = [
  "Customer-First Approach",
  "In-house R&D and Formulation Expertise",
  "Customized Coating Solutions",
  "Strong Technical & Application Support",
  "Advanced Manufacturing Infrastructure",
  "Consistent Quality & Timely Delivery",
];

const CORE_VALUES = [
  { label: "Collaboration", icon: Users },
  { label: "Ownership", icon: ShieldCheck },
  { label: "Integrity", icon: BadgeCheck },
  { label: "Excellence", icon: Award },
  { label: "Innovation", icon: Lightbulb },
  { label: "Passion", icon: Heart },
];

export default function AboutPageClient() {
  // Double for seamless loop
  const doubledLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="w-full bg-[#f7f8fa] pt-6 sm:pt-10 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: copy + stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-3 text-[#C05A28]"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                About Us
              </p>
              <h1
                className="text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.15] mb-4 text-[#0B1D36]"
                style={{
                  fontFamily: "var(--font-raleway), sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Innovating Coating Solutions Since 1998
              </h1>
              <p className="text-[13px] sm:text-[15px] text-stone-600 leading-relaxed mb-8 max-w-xl">
                Krishna Murari Organosys Pvt. Ltd. (KMOPL) is a leading
                manufacturer of high performance coating solutions for Wood,
                Metal, Glass &amp; Plastic industries. Driven by innovation,
                quality and customer trust for over 25+ years.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.value} className="flex flex-col items-start">
                    <stat.icon
                      className="w-6 h-6 sm:w-7 sm:h-7 text-stone-400 mb-2"
                      strokeWidth={1.4}
                    />
                    <span
                      className="text-[13px] sm:text-sm font-bold leading-tight text-[#0B1D36]"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[13px] sm:text-[14px] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ef4444)",
                    fontFamily: "var(--font-raleway), sans-serif",
                  }}
                >
                  <svg
                    className="w-4 h-4 shrink-0"
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[13px] sm:text-[14px] text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  style={{
                    background: "#0B1D36",
                    fontFamily: "var(--font-raleway), sans-serif",
                  }}
                >
                  Request Technical Consultation
                  <svg
                    className="w-4 h-4 shrink-0"
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
              </div>
            </motion.div>

            {/* Right: facility image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(11,29,54,0.12)]"
            >
              <Image
                src="/paint-images/banner.jpeg"
                alt="KMOPL Facility"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ OUR JOURNEY ═══ */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center text-lg sm:text-xl font-bold uppercase tracking-[0.12em] mb-10 sm:mb-12"
            style={{ color: NAVY, fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Our Journey
          </h2>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            <div
              className="absolute top-7 left-[5%] right-[5%] h-[2px]"
              style={{ background: NAVY }}
            />
            <div className="flex justify-between items-start">
              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className="flex flex-col items-center relative z-10 w-[14%]"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm"
                    style={{ background: item.accent ? ACCENT : NAVY }}
                  >
                    <item.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="mt-4 text-center px-1">
                    <span
                      className="font-bold text-sm block mb-1"
                      style={{ color: NAVY }}
                    >
                      {item.year}
                    </span>
                    <p
                      className="text-[11px] font-bold leading-snug mb-1"
                      style={{ color: NAVY }}
                    >
                      {item.title}
                    </p>
                    <p className="text-[10px] text-stone-500 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-5">
            {TIMELINE.map((item) => (
              <div key={item.year} className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: item.accent ? ACCENT : NAVY }}
                >
                  <item.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-bold text-sm" style={{ color: NAVY }}>
                    {item.year}
                  </span>
                  <p className="text-sm font-semibold" style={{ color: NAVY }}>
                    {item.title}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-7 sm:py-8">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon
                  className="w-7 h-7 shrink-0"
                  style={{ color: ACCENT }}
                  strokeWidth={1.4}
                />
                <div>
                  <div
                    className="text-white font-bold text-base sm:text-lg leading-none"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    {item.value}
                  </div>
                  <div className="text-white/75 text-[11px] sm:text-xs mt-1 leading-snug">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERTISE, HIGHLIGHTS, STRENGTHS ═══ */}
      <section className="w-full max-w-7xl mx-auto bg-white border-y border-stone-200 mb-12 mt-12">
        <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Highlights */}
          <div className="w-full lg:w-[60%] p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#1e3a8a] uppercase tracking-wide">
                Key Highlights
              </h3>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {HIGHLIGHTS.map((item, i) => (
                <div key={i} className="flex flex-col items-start">
                  <item.icon
                    className="w-7 h-7 text-[#1e3a8a] mb-2 opacity-90"
                    strokeWidth={1.2}
                  />
                  <span className="font-bold text-[#1e3a8a] text-sm leading-none mb-1">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-[#1e3a8a] font-medium leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#1e3a8a] uppercase tracking-wide">
                Our Strengths
              </h3>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>
            <ul className="space-y-3">
              {STRENGTHS.map((str, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1e3a8a] flex items-center justify-center shrink-0 mt-[1px]">
                    <CheckCircle2
                      className="w-[13px] h-[13px] text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] text-[#1e3a8a] font-medium leading-snug">
                    {str}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ LEADERSHIP ═══ */}
      <section className="w-full max-w-7xl mx-auto bg-white mb-12 px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-[22px] font-bold text-[#1e3a8a] uppercase tracking-wide">
            Our Leadership
          </h3>
          <div className="h-0.5 w-12 bg-amber-500 mt-2 mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row items-stretch w-full border-t border-stone-200">
          {/* Profiles */}
          <div className="flex-[2.2] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            {[
              {
                name: "Ashok Arora",
                img: "/paint-images/ashok.png",
                role: "Chairman",
                quote: "Building a legacy of trust, quality, and excellence.",
              },
              {
                name: "Alok Arora",
                img: "/paint-images/alok.png",
                role: "Director",
                quote: "nspiring innovation and shaping the future of coatings",
              },
              {
                name: "Rohit Arora",
                img: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426458/kmopl-gallery/tiqghmkm20clwo69mxyp.jpg",
                role: "Director",
                quote:
                  "Creating lasting value through commitment and leadership.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col sm:flex-row py-6 px-4 sm:px-6 gap-4 border border-stone-200"
              >
                <div className="w-28 h-40 sm:w-[160px] sm:h-[200px] shrink-0 relative mx-auto sm:mx-0">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h4 className="text-[#1e3a8a] font-bold text-sm sm:text-[16px] uppercase mb-1">
                    {p.name}
                  </h4>
                  <span className="text-amber-600 text-xs sm:text-[13px] font-medium mb-2">
                    {p.role}
                  </span>
                  <div className="relative flex flex-col">
                    <span className="text-amber-500 text-4xl leading-none font-serif">
                      "
                    </span>
                    <p className="text-xs sm:text-[12px] text-stone-700 leading-relaxed font-medium">
                      {p.quote}
                    </p>
                    <span className="text-amber-500 text-4xl leading-none font-serif self-end">
                      "
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM & VISION ═══ */}
      <section className="w-full max-w-7xl mx-auto bg-white mb-12 border-y border-stone-200">
        <div className="text-center py-6">
          <h3 className="text-xl sm:text-[24px] font-bold text-[#1e3a8a] uppercase tracking-wide">
            One Team. One Vision.
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row w-full lg:h-[480px]">
          {/* Team photo + core values */}
          <div className="flex-[1.6] flex flex-col">
            <div className="flex-1 relative w-full min-h-[200px] sm:min-h-[300px]">
              <Image
                src="/about3.jpeg"
                alt="KMOPL Team"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="bg-[#1e3a8a] px-4 py-4 sm:px-8 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              {CORE_VALUES.map((val, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white">
                  <val.icon
                    className="w-4 h-4 text-stone-100 shrink-0"
                    strokeWidth={1.2}
                  />
                  <span className="text-[11px] sm:text-[13px] font-medium tracking-wide">
                    {val.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INNOVATION & VALUES ═══ */}
      <section className="w-full max-w-7xl mx-auto bg-white mb-12 border-b border-stone-200">
        <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Innovation & R&D */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#1e3a8a] uppercase tracking-wide">
                Innovation & R&D
              </h3>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <ul className="flex-[1.2] space-y-4">
                {[
                  {
                    text: "Advanced R&D laboratory for new product development",
                    icon: FlaskConical,
                  },
                  {
                    text: "Customized formulations for diverse applications",
                    icon: Target,
                  },
                  {
                    text: "Extensive performance testing for quality & durability",
                    icon: Lightbulb,
                  },
                  {
                    text: "Continuous innovation driven by customer needs",
                    icon: Lightbulb,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <item.icon
                      className="w-7 h-7 text-[#1e3a8a] shrink-0 mt-0.5 opacity-90"
                      strokeWidth={1.2}
                    />
                    <span className="text-xs sm:text-[13px] text-stone-800 leading-snug font-medium">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex-1 relative min-h-[200px] sm:min-h-[220px]">
                <Image
                  src="/about/about-new/4.jpeg"
                  alt="R&D Lab"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Vision, Mission, Values */}
          <div className="flex-[1.2] p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#1e3a8a] uppercase tracking-wide">
                Vision, Mission & Values
              </h3>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Vision */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
                  <span className="font-bold uppercase tracking-wide text-[#1e3a8a] text-sm">
                    Vision
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium">
                  To be a trusted global leader in innovative coating solutions,
                  setting benchmarks in quality, sustainability, and customer
                  satisfaction.
                </p>
              </div>
              {/* Mission */}
              <div className="flex-1 sm:border-l border-stone-200 sm:pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target
                    className="w-6 h-6 text-amber-500"
                    strokeWidth={1.5}
                  />
                  <span className="font-bold uppercase tracking-wide text-[#1e3a8a] text-sm">
                    Mission
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium">
                  To deliver high-performance coating solutions through
                  innovation, consistent quality, advanced technology, and
                  lasting customer partnerships.
                </p>
              </div>
              {/* Values */}
              <div className="flex-1 sm:border-l border-stone-200 sm:pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <Diamond
                    className="w-6 h-6 text-amber-500"
                    strokeWidth={1.5}
                  />
                  <span className="font-bold uppercase tracking-wide text-[#1e3a8a] text-sm">
                    Values
                  </span>
                </div>
                <ul className="space-y-2">
                  {[
                    "Integrity",
                    "Innovation",
                    "Quality",
                    "Customer Success",
                    "Sustainability",
                  ].map((val, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] shrink-0" />
                      <span className="text-xs sm:text-[13px] text-stone-800 font-medium">
                        {val}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

            <section className="w-full max-w-7xl mx-auto bg-white mb-12 border-b border-stone-200">
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
    </div>
  );
}
