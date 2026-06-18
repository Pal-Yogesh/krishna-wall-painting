// "use client";

// import { useRef, useEffect } from "react";
// import Link from "next/link";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCards } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-cards";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const GALLERY_ITEMS = [
// { category: "Head", title: "Director", color: "#d97706", gradient: "linear-gradient(135deg, #f59e0b20, #d9770640)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426456/kmopl-gallery/njivu2s6yogwmpvipicl.jpg" },
//   { category: "Head", title: "Director", color: "#16a34a", gradient: "linear-gradient(135deg, #16a34a20, #15803d40)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426454/kmopl-gallery/vdbibnxl8wj3q7wrz8ct.jpg" },
//   { category: "Manufacturing Plant", title: "Quality Lab", color: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed20, #6d28d940)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426446/kmopl-gallery/kwuwjyjy3iclquyb4mz4.jpg" },
//   { category: "Product Brand", title: "KMOPL", color: "#be185d", gradient: "linear-gradient(135deg, #be185d20, #9d174d40)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426444/kmopl-gallery/d6u6sxziccmym4pphrmj.jpg" },
//   { category: "Events", title: "Training Workshop", color: "#ea580c", gradient: "linear-gradient(135deg, #ea580c20, #c2410c40)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426440/kmopl-gallery/oy02cwt9b1x7ygto57d5.jpg" },
//   { category: "Product Team", title: "Team", color: "#0891b2", gradient: "linear-gradient(135deg, #0891b220, #06748540)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426461/kmopl-gallery/wtlufvbueql2f6fzqxsn.jpg" },
//   { category: "Product Showcase", title: "Speciality Coatings", color: "#0891b2", gradient: "linear-gradient(135deg, #0891b220, #06748540)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426463/kmopl-gallery/awnaaotvvt9r5grl2rzz.jpg" },

// ];

// function GalleryCard({ item, className = "" }: { item: typeof GALLERY_ITEMS[number]; className?: string }) {
//   return (
//     <div className={`relative rounded-2xl lg:rounded-3xl border border-stone-200 shadow-lg overflow-hidden group cursor-pointer h-full ${className}`}>
//       {/* Background image */}
//       <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
//       {/* Top color accent */}
//       <div className="absolute top-0 left-0 right-0 h-1.5 z-10" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}60)` }} />
//       {/* Content at bottom */}
//       <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7 text-left z-10">
//         <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5 block" style={{ color: item.color }}>{item.category}</span>
//         <h4 className="text-lg lg:text-xl font-bold text-white" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{item.title}</h4>
//       </div>
//     </div>
//   );
// }

// export default function GallerySection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);

//   // GSAP horizontal scroll - desktop only
//   useEffect(() => {
//     const section = sectionRef.current;
//     const track = trackRef.current;
//     if (!section || !track) return;

//     // Only init on desktop
//     if (window.innerWidth < 1024) return;

//     const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

//     const timer = setTimeout(() => {
//       const ctx = gsap.context(() => {
//         gsap.to(track, {
//           x: getScrollAmount,
//           ease: "none",
//           scrollTrigger: {
//             trigger: section,
//             start: "top top",
//             end: () => `+=${track.scrollWidth - window.innerWidth}`,
//             pin: true,
//             pinSpacing: true,
//             scrub: 1,
//             invalidateOnRefresh: true,
//             anticipatePin: 1,
//           },
//         });
//       }, section);

//       return () => ctx.revert();
//     }, 150);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {/* ═══ MOBILE: Swiper Cards Effect ═══ */}
//       <section className="block lg:hidden relative py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, #fefdfb 0%, #fdfbf7 100%)" }}>
//         <div className="absolute inset-0 pointer-events-none" aria-hidden>
//           <div className="absolute -bottom-20 right-0 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl" />
//         </div>

//         <div className="relative px-4 sm:px-6">
//           {/* Heading */}
//           <div className="text-center mb-10">
//             <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4">
//               Gallery
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
//               A Glimpse Into{" "}
//               <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>Our World</span>
//             </h2>
//             <p className="mt-3 text-stone-500 text-[14px]">Swipe to explore our facilities & events</p>
//           </div>

//           {/* Swiper with cards effect */}
//           <div className="max-w-[280px] sm:max-w-[320px] mx-auto">
//             <Swiper
//               effect="cards"
//               grabCursor={true}
//               modules={[EffectCards]}
//               className="w-full"
//             >
//               {GALLERY_ITEMS.map((item, i) => (
//                 <SwiperSlide key={`mobile-${item.title}-${i}`} className="rounded-2xl overflow-hidden">
//                   <div className="h-96 ">
//                     <GalleryCard item={item} className="h-full" />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Swipe hint */}
//           <p className="text-center mt-5 text-xs text-stone-400 font-medium flex items-center justify-center gap-1.5">
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
//             </svg>
//             Swipe cards to explore
//           </p>

//           {/* CTA */}
//           <div className="text-center mt-8">
//             <Link href="/about"
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-stone-900/15"
//               style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
//               View Full Gallery
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ═══ DESKTOP: Horizontal GSAP scroll ═══ */}
//       <div id="gallery-wrapper" className="hidden lg:block">
//         <section
//           ref={sectionRef}
//           id="gallery"
//           className="relative overflow-hidden"
//           style={{ background: "linear-gradient(180deg, #fefdfb 0%, #fdfbf7 100%)" }}
//         >
//           <div aria-hidden className="absolute inset-0 pointer-events-none">
//             <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl" />
//           </div>

//           <div ref={trackRef} className="flex items-center gap-6 px-20 h-screen w-max">
//             {/* Heading panel */}
//             <div className="shrink-0 w-[35vw] flex flex-col justify-center pr-8">
//               <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 w-fit">
//                 Gallery
//               </span>
//               <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-stone-900 leading-tight"
//                 style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.02em" }}>
//                 A Glimpse Into{" "}
//                 <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>Our World</span>
//               </h2>
//               <p className="mt-4 text-stone-500 text-[15px] leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
//                 From our manufacturing plant to team events and product showcases — scroll to explore.
//               </p>
//               <div className="mt-6 flex items-center gap-2 text-amber-600">
//                 <span className="text-xs font-bold uppercase tracking-wider">Scroll</span>
//                 <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </div>
//             </div>

//             {/* Gallery cards */}
//             {GALLERY_ITEMS.map((item, i) => (
//               <div key={`desktop-${item.title}-${i}`} className="shrink-0 w-[30vw] h-[70vh]">
//                 <GalleryCard item={item} className="h-full" />
//               </div>
//             ))}

//             {/* CTA panel */}
//             <div className="shrink-0 w-[30vw] h-[70vh] flex flex-col items-center justify-center px-8">
//               <div className="text-center">
//                 <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
//                   style={{ background: "linear-gradient(135deg, #f59e0b20, #d9770640)", border: "1.5px solid #f59e0b40" }}>
//                   <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </div>
//                 <h4 className="text-xl font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>See More</h4>
//                 <p className="text-sm text-stone-500 mb-6 max-w-xs">
//                   Visit our gallery for a complete look at our facilities, products, and team.
//                 </p>
//                 <Link href="/about"
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-stone-900/15 transition-all hover:shadow-xl"
//                   style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
//                   View Full Gallery
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_ITEMS = [
{ category: "Head", title: "Director", color: "#d97706", gradient: "linear-gradient(135deg, #f59e0b20, #d9770640)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426456/kmopl-gallery/njivu2s6yogwmpvipicl.jpg" },
  { category: "Head", title: "Director", color: "#16a34a", gradient: "linear-gradient(135deg, #16a34a20, #15803d40)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426454/kmopl-gallery/vdbibnxl8wj3q7wrz8ct.jpg" },
  { category: "Manufacturing Plant", title: "Quality Lab", color: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed20, #6d28d940)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426446/kmopl-gallery/kwuwjyjy3iclquyb4mz4.jpg" },
  { category: "Product Brand", title: "KMOPL", color: "#be185d", gradient: "linear-gradient(135deg, #be185d20, #9d174d40)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426444/kmopl-gallery/d6u6sxziccmym4pphrmj.jpg" },
  { category: "Events", title: "Training Workshop", color: "#ea580c", gradient: "linear-gradient(135deg, #ea580c20, #c2410c40)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426440/kmopl-gallery/oy02cwt9b1x7ygto57d5.jpg" },
  { category: "Product Team", title: "Team", color: "#0891b2", gradient: "linear-gradient(135deg, #0891b220, #06748540)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426461/kmopl-gallery/wtlufvbueql2f6fzqxsn.jpg" },
  { category: "Product Showcase", title: "Speciality Coatings", color: "#0891b2", gradient: "linear-gradient(135deg, #0891b220, #06748540)", image: "https://res.cloudinary.com/dxfkygu6e/image/upload/v1780426463/kmopl-gallery/awnaaotvvt9r5grl2rzz.jpg" },

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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // GSAP horizontal scroll - desktop only
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.innerWidth < 1024) return;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, section);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

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

      {/* ═══ DESKTOP: GSAP Horizontal Scroll ═══ */}
      <div className="hidden lg:block" id="gallery-wrapper">
        <section
          ref={sectionRef}
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #fefdfb 0%, #fdfbf7 100%)" }}
        >
          <div ref={trackRef} className="flex items-center gap-6 px-20 h-screen w-max">
            {/* Heading panel */}
            <div className="shrink-0 w-[35vw] flex flex-col justify-center pr-8">
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 w-fit">
                Gallery
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-stone-900 leading-tight"
                style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.02em" }}>
                A Glimpse Into{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #f59e0b)" }}>Our World</span>
              </h2>
              <p className="mt-4 text-stone-500 text-[15px] leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                From our manufacturing plant to team events and product showcases — scroll to explore.
              </p>
              <div className="mt-6 flex items-center gap-2 text-amber-600">
                <span className="text-xs font-bold uppercase tracking-wider">Scroll</span>
                <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Gallery cards */}
            {GALLERY_ITEMS.map((item, i) => (
              <div key={`desktop-${item.title}-${i}`} className="shrink-0 w-[30vw] h-[70vh] rounded-2xl overflow-hidden shadow-lg">
                <GalleryCard item={item} />
              </div>
            ))}

            {/* CTA panel */}
            <div className="shrink-0 w-[30vw] h-[70vh] flex flex-col items-center justify-center px-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #f59e0b20, #d9770640)", border: "1.5px solid #f59e0b40" }}>
                  <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>See More</h4>
                <p className="text-sm text-stone-500 mb-6 max-w-xs">
                  Visit our gallery for a complete look at our facilities, products, and team.
                </p>
                <Link href="/gallery"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-stone-900/15 transition-all hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, #292524, #1c1917)", fontFamily: "var(--font-raleway), sans-serif" }}>
                  View Full Gallery
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
