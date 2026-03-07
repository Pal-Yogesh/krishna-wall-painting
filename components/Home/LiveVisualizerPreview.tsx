"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PaintVisualizer from "../Shared/PaintVisualizer";
import VisualizerControlPanel from "../Shared/VisualizerControlPanel";
import EnquiryModal from "../Shared/EnquiryModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LiveVisualizerPreview() {
  const [selectedColor, setSelectedColor] = useState("#B8D4E8");
  const [selectedFinish, setSelectedFinish] = useState("matte");
  const [selectedWall, setSelectedWall] = useState("back");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setSelectedColor("#B8D4E8");
    setSelectedFinish("matte");
  };

  const handleExport = () => {
    // Create a canvas snapshot from the visualizer for download
    const visualizerEl = visualizerRef.current?.querySelector("img");
    if (!visualizerEl) return;
    const link = document.createElement("a");
    link.download = `room-${selectedColor.replace("#", "")}.png`;
    // For SVG-based visualizer, use html2canvas or similar in production
    // For now this is a placeholder
    link.href = "#";
    link.click();
  };

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
      ).fromTo(
        visualizerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Build a minimal PaintColor object for the enquiry modal
  const enquiryColor = {
    id: "custom",
    name: selectedColor.toUpperCase(),
    hex: selectedColor,
    family: "Custom",
  };

  return (
    <section
      ref={sectionRef}
      id="visualizer"
      className="relative py-20 bg-gradient-to-b from-stone-50 to-white"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-stone-200/60 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
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
            Pick any shade and watch your room transform in real time. No commitment, unlimited tries.
          </p>
        </div>

        {/* Main Layout: Visualizer (sticky) + Control Panel (scrollable) */}
        <div
          ref={visualizerRef}
          className="opacity-0 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start"
        >
          {/* Left: Visualizer (sticky) */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-2xl shadow-stone-300/50" style={{ height: "65vh", maxHeight: "600px" }}>
              <PaintVisualizer
                color={selectedColor}
                finish={selectedFinish}
                selectedWall={selectedWall}
                onWallChange={setSelectedWall}
              />
            </div>

            {/* Action bar (Reset + Save) */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              {/* Color chip */}
              <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-2 shadow-sm">
                <span
                  className="w-5 h-5 rounded-md border border-stone-200 shrink-0"
                  style={{ backgroundColor: selectedColor }}
                />
                <span className="text-xs font-mono text-stone-400">
                  {selectedColor.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 ml-auto">
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
            </div>
          </div>

          {/* Right: Control Panel (natural height, page scrolls, left stays sticky) */}
          <div
            className="flex flex-col bg-white rounded-3xl border border-stone-100 shadow-xl shadow-stone-100/80"
          >
            <VisualizerControlPanel
              selectedColor={selectedColor}
              selectedFinish={selectedFinish}
              selectedWall={selectedWall}
              onColorChange={setSelectedColor}
              onFinishChange={setSelectedFinish}
              onWallChange={setSelectedWall}
              onEnquire={() => setIsEnquiryOpen(true)}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* How it works hint */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-stone-400">
          {[
            { icon: "🎨", text: "Pick any color from the picker" },
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
              {i < 2 && <span className="hidden sm:block ml-4 text-stone-200">→</span>}
            </motion.div>
          ))}
        </div>
      </div>

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedColor={enquiryColor}
      />
    </section>
  );
}