import { RoomSpaceData } from "./types";

export const DINING_ROOM_THEMES_DATA: RoomSpaceData = {
  slug: "dining-room",
  name: "Dining Room",
  heroTitle: "Dining Room Colour Themes & Combinations",
  heroSubtitle:
    "Discover designer-curated 3-colour harmony palettes across Modern Minimalist, Warm Contemporary, and Luxury Elegant aesthetics for intimate dinners and celebratory gatherings.",
  themes: [
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      tagline: "Serene Warmth, Biophilic Tones & Sculptural Sophistication",
      description:
        "Architectural clarity and understated dining luxury featuring sun-warmed alabaster, natural warm oak, smoked concrete greige, and biophilic greens.",
      combos: [
        {
          id: "dining-minimal-1",
          title: "Chalk Alabaster + Natural Warm Oak + Linen Cream Stone",
          imagePath: "/spaces/dining-room/17.png",
          description: "Sun-warmed Japandi dining sanctuary pairing luminous chalk alabaster walls with natural warm oak dining furniture and linen stone accents.",
          moodTag: "Warm Japandi & Natural Daylight",
          bestFor: "Minimalist dining nooks, solid oak trestle tables & soft linen drapes",
          colors: [
            { name: "Chalk Alabaster", hex: "#F2EFE9", role: "Primary Wall" },
            { name: "Natural Warm Oak", hex: "#BA9164", role: "Dining Table & Chairs" },
            { name: "Linen Cream Stone", hex: "#D8CEBE", role: "Pendant & Flooring" },
          ],
        },
        {
          id: "dining-minimal-2",
          title: "Pale Off-White + Oak Dining Set + Heather Grey",
          imagePath: "/spaces/dining-room/18.png",
          description: "Airy Scandinavian minimalism framing natural oak dining cabinetry with clean off-white walls and heather grey ceramic textures.",
          moodTag: "Airy Nordic Feast & Calm Symmetry",
          bestFor: "Open-plan dining zones, scandi wishbone chairs & ambient pendants",
          colors: [
            { name: "Pale Off-White", hex: "#EDE9E3", role: "Primary Wall" },
            { name: "Oak Dining Set", hex: "#AD845C", role: "Table & Cabinetry" },
            { name: "Heather Grey", hex: "#9E9C99", role: "Upholstery & Ceramics" },
          ],
        },
        {
          id: "dining-minimal-3",
          title: "Smoked Concrete Grey + Honey Teak + Brushed Brass",
          imagePath: "/spaces/dining-room/19.png",
          description: "Architectural modern loft aesthetic contrasting smoked concrete grey feature walls with honey teak millwork and warm brushed brass fixtures.",
          moodTag: "Sophisticated Urban Loft & Warm Metals",
          bestFor: "Evening dinner parties, architectural suspension lighting & leather seats",
          colors: [
            { name: "Smoked Concrete Grey", hex: "#969894", role: "Feature Accent Wall" },
            { name: "Honey Teak", hex: "#B58752", role: "Table & Millwork" },
            { name: "Brushed Brass", hex: "#A89260", role: "Lighting & Accents" },
          ],
        },
        {
          id: "dining-minimal-4",
          title: "Warm Putty Sand + Solid Walnut + Olive Green",
          imagePath: "/spaces/dining-room/20.png",
          description: "Earthy organic warmth blending smooth putty sand walls with deep solid walnut dining pieces and fresh botanical olive touches.",
          moodTag: "Earthy Organic Dining Sanctuary",
          bestFor: "Ceramic tableware, indoor olive branches & handcrafted timber benches",
          colors: [
            { name: "Warm Putty Sand", hex: "#CDC3B4", role: "Primary Wall" },
            { name: "Solid Walnut", hex: "#684935", role: "Dining Furniture" },
            { name: "Olive Green", hex: "#5E6B47", role: "Botanical Accents" },
          ],
        },
        {
          id: "dining-minimal-5",
          title: "Crisp Gallery White + Blonde Oak + Denim Blue",
          imagePath: "/spaces/dining-room/21.png",
          description: "Fresh coastal-zen dining featuring gallery white walls, light blonde oak surfaces, and statement denim blue upholstered seating.",
          moodTag: "Breezy Coastal Zen & Crisp Lighting",
          bestFor: "Sunlit breakfast areas, abstract canvas artwork & light oak flooring",
          colors: [
            { name: "Crisp Gallery White", hex: "#F7F6F2", role: "Primary Wall" },
            { name: "Blonde Oak", hex: "#C4A17B", role: "Dining Table" },
            { name: "Denim Blue", hex: "#4D6682", role: "Chair Upholstery & Art" },
          ],
        },
      ],
    },
    {
      id: "warm-contemporary",
      name: "Warm Contemporary",
      tagline: "Venetian Spices, Two-Tone Ochres & Chartreuse Accents",
      description:
        "Dramatic and convivial dining atmospheres layered with rich russet reds, golden ochre wainscoting, solid walnut harvest tables, and sculpted modern lighting.",
      combos: [
        {
          id: "dining-warm-1",
          title: "Russet Terracotta Red + Warm Teak + Deep Fiddle Leaf",
          imagePath: "/spaces/dining-room/53.png",
          description: "Grounded mid-century dining sanctuary featuring warm russet terracotta walls, natural teak sliding-door sideboard, and lush tropical greenery.",
          moodTag: "Mid-Century Convivial Warmth",
          bestFor: "Solid teak credenzas, vintage dining chairs & oversized terracotta pots",
          colors: [
            { name: "Russet Terracotta Red", hex: "#994639", role: "Primary Wall" },
            { name: "Mid-Century Warm Teak", hex: "#B37F4C", role: "Dining Table & Sideboard" },
            { name: "Deep Fiddle Leaf Green", hex: "#2F4435", role: "Indoor Botanicals" },
          ],
        },
        {
          id: "dining-warm-2",
          title: "Venetian Spiced Red + Solid Walnut + Luminous Honey Glow",
          imagePath: "/spaces/dining-room/54.png",
          description: "High-drama dinner party elegance combining saturated spiced red walls with an organic petal chandelier and solid walnut timber banquet table.",
          moodTag: "Intimate Dinner Drama",
          bestFor: "Statement sculptural chandeliers, walnut dining tables & linen drapes",
          colors: [
            { name: "Venetian Spiced Red", hex: "#A03531", role: "Primary Wall" },
            { name: "Solid Walnut Wood", hex: "#915D39", role: "Dining Table & Chairs" },
            { name: "Luminous Honey Glow", hex: "#E8C68E", role: "Petal Pendant Lighting" },
          ],
        },
        {
          id: "dining-warm-3",
          title: "Amber Paprika Orange + Dark Walnut + Crisp Ivory White",
          imagePath: "/spaces/dining-room/55.png",
          description: "Sunlit afternoon warmth with amber paprika walls, dark walnut dining suite with cane chairs, and crisp architectural ivory door mouldings.",
          moodTag: "Sunlit Heritage Warmth",
          bestFor: "Cane-back dining chairs, ceramic centerpiece vases & polished floors",
          colors: [
            { name: "Amber Paprika Orange", hex: "#BC5521", role: "Primary Wall" },
            { name: "Dark Walnut Timber", hex: "#4A2E1C", role: "Dining Table & Chairs" },
            { name: "Crisp Ivory White", hex: "#F4EFEA", role: "Door Trim & Pendant" },
          ],
        },
        {
          id: "dining-warm-4",
          title: "Mustard Ochre + Terracotta Rust + Matte Black Drum",
          imagePath: "/spaces/dining-room/56.png",
          description: "Artful two-tone color blocking pairing mustard yellow upper walls with terracotta rust wainscoting and a modern matte black drum pendant.",
          moodTag: "Artful Two-Tone Sophistication",
          bestFor: "Wainscot panelling, modern drum chandeliers & striped flatweave rugs",
          colors: [
            { name: "Mustard Ochre Yellow", hex: "#E0AA31", role: "Upper Wall" },
            { name: "Terracotta Rust", hex: "#BA5939", role: "Wainscoting & Trim" },
            { name: "Matte Black Drum", hex: "#232325", role: "Chandelier & Chair Legs" },
          ],
        },
        {
          id: "dining-warm-5",
          title: "Chartreuse Lime Yellow + Crisp White + Warm Walnut",
          imagePath: "/spaces/dining-room/57.png",
          description: "Breezy celebratory dining room pairing bright chartreuse yellow walls and upholstered chairs with a classic white fireplace and walnut wood table.",
          moodTag: "Celebratory Citrus Radiance",
          bestFor: "Fireplace mantels, upholstered accent chairs & antique iron chandeliers",
          colors: [
            { name: "Chartreuse Lime Yellow", hex: "#D5CF40", role: "Primary Wall & Chairs" },
            { name: "Crisp White Mantel", hex: "#FFFFFF", role: "Fireplace & Wainscot" },
            { name: "Warm Walnut Wood", hex: "#493021", role: "Dining Table & Floors" },
          ],
        },
      ],
    },
    {
      id: "luxury-elegant",
      name: "Luxury Elegant",
      tagline: "Dramatic Banquet Grandeur, Emerald Velvets & Gilded Chandeliers",
      description:
        "Bespoke dining salons styled for unforgettable dinners, featuring dark emerald drapery, jewel-toned teal walls, cognac leather dining chairs, and sculptural brass chandeliers.",
      combos: [
        {
          id: "dining-luxury-1",
          title: "Deep Forest Emerald + Dark Teal Velvet + Gilded Chandelier Gold",
          imagePath: "/spaces/dining-room/88.png",
          description: "Intimate banquet splendor framing an emerald velvet dining suite with dark teal paneling and a monumental gilded ring chandelier.",
          moodTag: "Banquet Splendor & Velvet Emerald",
          bestFor: "Formal dining halls, round marble tables & gilded statement chandeliers",
          colors: [
            { name: "Forest Emerald", hex: "#162826", role: "Primary Wall & Paneling" },
            { name: "Dark Teal Velvet", hex: "#223B3D", role: "Upholstered Dining Chairs" },
            { name: "Chandelier Gold", hex: "#D4AF37", role: "Suspended Ring Chandelier" },
          ],
        },
        {
          id: "dining-luxury-2",
          title: "Regal Peacock Teal + Rich Cognac Timber + Brushed Brass",
          imagePath: "/spaces/dining-room/89.png",
          description: "Vibrant jewel-toned banquet grandeur combining saturated peacock teal walls with warm cognac timber dining furniture and brass light fixtures.",
          moodTag: "Peacock Jewel & Cognac Warmth",
          bestFor: "Long rectangular dinner tables, arched wine niches & art collections",
          colors: [
            { name: "Regal Peacock Teal", hex: "#194553", role: "Primary Accent Wall" },
            { name: "Rich Cognac Timber", hex: "#8A4D2E", role: "Solid Timber Dining Table" },
            { name: "Brushed Brass", hex: "#D9B864", role: "Pendants & Base Trim" },
          ],
        },
        {
          id: "dining-luxury-3",
          title: "Warm Cognac Amber + Saddle Leather + Walnut Bronze",
          imagePath: "/spaces/dining-room/90.png",
          description: "Warm opulent entertaining pairing sun-drenched cognac amber wall tones with stitched saddle leather chairs and fluted walnut pillars.",
          moodTag: "Saddle Leather & Amber Opulence",
          bestFor: "Wine tasting rooms, built-in credenzas & brass bar carts",
          colors: [
            { name: "Cognac Amber", hex: "#9E5936", role: "Primary Wall" },
            { name: "Saddle Leather", hex: "#704128", role: "Dining Chair Upholstery" },
            { name: "Walnut Bronze", hex: "#3B2519", role: "Table & Architectural Moldings" },
          ],
        },
        {
          id: "dining-luxury-4",
          title: "Moody Noir Slate + Smoked Glass + Sculptural Brass",
          imagePath: "/spaces/dining-room/91.png",
          description: "Nocturnal high-glamour dining wrapped in deep noir slate with smoked glass centerpiece lighting and polished brass architectural trim.",
          moodTag: "Nocturnal Glamour & Smoked Glass",
          bestFor: "Penthouse dining, black marble dining surfaces & modern linear chandeliers",
          colors: [
            { name: "Noir Slate", hex: "#14171A", role: "Primary Wall" },
            { name: "Smoked Glass Charcoal", hex: "#293238", role: "Cabinet & Centerpiece" },
            { name: "Sculptural Brass", hex: "#C7A055", role: "Linear Chandelier & Accents" },
          ],
        },
        // Combo 5 image pending from user - uncomment when image is provided:
        /*
        {
          id: "dining-luxury-5",
          title: "Burgundy Velvet + Antique Gold + Carrera White",
          imagePath: "/spaces/dining-room/placeholder.png",
          description: "Classic high-society dining pairing regal burgundy velvet drapery with antique gold accents and white marble tables.",
          moodTag: "Bordeaux Grandeur & Gilded Elegance",
          bestFor: "Ornate dining salons & festive entertaining",
          colors: [
            { name: "Burgundy Velvet", hex: "#541B26", role: "Primary Accent Wall" },
            { name: "Antique Gold", hex: "#D1AC51", role: "Chandelier & Trims" },
            { name: "Carrera White", hex: "#F5F3EF", role: "Tabletop Marble" },
          ],
        },
        */
      ],
    },
  ],
};
