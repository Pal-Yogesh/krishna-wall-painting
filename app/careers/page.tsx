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
  name: "", email: "", phone: "", city: "", qualification: "", expertise: "",
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

function formatPostedDate(ts?: { seconds: number }) {
  if (!ts) return "";
  return new Date(ts.seconds * 1000).toLocaleDateString("en-GB", {
    weekday: "short", day: "2-digit", month: "2-digit", year: "numeric",
  });
}

// ── Floating label input ──────────────────────────────────────────────────────
function FloatInput({
  label, value, onChange, error, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; placeholder?: string;
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
          boxShadow: focused && !error ? "0 0 0 3px rgba(217,119,6,0.12)" : "none",
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
      {error && <p className="text-xs text-red-500 mt-1.5 ml-1 font-semibold">⚠ {error}</p>}
    </div>
  );
}

export default function CareersPage() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [form, setForm] = useState<ApplicationForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationForm, string>>>({});
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);

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

  const setField = useCallback((key: keyof ApplicationForm) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }, []);

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
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "Enter a valid 10-digit mobile number.";
    if (!form.city.trim()) errs.city = "Please enter your city.";
    if (!form.qualification.trim()) errs.qualification = "Please enter your qualification.";
    if (!form.expertise.trim()) errs.expertise = "Please enter your area of expertise.";
    return errs;
  };

  const scrollToForm = (jobTitle?: string) => {
    if (jobTitle) setSelectedJob(jobTitle);
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!resume) { setResumeError("Please upload your resume."); return; }

    setStatus("loading");
    try {
      // 1. Upload resume to Cloudinary
      const fd = new FormData();
      fd.append("file", resume);
      fd.append("folder", "kmopl-resumes");
      const uploadRes = await fetch("/api/upload-resume", { method: "POST", body: fd });
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
      showToast("Application submitted successfully! We'll be in touch.", "success");
    } catch (e) {
      setStatus("idle");
      showToast(e instanceof Error ? e.message : "Something went wrong. Please try again.", "error");
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
    <div className="min-h-screen bg-[#faf9f7]">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #fef3c720 0%, #fefdfb 40%, #faf9f7 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)" }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 right-[10%] w-56 h-56 rounded-full bg-amber-200/30 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-5 border border-amber-200/50">
              Careers at KMOPL
            </span>
            <h1 className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
              Build Your Career With <span className="text-amber-500">Us</span>
            </h1>
            <p className="mt-4 text-[15px] text-stone-500 max-w-xl mx-auto leading-relaxed">
              Join a team that's shaping the future of coatings. Explore our current openings and grow with a brand trusted across India.
            </p>
            <div className="mt-7">
              <button onClick={() => scrollToForm()}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", fontFamily: "var(--font-raleway), sans-serif" }}>
                Apply Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CURRENT OPENINGS ═══ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 rounded-full bg-amber-500" />
          <div>
            <h2 className="text-xl font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Current Openings
            </h2>
            <p className="text-[13px] text-stone-400 mt-0.5">{jobs.length} active position{jobs.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {loadingJobs ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/80">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">💼</div>
            <p className="font-semibold text-stone-700">No openings right now</p>
            <p className="text-sm text-stone-400 mt-1">Check back soon, or send us your resume below for future roles.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden bg-white border border-stone-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #f59e0b, #d9770640, transparent)" }} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      {job.title}
                    </h3>
                    {job.location && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {job.location}
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-3 flex flex-col gap-1.5 text-[13.5px]">
                    {job.qualification && <p className="text-stone-600"><span className="font-semibold text-stone-800">Qualification:</span> {job.qualification}</p>}
                    {job.experience && <p className="text-stone-600"><span className="font-semibold text-stone-800">Experience:</span> {job.experience}</p>}
                    {job.industry && <p className="text-stone-600"><span className="font-semibold text-stone-800">Industry:</span> {job.industry}</p>}
                  </div>

                  {job.description && (
                    <p className="mt-3 text-[13.5px] text-stone-500 leading-relaxed">{job.description}</p>
                  )}

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-stone-100">
                    {job.createdAt && (
                      <span className="text-[12px] text-stone-400 font-medium">
                        Posted on {formatPostedDate(job.createdAt)}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <button onClick={() => scrollToForm(job.title)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-[13px] shadow-sm hover:shadow-md transition-all"
                        style={{ background: "linear-gradient(135deg, #292524, #1c1917)" }}>
                        Apply
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                      <a
                        href={`mailto:${job.applyEmail || "careers@kmopl.com"}?subject=${encodeURIComponent("Application for " + job.title)}`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-700 font-bold text-[13px] bg-white border border-stone-200 hover:border-amber-300 hover:text-amber-700 transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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

      {/* ═══ APPLICATION FORM ═══ */}
      <section ref={formSectionRef} className="relative py-16 overflow-hidden scroll-mt-24"
        style={{ background: "linear-gradient(160deg, #fefdfb 0%, #f0e6d4 60%, #faf8f4 100%)" }}>
        <div ref={sectionRef} className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ background: "rgba(217,119,6,0.1)", color: "#b45309", border: "1px solid rgba(217,119,6,0.18)" }}>
              Submit Your Application
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", letterSpacing: "-0.03em" }}>
              Apply for a Role
            </h2>
            <p className="mt-3 text-[14px] text-stone-500 max-w-md mx-auto">
              Fill in your details and upload your resume. Our HR team will review and get back to you.
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
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[360px] text-center gap-5">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 12px 32px rgba(217,119,6,0.4)" }}>
                    ✓
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      Application Received!
                    </h3>
                    <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
                      Thank you, <strong className="text-stone-700">{form.name.split(" ")[0]}</strong>. Our team will review your application and reach out if there's a match.
                    </p>
                  </div>
                  <button onClick={handleReset}
                    className="mt-2 text-sm font-bold text-amber-600 hover:underline underline-offset-2">
                    Submit another application →
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Selected role */}
                  {/* <div className="mb-5">
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Applying For</label>
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl text-[15px] bg-white outline-none appearance-none cursor-pointer transition-all"
                      style={{ border: "1.5px solid #e7e5e4", color: selectedJob ? "#1c1917" : "#a8a29e" }}
                    >
                      <option value="">General Application</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div> */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput label="Full Name *" value={form.name} onChange={setField("name")} error={errors.name} />
                    <FloatInput label="Email Address *" type="email" value={form.email} onChange={setField("email")} error={errors.email} placeholder="you@example.com" />
                    <FloatInput label="Phone Number *" type="tel" value={form.phone} onChange={setField("phone")} error={errors.phone} placeholder="10-digit number" />
                    <FloatInput label="City *" value={form.city} onChange={setField("city")} error={errors.city} />
                    <FloatInput label="Qualification *" value={form.qualification} onChange={setField("qualification")} error={errors.qualification} placeholder="e.g. MBA in Marketing" />
                    <FloatInput label="Area of Expertise *" value={form.expertise} onChange={setField("expertise")} error={errors.expertise} placeholder="e.g. Sales & Marketing" />
                  </div>

                  {/* Resume upload */}
                  <div className="mt-4">
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Upload Resume * (PDF / Word, max 5 MB)</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-3 px-4 py-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all hover:bg-amber-50/50"
                      style={{ borderColor: resumeError ? "#ef4444" : resume ? "#d97706" : "#d6d3d1" }}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: resume ? "rgba(217,119,6,0.12)" : "#f5f5f4" }}>
                        <svg className="w-5 h-5" style={{ color: resume ? "#d97706" : "#a8a29e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 7.5L12 3m0 0L7.5 7.5M12 3v13.5" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        {resume ? (
                          <>
                            <p className="text-sm font-semibold text-stone-800 truncate">{resume.name}</p>
                            <p className="text-[12px] text-stone-400">{(resume.size / 1024 / 1024).toFixed(2)} MB · Click to change</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-stone-600">Click to upload your resume</p>
                            <p className="text-[12px] text-stone-400">PDF, DOC or DOCX up to 5 MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange} className="hidden" />
                    {resumeError && <p className="text-xs text-red-500 mt-1.5 ml-1 font-semibold">⚠ {resumeError}</p>}
                  </div>

                  {/* Submit */}
                  <div className="mt-6 flex gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="flex cursor-pointer items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-[15px] transition-all disabled:opacity-70"
                      style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 8px 24px rgba(217,119,6,0.38)", fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
