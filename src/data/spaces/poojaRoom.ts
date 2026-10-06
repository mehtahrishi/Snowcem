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
          title: "Cream Lime Wash + Natural Oak Bench + Pierced Brass",
          imagePath: "/spaces/pooja-room/32.png",
          description:
            "Serene spiritual solace pairing sunlit cream lime wash plaster walls with a natural oak prayer bench, woven jute mat, and glowing pierced brass sconces.",
          moodTag: "Serene Spiritual Solace & Golden Aura",
          bestFor: "Custom wooden prayer niches, warm cove lighting & meditation spaces",
          colors: [
            { name: "Cream Lime Wash", hex: "#EDE5D8", role: "Sanctum Wall Plaster (60%)" },
            { name: "Natural Oak Bench", hex: "#B8966E", role: "Prayer Bench & Woven Mat (30%)" },
            { name: "Pierced Brass & Gold", hex: "#CCA55C", role: "Wall Sconces & Medallions (10%)" },
          ],
        },
        {
          id: "pooja-minimal-2",
          title: "Terracotta Rose + Slate Blue Alcove + Teak Cane Cabinet",
          imagePath: "/spaces/pooja-room/33.png",
          description:
            "Contemporary sacred warmth contrasting a terracotta rose backdrop with a peaceful slate blue idol alcove, teak cane cabinet, and sky blue prayer mat.",
          moodTag: "Sacred Temple Warmth & Peaceful Harmony",
          bestFor: "Contemporary arched mandirs, woven cane jali doors & brass lantern niches",
          colors: [
            { name: "Terracotta Rose", hex: "#CB927C", role: "Backdrop Accent Wall (60%)" },
            { name: "Slate Blue Alcove", hex: "#617684", role: "Inner Sanctuary Arch (30%)" },
            { name: "Teak Cane & Sky Blue", hex: "#B9854B", role: "Cabinet & Prayer Mat (10%)" },
          ],
        },
        {
          id: "pooja-minimal-3",
          title: "Sandstone Cream + Carved White Marble + Temple Brass Gold",
          imagePath: "/spaces/pooja-room/34.png",
          description:
            "Pristine temple purity centering an intricately carved white marble mandir and floral jali screen against warm sandstone cream walls and temple brass bells.",
          moodTag: "Pristine Marble Sanctum & Divine Light",
          bestFor: "Intricately carved marble pooja units, backlit jali screens & floral garlands",
          colors: [
            { name: "Sandstone Cream", hex: "#E4DAC9", role: "Primary Wall & Arch (60%)" },
            { name: "Carved White Marble", hex: "#D8CEC0", role: "Mandir Altar & Jali (30%)" },
            { name: "Temple Brass Gold", hex: "#C49B49", role: "Ganesha Idol, Diyas & Bells (10%)" },
          ],
        },
        {
          id: "pooja-minimal-4",
          title: "Ivory Sanctum White + Stepped White Altar + Temple Brass",
          imagePath: "/spaces/pooja-room/35.png",
          description:
            "Modern Vedic elegance with serene ivory mandir sanctum walls, stepped pure white deity pedestal, light oak lower cabinet, and hanging temple brass bells.",
          moodTag: "Minimalist Japandi-Vedic Reverence",
          bestFor: "Stepped prayer platforms, brass hanging bells & sheer linen curtains",
          colors: [
            { name: "Ivory Sanctum White", hex: "#F4EFE6", role: "Sanctum Wall & Drapes (60%)" },
            { name: "Stepped Altar White", hex: "#FAF8F4", role: "Deity Pedestal & Oak Base (30%)" },
            { name: "Temple Brass & Ghanti", hex: "#C89F48", role: "Ganesha Idol & Hanging Bells (10%)" },
          ],
        },
        {
          id: "pooja-minimal-5",
          title: "Chalk White Wall + Matte Ebonite Black + Devotional Brass",
          imagePath: "/spaces/pooja-room/36.png",
          description:
            "Transcendent modern devotion framing brass deity idols with crisp chalk white walls and grounding matte ebonite black floating altar shelf.",
          moodTag: "Transcendent Modern Devotion",
          bestFor: "High-contrast altar shelves, pure brass diya stands & meditation zones",
          colors: [
            { name: "Chalk White Wall", hex: "#EAE7E2", role: "Sanctum Wall (60%)" },
            { name: "Matte Ebonite Black", hex: "#2A2A2B", role: "Floating Altar Shelf (30%)" },
            { name: "Devotional Brass", hex: "#C9A048", role: "Ganesha Idol, Diyas & Bells (10%)" },
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
          title: "Warm Sand Halo + Solid Teak Cabinet + Devotional Temple Brass",
          imagePath: "/spaces/pooja-room/68.png",
          description:
            "Divine halo backlighting framing a traditional temple arch, solid teak prayer cabinet, geometric jali screen, and glowing antique brass temple bell with Ganesha idol.",
          moodTag: "Divine Halo of Solace",
          bestFor: "Backlit arch niches, teak prayer storage & hanging brass bells",
          colors: [
            { name: "Warm Sand Backlit Arch", hex: "#EFE6D5", role: "Sanctum Arch & Wall (60%)" },
            { name: "Solid Teak Mandir", hex: "#7E4D2B", role: "Teak Cabinet & Jali (30%)" },
            { name: "Devotional Temple Brass", hex: "#C59A44", role: "Hanging Bell, Idol & Diyas (10%)" },
          ],
        },
        {
          id: "pooja-warm-2",
          title: "Warm Peach Cream + Solid Walnut Shelf + Marigold Garland Ochre",
          imagePath: "/spaces/pooja-room/69.png",
          description:
            "Intimate home pooja corner with warm peach cream walls, floating walnut altar shelf, serene Krishna canvas painting, and fresh marigold flower garlands.",
          moodTag: "Intimate Devotional Corner",
          bestFor: "Floating altar shelves, hanging bells & traditional clay diyas",
          colors: [
            { name: "Warm Peach Cream", hex: "#ECCFB7", role: "Primary Wall (60%)" },
            { name: "Solid Walnut Shelf", hex: "#7E4F32", role: "Floating Altar Shelf & Frame (30%)" },
            { name: "Marigold Garland Ochre", hex: "#E4882F", role: "Floral Garlands, Diyas & Tulsi (10%)" },
          ],
        },
        {
          id: "pooja-warm-3",
          title: "Earthen Ochre Terracotta + Carved Wood Mandala + Candlelit Amber",
          imagePath: "/spaces/pooja-room/70.png",
          description:
            "Tranquil meditation sanctuary featuring earthen ochre terracotta walls, an intricate circular carved wooden mandala, low teak altar bench, and peaceful candlelight.",
          moodTag: "Tranquil Mandala Contemplation",
          bestFor: "Floor meditation mats, carved mandala wheels & candle altars",
          colors: [
            { name: "Ochre Terracotta", hex: "#AC6035", role: "Primary Wall Surface (60%)" },
            { name: "Carved Mandala & Teak", hex: "#C28956", role: "Mandala Panel & Altar Bench (30%)" },
            { name: "Candlelit Amber & Brass", hex: "#FFC45D", role: "Candle Flame Aura & Buddha (10%)" },
          ],
        },
        {
          id: "pooja-warm-4",
          title: "Terracotta Rose Stucco + Woven Cane Inset + Brass Singing Bowl",
          imagePath: "/spaces/pooja-room/71.png",
          description:
            "Atmospheric contemporary meditation chamber with terracotta rose arched alcoves, woven cane acoustic panels, low plinth platform, and brass Tibetan singing bowls.",
          moodTag: "Atmospheric Vedic Resonance",
          bestFor: "Triple arched niches, cane acoustic panels & chanting spaces",
          colors: [
            { name: "Terracotta Rose Stucco", hex: "#9F5547", role: "Arched Wall Plaster (60%)" },
            { name: "Woven Cane Inset", hex: "#B7895E", role: "Latticed Wall Insets (30%)" },
            { name: "Singing Bowl Brass", hex: "#BFA266", role: "Incense, Bowls & Cushions (10%)" },
          ],
        },
      ],
    },
    {
      id: "luxury-elegant",
      name: "Luxury Elegant",
      tagline: "Sacred Marble Sanctuaries, Gilded Brass & Divine Golden Radiancy",
      description:
        "High-sacred opulence celebrating carved marble alcoves, solid golden teak wood altars, auspicious glowing warm tones, and handcrafted heirloom brass diyas.",
      combos: [
        {
          id: "pooja-luxury-1",
          title: "Luminous Warm Stucco + Teak Credenza + Heirloom Temple Brass",
          imagePath: "/spaces/pooja-room/102.png",
          description:
            "Palatial prayer sanctuary featuring luminous warm stucco walls, fluted teakwood credenza with white marble counter, antique brass hanging bells, and deity panels.",
          moodTag: "Divine Luminescence & Sacred Teak",
          bestFor: "Fluted credenzas, framed deity medallions & hanging brass bells",
          colors: [
            { name: "Luminous Warm Stucco", hex: "#ECE6DC", role: "Primary Mandir Wall (60%)" },
            { name: "Teak & White Marble", hex: "#A26D45", role: "Credenza & Marble Top (30%)" },
            { name: "Heirloom Temple Brass", hex: "#BFA05B", role: "Hanging Bells & Deity Panels (10%)" },
          ],
        },
        {
          id: "pooja-luxury-2",
          title: "Backlit Lotus Arch + Forest Green Altar + Gilded Brass Lotus",
          imagePath: "/spaces/pooja-room/103.png",
          description:
            "Regal divine mandir pavilion featuring a luminous backlit scalloped lotus arch, forest green lacquered altar console, fluted teak doors, and gilded lotus inlays.",
          moodTag: "Regal Lotus Pavilion & Backlit Sanctum",
          bestFor: "Scalloped arch niches, fluted partition doors & crystal chandeliers",
          colors: [
            { name: "Backlit Lotus Arch", hex: "#EDE6DA", role: "Scalloped Mandir Niche (60%)" },
            { name: "Forest Green Altar Console", hex: "#2C4035", role: "Lacquered Console & Fluted Teak (30%)" },
            { name: "Gilded Brass & Marble Krishna", hex: "#C5A04D", role: "Lotus Inlays, Diyas & Idol (10%)" },
          ],
        },
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
          title: "Pistachio Meadow Green + Carved Teak Sanctum + Marble & Brass",
          imagePath: "/spaces/pooja-room/136.png",
          description:
            "Vedic natural sanctum pairing fresh pistachio meadow green paneled walls with a warm carved teakwood mandir cabinet, white marble Ganesha, and hanging brass lamps.",
          moodTag: "Vedic Pistachio & Teak Sanctuary",
          bestFor: "Paneled green mandir walls, carved teak shrines & brass diyas",
          colors: [
            { name: "Pistachio Meadow Green", hex: "#799863", role: "Paneled Wall Surface (60%)" },
            { name: "Carved Teak Sanctum", hex: "#7D532C", role: "Mandir Cabinet & Arch (30%)" },
            { name: "White Marble & Temple Brass", hex: "#C8A351", role: "Ganesha Idol & Hanging Diyas (10%)" },
          ],
        },
        {
          id: "pooja-nature-2",
          title: "Celadon Green Wall + Multi-Tier Teak Mandir + Cascading Foliage",
          imagePath: "/spaces/pooja-room/137.png",
          description:
            "Quiet contemplative prayer alcove pairing calming celadon green walls with an intricate multi-tier teakwood mandir shrine and lush cascading pothos greenery.",
          moodTag: "Celadon Stillness & Botanical Mandir",
          bestFor: "Wall-mounted tiered shrines, indoor trailing plants & meditation nooks",
          colors: [
            { name: "Celadon Green Wall", hex: "#9CAEA0", role: "Sanctum Wall Finish (60%)" },
            { name: "Multi-Tier Teak Mandir", hex: "#91613A", role: "Carved Wooden Shrine (30%)" },
            { name: "Cascading Foliage & Ceramic", hex: "#4E6B39", role: "Pothos Vines & Monk Statues (10%)" },
          ],
        },
      ],
    },
  ],
};
