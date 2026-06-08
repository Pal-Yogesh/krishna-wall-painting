"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface TechnicalProperty {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  substrate: "wood" | "metal" | "glass";
  chemistry: string;
  description: string;
  fullDescription: string;
  features: string[];
  applications: string[];
  finishes: string[];
  image: string;
  imageFront: string;
  imageBack: string;
  gallery: { url: string; name: string }[];
  recommendedUse: string;
  applicationGuidelines: string;
  inCanProperties: TechnicalProperty[];
  applicationProperties: TechnicalProperty[];
  filmProperties: TechnicalProperty[];
  delivery: TechnicalProperty[];
  active?: boolean;
}

export const substrates = {
  wood: {
    label: "Wood Coatings",
    icon: "🪵",
    color: "#16a34a",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    description: "Premium coating solutions for wooden surfaces — from furniture and handicrafts to flooring and musical instruments. Our wood coatings deliver exceptional clarity, durability, and finish quality.",
  },
  metal: {
    label: "Metal Coatings",
    icon: "🛡️",
    color: "#d97706",
    bg: "bg-amber-50",
    border: "border-amber-200",
    description: "High-performance coatings for metal substrates providing corrosion protection, weather resistance, and decorative finishes for automotive, industrial, and consumer applications.",
  },
  glass: {
    label: "Glass & Plastic Coatings",
    icon: "🪟",
    color: "#0891b2",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    description: "Specialty coatings for glass, ABS, and plastic substrates offering superior adhesion, optical clarity, and decorative effects for lighting, glassware, and electronics.",
  },
};

interface ProductContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsBySubstrate: (substrate: string) => Product[];
}

const ProductContext = createContext<ProductContextType | null>(null);

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductById = useCallback((id: string) => {
    return products.find((p) => p.id === id);
  }, [products]);

  const getProductsBySubstrate = useCallback((substrate: string) => {
    return products.filter((p) => p.substrate === substrate);
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, getProductById, getProductsBySubstrate }}>
      {children}
    </ProductContext.Provider>
  );
}
