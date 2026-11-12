# Database & CRUD Candidates (POINTS.md)

This document tracks all candidate sections, static datasets, and interactive systems in the Snowcem codebase analyzed for MySQL database persistence and Admin CRUD operations.

---

## 1. Paint Calculator System & Estimate Leads [IMPLEMENTED & PERSISTED]
- **Status**: **Completed (MySQL + Admin CRUD Live)**
- **Original Source**: `src/data/paintCalculatorData.ts`, `Paint Budget Calculator Working.xlsx`, `paint budget calculator understanding.docx`.
- **Database Tables Implemented**:
  - `calculator_materials`: 35 master products across Luxury, Premium, Economy, and Specialty categories with unit (Ltr/Kg), MRP, DPL, pack size, cost per unit, coverage (sq.ft), default coats, and labor rates.
  - `calculator_leads`: Captures all customer budget inquiries submitted from Step 2 of the `/paint-calculator` tool (`full_name`, `phone`, `pincode`, `start_timeline`, `local_painter_hired`, `space`, `need`, `carpet_area`, `selected_tier`, `total_estimated_cost`, `created_at`).
- **APIs**:
  - Public: `POST /api/calculator/leads` (lead capture on estimate generation).
  - Admin: `GET /api/admin/calculator/leads`, `DELETE /api/admin/calculator/leads/[id]`, `GET /api/admin/calculator/materials`, `POST /api/admin/calculator/materials`, `PATCH /api/admin/calculator/materials/[id]`, `DELETE /api/admin/calculator/materials/[id]`.
- **Admin Interfaces**:
  - `/admin/calculator/leads` (search, review, and delete customer estimate inquiries).
  - `/admin/calculator/materials` (edit live material costs, coverage, default coats, and labor rates).

---

## 2. Media, Press Releases & TVCs [IMPLEMENTED & PERSISTED]
- **Status**: **Completed (MySQL + Admin CRUD Live)**
- **Original Source**: `src/data/mediaData.ts` (deleted).
- **Database Table Implemented**:
  - `media_videos` (`id`, `title`, `description`, `youtube_id`, `category`, `sort_order`, `is_active`, `created_at`, `updated_at`).
- **APIs**:
  - Public: `GET /api/media`.
  - Admin: `GET /api/admin/media`, `POST /api/admin/media`, `PATCH /api/admin/media/[id]`, `DELETE /api/admin/media/[id]`.
- **Admin Interface**: `/admin/media` with YouTube video preview, ordering, and deletion.

---

## 3. Curated / Trending Room Color Palettes [IMPLEMENTED & PERSISTED]
- **Status**: **Completed (MySQL + Admin CRUD Live)**
- **Original Source**: `curated_300_color_shades_all_spaces.csv`.
- **Database Table Implemented**:
  - `curated_palettes`: 1,800 records across 6 space categories (Living Room, Exterior, Kitchen, Bedroom, Trendy, Aesthetic) with `category`, `subcategory`, `name`, `hex`, `recommended_surface`, `mood_description`.
- **APIs**:
  - Public: `GET /api/curated-palettes`.
  - Admin: `GET /api/admin/curated-palettes`, `PATCH /api/admin/curated-palettes/[id]`, `DELETE /api/admin/curated-palettes/[id]`.
- **Admin Interface**: `/admin/curated-palettes` with category and subcategory filtering and hex swatch previews.

---

## 4. Unified Customer Inquiries & Leads [IMPLEMENTED & PERSISTED]
- **Status**: **Completed (MySQL + Admin CRUD Live)**
- **Original Source**: Dispersed contact forms, popups, and banners.
- **Database Table Implemented**:
  - `contact_inquiries` (`id`, `name`, `email`, `city`, `pincode`, `mobile`, `inquiry_type`, `message`, `metadata`, `status`, `created_at`, `updated_at`).
- **Connected Entrypoints**:
  1. `/contact-us` (General, Product, Support, Dealership queries).
  2. `WhoYouAreModal` ("Let's Connect" homepage popup).
  3. `PaintingServiceQueryBanner` ("Need Help? Get in Touch with Us" product banner).
  4. `/careers/[jobId]` (Job application lead submissions).
- **APIs**:
  - Public: `POST /api/inquiries`.
  - Admin: `GET /api/admin/inquiries`, `PATCH /api/admin/inquiries/[id]`, `DELETE /api/admin/inquiries/[id]`.
- **Admin Interface**: `/admin/inquiries` with status triage (`unread`, `read`, `in_progress`, `resolved`).

---

## 5. Spaces / Room Themes & Visualizer Presets [CANDIDATE]
- **Current Location**: `src/data/roomThemesData.ts` & `src/data/spaces/*.ts` (bedroom, diningRoom, kitchen, livingRoom, poojaRoom, studyRoom, washroom).
- **What is Hardcoded**:
  - Preset room images, wall zones, and shade pairings for each room.
- **Recommended DB Migration**:
  - `room_spaces` (`id`, `slug`, `name`, `description`, `banner_image`, `sort_order`).
  - `room_themes` (`id`, `space_id`, `theme_name`, `image_path`, `primary_shade_id`, `secondary_shade_id`, `accent_shade_id`).

---

## 6. Careers Culture & Life at Snowcem [CANDIDATE]
- **Current Location**: `src/data/careersData.ts` (`CULTURE_PILLARS`) & `src/data/lifeAtSnowcemData.ts` (`SNOWCEM_VALUES`, `CULTURE_MOMENTS`).
- **What is Hardcoded**:
  - Culture pillars, employee photos, and core brand values. Job postings (`jobs` table) are already dynamic.
- **Recommended DB Migration**:
  - `company_culture_items` (`id`, `section`, `title`, `subtitle`, `description`, `image_url`, `sort_order`, `is_active`).
