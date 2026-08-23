"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useProducts } from "@/context/ProductContext";
const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const HERO_BADGES = [
  { icon: "🎨", label: "Vibrant Colours" },
  { icon: "☀️", label: "Light Fastness" },
  { icon: "⚗️", label: "Chemical Stability" },
  { icon: "🏭", label: "Industrial Grade" },
  { icon: "✅", label: "Consistent Quality" },
];
export default function DyestuffPage() {
  const { products } = useProducts();
  const items = products.filter((p) => p.substrate === "dyestuff");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden min-h-[400px]">
        <div className="absolute inset-0"><img src="/paint-images/images/4.jpg" alt="Dyestuff" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" /></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-lg">
            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] mb-4" style={{ fontFamily: "var(--font-raleway), sans-serif", color: NAVY }}>Dyestuff Solutions<br /><span style={{ color: ORANGE }}>For Every Application</span></h1>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-6 max-w-md">Industrial dyes and colourants engineered for consistent, vibrant results across diverse substrates and applications.</p>
            <div className="flex flex-wrap gap-2 mb-8">{HERO_BADGES.map((b, i) => (<div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-xl shadow-sm"><span className="text-sm">{b.icon}</span><span className="text-[10px] font-bold text-stone-700">{b.label}</span></div>))}</div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact-us" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-[13px] shadow-md" style={{ background: ORANGE }}>Request TDS</Link>
              <Link href="/contact-us" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[13px] border-2 bg-white/80" style={{ borderColor: NAVY, color: NAVY }}>Talk to Expert →</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <section ref={ref} className="bg-[#f8f9fa] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-raleway), sans-serif", color: NAVY }}>Our Dyestuff Products</h2>
            <p className="text-stone-500 text-[14px]">Explore our range of industrial dyes and colourants.</p>
          </motion.div>
          {items.length === 0 ? (
            <div className="text-center py-16"><p className="text-stone-400 text-lg">Products coming soon. Contact us for more details.</p><Link href="/contact-us" className="mt-4 inline-block text-[14px] font-bold" style={{ color: ORANGE }}>Contact Us →</Link></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((p, i) => (<Card key={p.id} product={p} index={i} inView={inView} substrate="dyestuff" />))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
function Card({ product, index, inView, substrate }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.08 }} className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group">
      <div className="relative h-44 overflow-hidden"><img src={product.image || "/paint-images/images/4.jpg"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute bottom-0 left-4 translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md z-10" style={{ background: "#ea580c" }}><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div></div>
      <div className="px-4 pt-6 pb-5 flex-1 flex flex-col">
        <h3 className="font-extrabold text-[15px] mb-1" style={{ color: "#1e3a5f" }}>{product.name}</h3>
        <p className="text-[12px] text-stone-500 leading-relaxed mb-3 line-clamp-3 flex-1">{product.description}</p>
        {product.features?.length > 0 && (<ul className="space-y-1 mb-4">{product.features.slice(0, 3).map((f: string, i: number) => (<li key={i} className="flex items-center gap-2 text-[11px] text-stone-600"><svg className="w-3 h-3 shrink-0" style={{ color: "#ea580c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="line-clamp-1">{f}</span></li>))}</ul>)}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
          <Link href={`/products/${substrate}/${product.id}`} className="text-[11px] font-bold" style={{ color: "#1e3a5f" }}>Explore →</Link>
          {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold flex items-center gap-1" style={{ color: "#ea580c" }}><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>Request TDS</a>}
        </div>
      </div>
    </motion.div>
  );
}
