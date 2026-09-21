import { RoomSpaceData } from "./types";

export const POOJA_ROOM_THEMES_DATA: RoomSpaceData = {
  slug: "pooja-room",
  name: "Pooja Room",
  heroTitle: "Pooja Room Colour Themes & Combinations",
  heroSubtitle:
    "Explore designer-curated 3-colour harmony palettes across Modern Minimalist, Warm Contemporary, Luxury Elegant, and Nature Inspired aesthetics for your sacred prayer space.",
  themes: [
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      tagline: "Sacred Alabaster, Warm Teak & Luminous Temple Brass",
      description:
        "Peaceful meditative mandir sanctuaries blending clean sacred white walls, carved teak woodwork, modern latticed jali, and warm devotional brass.",
      combos: [
        {
          id: "pooja-minimal-1",
          title: "Sacred Ivory Plaster + Natural Teak Timber + Antique Gold Brass",
          imagePath: "/spaces/pooja-room/32.png",
          description: "Serene spiritual solace pairing sunlit sacred ivory mandir walls with natural teak wood sanctum arches and glowing antique brass diyas.",
          moodTag: "Serene Spiritual Solace & Golden Aura",
          bestFor: "Custom teak mandir niches, brass hanging bells & warm cove illumination",
          colors: [
            { name: "Sacred Ivory Plaster", hex: "#EFE8DE", role: "Mandir Back Wall" },
            { name: "Natural Teak Timber", hex: "#BFA27E", role: "Carved Wooden Mandir" },
            { name: "Antique Gold Brass", hex: "#C7A35B", role: "Diyas & Sacred Idols" },
          ],
        },
        {
          id: "pooja-minimal-2",
          title: "Terracotta Blush + Slate Blue Niche + Honey Cane",
          imagePath: "/spaces/pooja-room/33.png",
          description: "Contemporary sacred warmth contrasting a terracotta blush backdrop with a peaceful slate blue idol alcove and honey cane jali panels.",
          moodTag: "Sacred Temple Warmth & Peaceful Harmony",
          bestFor: "Contemporary arched mandirs, woven cane jali doors & brass urli bowls",
          colors: [
            { name: "Terracotta Blush", hex: "#C59480", role: "Back Accent Wall" },
            { name: "Slate Blue Niche", hex: "#617785", role: "Inner Sanctuary Arch" },
            { name: "Honey Cane", hex: "#B87C43", role: "Mandir Doors & Panels" },
          ],
        },
        {
          id: "pooja-minimal-3",
          title: "Sandstone Cream + Carved White Marble + Temple Brass Gold",
          imagePath: "/spaces/pooja-room/34.png",
          description: "Pristine temple purity centering an intricately carved white marble mandir against warm sandstone cream walls and temple brass bells.",
          moodTag: "Pristine Marble Sanctum & Divine Light",
          bestFor: "Intricately carved marble pooja units, backlit om panels & floral garlands",
          colors: [
            { name: "Sandstone Cream", hex: "#E2D9C0", role: "Primary Wall" },
            { name: "Carved White Marble", hex: "#DCD5C9", role: "Sanctum Mandir Structure" },
            { name: "Temple Brass Gold", hex: "#C8A253", role: "Temple Bells & Urli" },
          ],
        },
        {
          id: "pooja-minimal-4",
          title: "Pristine Mandir White + Blonde Oak Frame + Devotional Brass",
          imagePath: "/spaces/pooja-room/35.png",
          description: "Modern Vedic-Japandi reverence with luminous mandir white walls, laser-cut blonde oak jali screens, and hanging brass ghanti bells.",
          moodTag: "Minimalist Japandi-Vedic Reverence",
          bestFor: "Laser-cut wooden jali screens, floating prayer platforms & soft lotus lights",
          colors: [
            { name: "Pristine Mandir White", hex: "#F4F0E8", role: "Ambient Sanctum Wall" },
            { name: "Blonde Oak Frame", hex: "#BA9265", role: "Modern Latticed Jali" },
            { name: "Devotional Brass", hex: "#C89F48", role: "Hanging Ghanti & Lamps" },
          ],
        },
        {
          id: "pooja-minimal-5",
          title: "Serene Sacred White + Polished Temple Brass + Matte Ebonite Black",
          imagePath: "/spaces/pooja-room/36.png",
          description: "Transcendent modern devotion framing brass deity idols with serene sacred white walls and grounding matte black idol pedestals.",
          moodTag: "Transcendent Modern Devotion",
          bestFor: "High-contrast idol pedestals, pure brass diya stands & meditation zones",
          colors: [
            { name: "Serene Sacred White", hex: "#F7F5F0", role: "Sanctum Walls" },
            { name: "Polished Temple Brass", hex: "#C49B48", role: "Deity Idols & Diyas" },
            { name: "Matte Ebonite Black", hex: "#202021", role: "Pedestal & Contrast Frame" },
          ],
        },
      ],
    },
    {
      id: "warm-contemporary",
      name: "Warm Contemporary",
      tagline: "Sacred Terracottas, Mandir Teaks & Auspicious Amber Halos",
      description:
        "Soulful devotional sanctums illuminated with warm peach ivories, rich carved teak mandirs, glowing brass bells, and earthy terracotta meditation arches.",
      combos: [
        {
          id: "pooja-warm-1",
          title: "Ambient Sanctum Cream + Warm Teak + Devotional Temple Brass",
          imagePath: "/spaces/pooja-room/68.png",
          description: "Divine backlighting framing a traditional temple arch, warm teak prayer platform, and glowing antique brass temple bell with Ganesha idol.",
          moodTag: "Divine Halo of Solace",
          bestFor: "Backlit arch niches, teak prayer storage & hanging brass bells",
          colors: [
            { name: "Ambient Sanctum Cream", hex: "#F6EFE3", role: "Sanctum Wall & Arch" },
            { name: "Warm Teak Mandir", hex: "#8A5636", role: "Wooden Mandir Cabinet" },
            { name: "Devotional Temple Brass", hex: "#C69E4C", role: "Bell, Idols & Diyas" },
          ],
        },
        {
          id: "pooja-warm-2",
          title: "Warm Peach Ivory + Solid Walnut + Marigold Diya Ochre",
          imagePath: "/spaces/pooja-room/69.png",
          description: "Intimate home pooja corner with warm peach ivory walls, a floating walnut altar shelf, Krishna canvas, and fresh marigold flower garlands.",
          moodTag: "Intimate Devotional Corner",
          bestFor: "Floating altar shelves, hanging bells & traditional clay diyas",
          colors: [
            { name: "Warm Peach Ivory", hex: "#ECD6C1", role: "Primary Wall" },
            { name: "Solid Walnut Altar", hex: "#724933", role: "Floating Wooden Shelf" },
            { name: "Marigold Diya Ochre", hex: "#D77F37", role: "Floral Garlands & Diyas" },
          ],
        },
        {
          id: "pooja-warm-3",
          title: "Warm Ochre Terracotta + Jute Mandala + Candlelit Amber",
          imagePath: "/spaces/pooja-room/70.png",
          description: "Tranquil meditation sanctuary featuring warm ochre terracotta walls, an intricate circular wooden mandala, and peaceful candlelight reflections.",
          moodTag: "Tranquil Mandala Contemplation",
          bestFor: "Floor meditation mats, carved mandala wheels & candle altars",
          colors: [
            { name: "Ochre Terracotta", hex: "#A9663D", role: "Primary Wall" },
            { name: "Jute Mandala & Rug", hex: "#C59B6C", role: "Wall Art & Floor Mat" },
            { name: "Candlelit Amber", hex: "#E29938", role: "Warm Flame Aura & Cushions" },
          ],
        },
        {
          id: "pooja-warm-4",
          title: "Terracotta Rose Stucco + Woven Cane Arch + Brass Singing Bowl",
          imagePath: "/spaces/pooja-room/71.png",
          description: "Atmospheric contemporary meditation chamber with terracotta rose arched alcoves, woven cane acoustic screens, and brass Tibetan singing bowls.",
          moodTag: "Atmospheric Vedic Resonance",
          bestFor: "Triple arched niches, cane acoustic panels & chanting spaces",
          colors: [
            { name: "Terracotta Rose Stucco", hex: "#A25B4C", role: "Arched Wall Plaster" },
            { name: "Woven Cane Arch", hex: "#B89269", role: "Latticed Wall Insets" },
            { name: "Singing Bowl Brass", hex: "#C5A259", role: "Incense & Metal Accents" },
          ],
        },
        /* 
        // NOTE: 5th image for Pooja Room Warm Contemporary is pending from user.
        // Uncomment and update once the 5th image (e.g. 72.png) is provided.
        {
          id: "pooja-warm-5",
          title: "Pending 5th Combination",
          imagePath: "/spaces/pooja-room/68.png",
          description: "Placeholder for 5th Pooja Room Warm Contemporary combination.",
          moodTag: "Sacred Devotion",
          bestFor: "Traditional and contemporary mandir spaces",
          colors: [
            { name: "Sacred Cream", hex: "#F7F2E7", role: "Primary Wall" },
            { name: "Teak Wood", hex: "#8E5633", role: "Mandir Altar" },
            { name: "Temple Brass", hex: "#C89F48", role: "Pooja Vessels" },
          ],
        },
        */
      ],
    },
    {
      id: "luxury-elegant",
      name: "Luxury Elegant",
      tagline: "Sacred Marble Sanctuaries, Gilded Brass & Divine Golden Radiancy",
      description:
        "High-sacred opulence celebrating carved Makarana marble alcoves, solid golden teak wood altars, auspicious glowing warm tones, and handcrafted heirloom brass diyas.",
      combos: [
        {
          id: "pooja-luxury-1",
          title: "Carved Ivory Marble + Champagne Gold + Warm Halo White",
          imagePath: "/spaces/pooja-room/102.png",
          description: "Luminous divine sanctum enveloped in intricate carved ivory marble walls, warm concealed halo backlighting, and gleaming champagne gold deity pedestals.",
          moodTag: "Divine Luminescence & Sacred White",
          bestFor: "Marble mandir pavilions, backlit Om engravings & crystal bell chandeliers",
          colors: [
            { name: "Carved Ivory Marble", hex: "#D6C3AE", role: "Mandir Sanctum Wall" },
            { name: "Champagne Gold", hex: "#9E7B58", role: "Mandir Altar & Detailing" },
            { name: "Warm Halo White", hex: "#EAE0D2", role: "Backlit Diffused Glow" },
          ],
        },
        {
          id: "pooja-luxury-2",
          title: "Rich Golden Teakwood + Sacred Ochre + Radiance Brass",
          imagePath: "/spaces/pooja-room/103.png",
          description: "Heritage temple grandeur crafted from polished golden teakwood with intricate jali latticework, sacred saffron-ochre accents, and radiant brass diya stands.",
          moodTag: "Heritage Teak Grandeur & Temple Warmth",
          bestFor: "Custom wooden mandirs, brass hanging bells & marigold garlands",
          colors: [
            { name: "Golden Teakwood", hex: "#7E481D", role: "Carved Wooden Mandir" },
            { name: "Sacred Ochre", hex: "#CF9B64", role: "Backdrop Fabric & Walls" },
            { name: "Radiance Brass", hex: "#E4BE7A", role: "Temple Bells & Diyas" },
          ],
        },
        // NOTE: 3 images for Pooja Room Luxury Elegant are pending from user.
        // Uncomment and update when images (combos 3, 4, 5) are provided:
        /*
        {
          id: "pooja-luxury-3",
          title: "Pending 3rd Combination",
          imagePath: "/spaces/pooja-room/placeholder.png",
          description: "Placeholder for 3rd Pooja Room Luxury Elegant combination.",
          moodTag: "Divine Radiance",
          bestFor: "Pooja and meditation spaces",
          colors: [
            { name: "Sacred Ochre", hex: "#CF9B64", role: "Primary Wall" },
            { name: "Polished Gold", hex: "#D4AF37", role: "Altar Trims" },
            { name: "Warm Teak", hex: "#7E481D", role: "Mandir Woodwork" },
          ],
        },
        {
          id: "pooja-luxury-4",
          title: "Pending 4th Combination",
          imagePath: "/spaces/pooja-room/placeholder.png",
          description: "Placeholder for 4th Pooja Room Luxury Elegant combination.",
          moodTag: "Sacred Serenity",
          bestFor: "Pooja and meditation spaces",
          colors: [
            { name: "Ivory Marble", hex: "#ECE6DD", role: "Primary Wall" },
            { name: "Antique Brass", hex: "#C5A059", role: "Diyas & Bells" },
            { name: "Deep Saffron", hex: "#B85D26", role: "Accent Details" },
          ],
        },
        {
          id: "pooja-luxury-5",
          title: "Pending 5th Combination",
          imagePath: "/spaces/pooja-room/placeholder.png",
          description: "Placeholder for 5th Pooja Room Luxury Elegant combination.",
          moodTag: "Sacred Transcendence",
          bestFor: "Pooja and meditation spaces",
          colors: [
            { name: "Sandstone Beige", hex: "#D5C3A8", role: "Primary Wall" },
            { name: "Gilded Gold", hex: "#DAA520", role: "Mandir Carvings" },
            { name: "Rosewood", hex: "#5C2A1E", role: "Floor & Base" },
          ],
        },
        */
      ],
    },
    {
      id: "nature-inspired",
      name: "Nature Inspired",
      tagline: "Sacred Sandalwood, Fresh Basil Green & Divine Vedic Serenity",
      description:
        "Sacred natural mandir sanctums embracing auspicious sandalwood bark, golden marigold tones, fresh tulsi leaf greens, and carved teakwood altars.",
      combos: [
        {
          id: "pooja-nature-1",
          title: "Sacred Sandalwood Bark + Golden Marigold + Leaf Green",
          imagePath: "/spaces/pooja-room/136.png",
          description: "Vedic natural sanctum framed in rich sandalwood bark tones, golden marigold fabric backdrops, and fresh leafy botanical accents.",
          moodTag: "Vedic Sandalwood & Marigold Devotion",
          bestFor: "Carved wooden mandir units, brass oil lamps & floral garlands",
          colors: [
            { name: "Sandalwood Bark", hex: "#5E3406", role: "Mandir Altar & Wood" },
            { name: "Golden Marigold", hex: "#7E3E04", role: "Backdrop Drape" },
            { name: "Leaf Green", hex: "#7E8E34", role: "Botanical Insets & Decor" },
          ],
        },
        {
          id: "pooja-nature-2",
          title: "Temple Olive + Sacred Brass + Pure Sandstone",
          imagePath: "/spaces/pooja-room/137.png",
          description: "Quiet contemplative prayer alcove pairing peaceful temple olive walls with handcrafted sacred brass vessels and warm sandstone altar.",
          moodTag: "Temple Olive & Sandstone Stillness",
          bestFor: "Carved stone mandir niches, incense holders & morning meditation",
          colors: [
            { name: "Temple Olive", hex: "#82825E", role: "Primary Wall" },
            { name: "Sacred Brass", hex: "#5E5E36", role: "Diyas & Bells" },
            { name: "Pure Sandstone", hex: "#A8A888", role: "Altar Base & Floor" },
          ],
        },
        // NOTE: 3 images for Pooja Room Nature Inspired are pending from user.
        // Uncomment and update when images (combos 3, 4, 5) are provided:
        /*
        {
          id: "pooja-nature-3",
          title: "Pending 3rd Combination",
          imagePath: "/spaces/pooja-room/placeholder.png",
          description: "Placeholder for 3rd Pooja Room Nature Inspired combination.",
          moodTag: "Sacred Nature",
          bestFor: "Pooja and meditation spaces",
          colors: [
            { name: "Tulsi Green", hex: "#4A6B42", role: "Accent Wall" },
            { name: "Sacred Cream", hex: "#F6F2E8", role: "Primary Wall" },
            { name: "Teak Wood", hex: "#7E481D", role: "Mandir Structure" },
          ],
        },
        {
          id: "pooja-nature-4",
          title: "Pending 4th Combination",
          imagePath: "/spaces/pooja-room/placeholder.png",
          description: "Placeholder for 4th Pooja Room Nature Inspired combination.",
          moodTag: "Sacred Earth",
          bestFor: "Pooja and meditation spaces",
          colors: [
            { name: "Turmeric Gold", hex: "#D49B28", role: "Altar Backdrop" },
            { name: "Ivory Marble", hex: "#ECEAE4", role: "Primary Wall" },
            { name: "Temple Brass", hex: "#C89F48", role: "Pooja Vessels" },
          ],
        },
        {
          id: "pooja-nature-5",
          title: "Pending 5th Combination",
          imagePath: "/spaces/pooja-room/placeholder.png",
          description: "Placeholder for 5th Pooja Room Nature Inspired combination.",
          moodTag: "Sacred Bloom",
          bestFor: "Pooja and meditation spaces",
          colors: [
            { name: "Lotus Rose", hex: "#C8868A", role: "Accent Wall" },
            { name: "Pure Alabaster", hex: "#FAF8F2", role: "Primary Wall" },
            { name: "Rosewood", hex: "#4E241A", role: "Altar Base" },
          ],
        },
        */
      ],
    },
    // NOTE: Classic Indian theme images for Pooja Room are pending from user.
    // Uncomment and add image paths when images are provided:
    /*
    {
      id: "classic-indian",
      name: "Classic Indian",
      tagline: "Temple Vermilion, Sandalwood & Traditional Brass Sanctums",
      description:
        "Sacred Indian temple sanctums wrapped in deep kumkum vermilion, hand-carved sheesham timber mandirs, sacred brass bells, and pure marble flooring.",
      combos: [
        {
          id: "pooja-classic-1",
          title: "Carved Teakwood + Auspicious Vermilion + Polished Brass",
          imagePath: "/spaces/pooja-room/placeholder.png",
          description: "Traditional temple sanctum featuring hand-carved teakwood mandir, auspicious vermilion backdrop, and brass oil lamps.",
          moodTag: "Vedic Devotion & Mandir Grandeur",
          bestFor: "Pooja mandirs, brass hanging bells & diya stands",
          colors: [
            { name: "Carved Teakwood", hex: "#5C2A1E", role: "Mandir Altar" },
            { name: "Auspicious Vermilion", hex: "#A83226", role: "Altar Backdrop" },
            { name: "Polished Brass", hex: "#D4AF37", role: "Pooja Vessels & Bells" },
          ],
        },
      ],
    },
    */
  ],
};
