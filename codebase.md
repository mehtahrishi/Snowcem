# CODEBASE.MD — Snowcem Paints Codebase Reference & File Descriptions

> [!NOTE]
> This file contains the complete tree structure and file-by-file breakdown of the Snowcem Paints codebase. Refer to `gemini.md` for AI agent instructions and update protocols.

---

## 1. Directory & File Tree

```
Snowcem
 ├── .env.local
 ├── .gitignore
 ├── drizzle.config.ts
 ├── middleware.ts
 ├── next-env.d.ts
 ├── next.config.mjs
 ├── package-lock.json
 ├── package.json
 ├── postcss.config.js
 ├── README.md
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
     │   ├── BrandStory.tsx         [STANDALONE / UNUSED]
     │   ├── ChatbotWidget.tsx
     │   ├── ColorVisualizer.tsx     [STANDALONE / UNUSED]
     │   ├── CookieConsent.tsx
     │   ├── CustomDropdown.tsx
     │   ├── DealerLocator.tsx       [STANDALONE / UNUSED]
     │   ├── Footer.tsx
     │   ├── Header.tsx
     │   ├── Hero.tsx
     │   ├── Logo.tsx
     │   ├── PaintLoader.tsx
     │   ├── ProductCategoryGrid.tsx [STANDALONE / UNUSED]
     │   ├── ProductsMegaMenu.tsx
     │   ├── SidebarDrawer.tsx
     │   ├── ToolsMegaMenu.tsx
     │   ├── VideoModal.tsx
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
     │   ├── dealerData.ts
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

## 2. Comprehensive `src/components/` Audit Table

| Component File Path | Status | Role & Usage Analysis |
| :--- | :--- | :--- |
| **`AboutUsMegaMenu.tsx`** | **ACTIVE** | Dropdown menu component for "About Us" section in [`Header.tsx`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/components/Header.tsx). |
| **`AnnouncementBar.tsx`** | **ACTIVE** | Sticky top notification banner rendered across all public pages. |
| **`BrandStory.tsx`** | **STANDALONE** | 0 imports in `src/`. Heritage narrative component (integrated into `/about-us/the-snowcem-story`). |
| **`ChatbotWidget.tsx`** | **ACTIVE** | Global AI Assistant floating widget rendered in `layout.tsx`, `careers`, `contact-us`, `find-dealer`, `life-at-snowcem`. |
| **`ColorVisualizer.tsx`** | **STANDALONE** | 0 imports in `src/`. Standalone interactive room shade preview tool. |
| **`CookieConsent.tsx`** | **ACTIVE** | Floating GDPR cookie acceptance toast banner rendered on public pages. |
| **`CustomDropdown.tsx`** | **ACTIVE** | Core dropdown component with hover effects and side sub-dropdown flyout support (`subItems`). Used by `AboutUsMegaMenu`, `ProductsMegaMenu`, `ToolsMegaMenu`. |
| **`DealerLocator.tsx`** | **STANDALONE** | 0 imports in `src/`. Standalone dealer finder (`/find-dealer/page.tsx` renders `dealerData.ts` directly). |
| **`Footer.tsx`** | **ACTIVE & CRITICAL** | Site-wide footer rendering global Home Painting Consultation Form and "Developed by Virtu Media" credit link. |
| **`Header.tsx`** | **ACTIVE & CRITICAL** | Main navigation header with sticky scroll shrinking, dropdown triggers, and `usePathname` route reset listener. |
| **`Hero.tsx`** | **ACTIVE** | Homepage edge-to-edge photographic banner carousel with 4-second transitions. |
| **`Logo.tsx`** | **ACTIVE** | Snowcem Paints brand SVG/PNG logo component supporting compact and regular header modes. |
| **`PaintLoader.tsx`** | **ACTIVE & CRITICAL** | Site-wide preloader overlay featuring flowing paint stroke animations. |
| **`ProductCategoryGrid.tsx`** | **STANDALONE** | 0 imports in `src/`. Category card grid component. |
| **`ProductsMegaMenu.tsx`** | **ACTIVE** | Product dropdown launcher powered by `CustomDropdown` and sub-dropdown flyouts linking to `/products/[categorySlug]/[productSlug]`. |
| **`SidebarDrawer.tsx`** | **ACTIVE** | Mobile navigation slide-out drawer. |
| **`ToolsMegaMenu.tsx`** | **ACTIVE** | Paint tools dropdown menu launcher. |
| **`VideoModal.tsx`** | **ACTIVE** | YouTube TVC video popup modal window. |

### Admin Components (`src/components/admin/`)
| Component File Path | Status | Role & Usage Analysis |
| :--- | :--- | :--- |
| **`AdminChart.tsx`** | **ACTIVE** | Revenue trends analytics chart rendered on `/admin`. |
| **`AdminDataTable.tsx`** | **ACTIVE** | Reusable data table component with search, pagination, and action buttons. |
| **`AdminHeader.tsx`** | **ACTIVE** | Top bar for admin panel featuring admin user avatar and logout trigger. |
| **`AdminMetricCard.tsx`** | **ACTIVE** | KPI summary statistics card for revenue, orders, active products, and customers. |
| **`AdminModal.tsx`** | **ACTIVE** | Reusable modal dialog wrapper for admin forms. |
| **`AdminSidebar.tsx`** | **ACTIVE** | Collapsible navigation sidebar for admin sections. |
| **`ConfirmDeleteModal.tsx`** | **ACTIVE** | Confirmation popup for deleting records. |
| **`PageHeader.tsx`** | **ACTIVE** | Title and subtitle header bar for admin sub-pages. |
| **`RecentOrdersTable.tsx`** | **ACTIVE** | Table previewing recent customer orders on dashboard. |

---

## 3. Removable / Unused Files Summary

| File Path | Status | Recommendation |
| :--- | :--- | :--- |
| `src/actions/collection-actions.ts` | **UNUSED LEGACY** | Safe to remove. |
| `src/actions/product-actions.ts` | **UNUSED LEGACY** | Safe to remove. |
| `src/services/collectionsService.ts` | **UNUSED LEGACY** | Safe to remove. |
| `src/services/productsService.ts` | **UNUSED LEGACY** | Safe to remove. |
| `src/components/BrandStory.tsx` | **STANDALONE** | Optional to remove or keep as backup. |
| `src/components/ColorVisualizer.tsx` | **STANDALONE** | Optional to remove or wire up to `/tools`. |
| `src/components/DealerLocator.tsx` | **STANDALONE** | Optional to remove. |
| `src/components/ProductCategoryGrid.tsx` | **STANDALONE** | Optional to remove. |
