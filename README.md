# Snowcem Paints — Modern Web Platform Architecture

Welcome to the official web application repository for **Snowcem Paints India Ltd.**, a premier pioneer in the paint and wall-care industry since 1959, operating as part of **Saurashtra Cement Limited &ndash; Paint Division** under **The Mehta Group's 124-year corporate legacy**.

---

## 🌟 Executive Overview & Brand Narrative

Snowcem Paints is adored across the Indian construction and home improvement sector for iconic products like **Sandtex Matt**, **Unigloss**, **Snowcryl**, **Zenita**, **Sentino**, **Snowcem Plus**, and **Waterproof Plus**. 

This web platform represents the digital evolution of Snowcem: **"Snowcem gets a Splash of New"**. It combines a heritage of 60+ years of trust with a modern palette of freshness, delivering an edge-to-edge interactive brand showcase, comprehensive product catalog, stockist locator, media TVC portal, career opportunities, and integrated home painting services consultation.

---

## 🚀 Technical Architecture & Engineering Approach

Our application is built on modern web standards prioritizing **visual excellence, 100% uptime, zero database latency for public users, and seamless user experiences**.

```
                           +-------------------------------------+
                           |      Next.js 14 (App Router)        |
                           +------------------+------------------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
        +------------v------------+                       +------------v------------+
        |   Public Storefront     |                       |     Admin Dashboard     |
        |  (100% Static Data)     |                       |   (Protected /admin/*)  |
        +------------+------------+                       +------------+------------+
                     |                                                 |
        +------------v------------+                       +------------v------------+
        |  categoriesData.ts      |                       |  iron-session Auth      |
        |  productsData.ts        |                       |  Drizzle ORM + MySQL    |
        |  dealerData.ts          |                       |  Order & Customer DB    |
        +-------------------------+                       +-------------------------+
```

### 1. High-Performance Static Data Catalog Architecture
To ensure the public website loads instantly with **zero database downtime or connection latency**, all product categories, product items, dealer networks, media TVCs, and career listings are served from centralized, type-safe TypeScript data modules:
- **[`src/data/categoriesData.ts`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/data/categoriesData.ts)**: Centralized definitions for all 9 product categories (*Exterior Emulsion Paints, Interior Emulsion Paints, Waterproofing Paints, Primers, Cement Paints, Putty, Snowcare Range, Distemper, Textures*).
- **[`src/data/productsData.ts`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/data/productsData.ts)**: Full product catalog definitions including taglines, detailed descriptions, key feature lists, packaging sizes, finishes, and warranties.
- **`dealerData.ts` / `mediaData.ts` / `careersData.ts` / `lifeAtSnowcemData.ts`**: Static datasets powering specialized pages.

### 2. Next.js 14 App Router & Dynamic Clean URL Routing
- **Category Listing Route**: [`/products/[categorySlug]`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/app/products/%5BcategorySlug%5D/page.tsx) (e.g., `/products/exterior-emulsion-paints`)
- **Product Detail Route**: [`/products/[categorySlug]/[productSlug]`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/app/products/%5BcategorySlug%5D/%5BproductSlug%5D/page.tsx) (e.g., `/products/interior-emulsion-paints/zenita-velvet-finish` or `/products/exterior-emulsion-paints/sandtex-matt`)
- **Brand Pages**: `/about-us/the-snowcem-story`, `/about-us/true-colours-of-life`, `/about-us/about-mehta-group`, `/life-at-snowcem`
- **Legal & Info Pages**: `/privacy-policy`, `/terms-and-conditions`, `/careers`, `/contact-us`, `/find-dealer`, `/media`

### 3. Design System & Premium Visual Aesthetics
- **Typography Hierarchy**: Integrated modern Google Fonts (`Plus Jakarta Sans` for bold headlines & numbers; `Lato` for crisp body text).
- **Brand Color Palette**:
  - **Snowcem Navy**: `#0b193c` (Corporate trust & depth)
  - **Snowcem Orange**: `#f36c21` (Energy & vibrant accent)
  - **Snowcem Magenta**: `#9e0e40` (Rich brand identity)
- **Interactive UI Micro-Animations**:
  - Flowing paint stroke animated preloader (`PaintLoader.tsx`).
  - Automatic 4-second hero carousel with smooth fade transitions (`Hero.tsx`).
  - Interactive **Hold & Slide** draggable event gallery carousel (`/about-us/true-colours-of-life`).
  - Full-width Pan-India Distribution Network map graphic (`/story/india.png`).

### 4. Interactive Header Navigation & Flyout Dropdowns
- **Sticky Shrinking Header**: [`Header.tsx`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/components/Header.tsx) shrinks on scroll with a smooth transition.
- **Route Reset Listener**: Integrated `usePathname` hook to automatically reset dropdown states whenever navigation occurs, preventing hover active indicators from staying stuck.
- **Sub-Dropdown Flyout Menus**: [`CustomDropdown.tsx`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/components/CustomDropdown.tsx) supports side flyout menus (`subItems`) so hovering over a category displays its sub-products list seamlessly.

### 5. Global Home Painting Lead Generation Form
- **Global Footer Form**: Integrated directly into [`Footer.tsx`](file:///c:/Users/mehta/Downloads/Projects/New-folder/src/components/Footer.tsx) to render automatically on **every page** of the website.
- **Fields**: Name*, Email*, Mobile*, Pincode*, Select State (*Indian States dropdown*), City*, Zone* (*North, South, East, West, Central*), Message* (*large multi-line textarea*), Terms & Privacy consent checkbox, and Submit button with feedback confirmation.

### 6. Protected Admin Dashboard (`/admin/*`)
- **Security & Authentication**: Protects all `/admin/*` routes using `middleware.ts` and `iron-session` encrypted cookies (`src/lib/auth.ts`).
- **Dashboard Overview**: Displays real-time KPI metrics, revenue charts, order fulfillment tables, and customer lead management.
- **Static Catalog Management**: Admin Products (`/admin/products`) and Collections (`/admin/collections`) display clean static catalog tables without database errors.

---

## 📁 Repository Documentation Index

- **[README.md](file:///c:/Users/mehta/Downloads/Projects/New-folder/README.md)**: Master web platform architecture and project setup guide (this file).
- **[CODEBASE.md](file:///c:/Users/mehta/Downloads/Projects/New-folder/CODEBASE.md)**: Complete file tree, route audit table, and component-by-component breakdown.
- **[GEMINI.md](file:///c:/Users/mehta/Downloads/Projects/New-folder/GEMINI.md)**: AI coding assistant rules, documentation synchronization protocols, and code guidelines.

---

## 💻 Local Development Setup & Commands

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### 1. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
ADMIN_EMAIL=admin@snowcempaints.com
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=a_32_character_long_secret_key_string
DATABASE_URL=mysql://user:password@localhost:3306/snowcem_db
```

### 3. Running Development Server
Launch the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build & Production Verification
To compile TypeScript and build the production bundle:
```bash
# Type Safety Verification
npx tsc --noEmit

# Production Build
npm run build
```

---

## 🏆 Credits & Development Attribution

- **Client / Brand**: Snowcem Paints India Ltd. (Saurashtra Cement Limited &ndash; Paint Division / The Mehta Group)
- **Web Development & Design**: **Virtu Media**
