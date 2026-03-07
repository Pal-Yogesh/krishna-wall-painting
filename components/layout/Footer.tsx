"use client";

// components/layout/Footer.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Site Footer for KMOPL Paint Visualizer
//
// Design: Deep charcoal footer with warm amber accents. Four-column layout:
// Brand column (logo + tagline + social), Quick Links, Paint Colors preview,
// Contact & Hours. Bottom bar with legal links + paint swatch strip.
//
// Features:
//  - Animated paint swatch row (matching Navbar accent)
//  - Hover color-shift on social icons
//  - Mini color palette preview with cycling highlight
//  - Newsletter / WhatsApp CTA strip
//  - Responsive collapse to stacked layout
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",             href: "/"            },
  { label: "Paint Visualizer", href: "/#visualizer" },
  { label: "Color Collection", href: "/#colors"     },
  { label: "How It Works",     href: "/#how-it-works"},
  { label: "Why Choose Us",    href: "/#why-us"     },
  { label: "Get a Quote",      href: "/#enquiry"    },
];

const COLOR_LINKS = [
  { name: "Terracotta",    hex: "#C1623F", href: "/#colors" },
  { name: "Ocean Breeze",  hex: "#7BB8D4", href: "/#colors" },
  { name: "Sage Leaf",     hex: "#8FAF7E", href: "/#colors" },
  { name: "Velvet Plum",   hex: "#5C3A5E", href: "/#colors" },
  { name: "Golden Hour",   hex: "#D4A017", href: "/#colors" },
  { name: "Midnight Navy", hex: "#2C3E6B", href: "/#colors" },
  { name: "Dusty Rose",    hex: "#D4898A", href: "/#colors" },
  { name: "Hunter Green",  hex: "#355E3B", href: "/#colors" },
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/911111111111",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

const ACCENT_SWATCHES = [
  "#C1623F","#E8A87C","#D4A017","#8FAF7E","#7BB8D4","#5C3A5E",
  "#D4898A","#2C3E6B","#6D9E8C","#B8956A","#355E3B","#4A4A4A",
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",    href: "/privacy"    },
  { label: "Terms of Service",  href: "/terms"      },
  { label: "Cookie Policy",     href: "/cookies"    },
  { label: "Sitemap",           href: "/sitemap.xml"},
];

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "success">("idle");

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubStatus("success");
      setEmail("");
      setTimeout(() => setSubStatus("idle"), 3000);
    }
  };

  return (
    <footer
      style={{ background: "linear-gradient(180deg, #1c1917 0%, #171310 100%)" }}
      aria-label="Site footer"
    >
      {/* ── Paint swatch accent strip ────────────────────────────────── */}
      <div className="flex h-1.5 w-full overflow-hidden">
        {ACCENT_SWATCHES.map((color, i) => (
          <div
            key={i}
            className="flex-1 transition-all duration-300 hover:flex-[2]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* ── WhatsApp / CTA strip ─────────────────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#25D366" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white/80" style={{ fontFamily: "'Georgia', serif" }}>Chat with us on WhatsApp</p>
              <p className="text-xs text-white/35">Quick quotes, color advice & support</p>
            </div>
          </div>
          <a
            href="https://wa.me/911111111111?text=Hi%20KMOPL%2C%20I%20need%20help%20with%20paint%20colors"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 flex-shrink-0"
            style={{ background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.3)" }}
          >
            Chat Now →
          </a>
        </div>
      </div>

      {/* ── Main footer content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-12">

          {/* ── Col 1: Brand ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="white" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <span
                  className="text-xl font-black text-white leading-none block"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "0.04em" }}
                >
                  KMOPL
                </span>
                <span className="text-[10px] font-semibold text-white/30 tracking-[0.18em] uppercase block">
                  Paints & Colors
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed max-w-[260px]"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Georgia', serif" }}
            >
              Helping Indian homeowners visualise, choose and apply the perfect paint shade — since 2015.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 flex-wrap">
              {SOCIAL_LINKS.map(social => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: hoveredSocial === social.name ? social.color : "rgba(255,255,255,0.08)",
                    color: hoveredSocial === social.name ? "white" : "rgba(255,255,255,0.45)",
                    border: `1px solid ${hoveredSocial === social.name ? social.color : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-2.5">
                Color Inspiration in Your Inbox
              </p>
              <AnimatePresence mode="wait">
                {subStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "#4ade80" }}
                  >
                    <span className="text-base">✓</span> You're subscribed!
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                      className="flex-1 px-3.5 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={e => (e.target.style.borderColor = "rgba(217,119,6,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <button
                      onClick={handleSubscribe}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                    >
                      →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Col 2: Quick links ──────────────────────────────────── */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-6"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Georgia', serif" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-3"
                      style={{ background: "#d97706" }}
                    />
                    <span className="group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Color swatches ───────────────────────────────── */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-6"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Popular Shades
            </h4>
            <div className="flex flex-col gap-2.5">
              {COLOR_LINKS.map(color => (
                <Link
                  key={color.name}
                  href={color.href}
                  className="group flex items-center gap-3 transition-all duration-200"
                >
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 border-2 transition-all duration-200 group-hover:scale-110"
                    style={{ backgroundColor: color.hex, borderColor: "rgba(255,255,255,0.15)" }}
                  />
                  <span
                    className="text-sm transition-colors duration-200 group-hover:text-white"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Georgia', serif" }}
                  >
                    {color.name}
                  </span>
                </Link>
              ))}
              <Link
                href="/#colors"
                className="mt-1 text-xs font-bold transition-colors duration-200 hover:text-amber-400"
                style={{ color: "rgba(217,119,6,0.6)", fontFamily: "'Georgia', serif" }}
              >
                View all 36+ shades →
              </Link>
            </div>
          </div>

          {/* ── Col 4: Contact ───────────────────────────────────────── */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-6"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  ),
                  label: "Phone",
                  value: "+91 22222 22222",
                  href: "tel:+91222222222",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  ),
                  label: "Email",
                  value: "hello@kmopl.in",
                  href: "mailto:hello@kmopl.in",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  ),
                  label: "Address",
                  value: "Mumbai, Maharashtra, India",
                  href: null,
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(217,119,6,0.15)", color: "#d97706" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/25 mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm transition-colors duration-200 hover:text-amber-400"
                        style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Georgia', serif" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Georgia', serif" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Business hours */}
              <div
                className="mt-2 rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/25 mb-2.5">Business Hours</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { day: "Mon – Fri", time: "9:00 AM – 7:00 PM" },
                    { day: "Saturday",  time: "9:00 AM – 5:00 PM" },
                    { day: "Sunday",    time: "Closed" },
                  ].map(row => (
                    <div key={row.day} className="flex items-center justify-between gap-4">
                      <span className="text-xs text-white/35" style={{ fontFamily: "'Georgia', serif" }}>{row.day}</span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: row.time === "Closed" ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.55)", fontFamily: "'Georgia', serif" }}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Georgia', serif" }}
          >
            © {new Date().getFullYear()} KMOPL Paints & Colors. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {LEGAL_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs transition-colors duration-200 hover:text-amber-500"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Georgia', serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom paint swatch strip (mirror of top) ─────────────────── */}
      <div className="flex h-1 w-full overflow-hidden">
        {[...ACCENT_SWATCHES].reverse().map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
    </footer>
  );
}