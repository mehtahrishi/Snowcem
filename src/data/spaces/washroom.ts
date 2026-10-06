import { RoomSpaceData } from "./types";

export const WASHROOM_THEMES_DATA: RoomSpaceData = {
  slug: "washroom",
  name: "Washroom",
  heroTitle: "Washroom Colour Themes & Combinations",
  heroSubtitle:
    "Explore designer-curated 3-colour harmony palettes across Modern Minimalist, Warm Contemporary, Luxury Elegant, Nature Inspired, and Classic Indian aesthetics for your washroom sanctuary.",
  themes: [
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      tagline: "Spa Sanctuaries, Microcement Tones & Biophilic Solace",
      description:
        "Seamless microcement textures, sculptural white basins, warm blonde timber vanities, and brushed brass fixtures designed for pure daily restoration.",
      combos: [
        {
          id: "wash-minimal-1",
          title: "Sand Alabaster + Matte White Tub + Fiddle Leaf Green",
          imagePath: "/spaces/wash-room/27.png",
          description:
            "Biophilic wet-room sanctuary enveloped in seamless sand alabaster lime plaster, a sculptural matte white freestanding soaking tub, and fresh fiddle leaf greenery.",
          moodTag: "Biophilic Spa Sanctuary & Organic Calm",
          bestFor: "Wet rooms, freestanding soaking tubs & natural skylights",
          colors: [
            { name: "Sand Alabaster", hex: "#E6DDD2", role: "Waterproof Lime Plaster (60%)" },
            { name: "Matte White Soaking Tub", hex: "#FAF8F5", role: "Freestanding Tub & Oak Ledge (30%)" },
            { name: "Fiddle Leaf Green", hex: "#456734", role: "Tropical Foliage & Brushed Tapware (10%)" },
          ],
        },
        {
          id: "wash-minimal-2",
          title: "Warm Chalk White + Pure Composite White + Matte Black",
          imagePath: "/spaces/wash-room/28.png",
          description:
            "High-contrast monochrome sanctuary pairing warm chalk white tiles with a monolithic pure white soaking tub and dramatic matte black floor tapware.",
          moodTag: "High-Contrast Monochrome Zen",
          bestFor: "Floating vanities, frameless glass showers & linear drains",
          colors: [
            { name: "Warm Chalk White", hex: "#F0ECE5", role: "Wall Tile & Waterproof Plaster (60%)" },
            { name: "Pure Composite White", hex: "#FAF9F6", role: "Oval Bathtub & Basin (30%)" },
            { name: "Matte Black", hex: "#1C1C1D", role: "Floor-Mount Mixer & Hardware (10%)" },
          ],
        },
        {
          id: "wash-minimal-3",
          title: "Peach Blush Nude + Pristine White + Chrome & Wood",
          imagePath: "/spaces/wash-room/29.png",
          description:
            "Sculptural wellness suite softening the washroom with delicate peach blush nude plaster walls, architectural white floating vanity, and polished chrome fixtures.",
          moodTag: "Sculptural Warmth & Soft Geometry",
          bestFor: "Curved shower arches, microcement niches & backlit pill mirrors",
          colors: [
            { name: "Peach Blush Nude", hex: "#D8B4A6", role: "Microcement Plaster Walls (60%)" },
            { name: "Pristine White Vanity", hex: "#FAF8F5", role: "Floating Vanity & Basin (30%)" },
            { name: "Chrome & Blonde Oak", hex: "#B0A9A2", role: "Gooseneck Tap & Mirror Trim (10%)" },
          ],
        },
        {
          id: "wash-minimal-4",
          title: "Sand Alabaster + Cashmere Wood Vanity + Brushed Brass",
          imagePath: "/spaces/wash-room/30.png",
          description:
            "Sun-drenched resort luxury pairing textured sand alabaster walls with cashmere shaker vanity cabinetry, oval soaking tub, and brushed brass wall sconces.",
          moodTag: "Sun-Drenched Resort Luxury",
          bestFor: "Shaker timber vanities, warm LED sconces & travertine ledges",
          colors: [
            { name: "Sand Alabaster", hex: "#E6DDD0", role: "Seamless Wall Plaster (60%)" },
            { name: "Cashmere Vanity Wood", hex: "#C5A58A", role: "Wood Cabinetry & Tub (30%)" },
            { name: "Brushed Brass", hex: "#BF9E54", role: "Wall Mixers & Sconces (10%)" },
          ],
        },
        {
          id: "wash-minimal-5",
          title: "Linen Chalk Plaster + Travertine Stone + Oak Timber",
          imagePath: "/spaces/wash-room/31.png",
          description:
            "Tactile earthy wellness centering a hand-carved travertine stone vessel basin against seamless linen chalk plaster walls and floating oak shelving.",
          moodTag: "Tactile Earth & Pure Wellness",
          bestFor: "Vessel sinks, monolithic stone countertops & hidden storage",
          colors: [
            { name: "Linen Chalk Plaster", hex: "#EDE7DC", role: "Seamless Wall Plaster (60%)" },
            { name: "Travertine Stone", hex: "#CEBEAA", role: "Carved Basin & Oak Shelf (30%)" },
            { name: "Bonsai Olive & Ceramics", hex: "#3E6135", role: "Miniature Bonsai & Vessel (10%)" },
          ],
        },
      ],
    },
    {
      id: "warm-contemporary",
      name: "Warm Contemporary",
      tagline: "Terracotta Plasters, Fluted Teaks & Earthy Sage Duos",
      description:
        "Sensual warm spa environments wrapped in peach clay waterproof microcement, curved fluted timber vanities, arched mirrors, and grounded sage tile contrasts.",
      combos: [
        {
          id: "wash-warm-1",
          title: "Terracotta Bisque + Blonde Oak Vanity + Woven Bamboo Gold",
          imagePath: "/spaces/wash-room/63.png",
          description:
            "Organic spa serenity pairing tactile terracotta bisque plaster walls with a floating blonde oak vanity, round mirror, and woven bamboo pendant lantern.",
          moodTag: "Organic Spa Serenity",
          bestFor: "Circular backlit mirrors, floating oak vanities & vessel basins",
          colors: [
            { name: "Terracotta Bisque", hex: "#C39178", role: "Waterproof Wall Plaster (60%)" },
            { name: "Blonde Oak Vanity", hex: "#BC946F", role: "Floating Timber Cabinet (30%)" },
            { name: "Woven Bamboo Gold", hex: "#E5BE82", role: "Pendant Lantern & Basin (10%)" },
          ],
        },
        {
          id: "wash-warm-2",
          title: "Spiced Taupe Cinnamon + Teak Vanity + Matte Black Tapware",
          imagePath: "/spaces/wash-room/64.png",
          description:
            "Warm grounded modern retreat combining spiced taupe cinnamon plaster with a warm teak vanity, pure white bathtub, and sleek matte black faucets.",
          moodTag: "Spiced Earth & Contemporary Teak",
          bestFor: "Natural light bathrooms, teak joinery & black accents",
          colors: [
            { name: "Spiced Taupe Cinnamon", hex: "#B38E78", role: "Seamless Plaster Walls (60%)" },
            { name: "Teak Wood Vanity", hex: "#966244", role: "Joinery & White Bathtub (30%)" },
            { name: "Matte Black & Ficus", hex: "#1C1C1D", role: "Tapware & Potted Greenery (10%)" },
          ],
        },
        {
          id: "wash-warm-3",
          title: "Rose Peach Nude + Fluted Wood Apron + Smoked Glass",
          imagePath: "/spaces/wash-room/65.png",
          description:
            "Soft romantic bath retreat pairing powdery rose peach plaster walls with a fluted wood apron bathtub, milking stool, and smoked glass globe pendants.",
          moodTag: "Blush Sanctuary & Fluted Timber",
          bestFor: "Fluted bathtub skirts, powder bathrooms & amber pendant lights",
          colors: [
            { name: "Rose Peach Nude", hex: "#CF9F88", role: "Matte Plaster Finish (60%)" },
            { name: "Fluted Wood Apron", hex: "#B3835B", role: "Tub Skirt & Stool (30%)" },
            { name: "Smoked Glass & Fern", hex: "#D8CFBF", role: "Pendant Light & Foliage (10%)" },
          ],
        },
        {
          id: "wash-warm-4",
          title: "Spiced Terracotta Rust + Fluted Sage Green + Opal Globe",
          imagePath: "/spaces/wash-room/66.png",
          description:
            "Bespoke architectural statement contrasting deep spiced terracotta rust stucco and arched doorway with fluted sage green wainscoting and glowing opal sphere sconces.",
          moodTag: "Bi-Color Architectural Expression",
          bestFor: "Half-wall wainscoting, arched openings & pedestal washstands",
          colors: [
            { name: "Spiced Terracotta Rust", hex: "#AC4F39", role: "Upper Wall Plaster & Arch (60%)" },
            { name: "Fluted Sage Green", hex: "#8B9E7A", role: "Fluted Wainscot Wall (30%)" },
            { name: "Opal Globe & Terracotta Basin", hex: "#F5F2EB", role: "Sphere Sconces & Basin (10%)" },
          ],
        },
        {
          id: "wash-warm-5",
          title: "Terracotta Clay + Pristine Counter White + Chrome Mixer",
          imagePath: "/spaces/wash-room/67.png",
          description:
            "Warm earthy powder room wrapped in terracotta clay stucco, balanced with a crisp white vanity counter, oval basin, and polished chrome gooseneck tap.",
          moodTag: "Sunlit Terracotta Powder Room",
          bestFor: "Powder rooms, floating white counters & lush potted plants",
          colors: [
            { name: "Terracotta Clay", hex: "#AB6A51", role: "Earthen Plaster Walls (60%)" },
            { name: "Pristine Counter White", hex: "#F8F6F2", role: "Vanity Counter & Basin (30%)" },
            { name: "Chrome & Fresh Fern", hex: "#BAC0C6", role: "Gooseneck Mixer & Maidenhair (10%)" },
          ],
        },
      ],
    },
    {
      id: "luxury-elegant",
      name: "Luxury Elegant",
      tagline: "Deep Wine Velvet, Monolithic Travertine & Moody Slate",
      description:
        "High-drama architectural luxury featuring deep burgundy merlot plaster, monolithic carved stone vanities, halo-backlit capsule mirrors, and burnished brass fittings.",
      combos: [
        {
          id: "wash-luxury-1",
          title: "Spiced Almond Terracotta + Terracotta Rose + Halo Backlit",
          imagePath: "/spaces/wash-room/97.png",
          description:
            "Dramatic arched vanity niche with spiced almond terracotta plaster, deep terracotta rose vanity unit, and soft halo-backlit circular mirror.",
          moodTag: "Arched Alcove & Golden Halo Glow",
          bestFor: "Recessed vanity niches, halo mirrors & vessel basins",
          colors: [
            { name: "Spiced Almond Terracotta", hex: "#C89C82", role: "Arched Plaster Walls (60%)" },
            { name: "Terracotta Rose Vanity", hex: "#A7614B", role: "Cabinetry & Recess (30%)" },
            { name: "Halo Backlit & Ceramic", hex: "#FAF8F5", role: "Mirror Glow & White Basin (10%)" },
          ],
        },
        {
          id: "wash-luxury-2",
          title: "Spiced Chocolate Terracotta + White Monolith + Matte Black",
          imagePath: "/spaces/wash-room/98.png",
          description:
            "Bold sculptural elegance pairing deep spiced chocolate terracotta walls with a monolithic white double trough sink and minimal matte black round mirror.",
          moodTag: "Sculptural Monolith & Moody Earth",
          bestFor: "Double trough basins, wall-mount spouts & slatted oak shelves",
          colors: [
            { name: "Spiced Chocolate Terracotta", hex: "#6D4336", role: "Primary Wall Surface (60%)" },
            { name: "White Monolith Basin", hex: "#FAF9F7", role: "Trough Sink & Oak Shelf (30%)" },
            { name: "Matte Black Hardware", hex: "#201E1D", role: "Round Mirror & Wall Tap (10%)" },
          ],
        },
        {
          id: "wash-luxury-3",
          title: "Deep Crimson Burgundy + Travertine Block + Capsule Mirror Glow",
          imagePath: "/spaces/wash-room/99.png",
          description:
            "Opulent haute-couture bath enveloped in deep crimson burgundy velvet plaster, anchored by a monolithic travertine stone floating vanity and glowing capsule mirror.",
          moodTag: "Haute Burgundy & Travertine Opulence",
          bestFor: "Master bathrooms, stone blocks & backlit pill mirrors",
          colors: [
            { name: "Deep Crimson Burgundy", hex: "#842927", role: "Velvet Plaster Walls (60%)" },
            { name: "Travertine Stone Block", hex: "#C4AFA0", role: "Monolithic Floating Vanity (30%)" },
            { name: "Capsule Glow & Plum Leaves", hex: "#FAF8F6", role: "Backlit Mirror & Foliage (10%)" },
          ],
        },
        {
          id: "wash-luxury-4",
          title: "Burgundy Merlot Wine + Concrete Monolith + Brushed Brass",
          imagePath: "/spaces/wash-room/100.png",
          description:
            "Moody Parisian bath retreat pairing rich burgundy merlot wine plaster with a polished industrial concrete monolithic basin and brushed brass wall tapware.",
          moodTag: "Parisian Merlot & Polished Concrete",
          bestFor: "Powder rooms, concrete pedestal basins & pendant downlights",
          colors: [
            { name: "Burgundy Merlot Wine", hex: "#6D212F", role: "Feature Wall Plaster (60%)" },
            { name: "Polished Concrete", hex: "#7B7471", role: "Monolithic Basin Slab (30%)" },
            { name: "Brushed Brass", hex: "#BA9455", role: "Wall Mixer & Pendant (10%)" },
          ],
        },
        {
          id: "wash-luxury-5",
          title: "Moody Slate Charcoal + Solid Oak Counter + Warm Candlelight",
          imagePath: "/spaces/wash-room/101.png",
          description:
            "Atmospheric Nordic-gothic wellness sanctuary combining deep slate charcoal stone walls with a solid oak floating counter, chiseled basin, and warm lantern glow.",
          moodTag: "Slate Charcoal & Nordic Candlelight",
          bestFor: "Walk-in wet rooms, chiseled stone basins & ambient candlelight",
          colors: [
            { name: "Moody Slate Charcoal", hex: "#2E3A42", role: "Primary Wall Tiles (60%)" },
            { name: "Solid Oak Floating Counter", hex: "#B88B58", role: "Counter & Granite Basin (30%)" },
            { name: "Warm Candle Glow", hex: "#FDE5A9", role: "Lanterns & Mirror Bevel (10%)" },
          ],
        },
      ],
    },
    {
      id: "nature-inspired",
      name: "Nature Inspired",
      tagline: "Organic Meadow Sage, Celadon Spa & Classic Olive Wood",
      description:
        "Spa wellness environments enveloped in restorative meadow sage, celadon bamboo tones, fluted timber vanity consoles, and natural stone soaking tubs.",
      combos: [
        {
          id: "wash-nature-1",
          title: "Celadon Meadow Sage + Fluted Timber Vanity + Tropical Palm",
          imagePath: "/spaces/wash-room/131.png",
          description:
            "Natural organic bath retreat featuring calming celadon meadow sage walls, fluted timber vanity, freestanding white soaking tub, and tropical palms.",
          moodTag: "River Reed & Flowing Water Calm",
          bestFor: "Freestanding bathtubs, fluted vanities & botanical plants",
          colors: [
            { name: "Celadon Meadow Sage", hex: "#97AA87", role: "Primary Wall Paint (60%)" },
            { name: "Fluted Timber Vanity", hex: "#AD845B", role: "Wood Vanity & White Tub (30%)" },
            { name: "Tropical Palm Green", hex: "#385C32", role: "Botanical Palms & Hardware (10%)" },
          ],
        },
        {
          id: "wash-nature-2",
          title: "Meadow Sage + Warm Cream Shower Tiles + Blonde Oak",
          imagePath: "/spaces/wash-room/132.png",
          description:
            "Sunlit Zen powder room combining calming meadow sage walls with warm cream shower grid tiles, floating blonde oak shelf, and brushed nickel hardware.",
          moodTag: "Zen Sage & Travertine Warmth",
          bestFor: "Shower screens, floating oak ledges & white vessel bowls",
          colors: [
            { name: "Meadow Sage Green", hex: "#A3B899", role: "Dry Wall Surface (60%)" },
            { name: "Warm Cream Shower Tile", hex: "#E7DEC8", role: "Square Shower Tiles & Oak (30%)" },
            { name: "Pure White & Brushed Nickel", hex: "#FAF9F6", role: "Vessel Sink & Tapware (10%)" },
          ],
        },
        {
          id: "wash-nature-3",
          title: "Celadon Sage Green + Crisp Vanity White + Brushed Brass",
          imagePath: "/spaces/wash-room/133.png",
          description:
            "Fresh minimalist powder room featuring soothing celadon sage walls, crisp white floating vanity counter, wall-hung toilet, and warm brushed brass fixtures.",
          moodTag: "Celadon Breeze & Gilded Simplicity",
          bestFor: "Powder rooms, round mirrors & wall-hung commodes",
          colors: [
            { name: "Celadon Sage Green", hex: "#9BB29B", role: "Powder Room Walls (60%)" },
            { name: "Crisp Vanity White", hex: "#FAF9F7", role: "Floating Counter & Commode (30%)" },
            { name: "Brushed Brass Accent", hex: "#C0A268", role: "Wall Mixer, Flush & Pendant (10%)" },
          ],
        },
        {
          id: "wash-nature-4",
          title: "Deep Forest Sage + Monochromatic Commode + Wild Pampas Grass",
          imagePath: "/spaces/wash-room/134.png",
          description:
            "Lush monochromatic botanical powder sanctuary wrapped in deep forest sage walls, coordinated sage commode, and warm natural pampas grass accents.",
          moodTag: "Forest Sage & Botanical Cocoon",
          bestFor: "Monochrome powder rooms, linen towels & botanical vases",
          colors: [
            { name: "Deep Forest Sage", hex: "#5B7853", role: "Primary Wall Finish (60%)" },
            { name: "Porcelain Sage Commode", hex: "#7B9B73", role: "Commode & Hand Towels (30%)" },
            { name: "Wild Pampas Grass", hex: "#C7B299", role: "Natural Reed & White Trim (10%)" },
          ],
        },
        {
          id: "wash-nature-5",
          title: "Olive Moss Green + Warm Walnut Vanity + Brushed Brass Arch",
          imagePath: "/spaces/wash-room/135.png",
          description:
            "Timeless classic washroom featuring rich olive moss green paneled walls, handcrafted warm walnut vanity dresser, white oval vessel sink, and arched brass mirror.",
          moodTag: "Heritage Olive & Walnut Dresser",
          bestFor: "Heritage vanities, arched mirrors & picture lights",
          colors: [
            { name: "Olive Moss Green", hex: "#646C38", role: "Molded Wall Paneling (60%)" },
            { name: "Warm Walnut Wood", hex: "#6D4327", role: "Vanity Dresser Console (30%)" },
            { name: "Brushed Brass & Ceramic", hex: "#C5A059", role: "Arched Mirror & Vessel Sink (10%)" },
          ],
        },
      ],
    },
    {
      id: "classic-indian",
      name: "Classic Indian",
      tagline: "Terracotta Clay, Spiced Rust & Antique Brass Sanctuaries",
      description:
        "Bespoke heritage bathing spaces inspired by classical Indian architecture—featuring handcrafted terracotta clay tiles, warm sandstone vanity counters, spiced cinnamon rust, and burnished brass fittings.",
      combos: [
        {
          id: "wash-classic-1",
          title: "Coral Peach Terracotta + Peacock Teal Vanity + White Marble",
          imagePath: "/spaces/wash-room/166.png",
          description:
            "Vibrant heritage powder room pairing warm coral peach terracotta plaster walls with a peacock teal blue vanity, turquoise backsplash tiles, and white marble top.",
          moodTag: "Coral Plaster & Peacock Teal Vibrance",
          bestFor: "Traditional painted vanities, arched niches & candlelit washstands",
          colors: [
            { name: "Coral Peach Terracotta", hex: "#D98671", role: "Upper Plaster Wall (60%)" },
            { name: "Peacock Teal Blue", hex: "#3E828A", role: "Vanity Cabinet & Tiles (30%)" },
            { name: "White Marble & Amber", hex: "#E0DDD9", role: "Marble Top & Candle Glow (10%)" },
          ],
        },
        {
          id: "wash-classic-2",
          title: "Spiced Terracotta Arch + Deep Aegean Teal + Matte Charcoal Tub",
          imagePath: "/spaces/wash-room/167.png",
          description:
            "Intimate heritage bath chamber with deep terracotta plaster arched alcove, contrasting Aegean teal accent wall, concrete vanity, and charcoal soaking tub.",
          moodTag: "Haveli Arch & Aegean Teal Depth",
          bestFor: "Arched bath alcoves, concrete basins & patterned rugs",
          colors: [
            { name: "Spiced Terracotta Plaster", hex: "#C67049", role: "Arched Alcove Walls (60%)" },
            { name: "Aegean Teal Accent", hex: "#356577", role: "Accent Wall & Concrete Sink (30%)" },
            { name: "Matte Charcoal Tub", hex: "#454B52", role: "Bathtub & Carved Mirror (10%)" },
          ],
        },
        {
          id: "wash-classic-3",
          title: "Terracotta Earth Plaster + Reclaimed Teak Vanity + Antique Jharokha",
          imagePath: "/spaces/wash-room/168.png",
          description:
            "Deep atmospheric heritage sanctuary wrapped in rich terracotta earth walls, rustic reclaimed teak vanity, terracotta-skirted tub, and carved jharokha mirror.",
          moodTag: "Moody Royal Sanctum & Earthen Drama",
          bestFor: "Carved wooden vanities, rolltop soaking tubs & botanical urns",
          colors: [
            { name: "Terracotta Earth Plaster", hex: "#B35836", role: "Seamless Earthen Walls (60%)" },
            { name: "Reclaimed Teak Vanity", hex: "#9B704E", role: "Wood Vanity & Tub Skirt (30%)" },
            { name: "Antique Jharokha Mirror", hex: "#B88B67", role: "Carved Mirror & Tub Enamel (10%)" },
          ],
        },
        {
          id: "wash-classic-4",
          title: "Warm Terracotta Clay + Talavera Floral Tiles + Antique Brass",
          imagePath: "/spaces/wash-room/169.png",
          description:
            "Sun-baked artisan bath retreat crafted with terracotta clay plaster, handcrafted floral motif wall tiles, solid wood vanity console, and terracotta soaking tub.",
          moodTag: "Sun-Baked Artisan & Tile Craftsmanship",
          bestFor: "Handcrafted motif tiles, clay tubs & antique gooseneck spouts",
          colors: [
            { name: "Warm Terracotta Clay", hex: "#C4734D", role: "Textured Plaster Walls (60%)" },
            { name: "Floral Motif Wall Tiles", hex: "#8F553B", role: "Tile Backsplash & Console (30%)" },
            { name: "Terracotta Tub & Brass", hex: "#BA623A", role: "Soaking Tub & Antique Brass (10%)" },
          ],
        },
        {
          id: "wash-classic-5",
          title: "Olive Sage Upper Wall + Terracotta Glazed Tiles + Pure White Tub",
          imagePath: "/spaces/wash-room/170.png",
          description:
            "Palatial dual-tone bath sanctuary harmonizing calming olive sage upper walls with warm terracotta lower wainscot tiles, freestanding white tub, and walnut console.",
          moodTag: "Heritage Olive & Terracotta Harmony",
          bestFor: "Half-tiled wainscoting, freestanding baths & open vanities",
          colors: [
            { name: "Olive Sage Upper Wall", hex: "#7A8A68", role: "Upper Wall Surface (60%)" },
            { name: "Terracotta Lower Tiles", hex: "#BA6B4C", role: "Glazed Wainscot Tiles (30%)" },
            { name: "Pure White Bathtub & Walnut", hex: "#FAF8F5", role: "Bathtub, Sink & Console (10%)" },
          ],
        },
      ],
    },
  ],
};
