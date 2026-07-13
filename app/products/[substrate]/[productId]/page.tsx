"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { substrates, useProducts } from "@/context/ProductContext";
import type { TechnicalProperty } from "@/context/ProductContext";

const FINISH_VISUALS: Record<string, { gradient: string; label: string }> = {
  Matte: {
    gradient: "linear-gradient(135deg, #e7e5e4, #d6d3d1)",
    label: "Low sheen, velvety",
  },
  Satin: {
    gradient: "linear-gradient(135deg, #d6d3d1, #a8a29e, #d6d3d1)",
    label: "Subtle luster",
  },
  "Semi-Gloss": {
    gradient: "linear-gradient(135deg, #a8a29e, #78716c, #a8a29e)",
    label: "Moderate shine",
  },
  Gloss: {
    gradient: "linear-gradient(135deg, #78716c, #44403c, #78716c)",
    label: "High reflectivity",
  },
  "High Gloss": {
    gradient:
      "linear-gradient(135deg, #1c1917, #44403c, #78716c, #44403c, #1c1917)",
    label: "Mirror-like finish",
  },
  "High Gloss (polished)": {
    gradient:
      "linear-gradient(135deg, #1c1917, #44403c, #78716c, #44403c, #1c1917)",
    label: "Mirror-like finish",
  },
  "Super Matte": {
    gradient: "linear-gradient(135deg, #f5f5f4, #e7e5e4)",
    label: "Ultra-flat, no sheen",
  },
  Textured: {
    gradient: "linear-gradient(135deg, #78716c, #57534e, #78716c)",
    label: "Tactile surface",
  },
  "Metallic effects": {
    gradient:
      "linear-gradient(135deg, #b8860b, #daa520, #ffd700, #daa520, #b8860b)",
    label: "Metallic shimmer",
  },
  Metallic: {
    gradient:
      "linear-gradient(135deg, #b8860b, #daa520, #ffd700, #daa520, #b8860b)",
    label: "Metallic shimmer",
  },
  "Metallic effect": {
    gradient:
      "linear-gradient(135deg, #b8860b, #daa520, #ffd700, #daa520, #b8860b)",
    label: "Metallic shimmer",
  },
  Clear: {
    gradient: "linear-gradient(135deg, #ecfeff, #cffafe, #ecfeff)",
    label: "Transparent coat",
  },
  "Clear Gloss": {
    gradient: "linear-gradient(135deg, #cffafe, #a5f3fc, #cffafe)",
    label: "Clear with shine",
  },
  "Clear Satin": {
    gradient: "linear-gradient(135deg, #ecfeff, #e0f2fe, #ecfeff)",
    label: "Clear subtle sheen",
  },
  Tinted: {
    gradient: "linear-gradient(135deg, #fef3c7, #fde68a, #fef3c7)",
    label: "Colored transparent",
  },
  "Frosted effect": {
    gradient: "linear-gradient(135deg, #f1f5f9, #e2e8f0, #f8fafc)",
    label: "Frosted glass look",
  },
  "Soft-touch": {
    gradient: "linear-gradient(135deg, #1c1917, #292524, #1c1917)",
    label: "Rubber-like feel",
  },
};

const TAB_KEYS = ["overview", "technical", "application"] as const;
type TabKey = (typeof TAB_KEYS)[number];

function ProductImageSlider({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full rounded-3xl border-4 overflow-hidden border-white shadow-xl" style={{ height: "420px", width:"400px" }}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${name} - ${i + 1}`}
          
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all shadow-sm ${i === activeIndex ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TechnicalTable({
  title,
  data,
  color,
  icon,
}: {
  title: string;
  data: TechnicalProperty[];
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div
          className="flex items-center gap-3 px-5 py-4 border-b border-stone-100"
          style={{
            background: `linear-gradient(135deg, ${color}08, ${color}04)`,
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${color}15` }}
          >
            {icon}
          </div>
          <h3
            className="text-[14px] font-bold text-stone-800"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            {title}
          </h3>
        </div>
        <div className="divide-y divide-stone-50">
          {data.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-stone-50/50 transition-colors"
            >
              <span className="text-[13px] text-stone-500 font-medium">
                {item.label}
              </span>
              <span className="text-[13px] font-bold text-stone-800 bg-stone-100 px-3 py-1 rounded-lg">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const substrate = params.substrate as string;
  const productId = params.productId as string;
  const info = substrates[substrate as keyof typeof substrates];
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === productId);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!info || (loading ? false : !product)) {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-stone-200 flex items-center justify-center text-3xl">
            🎨
          </div>
          <p className="text-stone-500 font-medium">Product not found.</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-amber-600 font-semibold text-sm hover:underline"
          >
            ← Back to Products
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!product) return null;

  const hasTechnicalData =
    product.inCanProperties?.length ||
    product.applicationProperties?.length ||
    product.filmProperties?.length;

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* ═══ HERO SECTION with paint-themed visuals ═══ */}
      <section className="relative overflow-hidden">
        {/* Dynamic gradient background based on substrate color */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${info.color}12 0%, ${info.color}06 30%, #fefdfb 70%)`,
          }}
        />

        {/* Paint drip SVG decoration */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: `linear-gradient(90deg, ${info.color}, ${info.color}80, ${info.color})`,
          }}
        />
        <svg
          className="absolute top-2 left-0 right-0 w-full h-8"
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={`M0,0 L1200,0 L1200,4 Q1100,4 1050,16 Q1000,28 950,4 L900,4 Q850,4 800,12 Q750,20 700,4 L600,4 Q550,4 500,20 Q450,32 400,4 L300,4 Q250,4 200,8 Q150,12 100,4 L0,4 Z`}
            fill={info.color}
            opacity="0.15"
          />
        </svg>

        {/* Floating paint splatters */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] w-32 h-32 rounded-full blur-2xl opacity-20"
            style={{ background: info.color }}
          />
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-[25%] w-20 h-20 rounded-full blur-xl opacity-15"
            style={{ background: info.color }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-[5%] w-40 h-40 rounded-full blur-3xl opacity-10"
            style={{ background: info.color }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          {/* Hero content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left: Product info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${info.color}15`,
                    color: info.color,
                    border: `1px solid ${info.color}30`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: info.color }}
                  />
                  {product.chemistry}
                </span>
                <span className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-stone-100 text-stone-500 border border-stone-200">
                  {info.label}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold text-stone-900 leading-tight mb-5"
                style={{
                  fontFamily: "var(--font-raleway), sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                {product.name}
              </h1>

              <p className="text-[15px] text-stone-600 leading-relaxed max-w-xl mb-8">
                {product.recommendedUse || product.description}
              </p>

              {/* Quick stats row */}
              <div className="flex flex-wrap gap-4">
                {product.finishes && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-xl">
                    <svg
                      className="w-4 h-4 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                      />
                    </svg>
                    <span className="text-[12px] font-semibold text-stone-700">
                      {product.finishes.length} Finishes
                    </span>
                  </div>
                )}
                {product.applications && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-xl">
                    <svg
                      className="w-4 h-4 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                      />
                    </svg>
                    <span className="text-[12px] font-semibold text-stone-700">
                      {product.applications.length}+ Industries
                    </span>
                  </div>
                )}
                {product.features && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-xl">
                    <svg
                      className="w-4 h-4 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                    <span className="text-[12px] font-semibold text-stone-700">
                      {product.features.length} Features
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 space-y-4">
                {product.finishes && product.finishes.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      Finish Types
                    </span>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {product.finishes.slice(0, 5).map((finish) => {
                        const visual = FINISH_VISUALS[finish] || {
                          gradient: "linear-gradient(135deg, #d6d3d1, #a8a29e)",
                          label: finish,
                        };
                        return (
                          <div key={finish} className="group/swatch relative">
                            <div
                              className="w-9 h-9 rounded-lg border border-stone-200 shadow-sm cursor-default transition-transform hover:scale-110"
                              style={{ background: visual.gradient }}
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-stone-900 text-white text-[10px] font-medium rounded-md opacity-0 group-hover/swatch:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                              {finish}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Product Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <ProductImageSlider images={[product.image, product.imageFront, product.imageBack].filter(Boolean) as string[]} name={product.name} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TAB NAVIGATION ═══ */}
      <div className="sticky top-[65px] lg:top-[82px] z-20 bg-white/90 backdrop-blur-xl border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {[
              {
                key: "overview" as TabKey,
                label: "Overview",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                key: "technical" as TabKey,
                label: "Technical Data",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                ),
              },
              {
                key: "application" as TabKey,
                label: "Application",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                    />
                  </svg>
                ),
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  activeTab === tab.key
                    ? "text-white shadow-md"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                }`}
                style={
                  activeTab === tab.key
                    ? {
                        background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)`,
                      }
                    : {}
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TAB CONTENT ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description card */}
                  <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${info.color}12` }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: info.color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                      </div>
                      <h2
                        className="text-lg font-bold text-stone-800"
                        style={{
                          fontFamily: "var(--font-raleway), sans-serif",
                        }}
                      >
                        Product Description
                      </h2>
                    </div>
                    <p className="text-[14px] text-stone-600 leading-[1.8]">
                      {product.fullDescription}
                    </p>
                  </div>

                  {/* Features grid */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${info.color}12` }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: info.color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                          />
                        </svg>
                      </div>
                      <h2
                        className="text-lg font-bold text-stone-800"
                        style={{
                          fontFamily: "var(--font-raleway), sans-serif",
                        }}
                      >
                        Key Features
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-4 bg-white border border-stone-200/80 rounded-xl shadow-sm hover:shadow-md hover:border-stone-300 transition-all group"
                        >
                          <div
                            className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                            style={{ background: `${info.color}15` }}
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              style={{ color: info.color }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </div>
                          <span className="text-[13px] text-stone-700 leading-relaxed group-hover:text-stone-900 transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                  {/* PDF Download / Available Finishes */}
                  {(product as any).pdfUrl ? (
                    <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                      <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        Product Document
                      </h3>
                      <div className="flex items-center gap-4 p-4 bg-stone-50 border border-stone-200 rounded-xl">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-stone-800 truncate">{(product as any).pdfName || `${product.name} — Datasheet`}</p>
                          <p className="text-[11px] text-stone-400 mt-0.5">PDF Document</p>
                        </div>
                        <a
                          href={`/api/download-pdf?url=${encodeURIComponent((product as any).pdfUrl)}&name=${encodeURIComponent((product as any).pdfName || product.name + ".pdf")}`}
                          download
                          className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-700 text-white text-[12px] font-bold rounded-xl transition-colors shadow-sm shrink-0"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Download
                        </a>
                      </div>
                    </div>
                  ) : product.finishes && product.finishes.length > 0 && (
                    <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                      <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                        </svg>
                        Available Finishes
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {product.finishes.map((finish) => {
                          const visual = FINISH_VISUALS[finish] || { gradient: "linear-gradient(135deg, #d6d3d1, #a8a29e)", label: finish };
                          return (
                            <div key={finish} className="group/fin relative overflow-hidden rounded-xl border border-stone-200 hover:border-stone-300 transition-all hover:shadow-sm">
                              <div className="h-12 w-full" style={{ background: visual.gradient }} />
                              <div className="px-2.5 py-2 bg-white">
                                <span className="text-[11px] font-semibold text-stone-700 block">{finish}</span>
                                <span className="text-[10px] text-stone-400">
                                  {visual.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Applications */}
                  <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-stone-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                      </svg>
                      Applications
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {product.applications.map((app, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-[11px] font-semibold rounded-lg border transition-colors hover:border-amber-200 hover:bg-amber-50"
                          style={{
                            background: `${info.color}06`,
                            color: info.color,
                            borderColor: `${info.color}20`,
                          }}
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact-us"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)`,
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                      Enquire Now
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── TECHNICAL DATA TAB ─── */}
          {activeTab === "technical" && (
            <motion.div
              key="technical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {hasTechnicalData ? (
                <div className="space-y-8">
                  {/* TDS Header */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${info.color}12` }}
                      >
                        <svg
                          className="w-6 h-6"
                          style={{ color: info.color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2
                          className="text-xl font-bold text-stone-900"
                          style={{
                            fontFamily: "var(--font-raleway), sans-serif",
                          }}
                        >
                          Technical Data Sheet
                        </h2>
                        <p className="text-[13px] text-stone-400">
                          Laboratory tested specifications
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
                      ✓ Verified Data
                    </span>
                  </div>

                  {/* Tables grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {product.inCanProperties &&
                      product.inCanProperties.length > 0 && (
                        <TechnicalTable
                          title="In Can Properties"
                          data={product.inCanProperties}
                          color={info.color}
                          icon={
                            <svg
                              className="w-4 h-4"
                              style={{ color: info.color }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                              />
                            </svg>
                          }
                        />
                      )}
                    {product.applicationProperties &&
                      product.applicationProperties.length > 0 && (
                        <TechnicalTable
                          title="Application Properties"
                          data={product.applicationProperties}
                          color={info.color}
                          icon={
                            <svg
                              className="w-4 h-4"
                              style={{ color: info.color }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                              />
                            </svg>
                          }
                        />
                      )}
                    {product.filmProperties &&
                      product.filmProperties.length > 0 && (
                        <TechnicalTable
                          title="Film Properties"
                          data={product.filmProperties}
                          color={info.color}
                          icon={
                            <svg
                              className="w-4 h-4"
                              style={{ color: info.color }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                              />
                            </svg>
                          }
                        />
                      )}
                    {product.delivery && product.delivery.length > 0 && (
                      <TechnicalTable
                        title="Delivery Information"
                        data={product.delivery}
                        color={info.color}
                        icon={
                          <svg
                            className="w-4 h-4"
                            style={{ color: info.color }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                            />
                          </svg>
                        }
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-stone-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                      />
                    </svg>
                  </div>
                  <p className="text-stone-500 font-medium">
                    Technical data sheet coming soon.
                  </p>
                  <p className="text-stone-400 text-sm mt-1">
                    Contact us for detailed specifications.
                  </p>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)`,
                    }}
                  >
                    Request TDS
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── APPLICATION TAB ─── */}
          {activeTab === "application" && (
            <motion.div
              key="application"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Application Guidelines */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${info.color}12` }}
                    >
                      <svg
                        className="w-6 h-6"
                        style={{ color: info.color }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1h12.76"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2
                        className="text-xl font-bold text-stone-900"
                        style={{
                          fontFamily: "var(--font-raleway), sans-serif",
                        }}
                      >
                        Application Guidelines
                      </h2>
                      <p className="text-[13px] text-stone-400">
                        Surface preparation & application method
                      </p>
                    </div>
                  </div>

                  {product.applicationGuidelines ? (
                    <div className="relative p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
                      {/* Decorative paint stroke */}
                      <div
                        className="absolute top-0 left-0 w-1.5 h-full rounded-full"
                        style={{
                          background: `linear-gradient(180deg, ${info.color}, ${info.color}40)`,
                        }}
                      />
                      <div className="pl-4">
                        <p className="text-[14px] text-stone-600 leading-[1.8]">
                          {product.applicationGuidelines}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm text-center">
                      <p className="text-stone-400 text-sm">
                        Application guidelines available on request.
                      </p>
                    </div>
                  )}

                  {/* Recommended Use */}
                  {product.recommendedUse && (
                    <div className="relative p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
                      <div
                        className="absolute top-0 left-0 w-1.5 h-full rounded-full"
                        style={{
                          background: `linear-gradient(180deg, #f59e0b, #f59e0b40)`,
                        }}
                      />
                      <div className="pl-4">
                        <h3 className="text-sm font-bold text-stone-700 mb-2 flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-amber-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                            />
                          </svg>
                          Recommended Use
                        </h3>
                        <p className="text-[14px] text-stone-600 leading-[1.8]">
                          {product.recommendedUse}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side: Applications & Quick Info */}
                <div className="space-y-6">
                  {/* Industries served */}
                  <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-stone-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                      </svg>
                      Suitable Applications
                    </h3>
                    <div className="space-y-2">
                      {product.applications.map((app, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors"
                        >
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: info.color }}
                          />
                          <span className="text-[13px] text-stone-700 font-medium">
                            {app}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Product quick info */}
                  <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-700 mb-4">
                      Product Specifications
                    </h3>
                    <div className="space-y-3 text-[13px]">
                      <div className="flex justify-between items-center py-2 border-b border-stone-100">
                        <span className="text-stone-400">Chemistry</span>
                        <span
                          className="font-bold text-stone-800 px-2.5 py-1 rounded-lg"
                          style={{ background: `${info.color}10` }}
                        >
                          {product.chemistry}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-stone-100">
                        <span className="text-stone-400">Substrate</span>
                        <span className="font-medium text-stone-700 capitalize">
                          {product.substrate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-stone-100">
                        <span className="text-stone-400">Category</span>
                        <span className="font-medium text-stone-700">
                          {info.label}
                        </span>
                      </div>
                      {product.delivery &&
                        product.delivery.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0"
                          >
                            <span className="text-stone-400">{item.label}</span>
                            <span className="font-medium text-stone-700">
                              {item.value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ═══ PRODUCT GALLERY ═══ */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full bg-amber-500" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Product Gallery
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {product.gallery.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="relative group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setLightboxIndex(i)}>
                <img src={img.url} alt={img.name || `Gallery ${i + 1}`} className="w-full h-36 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>
                {img.name && (
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-linear-to-t from-black/70 to-transparent">
                    <span className="text-[11px] font-semibold text-white drop-shadow-sm">{img.name}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ GALLERY LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightboxIndex !== null && product.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {/* Previous */}
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + product.gallery.length) % product.gallery.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {/* Next */}
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % product.gallery.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            {/* Image */}
            <motion.div key={lightboxIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img src={product.gallery[lightboxIndex].url} alt={product.gallery[lightboxIndex].name || ""} className="max-w-[90vw] max-h-[75vh] object-contain rounded-xl shadow-2xl" />
              {product.gallery[lightboxIndex].name && (
                <p className="mt-3 text-white text-sm font-medium">{product.gallery[lightboxIndex].name}</p>
              )}
            </motion.div>
            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {lightboxIndex + 1} / {product.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ PRODUCT BENEFITS ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
          style={{
            background: `linear-gradient(135deg, ${info.color}08, ${info.color}04, #fefdfb)`,
          }}
        >
          <div
            className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-10"
            style={{ background: info.color }}
          />
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1.5 h-8 rounded-full"
              style={{ background: info.color }}
            />
            <h2
              className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Product Benefits / Advantages section
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.slice(0, 6).map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-sm group hover:shadow-md transition-all"
              >
                <div
                  className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold text-white mt-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${info.color}, ${info.color}bb)`,
                  }}
                >
                  {i + 1}
                </div>
                <span className="text-[13px] font-medium text-stone-700 leading-relaxed">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECOMMENDED SUBSTRATES ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-1.5 h-8 rounded-full"
            style={{ background: info.color }}
          />
          <h2
            className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            Recommended Substrates
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {product.applications.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="relative overflow-hidden p-4 bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-stone-300 transition-all group"
            >
              <div
                className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, ${info.color}, transparent)`,
                }}
              />
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${info.color}, ${info.color}80)`,
                  }}
                />
                <span className="text-[12px] font-semibold text-stone-700">
                  {app}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ RELATED PRODUCTS ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-8 rounded-full"
              style={{ background: info.color }}
            />
            <h2
              className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Related Products
            </h2>
          </div>
          <Link
            href={`/products/${substrate}`}
            className="text-xs font-bold uppercase tracking-[0.15em] hover:text-amber-700 transition-colors flex items-center gap-1"
            style={{ color: info.color }}
          >
            View All
            <svg
              className="w-3.5 h-3.5"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products
            .filter((p) => p.substrate === substrate && p.id !== productId)
            .sort((a, b) => {
              // Prioritize same chemistry products first
              const aMatch = a.chemistry === product.chemistry ? 0 : 1;
              const bMatch = b.chemistry === product.chemistry ? 0 : 1;
              return aMatch - bMatch;
            })
            .slice(0, 3)
            .map((relProduct, i) => (
              <motion.div
                key={relProduct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/products/${substrate}/${relProduct.id}`}
                  className="block group h-full"
                >
                  <div className="relative overflow-hidden h-full bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                    {/* Top color bar */}
                    <div
                      className="h-1 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${info.color}, ${info.color}40)`,
                      }}
                    />
                    {/* Visual header */}
                    <div
                      className="h-80 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${info.color}10, ${info.color}04)`,
                      }}
                    >
                      {relProduct.image ? (
                        <img
                          src={relProduct.image}
                          alt={relProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: info.color }}
                        />
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: info.color }}
                        >
                          {relProduct.chemistry}
                        </span>
                      </div>
                      <h4
                        className="text-[14px] font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors"
                        style={{
                          fontFamily: "var(--font-raleway), sans-serif",
                        }}
                      >
                        {relProduct.name}
                      </h4>
                      <p className="text-[12px] text-stone-500 line-clamp-2 leading-relaxed">
                        {relProduct.description}
                      </p>
                      <div
                        className="mt-3 flex items-center gap-1 text-[11px] font-semibold"
                        style={{ color: info.color }}
                      >
                        Learn More
                        <svg
                          className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
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
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
          style={{
            background: `linear-gradient(135deg, ${info.color}15, ${info.color}08)`,
          }}
        >
          {/* Paint brush decoration */}
          <div
            className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10"
            style={{ background: info.color }}
          />
          <div
            className="absolute -left-5 -top-5 w-24 h-24 rounded-full opacity-10"
            style={{ background: info.color }}
          />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-lg font-bold text-stone-900 mb-1"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                Interested in {product.name}?
              </h3>
              <p className="text-[14px] text-stone-500">
                Get pricing, samples, and technical support from our team.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/contact-us"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                style={{
                  background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)`,
                }}
              >
                Get Quote
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href={`/products/${substrate}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-stone-200 text-sm font-semibold text-stone-700 hover:border-stone-300 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                More {info.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
