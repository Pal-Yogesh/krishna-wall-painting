"use client";

// components/shared/EnquiryModal.tsx
// Lead capture modal — pre-fills selected color, sends via Nodemailer API route

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaintColor } from "@/lib/canvas-utils";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useToast } from "@/context/Toast";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: PaintColor | null;
}

interface FormData {
  name: string;
  mobile: string;
  city: string;
  colorName: string;
  colorHex: string;
  finish: string;
  message: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export default function EnquiryModal({
  isOpen,
  onClose,
  selectedColor,
}: EnquiryModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    city: "",
    colorName: selectedColor?.name ?? "",
    colorHex: selectedColor?.hex ?? "",
    finish: "matte",
    message: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { showToast } = useToast();

  // Sync color when prop changes
  useEffect(() => {
    if (selectedColor) {
      setForm((prev) => ({
        ...prev,
        colorName: selectedColor.name,
        colorHex: selectedColor.hex,
      }));
    }
  }, [selectedColor]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setSubmitState("idle");
      setErrors({});
    }
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.mobile.match(/^[6-9]\d{9}$/))
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!form.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitState("loading");

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

      setSubmitState("success");
      showToast("Enquiry submitted successfully! We'll contact you soon.", "success");
    } catch {
      setSubmitState("error");
      showToast("Submission failed. Please try again.", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-stone-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-stone-800">
                      Request a Quote
                    </h2>
                    <p className="text-sm text-stone-400 mt-0.5">
                      Our team will contact you within 24 hours
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 hover:text-stone-600 transition-colors flex-shrink-0 ml-4"
                    aria-label="Close modal"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Selected color preview */}
                {selectedColor && (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                    <span
                      className="w-8 h-8 rounded-lg border border-stone-200 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div>
                      <p className="text-xs text-stone-400 font-medium">Selected Color</p>
                      <p className="text-sm font-bold text-stone-700">
                        {selectedColor.name}
                      </p>
                    </div>
                    <span className="ml-auto text-xs font-mono text-stone-400">
                      {selectedColor.hex.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  {submitState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-8 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-stone-800 mb-1">
                        Enquiry Submitted!
                      </h3>
                      <p className="text-sm text-stone-500">
                        Thanks {form.name}! We&apos;ll reach out to <br />
                        <strong>{form.mobile}</strong> shortly.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="flex flex-col gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 transition-all ${
                            errors.name
                              ? "border-red-300 focus:ring-red-200"
                              : "border-stone-200 focus:ring-amber-200 focus:border-amber-400"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Mobile */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 transition-all ${
                            errors.mobile
                              ? "border-red-300 focus:ring-red-200"
                              : "border-stone-200 focus:ring-amber-200 focus:border-amber-400"
                          }`}
                        />
                        {errors.mobile && (
                          <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="e.g. Mumbai"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 transition-all ${
                            errors.city
                              ? "border-red-300 focus:ring-red-200"
                              : "border-stone-200 focus:ring-amber-200 focus:border-amber-400"
                          }`}
                        />
                        {errors.city && (
                          <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">
                          Message (optional)
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Any specific requirements?"
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all resize-none"
                        />
                      </div>

                      {/* Error banner */}
                      {submitState === "error" && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-sm text-red-600">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Submission failed. Please try again.
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        onClick={handleSubmit}
                        disabled={submitState === "loading"}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold rounded-xl text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-200"
                      >
                        {submitState === "loading" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Enquiry
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}