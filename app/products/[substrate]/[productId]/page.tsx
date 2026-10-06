"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, FileText, Download, ShieldCheck, Award, Leaf, Headphones, Package } from "lucide-react";
import { useProducts, type ProductItem } from "@/context/ProductContext";
import { categoryLabel, splitHeading, sectionTitleFor, tdsHref, tdsZipHref, dyeColor } from "@/lib/product-display";

const NAVY = "#1e3a5f";
const ORANGE = "#ea580c";
const FONT = { fontFamily: "var(--font-raleway), sans-serif" };

const PROMISES = [
  { title: "Reliable Protection", text: "Coatings that safeguard wood and extend its life.", icon: ShieldCheck },
  { title: "Consistent Quality", text: "Trusted performance in every application.", icon: Award },
  { title: "Sustainable Approach", text: "Responsible chemistry for a better tomorrow.", icon: Leaf },
  { title: "Expert Support", text: "Technical guidance you can rely on.", icon: Headphones },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function ProductPage() {
  const { substrate, productId } = useParams<{ substrate: string; productId: string }>();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === productId);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-xl font-bold" style={{ ...FONT, color: NAVY }}>Product not found</p>
        <Link href={`/products/${substrate}`} className="text-sm font-bold" style={{ color: ORANGE }}>← Back to {categoryLabel(substrate)}</Link>
      </div>
    );
  }

  // Names like "For Metals" have no main part; lead with the category ("Paint Removers / For Metals")
  const split = splitHeading(product.name);
  const heading = /^for\s/i.test(split.main)
    ? { main: categoryLabel(product.substrate), highlight: product.name }
    : split;
  const banner = product.banner || product.image;
  // Older products have no items yet; show their single TDS as one card
  const items: ProductItem[] = product.items?.length
    ? product.items
    : product.tdsUrl
      ? [{ id: product.id, name: product.name, image: product.image, tdsUrl: product.tdsUrl, tdsName: product.tdsName || "" }]
      : [];
  const hasAnyTds = items.some((i) => i.tdsUrl);
  const title = product.sectionTitle || !/^for\s/i.test(product.name) ? sectionTitleFor(product) : categoryLabel(product.substrate);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f7f3ef]">
        {banner && (
          <div className="absolute inset-0">
            <Image src={banner} alt={product.name} fill priority sizes="100vw" className="object-cover object-center" />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3ef] via-[#f7f3ef]/80 to-transparent" /> */}
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pb-20">
          <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-stone-800">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/products/${product.substrate}`} className="hover:text-stone-800">{categoryLabel(product.substrate)}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-stone-800">{product.name}</span>
          </nav>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-md">
            <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-extrabold uppercase leading-[1.05] mb-5" style={{ ...FONT, color: NAVY }}>
              {heading.main}
              {heading.highlight && <><br /><span style={{ color: ORANGE }}>{heading.highlight}</span></>}
            </h1>
            <div className="w-10 h-0.5 rounded-full mb-5" style={{ background: ORANGE }} />
            {product.description && (
              <p className="text-stone-700 text-[14px] leading-relaxed whitespace-pre-line">{product.description}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2 {...fadeUp} className="text-center text-2xl sm:text-3xl font-extrabold uppercase tracking-wide mb-8" style={{ ...FONT, color: NAVY }}>
          Our <span style={{ color: ORANGE }}>{title}</span>
        </motion.h2>

        {items.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-stone-200">
            <p className="text-stone-500">Products coming soon. Contact us for more details.</p>
            <Link href="/contact-us" className="mt-3 inline-block text-sm font-bold" style={{ color: ORANGE }}>Contact Us →</Link>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {items.map((item, i) => (
              <motion.div key={item.id} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }}
                className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative aspect-video bg-linear-to-br from-[#f7f3ef] to-[#efe6dc] flex items-center justify-center">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-center" />
                  ) : product.substrate === "dyestuff" ? (
                    <span className="w-20 h-20 rounded-full shadow-lg ring-4 ring-white"
                      style={{ background: `radial-gradient(circle at 35% 30%, ${dyeColor(item.name)}cc, ${dyeColor(item.name)} 60%)` }} />
                  ) : (
                    <Package className="w-12 h-12 text-[#c9b8a6]" strokeWidth={1.2} />
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center text-center px-4 pt-5 pb-6">
                  <h3 className="text-[15px] font-bold leading-snug whitespace-pre-line" style={{ ...FONT, color: NAVY }}>{item.name}</h3>
                  <div className="w-8 h-0.5 rounded-full my-3" style={{ background: ORANGE }} />
                  <TdsButton item={item} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Request TDS for all */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div {...fadeUp} className="rounded-xl bg-[#f7f1ea] border border-[#efe3d6] px-5 sm:px-8 py-6 flex flex-col md:flex-row items-center gap-5">
          <div className="shrink-0 w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center" style={{ borderColor: ORANGE, color: ORANGE }}>
            <FileText className="w-6 h-6" strokeWidth={1.6} />
            <span className="text-[9px] font-extrabold leading-none mt-0.5">TDS</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-[16px] font-bold" style={{ ...FONT, color: NAVY }}>Need the detailed technical information?</p>
            <p className="text-[14px] text-stone-600">Request TDS for any of our {title}.</p>
          </div>
          {hasAnyTds ? (
            <a href={tdsZipHref(product.id)} className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg text-white font-bold text-[14px] shadow-md hover:opacity-90 transition-opacity" style={{ background: ORANGE }}>
              Request TDS for All <Download className="w-4 h-4" />
            </a>
          ) : (
            <Link href="/contact-us" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg text-white font-bold text-[14px] shadow-md hover:opacity-90 transition-opacity" style={{ background: ORANGE }}>
              Request TDS for All <Download className="w-4 h-4" />
            </Link>
          )}
        </motion.div>
      </section>

      {/* Promises */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROMISES.map((p, i) => (
            <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`flex items-start gap-4 ${i > 0 ? "lg:border-l lg:border-stone-200 lg:pl-6" : ""}`}>
              <p.icon className="w-10 h-10 shrink-0" style={{ color: ORANGE }} strokeWidth={1.4} />
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-wide mb-1" style={{ ...FONT, color: NAVY }}>{p.title}</p>
                <p className="text-[13px] text-stone-600 leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TdsButton({ item }: { item: ProductItem }) {
  const cls = "inline-flex items-center gap-2 px-5 py-2 rounded-md border text-[13px] font-bold transition-colors hover:bg-orange-50";
  const style = { borderColor: ORANGE, color: ORANGE };
  const content = <><FileText className="w-4 h-4" /> Request TDS</>;
  return item.tdsUrl
    ? <a href={tdsHref(item)} className={cls} style={style}>{content}</a>
    : <Link href="/contact-us" className={cls} style={style}>{content}</Link>;
}
