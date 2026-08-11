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
    range: "Economy Exterior Emulsions",
    tagline: "Water-Based High Sheen Smart Acrylic Exterior Emulsion",
    description: "A water-based exterior emulsion paint that gives your walls a unique sheen. With a high resistance to fading, chalking, and flaking, Snowcem Plus Shine is ideally suited for homes where weather conditions can range from dry to lightly humid, and its superior film integrity also protects your walls from algal and fungal growth.",
    features: [
      "Best-in-class sheen finish",
      "Superior film integrity",
      "Anti algal and anti fungal",
      "Protection with decoration",
      "3-year waterproofing warranty",
    ],
    finish: "High Sheen Exterior Finish",
    warranty: "3 Years",
    image: "/products/exterior/snowcem-plus-shine.png",
    bgImage: "/products/exterior-bg/snowcem-plus-shine.jpg",
    stageBg: "#d0baa8",
    pdf: "/pdf/Snowcem-Plus-Shine.pdf",
    faqs: [
      {
        question: "What is Snowcem Plus Shine Smart Acrylic Emulsion and where can it be applied?",
        answer: "Snowcem Plus Shine is a water-based exterior emulsion formulated with an acrylic emulsion binder. It gives exterior walls a high sheen finish and is best suited for climates ranging from dry to lightly humid. It resists fading, chalking, flaking, and fungal/algal growth while providing protective and decorative benefits."
      },
      {
        question: "What is the recommended mixing ratio for Snowcem Plus Shine?",
        answer: "Combine 1000 ml of Snowcem Plus Shine Paint with 500 to 600 ml of clean potable water. Do not over-dilute or add thinners or universal stainers."
      },
      {
        question: "What is the coverage capacity and what pack sizes are available?",
        answer: "• 1 Coat Coverage: 100 to 140 sq. ft. per liter.\n• 2 Coat Coverage: 50 to 70 sq. ft. per liter.\nAvailable pack sizes are 1 L, 4 L, 10 L, and 20 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Surface dry time is 30 minutes. The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the complete step-by-step application procedure?",
        answer: "Step 1: Apply Snowcare Wall Putty (optional, mixed at 400 ml water per 1000 gm putty) and allow overnight drying.\nStep 2: Apply 1 coat of Special CW Primer or Universal Primer (allow 4 hours drying time).\nStep 3: Apply the 1st coat of diluted Snowcem Plus Shine Exterior Emulsion Paint (allow 4–6 hours drying time).\nStep 4: Apply the 2nd coat of diluted Snowcem Plus Shine Exterior Emulsion Paint (allow 4–6 hours drying time).\nNote: Horizontal surfaces (top of windows, parapet tops) require 3 coats for thorough protection."
      },
      {
        question: "How should masonry surfaces be prepared prior to painting?",
        answer: "Fresh masonry must cure for at least 28 days. Clean off dust, oil, grease, and loose paint thoroughly using wire brushing and water. For old, friable, or difficult surfaces, a coat of Snowsol Stabilising Solution is recommended. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcem Plus Shine eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life and post-painting care?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place. For optimal performance, wash and clean the wall surface at regular 6-month intervals."
      }
    ]
  },
  {
    id: "outweather",
    name: "Outweather",
    slug: "outweather",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Economy Exterior Emulsions",
    tagline: "Economical Weather-Protective Exterior Emulsion",
    description: "One of the most economical acrylic emulsion paint choices, Outweather offers you a great value with its finish that decorates as well as protects your walls from cracks and peels, giving you a long-lasting finish.",
    features: [
      "Value for money",
      "Protection with decoration",
      "Used for exterior and interior walls",
      "Anti-algal and anti-fungal",
      "Superior film integrity",
    ],
    finish: "Economical Matt Finish",
    warranty: "3 Years",
    image: "/products/exterior/outweather-exterior.png",
    bgImage: "/products/exterior-bg/outweather-exterior.jpg",
    stageBg: "#f1aa99",
    pdf: "/pdf/Outweather-Acrylic-Emulsion-Paint.pdf",
    faqs: [
      {
        question: "What is Outweather Acrylic Emulsion Paint and where can it be used?",
        answer: "Outweather Acrylic Emulsion Paint is an economical exterior acrylic emulsion formulated with a special acrylic binder and biocides. It provides protective and decorative benefits, prevents peeling or cracking, and offers anti-algal, anti-fungal, and high color retention properties. It is suitable for exterior walls and can also be used on interior walls."
      },
      {
        question: "What is the recommended mixing ratio for Outweather Acrylic Emulsion Paint?",
        answer: "Mix 2 parts of Outweather Acrylic Emulsion Paint with 1 part of clean potable water by volume (2:1 ratio) for better brushability. Do not over-dilute, use thinners, or add universal stainers."
      },
      {
        question: "What is the coverage capacity and what pack sizes are available?",
        answer: "It offers an approximate coverage of 110 to 130 sq. ft. per liter per coat on normal surfaces. Container sizes available are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Touch dry time is 15 to 20 minutes. The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Apply Snowcare Wall Putty (optional) using a trowel and allow overnight drying.\nStep 2: Apply 1 coat of Snowcem EXT/INT Primer and allow 4 hours drying time.\nStep 3: Apply the 1st coat of diluted Outweather Acrylic Emulsion Paint (allow 4–6 hours drying time).\nStep 4: Apply the 2nd coat of diluted Outweather Acrylic Emulsion Paint (allow 4–6 hours drying time).\nNote: Primer application is mandatory, and horizontal surfaces (top of windows, ledges) require 3 coats for greater protection."
      },
      {
        question: "How many shades are available for Outweather?",
        answer: "It is available in 300+ light shades as per the Snowcem Paints Colour Spectra (recommended for light shades only)."
      },
      {
        question: "How should surfaces be prepared prior to painting?",
        answer: "Fresh plaster must cure for at least 28 days. Clean the surface free of loose paint, dust, oil, or fungal growth using wire brushing and water. For old, friable, or difficult surfaces, a coat of Snowsol Stabilising Solution is recommended. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Outweather Acrylic Emulsion Paint eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },
  {
    id: "trump",
    name: "Trump",
    slug: "trump",
    categorySlug: "exterior-emulsion-paints",
    categoryName: "Exterior Emulsion Paints",
    range: "Economy Exterior Emulsions",
    tagline: "High Coverage Exterior Emulsion",
    description: "An acrylic emulsion paint that combines decoration with protection to give you an economic choice with a high-quality finish. With addition of special biocides, Trumps superior spread is fade resistant and offers protection from a range of weather conditions.",
    features: [
      "High opacity",
      "Acrylic paint system",
      "Matt finish",
      "Anti-algal and anti-fungal",
      "4-year performance warranty",
    ],
    finish: "Smooth Fade-Resistant Matt",
    warranty: "4 Years",
    image: "/products/exterior/trump.png",
    bgImage: "/products/exterior-bg/trump.jpg",
    stageBg: "#d3e6c8",
    pdf: "/pdf/Trump.pdf",
    faqs: [
      {
        question: "What is Trump High Coverage Exterior Emulsion and where can it be applied?",
        answer: "Trump Exterior Emulsion Paint is an economical acrylic emulsion formulated with a special acrylic binder and biocides. It provides fade-resistant protection against algae, fungi, alkali, and UV radiation for exterior surfaces, though it can also be used for interior walls."
      },
      {
        question: "What is the recommended mixing ratio for Trump Exterior Emulsion?",
        answer: "Mix 2 parts of Trump Exterior Emulsion Paint with 1 part of clean potable water by volume (2:1 ratio) for better brushability. Do not over-dilute or add any thinner or universal stainer."
      },
      {
        question: "What is the coverage capacity and what pack sizes are available?",
        answer: "It offers an approximate coverage of 110 to 150 sq. ft. per liter per coat. Pack sizes available are 1 L, 4 L, 10 L, and 20 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Touch dry time is 15 to 20 minutes. The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Apply Snowcare Wall Putty (optional) using a trowel and allow overnight drying.\nStep 2: Apply 1 coat of Snowcem Special CW Primer and allow 4 hours drying time.\nStep 3: Apply the 1st coat of diluted Trump Exterior Emulsion Paint (allow 4–6 hours drying time).\nStep 4: Apply the 2nd coat of diluted Trump Exterior Emulsion Paint (allow 4–6 hours drying time).\nNote: Primer application is mandatory, and horizontal surfaces (top of windows, ledges) require 3 coats for greater protection."
      },
      {
        question: "How should surfaces be prepared prior to painting?",
        answer: "Fresh masonry must cure for at least 28 days. Clean the surface free of loose paint, dust, oil, or fungal growth using wire brushing and water. For old, friable, or difficult surfaces, a coat of Snowsol Stabilising Solution is recommended. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 white cement to fine sand mix."
      },
      {
        question: "Is Trump Exterior Emulsion eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life and post-painting care?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place. For best performance, wash and clean the surface at regular 6-month intervals."
      }
    ]
  },

  // ==========================================
  // INTERIOR EMULSION PAINTS (7 PRODUCTS)
  // ==========================================  // --- LUXURY PRODUCTS (3 ITEMS) ---
  {
    id: "zenita",
    name: "Zenita",
    slug: "zenita",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Luxury Interior Emulsions",
    tagline: "Ultimate Luxury Semi-Glossy Interior Emulsion",
    description: "A premium quality acrylic paint for interiors with a unique semi-glossy finish that ensures a long-lasting finish. The use of special binders, high-quality additives and components make this a special and durable product that will give your house a splash of pure luxury.",
    features: [
      "Anti-graffiti effect",
      "Durable semi-glossy finish",
      "Washable",
      "Fungi and algae resistant",
      "Free of heavy metals like lead and chromium",
      "8-year performance warranty",
    ],
    finish: "Luxury Semi-Glossy",
    warranty: "8 Years",
    image: "/products/interior/zenita.png",
    bgImage: "/products/interior-bg/zenita.png",
    stageBg: "#f4dce3",
    pdf: "/pdf/Zenita.pdf",
    faqs: [
      {
        question: "What is Zenita Ultimate Luxury Emulsion and where is it used?",
        answer: "Zenita Ultimate Luxury Emulsion is a premium acrylic interior paint formulated with ultrafine pigments, special acrylic binders, and functional additives. It delivers an elegant, long-lasting semi-gloss finish with anti-graffiti properties, excellent washability, and an 8-year performance warranty."
      },
      {
        question: "What is the recommended dilution ratio for Zenita Interior Emulsion Paint?",
        answer: "Dilute 1 liter of Zenita Interior Emulsion Paint with 400 ml of potable water. Do not over-dilute or add any stainers other than machine colorants."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "On a smooth, non-suction surface, it offers an approximate coverage of 180 to 200 sq. ft. per liter per coat. Available pack sizes are 1 L, 4 L, 10 L, and 20 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It becomes touch dry in 20 to 30 minutes (at 30°C / 65% RH). The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Apply Snowcare Wall Putty or Snowcem Acrylic Putty and allow it to dry overnight.\nStep 2: Apply 1 coat of Special CW Primer or Universal Primer (dry for 4 hours) and lightly sand with 320 emery paper.\nStep 3: Apply the 1st coat of diluted Zenita Interior Emulsion Paint (dry for 4–6 hours).\nStep 4: Apply the 2nd coat of diluted Zenita Interior Emulsion Paint (dry for 4–6 hours).\nNote: Application of primer is mandatory before applying Zenita."
      },
      {
        question: "How should masonry surfaces be prepared before applying Zenita?",
        answer: "Fresh plaster must be allowed to cure completely for a minimum of 28 days. Clean off all dust, dirt, oil, and loose materials. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Zenita Interior Emulsion eco-friendly and safe?",
        answer: "Yes, it meets GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },
  {
    id: "zenita-velvet-finish",
    name: "Zenita Velvet Finish",
    slug: "zenita-velvet-finish",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Luxury Interior Emulsions",
    tagline: "Super-Premium Velvet Sheen Interior Luxury Emulsion",
    description: "A super-premium interior emulsion which gives your walls a high sheen luxury finish. Its special quality of binders and additives help give walls a velvet-like touch.",
    features: [
      "Excellent washability",
      "Eco-friendly",
      "Anti algal and anti-fungal",
      "Durable",
      "Free from heavy metals like lead, chromium, and mercury",
    ],
    finish: "High Sheen Velvet Finish",
    warranty: "8 Years",
    image: "/products/interior/zenita-velvet-finish.png",
    bgImage: "/products/interior-bg/zenita-velvet-finish.png",
    stageBg: "#d19ec5",
    pdf: "/pdf/Zenita-Velvet-Finish.pdf",
    faqs: [
      {
        question: "What is Zenita Velvet Finish and what makes it unique?",
        answer: "Zenita Velvet Finish is a super-premium interior luxury emulsion formulated with special binders and additives. It provides a high-sheen, diamond-like glow, a velvet-like touch, and best-in-class stain and water repellence."
      },
      {
        question: "What is the recommended dilution ratio for Zenita Velvet Finish?",
        answer: "Dilute 1 liter of Zenita Velvet Finish with 400 ml of clean potable water. Do not over-dilute or add any stainers or colorants."
      },
      {
        question: "What is the coverage capacity and what pack sizes are available?",
        answer: "On normal masonry surfaces with no suction, it offers a coverage of approximately 260 to 300 sq. ft. per liter per coat. Pack sizes available are 1 L and 4 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It becomes touch dry in 20 to 30 minutes (at 30°C / 65% RH). The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the complete step-by-step application process?",
        answer: "Step 1: Apply 1 coat of Snowcare Sealer & Primer or Zenita Basecoat (diluted with 500 ml water per liter) and let it dry for 4 hours.\nStep 2: Apply Snowcare Wall Putty or Snowcem Acrylic Putty (40% dilution) and allow overnight drying.\nStep 3: Apply a 2nd coat of Snowcare Sealer & Primer or Zenita Basecoat (diluted with 500 ml water per liter) and let it dry for 4 hours.\nStep 4: Apply the 1st coat of diluted Zenita Velvet Finish (dry for 4–6 hours).\nStep 5: Apply the 2nd coat of diluted Zenita Velvet Finish (dry for 4–6 hours).\nNote: Application of a suitable primer is mandatory."
      },
      {
        question: "How should masonry surfaces be prepared prior to painting?",
        answer: "New masonry surfaces must be allowed to cure completely for at least 28 days. Ensure the wall is clean, sound, and free of dirt, oil, or loose material. Cracks up to 3mm should be filled using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Zenita Velvet Finish eco-friendly and safe?",
        answer: "Yes, it meets GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life and post-painting care?",
        answer: "It has a shelf life of 3 years from the manufacturing date when stored in airtight containers in a cool, dry place. For best performance, wash and clean the painted surface at regular 6-month intervals."
      }
    ]
  },
  {
    id: "celeste",
    name: "Celeste",
    slug: "celeste",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Luxury Interior Emulsions",
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
    range: "Premium Interior Emulsions",
    tagline: "Premium Acrylic Finish Soft Sheen Interior Emulsion",
    description: "A premium acrylic emulsion paint that gives the walls of your home a unique soft finish that lasts for years. With over 1500 shades to choose from, Sentino uses high-quality ingredients and binders that further make Sentino a premium emulsion paint for your home.",
    features: [
      "Durable finish",
      "Strong adhesion",
      "Excellent flow and leveling",
      "Algae and fungi resistant",
      "Non yellowing",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Unique Soft Sheen",
    warranty: "5 Years",
    image: "/products/interior/sentino.png",
    bgImage: "/products/interior-bg/sentino.png",
    stageBg: "#fad5c3",
    pdf: "/pdf/Sentino.pdf",
    faqs: [
      {
        question: "What is Sentino Premium Acrylic Finish Interior Emulsion Paint and what are its main features?",
        answer: "Sentino Interior Emulsion Paint is a premium pure acrylic paint designed for interior walls. It is formulated with imported additives, functional extenders, and high-quality binders to provide a long-lasting soft sheen finish, excellent flow & leveling, alkali resistance, non-yellowing properties, and anti-algal/anti-fungal protection."
      },
      {
        question: "What is the recommended dilution ratio for Sentino Interior Emulsion Paint?",
        answer: "Dilute 1 liter of Sentino Interior Emulsion Paint with 600 ml of potable water. Do not over-dilute or add any stainer other than machine colorants."
      },
      {
        question: "What is the coverage capacity and available pack sizes?",
        answer: "On a smooth, non-suction surface, it offers an approximate coverage of 240 to 260 sq. ft. per liter per coat. Pack sizes available are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Touch dry time is 20 to 30 minutes (at 30°C / 65% relative humidity). The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application process for Sentino?",
        answer: "Step 1: Apply Snowcare Wall Putty or Snowcem Acrylic Putty using a trowel and allow overnight drying.\nStep 2: Apply 1 coat of Special CW Primer or Universal Primer (allow 4 hours drying time) and lightly sand with 320 emery paper.\nStep 3: Apply the 1st coat of diluted Sentino Interior Emulsion Paint (allow 4–6 hours drying time).\nStep 4: Apply the 2nd coat of diluted Sentino Interior Emulsion Paint (allow 4–6 hours drying time).\nNote: Application of primer is mandatory before applying Sentino."
      },
      {
        question: "How should masonry surfaces be prepared before applying Sentino?",
        answer: "Fresh plaster must be allowed to cure completely for a minimum of 28 days. Ensure the surface is clean and free of dirt, oil, grease, or powdery residue. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Sentino Interior Emulsion Paint eco-friendly and safe?",
        answer: "Yes, Sentino qualifies for GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life and recommended post-painting care?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place. For best long-term performance, clean and wash the painted surface at regular 6-month intervals."
      }
    ]
  },
  {
    id: "sentino-easy-2-wash",
    name: "Sentino Easy2Wash",
    slug: "sentino-easy-2-wash",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Premium Interior Emulsions",
    tagline: "Luxury Washable Soft-Sheen Interior Emulsion",
    description: "A luxury interior emulsion which gives a rich sheen to your walls with superior washability. It is formulated with special cross-linking polymers which keeping the paint film intact for a longer period of time.",
    features: [
      "High washability",
      "High durability",
      "Anti algal and anti-fungal",
      "Strong adhesion",
      "6-year warranty",
    ],
    finish: "Rich Washable Soft Sheen",
    warranty: "6 Years",
    image: "/products/interior/sentino-easy2wash.png",
    bgImage: "/products/interior-bg/sentino-easy2wash.png",
    stageBg: "#9ca7cf",
    pdf: "/pdf/Sentino-Easy2Wash-TDS.pdf",
    faqs: [
      {
        question: "What is Sentino Easy 2 Wash and what makes it ideal for interior walls?",
        answer: "Sentino Easy 2 Wash is a luxury interior acrylic emulsion formulated with cross-linking polymers, silicon additives, and high-grade extenders. It provides a smooth, rich soft-sheen finish along with superior washability for stubborn stains, a non-stick film, high scrub resistance, and a 6-year performance warranty."
      },
      {
        question: "What is the recommended dilution ratio for Sentino Easy 2 Wash?",
        answer: "Dilute 1 liter of Sentino Easy 2 Wash with 400 ml of clean potable water. Do not over-dilute or add any external stainers other than machine colorants."
      },
      {
        question: "What is the coverage capacity and what pack sizes are available?",
        answer: "On normal masonry surfaces with no suction, it covers approximately 240 to 280 sq. ft. per liter per coat. Available pack sizes are 1 L and 4 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Touch dry time is 20 to 30 minutes (at 30°C / 65% relative humidity). The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Apply 1 coat of Snowcare Sealer & Primer (diluted with 500 ml water per liter) and let it dry for 4 hours.\nStep 2: Apply Snowcare Wall Putty or Snowcem Acrylic Putty (40% dilution) and allow overnight drying.\nStep 3: Apply a 2nd coat of Snowcare Sealer & Primer (diluted with 500 ml water per liter) and let it dry for 4 hours.\nStep 4: Apply the 1st coat of diluted Sentino Easy 2 Wash (dry for 4–6 hours).\nStep 5: Apply the 2nd coat of diluted Sentino Easy 2 Wash (dry for 4–6 hours).\nNote: Application of a suitable primer is mandatory."
      },
      {
        question: "How should stain cleaning be performed on painted walls?",
        answer: "Allow the paint film to cure for a minimum of 2 weeks (15 days) before cleaning. Clean gently using a soft white cotton cloth and a mild liquid soap solution (or mineral turpentine oil for oil-based stains) without applying heavy pressure."
      },
      {
        question: "Is Sentino Easy 2 Wash eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },

  // --- MIDRANGE EMULSIONS (1 ITEM) ---
  {
    id: "snowpearl",
    name: "Snowpearl",
    slug: "snowpearl",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Value & Economy Interior Emulsions",
    tagline: "Super Rich Interior Emulsion Paint",
    description: "A carefully developed interior emulsion paint, designed to provide value with a smooth finish. With a selection of over 1500 shades, Snowpearl Super Rich Paint uses a precise selection of raw materials to give your walls a durable, protective, and smooth finish.",
    features: [
      "Durable finish",
      "Seamless application",
      "Quick drying and recoating",
      "Optimum price",
      "Free from heavy metals like lead and chromium",
      "3-year performance warranty",
    ],
    finish: "Super Rich Smooth Finish",
    warranty: "3 Years",
    image: "/products/interior/snowpearl.png",
    bgImage: "/products/interior-bg/snowpearl.png",
    stageBg: "#c7e5c2",
    pdf: "/pdf/Snowpearl-Superrichpaint.pdf",
    faqs: [
      {
        question: "What is Snowpearl Super Rich Paint and where can it be applied?",
        answer: "Snowpearl Super Rich Paint is a value-focused interior emulsion paint formulated with a copolymer emulsion and selective raw materials. It is designed for interior walls to deliver a smooth, durable, and appealing finish with anti-fungal, anti-algal, and alkali-resistant properties."
      },
      {
        question: "What is the recommended dilution ratio for Snowpearl Super Rich Paint?",
        answer: "Dilute 1 liter of Snowpearl Interior Emulsion Paint with 500 ml of potable water. Do not over-dilute or add any stainers other than machine colorants. Note that it can also be used as a self-priming coat at 100% dilution."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "On a smooth, non-suction surface, it provides an approximate coverage of 180 to 200 sq. ft. per liter per coat. Available container sizes are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Touch dry time is 20 to 30 minutes (at 30°C / 65% relative humidity). The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Apply Snowcare Wall Putty or Snowcem Acrylic Putty using a trowel and allow overnight drying.\nStep 2: Apply 1 coat of Snowpearl Interior Primer (dry for 4 hours) and lightly sand with 320 emery paper.\nStep 3: Apply the 1st coat of diluted Snowpearl Interior Emulsion Paint (allow 4–6 hours drying time).\nStep 4: Apply the 2nd coat of diluted Snowpearl Interior Emulsion Paint (allow 4–6 hours drying time).\nNote: Application of primer is mandatory before applying topcoat."
      },
      {
        question: "How should masonry surfaces be prepared prior to painting?",
        answer: "Fresh plaster must be allowed to cure completely for a minimum of 28 days. Clean off all dust, dirt, oil, grease, or loose material using a scraper or stiff wire brush. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowpearl Super Rich Paint eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },

  // --- ECONOMY RANGE EMULSION (1 ITEM) ---
  {
    id: "snowcoat",
    name: "Snowcoat",
    slug: "snowcoat",
    categorySlug: "interior-emulsion-paints",
    categoryName: "Interior Emulsion Paints",
    range: "Value & Economy Interior Emulsions",
    tagline: "Value-Driven Interior Acrylic Emulsion Paint",
    description: "A carefully developed interior emulsion paint, designed to provide value with a smooth finish. With a selection of over 300 shades, Snowcoat uses a precise selection of raw materials to give your walls a greater coverage with a durable and smooth finish.",
    features: [
      "Durable finish",
      "Seamless application",
      "Quick drying and recoating",
      "Optimum price",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Economical Smooth Finish",
    warranty: "3 Years",
    image: "/products/interior/snowcoat.png",
    bgImage: "/products/interior-bg/snowcoat.png",
    stageBg: "#97d5cb",
    pdf: "/pdf/Snowcoat-Acrylic-Emulsion-Paint.pdf",
    faqs: [
      {
        question: "What is Snowcoat Acrylic Emulsion Paint and where can it be applied?",
        answer: "Snowcoat Acrylic Emulsion Paint is an interior emulsion formulated with a copolymer emulsion and selective raw materials. It is designed for interior walls to provide an appealing, smooth, and durable finish at an optimum price with alkali-resistant and anti-fungal/anti-algal properties."
      },
      {
        question: "What is the recommended dilution ratio for Snowcoat Acrylic Emulsion Paint?",
        answer: "Dilute 1 liter of Snowcoat Acrylic Emulsion Paint with 500 ml of potable water. Do not over-dilute or add any external stainers other than machine colorants."
      },
      {
        question: "What is the coverage capacity and what pack sizes are available?",
        answer: "On a smooth, non-suction surface, it offers an approximate coverage of 180 to 200 sq. ft. per liter per coat. Available container sizes are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "Touch dry time is 20 to 30 minutes (at 30°C / 65% relative humidity). The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the complete step-by-step application procedure?",
        answer: "Step 1: Apply Snowcare Wall Putty or Snowcem Acrylic Putty using a trowel and allow overnight drying.\nStep 2: Apply 1 coat of Snowpearl Interior Primer (allow 4 hours drying time) and lightly sand with 320 emery paper.\nStep 3: Apply the 1st coat of diluted Snowcoat Acrylic Emulsion Paint (allow 4–6 hours drying time).\nStep 4: Apply the 2nd coat of diluted Snowcoat Acrylic Emulsion Paint (allow 4–6 hours drying time).\nNote: Application of primer is mandatory before applying topcoat."
      },
      {
        question: "How many shades are available for Snowcoat?",
        answer: "It is available in 300+ light shades as per the Snowcem Paints Colour Spectra (recommended for light shades only)."
      },
      {
        question: "How should masonry surfaces be prepared prior to painting?",
        answer: "Fresh plaster must cure completely for at least 28 days. Clean off all dust, dirt, oil, grease, or loose material using a scraper or stiff wire brush. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcoat Acrylic Emulsion Paint eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
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
    range: "Elastomeric Wall Membranes",
    tagline: "Fiber-Reinforced Elastomeric Roof & Wall Waterproofing Membrane",
    description: "A reinforced elastomeric and waterproof coating solution that gives an excellent elongation and crack bridging ability, with added mechanical and anti-carbonation properties for long-lasting durability.",
    features: [
      "Crack bridging ability",
      "Waterproof",
      "Strong adhesion",
      "Added mechanical strength",
      "Fungi and algae resistant",
      "Self-priming use and maintenance",
    ],
    finish: "Elastomeric Membrane",
    warranty: "8 Years",
    image: "/products/waterproof/snowcare-damp-proof.png",
    bgImage: "/products/waterproof-bg/snowcare-damp-proof.png",
    stageBg: "#9bd6ed",
    pdf: "/pdf/Snowcare-Damp-Proof.pdf",
    faqs: [
      {
        question: "What is Snowcare Damp Proof and what are its key technical features?",
        answer: "Snowcare Damp Proof is a fiber-reinforced elastomeric waterproofing coating. It features a nano-composite architecture with surface cross-linking that provides up to 2 mm crack-bridging ability, anti-carbonation protection, surface temperature reduction up to 10°C, and an 8-year performance warranty."
      },
      {
        question: "What is the dilution ratio and application process for horizontal surfaces (terraces)?",
        answer: "For horizontal terrace waterproofing, a 3-coat system is used:\n• 1st Coat (Self-Priming): Dilute 1000 ml of paint with 300 ml of clean water (30% dilution) and allow 4 hours drying time.\n• 2nd Coat: Apply undiluted and allow 4–6 hours drying time.\n• 3rd Coat: Apply undiluted and allow 4–6 hours drying time."
      },
      {
        question: "What is the application process for vertical exterior walls?",
        answer: "For vertical walls, apply:\n• 1st Coat (Self-Priming): Dilute 1000 ml of paint with 300 ml of water (30% dilution) and allow 4–6 hours drying time.\n• 2nd Coat: Apply undiluted and allow 4–6 hours drying time.\n• Topcoat (Optional/As required): Apply 2 coats of a compatible exterior emulsion (such as Uni-Glosss, Pentasia, or Snowcryl)."
      },
      {
        question: "What is the coverage capacity of Snowcare Damp Proof?",
        answer: "• Horizontal Terraces (3-coat system): 9 to 11 sq. ft. per liter.\n• Fresh Vertical Surfaces: 20 to 25 sq. ft. per liter.\n• Repainting Vertical Surfaces: 30 to 35 sq. ft. per liter."
      },
      {
        question: "What drying times should be expected?",
        answer: "Surface dry time is 30 minutes, touch dry time is 4 to 6 hours, and the recommended recoating period between coats is 4 to 6 hours."
      },
      {
        question: "What pack sizes are available for Snowcare Damp Proof?",
        answer: "Available container sizes are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "Is Snowcare Damp Proof eco-friendly and safe?",
        answer: "Yes, it meets GRIHA and LEED Green Building parameters. It contains low VOCs (< 40 g/L / 13%) and is free from toxic heavy metals (lead, mercury, chromium VI, cadmium) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      },
      {
        question: "What is the shelf life and recommended post-painting care?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place. For best long-term performance, clean and wash any algal or fungal growth at regular 6-month intervals."
      }
    ]
  },
  {
    id: "snowcare-protect",
    name: "Snowcare Protect",
    slug: "snowcare-protect",
    categorySlug: "waterproofing-paints",
    categoryName: "Waterproofing Paints",
    range: "Basecoat Waterproofing",
    tagline: "Ultra-Durable Fiber-Reinforced Waterproofing Basecoat",
    description: "An ultra-durable basecoat formulated for waterproofing of exterior and interior walls and surfaces. Its dirt pick resistance ensures clean and durable walls for your home with long lasting durability.",
    features: [
      "Excellent waterproofing",
      "Superior cleanability",
      "Elastomeric coating",
      "Structural protection",
      "UV resistant",
      "Fungi and algae resistant",
    ],
    finish: "Elastomeric Basecoat",
    warranty: "5 Years",
    image: "/products/waterproof/snowcare-protect.png",
    bgImage: "/products/waterproof-bg/snowcare-protect.png",
    stageBg: "#a2a5bf",
    pdf: "/pdf/Snowcare-Protect.pdf",
    faqs: [
      {
        question: "What is Snowcare Protect Basecoat and where is it used?",
        answer: "Snowcare Protect Basecoat is an ultra-durable elastomeric waterproofing basecoat formulated with pure acrylic latex and unique fiber reinforcement. It provides up to 2 mm crack-bridging ability, structural protection, and dirt pick resistance for both exterior and interior surfaces."
      },
      {
        question: "What is the application sequence and mixing ratio for fresh painting?",
        answer: "• 1st Coat: Dilute 1 liter of basecoat with 300 ml of clean water (30% dilution) and allow 4 hours drying time.\n• 2nd Coat: Apply undiluted and allow 4 to 6 hours drying time.\n• Topcoat: Apply 2 coats of compatible exterior emulsions like Uni-Glosss, Pentasia, or Snowcryl (allow 4–6 hours drying time between coats)."
      },
      {
        question: "What is the application procedure for repainting surfaces?",
        answer: "On repainting surfaces, apply 1 coat of Snowcare Protect Basecoat with no dilution."
      },
      {
        question: "What is the coverage area and available pack sizes?",
        answer: "Overall coat coverage ranges from 40 to 45 sq. ft. per liter per coat:\n• 1st Coat (30% dilution): 50 to 55 sq. ft. per liter\n• 2nd Coat (undiluted): 25 to 30 sq. ft. per liter\nAvailable pack sizes are 20 L and 26 L containers."
      },
      {
        question: "What are the drying times for Snowcare Protect Basecoat?",
        answer: "It becomes surface dry in 30 minutes. The recommended recoating period between coats is 4 to 6 hours."
      },
      {
        question: "How should masonry surfaces be prepared prior to application?",
        answer: "New plastered walls must be allowed to cure completely for at least 28 days. Clean off all dirt, dust, and loose material. Fungal or algal growth should be wire brushed and cleaned with water. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcare Protect Basecoat eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building parameters. It contains low VOC levels (< 40 g/L / 13%) and is free from toxic heavy metals (lead, mercury, chromium VI, cadmium) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      },
      {
        question: "What is the shelf life of this product?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place."
      }
    ]
  },
  {
    id: "snowcare-damp-protect-dual",
    name: "Snowcare Damp Protect Dual",
    slug: "snowcare-damp-protect-dual",
    categorySlug: "waterproofing-paints",
    categoryName: "Waterproofing Paints",
    range: "Elastomeric Wall Membranes",
    tagline: "Fiber-Reinforced Interior & Exterior Dual Waterproofing Membrane",
    description: "A special fibre reinforced waterproofing coating offers best-in-class protection for both, your exterior and interior walls. Its special additives also protect walls from any bacterial growth UV degradation, so your walls get the water-proofing solution they deserve.",
    features: [
      "Crack-bridging ability",
      "Excellent water proofing",
      "Anti algal and anti fungal",
      "Weather protection",
      "3-year waterproofing warranty",
    ],
    finish: "Elastomeric Dual Membrane",
    warranty: "3 Years",
    image: "/products/waterproof/snowcare-damp-protect-dual.png",
    bgImage: "/products/waterproof-bg/snowcare-damp-protect-dual.png",
    stageBg: "#9fc5e2",
    pdf: "/pdf/Snowcare-Damp-Protect-Dual.pdf",
    faqs: [
      {
        question: "What is Snowcare Damp Protect-Dual and where can it be applied?",
        answer: "Snowcare Damp Protect-Dual is a one-component, fiber-reinforced elastomeric coating for both interior and exterior surfaces. It functions as a penetrative and film-forming waterproofing barrier, offering up to 2 mm crack-bridging ability, surface temperature reduction up to 5°C, anti-efflorescence properties, and a 3-year waterproofing warranty."
      },
      {
        question: "How is Snowcare Damp Protect-Dual applied on exterior horizontal surfaces (terraces)?",
        answer: "A 3-coat system is applied:\n• 1st Coat: Dilute 1000 ml of paint with 300 ml of clean water (30% dilution) and allow 4 hours drying time.\n• 2nd Coat: Apply undiluted and allow 4–6 hours drying time.\n• 3rd Coat: Apply undiluted and allow 4–6 hours drying time."
      },
      {
        question: "How is it applied on exterior vertical walls?",
        answer: "Apply:\n• 1st Coat: Dilute 1000 ml with 300 ml of water (30% dilution) and dry for 4–6 hours.\n• 2nd Coat: Apply undiluted and dry for 4–6 hours.\n• Topcoat: Apply 2–3 coats of compatible topcoats (such as Uni-Glosss, Pentasia, or Snowcryl) diluted with 400 ml water per 1000 ml paint."
      },
      {
        question: "What is the application process for interior surfaces damaged by dampness or efflorescence?",
        answer: "Step 1: Remove existing putty and damaged wall layers completely using a putty blade or mechanical tools.\nStep 2: Apply the 1st coat of Snowcare Damp Protect-Dual undiluted (dry for 6–8 hours).\nStep 3: Apply the 2nd coat of Snowcare Damp Protect-Dual undiluted (dry for 6–8 hours) (skip this step if surface shows no dampness/efflorescence).\nStep 4: Apply 2 coats of Snowcare Wall Putty or Snowcem Acrylic Putty.\nStep 5: Apply 1 coat of interior primer followed by topcoat interior paint."
      },
      {
        question: "What is the coverage capacity of Snowcare Damp Protect-Dual?",
        answer: "• Exterior Horizontal Surfaces (Terraces - 3 coats): 9 to 11 sq. ft. per liter.\n• Exterior Fresh Vertical Surfaces: 20 to 25 sq. ft. per liter.\n• Exterior Repainting Vertical Surfaces: 30 to 35 sq. ft. per liter.\n• Interior Surfaces: 40 to 45 sq. ft. per liter per coat."
      },
      {
        question: "What drying times should be expected?",
        answer: "Surface dry time is 30 minutes, touch dry time is 6 to 8 hours, and the recommended recoating interval between coats is 4 to 6 hours for exterior and 6 to 8 hours for interior applications."
      },
      {
        question: "What container sizes are available?",
        answer: "Available pack sizes are 1 L, 4 L, 10 L, and 20 L containers."
      },
      {
        question: "Is Snowcare Damp Protect-Dual eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },
  {
    id: "terrace-seal-chill",
    name: "Terrace Seal & Chill",
    slug: "terrace-seal-chill",
    categorySlug: "waterproofing-paints",
    categoryName: "Waterproofing Paints",
    range: "Roof & Terrace Waterproofing",
    tagline: "PU-Acrylic Hybrid Thermal Insulation & Roof Waterproofing Membrane",
    description: "A high-performance exterior water-proofing solution that uses a special PU-acrylic hybrid polymer system that gives your walls superior flexibility and long-lasting protection. Specially developed to give you dual benefits of water ingress prevention and reduced heat absorption, this forms a seamless resilient barrier that protects your walls from harsh weather conditions.",
    features: [
      "Anti-carbonation properties",
      "Self-priming",
      "Anti algal and anti fungal",
      "Water ingress resistance",
      "10-year waterproofing warranty",
    ],
    finish: "PU-Hybrid Resilient Membrane",
    warranty: "10 Years",
    image: "/products/waterproof/snowcare-terracesealandchill.png",
    bgImage: "/products/waterproof-bg/snowcare-terracesealandchill.png",
    stageBg: "#a5d2d6",
    pdf: "/pdf/Terrace-SealChill.pdf",
    faqs: [
      {
        question: "What is Snowcare Terrace Seal & Chill and what technology does it use?",
        answer: "Snowcare Terrace Seal & Chill is a liquid-applied, fiber-reinforced elastomeric waterproofing membrane formulated using a PU-acrylic hybrid polymer system and advanced nano-fiber technology. It provides up to 2 mm crack-bridging ability, anti-carbonation protection, solar heat reduction, and a 10-year waterproofing warranty."
      },
      {
        question: "What is the application procedure and dilution ratio for horizontal terrace surfaces?",
        answer: "A 3-coat system is applied:\n• 1st Coat (Self-Priming): Dilute 1000 ml of paint with 500 ml of clean water (50% dilution) and allow 4 hours drying time.\n• 2nd Coat: Apply undiluted and allow 4–6 hours drying time.\n• 3rd Coat: Apply undiluted and allow 4–6 hours drying time."
      },
      {
        question: "What is the application process for vertical exterior walls?",
        answer: "Apply:\n• 1st Coat (Self-Priming): Dilute 1000 ml of paint with 500 ml of clean water (50% dilution) and allow 4 hours drying time.\n• 2nd Coat: Apply undiluted and allow 4–6 hours drying time.\n• Topcoat (Optional): Apply 2 coats of compatible topcoat emulsions (such as Uni-Glosss, Pentasia, or Snowcryl) allowing 4–6 hours between coats."
      },
      {
        question: "What is the coverage capacity of Snowcare Terrace Seal & Chill?",
        answer: "• Horizontal Surfaces (Terraces - 3 coat system): 10 to 12 sq. ft. per liter.\n• Vertical Surfaces (2 coat system): 17 to 20 sq. ft. per liter."
      },
      {
        question: "What are the drying times for Snowcare Terrace Seal & Chill?",
        answer: "Surface dry time is 30 minutes, touch dry time is 4 to 6 hours, and the recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What surface preparation is required before application?",
        answer: "New masonry surfaces must cure completely for at least 28 days. Ensure the surface is clean and free of loose paint, dust, oil, or fungal growth (clean with wire brushing and water). Fill cracks up to 2mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Are there important precautions to follow during application?",
        answer: "Rectify rising dampness and structural defects prior to coating. Protect the applied membrane from direct sunlight, rain, or maltreatment during the green/drying stage. End-to-end continuous application rather than partial/patch application is recommended."
      },
      {
        question: "What pack sizes are available?",
        answer: "Container sizes available are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "Is Snowcare Terrace Seal & Chill eco-friendly and low in VOCs?",
        answer: "Yes, it qualifies for GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is free from toxic heavy metals (lead, mercury, chromium VI, cadmium) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      }
    ]
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
    range: "Exterior & Dual-Action Primers",
    tagline: "Water-Based Dual Exterior & Interior Emulsion Undercoat",
    description: "A water-based wall coating suitable for application on interior and exterior walls and surfaces, as an undercoat to emulsions to enhance the finish and appearance of emulsion coats.",
    features: [
      "Improves appearance of coats",
      "Excellent opacity",
      "Prevents peeling of coats",
      "Quick drying and recoatable",
      "Excellent adhesion",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Smooth White Matt",
    warranty: "Standard",
    image: "/products/primers/snowcem-ext-int-primer.png",
    bgImage: "/products/primers-bg/snowcem-ext-int-primer.png",
    stageBg: "#a1a5b7",
    pdf: "/pdf/Snowcem-Ext-Int-Primer.pdf",
    faqs: [
      {
        question: "What is Snowcem EXT/INT Primer and where can it be applied?",
        answer: "Snowcem EXT/INT Primer is a water-based acrylic emulsion wall coating designed as an undercoat for both interior and exterior emulsions. It provides excellent opacity, whiteness, topcoat adhesion, and prevents the peeling off of emulsion paints."
      },
      {
        question: "What is the recommended dilution ratio for Snowcem EXT/INT Primer?",
        answer: "Dilute 1 liter of primer with 500 ml of clean potable water. Do not over-dilute, use thinners, or add colorants/stainers. Once thinned, the paint should be used within 24 hours."
      },
      {
        question: "What is the coverage area and available pack sizes?",
        answer: "It offers an approximate coverage of 120 to 140 sq. ft. per liter per coat on smooth, non-porous surfaces. Available container sizes are 1 L, 4 L, 10 L, 20 L, and 26 L."
      },
      {
        question: "What is the drying time and recoating interval?",
        answer: "It becomes touch dry in 30 minutes, with a hard dry time of 4 to 6 hours. The recommended recoating interval is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Sand the plaster surface using 180 emery paper and wipe clean.\nStep 2: Apply 1 coat of Snowcem EXT/INT Primer and allow 4–6 hours drying time.\nStep 3: Apply Snowcare Wall Putty (2 coats, overnight drying).\nStep 4: Apply a 2nd coat of Snowcem EXT/INT Primer (allow 4–6 hours drying time).\nStep 5: Apply 2 coats of topcoat exterior or interior emulsion paint."
      },
      {
        question: "How should masonry surfaces be prepared prior to priming?",
        answer: "New masonry surfaces must be allowed to cure completely for at least 28 days. Clean dust, oil, and loose particles thoroughly. For algal or fungal growth, wash with Snowcem Bio-Wash before applying primer. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcem EXT/INT Primer eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building parameters. It contains low VOC levels (< 40 g/L / 13%) and is free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life of this primer?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place."
      }
    ]
  },
  {
    id: "special-cw-primer",
    name: "Special (CW) Primer",
    slug: "special-cw-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    range: "Exterior & Dual-Action Primers",
    tagline: "Acrylic Co-Polymer Exterior & Wooden Undercoat Primer",
    description: "A specially formulated primer that can be effectively used as an undercoat on both concrete as well as wooden surfaces.",
    features: [
      "Excellent adhesion",
      "Alkali resistant",
      "Improves appearance of coats",
      "Excellent opacity",
      "Prevents peeling of coats",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Smooth Matt Sealer",
    warranty: "Standard",
    image: "/products/primers/snowcem-primer-cw.png",
    bgImage: "/products/primers-bg/snowcem-primer-cw.png",
    stageBg: "#b8cca1",
    pdf: "/pdf/SpecialCW-Primer.pdf",
    faqs: [
      {
        question: "What is Snowcem Special (CW) Primer and where can it be used?",
        answer: "Snowcem Special (CW) Primer is an acrylic co-polymer emulsion-based exterior primer designed for undercoating both concrete and wooden surfaces. It provides excellent opacity, alkali resistance, and topcoat adhesion while preventing topcoat peeling."
      },
      {
        question: "What is the mixing and dilution ratio for Snowcem Special (CW) Primer?",
        answer: "Dilution depends on the surface substrate:\n• Concrete Surfaces: Dilute 1 liter of primer with 500 ml of clean potable water.\n• Wooden Surfaces: Dilute 1 liter of primer with 200 ml of clean potable water.\nNote: Do not over-dilute, use thinners, or add colorants/stainers. Thinned paint must be used within 24 hours."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "On smooth, non-porous surfaces, it offers an approximate coverage of 90 to 110 sq. ft. per liter per coat. Available pack sizes are 1 L, 4 L, 10 L, and 20 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It becomes touch dry in 30 minutes, with a hard dry time of 4 to 6 hours. The recommended recoating period is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application process?",
        answer: "Step 1: Sand the surface using 180 emery paper and wipe clean.\nStep 2: Apply 1 coat of Snowcem Special (CW) Primer and let it dry for 4–6 hours.\nStep 3: Apply Snowcare Wall Putty (overnight drying).\nStep 4: Apply a 2nd coat of Snowcem Special (CW) Primer and allow 4–6 hours drying time.\nStep 5: Apply 2 coats of topcoat exterior emulsion paint."
      },
      {
        question: "How should masonry surfaces be prepared before applying the primer?",
        answer: "Fresh masonry must cure completely for at least 28 days. Clean dust, oil, and loose particles thoroughly. For fungal or algal growth, wash with Snowcem Bio-Wash prior to priming. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcem Special (CW) Primer eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA / LEED Green Building parameters. It has low VOC levels (< 40 g/L / 13%) and is free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life of this primer?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place."
      }
    ]
  },
  {
    id: "universal-primer",
    name: "Universal Primer",
    slug: "universal-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    range: "Exterior & Dual-Action Primers",
    tagline: "Water-Based Acrylic Co-Polymer Universal Undercoat Primer",
    description: "A water-based wall coating based on acrylic co-polymer emulsions, ideal for use on both exterior as well as interior walls as an undercoat.",
    features: [
      "Improves appearance of coats",
      "Excellent opacity",
      "Prevents peeling of coats",
      "Excellent adhesion",
      "Quick drying and recoatable",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Smooth Matt Sealer",
    warranty: "Standard",
    image: "/products/primers/universal-primer.png",
    bgImage: "/products/primers-bg/universal-primer.png",
    stageBg: "#e3ac9e",
    pdf: "/pdf/Universal-Primer.pdf",
    faqs: [
      {
        question: "What is Snowcem Universal Primer and where can it be applied?",
        answer: "Snowcem Universal Primer is an acrylic co-polymer water-based wall coating suitable for use as an undercoat on both interior and exterior walls before applying topcoat emulsions. It provides excellent opacity, whiteness, superior topcoat adhesion, and prevents topcoat peeling."
      },
      {
        question: "What is the recommended dilution ratio for Snowcem Universal Primer?",
        answer: "Dilute 1 liter of Universal Primer with 0.5 liters (500 ml) of clean potable water. Do not over-dilute, use thinners, or add colorants/stainers. Once thinned, the paint must be used within 24 hours."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "On a smooth surface with no suction, it offers an approximate coverage of 100 to 120 sq. ft. per liter per coat. Available container sizes are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating interval?",
        answer: "It becomes touch dry in 30 minutes, with a hard dry time of 4 to 6 hours. The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Sand the plaster surface using 180 emery paper and wipe clean.\nStep 2: Apply 1 coat of Snowcem Universal Primer and allow 4–6 hours drying time.\nStep 3: Apply Snowcare Wall Putty (2 coats, overnight drying).\nStep 4: Apply a 2nd coat of Snowcem Universal Primer (allow 4–6 hours drying time).\nStep 5: Apply 2 coats of topcoat exterior or interior emulsion paint."
      },
      {
        question: "How should masonry surfaces be prepared prior to priming?",
        answer: "New masonry surfaces must be allowed to cure completely for at least 28 days. Clean dirt, oil, grease, and loose particles thoroughly. For fungal or algal growth, wash with Snowcem Bio-Wash prior to priming. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcem Universal Primer eco-friendly and safe for green buildings?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It contains low VOC levels (< 40 g/L / 13%) and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life of this primer?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place."
      }
    ]
  },
  {
    id: "snowpearl-primer",
    name: "Snowpearl Primer",
    slug: "snowpearl-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    range: "Interior Wall Primers",
    tagline: "Acrylic Co-Polymer Water-Based Interior Undercoat Primer",
    description: "A specially formulated primer based on acrylic co-polymer, developed specifically for interior walls, as to be applied as a priming coat to both old and new surfaces before the application of the finish coat.",
    features: [
      "Easy brushing and excellent coverage",
      "Alkali resistant",
      "Quick drying",
      "Good sealing properties",
      "Excellent opacity",
      "Free from heavy metals like lead and chromium",
    ],
    finish: "Smooth Matt Sealer",
    warranty: "Standard",
    image: "/products/primers/interior-primer.png",
    bgImage: "/products/primers-bg/interior-primer.png",
    stageBg: "#d09ec2",
    pdf: "/pdf/Snowpearl-Primer.pdf",
    faqs: [
      {
        question: "What is Snowpearl Interior Primer and where should it be applied?",
        answer: "Snowpearl Interior Primer is an acrylic co-polymer water-based undercoat designed exclusively for interior walls. It serves as a sealing and priming coat for both old and new plastered surfaces before applying interior finish coats."
      },
      {
        question: "What is the recommended dilution ratio for Snowpearl Interior Primer?",
        answer: "Dilute 1 liter of primer with 500 ml of clean potable water. Do not over-dilute, use thinners, or add colorants/stainers. Thinned primer must be used within 24 hours."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "On smooth, non-suction surfaces, it covers approximately 150 to 170 sq. ft. per liter per coat. Available pack sizes are 1 L, 4 L, 10 L, and 20 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It becomes touch dry in 20 minutes, with a hard dry time of 4 to 6 hours. The recommended recoating interval is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Sand the plaster surface with 180 emery paper and wipe clean.\nStep 2: Apply 1 coat of Snowpearl Interior Primer and allow 4–6 hours drying time.\nStep 3: Apply Snowcare Wall Putty (2 coats, overnight drying).\nStep 4: Apply a 2nd coat of Snowpearl Interior Primer (allow 4–6 hours drying time).\nStep 5: Apply 2 coats of topcoat interior emulsion paint."
      },
      {
        question: "How should masonry surfaces be prepared before priming?",
        answer: "Fresh plaster must cure completely for at least 28 days. Ensure the surface is free of dust, oil, grease, or powdery residue. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowpearl Interior Primer eco-friendly and safe?",
        answer: "Yes, it qualifies for GRIHA and LEED Green Building criteria. It contains low VOCs (< 40 g/L / 13%) and is free from toxic heavy metals (lead, chromium VI, cadmium, mercury) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      },
      {
        question: "What is the shelf life of this primer?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place."
      }
    ]
  },
  {
    id: "snowcare-sealer-primer",
    name: "Snowcare Sealer & Primer",
    slug: "snowcare-sealer-primer",
    categorySlug: "primers",
    categoryName: "Primers",
    range: "Specialized Sealer & Waterproof Primers",
    tagline: "Penetrative Polymer Anti-Alkali & Damp Resistant Sealer",
    description: "An acrylic primer that can be used on interior and exterior walls, protect them from alkali dampness, and efflorescence. Made with penetrative polymers that adhere to the surface, it helps ensure an improved water seepage resistance.",
    features: [
      "Alkali resistant",
      "Anti algal and anti-fungal",
      "Damp resistant",
      "Free from heavy metals like lead, chromium, and mercury",
      "Excellent opacity and whiteness",
    ],
    finish: "Clear Sealing Base",
    warranty: "Standard",
    image: "/products/primers/snowcem-sealerandprimer.png",
    bgImage: "/products/primers-bg/snowcem-sealerandprimer.png",
    stageBg: "#af8fcf",
    pdf: "/pdf/Snowcare Sealer & Primer.pdf",
    faqs: [
      {
        question: "What is Snowcare Sealer & Primer and where can it be applied?",
        answer: "Snowcare Sealer & Primer is a high-quality acrylic primer made of penetrative polymers. It can be applied on cement plaster, concrete, other masonry, and puttied surfaces across both interior and exterior walls to protect against alkali, dampness, and efflorescence while enhancing water seepage resistance."
      },
      {
        question: "What is the recommended dilution ratio for Snowcare Sealer & Primer?",
        answer: "Dilute 1 liter of primer with 500 ml of clean potable water for concrete surfaces. Do not over-dilute or add any stainers or colorants. The thinned primer should be used within 24 hours."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "On a smooth surface with no suction, it provides an approximate coverage of 100 to 120 sq. ft. per liter per coat. Pack sizes available are 1 L, 4 L, 10 L, and 20 L containers."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It becomes touch dry in 30 minutes, with a hard dry time of 4 to 6 hours. The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Sand the surface using 180 emery paper and wipe clean.\nStep 2: Apply Snowcare Wall Putty (optional, overnight drying).\nStep 3: Apply 1 coat of Snowcare Sealer & Primer (4–6 hours drying time).\nStep 4: Apply topcoat exterior or interior emulsion paint."
      },
      {
        question: "How should masonry surfaces be prepared prior to application?",
        answer: "Fresh plaster must cure completely for a minimum of 28 days. Clean all dirt, dust, and loose material thoroughly. If algae or fungal growth is present, clean using Snowcem Bio-Wash prior to priming. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcare Sealer & Primer eco-friendly and safe?",
        answer: "Yes, it qualifies for GRIHA and LEED Green Building parameters. It has low VOC levels (< 40 g/L / 13%) and is free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ],
  },
  {
    id: "snowcem-plus-duo",
    name: "Snowcem Plus Duo",
    slug: "snowcem-plus-duo",
    categorySlug: "primers",
    categoryName: "Primers",
    range: "Specialized Sealer & Waterproof Primers",
    tagline: "Economical Acrylic Interior & Exterior Alkali-Resistant Primer",
    description: "A specially formulated economically friendly acrylic primer formulated to resist alkali and dampness, on both interior and exterior walls.",
    features: [
      "Eco-friendly",
      "Excellent adhesion",
      "Alkali resistant",
      "Free from heavy metals like lead, chromium, and mercury",
      "Excellent opacity and whiteness",
    ],
    finish: "Smooth Matt Sheen",
    warranty: "3 Years",
    image: "/products/primers/snowcem-plus-duo.png",
    bgImage: "/products/primers-bg/snowcem-plus-duo.png",
    stageBg: "#9ce1d4",
    pdf: "/pdf/Snowcem Plus DUO PRIMER TDS.pdf",
    faqs: [
      {
        question: "What is Snowcem Plus Duo Primer and where can it be used?",
        answer: "Snowcem Plus Duo Primer is an economical acrylic primer formulated for both interior and exterior surfaces. It can be applied on cement plaster, concrete, masonry, and puttied surfaces to protect against alkali and dampness while improving the appearance of the topcoat."
      },
      {
        question: "What is the recommended mixing and dilution ratio for Snowcem Plus Duo Primer?",
        answer: "Dilute 1 liter of primer with 1000 ml (1:1 ratio) of clean potable water for concrete surfaces. Do not over-dilute or add any stainers or colorants. The thinned primer should be used within 24 hours."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "On a smooth surface with no suction, it offers an approximate coverage of 100 to 120 sq. ft. per liter per coat. Container sizes available are 1 L, 4 L, 10 L, and 20 L."
      },
      {
        question: "What is the drying time and recoating period?",
        answer: "It becomes touch dry in 30 minutes, with a hard dry time of 4 to 6 hours. The recommended recoating interval between coats is 4 to 6 hours."
      },
      {
        question: "What is the step-by-step application procedure?",
        answer: "Step 1: Sand the surface using 180 emery paper and wipe clean.\nStep 2: Apply Snowcare Wall Putty (optional, overnight drying).\nStep 3: Apply 1 coat of Snowcem Plus Duo Primer (4–6 hours drying time).\nStep 4: Apply 2 coats of topcoat exterior or interior emulsion paint."
      },
      {
        question: "How should masonry surfaces be prepared before priming?",
        answer: "Fresh masonry must cure completely for at least 28 days. Clean all dust, loose plaster, and powdery residue. Wash algal or fungal growth with Snowcem Bio-Wash prior to application. Fill cracks up to 3mm using Snowcare Wall Putty or a 1:3 mix of White Cement and fine sand."
      },
      {
        question: "Is Snowcem Plus Duo Primer eco-friendly and safe?",
        answer: "Yes, it satisfies GRIHA and LEED Green Building criteria. It has low VOC levels (< 40 g/L / 13%) and is free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      },
      {
        question: "What is the shelf life of this primer?",
        answer: "It has a shelf life of 3 years when stored in airtight containers in a cool, dry place."
      }
    ]
  },

  // ==========================================
  // CEMENT PAINTS (3 PRODUCTS)
  // ==========================================
  {
    id: "snowcem-plus-cement-paint",
    name: "Snowcem Plus Cement Paint",
    slug: "snowcem-plus-cement-paint",
    range: "Premium Cement Paint",
    categorySlug: "cement-paints",
    categoryName: "Cement Paints",
    tagline: "Premium Waterproof Cement Paint",
    description: "A premium waterproof cement paint developed for easy application and extra covering capacity, offering protection from the impact of water and moisture.",
    features: [
      "High strength",
      "Breathable paint",
      "Reflects heat",
      "Economical protection",
      "Water repellant",
      "Great coverage",
    ],
    finish: "Durable Waterproof Matt",
    warranty: "3 Years",
    image: "/products/cement-paints/snowcem-plus.png",
    bgImage: "/products/cement-paints-bg/snowcem-plus.png",
    stageBg: "#97a7c3",
    pdf: "/pdf/Snowcemplus-Cement-Paint.pdf",
    faqs: [
      {
        question: "What is Snowcem Plus and what surfaces can it be applied on?",
        answer: "Snowcem Plus is a white Portland cement-based premium waterproof cement paint. It can be applied on concrete surfaces, wall/fiberboards, asbestos cement sheets, cement/lime/sand renderings, rough cast & pebbledash, bricks, concrete blocks, and decorative precast units."
      },
      {
        question: "What is the mixing ratio for Snowcem Plus?",
        answer: "Mix equal volumes of Snowcem Plus powder and fresh clean water (1:1 ratio by volume) in a clean container and stir well. No further dilution or two-stage mixing is required."
      },
      {
        question: "What is the coverage capacity of Snowcem Plus?",
        answer: "Coverage varies depending on substrate texture and porosity:\n• In-situ Concrete: 64–81 sq. ft./kg\n• Wall & Fiberboards: 55–90 sq. ft./kg\n• Rendering Cement/Sand: 44–64 sq. ft./kg\n• Suitable Brickwork: 36.2–64 sq. ft./kg\n• Concrete Blocks: 35.2–60 sq. ft./kg\n• Rough Cast & Pebbledash: 22–36 sq. ft./kg"
      },
      {
        question: "What is the application sequence and curing process?",
        answer: "Step 1: Pre-wet the surface with clean water and wait 30 minutes.\nStep 2: Apply 1 coat of Cemprover Cement Primer (if applicable, dry for 6–8 hours).\nStep 3: Apply the 1st coat of Snowcem Plus.\nStep 4: Wait 12–18 hours, then fine spray water to cure the 1st coat.\nStep 5: Apply the 2nd coat of Snowcem Plus.\nStep 6: Wait 12–18 hours, then perform 1 or 2 water cures with a fine spray to allow complete setting."
      },
      {
        question: "What surfaces are NOT suitable for direct application of Snowcem Plus?",
        answer: "Snowcem Plus cannot be applied directly over surfaces containing gypsum plaster, chunam, lime wash, oil paint, varnish, oil-bound distemper, or emulsion paints. For chunam/lime wash, remove the old coating completely with a wire brush, wash down, and prime with Cemprover before painting."
      },
      {
        question: "Is water curing mandatory for Snowcem Plus?",
        answer: "Yes, proper water curing with a fine water spray after the 1st and 2nd coats is required for the paint to gain full strength and prevent flaking. Do NOT use saline water for curing."
      },
      {
        question: "What packaging sizes are available for Snowcem Plus?",
        answer: "It is supplied in 1 kg poly pouches and 5 kg and 25 kg laminated synthetic sacks featuring a genuine Snowcem Paints hologram."
      },
      {
        question: "Is Snowcem Plus eco-friendly and VOC-free?",
        answer: "Yes, it satisfies GRIHA / LEED Green Building criteria. It contains ZERO VOCs and is free from toxic heavy metals (lead, mercury, chromium VI, cadmium) and hazardous chemicals (formaldehyde, benzene, phenolic compounds)."
      }
    ]
  },
  {
    id: "cemcolour",
    name: "Cemcolour",
    slug: "cemcolour",
    range: "Economy Cement Paint",
    categorySlug: "cement-paints",
    categoryName: "Cement Paints",
    tagline: "Economic Colour Coating Choice for Exterior Walls",
    description: "An economic colour coating choice for exterior walls, formulated for easy application. Its specially developed formula makes Cemcolour resistant to the effects of heat, light, and water.",
    features: [
      "Economic colour coating",
      "Breathable paint",
      "Prevents peeling or flaking",
      "Water repellant",
      "Reflects heat and light",
    ],
    finish: "Economical Waterproof Matt",
    warranty: "3 Years",
    image: "/products/cement-paints/cemcolour.png",
    bgImage: "/products/cement-paints-bg/cemcolour.png",
    stageBg: "#e9a3b3",
    pdf: "/pdf/Cemcolour.pdf",
    faqs: [
      {
        question: "What is Snowcem Cemcolour and what are its key properties?",
        answer: "Cemcolour is an economy white Portland cement-based waterproof colour coating for exterior walls. It features heat- and light-resistant pigments, requires single-stage water mixing, and serves as an excellent heat reflector while preventing peeling or flaking when properly applied and cured."
      },
      {
        question: "What is the recommended mixing ratio for Cemcolour?",
        answer: "Mix equal parts of fresh water and Cemcolour powder (1:1 ratio by volume) in a clean container and stir until a uniform consistency is achieved. No further dilution is required."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "Coverage capacity is approximately 46 to 66 sq. ft. per kg per coat on cement/sand renderings. It is available in 25 kg laminated synthetic sacks featuring a genuine Snowcem Paints hologram."
      },
      {
        question: "What is the drying time and curing requirement for Cemcolour?",
        answer: "Drying time is 6 to 8 hours, with a recoating interval of 12 to 18 hours. Water curing using a fine spray after both the 1st and 2nd coats is essential for full curing and setting. Do not use saline water for curing."
      },
      {
        question: "What is the complete application procedure?",
        answer: "Step 1: Pre-wet the surface with clean water and allow it to stand for 30 minutes.\nStep 2: Apply 1 coat of Cemprover Cement Primer (if required, dry for 6–8 hours).\nStep 3: Apply the 1st coat of Cemcolour (brush or spray).\nStep 4: Wait 12–18 hours, then perform fine spray water curing.\nStep 5: Apply the 2nd coat of Cemcolour.\nStep 6: Wait 12–18 hours, then perform 1 or 2 fine spray water cures to complete setting."
      },
      {
        question: "What surfaces are NOT suitable for direct application of Cemcolour?",
        answer: "Cemcolour cannot be applied directly over gypsum plaster, chunam, lime wash, oil paint, varnish, oil-bound distemper, or emulsion paints. On chunam/lime wash surfaces, wire brush the old layer off completely, wash down with water, and prime with Cemprover prior to application."
      },
      {
        question: "How long should new plaster cure before applying Cemcolour?",
        answer: "New masonry surfaces must be allowed to cure completely for a minimum of 28 days (8 weeks recommended for optimal results) before painting."
      },
      {
        question: "Is Cemcolour eco-friendly and VOC-free?",
        answer: "Yes, it meets GRIHA and LEED Green Building criteria. It contains ZERO VOCs and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },
  {
    id: "permacem",
    name: "Permacem",
    slug: "permacem",
    range: "Economy Cement Paint",
    categorySlug: "cement-paints",
    categoryName: "Cement Paints",
    tagline: "Economic Waterproof Colour Coating for Exterior Walls",
    description: "An economic colour coating choice for exterior walls, formulated for easy application. Its specially developed formula makes Permacem resistant to the effects of heat, light, and water.",
    features: [
      "Economic colour coating",
      "Breathable paint",
      "Improves appearance",
      "Easy application",
      "Reflects heat",
    ],
    finish: "Economical Waterproof Matt",
    warranty: "3 Years",
    image: "/products/cement-paints/permacem.png",
    bgImage: "/products/cement-paints-bg/permacem.png",
    stageBg: "#f4c9b3",
    pdf: "/pdf/Permacem.pdf",
    faqs: [
      {
        question: "What is Snowcem Permacem and what are its key properties?",
        answer: "Permacem is an economy cement-based waterproof colour coating for exterior walls, formulated with white Portland cement and heat- and light-resistant pigments. It requires only single-stage water mixing and provides a breathable, heat-reflective, and durable finish."
      },
      {
        question: "What is the mixing ratio for Permacem?",
        answer: "Add equal volumes of Permacem powder and fresh clean water (1:1 ratio by volume) in a clean container and stir thoroughly to get a uniform consistency. No further dilution is required."
      },
      {
        question: "What is the coverage area and what pack sizes are available?",
        answer: "For cement/sand renderings, the approximate coverage capacity is 45 to 65 sq. ft. per kg per coat. It is supplied in 25 kg laminated synthetic sacks bearing an official Snowcem Paints hologram."
      },
      {
        question: "What is the drying time and curing requirement for Permacem?",
        answer: "Drying time is 6 to 8 hours, with a recoating interval of 12 to 18 hours. Proper water curing using a fine water spray after both the 1st and 2nd coats is essential for full setting. Do not use saline water for curing."
      },
      {
        question: "What is the complete application process?",
        answer: "Step 1: Pre-wet the surface with clean water and wait 30 minutes.\nStep 2: Apply 1 coat of Cemprover Cement Primer (if required, dry for 6–8 hours).\nStep 3: Apply the 1st coat of Permacem Waterproof Cement Paint.\nStep 4: Wait 12–18 hours, then fine spray water to cure the 1st coat.\nStep 5: Apply the 2nd coat of Permacem Waterproof Cement Paint.\nStep 6: Wait 12–18 hours, then perform 1 or 2 water cures to complete setting."
      },
      {
        question: "What surfaces are NOT suitable for direct application of Permacem?",
        answer: "Permacem cannot be applied directly over surfaces containing gypsum plaster, chunam, lime washes, oil paints, varnishes, oil-bound distempers, or emulsion paints. On chunam/lime wash, remove the old layer completely with a wire brush, wash down, and apply Cemprover primer before painting."
      },
      {
        question: "How long should new masonry cure before applying Permacem?",
        answer: "New plaster should be 28 days (or 8 weeks for best results) old, properly cured, dry, and well-set before application."
      },
      {
        question: "Is Permacem eco-friendly and VOC-free?",
        answer: "Yes, it meets GRIHA and LEED Green Building criteria. It contains ZERO VOCs and is completely free from lead, mercury, chromium (VI), cadmium, formaldehyde, benzene, and phenolic compounds."
      }
    ]
  },

  // ==========================================
  // PUTTY (2 PRODUCTS)
  // ==========================================
  {
    id: "wall-putty",
    name: "Wall Putty",
    slug: "wall-putty",
    range: "Cement-Based Basecoat",
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
    range: "Ready-to-Use Paste Plaster",
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
    range: "Anti-Fungal Pre-Treatment",
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
    range: "Liquid Concrete Hardener",
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
    range: "Cement Primer Liquid",
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
    range: "Acrylic Co-Polymer Emulsion Distemper",
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
    range: "Architectural Scratch Finish",
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
        answer: "It is supplied in 30 kg sacks featuring a genuine Snowcem Paints hologram."
      }
    ]
  },
];
