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
      "High Gloss Finish",
      "Silicon Enhanced",
      "Solar Reflective",
      "Superior Adhesion",
      "Dirt Resistant",
      "15-Year Performance Warranty",
    ],
    finish: "High Gloss Finish",
    warranty: "15 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/unigloss-15.png",
    bgImage: "/products/exterior-bg/unigloss-15.jpg",
    stageBg: "#e48ead",
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
      "High Gloss Finish",
      "Silicon Enhanced",
      "Solar Reflective",
      "Anti-Algal and Anti-Fungal",
      "11-Year Performance Warranty",
    ],
    finish: "Smooth Glossy Finish",
    warranty: "11 Years",
    packagingSizes: ["1L", "4L", "10L", "20L"],
    image: "/products/exterior/unigloss-11.png",
    bgImage: "/products/exterior-bg/unigloss-11.jpg",
    stageBg: "#f1a69a",
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
    tagline: "White Cement-Based Wall Putty",
    description: "Wall Putty provides a brilliant white, ultra-smooth foundation for interior and exterior walls, filling hairline cracks and preventing topcoat absorption.",
    features: ["White Cement Base", "Crack Filling Defense", "Glass-Smooth Base"],
    finish: "Smooth White Matt",
    warranty: "Standard",
    packagingSizes: ["1kg", "5kg", "20kg", "40kg"],
    image: "/products/putty/wallputty.png",
    bgImage: "/products/putty-bg/wallputty.png",
    stageBg: "#fbefa6",
  },
  {
    id: "acrylic-putty",
    name: "Acrylic Putty",
    slug: "acrylic-putty",
    range: "Acrylic Putty",
    categorySlug: "putty",
    categoryName: "Putty",
    tagline: "Ready-to-Use Interior Acrylic Paste Putty",
    description: "Acrylic Putty is a ready-to-use smooth water-based wall putty paste designed for quick application, superior levelling, and flawless interior wall finishes.",
    features: ["Ready-to-Use Paste", "Superior Levelling", "Extra Coverage Anchor"],
    finish: "Silky Smooth Base",
    warranty: "Standard",
    packagingSizes: ["1kg", "5kg", "10kg", "20kg"],
    image: "/products/putty/acrylicputty.png",
    bgImage: "/products/putty-bg/acrylicputty.png",
    stageBg: "#e3ac9e",
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
    tagline: "Anti-Algae & Anti-Fungal Surface Cleansing Wash",
    description: "Biowash is a specialized biocide surface cleaner that kills algae, fungus, and moss spores prior to painting, ensuring long-lasting paint adhesion.",
    features: ["Kills Algae & Moss Spores", "Deep Pore Surface Sanitizer", "Prevents Regrowth"],
    finish: "Liquid Treatment",
    warranty: "Standard",
    packagingSizes: ["1L", "5L"],
    image: "/products/snowcare-range/biowash.png",
    bgImage: "/products/snowcare-range-bg/biowash.png",
    stageBg: "#b7b9da",
  },
  {
    id: "hardcrete",
    name: "Hardcrete",
    slug: "hardcrete",
    range: "Snowcare Range",
    categorySlug: "snowcare-range",
    categoryName: "Snowcare Range",
    tagline: "Heavy-Duty Concrete Hardener & Waterproofing Additive",
    description: "Hardcrete is an integral liquid waterproofing and floor hardener additive for cement mortars, plasters, and concrete slabs to increase compressive strength and block water seepage.",
    features: ["Integral Waterproofing", "Increases Concrete Hardness", "Reduces Plaster Shrinkage"],
    finish: "Liquid Additive",
    warranty: "Standard",
    packagingSizes: ["1L", "5L", "20L"],
    image: "/products/snowcare-range/hardcrete.png",
    bgImage: "/products/snowcare-range-bg/hardcrete.png",
    stageBg: "#b7b9da",
  },
  {
    id: "cemprover",
    name: "Cemprover",
    slug: "cemprover",
    range: "Snowcare Range",
    categorySlug: "snowcare-range",
    categoryName: "Snowcare Range",
    tagline: "Acrylic Polymer Cement Bonding Agent & Modifier",
    description: "Cemprover is a high-performance acrylic polymer bonding agent that enhances adhesion, tensile strength, and water resistance in repair mortars and cement coatings.",
    features: ["High Substrate Adhesion", "Flexural Polymer Modifier", "Water Resistance"],
    finish: "Polymer Modifier",
    warranty: "Standard",
    packagingSizes: ["1L", "5L", "20L"],
    image: "/products/snowcare-range/cemprover.png",
    bgImage: "/products/snowcare-range-bg/cemprover.png",
    stageBg: "#b7b9da",
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
    tagline: "High-Whiteness Water-Based Acrylic Distemper",
    description: "Snowpearl Acrylic Distemper offers an economical, smooth matte finish for interior walls with superior whiteness, shade brightness, and wall coverage.",
    features: ["High Whiteness & Opacity", "Smooth Matte Finish", "Economical Wall Coverage"],
    finish: "Smooth Matte",
    warranty: "2 Years",
    packagingSizes: ["2kg", "5kg", "10kg", "20kg"],
    image: "/products/distemper/distemper.png",
    bgImage: "/products/distemper-bg/distemper.png",
    stageBg: "#fae298",
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
    description: "Snowdecor is a premium acrylic-based textured wall finish engineered to create stunning architectural patterns, rustic textures, and heritage accent wall designs.",
    features: ["Architectural Texture Patterns", "Extreme Durability", "Weather & Crack Proof"],
    finish: "Decorative Textured",
    warranty: "5 Years",
    packagingSizes: ["5kg", "25kg"],
    image: "/products/textures/snowdecor.png",
    bgImage: "/products/textures-bg/snowdecor.png",
    stageBg: "#8ea1bd",
  },
];
