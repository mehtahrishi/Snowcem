```
Snowcem
├─ .env.local                                                                 # Local development environment secrets (tunnel DB, session secret, admin creds)
├─ .gitignore                                                                 # Excludes node_modules, .next, .env, /uploads/, and build artifacts
├─ drizzle.config.ts                                                          # Drizzle ORM CLI config (reads schema at src/lib/db/schema.ts and DATABASE_URL)
├─ next-env.d.ts                                                              # Next.js auto-generated TypeScript declarations
├─ next.config.mjs                                                            # Next.js config: rewrites /uploads/* to /api/uploads/*, sets images.unoptimized: true
├─ package-lock.json                                                          # Deterministic dependency tree lockfile
├─ package.json                                                               # Project dependencies (Next 14, Drizzle, MySQL2, Sharp, Iron-Session, Tailwind)
├─ paint budget calculator understanding.docx                                 # Domain reference doc: Paint calculator business logic and coverage formulas
├─ Paint Budget Calculator Working.xlsx                                       # Spreadsheet reference: Original labor and material cost matrices for paint calculator
├─ postcss.config.js                                                          # PostCSS configuration for Tailwind CSS and Autoprefixer
├─ public                                                                     # Public static assets served at root /
│  ├─ banner.png                                                              # Hero / brand promotional display banner
│  ├─ calculator.png                                                          # Paint calculator tool promotional graphic
│  ├─ careers                                                                 # Career page value & benefit icons
│  │  ├─ brain.png                                                            # "Smart Thinking / Strategy" benefit icon
│  │  ├─ eye.png                                                              # "Attention to Detail" culture icon
│  │  ├─ hand.png                                                             # "Collaboration / Teamwork" culture icon
│  │  ├─ image.png                                                            # Career team banner photograph
│  │  ├─ mission.png                                                          # Company mission statement emblem
│  │  ├─ search.png                                                           # "Open Opportunities" search icon
│  │  └─ thumbsup.png                                                         # "Great Workplace" culture badge
│  ├─ certificates                                                            # Quality & environmental certifications (ISO/EMS/QMS)
│  │  ├─ environmental-management.webp                                        # EMS certification badge
│  │  ├─ quality-management.webp                                              # QMS certification badge
│  │  ├─ SAURASHTRA CEMENT LIMITED - EMS.pdf                                  # Downloadable EMS audit certificate
│  │  ├─ SAURASHTRA CEMENT LIMITED - QMS.pdf                                  # Downloadable QMS audit certificate
│  │  ├─ Snowcem Paints  Brand of Saurashtra Cement Ltd-Paints Division (1).pdf# Downloadable brand division certificate
│  │  └─ snowcem-certification.webp                                           # Saurashtra Cement accreditation badge
│  ├─ color-shades.png                                                        # Visualizer / shade palette tool feature graphic
│  ├─ contact.png                                                             # Contact Us page header banner
│  ├─ dealer                                                                  # Dealer locator visual assets
│  │  └─ image.png                                                            # Dealer network illustration
│  ├─ experience                                                              # Room inspiration preview thumbnails
│  │  ├─ bedroom.png                                                          # Bedroom experience thumbnail
│  │  ├─ dining.png                                                           # Dining area experience thumbnail
│  │  ├─ hall.png                                                             # Living room / hall experience thumbnail
│  │  ├─ kitchen.png                                                          # Kitchen experience thumbnail
│  │  ├─ pooja.png                                                            # Pooja room experience thumbnail
│  │  ├─ study.png                                                            # Study room experience thumbnail
│  │  └─ washroom.png                                                         # Washroom experience thumbnail
│  ├─ favicon.ico                                                             # Browser tab favicon
│  ├─ festive.png                                                             # Festive Studio promotional card
│  ├─ ganpati-outline.jpg                                                     # Festive line-art illustration
│  ├─ image.png                                                               # Primary Snowcem corporate brand logo
│  ├─ life-culture                                                            # Life at Snowcem culture icons and event photos
│  │  ├─ commitment-white.png                                                 # Core value icon: Commitment
│  │  ├─ flawless-service-white.png                                           # Core value icon: Flawless Service
│  │  ├─ fun.png                                                              # Culture highlight: Fun at work
│  │  ├─ image.png                                                            # Employee teamwork group photo
│  │  ├─ integrity-white.png                                                  # Core value icon: Integrity
│  │  ├─ life@.png                                                            # "Life@Snowcem" banner badge
│  │  ├─ peace.png                                                            # Culture card: Harmonious environment
│  │  ├─ speed-white.png                                                      # Core value icon: Speed & Agility
│  │  ├─ team.png                                                             # Culture photo: Cross-functional collaboration
│  │  ├─ timeline.png                                                         # Hiring process timeline illustration
│  │  ├─ training.png                                                         # Continuous learning & skill training photo
│  │  └─ transparent-ecosystem-white.png                                      # Core value icon: Transparent Ecosystem
│  ├─ media                                                                   # Press & media publication logos
│  │  ├─ finxx.png                                                            # Financial Express publication feature logo
│  │  ├─ image.png                                                            # Media gallery spotlight graphic
│  │  └─ mediabrief.png                                                       # MediaBrief press publication logo
│  ├─ mehta-group                                                             # Mehta Group parent company assets
│  │  └─ image.png                                                            # Mehta Group corporate identity logo
│  ├─ painter                                                                 # Painter network program graphics
│  │  └─ image.png                                                            # Painter registration promotional card
│  ├─ paints.json                                                             # Static catalog reference (superseded by MySQL colors table)
│  ├─ rangon.png                                                              # "Rangon Ki Virasat" heritage illustration
│  ├─ spaces                                                                  # Room visualizer layer masks & video
│  │  ├─ banner.mp4                                                           # Short decorative background loop for spaces
│  │  ├─ bedroom                                                              # 2D layer masks for bedroom wall recoloring (7.png-150.png)
│  │  ├─ dining-room                                                          # 2D layer masks for dining room wall recoloring (17.png-160.png)
│  │  ├─ kitchen                                                              # 2D layer masks for kitchen wall recoloring (12.png-155.png)
│  │  ├─ living-room                                                          # 2D layer masks for living room wall recoloring (2.png-145.png)
│  │  ├─ pooja-room                                                           # 2D layer masks for pooja room wall recoloring (32.png-137.png)
│  │  ├─ study-room                                                           # 2D layer masks for study room wall recoloring (22.png-165.png)
│  │  └─ wash-room                                                            # 2D layer masks for washroom wall recoloring (27.png-170.png)
│  ├─ story                                                                   # 60+ Years Snowcem heritage story milestones
│  │  ├─ image.png                                                            # Historical factory foundation photo
│  │  ├─ image2.png                                                           # Heritage paint formulation milestone
│  │  ├─ india.png                                                            # Pan-India footprint map
│  │  └─ mehta.png                                                            # Founder portrait / leadership archival photo
│  ├─ tools                                                                   # Interactive tools icon deck (Homepage / Tools Mega Menu)
│  │  ├─ calculator.png                                                       # Paint Budget Calculator icon
│  │  ├─ call-support.png                                                     # Toll-free technical support icon
│  │  ├─ chat.png                                                             # Chatbot / WhatsApp assistance icon
│  │  ├─ color-shades.png                                                     # Shade finder tool icon
│  │  ├─ dealer.png                                                           # Dealer locator icon
│  │  ├─ exterior.png                                                         # Exterior painting guidance icon
│  │  ├─ festive.png                                                          # Festive decor ideas icon
│  │  ├─ fresh.png                                                            # Fresh painting process icon
│  │  ├─ freshpaint.png                                                       # Fresh surface preparation badge
│  │  ├─ interior.png                                                         # Interior decor guidance icon
│  │  ├─ painter.png                                                          # Find an authorized painter icon
│  │  ├─ repainting.png                                                       # Repainting guide icon
│  │  └─ visual.png                                                           # Virtual room color visualizer icon
│  ├─ true-colors                                                             # True Colours of Life: Dealer & partner events
│  │  ├─ business-event-dubai.png                                             # Annual partner meet: Dubai
│  │  ├─ business-event-durgapur.png                                          # Regional dealer conference: Durgapur
│  │  ├─ business-event-puri.png                                              # Annual partner convention: Puri
│  │  ├─ business-event-thailand.png                                          # International dealer meet: Thailand
│  │  ├─ business-partner-meet.png                                            # National channel partner summit
│  │  ├─ consistent-quality-white.png                                         # Brand pillar: Consistent Quality
│  │  ├─ continuous-innovation-white.png                                      # Brand pillar: Continuous Innovation
│  │  ├─ customer-satisfaction-white.png                                      # Brand pillar: Customer Satisfaction
│  │  ├─ event-ahmedabad.png                                                  # Dealer conclave: Ahmedabad
│  │  ├─ event-kolhapur.png                                                   # Dealer conclave: Kolhapur
│  │  ├─ event-puri.png                                                       # Regional summit: Puri
│  │  ├─ event-rajkot.png                                                     # Dealer conclave: Rajkot
│  │  ├─ event-salem.png                                                      # Regional summit: Salem
│  │  ├─ event-thane.png                                                      # Dealer conclave: Thane
│  │  ├─ image copy 2.png                                                     # Dealer appreciation award night photo
│  │  ├─ image copy 3.png                                                     # Keynote address at national summit
│  │  ├─ image copy 4.png                                                     # Product launch ceremony at annual meet
│  │  ├─ image copy 5.png                                                     # Dealer felicitation ceremony
│  │  ├─ image copy.png                                                       # Partner networking session
│  │  ├─ image.png                                                            # True Colours banner overview
│  │  ├─ robust-backend-white.png                                             # Brand pillar: Robust Supply Chain
│  │  └─ strong-core-team-white.png                                           # Brand pillar: Experienced Leadership
│  ├─ video-banner.mp4                                                        # Homepage hero background video (waterproofing resilience)
│  ├─ visual.png                                                              # Color visualizer tool preview
│  ├─ visualizer                                                              # 2D sample room previews for live colorizer
│  │  ├─ image.png                                                            # Visualizer studio welcome image
│  │  ├─ sample-bedroom.png                                                   # Sample bedroom base photographic layer
│  │  ├─ sample-diningarea.png                                                # Sample dining area base photographic layer
│  │  ├─ sample-exterior.png                                                  # Sample home exterior base photographic layer
│  │  ├─ sample-kitchen.png                                                   # Sample kitchen base photographic layer
│  │  ├─ sample-living-room.png                                               # Sample living room base photographic layer
│  │  ├─ sample-poojaroom.png                                                 # Sample pooja room base photographic layer
│  │  ├─ sample-studyroom.png                                                 # Sample study room base photographic layer
│  │  └─ sample-washroom.png                                                  # Sample washroom base photographic layer
│  └─ worker.js                                                               # Image processing web worker script for client recoloring
├─ Readme.md                                                                  # System deployment & server hardening runbook
├─ server.js                                                                  # Standalone Node.js HTTP server wrapper (listening on PORT 3000)
├─ src
│  ├─ app
│  │  ├─ about-us
│  │  │  ├─ about-mehta-group
│  │  │  │  └─ page.tsx                                                       # Corporate page: Mehta Group conglomerate legacy and divisions
│  │  │  ├─ the-snowcem-story
│  │  │  │  └─ page.tsx                                                       # Heritage page: 60+ years journey, innovation, and leadership
│  │  │  └─ true-colours-of-life
│  │  │     └─ page.tsx                                                       # Brand ethos, dealer events gallery, and core values
│  │  ├─ admin
│  │  │  ├─ categories
│  │  │  │  └─ page.tsx                                                       # Admin CRUD: Add/edit/delete categories & subcategories
│  │  │  ├─ colors
│  │  │  │  └─ page.tsx                                                       # Admin CRUD: Manage 142 paint catalog shades and hex values
│  │  │  ├─ dealers
│  │  │  │  └─ page.tsx                                                       # Admin CRUD: Dealer directory management & bulk CSV upload
│  │  │  ├─ featured
│  │  │  │  └─ page.tsx                                                       # Admin CRUD: Manage homepage "Explore Our Best" carousel items
│  │  │  ├─ jobs
│  │  │  │  └─ page.tsx                                                       # Admin CRUD: Post and manage career openings with Markdown specs
│  │  │  ├─ layout.tsx                                                        # Admin layout: Sidebar navigation, stats summary, and session logout
│  │  │  ├─ login
│  │  │  │  └─ page.tsx                                                       # Secure admin login form (Iron-Session authenticated)
│  │  │  ├─ page.tsx                                                          # Admin dashboard: Metrics, table row counts, and quick actions
│  │  │  ├─ painters
│  │  │  │  └─ page.tsx                                                       # Admin CRUD: Verified painter directory management
│  │  │  └─ products
│  │  │     └─ page.tsx                                                       # Admin CRUD: 44 products, WebP packshots, inline sort_order editor
│  │  ├─ api
│  │  │  ├─ admin
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ login
│  │  │  │  │  │  └─ route.ts                                                 # POST: Validates ADMIN_USER / ADMIN_PASSWORD and seals Iron-Session
│  │  │  │  │  ├─ logout
│  │  │  │  │  │  └─ route.ts                                                 # POST: Destroys admin cookie session
│  │  │  │  │  └─ me
│  │  │  │  │     └─ route.ts                                                 # GET: Returns current admin login session status
│  │  │  │  ├─ categories
│  │  │  │  │  ├─ route.ts                                                    # GET (all categories), POST (create category/subcategory)
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ route.ts                                                 # PATCH (update category), DELETE (remove category)
│  │  │  │  ├─ colors
│  │  │  │  │  ├─ name
│  │  │  │  │  │  └─ route.ts                                                 # POST: Uses color-namer to suggest decorative name from hex
│  │  │  │  │  ├─ route.ts                                                    # GET (all colors), POST (add color shade to MySQL)
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ route.ts                                                 # PATCH (update shade), DELETE (remove shade)
│  │  │  │  ├─ dealers
│  │  │  │  │  ├─ bulk-delete
│  │  │  │  │  │  └─ route.ts                                                 # POST: Bulk remove selected dealers
│  │  │  │  │  ├─ route.ts                                                    # GET (all dealers), POST (add single dealer)
│  │  │  │  │  ├─ upload
│  │  │  │  │  │  └─ route.ts                                                 # POST: CSV batch upload for authorized dealers
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ route.ts                                                 # PATCH (update dealer), DELETE (remove dealer)
│  │  │  │  ├─ featured-products
│  │  │  │  │  └─ route.ts                                                    # GET (all featured items), POST (attach product to carousel)
│  │  │  │  ├─ jobs
│  │  │  │  │  └─ route.ts                                                    # GET (all postings), POST (create new job opening)
│  │  │  │  ├─ painters
│  │  │  │  │  ├─ bulk-delete
│  │  │  │  │  │  └─ route.ts                                                 # POST: Bulk remove selected painters
│  │  │  │  │  ├─ route.ts                                                    # GET (all painters), POST (register new painter)
│  │  │  │  │  ├─ upload
│  │  │  │  │  │  └─ route.ts                                                 # POST: CSV batch upload for registered painters
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ route.ts                                                 # PATCH (update painter), DELETE (remove painter)
│  │  │  │  ├─ products
│  │  │  │  │  ├─ route.ts                                                    # GET (all products with sort_order), POST (create product)
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ route.ts                                                 # PATCH (update product fields / sort_order), DELETE (product)
│  │  │  │  ├─ stats
│  │  │  │  │  └─ route.ts                                                    # GET: Dashboard counts (categories, products, dealers, painters, jobs)
│  │  │  │  └─ upload
│  │  │  │     └─ route.ts                                                    # POST: Uploads image, converts to WebP via Sharp, stores in /uploads/
│  │  │  ├─ categories
│  │  │  │  └─ route.ts                                                       # Public GET: Returns active categories & subcategories tree
│  │  │  ├─ colors
│  │  │  │  └─ route.ts                                                       # Public GET: Filtered color catalogue (by family, search, category)
│  │  │  ├─ dealers
│  │  │  │  └─ route.ts                                                       # Public GET: Pincode, city, and state dealer search
│  │  │  ├─ detect-walls
│  │  │  │  └─ route.ts                                                       # POST: ML wall segmentation endpoint for visualizer
│  │  │  ├─ featured-products
│  │  │  │  └─ route.ts                                                       # Public GET: Returns active "Explore Our Best" carousel items
│  │  │  ├─ jobs
│  │  │  │  └─ route.ts                                                       # Public GET: Active job openings list and single job lookup
│  │  │  ├─ paint
│  │  │  │  └─ route.ts                                                       # POST: Recoloring canvas API
│  │  │  ├─ painters
│  │  │  │  └─ route.ts                                                       # Public GET: Painter locator endpoint (city/state/pincode)
│  │  │  ├─ products
│  │  │  │  └─ route.ts                                                       # Public GET: Filtered by categorySlug, slug, sorted by sort_order
│  │  │  └─ uploads
│  │  │     └─ [...path]
│  │  │        └─ route.ts                                                    # GET: Serves WebP images and PDFs safely from /uploads/ directory
│  │  ├─ blogs
│  │  │  └─ page.tsx                                                          # Painting tips, home decor guides, and seasonal color articles
│  │  ├─ careers
│  │  │  ├─ page.tsx                                                          # Careers overview: Culture, benefits, hiring steps, open positions
│  │  │  └─ [jobId]
│  │  │     └─ page.tsx                                                       # Detailed job posting with Markdown specs and application email CTA
│  │  ├─ collection
│  │  │  └─ paints
│  │  │     └─ page.tsx                                                       # Complete products catalog view with search and category filters
│  │  ├─ color-catalogue
│  │  │  └─ page.tsx                                                          # 142-shade color library with color families, search, and RGB/hex copy
│  │  ├─ color-visualizer
│  │  │  └─ page.tsx                                                          # Interactive virtual painting studio (upload room or use presets)
│  │  ├─ colour-blogs
│  │  │  └─ page.tsx                                                          # Redirect / alias for blogs
│  │  ├─ colour-visualiser
│  │  │  └─ page.tsx                                                          # UK-spelling route alias for /color-visualizer
│  │  ├─ contact-us
│  │  │  └─ page.tsx                                                          # Corporate head office, factory contacts, map, and inquiry form
│  │  ├─ find-dealer
│  │  │  └─ page.tsx                                                          # Interactive dealer search tool (search by city, state, or pincode)
│  │  ├─ find-dealers
│  │  │  └─ page.tsx                                                          # Plural URL route alias for /find-dealer
│  │  ├─ find-painter
│  │  │  └─ page.tsx                                                          # Directory of registered painters across India
│  │  ├─ find-painters
│  │  │  └─ page.tsx                                                          # Plural URL route alias for /find-painter
│  │  ├─ globals.css                                                          # Global styles, Tailwind base/components/utilities, custom scrollbar
│  │  ├─ layout.tsx                                                           # Root layout: Header, Announcements, PaintLoader, Footer, CookieConsent
│  │  ├─ life-at-snowcem
│  │  │  └─ page.tsx                                                          # Employee spotlights, diversity, and life at Snowcem gallery
│  │  ├─ media
│  │  │  └─ page.tsx                                                          # Press releases, news publications, and TV commercials gallery
│  │  ├─ not-found.tsx                                                        # Custom branded 404 error page
│  │  ├─ page.tsx                                                             # Official Snowcem homepage (Hero, Best, Products, Tools, Stories)
│  │  ├─ paint-calculator
│  │  │  ├─ layout.tsx                                                        # Paint calculator metadata and container layout
│  │  │  └─ page.tsx                                                          # 2-Step interactive calculator (carpet area, solution tiers, PDF export)
│  │  ├─ products
│  │  │  └─ [categorySlug]
│  │  │     ├─ page.tsx                                                       # Category view: Lists products belonging to that category
│  │  │     └─ [productSlug]
│  │  │        └─ page.tsx                                                    # Product details: Packshot, features, warranty, FAQs, PDF download
│  │  ├─ spaces
│  │  │  ├─ living-room
│  │  │  │  └─ page.tsx                                                       # Dedicated living room color inspiration gallery
│  │  │  └─ [roomSlug]
│  │  │     └─ page.tsx                                                       # Dynamic room spaces page (bedroom, dining, kitchen, pooja, etc.)
│  │  └─ visualiser
│  │     └─ page.tsx                                                          # Alternate spelling route alias for /color-visualizer
│  ├─ components
│  │  ├─ AboutUsMegaMenu.tsx                                                  # Navigation flyout menu for About Us (Story, Mehta Group, True Colours)
│  │  ├─ admin
│  │  │  └─ CustomModal.tsx                                                   # Reusable dark-mode modal for admin creation & edit dialogs
│  │  ├─ AnnouncementBar.tsx                                                  # Top promotional ticker bar above main navigation
│  │  ├─ BrandPillarsSection.tsx                                              # 5 core brand pillars (Durability, Eco-friendly, Heritage, Quality, Value)
│  │  ├─ BrandStory.tsx                                                       # Homepage brand heritage snippet
│  │  ├─ CertificateCarousel.tsx                                              # ISO & QMS certifications interactive carousel
│  │  ├─ ChatbotWidget.tsx                                                    # Floating WhatsApp / chat support launcher
│  │  ├─ ColorVisualizer.tsx                                                  # Full-page canvas visualizer component
│  │  ├─ colour-visualizer
│  │  │  ├─ ColourVisualizer.tsx                                              # Embedded visualizer interface with color picker and room presets
│  │  │  └─ lib
│  │  │     ├─ recolor.ts                                                     # Pixel-level blending and color transformation mathematics
│  │  │     ├─ refine.ts                                                      # Edge refinement and feathering for realistic wall repainting
│  │  │     └─ segmentation.worker.ts                                         # Off-thread web worker running wall mask segmentation
│  │  ├─ ColoursDropdown.tsx                                                  # Navigation dropdown for Color Catalogue and Shade Decks
│  │  ├─ CookieConsent.tsx                                                    # GDPR / privacy consent cookie banner
│  │  ├─ CustomDropdown.tsx                                                   # Generic styled select dropdown component
│  │  ├─ ExperienceMoreThanColour.tsx                                         # Interactive room experience switcher on homepage
│  │  ├─ FeaturedProductsCarousel.tsx                                         # "Explore Our Best" carousel connected to featured_products MySQL table
│  │  ├─ Footer.tsx                                                           # Footer with quick links, social media, category links, copyright
│  │  ├─ GoogleReviewsCarousel.tsx                                            # Customer satisfaction reviews and star ratings carousel
│  │  ├─ Header.tsx                                                           # Responsive desktop & mobile header with mega menus and search
│  │  ├─ Hero.tsx                                                             # Homepage full-bleed hero section with background video & CTAs
│  │  ├─ HomeProductsSection.tsx                                              # Category tabbed product showcase on homepage
│  │  ├─ HomeToolsSection.tsx                                                 # Interactive tools grid on homepage (Calculator, Visualizer, Dealer)
│  │  ├─ InstagramFeedSection.tsx                                             # Social media inspiration photo gallery
│  │  ├─ Logo.tsx                                                             # Reusable responsive Snowcem brand logo SVG/image component
│  │  ├─ PaintingServiceQueryBanner.tsx                                       # Painter assistance query banner with instant call CTA
│  │  ├─ PaintLoader.tsx                                                      # Splash paint pour animation shown once on initial visit
│  │  ├─ ProductCategoryGrid.tsx                                              # Category navigation cards grid
│  │  ├─ ProductsMegaMenu.tsx                                                 # Navigation mega-menu dynamically populated from categories API
│  │  ├─ ProfessionalAdviceSection.tsx                                        # Expert consultation banner
│  │  ├─ RangonKiVirasat.tsx                                                  # Heritage feature spotlight ("Rangon Ki Virasat")
│  │  ├─ SectionDivider.tsx                                                   # Visual separator with decorative gold brand motif
│  │  ├─ ServicesDropdown.tsx                                                 # Navigation dropdown for painting services & technical advice
│  │  ├─ SidebarDrawer.tsx                                                    # Mobile navigation drawer with slide-out animation
│  │  ├─ ToolsMegaMenu.tsx                                                    # Navigation mega-menu for all paint tools & finders
│  │  ├─ ToolsSupportTabs.tsx                                                 # Tabbed switcher for support options & warranty registration
│  │  ├─ TrendyColoursDeck.tsx                                                # Curated color deck cards with hex swatch previews
│  │  ├─ VideoModal.tsx                                                       # Lightbox modal for playing TV commercials and product videos
│  │  ├─ VirasatStoriesSection.tsx                                            # Heritage landmark case studies and stories
│  │  └─ WhoYouAreModal.tsx                                                   # User persona selector dialog (Homeowner, Contractor, Architect)
│  ├─ data
│  │  ├─ careersData.ts                                                       # Core values, benefits, and hiring process steps
│  │  ├─ curatedShadesData.ts                                                 # 10 curated mood palettes (Warm Neutrals, Earthy Greens, etc.)
│  │  ├─ lifeAtSnowcemData.ts                                                 # Employee culture statements and testimonials
│  │  ├─ mediaData.ts                                                         # Press releases, news clippings, and YouTube video IDs
│  │  ├─ paintCalculatorData.ts                                               # Formula matrices, coverage coefficients, and labor pricing
│  │  ├─ roomThemesData.ts                                                    # Color pairing presets for the 7 room spaces
│  │  └─ spaces                                                               # Room preset coordinates and wall zone maps
│  │     ├─ bedroom.ts                                                        # Bedroom wall zones and default shades
│  │     ├─ diningRoom.ts                                                     # Dining room wall zones and default shades
│  │     ├─ index.ts                                                          # Unified exporter for all 7 room space configurations
│  │     ├─ kitchen.ts                                                        # Kitchen wall zones and default shades
│  │     ├─ livingRoom.ts                                                     # Living room wall zones and default shades
│  │     ├─ poojaRoom.ts                                                      # Pooja room wall zones and default shades
│  │     ├─ studyRoom.ts                                                      # Study room wall zones and default shades
│  │     ├─ types.ts                                                          # TypeScript interfaces for space presets, zones, and coordinates
│  │     └─ washroom.ts                                                       # Washroom wall zones and default shades
│  ├─ lib
│  │  ├─ auth
│  │  │  └─ session.ts                                                        # Iron-Session options, TypeScript session data types, getSession()
│  │  ├─ catalogClient.ts                                                     # Client-side memoized data fetchers for categories and products
│  │  ├─ colors
│  │  │  └─ namer.ts                                                          # Hex normalizer and color-namer utility functions
│  │  └─ db
│  │     ├─ index.ts                                                          # MySQL connection pool and Drizzle ORM client initialization
│  │     └─ schema.ts                                                         # Complete MySQL schema (categories, products, jobs, colors, dealers, etc.)
│  ├─ middleware.ts                                                           # Next.js middleware: protects /admin routes, handles reverse-proxy host
│  └─ utils
│     └─ generateEstimatePdf.ts                                               # Generates branded Snowcem estimate PDF report via CDN jsPDF
├─ tailwind.config.js                                                         # Tailwind color tokens, font families, and responsive breakpoints
└─ tsconfig.json                                                              # Strict TypeScript configuration with @/* path mappings
```
