# CODEBASE.MD — Project Architecture & File Inventory

## Core Components
- `src/components/HomeToolsSection.tsx`: Smart Painting Tools Suite:
  - **Tool Name & Route Alignment**: Simplified tool names to match clean route URLs and hit SEO keywords:
    1. **Colour Visualiser** -> `/color-visualizer`
    2. **Paint Calculator** -> `/paint-calculator`
    3. **Colour Catalogue** -> `/color-catalogue`
    4. **Festive Studio** -> `/festive-studio`
  - **Centered Touch-Scrollable Tab Bar**: Centered `inline-flex` pill tab container.
  - **Public Image Showcases**:
    - Colour Visualiser Tab: `/visual.png`
    - Paint Calculator Tab: `/calculator.png`
    - Colour Catalogue Tab: `/color-shades.png`
    - Festive Studio Tab: `/festive.png`
- `src/components/HomeProductsSection.tsx`: Full-Width Side-by-Side Products Track & SEO Header:
  - **Simplified Headline**: Title simplified to `"Explore Our Paints & Products"` for clear readability.
  - **Full Width Container**: Spans full section width (`w-full px-4 sm:px-8 md:px-12`).
  - **Centered Minimalist Product Cards**: Category displayed as a centered pill badge (`bg-slate-100 border border-slate-200 text-slate-700 rounded-full`) and Product Name displayed in solid black text (`text-black`).
- `src/components/RoomCategoryIcons.tsx`: Touch-Swipeable Room Icons Bar:
  - **Mobile Touch-Swipeable Track**: Room category icons (`Living Room`, `Bedroom`, `Kitchen`, `Dining Room`, `Washroom`, `Study Room`) sit side-by-side in a touch-swipeable horizontal track on mobile devices (`overflow-x-auto`).
- `src/components/ProfessionalAdviceSection.tsx`: Professional Guidance Section:
  - **Standard Brand Badge & Headline**: Standardized section badge (`text-white bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63]`) and section headline (`text-slate-900 font-extrabold`).
  - **4 Larger Swipeable Cards**: Side-by-side touch swipeable track on mobile (`w-[280px] shrink-0`) and 4-column responsive grid on desktop (`lg:grid-cols-4`).
  - **Unobstructed High-Res Photography Stage**: Clean image stage (`h-48 sm:h-52`) with number pill (`01`, `02`, `03`, `04`) positioned below image.
- `src/components/RangonKiVirasat.tsx`: Brand Meaning & Story Section:
  - **Standardized Badge & Title**: Badge "Brand Meaning & Heritage" with standardized signature brand gradient pill.
  - **Elevated UI Layout**: High-impact YouTube video showcase frame, gradient quote card box for "Har Brush Stroke Ke Peeche Ek Kahani Hai", and 3 core pillar badges (60+ Years Heritage, 100% Trust Quality, Generations Bond).
- `src/components/GoogleReviewsCarousel.tsx`: Customer Reviews & Feedback Component:
  - **Standardized Brand Badge**: "Real Customer Reviews & Feedback" with standard signature brand gradient pill.
  - **5 Golden Star Icons**: Restored 5 golden star icons side-by-side per review card.
  - **Brand Gradient Initial Letter**: Author initial letter displayed in signature brand gradient without background circles or borders.
  - **High-End Marquee Carousel**: Smooth continuous infinite marquee with review cards.
- `src/components/WhoYouAreModal.tsx`: Lead Popup Modal:
  - **Clean Placeholders**: Replaced informal `e.g.` placeholders with clean, direct prompts (`Full Name`, `Mobile Number`, `City Name`).
  - **Centered Sizing**: Centered on both mobile and desktop (`items-center justify-center p-4 rounded-3xl`).
  - **Session Persistence**: Stores dismissal (`sessionStorage`) and submitted user profile (`localStorage`) to prevent repetitive popups.
- `src/components/Header.tsx`: Edge-to-Edge Full-Width Paint Brand Navbar Suite:
  - **Top Announcement Bar**: Edge-to-edge layout with media links (`/media`), careers (`/careers`), and 1800-209-5656 Toll Free Helpline.
  - **Single-Row Fixed Navigation**: Fixed `h-20` layout with `<Logo />` on the left and primary navigation links adjacent to it without horizontal empty space.
  - **Edge-to-Edge Full-Width Mega Menus**:
    - `src/components/ProductsMegaMenu.tsx`: Clean, range-wise product catalog grouping (e.g. Luxury, Premium, Economy ranges) with product packshots, warranty badges, and zero text clutter.
    - `src/components/ColoursDropdown.tsx`: Clean 3-column edge-to-edge layout covering Colour Catalogue, Colour Inspiration, and Colour Blogs & Guides.
    - `src/components/ToolsMegaMenu.tsx`: Streamlined 3-card tool suite (Paint Budget Calculator, Colour Visualizer, Festive Studio & Virasat).
    - `src/components/AboutUsMegaMenu.tsx`: Streamlined 4-card corporate & heritage deck (The Snowcem Story, About Mehta Group, Team & Leadership, Awards & Recognition).
    - `src/components/ServicesDropdown.tsx`: Streamlined 3-card Support deck (Call Support 1800-209-5656, Chat Support & Consultation, Technical Advisory & Queries).
  - **Right CTA**: Separate pill buttons for `Dealer Near You` (`bg-gradient-to-r from-[#2a1b92] to-[#5c249c]`) and `Painter Near You` (`bg-gradient-to-r from-[#5c249c] to-[#e91e63]`).
  - **Mobile Slide-Over Drawer** (`src/components/SidebarDrawer.tsx`): Clean touch drawer replicating identical navigation hierarchy.
- `src/app/festive-studio/page.tsx`: Full Festive Studio & Digital Canvas page.
- `src/app/color-catalogue/page.tsx` & `src/data/curatedShadesData.ts`: 1,800+ Curated shades categorized by room genres (Living Room, Exterior, Kitchen, Bedroom, Trendy Across Spaces, Aesthetic & Calm) with subcategory filter pills, search, and swatch copying.
- `src/components/ToolsSupportTabs.tsx`: Interactive floating pill tab bar (`Dealer Near Me`, `Painter Near Me`, `Call Support`, `Online Chat`) matching brand design with active gradient pills and dynamic background showcase cards.
- `src/app/color-visualizer/page.tsx` & `src/components/ColorVisualizer.tsx`: 100% Real photo-based wall color visualizer powered by the 1,800 genre-curated shade deck, connected to the Python FastAPI OpenCV paint microservice (`POST /api/paint`) with instant client-side shader fallback, and `ToolsSupportTabs`.
- `src/app/paint-calculator/page.tsx`: Redesigned Paint Budget Calculator 100% focused on wall & masonry paints featuring full-width animated wave banner, space/need photo cards (`interior.png`, `exterior.png`, `freshpaint.png`, `repainting.png`), carpet area input with quick presets, painting cost guide & FAQs, and `ToolsSupportTabs`.

## AI Wall Visualizer & Shader Engine
- `src/app/worker.js` & `public/worker.js`:
  - Dedicated background **Web Worker** running **Transformers.js** (`@xenova/transformers`) with `Xenova/segformer-b0-finetuned-ade-512-512`.
  - Offloads heavy tensor segmentation off the main UI thread to eliminate UI lag/freezing.
  - Strictly isolates vertical walls and excludes ceilings, floors, furniture, picture frames, and fixtures.
- `src/lib/paintShader.ts`:
  - High-resolution Sobel edge snapping, morphological halo filling, and anti-aliased border refinement to eliminate unpainted white gaps around furniture, curtains, TV, and door trims.
  - Multiplied layer compositing preserving authentic ambient shadows, spotlights, and wall textures.
- `src/components/ColorVisualizer.tsx`:
  - Connects to the Web Worker for asynchronous room analysis.
  - Fast sub-10ms color switching across curated Snowcem shade decks.
  - Interactive canvas tap-to-paint with smart flood fill and precision brush/eraser fine-tuning tools.

