"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Droplet,
  Palette,
  Printer,
  Shapes,
  Layers,
  TestTubes,
  ShieldCheck,
  Award,
  Sun,
  Atom,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const BLUE = "#1d4ed8";
const FONT = { fontFamily: "var(--font-raleway), sans-serif" };

const SOLVENT_BASED = [
  { name: "Green 4160", color: "#2e7d32" },
  { name: "Brown 4130", color: "#7b4a12" },
  { name: "Orange 4170", color: "#f47c20" },
  { name: "Turquoise 4111", color: "#3fa7b5" },
  { name: "Light Yellow 4142", color: "#f2d43a" },
  { name: "Fire Red 4151", color: "#d9261c" },
  { name: "Jet Black 4121", color: "#0b0b0b" },
  { name: "Black 4120", color: "#1f1f1f" },
];

const WATER_BASED = [
  { name: "Red", color: "#d62828" },
  { name: "Blue", color: "#2f4fc4" },
  { name: "Black", color: "#111111" },
  { name: "Yellow", color: "#f5d731" },
  { name: "Brown", color: "#6b4226" },
];

const APPLICATIONS = [
  {
    label: "Coatings",
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F16.jpg?alt=media&token=6db4d9b1-c173-4dbd-8b63-51f220cf17e5",
    icon: Palette,
    art: "radial-gradient(circle at 18% 70%, #1d4ed8 0 22%, transparent 23%), radial-gradient(circle at 50% 75%, #f59e0b 0 22%, transparent 23%), radial-gradient(circle at 82% 70%, #facc15 0 22%, transparent 23%), radial-gradient(circle at 35% 20%, #0ea5e9 0 20%, transparent 21%), radial-gradient(circle at 70% 20%, #ea580c 0 20%, transparent 21%), linear-gradient(#e7e5e4, #d6d3d1)",
  },
  {
    label: "Printing",
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F15.jpg?alt=media&token=7cd88f39-3bda-4ee7-a4a2-f85b20b527e2",
    icon: Printer,
    art: "repeating-linear-gradient(115deg, #ef4444 0 10px, #f97316 10px 20px, #facc15 20px 30px, #22c55e 30px 40px, #06b6d4 40px 50px, #3b82f6 50px 60px, #a855f7 60px 70px, #ec4899 70px 80px)",
  },
  {
    label: "Plastics",
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F13.jpg?alt=media&token=f272ee4e-a26a-454d-a917-29e7a16da3e4",
    icon: Shapes,
    art: "radial-gradient(circle at 20% 30%, #ec4899 0 9%, transparent 10%), radial-gradient(circle at 45% 60%, #22c55e 0 9%, transparent 10%), radial-gradient(circle at 75% 25%, #3b82f6 0 9%, transparent 10%), radial-gradient(circle at 80% 75%, #f97316 0 9%, transparent 10%), radial-gradient(circle at 15% 80%, #facc15 0 9%, transparent 10%), radial-gradient(circle at 55% 20%, #a855f7 0 9%, transparent 10%), radial-gradient(circle at 35% 90%, #ef4444 0 9%, transparent 10%), linear-gradient(135deg, #fde68a, #f0abfc)",
  },
  {
    label: "Industrial Finishes",
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F12.jpg?alt=media&token=afd0536f-c8bb-4498-a11f-f5b0eb597998",
    icon: Layers,
    art: "linear-gradient(135deg, #71717a 0%, #e4e4e7 30%, #a1a1aa 50%, #f4f4f5 70%, #52525b 100%)",
  },
  {
    label: "Specialty Applications",
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F14.jpg?alt=media&token=d9a4d6e9-db7b-4558-9ecd-3103e63314f1",
    icon: TestTubes,
    art: "linear-gradient(to top, #dc2626 0 45%, transparent 45%) 8% 100% / 12% 80% no-repeat, linear-gradient(to top, #16a34a 0 55%, transparent 55%) 30% 100% / 12% 80% no-repeat, linear-gradient(to top, #2563eb 0 40%, transparent 40%) 52% 100% / 12% 80% no-repeat, linear-gradient(to top, #9333ea 0 60%, transparent 60%) 74% 100% / 12% 80% no-repeat, linear-gradient(to top, #ea580c 0 50%, transparent 50%) 96% 100% / 12% 80% no-repeat, linear-gradient(#f8fafc, #e2e8f0)",
  },
];

const WHY = [
  { label: "Vibrant Colours", icon: Palette },
  { label: "Consistent Quality", icon: ShieldCheck },
  { label: "Excellent Solubility", icon: FlaskConical },
  { label: "Reliable Performance", icon: Award },
  { label: "Light Fastness", icon: Sun },
  { label: "Chemical Stability", icon: Atom },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function DyestuffPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-r from-white via-white to-sky-50">
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%]">
          <Image
            width={1000}
            height={1000}
            src="https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F17.jpg?alt=media&token=a18bcea0-12fb-4927-82d0-79072f948ec0"
            alt="Dyestuff solution"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/40 md:via-white/70 md:to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pb-20">
          <nav
            className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-stone-800">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-stone-800">
              Products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-stone-800">
              Dyestuff Solutions
            </span>
          </nav>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <h1
              className="text-[clamp(2.6rem,6vw,4.25rem)] font-extrabold leading-[1.02] mb-5"
              style={{ ...FONT, color: NAVY }}
            >
              Dyestuff
              <br />
              <span style={{ color: ORANGE }}>Solutions</span>
            </h1>
            <p
              className="text-[clamp(1.1rem,2vw,1.4rem)] font-bold leading-snug mb-4"
              style={{ ...FONT, color: NAVY }}
            >
              Consistent Colour.
              <br />
              Reliable Performance.
            </p>
            <p className="text-stone-600 text-[14px] leading-relaxed mb-8 max-w-sm">
              High-performance dyestuff solutions engineered for consistent,
              vibrant results across a wide range of industrial applications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center px-5 py-3 rounded-lg text-white font-bold text-[13px] shadow-md hover:opacity-90 transition-opacity"
                style={{ background: ORANGE }}
              >
                Request TDS
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-[13px] border bg-white hover:bg-stone-50 transition-colors"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                Talk to Expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solvent / Water based */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 via-white to-orange-100/70 p-6 sm:p-8 flex items-center gap-6"
          >
            <div
              aria-hidden
              className="absolute -right-10 -bottom-12 w-56 h-56 rounded-full bg-orange-200/40 blur-2xl"
            />
            <div className="relative shrink-0 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center">
              <FlaskConical
                className="w-9 h-9"
                style={{ color: ORANGE }}
                strokeWidth={1.6}
              />
            </div>
            <div className="relative">
              <h3
                className="text-[17px] font-extrabold uppercase tracking-wide leading-tight mb-2"
                style={{ ...FONT, color: ORANGE }}
              >
                Solvent-Based
                <br />
                Dyestuff Solutions
              </h3>
              <p className="text-[13px] text-stone-600 leading-relaxed max-w-xs">
                For applications requiring excellent solubility, colour strength
                and consistent performance.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-sky-100/70 p-6 sm:p-8 flex items-center gap-6"
          >
            <div
              aria-hidden
              className="absolute -right-10 -bottom-12 w-56 h-56 rounded-full bg-sky-200/50 blur-2xl"
            />
            <div className="relative shrink-0 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center">
              <Droplet
                className="w-9 h-9"
                style={{ color: BLUE }}
                strokeWidth={1.6}
              />
            </div>
            <div className="relative">
              <h3
                className="text-[17px] font-extrabold uppercase tracking-wide leading-tight mb-2"
                style={{ ...FONT, color: NAVY }}
              >
                Water-Based
                <br />
                Dyestuff Solutions
              </h3>
              <p className="text-[13px] text-stone-600 leading-relaxed max-w-xs">
                Reliable colour solutions designed for water-based systems and
                diverse industrial applications.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.h2
          {...fadeUp}
          className="text-center text-2xl sm:text-3xl font-extrabold uppercase tracking-wide mb-6"
          style={{ ...FONT, color: NAVY }}
        >
          Our <span style={{ color: ORANGE }}>Dyestuff</span> Portfolio
        </motion.h2>

        <SubHeading color={ORANGE}>Solvent-Based Dyestuff Solutions</SubHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {SOLVENT_BASED.map((d, i) => (
            <Swatch
              key={d.name}
              prefix="SB"
              name={d.name}
              color={d.color}
              index={i}
            />
          ))}
        </div>

        <div className="border-t border-stone-200 mb-6" />

        <SubHeading color={BLUE}>Water-Based Dyestuff Solutions</SubHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {WATER_BASED.map((d, i) => (
            <Swatch
              key={d.name}
              prefix="WB"
              name={d.name}
              color={d.color}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div {...fadeUp} className="text-center mb-8">
          <h2
            className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide"
            style={{ ...FONT, color: NAVY }}
          >
            Applications
          </h2>
          <div
            className="w-10 h-0.5 mx-auto my-3 rounded-full"
            style={{ background: ORANGE }}
          />
          <p className="text-[13px] text-stone-600">
            Designed to deliver reliable colour performance across diverse
            industrial substrates and applications.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {APPLICATIONS.map((a, i) => (
            <motion.div
              key={a.label}
              {...fadeUp}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div
                className="relative h-24 sm:h-28 overflow-hidden"
              >
                <Image
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  src={a.image}
                  alt={a.label}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.hidden = true;
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 px-3 py-4 min-h-23">
                <a.icon
                  className="w-6 h-6"
                  style={{ color: NAVY }}
                  strokeWidth={1.6}
                />
                <span
                  className="text-[12px] font-bold text-center leading-tight"
                  style={{ color: NAVY }}
                >
                  {a.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          {...fadeUp}
          className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50/70 via-white to-sky-50 px-4 sm:px-8 py-8"
        >
          <h2
            className="text-center text-xl sm:text-2xl font-extrabold uppercase tracking-wide"
            style={{ ...FONT, color: NAVY }}
          >
            Why Krishna Dyestuff Solutions?
          </h2>
          <div
            className="w-10 h-0.5 mx-auto mt-3 mb-8 rounded-full"
            style={{ background: ORANGE }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8">
            {WHY.map((w, i) => (
              <div
                key={w.label}
                className={`flex flex-col items-center gap-3 px-2 ${i > 0 ? "lg:border-l lg:border-stone-200" : ""}`}
              >
                <w.icon
                  className="w-8 h-8"
                  style={{ color: NAVY }}
                  strokeWidth={1.5}
                />
                <span
                  className="text-[12px] font-bold text-center leading-tight whitespace-pre-line"
                  style={{ color: NAVY }}
                >
                  {w.label.replace(" ", "\n")}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl border border-orange-100 bg-linear-to-r from-orange-50 via-white to-white"
        >
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-full md:w-[55%] opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 45% 55% at 30% 70%, rgba(234,88,12,0.55), transparent 70%), radial-gradient(ellipse 40% 60% at 60% 45%, rgba(29,78,216,0.55), transparent 70%), radial-gradient(ellipse 35% 50% at 85% 60%, rgba(56,189,248,0.5), transparent 70%), radial-gradient(ellipse 30% 40% at 50% 85%, rgba(250,204,21,0.45), transparent 70%)",
              filter: "blur(6px)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-orange-50 via-white/80 to-transparent md:via-white/40"
          />
          <div className="relative p-6 sm:p-10 max-w-lg">
            <h2
              className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3"
              style={{ ...FONT, color: NAVY }}
            >
              Need the right dyestuff
              <br />
              <span style={{ color: ORANGE }}>for your application?</span>
            </h2>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-6">
              Our technical team can help you identify the right colour solution
              based on your substrate, process and performance requirements.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center px-5 py-3 rounded-lg text-white font-bold text-[13px] shadow-md hover:opacity-90 transition-opacity"
                style={{ background: ORANGE }}
              >
                Request TDS
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-[13px] border bg-white hover:bg-stone-50 transition-colors"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                Talk to an Expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function SubHeading({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span
        className="h-px w-8 sm:w-16"
        style={{ background: color, opacity: 0.4 }}
      />
      <h3
        className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wide text-center"
        style={{ ...FONT, color }}
      >
        {children}
      </h3>
      <span
        className="h-px w-8 sm:w-16"
        style={{ background: color, opacity: 0.4 }}
      />
    </div>
  );
}

function Swatch({
  prefix,
  name,
  color,
  index,
}: {
  prefix: string;
  name: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="flex items-center gap-3 sm:gap-4 rounded-xl border border-stone-200 bg-white px-3 sm:px-4 py-3 sm:py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <span
        className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-inner ring-1 ring-black/5"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${color}cc, ${color} 60%)`,
        }}
      />
      <div className="text-[11px] sm:text-[12px] leading-snug min-w-0">
        <p className="font-semibold text-stone-700">{prefix} Dyestuff</p>
        <p className="font-semibold text-stone-700">Solution</p>
        <p className="font-extrabold wrap-break-word" style={{ color: NAVY }}>
          {name}
        </p>
      </div>
    </motion.div>
  );
}
