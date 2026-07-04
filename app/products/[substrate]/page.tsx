"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { substrates, useProducts } from "@/context/ProductContext";

export default function SubstratePage() {
  const params = useParams();
  const substrate = params.substrate as string;
  const info = substrates[substrate as keyof typeof substrates];
  const { products, loading } = useProducts();

  // Define the display order for each substrate's product categories (matched by product name)
  const NAME_ORDER: Record<string, string[]> = {
    wood: [
      "NC COATINGS",
      "PU COATINGS",
      "UNSATURATED POLYSTER",
      "1K ACRYLIC",
      "UV COATINGS",
      "1K WB",
      "2K WB",
    ],
    metal: [
      "NC COATINGS",
      "PU COATINGS",
      "EPOXY ANTI-CORROSION",
      "HR COATINGS",
      "1K ACRYLIC",
    ],
    glass: [
      "PU COATINGS FOR GLASS",
      "PU COATINGS FOR ABS",
      "EPOXY CLEAR",
    ],
  };

  const items = (() => {
    const filtered = products.filter((p) => p.substrate === substrate);
    const order = NAME_ORDER[substrate];
    if (!order) return filtered;

    // Sort products by defined name order
    return [...filtered].sort((a, b) => {
      const getOrderIndex = (name: string) => {
        const upper = (name || "").toUpperCase();
        return order.findIndex((key) => upper.startsWith(key));
      };
      const aIndex = getOrderIndex(a.name);
      const bIndex = getOrderIndex(b.name);
      const aSortKey = aIndex === -1 ? order.length : aIndex;
      const bSortKey = bIndex === -1 ? order.length : bIndex;
      return aSortKey - bSortKey;
    });
  })();

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f7]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-stone-200 flex items-center justify-center text-3xl">🎨</div>
          <p className="text-stone-500 font-medium">Category not found.</p>
          <Link href="/products" className="mt-4 inline-block text-amber-600 font-semibold text-sm hover:underline">← Back to Products</Link>
        </motion.div>
      </div>
    );
  }

  // Get unique chemistries for this substrate
  const chemistries = [...new Set(items.map(p => p.chemistry))];
  // Other substrates for cross-navigation
  const otherSubstrates = (Object.keys(substrates) as (keyof typeof substrates)[]).filter(k => k !== substrate);

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative overflow-hidden">
        {/* Top color bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-10" style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}80, ${info.color}40, ${info.color}80, ${info.color})` }} />

        {/* Paint drip decoration */}
        <svg className="absolute top-1.5 left-0 right-0 w-full h-8 z-10" viewBox="0 0 1200 32" preserveAspectRatio="none" aria-hidden>
          <path d={`M0,0 L1200,0 L1200,4 Q1080,4 1040,14 Q1000,24 960,4 L800,4 Q760,4 720,10 Q680,18 640,4 L480,4 Q440,4 400,16 Q360,28 320,4 L160,4 Q120,4 90,8 Q60,14 30,4 L0,4 Z`} fill={info.color} opacity="0.12" />
        </svg>

        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${info.color}15 0%, ${info.color}06 30%, #fefdfb 60%, #faf9f7 100%)` }} />

        {/* Floating paint elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <motion.div animate={{ y: [0, -12, 0], x: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] w-44 h-44 rounded-full blur-3xl opacity-20" style={{ background: info.color }} />
          <motion.div animate={{ y: [0, 10, 0], x: [0, -6, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 left-[5%] w-32 h-32 rounded-full blur-2xl opacity-15" style={{ background: info.color }} />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-5 right-[25%] w-36 h-36 rounded-full blur-3xl opacity-10" style={{ background: info.color }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">

          {/* Hero content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-16 h-16 rounded-2xl ${info.bg} ${info.border} border flex items-center justify-center text-3xl shadow-sm`}>
                  {info.icon}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1"
                    style={{ background: `${info.color}12`, color: info.color, border: `1px solid ${info.color}25` }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: info.color }} />
                    {items.length} Products Available
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold text-stone-900 leading-tight"
                    style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
                    {info.label}
                  </h1>
                </div>
              </div>

              <p className="text-[15px] text-stone-500 leading-relaxed max-w-xl mb-8">
                {info.description}
              </p>

              {/* Chemistry badges */}
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-3">Available Chemistries</span>
                <div className="flex flex-wrap gap-2">
                  {chemistries.map((chem) => (
                    <span key={chem} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-lg text-[12px] font-semibold text-stone-700 shadow-sm">
                      <span className="w-2 h-2 rounded-full" style={{ background: info.color }} />
                      {chem}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Visual card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 hidden lg:block">
              <div className="relative rounded-3xl shadow-lg overflow-hidden">
                {/* Full image or video */}
                <div className="relative h-64 overflow-hidden">
                  {substrate === "wood" ? (
                    <video
                      src="https://res.cloudinary.com/dxfkygu6e/video/upload/v1783163099/WhatsApp_Video_2026-07-04_at_4.33.57_PM_mf6omj.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : substrate === "metal" ? (
                    <video
                      src="https://res.cloudinary.com/dxfkygu6e/video/upload/v1783163094/WhatsApp_Video_2026-07-04_at_4.33.54_PM_lbdqoy.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src={`/coating/${substrate}-coating-product.jpeg`} alt={info.label} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Shine effect */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  />
                </div>
                {/* Stats overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white drop-shadow-md">{items.length}</div>
                    <div className="text-[10px] text-white/70 font-medium">Products</div>
                  </div>
                  <div className="text-center border-x border-white/20">
                    <div className="text-xl font-bold text-white drop-shadow-md">{chemistries.length}</div>
                    <div className="text-[10px] text-white/70 font-medium">Chemistries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white drop-shadow-md">{items.reduce((acc, p) => acc + (p.finishes?.length || 0), 0)}+</div>
                    <div className="text-[10px] text-white/70 font-medium">Finishes</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS GRID ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              All {info.label}
            </h2>
            <p className="text-[13px] text-stone-400 mt-0.5">{items.length} coating solutions for {substrate} substrates</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-stone-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Grid View
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            >
              <Link href={`/products/${substrate}/${product.id}`} className="block group h-full">
                <div className="relative overflow-hidden bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-xl hover:border-stone-300 transition-all h-full flex flex-col">
                  {/* Top accent */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}50, transparent)` }} />

                  {/* Visual header */}
                  <div className="relative h-80 overflow-hidden" style={{ background: `linear-gradient(135deg, ${info.color}12, ${info.color}05, transparent)` }}>
                    {/* Dot pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden>
                      <defs>
                        <pattern id={`p-${product.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1" fill={info.color} />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#p-${product.id})`} />
                    </svg>
                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-stone-200/50 flex items-center justify-center">
                          <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" /></svg>
                        </div>
                      )}
                    </div>
                    {/* Hover shine */}
                    <div className="absolute inset-y-0 -left-full w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Chemistry */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: info.color }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: info.color }}>
                        {product.chemistry}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-[15px] font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[12px] text-stone-500 leading-relaxed flex-1 line-clamp-3 mb-4">
                      {product.description}
                    </p>

                    {/* Tags */}
                    {product.finishes && product.finishes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.finishes.slice(0, 3).map((finish) => (
                          <span key={finish} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-50 border border-stone-200 text-stone-500">
                            {finish}
                          </span>
                        ))}
                        {product.finishes.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-50 border border-stone-200 text-stone-400">
                            +{product.finishes.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: `${info.color}10`, color: info.color }}>
                          {product.features.length} features
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-50 text-stone-500">
                          {product.applications.length} uses
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[12px] font-semibold text-amber-600">
                        Details
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ EXPLORE OTHER SUBSTRATES ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-lg font-bold text-stone-900 mb-5" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            Explore Other Substrates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherSubstrates.map((key) => {
              const otherInfo = substrates[key];
              const otherCount = products.filter(p => p.substrate === key).length;
              return (
                <Link key={key} href={`/products/${key}`} className="block group">
                  <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative overflow-hidden flex items-center gap-4 p-5 bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                    {/* Color accent */}
                    <div className="absolute top-0 left-0 w-1 h-full rounded-full" style={{ background: `linear-gradient(180deg, ${otherInfo.color}, ${otherInfo.color}40)` }} />
                    <div className={`w-12 h-12 rounded-xl ${otherInfo.bg} ${otherInfo.border} border flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform`}>
                      {otherInfo.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-bold text-stone-800 group-hover:text-amber-700 transition-colors" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                        {otherInfo.label}
                      </h4>
                      <p className="text-[12px] text-stone-400 mt-0.5 truncate">{otherCount} products available</p>
                    </div>
                    <svg className="w-5 h-5 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
          style={{ background: `linear-gradient(135deg, ${info.color}15, ${info.color}08, ${info.color}03)` }}
        >
          {/* Decorative blobs */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10" style={{ background: info.color }} />
          <div className="absolute -left-5 -top-5 w-24 h-24 rounded-full opacity-10" style={{ background: info.color }} />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: `${info.color}15`, border: `1px solid ${info.color}25` }}>
                <svg className="w-7 h-7" style={{ color: info.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                  Need a Custom {info.label.replace(" Coatings", "")} Coating?
                </h3>
                <p className="text-[13px] text-stone-500 mt-0.5">Get expert recommendations for your specific application.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact-us"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                  style={{ background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)` }}>
                  Get Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
              <Link href="/products"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-stone-200 text-sm font-semibold text-stone-700 hover:border-stone-300 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                All Products
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
