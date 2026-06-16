"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const WOOD_PANELS = [
  {
    id: 1,
    name: "Classic Walnut",
    image: "/WOOD-PANNEL/1-CLASSIC WALNUT.png",
    color: "#5C3A1E",
  },
  {
    id: 2,
    name: "Dark Walnut",
    image: "/WOOD-PANNEL/2-DARK WALNUT.png",
    color: "#3B2210",
  },
  {
    id: 3,
    name: "Royal Teak",
    image: "/WOOD-PANNEL/3-ROYAL TEAK.jpg",
    color: "#8B5E3C",
  },
  {
    id: 4,
    name: "Natural Maple",
    image: "/WOOD-PANNEL/4-NATURAL MAPLE.jpg",
    color: "#C4A56E",
  },
  {
    id: 5,
    name: "Light Oak",
    image: "/WOOD-PANNEL/5-LIGHT OAK.jpg",
    color: "#D4B078",
  },
  {
    id: 6,
    name: "Golden Teak",
    image: "/WOOD-PANNEL/6-GOLDEN TEAK.jpg",
    color: "#A87D3E",
  },
  {
    id: 7,
    name: "Rustic Brown",
    image: "/WOOD-PANNEL/7-RUSTIC BROWN.png",
    color: "#6B4226",
  },
  {
    id: 8,
    name: "Coffee Brown",
    image: "/WOOD-PANNEL/8-COFFEE BROWN.jpg",
    color: "#4A2C17",
  },
  {
    id: 9,
    name: "Rich Mahogany",
    image: "/WOOD-PANNEL/9-RICH MAHOGANY.png",
    color: "#6B1C1C",
  },
  {
    id: 10,
    name: "Vintage Oak",
    image: "/WOOD-PANNEL/10-VINTAGE OAK.jpg",
    color: "#8C7254",
  },
  {
    id: 11,
    name: "Warm Chestnut",
    image: "/WOOD-PANNEL/11-WARM CHESTNUT.jpg",
    color: "#7B4B2A",
  },
  {
    id: 12,
    name: "Honey Teak",
    image: "/WOOD-PANNEL/12-HONEY TEAK.jpg",
    color: "#C08B3E",
  },
  {
    id: 13,
    name: "Natural Wood",
    image: "/WOOD-PANNEL/13-NATURAL WOOD.jpg",
    color: "#B8956A",
  },
  {
    id: 14,
    name: "Soft Maple",
    image: "/WOOD-PANNEL/14-SOFT MAPLE.png",
    color: "#E0C8A0",
  },
  {
    id: 15,
    name: "Smoky Walnut",
    image: "/WOOD-PANNEL/15-SMOKY WALNUT.png",
    color: "#5A4030",
  },
  {
    id: 16,
    name: "Desert Oak",
    image: "/WOOD-PANNEL/16-DESERT OAK.png",
    color: "#9E8060",
  },
  {
    id: 18,
    name: "Grey Ash",
    image: "/WOOD-PANNEL/18-GREY ASH.png",
    color: "#8A8A80",
  },
];

export default function WoodPanelVisualizer() {
  const [activePanel, setActivePanel] = useState(0);
  const current = WOOD_PANELS[activePanel];

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {/* Hero */}
      <section className="relative py-48 text-center overflow-hidden">
        <img
          src="/WOOD-PANNEL/wood.jpg"
          alt="Wood panels"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 " />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-white/30">
            Wood Panel Visualizer
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white leading-tight"
            style={{
              fontFamily: "var(--font-raleway), sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Visualize Your <span className="text-amber-300">Wood Finish</span>
          </h1>
          <p className="mt-3 text-white/70 text-[14px] max-w-md mx-auto">
            Select a wood panel shade below to see how it looks in real
            environments
          </p>
        </motion.div>
      </section>

      {/* Color selector strip */}
      <section className="sticky top-20 z-30 bg-[#f5f2ed]/95 backdrop-blur-md border-b border-stone-200/50 pt-3">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="flex items-center gap-5 overflow-x-auto pb-3"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d97706 #e7e5e4",
            }}
          >
            {WOOD_PANELS.map((panel, i) => (
              <button
                key={panel.id}
                onClick={() => setActivePanel(i)}
                className="flex flex-col items-center gap-2 shrink-0 group"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 transition-all shadow-md ${
                    activePanel === i
                      ? "border-amber-500 scale-110 shadow-xl shadow-amber-200/50"
                      : "border-stone-300 hover:border-stone-400 hover:scale-105"
                  }`}
                  style={{ background: panel.color }}
                ></div>
                <span
                  className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${
                    activePanel === i ? "text-amber-700" : "text-stone-500"
                  }`}
                >
                  {panel.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main visualizer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Large preview - Full panel image */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-auto min-h-[400px] sm:min-h-[480px]  object-cover"
                />

                {/* Panel name overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-4 py-2.5 bg-black/60 backdrop-blur-md rounded-xl">
                    <p className="text-white font-bold text-sm">
                      {current.name}
                    </p>
                    <p className="text-white/60 text-[11px]">
                      Wood Panel Finish
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img
                      src={current.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Panel details + more views */}
          <div className="space-y-4">
            {/* Selected panel info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-stone-200">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    className="text-[15px] font-bold text-stone-900"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    {current.name}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Panel #{current.id} of {WOOD_PANELS.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ background: current.color }}
                />
                <span className="text-xs font-mono text-stone-500">
                  {current.color.toUpperCase()}
                </span>
              </div>
              <Link
                href="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, #292524, #1c1917)",
                }}
              >
                Enquire About This Panel
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
            </div>

            {/* Close-up texture view */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 h-40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id + "-texture"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={current.image}
                  alt={`${current.name} texture`}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="relative -mt-8 px-3 pb-2">
                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white uppercase">
                  Close-up Texture
                </span>
              </div>
            </div>

            {/* Quick panel grid */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                Quick Select
              </p>
              <div className="grid grid-cols-5 gap-2">
                {WOOD_PANELS.slice(0, 10).map((panel, i) => (
                  <button
                    key={panel.id}
                    onClick={() => setActivePanel(i)}
                    className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${activePanel === i ? "border-amber-500 scale-105" : "border-stone-200 hover:border-stone-300"}`}
                  >
                    <img
                      src={panel.image}
                      alt={panel.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-[14px] shadow-lg shadow-stone-900/15 hover:shadow-xl transition-all"
            style={{
              background: "linear-gradient(135deg, #292524, #1c1917)",
              fontFamily: "var(--font-raleway), sans-serif",
            }}
          >
            Get Custom Wood Panel Quote
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
      </section>
    </div>
  );
}
