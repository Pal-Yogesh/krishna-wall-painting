"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useProducts } from "@/context/ProductContext";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";

const HERO_BADGES = [
  { icon: "🛡️", label: "Corrosion Resistant" },
  { icon: "⚗️", label: "Chemical Resistant" },
  { icon: "💪", label: "High Durability" },
  { icon: "🌧️", label: "Weather Protection" },
  { icon: "🏭", label: "Industrial Grade" },
  { icon: "🔬", label: "Technical Support" },
];

export default function MetalProductsPage() {
  const { products } = useProducts();
  const metalProducts = products.filter((p) => p.substrate === "metal");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden min-h-[420px]">
        {/* Full background banner image */}
        <div className="absolute inset-0">
          <img
            src="/new-images/banner-metal.jpeg"
            alt="Metal Coatings"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <h1
              className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] mb-4"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                color: NAVY,
              }}
            >
              Advanced Coating Solutions
              <br />
              <span style={{ color: ORANGE }}>
                for Every Surface,
                <br />
                Every Application.
              </span>
            </h1>
            <p className="text-stone-600 text-[16px] leading-relaxed mb-6 max-w-md">
              High-performance industrial coatings engineered to enhance beauty,
              protect and extend the life of metal across demanding
              environments.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {HERO_BADGES.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-xl shadow-sm"
                >
                  <span className="text-sm">{b.icon}</span>
                  <span className="text-[13px] font-bold text-stone-700">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-[13px] shadow-md hover:shadow-lg transition-all"
                style={{ background: ORANGE }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Request TDS
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[13px] border-2 bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                Talk to a Technical Expert
                <svg
                  className="w-3.5 h-3.5"
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
          </motion.div>

        
        </div>
      </section>

      {/* ═══ PRODUCT CHEMISTRY CARDS ═══ */}
      <section ref={sectionRef} className="bg-[#f8f9fa] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-2xl sm:text-5xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                color: NAVY,
              }}
            >
              Our Metal Coating Chemistries
            </h2>
            <p className="text-stone-500 text-[16px]">
              Advanced formulations for every metal application and performance
              requirement.
            </p>
          </motion.div>

          {/* Product cards - first row 4, second row remaining */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {metalProducts.slice(0, 4).map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                inView={inView}
                substrate="metal"
              />
            ))}
          </div>
          {metalProducts.length > 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {metalProducts.slice(4).map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i + 4}
                  inView={inView}
                  substrate="metal"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ BOTTOM CTA BAR ═══ */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5 items-center gap-6">
            <div className="flex items-center  gap-4 flex-1">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0"
                style={{ background: `${NAVY}10` }}
              >
                🎯
              </div>
              <div>
                <h3
                  className="font-extrabold text-2xl"
                  style={{
                    color: NAVY,
                    fontFamily: "var(--font-raleway), sans-serif",
                  }}
                >
                  Need Help Selecting The Right Coating?
                </h3>
                <p className="text-stone-500 text-[16px] mt-0.5">
                  Our technical experts can recommend the ideal coating system
                  based on your substrate, finish, durability and production
                  process.
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 justify-center items-center">
              {[
                {
                  label: "Request TDS",
                  desc: "Get Technical Datasheet for your required product.",
                  icon: "📄",
                },
                {
                  label: "Request a Sample",
                  desc: "Test our coatings and experience the difference.",
                  icon: "🧪",
                },
                {
                  label: "Talk to an Expert",
                  desc: "Speak with our technical specialist today.",
                  icon: "💬",
                },
              ].map((cta, i) => (
                <Link
                  key={i}
                  href="/contact-us"
                  className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-stone-200 bg-white hover:border-orange-300 hover:shadow-md transition-all group"
                >
                  <span className="text-xl">{cta.icon}</span>
                  <div>
                    <span
                      className="text-[16px] font-bold block"
                      style={{ color: NAVY }}
                    >
                      {cta.label}
                    </span>
                    <span className="text-[14px] text-stone-400">
                      {cta.desc}
                    </span>
                  </div>
                  <svg
                    className="w-3.5 h-3.5 text-stone-300 group-hover:text-orange-500 transition-colors ml-1"
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
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══ EXPLORE OTHER SUBSTRATES ═══ */}
      <section className="bg-white pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className="text-3xl font-extrabold mb-6"
            style={{
              color: NAVY,
              fontFamily: "var(--font-raleway), sans-serif",
            }}
          >
            Explore Other Substrates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/products/wood"
              className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <img
                src="/new-images-update/wood.jpeg"
                alt="Wood"
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <p className="font-bold text-xl" style={{ color: NAVY }}>
                  Wood Coatings
                </p>
                <p className="text-[14px] text-stone-400">
                  Premium coatings for beautiful and durable wood finishes.
                </p>
                <span
                  className="text-[12px] font-bold mt-1 inline-block"
                  style={{ color: ORANGE }}
                >
                  Explore →
                </span>
              </div>
            </Link>
            <Link
              href="/products/glass"
              className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <img
                src="/new-images-update/glass.jpeg"
                alt="Glass"
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <p className="font-bold text-xl" style={{ color: NAVY }}>
                  Glass & Plastic Coatings
                </p>
                <p className="text-[14px] text-stone-400">
                  Advanced coating solutions for glass and plastic substrates.
                </p>
                <span
                  className="text-[14px] font-bold mt-1 inline-block"
                  style={{ color: ORANGE }}
                >
                  Explore →
                </span>
              </div>
            </Link>
            {[
              {
                icon: "🔬",
                title: "Advanced R&D",
                desc: "Innovative coating solutions",
              },
              {
                icon: "🚛",
                title: "Pan India Supply",
                desc: "Timely delivery across India",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl border border-stone-200"
              >
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-lg shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="font-bold text-[12px]" style={{ color: NAVY }}>
                    {b.title}
                  </p>
                  <p className="text-[10px] text-stone-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  product,
  index,
  inView,
  substrate,
}: {
  product: any;
  index: number;
  inView: boolean;
  substrate: string;
}) {
  const ORANGE = "#ea580c";
  const NAVY = "#1e3a5f";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={product.image || "/coating/metal-coating.jpeg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Icon badge */}
        {/* <div
          className="absolute bottom-0 left-4 translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md z-10"
          style={{ background: ORANGE }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div> */}
      </div>

      {/* Content */}
      <div className="px-4 pt-6 pb-5 flex-1 flex flex-col">
        <h3
          className="font-extrabold text-[15px] mb-1"
          style={{ color: NAVY, fontFamily: "var(--font-raleway), sans-serif" }}
        >
          {product.name}
        </h3>
        <p
          className="text-[14px] font-bold italic mb-2"
          style={{ color: ORANGE }}
        >
          {product.chemistry ? `Best for ${product.chemistry}` : ""}
        </p>
        <p className="text-[16px] text-stone-500 leading-relaxed mb-3 line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* Bullet features */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {product.features.slice(0, 3).map((f: string, i: number) => (
              <li
                key={i}
                className="flex items-center gap-2 text-[11px] text-stone-600"
              >
                <svg
                  className="w-3 h-3 shrink-0"
                  style={{ color: ORANGE }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="line-clamp-1 text-[14px]">{f}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom links */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
          <Link
            href={`/products/${substrate}/${product.id}`}
            className="text-[14px] font-bold flex items-center gap-1 hover:gap-2 transition-all"
            style={{ color: NAVY }}
          >
            Explore →
          </Link>
          {((product as any).tdsUrl) && (
            <a
              href={(product as any).tdsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold flex items-center gap-1"
              style={{ color: ORANGE }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Request TDS
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
