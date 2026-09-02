export interface ColorItem {
  name: string;
  hex: string;
  role?: string; // e.g. "Primary Wall", "Secondary / Trim", "Accent"
}

export interface ColorCombo {
  id: string;
  title: string; // e.g. "Terracotta + Cream + Olive"
  colors: ColorItem[];
  imagePath: string; // e.g. "/spaces/living-room/boho-1.jpg"
  description: string;
  moodTag: string;
  bestFor: string;
}

export interface RoomTheme {
  id: string;
  name: string; // e.g. "Boho", "French", "Italian Style"
  tagline: string;
  description: string;
  combos: ColorCombo[];
}

export interface RoomSpaceData {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  themes: RoomTheme[];
}

export const LIVING_ROOM_THEMES_DATA: RoomSpaceData = {
  slug: "living-room",
  name: "Living Room",
  heroTitle: "Living Room Colour Themes & Combinations",
  heroSubtitle:
    "Explore designer-curated 3-colour harmony palettes across Boho, French, Italian, Simple Plain, and Modern Minimalist aesthetics for your living space.",
  themes: [
    {
      id: "boho",
      name: "Boho",
      tagline: "Earthy, Eclectic & Organic Warmth",
      description:
        "Infuses free-spirited energy with rich earthy clays, organic greens, and warm textural neutrals.",
      combos: [
        {
          id: "boho-combo-1",
          title: "Terracotta + Cream + Olive",
          imagePath: "/spaces/living-room/boho-1.jpg",
          description: "A warm grounding terracotta focal wall balanced with airy cream and soothing olive green trims.",
          moodTag: "Earthy & Warm",
          bestFor: "Feature walls, plants & natural wicker decor",
          colors: [
            { name: "Terracotta", hex: "#C86D51", role: "Accent Wall" },
            { name: "Cream", hex: "#FFFDD0", role: "Primary Wall" },
            { name: "Olive", hex: "#708238", role: "Secondary / Trim" },
          ],
        },
        {
          id: "boho-combo-2",
          title: "Mustard + Beige + Rust",
          imagePath: "/spaces/living-room/boho-2.jpg",
          description: "Sun-drenched mustard and rust accents creating high-warmth bohemian vitality alongside soft beige.",
          moodTag: "Vibrant & Cozy",
          bestFor: "Living rooms with brass accents and warm lighting",
          colors: [
            { name: "Mustard", hex: "#E1AD01", role: "Accent Wall" },
            { name: "Beige", hex: "#DDC1A0", role: "Primary Wall" },
            { name: "Rust", hex: "#B7410E", role: "Trim / Feature" },
          ],
        },
        {
          id: "boho-combo-3",
          title: "Sage + Off-White + Brown",
          imagePath: "/spaces/living-room/boho-3.jpg",
          description: "A calming biophilic sage tone complemented by crisp off-white walls and deep walnut brown wood accents.",
          moodTag: "Calming & Natural",
          bestFor: "Nordic boho, indoor planters & linen furniture",
          colors: [
            { name: "Sage", hex: "#9CAF88", role: "Accent Wall" },
            { name: "Off-White", hex: "#FAF9F6", role: "Primary Wall" },
            { name: "Brown", hex: "#6E4A35", role: "Trim / Woodwork" },
          ],
        },
      ],
    },
    {
      id: "french",
      name: "French",
      tagline: "Romantic, Refined & Parisian Elegance",
      description:
        "Soft pastel tones, subtle aged patinas, and aristocratic neutral balances inspired by Parisian salons.",
      combos: [
        {
          id: "french-combo-1",
          title: "Ivory + Dusty Blue + Beige",
          imagePath: "/spaces/living-room/french-1.jpg",
          description: "Timeless Parisian grandeur featuring soft ivory walls, romantic dusty blue moldings, and warm beige textiles.",
          moodTag: "Regal & Serene",
          bestFor: "High ceilings, wall panel moldings & chandeliers",
          colors: [
            { name: "Ivory", hex: "#FFFFF0", role: "Primary Wall" },
            { name: "Dusty Blue", hex: "#8CA3B0", role: "Accent Wall" },
            { name: "Beige", hex: "#E6D7C3", role: "Trim / Accents" },
          ],
        },
        {
          id: "french-combo-2",
          title: "Sage + Cream + Soft Grey",
          imagePath: "/spaces/living-room/french-2.jpg",
          description: "French countryside serenity with whisper-soft sage, luminous cream, and gentle dove grey undertones.",
          moodTag: "Rustic Chic & Airy",
          bestFor: "French country decor, antique furniture & arches",
          colors: [
            { name: "Sage", hex: "#A3B19B", role: "Accent Wall" },
            { name: "Cream", hex: "#FDFBF7", role: "Primary Wall" },
            { name: "Soft Grey", hex: "#D1D5DB", role: "Trim / Detailing" },
          ],
        },
        {
          id: "french-combo-3",
          title: "Blush + Ivory + Taupe",
          imagePath: "/spaces/living-room/french-3.jpg",
          description: "A soft, romantic blush statement wall elevated with luminous ivory and sophisticated taupe contrast.",
          moodTag: "Warm Romance & Glow",
          bestFor: "Intimate seating areas and evening ambient lighting",
          colors: [
            { name: "Blush", hex: "#E8C5C8", role: "Accent Wall" },
            { name: "Ivory", hex: "#FAF5EF", role: "Primary Wall" },
            { name: "Taupe", hex: "#A19388", role: "Trims / Molding" },
          ],
        },
      ],
    },
    {
      id: "italian-style",
      name: "Italian Style",
      tagline: "Sun-Drenched Tuscan Warmth & Timeless Splendor",
      description:
        "Rich architectural earth hues, warm stucco palettes, and luxurious Mediterranean textures.",
      combos: [
        {
          id: "italian-combo-1",
          title: "Warm White + Olive + Terracotta",
          imagePath: "/spaces/living-room/italian-1.jpg",
          description: "Classic Tuscany charm with warm white walls, deep Tuscan olive accents, and authentic terracotta tones.",
          moodTag: "Tuscan Sun & Warmth",
          bestFor: "Stone textures, archways & wrought iron accents",
          colors: [
            { name: "Warm White", hex: "#FDFBF7", role: "Primary Wall" },
            { name: "Olive", hex: "#6B7A40", role: "Accent Wall" },
            { name: "Terracotta", hex: "#CC5A36", role: "Trim / Alcove" },
          ],
        },
        {
          id: "italian-combo-2",
          title: "Cream + Caramel + Deep Green",
          imagePath: "/spaces/living-room/italian-2.jpg",
          description: "Opulent Italian villa vibe pairing rich velvet green feature wall with buttery cream and smooth caramel.",
          moodTag: "Opulent & Regal",
          bestFor: "Leather sofas, marble flooring & warm oak finishes",
          colors: [
            { name: "Cream", hex: "#FBF6EB", role: "Primary Wall" },
            { name: "Caramel", hex: "#C68B59", role: "Secondary Wall" },
            { name: "Deep Green", hex: "#2C5E3B", role: "Accent Wall" },
          ],
        },
        {
          id: "italian-combo-3",
          title: "Beige + Rust + Charcoal",
          imagePath: "/spaces/living-room/italian-3.jpg",
          description: "Contemporary Milanese luxury blending neutral Italian beige with burnt rust energy and charcoal definition.",
          moodTag: "Modern Milan & Dynamic",
          bestFor: "Modern Italian furniture & geometric architecture",
          colors: [
            { name: "Beige", hex: "#D8C4B6", role: "Primary Wall" },
            { name: "Rust", hex: "#A44222", role: "Accent Wall" },
            { name: "Charcoal", hex: "#36454F", role: "Architectural Trims" },
          ],
        },
      ],
    },
    {
      id: "simple-plain-style",
      name: "Simple Plain Style",
      tagline: "Serene, Harmonious & Timeless Everyday Neutrality",
      description:
        "Effortlessly peaceful tones that create an expansive, clutter-free sanctuary for everyday living.",
      combos: [
        {
          id: "plain-combo-1",
          title: "White + Light Grey + Beige",
          imagePath: "/spaces/living-room/plain-1.jpg",
          description: "The ultimate universally appealing palette providing light diffusion, clean lines, and soft contrast.",
          moodTag: "Clean & Expansive",
          bestFor: "Open floor plans, apartments & daylight maximization",
          colors: [
            { name: "White", hex: "#FFFFFF", role: "Ceiling & Primary" },
            { name: "Light Grey", hex: "#E2E8F0", role: "Secondary Wall" },
            { name: "Beige", hex: "#EADBC8", role: "Accent Wall" },
          ],
        },
        {
          id: "plain-combo-2",
          title: "Cream + Taupe + Off-White",
          imagePath: "/spaces/living-room/plain-2.jpg",
          description: "Subtle monochromatic warmth that stays cozy through winter and soothing in bright summer sun.",
          moodTag: "Warm Neutral & Soft",
          bestFor: "Soft fabric couches, wooden floors & minimal art",
          colors: [
            { name: "Cream", hex: "#FFFDF0", role: "Primary Wall" },
            { name: "Taupe", hex: "#B3A398", role: "Accent Wall" },
            { name: "Off-White", hex: "#F7F6F2", role: "Ceiling / Trims" },
          ],
        },
        {
          id: "plain-combo-3",
          title: "Sand + Warm White + Greige",
          imagePath: "/spaces/living-room/plain-3.jpg",
          description: "Gentle coastal dunes feel with tactile sand shades, warm white base, and modern greige transitions.",
          moodTag: "Peaceful & Balanced",
          bestFor: "Spacious living rooms with organic neutral textures",
          colors: [
            { name: "Sand", hex: "#D4B996", role: "Accent Wall" },
            { name: "Warm White", hex: "#FBF9F5", role: "Primary Wall" },
            { name: "Greige", hex: "#B5ACA3", role: "Secondary Wall" },
          ],
        },
      ],
    },
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      tagline: "Sleek, High-Contrast & Understated Luxury",
      description:
        "Architectural discipline with sharp neutrals, deep charcoal accents, and tailored sophistication.",
      combos: [
        {
          id: "minimal-combo-1",
          title: "White + Greige + Charcoal",
          imagePath: "/spaces/living-room/minimalist-1.jpg",
          description: "Sharp gallery-white base highlighted by calm greige walls and dramatic charcoal accent focal points.",
          moodTag: "Architectural & Crisp",
          bestFor: "Contemporary condos, TV focal walls & track lighting",
          colors: [
            { name: "White", hex: "#FAFAFA", role: "Primary Wall" },
            { name: "Greige", hex: "#BEB5A9", role: "Secondary Wall" },
            { name: "Charcoal", hex: "#282C34", role: "Accent / Media Wall" },
          ],
        },
        {
          id: "minimal-combo-2",
          title: "Beige + Soft Grey + Black",
          imagePath: "/spaces/living-room/minimalist-2.jpg",
          description: "Japandi & Scandinavian minimalism balancing organic warm beige with modern slate grey and matte black trims.",
          moodTag: "Sleek Contrast & Zen",
          bestFor: "Black hardware, oak slats & low-profile furniture",
          colors: [
            { name: "Beige", hex: "#E7DEC8", role: "Primary Wall" },
            { name: "Soft Grey", hex: "#D6D3D1", role: "Secondary Wall" },
            { name: "Black", hex: "#18181B", role: "Graphic Trims / Accents" },
          ],
        },
        {
          id: "minimal-combo-3",
          title: "Off-White + Taupe + Deep Brown",
          imagePath: "/spaces/living-room/minimalist-3.jpg",
          description: "Warm modern luxury featuring warm off-white, plush taupe walls, and espresso deep brown statement trims.",
          moodTag: "Rich Minimal & Executive",
          bestFor: "Executive living rooms, walnut veneer & ambient led",
          colors: [
            { name: "Off-White", hex: "#F8F8F6", role: "Primary Wall" },
            { name: "Taupe", hex: "#9D8D80", role: "Secondary Wall" },
            { name: "Deep Brown", hex: "#4A3728", role: "Accent Feature" },
          ],
        },
      ],
    },
  ],
};
