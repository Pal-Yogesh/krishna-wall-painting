"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const WOOD_PANELS = [
  { id: 1, name: "Classic Walnut", image: "/WOOD-PANNEL/1-CLASSIC WALNUT.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0001.jpg", color: "#5C3A1E" },
  { id: 2, name: "Dark Walnut", image: "/WOOD-PANNEL/2-DARK WALNUT.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0002.jpg", color: "#3B2210" },
  { id: 3, name: "Royal Teak", image: "/WOOD-PANNEL/3-ROYAL TEAK.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0003.jpg", color: "#8B5E3C" },
  { id: 4, name: "Natural Maple", image: "/WOOD-PANNEL/4-NATURAL MAPLE.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0004.jpg", color: "#C4A56E" },
  { id: 5, name: "Light Oak", image: "/WOOD-PANNEL/5-LIGHT OAK.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0005.jpg", color: "#D4B078" },
  { id: 6, name: "Golden Teak", image: "/WOOD-PANNEL/6-GOLDEN TEAK.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0006.jpg", color: "#A87D3E" },
  { id: 7, name: "Rustic Brown", image: "/WOOD-PANNEL/7-RUSTIC BROWN.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0007.jpg", color: "#6B4226" },
  { id: 8, name: "Coffee Brown", image: "/WOOD-PANNEL/8-COFFEE BROWN.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0008.jpg", color: "#4A2C17" },
  { id: 9, name: "Rich Mahogany", image: "/WOOD-PANNEL/9-RICH MAHOGANY.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0009.jpg", color: "#6B1C1C" },
  { id: 10, name: "Vintage Oak", image: "/WOOD-PANNEL/10-VINTAGE OAK.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0010.jpg", color: "#8C7254" },
  { id: 11, name: "Warm Chestnut", image: "/WOOD-PANNEL/11-WARM CHESTNUT.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0011.jpg", color: "#7B4B2A" },
  { id: 12, name: "Honey Teak", image: "/WOOD-PANNEL/12-HONEY TEAK.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0012.jpg", color: "#C08B3E" },
  { id: 13, name: "Natural Wood", image: "/WOOD-PANNEL/13-NATURAL WOOD.jpg", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0013.jpg", color: "#B8956A" },
  { id: 14, name: "Soft Maple", image: "/WOOD-PANNEL/14-SOFT MAPLE.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0014.jpg", color: "#E0C8A0" },
  { id: 15, name: "Smoky Walnut", image: "/WOOD-PANNEL/15-SMOKY WALNUT.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0015.jpg", color: "#5A4030" },
  { id: 16, name: "Desert Oak", image: "/WOOD-PANNEL/16-DESERT OAK.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0016.jpg", color: "#9E8060" },
  { id: 18, name: "Grey Ash", image: "/WOOD-PANNEL/18-GREY ASH.png", swatch: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0018.jpg", color: "#8A8A80" },
];

const METAL_PANELS = [
  // { id: 1, name: "Antique Bronze", image: "/metal-panels/antique-bronze.png", cover: "/metal-panels/antique-bronze.png", color: "#8C6B3F" },
  // { id: 2, name: "Champagne Gold", image: "/metal-panels/champagne-gold.png", cover: "/metal-panels/champagne-gold.png", color: "#C9A96A" },
  // { id: 3, name: "Copper Brown", image: "/metal-panels/copper-brown.png", cover: "/metal-panels/copper-brown.png", color: "#8B4A2F" },
  // { id: 4, name: "Matte Black", image: "/metal-panels/matte-black.png", cover: "/metal-panels/matte-black.png", color: "#2B2B2B" },
  // { id: 5, name: "Peach Orange", image: "/metal-panels/peach-orange.png", cover: "/metal-panels/peach-orange.png", color: "#E8A87C" },
  { id: 16, name: "Red Wine",              image: "/metal-panels/red-wine.png",              cover: "/cover-photos/red-wine-pvd.jpg",         color: "#722F37" },
  { id: 6,  name: "Bronze PVD",            image: "/metal-panels/bronze-pvd.png",            cover: "/cover-photos/bronze-pvd.jpg",           color: "#7A5C2E" },
  { id: 7,  name: "Champagne Gold PVD",    image: "/metal-panels/champagne-gold-pvd.png",    cover: "/cover-photos/champagne-gold-pvd.jpg",   color: "#D4AF6A" },
  { id: 8,  name: "Copper PVD",            image: "/metal-panels/copper-pvd.png",            cover: "/cover-photos/copper-pvd.jpg",           color: "#B87333" },
  { id: 9,  name: "Emerald Green PVD",     image: "/metal-panels/emerald-green-pvd.png",     cover: "/cover-photos/emerald-green-pvd.jpg",    color: "#2E8B57" },
  { id: 10, name: "Gunmetal Grey PVD",     image: "/metal-panels/gunmetal-grey-pvd.png",     cover: "/cover-photos/gunmetal-grey-pvd.jpg",    color: "#4A4A4A" },
  { id: 11, name: "Matte Black PVD",       image: "/metal-panels/matte-black-pvd.png",       cover: "/cover-photos/matte-black-pvd.jpg",      color: "#1A1A1A" },
  { id: 12, name: "Orange Powder Coated",  image: "/metal-panels/orange-powder-coated.png",  cover: "/cover-photos/orange-powder-coated.jpg", color: "#E86B20" },
  { id: 13, name: "Rose Gold PVD",         image: "/metal-panels/rose-gold-pvd.png",         cover: "/cover-photos/rose-gold-pvd.jpg",        color: "#B76E79" },
  { id: 14, name: "Royal Blue PVD",        image: "/metal-panels/royal-blue-pvd.png",        cover: "/cover-photos/royal-blue-pvd.jpg",       color: "#1E3A8A" },
  { id: 15, name: "Titanium Silver PVD",   image: "/metal-panels/titanium-silver-pvd.png",   cover: "/cover-photos/titanium-silver-pvd.jpg",  color: "#A8A9AD" },
];

const GLASS_PANELS = [
  { id: 1,  name: "Amber Orange",    image: "/glass-copy/amber-orange.png",    cover: "/glass-small-circle/glaas-cover-images-0.jpg",  color: "#D2691E" },
  { id: 2,  name: "Amethyst Purple", image: "/glass-copy/amethyst-purple.png", cover: "/glass-small-circle/glaas-cover-images-1.jpg",  color: "#9966CC" },
  { id: 3,  name: "Aqua Blue",       image: "/glass-copy/aqua-blue.png",       cover: "/glass-small-circle/glaas-cover-images-2.jpg",  color: "#00CED1" },
  { id: 4,  name: "Champagne Gold",  image: "/glass-copy/champagne-gold.png",  cover: "/glass-small-circle/glaas-cover-images-3.jpg",  color: "#D4AF6A" },
  { id: 5,  name: "Copper",          image: "/glass-copy/copper.png",          cover: "/glass-small-circle/glaas-cover-images-4.jpg",  color: "#B87333" },
  { id: 6,  name: "Crystal Clear",   image: "/glass-copy/crystal-clear.png",   cover: "/glass-small-circle/glaas-cover-images-5.jpg",  color: "#E8E8E8" },
  { id: 7,  name: "Emerald Green",   image: "/glass-copy/emerald-green.png",   cover: "/glass-small-circle/glaas-cover-images-6.jpg",  color: "#2E8B57" },
  { id: 8,  name: "Jet Black",       image: "/glass-copy/jet-black.png",       cover: "/glass-small-circle/glaas-cover-images-7.jpg",  color: "#1A1A1A" },
  { id: 9,  name: "Olive Gold",      image: "/glass-copy/olive-gold.png",      cover: "/glass-small-circle/glaas-cover-images-8.jpg",  color: "#808000" },
  { id: 10, name: "Royal Blue",      image: "/glass-copy/royal-blue.png",      cover: "/glass-small-circle/glaas-cover-images-9.jpg",  color: "#1E3A8A" },
  { id: 11, name: "Ruby Red",        image: "/glass-copy/ruby-red.png",        cover: "/glass-small-circle/glaas-cover-images-10.jpg", color: "#9B111E" },
  { id: 12, name: "Smoke Grey",      image: "/glass-copy/smoke-grey.png",      cover: "/glass-small-circle/glaas-cover-images-11.jpg", color: "#6B6B6B" },
];

export default function WoodPanelVisualizer() {
  const [activePanel, setActivePanel] = useState(0);
  const current = WOOD_PANELS[activePanel];
  const [activeMetal, setActiveMetal] = useState(0);
  const currentMetal = METAL_PANELS[activeMetal];
  const [activeGlass, setActiveGlass] = useState(0);
  const currentGlass = GLASS_PANELS[activeGlass];

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {/* Hero */}
      <section className="relative h-[80vh] text-center overflow-hidden flex items-center justify-center">
        <img
          src="/wood-hero.jpeg"
          alt="Wood panels"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-white/30">
            Wood Panel Visualizer
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-black leading-tight bg-white/20 backdrop-blur-sm"
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

      {/* ═══ WOOD VISUALIZER (scoped sticky) ═══ */}
      <div className="relative">
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
                >
                  <img src={panel.swatch} alt={panel.name} className="w-full h-full object-cover" />
                </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Large preview - Full panel image with color-morph effect */}
          <div className="lg:col-span-2 lg:sticky lg:top-44 self-start">
            <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[400px] sm:min-h-[480px]">
              {/* Stack all images, only the active one is visible */}
              {WOOD_PANELS.map((panel, i) => (
                <motion.img
                  key={panel.id}
                  src={panel.image}
                  alt={panel.name}
                  initial={false}
                  animate={{ opacity: activePanel === i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}

              {/* Panel name overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
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
            </div>
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
            <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 h-40 relative">
              {WOOD_PANELS.map((panel, i) => (
                <motion.img
                  key={panel.id + "-texture"}
                  initial={false}
                  animate={{ opacity: activePanel === i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  src={panel.image}
                  alt={`${panel.name} texture`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
              <div className="absolute bottom-0 left-0 px-3 pb-2 z-10">
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
      </div>
      {/* ═══════════════ METAL PANEL VISUALIZER ═══════════════ */}
      <section className="border-t border-stone-200/70">
        {/* Metal hero banner */}
        <div className="relative h-[80vh] overflow-hidden flex items-center justify-center">
          <img
            src="/metal-panels/metal-visualizer.jpg"
            alt="Metal coating panels"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-center px-4"
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-white/30">
              Metal Panel Visualizer
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}
            >
              Visualize Your <span className="text-amber-300">Metal Finish</span>
            </h2>
            <p className="mt-3 text-white/75 text-[14px] max-w-md mx-auto">
              Select a metal coating shade below to preview the finish in real environments
            </p>
          </motion.div> 
        </div>

        {/* Metal selector strip */}
        <div className="sticky top-20 z-30 bg-[#f5f2ed]/95 backdrop-blur-md border-b border-stone-200/50 mt-6 pt-3">
          <div className="max-w-6xl mx-auto px-4">
            <div
              className="flex items-center gap-5 pb-3 overflow-x-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d97706 #e7e5e4",
              }}
            >
              {METAL_PANELS.map((panel, i) => (
                <button
                  key={panel.id}
                  onClick={() => setActiveMetal(i)}
                  className="flex flex-col items-center gap-2 shrink-0 group"
                >
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 transition-all shadow-md ${
                      activeMetal === i
                        ? "border-amber-500 scale-110 shadow-xl shadow-amber-200/50"
                        : "border-stone-300 hover:border-stone-400 hover:scale-105"
                    }`}
                  >
                    <img src={panel.cover} alt={panel.name} className="w-full h-full object-cover" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      activeMetal === i ? "text-amber-700" : "text-stone-500"
                    }`}
                  >
                    {panel.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metal main visualizer */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            {/* Large preview with color-morph effect */}
            <div className="lg:col-span-2 lg:sticky lg:top-44 self-start">
              <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[400px] sm:min-h-[480px] bg-stone-100">
                {METAL_PANELS.map((panel, i) => (
                  <motion.img
                    key={panel.id}
                    src={panel.image}
                    alt={panel.name}
                    initial={false}
                    animate={{ opacity: activeMetal === i ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="px-4 py-2.5 bg-black/60 backdrop-blur-md rounded-xl">
                    <p className="text-white font-bold text-sm">{currentMetal.name}</p>
                    <p className="text-white/60 text-[11px]">Metal Coating Finish</p>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img src={currentMetal.cover} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side details */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-stone-200">
                    <img src={currentMetal.image} alt={currentMetal.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      {currentMetal.name}
                    </h3>
                    <p className="text-xs text-stone-400">Panel #{currentMetal.id} of {METAL_PANELS.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-4 h-4 rounded-full" style={{ background: currentMetal.color }} />
                  <span className="text-xs font-mono text-stone-500">{currentMetal.color.toUpperCase()}</span>
                </div>
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  style={{ background: "linear-gradient(135deg, #292524, #1c1917)" }}
                >
                  Enquire About This Panel
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Close-up view */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 h-40 relative bg-stone-100">
                {METAL_PANELS.map((panel, i) => (
                  <motion.img
                    key={panel.id + "-texture"}
                    initial={false}
                    animate={{ opacity: activeMetal === i ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    src={panel.image}
                    alt={`${panel.name} texture`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
                <div className="absolute bottom-0 left-0 px-3 pb-2 z-10">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white uppercase">
                    Close-up Finish
                  </span>
                </div>
              </div>

              {/* Quick select */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Quick Select</p>
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#d97706 #e7e5e4" }}>
                  {METAL_PANELS.map((panel, i) => (
                    <button
                      key={panel.id}
                      onClick={() => setActiveMetal(i)}
                      className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeMetal === i ? "border-amber-500 scale-105" : "border-stone-200 hover:border-stone-300"}`}
                    >
                      <img src={panel.cover} alt={panel.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* ═══ GLASS VISUALIZER (scoped sticky) ═══ */}
      <section className="relative">
        {/* Glass banner */}
        <div className="relative h-[80vh] overflow-hidden">
          <img src="/glass/glass-visualizer-banner.jpeg" alt="Glass Coatings" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-3 border border-white/30">
                Glass Coating Visualizer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                Glass <span className="text-cyan-300">Finish</span> Collection
              </h2>
            </div>
          </div>
        </div>

        {/* Glass selector strip */}
        <div className="sticky top-20 z-30 bg-[#f5f2ed]/95 backdrop-blur-md border-b border-stone-200/50 mt-6 pt-3">
          <div className="max-w-6xl mx-auto px-4">
            <div
              className="flex items-center gap-5 overflow-x-auto pb-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#d97706 #e7e5e4" }}
            >
              {GLASS_PANELS.map((panel, i) => (
                <button
                  key={panel.id}
                  onClick={() => setActiveGlass(i)}
                  className="flex flex-col items-center gap-2 shrink-0 group"
                >
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 transition-all shadow-md ${
                      activeGlass === i
                        ? "border-cyan-500 scale-110 shadow-xl shadow-cyan-200/50"
                        : "border-stone-300 hover:border-stone-400 hover:scale-105"
                    }`}
                  >
                    <img src={panel.cover} alt={panel.name} className="w-full h-full object-cover" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      activeGlass === i ? "text-cyan-700" : "text-stone-500"
                    }`}
                  >
                    {panel.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Glass main visualizer */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            {/* Large preview with color-morph effect */}
            <div className="lg:col-span-2 lg:sticky lg:top-44 self-start">
              <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[400px] sm:min-h-[480px] bg-stone-100">
                {GLASS_PANELS.map((panel, i) => (
                  <motion.img
                    key={panel.id}
                    src={panel.image}
                    alt={panel.name}
                    initial={false}
                    animate={{ opacity: activeGlass === i ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="px-4 py-2.5 bg-black/60 backdrop-blur-md rounded-xl">
                    <p className="text-white font-bold text-sm">{currentGlass.name}</p>
                    <p className="text-white/60 text-[11px]">Glass Coating Finish</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg" style={{ background: currentGlass.color }} />
                </div>
              </div>

           
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-4">
              {/* Info card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-stone-200">
                    <img src={currentGlass.cover} alt={currentGlass.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      {currentGlass.name}
                    </h3>
                    <p className="text-xs text-stone-400">Panel #{currentGlass.id} of {GLASS_PANELS.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-4 h-4 rounded-full" style={{ background: currentGlass.color }} />
                  <span className="text-xs font-mono text-stone-500">{currentGlass.color.toUpperCase()}</span>
                </div>
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  style={{ background: "linear-gradient(135deg, #0891b2, #0e7490)" }}
                >
                  Enquire About This Panel
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Close-up view */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 h-40 relative bg-stone-100">
                  {GLASS_PANELS.map((panel, i) => (
                    <motion.img
                      key={panel.id + "-closeup"}
                      initial={false}
                      animate={{ opacity: activeGlass === i ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      src={panel.image}
                      alt={`${panel.name} close-up`}
                      className="absolute inset-0 w-full h-full object-cover scale-150"
                    />
                  ))}
                  <div className="absolute bottom-0 left-0 px-3 pb-2 z-10">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white uppercase">
                      Close-up Finish
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 h-40 relative bg-stone-100">
                  {GLASS_PANELS.map((panel, i) => (
                    <motion.img
                      key={panel.id + "-detail"}
                      initial={false}
                      animate={{ opacity: activeGlass === i ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      src={panel.image}
                      alt={`${panel.name} detail`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  ))}
                </div>
              </div>

              {/* Quick select */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Quick Select</p>
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#d97706 #e7e5e4" }}>
                  {GLASS_PANELS.map((panel, i) => (
                    <button
                      key={panel.id}
                      onClick={() => setActiveGlass(i)}
                      className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeGlass === i ? "border-cyan-500 scale-105" : "border-stone-200 hover:border-stone-300"}`}
                    >
                      <img src={panel.cover} alt={panel.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
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
