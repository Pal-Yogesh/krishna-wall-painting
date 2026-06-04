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

  // Load existing product data for editing
  useEffect(() => {
    if (productId) {
      const p = products.find(pr => pr.id === productId);
      if (p) {
        setName(p.name); setSubstrate(p.substrate); setChemistry(p.chemistry);
        setIcon(p.icon); setImage(p.image || ""); setDescription(p.description);
        setFinishes((p.finishes || []).join(", ")); setFullDescription(p.fullDescription);
        setFeatures((p.features || []).join("\n")); setApplications((p.applications || []).join("\n"));
        setRecommendedUse(p.recommendedUse || ""); setApplicationGuidelines(p.applicationGuidelines || "");
        setInCanProperties(p.inCanProperties || []); setApplicationProperties(p.applicationProperties || []);
        setFilmProperties(p.filmProperties || []); setDelivery(p.delivery || []);
      }
    }
  }, [productId, products]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "kmopl-products");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setImage(data.url);
      else alert("Upload failed: " + (data.error || "Unknown error"));
    } catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!name.trim() || !chemistry.trim()) { alert("Name and Chemistry are required"); return; }
    setSaving(true);
    try {
      const productData = {
        name, substrate, chemistry, icon, image, description,
        fullDescription,
        features: features.split("\n").map(s => s.trim()).filter(Boolean),
        applications: applications.split("\n").map(s => s.trim()).filter(Boolean),
        finishes: finishes.split(",").map(s => s.trim()).filter(Boolean),
        recommendedUse, applicationGuidelines,
        inCanProperties: inCanProperties.filter(p => p.label && p.value),
        applicationProperties: applicationProperties.filter(p => p.label && p.value),
        filmProperties: filmProperties.filter(p => p.label && p.value),
        delivery: delivery.filter(p => p.label && p.value),
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
              <label className="text-xs font-semibold text-stone-600 mb-1.5 block">Product Image</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-5 py-3 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl text-sm font-medium text-stone-600 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                  {uploading ? "Uploading..." : "Choose Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
                </label>
                {image && <img src={image} alt="preview" className="w-14 h-14 rounded-xl object-cover border-2 border-stone-200 shadow-sm" />}
                {uploading && <div className="w-14 h-14 rounded-xl bg-stone-100 border-2 border-stone-200 flex items-center justify-center"><div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>}
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
          {step < 2 ? (
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
