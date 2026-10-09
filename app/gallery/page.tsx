"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const FONT = { fontFamily: "var(--font-raleway), sans-serif" };

type Category = "All" | "Our Facility" | "Manufacturing" | "Products" | "Our Team" | "Safety" | "Events";

const CATEGORIES: Category[] = ["All", "Our Facility", "Manufacturing", "Products", "Our Team", "Safety", "Events"];

interface GalleryItem {
  src: string;
  label: string;
  category: Category;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426423/kmopl-gallery/vgs27kg1va27hl7qftvy.jpg", label: "Our Facility", category: "Our Facility" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426454/kmopl-gallery/vdbibnxl8wj3q7wrz8ct.jpg", label: "Product Display", category: "Products" },
  { src: "/director.jpeg", label: "Our Team", category: "Our Team" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426458/kmopl-gallery/tiqghmkm20clwo69mxyp.jpg", label: "Manufacturing Process", category: "Manufacturing" },
  { src: "/gallery.jpeg", label: "Manufacturing", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426463/kmopl-gallery/awnaaotvvt9r5grl2rzz.jpg", label: "Quality & Testing", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426466/kmopl-gallery/qqmskkkvdtapsmrdn4hx.jpg", label: "Storage & Dispatch", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426467/kmopl-gallery/xkfdnucqv8boq56ssvqp.jpg", label: "Material Handling", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426476/kmopl-gallery/yqdkbkyuonwlefpojgie.jpg", label: "Safety at Work", category: "Safety" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426446/kmopl-gallery/kwuwjyjy3iclquyb4mz4.jpg", label: "Application Process", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426479/kmopl-gallery/haxg7zhlnkymouxvfxve.jpg", label: "Process Equipment", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426394/kmopl-gallery/vyt2gejregacju984dtd.jpg", label: "R&D / Product Development", category: "Products" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426396/kmopl-gallery/uhy67apojoclxgcjupeh.jpg", label: "Interior Applications", category: "Products" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426398/kmopl-gallery/jgecgnnrttkvjfuh3tzn.jpg", label: "Production Line", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426401/kmopl-gallery/u4kvt2avzjgiairz4hrh.jpg", label: "Infrastructure", category: "Our Facility" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426411/kmopl-gallery/qhu5a9okvwdavwquu0jp.jpg", label: "Finished Products", category: "Products" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426413/kmopl-gallery/nmiefq0mvbdorpab6ydx.jpg", label: "Safety & Compliance", category: "Safety" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426419/kmopl-gallery/pdqv4fb4zersjxfbvmai.jpg", label: "Events", category: "Events" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426424/kmopl-gallery/alnzcmxilsfkt12a7vim.jpg", label: "Our Facility", category: "Our Facility" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426434/kmopl-gallery/aecaisrnuq00ln0aktnt.jpg", label: "Team at Work", category: "Our Team" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426436/kmopl-gallery/toqefr81rj71dwn9tmmt.jpg", label: "Manufacturing Unit", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426437/kmopl-gallery/h6zhqdikgpb4hfmt5tbj.jpg", label: "Quality Control", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426440/kmopl-gallery/oy02cwt9b1x7ygto57d5.jpg", label: "Warehouse", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426477/kmopl-gallery/ix8huq1twjq8mnpjnqny.jpg", label: "Product Samples", category: "Products" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426478/kmopl-gallery/t7mq4ak5ga1pmpftabxr.jpg", label: "Lab Testing", category: "Manufacturing" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426481/kmopl-gallery/wtqxtjt0guohc6jsvaow.jpg", label: "Facility Overview", category: "Our Facility" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426484/kmopl-gallery/fgh1ivgw5nlo3hwakigl.jpg", label: "Team Event", category: "Events" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426485/kmopl-gallery/k3hmssoidvlov1jh37eh.jpg", label: "Safety Training", category: "Safety" },
  { src: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426444/kmopl-gallery/d6u6sxziccmym4pphrmj.jpg", label: "Corporate Event", category: "Events" },
];

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === active);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((p) => (p !== null ? (p + 1) % filtered.length : null));
  const prev = () => setLightboxIndex((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null));

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero header */}
      <section className="pt-8 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-stone-400 mb-4">
          <Link href="/" className="hover:text-stone-700">Home</Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-stone-700 font-semibold">Gallery</span>
        </nav>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight" style={FONT}>
              Inside <span style={{ color: ORANGE }}>Krishna</span>
            </h1>
            <p className="mt-2 text-stone-500 text-[15px] max-w-lg leading-relaxed">
              Explore our facility, people, products and manufacturing journey.
            </p>
          </div>
          <Image src="/logo.png" alt="Krishna Logo" width={100} height={100} className="hidden sm:block shrink-0 object-contain" />
        </div>
      </section>

      {/* Filter tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setLightboxIndex(null); }}
              className="px-5 py-2 rounded-full text-[13px] font-semibold transition-all border"
              style={
                active === cat
                  ? { background: ORANGE, color: "#fff", borderColor: ORANGE }
                  : { background: "#fff", color: "#57534e", borderColor: "#e7e5e4" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Bottom gradient + label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-10 pb-2.5 px-2.5">
                  <p className="text-white text-[11px] sm:text-[12px] font-semibold leading-tight drop-shadow-sm">{item.label}</p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone-400">No images in this category yet.</div>
        )}
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
            <button onClick={closeLightbox} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].label}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <p className="mt-3 text-white text-[14px] font-semibold">{filtered[lightboxIndex].label}</p>
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
