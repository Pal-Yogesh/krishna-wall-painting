"use client";

// components/layout/Navbar.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Sticky navbar with:
//  - Transparent → frosted glass on scroll (GSAP ScrollTrigger)
//  - Animated underline nav links (Framer Motion)
//  - Mobile slide-in drawer (Framer Motion)
//  - Color dot accent strip at the very top
//  - "Try Visualizer" CTA with paint-brush icon
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Nav links config ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Visualizer", href: "/#visualizer" },
  { label: "Colors",     href: "/#colors" },
  { label: "Inspiration",href: "/#inspiration" },
  { label: "Contact",    href: "/#contact" },
];

// ── Color accent dots (decorative top strip) ──────────────────────────────────
const ACCENT_COLORS = [
  "#C1623F","#D4A017","#7BB8D4","#8FAF7E",
  "#5C3A5E","#1A6B73","#D4898A","#2C3E6B",
  "#A0522D","#355E3B","#C48B9F","#4A4A4A",
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeHash, setActiveHash]     = useState("");
  const navRef   = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // ── GSAP: detect scroll to toggle frosted glass ───────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Track active hash for link highlighting ───────────────────────────────
  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // ── Close mobile menu on route change ─────────────────────────────────────
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/" && !activeHash;
    return href.includes("#") ? activeHash === href.split("#")[1] ? true : false : pathname === href;
  };

  return (
    <>
      {/* ── Color dot accent strip ─────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex h-1 overflow-hidden"
        aria-hidden
      >
        {ACCENT_COLORS.map((color, i) => (
          <div
            key={i}
            className="flex-1 h-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* ── Main Navbar ───────────────────────────────────────────────── */}
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-1 left-0 right-0 z-40
          transition-all duration-300 ease-out
          ${isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_32px_rgba(0,0,0,0.08)] border-b border-stone-100/80"
            : "bg-[#FFFAFA]"
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* ── Logo ────────────────────────────────────────────────── */}
            <Link href="/" className=" mt-[5%]">
              {/* Logo mark */}
            

     
                <Image src="/logo.png" alt="Logo" className="w-60 h-[200px] object-cover" width={1000} height={1000} />
            </Link>

            {/* ── Desktop Nav Links ────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 group"
                  >
                    {/* Hover/active background pill */}
                    <motion.span
                      className={`
                        absolute inset-0 rounded-xl transition-colors
                        ${active ? "bg-amber-50" : "group-hover:bg-stone-50"}
                      `}
                      layoutId={active ? "nav-active-bg" : undefined}
                    />

                    {/* Link text */}
                    <span
                      className={`
                        relative text-[13.5px] font-semibold tracking-wide transition-colors duration-200
                        ${active ? "text-amber-600" : "text-stone-600 group-hover:text-stone-900"}
                      `}
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {link.label}
                    </span>

                    {/* Active dot indicator */}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Desktop CTA + Phone ─────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Phone number */}
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-amber-50 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold tracking-wide">+91 XXXXX XXXXX</span>
              </a>

              {/* Divider */}
              <div className="w-px h-5 bg-stone-200" />

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/#visualizer"
                  className="
                    flex items-center gap-2 px-5 py-2.5 rounded-2xl
                    bg-gradient-to-r from-amber-500 to-amber-600
                    text-white text-[13px] font-bold tracking-wide
                    shadow-md shadow-amber-200
                    hover:shadow-lg hover:shadow-amber-300
                    hover:from-amber-600 hover:to-amber-700
                    transition-all duration-200
                  "
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.88V15.12a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Try Visualizer
                </Link>
              </motion.div>
            </div>

            {/* ── Mobile: CTA pill + Hamburger ────────────────────────── */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/#visualizer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-sm shadow-amber-200"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Colors
              </Link>

              <button
                onClick={() => setIsMobileOpen((v) => !v)}
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex flex-col items-center justify-center gap-1 transition-colors"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
              >
                <motion.span
                  animate={isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block w-4 h-0.5 bg-stone-700 rounded-full origin-center"
                />
                <motion.span
                  animate={isMobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-4 h-0.5 bg-stone-700 rounded-full"
                />
                <motion.span
                  animate={isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block w-4 h-0.5 bg-stone-700 rounded-full origin-center"
                />
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
                      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
                    </svg>
                  </div>
                  <span className="font-black text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>KMOPL Paints</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isLinkActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-150
                          ${active
                            ? "bg-amber-50 text-amber-700"
                            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                          }
                        `}
                      >
                        {/* Active indicator bar */}
                        {active && (
                          <span className="w-1 h-5 rounded-full bg-amber-500 flex-shrink-0" />
                        )}
                        {!active && <span className="w-1 h-5 flex-shrink-0" />}
                        <span
                          className="text-[15px] font-semibold"
                          style={{ fontFamily: "'Georgia', serif" }}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer — CTA + contact */}
              <div className="px-4 pb-6 pt-4 border-t border-stone-100 flex flex-col gap-3">
                <Link
                  href="/#visualizer"
                  onClick={() => setIsMobileOpen(false)}
                  className="
                    flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl
                    bg-gradient-to-r from-amber-500 to-amber-600
                    text-white font-bold text-sm tracking-wide
                    shadow-md shadow-amber-200
                  "
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.88V15.12a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Try Visualizer Free
                </Link>

                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-stone-200 text-stone-600 font-semibold text-sm hover:bg-stone-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us Now
                </a>

                {/* Color swatches decorative strip in drawer */}
                <div className="flex rounded-xl overflow-hidden h-2 mt-1">
                  {ACCENT_COLORS.map((color, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Spacer so page content clears the navbar ──────────────────── */}
      <div className="h-[65px] lg:h-[73px]" aria-hidden />
    </>
  );
}