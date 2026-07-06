"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox: holds the active event's gallery + current index
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

  // Keyboard navigation for lightbox
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #fef3c720 0%, #fefdfb 40%, #faf9f7 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)" }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 right-[10%] w-56 h-56 rounded-full bg-amber-200/30 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 border border-amber-200/50">
              Our Events
            </span>
            <h1 className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
              Moments & <span className="text-amber-500">Milestones</span>
            </h1>
            <p className="mt-4 text-[15px] text-stone-500 max-w-xl mx-auto leading-relaxed">
              A look back at our dealer meets, exhibitions, launches, and celebrations. Explore the galleries from each event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ EVENTS LIST ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="space-y-16">
            {events.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Event header */}
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                  {/* Cover */}
                  {(ev.coverImage || ev.gallery?.[0]?.url) && (
                    <div
                      className="relative w-full lg:w-80 h-56 rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer group"
                      onClick={() => ev.gallery?.length && setLightbox({ images: ev.gallery, index: 0 })}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ev.coverImage || ev.gallery[0].url} alt={ev.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      {/* {ev.eventDate && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {formatDate(ev.eventDate)}
                        </span>
                      )} */}
                      {ev.location && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {ev.location}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 leading-tight" style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.02em" }}>
                      {ev.title}
                    </h2>
                    {ev.description && (
                      <p className="mt-3 text-[14.5px] text-stone-500 leading-relaxed">{ev.description}</p>
                    )}
                    {/* {ev.gallery?.length > 0 && (
                      <p className="mt-3 text-[12px] font-semibold text-stone-400">{ev.gallery.length} photo{ev.gallery.length !== 1 ? "s" : ""} in this gallery</p>
                    )} */}
                  </div>
                </div>

                {/* Gallery grid */}
                {ev.gallery?.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {ev.gallery.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => setLightbox({ images: ev.gallery, index: idx })}
                        className="relative group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer aspect-[4/3]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.name || `${ev.title} ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Divider */}
                {i < events.length - 1 && <div className="mt-14 border-t border-stone-200/70" />}
              </motion.div>
            ))}
          </div>
        )}
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
