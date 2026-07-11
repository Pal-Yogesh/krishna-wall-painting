"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useToast } from "@/context/Toast";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Job {
  id: string;
  title: string;
  location?: string;
  qualification?: string;
  experience?: string;
  industry?: string;
  description?: string;
  applyEmail?: string;
  active?: boolean;
  createdAt?: { seconds: number };
}

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  qualification: string;
  expertise: string;
}

const INITIAL_FORM: ApplicationForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  qualification: "",
  expertise: "",
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

// ── Unsplash imagery (workplace / team / industrial themes) ─────────────────────
const IMG = {
  heroMain: "/career/4.jpeg",
  heroA: "/career/2.jpeg",
  heroB: "/career/3.jpeg",
  talent:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80",
  access: "/access.jpeg",
  testimonial: "/about2.jpeg",
};

// ── Perks / benefits ────────────────────────────────────────────────────────────
const PERKS = [
  {
    title: "Growth & Learning",
    desc: "Continuous training, mentorship, and clear pathways to grow your career with us.",
    color: "#d97706",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: "Collaborative Culture",
    desc: "Work alongside passionate experts in a supportive, team-first environment.",
    color: "#16a34a",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    title: "Recognition & Rewards",
    desc: "Your contributions matter — we celebrate wins and reward performance.",
    color: "#0891b2",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
        />
      </svg>
    ),
  },
  {
    title: "Stability & Trust",
    desc: "Build your future with an established, growing brand trusted across India.",
    color: "#7c3aed",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
];

// ── Stats ───────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "500+", label: "Team Members" },
  { value: "20+", label: "Years Strong" },
  { value: "15+", label: "Cities" },
  { value: "98%", label: "Retention" },
];

// ── Values ──────────────────────────────────────────────────────────────────────
const VALUES = [
  {
    emoji: "🎯",
    title: "Purpose-Driven",
    desc: "We build coatings that protect and beautify — and people who take pride in it.",
  },
  {
    emoji: "🤝",
    title: "People First",
    desc: "Every role matters. We invest in our people as much as our products.",
  },
  {
    emoji: "🚀",
    title: "Always Improving",
    desc: "We embrace new tech and ideas to stay ahead in a changing industry.",
  },
];

function formatPostedDate(ts?: { seconds: number }) {
  if (!ts) return "";
  return new Date(ts.seconds * 1000).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ── Decorative geometric shapes (Careely style) ─────────────────────────────────
function QuarterCircle({
  className,
  color,
  rotate = 0,
  style,
}: {
  className?: string;
  color: string;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" fill={color} />
      </svg>
    </div>
  );
}

// ── Framed circular photo with surrounding shapes ────────────────────────────────
function FramedPhoto({
  src,
  size = 280,
  ringColor = "#16a34a",
  className = "",
}: {
  src: string;
  size?: number;
  ringColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: ringColor,
          transform: "scale(1.08)",
          opacity: 0.18,
        }}
      />
      <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

// ── Floating label input ──────────────────────────────────────────────────────
function FloatInput({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={floated ? placeholder : ""}
        className="w-full px-4 pt-5 pb-2.5 rounded-2xl text-[15px] text-stone-800 bg-white outline-none transition-all duration-200"
        style={{
          border: `1.5px solid ${error ? "#ef4444" : focused ? "#d97706" : "#e7e5e4"}`,
          boxShadow:
            focused && !error ? "0 0 0 3px rgba(217,119,6,0.12)" : "none",
        }}
      />
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200"
        style={{
          top: floated ? 8 : "50%",
          transform: floated ? "none" : "translateY(-50%)",
          fontSize: floated ? 10 : 14,
          fontWeight: floated ? 700 : 400,
          letterSpacing: floated ? "0.1em" : "normal",
          textTransform: floated ? "uppercase" : "none",
          color: error ? "#ef4444" : focused ? "#d97706" : "#a8a29e",
        }}
      >
        {label}
      </label>
      {error && (
        <p className="text-xs text-red-500 mt-1.5 ml-1 font-semibold">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export default function CareersPage() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [form, setForm] = useState<ApplicationForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ApplicationForm, string>>
  >({});
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const openingsRef = useRef<HTMLElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Fetch active jobs
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/jobs?active=true");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch {
        setJobs([]);
      } finally {
        setLoadingJobs(false);
      }
    })();
  }, []);

  const setField = useCallback(
    (key: keyof ApplicationForm) => (val: string) => {
      setForm((f) => ({ ...f, [key]: val }));
      setErrors((e) => {
        const n = { ...e };
        delete n[key];
        return n;
      });
    },
    [],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeError("");
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setResumeError("Please upload a PDF or Word document.");
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResumeError("File too large. Maximum size is 5 MB.");
      return;
    }
    setResume(file);
  };

  const validate = () => {
    const errs: Partial<Record<keyof ApplicationForm, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit mobile number.";
    if (!form.city.trim()) errs.city = "Please enter your city.";
    if (!form.qualification.trim())
      errs.qualification = "Please enter your qualification.";
    if (!form.expertise.trim())
      errs.expertise = "Please enter your area of expertise.";
    return errs;
  };

  const scrollToForm = (jobTitle?: string) => {
    if (jobTitle) setSelectedJob(jobTitle);
    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToOpenings = () => {
    openingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (!resume) {
      setResumeError("Please upload your resume.");
      return;
    }

    setStatus("loading");
    try {
      // 1. Upload resume to Cloudinary
      const fd = new FormData();
      fd.append("file", resume);
      fd.append("folder", "kmopl-resumes");
      const uploadRes = await fetch("/api/upload-resume", {
        method: "POST",
        body: fd,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.error || "Resume upload failed");
      }

      // 2. Save application via server API (bypasses client Firestore rules)
      const saveRes = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          resumeUrl: uploadData.url,
          jobTitle: selectedJob || "",
        }),
      });
      if (!saveRes.ok) {
        const err = await saveRes.json();
        throw new Error(err.error || "Failed to submit application");
      }

      setStatus("success");
      showToast(
        "Application submitted successfully! We'll be in touch.",
        "success",
      );
    } catch (e) {
      setStatus("idle");
      showToast(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setResume(null);
    setResumeError("");
    setSelectedJob("");
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] overflow-x-hidden">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1.5 z-20"
          style={{
            background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(155deg, #fff8ee 0%, #fefdfb 45%, #faf9f7 100%)",
          }}
        />
        {/* dotted texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05]"
          aria-hidden
        >
          <defs>
            <pattern
              id="dots"
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#78716c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-amber-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                We're Hiring
              </span>
              <h1
                className="text-[clamp(2.4rem,5.2vw,4rem)] font-bold text-stone-900 leading-[1.05]"
                style={{
                  fontFamily: "var(--font-raleway), sans-serif",
                  letterSpacing: "-0.04em",
                }}
              >
                Build a <span className="text-amber-500">Career</span>,
                <br />
                Shape the <span className="text-amber-500">Future</span>
              </h1>
              <p className="mt-5 text-[16px] text-stone-500 max-w-md leading-relaxed">
                We bring talented people and a trusted coatings brand together
                to launch careers, drive innovation, and build community.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={scrollToOpenings}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-lg shadow-amber-200 hover:shadow-xl transition-all active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    fontFamily: "var(--font-raleway), sans-serif",
                  }}
                >
                  View Open Roles
                  <svg
                    className="w-4 h-4"
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
                </button>
                <button
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-stone-800 font-bold text-sm bg-white border border-stone-200 hover:border-amber-300 transition-all"
                >
                  Apply Directly
                </button>
              </div>

              {/* Inline stats */}
              <div className="mt-10 grid grid-cols-4 gap-2 max-w-md">
                {STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div
                      className="text-2xl sm:text-[1.7rem] font-bold text-stone-900 tabular-nums"
                      style={{
                        fontFamily: "var(--font-raleway), sans-serif",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px] text-stone-400 font-medium mt-0.5">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: clean image grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              {/* Soft shape accents behind the grid */}
              <div
                aria-hidden
                className="absolute -top-6 -right-6 w-28 h-28 rounded-full"
                style={{ background: "#f59e0b", opacity: 0.15 }}
              />
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl"
                style={{ background: "#16a34a", opacity: 0.12 }}
              />

              <div className="relative grid grid-cols-2 grid-rows-2 gap-2 h-[440px]">
                {/* Tall main image (spans both rows) */}
                <div className="row-span-2 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG.heroMain}
                    alt="Team collaboration at KMOPL"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Top-right image */}
                <div className="rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG.heroA}
                    alt=""
                    className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-500"
                  />
                </div>
                {/* Bottom-right image */}
                <div className="rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG.heroB}
                    alt=""
                    className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PERKS ═══════════════ */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{
                background: "rgba(217,119,6,0.1)",
                color: "#b45309",
                border: "1px solid rgba(217,119,6,0.18)",
              }}
            >
              Why Work With Us
            </span>
            <h2
              className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold text-stone-900 leading-tight"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              A workplace that helps you{" "}
              <span className="text-amber-500">thrive</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: horizontal perk cards */}
            <div className="flex flex-col gap-4">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group flex items-start gap-5 p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${perk.color}15`, color: perk.color }}
                  >
                    {perk.icon}
                  </div>
                  <div>
                    <h3
                      className="text-[15px] font-bold text-stone-900 mb-1 leading-snug"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {perk.title}
                    </h3>
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/why-work-with-us/1.jpeg"
                alt="A workplace that helps you thrive"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ACCESS / FEATURE ROW 1 ═══════════════ */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full" style={{ background: "#16a34a", opacity: 0.1 }} />
            <QuarterCircle className="absolute -left-10 -top-10 w-20 h-20" color="#f59e0b" />
            <QuarterCircle className="absolute -right-8 -bottom-7 w-16 h-16" color="#16a34a" rotate={180} />
            <div className="absolute right-8 top-6 w-4 h-4 rounded-full bg-amber-400" />
            <div className="relative w-full rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl" style={{ height: "480px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.access}
                alt="Career growth at KMOPL"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span
              className="text-7xl font-bold text-stone-100 leading-none"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              01
            </span>
            <span className="block text-xs font-bold uppercase tracking-[0.25em] text-amber-600 -mt-6 mb-3">
              For You
            </span>
            <h2
              className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold text-stone-900 leading-tight"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              Access to a{" "}
              <span className="text-amber-500">Life-Long Career</span>
            </h2>
            <p className="mt-4 text-[15px] text-stone-500 leading-relaxed max-w-md">
              Turn your skills and ambition into a lasting career. We pair
              hands-on experience with mentorship and corporate connections so
              you keep growing — year after year.
            </p>
            <button
              onClick={scrollToOpenings}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
              }}
            >
              Explore Roles
              <svg
                className="w-4 h-4"
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
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIAL ═══════════════ */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-7xl font-bold text-stone-100 leading-none"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              02
            </span>
            <span className="block text-xs font-bold uppercase tracking-[0.25em] text-amber-600 -mt-6 mb-3">
              Testimonial
            </span>
            <svg
              className="w-10 h-10 text-amber-300 mb-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p
              className="text-xl sm:text-2xl font-semibold text-stone-800 leading-snug"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              "At KMOPL, you are trusted to perform from day one. You get the
              freedom to craft your own path to success, guided by leaders who
              act as mentors rather than bosses."{" "}
            </p>
            <div className="mt-5">
              <p className="font-bold text-stone-900">Manager Compliances</p>
              <p className="text-sm text-stone-400">HR & Admin</p>
            </div>
          </motion.div>
          {/* Photo with shapes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-80"
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 top-2 w-64 h-64 rounded-full"
              style={{ background: "#f59e0b", opacity: 0.12 }}
            />
            <QuarterCircle
              className="absolute left-6 top-0 w-16 h-16"
              color="#16a34a"
            />
            <div
              className="absolute left-2 bottom-12 w-5 h-5 rounded-full"
              style={{ background: "#f59e0b" }}
            />
            <QuarterCircle
              className="absolute right-8 bottom-6 w-16 h-16"
              color="#d97706"
              rotate={180}
            />
            <div
              className="absolute right-4 top-10 w-4 h-4 rounded-full"
              style={{ background: "#16a34a" }}
            />
            <FramedPhoto
              src={IMG.testimonial}
              size={250}
              ringColor="#f59e0b"
              className="absolute left-1/2 -translate-x-1/2 top-4 "
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ VALUES / CULTURE ═══════════════ */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1c1917 0%, #292524 60%, #1c1917 100%)",
        }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{
                background: "rgba(217,119,6,0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(217,119,6,0.2)",
              }}
            >
              Our Culture
            </span>
            <h2
              className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold text-white leading-tight"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              What we stand for
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-7 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="text-3xl mb-4">{v.emoji}</div>
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-[13.5px] text-white/45 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CURRENT OPENINGS ═══════════════ */}
      <section
        ref={openingsRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24"
      >
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{
              background: "rgba(217,119,6,0.1)",
              color: "#b45309",
              border: "1px solid rgba(217,119,6,0.18)",
            }}
          >
            Open Positions
          </span>
          <h2
            className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold text-stone-900 leading-tight"
            style={{
              fontFamily: "var(--font-raleway), sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Current <span className="text-amber-500">Openings</span>
          </h2>
          <p className="mt-3 text-[14px] text-stone-500">
            {loadingJobs
              ? "Loading roles…"
              : `${jobs.length} active position${jobs.length !== 1 ? "s" : ""} — find your fit.`}
          </p>
        </div>

        {loadingJobs ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">
              💼
            </div>
            <p className="font-semibold text-stone-700">
              No openings right now
            </p>
            <p className="text-sm text-stone-400 mt-1">
              Send us your resume below — we'll reach out when a role opens up.
            </p>
            <button
              onClick={() => scrollToForm()}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
              }}
            >
              Submit General Application
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative bg-white border border-stone-200/80 rounded-3xl shadow-sm hover:shadow-lg hover:border-amber-200 transition-all overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-xl font-bold text-stone-900"
                        style={{
                          fontFamily: "var(--font-raleway), sans-serif",
                        }}
                      >
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.location && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
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
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                              />
                            </svg>
                            {job.location}
                          </span>
                        )}
                        {job.experience && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                            {job.experience}
                          </span>
                        )}
                        {job.industry && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                            {job.industry}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {job.qualification && (
                    <p className="mt-4 text-[13.5px] text-stone-600">
                      <span className="font-semibold text-stone-800">
                        Qualification:
                      </span>{" "}
                      {job.qualification}
                    </p>
                  )}
                  {job.description && (
                    <p className="mt-2 text-[13.5px] text-stone-500 leading-relaxed">
                      {job.description}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-stone-100">
                    {job.createdAt ? (
                      <span className="text-[12px] text-stone-400 font-medium">
                        Posted on {formatPostedDate(job.createdAt)}
                      </span>
                    ) : (
                      <span />
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => scrollToForm(job.title)}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white font-bold text-[13px] shadow-sm hover:shadow-md transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, #292524, #1c1917)",
                        }}
                      >
                        Apply Now
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
                      </button>
                      <a
                        href={`mailto:${job.applyEmail || "hr@kmopl.com"}?subject=${encodeURIComponent("Application for " + job.title)}`}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-stone-700 font-bold text-[13px] bg-white border border-stone-200 hover:border-amber-300 hover:text-amber-700 transition-all"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                        Mail Us
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════ APPLICATION FORM ═══════════════ */}
      <section
        ref={formSectionRef}
        className="relative py-20 overflow-hidden scroll-mt-24"
        style={{
          background:
            "linear-gradient(160deg, #fefdfb 0%, #f0e6d4 60%, #faf8f4 100%)",
        }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 -right-24 w-[440px] h-[440px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #fde68a 0%, transparent 70%)",
            }}
          />
          <QuarterCircle
            className="absolute left-6 bottom-10 w-20 h-20 opacity-40"
            color="#16a34a"
            rotate={90}
          />
        </div>
        <div
          ref={sectionRef}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-10">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{
                background: "rgba(217,119,6,0.1)",
                color: "#b45309",
                border: "1px solid rgba(217,119,6,0.18)",
              }}
            >
              Submit Your Application
            </span>
            <h2
              className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-stone-900 leading-tight"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              Apply for a Role
            </h2>
            <p className="mt-3 text-[14px] text-stone-500 max-w-md mx-auto">
              Fill in your details and upload your resume. Our HR team will
              review and get back to you.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[360px] text-center gap-5"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                      boxShadow: "0 12px 32px rgba(217,119,6,0.4)",
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold text-stone-900 mb-2"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      Application Received!
                    </h3>
                    <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
                      Thank you,{" "}
                      <strong className="text-stone-700">
                        {form.name.split(" ")[0]}
                      </strong>
                      . Our team will review your application and reach out if
                      there's a match.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-2 text-sm font-bold text-amber-600 hover:underline underline-offset-2"
                  >
                    Submit another application →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Selected role */}
                  <div className="mb-5">
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                      Applying For
                    </label>
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl text-[15px] bg-white outline-none appearance-none cursor-pointer transition-all"
                      style={{
                        border: "1.5px solid #e7e5e4",
                        color: selectedJob ? "#1c1917" : "#a8a29e",
                      }}
                    >
                      <option value="">General Application</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput
                      label="Full Name *"
                      value={form.name}
                      onChange={setField("name")}
                      error={errors.name}
                    />
                    <FloatInput
                      label="Email Address *"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      error={errors.email}
                      placeholder="you@example.com"
                    />
                    <FloatInput
                      label="Phone Number *"
                      type="tel"
                      value={form.phone}
                      onChange={setField("phone")}
                      error={errors.phone}
                      placeholder="10-digit number"
                    />
                    <FloatInput
                      label="City *"
                      value={form.city}
                      onChange={setField("city")}
                      error={errors.city}
                    />
                    <FloatInput
                      label="Qualification *"
                      value={form.qualification}
                      onChange={setField("qualification")}
                      error={errors.qualification}
                      placeholder="e.g. MBA in Marketing"
                    />
                    <FloatInput
                      label="Area of Expertise *"
                      value={form.expertise}
                      onChange={setField("expertise")}
                      error={errors.expertise}
                      placeholder="e.g. Sales & Marketing"
                    />
                  </div>

                  {/* Resume upload */}
                  <div className="mt-4">
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                      Upload Resume * (PDF / Word, max 5 MB)
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-3 px-4 py-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all hover:bg-amber-50/50"
                      style={{
                        borderColor: resumeError
                          ? "#ef4444"
                          : resume
                            ? "#d97706"
                            : "#d6d3d1",
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: resume
                            ? "rgba(217,119,6,0.12)"
                            : "#f5f5f4",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: resume ? "#d97706" : "#a8a29e" }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 7.5L12 3m0 0L7.5 7.5M12 3v13.5"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        {resume ? (
                          <>
                            <p className="text-sm font-semibold text-stone-800 truncate">
                              {resume.name}
                            </p>
                            <p className="text-[12px] text-stone-400">
                              {(resume.size / 1024 / 1024).toFixed(2)} MB ·
                              Click to change
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-stone-600">
                              Click to upload your resume
                            </p>
                            <p className="text-[12px] text-stone-400">
                              PDF, DOC or DOCX up to 5 MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {resumeError && (
                      <p className="text-xs text-red-500 mt-1.5 ml-1 font-semibold">
                        ⚠ {resumeError}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="mt-6 flex gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-[15px] transition-all disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        boxShadow: "0 8px 24px rgba(217,119,6,0.38)",
                        fontFamily: "var(--font-raleway), sans-serif",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="3"
                            />
                            <path
                              d="M12 2a10 10 0 0 1 10 10"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg
                            className="w-4 h-4"
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
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
