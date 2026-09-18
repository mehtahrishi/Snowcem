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
- `src/components/FeaturedProductsCarousel.tsx`: Featured Products Infinite Responsive Banner Carousel:
  - **Infinite Looping Track**: Auto-advancing and touch/mouse-draggable banner showcase scanning `/public/featured/`.
  - **Seamless Section Flow**: Flush bottom transition (`pb-0`) leading directly into `HomeProductsSection` without artificial separator borders.
- `src/components/HomeProductsSection.tsx`: Compact 3x3 Architectural Table & SEO Header:
  - **Seamless Top Boundary**: Clean borderless top edge transitioning seamlessly below the Featured Products banner.
  - **Compact Architectural Table Grid**: Refined 3x3 matrix (`max-w-5xl`) with crisp, subtle grid borders (`border-neutral-300`).
  - **Proportional Product Scaling**: Compact image stage height (`h-36 sm:h-44 md:h-48`) and controlled paint can sizing (`w-20 sm:w-24 md:w-28`), preventing oversized table or giant product bloat.
  - **Responsive 2-to-3 Col Grid**: Responsive 2-column mobile layout transitioning to a clean 3x3 grid on tablet/desktop, with slim bottom bar and arrow navigation.
- `src/components/ExperienceMoreThanColour.tsx`: "Experience More Than Colour" Whole-Width Swipeable Room Showcase Carousel:
  - **Restored Header Description**: Restored exact description paragraph ("From soothing bedroom sanctuaries to durable kitchen finishes...") below the animated gradient wave title.
  - **Card Bottom Row**: Left-aligned room name ("Living Room", "Bedroom", "Kitchen", "Study Room", "Washroom", "Pooja Room") and right-aligned bare `animate-gradient-wave` arrow (`→`) with zero box background or borders, seamlessly linking to individual room exploration pages (`/spaces/living-room`, `/spaces/bedroom`, `/spaces/kitchen`, `/spaces/study-room`, `/spaces/washroom`, `/spaces/pooja-room`).
  - **Whole-Width Edge-to-Edge Stage**: Spans 100% of the screen width (`w-full`) with active card centered and adjacent room cards flowing smoothly across viewport edges.
  - **Finite Non-Looping Slider**: Strictly bounded to the 6 authentic room cards (no clones/infinite repeating). Left button disables at the start (Living Room) and Right button disables at the end (Pooja Room).
  - **Desktop Button Navigation & Mobile Touch Swipe**: Desktop users navigate cleanly using the left/right arrow buttons (mouse dragging disabled), while mobile/tablet retains smooth, direction-locked touch swiping with end-of-list resistance.
  - **Pure Clean Images (Zero Shadows, Overlays, or Hover Effects)**: All white gradient shadows, scrim overlays, hover scale/opacity transitions, and indicator dots are 100% removed, presenting pure, natural photography.
  - **Exact 1:1 Aspect Ratio (Zero Cutout / No Magnifying)**: Image containers match strictly to the 1024x1024 square dimensions (`aspect-square`, `object-contain`) of all 6 uploaded room renders (`hall.png`, `bedroom.png`, `kitchen.png`, `study.png`, `washroom.png`, `pooja.png`) with zero cropping, clipping, or magnifying.
  - **Boundary-Aware Navigation Arrows**: Circular buttons on the left and right screen edges (`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16`) that disable (`opacity-30 pointer-events-none`) when the beginning or end of the showcase is reached.
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
    - `src/components/ProductsMegaMenu.tsx`: Clean, range-wise product catalog grouping supporting dynamic 2-to-5 column responsive grid layouts (Luxury, Premium, Specialized, Midrange, Economy ranges in one clean single row), with product packshots, warranty badges, and zero text clutter.
    - `src/components/ColoursDropdown.tsx`: Clean 3-column edge-to-edge layout covering Colour Catalogue, Colour Inspiration, and Colour Blogs & Guides.
    - `src/components/ToolsMegaMenu.tsx`: Streamlined 3-card tool suite (Paint Budget Calculator, Colour Visualizer, Festive Studio & Virasat).
    - `src/components/AboutUsMegaMenu.tsx`: Streamlined 4-card corporate & heritage deck (The Snowcem Story, About Mehta Group, Team & Leadership, Awards & Recognition).
    - `src/components/ServicesDropdown.tsx`: Streamlined 3-card Support deck (Call Support 1800-209-5656, Chat Support & Consultation, Technical Advisory & Queries).
  - **Right CTA**: Separate pill buttons for `Dealer Near You` (`bg-gradient-to-r from-[#2a1b92] to-[#5c249c]`) and `Painter Near You` (`bg-gradient-to-r from-[#5c249c] to-[#e91e63]`).
  - **Mobile Slide-Over Drawer** (`src/components/SidebarDrawer.tsx`): Clean touch drawer replicating identical navigation hierarchy.
- `src/app/products/[categorySlug]/[productSlug]/page.tsx`: Seamless Product Detail Showcase (left studio backdrop image + floating packshot, right product details with zero outer enclosing borders), Paint Budget Calculator & Colour Catalogue cards, FAQs, Similar Products from Range, and `ToolsSupportTabs`.
- `src/app/festive-studio/page.tsx`: Full Festive Studio & Digital Canvas page.
- `src/app/color-catalogue/page.tsx` & `src/data/curatedShadesData.ts`: 1,800+ Curated shades categorized by room genres (Living Room, Exterior, Kitchen, Bedroom, Trendy Across Spaces, Aesthetic & Calm) with subcategory filter pills, search, and swatch copying.
- `src/app/blogs/page.tsx` & `src/app/colour-blogs/page.tsx`: SEO-optimized Colour Blogs & Guides magazine featuring in-depth interior decorating trends, exterior waterproofing guides, and search keyword strategy for organic Google discovery.
- `src/components/ToolsSupportTabs.tsx`: Interactive floating pill tab bar (`Dealer Near Me`, `Painter Near Me`, `Call Support`, `Online Chat`) matching brand design with active gradient pills and dynamic background showcase cards.
- `src/app/color-visualizer/page.tsx` & `src/components/ColorVisualizer.tsx`: 100% Real photo-based wall color visualizer powered by the 1,800 genre-curated shade deck, connected to the Python FastAPI OpenCV paint microservice (`POST /api/paint`) with instant client-side shader fallback, and `ToolsSupportTabs`.
- `src/app/paint-calculator/page.tsx`: Redesigned Paint Budget Calculator 100% focused on wall & masonry paints featuring full-width animated wave banner, space/need photo cards (`interior.png`, `exterior.png`, `freshpaint.png`, `repainting.png`), carpet area input with quick presets, painting cost guide & FAQs, and `ToolsSupportTabs`.

- `src/components/InstagramFeedSection.tsx`: Official Instagram Post Iframe Feed & Placeholder Suite:
  - Positioned directly below `VirasatStoriesSection` on the Home Page (`src/app/page.tsx`).
  - Connects to `@snowcempaints_official` (`https://www.instagram.com/snowcempaints_official/?hl=en`).
  - Clean 4-card grid designed for live Instagram post iframes (`iframeSrc`) with pure text placeholder states (zero external image dependencies) when awaiting live embed codes.
  - Follow CTA button, engagement metrics (likes, comments), post tags, and direct post links.
- `src/components/ChatbotWidget.tsx`: Bottom-Right Floating "Ask SnowSense" WhatsApp Trigger:
  - Positioned at `fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50`.
  - Styled pill with official WhatsApp icon, bold "Ask SnowSense" branding, and direct link to WhatsApp (#snowsense).
  - Automatically hidden whenever the Cookie Consent banner is active on screen to prevent UI collision.
- `src/components/CookieConsent.tsx`: Global Bottom Banner Cookie Consent:
  - Fixed bottom banner with gradient accent line, cookie icon, clear privacy policy disclosure, and solid white background (`bg-white`).
  - Refined modern button design: clean secondary "Decline" button (`bg-slate-100 border border-slate-200`) and solid primary "Accept All" button with signature brand gradient (`bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F]`).
  - Dispatches `snowcem-cookie-consent` visibility events and sets `data-cookie-consent-active` attribute to cleanly hide the Ask SnowSense chatbot while consent is pending.



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

