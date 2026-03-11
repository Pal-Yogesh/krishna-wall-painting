"use client";

import React, { useState } from "react";
import { useAdmin, EnquiryDoc } from "@/context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

function formatDate(ts?: { seconds: number }) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function timeAgo(ts?: { seconds: number }) {
  if (!ts) return "";
  const diff = Date.now() - ts.seconds * 1000;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return "";
}

function downloadCSV(data: EnquiryDoc[], filename: string) {
  const headers = ["Name", "Mobile", "City", "Room Type", "Color Interest", "Color Name", "Color Hex", "Finish", "Message", "Date"];
  const rows = data.map((e) => [
    e.name, e.mobile, e.city, e.roomType || "", e.colorInterest || "",
    e.colorName || "", e.colorHex || "", e.finish || "", e.message || "",
    formatDate(e.createdAt as unknown as { seconds: number }),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function EnquiryManager() {
  const { enquiries, enquiriesLoading, fetchEnquiries } = useAdmin();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase();
    return e.name?.toLowerCase().includes(q) || e.mobile?.includes(q) || e.city?.toLowerCase().includes(q) || e.colorInterest?.toLowerCase().includes(q) || e.colorName?.toLowerCase().includes(q);
  });

  const handleExportCSV = () => downloadCSV(filtered, `enquiries-${new Date().toISOString().slice(0, 10)}.csv`);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search by name, mobile, city, color..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all shadow-sm" />
        </div>
        <button onClick={fetchEnquiries}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-sm font-medium text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-all shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          Refresh
        </button>
        <button onClick={handleExportCSV} disabled={filtered.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50 whitespace-nowrap shadow-md shadow-emerald-200/50 transition-all active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Content */}
      {enquiriesLoading ? (
        <div className="flex justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-stone-400 text-sm">Loading enquiries...</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl mx-auto mb-4">📋</div>
          <p className="font-semibold text-stone-700">No enquiries found</p>
          <p className="text-sm text-stone-400 mt-1">Enquiries from the website will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e, i) => {
            const isExpanded = expandedId === e.id;
            const ts = e.createdAt as unknown as { seconds: number } | undefined;
            const ago = timeAgo(ts);
            return (
              <motion.div key={e.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-sm ${isExpanded ? "border-amber-300 shadow-md" : "border-stone-200 hover:border-stone-300 hover:shadow-md"}`}>
                <button onClick={() => setExpandedId(isExpanded ? null : e.id)} className="w-full flex items-center gap-4 p-4 sm:p-5 text-left">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
                    {e.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-stone-800 truncate">{e.name}</p>
                      {ago && <span className="text-[10px] text-stone-400 whitespace-nowrap">{ago}</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-stone-400">{e.city}</span>
                      <span className="text-stone-200">·</span>
                      <span className="text-xs text-stone-400">{e.mobile}</span>
                      {(e.colorInterest || e.colorName) && (
                        <>
                          <span className="text-stone-200">·</span>
                          <span className="flex items-center gap-1.5">
                            {e.colorHex && <span className="w-3 h-3 rounded-full border border-stone-200 inline-block" style={{ backgroundColor: e.colorHex }} />}
                            <span className="text-xs text-stone-500">{e.colorInterest || e.colorName}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {e.roomType && (
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-500 border border-stone-200">{e.roomType}</span>
                  )}
                  <svg className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-0">
                        <div className="border-t border-stone-100 pt-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Phone</p>
                              <a href={`tel:+91${e.mobile}`} className="text-sm text-amber-600 hover:text-amber-700 transition-colors font-medium">+91 {e.mobile}</a>
                            </div>
                            <div>
                              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Finish</p>
                              <p className="text-sm text-stone-700 capitalize">{e.finish || "—"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Color Hex</p>
                              <div className="flex items-center gap-2">
                                {e.colorHex && <span className="w-4 h-4 rounded border border-stone-200" style={{ backgroundColor: e.colorHex }} />}
                                <p className="text-sm text-stone-700 font-mono">{e.colorHex || "—"}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Date</p>
                              <p className="text-sm text-stone-700">{formatDate(ts)}</p>
                            </div>
                          </div>
                          {e.message && (
                            <div className="mt-4 p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1.5">Message</p>
                              <p className="text-sm text-stone-700 leading-relaxed">{e.message}</p>
                            </div>
                          )}
                          <div className="flex gap-2 mt-4">
                            <a href={`tel:+91${e.mobile}`}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                              </svg>
                              Call
                            </a>
                            <a href={`https://wa.me/91${e.mobile}?text=Hi ${e.name}, regarding your paint enquiry...`} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <div className="text-center py-3 text-xs text-stone-400">
            Showing {filtered.length} of {enquiries.length} enquiries
          </div>
        </div>
      )}
    </div>
  );
}
