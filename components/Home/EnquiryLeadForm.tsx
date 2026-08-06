"use client";

// components/home/EnquiryLeadForm.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Enquiry / Lead Capture Section
//
// Design: Warm editorial split — left panel is a rich dark charcoal sidebar
// with trust signals, testimonial, and paint swatch accent; right is a bright
// form card on warm parchment. Animated field focus states with color-coded
// validation. Confetti burst on successful submission.
//
// Fields: Name, Mobile (Indian), City, Room Type, Color Interest, Message
// Submission: POST /api/enquiry with loading / success / error states
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useToast } from "@/context/Toast";

// ── Constants ─────────────────────────────────────────────────────────────────
const COATING_TYPES = ["Wood", "Metal", "Glass"];

const COLOR_OPTIONS = [
  { hex: "#5C3A1E", name: "Classic Walnut" },
  { hex: "#3B2210", name: "Dark Walnut" },
  { hex: "#8B5E3C", name: "Royal Teak" },
  { hex: "#C4A56E", name: "Natural Maple" },
  { hex: "#D4B078", name: "Light Oak" },
  { hex: "#A87D3E", name: "Golden Teak" },
  { hex: "#6B4226", name: "Rustic Brown" },
  { hex: "#4A2C17", name: "Coffee Brown" },
  { hex: "#6B1C1C", name: "Rich Mahogany" },
  { hex: "#8C7254", name: "Vintage Oak" },
  { hex: "#7B4B2A", name: "Warm Chestnut" },
  { hex: "#C08B3E", name: "Honey Teak" },
];

const TRUST_POINTS = [
  { icon: "⚡", title: "24h Callback",     desc: "Our team calls back within one business day." },
  { icon: "🔒", title: "No Spam",          desc: "Your details are never shared with third parties." },
  { icon: "🎨", title: "Expert Advice",    desc: "Get personalised coating suggestions from our team." },
  { icon: "💯", title: "Zero Obligation",  desc: "Just an enquiry — no purchase commitment needed." },
];

// ── Form state type ───────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  mobile: string;
  city: string;
  coatingType: string;
  colorInterest: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", mobile: "", city: "", coatingType: "", colorInterest: "", message: "" };

// ── Validation ────────────────────────────────────────────────────────────────
function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errs: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim() || form.name.trim().length < 2)        errs.name        = "Please enter your full name.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, "")))   errs.mobile      = "Enter a valid 10-digit Indian mobile number.";
  if (!form.city.trim())                                        errs.city        = "Please enter your city.";
  if (!form.coatingType)                                        errs.coatingType = "Please select a coating type.";
  return errs;
}

// ── Animated confetti burst (CSS-only) ───────────────────────────────────────
function ConfettiPiece({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      initial={{ y: 0, x, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ y: -200, opacity: 0, rotate: 720, scale: 0 }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
      className="absolute bottom-0 w-2.5 h-2.5 rounded-sm pointer-events-none"
      style={{ background: color, left: `${x}%` }}
    />
  );
}

// ── Floating label input ──────────────────────────────────────────────────────
function FloatInput({
  label, name, type = "text", value, onChange, error, placeholder, autoComplete,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder?: string; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={floated ? placeholder : ""}
          className="w-full px-4 pt-5 pb-2.5 rounded-2xl text-[15px] text-stone-800 bg-white outline-none transition-all duration-200 peer"
          style={{
            border: `1.5px solid ${error ? "#ef4444" : focused ? "#d97706" : "#e7e5e4"}`,
            boxShadow: focused && !error ? "0 0 0 3px rgba(217,119,6,0.12)" : error ? "0 0 0 3px rgba(239,68,68,0.08)" : "none",
          }}
        />
        <label
          className="absolute left-4 text-stone-400 pointer-events-none transition-all duration-200"
          style={{
            top: floated ? 8 : "50%",
            transform: floated ? "none" : "translateY(-50%)",
            fontSize: floated ? 10 : 14,
            fontWeight: floated ? 700 : 400,
            letterSpacing: floated ? "0.1em" : "normal",
            textTransform: floated ? "uppercase" : "none",
            color: error ? "#ef4444" : focused ? "#d97706" : floated ? "#a8a29e" : "#a8a29e",
          }}
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500 mt-1.5 ml-1 font-semibold flex items-center gap-1"
          >
            <span>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main EnquiryLeadForm ──────────────────────────────────────────────────────
export default function EnquiryLeadForm() {
  const [form, setForm]         = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors]     = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const { showToast } = useToast();

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  const setField = useCallback((key: keyof FormState) => (val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  }, []);

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("loading");
    try {
      // Save directly to Firestore
      await addDoc(collection(db, "enquiries"), {
        ...form,
        createdAt: Timestamp.now(),
      });

      // Also send via API for email notification (non-blocking)
      fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, skipFirestore: true }),
      }).catch(() => {});

      setStatus("success");
      setShowConfetti(true);
      showToast("Enquiry submitted successfully! We'll contact you within 24 hours.", "success");
      setTimeout(() => setShowConfetti(false), 2000);
    } catch {
      setStatus("error");
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  const handleReset = () => { setForm(INITIAL_FORM); setErrors({}); setStatus("idle"); };

  const confettiColors = ["#f59e0b","#d97706","#C1623F","#7BB8D4","#8FAF7E","#5C3A5E","#D4A017"];

  return (
    <section
      ref={sectionRef}
      id="enquiry"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fefdfb 0%, #f0e6d4 60%, #faf8f4 100%)" }}
    >
      {/* ── Background ──────────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }}/>
        <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #fed7aa 0%, transparent 70%)" }}/>
        {/* Faint dots */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
          <defs><pattern id="qdots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#78716c"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#qdots)"/>
        </svg>
        {/* Decorative arc */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-[0.06]" viewBox="0 0 200 200">
          <path d="M 200 0 A 200 200 0 0 0 0 200" stroke="#d97706" strokeWidth="3" fill="none"/>
          <path d="M 200 40 A 160 160 0 0 0 40 200" stroke="#d97706" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5"
            style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}
          >
            Get a Free Consultation
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.4rem)] font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.04em" }}
          >
            Ready to Transform
            <br />
            <span style={{ color: "#d97706" }}>Your Space?</span>
          </h2>
          <p className="mt-4 text-[14.5px] text-stone-500 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            Tell us about your project and our paint experts will reach out within 24 hours — no cost, no commitment.
          </p>
        </motion.div>

        {/* ── Main card ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.06)]"
        >
          {/* ── Left: Trust sidebar ──────────────────────────────────────── */}
          <div
            className="relative p-10 flex flex-col justify-between gap-8"
            style={{ background: "linear-gradient(160deg, #292524 0%, #1c1917 100%)" }}
          >
           

            {/* Headline */}
            <div>
              {/* Company Logo */}
              <img src="/logo.png" alt="KMOPL" className="w-full h-20 object-contain mb-4 invert flex justify-center items-center" />
              <h3
                className="text-[1.75rem] font-bold text-white leading-tight mb-3"
                style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}
              >
                Let's Coat Your World{" "}
                <span style={{ color: "#f59e0b" }}>Right.</span>
              </h3>
              <p className="text-sm text-white/45 leading-relaxed" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                Our coating consultants have helped 500+ clients find their perfect finish. You're next.
              </p>
            </div>

            {/* Trust points */}
            <div className="flex flex-col gap-5">
              {TRUST_POINTS.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3.5"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{pt.icon}</span>
                  <div>
                    <p className="text-[13px] font-bold text-white/85" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{pt.title}</p>
                    <p className="text-xs text-white/40 leading-snug mt-0.5">{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          
            <div
              className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
            />
          </div>

          {/* ── Right: Form ──────────────────────────────────────────────── */}
          <div className="relative bg-white p-10">

            {/* Confetti */}
            <AnimatePresence>
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                  {[...Array(18)].map((_, i) => (
                    <ConfettiPiece
                      key={i}
                      delay={i * 0.06}
                      x={10 + (i * 5) % 80}
                      color={confettiColors[i % confettiColors.length]}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Success state */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[480px] text-center gap-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 12px 32px rgba(217,119,6,0.4)" }}
                  >
                    ✓
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      Enquiry Sent!
                    </h3>
                    <p className="text-stone-500 text-sm max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      Our team will call you at <strong className="text-stone-700">{form.mobile}</strong> within 24 hours. Keep your eyes on your phone!
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-2 text-sm font-bold text-amber-600 hover:underline underline-offset-2 transition-colors"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    Submit another enquiry →
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      Tell us about your project
                    </h3>
                    <p className="text-sm text-stone-400 mt-1">
                      Fields marked <span className="text-red-400">*</span> are required
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <FloatInput
                      label="Full Name *"
                      name="name"
                      value={form.name}
                      onChange={setField("name")}
                      error={errors.name}
                      autoComplete="name"
                    />
                    {/* Email */}
                    <FloatInput
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      error={errors.email}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {/* Mobile */}
                    <FloatInput
                      label="Mobile Number *"
                      name="mobile"
                      type="tel"
                      value={form.mobile}
                      onChange={setField("mobile")}
                      error={errors.mobile}
                      placeholder="10-digit number"
                      autoComplete="tel"
                    />
                    {/* City */}
                    <FloatInput
                      label="City *"
                      name="city"
                      value={form.city}
                      onChange={setField("city")}
                      error={errors.city}
                      autoComplete="address-level2"
                    />
                    {/* Coating Type */}
                    <div className="relative sm:col-span-2">
                      <select
                        value={form.coatingType}
                        onChange={e => setField("coatingType")(e.target.value)}
                        className="w-full px-4 pt-5 pb-2.5 rounded-2xl text-[15px] bg-white outline-none appearance-none transition-all duration-200 cursor-pointer"
                        style={{
                          border: `1.5px solid ${errors.coatingType ? "#ef4444" : form.coatingType ? "#d97706" : "#e7e5e4"}`,
                          color: form.coatingType ? "#1c1917" : "#a8a29e",
                          boxShadow: errors.coatingType ? "0 0 0 3px rgba(239,68,68,0.08)" : "none",
                        }}
                      >
                        <option value="" disabled>Select coating type</option>
                        {COATING_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <label
                        className="absolute left-4 text-[10px] font-bold uppercase tracking-[0.1em] pointer-events-none"
                        style={{ top: 8, color: errors.coatingType ? "#ef4444" : "#a8a29e" }}
                      >
                        Coating Type *
                      </label>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                      {errors.coatingType && (
                        <p className="text-xs text-red-500 mt-1.5 ml-1 font-semibold">⚠ {errors.coatingType}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-4 relative">
                    <textarea
                      value={form.message}
                      onChange={e => setField("message")(e.target.value)}
                      placeholder=" "
                      rows={3}
                      className="w-full px-4 pt-6 pb-3 rounded-2xl text-[14.5px] text-stone-800 bg-white outline-none resize-none transition-all duration-200 peer"
                      style={{ border: "1.5px solid #e7e5e4" }}
                      onFocus={e => (e.target.style.borderColor = "#d97706", e.target.style.boxShadow = "0 0 0 3px rgba(217,119,6,0.12)")}
                      onBlur={e => (e.target.style.borderColor = "#e7e5e4", e.target.style.boxShadow = "none")}
                    />
                    <label
                      className="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400 pointer-events-none"
                    >
                      Additional Notes
                    </label>
                  </div>

                  {/* Error state */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 px-4 py-3 rounded-xl text-sm text-red-700 font-semibold flex items-center gap-2"
                        style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
                      >
                        <span>⚠</span> Something went wrong. Please try again or call us directly.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-[15px] transition-all disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        boxShadow: "0 8px 24px rgba(217,119,6,0.38)",
                        fontFamily: "var(--font-raleway), sans-serif",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                          </svg>
                          Send Enquiry
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-stone-400 max-w-[220px] leading-relaxed" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      By submitting, you agree to be contacted by our team. No spam, ever.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Bottom: Phone strip ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <p className="text-sm text-stone-500" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            Prefer to call directly?
          </p>
          <a
            href="tel:++918588830308"
            className="flex items-center gap-2 font-bold text-stone-800 hover:text-amber-700 transition-colors text-[15px]"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
              📞
            </span>
            +91 85888 30308
          </a>
          <a
            href="tel:+01204278000"
            className="flex items-center gap-2 font-bold text-stone-800 hover:text-amber-700 transition-colors text-[15px]"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
              📞
            </span>
            0120-4278000
          </a>
          <span className="text-stone-300 hidden sm:block">•</span>
          <p className="text-sm text-stone-400" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
            Mon - Sat, 9 AM - 6 PM
          </p>
        </motion.div>
      </div>
    </section>
  );
}