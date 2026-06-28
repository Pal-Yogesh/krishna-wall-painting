"use client";

import React, { useState } from "react";
import { useAdmin, ApplicationDoc } from "@/context/AdminContext";
import { motion } from "framer-motion";

function formatDate(ts?: { seconds: number }) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function downloadCSV(data: ApplicationDoc[], filename: string) {
  const headers = ["Name", "Email", "Phone", "City", "Qualification", "Area of Expertise", "Applied For", "Resume URL", "Date"];
  const rows = data.map((a) => [
    a.name, a.email, a.phone, a.city, a.qualification, a.expertise,
    a.jobTitle || "", a.resumeUrl || "",
    formatDate(a.createdAt as unknown as { seconds: number }),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function ApplicationManager() {
  const { applications, applicationsLoading, fetchApplications, deleteApplication } = useAdmin();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.name?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.phone?.includes(q) ||
      a.city?.toLowerCase().includes(q) ||
      a.expertise?.toLowerCase().includes(q) ||
      a.jobTitle?.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    setDeletingId(id);
    try {
      await deleteApplication(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search by name, email, phone, expertise, job..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all shadow-sm" />
        </div>
        <button onClick={fetchApplications}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-sm font-medium text-stone-500 hover:bg-stone-50 transition-all shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          Refresh
        </button>
        <button onClick={() => downloadCSV(filtered, `applications-${new Date().toISOString().slice(0, 10)}.csv`)} disabled={filtered.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50 whitespace-nowrap shadow-md transition-all active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Content */}
      {applicationsLoading ? (
        <div className="flex justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-stone-400 text-sm">Loading applications...</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl mx-auto mb-4">📄</div>
          <p className="font-semibold text-stone-700">No applications found</p>
          <p className="text-sm text-stone-400 mt-1">Career applications from the website will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a, i) => {
            const isExpanded = expandedId === a.id;
            const ts = a.createdAt as unknown as { seconds: number } | undefined;
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-sm ${isExpanded ? "border-amber-300 shadow-md" : "border-stone-200 hover:border-stone-300 hover:shadow-md"}`}>
                <button onClick={() => setExpandedId(isExpanded ? null : a.id)} className="w-full flex items-center gap-4 p-4 sm:p-5 text-left">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
                    {a.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-800 truncate">{a.name}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-stone-400">{a.city}</span>
                      <span className="text-stone-200">·</span>
                      <span className="text-xs text-stone-400">{a.phone}</span>
                      {a.expertise && (
                        <>
                          <span className="text-stone-200">·</span>
                          <span className="text-xs text-stone-500">{a.expertise}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {a.jobTitle && (
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 max-w-[180px] truncate">{a.jobTitle}</span>
                  )}
                  <svg className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-stone-100 pt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                          <a href={`mailto:${a.email}`} className="text-sm text-amber-600 hover:text-amber-700 transition-colors break-all">{a.email}</a>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Phone</p>
                          <a href={`tel:${a.phone}`} className="text-sm text-stone-700">{a.phone}</a>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">City</p>
                          <p className="text-sm text-stone-700">{a.city}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Qualification</p>
                          <p className="text-sm text-stone-700">{a.qualification || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Area of Expertise</p>
                          <p className="text-sm text-stone-700">{a.expertise || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Applied On</p>
                          <p className="text-sm text-stone-700">{formatDate(ts)}</p>
                        </div>
                      </div>
                      {a.jobTitle && (
                        <div className="mt-4">
                          <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-1">Applied For</p>
                          <p className="text-sm text-stone-700 font-medium">{a.jobTitle}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {a.resumeUrl && (
                          <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-stone-800 hover:bg-stone-900 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            Download Resume
                          </a>
                        )}
                        <a href={`mailto:${a.email}`}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          Email Applicant
                        </a>
                        <button onClick={() => handleDelete(a.id)} disabled={deletingId === a.id}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50">
                          {deletingId === a.id ? (
                            <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
          <div className="text-center py-3 text-xs text-stone-400">
            Showing {filtered.length} of {applications.length} applications
          </div>
        </div>
      )}
    </div>
  );
}
