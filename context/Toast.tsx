"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  const styles: Record<ToastType, { bg: string; border: string; text: string; iconBg: string }> = {
    success: { bg: "#f0fdf4", border: "#bbf7d0", text: "#166534", iconBg: "#22c55e" },
    error: { bg: "#fef2f2", border: "#fecaca", text: "#991b1b", iconBg: "#ef4444" },
    info: { bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af", iconBg: "#3b82f6" },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-9999 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const s = styles[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm"
                style={{ background: s.bg, border: `1px solid ${s.border}` }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: s.iconBg }}
                >
                  {icons[t.type]}
                </span>
                <p className="text-sm font-semibold flex-1" style={{ color: s.text }}>
                  {t.message}
                </p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-stone-400 hover:text-stone-600 transition-colors shrink-0"
                  aria-label="Dismiss"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
