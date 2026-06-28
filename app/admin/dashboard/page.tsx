"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import ColorManager from "@/components/Admin/ColorManager";
import EnquiryManager from "@/components/Admin/EnquiryManager";
import ProductManager from "@/components/Admin/ProductManager";
import ProductForm from "@/components/Admin/ProductForm";
import JobManager from "@/components/Admin/JobManager";
import ApplicationManager from "@/components/Admin/ApplicationManager";
import EventManager from "@/components/Admin/EventManager";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Page = "products" | "add-product" | "edit-product" | "colors" | "enquiries" | "jobs" | "applications" | "events";

export default function AdminDashboardPage() {
  const { user, authLoading, logout, colors, enquiries, products, jobs, applications, events, fetchColors, fetchEnquiries, fetchProducts, fetchJobs, fetchApplications, fetchEvents } = useAdmin();
  const router = useRouter();
  const [activePage, setActivePage] = useState<Page>("products");
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/admin/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) { fetchColors(); fetchEnquiries(); fetchProducts(); fetchJobs(); fetchApplications(); fetchEvents(); }
  }, [user, fetchColors, fetchEnquiries, fetchProducts, fetchJobs, fetchApplications, fetchEvents]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleEditProduct = (id: string) => {
    setEditProductId(id);
    setActivePage("edit-product");
  };

  const handleProductSaved = () => {
    setActivePage("products");
    setEditProductId(null);
    fetchProducts();
  };

  const NAV_ITEMS = [
    { key: "products" as Page, label: "Products", count: products.length, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg> },
    { key: "add-product" as Page, label: "Add Product", count: null, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> },
    // { key: "colors" as Page, label: "Paint Colors", count: colors.length, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg> },
    { key: "enquiries" as Page, label: "Enquiries", count: enquiries.length, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg> },
    { key: "jobs" as Page, label: "Jobs", count: jobs.length, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg> },
    { key: "applications" as Page, label: "Applications", count: applications.length, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
    { key: "events" as Page, label: "Events", count: events.length, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* ═══ SIDEBAR (Desktop) ═══ */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-stone-200 fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-stone-100">
          <Image src="/logo.png" width={1000} height={1000} alt="logo" className="w-14 h-14"/>
          <div>
            <h1 className="text-sm font-bold text-stone-800">KMOPL Admin</h1>
            <p className="text-[10px] text-stone-400">Product Management</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActivePage(item.key); setEditProductId(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === item.key || (item.key === "add-product" && activePage === "edit-product")
                  ? "bg-stone-900 text-white shadow-md"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-800"
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== null && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  activePage === item.key ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                }`}>{item.count}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-stone-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-stone-700 truncate">{user.email}</p>
              <p className="text-[10px] text-stone-400">Administrator</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-stone-500 bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ═══ MOBILE HEADER ═══ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-stone-200 h-14 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-stone-100">
          <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </button>
        <span className="text-sm font-bold text-stone-800">KMOPL Admin</span>
        <button onClick={logout} className="p-2 rounded-lg hover:bg-stone-100">
          <svg className="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="lg:hidden fixed inset-0 z-40 bg-black/30" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-5 h-14 border-b border-stone-100">
                <span className="text-sm font-bold text-stone-800">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500">✕</button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button key={item.key} onClick={() => { setActivePage(item.key); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activePage === item.key ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"
                    }`}>
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        {/* Top bar */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-white border-b border-stone-200 sticky top-0 z-20">
          <h2 className="text-lg font-bold text-stone-800 capitalize">
            {activePage === "add-product" ? "Add New Product" : activePage === "edit-product" ? "Edit Product" : activePage.replace("-", " ")}
          </h2>
          <div className="flex items-center gap-3 text-sm text-stone-500">
            <span className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs">{products.length} Products</span>
            <span className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs">{enquiries.length} Enquiries</span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activePage + (editProductId || "")} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {activePage === "products" && <ProductManager onEdit={handleEditProduct} onAdd={() => setActivePage("add-product")} />}
              {activePage === "add-product" && <ProductForm onSaved={handleProductSaved} onCancel={() => setActivePage("products")} />}
              {activePage === "edit-product" && editProductId && <ProductForm productId={editProductId} onSaved={handleProductSaved} onCancel={() => setActivePage("products")} />}
              {activePage === "colors" && <ColorManager />}
              {activePage === "enquiries" && <EnquiryManager />}
              {activePage === "jobs" && <JobManager />}
              {activePage === "applications" && <ApplicationManager />}
              {activePage === "events" && <EventManager />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
