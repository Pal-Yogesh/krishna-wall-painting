"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const FONT = { fontFamily: "var(--font-raleway), sans-serif" };

interface GalleryImage { url: string; name: string; }
interface EventItem {
  id: string;
  title: string;
  location?: string;
  eventDate?: string;
  description?: string;
  coverImage?: string;
  gallery: GalleryImage[];
  active?: boolean;
}

function EventGallery({ images, title, onOpen }: { images: GalleryImage[]; title: string; onOpen: (idx: number) => void }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  React.useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => { el?.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, [images]);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="flex-1 relative min-w-0">
      {/* Left arrow */}
      {canLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {/* Right arrow */}
      {canRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      <div ref={scrollRef} className="flex gap-2.5 overflow-x-auto scrollbar-hide scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-xl cursor-pointer group shrink-0 w-[200px] h-[150px]"
            onClick={() => onOpen(idx)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.name || `${title} ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events?active=true");
        const data = await res.json();
        setEvents(data.events || []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((lb) => lb && ({ ...lb, index: (lb.index + 1) % lb.images.length }));
      if (e.key === "ArrowLeft") setLightbox((lb) => lb && ({ ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #fff8ee 0%, #fefdfb 50%, #faf9f7 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: ORANGE }}>Our Events</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight" style={FONT}>
              Moments & <span style={{ color: ORANGE }}>Milestones</span>
            </h1>
            <p className="mt-3 text-[15px] text-stone-500 max-w-xl leading-relaxed">
              A look back at our dealer meets, trainings, celebrations and team activities that bring our people together and drive our journey forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ EVENTS LIST ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200/80">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">🎉</div>
            <p className="font-semibold text-stone-700">No events yet</p>
            <p className="text-sm text-stone-400 mt-1">Check back soon for highlights from our latest events.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {events.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="py-8 border-b border-stone-200/70 last:border-b-0"
              >
                {/* Tag */}
                {ev.location && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border mb-3" style={{ background: "#fff7ed", color: ORANGE, borderColor: "#fed7aa" }}>
                    {ev.location}
                  </span>
                )}

                {/* Content row: text left, images right */}
                <div className="flex flex-col lg:flex-row gap-5 items-start">
                  {/* Left: title + description */}
                  <div className="lg:w-[240px] shrink-0">
                    <h2 className="text-[17px] font-extrabold text-stone-900 leading-snug mb-2" style={FONT}>
                      {ev.title}
                    </h2>
                    {ev.description && (
                      <p className="text-[12px] text-stone-500 leading-relaxed line-clamp-5">{ev.description}</p>
                    )}
                  </div>

                  {/* Right: scrollable gallery with arrows */}
                  {ev.gallery?.length > 0 && (
                    <EventGallery images={ev.gallery} title={ev.title} onOpen={(idx) => setLightbox({ images: ev.gallery, index: idx })} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <section className="bg-[#fef3c7]/40 border-t border-amber-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-extrabold text-stone-900 leading-tight" style={FONT}>
                Be a Part of Our Journey
              </h3>
              <p className="mt-2 text-[14px] text-stone-500 max-w-md leading-relaxed">
                Our people are the strength behind our success. Join a team that values learning, collaboration and celebration.
              </p>
              <Link
                href="/careers"
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-bold text-[14px] shadow-md hover:opacity-90 transition-opacity"
                style={{ background: ORANGE }}
              >
                Explore Career Opportunities
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="flex gap-8 text-center">
              {[
                { icon: "👥", label: "Learn\nTogether" },
                { icon: "📈", label: "Grow\nTogether" },
                { icon: "🎉", label: "Celebrate\nTogether" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-2xl shadow-sm">
                    {item.icon}
                  </div>
                  <p className="text-[12px] font-bold text-stone-700 whitespace-pre-line leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {lightbox.images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setLightbox((lb) => lb && ({ ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length })); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setLightbox((lb) => lb && ({ ...lb, index: (lb.index + 1) % lb.images.length })); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
            <motion.div key={lightbox.index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.images[lightbox.index].url} alt={lightbox.images[lightbox.index].name || ""}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl" />
              {lightbox.images[lightbox.index].name && (
                <p className="mt-3 text-white text-sm font-medium">{lightbox.images[lightbox.index].name}</p>
              )}
            </motion.div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
