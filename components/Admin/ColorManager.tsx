"use client";

import { useState } from "react";
import { useAdmin, PaintColorDoc } from "@/context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const FAMILIES = ["Whites", "Neutrals", "Warm", "Blues", "Greens", "Greys", "Statement"];

interface ColorForm {
  name: string;
  hex: string;
  family: string;
  finish: string;
  active: boolean;
}

const EMPTY_FORM: ColorForm = { name: "", hex: "#C1623F", family: "Whites", finish: "matte", active: true };

export default function ColorManager() {
  const { colors, colorsLoading, addColor, updateColor, deleteColor, toggleColorActive } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ColorForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterFamily, setFilterFamily] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const openAdd = () => { setEditingId(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (c: PaintColorDoc) => {
    setEditingId(c.id);
    setForm({ name: c.name, hex: c.hex, family: c.family, finish: c.finish || "matte", active: c.active });
    setShowForm(true);
  };
  const handleSave = async () => {
    if (!form.name.trim() || !form.hex.trim()) return;
    setSaving(true);
    try {
      if (editingId) await updateColor(editingId, form);
      else await addColor(form);
      setShowForm(false); setEditingId(null);
    } finally { setSaving(false); }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this color permanently?")) return;
    setDeletingId(id);
    try { await deleteColor(id); } finally { setDeletingId(null); }
  };

  const filtered = colors.filter((c) => {
    const matchFamily = filterFamily === "All" || c.family === filterFamily;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.hex.toLowerCase().includes(search.toLowerCase());
    return matchFamily && matchSearch;
  });

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search colors..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all shadow-sm" />
        </div>
        <select value={filterFamily} onChange={(e) => setFilterFamily(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-200 shadow-sm">
          <option value="All">All Families</option>
          {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        {/* View toggle */}
        <div className="flex bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
          <button onClick={() => setViewMode("table")}
            className={`px-3 py-2.5 transition-colors ${viewMode === "table" ? "bg-stone-800 text-white" : "text-stone-400 hover:text-stone-600"}`}
            aria-label="Table view">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v.008h-.008v-.008zm0 0h.008v.008h-.008v-.008zm0 0h.375a1.125 1.125 0 001.125-1.125V14.25m-2.625 1.5c-.621 0-1.125.504-1.125 1.125v.375" />
            </svg>
          </button>
          <button onClick={() => setViewMode("grid")}
            className={`px-3 py-2.5 transition-colors ${viewMode === "grid" ? "bg-stone-800 text-white" : "text-stone-400 hover:text-stone-600"}`}
            aria-label="Grid view">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm whitespace-nowrap shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-200/60 transition-all active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Color
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-stone-200 rounded-2xl shadow-2xl w-full max-w-xl p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-stone-800">{editingId ? "Edit Color" : "Add New Color"}</h3>
                <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600 transition-colors" aria-label="Close">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="e.g. Ocean Breeze" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">Hex Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.hex} onChange={(e) => setForm({ ...form, hex: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-stone-200 cursor-pointer bg-transparent" />
                      <input type="text" value={form.hex} onChange={(e) => setForm({ ...form, hex: e.target.value })}
                        className="flex-1 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">Family</label>
                    <select value={form.family} onChange={(e) => setForm({ ...form, family: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-200">
                      {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">Finish</label>
                    <select value={form.finish} onChange={(e) => setForm({ ...form, finish: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-200">
                      <option value="matte">Matte</option><option value="satin">Satin</option><option value="gloss">Gloss</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="sr-only peer" />
                        <div className="w-10 h-6 bg-stone-200 rounded-full peer-checked:bg-amber-500 transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
                      </div>
                      <span className="text-sm text-stone-500 group-hover:text-stone-700 transition-colors">Active</span>
                    </label>
                  </div>
                </div>
                {/* Preview */}
                <div className="flex items-center gap-4 p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="w-14 h-14 rounded-xl border-2 border-stone-200 shadow-md" style={{ backgroundColor: form.hex }} />
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{form.name || "Color Name"}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{form.hex.toUpperCase()} · {form.family} · {form.finish}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-all">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.name.trim()}
                  className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50 shadow-md shadow-amber-200/50 transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                  {saving ? (<span className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</span>) : editingId ? "Update Color" : "Add Color"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {colorsLoading ? (
        <div className="flex justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-stone-400 text-sm">Loading colors...</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">🎨</div>
          <p className="font-semibold text-stone-700">No colors found</p>
          <p className="text-sm text-stone-400 mt-1">Add your first color or adjust filters</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all shadow-sm">
              <div className="h-28 relative" style={{ backgroundColor: c.hex }}>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(c)} className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm text-stone-600 flex items-center justify-center hover:bg-white transition-colors shadow-sm" aria-label="Edit">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm" aria-label="Delete">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <button onClick={() => toggleColorActive(c.id, !c.active)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm transition-colors ${c.active ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {c.active ? "ACTIVE" : "INACTIVE"}
                  </button>
                </div>
              </div>
              <div className="p-3.5">
                <p className="text-sm font-semibold text-stone-800 truncate">{c.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-xs text-stone-400 font-mono">{c.hex.toUpperCase()}</p>
                  <span className="text-[10px] text-stone-400 uppercase">{c.family}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/50">
                  <th className="text-left px-5 py-3.5 font-semibold text-stone-500 text-xs uppercase tracking-wider">Color</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-stone-500 text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-stone-500 text-xs uppercase tracking-wider">Hex</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-stone-500 text-xs uppercase tracking-wider">Family</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-stone-500 text-xs uppercase tracking-wider">Finish</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-stone-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3.5 font-semibold text-stone-500 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                    <td className="px-5 py-3.5"><div className="w-9 h-9 rounded-xl border border-stone-200 shadow-sm" style={{ backgroundColor: c.hex }} /></td>
                    <td className="px-5 py-3.5 font-medium text-stone-800">{c.name}</td>
                    <td className="px-5 py-3.5 font-mono text-stone-500">{c.hex.toUpperCase()}</td>
                    <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">{c.family}</span></td>
                    <td className="px-5 py-3.5 capitalize text-stone-500">{c.finish || "matte"}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => toggleColorActive(c.id, !c.active)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${c.active ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${c.active ? "bg-green-500" : "bg-red-500"}`} />
                        {c.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(c)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors">Edit</button>
                        <button onClick={() => handleDelete(c.id)} disabled={deletingId === c.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50">
                          {deletingId === c.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-stone-100 text-xs text-stone-400 flex items-center justify-between">
            <span>Showing {filtered.length} of {colors.length} colors</span>
            <span>{colors.filter(c => c.active).length} active · {colors.filter(c => !c.active).length} inactive</span>
          </div>
        </div>
      )}
    </div>
  );
}
