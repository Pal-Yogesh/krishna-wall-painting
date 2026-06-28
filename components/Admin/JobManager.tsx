"use client";

import React, { useState } from "react";
import { useAdmin, JobDoc } from "@/context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

function formatDate(ts?: { seconds: number }) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleDateString("en-GB", {
    weekday: "short", day: "2-digit", month: "2-digit", year: "numeric",
  });
}

const EMPTY_JOB = {
  title: "",
  location: "",
  qualification: "",
  experience: "",
  industry: "",
  description: "",
  applyEmail: "",
  active: true,
};

type JobForm = typeof EMPTY_JOB;

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all"
      />
    </div>
  );
}

export default function JobManager() {
  const { jobs, jobsLoading, fetchJobs, addJob, updateJob, deleteJob } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<JobForm>(EMPTY_JOB);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const setField = (key: keyof JobForm) => (val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const openCreate = () => {
    setForm(EMPTY_JOB);
    setEditId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (job: JobDoc) => {
    setForm({
      title: job.title || "",
      location: job.location || "",
      qualification: job.qualification || "",
      experience: job.experience || "",
      industry: job.industry || "",
      description: job.description || "",
      applyEmail: job.applyEmail || "",
      active: job.active !== false,
    });
    setEditId(job.id);
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError("Job title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editId) {
        await updateJob(editId, form);
      } else {
        await addJob(form);
      }
      setShowForm(false);
      setForm(EMPTY_JOB);
      setEditId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save job.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job posting? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteJob(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-stone-800">Job Postings</h3>
          <p className="text-[13px] text-stone-400 mt-0.5">{jobs.length} total openings</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchJobs}
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
            Post New Job
          </button>
        </div>
      </div>

      {/* Job list */}
      {jobsLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">💼</div>
          <p className="font-semibold text-stone-700">No job postings yet</p>
          <p className="text-sm text-stone-400 mt-1">Click "Post New Job" to create your first opening</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-[15px] font-bold text-stone-800">{job.title}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${job.active !== false ? "bg-green-50 text-green-700 border border-green-200" : "bg-stone-100 text-stone-400 border border-stone-200"}`}>
                      {job.active !== false ? "Active" : "Closed"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[12px] text-stone-500">
                    {job.qualification && <span><span className="text-stone-400">Qualification:</span> {job.qualification}</span>}
                    {job.experience && <span><span className="text-stone-400">Experience:</span> {job.experience}</span>}
                    {job.industry && <span><span className="text-stone-400">Industry:</span> {job.industry}</span>}
                  </div>
                  {job.description && (
                    <p className="text-[13px] text-stone-500 mt-2 line-clamp-2 leading-relaxed">{job.description}</p>
                  )}
                  <p className="text-[11px] text-stone-400 mt-2">Posted on {formatDate(job.createdAt as unknown as { seconds: number })}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => openEdit(job)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(job.id)} disabled={deletingId === job.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50">
                    {deletingId === job.id ? (
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
                  <h3 className="text-lg font-bold text-stone-800">{editId ? "Edit Job Posting" : "Post New Job"}</h3>
                  <button onClick={() => !saving && setShowForm(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <Field label="Job Title *" value={form.title} onChange={setField("title")} placeholder="e.g. Officer / Executive - Aligarh" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Location" value={form.location} onChange={setField("location")} placeholder="e.g. Aligarh" />
                    <Field label="Experience" value={form.experience} onChange={setField("experience")} placeholder="e.g. 4-5 Years" />
                    <Field label="Qualification" value={form.qualification} onChange={setField("qualification")} placeholder="e.g. Graduate / MBA in Marketing" />
                    <Field label="Industry" value={form.industry} onChange={setField("industry")} placeholder="e.g. Paint Manufacturing" />
                  </div>
                  <Field label="Apply Email" value={form.applyEmail} onChange={setField("applyEmail")} type="email" placeholder="e.g. careers@kmopl.com" />
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Job Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setField("description")(e.target.value)}
                      rows={5}
                      placeholder="Roles, responsibilities, and expectations..."
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all resize-none"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.active} onChange={(e) => setField("active")(e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-500" />
                    <span className="text-sm font-medium text-stone-600">Active (visible on careers page)</span>
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
                  <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-md disabled:opacity-70 transition-all"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                    {saving && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                    {editId ? "Update Job" : "Post Job"}
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
