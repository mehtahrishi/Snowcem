# CODEBASE.MD — Snowcem Paints Codebase Reference & File Descriptions

> [!NOTE]
> This file contains the complete tree structure and file-by-file breakdown of the Snowcem Paints codebase. Refer to `GEMINI.MD` for AI agent instructions and update protocols, and `README.MD` for master documentation.

---

## 1. Directory & File Tree

```
Snowcem
 ├── .env.local
 ├── .gitignore
 ├── CODEBASE.MD
 ├── GEMINI.MD
 ├── README.MD
 ├── drizzle.config.ts
 ├── middleware.ts
 ├── next-env.d.ts
 ├── next.config.mjs
 ├── package-lock.json
 ├── package.json
 ├── postcss.config.js
 ├── tailwind.config.js
 ├── tsconfig.json
 ├── public/
 │   ├── carousel/
 │   │   ├── jab-snowcem-lagega.jpg
 │   │   ├── rango_ki_virasat_banner.jpeg
 │   │   └── truecolors.png
 │   ├── life-culture/
 │   ├── story/
 │   │   └── india.png
 │   ├── true-colors/
 │   ├── visualizer/
 │   │   ├── sample-bedroom.png
 │   │   ├── sample-dining.png
 │   │   ├── sample-exterior.png
 │   │   └── sample-living-room.png
 │   ├── hero1.png
 │   ├── hero2.png
 │   ├── hero3.png
 │   └── image.png
 └── src/
     ├── actions/
     │   ├── admin-login.ts
     │   ├── collection-actions.ts  [UNUSED LEGACY]
     │   ├── customer-actions.ts
     │   ├── guards.ts
     │   ├── order-actions.ts
     │   └── product-actions.ts     [UNUSED LEGACY]
     ├── app/
     │   ├── (admin)/
     │   │   ├── layout.tsx
     │   │   └── admin/
     │   │       ├── collections/
     │   │       │   └── page.tsx
     │   │       ├── customers/
     │   │       │   └── page.tsx
     │   │       ├── login/
     │   │       │   └── page.tsx
     │   │       ├── orders/
     │   │       │   └── page.tsx
     │   │       ├── products/
     │   │       │   └── page.tsx
     │   │       └── page.tsx
     │   ├── about-us/
     │   │   ├── about-mehta-group/
     │   │   │   └── page.tsx
     │   │   ├── the-snowcem-story/
     │   │   │   └── page.tsx
     │   │   └── true-colours-of-life/
     │   │       └── page.tsx
     │   ├── careers/
     │   ├── color-catalogue/
     │   │   └── page.tsx
     │   ├── contact-us/
     │   │   └── page.tsx
     │   ├── find-dealer/
     │   │   └── page.tsx
     │   ├── life-at-snowcem/
     │   │   └── page.tsx
     │   ├── media/
     │   │   └── page.tsx
     │   ├── privacy-policy/
     │   │   └── page.tsx
     │   ├── products/
     │   │   └── [categorySlug]/
     │   │       ├── page.tsx
     │   │       └── [productSlug]/
     │   │           └── page.tsx
     │   ├── terms-and-conditions/
     │   │   └── page.tsx
     │   ├── globals.css
     │   ├── layout.tsx
     │   ├── not-found.tsx
     │   └── page.tsx
     ├── components/
     │   ├── AboutUsMegaMenu.tsx
     │   ├── AnnouncementBar.tsx
     │   ├── BrandPillarsSection.tsx
     │   ├── BrandStory.tsx         [STANDALONE / UNUSED]
     │   ├── ChatbotWidget.tsx
     │   ├── ColorVisualizer.tsx     [STANDALONE / UNUSED]
     │   ├── CookieConsent.tsx
     │   ├── CustomDropdown.tsx
     │   ├── DealerLocator.tsx       [STANDALONE / UNUSED]
     │   ├── Footer.tsx
     │   ├── Header.tsx
     │   ├── Hero.tsx
     │   ├── HomeProductsSection.tsx
     │   ├── Logo.tsx
     │   ├── PaintLoader.tsx
     │   ├── ProductCategoryGrid.tsx [STANDALONE / UNUSED]
     │   ├── ProductsMegaMenu.tsx
     │   ├── RangonKiVirasat.tsx
     │   ├── SidebarDrawer.tsx
     │   ├── ToolsMegaMenu.tsx
     │   ├── VideoModal.tsx
     │   ├── VirasatStoriesSection.tsx
     │   └── admin/
     │       ├── AdminChart.tsx
     │       ├── AdminDataTable.tsx
     │       ├── AdminHeader.tsx
     │       ├── AdminMetricCard.tsx
     │       ├── AdminModal.tsx
     │       ├── AdminSidebar.tsx
     │       ├── ConfirmDeleteModal.tsx
     │       ├── PageHeader.tsx
     │       └── RecentOrdersTable.tsx
     ├── data/
     │   ├── careersData.ts
     │   ├── categoriesData.ts
     │   ├── colourCatalogueData.ts
     │   ├── dealerData.ts
     │   ├── inspiringIdeasData.ts
     │   ├── lifeAtSnowcemData.ts
     │   ├── mediaData.ts
     │   └── productsData.ts
     ├── db/
     │   ├── index.ts
     │   ├── schema.ts
     │   └── seed.ts
     ├── lib/
     │   ├── auth.ts
     │   ├── session.ts
     │   └── slugify.ts
     ├── pages/
     │   └── _document.tsx
     └── services/
         ├── collectionsService.ts  [UNUSED LEGACY]
         ├── customersService.ts
         ├── ordersService.ts
         └── productsService.ts     [UNUSED LEGACY]
```

---

## 2. Comprehensive `src/app/` Routes Audit

| Route / File Path | Type | Status | Role & Content Summary |
| :--- | :--- | :--- | :--- |
| **`src/app/layout.tsx`** | Root Layout | **ACTIVE** | Main application wrapper setting metadata, Google Fonts (`Lato`, `Plus Jakarta Sans`), global CSS styles, and site-wide preloader. |
| **`src/app/page.tsx`** | Homepage (`/`) | **ACTIVE** | Main landing page rendering Hero carousel, ProductCategoryGrid, BrandStory, ColorVisualizer, DealerLocator, VideoModal, and global Footer. |
| **`src/data/productsData.ts`** | Master Dataset | **ACTIVE** | Master static dataset containing 28+ paint products across 9 categories with unique sub-ranges, descriptions, features, warranties, PDF download paths (`public/pdf/`), and dynamic FAQs. |
| **`src/app/globals.css`** | Design System | **ACTIVE** | Core CSS file containing Tailwind directives, `:root` design tokens, custom font definitions, keyframe animations (`brandGradientShift`), and custom scrollbar rules. |
| **`src/app/not-found.tsx`** | 404 Error Handler | **ACTIVE** | Custom 404 page displayed when navigating to undefined URL paths. |
| **`src/app/about-us/about-mehta-group/page.tsx`** | Public Page | **ACTIVE** | About Mehta Group page detailing corporate history, 124-year legacy, leadership, and Saurashtra Cement Limited acquisition. |
| **`src/app/about-us/the-snowcem-story/page.tsx`** | Public Page | **ACTIVE** | Brand evolution page featuring Sandtex Matt & Unigloss heritage, full-width `/story/india.png` distribution map graphic, and Evergreen Commitment. |
| **`src/app/about-us/true-colours-of-life/page.tsx`** | Public Page | **ACTIVE** | Brand philosophy page featuring 5 core operational pillars (pyramid layout) and interactive Hold & Slide event gallery carousel (11 event photos). |
| **`src/app/careers/page.tsx`** | Public Page | **ACTIVE** | Careers portal displaying work culture, job openings grid (R&D, Sales, Ops), and job application modal. |
| **`src/app/contact-us/page.tsx`** | Public Page | **ACTIVE** | Contact page with customer helpline, dealer inquiry form, and corporate office contact desk (Mumbai HQ). |
| **`src/app/find-dealer/page.tsx`** | Public Page | **ACTIVE** | Standalone dealer locator page with searchable stockist network directory. |
| **`src/app/life-at-snowcem/page.tsx`** | Public Page | **ACTIVE** | Employee culture showcase displaying workplace activities and team celebrations. |
| **`src/app/ganpati-canvas/page.tsx`** | Interactive Tool | **ACTIVE** | Ganpati Colouring Canvas tool with custom B&W image upload, default Ganpati lineart switch, full spectrum color picker & Hex input, flood-fill coloring, brush painting, eraser, opacity slider, undo/reset, download, and share features. |
| **`src/app/color-visualizer/page.tsx`** | Interactive Studio | **ACTIVE** | Interactive 3D Color Visualizer studio supporting 4 multi-surface architectural spaces (Living Room, Bedroom, Dining, Villa Facade), real-time wall surface selection & tinting, Beta custom room photo upload canvas painter (flood-fill, brush, eraser), and Snowcem shade explorer. |
| **`src/app/color-catalogue/page.tsx`** | Public Page | **ACTIVE** | Colour catalogue page displaying Snowcem paint shade swatches across product ranges. |
| **`src/app/media/page.tsx`** | Public Page | **ACTIVE** | Media portal rendering 5 YouTube TVC campaign videos, video player modal, and press releases. |
| **`src/app/privacy-policy/page.tsx`** | Legal Page | **ACTIVE** | Privacy Policy page with aligned hero header, 6 policy sections, and zero third-party data selling guarantee. |
| **`src/app/terms-and-conditions/page.tsx`** | Legal Page | **ACTIVE** | Terms & Conditions page with aligned hero header, 7 legal sections, IP rights, shade card disclaimers, and Mumbai court jurisdiction clause. |
| **`src/app/products/[categorySlug]/page.tsx`** | Dynamic Route | **ACTIVE** | Renders full-width, mobile-swipeable range tab bar and product grid listing for any of all 9 categories with bottom-right product bucket alignment over background environment images. |
| **`src/app/products/[categorySlug]/[productSlug]/page.tsx`** | Dynamic Route | **ACTIVE** | Renders detailed product view for any paint item (e.g. `/products/interior-emulsion-paints/zenita-velvet-finish`, `/products/exterior-emulsion-paints/sandtex-matt`). |
| **`src/app/(admin)/layout.tsx`** | Admin Layout | **ACTIVE** | Admin layout wrapper. |
| **`src/app/(admin)/admin/page.tsx`** | Admin Route | **ACTIVE** | Admin Dashboard overview rendering revenue metrics, order trends chart, and recent orders table. |
| **`src/app/(admin)/admin/login/page.tsx`** | Admin Route | **ACTIVE** | Admin authentication login page with credentials form and iron-session checks. |
| **`src/app/(admin)/admin/products/page.tsx`** | Admin Route | **ACTIVE** | Admin Product Catalog table powered by static `PRODUCTS_DATA`. |
| **`src/app/(admin)/admin/collections/page.tsx`** | Admin Route | **ACTIVE** | Admin Categories & Collections table powered by static `CATEGORIES_DATA`. |
| **`src/app/(admin)/admin/orders/page.tsx`** | Admin Route | **ACTIVE** | Order fulfillment management portal. |
| **`src/app/(admin)/admin/customers/page.tsx`** | Admin Route | **ACTIVE** | Customer directory management table. |

---

## 3. Comprehensive `src/components/` Audit Table

| Component File Path | Status | Role & Usage Analysis |
| :--- | :--- | :--- |
| **`AboutUsMegaMenu.tsx`** | **ACTIVE** | Dropdown menu component for "About Us" section in [`Header.tsx`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/components/Header.tsx). |
| **`AnnouncementBar.tsx`** | **ACTIVE** | Sticky top notification banner rendered across all public pages. |
| **`BrandStory.tsx`** | **STANDALONE** | 0 imports in `src/`. Heritage narrative component (integrated into `/about-us/the-snowcem-story`). |
| **`ChatbotWidget.tsx`** | **ACTIVE** | Global AI Assistant floating widget rendered in `layout.tsx`, `careers`, `contact-us`, `find-dealer`, `life-at-snowcem`. |
| **`ColorVisualizer.tsx`** | **ACTIVE** | Interactive 3D room canvas color visualizer component rendered on `/color-visualizer`. |
| **`CookieConsent.tsx`** | **ACTIVE** | Floating GDPR cookie acceptance toast banner rendered on public pages. |
| **`CustomDropdown.tsx`** | **ACTIVE** | Core dropdown component with hover effects and side sub-dropdown flyout support (`subItems`). Used by `AboutUsMegaMenu`, `ProductsMegaMenu`, `ToolsMegaMenu`. |
| **`DealerLocator.tsx`** | **STANDALONE** | 0 imports in `src/`. Standalone dealer finder (`/find-dealer/page.tsx` renders `dealerData.ts` directly). |
| **`src/components/Footer.tsx`** | UI Component | **ACTIVE** | Full site-wide footer rendering Home Painting Services inquiry form, `GoogleReviewsCarousel` widget, brand logo, and 4 quick link columns. |
| **`src/components/GoogleReviewsCarousel.tsx`** | UI Component | **ACTIVE** | Full-width responsive auto-scrolling carousel fetching live verified Google reviews with star ratings and user avatars. |
| **`Header.tsx`** | **ACTIVE & CRITICAL** | Main navigation header with sticky scroll shrinking, dropdown triggers, and `usePathname` route reset listener. |
| **`Hero.tsx`** | **ACTIVE** | Homepage edge-to-edge photographic banner carousel with 4-second transitions. |
| **`HomeProductsSection.tsx`** | **ACTIVE** | Homepage swipeable product card carousel displaying clean cards with category badge, product name, short tagline description, and 'Read more' link. |
| **`Logo.tsx`** | **ACTIVE** | Snowcem Paints brand SVG/PNG logo component supporting compact and regular header modes. |
| **`PaintLoader.tsx`** | **ACTIVE & CRITICAL** | Site-wide preloader overlay featuring flowing paint stroke animations. |
| **`ProductCategoryGrid.tsx`** | **STANDALONE** | 0 imports in `src/`. Category card grid component. |
| **`ProductsMegaMenu.tsx`** | **ACTIVE** | Product dropdown launcher powered by `CustomDropdown` and sub-dropdown flyouts linking to `/products/[categorySlug]/[productSlug]`. |
| **`RangonKiVirasat.tsx`** | **ACTIVE** | Heritage campaign video banner and story card section on homepage. |
| **`SidebarDrawer.tsx`** | **ACTIVE** | Mobile navigation slide-out drawer. |
| **`ToolsMegaMenu.tsx`** | **ACTIVE** | Paint tools dropdown menu launcher. |
| **`VideoModal.tsx`** | **ACTIVE** | YouTube TVC video popup modal window. |
| **`VirasatStoriesSection.tsx`** | **ACTIVE** | Homepage community testimonial video cards with directly embedded YouTube video players (Painter, Contractor, Dealer). |

### Admin Components (`src/components/admin/`)
| Component File Path | Status | Role & Usage Analysis |
| :--- | :--- | :--- |
| **`AdminChart.tsx`** | **ACTIVE** | Revenue trends analytics chart rendered on `/admin`. |
| **`AdminDataTable.tsx`** | **ACTIVE** | Reusable data table component with search, pagination, and action buttons. |
| **`AdminHeader.tsx`** | **ACTIVE** | Top bar for admin panel featuring admin user avatar and logout trigger. |
| **`AdminMetricCard.tsx`** | **ACTIVE** | KPI summary statistics card for revenue, orders, active products, and customers. |
| **`AdminModal.tsx`** | **ACTIVE** | Reusable modal dialog wrapper for admin forms. |
| **`PageHeader.tsx`** | **ACTIVE** | Title and subtitle header bar for admin sub-pages. |
| **`RecentOrdersTable.tsx`** | **ACTIVE** | Table previewing recent customer orders on dashboard. |
