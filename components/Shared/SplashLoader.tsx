"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white overflow-hidden"
          >
            {/* Ambient glow blobs */}
            <div className="absolute w-72 h-72 rounded-full bg-amber-500/20 blur-[100px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-orange-400/15 blur-[80px] animate-pulse delay-500" />
            <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-yellow-400/10 blur-[90px] animate-pulse delay-1000" />

            {/* Paint drops animation */}
            <div className="relative mb-10">
              <div className="flex gap-3">
                {["#f59e0b", "#ef4444", "#3b82f6", "#22c55e", "#a855f7"].map((color, i) => (
                  <motion.div
                    key={color}
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{
                      y: [0, -28, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Logo / Brand */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                <Image src="/logo.png" width={1000} height={1000} alt="logo" className="w-80 h-80 mt-[65px] object-cover"/>
              </div>
              <h1 className="text-2xl font-bold text-black tracking-tight">Krishna Paints</h1>
              <p className="text-stone-500 text-sm mt-1">The Brand of India</p>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-10 w-48 h-1 bg-stone-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444, #3b82f6, #22c55e, #a855f7)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        {children}
      </div>
    </>
  );
}
