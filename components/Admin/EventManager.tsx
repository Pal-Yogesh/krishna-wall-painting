"use client";

import React, { useState } from "react";
import { useAdmin, EventDoc } from "@/context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage { url: string; name: string; }

const EMPTY_EVENT = {
  title: "",
  location: "",
  eventDate: new Date().toISOString().slice(0, 10),
  description: "",
  coverImage: "",
  gallery: [] as GalleryImage[],
  active: true,
};

type EventForm = typeof EMPTY_EVENT;

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function EventManager() {
  const { events, eventsLoading, fetchEvents, addEvent, updateEvent, deleteEvent } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState({ current: 0, total: 0 });

  const setField = (key: keyof EventForm) => (val: string | boolean | GalleryImage[]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const openCreate = () => {
    setForm(EMPTY_EVENT);
    setEditId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (ev: EventDoc) => {
    setForm({
      title: ev.title || "",
      location: ev.location || "",
      eventDate: ev.eventDate || new Date().toISOString().slice(0, 10),
      description: ev.description || "",
      coverImage: ev.coverImage || "",
      gallery: ev.gallery || [],
      active: ev.active !== false,
    });
    setEditId(ev.id);
    setError("");
    setShowForm(true);
  };

  const uploadOne = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "kmopl-events");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
    return data.url;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    setError("");
    try {
      const url = await uploadOne(file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cover upload failed");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setGalleryUploading(true);
    setGalleryProgress({ current: 0, total: files.length });
    setError("");
    try {
      const uploaded: GalleryImage[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadOne(files[i]);
        uploaded.push({ url, name: files[i].name.replace(/\.[^.]+$/, "") });
        setGalleryProgress({ current: i + 1, total: files.length });
      }
      setForm((f) => ({ ...f, gallery: [...f.gallery, ...uploaded] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gallery upload failed");
    } finally {
      setGalleryUploading(false);
      setGalleryProgress({ current: 0, total: 0 });
    }
  };

  const removeGalleryImage = (idx: number) =>
    setForm((f) => ({ ...f, gallery: f.gallery.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError("Event title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editId) {
        await updateEvent(editId, form);
      } else {
        await addEvent(form);
      }
      setShowForm(false);
      setForm(EMPTY_EVENT);
      setEditId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event and its gallery? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteEvent(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-stone-800">Events</h3>
          <p className="text-[13px] text-stone-400 mt-0.5">{events.length} total events</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchEvents}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm font-medium text-stone-500 hover:bg-stone-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Refresh
          </button>
          <button onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Event
          </button>
        </div>
      </div>

      {/* Event list */}
      {eventsLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">🎉</div>
          <p className="font-semibold text-stone-700">No events yet</p>
          <p className="text-sm text-stone-400 mt-1">Click "Add Event" to create your first event with a gallery</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((ev, i) => (
            <motion.div key={ev.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative h-40 bg-stone-100">
                {ev.coverImage || ev.gallery?.[0]?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ev.coverImage || ev.gallery[0].url} alt={ev.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🎉</div>
                )}
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${ev.active !== false ? "bg-green-500 text-white" : "bg-stone-700 text-white"}`}>
                  {ev.active !== false ? "Active" : "Hidden"}
                </span>
                {ev.gallery?.length > 0 && (
                  <span className="absolute bottom-3 left-3 px-2 py-1 rounded-lg text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                    {ev.gallery.length} photo{ev.gallery.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-[15px] font-bold text-stone-800 truncate">{ev.title}</h4>
                <div className="flex items-center gap-3 mt-1 text-[12px] text-stone-400">
                  <span>{formatDate(ev.eventDate)}</span>
                  {ev.location && <><span>·</span><span className="truncate">{ev.location}</span></>}
                </div>
                {ev.description && <p className="text-[12px] text-stone-500 mt-2 line-clamp-2">{ev.description}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(ev)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(ev.id)} disabled={deletingId === ev.id}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50">
                    {deletingId === ev.id ? (
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
            </motion.div>
          ))}
        </div>
      )}

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !saving && setShowForm(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between z-10">
                  <h3 className="text-lg font-bold text-stone-800">{editId ? "Edit Event" : "Add New Event"}</h3>
                  <button onClick={() => !saving && setShowForm(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Event Title *</label>
                    <input value={form.title} onChange={(e) => setField("title")(e.target.value)} placeholder="e.g. Annual Dealer Meet 2025"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Event Date</label>
                      <input type="date" value={form.eventDate} onChange={(e) => setField("eventDate")(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Location</label>
                      <input value={form.location} onChange={(e) => setField("location")(e.target.value)} placeholder="e.g. New Delhi"
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Description</label>
                    <textarea value={form.description} onChange={(e) => setField("description")(e.target.value)} rows={3} placeholder="What was this event about?"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all resize-none" />
                  </div>

                  {/* Cover image */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Cover Image</label>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-16 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center shrink-0">
                        {form.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={form.coverImage} alt="cover" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-stone-300 text-xs">No cover</span>
                        )}
                      </div>
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-sm font-semibold text-stone-600 transition-colors">
                        {coverUploading ? "Uploading…" : form.coverImage ? "Change" : "Upload Cover"}
                        <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={coverUploading} className="hidden" />
                      </label>
                      {form.coverImage && (
                        <button type="button" onClick={() => setField("coverImage")("")} className="text-xs text-red-500 hover:underline">Remove</button>
                      )}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Gallery Images ({form.gallery.length})</label>
                      <label className="cursor-pointer text-xs font-bold text-amber-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">
                        + Add Photos
                        <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={galleryUploading} className="hidden" />
                      </label>
                    </div>
                    {galleryUploading && (
                      <div className="mb-3 flex items-center gap-2 text-xs text-amber-600">
                        <span className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        Uploading {galleryProgress.current}/{galleryProgress.total}…
                      </div>
                    )}
                    {form.gallery.length === 0 ? (
                      <div className="border-2 border-dashed border-stone-200 rounded-xl py-8 text-center text-sm text-stone-400">
                        No images yet. Click "Add Photos" to upload the event gallery.
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {form.gallery.map((img, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden border border-stone-200 aspect-square">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeGalleryImage(idx)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={(e) => setField("active")(e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-500" />
                    <span className="text-sm font-medium text-stone-600">Active (visible on events page)</span>
                  </label>

                  {error && (
                    <div className="px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200 font-medium">⚠ {error}</div>
                  )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-stone-100 px-6 py-4 flex justify-end gap-3">
                  <button onClick={() => setShowForm(false)} disabled={saving}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving || coverUploading || galleryUploading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-md disabled:opacity-70 transition-all"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                    {saving && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                    {editId ? "Update Event" : "Create Event"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
