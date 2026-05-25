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
  finishes?: string[];
  icon: string;
  recommendedUse?: string;
  applicationGuidelines?: string;
  inCanProperties?: TechnicalProperty[];
  applicationProperties?: TechnicalProperty[];
  filmProperties?: TechnicalProperty[];
  delivery?: TechnicalProperty[];
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

export const products: Product[] = [
  // ─── WOOD (7) ───────────────────────────────────────────────────
  {
    id: "nc-coatings-for-wood",
    name: "NC Coatings for Wood",
    substrate: "wood",
    chemistry: "Nitrocellulose",
    icon: "🪵",
    description: "Fast-drying nitrocellulose coatings offering excellent clarity and easy application for wooden furniture and handicrafts.",
    fullDescription: "Our NC (Nitrocellulose) Coatings for Wood are formulated to deliver rapid drying times, exceptional clarity, and smooth application for a wide range of wooden substrates. These coatings are ideal for furniture manufacturers and handicraft producers who require quick turnaround without compromising on finish quality. Available in both clear and pigmented variants, they provide excellent sandability between coats and can be easily repaired or recoated. The formulation ensures minimal yellowing over time, maintaining the natural beauty of wood grain.",
    features: ["Fast drying (touch dry in 15-20 minutes)", "Excellent clarity and transparency", "Easy sanding between coats", "Good wood grain visibility", "Available in clear and pigmented variants", "Low odor formulation"],
    applications: ["Wooden furniture", "Handicraft items", "Picture frames", "Decorative woodwork", "Musical instruments"],
    finishes: ["Matte", "Satin", "Gloss"],
  },
  {
    id: "pu-coatings-for-wood",
    name: "PU Coatings for Wood",
    substrate: "wood",
    chemistry: "Polyurethane",
    icon: "🪵",
    description: "Superior hardness and chemical resistance polyurethane coatings for premium wooden surfaces.",
    fullDescription: "Our PU (Polyurethane) Coatings for Wood represent the gold standard in wood finishing technology. These two-component coatings deliver unmatched hardness, chemical resistance, and long-term durability for premium wooden surfaces. The advanced formulation provides excellent resistance to household chemicals, water, and abrasion, making them ideal for high-traffic furniture and commercial installations. With superior build and flow properties, these coatings create a luxurious, professional finish that stands the test of time.",
    features: ["Superior hardness and scratch resistance", "Excellent chemical and water resistance", "Outstanding durability and longevity", "High build per coat", "Excellent flow and leveling", "UV-stable formulations available"],
    applications: ["Premium furniture", "Kitchen cabinets", "Office furniture", "Hotel and restaurant interiors", "Wooden flooring"],
    finishes: ["Matte", "Satin", "Semi-Gloss", "High Gloss"],
    recommendedUse: "High performance two component polyurethane clear/pigmented coating for premium wood finishing. Recommended for high-end furniture, kitchen cabinetry, office furniture, and commercial interiors requiring superior hardness, chemical resistance, and long-term durability.",
    applicationGuidelines: "Wood surface must be sanded smooth (180–240 grit), clean, and dry (moisture content below 12%). Apply PU sanding sealer as base coat, sand with 320–400 grit between coats. Apply 2–3 coats of topcoat for optimal build and finish quality. Allow 4–6 hours between coats at 25°C. Full cure in 7 days.",
    inCanProperties: [
      { label: "Specific Gravity", value: "1.05 ± 0.03" },
      { label: "Viscosity 30°C sec B4", value: "40 ± 5%" },
      { label: "NVM", value: "45 ± 2" },
    ],
    applicationProperties: [
      { label: "Mixing Ratio (B : H)", value: "2 : 1 (by volume)" },
      { label: "Pot Life", value: "3 Hours at 25°C" },
      { label: "% Thinner Intake", value: "30–40" },
      { label: "Spray Viscosity (Sec)", value: "18 ± 2" },
      { label: "Recommended DFT", value: "30–40 microns per coat" },
    ],
    filmProperties: [
      { label: "Adhesion (Cross-cut)", value: "0/25" },
      { label: "Pencil Hardness", value: "H–2H" },
      { label: "Gloss at 60° (Gloss variant)", value: "90 ± 5 GU" },
      { label: "Chemical Resistance", value: "Excellent" },
      { label: "Water Resistance", value: "24 Hours (no effect)" },
    ],
    delivery: [
      { label: "Colour", value: "Clear / Wood shades" },
      { label: "Packing", value: "1 / 4 / 20 Ltr" },
    ],
  },
  {
    id: "unsaturated-polyester-coatings-for-wood",
    name: "Unsaturated Polyester Coatings for Wood",
    substrate: "wood",
    chemistry: "Unsaturated Polyester",
    icon: "🪵",
    description: "High-build polyester coatings for mirror-like finishes on premium wood surfaces.",
    fullDescription: "Our Unsaturated Polyester Coatings for Wood are engineered for applications demanding the highest level of finish quality. These coatings provide exceptional build in fewer coats, creating deep, mirror-like finishes that are synonymous with luxury furniture. The formulation allows for excellent polishing characteristics, enabling craftsmen to achieve piano-finish quality surfaces. Ideal for high-end furniture, musical instruments, and showroom pieces where visual impact is paramount.",
    features: ["Exceptional high-build capability", "Mirror-like finish after polishing", "Excellent depth and clarity", "Superior filling properties", "Good sandability", "Minimal shrinkage over time"],
    applications: ["High-end furniture", "Musical instruments (pianos, guitars)", "Showroom display pieces", "Luxury cabinetry", "Decorative panels"],
    finishes: ["High Gloss (polished)", "Semi-Gloss"],
  },
  {
    id: "1k-acrylic-coatings-for-wood",
    name: "1K Acrylic Coatings for Wood",
    substrate: "wood",
    chemistry: "Acrylic (1K)",
    icon: "🪵",
    description: "Single-component acrylic coatings with good weather resistance and easy application for wood.",
    fullDescription: "Our 1K (Single-Component) Acrylic Coatings for Wood offer a convenient, ready-to-use solution for wood finishing applications. These coatings provide good weather resistance, color retention, and UV stability, making them suitable for both interior and exterior wooden surfaces. The single-component nature eliminates mixing errors and pot-life concerns, improving productivity on the shop floor. With excellent flow and leveling properties, these coatings deliver consistent, professional results with minimal operator skill required.",
    features: ["No mixing required — ready to use", "Good weather and UV resistance", "Excellent color retention", "Easy application with good flow", "Fast drying", "Good inter-coat adhesion"],
    applications: ["Interior wooden furniture", "Exterior wood trim", "Wooden toys", "Craft items", "Garden furniture"],
    finishes: ["Matte", "Satin", "Gloss"],
  },
  {
    id: "uv-coatings-for-wood",
    name: "UV Coatings for Wood",
    substrate: "wood",
    chemistry: "UV Curable",
    icon: "🪵",
    description: "Instant-curing UV coatings for high-productivity wood finishing production lines.",
    fullDescription: "Our UV (Ultraviolet) Curable Coatings for Wood represent the cutting edge of wood finishing technology. These coatings cure instantly under UV light, enabling extremely high production speeds and throughput. The instant cure eliminates drying time, reduces work-in-progress inventory, and minimizes dust contamination. The cured film provides exceptional scratch and abrasion resistance, making these coatings ideal for flooring, kitchen worktops, and high-volume furniture production where productivity and durability are critical.",
    features: ["Instant curing under UV light", "Exceptional scratch resistance", "Zero VOC emissions during cure", "High production throughput", "Excellent surface hardness", "Consistent film properties"],
    applications: ["Wood flooring", "Kitchen worktops", "High-volume furniture production", "Parquet flooring", "MDF and particle board finishing"],
    finishes: ["Matte", "Satin", "Gloss", "Super Matte"],
  },
  {
    id: "1k-wb-coatings-for-wood",
    name: "1K WB Coatings for Wood",
    substrate: "wood",
    chemistry: "Water-Based (1K)",
    icon: "🪵",
    description: "Eco-friendly single-component water-based coatings with low VOC for interior wood surfaces.",
    fullDescription: "Our 1K Water-Based Coatings for Wood provide an environmentally responsible finishing solution without compromising on performance. These single-component formulations offer low VOC emissions, minimal odor, and easy cleanup with water, making them ideal for enclosed workshop environments and projects with strict environmental requirements. The coatings deliver good durability, clarity, and resistance properties for interior wooden surfaces while maintaining compliance with increasingly stringent environmental regulations.",
    features: ["Low VOC and eco-friendly", "Minimal odor during application", "Water cleanup — no solvents needed", "Good clarity and non-yellowing", "Fast drying", "Single component — no mixing"],
    applications: ["Interior furniture", "Children's furniture and toys", "Kitchen cabinets", "Retail fixtures", "Office furniture"],
    finishes: ["Matte", "Satin", "Semi-Gloss"],
  },
  {
    id: "2k-wb-coatings-for-wood",
    name: "2K WB Coatings for Wood",
    substrate: "wood",
    chemistry: "Water-Based (2K)",
    icon: "🪵",
    description: "Two-component water-based coatings with enhanced resistance for premium eco-friendly wood finishing.",
    fullDescription: "Our 2K Water-Based Coatings for Wood combine the environmental benefits of water-based technology with the performance characteristics of two-component systems. The addition of a crosslinker significantly enhances chemical resistance, scratch resistance, and overall durability compared to 1K water-based alternatives. These coatings are the ideal choice for premium projects requiring both environmental compliance and high-performance finishing, meeting the demands of export markets with strict VOC regulations.",
    features: ["Enhanced chemical resistance vs 1K WB", "Excellent scratch and abrasion resistance", "Low VOC — meets export standards", "Good clarity and depth", "Excellent adhesion to wood", "Suitable for high-end applications"],
    applications: ["Premium export furniture", "Hotel and hospitality furniture", "High-end kitchen cabinetry", "Bathroom vanities", "Commercial interiors"],
    finishes: ["Matte", "Satin", "Semi-Gloss", "Gloss"],
  },

  // ─── METAL (5) ──────────────────────────────────────────────────
  {
    id: "nc-coatings-for-metal",
    name: "NC Coatings for Metal",
    substrate: "metal",
    chemistry: "Nitrocellulose",
    icon: "🛡️",
    description: "Fast-drying nitrocellulose coatings for metal providing good adhesion and decorative finishes.",
    fullDescription: "Our NC (Nitrocellulose) Coatings for Metal are designed for applications requiring fast drying and good decorative appeal on metal substrates. These coatings provide excellent adhesion to properly prepared metal surfaces and deliver attractive finishes for hardware, accessories, and decorative metal items. The fast-drying nature enables high production throughput, while the formulation allows for easy application via spray, dip, or brush methods. Available in a wide range of colors and effects.",
    features: ["Very fast drying time", "Good adhesion to metal substrates", "Wide color range available", "Easy application — spray, dip, or brush", "Good decorative appeal", "Economical solution for metal finishing"],
    applications: ["Hardware and fittings", "Metal accessories", "Decorative metal items", "Costume jewelry", "Small metal components"],
    finishes: ["Matte", "Satin", "Gloss", "Metallic effects"],
    recommendedUse: "High performance one component stoving alkyd amino based clear/colored clear Paints. This product is recommended as a clear in Fan, Automotive, general industrial and OEM applications. For achieving various transparent colors, this clear can be mixed with SBL Dyes Solution.",
    applicationGuidelines: "Hot phosphating/sandblasting for Brass, MS and chromatizing or Etch Primer for Aluminium or GI is required before application. For MS, 3-in-1 solution may be used for pre-treatment but the life of the system will be inferior to the former. Suitable primer should be applied, if required, before application of this product.",
    inCanProperties: [
      { label: "Specific Gravity", value: "0.98 ± 0.03" },
      { label: "Viscosity 30°C sec B4", value: "30 ± 5%" },
      { label: "NVM", value: "37 ± 2" },
    ],
    applicationProperties: [
      { label: "Mixing Ratio (B : H)", value: "4 : 1" },
      { label: "% Thinner Intake", value: "25–30" },
      { label: "Spray Viscosity (Sec)", value: "20 ± 2" },
    ],
    filmProperties: [
      { label: "Adhesion", value: "0/25" },
      { label: "Acetone Double Rub Test (Nos.)", value: "1000" },
      { label: "SST on Direct MS", value: "90 Hours" },
    ],
    delivery: [
      { label: "Colour", value: "Clear" },
      { label: "Packing", value: "1 / 4 / 20 Ltr" },
    ],
  },
  {
    id: "pu-coatings-for-metal",
    name: "PU Coatings for Metal",
    substrate: "metal",
    chemistry: "Polyurethane",
    icon: "🛡️",
    description: "High-performance polyurethane coatings for metal with excellent weather and corrosion resistance.",
    fullDescription: "Our PU (Polyurethane) Coatings for Metal deliver premium performance for demanding metal finishing applications. These two-component coatings provide exceptional weather resistance, gloss retention, and corrosion protection, making them the preferred choice for automotive components, industrial equipment, and outdoor metal structures. The advanced formulation resists UV degradation, chalking, and chemical attack, ensuring long-lasting protection and aesthetic appeal even in harsh environments.",
    features: ["Outstanding weather resistance", "Excellent gloss retention over time", "Superior corrosion protection", "Chemical and solvent resistance", "High flexibility — resists cracking", "Available in all RAL colors"],
    applications: ["Automotive components", "Industrial machinery", "Agricultural equipment", "Consumer appliances", "Outdoor metal structures"],
    finishes: ["Matte", "Satin", "Gloss", "High Gloss", "Textured"],
    recommendedUse: "High performance two component polyurethane based clear/pigmented topcoat for metal substrates. Recommended for automotive OEM, industrial equipment, agricultural machinery, and consumer appliance applications requiring superior weather resistance and gloss retention.",
    applicationGuidelines: "Surface must be clean, dry, and free from oil, grease, and loose particles. Apply over recommended epoxy or PU primer. For best results, apply by spray gun at 3–4 bar pressure. Allow minimum 4 hours between coats at 25°C. Full cure achieved in 7 days at ambient temperature or 30 minutes at 80°C forced drying.",
    inCanProperties: [
      { label: "Specific Gravity", value: "1.15 ± 0.05" },
      { label: "Viscosity 30°C sec B4", value: "45 ± 5%" },
      { label: "NVM", value: "52 ± 2" },
    ],
    applicationProperties: [
      { label: "Mixing Ratio (B : H)", value: "4 : 1 (by volume)" },
      { label: "Pot Life", value: "4 Hours at 25°C" },
      { label: "% Thinner Intake", value: "20–25" },
      { label: "Spray Viscosity (Sec)", value: "22 ± 2" },
    ],
    filmProperties: [
      { label: "Adhesion (Cross-cut)", value: "0/25" },
      { label: "Pencil Hardness", value: "H–2H" },
      { label: "Gloss at 60°", value: "85 ± 5 GU" },
      { label: "Acetone Double Rub Test", value: ">200" },
      { label: "SST (with primer system)", value: "500+ Hours" },
      { label: "QUV Weathering", value: "1000+ Hours" },
    ],
    delivery: [
      { label: "Colour", value: "All RAL / Custom shades" },
      { label: "Packing", value: "1 / 4 / 20 Ltr" },
    ],
  },
  {
    id: "epoxy-anti-corrosion-primers-for-metal",
    name: "Epoxy Anti-Corrosion Primers for Metal",
    substrate: "metal",
    chemistry: "Epoxy",
    icon: "🛡️",
    description: "Two-component epoxy primers providing outstanding corrosion protection for steel and iron substrates.",
    fullDescription: "Our Epoxy Anti-Corrosion Primers for Metal are engineered to provide the ultimate foundation for metal protection systems. These two-component primers deliver exceptional adhesion to steel, iron, and aluminium substrates while creating a robust barrier against moisture, chemicals, and corrosive environments. The formulation incorporates advanced anti-corrosive pigments that actively protect the metal substrate, making these primers essential for industrial equipment, structural steel, and any application where long-term corrosion protection is critical.",
    features: ["Outstanding corrosion protection", "Excellent adhesion to ferrous and non-ferrous metals", "Chemical and solvent resistance", "High build per coat", "Good overcoatability with various topcoats", "Active anti-corrosive pigments"],
    applications: ["Industrial equipment", "Structural steel", "Automotive underbody", "Marine applications", "Pipeline and tank exteriors"],
  },
  {
    id: "hr-coatings-for-metal",
    name: "HR Coatings for Metal",
    substrate: "metal",
    chemistry: "Heat Resistant",
    icon: "🛡️",
    description: "Heat-resistant coatings for metal surfaces exposed to temperatures up to 600°C.",
    fullDescription: "Our HR (Heat Resistant) Coatings for Metal are specially formulated to withstand extreme temperatures while maintaining their protective and decorative properties. These coatings can endure continuous exposure to temperatures up to 600°C, making them essential for exhaust systems, engine components, industrial ovens, and other high-temperature applications. The silicone-based formulation provides excellent thermal stability, oxidation resistance, and color retention even under prolonged heat exposure.",
    features: ["Withstands temperatures up to 600°C", "Excellent thermal stability", "Good oxidation resistance", "Color retention at high temperatures", "Corrosion protection", "Available in multiple colors"],
    applications: ["Exhaust systems and manifolds", "Engine components", "Industrial ovens and furnaces", "Barbecue grills", "Chimney pipes and flues"],
    finishes: ["Matte", "Satin"],
  },
  {
    id: "1k-acrylic-coatings-for-metal",
    name: "1K Acrylic Coatings for Metal",
    substrate: "metal",
    chemistry: "Acrylic (1K)",
    icon: "🛡️",
    description: "Single-component acrylic coatings for metal with excellent adhesion and color stability.",
    fullDescription: "Our 1K (Single-Component) Acrylic Coatings for Metal provide a versatile and user-friendly solution for metal finishing applications. These ready-to-use coatings offer excellent adhesion, weather resistance, and color stability for consumer goods, appliances, and general metal fabrication. The single-component nature simplifies the application process, reduces waste, and eliminates pot-life concerns. With good hardness development and resistance properties, these coatings deliver reliable performance for a wide range of metal finishing needs.",
    features: ["Single component — no mixing required", "Excellent adhesion to metal", "Good weather and UV resistance", "Color stability over time", "Fast drying", "Good hardness and scratch resistance"],
    applications: ["Consumer appliances", "Electrical enclosures", "Metal furniture", "Signage and displays", "General metal fabrication"],
    finishes: ["Matte", "Satin", "Gloss", "Metallic"],
  },

  // ─── GLASS & PLASTIC (3) ────────────────────────────────────────
  {
    id: "pu-coatings-for-glass",
    name: "PU Coatings for Glass",
    substrate: "glass",
    chemistry: "Polyurethane",
    icon: "🪟",
    description: "Polyurethane coatings for glass with excellent adhesion, transparency, and decorative effects.",
    fullDescription: "Our PU (Polyurethane) Coatings for Glass are specially formulated to achieve excellent adhesion on glass substrates — one of the most challenging surfaces to coat. These coatings provide outstanding transparency, allowing the natural beauty of glass to show through while adding color, protection, or decorative effects. The formulation includes specialized adhesion promoters that ensure long-term bonding to glass surfaces without peeling or delamination. Ideal for decorative glassware, lighting fixtures, and architectural glass applications.",
    features: ["Excellent adhesion to glass surfaces", "Outstanding transparency and clarity", "Wide range of decorative effects", "Good chemical resistance", "UV-stable formulations available", "Suitable for both flat and curved glass"],
    applications: ["Decorative glassware", "Lighting fixtures and shades", "Glass bottles and containers", "Architectural glass panels", "Glass furniture tops"],
    finishes: ["Clear", "Tinted", "Frosted effect", "Metallic effect"],
  },
  {
    id: "epoxy-clear-coatings-for-glass",
    name: "Epoxy Clear Coatings for Glass",
    substrate: "glass",
    chemistry: "Epoxy",
    icon: "🪟",
    description: "Crystal-clear epoxy coatings for glass with superior adhesion and chemical resistance.",
    fullDescription: "Our Epoxy Clear Coatings for Glass deliver exceptional optical clarity combined with the robust chemical resistance that epoxy chemistry is known for. These coatings form a tough, transparent protective layer on glass surfaces that resists chemicals, solvents, and mechanical damage. The crystal-clear formulation maintains the visual properties of the glass while adding functional protection. Ideal for laboratory glassware, industrial glass components, and decorative applications where both clarity and chemical resistance are required.",
    features: ["Crystal-clear optical properties", "Superior chemical and solvent resistance", "Excellent adhesion to glass", "High hardness and scratch resistance", "Good thermal stability", "Non-yellowing formulation"],
    applications: ["Laboratory glassware", "Industrial glass components", "Decorative glass art", "Glass tabletops", "Display cases"],
    finishes: ["Clear Gloss", "Clear Satin"],
  },
  {
    id: "pu-coatings-for-abs",
    name: "PU Coatings for ABS",
    substrate: "glass",
    chemistry: "Polyurethane",
    icon: "🪟",
    description: "Polyurethane coatings for ABS and plastics with excellent adhesion without primer.",
    fullDescription: "Our PU (Polyurethane) Coatings for ABS are engineered specifically for plastic substrates, particularly ABS (Acrylonitrile Butadiene Styrene) and similar thermoplastics. These coatings achieve excellent adhesion directly to plastic surfaces without the need for a separate primer coat, simplifying the finishing process and reducing costs. The flexible formulation accommodates the thermal expansion of plastic substrates without cracking, while providing excellent impact resistance and decorative appeal for automotive trim, consumer electronics, and household products.",
    features: ["Direct adhesion to ABS — no primer needed", "Excellent flexibility and impact resistance", "Good chemical resistance", "Wide color and effect range", "Accommodates thermal expansion", "Suitable for multiple plastic types"],
    applications: ["Automotive interior trim", "Consumer electronics housings", "Household appliance panels", "Motorcycle body panels", "Electrical switch plates"],
    finishes: ["Matte", "Satin", "Gloss", "Soft-touch", "Metallic"],
  },
];

export function getProductsBySubstrate(substrate: string): Product[] {
  return products.filter((p) => p.substrate === substrate);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
