
"use client";

// components/home/LiveVisualizerPreview.tsx
// ─────────────────────────────────────────────────────────────────────────────
// The hero section of the paint visualizer website.
// Orchestrates: RoomCanvas + ColorPalette + FinishSelector + EnquiryModal
// Uses GSAP for scroll-triggered entrance + Framer Motion for micro-interactions
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import { PaintColor } from "@/lib/canvas-utils";
import { DEFAULT_COLOR } from "@/data/paint-colors";
import RoomCanvas, { RoomCanvasHandle } from "../Shared/RoomCanvas";
import FinishSelector from "../Shared/FinishSelector";
import ColorPalette from "../Shared/ColorPalette";
import EnquiryModal from "../Shared/EnquiryModal";

// Register GSAP plugin (safe in client component)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Config ────────────────────────────────────────────────────────────────────
// Replace these with your actual room image + mask image paths in /public/images/
const ROOM_IMAGE_URL = "/images/room.jpg";
const MASK_IMAGE_URL = "/images/wall-mask.jpg";

type Finish = "matte" | "satin" | "gloss";

export default function Visualizer2() {
  const [selectedColor, setSelectedColor] = useState<PaintColor>(DEFAULT_COLOR);
  const [finish, setFinish] = useState<Finish>("matte");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  const canvasRef = useRef<RoomCanvasHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ── GSAP scroll-triggered entrance animation ────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          canvasWrapRef.current,
          { opacity: 0, x: -50, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          panelRef.current,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleColorSelect = useCallback((color: PaintColor) => {
    setSelectedColor(color);
  }, []);

  const handleReset = useCallback(() => {
    canvasRef.current?.resetToOriginal();
    setSelectedColor(DEFAULT_COLOR);
  }, []);

  const handleExport = useCallback(() => {
    const dataUrl = canvasRef.current?.exportImage();
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `room-${selectedColor.name.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();
  }, [selectedColor]);

  return (
    <section
      ref={sectionRef}
      id="visualizer"
      className="relative py-20 bg-gradient-to-b from-stone-50 to-white overflow-hidden"
    >
      {/* ── Decorative background ────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-stone-200/60 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-12 opacity-0">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            Live Color Visualizer
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-stone-900 leading-tight">
            See It On Your Wall
            <br />
            <span className="text-amber-500">Before You Paint</span>
          </h2>
          <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto leading-relaxed">
            Pick any shade and watch your room transform in real time. No
            commitment, unlimited tries.
          </p>
        </div>

        {/* ── Main Layout: Canvas + Control Panel ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ── Left: Room Canvas ─────────────────────────────────────────── */}
          <div ref={canvasWrapRef} className="opacity-0">
            <RoomCanvas
              ref={canvasRef}
              roomImageUrl={ROOM_IMAGE_URL}
              maskImageUrl={MASK_IMAGE_URL}
              selectedColor={selectedColor}
              finish={finish}
              onLoad={() => setIsCanvasLoaded(true)}
              className="shadow-2xl shadow-stone-300/50"
            />

            {/* Canvas action bar */}
            <AnimatePresence>
              {isCanvasLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex items-center gap-3 flex-wrap"
                >
                  {/* Color chip */}
                  <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-2 shadow-sm">
                    <span
                      className="w-5 h-5 rounded-md border border-stone-200 flex-shrink-0"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span className="text-sm font-semibold text-stone-700">
                      {selectedColor.name}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      {selectedColor.hex.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    {/* Reset button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-stone-700 hover:border-stone-300 text-sm font-medium transition-colors shadow-sm"
                      title="Reset to original"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset
                    </motion.button>

                    {/* Download button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleExport}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-stone-700 hover:border-stone-300 text-sm font-medium transition-colors shadow-sm"
                      title="Save image"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Save
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Control Panel ──────────────────────────────────────── */}
          <div
            ref={panelRef}
            className="opacity-0 flex flex-col gap-6 bg-white rounded-3xl border border-stone-100 shadow-xl shadow-stone-100/80 p-6 lg:sticky lg:top-8"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-stone-800">
                Customize
              </h3>
              <span className="text-xs text-stone-400 font-medium bg-stone-50 px-2 py-1 rounded-full border border-stone-100">
                {selectedColor.family}
              </span>
            </div>

            {/* ── Finish Selector ─────────────────────────────────────────── */}
            <FinishSelector value={finish} onChange={setFinish} />

            {/* Divider */}
            <div className="h-px bg-stone-100" />

            {/* ── Color Palette ────────────────────────────────────────────── */}
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
                Paint Colors
              </p>
              <ColorPalette
                selectedColor={selectedColor}
                onColorSelect={handleColorSelect}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-stone-100" />

            {/* ── CTA Buttons ──────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-sm tracking-wide transition-colors shadow-lg shadow-amber-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Enquire for This Color
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="w-full py-3 border-2 border-stone-200 hover:border-amber-300 text-stone-600 hover:text-amber-600 font-semibold rounded-2xl text-sm tracking-wide transition-all"
              >
                Try Another Color
              </motion.button>
            </div>

            {/* ── Color info card ───────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{
                  backgroundColor: selectedColor.hex + "22",
                  border: `1.5px solid ${selectedColor.hex}44`,
                }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex-shrink-0 shadow-sm border-2 border-white"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-800 text-sm truncate">
                    {selectedColor.name}
                  </p>
                  <p className="text-xs text-stone-500 font-mono">
                    {selectedColor.hex.toUpperCase()} · {selectedColor.family}
                  </p>
                </div>
                <span className="text-xs font-semibold text-stone-400 capitalize flex-shrink-0">
                  {finish}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── How it works hint ──────────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-stone-400">
          {[
            { icon: "🎨", text: "Pick a color from the palette" },
            { icon: "✨", text: "Watch the wall change instantly" },
            { icon: "📋", text: "Submit enquiry to get pricing" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
              {i < 2 && (
                <span className="hidden sm:block ml-4 text-stone-200">→</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Enquiry Modal ───────────────────────────────────────────────── */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedColor={selectedColor}
      />
    </section>
  );
}