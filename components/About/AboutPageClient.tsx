"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  Users,
  FlaskConical,
  TestTube2,
  CheckCircle2,
  ArrowRight,
  Microscope,
  Palette,
  ShieldCheck,
  Wrench,
  BadgeCheck,
  TrendingUp,
  Globe,
  Heart,
  Lightbulb,
  Award,
  Target,
  Eye,
  Diamond,
} from "lucide-react";

const TIMELINE = [
  { year: "1998", text: "Company Established", icon: Building2 },
  { year: "2005", text: "Expanded Manufacturing", icon: Wrench },
  { year: "2012", text: "In-House R&D Lab", icon: FlaskConical },
  { year: "2017", text: "New Technologies Launched", icon: Target },
  { year: "2021", text: "500+ Customers", icon: Users },
  { year: "Future", text: "Continuing to Innovate", icon: TrendingUp },
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
  { value: "6,000+", label: "MT Annual Capacity", icon: TrendingUp },
  { value: "15+", label: "Product Categories", icon: Target },
  { value: "9", label: "Chemistry Platforms", icon: FlaskConical },
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
  return (
    <div className="min-h-screen bg-stone-50">
      {/* ═══ HERO ═══ */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[75vh] flex items-center pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/80 sm:via-stone-50/60 to-transparent z-10" />
          <Image
            src="/about/about-new/banner.png"
            alt="KMOPL Facility"
            fill
            className="object-cover sm:object-contain object-right"
            priority
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-900 tracking-tight leading-none mb-3"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              <span className="text-[#1e3a8a]">ABOUT</span>{" "}
              <span className="text-amber-500">US</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-2 leading-tight">
              KRISHNA MURARI
              <br />
              ORGANOSYS PVT. LTD.
            </h2>
            <h3 className="text-base sm:text-xl text-stone-600 italic mb-4">
              Innovating Coating Solutions Since 1998
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed border-l-4 border-amber-500 pl-4 max-w-sm">
              KMOPL is a leading provider of high-performance coating solutions
              for Wood, Metal, Glass & Plastic industries. Driven by innovation,
              quality, and customer trust for over 25+ years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ JOURNEY & QUOTE ═══ */}
      <section className="w-full max-w-7xl mx-auto bg-white mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Journey */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 relative flex flex-col border-b lg:border-b-0 lg:border-r border-stone-200">
            <div className="mb-8">
              <h3 className="text-lg sm:text-[22px] font-bold text-[#1e3a8a] uppercase tracking-wide">
                Our Journey
              </h3>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>

            {/* Desktop timeline — horizontal */}
            <div className="hidden sm:block relative">
              <div className="absolute top-[32px] left-[5%] right-[5%] h-[2px] bg-[#1e3a8a] z-0" />
              <div className="flex justify-between items-start">
                {TIMELINE.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center relative z-10 w-[14%]"
                  >
                    <div className="w-14 h-14 rounded-full bg-white border-[1.5px] border-amber-500 flex items-center justify-center z-20">
                      <item.icon
                        className="w-6 h-6 text-[#1e3a8a]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="w-[2px] h-5 bg-[#1e3a8a] -mt-[1px]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] -mt-[5px]" />
                    <div className="mt-3 text-center">
                      <span className="font-bold text-[#1e3a8a] text-[13px] block mb-1">
                        {item.year}
                      </span>
                      <p className="text-[10px] font-medium text-stone-600 leading-tight">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline — vertical */}
            <div className="sm:hidden space-y-4">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-amber-500 flex items-center justify-center shrink-0">
                    <item.icon
                      className="w-5 h-5 text-[#1e3a8a]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <span className="font-bold text-[#1e3a8a] text-sm">
                      {item.year}
                    </span>
                    <p className="text-xs text-stone-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="w-full lg:w-1/2 bg-[#0f1f45] flex items-center justify-center relative p-8 sm:p-10 min-h-[180px]">
            <span className="text-amber-500 text-5xl leading-none font-serif absolute top-4 left-6 opacity-90">
              "
            </span>
            <p className="text-white text-base sm:text-lg font-medium leading-relaxed text-center px-4 sm:px-8">
              Building long-term partnerships through innovation, quality, and
              performance-driven coating solutions.
            </p>
            <span className="text-amber-500 text-5xl leading-none font-serif absolute bottom-2 right-6 opacity-90">
              "
            </span>
          </div>
        </div>
      </section>

      {/* ═══ EXPERTISE, HIGHLIGHTS, STRENGTHS ═══ */}
      <section className="w-full max-w-7xl mx-auto bg-white border-y border-stone-200 mb-12">
        <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Expertise */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#1e3a8a] uppercase tracking-wide">
                Our Expertise
              </h3>
              <div className="h-0.5 w-12 bg-amber-500 mt-2" />
            </div>
            <div className="grid grid-cols-3 sm:flex  sm:flex-nowrap justify-between items-start mb-6 gap-3">
              {EXPERTISE.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center group w-[18%] min-w-[56px]"
                >
                  <div className="w-10 h-10 rounded-full border border-stone-400 flex items-center justify-center mb-2 group-hover:border-[#1e3a8a] transition-colors">
                    <item.icon
                      className="w-5 h-5 text-[#1e3a8a]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#1e3a8a] leading-tight whitespace-pre-line">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium">
              From formulation and colour matching to application support and
              quality assurance, our expertise spans the complete coating
              lifecycle.
            </p>
          </div>

          {/* Highlights */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
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
                name: "Vasundhra Arora",
                img: "/about/about-new/vasundra.jpeg",
                role: "Director - Operations",
                quote:
                  "Operations excellence comes from precision, people, and processes. We are committed to delivering seamless efficiency every day.",
              },
              {
                name: "Vivek Arora",
                img: "/director.jpeg",
                role: "Director - Strategy",
                quote:
                  "We believe in strategic growth, continuous improvement, and embracing change to shape a better and more innovative future.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col sm:flex-row py-6 px-4 sm:px-6 gap-4 border-l border-r border-stone-200"
              >
                <div className="w-28 h-40 sm:w-[130px] sm:h-[200px] shrink-0 relative mx-auto sm:mx-0">
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
                  <span className="text-amber-600 text-xs sm:text-[13px] font-medium mb-3">
                    {p.role}
                  </span>
                  <div className="relative flex flex-col">
                    <span className="text-amber-500 text-4xl leading-none font-serif">
                      "
                    </span>
                    <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium px-1">
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

          {/* Side image */}
          <div className="flex-[0.8] relative min-h-[200px] lg:min-h-0 mt-4 lg:mt-0">
            <Image
            src="https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426458/kmopl-gallery/tiqghmkm20clwo69mxyp.jpg"
              alt="KMOPL Products"
              fill
              className="object-contain"
            />
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

          {/* Image grid */}
          <div className="flex-1 flex flex-col h-[280px] sm:h-[380px] lg:h-full">
            <div className="flex-[1.3] relative w-full border-b-4 border-white">
              <Image
                src="/about/about-new/1.jpeg"
                alt="Meeting"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex">
              <div className="flex-1 relative border-r-4 border-white">
                <Image
                  src="/about/about-new/2.jpeg"
                  alt="Lab Work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 relative">
                <Image
                  src="/about/about-new/3.jpeg"
                  alt="Products"
                  fill
                  className="object-cover"
                />
              </div>
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
                  To be a globally recognized leader in innovative coating
                  solutions.
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
                  To deliver high-quality, sustainable and cost-effective
                  coating solutions that create long-term value.
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
    </div>
  );
}
