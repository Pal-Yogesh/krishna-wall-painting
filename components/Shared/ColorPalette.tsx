"use client";

// components/shared/ColorPalette.tsx
// Reusable color swatch picker with family filter tabs and animated selection

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaintColor } from "@/lib/canvas-utils";
import { PAINT_COLORS, COLOR_FAMILIES } from "@/data/paint-colors";

interface ColorPaletteProps {
    selectedColor: PaintColor | null;
    onColorSelect: (color: PaintColor) => void;
    className?: string;
}

export default function ColorPalette({
    selectedColor,
    onColorSelect,
    className = "",
}: ColorPaletteProps) {
    const [activeFamily, setActiveFamily] = useState<string>("All");
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const filteredColors =
        activeFamily === "All"
            ? PAINT_COLORS
            : PAINT_COLORS.filter((c) => c.family === activeFamily);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent, color: PaintColor) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onColorSelect(color);
            }
        },
        [onColorSelect]
    );

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {/* ── Family Filter Tabs ─────────────────────────────────────── */}
            <div className="flex flex-wrap gap-2">
                {COLOR_FAMILIES.map((family) => (
                    <button
                        key={family}
                        onClick={() => setActiveFamily(family)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border ${activeFamily === family
                                ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-200"
                                : "bg-white border-stone-200 text-stone-500 hover:border-amber-300 hover:text-amber-600"
                            }`}
                    >
                        {family}
                    </button>
                ))}
            </div>

            {/* ── Color Swatches Grid ────────────────────────────────────── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFamily}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2"
                    role="listbox"
                    aria-label="Paint color swatches"
                >
                    {filteredColors.map((color) => {
                        const isSelected = selectedColor?.id === color.id;
                        const isHovered = hoveredId === color.id;

                        return (
                            <motion.button
                                key={color.id}
                                role="option"
                                aria-selected={isSelected}
                                aria-label={`${color.name} - ${color.hex}`}
                                onClick={() => onColorSelect(color)}
                                onKeyDown={(e) => handleKeyDown(e, color)}
                                onMouseEnter={() => setHoveredId(color.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ scale: 1.15, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="relative aspect-square rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                                style={{ backgroundColor: color.hex }}
                            >
                                {/* Selection ring */}
                                {isSelected && (
                                    <motion.span
                                        layoutId="swatch-ring"
                                        className="absolute inset-0 rounded-xl ring-2 ring-offset-2 ring-amber-500"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}

                                {/* Checkmark for selected */}
                                {isSelected && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <svg
                                            className="w-3 h-3 drop-shadow-lg"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 6l3 3 5-5"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </motion.span>
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* ── Hover / Selected Color Info ────────────────────────────── */}
            <AnimatePresence mode="wait">
                {(hoveredId || selectedColor) && (
                    <motion.div
                        key={hoveredId ?? selectedColor?.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100"
                    >
                        {(() => {
                            const color =
                                PAINT_COLORS.find((c) => c.id === (hoveredId ?? selectedColor?.id)) ??
                                null;
                            if (!color) return null;
                            return (
                                <>
                                    <span
                                        className="w-10 h-10 rounded-lg border border-stone-200 shadow-sm flex-shrink-0"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-bold text-stone-800 truncate">
                                            {color.name}
                                        </span>
                                        <span className="text-xs text-stone-400 font-mono">
                                            {color.hex.toUpperCase()} · {color.family}
                                        </span>
                                    </div>
                                    {hoveredId && hoveredId !== selectedColor?.id && (
                                        <span className="ml-auto text-xs text-amber-500 font-medium flex-shrink-0">
                                            Click to apply
                                        </span>
                                    )}
                                    {selectedColor?.id === (hoveredId ?? selectedColor?.id) && (
                                        <span className="ml-auto text-xs text-green-600 font-semibold flex-shrink-0 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Applied
                                        </span>
                                    )}
                                </>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}