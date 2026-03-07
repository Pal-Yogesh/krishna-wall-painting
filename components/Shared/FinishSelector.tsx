"use client";

// components/shared/FinishSelector.tsx
// Toggle between Matte / Satin / Gloss finish types with animated indicator

import React from "react";
import { motion } from "framer-motion";

type Finish = "matte" | "satin" | "gloss";

interface FinishSelectorProps {
  value: Finish;
  onChange: (finish: Finish) => void;
  className?: string;
}

const FINISHES: { value: Finish; label: string; description: string; icon: string }[] = [
  {
    value: "matte",
    label: "Matte",
    description: "No shine, flat look",
    icon: "▪",
  },
  {
    value: "satin",
    label: "Satin",
    description: "Soft subtle sheen",
    icon: "◈",
  },
  {
    value: "gloss",
    label: "Gloss",
    description: "High shine, reflective",
    icon: "◉",
  },
];

export default function FinishSelector({
  value,
  onChange,
  className = "",
}: FinishSelectorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
        Surface Finish
      </p>
      <div className="relative flex bg-stone-100 rounded-xl p-1 gap-1">
        {FINISHES.map((finish) => {
          const isActive = value === finish.value;
          return (
            <button
              key={finish.value}
              onClick={() => onChange(finish.value)}
              className={`relative flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg text-center transition-colors duration-200 z-10 ${
                isActive ? "text-stone-800" : "text-stone-400 hover:text-stone-600"
              }`}
              aria-pressed={isActive}
              title={finish.description}
            >
              {isActive && (
                <motion.span
                  layoutId="finish-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative text-base leading-none">{finish.icon}</span>
              <span className="relative text-xs font-bold tracking-wide leading-none">
                {finish.label}
              </span>
              <span className="relative text-[10px] text-stone-400 leading-tight hidden sm:block">
                {finish.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}