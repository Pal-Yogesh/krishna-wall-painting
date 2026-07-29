"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// ── Small reusable list-item icon ──────────────────────────────────────────────
function ItemIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4 shrink-0"
      stroke={color}
      strokeWidth={1.6}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
    </svg>
  );
}

const SEGMENTS = [
  {
    key: "wood",
    title: "WOOD",
    subtitle: "Coatings for Beauty, Strength & Durability",
    color: "#ea580c",
    bg: "#fff7ed",
    href: "/products/wood",
    image: "/new-images-update/wood.jpeg",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-7 h-7"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v18M8 5c0 3 0 11 0 14M16 5c0 3 0 11 0 14M5 7c1 2 1 8 0 10M19 7c-1 2-1 8 0 10"
        />
      </svg>
    ),
    items: [
      { title: "Custom Woodworking", 
        // desc: "Luxury kitchens, bathroom vanities, and premium executive desks (steam and scratch-proof)." 
      },
      { title: "Interior Design", 
        // desc: "Back-painted opaque glass panels for kitchen splashbacks and office whiteboards." 

      },
      { title: "Mass-Market Wood & Laminates", 
        // desc: "Flat-pack furniture (IKEA-style) and factory-finished engineered flooring." 
      },
      { title: "Musical Instruments",
        //  desc: "Acoustic and electric guitars, violins, and cellos (allows wood to vibrate and age naturally)."
         },
      { title: "Artisanal Wood & Antiques", 
        // desc: "Traditional handicraft workshops, carved decor, and antique furniture restoration." 
      },
      { title: "Economy Furniture",
        //  desc: "Mid-to-low-tier residential doors, bed frames, and dining chairs."
         },
      { title: "Fashion & Cosmetics", 
        // desc: "Base film for standard retail nail polishes and glossy top-finishes for consumer leather items (shoes, belts)." 
      },
    ],
  },
  {
    key: "metal",
    title: "METAL",
    subtitle: "Coatings for Protection, Performance & Precision",
    color: "#1e2a4a",
    bg: "#eef1f6",
    href: "/products/metal",
    image: "/new-images-update/metal.jpeg",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-7 h-7"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26"
        />
      </svg>
    ),
    items: [
      { title: "Heavy Machinery & Industrial Equipment", 
        // desc: "Used on automated assembly gear, factory machinery, and material handling systems requiring high wear resistance." 
      },
      { title: "Fabricated Steel Structures", 
        // desc: "Applied to large-scale structural frames, infrastructure builds, and warehouses to prevent corrosion." 
      },
      { title: "Automobile & Agricultural Components", 
        // desc: "Protects critical engine parts, body frames, tractors, and harvesting gear from extreme outdoor environments." 
      },
      { title: "Engineering Products & Panels", 
        // desc: "Ideal for precision-machined electronics enclosures, power panels, and customized tooling assemblies." 
      },
      { title: "OEM Finishing Applications", 
        // desc: "Serves as the primary factory-applied protective layer for Original Equipment Manufacturers before final product delivery." 
      },
    ],
  },
  {
    key: "glass",
    title: "GLASS",
    subtitle: "Coatings for Clarity, Safety & Sophistication",
    color: "#0d9488",
    bg: "#f0fdfa",
    href: "/products/glass",
    image: "/new-images-update/glass.jpeg",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-7 h-7"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v18M4 12h16"
        />
      </svg>
    ),
    items: [
      { title: "Perfume, Cosmetics & Luxury Packaging", 
        // desc: "Creates premium frosted or coloured glass bottles that remain permanently pristine against aggressive perfume oils and alcohol leaks." 
      },
      { title: "Wine, Liquor & Beverage Bottling", 
        // desc: "Provides durable custom tints and frosting that withstand high-speed conveyor friction and continuous submersion in wet ice buckets." 
      },
      { title: "Architectural, Interior Design & Furniture", 
        // desc: "Bonds to back-painted glass panels for seamless kitchen splashbacks, office whiteboards, and luxury tabletops resisting heat and moisture." 
      },
      { title: "Home Decorative, Lighting & Handicrafts", 
        // desc: "Coats high-end glass pendant lamps, chandeliers, and vases to withstand high bulb temperatures without yellowing or cracking." 
      },
    ],
  },
];

export default function MarketSegments() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="market-segments"
      className="relative py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fdfbf7 0%, #fefdfb 50%, #fdfbf7 100%)",
      }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber-100/25 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Eyebrow with side lines */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-14 bg-orange-300" />
            <span className="text-3xl font-bold uppercase  text-orange-500">
              Industries We Serve
            </span>
            <span className="h-px w-14 bg-orange-300" />
          </div>

          <h2
            className="text-[clamp(1rem,3.5vw,2rem)] font-bold text-stone-900 leading-[1.12]"
            style={{
              fontFamily: "var(--font-raleway), sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            
            Delivering high-performance coating solutions for every industry engineered to protect, enhance, and add value across diverse applications.  
            {/* <br />
            <span style={{ color: "#ea580c" }}>solutions for</span>
            <span className="text-stone-900"> every industry engineered to protect </span>
            <span style={{ color: "#1e2a4a" }}>enhance</span>
            <span className="text-stone-900"> &amp; </span>
            <span style={{ color: "#0d9488" }}> add value</span>
            <span className="text-stone-900"> across diverse applications.</span> */}
          </h2>

          {/* <p
            className="mt-4 text-stone-800 text-[16px]  max-w-xl mx-auto leading-relaxed"
          >
            High-performance coatings designed to enhance durability, aesthetics
            and long-term value across diverse industries.
          </p> */}
        </motion.div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-6">
          {SEGMENTS.map((seg, idx) => (
            <motion.div
              key={seg.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              style={{ borderColor: seg.color }} 
              className="group relative bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all flex flex-col pt-8"
            >
              {/* Circular icon badge — half outside card top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white"
                  style={{ background: seg.color }}
                >
                  {seg.icon}
                </div>
              </div>

              {/* Image */}
              <div className="relative h-52 overflow-hidden rounded-t-xl  -mt-8">
                <img
                  src={seg.image}
                  alt={seg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 40%, ${seg.color}30)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="px-1 pt-4 pb-6 flex-1 flex flex-col justify-between">
                <div>

                {/* Title with side lines */}
                <div className="flex items-center justify-center gap-3 mb-1 px-4">
                  <span className="w-10 h-px shrink-0" style={{ background: seg.color }} />
                  <h3
                    className="text-[22px] font-extrabold tracking-wide shrink-0"
                    style={{
                      fontFamily: "var(--font-raleway), sans-serif",
                      color: seg.color,
                    }}
                  >
                    {seg.title}
                  </h3>
                  <span className="w-10 h-px shrink-0" style={{ background: seg.color }} />
                </div>
                <p className="text-center text-[12px] text-stone-800 font-semibold mb-3">
                  {seg.subtitle}
                </p>

                {/* Items — full width list with borders */}
                <div className="divide-y divide-stone-200 px-2">
                  {seg.items.map((item) => (
                    <div key={item.title} className="flex items-start gap-2.5 py-3">
                      <ItemIcon color={seg.color} />
                      <div>
                        <p className="text-[12px] text-stone-900 font-bold leading-snug">{item.title}</p>
                        {/* <p className="text-[11px] text-stone-500 leading-snug mt-0.5">{item.desc}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
                </div>

                {/* View products link */}
                <Link
                  href={seg.href}
                  className="mt-6 inline-flex items-center justify-center gap-1.5 text-[12px] font-bold uppercase tracking-wider transition-colors"
                  style={{ color: seg.color }}
                >
                  View Products
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>

              {/* Bottom color bar */}
              <div className="h-2 w-full rounded-b-3xl" style={{ background: seg.color }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-stone-200/80 rounded-full shadow-sm">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <p className="text-[14px] text-stone-800">
              Trusted by{" "}
              <span className="font-bold text-orange-500">500+ industries</span>{" "}
              across India for exceptional quality and performance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
