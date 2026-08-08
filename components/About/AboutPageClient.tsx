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
    // accent: true,
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
                className="text-[15px] sm:text-sm font-bold uppercase tracking-[0.22em] mb-3 text-[#C05A28]"
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
              <p className="text-[15px] sm:text-[18px] text-stone-600 leading-relaxed mb-8 max-w-xl">
                Krishna Murari Organosys Pvt. Ltd. (KMOPL) is a leading
                manufacturer of high performance coating solutions for Wood,
                Metal, Glass &amp; Plastic industries. Driven by innovation,
                quality and customer trust for over 25+ years.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.value} className="flex flex-col items-start">
                    <stat.icon
                      className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 mb-2"
                      strokeWidth={1.4}
                    />
                    <span
                      className="text-[15px] sm:text-md font-bold leading-tight text-[#0B1D36]"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[15px] sm:text-sm text-stone-500 mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[11px] sm:text-[13px] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[11px] sm:text-[13px] text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
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
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full h-[240px] sm:h-[320px] lg:h-[480px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(11,29,54,0.12)]"
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
            className="text-center text-lg sm:text-3xl font-bold uppercase tracking-[0.12em] mb-10 sm:mb-12"
            style={{
              color: NAVY,
              fontFamily: "var(--font-raleway), sans-serif",
            }}
          >
            Our Journey
            <div className="h-0.5 w-12 bg-amber-500 mt-2 mx-auto" />
          </h2>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            <div
              className="absolute top-10 left-[5%] right-[5%] h-[2px]"
              style={{ background: NAVY }}
            />
            <div className="flex justify-between items-start">
              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className="flex flex-col items-center relative z-10 w-[14%]"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-sm"
                    style={{ background: NAVY }}
                  >
                    <item.icon
                      className="w-6 h-6 text-orange-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="mt-4 text-center px-1">
                    <span className="font-bold text-xl block mb-1 text-orange-500">
                      {item.year}
                    </span>
                    <p
                      className="text-[16px] font-bold leading-snug mb-1"
                      style={{ color: NAVY }}
                    >
                      {item.title}
                    </p>
                    <p className="text-[16px] text-stone-500 leading-snug">
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
                  style={{ background: NAVY }}
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
                  <p className="text-sm text-stone-500 mt-0.5">{item.desc}</p>
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
                  <div className="text-white/75 text-[15px] sm:text-sm mt-1 leading-snug">
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
          {/* Strengths */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1e3a8a] uppercase tracking-wide">
                Our Strengths
              </h3>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>
            <ul className="space-y-3 grid grid-cols-1 lg:grid-cols-3">
              {STRENGTHS.map((str, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0 mt-[1px]">
                    <CheckCircle2
                      className="w-[13px] h-[13px] text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-sm sm:text-[15px] text-[#1e3a8a] font-medium leading-snug">
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
          <h3 className=" font-bold text-[#1e3a8a] text-lg sm:text-3xl uppercase tracking-[0.12em]">
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
                quote:
                  "Inspiring innovation and shaping the future of coatings.",
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
                  <h4 className="text-[#1e3a8a] font-bold text-sm sm:text-[18px] uppercase mb-1">
                    {p.name}
                  </h4>
                  <span className="text-amber-600 text-sm sm:text-[16px] font-medium mb-2">
                    {p.role}
                  </span>
                  <div className="relative mt-1">
                    <p className="text-sm sm:text-[16px] text-stone-700 leading-relaxed font-medium">
                      <span className="text-amber-500 text-2xl font-serif align-bottom leading-none lg:pr-3">
                        "
                      </span>
                      {p.quote}
                      <span className="text-amber-500 text-2xl font-serif align-bottom leading-none ml-3 ">
                        "
                      </span>
                    </p>
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
          <h3 className=" font-bold text-[#1e3a8a] text-lg sm:text-3xl uppercase tracking-[0.12em]">
            One Team. One Vision.
          </h3>
          <div className="h-0.5 w-12 bg-amber-500 mt-2 mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row w-full lg:h-[480px]">
          {/* Team photo + core values */}
          <div className="flex-[1.6] flex flex-col">
            <div className="flex-1 relative w-full min-h-[200px] sm:min-h-[300px]">
              <Image
                src="/new/team-image.jpeg"
                alt="KMOPL Team"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="bg-[#1e3a8a] px-4 py-4 sm:px-8 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              {CORE_VALUES.map((val, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white">
                  <val.icon
                    className="w-4 h-4 text-orange-500 shrink-0"
                    strokeWidth={1.2}
                  />
                  <span className="text-[15px] sm:text-[15px] font-medium tracking-wide">
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#1e3a8a] uppercase tracking-wide">
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
                      className="w-7 h-7 text-orange-500 shrink-0 mt-0.5 opacity-90"
                      strokeWidth={1.2}
                    />
                    <span className="text-sm sm:text-[15px] text-stone-800 leading-snug font-medium">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex-1 relative min-h-[200px] sm:min-h-[220px]">
                <Image
                  src="/paint-images/rd.jpeg"
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#1e3a8a] uppercase tracking-wide">
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
                <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">
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
                <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">
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
                      <span className="text-sm sm:text-[15px] text-stone-800 font-medium">
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

      {/* ═══ INSIDE OUR MANUFACTURING ═══ */}
      <section id="manufacturing" className="w-full bg-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-10 bg-[#C05A28]" />
              <span
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C05A28" }}
              >
                Inside Our Manufacturing
              </span>
              <span className="h-px w-10 bg-[#C05A28]" />
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1D36] leading-tight"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Technology. Precision. Quality.
            </h2>
            <p className="mt-3 text-stone-500 text-sm sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
              Our state-of-the-art facilities, advanced equipment and rigorous
              quality control ensure consistent, high-performance coating
              solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              {
                img: "/Inside-our-manufacturing/production-facility.png",
                title: "Production Facility",
                desc: "Modern infrastructure designed for safe, efficient and scalable production.",
              },
              {
                img: "/Inside-our-manufacturing/rd.jpeg",
                title: "R&D Laboratory",
                desc: "In-house R&D driving innovation and formulation of advanced solutions.",
              },
              {
                img: "/Inside-our-manufacturing/advanced-equipment.png",
                title: "Advanced Equipment",
                desc: "High-performance mixing and dispersion systems for consistent quality.",
              },
              {
                img: "/Inside-our-manufacturing/quality-control-testing.jpeg",
                title: "Quality Control & Testing",
                desc: "Multi-stage testing at every step to ensure performance, safety and reliability.",
              },
              {
                img: "/Inside-our-manufacturing/packaging.jpeg",
                title: "Packaging",
                desc: "Automated, secure and environment-friendly packaging solutions.",
              },
              {
                img: "/Inside-our-manufacturing/warehouse-dispatch.png",
                title: "Warehouse & Dispatch",
                desc: "Efficient storage and pan-India dispatch network for timely deliveries.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-full h-40 sm:h-72 rounded-2xl overflow-hidden mb-4 border border-stone-200 shadow-sm">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#C05A28] flex items-center justify-center -mt-9 mb-2 bg-white relative z-10 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5"
                    stroke="#C05A28"
                    strokeWidth={1.6}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h4
                  className="text-sm font-bold text-[#0B1D36] mb-1"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {item.title}
                </h4>
                <p className="text-[12px] text-stone-500 leading-snug px-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-[#f5f6f8] border border-stone-200 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            {[
              { title: "Advanced Infrastructure", icon: "🏭" },
              { title: "In-house R&D", icon: "🔬" },
              { title: "Precision Manufacturing", icon: "⚙️" },
              { title: "Multi-stage Quality Checks", icon: "✅" },
              { title: "Reliable Dispatch", icon: "🚛" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-base shadow-sm">
                  {badge.icon}
                </div>
                <span
                  className="text-[13px] font-bold text-[#0B1D36]"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {badge.title}
                </span>
                {i < 4 && (
                  <span className="hidden lg:block w-px h-6 bg-stone-300 ml-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto bg-white mb-12 border-b border-stone-200">
        {/* Single row marquee with logos */}
        <div className="relative overflow-visible py-4">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #fdfbf7, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #fdfbf7, transparent)",
            }}
          />

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
