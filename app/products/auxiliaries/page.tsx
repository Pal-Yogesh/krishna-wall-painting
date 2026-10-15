"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendingUp, ShieldCheck, PaintRoller, Sparkles, Droplet, Layers, PaintBucket,
  CircleDot, Armchair, DoorOpen, Palette, BadgeCheck, ThumbsUp, Leaf, Users,
  ArrowRight, ChevronRight,
} from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { productsFor } from "@/lib/product-display";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const BROWN = "#8b5a2b";
const FONT = { fontFamily: "var(--font-raleway), sans-serif" };

const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2FWood%20Auxiliaries.jpeg?alt=media&token=e94ab33b-39b4-49b1-84cb-066dad4a7948";
const CTA_IMAGE = "/paint-images/images/2.jpg";

const HIGHLIGHTS = [
  { title: "Performance Boost", text: "Enhances coating performance and durability.", icon: TrendingUp, color: ORANGE, bg: "bg-orange-50" },
  { title: "Consistent Quality", text: "Ensures uniform results and reliable performance.", icon: ShieldCheck, color: NAVY, bg: "bg-blue-50" },
  { title: "Easy Application", text: "Improves flow, leveling and ease of application.", icon: PaintRoller, color: "#ca8a04", bg: "bg-amber-50" },
  { title: "Enhanced Finish", text: "Delivers superior appearance and smooth finish.", icon: Sparkles, color: "#16a34a", bg: "bg-green-50" },
];

// Icon for each auxiliaries group (managed in admin), picked from its name
const groupIcon = (name: string) =>
  /glaze/i.test(name) ? Droplet : /equali|equili/i.test(name) ? Layers : /patina/i.test(name) ? PaintBucket : /wax/i.test(name) ? CircleDot : Sparkles;

// Replace these with your own image URLs
const APPLICATIONS = [
  { label: "Custom Woodworking", icon: Armchair, image: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2Fapplications%20-Custom%20Woodworking.png?alt=media&token=a29b1eae-1689-4677-a5c9-aa2217e18938" },
  { label: "Interior Design", icon: DoorOpen, image: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2Fapplication%20-%20interior%20design.png?alt=media&token=f3724204-80f2-41df-b1da-d99f35d30507" },
  { label: "Mass-Market Wood Laminates", icon: PaintRoller, image: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2Fapplication-%20mass%20market.png?alt=media&token=c5304a19-cc39-41ae-bd0b-ce41af82c413" },
  { label: "Musical Instruments", icon: Sparkles, image: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2Fapplications%20-%20Musical%20Instruments.png?alt=media&token=4a495cba-40f1-4c66-8c69-fc33aa1ce1f3" },
  { label: "Artisanal Wood Antiques", icon: Palette, image: "https://firebasestorage.googleapis.com/v0/b/multi-vendor-jewellery.firebasestorage.app/o/wall-paint-images%2Fproducts%2Fapplications%20Artisanal%20Wood%20%26%20Antiques.png?alt=media&token=a389b018-b734-48ea-b4fe-f642368100b3" },
];

const WHY = [
  { label: "High Performance\nFormulations", icon: ShieldCheck, color: ORANGE },
  { label: "Consistent\nResults", icon: BadgeCheck, color: NAVY },
  { label: "Easy to Use\nSolutions", icon: ThumbsUp, color: "#ca8a04" },
  { label: "Environment\nConscious", icon: Leaf, color: "#16a34a" },
  { label: "Technical Support\nYou Can Rely On", icon: Users, color: "#1d4ed8" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function WoodAuxiliariesPage() {
  const { products, loading } = useProducts();
  const groups = productsFor(products, "auxiliaries");
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-y-0 right-0 w-full md:w-[62%]">
          <Image src={HERO_IMAGE} alt="Brush applying finish on wood" fill priority sizes="(min-width: 768px) 62vw, 100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/40 md:via-white/15 md:to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pb-24">
          <nav className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-stone-800">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-stone-800">Wood Auxiliaries</span>
          </nav>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-lg">
            <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.08] mb-5" style={{ ...FONT, color: NAVY }}>
              Wood Auxiliaries<br /><span style={{ color: ORANGE }}>For Every Application</span>
            </h1>
            <div className="w-10 h-0.5 rounded-full mb-5" style={{ background: ORANGE }} />
            <p className="text-stone-600 text-[14px] leading-relaxed mb-8 max-w-sm">
              Complementary products that enhance coating performance, application ease, and final finish quality for wood substrates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact-us" className="inline-flex items-center px-5 py-3 rounded-lg text-white font-bold text-[13px] shadow-md hover:opacity-90 transition-opacity" style={{ background: ORANGE }}>
                Request TDS
              </Link>
              <Link href="/contact-us" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-[13px] border bg-white hover:bg-stone-50 transition-colors" style={{ borderColor: NAVY, color: NAVY }}>
                Talk to Expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <motion.div {...fadeUp} className="rounded-2xl border border-stone-200 bg-white shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <div key={h.title} className={`flex items-start gap-4 p-5 sm:p-6 ${i > 0 ? "border-t sm:border-t-0 lg:border-l border-stone-200" : ""} ${i === 1 ? "sm:border-l" : ""} ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 3 ? "sm:border-t sm:border-l lg:border-t-0" : ""}`}>
              <span className={`shrink-0 w-11 h-11 rounded-full ${h.bg} ring-1 ring-black/5 flex items-center justify-center`}>
                <h.icon className="w-5 h-5" style={{ color: h.color }} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-[13px] font-extrabold mb-1" style={{ ...FONT, color: NAVY }}>{h.title}</p>
                <p className="text-[12px] text-stone-500 leading-relaxed">{h.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Our Wood Auxiliaries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <SectionTitle>
          Our <span style={{ color: ORANGE }}>Wood Auxiliaries</span>
        </SectionTitle>
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : groups.length === 0 ? (
          <p className="text-center text-stone-500 py-10">Products coming soon. <Link href="/contact-us" className="font-bold" style={{ color: ORANGE }}>Contact us →</Link></p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((g, i) => {
              const Icon = groupIcon(g.name);
              return (
                <motion.div key={g.id} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }}>
                <Link href={`/products/auxiliaries/${g.id}`}
                  className="group rounded-2xl bg-[#f8f2eb] border border-[#efe3d6] p-5 sm:p-6 flex items-start gap-4 h-full hover:shadow-md transition-shadow">
                  <span className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-sm" style={{ background: BROWN }}>
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-extrabold uppercase tracking-wide mb-3 mt-2" style={{ ...FONT, color: NAVY }}>{g.name}</h3>
                    <ul className="space-y-2">
                      {(g.items || []).map((item) => (
                        <li key={item.id} className="flex items-center gap-2.5 text-[13px] text-stone-600">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-bold" style={{ color: ORANGE }}>
                      View Products <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Applications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <SectionTitle>Applications</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {APPLICATIONS.map((a, i) => (
            <motion.div key={a.label} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-32 sm:h-36 overflow-hidden bg-stone-100">
                <Image src={a.image} alt={a.label} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="relative flex flex-col items-center px-3 pt-8 pb-4">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md ring-1 ring-stone-100 flex items-center justify-center">
                  <a.icon className="w-5 h-5" style={{ color: i % 2 ? NAVY : ORANGE }} strokeWidth={1.8} />
                </span>
                <span className="text-[12px] font-bold text-center leading-tight" style={{ color: NAVY }}>{a.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <motion.h2 {...fadeUp} className="text-center text-xl sm:text-2xl font-extrabold uppercase tracking-wide mb-8" style={{ ...FONT, color: NAVY }}>
          Why Choose Krishna Wood Auxiliaries?
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8">
          {WHY.map((w, i) => (
            <motion.div key={w.label} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`flex flex-col items-center gap-3 px-2 ${i > 0 ? "lg:border-l lg:border-stone-200" : ""}`}>
              <w.icon className="w-9 h-9" style={{ color: w.color }} strokeWidth={1.5} />
              <span className="text-[12px] font-bold text-center leading-tight whitespace-pre-line" style={{ color: NAVY }}>{w.label}</span>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* CTA */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-2xl border border-[#efe3d6] bg-[#f8f2eb]">
          <div className="absolute inset-x-0 bottom-0 h-44 md:inset-y-0 md:left-auto md:h-auto md:w-1/2">
            <Image src={CTA_IMAGE} alt="Wooden furniture" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-[#f8f2eb] via-transparent md:via-[#f8f2eb]/20 to-transparent" />
          </div>
          <div className="relative p-6 pb-52 sm:p-10 sm:pb-56 md:pb-10 max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3" style={{ ...FONT, color: NAVY }}>
              Need the <span style={{ color: ORANGE }}>right solution</span><br />
              for your <span style={{ color: ORANGE }}>wood application?</span>
            </h2>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-6">
              Our technical team can help you choose the right auxiliary for superior performance and perfect finish.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact-us" className="inline-flex items-center px-5 py-3 rounded-lg text-white font-bold text-[13px] shadow-md hover:opacity-90 transition-opacity" style={{ background: ORANGE }}>
                Request TDS
              </Link>
              <Link href="/contact-us" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-[13px] border bg-white hover:bg-stone-50 transition-colors" style={{ borderColor: NAVY, color: NAVY }}>
                Talk to Expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section> */}

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
          <h3 className="text-3xl font-extrabold mb-6" style={{ ...FONT, color: NAVY }}>
            Explore Other Substrates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/products/wood", img: "/new-images-update/wood.jpeg", title: "Wood Coatings", desc: "Premium coatings for beautiful and durable wood finishes." },
              { href: "/products/metal", img: "/new-images-update/metal.jpeg", title: "Metal Coatings", desc: "High performance coatings for metal substrates." },
              { href: "/products/glass", img: "/new-images-update/glass.jpeg", title: "Glass & Plastic Coatings", desc: "Advanced coating solutions for glass and plastic." },
              { href: "/products/dyestuff", img: "/paint-images/images/4.jpg", title: "Dyestuff Solutions", desc: "Industrial dyes and colourants for vibrant results." },
              { href: "/products/paint-removers", img: "/paint-images/images/4.jpg", title: "Paint Removers", desc: "Effective paint removers for wood, metal, and glass." },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all">
                <img src={s.img} alt={s.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <div>
                  <p className="font-bold text-[14px]" style={{ color: NAVY }}>{s.title}</p>
                  <p className="text-[12px] text-stone-400">{s.desc}</p>
                  <span className="text-[12px] font-bold mt-1 inline-block" style={{ color: ORANGE }}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...fadeUp} className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide" style={{ ...FONT, color: NAVY }}>{children}</h2>
      <div className="w-10 h-0.5 mx-auto mt-3 rounded-full" style={{ background: ORANGE }} />
    </motion.div>
  );
}
