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
  pdfUrl?: string;
  pdfName?: string;
  active?: boolean;
}

export const substrates = {
  wood: {
    label: "Wood Coatings",
    icon: "🪵",
    color: "#16a34a",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    description: "At Krishna Murari Organosys Pvt. Ltd. (KMOPL), we engineer world-class, industrial-grade wood coatings designed to enhance, protect, and extend the life of wooden surfaces. Backed by over two decades of expertise in chemical manufacturing and paint technology, our advanced formulations cater directly to furniture manufacturers, large-scale handicraft exporters, and premium OEMs across India. From deep interior aesthetics to extreme weather protection outdoors, our wood coatings bridge the gap between stunning craftsmanship and industrial-grade endurance. .",
  },
  metal: {
    label: "Metal Coatings",
    icon: "🛡️",
    color: "#d97706",
    bg: "bg-amber-50",
    border: "border-amber-200",
    description: "At Krishna Murari Organosys Pvt. Ltd., we engineer specialized industrial metal coatings designed to deliver superior surface protection, robust aesthetic finishes, and exceptional lifecycle extension. Whether protecting structural assets from heavy atmospheric corrosion or delivering high-gloss finishes for automotive and industrial equipment, our formulations provide the ultimate chemical and mechanical defense for all metal substrates.",
  },
  glass: {
    label: "Glass & Plastic Coatings",
    icon: "🪟",
    color: "#0891b2",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    description: "At Krishna Murari Organosys Pvt. Ltd., we extend our surface engineering expertise into highly specialized substrates like glass and engineering plastics. Because non-porous surfaces present unique adhesion challenges, our advanced formulations utilize molecular-level bonding technology. They deliver stunning visual aesthetics, scratch defense, and durability for high-end consumer goods, architectural glass, and automotive components.",
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
