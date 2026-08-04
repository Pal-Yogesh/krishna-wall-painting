"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Products",         href: "/products"    },
  { label: "Visualizer",       href: "/wood-panel-visualizer"  },
  { label: "About Us",         href: "/about"       },
  { label: "Careers",         href: "/careers"       },
  { label: "Gallery",         href: "/gallery"       },
  { label: "Events",         href: "/events"       },
  { label: "Contact Us",       href: "/contact-us"  },
];

const SOCIAL_LINKS = [
  {
    name: "Instagram", href: "https://instagram.com", color: "#E1306C",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    name: "Facebook", href: "https://facebook.com", color: "#1877F2",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    name: "LinkedIn", href: "https://www.linkedin.com/company/krishnamurariorganosyspvtltd/", color: "#0A66C2",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    name: "WhatsApp", href: "https://wa.me/918588830308", color: "#25D366",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
  {
    name: "X (Twitter)", href: "https://x.com", color: "#000000",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
];

const ACCENT_SWATCHES = [
  "#C1623F","#E8A87C","#D4A017","#8FAF7E","#7BB8D4","#5C3A5E",
  "#D4898A","#2C3E6B","#6D9E8C","#B8956A","#355E3B","#4A4A4A",
];

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="relative" style={{ background: "linear-gradient(135deg, #fdf6ee 0%, #fef3e2 25%, #faf0e4 50%, #f8edd9 75%, #fdf6ee 100%)" }} aria-label="Site footer">
      {/* Paint swatch accent strip */}
      <div className="flex h-1.5 w-full overflow-hidden">
        {ACCENT_SWATCHES.map((color, i) => (
          <div key={i} className="flex-1 transition-all duration-300 hover:flex-[2]" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              
              <Image src="/logo.png" alt="KMOPL Logo" className="w-40 h-28 object-contain" width={1000} height={1000} />
            </Link>

           

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map(social => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: hoveredSocial === social.name ? social.color : "#f5f5f4",
                    color: hoveredSocial === social.name ? "white" : "#78716c",
                    border: `1px solid ${hoveredSocial === social.name ? social.color : "#e7e5e4"}`,
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="group flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 transition-colors" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-amber-400 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Wood Coatings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-5">Popular Coatings</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "NC Coatings", href: "/products/wood/nc-coatings-for-wood", img: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0001.jpg" },
                { name: "PU Coatings", href: "/products/wood/pu-coatings-for-wood", img: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0002.jpg" },
                { name: "Polyester Coatings", href: "/products/wood/unsaturated-polyester-coatings-for-wood", img: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0003.jpg" },
                { name: "1K Acrylic Coatings", href: "/products/wood/1k-acrylic-coatings-for-wood", img: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0004.jpg" },
                { name: "UV Coatings", href: "/products/wood/uv-coatings-for-wood", img: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0005.jpg" },
                { name: "1K Water-Based", href: "/products/wood/1k-wb-coatings-for-wood", img: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0006.jpg" },
                { name: "2K Water-Based", href: "/products/wood/2k-wb-coatings-for-wood", img: "/wood/KMOPL WOOD PANEL NAMES_compressed_page-0007.jpg" },
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href}
                    className="group flex items-center gap-2.5 text-sm text-stone-500 hover:text-amber-700 transition-colors" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                    <Image src={item.img} alt={item.name} width={24} height={24} className="w-6 h-6 rounded-full object-cover shrink-0 border border-stone-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products/wood" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors mt-1 inline-block">
                  View all Wood Coatings →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="w-[280px]">
            <h4 className="text-xs font-bold uppercase  tracking-[0.2em] text-stone-400 mb-5">Get in Touch</h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>, label: "Phone", value: "+91 85888 30308 - +91 98101 50049" },
                // { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>, label: "Phone 2", value: "+91 98101 50049", href: "tel:+919810150049" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, label: "Email", value: "sales@krishna-chemicals.com", href: "mailto:sales@krishna-chemicals.com" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, label: "Address", value: "B-169 & B-170, Industrial Area Phase-II, Noida, G.B. Nagar, U.P.-201305", href: null },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-amber-50 border border-amber-100 text-amber-600">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[13px] text-stone-600 hover:text-amber-700 transition-colors" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[13px] text-stone-600" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Embedded Map */}
              <div className="mt-3 rounded-xl overflow-hidden border border-stone-200 shadow-sm" style={{ height: "140px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3505.0601211051157!2d77.41039067549734!3d28.5379125757166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDMyJzE2LjUiTiA3N8KwMjQnNDYuNyJF!5e0!3m2!1sen!2sin!4v1784703408268!5m2!1sen!2sin"
                  width="100%"
                  height="140"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="KMOPL Location"
                />
              </div>
          
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-300/99">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400 text-center sm:text-left" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            © {new Date().getFullYear()} Krishna Murari Organosys Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-and-conditions" },
            ].map(item => (
              <Link key={item.label} href={item.href} className="text-xs text-stone-400 hover:text-amber-600 transition-colors" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-stone-400 text-center sm:text-right" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            Designed by <a href="/" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">Bigleaf Media</a>
          </p>
        </div>
      </div>

      {/* Bottom paint swatch strip */}
      <div className="flex h-1 w-full overflow-hidden">
        {[...ACCENT_SWATCHES].reverse().map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
    </footer>
  );
}
