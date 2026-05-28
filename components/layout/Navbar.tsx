"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { label: "Home",        href: "/",              sectionId: "" },
  { label: "Products",    href: "/products",      sectionId: "" },
  { label: "Visualizer",  href: "/visualizer",    sectionId: "" },
  // { label: "Colors",      href: "/visualizer#colors", sectionId: "" },
  { label: "About Us",    href: "/about",        sectionId: "about" },
  // { label: "Contact",     href: "/contact-us", sectionId: "" },
];

const SECTION_IDS = ["about"];

const ACCENT_COLORS = [
  "#C1623F","#D4A017","#7BB8D4","#8FAF7E",
  "#5C3A5E","#1A6B73","#D4898A","#2C3E6B",
  "#A0522D","#355E3B","#C48B9F","#4A4A4A",
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Scroll detection for frosted glass effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver scroll-spy: track which section is in view
  useEffect(() => {
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    // Small delay to let DOM render
    const timer = setTimeout(() => {
      const visibleSections = new Map<string, boolean>();

      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              visibleSections.set(id, entry.isIntersecting);
            });

            // Find the first visible section in DOM order
            const current = SECTION_IDS.find((sid) => visibleSections.get(sid));
            if (current) {
              setActiveSection(current);
            } else {
              // If no section is visible, check if we're at the top
              if (window.scrollY < 200) {
                setActiveSection("");
              }
            }
          },
          { threshold: 0.15, rootMargin: "-80px 0px -40% 0px" }
        );

        observer.observe(el);
        observers.push(observer);
      });
    }, 300);

    // Also handle scroll to top = Home active
    const onScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // When user clicks a nav link, immediately set active
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const isLinkActive = (link: typeof NAV_LINKS[number]) => {
    // For hash-only links on the home page, use scroll-spy
    if (link.sectionId && pathname === "/") {
      return activeSection === link.sectionId;
    }
    // Home link: active when on "/" and no section is active
    if (link.href === "/" && link.sectionId === "") {
      return pathname === "/" && activeSection === "";
    }
    // For route-based links, match pathname
    const linkPath = link.href.split("#")[0];
    if (linkPath && linkPath !== "/") {
      return pathname === linkPath;
    }
    return false;
  };

  const isHomePage = pathname === "/";
  // On homepage: hide navbar at top (video plays), show on scroll
  // On other pages: always show navbar
  const showNavbar = isHomePage ? isScrolled : true;

  return (
    <>
      {/* Color dot accent strip */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex h-1 overflow-hidden transition-all duration-500 ${showNavbar ? "opacity-100" : "opacity-0 -translate-y-full"}`} aria-hidden>
        {ACCENT_COLORS.map((color, i) => (
          <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* Main Navbar */}
      <motion.nav
        ref={navRef}
        initial={isHomePage ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={showNavbar ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-40 pt-1
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
          <div className="flex items-center justify-between h-18 lg:h-20">

            {/* Logo */}
            <Link href="/" onClick={() => handleNavClick("")} className="shrink-0">
              <Image src="/logo.png" alt="KMOPL Logo" className="w-28 h-16 object-contain" width={1000} height={1000} />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1.5">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.sectionId)}
                    className="relative px-4 py-2 group"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-xl bg-amber-50"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {!active && (
                      <span className="absolute inset-0 rounded-xl group-hover:bg-stone-50 transition-colors" />
                    )}

                    <span
                      className={`
                        relative text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-200
                        ${active ? "text-amber-600" : "text-stone-700 group-hover:text-stone-900"}
                      `}
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {link.label}
                    </span>

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

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact-us"
                  onClick={() => handleNavClick("")}
                  className="
                    flex items-center gap-2 px-6 py-2.5 rounded-xl
                    bg-stone-900 text-white text-[13px] font-bold tracking-wide
                    shadow-md shadow-stone-900/20
                    hover:shadow-lg hover:bg-stone-800
                    transition-all duration-200
                  "
                >
                  Contact Us
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Mobile: CTA pill + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/contact-us"
                onClick={() => handleNavClick("")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold shadow-sm"
              >
                Get Quote
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            />

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
                  <div className="w-8 h-8 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
                      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
                    </svg>
                  </div>
                  <span className="font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>Krishna Paints</span>
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
                  const active = isLinkActive(link);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => handleNavClick(link.sectionId)}
                        className={`
                          flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-150
                          ${active
                            ? "bg-amber-50 text-amber-700"
                            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                          }
                        `}
                      >
                        {active && <span className="w-1 h-5 rounded-full bg-amber-500 shrink-0" />}
                        {!active && <span className="w-1 h-5 shrink-0" />}
                        <span className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-4 pb-6 pt-4 border-t border-stone-100 flex flex-col gap-3">
                <Link
                  href="/contact-us"
                  onClick={() => handleNavClick("")}
                  className="
                    flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl
                    bg-linear-to-r from-amber-500 to-amber-600
                    text-white font-bold text-sm tracking-wide
                    shadow-md shadow-amber-200
                  "
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Contact Us
                </Link>

                <Link
                  href="/products"
                  onClick={() => handleNavClick("")}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-stone-200 text-stone-600 font-semibold text-sm hover:bg-stone-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                  Explore Products
                </Link>

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

      {/* Spacer - always on non-home pages, only when scrolled on home */}
      {showNavbar && <div className="h-[85px] lg:h-[90px]" aria-hidden />}
    </>
  );
}
