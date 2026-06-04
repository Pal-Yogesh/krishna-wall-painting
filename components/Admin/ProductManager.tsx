"use client";

import { useState } from "react";
import { useAdmin, ProductDoc } from "@/context/AdminContext";

interface ProductManagerProps {
  onEdit: (id: string) => void;
  onAdd: () => void;
}

export default function ProductManager({ onEdit, onAdd }: ProductManagerProps) {
  const { products, productsLoading, deleteProduct } = useAdmin();
  const [filterSubstrate, setFilterSubstrate] = useState<string>("All");
  const [search, setSearch] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product permanently?")) return;
    await deleteProduct(id);
  };

  const filtered = products.filter(p => {
    if (filterSubstrate !== "All" && p.substrate !== filterSubstrate) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-stone-200 p-1 rounded-xl">
            {["All", "wood", "metal", "glass"].map((s) => (
              <button key={s} onClick={() => setFilterSubstrate(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${filterSubstrate === s ? "bg-stone-800 text-white shadow-sm" : "text-stone-500 hover:bg-stone-50"}`}>
                {s}
              </button>
            ))}
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-sm w-48 focus:outline-none focus:ring-2 focus:ring-amber-200" />
        </div>
        <button onClick={onAdd} className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-white rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors shadow-md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Product
        </button>
      </div>

      {/* List */}
      {productsLoading ? (
        <div className="text-center py-16"><div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-2xl">📦</div>
          <p className="text-stone-500 font-medium">{products.length === 0 ? "No products yet" : "No products match your filter"}</p>
          {products.length === 0 && <button onClick={onAdd} className="mt-3 text-sm font-semibold text-amber-600 hover:text-amber-700">+ Add your first product</button>}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-stone-100 bg-stone-50/50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider hidden sm:table-cell">Substrate</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider hidden md:table-cell">Chemistry</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-11 h-11 rounded-xl object-cover border border-stone-200 shadow-sm" />
                      ) : (
                        <span className="w-11 h-11 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-lg">{p.icon}</span>
                      )}
                      <div>
                        <p className="font-semibold text-stone-800">{p.name}</p>
                        <p className="text-xs text-stone-400 line-clamp-1 max-w-[200px]">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${
                      p.substrate === "wood" ? "bg-emerald-50 text-emerald-700" :
                      p.substrate === "metal" ? "bg-amber-50 text-amber-700" :
                      "bg-cyan-50 text-cyan-700"
                    }`}>{p.substrate}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-stone-600">{p.chemistry}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEdit(p.id)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-amber-600 transition-colors" title="Edit">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
