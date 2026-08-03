# CODEBASE.MD — Snowcem Paints Codebase Reference & File Descriptions

> [!NOTE]
> This file contains the complete tree structure and file-by-file breakdown of the Snowcem Paints codebase. Refer to `gemini.md` for AI agent instructions and update protocols.

---

## 1. Directory & File Tree

```
Snowcem
 ├── .env.local
 ├── drizzle.config.ts
 ├── middleware.ts
 ├── next.config.mjs
 ├── package-lock.json
 ├── package.json
 ├── postcss.config.js
 ├── README.md
 ├── public/
 │   ├── carousel/
 │   │   ├── jab-snowcem-lagega.jpg
 │   │   ├── rango_ki_virasat_banner.jpeg
 │   │   └── truecolors.png
 │   ├── hero1.png
 │   ├── hero2.png
 │   ├── hero3.png
 │   └── image.png
 └── src/
     ├── actions/
     │   ├── admin-login.ts
     │   ├── collection-actions.ts
     │   ├── customer-actions.ts
     │   ├── guards.ts
     │   ├── order-actions.ts
     │   └── product-actions.ts
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
     │   ├── about-us/
     │   │   ├── about-mehta-group/
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
     │   ├── globals.css
     │   ├── layout.tsx
     │   ├── not-found.tsx
     │   └── page.tsx
     ├── components/
     │   ├── AboutUsMegaMenu.tsx
     │   ├── AnnouncementBar.tsx
     │   ├── BrandStory.tsx
     │   ├── ChatbotWidget.tsx
     │   ├── ColorVisualizer.tsx
     │   ├── CookieConsent.tsx
     │   ├── CustomDropdown.tsx
     │   ├── DealerLocator.tsx
     │   ├── Footer.tsx
     │   ├── Header.tsx
     │   ├── Hero.tsx
     │   ├── Logo.tsx
     │   ├── PaintLoader.tsx
     │   ├── ProductCategoryGrid.tsx
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
     │   ├── dealerData.ts
     │   ├── lifeAtSnowcemData.ts
     │   └── mediaData.ts
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
         ├── collectionsService.ts
         ├── customersService.ts
         ├── ordersService.ts
         └── productsService.ts
 ├── tailwind.config.js
 └── tsconfig.json
```

---

## 2. Comprehensive Database Architecture

### Table Definitions (`src/db/schema.ts`)
- **`collections`**: `id INT AUTO_INCREMENT PRIMARY KEY`, `name`, `slug` (unique), `description`, `image`, `status`, `created_at`.
- **`products`**: `id INT AUTO_INCREMENT PRIMARY KEY`, `title`, `sku` (unique), `collection_id INT` (FK -> collections.id), `collection_slug`, `status`, `description`, `image`, `created_at`.
- **`orders`**: `id INT AUTO_INCREMENT PRIMARY KEY`, `order_number` (unique), `customer_name`, `customer_email`, `total_amount`, `status`, `payment_status`, `created_at`.
- **`order_items`**: `id INT AUTO_INCREMENT PRIMARY KEY`, `order_id INT` (FK -> orders.id), `product_id INT`, `title`, `collection_name`, `qty`, `price`.
- **`customers`**: `id INT AUTO_INCREMENT PRIMARY KEY`, `name`, `email` (unique), `phone`, `city`, `total_orders`, `total_spent`, `status`, `joined_at`.
