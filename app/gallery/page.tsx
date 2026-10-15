"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const FONT = { fontFamily: "var(--font-raleway), sans-serif" };

type Category = "All" | "Our Facility" | "Manufacturing" | "Products" | "Our Team" | "Safety";

const CATEGORIES: Category[] = ["All", "Our Facility", "Manufacturing", "Products", "Our Team", "Safety"];

interface GalleryItem {
  src: string;
  label: string;
  category: Category;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Our Facility
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187502-our_facility.jpeg?alt=media&token=651b5626-4d24-47fa-a7d1-63fc5e915201", label: "Our Facility", category: "Our Facility" },
  // 2. Product Display
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187607-product_display.jpeg?alt=media&token=2f4d2208-cd24-4fcc-9c5a-c0db4244daa8", label: "Product Display", category: "Products" },
  // 3. Our Team
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056933259-Our_team.jpeg?alt=media&token=12cb6c8c-f51f-4f50-916e-2fa70ba2a9fa", label: "Our Team", category: "Our Team" },
  // 4. Manufacturing Process
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056182769-Manufacturing_process.jpg?alt=media&token=af248460-5e28-45ba-af8a-1d4aa136d6dd", label: "Manufacturing Process", category: "Manufacturing" },
  // 5. Quality & Testing
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187695-quality_and_testing.jpg?alt=media&token=1ad7475e-da49-490c-8e85-3d8fee191f47", label: "Quality & Testing", category: "Manufacturing" },
  // 6. Storage & Dispatch
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056188011-storage_and_dispatch.jpeg?alt=media&token=71fd23f0-3ef6-4d07-974a-bb6522a8fa8e", label: "Storage & Dispatch", category: "Manufacturing" },
  // 7. Safety at Work
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187810-safety_and_work.jpeg?alt=media&token=d76cf5a1-51d0-4d82-a26e-619f0b72c8f6", label: "Safety at Work", category: "Safety" },
  // 8. Application Process
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187399-application_process.jpeg?alt=media&token=e6979198-4366-4a48-a029-321c3fe53b20", label: "Application Process", category: "Manufacturing" },
  // 9. Material Handling
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056934558-Material_handling.jpg?alt=media&token=530845e7-db3a-43ee-a290-0d5df5a9360b", label: "Material Handling", category: "Manufacturing" },
  // Remaining
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056185985-Manufacturing.jpeg?alt=media&token=cd1f087c-9874-4902-bb66-0990036fb427", label: "Manufacturing", category: "Manufacturing" },
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056934766-Process_equipment.jpeg?alt=media&token=157c6c43-c8d8-43a7-a55e-dc67d91df9a6", label: "Process Equipment", category: "Manufacturing" },
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187297-R_D_product_development.jpeg?alt=media&token=d3d454b6-96e5-4f30-a14b-ddfc6b6403f9", label: "R&D / Product Development", category: "Products" },
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056182655-Interior_Applications.jpeg?alt=media&token=52bc68e4-b64c-4cef-aa2f-51cf64686070", label: "Interior Applications", category: "Products" },
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187200-Production_line.jpeg?alt=media&token=400c57f4-62e7-429a-b064-843c34a424df", label: "Production Line", category: "Manufacturing" },
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056180783-Infrastructure.jpeg?alt=media&token=9a773063-ae10-4830-b3e6-c28b9d0db5b8", label: "Infrastructure", category: "Our Facility" },
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056179303-Finished_products.png?alt=media&token=7990c0d4-3e26-49f0-8c5b-51f186ed5aa4", label: "Finished Products", category: "Products" },
  { src: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056187919-saftey_and_compliance.jpeg?alt=media&token=ad3b147b-b2d0-4066-a15f-06cd2f867dc2", label: "Safety & Compliance", category: "Safety" },
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
      <section className="relative overflow-hidden min-h-[60vh]">
        <div className="absolute inset-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2F1792056179741-Gallery_banner_image.PNG?alt=media&token=9dd2d0ee-2275-4133-a110-8173e726158b"
            alt="Gallery banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12px] text-stone-400 mb-4">
            <Link href="/" className="hover:text-black text-stone-500">Home</Link>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-stone-700 font-semibold">Gallery</span>
          </nav>

          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight" style={FONT}>
                Inside <span style={{ color: ORANGE }}>Krishna</span>
              </h1>
              <p className="mt-2 text-stone-600 text-[15px] max-w-lg leading-relaxed">
                Explore our facility, people, products and manufacturing journey.
              </p>
            </div>
            <Image src="/logo.png" alt="Krishna Logo" width={100} height={100} className="hidden sm:block shrink-0 object-contain" />
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setLightboxIndex(null); }}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all border ${
                active === cat
                  ? "text-white border-[#ea580c] bg-[#ea580c]"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c]"
              }`}
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
