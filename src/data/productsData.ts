export interface ProductData {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  range?: string;
  tagline: string;
  description: string;
  features: string[];
  finish?: string;
  warranty?: string;
  packagingSizes?: string[];
  image?: string;
  bgImage?: string;
  stageBg?: string;
  isFeatured?: boolean;
  faqs?: { question: string; answer: string }[];
  pdf?: string;
}

export const PRODUCTS_DATA: ProductData[] = [
  // ==========================================
  // EXTERIOR EMULSION PAINTS (14 PRODUCTS)
  // ==========================================

  // --- LUXURY PRODUCTS (4 ITEMS) ---
  {
    id: "uni-glosss",
    name: "Uni-glosss",
    slug: "uni-glosss",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Luxury Products",
    tagline: "Solar Reflective Multi-Surface Paint System",
    description: "A solar reflective, premium quality multi-surface paint system specially developed to protect walls from the impact of external elements like humidity, rain, pollution, and more. Its unique formulation gives your walls a glossy finish, combined with great flexibility and stability.",
    features: [
      "Unique formulation",
      "High gloss finish",
      "Solar reflective paint system",
      "Fungi and algae resistant",
      "Eco-friendly alternate for enamels",
      "11-year performance warranty",
    ],
    finish: "High Gloss Finish",
    warranty: "11 Years",
    image: "/products/exterior/unigloss.png",
    bgImage: "/products/exterior-bg/unigloss.jpg",
    stageBg: "#e29bab",
    pdf: "/pdf/Uniglosss.pdf",
    faqs: [
      {
        question: "What surfaces can Snowcem Uni-Glosss be applied to?",
        answer: "Uni-Glosss is a multi-surface paint system suitable for concrete/cement rendering, wood, metal, and interior/exterior walls as an eco-friendly alternative to enamels."
      },
      {
        question: "What is the mixing ratio and dilution requirement for Uni-Glosss?",
        answer: "For masonry/walls, mix water 3:1 by volume for the first coat and 4:1 by volume for the second coat. For wood and metal surfaces, mix 10% water by volume. Do not use thinners or universal stainers."
      },
      {
        question: "What surface preparation is required for wood and metal before applying Uni-Glosss?",
        answer: "For wood, clean and smooth the surface, rectify cracks, and apply 1 coat of CW Primer. For metal, sand with 180 emery paper, clean grease/dirt, and apply 1 coat of Snowcem Red Oxide primer."
      },
      {
        question: "What is the coverage and available pack sizes for Uni-Glosss?",
        answer: "Coverage is 140 to 180 sq. ft. per liter per coat (coverage may be higher on metal surfaces). Pack sizes available are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It becomes touch dry in 20 to 25 minutes. The recommended recoating time between coats is 4 to 6 hours."
      },
      {
        question: "How many coats of paint should be applied?",
        answer: "Standard application requires 2 coats over the appropriate primer. However, 3 coats are recommended for deep shades, as well as horizontal surfaces like window tops and ledges."
      },
      {
        question: "Is Uni-Glosss safe and environmentally friendly?",
        answer: "Yes, it qualifies for GRIHA / LEED Green Building criteria. It contains less than 40 g/L (13%) VOCs and is free from heavy metals (lead, mercury, chromium VI, cadmium) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      },
      {
        question: "What is the shelf life and care post-painting?",
        answer: "It has a shelf life of 3 years when stored in airtight containers. Painted surfaces should be cleaned at regular intervals of 6 months for best performance."
      }
    ]
  },
  {
    id: "uni-glosss-18",
    name: "Uni-glosss 18",
    slug: "uni-glosss-18",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Luxury Products",
    tagline: "Ultra-Durable Pure Acrylic Nano-Performance Exterior Emulsion",
    description: "An ultra-durable exterior emulsion developed with pure acrylic latex, giving your walls complete protection from UV radiation, humidity, rain, and pollution, along with a glossy finish. Its unique cross-linking features coupled with nano performance enhance its durability, even in extreme conditions.",
    features: [
      "Silicon enhanced",
      "Anti-carbonation properties",
      "Structural protection",
      "Anti-fungal and anti-algal",
      "18-year warranty",
    ],
    finish: "Ultra Gloss Finish",
    warranty: "18 Years",
    image: "/products/exterior/unigloss-18.png",
    bgImage: "/products/exterior-bg/unigloss-18.jpg",
    stageBg: "#b6dded",
    pdf: "/pdf/Uniglosss-18.pdf",
    faqs: [
      {
        question: "What makes Snowcem Uni-Glosss 18 uniquely durable?",
        answer: "Uni-Glosss 18 combines pure acrylic latex based on nanotechnology with core-shelled modified silicone, offering surface cross-linking, anti-carbonation properties, and aqua repellence for long-lasting performance in severe weather."
      },
      {
        question: "How should Snowcem Uni-Glosss 18 be diluted?",
        answer: "Mix 1 liter of Uni-Glosss 18 with 300 ml of clean potable water by volume (30% dilution) for easy brushability. Do not use thinners, universal stainers, or over-dilute."
      },
      {
        question: "What is the coverage and available pack sizes?",
        answer: "Coverage is 160 to 200 sq. ft. per liter per coat depending on surface porosity. Pack sizes available are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It dries to touch in 20 to 25 minutes. The recoating time between coats is 4 to 6 hours."
      },
      {
        question: "What primer system is required to get the 18-Year Waterproofing Warranty?",
        answer: "To claim the 18-Year Waterproofing Warranty, apply 2 coats of Snowcare Protect Waterproofing Basecoat before applying 2 coats of Uni-Glosss 18. For a standard 18-Year Performance Warranty, apply Snowcem Special CW Primer prior to topcoat application."
      },
      {
        question: "How long should fresh plaster cure before applying Uni-Glosss 18?",
        answer: "New masonry surfaces must cure completely for a minimum of 28 days prior to painting."
      },
      {
        question: "Is Uni-Glosss 18 safe and eco-friendly?",
        answer: "Yes, it meets GRIHA and LEED Green Building criteria. It contains low VOCs (< 40 g/L / 13%) and is free from heavy metals (lead, mercury, chromium VI, cadmium) and toxic chemicals like benzene and formaldehyde."
      },
      {
        question: "How should painted walls be maintained over time?",
        answer: "Clean and wash the painted walls at regular 6-month intervals to preserve optimal finish and protection."
      }
    ]
  },
  {
    id: "uni-glosss-15",
    name: "Uni-glosss 15",
    slug: "uni-glosss-15",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Luxury Products",
    tagline: "Solar Reflective Premium Silicon Multi-Surface Paint System",
    description: "A solar reflective premium multi-surface paint system specially formulated with silicon technology to protect your walls from UV radiation, humidity, rain, and pollution.",
    features: [
      "High gloss finish",
      "Silicon enhanced",
      "Solar reflective",
      "Superior adhesion",
      "Dirt resistant",
      "15-year warranty",
    ],
    finish: "High Gloss Finish",
    warranty: "15 Years",
    image: "/products/exterior/unigloss-15.png",
    bgImage: "/products/exterior-bg/unigloss-15.jpg",
    stageBg: "#e48ead",
    pdf: "/pdf/Uniglosss-15.pdf",
    faqs: [
      {
        question: "What makes Snowcem Uni-Glosss 15 effective for exterior protection?",
        answer: "Uni-Glosss 15 is formulated with silicon technology, special acrylic binders, micronised minerals, and UV-stable pigments to provide a flexible, high-gloss finish that protects surfaces from weather, humidity, algae, fungi, and alkali attack."
      },
      {
        question: "How should Snowcem Uni-Glosss 15 be diluted?",
        answer: "Mix 1 part of Uni-Glosss 15 with 300 ml of clean potable water by volume (30% dilution) for smooth brushability. Do not over-dilute, stretch the paint excessively, or add any thinners or universal stainers."
      },
      {
        question: "What is the coverage area and available pack sizes?",
        answer: "The coverage is 150 to 190 sq. ft. per liter per coat, depending on the porosity and texture of the wall surface. It is available in 1 L, 4 L, 10 L, and 20 L pack sizes."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Uni-Glosss 15 takes 20 to 25 minutes to become touch dry. The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What application steps should be followed?",
        answer: "Apply Snowcare Wall Putty (optional), followed by 1 coat of Snowcem Special CW Primer (4 hours drying time), and complete with 2 coats of Uni-Glosss 15 Exterior Power Paint (4–6 hours drying time between coats)."
      },
      {
        question: "Are additional coats required for specific areas?",
        answer: "Yes, applying 3 coats of Uni-Glosss 15 is recommended for deep shades as well as horizontal surfaces like window tops and ledges to ensure maximum protection."
      },
      {
        question: "How should masonry surfaces be prepared before painting?",
        answer: "New concrete or plaster surfaces must be allowed to cure completely for at least 28 days. Remove loose paint, dust, fungi, or algae using wire brushing and water. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Uni-Glosss 15 eco-friendly and low in VOCs?",
        answer: "Yes, it meets GRIHA and LEED Green Building standards. It contains less than 40 g/L (13%) VOCs and is completely free from lead, mercury, chromium (VI), cadmium, benzene, and formaldehyde."
      },
      {
        question: "What is the shelf life and maintenance routine for this paint?",
        answer: "The paint has a shelf life of 3 years when kept in an airtight container in a cool, dry place. For optimal maintenance, clean and wash the painted surface every 6 months."
      }
    ]
  },
  {
    id: "uni-glosss-11",
    name: "Uni-glosss 11",
    slug: "uni-glosss-11",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Luxury Products",
    tagline: "Premium Weather Protective Gloss Exterior Emulsion",
    description: "A premium exterior emulsion paint designed to protect your walls against a range of environmental conditions like heavy rainfall, high humidity and UV radiation. Enjoy the advantage of high protection in addition to flexibility, and a smooth, glossy finish to your walls.",
    features: [
      "High gloss finish",
      "Silicon enhanced",
      "Solar reflective",
      "Anti-algal and anti-fungal",
      "11-year warranty",
    ],
    finish: "Smooth Glossy Finish",
    warranty: "11 Years",
    image: "/products/exterior/unigloss-11.png",
    bgImage: "/products/exterior-bg/unigloss-11.jpg",
    stageBg: "#f1a69a",
    pdf: "/pdf/Uniglosss-11.pdf",
    faqs: [
      {
        question: "What environmental conditions does Snowcem Uni-Glosss 11 protect against?",
        answer: "Uni-Glosss 11 protects exterior walls against heavy rainfall, high humidity, industrial pollution, and UV radiation while providing high flexibility, alkali resistance, and a smooth, glossy finish."
      },
      {
        question: "What is the recommended mixing ratio and dilution for Uni-Glosss 11?",
        answer: "Mix 1 part of Uni-Glosss 11 with 300 ml of clean potable water by volume (30% dilution) for easy brushability. Do not over-dilute, use thinners, or add universal stainers."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "Coverage is 140 to 180 sq. ft. per liter per coat depending on wall porosity and texture. Available pack sizes are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating interval?",
        answer: "It becomes touch dry in 20 to 25 minutes. The recommended recoating period between coats is 4 to 6 hours."
      },
      {
        question: "What application steps should be followed?",
        answer: "Apply Snowcare Wall Putty (optional), followed by 1 coat of Snowcem Special CW Primer (allow 4 hours drying time), and finish with 2 coats of Uni-Glosss 11 Exterior Power Paint (allow 4–6 hours drying time between coats)."
      },
      {
        question: "Are 3 coats ever required for Uni-Glosss 11?",
        answer: "Yes, 3 coats are recommended for deep shades and horizontal surfaces like window tops and edges for greater protection."
      },
      {
        question: "How should new masonry surfaces be prepared before painting?",
        answer: "Fresh plaster must cure completely for at least 28 days before paint application. Remove loose paint, dust, fungi, or algae with wire brushing and water. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Uni-Glosss 11 eco-friendly and safe for green buildings?",
        answer: "Yes, it qualifies for GRIHA / LEED Green Building criteria. It contains low VOCs (< 40 g/L / 13%) and is free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life and post-painting care?",
        answer: "Uni-Glosss 11 has a shelf life of 3 years when stored in airtight containers in a cool, dry place. Clean and wash the walls at regular intervals of 6 months to maintain optimum performance."
      }
    ]
  },

  // --- PREMIUM EMULSION (4 ITEMS) ---
  {
    id: "pentasia",
    name: "Pentasia",
    slug: "pentasia",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Premium Emulsion",
    tagline: "5 in 1 Premium Emulsion with Silicon",
    description: "Pentasia is a 5-in-1 premium emulsion with added silicon for ultimate weatherproofing, anti-crack protection, and sheen retention.",
    features: ["5 in 1 Protection", "Silicon Enriched", "Crack Bridging"],
    finish: "Rich Sheen",
    warranty: "7 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/pentasia.png",
    bgImage: "/products/exterior-bg/pentasia.jpg",
    stageBg: "#b7e1ee",
  },
  {
    id: "pentasia-universal",
    name: "Pentasia Universal",
    slug: "pentasia-universal",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Premium Emulsion",
    tagline: "Universal Weather Protective Emulsion",
    description: "Pentasia Universal offers rich smooth exterior wall coverage with superior resistance to harsh monsoon moisture and dust.",
    features: ["Universal Adhesion", "Monsoon Shield", "Dust Proof"],
    finish: "Premium Smooth",
    warranty: "5 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/pentasia-universal.png",
    bgImage: "/products/exterior-bg/pentasia-universal.jpg",
    stageBg: "#a79ab1",
  },
  {
    id: "sandtex-matt",
    name: "Sandtex Matt",
    slug: "sandtex-matt",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Premium Emulsion",
    tagline: "Superior Textured Finish",
    description: "Sandtex Matt is the benchmark high-durability exterior paint providing superior textured finish and extreme weather defense.",
    features: ["Superior Textured Finish", "Heritage Proof", "Extreme Durability"],
    finish: "Rich Textured Matt",
    warranty: "10 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/sandtex-matt.png",
    bgImage: "/products/exterior-bg/sandtex-matt.jpg",
    stageBg: "#e3d4e5",
  },
  {
    id: "sandtex-matt-floor-coat",
    name: "Sandtex Matt Floor Coat",
    slug: "sandtex-matt-floor-coat",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Premium Emulsion",
    tagline: "Heavy Duty Exterior Floor Coating",
    description: "Sandtex Matt Floor Coat protects exterior driveways, walkways, roof terraces, and floor tiles with anti-abrasive tough finish.",
    features: ["Anti-Abrasive Floor Shield", "Driveway Proof", "Tire Mark Resistance"],
    finish: "Tough Satin Floor",
    warranty: "5 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/sandtex-matt.png",
    bgImage: "/products/exterior-bg/sandtex-matt.jpg",
    stageBg: "#e3d4e5",
  },

  // --- MIDRANGE EMULSIONS (2 ITEMS) ---
  {
    id: "snowcryl",
    name: "Snowcryl",
    slug: "snowcryl",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Midrange Emulsions",
    tagline: "Super Acrylic Weather-proof Emulsion",
    description: "Snowcryl is a 100% acrylic exterior paint providing long-lasting weather, UV, and shade fade protection.",
    features: ["100% Super Acrylic", "Added Silicon", "Fade Proof Colors"],
    finish: "Smooth Matt",
    warranty: "5 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/snowcryl-low.png",
    bgImage: "/products/exterior-bg/snowcryl-low.jpg",
    stageBg: "#f9d4c5",
  },
  {
    id: "snowcryl-shine",
    name: "Snowcryl Shine",
    slug: "snowcryl-shine",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Midrange Emulsions",
    tagline: "High Gloss Weatherproof Acrylic Emulsion",
    description: "Snowcryl Shine combines high-sheen gloss aesthetic with acrylic weatherproof wall protection.",
    features: ["High Sheen Shine", "Weather Guard", "Washable"],
    finish: "Gloss Sheen",
    warranty: "5 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/snowcryl-shine.png",
    bgImage: "/products/exterior-bg/snowcryl-shine.jpg",
    stageBg: "#f9d4c5",
  },

  // --- ECONOMY RANGE EMULSION (4 ITEMS) ---
  {
    id: "snowcem-plus-exterior",
    name: "Snowcem Plus",
    slug: "snowcem-plus-exterior",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Economy Range Emulsion",
    tagline: "Smart Exterior Emulsion Shield",
    description: "Snowcem Plus exterior emulsion provides durable weather protection, high wall coverage, and economical performance.",
    features: ["Smart Acrylic Formula", "Weather Resistance", "High Coverage"],
    finish: "Smooth Matt",
    warranty: "3 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/snowcem-plus.png",
    bgImage: "/products/exterior-bg/snowcem-plus.jpg",
    stageBg: "#c4ae9f",
  },
  {
    id: "snowcem-plus-shine",
    name: "Snowcem Plus Shine",
    slug: "snowcem-plus-shine",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Economy Range Emulsion",
    tagline: "Smart Acrylic Emulsion with Shine",
    description: "Snowcem Plus Shine offers smart acrylic exterior emulsion protection with added sheen and economical coverage.",
    features: ["Smart Acrylic Formula", "Added Sheen", "Economical Protection"],
    finish: "Soft Sheen",
    warranty: "3 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/snowcem-plus-shine.png",
    bgImage: "/products/exterior-bg/snowcem-plus-shine.jpg",
    stageBg: "#d0baa8",
  },
  {
    id: "outweather",
    name: "Outweather",
    slug: "outweather",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Economy Range Emulsion",
    tagline: "Acrylic Emulsion Paint",
    description: "Outweather provides reliable weather protection and clean color finish for exterior residential walls.",
    features: ["Reliable Weather Protection", "Clean Color Finish", "Easy Application"],
    finish: "Matt",
    warranty: "3 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/outweather-exterior.png",
    bgImage: "/products/exterior-bg/outweather-exterior.jpg",
    stageBg: "#f1aa99",
  },
  {
    id: "trump",
    name: "Trump",
    slug: "trump",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Economy Range Emulsion",
    tagline: "High Coverage Exterior Emulsion",
    description: "Trump exterior emulsion delivers maximum wall coverage and high economy exterior weather resistance.",
    features: ["High Square-Foot Coverage", "Economical Wall Shield", "Good Adhesion"],
    finish: "Smooth Matt",
    warranty: "3 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/trump.png",
    bgImage: "/products/exterior-bg/trump.jpg",
    stageBg: "#d3e6c8",
  },

  // ==========================================
  // INTERIOR EMULSION PAINTS (7 PRODUCTS)
  // ==========================================

  // --- LUXURY PRODUCTS (3 ITEMS) ---
  {
    id: "zenita",
    name: "Zenita",
    slug: "zenita",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Luxury Products",
    tagline: "Ultimate Luxury Interior Emulsion",
    description: "Zenita is an ultra-luxury interior emulsion providing unparalleled sheen retention, washability, and radiant color richness for interior walls.",
    features: ["Ultimate Sheen", "High Washability", "Rich Radiant Colors"],
    finish: "Luxury Sheen",
    warranty: "8 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/interior/zenita.png",
    bgImage: "/products/interior-bg/zenita.png",
    stageBg: "#f4dce3",
  },
  {
    id: "zenita-velvet-finish",
    name: "Zenita Velvet Finish",
    slug: "zenita-velvet-finish",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Luxury Products",
    tagline: "Smooth as Velvet Ultra Luxury Finish",
    description: "Zenita Velvet Finish is an ultra-luxurious interior wall paint that gives your home rich velvet elegance, stain resistance, and smooth touch.",
    features: ["Velvet Soft Touch", "Stain Resistance Guard", "Low VOC & Odorless"],
    finish: "Velvet Soft Sheen",
    warranty: "8 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/interior/zenita-velvet-finish.png",
    bgImage: "/products/interior-bg/zenita-velvet-finish.png",
    stageBg: "#d19ec5",
  },
  {
    id: "celeste",
    name: "Celeste",
    slug: "celeste",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Luxury Products",
    tagline: "Rich Finish Interior Acrylic Emulsion",
    description: "An acrylic emulsion paint with a rich finish that keeps the interior walls of your home in pristine condition for years. With the freedom to choose from over 1500 shades, the use of high-quality ingredients and binders further make Celeste one of the finest interior emulsion paints for your home.",
    features: [
      "Rich finish with durable appeal",
      "Strong adhesion",
      "Long-lasting sheen",
      "Algae and fungi resistant",
      "Non yellowing",
      "Free from heavy metals like lead and chromium",
      "6-year performance warranty",
    ],
    finish: "Rich Silky Sheen",
    warranty: "6 Years",
    image: "/products/interior/celeste.png",
    bgImage: "/products/interior-bg/celeste.png",
    stageBg: "#efe0ec",
    pdf: "/pdf/Celeste.pdf",
    faqs: [
      {
        question: "How should Snowcem Celeste Interior Emulsion be diluted before application?",
        answer: "Dilute 1 liter of paint with 400 ml of potable water. Do not over-dilute or add any external stainers other than machine colorants."
      },
      {
        question: "What is the coverage area of Snowcem Celeste?",
        answer: "It provides a coverage of approximately 200 to 220 sq. ft. per liter per coat on smooth, non-porous surfaces."
      },
      {
        question: "What pack sizes are available for Celeste paint?",
        answer: "It is available in container sizes of 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "How fast does Celeste paint dry, and when can I apply a second coat?",
        answer: "It takes 20 to 30 minutes to become touch dry. The recommended recoating time between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Apply Snowcare Wall Putty / Acrylic Putty, follow with 1 coat of Special CW Primer / Universal Primer (dry for 4 hours), and finish with 2 coats of Celeste Interior Emulsion (4–6 hours drying time between coats)."
      },
      {
        question: "Are 3 coats ever necessary?",
        answer: "Yes, 3 coats are recommended for deep shades and horizontal surfaces like window tops and edges for better durability and coverage."
      },
      {
        question: "How long should new masonry surfaces cure before painting?",
        answer: "Freshly plastered walls must be allowed to cure completely for a minimum of 28 days before painting."
      },
      {
        question: "How should surface cracks, holes, and dents be repaired?",
        answer: "Cracks up to 3mm, holes, and dents should be filled using Snowcare Wall Putty or a mix of White Cement and fine sand in a 1:3 ratio."
      },
      {
        question: "Is Celeste paint eco-friendly and safe for home interiors?",
        answer: "Yes, it meets GRIHA and LEED Green Building standards. It has low VOCs (< 40 g/L / 13%) and contains no harmful chemicals such as lead, mercury, chromium (VI), cadmium, formaldehyde, or benzene."
      },
      {
        question: "What is the shelf life of Snowcem Celeste?",
        answer: "The paint has a shelf life of 3 years when stored in an airtight container in a cool, dry place."
      },
      {
        question: "How should painted walls be maintained after application?",
        answer: "For optimal performance and long-lasting appearance, wash and clean the walls at regular intervals of 6 months."
      }
    ]
  },

  // --- PREMIUM EMULSION (2 ITEMS) ---
  {
    id: "sentino",
    name: "Sentino",
    slug: "sentino",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Premium Emulsion",
    tagline: "Premium Acrylic Finish",
    description: "Sentino Premium Acrylic Finish delivers long-lasting smooth walls with superior opacity and anti-bacterial protection.",
    features: ["Premium Acrylic Polymer", "High Opacity Coverage", "Anti-Bacterial"],
    finish: "Smooth Matt",
    warranty: "5 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/interior/sentino.png",
    bgImage: "/products/interior-bg/sentino.png",
    stageBg: "#fad5c3",
  },
  {
    id: "sentino-easy-2-wash",
    name: "Sentino Easy2Wash",
    slug: "sentino-easy-2-wash",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Premium Emulsion",
    tagline: "Paint with Confidence, Clean with Ease",
    description: "Sentino Easy2Wash is a premium washable interior emulsion allowing easy removal of household stains without color fading.",
    features: ["Easy Stain Washability", "Color Retention", "Smooth Matt Sheen"],
    finish: "Washable Satin",
    warranty: "5 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/interior/sentino-easy2wash.png",
    bgImage: "/products/interior-bg/sentino-easy2wash.png",
    stageBg: "#9ca7cf",
  },

  // --- MIDRANGE EMULSIONS (1 ITEM) ---
  {
    id: "snowpearl",
    name: "Snowpearl",
    slug: "snowpearl",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Midrange Emulsions",
    tagline: "Super Rich Paint",
    description: "Snowpearl provides rich vibrant interior wall shades, high square-foot coverage, and durable smooth finish.",
    features: ["Super Rich Shade Vibrancy", "High Square-Foot Coverage", "Smooth Wall Finish"],
    finish: "Rich Smooth Matt",
    warranty: "4 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/interior/snowpearl.png",
    bgImage: "/products/interior-bg/snowpearl.png",
    stageBg: "#c7e5c2",
  },

  // --- ECONOMY RANGE EMULSION (1 ITEM) ---
  {
    id: "snowcoat",
    name: "Snowcoat",
    slug: "snowcoat",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Economy Range Emulsion",
    tagline: "Acrylic Emulsion Paint",
    description: "Snowcoat is a highly economical interior acrylic emulsion providing clean bright walls and excellent value.",
    features: ["Economical Wall Finish", "Good Adhesion & Flow", "Bright Color Retention"],
    finish: "Smooth Matt",
    warranty: "3 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/interior/snowcoat.png",
    bgImage: "/products/interior-bg/snowcoat.png",
    stageBg: "#97d5cb",
  },

  // ==========================================
  // WATERPROOFING PAINTS (4 PRODUCTS)
  // ==========================================
  {
    id: "snowcare-damp-proof",
    name: "Snowcare Damp Proof",
    slug: "snowcare-damp-proof",
    categorySlug: "waterproofing-paints",
    categoryName: "Waterproofing Paints",
    tagline: "High-Performance Roof & Wall Elastomeric Damp Proofing",
    description: "Snowcare Damp Proof is an advanced elastomeric liquid waterproofing membrane engineered for roofs, terraces, and exterior walls to prevent water ingress and dampness.",
    features: ["Elastomeric Membrane", "Anti-Dampness Defense", "Heat Reflective Shield"],
    finish: "Protective Elastomeric",
    warranty: "8 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/waterproof/snowcare-damp-proof.png",
    bgImage: "/products/waterproof-bg/snowcare-damp-proof.png",
    stageBg: "#9bd6ed",
  },
  {
    id: "snowcare-protect",
    name: "Snowcare Protect",
    slug: "snowcare-protect",
    categorySlug: "waterproofing-paints",
    categoryName: "Waterproofing Paints",
    tagline: "Advanced Water Repellent Protective Primer & Sealer",
    description: "Snowcare Protect penetrates deep into cementitious substrates to block moisture ingress, prevent dampness, and protect exterior walls from saltpeter efflorescence.",
    features: ["Deep Substrate Penetration", "Efflorescence Shield", "Water Repellent Barrier"],
    finish: "Clear Protective Coating",
    warranty: "5 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/waterproof/snowcare-protect.png",
    bgImage: "/products/waterproof-bg/snowcare-protect.png",
    stageBg: "#a2a5bf",
  },
  {
    id: "snowcare-damp-protect-dual",
    name: "Snowcare Damp Protect Dual",
    slug: "snowcare-damp-protect-dual",
    categorySlug: "waterproofing-paints",
    categoryName: "Waterproofing Paints",
    tagline: "Dual-Protection Waterproofing & Damp Proofing Membrane",
    description: "Snowcare Damp Protect Dual combines liquid elastomeric waterproofing with deep substrate sealing to shield walls against extreme hydrostatic water pressure.",
    features: ["Dual Waterproofing Action", "Extreme Pressure Shield", "Crack Bridging Tech"],
    finish: "Heavy Duty Membrane",
    warranty: "10 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/waterproof/snowcare-damp-protect-dual.png",
    bgImage: "/products/waterproof-bg/snowcare-damp-protect-dual.png",
    stageBg: "#9fc5e2",
  },
  {
    id: "terrace-seal-chill",
    name: "Terrace Seal & Chill",
    slug: "terrace-seal-chill",
    categorySlug: "waterproofing-paints",
    categoryName: "Waterproofing Paints",
    tagline: "Solar Reflective Heat-Reducing Terrace Waterproof Coating",
    description: "Terrace Seal & Chill provides high solar reflectance index (SRI) heat insulation and seamless waterproofing shield for exposed roof terraces.",
    features: ["SRI Solar Heat Reduction", "Terrace Waterproofing", "Algae & Moss Defense"],
    finish: "Reflective Cool White",
    warranty: "8 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/waterproof/snowcare-terracesealandchill.png",
    bgImage: "/products/waterproof-bg/snowcare-terracesealandchill.png",
    stageBg: "#a5d2d6",
  },

  // ==========================================
  // PRIMERS (6 PRODUCTS)
  // ==========================================
  {
    id: "snowcem-ext-int-primer",
    name: "Snowcem Ext-Int Primer",
    slug: "snowcem-ext-int-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    tagline: "Dual-Action Exterior & Interior Wall Primer",
    description: "Snowcem Exterior-Interior Wall Primer offers versatile application for both indoor and outdoor plastered surfaces, providing high whiteness and opacity.",
    features: ["Dual Surface Versatility", "High Opacity Whiteness", "Moisture Resistance"],
    finish: "Smooth White Matt",
    warranty: "Standard",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/primers/snowcem-ext-int-primer.png",
    bgImage: "/products/primers-bg/snowcem-ext-int-primer.png",
    stageBg: "#a1a5b7",
  },
  {
    id: "special-cw-primer",
    name: "Special (CW) Primer",
    slug: "special-cw-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    tagline: "Special CW Primer for Exterior Masonry Walls",
    description: "Special (CW) Primer is a specially formulated exterior wall primer designed to seal porous cement surfaces and provide exceptional intercoat bonding for exterior emulsions.",
    features: ["Superior Adhesion", "Alkali Resistant", "Deep Pore Sealer"],
    finish: "Matt Sealer",
    warranty: "Standard",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/primers/snowcem-primer-cw.png",
    bgImage: "/products/primers-bg/snowcem-primer-cw.png",
    stageBg: "#b8cca1",
  },
  {
    id: "universal-primer",
    name: "Universal Primer",
    slug: "universal-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    tagline: "All-Purpose Substrate Sealing Primer",
    description: "Universal Primer provides multipurpose priming defense for drywall, concrete, wood, and previously painted surfaces with excellent opacity.",
    features: ["All-Purpose Multi-Substrate", "Quick Drying", "High Coverage Base"],
    finish: "Matt",
    warranty: "Standard",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/primers/universal-primer.png",
    bgImage: "/products/primers-bg/universal-primer.png",
    stageBg: "#e3ac9e",
  },
  {
    id: "snowpearl-primer",
    name: "Snowpearl Primer",
    slug: "snowpearl-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    tagline: "Superior Interior Wall Primer",
    description: "Snowpearl Interior Primer creates a glass-smooth base on indoor walls, preventing topcoat absorption and enhancing paint sheen.",
    features: ["High Substrate Sealing", "Smooth Topcoat Anchor", "Anti-Fungal Protection"],
    finish: "Smooth Matt Sealer",
    warranty: "Standard",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/primers/interior-primer.png",
    bgImage: "/products/primers-bg/interior-primer.png",
    stageBg: "#d09ec2",
  },
  {
    id: "snowcare-sealer-primer",
    name: "Snowcare Sealer & Primer",
    slug: "snowcare-sealer-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    tagline: "Advanced Substrate Sealer & Bonding Primer",
    description: "Snowcare Sealer & Primer penetrates deep into fresh or chalking masonry walls, binding loose particles and sealing surface alkalinity.",
    features: ["Deep Penetrating Sealer", "Anti-Alkalinity Guard", "High Surface Binding"],
    finish: "Clear Sealing Base",
    warranty: "Standard",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/primers/snowcem-sealerandprimer.png",
    bgImage: "/products/primers-bg/snowcem-sealerandprimer.png",
    stageBg: "#af8fcf",
  },
  {
    id: "snowcem-plus-duo",
    name: "Snowcem Plus Duo",
    slug: "snowcem-plus-duo",
    categorySlug: "primers",
    categoryName: "Primers",
    tagline: "2-in-1 Primer & Topcoat Dual Formula",
    description: "Snowcem Plus Duo functions as a high-durability primer and finish coat in one formula, saving labor time and ensuring long-lasting exterior coverage.",
    features: ["2-in-1 Primer + Topcoat", "Time & Labor Saver", "Weather Resistant Shield"],
    finish: "Smooth Matt Sheen",
    warranty: "3 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/primers/snowcem-plus-duo.png",
    bgImage: "/products/primers-bg/snowcem-plus-duo.png",
    stageBg: "#9ce1d4",
  },

  // ==========================================
  // CEMENT PAINTS (3 PRODUCTS)
  // ==========================================
  {
    id: "snowcem-plus-cement-paint",
    name: "Snowcem Plus Cement Paint",
    slug: "snowcem-plus-cement-paint",
    range: "Cement Paints",
    categorySlug: "cement-paints",
    categoryName: "Cement Paints",
    tagline: "India's No. 1 Premium Waterproof Cement Paint",
    description: "Snowcem Plus Cement Paint is the original premium waterproof cement paint formulated with extra cementitious polymers for durable exterior walls.",
    features: ["Extra Polymer Strength", "Eco-Friendly Non-Toxic", "High Coverage"],
    finish: "Durable Matt",
    warranty: "3 Years",
    packagingSizes: ["5kg", "25kg"],
    image: "/products/cement-paints/snowcem-plus.png",
    bgImage: "/products/cement-paints-bg/snowcem-plus.png",
    stageBg: "#97a7c3",
  },
  {
    id: "cemcolour",
    name: "Cemcolour",
    slug: "cemcolour",
    range: "Wall Coating",
    categorySlug: "cement-paints",
    categoryName: "Cement Paints",
    tagline: "Decorative Color Cementitious Wall Coating",
    description: "Cemcolour delivers economical, durable cementitious color coatings with superior weather protection and chalk resistance.",
    features: ["Vibrant Cement Colors", "Weather Resistant", "Chalking Defense"],
    finish: "Matt Cement Finish",
    warranty: "3 Years",
    packagingSizes: ["5kg", "25kg"],
    image: "/products/cement-paints/cemcolour.png",
    bgImage: "/products/cement-paints-bg/cemcolour.png",
    stageBg: "#e9a3b3",
  },
  {
    id: "permacem",
    name: "Permacem",
    slug: "permacem",
    range: "Cement Paints",
    categorySlug: "cement-paints",
    categoryName: "Cement Paints",
    tagline: "Heavy-Duty Weatherproof Cement Paint",
    description: "Permacem is an ultra-durable cement-based paint engineered for extreme weather resistance, masonry protection, and long-lasting color retention.",
    features: ["Heavy-Duty Polymer Bond", "Extreme Weather Proof", "Non-Fading Shades"],
    finish: "Rough Tough Matt",
    warranty: "5 Years",
    packagingSizes: ["5kg", "25kg"],
    image: "/products/cement-paints/permacem.png",
    bgImage: "/products/cement-paints-bg/permacem.png",
    stageBg: "#f4c9b3",
  },

  // ==========================================
  // PUTTY (2 PRODUCTS)
  // ==========================================
  {
    id: "wall-putty",
    name: "Wall Putty",
    slug: "wall-putty",
    range: "Wall Putty",
    categorySlug: "putty",
    categoryName: "Putty",
    tagline: "White Portland Cement-Based Interior & Exterior Wall Putty",
    description: "A combination of white Portland cement, natural minerals, special additives, and polymers, Snowcare Wall Putty is developed to add strength, durability, and waterproof your interior and exterior walls for a longer life.",
    features: [
      "Adds strength to the surface",
      "Water resistant",
      "Increases durability of the surface",
      "Provides smooth and uniform finish",
      "Abrasion resistant",
      "Prevents algae and fungi growth",
    ],
    finish: "Smooth White Uniform Finish",
    warranty: "Standard",
    image: "/products/putty/wallputty.png",
    bgImage: "/products/putty-bg/wallputty.png",
    stageBg: "#fbefa6",
    pdf: "/pdf/Wall-Putty.pdf",
    faqs: [
      {
        question: "What is Snowcare Wall Putty and where can it be applied?",
        answer: "Snowcare Wall Putty is a white Portland cement-based powder formulated with natural minerals, polymers, and special additives. It is suitable for both interior and exterior wall surfaces to hide minor imperfections, fill pinholes, and prevent hairline cracks."
      },
      {
        question: "What is the mixing ratio and application pot life for Snowcare Wall Putty?",
        answer: "Mix 1 kg of Snowcare Wall Putty with 400 ml of clean potable water (40% dilution by volume). Let the mix stand for 10 to 15 minutes before applying. Do not over-dilute. Once mixed with water, the paste must be used within a pot life of 1 hour."
      },
      {
        question: "What is the coverage and what pack sizes are available?",
        answer: "When mixed to the proper consistency, it covers approximately 10 to 12 sq. ft. per kg for up to 1.5 mm thickness in 2 coats. Available pack sizes are 1 kg, 5 kg, 20 kg poly bags, and 40 kg sacks for projects."
      },
      {
        question: "Does Snowcare Wall Putty require water curing after application?",
        answer: "No, Snowcare Wall Putty does not require curing with water after application."
      },
      {
        question: "What is the drying time and recoating interval?",
        answer: "It becomes touch dry in 4 hours. The recommended recoating time between coats is 6 to 8 hours."
      },
      {
        question: "What is the complete step-by-step application process?",
        answer: "Step 1: Sand the plaster surface with 180 emery paper and wipe clean.\nStep 2: Pre-wet the surface with water before applying the 1st coat.\nStep 3: Apply the 1st coat using a trowel or putty knife and let it dry for 6–8 hours.\nStep 4: Apply the 2nd coat and allow it to dry for 6–8 hours.\nStep 5: Lightly sand the dried surface with 320 emery paper, wipe off dust, and apply 1 coat of primer followed by 2–3 coats of emulsion paint."
      },
      {
        question: "How long should fresh masonry surfaces cure before applying putty?",
        answer: "New plastered walls must cure completely for a minimum of 28 days before applying wall putty."
      },
      {
        question: "Is Snowcare Wall Putty eco-friendly and VOC-free?",
        answer: "Yes, Snowcare Wall Putty contains ZERO VOCs. It is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },
  {
    id: "acrylic-putty",
    name: "Acrylic Putty",
    slug: "acrylic-putty",
    range: "Acrylic Putty",
    categorySlug: "putty",
    categoryName: "Putty",
    tagline: "Ready-to-Use Interior Acrylic Finishing Plaster",
    description: "A state-of-the-art ready-to-use acrylic finishing plaster for interior walls. A special binder gives our Acrylic Wall Putty strong adhesive properties, eliminating the use of other binding products.",
    features: [
      "Easy to apply",
      "Smooth finish",
      "High adhesive strength",
      "Prevents cracking",
    ],
    finish: "Silky Smooth Acrylic Finish",
    warranty: "Standard",
    image: "/products/putty/acrylicputty.png",
    bgImage: "/products/putty-bg/acrylicputty.png",
    stageBg: "#e3ac9e",
    pdf: "/pdf/Acrylic-Putty.pdf",
    faqs: [
      {
        question: "What is Snowcem Acrylic Wall Putty and where is it used?",
        answer: "Snowcem Acrylic Wall Putty is a ready-to-use acrylic finishing plaster in paste form formulated with ultrafine minerals, biocides, and alkali-resistant acrylic polymers for interior walls. It provides superior whiteness, smoothness, and flexibility to prevent wall cracking."
      },
      {
        question: "Does Snowcem Acrylic Wall Putty require dilution with water?",
        answer: "No, it comes in a ready-to-use paste form with ideal workability and does not require dilution with water. However, if thinning is required for application, a small amount of clean water can be added."
      },
      {
        question: "Is a primer necessary before or after applying Acrylic Wall Putty?",
        answer: "Thanks to its high adhesive strength, it eliminates the need for primers, neeru, or plaster of Paris underneath. However, applying 1 coat of primer over the putty before topcoat emulsion application is recommended for optimal paint finish and life."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "When mixed to the proper consistency, it covers approximately 20 to 25 sq. ft. per kg for up to 1.5 mm thickness in 2 coats. It is available in 1 kg, 5 kg, and 20 kg plastic containers, as well as 5 kg and 20 kg poly bags."
      },
      {
        question: "What is the drying time and recoating interval?",
        answer: "It becomes touch dry in 4 hours under normal conditions. The recommended recoating time between coats is 6 to 8 hours."
      },
      {
        question: "What is the complete step-by-step application procedure?",
        answer: "Step 1: Sand the plaster surface with 180 emery paper and wipe clean.\nStep 2: Apply 1 coat of Snowcem Interior Primer.\nStep 3: Apply the 1st coat of Acrylic Wall Putty using a trowel or putty knife and let it dry for 6–8 hours.\nStep 4: Apply the 2nd coat of Acrylic Wall Putty and let it dry for 6–8 hours.\nStep 5: Lightly sand with 320 emery paper, clean the dust, and apply 1 coat of primer followed by 2–3 coats of topcoat emulsion paint."
      },
      {
        question: "How long should new plaster cure before applying Acrylic Wall Putty?",
        answer: "New masonry surfaces must be allowed to cure completely for a minimum of 28 days prior to application."
      },
      {
        question: "Is Snowcem Acrylic Wall Putty eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA / LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is free from toxic heavy metals (lead, chromium VI, cadmium, mercury) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      }
    ]
  },

  // ==========================================
  // SNOWCARE RANGE (3 PRODUCTS)
  // ==========================================
  {
    id: "biowash",
    name: "Biowash",
    slug: "biowash",
    range: "Snowcare Range",
    categorySlug: "snowcare-range",
    categoryName: "Snowcare Range",
    tagline: "Anti-Algae & Anti-Fungal Pre-Treatment Cleansing Solution",
    description: "A water-thinnable solution developed to treat exterior walls and surfaces. With fungi and algae prevention properties, Snowcem Biowash is used as a pre-treatment wash for exterior walls.",
    features: [
      "Easy application",
      "Fast drying",
      "Fungi and algae resistant",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Pre-Treatment Liquid Solution",
    warranty: "Standard",
    image: "/products/snowcare-range/biowash.png",
    bgImage: "/products/snowcare-range-bg/biowash.png",
    stageBg: "#b7b9da",
    pdf: "/pdf/Snowcem-Biowash.pdf",
    faqs: [
      {
        question: "What is Snowcem Bio-Wash and what is its main purpose?",
        answer: "Snowcem Bio-Wash is a clear, water-thinnable pre-treatment liquid solution formulated with anti-algal and anti-fungal agents to prevent fungal and algal growth on exterior wall surfaces prior to priming and painting."
      },
      {
        question: "What is the recommended dilution ratio for Snowcem Bio-Wash?",
        answer: "Dilute 1 liter of Snowcem Bio-Wash with 4 liters of clean potable water (1:4 ratio) and stir well. Do not over-dilute."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "It provides a coverage of approximately 900 to 950 sq. ft. per liter per coat on smooth, non-porous surfaces. It is supplied in 5 L and 30 L jerry cans with a genuine Snowcem Paints hologram."
      },
      {
        question: "How is Snowcem Bio-Wash applied, and how long does it take to dry?",
        answer: "Apply preferably by brush (or spray gun). It becomes touch dry in approx. 1 hour. You must wait 24 hours after the treatment before applying primer and emulsion coats."
      },
      {
        question: "What is the complete application sequence using Bio-Wash?",
        answer: "Step 1: Sand the surface using 180 sand paper and wipe clean.\nStep 2: Apply diluted Snowcem Bio-Wash wash (brush or spray) and let it stand for 24 hours.\nStep 3: Apply 1 coat of exterior primer followed by 2 to 3 coats of topcoat exterior emulsion."
      },
      {
        question: "How should masonry surfaces be prepared before applying Bio-Wash?",
        answer: "New plastered walls must be allowed to cure completely for a minimum of 28 days. Ensure the surface is free of dust, grease, oil, and loose materials using a stiff wire brush or scraper."
      },
      {
        question: "Is Snowcem Bio-Wash safe and eco-friendly?",
        answer: "Yes, it meets GRIHA / LEED Green Building parameters. It contains low VOCs (< 40 g/L / 13%) and is free from toxic heavy metals (lead, chromium VI, cadmium, mercury) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      },
      {
        question: "What is the shelf life and proper storage condition for Bio-Wash?",
        answer: "It has a shelf life of 3 years from the date of manufacture when kept in its original tightly closed container in a cool, dry place away from direct sunlight and excessive heat."
      }
    ]
  },
  {
    id: "hardcrete",
    name: "Hardcrete",
    slug: "hardcrete",
    range: "Snowcare Range",
    categorySlug: "snowcare-range",
    categoryName: "Snowcare Range",
    tagline: "Concrete Hardener & Integral Waterproofing Liquid",
    description: "With the dual advantage of hardening and waterproofing, Hardcrete also increases the plasticity of concrete to provide increased strength to the surfaces.",
    features: [
      "Waterproofing and hardening properties",
      "Increases strength",
      "Accelerated setting time for cement",
      "Increases plasticity",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Liquid Concrete Hardener & Waterproofing Admixture",
    warranty: "Standard",
    image: "/products/snowcare-range/hardcrete.png",
    bgImage: "/products/snowcare-range-bg/hardcrete.png",
    stageBg: "#b7b9da",
    pdf: "/pdf/Hardcrete.pdf",
    faqs: [
      {
        question: "What is Snowcem Hardcrete and what are its key applications?",
        answer: "Hardcrete is a liquid concrete hardener and waterproofing admixture designed to increase crushing strength, densify surfaces, and make floors dustless and chemical-resistant. It is used in mass concrete, cement renderings, floor toppings, and for proofing pits and basements against water head pressure."
      },
      {
        question: "What is the recommended dosing/mixing ratio for Hardcrete?",
        answer: "The standard proportion is 4 liters of Hardcrete per 100 kg (2 bags) of cement.\n• Mass Concrete: Mix 4 L of Hardcrete diluted with 4 L of water per 100 kg cement.\n• Cement Renderings: Dilute 4 L of Hardcrete with 5 L of water for dry sand, or 4 L of water for damp sand.\n• Floor Toppings: Gauge 4 L of Hardcrete per 100 kg cement (roughly 1 part Hardcrete to 4 parts water)."
      },
      {
        question: "Can Hardcrete be used for rapid setting or quick leak plugging?",
        answer: "Yes, mixing undiluted Hardcrete directly with neat cement produces a hard set within 2 to 3 minutes for fast-setting requirements. Mortar mixed with equal parts Hardcrete and water sets in approximately 10 minutes."
      },
      {
        question: "Are there any specific restrictions or cement types where Hardcrete should NOT be used?",
        answer: "Hardcrete is not suitable for use with aluminous cement, blast furnace cement, or sulphate-resisting Portland cement. It is also not recommended in reinforced concrete constructions where iron bars/rods are embedded."
      },
      {
        question: "How should interior rendering be done for basement and pit waterproofing?",
        answer: "A 3-coat application totaling at least 19 mm (3/4\") thickness using a 1:2 cement-to-sand mix is advised to prevent shrinkage crazing. Internal corners must be formed with a wide chamfered edge at least 1 foot (0.31 m) from corners. A bonding slurry (1 part Hardcrete to 2 parts water mixed with cement) should be applied prior to rendering."
      },
      {
        question: "What container sizes are available for Hardcrete?",
        answer: "It is supplied in 5 L and 30 L HDPE jerry cans equipped with an official Snowcem Paints hologram for authenticity."
      },
      {
        question: "Is Hardcrete eco-friendly and safe for green construction?",
        answer: "Yes, it satisfies GRIHA / LEED Green Building criteria. It has low VOC levels (< 40 g/L / 13%) and contains no lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, or phenolic compounds."
      }
    ]
  },
  {
    id: "cemprover",
    name: "Cemprover",
    slug: "cemprover",
    range: "Snowcare Range",
    categorySlug: "snowcare-range",
    categoryName: "Snowcare Range",
    tagline: "Cement Primer Liquid & Adhesion Promoter",
    description: "A cement primer liquid developed specifically for application with cement paints to improve adhesion of the paints on difficult walls and surfaces.",
    features: [
      "Improves adhesion",
      "Improves water resistance",
      "Non-flammable",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Liquid Cement Primer & Bonding Agent",
    warranty: "Standard",
    image: "/products/snowcare-range/cemprover.png",
    bgImage: "/products/snowcare-range-bg/cemprover.png",
    stageBg: "#b7b9da",
    pdf: "/pdf/Cemprover.pdf",
    faqs: [
      {
        question: "What is Snowcem Cemprover and when is it required?",
        answer: "Cemprover is a liquid cement primer formulated for use before applying cement paints (such as Snowcem Plus, Cemcolour, and Super Snowcem). It improves adhesion on difficult wall surfaces, provides a key for plastering on smooth concrete/bricks, and is recommended in extremely hot conditions."
      },
      {
        question: "What is the dilution ratio for Cemprover?",
        answer: "Dilute 1 liter of Cemprover with 1 liter of clean potable water (1:1 ratio) and stir well. Do not over-dilute. Additional water may be added for spray applications."
      },
      {
        question: "What is the coverage of Cemprover on different surfaces?",
        answer: "Overall coverage on a smooth, non-suction surface is 35 to 45 sq. ft. per liter per coat. Specific surface coverage rates include:\n• Brickwork: ~26.5 sq. ft./L\n• Cement/Sand Rendering: ~125 sq. ft./L\n• Old Snowcem Plus/Cement Surfaces: ~125 sq. ft./L\n• Distemper/Lime Wash Surfaces: ~135 sq. ft./L\n• Smooth Cement/Sand Rendering: ~150 sq. ft./L"
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It requires 6 to 8 hours of drying time depending on atmospheric conditions before applying topcoat cement paints."
      },
      {
        question: "How should specific difficult surfaces be prepared before applying Cemprover?",
        answer: "• Sulphate-Bearing Bricks: Ensure walls and new brickwork are thoroughly dried out prior to application.\n• Old Cement Paint: Dry brush the surface to remove all dirt, soil, and dust.\n• Distemper & Lime Wash: Scrape off existing coatings to expose a sound backing. Scrub in 1 coat of Cemprover before applying 2 coats of cement paint.\n• Smooth/Non-Absorbent Concrete: Apply Cemprover to create an adhesion key on smooth or heavily steel-troweled surfaces."
      },
      {
        question: "What container sizes are available for Cemprover?",
        answer: "It is supplied in 5 L and 30 L jerry cans featuring an official Snowcem Paints hologram."
      },
      {
        question: "Is Cemprover safe and eco-friendly?",
        answer: "Yes, it meets GRIHA and LEED Green Building standards. It is non-flammable, low in VOCs (< 40 g/L / 13%), and free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life of Cemprover?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place."
      }
    ]
  },

  // ==========================================
  // DISTEMPER (1 PRODUCT)
  // ==========================================
  {
    id: "snowpearl-acrylic-distemper",
    name: "Snowpearl Acrylic Distemper",
    slug: "snowpearl-acrylic-distemper",
    categorySlug: "distemper",
    categoryName: "Distemper",
    range: "Distemper",
    tagline: "100% Water-Based State-of-the-Art Interior Distemper",
    description: "A 100% water-based product, Snowpearl Acrylic Distemper is a state-of-the-art emulsion paint designed for interior walls and surfaces, offering an elegant, smooth, and durable matt finish.",
    features: [
      "Exceptionally smooth finish",
      "Can be diluted with water",
      "Algae and fungi resistant",
      "Quick drying and recoatable",
      "Optimum price",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Smooth Elegant Matt",
    warranty: "2 Years",
    image: "/products/distemper/distemper.png",
    bgImage: "/products/distemper-bg/distemper.png",
    stageBg: "#fae298",
    pdf: "/pdf/Snowpearl-Acrylic-Distemper.pdf",
    faqs: [
      {
        question: "What is Snowpearl Acrylic Distemper and where can it be used?",
        answer: "Snowpearl Acrylic Distemper is a 100% water-based acrylic co-polymer emulsion distemper in paste form, formulated with ultrafine minerals and biocides for interior walls and surfaces only. It provides an elegant, durable matt finish at a low cost."
      },
      {
        question: "How should Snowpearl Acrylic Distemper be diluted?",
        answer: "Dilute 1 kg of Snowpearl Acrylic Distemper with 500 ml of potable water. Do not over-dilute or add any external stainers other than machine colorants."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "It offers a coverage of approximately 100 to 120 sq. ft. per kg per coat on smooth, non-suction surfaces. Pack sizes available are 1 kg, 5 kg, 10 kg, 20 kg, and a 30 kg project plastic container."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It takes 20 to 30 minutes to become touch dry (at 30°C / 65% RH). The recommended recoating time between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Sand the surface using 180 sand paper and wipe clean.\nStep 2: Apply 1 coat of Snowpearl Interior Primer (dry for 4–6 hours).\nStep 3: Apply Snowcare Wall Putty / Acrylic Putty and sand with 320 emery paper.\nStep 4: Apply a 2nd coat of Snowpearl Interior Primer (dry for 4–6 hours).\nStep 5: Apply diluted Snowpearl Acrylic Distemper."
      },
      {
        question: "How should masonry surfaces be prepared before application?",
        answer: "Fresh plaster must cure completely for at least 28 days. Ensure the surface is free of oil, dust, or loose particles. Cracks up to 3mm, holes, and dents should be filled using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowpearl Acrylic Distemper eco-friendly and safe?",
        answer: "Yes, it qualifies for GRIHA / LEED Green Building criteria. It contains low VOCs (< 40 g/L / 13%) and is free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life and post-painting care?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place. Allow a minimum drying period of 2 weeks post-application before cleaning, and wipe only with a dry, soft cloth."
      }
    ]
  },

  // ==========================================
  // TEXTURES (1 PRODUCT)
  // ==========================================
  {
    id: "snowdecor",
    name: "Snowdecor",
    slug: "snowdecor",
    categorySlug: "textures",
    categoryName: "Textures",
    range: "Textures",
    tagline: "Architectural Decorative Wall Texture Finish",
    description: "With acrylic copolymers reinforced with high quality marble powder and silica sand, Snowdecor adheres flawlessly to a variety of interior and exterior wall surfaces, withstanding extreme weather conditions. So you can let your imagination flow with a range of textures.",
    features: [
      "Long-lasting sheen",
      "Algae and fungi resistant",
      "Non yellowing",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Decorative Textured Scratch Finish",
    warranty: "5 Years",
    image: "/products/textures/snowdecor.png",
    bgImage: "/products/textures-bg/snowdecor.png",
    stageBg: "#8ea1bd",
    pdf: "/pdf/Snowdecor.pdf",
    faqs: [
      {
        question: "What is Snowcem Snowdecor and what finish options are available?",
        answer: "Snowdecor is a protective textured scratch finish made of acrylic copolymer emulsion reinforced with marble powder, silica sand, and aggregates. It is available in three texture finishes: Onyx (2.0 mm scratch finish), Crystal (1.0 mm scratch finish), and Quartz (0.5 mm scratch finish)."
      },
      {
        question: "Where can Snowdecor be applied?",
        answer: "It adheres to various internal and external surfaces including plaster, masonry, brickwork, concrete, gypsum, and asbestos, and is also suitable for reviving old surfaces."
      },
      {
        question: "What is the theoretical coverage and DFT for each finish variant?",
        answer: "Coverage and Dry Film Thickness vary by grain size: Onyx (2.0 mm): 2.6–2.8 sq. ft./kg (Recommended DFT: 2.0–2.2 mm); Crystal (1.0 mm): 2.6–3.6 sq. ft./kg (Recommended DFT: 1.0–1.2 mm); Quartz (0.5 mm): 3.3–4.0 sq. ft./kg (Recommended DFT: 0.6–0.8 mm)."
      },
      {
        question: "What is the recommended application system for Snowdecor?",
        answer: "The complete system requires 1 coat of Snowdecor scratch finish applied via trowel, followed by 1 coat of primer and 2 coats of acrylic exterior emulsion paint."
      },
      {
        question: "How should surfaces be prepared before applying Snowdecor?",
        answer: "Fresh masonry surfaces must cure for at least 28 days. Clean dirt, oil, and loose material thoroughly. For old painted surfaces, applying a coat of Snowsol Stabilizing Solution is recommended. Do not apply on wet surfaces."
      },
      {
        question: "What application method and skill level are recommended?",
        answer: "Snowdecor must be applied using a trowel and should be handled by skilled labor only. Avoid touch-up work on the finished texture, as patches and faults may remain visible."
      },
      {
        question: "What packaging size is available for Snowdecor?",
        answer: "It is available in 30 kg sacks featuring a genuine Snowcem Paints hologram."
      }
    ]
  },
];
