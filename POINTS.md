# Database & CRUD Candidates (POINTS.md)

This document tracks all candidate sections, static arrays, and calculator datasets currently hardcoded in the codebase that are strong candidates for MySQL database models and CRUD operations in the `/admin` portal.

---

## 1. Paint Calculator System
- **Current Location**: `src/data/paintCalculatorData.ts` & root files (`Paint Budget Calculator Working.xlsx`, `paint budget calculator understanding.docx`)
- **What is Hardcoded**:
  - Solution tiers: Economy, Premium, Luxury (names, tags, warranty years, descriptions).
  - Material breakdown specifications: Emulsion, Primer, Putty coverage (sq.ft / L or kg), default coats (e.g. 2 coats for topcoat, 1 coat for primer, 2 coats for putty).
  - Product mappings: Products assigned to each tier (`Uni-glosss`, `Pentasia`, `Snowcryl`, etc.).
  - Costing parameters: Labour rate per sq.ft (currently hardcoded as ₹12/sq.ft for re-paint, ₹18/sq.ft for fresh paint), and material price rates per litre/kg.
- **Why Move to Database & CRUD**:
  - Paint material and labour prices fluctuate periodically; marketing or sales teams need the ability to adjust coverage rates, labor costs, and pack pricing without requiring code commits or rebuilds.
  - Adding a new paint solution tier or swapping recommended primer/putty products should be manageable directly from the admin panel.
- **Recommended Schema**:
  - `calculator_tiers` (`id`, `space_type` [interior/exterior], `condition` [fresh/repaint], `tier` [economy/premium/luxury], `warranty_years`, `labour_rate_sqft`, `product_id`, `primer_product_id`, `putty_product_id`, `is_active`).
  - `calculator_leads` (`id`, `full_name`, `phone`, `pincode`, `carpet_area`, `space`, `need`, `tier_selected`, `estimated_cost`, `created_at`) &rarr; allows sales team to track inquiries submitted in Step 2 of the calculator.

---

## 2. Media, Press Releases & TVCs
- **Current Location**: `src/data/mediaData.ts`
- **What is Hardcoded**:
  - News articles, TV commercial video links (YouTube embeds), press coverage titles, dates, source links, and thumbnail images.
- **Why Move to Database & CRUD**:
  - Media & PR updates are frequent. The marketing team should be able to post new press releases, TV commercials, or brand announcements directly through `/admin/media`.
- **Recommended Schema**:
  - `media_articles` (`id`, `title`, `slug`, `category` [news, tvc, press], `source`, `source_url`, `youtube_id`, `image`, `published_at`, `sort_order`, `is_active`).

---

## 3. Careers: Culture, Values & Hiring Process
- **Current Location**: `src/data/careersData.ts` & `src/data/lifeAtSnowcemData.ts`
- **What is Hardcoded**:
  - Core values (`Integrity`, `Commitment`, `Flawless Service`, etc.), perks & benefits, 4-step interview process, and employee testimonials / life at Snowcem photos.
  - *Note*: Job listings (`jobs` table) are already in MySQL; the rest of the page remains static.
- **Why Move to Database & CRUD**:
  - Allows HR to update perks, internship programs, and hiring stage descriptions.
- **Recommended Schema**:
  - `company_culture_items` (`id`, `type` [value, perk, process_step, testimonial], `title`, `subtitle`, `description`, `icon_image`, `sort_order`, `is_active`).

---

## 4. Spaces / Room Visualizer Themes & Coordinate Maps
- **Current Location**: `src/data/roomThemesData.ts` & `src/data/spaces/*.ts` (bedroom, diningRoom, kitchen, livingRoom, poojaRoom, studyRoom, washroom)
- **What is Hardcoded**:
  - Visualizer room presets, zone coordinates, and suggested color themes for each room type.
- **Why Move to Database & CRUD**:
  - If marketing wants to introduce seasonal room inspirations (e.g. Festive Living Room, Summer Bedroom) with specific curated shade pairings.
- **Recommended Schema**:
  - `room_spaces` (`id`, `slug`, `name`, `description`, `banner_image`, `sort_order`).
  - `room_curated_palettes` (`id`, `room_id`, `palette_name`, `primary_color_id`, `secondary_color_id`, `accent_color_id`).

---

## 5. Curated / Trending Color Collections
- **Current Location**: `src/data/curatedShadesData.ts`
- **What is Hardcoded**:
  - 10 curated mood decks ("Warm Neutrals", "Ocean Blues", "Earthy Greens", etc.) with 4 shades each.
- **Why Move to Database & CRUD**:
  - Colors are in the `colors` MySQL table, but these curated editorial combinations are static.
  - A simple junction table `curated_palette_shades` will allow the admin to feature different palettes on the homepage dynamically.
- **Recommended Schema**:
  - `curated_palettes` (`id`, `title`, `slug`, `theme`, `sort_order`, `is_featured`).
  - `curated_palette_items` (`id`, `palette_id`, `color_id`, `position`).

---

## 6. Contact & Inquiry Submissions
- **Current Location**: `src/app/contact-us/page.tsx`
- **Why Move to Database & CRUD**:
  - Currently forms send email or show client feedback. Storing inquiries in MySQL (`inquiries` / `leads` table) with `/admin/inquiries` viewer ensures zero leads are lost due to mail delivery failures.

