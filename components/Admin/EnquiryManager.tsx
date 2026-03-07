"use client";

import React, { useState } from "react";
import { useAdmin, EnquiryDoc } from "@/context/AdminContext";

function formatDate(ts?: { seconds: number }) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
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
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function EnquiryManager() {
  const { enquiries, enquiriesLoading, fetchEnquiries } = useAdmin();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.name?.toLowerCase().includes(q) ||
      e.mobile?.includes(q) ||
      e.city?.toLowerCase().includes(q) ||
      e.colorInterest?.toLowerCase().includes(q) ||
      e.colorName?.toLowerCase().includes(q)
    );
  });

  const handleExportCSV = () => {
    downloadCSV(filtered, `enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search enquiries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-200"
        />
        <button
          onClick={fetchEnquiries}
          className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          ↻ Refresh
        </button>
        <button
          onClick={handleExportCSV}
          disabled={filtered.length === 0}
          className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50 whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
        >
          ↓ Export CSV
        </button>
      </div>

      {/* Enquiries Table */}
      {enquiriesLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-medium">No enquiries found</p>
          <p className="text-sm mt-1">Enquiries from the website will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/50">
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Mobile</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">City</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Room</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Color</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Date</th>
                  <th className="text-right px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <React.Fragment key={e.id}>
                    <tr
                      className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}
                    >
                      <td className="px-5 py-3 font-medium text-stone-800">{e.name}</td>
                      <td className="px-5 py-3 text-stone-600">
                        <a href={`tel:+91${e.mobile}`} className="hover:text-amber-600">{e.mobile}</a>
                      </td>
                      <td className="px-5 py-3 text-stone-600">{e.city}</td>
                      <td className="px-5 py-3 text-stone-600">{e.roomType || "—"}</td>
                      <td className="px-5 py-3">
                        {(e.colorInterest || e.colorName) ? (
                          <div className="flex items-center gap-2">
                            {e.colorHex && (
                              <div className="w-5 h-5 rounded-full border border-stone-200" style={{ backgroundColor: e.colorHex }} />
                            )}
                            <span className="text-stone-600">{e.colorInterest || e.colorName}</span>
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-5 py-3 text-stone-500 text-xs">
                        {formatDate(e.createdAt as unknown as { seconds: number })}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button className="text-xs text-amber-600 font-medium">
                          {expandedId === e.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                    {expandedId === e.id && (
                      <tr key={`${e.id}-detail`} className="bg-amber-50/30">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-xs text-stone-400 font-semibold uppercase mb-1">Finish</p>
                              <p className="text-stone-700 capitalize">{e.finish || "—"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-stone-400 font-semibold uppercase mb-1">Color Hex</p>
                              <p className="text-stone-700 font-mono">{e.colorHex || "—"}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-xs text-stone-400 font-semibold uppercase mb-1">Message</p>
                              <p className="text-stone-700">{e.message || "No message"}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-stone-100 bg-stone-50/50 text-xs text-stone-400">
            Showing {filtered.length} of {enquiries.length} enquiries
          </div>
        </div>
      )}
    </div>
  );
}
