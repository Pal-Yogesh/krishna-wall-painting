"use client";

import { useState, useEffect } from "react";
import { useAdmin, ProductDoc } from "@/context/AdminContext";

const SUBSTRATES = ["wood", "metal", "glass"] as const;
const CHEMISTRIES = ["Nitrocellulose", "Polyurethane", "Epoxy", "Acrylic (1K)", "UV Curable", "Water-Based (1K)", "Water-Based (2K)", "Heat Resistant", "Unsaturated Polyester"];

interface TechProp { label: string; value: string; }
interface Props { productId?: string; onSaved: () => void; onCancel: () => void; }

const STEPS = [
  { key: "basic", label: "Basic Info", icon: "1" },
  { key: "details", label: "Description & Features", icon: "2" },
  { key: "technical", label: "Technical Data", icon: "3" },
  { key: "gallery", label: "Product Gallery", icon: "4" },
];

function TechPropsEditor({ label, items, onChange }: { label: string; items: TechProp[]; onChange: (items: TechProp[]) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-stone-700">{label}</span>
        <button type="button" onClick={() => onChange([...items, { label: "", value: "" }])} className="text-xs font-semibold text-amber-600 hover:text-amber-700 px-2 py-1 rounded-lg hover:bg-amber-50">+ Add Row</button>
      </div>
      {items.length === 0 && <p className="text-xs text-stone-400 italic">No data yet. Click "Add Row" to start.</p>}
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={item.label} onChange={(e) => { const u = [...items]; u[i] = {...u[i], label: e.target.value}; onChange(u); }} placeholder="Property name" className="flex-1 px-3 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-200" />
          <input value={item.value} onChange={(e) => { const u = [...items]; u[i] = {...u[i], value: e.target.value}; onChange(u); }} placeholder="Value" className="flex-1 px-3 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-200" />
          <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default function ProductForm({ productId, onSaved, onCancel }: Props) {
  const { products, addProduct, updateProduct } = useAdmin();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [substrate, setSubstrate] = useState<"wood"|"metal"|"glass">("wood");
  const [chemistry, setChemistry] = useState("Polyurethane");
  const [icon, setIcon] = useState("🎨");
  const [image, setImage] = useState("");
  const [imageFront, setImageFront] = useState("");
  const [imageBack, setImageBack] = useState("");
  const [description, setDescription] = useState("");
  const [finishes, setFinishes] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [applications, setApplications] = useState("");
  const [recommendedUse, setRecommendedUse] = useState("");
  const [applicationGuidelines, setApplicationGuidelines] = useState("");
  const [inCanProperties, setInCanProperties] = useState<TechProp[]>([]);
  const [applicationProperties, setApplicationProperties] = useState<TechProp[]>([]);
  const [filmProperties, setFilmProperties] = useState<TechProp[]>([]);
  const [delivery, setDelivery] = useState<TechProp[]>([]);
  const [gallery, setGallery] = useState<{ url: string; name: string }[]>([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState({ current: 0, total: 0 });
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [pdfUploading, setPdfUploading] = useState(false);

  // Load existing product data for editing
  useEffect(() => {
    if (productId) {
      const p = products.find(pr => pr.id === productId);
      if (p) {
        setName(p.name); setSubstrate(p.substrate); setChemistry(p.chemistry);
        setIcon(p.icon); setImage(p.image || ""); setImageFront((p as any).imageFront || ""); setImageBack((p as any).imageBack || ""); setDescription(p.description);
        setFinishes((p.finishes || []).join(", ")); setFullDescription(p.fullDescription);
        setFeatures((p.features || []).join("\n")); setApplications((p.applications || []).join("\n"));
        setRecommendedUse(p.recommendedUse || ""); setApplicationGuidelines(p.applicationGuidelines || "");
        setInCanProperties(p.inCanProperties || []); setApplicationProperties(p.applicationProperties || []);
        setFilmProperties(p.filmProperties || []); setDelivery(p.delivery || []);
        setGallery((p as any).gallery || []);
        setPdfUrl((p as any).pdfUrl || ""); setPdfName((p as any).pdfName || "");
      }
    }
  }, [productId, products]);

  const handleImageUpload = async (file: File, target: "main" | "front" | "back" = "main") => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "kmopl-products");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        if (target === "main") setImage(data.url);
        else if (target === "front") setImageFront(data.url);
        else if (target === "back") setImageBack(data.url);
      } else alert("Upload failed: " + (data.error || "Unknown error"));
    } catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };

  const handlePdfUpload = async (file: File) => {
    if (file.type !== "application/pdf") { alert("Only PDF files are allowed"); return; }
    if (file.size > 5 * 1024 * 1024) { alert("PDF size must not exceed 5 MB"); return; }
    setPdfUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "kmopl-product-pdfs");
      const res = await fetch("/api/upload-product-pdf", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        setPdfUrl(data.url);
        setPdfName(file.name);
      } else alert("PDF upload failed: " + (data.error || "Unknown error"));
    } catch { alert("PDF upload failed"); }
    finally { setPdfUploading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const productData = {
        name, substrate, chemistry, icon, image, imageFront, imageBack, description,
        fullDescription,
        features: features.split("\n").map(s => s.trim()).filter(Boolean),
        applications: applications.split("\n").map(s => s.trim()).filter(Boolean),
        finishes: finishes.split(",").map(s => s.trim()).filter(Boolean),
        recommendedUse, applicationGuidelines,
        inCanProperties: inCanProperties.filter(p => p.label && p.value),
        applicationProperties: applicationProperties.filter(p => p.label && p.value),
        filmProperties: filmProperties.filter(p => p.label && p.value),
        delivery: delivery.filter(p => p.label && p.value),
        gallery,
        pdfUrl,
        pdfName,
        active: true,
      };
      if (productId) await updateProduct(productId, productData);
      else await addProduct(productData as Omit<ProductDoc, "id">);
      onSaved();
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : "Failed to save"}`);
    } finally { setSaving(false); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button onClick={onCancel} className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Back to Products
      </button>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <button key={s.key} onClick={() => setStep(i)} className="flex-1 group">
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
              step === i ? "bg-stone-900 text-white border-stone-900 shadow-md" :
              step > i ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
              "bg-white text-stone-400 border-stone-200 hover:border-stone-300"
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step === i ? "bg-white text-stone-900" :
                step > i ? "bg-emerald-500 text-white" :
                "bg-stone-100 text-stone-500"
              }`}>
                {step > i ? "✓" : s.icon}
              </span>
              <span className="text-xs font-semibold hidden sm:block">{s.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Form content */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-6">
        {/* STEP 1: Basic Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-stone-800 mb-1">Basic Information</h3>
            <p className="text-sm text-stone-400 mb-6">Product name, type, and image</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Product Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:bg-white transition-all" placeholder="e.g. PU Coatings for Wood" />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Chemistry *</label>
                <select value={chemistry} onChange={(e) => setChemistry(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-200">
                  {CHEMISTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Substrate *</label>
                <div className="flex gap-2">
                  {SUBSTRATES.map(s => (
                    <button key={s} type="button" onClick={() => setSubstrate(s)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold capitalize transition-all border ${
                        substrate === s ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300"
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image upload */}
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Product Image (Main)</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-5 py-3 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl text-sm font-medium text-stone-600 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                  {uploading ? "Uploading..." : "Choose Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, "main"); }} />
                </label>
                {image && (
                  <div className="relative">
                    <img src={image} alt="preview" className="w-14 h-14 rounded-xl object-cover border-2 border-stone-200 shadow-sm" />
                    <button type="button" onClick={() => setImage("")} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-sm">×</button>
                  </div>
                )}
                {uploading && <div className="w-14 h-14 rounded-xl bg-stone-100 border-2 border-stone-200 flex items-center justify-center"><div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>}
              </div>
            </div>

            {/* Front & Back images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Front Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl text-xs font-medium text-stone-600 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                    Upload Front
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, "front"); }} />
                  </label>
                  {imageFront && (
                    <div className="relative">
                      <img src={imageFront} alt="Front" className="w-12 h-12 rounded-lg object-cover border border-stone-200" />
                      <button type="button" onClick={() => setImageFront("")} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-sm">×</button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Back Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl text-xs font-medium text-stone-600 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                    Upload Back
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, "back"); }} />
                  </label>
                  {imageBack && (
                    <div className="relative">
                      <img src={imageBack} alt="Back" className="w-12 h-12 rounded-lg object-cover border border-stone-200" />
                      <button type="button" onClick={() => setImageBack("")} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-sm">×</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Short Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="Brief 1-2 line description of the product" />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Finishes (comma separated)</label>
              <input value={finishes} onChange={(e) => setFinishes(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="Matte, Satin, Gloss, High Gloss" />
            </div>

            {/* PDF Upload */}
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Product PDF (max 5 MB)</label>
              <div className="flex items-center gap-4 flex-wrap">
                <label className={`flex items-center gap-2 px-5 py-3 border-2 border-dashed rounded-xl text-sm font-medium cursor-pointer transition-all ${pdfUploading ? "opacity-50 pointer-events-none" : "hover:border-amber-400 hover:bg-amber-50"} border-stone-300 bg-stone-50 text-stone-600`}>
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  {pdfUploading ? "Uploading..." : pdfUrl ? "Replace PDF" : "Upload PDF"}
                  <input type="file" accept="application/pdf" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePdfUpload(f); e.currentTarget.value = ""; }} />
                </label>

                {pdfUrl && (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                    <svg className="w-5 h-5 text-stone-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-700 truncate max-w-[180px]">{pdfName || "Uploaded PDF"}</p>
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-stone-500 hover:underline">Preview PDF ↗</a>
                    </div>
                    <button type="button" onClick={() => { setPdfUrl(""); setPdfName(""); }}
                      className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shrink-0">×</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-stone-800 mb-1">Description & Features</h3>
            <p className="text-sm text-stone-400 mb-6">Full description, features list, and application guidelines</p>

            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Full Description</label>
              <textarea value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="Detailed product description paragraph..." />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Key Features (one per line)</label>
              <textarea value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="Fast drying (touch dry in 15-20 minutes)&#10;Excellent clarity and transparency&#10;Easy sanding between coats" />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Applications (one per line)</label>
              <textarea value={applications} onChange={(e) => setApplications(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="Wooden furniture&#10;Kitchen cabinets&#10;Office furniture" />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Recommended Use</label>
              <textarea value={recommendedUse} onChange={(e) => setRecommendedUse(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="High performance coating recommended for..." />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Application Guidelines</label>
              <textarea value={applicationGuidelines} onChange={(e) => setApplicationGuidelines(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-amber-200" placeholder="Surface preparation and application instructions..." />
            </div>
          </div>
        )}

        {/* STEP 3: Technical Data */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-1">Technical Data Sheet</h3>
              <p className="text-sm text-stone-400 mb-6">Add lab-tested specifications (optional)</p>
            </div>
            <TechPropsEditor label="In Can Properties" items={inCanProperties} onChange={setInCanProperties} />
            <TechPropsEditor label="Application Properties" items={applicationProperties} onChange={setApplicationProperties} />
            <TechPropsEditor label="Film Properties" items={filmProperties} onChange={setFilmProperties} />
            <TechPropsEditor label="Delivery Information" items={delivery} onChange={setDelivery} />
          </div>
        )}

        {/* STEP 4: Gallery */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-1">Product Gallery</h3>
              <p className="text-sm text-stone-400 mb-6">Upload up to 30 product images with names (drag & drop or click)</p>
            </div>

            {/* Upload area */}
            {gallery.length < 30 && (
              <label className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl transition-all ${galleryUploading ? "border-amber-400 bg-amber-50/30 pointer-events-none" : "border-stone-300 hover:border-amber-400 hover:bg-amber-50/30 cursor-pointer"}`}>
                {galleryUploading ? (
                  <>
                    <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-semibold text-amber-700">Uploading {galleryProgress.current}/{galleryProgress.total}</span>
                    {/* Progress bar */}
                    <div className="w-48 h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${galleryProgress.total > 0 ? (galleryProgress.current / galleryProgress.total) * 100 : 0}%` }} />
                    </div>
                    <span className="text-xs text-stone-400">Please wait...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="text-sm font-medium text-stone-500">Click to upload images (multiple allowed)</span>
                    <span className="text-xs text-stone-400">{gallery.length}/30 images uploaded</span>
                  </>
                )}
                <input type="file" accept="image/*" multiple className="hidden" disabled={galleryUploading} onChange={async (e) => {
                  const files = e.target.files;
                  if (!files || files.length === 0) return;
                  const totalToUpload = Math.min(files.length, 30 - gallery.length);
                  setGalleryUploading(true);
                  setGalleryProgress({ current: 0, total: totalToUpload });
                  const newImages: { url: string; name: string }[] = [];
                  for (let i = 0; i < totalToUpload; i++) {
                    setGalleryProgress({ current: i + 1, total: totalToUpload });
                    try {
                      const fd = new FormData();
                      fd.append("file", files[i]);
                      fd.append("folder", "kmopl-products/gallery");
                      const res = await fetch("/api/upload", { method: "POST", body: fd });
                      const data = await res.json();
                      if (data.url) newImages.push({ url: data.url, name: files[i].name.replace(/\.[^/.]+$/, "") });
                    } catch {}
                  }
                  setGallery([...gallery, ...newImages]);
                  setGalleryUploading(false);
                  setGalleryProgress({ current: 0, total: 0 });
                }} />
              </label>
            )}

            {/* Gallery preview grid */}
            {gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((img, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                    <img src={img.url} alt={img.name} className="w-full h-28 object-cover" />
                    {/* Remove button */}
                    <button type="button" onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      ✕
                    </button>
                    {/* Name input */}
                    <div className="p-2">
                      <input
                        value={img.name}
                        onChange={(e) => { const updated = [...gallery]; updated[i] = { ...updated[i], name: e.target.value }; setGallery(updated); }}
                        placeholder="Image name"
                        className="w-full px-2 py-1.5 text-xs border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {gallery.length === 0 && (
              <p className="text-center text-sm text-stone-400 py-4">No gallery images uploaded yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-800 border border-stone-200 bg-white rounded-xl hover:bg-stone-50 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Previous
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="px-5 py-2.5 text-sm font-semibold text-stone-500 hover:text-stone-700 transition-colors">Cancel</button>
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-6 py-2.5 bg-stone-800 text-white rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors shadow-md">
              Next Step
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          ) : (
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md disabled:opacity-50">
              {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {productId ? "Update Product" : "Create Product"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
