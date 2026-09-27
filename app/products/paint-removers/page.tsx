"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wind,
  ThermometerSnowflake,
  FlaskConical,
  BadgeCheck,
  ShieldCheck,
  Droplet,
  FlaskRound,
  Award,
  Boxes,
  Milk,
  Grid2x2,
  MessageCircle,
  FileText,
  type LucideIcon,
} from "lucide-react";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const FONT = { fontFamily: "var(--font-raleway), sans-serif" };

// I-beam icon for metal (lucide has no equivalent)
function IBeam({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
    >
      <path d="M5 4h14v3h-5v10h5v3H5v-3h5V7H5z" />
    </svg>
  );
}

type Substrate = {
  key: string;
  label: string;
  title: string;
  text: string;
  color: string;
  tint: string;
  icon: LucideIcon | typeof IBeam;
  // Replace these with your own image URLs
  image: string;
};

const SUBSTRATES: Substrate[] = [
  {
    key: "metal",
    label: "Metal",
    title: "For Metals",
    color: "#1d4ed8",
    tint: "from-blue-50",
    text: "Safely removes heavy enamels, acrylics and lacquers from steel, iron, aluminium and brass without causing corrosion or etching.",
    icon: IBeam,
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F10.jpg?alt=media&token=942a159f-f3a9-4469-b15c-4769e0e52a38",
  },
  {
    key: "plastic",
    label: "Plastic",
    title: "For Plastics",
    color: "#16a34a",
    tint: "from-green-50",
    text: "Specially formulated to remove paint films from rigid plastics and composites without melting, warping or weakening the substrate.",
    icon: Milk,
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F11.jpg?alt=media&token=e00f27be-1019-4641-a1c4-fdc4340a28d3",
  },
  {
    key: "glass",
    label: "Glass",
    title: "For Glass",
    color: "#7e22ce",
    tint: "from-purple-50",
    text: "Quickly dissolves overspray, dried varnishes and baked-on coatings from glass panels, mirrors and windows, leaving a clean, scratch-free finish.",
    icon: Grid2x2,
    image:
      "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F8.jpg?alt=media&token=f6deae19-5a42-4f18-96ea-9b0a021a2505",
  },
];

const FEATURES = [
  {
    title: "Low Odour",
    text: "Low odour formula for a more pleasant and comfortable working environment.",
    icon: Wind,
  },
  {
    title: "Workable on Low Temperature",
    text: "Effective performance even in low temperature conditions.",
    icon: ThermometerSnowflake,
  },
  {
    title: "Customized Solution as per Coating System",
    text: "Tailored solutions designed to match your specific coating requirements.",
    icon: FlaskConical,
  },
  {
    title: "No Rust Behind After Removing of Paint",
    text: "Leaves a clean surface without any rust formation.",
    icon: BadgeCheck,
  },
  {
    title: "No Substrate Damaged",
    text: "Safe on the substrate while ensuring effective paint removal.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Clean with Water After Paint Remove",
    text: "Residue can be easily washed off with water for a clean finish.",
    icon: Droplet,
  },
];

const TRUST = [
  {
    title: "Industrial Grade",
    text: "Formulated for professional use.",
    icon: FlaskRound,
  },
  {
    title: "Consistent Quality",
    text: "Reliable performance in every application.",
    icon: Award,
  },
  {
    title: "Wide Substrate Compatibility",
    text: "For glass, metal, plastic & more.",
    icon: Boxes,
  },
];

const CTA_IMAGE = "/paint-images/images/4.jpg";

const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F9.jpg?alt=media&token=266a61bd-263b-454d-9a40-6e5ca2278046";
// Matches the navy on the left of HERO_IMAGE
const HERO_NAVY = "linear-gradient(180deg, #0c2a6b, #0a1f4f)";
// Centre of each panel in HERO_IMAGE, as % of the visible width.
// "full" = whole image width visible (desktop, tablet); "cropped" = phone, 10:9 box showing only the right-hand panels.
const HERO_BADGE_X = {
  full: ["50%", "69%", "89%"],
  cropped: ["20%", "50%", "82%"],
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function PaintRemoversPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — the background image already contains the navy area and the three substrate panels */}
      <section
        className="relative overflow-hidden"
        style={{ background: HERO_NAVY }}
      >
        <div className="relative lg:h-[min(50vw,80vh)]">
          {/* Desktop: full image; badges sit at fixed % positions over its panels */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src={HERO_IMAGE}
              alt="Paint being scraped from metal, plastic and glass"
              fill
              priority
              sizes="100vw"
              className="object-cover "
            />
            {SUBSTRATES.map((s, i) => (
              <SubstrateBadge
                key={s.key}
                s={s}
                x={HERO_BADGE_X.full[i]}
                delay={0.3 + i * 0.12}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative lg:absolute lg:inset-y-0 lg:left-0 lg:w-[38%] flex flex-col justify-center py-12 lg:py-0 px-4 sm:px-6 lg:pr-6"
            style={{
              paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 2rem))",
            }}
          >
            <h1
              className="text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold uppercase leading-[0.98] mb-5 text-white"
              style={FONT}
            >
              Paint
              <br />
              Removers
            </h1>
            <p
              className="text-[clamp(1.15rem,1.9vw,1.5rem)] font-bold leading-snug mb-5 text-white"
              style={FONT}
            >
              Effective Solutions for
              <br />
              <span className="text-sky-300">Metal</span>,{" "}
              <span className="text-green-400">Plastic</span> &{" "}
              <span className="text-purple-300">Glass</span>
            </p>
            <div
              className="w-12 h-0.5 rounded-full mb-5"
              style={{ background: ORANGE }}
            />
            <p className="text-white/80 text-[14px] leading-relaxed mb-8 max-w-sm">
              High-performance paint remover solutions formulated for fast, safe
              and efficient removal of coatings from a wide range of surfaces.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white font-bold text-[13px] shadow-md hover:opacity-90 transition-opacity"
                style={{ background: ORANGE }}
              >
                <FileText className="w-4 h-4" /> Request TDS
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-[13px] border border-white/70 text-white hover:bg-white/10 transition-colors"
              >
                Talk to an Expert <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Mobile/tablet: text above, only the panel part of the image below */}
          <div className="lg:hidden relative aspect-10/9 sm:aspect-video">
            <Image
              src={HERO_IMAGE}
              alt="Paint being scraped from metal, plastic and glass"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
            {SUBSTRATES.map((s, i) => (
              <SubstrateBadge
                key={s.key}
                s={s}
                x={HERO_BADGE_X.cropped[i]}
                xSm={HERO_BADGE_X.full[i]}
                delay={0.3 + i * 0.12}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle>Applications</SectionTitle>
        <div className="grid md:grid-cols-3 gap-5">
          {SUBSTRATES.map((s, i) => (
            <motion.div
              key={s.key}
              {...fadeUp}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`rounded-2xl border border-stone-200 bg-linear-to-b ${s.tint} to-white overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4 p-5 sm:p-6">
                <span
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
                  style={{ background: s.color }}
                >
                  <s.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3
                    className="text-[16px] font-extrabold uppercase tracking-wide mb-2 mt-2.5"
                    style={{ ...FONT, color: s.color }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-stone-600 leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </div>
              <div className="relative mt-auto h-64 sm:h-72 md:h-56">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="border-t border-stone-200 pt-10">
          <SectionTitle>Our Key Features</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={`flex flex-col items-center text-center px-3 ${i > 0 ? "lg:border-l lg:border-stone-200" : ""}`}
              >
                <span
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4"
                  style={{ borderColor: NAVY }}
                >
                  <f.icon
                    className="w-7 h-7"
                    style={{ color: NAVY }}
                    strokeWidth={1.6}
                  />
                </span>
                <h3
                  className="text-[12px] font-extrabold uppercase leading-snug mb-2 min-h-[3em]"
                  style={{ ...FONT, color: NAVY }}
                >
                  {f.title}
                </h3>
                <p className="text-[12px] text-stone-600 leading-relaxed">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, #0f2440, ${NAVY} 45%, #1e40af)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center gap-6">
          <div className="relative shrink-0 w-24 h-20 rounded-xl overflow-hidden hidden sm:block">
            <Image
              src={CTA_IMAGE}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <h2
            className="flex-1 text-center md:text-left text-xl sm:text-2xl font-extrabold uppercase tracking-wide leading-tight text-white"
            style={FONT}
          >
            Find the right paint remover
            <br />
            <span className="text-sky-300">for your application</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white font-bold text-[13px] hover:bg-stone-100 transition-colors"
              style={{ color: NAVY }}
            >
              Talk to an Expert <MessageCircle className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-white font-bold text-[13px] shadow-md hover:opacity-90 transition-opacity"
              style={{ background: ORANGE }}
            >
              Request TDS <FileText className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {TRUST.map((t, i) => (
            <div
              key={t.title}
              className={`flex items-center gap-4 ${i > 0 ? "lg:border-l lg:border-stone-200 lg:pl-6" : ""}`}
            >
              <t.icon
                className="w-9 h-9 shrink-0"
                style={{ color: NAVY }}
                strokeWidth={1.4}
              />
              <div>
                <p
                  className="text-[12px] font-extrabold uppercase"
                  style={{ ...FONT, color: NAVY }}
                >
                  {t.title}
                </p>
                <p className="text-[12px] text-stone-600 leading-snug">
                  {t.text}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-center lg:justify-end lg:border-l lg:border-stone-200 lg:pl-6">
            <Image
              src="/logo.png"
              alt="Krishna"
              width={160}
              height={80}
              className="h-14 w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function SubstrateBadge({
  s,
  x,
  xSm = x,
  delay,
}: {
  s: Substrate;
  x: string;
  xSm?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="absolute bottom-[8%] left-(--x) sm:left-(--x-sm) -translate-x-1/2 w-18 h-18 xl:w-22 xl:h-22 rounded-full border-2 border-white/80 shadow-lg flex flex-col items-center justify-center text-white gap-0.5"
      style={
        { "--x": x, "--x-sm": xSm, background: s.color } as React.CSSProperties
      }
    >
      <s.icon className="w-6 h-6 xl:w-8 xl:h-8" />
      <span className="text-[9px] xl:text-[11px] font-bold uppercase tracking-wider">
        {s.label}
      </span>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...fadeUp} className="text-center mb-8">
      <h2
        className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide"
        style={{ ...FONT, color: NAVY }}
      >
        {children}
      </h2>
      <div
        className="w-10 h-0.5 mx-auto mt-3 rounded-full"
        style={{ background: ORANGE }}
      />
    </motion.div>
  );
}
