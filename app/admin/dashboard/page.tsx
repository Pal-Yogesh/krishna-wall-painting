"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import ColorManager from "@/components/Admin/ColorManager";
import EnquiryManager from "@/components/Admin/EnquiryManager";

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
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "colors", label: "Paint Colors", count: colors.length },
    { key: "enquiries", label: "Enquiries", count: enquiries.length },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg text-white"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              🎨
            </div>
            <h1 className="text-lg font-bold text-stone-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-400 hidden sm:block">{user.email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-1 bg-stone-100 p-1 rounded-xl w-fit mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  tab === t.key ? "bg-amber-100 text-amber-700" : "bg-stone-200 text-stone-500"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {tab === "colors" && <ColorManager />}
        {tab === "enquiries" && <EnquiryManager />}
      </div>
    </div>
  );
}
