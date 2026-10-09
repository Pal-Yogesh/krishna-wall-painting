"use client";

import { useEffect, useState } from "react";
import { useAdmin, type ProductDoc } from "@/context/AdminContext";
import { useToast } from "@/context/Toast";
import type { ProductItem } from "@/context/ProductContext";
import { CATEGORY_OPTIONS, splitHeading, sectionTitleFor } from "@/lib/product-display";

interface Props { productId?: string; onSaved: () => void; onCancel: () => void; }

const INPUT = "w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:bg-white transition-all";
const LABEL = "text-xs font-semibold text-stone-600 mb-1.5 block";

const newItem = (): ProductItem => ({ id: Math.random().toString(36).slice(2, 10), name: "", image: "", tdsUrl: "", tdsName: "" });

async function upload(file: File, kind: "image" | "document") {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("kind", kind);
  const res = await fetch("/api/storage-upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
  return data as { url: string; name: string };
}

function Spinner({ className = "w-4 h-4" }: { className?: string }) {
  return <span className={`${className} border-2 border-amber-500 border-t-transparent rounded-full animate-spin inline-block`} />;
}

export default function ProductForm({ productId, onSaved, onCancel }: Props) {
  const { products, addProduct, updateProduct } = useAdmin();
  const { showToast } = useToast();

  const [substrate, setSubstrate] = useState<ProductDoc["substrate"]>("wood");
  const [banner, setBanner] = useState("");
  const [cardImage, setCardImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");
  const [items, setItems] = useState<ProductItem[]>([]);
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!productId) return;
    const p = products.find((x) => x.id === productId);
    if (!p) return;
    setSubstrate(p.substrate);
    setBanner(p.banner || "");
    setCardImage(p.image || "");
    setName(p.name || "");
    setDescription(p.description || "");
    setSectionTitle(p.sectionTitle || "");
    setItems(p.items?.length ? p.items : []);
  }, [productId, products]);

  const uploading = Object.values(busy).some(Boolean);

  const runUpload = async (key: string, file: File, kind: "image" | "document", apply: (r: { url: string; name: string }) => void) => {
    setBusy((b) => ({ ...b, [key]: true }));
    try {
      apply(await upload(file, kind));
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setBusy((b) => ({ ...b, [key]: false }));
    }
  };

  const patchItem = (id: string, patch: Partial<ProductItem>) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const moveItem = (index: number, dir: -1 | 1) =>
    setItems((list) => {
      const next = [...list];
      const target = index + dir;
      if (target < 0 || target >= next.length) return list;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const handleSave = async () => {
    if (!name.trim()) return showToast("Please enter a heading", "error");
    if (items.some((i) => !i.name.trim())) return showToast("Every product needs a name (or remove the empty one)", "error");
    setSaving(true);
    try {
      const payload = { substrate, banner, image: cardImage, name, description, sectionTitle, items };
      if (productId) await updateProduct(productId, payload);
      else await addProduct(payload);
      showToast(productId ? "Product updated" : "Product created", "success");
      onSaved();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const heading = splitHeading(name || "1K Acrylic Coatings for Wood");

  return (
    <div className="max-w-4xl">
      <button onClick={onCancel} className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Back to Products
      </button>

      <div className="space-y-6">
        {/* Category */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <h3 className="text-lg font-bold text-stone-800 mb-1">Category</h3>
          <p className="text-sm text-stone-400 mb-5">Which products page this appears on</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button key={c.value} type="button" onClick={() => setSubstrate(c.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                  substrate === c.value ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300"
                }`}>{c.label}</button>
            ))}
          </div>
        </section>

        {/* Banner + heading + description */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-stone-800 mb-1">Banner &amp; Heading</h3>
            <p className="text-sm text-stone-400">The top section of the product page</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card Image */}
            <div>
              <label className={LABEL}>Card Image (listing page)</label>
              {cardImage ? (
                <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100" style={{ aspectRatio: "5/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cardImage} alt="Card" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <label className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-stone-700 shadow cursor-pointer hover:bg-white">
                      {busy.cardImage ? <Spinner className="w-3.5 h-3.5" /> : "Replace"}
                      <input type="file" accept="image/*" className="hidden" disabled={busy.cardImage}
                        onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) runUpload("cardImage", f, "image", (r) => setCardImage(r.url)); }} />
                    </label>
                    <button type="button" onClick={() => setCardImage("")} className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-red-600 shadow hover:bg-white">Remove</button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl text-sm font-medium text-stone-500 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all" style={{ aspectRatio: "5/3" }}>
                  {busy.cardImage ? <Spinner className="w-6 h-6" /> : (
                    <>
                      <svg className="w-7 h-7 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V9.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                      Upload card image
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" disabled={busy.cardImage}
                    onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) runUpload("cardImage", f, "image", (r) => setCardImage(r.url)); }} />
                </label>
              )}
              <p className="text-[11px] text-stone-400 mt-1.5">Recommended: 600 × 360 px (5:3 ratio)</p>
            </div>

            {/* Banner Image */}
            <div>
              <label className={LABEL}>Banner Image (detail page)</label>
              {banner ? (
                <div className="relative rounded-xl overflow-hidden border border-stone-200 aspect-3/1 bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={banner} alt="Banner" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <label className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-stone-700 shadow cursor-pointer hover:bg-white">
                      {busy.banner ? <Spinner className="w-3.5 h-3.5" /> : "Replace"}
                      <input type="file" accept="image/*" className="hidden" disabled={busy.banner}
                        onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) runUpload("banner", f, "image", (r) => setBanner(r.url)); }} />
                    </label>
                    <button type="button" onClick={() => setBanner("")} className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-red-600 shadow hover:bg-white">Remove</button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 aspect-3/1 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl text-sm font-medium text-stone-500 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all">
                  {busy.banner ? <Spinner className="w-6 h-6" /> : (
                    <>
                      <svg className="w-7 h-7 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V9.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                      Upload banner image
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" disabled={busy.banner}
                    onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) runUpload("banner", f, "image", (r) => setBanner(r.url)); }} />
                </label>
              )}
              <p className="text-[11px] text-stone-400 mt-1.5">Shown as hero on the product detail page</p>
            </div>
          </div>

          <div>
            <label className={LABEL}>Heading *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={INPUT} placeholder="e.g. 1K Acrylic Coatings for Wood" />
            <p className="text-[11px] text-stone-400 mt-1.5">
              Shows as <span className="font-bold text-stone-700 uppercase">{heading.main}</span>
              {heading.highlight && <> <span className="font-bold text-orange-600 uppercase">{heading.highlight}</span></>}
              {" "}— anything from &ldquo;for …&rdquo; is shown in orange.
            </p>
          </div>

          <div>
            <label className={LABEL}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${INPUT} resize-y`}
              placeholder="Our 1K Acrylic Coatings are advanced, single-component solutions…" />
          </div>
        </section>

        {/* Products */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-stone-800 mb-1">Products</h3>
            <p className="text-sm text-stone-400">Each product shows as a card with its image, name and a Request TDS button</p>
          </div>

          <div>
            <label className={LABEL}>Section Heading</label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-stone-500 shrink-0">OUR</span>
              <input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} className={INPUT}
                placeholder={sectionTitleFor({ name: name || "1K Acrylic Coatings for Wood" })} />
            </div>
            <p className="text-[11px] text-stone-400 mt-1.5">Leave empty to use the heading without its &ldquo;for …&rdquo; part.</p>
          </div>

          {items.length === 0 && (
            <p className="text-center text-sm text-stone-400 py-6 bg-stone-50 rounded-xl border border-dashed border-stone-200">No products yet. Click &ldquo;+ Add Product&rdquo; below.</p>
          )}

          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-stone-200 bg-stone-50/60">
                {/* Image */}
                <label className="relative shrink-0 w-full sm:w-36 aspect-4/3 rounded-lg overflow-hidden border-2 border-dashed border-stone-300 bg-white flex items-center justify-center cursor-pointer hover:border-amber-400 transition-colors">
                  {busy[`img-${item.id}`] ? <Spinner className="w-5 h-5" /> : item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="text-[11px] font-medium text-stone-400 text-center px-2">+ Image</span>
                  )}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) runUpload(`img-${item.id}`, f, "image", (r) => patchItem(item.id, { image: r.url })); }} />
                </label>

                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <label className={LABEL}>Product Name *</label>
                    <textarea value={item.name} rows={2} onChange={(e) => patchItem(item.id, { name: e.target.value })} className={`${INPUT} resize-none`}
                      placeholder={"1K Acrylic\nAcrylic Sanding Sealer"} />
                    <p className="text-[11px] text-stone-400 mt-1">Press Enter to put part of the name on a second line.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-semibold text-stone-600 hover:border-amber-400 cursor-pointer transition-colors">
                      {busy[`tds-${item.id}`] ? <Spinner className="w-3.5 h-3.5" /> : (
                        <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      )}
                      {item.tdsUrl ? "Replace TDS" : "Upload TDS (PDF / Word)"}
                      <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) runUpload(`tds-${item.id}`, f, "document", (r) => patchItem(item.id, { tdsUrl: r.url, tdsName: r.name })); }} />
                    </label>
                    {item.tdsUrl && (
                      <span className="inline-flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5 max-w-full">
                        <a href={item.tdsUrl} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">{item.tdsName || "TDS file"}</a>
                        <button type="button" onClick={() => patchItem(item.id, { tdsUrl: "", tdsName: "" })} className="text-emerald-700 hover:text-red-600" title="Remove TDS">✕</button>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col gap-1 justify-end sm:justify-start">
                  <button type="button" onClick={() => moveItem(idx, -1)} disabled={idx === 0} className="p-2 rounded-lg text-stone-400 hover:bg-white hover:text-stone-700 disabled:opacity-30" title="Move up">↑</button>
                  <button type="button" onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1} className="p-2 rounded-lg text-stone-400 hover:bg-white hover:text-stone-700 disabled:opacity-30" title="Move down">↓</button>
                  <button type="button" onClick={() => setItems((l) => l.filter((i) => i.id !== item.id))} className="p-2 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-600" title="Remove">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => setItems((l) => [...l, newItem()])}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-amber-300 rounded-xl text-sm font-semibold text-amber-700 hover:bg-amber-50 transition-colors">
            + Add Product
          </button>

          <p className="text-[11px] text-stone-400">
            The &ldquo;Request TDS for All&rdquo; bar and the four feature boxes are added to the page automatically.
          </p>
        </section>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6">
        <button onClick={onCancel} className="px-5 py-2.5 text-sm font-semibold text-stone-500 hover:text-stone-700 transition-colors">Cancel</button>
        <button onClick={handleSave} disabled={saving || uploading}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md disabled:opacity-50">
          {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          {uploading ? "Uploading…" : productId ? "Update Product" : "Create Product"}
        </button>
      </div>
    </div>
  );
}
