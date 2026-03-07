"use client";

import { useState } from "react";
import { useAdmin, PaintColorDoc } from "@/context/AdminContext";

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

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (c: PaintColorDoc) => {
    setEditingId(c.id);
    setForm({ name: c.name, hex: c.hex, family: c.family, finish: c.finish || "matte", active: c.active });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.hex.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateColor(editingId, form);
      } else {
        await addColor(form);
      }
      setShowForm(false);
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this color permanently?")) return;
    setDeletingId(id);
    try {
      await deleteColor(id);
    } finally {
      setDeletingId(null);
    }
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
        <input
          type="text"
          placeholder="Search colors…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-200"
        />
        <select
          value={filterFamily}
          onChange={(e) => setFilterFamily(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
        >
          <option value="All">All Families</option>
          {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
        >
          + Add Color
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-stone-800 mb-5">
              {editingId ? "Edit Color" : "Add New Color"}
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
                  placeholder="e.g. Ocean Breeze"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Hex Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.hex}
                      onChange={(e) => setForm({ ...form, hex: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-stone-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.hex}
                      onChange={(e) => setForm({ ...form, hex: e.target.value })}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-stone-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Family</label>
                  <select
                    value={form.family}
                    onChange={(e) => setForm({ ...form, family: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Finish</label>
                  <select
                    value={form.finish}
                    onChange={(e) => setForm({ ...form, finish: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    <option value="matte">Matte</option>
                    <option value="satin">Satin</option>
                    <option value="gloss">Gloss</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="w-4 h-4 rounded accent-amber-500"
                    />
                    <span className="text-sm text-stone-600 font-medium">Active</span>
                  </label>
                </div>
              </div>
              {/* Preview */}
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg border border-stone-200" style={{ backgroundColor: form.hex }} />
                <div>
                  <p className="text-sm font-semibold text-stone-700">{form.name || "Color Name"}</p>
                  <p className="text-xs text-stone-400">{form.hex.toUpperCase()} · {form.family} · {form.finish}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                {saving ? "Saving…" : editingId ? "Update" : "Add Color"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Colors Table */}
      {colorsLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-3">🎨</p>
          <p className="font-medium">No colors found</p>
          <p className="text-sm mt-1">Add your first color or adjust filters</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/50">
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Color</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Hex</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Family</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Finish</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 font-semibold text-stone-500 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="w-8 h-8 rounded-lg border border-stone-200 shadow-sm" style={{ backgroundColor: c.hex }} />
                    </td>
                    <td className="px-5 py-3 font-medium text-stone-800">{c.name}</td>
                    <td className="px-5 py-3 font-mono text-stone-500">{c.hex.toUpperCase()}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">{c.family}</span>
                    </td>
                    <td className="px-5 py-3 capitalize text-stone-600">{c.finish || "matte"}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleColorActive(c.id, !c.active)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                          c.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {c.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={deletingId === c.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          {deletingId === c.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
