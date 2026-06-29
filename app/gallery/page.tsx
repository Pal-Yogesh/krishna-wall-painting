"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426394/kmopl-gallery/vyt2gejregacju984dtd.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426396/kmopl-gallery/uhy67apojoclxgcjupeh.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426398/kmopl-gallery/jgecgnnrttkvjfuh3tzn.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426401/kmopl-gallery/u4kvt2avzjgiairz4hrh.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426411/kmopl-gallery/qhu5a9okvwdavwquu0jp.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426413/kmopl-gallery/nmiefq0mvbdorpab6ydx.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426419/kmopl-gallery/pdqv4fb4zersjxfbvmai.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426423/kmopl-gallery/vgs27kg1va27hl7qftvy.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426424/kmopl-gallery/alnzcmxilsfkt12a7vim.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426434/kmopl-gallery/aecaisrnuq00ln0aktnt.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426436/kmopl-gallery/toqefr81rj71dwn9tmmt.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426437/kmopl-gallery/h6zhqdikgpb4hfmt5tbj.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426440/kmopl-gallery/oy02cwt9b1x7ygto57d5.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426444/kmopl-gallery/d6u6sxziccmym4pphrmj.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426446/kmopl-gallery/kwuwjyjy3iclquyb4mz4.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426454/kmopl-gallery/vdbibnxl8wj3q7wrz8ct.jpg",
  // "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426456/kmopl-gallery/njivu2s6yogwmpvipicl.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426458/kmopl-gallery/tiqghmkm20clwo69mxyp.jpg",
  "/director.jpeg",
  // "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426460/kmopl-gallery/ojolkntacwrhdd3yuxkl.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426461/kmopl-gallery/wtlufvbueql2f6fzqxsn.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426463/kmopl-gallery/awnaaotvvt9r5grl2rzz.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426466/kmopl-gallery/qqmskkkvdtapsmrdn4hx.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426467/kmopl-gallery/xkfdnucqv8boq56ssvqp.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426476/kmopl-gallery/yqdkbkyuonwlefpojgie.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426477/kmopl-gallery/ix8huq1twjq8mnpjnqny.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426478/kmopl-gallery/t7mq4ak5ga1pmpftabxr.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426479/kmopl-gallery/haxg7zhlnkymouxvfxve.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426481/kmopl-gallery/wtqxtjt0guohc6jsvaow.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426484/kmopl-gallery/fgh1ivgw5nlo3hwakigl.jpg",
  "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426485/kmopl-gallery/k3hmssoidvlov1jh37eh.jpg",
];

// Bento grid pattern - defines span for each position (repeating)
const BENTO_PATTERN = [
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
];

export default function GalleryPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current!.querySelectorAll(".bento-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null,
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : null,
    );

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #fef3c720 0%, #fefdfb 50%, #faf9f7 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 border border-amber-200/50">
              Gallery
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              Inside{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)",
                }}
              >
                KMOPL
              </span>
            </h1>
            <p className="mt-4 text-stone-500 text-[15px] max-w-lg mx-auto leading-relaxed">
              A glimpse into our manufacturing facility, products, team events,
              and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
        >
          {GALLERY_IMAGES.map((src, i) => {
            const pattern = BENTO_PATTERN[i % BENTO_PATTERN.length];
            return (
              <div
                key={i}
                className={`bento-item relative overflow-hidden rounded-xl cursor-pointer group opacity-0 aspect-square`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={src}
                  alt={`Gallery photo ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {/* Zoom icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg
                      className="w-5 h-5 text-stone-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={GALLERY_IMAGES[lightboxIndex]}
              alt={`Gallery photo ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
