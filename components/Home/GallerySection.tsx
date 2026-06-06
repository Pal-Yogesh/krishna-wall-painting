"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const GALLERY_ITEMS = [
  { category: "Manufacturing Plant", title: "Production Facility", color: "#d97706", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426394/kmopl-gallery/vyt2gejregacju984dtd.jpg" },
  { category: "Product Showcase", title: "Specialty Coatings", color: "#0891b2", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426396/kmopl-gallery/uhy67apojoclxgcjupeh.jpg" },
  { category: "Team Events", title: "Annual Meet 2024", color: "#16a34a", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426398/kmopl-gallery/jgecgnnrttkvjfuh3tzn.jpg" },
  { category: "Manufacturing Plant", title: "Quality Lab", color: "#7c3aed", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426401/kmopl-gallery/u4kvt2avzjgiairz4hrh.jpg" },
  { category: "Product Showcase", title: "Metallic Finishes", color: "#be185d", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426411/kmopl-gallery/qhu5a9okvwdavwquu0jp.jpg" },
  { category: "Team Events", title: "Training Workshop", color: "#ea580c", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426413/kmopl-gallery/nmiefq0mvbdorpab6ydx.jpg" },
  { category: "Manufacturing Plant", title: "Coating Line", color: "#d97706", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426419/kmopl-gallery/pdqv4fb4zersjxfbvmai.jpg" },
  { category: "Product Showcase", title: "Wood Finishes", color: "#16a34a", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426423/kmopl-gallery/vgs27kg1va27hl7qftvy.jpg" },
];

function GalleryCard({ item }: { item: typeof GALLERY_ITEMS[number] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group h-full">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}60)` }} />
      <div className="absolute bottom-4 left-4">
        <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: item.color }}>{item.category}</span>
        <span className="text-[15px] font-bold text-white" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{item.title}</span>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const doubledItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <>
      {/* ═══ MOBILE: Swiper Cards Effect ═══ */}
      <section className="block lg:hidden relative py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, #fefdfb 0%, #fdfbf7 100%)" }}>
        <div className="relative px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4">
              Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              A Glimpse Into{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>Our World</span>
            </h2>
            <p className="mt-3 text-stone-500 text-[14px]">Swipe to explore our facilities & events</p>
          </div>

          <div className="max-w-[280px] sm:max-w-[320px] mx-auto">
            <Swiper effect="cards" grabCursor={true} modules={[EffectCards]} className="w-full">
              {GALLERY_ITEMS.map((item, i) => (
                <SwiperSlide key={`mobile-${item.title}-${i}`} className="rounded-2xl overflow-hidden">
                  <div className="h-80">
                    <GalleryCard item={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <p className="text-center mt-5 text-xs text-stone-400 font-medium flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            Swipe cards to explore
          </p>

          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-stone-900/15"
              style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
              View Full Gallery
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ DESKTOP: Auto-scrolling marquee ═══ */}
      <section className="hidden lg:block relative py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, #fefdfb 0%, #fdfbf7 100%)" }}>
        <div className="max-w-6xl mx-auto px-8 mb-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                Gallery
              </span>
              <h2 className="text-2xl font-bold text-stone-900 leading-tight" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                A Glimpse Into{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>Our World</span>
              </h2>
            </div>
            <Link href="/gallery" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
              style={{ background: "linear-gradient(135deg, #292524, #1c1917)" }}>
              View Gallery
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #fdfbf7, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #fdfbf7, transparent)" }} />

          <motion.div
            animate={{ x: [0, -(GALLERY_ITEMS.length * 340)] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-5 w-max"
          >
            {doubledItems.map((item, i) => (
              <div key={`desktop-${i}`} className="shrink-0 w-[350px] h-[320px] rounded-2xl overflow-hidden shadow-lg">
                <GalleryCard item={item} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
