// Shared helpers for showing the admin-managed products (product + its items).
import type { ProductItem } from "@/context/ProductContext";

export const CATEGORY_OPTIONS = [
  { value: "wood", label: "Wood Coatings" },
  { value: "metal", label: "Metal Coatings" },
  { value: "glass", label: "Glass Coatings" },
  { value: "dyestuff", label: "Dyestuff Solutions" },
  { value: "auxiliaries", label: "Wood Auxiliaries" },
  { value: "paint-removers", label: "Paint Removers" },
] as const;

export const categoryLabel = (value: string) =>
  CATEGORY_OPTIONS.find((c) => c.value === value)?.label ?? value;

/** "1K Acrylic Coatings for Wood" -> { main: "1K Acrylic Coatings", highlight: "for Wood" } */
export function splitHeading(name: string) {
  const m = name.trim().match(/^(.*?)\s+(for\s+.+)$/i);
  return m ? { main: m[1], highlight: m[2] } : { main: name.trim(), highlight: "" };
}

/** Title of the "Our ___" products section; defaults to the heading without its "for …" part. */
export function sectionTitleFor(p: { name: string; sectionTitle?: string }) {
  return (p.sectionTitle?.trim() || splitHeading(p.name).main).replace(/^our\s+/i, "");
}

export function tdsHref(item: Pick<ProductItem, "tdsUrl" | "tdsName" | "name">) {
  if (!item.tdsUrl) return "";
  const ext = item.tdsName?.split(".").pop() || "pdf";
  const name = item.tdsName || `${item.name.replace(/\s+/g, " ")} TDS.${ext}`;
  return `/api/download-pdf?url=${encodeURIComponent(item.tdsUrl)}&name=${encodeURIComponent(name)}`;
}

/** Products of one category, in page order (explicit `order` first, then by name). */
export function productsFor<T extends { substrate: string; name: string; active?: boolean; order?: number }>(products: T[], substrate: string) {
  return products
    .filter((p) => p.substrate === substrate && p.active !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name));
}

export const tdsZipHref = (productId: string) => `/api/download-tds-zip?productId=${encodeURIComponent(productId)}`;

// Swatch colour for dyestuff items that have no image, guessed from the name
const DYE_COLORS: [RegExp, string][] = [
  [/jet\s*black/i, "#0b0b0b"],
  [/black/i, "#1f1f1f"],
  [/turq/i, "#3fa7b5"],
  [/light\s*yellow/i, "#f2d43a"],
  [/yellow/i, "#f5d731"],
  [/orange/i, "#f47c20"],
  [/fire\s*red|red/i, "#d9261c"],
  [/green/i, "#2e7d32"],
  [/blue/i, "#2f4fc4"],
  [/brown/i, "#6b4226"],
  [/violet|purple/i, "#6d28d9"],
  [/pink|magenta/i, "#db2777"],
  [/white/i, "#f5f5f4"],
];
export const dyeColor = (name: string) => DYE_COLORS.find(([re]) => re.test(name))?.[1] ?? "#a8a29e";
