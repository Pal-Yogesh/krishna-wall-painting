"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import ColorManager from "@/components/Admin/ColorManager";
import EnquiryManager from "@/components/Admin/EnquiryManager";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "colors" | "enquiries";

export default function AdminDashboardPage() {
  const { user, authLoading, logout, colors, enquiries, fetchColors, fetchEnquiries } = useAdmin();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("colors");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/admin/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchColors();
      fetchEnquiries();
    }
  }, [user, fetchColors, fetchEnquiries]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const activeColors = colors.filter((c) => c.active).length;
  const inactiveColors = colors.filter((c) => !c.active).length;
  const todayEnquiries = enquiries.filter((e) => {
    const ts = e.createdAt as unknown as { seconds: number } | undefined;
    if (!ts) return false;
    const d = new Date(ts.seconds * 1000);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  const stats = [
    {
      label: "Total Colors",
      value: colors.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-500",
      bgGlow: "bg-amber-500/10",
    },
    {
      label: "Active Colors",
      value: activeColors,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-emerald-500 to-green-500",
      bgGlow: "bg-emerald-500/10",
    },
    {
      label: "Total Enquiries",
      value: enquiries.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-500",
      bgGlow: "bg-blue-500/10",
    },
    {
      label: "Today's Leads",
      value: todayEnquiries,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      color: "from-violet-500 to-purple-500",
      bgGlow: "bg-violet-500/10",
    },
  ];

  const tabs: { key: Tab; label: string; count: number; icon: React.ReactNode }[] = [
    {
      key: "colors",
      label: "Paint Colors",
      count: colors.length,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
    },
    {
      key: "enquiries",
      label: "Enquiries",
      count: enquiries.length,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Top bar */}
      <header className="bg-stone-900/80 backdrop-blur-xl border-b border-stone-800/60 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg text-white shadow-md shadow-amber-500/20"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              🎨
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">Krishna Paints</h1>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/60 border border-stone-700/40">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-stone-400">{user.email}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-400 bg-stone-800/60 border border-stone-700/40 rounded-xl hover:bg-stone-800 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden bg-stone-900/60 backdrop-blur-sm border border-stone-800/60 rounded-2xl p-5"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${s.bgGlow} blur-2xl -translate-y-6 translate-x-6`} />
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  {s.icon}
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-stone-500 mt-0.5 uppercase tracking-wider">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-stone-900/60 border border-stone-800/60 p-1.5 rounded-2xl w-fit mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-stone-800 text-white shadow-md"
                  : "text-stone-500 hover:text-stone-300"
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  tab === t.key
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-stone-800 text-stone-500"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "colors" && <ColorManager />}
            {tab === "enquiries" && <EnquiryManager />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
