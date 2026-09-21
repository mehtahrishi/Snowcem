export interface ColorItem {
  name: string;
  hex: string;
  role?: string; // e.g. "Primary Wall", "Secondary / Trim", "Accent"
}

export interface ColorCombo {
  id: string;
  title: string; // e.g. "Terracotta + Cream + Olive"
  colors: ColorItem[];
  imagePath: string; // e.g. "/spaces/bedroom/7.png"
  description: string;
  moodTag: string;
  bestFor: string;
}

export interface RoomTheme {
  id: string;
  name: string; // e.g. "Modern Minimalist", "Boho", "French", "Italian Style"
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

// ============================================================================
// 1. LIVING ROOM THEMES DATA (5 THEMES x 5 COMBOS EACH)
// ============================================================================
export const LIVING_ROOM_THEMES_DATA: RoomSpaceData = {
  slug: "living-room",
  name: "Living Room",
  heroTitle: "Living Room Colour Themes & Combinations",
  heroSubtitle:
    "Explore designer-curated 3-colour harmony palettes across Modern Minimalist, Boho, French, Italian, and Simple Plain aesthetics for your living space.",
  themes: [
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      tagline: "Serene Warmth, Biophilic Tones & Sculptural Sophistication",
      description:
        "Architectural clarity and understated luxury featuring warm alabaster, biophilic olive, sculptural peach, and bold earthen statements.",
      combos: [
        {
          id: "living-minimal-1",
          title: "Alabaster White + Oatmeal Greige + Blonde Oak",
          imagePath: "/spaces/living-room/5.png",
          description: "Warm light-infused Japandi minimalism featuring sun-warmed alabaster walls, curved oatmeal textiles, and subtle blond oak elements.",
          moodTag: "Serene Japandi & Ambient Light",
          bestFor: "Curved bouclé furniture, dried botanicals & airy morning light",
          colors: [
            { name: "Alabaster White", hex: "#EFE8DC", role: "Primary Wall" },
            { name: "Oatmeal Greige", hex: "#D9CDBF", role: "Secondary / Furniture" },
            { name: "Blonde Oak", hex: "#A88665", role: "Wood & Accent Trims" },
          ],
        },
        {
          id: "living-minimal-2",
          title: "Olive Green + Caramel Tan + Linen Cream",
          imagePath: "/spaces/living-room/2.png",
          description: "An earthy minimalist statement pairing deep calming olive with warm caramel leather tones and airy linen drapery.",
          moodTag: "Biophilic Warmth & Earthy Calm",
          bestFor: "Natural woven textures, potted botanicals & walnut accents",
          colors: [
            { name: "Muted Olive", hex: "#686C52", role: "Primary Accent Wall" },
            { name: "Caramel Tan", hex: "#A46D4B", role: "Furniture / Feature" },
            { name: "Linen Cream", hex: "#EBE4D5", role: "Trim & Drapery" },
          ],
        },
        {
          id: "living-minimal-3",
          title: "Pristine Off-White + Chartreuse Lime + Sandstone",
          imagePath: "/spaces/living-room/3.png",
          description: "Clean architectural minimalism elevated with a bold chartreuse focal point, framed by warm gallery-white walls and sand sculptures.",
          moodTag: "Contemporary High-Fashion Zen",
          bestFor: "Art collectors, architectural statement furniture & gallery daylight",
          colors: [
            { name: "Pristine Off-White", hex: "#E8E3DC", role: "Primary Wall" },
            { name: "Chartreuse Lime", hex: "#C8CE4B", role: "Focal Accent" },
            { name: "Sandstone Greige", hex: "#BFB09F", role: "Floor & Sculptures" },
          ],
        },
        {
          id: "living-minimal-4",
          title: "Dusty Peach + Terracotta Rose + Deep Burgundy",
          imagePath: "/spaces/living-room/4.png",
          description: "Soft sculptural minimalism embracing warm tonal blush pinks, textured rose seating, and deep wine accents in gentle ambient light.",
          moodTag: "Warm Monochromatic Glow",
          bestFor: "Intimate lounge spaces, sculptural pendant lamps & evening relaxation",
          colors: [
            { name: "Dusty Peach", hex: "#CFA08D", role: "Primary Wall" },
            { name: "Terracotta Rose", hex: "#B67A6B", role: "Accent Seating" },
            { name: "Deep Burgundy", hex: "#59282C", role: "Accent Table / Trim" },
          ],
        },
        {
          id: "living-minimal-5",
          title: "Terracotta Rust + Marigold Gold + Oatmeal Linen",
          imagePath: "/spaces/living-room/6.png",
          description: "Deep earthen warmth meets minimalist discipline with a burnt rust backdrop, energetic marigold cushions, and soothing oatmeal linen seating.",
          moodTag: "Rich Earth Vitality & Warmth",
          bestFor: "Spacious statement living rooms with warm lighting and natural wood accents",
          colors: [
            { name: "Terracotta Rust", hex: "#BA5728", role: "Focal Accent Wall" },
            { name: "Marigold Gold", hex: "#DB981D", role: "Pillows & Accents" },
            { name: "Oatmeal Linen", hex: "#CCC2B2", role: "Sofa & Primary Base" },
          ],
        },
      ],
    },
    {
      id: "boho",
      name: "Boho",
      tagline: "Earthy, Eclectic & Organic Warmth",
      description:
        "Infuses free-spirited energy with rich earthy clays, organic greens, and warm textural neutrals.",
      combos: [
        {
          id: "living-boho-1",
          title: "Terracotta + Cream + Olive",
          imagePath: "/spaces/living-room/6.png",
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
          id: "living-boho-2",
          title: "Mustard + Beige + Rust",
          imagePath: "/spaces/living-room/2.png",
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
          id: "living-boho-3",
          title: "Sage + Off-White + Walnut Brown",
          imagePath: "/spaces/living-room/5.png",
          description: "A calming biophilic sage tone complemented by crisp off-white walls and deep walnut brown wood accents.",
          moodTag: "Calming & Natural",
          bestFor: "Nordic boho, indoor planters & linen furniture",
          colors: [
            { name: "Sage", hex: "#9CAF88", role: "Accent Wall" },
            { name: "Off-White", hex: "#FAF9F6", role: "Primary Wall" },
            { name: "Walnut Brown", hex: "#6E4A35", role: "Trim / Woodwork" },
          ],
        },
        {
          id: "living-boho-4",
          title: "Desert Clay + Sand Tan + Deep Ochre",
          imagePath: "/spaces/living-room/4.png",
          description: "Sun-baked desert warmth featuring tactile clay walls, sand tan textiles, and rich golden ochre accents.",
          moodTag: "Desert Sunset Warmth",
          bestFor: "Macrame wall hangings, layered kilim rugs & terracotta pottery",
          colors: [
            { name: "Desert Clay", hex: "#B96D55", role: "Primary Wall" },
            { name: "Sand Tan", hex: "#D5BEA1", role: "Secondary Wall" },
            { name: "Deep Ochre", hex: "#C68736", role: "Accent Trim" },
          ],
        },
        {
          id: "living-boho-5",
          title: "Eucalyptus + Parchment + Raw Umber",
          imagePath: "/spaces/living-room/3.png",
          description: "Refreshing botanical eucalyptus paired with parchment white walls and raw umber wooden beams.",
          moodTag: "Botanical Earth & Air",
          bestFor: "Living rooms with plenty of daylight, rattan furniture & botanicals",
          colors: [
            { name: "Eucalyptus", hex: "#7E907B", role: "Accent Wall" },
            { name: "Parchment White", hex: "#F6F1E8", role: "Primary Wall" },
            { name: "Raw Umber", hex: "#5C4B3A", role: "Wood & Hardware" },
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
          id: "living-french-1",
          title: "Ivory + Dusty Blue + Beige",
          imagePath: "/spaces/living-room/5.png",
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
          id: "living-french-2",
          title: "Sage + Cream + Soft Grey",
          imagePath: "/spaces/living-room/2.png",
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
          id: "living-french-3",
          title: "Blush + Ivory + Taupe",
          imagePath: "/spaces/living-room/4.png",
          description: "A soft, romantic blush statement wall elevated with luminous ivory and sophisticated taupe contrast.",
          moodTag: "Warm Romance & Glow",
          bestFor: "Intimate seating areas and evening ambient lighting",
          colors: [
            { name: "Blush", hex: "#E8C5C8", role: "Accent Wall" },
            { name: "Ivory", hex: "#FAF5EF", role: "Primary Wall" },
            { name: "Taupe", hex: "#A19388", role: "Trims / Molding" },
          ],
        },
        {
          id: "living-french-4",
          title: "Chateau Grey + Chantilly Lace + Champagne",
          imagePath: "/spaces/living-room/3.png",
          description: "Sophisticated Parisian salon grey paired with delicate lace-white cornices and subtle champagne gold trim.",
          moodTag: "Parisian Salon Sophistication",
          bestFor: "Ornate wall paneling, herringbone flooring & gilded mirrors",
          colors: [
            { name: "Chateau Grey", hex: "#B8B5AE", role: "Primary Wall" },
            { name: "Chantilly Lace", hex: "#FAF8F5", role: "Cornices & Trims" },
            { name: "Champagne Gold", hex: "#D2BA85", role: "Accent Gilding" },
          ],
        },
        {
          id: "living-french-5",
          title: "Provencal Lavender + Linen + Antique Pewter",
          imagePath: "/spaces/living-room/6.png",
          description: "Whisper-soft lavender haze inspired by summer fields of Provence, anchored by oatmeal linen and pewter.",
          moodTag: "Provencal Garden Calm",
          bestFor: "Sunlit living rooms, rustic linen sofas & stone fireplaces",
          colors: [
            { name: "Provencal Lavender", hex: "#B6A7B8", role: "Accent Wall" },
            { name: "Oatmeal Linen", hex: "#EDE6DA", role: "Primary Wall" },
            { name: "Antique Pewter", hex: "#6D6864", role: "Metal & Frames" },
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
          id: "living-italian-1",
          title: "Warm White + Olive + Terracotta",
          imagePath: "/spaces/living-room/2.png",
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
          id: "living-italian-2",
          title: "Cream + Caramel + Deep Green",
          imagePath: "/spaces/living-room/5.png",
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
          id: "living-italian-3",
          title: "Beige + Rust + Charcoal",
          imagePath: "/spaces/living-room/6.png",
          description: "Contemporary Milanese luxury blending neutral Italian beige with burnt rust energy and charcoal definition.",
          moodTag: "Modern Milan & Dynamic",
          bestFor: "Modern Italian furniture & geometric architecture",
          colors: [
            { name: "Beige", hex: "#D8C4B6", role: "Primary Wall" },
            { name: "Rust", hex: "#A44222", role: "Accent Wall" },
            { name: "Charcoal", hex: "#36454F", role: "Architectural Trims" },
          ],
        },
        {
          id: "living-italian-4",
          title: "Venetian Stucco + Sienna + Burnt Umber",
          imagePath: "/spaces/living-room/4.png",
          description: "Rich Venetian plaster warmth with sun-drenched Sienna focal accents and deep burnt umber timber.",
          moodTag: "Renaissance Warmth & Heritage",
          bestFor: "Arched alcoves, lime-wash textures & bronze chandeliers",
          colors: [
            { name: "Venetian Stucco", hex: "#E9DAC5", role: "Primary Wall" },
            { name: "Raw Sienna", hex: "#B8663A", role: "Accent Wall" },
            { name: "Burnt Umber", hex: "#4B3728", role: "Architectural Accents" },
          ],
        },
        {
          id: "living-italian-5",
          title: "Carrara Grey + Tuscan Sun + Dark Cypress",
          imagePath: "/spaces/living-room/3.png",
          description: "Crisp Carrara stone grey backdrop accented with radiant Tuscan ochre and noble Italian cypress green.",
          moodTag: "Florence Grandeur",
          bestFor: "Marble accents, columned architecture & contemporary leather",
          colors: [
            { name: "Carrara Grey", hex: "#DCDAD5", role: "Primary Wall" },
            { name: "Tuscan Sun", hex: "#D89A42", role: "Accent Wall" },
            { name: "Dark Cypress", hex: "#2E4132", role: "Trim & Molding" },
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
          id: "living-plain-1",
          title: "White + Light Grey + Beige",
          imagePath: "/spaces/living-room/5.png",
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
          id: "living-plain-2",
          title: "Cream + Taupe + Off-White",
          imagePath: "/spaces/living-room/4.png",
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
          id: "living-plain-3",
          title: "Sand + Warm White + Greige",
          imagePath: "/spaces/living-room/2.png",
          description: "Gentle coastal dunes feel with tactile sand shades, warm white base, and modern greige transitions.",
          moodTag: "Peaceful & Balanced",
          bestFor: "Spacious living rooms with organic neutral textures",
          colors: [
            { name: "Sand", hex: "#D4B996", role: "Accent Wall" },
            { name: "Warm White", hex: "#FBF9F5", role: "Primary Wall" },
            { name: "Greige", hex: "#B5ACA3", role: "Secondary Wall" },
          ],
        },
        {
          id: "living-plain-4",
          title: "Alabaster + Fog Grey + Soft Charcoal",
          imagePath: "/spaces/living-room/3.png",
          description: "Crisp architectural white balanced with airy fog grey walls and grounded by soft charcoal line definition.",
          moodTag: "Crisp Modern Simplicity",
          bestFor: "Modern homes, metal track lighting & polished concrete or wood floors",
          colors: [
            { name: "Alabaster White", hex: "#F8F6F0", role: "Primary Wall" },
            { name: "Fog Grey", hex: "#D7D8D5", role: "Secondary Wall" },
            { name: "Soft Charcoal", hex: "#4A4D4E", role: "Accent & Trims" },
          ],
        },
        {
          id: "living-plain-5",
          title: "Oatmeal + Muted Clay + Pure White",
          imagePath: "/spaces/living-room/6.png",
          description: "Textured oatmeal neutrality accented by whisper of clay warmth and clean white ceiling light reflection.",
          moodTag: "Subtle Earth Neutral",
          bestFor: "Family living rooms, washable finishes & natural light",
          colors: [
            { name: "Oatmeal", hex: "#E4DCD0", role: "Primary Wall" },
            { name: "Muted Clay", hex: "#BFA493", role: "Accent Wall" },
            { name: "Pure White", hex: "#FFFFFF", role: "Ceilings & Trim" },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// 2. BEDROOM THEMES DATA (5 THEMES x 5 COMBOS EACH)
// ============================================================================
export const BEDROOM_THEMES_DATA: RoomSpaceData = {
  slug: "bedroom",
  name: "Bedroom",
  heroTitle: "Bedroom Colour Themes & Combinations",
  heroSubtitle:
    "Explore designer-curated 3-colour harmony palettes across Modern Minimalist, Boho, French, Italian, and Simple Plain aesthetics for a restorative sanctuary.",
  themes: [
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      tagline: "Serene Warmth, Japandi Zen & Sculptural Comfort",
      description:
        "Architectural calm and restorative tranquility with warm ivory, twilight peach, earthen terracotta, morning mist, and soft dusty mauve.",
      combos: [
        {
          id: "bedroom-minimal-1",
          title: "Warm Ivory + Soft Linen + Caramel Amber",
          imagePath: "/spaces/bedroom/7.png",
          description: "Sun-warmed ivory backdrop elevated by fluted beige drapery, textured linen bedding, and rich caramel velvet pillows with natural oak.",
          moodTag: "Serene Japandi & Ambient Morning Glow",
          bestFor: "Linen upholstered beds, fluted drapery & warm timber nightstands",
          colors: [
            { name: "Warm Ivory", hex: "#EAE4D9", role: "Primary Wall" },
            { name: "Soft Linen", hex: "#D4C8BA", role: "Headboard & Bedding" },
            { name: "Caramel Amber", hex: "#B88242", role: "Velvet Pillows & Timber" },
          ],
        },
        {
          id: "bedroom-minimal-2",
          title: "Terracotta Peach + Muted Clay + Teak Wood",
          imagePath: "/spaces/bedroom/8.png",
          description: "Cozy intimate bedroom glow pairing blush peach walls with dusky rose-clay curtains and honey teak wood bedside bench.",
          moodTag: "Warm Twilight & Candlelit Glow",
          bestFor: "Intimate bedrooms, low-profile oak benches & soft evening light",
          colors: [
            { name: "Terracotta Peach", hex: "#C79782", role: "Primary Wall" },
            { name: "Muted Clay", hex: "#9C6E60", role: "Drapery & Shadow Tones" },
            { name: "Honey Teak Wood", hex: "#B87B41", role: "Bedside Bench & Lamp" },
          ],
        },
        {
          id: "bedroom-minimal-3",
          title: "Spiced Terracotta + Blonde Ash + Natural Linen",
          imagePath: "/spaces/bedroom/9.png",
          description: "Striking terracotta accent wall grounded by blonde ash credenza, slatted wood headboard, and breathable natural linen duvet.",
          moodTag: "Earthen Modernism & Sculptural Calm",
          bestFor: "Slatted headboards, blonde wood dressers & brass botanical decor",
          colors: [
            { name: "Spiced Terracotta", hex: "#984734", role: "Accent Wall" },
            { name: "Blonde Ash Wood", hex: "#BA9267", role: "Dresser & Bed Frame" },
            { name: "Natural Linen White", hex: "#F4F1EA", role: "Bedding & Ceramics" },
          ],
        },
        {
          id: "bedroom-minimal-4",
          title: "Morning Mist + Blonde Oak + Snow White",
          imagePath: "/spaces/bedroom/10.png",
          description: "Whispering pale misty sky wall illuminated by soft overhead downlight, low blonde oak platform bed, and cloud-white bedding.",
          moodTag: "Airy Zen & Scandinavian Serenity",
          bestFor: "Low platform beds, floating side units & pampas grass styling",
          colors: [
            { name: "Morning Mist", hex: "#AFC2C6", role: "Primary Wall" },
            { name: "Blonde Oak Wood", hex: "#C4A482", role: "Platform Bed & Units" },
            { name: "Snow White Linen", hex: "#F8F6F2", role: "Bedding & Ceramics" },
          ],
        },
        {
          id: "bedroom-minimal-5",
          title: "Dusty Mauve + Soft Blush Silk + Brushed Brass",
          imagePath: "/spaces/bedroom/11.png",
          description: "Monochromatic luxury with enveloping dusty mauve rose walls, pillow-soft blush silk textiles, and a sculptural brushed brass pendant.",
          moodTag: "Romantic Luxury & Sculptural Rose",
          bestFor: "Pendant lighting, silk pillow arrangements & muted rose palettes",
          colors: [
            { name: "Dusty Mauve Rose", hex: "#AF8286", role: "Primary Wall" },
            { name: "Soft Blush Silk", hex: "#CFABB1", role: "Layered Bedding & Cushions" },
            { name: "Brushed Brass", hex: "#B59A6D", role: "Pendant Light & Accents" },
          ],
        },
      ],
    },
    {
      id: "boho",
      name: "Boho",
      tagline: "Organic Botanicals, Earthy Textures & Macrame Warmth",
      description:
        "Restful bohemian sanctuaries blending botanical sage, sun-baked clay, and raw timber textures.",
      combos: [
        {
          id: "bed-boho-1",
          title: "Botanical Sage + Warm Sand + Walnut",
          imagePath: "/spaces/bedroom/7.png",
          description: "Biophilic sage accent headboard balanced with warm sand walls and rich walnut wood furnishings.",
          moodTag: "Botanical Rest & Calm",
          bestFor: "Hanging plants, woven baskets & linen duvet sets",
          colors: [
            { name: "Botanical Sage", hex: "#97A88C", role: "Accent Wall" },
            { name: "Warm Sand", hex: "#E7DCBF", role: "Primary Wall" },
            { name: "Walnut Wood", hex: "#5C4033", role: "Trim / Furniture" },
          ],
        },
        {
          id: "bed-boho-2",
          title: "Clay Ochre + Off-White + Jute Tan",
          imagePath: "/spaces/bedroom/8.png",
          description: "Warm desert ochre statement with textured off-white walls and tactile jute bedside rugs.",
          moodTag: "Cozy Desert Warmth",
          bestFor: "Rattan headboards, brass reading lamps & woven rugs",
          colors: [
            { name: "Clay Ochre", hex: "#C6824D", role: "Accent Wall" },
            { name: "Off-White", hex: "#FBF9F4", role: "Primary Wall" },
            { name: "Jute Tan", hex: "#A88D6F", role: "Bedside Accents" },
          ],
        },
        {
          id: "bed-boho-3",
          title: "Terracotta Blush + Linen White + Olive Leaf",
          imagePath: "/spaces/bedroom/9.png",
          description: "Earthy terracotta headboard wall softened by washed white linen and delicate olive leaf botanical accents.",
          moodTag: "Natural Earth & Foliage",
          bestFor: "Cane furniture, macrame wall hangings & dried floral vases",
          colors: [
            { name: "Terracotta Blush", hex: "#BA765A", role: "Accent Wall" },
            { name: "Linen White", hex: "#F9F6F0", role: "Primary Wall" },
            { name: "Olive Leaf", hex: "#7B8765", role: "Plant & Textile Trim" },
          ],
        },
        {
          id: "bed-boho-4",
          title: "Earthy Mustard + Warm Greige + Rattan Brown",
          imagePath: "/spaces/bedroom/10.png",
          description: "Muted golden mustard accent wall providing comforting sunrise warmth alongside greige walls and rattan decor.",
          moodTag: "Morning Sun & Texture",
          bestFor: "Woven pendant shades, tasseled throws & natural timber floors",
          colors: [
            { name: "Earthy Mustard", hex: "#CCA04A", role: "Accent Wall" },
            { name: "Warm Greige", hex: "#D6CEBF", role: "Primary Wall" },
            { name: "Rattan Brown", hex: "#8A6D4B", role: "Furniture & Decor" },
          ],
        },
        {
          id: "bed-boho-5",
          title: "Muted Rust + Sandstone + Forest Moss",
          imagePath: "/spaces/bedroom/11.png",
          description: "Deep rustic warmth meeting deep woodland green accents for a grounded, deeply restful sleep haven.",
          moodTag: "Deep Earth Retreat",
          bestFor: "Dark wood bed frames, wool throws & bedside planters",
          colors: [
            { name: "Muted Rust", hex: "#A85338", role: "Accent Wall" },
            { name: "Sandstone", hex: "#DDD2C1", role: "Primary Wall" },
            { name: "Forest Moss", hex: "#4D5D46", role: "Pillows & Accents" },
          ],
        },
      ],
    },
    {
      id: "french",
      name: "French",
      tagline: "Romantic Boudoir, Whispering Pastels & Antique White",
      description:
        "Chic Parisian boudoir aesthetics with antique white molding, powder blue accents, and champagne silk.",
      combos: [
        {
          id: "bed-french-1",
          title: "Powder Blue + Antique White + Champagne",
          imagePath: "/spaces/bedroom/10.png",
          description: "Soft romantic powder blue walls with antique white wainscoting and champagne silk bedding.",
          moodTag: "Chic Parisian Romance",
          bestFor: "Wall moldings, velvet headboards & crystal chandeliers",
          colors: [
            { name: "Antique White", hex: "#FDFBF7", role: "Primary Wall" },
            { name: "Powder Blue", hex: "#9EB6C2", role: "Accent Moldings" },
            { name: "Champagne Gold", hex: "#D4C29A", role: "Drapery & Lighting" },
          ],
        },
        {
          id: "bed-french-2",
          title: "Blush Rose + Cream Linen + Dove Grey",
          imagePath: "/spaces/bedroom/11.png",
          description: "Gentle Parisian blush with warm cream linen and soft dove grey architectural trims.",
          moodTag: "Subtle Boudoir Glamour",
          bestFor: "Tufted headboards, antique mirrors & delicate floral decor",
          colors: [
            { name: "Blush Rose", hex: "#DFBDBF", role: "Accent Wall" },
            { name: "Cream Linen", hex: "#F7F3EC", role: "Primary Wall" },
            { name: "Dove Grey", hex: "#B8B5B1", role: "Trim & Molding" },
          ],
        },
        {
          id: "bed-french-3",
          title: "Lavender Grey + Alabaster + Burnished Brass",
          imagePath: "/spaces/bedroom/7.png",
          description: "A soothing whisper of Provencal lavender grey framed by luminous alabaster moldings and brass wall lamps.",
          moodTag: "Provencal Evening Peace",
          bestFor: "Curved headboards, silk duvets & vintage perfume trays",
          colors: [
            { name: "Lavender Grey", hex: "#B5ABB8", role: "Primary Wall" },
            { name: "Alabaster", hex: "#FBF8F3", role: "Trims & Ceiling" },
            { name: "Burnished Brass", hex: "#BA985C", role: "Lighting & Accents" },
          ],
        },
        {
          id: "bed-french-4",
          title: "Pearl Ivory + Sage Glaze + Soft Gilded Gold",
          imagePath: "/spaces/bedroom/8.png",
          description: "Luminous pearl ivory backdrop with antique sage painted furniture and subtle gilded frame accents.",
          moodTag: "Palatial Chateaux Charm",
          bestFor: "Classic French armoires, gilded headboards & floral tapestries",
          colors: [
            { name: "Pearl Ivory", hex: "#FAF5EA", role: "Primary Wall" },
            { name: "Sage Glaze", hex: "#97A591", role: "Furniture Accent" },
            { name: "Soft Gilded Gold", hex: "#CCA964", role: "Frame & Pulls" },
          ],
        },
        {
          id: "bed-french-5",
          title: "Dusty Plum + Cashmere Cream + Antique Pewter",
          imagePath: "/spaces/bedroom/9.png",
          description: "Moody Parisian luxury featuring a velvet plum statement wall balanced by cashmere cream bedding and pewter.",
          moodTag: "Dramatic Parisian Evening",
          bestFor: "Dark wood armoires, velvet curtains & evening lighting",
          colors: [
            { name: "Dusty Plum", hex: "#7A5E6B", role: "Accent Wall" },
            { name: "Cashmere Cream", hex: "#F4EFE6", role: "Primary Wall" },
            { name: "Antique Pewter", hex: "#5C5658", role: "Hardware & Trim" },
          ],
        },
      ],
    },
    {
      id: "italian-style",
      name: "Italian Style",
      tagline: "Tuscan Stucco Warmth, Olive Groves & Terracotta",
      description:
        "Luxurious Mediterranean villa atmosphere featuring warm lime-wash tones, terracotta accents, and aged bronze.",
      combos: [
        {
          id: "bed-italian-1",
          title: "Tuscan Ochre + Lime White + Burnished Bronze",
          imagePath: "/spaces/bedroom/9.png",
          description: "Warm stucco ochre feature wall framed with limewash white and antique bronze accents.",
          moodTag: "Tuscan Villa Serenity",
          bestFor: "Arched alcoves, wrought iron bed frames & terracotta tile floors",
          colors: [
            { name: "Lime White", hex: "#F8F5EE", role: "Primary Wall" },
            { name: "Tuscan Ochre", hex: "#C2854E", role: "Accent Wall" },
            { name: "Burnished Bronze", hex: "#54463A", role: "Hardware & Frames" },
          ],
        },
        {
          id: "bed-italian-2",
          title: "Olive Grove + Warm Sand + Espresso Wood",
          imagePath: "/spaces/bedroom/7.png",
          description: "Deep calming Tuscan olive accent wall grounded by warm sand walls and dark espresso walnut bedroom furniture.",
          moodTag: "Mediterranean Earth & Shade",
          bestFor: "Canopy beds, linen curtains & terracotta urns",
          colors: [
            { name: "Olive Grove", hex: "#636F49", role: "Accent Wall" },
            { name: "Warm Sand", hex: "#E9DFCF", role: "Primary Wall" },
            { name: "Espresso Wood", hex: "#3B2E26", role: "Furniture & Beams" },
          ],
        },
        {
          id: "bed-italian-3",
          title: "Terracotta Blush + Warm Stucco + Antique Iron",
          imagePath: "/spaces/bedroom/8.png",
          description: "Sun-drenched terracotta warmth echoing ancient Italian hill-town rooftops, complemented by iron accents.",
          moodTag: "Sun-Drenched Chianti Charm",
          bestFor: "Wrought iron lamps, tiled bedroom floors & rustic wood",
          colors: [
            { name: "Terracotta Blush", hex: "#BD6F55", role: "Accent Wall" },
            { name: "Warm Stucco", hex: "#F3ECE1", role: "Primary Wall" },
            { name: "Antique Iron", hex: "#383533", role: "Lighting & Hardware" },
          ],
        },
        {
          id: "bed-italian-4",
          title: "Venetian Gold + Cream Brocade + Deep Umber",
          imagePath: "/spaces/bedroom/10.png",
          description: "Subtle Italian villa luxury with golden undertones, rich cream walls, and dark umber framing.",
          moodTag: "Venetian Grandeur",
          bestFor: "Carved headboards, brocade fabrics & warm sunset light",
          colors: [
            { name: "Cream Brocade", hex: "#F7F0E2", role: "Primary Wall" },
            { name: "Venetian Gold", hex: "#C99A4A", role: "Accent Headboard" },
            { name: "Deep Umber", hex: "#4C382A", role: "Nightstands & Trim" },
          ],
        },
        {
          id: "bed-italian-5",
          title: "Amalfi Coastal Mist + Stone White + Marine Navy",
          imagePath: "/spaces/bedroom/11.png",
          description: "Coastal Italian elegance inspired by Amalfi cliffs, pairing misty sea blue-grey with crisp marine accents.",
          moodTag: "Amalfi Coast Serenity",
          bestFor: "Bedrooms with morning sea breezes, sheer drapes & light tiles",
          colors: [
            { name: "Amalfi Coastal Mist", hex: "#9CB3BD", role: "Accent Wall" },
            { name: "Stone White", hex: "#F6F4F0", role: "Primary Wall" },
            { name: "Marine Navy", hex: "#233346", role: "Pillows & Throws" },
          ],
        },
      ],
    },
    {
      id: "simple-plain-style",
      name: "Simple Plain Style",
      tagline: "Pure Restful Sleep, Clean Neutrals & Uncluttered Space",
      description:
        "Subtle, light-enhancing neutrals curated to quiet the mind and promote deep, restful rejuvenation.",
      combos: [
        {
          id: "bed-plain-1",
          title: "Pure Alabaster + Whisper Grey + Warm Greige",
          imagePath: "/spaces/bedroom/7.png",
          description: "Light-reflecting alabaster walls with whisper grey headboard wall and soft warm greige accents.",
          moodTag: "Pure Serenity & Light",
          bestFor: "Minimalist bedrooms, sheer white curtains & platform beds",
          colors: [
            { name: "Pure Alabaster", hex: "#F5F2EC", role: "Primary Wall" },
            { name: "Whisper Grey", hex: "#E0DFDC", role: "Feature Wall" },
            { name: "Warm Greige", hex: "#BEB5A9", role: "Wood & Accents" },
          ],
        },
        {
          id: "bed-plain-2",
          title: "Cloud White + Soft Cashmere + Birch Wood",
          imagePath: "/spaces/bedroom/8.png",
          description: "Soft white walls enveloped in gentle cashmere tones, grounded by natural pale birch furnishings.",
          moodTag: "Gentle Cocooning Rest",
          bestFor: "Light wood furniture, white cotton bedding & low nightstands",
          colors: [
            { name: "Cloud White", hex: "#FAF9F5", role: "Primary Wall" },
            { name: "Soft Cashmere", hex: "#D9D0C3", role: "Accent Wall" },
            { name: "Birch Wood", hex: "#B8A388", role: "Furniture & Trims" },
          ],
        },
        {
          id: "bed-plain-3",
          title: "Morning Chalk + Pale Pebble + Charcoal Line",
          imagePath: "/spaces/bedroom/9.png",
          description: "Clean minimalist contrast pairing chalk white walls with smooth pebble grey and crisp charcoal line details.",
          moodTag: "Crisp Clean Balance",
          bestFor: "Modern platform beds, framed black-and-white photos & track lights",
          colors: [
            { name: "Morning Chalk", hex: "#F0ECE3", role: "Primary Wall" },
            { name: "Pale Pebble", hex: "#CBC6BD", role: "Headboard Wall" },
            { name: "Charcoal Line", hex: "#3A3B3C", role: "Lighting & Hardware" },
          ],
        },
        {
          id: "bed-plain-4",
          title: "Warm Linen + Sandstone Grey + Natural Ash",
          imagePath: "/spaces/bedroom/10.png",
          description: "A neutral bedroom staple pairing warm linen textured walls with sandstone grey bedding and natural ash.",
          moodTag: "Everyday Neutral Comfort",
          bestFor: "Any bedroom size, optimal for natural daylight diffusion",
          colors: [
            { name: "Warm Linen", hex: "#EAE3D5", role: "Primary Wall" },
            { name: "Sandstone Grey", hex: "#BFB8AC", role: "Accent Wall" },
            { name: "Natural Ash", hex: "#9E907F", role: "Furniture / Trim" },
          ],
        },
        {
          id: "bed-plain-5",
          title: "Whisper Rose + Cotton White + Soft Taupe",
          imagePath: "/spaces/bedroom/11.png",
          description: "The gentlest blush undertone warming up crisp cotton white walls and soft taupe wool rugs.",
          moodTag: "Soft Morning Glow",
          bestFor: "Cozy south-facing bedrooms, fluffy duvets & reading nooks",
          colors: [
            { name: "Whisper Rose", hex: "#E6D7D5", role: "Accent Wall" },
            { name: "Cotton White", hex: "#FCFAF6", role: "Primary Wall" },
            { name: "Soft Taupe", hex: "#ADA196", role: "Trims & Floor Accents" },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// 3. KITCHEN THEMES DATA (5 THEMES x 5 COMBOS EACH)
// ============================================================================
export const KITCHEN_THEMES_DATA: RoomSpaceData = {
  slug: "kitchen",
  name: "Kitchen",
  heroTitle: "Kitchen Colour Themes & Combinations",
  heroSubtitle:
    "Explore designer-curated 3-colour harmony palettes across Modern Minimalist, Boho, French, Italian, and Simple Plain aesthetics for an inspiring culinary space.",
  themes: [
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      tagline: "Architectural Simplicity, Natural Stone & Warm Timber",
      description:
        "Seamless cabinetry, tactile lime-wash plaster, authentic travertine stone, and refined metal fixtures creating serene culinary spaces.",
      combos: [
        {
          id: "kitchen-minimal-1",
          title: "Chalk White + Limestone Greige + Cast Black",
          imagePath: "/spaces/kitchen/12.png",
          description: "Sunlit corner kitchen with handleless chalk white cabinetry, textured limestone travertine backsplash, and matte cast black fixtures.",
          moodTag: "Bright Architectural Zen",
          bestFor: "Handleless cabinetry, sunlit corner windows & stone splashbacks",
          colors: [
            { name: "Chalk White", hex: "#EDE8DF", role: "Wall & Upper Cabinetry" },
            { name: "Limestone Greige", hex: "#CABEB0", role: "Backsplash & Countertop" },
            { name: "Cast Black", hex: "#222222", role: "Hardware & Appliances" },
          ],
        },
        {
          id: "kitchen-minimal-2",
          title: "Sand Plaster + Natural Oak + Crisp Off-White",
          imagePath: "/spaces/kitchen/13.png",
          description: "Warm Japandi kitchen balancing tactile sand plaster walls with floating oak display shelves, white cabinets, and wooden island.",
          moodTag: "Warm Japandi & Organic Texture",
          bestFor: "Floating display shelves, kitchen islands & handcrafted ceramics",
          colors: [
            { name: "Sand Plaster", hex: "#D4C5B3", role: "Primary Wall" },
            { name: "Natural Oak Wood", hex: "#BA8F60", role: "Floating Shelves & Island" },
            { name: "Crisp Off-White", hex: "#F5F2EC", role: "Base Cabinets & Counter" },
          ],
        },
        {
          id: "kitchen-minimal-3",
          title: "Calico Cream + Warm Travertine + Woven Rattan",
          imagePath: "/spaces/kitchen/14.png",
          description: "Mediterranean-inspired minimalist kitchen with arched window, woven rattan bell pendants, travertine flagstone floor, and brass tap.",
          moodTag: "Sun-Drenched Mediterranean Minimal",
          bestFor: "Arched windows, flagstone floor tiles & woven pendant lighting",
          colors: [
            { name: "Calico Cream", hex: "#EAE3D6", role: "Primary Wall" },
            { name: "Warm Travertine", hex: "#CBBAA4", role: "Stone Floor & Countertop" },
            { name: "Woven Rattan", hex: "#C09363", role: "Pendant Lamps & Accents" },
          ],
        },
        {
          id: "kitchen-minimal-4",
          title: "Cashmere Greige + Putty Taupe + Warm LED Glow",
          imagePath: "/spaces/kitchen/15.png",
          description: "Ultra-sleek monolithic kitchen pairing putty greige walls with cashmere taupe flush drawers and architectural under-shelf warm glow.",
          moodTag: "Monolithic Simplicity & Architectural Light",
          bestFor: "Integrated LED shelf lighting, flush cabinets & monolithic tones",
          colors: [
            { name: "Putty Greige", hex: "#C6B9AA", role: "Wall Surface" },
            { name: "Cashmere Taupe", hex: "#B0A292", role: "Flush Base Cabinetry" },
            { name: "Warm LED Glow", hex: "#FFE4B5", role: "Shelf Lighting & Ceramics" },
          ],
        },
        {
          id: "kitchen-minimal-5",
          title: "Off-White Chalk + Calacatta Vein + Smoked Bronze",
          imagePath: "/spaces/kitchen/16.png",
          description: "Parisian modern elegance featuring refined off-white framed cabinetry, dramatic Calacatta marble slab, and smoked bronze accents.",
          moodTag: "Understated Parisian Grandeur",
          bestFor: "Marble slab backsplashes, framed drawers & bronze fixtures",
          colors: [
            { name: "Off-White Chalk", hex: "#F4F2ED", role: "Wall & Drawer Fronts" },
            { name: "Calacatta Marble", hex: "#CFCEC9", role: "Backsplash & Countertop" },
            { name: "Smoked Bronze", hex: "#352B26", role: "Hardware & Faucet" },
          ],
        },
      ],
    },
    {
      id: "boho",
      name: "Boho",
      tagline: "Earthy Warmth, Open Timber Shelving & Herb Planters",
      description:
        "Vibrant bohemian kitchen styling with earthy clay tones, natural terracotta cookware, and olive accents.",
      combos: [
        {
          id: "kitchen-boho-1",
          title: "Warm Ochre + Cream Stucco + Olive Green",
          imagePath: "/spaces/kitchen/13.png",
          description: "Earthy ochre accents paired with cream lime-wash walls, open oak shelves, and potted culinary herbs.",
          moodTag: "Organic Culinary Warmth",
          bestFor: "Open spice racks, hanging copper pans & rustic earthenware",
          colors: [
            { name: "Cream Stucco", hex: "#F4EFE6", role: "Primary Wall" },
            { name: "Warm Ochre", hex: "#C98E53", role: "Feature Shelving" },
            { name: "Olive Green", hex: "#6E7A4A", role: "Accent Decor" },
          ],
        },
        {
          id: "kitchen-boho-2",
          title: "Terracotta Clay + Sand Beige + Brass Tap",
          imagePath: "/spaces/kitchen/14.png",
          description: "Warm terracotta clay tile accents balanced with soothing sand beige walls and antique brass fittings.",
          moodTag: "Boho Artisan Charm",
          bestFor: "Zellige splashback tiles, brass gooseneck taps & open bowls",
          colors: [
            { name: "Sand Beige", hex: "#E7D8C5", role: "Primary Wall" },
            { name: "Terracotta Clay", hex: "#BD6849", role: "Backsplash Tile" },
            { name: "Antique Brass", hex: "#B8964C", role: "Hardware & Fixtures" },
          ],
        },
        {
          id: "kitchen-boho-3",
          title: "Botanical Sage + White Lime + Walnut Island",
          imagePath: "/spaces/kitchen/12.png",
          description: "Natural sage green cabinetry paired with crisp white lime-wash walls and a warm walnut butcher-block island.",
          moodTag: "Earthy Kitchen Haven",
          bestFor: "Butcher-block islands, potted rosemary & ceramic crocks",
          colors: [
            { name: "White Lime", hex: "#FAF7EE", role: "Walls & Ceiling" },
            { name: "Botanical Sage", hex: "#7E8F74", role: "Cabinet Faces" },
            { name: "Walnut Wood", hex: "#523F32", role: "Island & Shelves" },
          ],
        },
        {
          id: "kitchen-boho-4",
          title: "Desert Sun Mustard + Warm Greige + Rattan",
          imagePath: "/spaces/kitchen/15.png",
          description: "Subtle sunshine warmth with mustard earthenware display bowls, greige cabinetry, and woven stool seats.",
          moodTag: "Sunlit Artisan Kitchen",
          bestFor: "Countertop bar stools, macrame pot hangers & spice jars",
          colors: [
            { name: "Warm Greige", hex: "#D6CBC0", role: "Primary Wall & Cabinets" },
            { name: "Desert Mustard", hex: "#CE9C42", role: "Pendant & Cookware" },
            { name: "Woven Rattan", hex: "#A88358", role: "Stools & Accents" },
          ],
        },
        {
          id: "kitchen-boho-5",
          title: "Spiced Cinnamon + Stone Cream + Cast Iron",
          imagePath: "/spaces/kitchen/16.png",
          description: "Rich spiced cinnamon open display backdrops with stone cream cabinets and matte cast iron fixtures.",
          moodTag: "Rustic Gathering Warmth",
          bestFor: "Cast iron cookware, farmhouse sinks & open wood rafters",
          colors: [
            { name: "Stone Cream", hex: "#EDE5D6", role: "Cabinetry Base" },
            { name: "Spiced Cinnamon", hex: "#9E4F32", role: "Accent Alcove" },
            { name: "Cast Iron", hex: "#2B2928", role: "Cooktop & Hardware" },
          ],
        },
      ],
    },
    {
      id: "french",
      name: "French",
      tagline: "Provencal Charm, Limestone & Fluted Cabinetry",
      description:
        "Timeless French country kitchen warmth with buttery ivory surfaces, zinc or brass fixtures, and soft sage details.",
      combos: [
        {
          id: "kitchen-french-1",
          title: "Butter Ivory + Soft Sage + Burnished Brass",
          imagePath: "/spaces/kitchen/16.png",
          description: "Classic Provencal kitchen harmony with creamy ivory cabinetry, gentle sage island, and burnished brass pulls.",
          moodTag: "Provencal Grandeur & Charm",
          bestFor: "Fluted range hoods, marble islands & unlacquered brass taps",
          colors: [
            { name: "Butter Ivory", hex: "#FBF7EE", role: "Primary Wall" },
            { name: "Soft Sage", hex: "#9EADA0", role: "Island / Feature" },
            { name: "Burnished Brass", hex: "#B89958", role: "Hardware & Faucet" },
          ],
        },
        {
          id: "kitchen-french-2",
          title: "Chalk White + French Blue + Honed Marble",
          imagePath: "/spaces/kitchen/12.png",
          description: "Charming Parisian bistro palette pairing chalk white walls with French country blue cabinetry and marble tops.",
          moodTag: "Parisian Bistro Chic",
          bestFor: "Shaker-style cabinets, subway tiles & porcelain sinks",
          colors: [
            { name: "Chalk White", hex: "#F7F5F0", role: "Primary Wall" },
            { name: "French Blue", hex: "#6C879B", role: "Cabinet Faces" },
            { name: "Honed Marble", hex: "#D6D4CF", role: "Countertop & Backsplash" },
          ],
        },
        {
          id: "kitchen-french-3",
          title: "Antique White + Linen Grey + Champagne Gilt",
          imagePath: "/spaces/kitchen/15.png",
          description: "Refined palace kitchen charm with luminous antique white, linen grey pantry doors, and subtle champagne hardware.",
          moodTag: "Aristocratic Chateaux Calm",
          bestFor: "Molded cabinet crowns, brass rails & limestone floors",
          colors: [
            { name: "Antique White", hex: "#F8F4EB", role: "Primary Wall" },
            { name: "Linen Grey", hex: "#CBC6BD", role: "Cabinet Trim" },
            { name: "Champagne Gilt", hex: "#C7B27C", role: "Handles & Faucets" },
          ],
        },
        {
          id: "kitchen-french-4",
          title: "Warm Cream + Bordeaux Wine + Polished Brass",
          imagePath: "/spaces/kitchen/14.png",
          description: "Deep, romantic culinary drama with warm cream walls, a deep Bordeaux wine kitchen island, and gleaming brass.",
          moodTag: "Bordeaux Culinary Passion",
          bestFor: "Statement kitchen islands, wine cellars & copper cookware",
          colors: [
            { name: "Warm Cream", hex: "#F9F3E5", role: "Primary Wall" },
            { name: "Bordeaux Wine", hex: "#6B2A35", role: "Island Accent" },
            { name: "Polished Brass", hex: "#D1AC5B", role: "Pendants & Hardware" },
          ],
        },
        {
          id: "kitchen-french-5",
          title: "Dove Grey + Provencal Herb + Brushed Pewter",
          imagePath: "/spaces/kitchen/13.png",
          description: "Subtle countryside greys framed by soft Provencal herb green open shelves and classic pewter handles.",
          moodTag: "Country Manoir Serenity",
          bestFor: "Plate racks, stone hearths & ceramic jar collections",
          colors: [
            { name: "Dove Grey", hex: "#D5D3CC", role: "Primary Wall" },
            { name: "Provencal Herb", hex: "#8A997E", role: "Open Shelving" },
            { name: "Brushed Pewter", hex: "#5E5D5A", role: "Hardware & Range Hood" },
          ],
        },
      ],
    },
    {
      id: "italian-style",
      name: "Italian Style",
      tagline: "Tuscan Terracotta, Rustic Stone & Deep Espresso",
      description:
        "Tuscan farmhouse kitchen grandeur with warm sandstone countertops, deep terracotta accents, and rich espresso timber.",
      combos: [
        {
          id: "kitchen-italian-1",
          title: "Warm Stucco + Tuscan Rust + Espresso Timber",
          imagePath: "/spaces/kitchen/14.png",
          description: "Sun-baked Tuscan stucco walls complemented by rustic stone countertops and dark espresso timber finishes.",
          moodTag: "Tuscan Culinary Heritage",
          bestFor: "Exposed beams, arched cooking alcoves & stone tile backsplashes",
          colors: [
            { name: "Warm Stucco", hex: "#F2EBE0", role: "Primary Wall" },
            { name: "Tuscan Rust", hex: "#A85333", role: "Accent Cooktop" },
            { name: "Espresso Timber", hex: "#3D312A", role: "Island & Shelves" },
          ],
        },
        {
          id: "kitchen-italian-2",
          title: "Olive Tapenade + Limewash White + Warm Travertine",
          imagePath: "/spaces/kitchen/13.png",
          description: "Classic Chianti kitchen mood featuring rich olive tapenade cabinetry against crisp limewashed walls and travertine.",
          moodTag: "Chianti Olive Splendor",
          bestFor: "Stone countertops, ceramic oil cruets & wooden cutting boards",
          colors: [
            { name: "Limewash White", hex: "#F5F1E8", role: "Walls & Ceiling" },
            { name: "Olive Tapenade", hex: "#576241", role: "Cabinet Faces" },
            { name: "Warm Travertine", hex: "#D5C4AF", role: "Countertops & Backsplash" },
          ],
        },
        {
          id: "kitchen-italian-3",
          title: "Cream Calacatta + Burnt Umber + Antique Bronze",
          imagePath: "/spaces/kitchen/16.png",
          description: "Venetian elegance with cream Calacatta veining, burnt umber walnut wood accents, and aged bronze gooseneck tap.",
          moodTag: "Milanese Contemporary Luxury",
          bestFor: "Waterfall marble islands, tall cabinetry & bronze hardware",
          colors: [
            { name: "Cream Calacatta", hex: "#ECE7DE", role: "Primary Wall & Marble" },
            { name: "Burnt Umber", hex: "#5A3E2D", role: "Wood Accent" },
            { name: "Antique Bronze", hex: "#4A3F33", role: "Fixtures & Faucets" },
          ],
        },
        {
          id: "kitchen-italian-4",
          title: "Sienna Ochre + Roman Stone + Deep Charcoal",
          imagePath: "/spaces/kitchen/12.png",
          description: "Warm Sienna earth tones bringing energy into a Roman stone kitchen with bold charcoal appliances.",
          moodTag: "Roman Warmth & Contrast",
          bestFor: "Brick pizza ovens, iron barstools & dark chef ranges",
          colors: [
            { name: "Roman Stone", hex: "#DCD4C6", role: "Primary Wall" },
            { name: "Sienna Ochre", hex: "#B86F36", role: "Feature Accent" },
            { name: "Deep Charcoal", hex: "#2E2D2B", role: "Appliance Finish" },
          ],
        },
        {
          id: "kitchen-italian-5",
          title: "Warm Almond + Rosemary Green + Aged Copper",
          imagePath: "/spaces/kitchen/15.png",
          description: "Gentle Italian warmth with creamy almond walls, herbal rosemary cabinetry, and gleaming aged copper cookware.",
          moodTag: "Italian Country Villa",
          bestFor: "Hanging copper pots, open shelving & warm morning daylight",
          colors: [
            { name: "Warm Almond", hex: "#F7EFE1", role: "Primary Wall" },
            { name: "Rosemary Green", hex: "#6F7E66", role: "Cabinetry" },
            { name: "Aged Copper", hex: "#B36B46", role: "Cookware & Lighting" },
          ],
        },
      ],
    },
    {
      id: "simple-plain-style",
      name: "Simple Plain Style",
      tagline: "Clean Functionality, Crisp Whites & Easy Maintenance",
      description:
        "Crisp, functional, easy-to-clean neutral palettes that maximize light diffusion across cooking and dining prep zones.",
      combos: [
        {
          id: "kitchen-plain-1",
          title: "Chalk White + Dove Grey + Brushed Steel",
          imagePath: "/spaces/kitchen/12.png",
          description: "Ultra-clean Scandinavian functionality with chalk white walls, soft dove grey lower units, and steel hardware.",
          moodTag: "Clean & High-Efficiency",
          bestFor: "Compact kitchens, modular cabinetry & modern appliances",
          colors: [
            { name: "Chalk White", hex: "#FAF8F5", role: "Walls & Ceiling" },
            { name: "Dove Grey", hex: "#CBC8C3", role: "Cabinet Faces" },
            { name: "Brushed Steel", hex: "#8E9194", role: "Hardware & Trim" },
          ],
        },
        {
          id: "kitchen-plain-2",
          title: "Pure White + Natural Oak + Charcoal Accent",
          imagePath: "/spaces/kitchen/13.png",
          description: "Bright light-amplifying white walls with natural oak timber shelves and subtle charcoal handle trim.",
          moodTag: "Crisp Daylight & Wood",
          bestFor: "Open concept kitchens, quartz countertops & track lights",
          colors: [
            { name: "Pure White", hex: "#FFFFFF", role: "Walls & Cabinets" },
            { name: "Natural Oak", hex: "#C7A67D", role: "Shelves & Counter" },
            { name: "Charcoal Accent", hex: "#383B3E", role: "Pulls & Outlines" },
          ],
        },
        {
          id: "kitchen-plain-3",
          title: "Warm Alabaster + Soft Greige + Matte Chrome",
          imagePath: "/spaces/kitchen/15.png",
          description: "Gentle warm alabaster walls preventing sterile glare, coupled with soft greige cabinetry and chrome fixtures.",
          moodTag: "Balanced Everyday Neutral",
          bestFor: "Family kitchens, durable wipeable surfaces & recessed LEDs",
          colors: [
            { name: "Warm Alabaster", hex: "#F3EDE3", role: "Primary Wall" },
            { name: "Soft Greige", hex: "#C3B9AC", role: "Cabinetry" },
            { name: "Matte Chrome", hex: "#A5A8AC", role: "Faucet & Handles" },
          ],
        },
        {
          id: "kitchen-plain-4",
          title: "Linen Cream + Fog Grey + Polished Quartz",
          imagePath: "/spaces/kitchen/14.png",
          description: "Soft tactile creaminess paired with airy fog grey wall tiles and light-bouncing white quartz counters.",
          moodTag: "Light Diffusion & Calm",
          bestFor: "Windowless or galley kitchens needing maximum light bounce",
          colors: [
            { name: "Linen Cream", hex: "#F5EFE4", role: "Primary Wall" },
            { name: "Fog Grey", hex: "#D6D5D1", role: "Backsplash Tile" },
            { name: "Polished Quartz", hex: "#EAE9E4", role: "Countertop" },
          ],
        },
        {
          id: "kitchen-plain-5",
          title: "Pure Cloud White + Soft Taupe + Black Iron",
          imagePath: "/spaces/kitchen/16.png",
          description: "Understated minimalism with pure cloud white cabinetry, grounding soft taupe walls, and crisp black iron pulls.",
          moodTag: "Timeless Minimal Clean",
          bestFor: "Modern apartments, handleless doors & built-in appliances",
          colors: [
            { name: "Soft Taupe", hex: "#DDD6CA", role: "Primary Wall" },
            { name: "Pure Cloud White", hex: "#FFFFFF", role: "Cabinet Doors" },
            { name: "Black Iron", hex: "#222120", role: "Hardware Accent" },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// ROOM REGISTRY & HELPER
// ============================================================================
export const ALL_ROOM_THEMES_DATA: Record<string, RoomSpaceData> = {
  "living-room": LIVING_ROOM_THEMES_DATA,
  bedroom: BEDROOM_THEMES_DATA,
  kitchen: KITCHEN_THEMES_DATA,
};

export function getRoomThemesData(slug?: string): RoomSpaceData {
  if (!slug) return LIVING_ROOM_THEMES_DATA;
  const normalized = slug.toLowerCase().trim();
  return ALL_ROOM_THEMES_DATA[normalized] || LIVING_ROOM_THEMES_DATA;
}
