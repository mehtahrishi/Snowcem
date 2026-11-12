import {
  mysqlTable,
  varchar,
  text,
  longtext,
  int,
  decimal,
  boolean,
  timestamp,
  json,
  index,
  foreignKey,
  uniqueIndex,
  AnyMySqlColumn,
} from "drizzle-orm/mysql-core";

// 1. Categories & Subcategories Table (self-referencing via parent_id)
export const categories = mysqlTable(
  "categories",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    parentId: varchar("parent_id", { length: 36 }).references(
      (): AnyMySqlColumn => categories.id,
      { onDelete: "set null", onUpdate: "cascade" }
    ),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 150 }).notNull(),
    description: text("description"),
    badge: varchar("badge", { length: 50 }),
    banner: varchar("banner", { length: 255 }),
    sortOrder: int("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("uq_categories_slug").on(table.slug),
    parentIdx: index("idx_categories_parent").on(table.parentId),
  })
);

// 2. Products Table
export const products = mysqlTable(
  "products",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    categoryId: varchar("category_id", { length: 36 }).notNull(),
    subcategoryId: varchar("subcategory_id", { length: 36 }),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    tagline: varchar("tagline", { length: 255 }),
    description: text("description").notNull(),
    features: json("features").$type<string[]>(),
    highlightImages: json("highlight_images").$type<string[]>(),
    warranty: varchar("warranty", { length: 100 }),
    image: varchar("image", { length: 255 }),
    detailImages: json("detail_images").$type<string[]>(),
    bgImage: varchar("bg_image", { length: 255 }),
    pdf: varchar("pdf", { length: 255 }),
    faqs: json("faqs").$type<{ question: string; answer: string }[]>(),
    sortOrder: int("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("uq_products_slug").on(table.slug),
    categoryIdx: index("idx_products_category").on(table.categoryId),
    subcategoryIdx: index("idx_products_subcategory").on(table.subcategoryId),
    categoryFk: foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "fk_products_category",
    })
      .onDelete("restrict")
      .onUpdate("cascade"),
    subcategoryFk: foreignKey({
      columns: [table.subcategoryId],
      foreignColumns: [categories.id],
      name: "fk_products_subcategory",
    })
      .onDelete("set null")
      .onUpdate("cascade"),
  })
);

// 3. Jobs Table (Markdown-based Job Roles)
export const jobs = mysqlTable(
  "jobs",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    department: varchar("department", { length: 100 }),
    location: varchar("location", { length: 150 }),
    experience: varchar("experience", { length: 100 }),
    ctc: varchar("ctc", { length: 100 }),
    summary: text("summary"),
    contentMd: longtext("content_md").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("uq_jobs_slug").on(table.slug),
  })
);

// 4. Color Catalogue / Shades Table
export const colors = mysqlTable(
  "colors",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    code: varchar("code", { length: 50 }).notNull(),
    rgb: varchar("rgb", { length: 20 }).notNull().default("255-255-255"),
    hex: varchar("hex", { length: 10 }).notNull(),
    family: varchar("family", { length: 100 }).notNull().default("Whites & Pastels"),
    category: varchar("category", { length: 100 }).notNull().default("All"),
    finish: varchar("finish", { length: 50 }).default("Matt"),
    popular: boolean("popular").default(false),
    sortOrder: int("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    familyIdx: index("idx_colors_family").on(table.family),
    codeIdx: index("idx_colors_code").on(table.code),
  })
);

// 5. Dealers Table
export const dealers = mysqlTable(
  "dealers",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    customerCode: varchar("customer_code", { length: 100 }),
    name: varchar("name", { length: 255 }).notNull(),
    address: text("address").notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    pincode: varchar("pincode", { length: 20 }),
    landmark: varchar("landmark", { length: 255 }),
    rating: decimal("rating", { precision: 3, scale: 1 }),
    featured: boolean("featured").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => ({
    cityStateIdx: index("idx_dealers_city_state").on(table.city, table.state),
  })
);

// 6. Painters Table
export const painters = mysqlTable(
  "painters",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 20 }),
    experienceYears: int("experience_years"),
    specialization: varchar("specialization", { length: 150 }),
    rating: decimal("rating", { precision: 3, scale: 1 }),
    status: varchar("status", { length: 50 }).default("active"),
    verified: boolean("verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => ({
    cityStateIdx: index("idx_painters_city_state").on(table.city, table.state),
    statusIdx: index("idx_painters_status").on(table.status),
  })
);

// 7. Explore Our Best (Featured Products Carousel — separate table)
export const featuredProducts = mysqlTable(
  "featured_products",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    productId: varchar("product_id", { length: 36 }).notNull(),
    image: varchar("image", { length: 255 }).notNull(),
    alt: varchar("alt", { length: 150 }),
    sortOrder: int("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    productIdx: index("idx_featured_product").on(table.productId),
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "fk_featured_product",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

// 8. Paint Calculator Materials & Products Table (Candidate 1)
export const calculatorMaterials = mysqlTable(
  "calculator_materials",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    group: varchar("group", { length: 50 }).notNull(), // 'Luxury' | 'Premium' | 'Economy' | 'Specialty'
    category: varchar("category", { length: 20 }).notNull(), // 'Ext' | 'Int' | 'WP' | 'PRI' | 'PUTTY' | 'DIST'
    unit: varchar("unit", { length: 10 }).notNull().default("Ltr"), // 'Ltr' | 'Kg'
    mrp: decimal("mrp", { precision: 10, scale: 2 }).notNull().default("0.00"),
    dpl: decimal("dpl", { precision: 10, scale: 2 }).notNull().default("0.00"),
    pack: decimal("pack", { precision: 8, scale: 2 }).notNull().default("1.00"),
    costPerUnit: decimal("cost_per_unit", { precision: 10, scale: 2 }).notNull().default("0.00"),
    coverage: decimal("coverage", { precision: 8, scale: 2 }).notNull().default("0.00"), // sq.ft per Ltr or Kg for 1 coat
    defaultCoats: int("default_coats").notNull().default(2),
    labourRate: decimal("labour_rate", { precision: 8, scale: 2 }).notNull().default("0.00"), // INR per sq.ft
    image: varchar("image", { length: 255 }),
    tagline: varchar("tagline", { length: 255 }),
    warranty: varchar("warranty", { length: 100 }),
    finish: varchar("finish", { length: 100 }),
    sortOrder: int("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    catGroupIdx: index("idx_calc_mat_cat_group").on(table.category, table.group),
  })
);

// 9. Paint Calculator Estimate Leads Table (Candidate 1)
export const calculatorLeads = mysqlTable(
  "calculator_leads",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    pincode: varchar("pincode", { length: 20 }).notNull(),
    startTimeline: varchar("start_timeline", { length: 100 }),
    localPainterHired: varchar("local_painter_hired", { length: 50 }),
    space: varchar("space", { length: 50 }).notNull(), // 'Interior' | 'Exterior'
    need: varchar("need", { length: 50 }).notNull(), // 'Fresh Painting' | 'Repainting'
    carpetArea: int("carpet_area").notNull(),
    selectedTier: varchar("selected_tier", { length: 50 }), // 'Economy' | 'Premium' | 'Luxury'
    totalEstimatedCost: decimal("total_estimated_cost", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    phoneIdx: index("idx_calc_leads_phone").on(table.phone),
    createdIdx: index("idx_calc_leads_created").on(table.createdAt),
  })
);

// 10. Media, Press Releases & TVCs Table (Candidate 2)
export const mediaVideos = mysqlTable(
  "media_videos",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    language: varchar("language", { length: 50 }).notNull(),
    youtubeId: varchar("youtube_id", { length: 50 }).notNull(),
    youtubeUrl: varchar("youtube_url", { length: 255 }).notNull(),
    description: text("description").notNull(),
    tag: varchar("tag", { length: 100 }).notNull().default("Regional TVC"), // 'National TVC' | 'Regional TVC' | 'Press'
    sortOrder: int("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    langIdx: index("idx_media_language").on(table.language),
  })
);

// 11. Curated Color Decks & Palettes Table (Candidate 5)
export const curatedPalettes = mysqlTable(
  "curated_palettes",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    category: varchar("category", { length: 100 }).notNull(), // e.g. 'Most Searched: Living Room'
    subcategory: varchar("subcategory", { length: 100 }).notNull(), // e.g. 'Warm Neutrals & Greiges'
    name: varchar("name", { length: 150 }).notNull(),
    hex: varchar("hex", { length: 10 }).notNull(),
    recommendedSurface: varchar("recommended_surface", { length: 150 }),
    moodAndDescription: text("mood_and_description"),
    sortOrder: int("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    catSubcatIdx: index("idx_curated_cat_subcat").on(table.category, table.subcategory),
  })
);

// 12. Contact Us Inquiries, Popups & Leads Table (Candidate 6)
export const contactInquiries = mysqlTable(
  "contact_inquiries",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    email: varchar("email", { length: 150 }),
    city: varchar("city", { length: 100 }),
    pincode: varchar("pincode", { length: 20 }),
    mobile: varchar("mobile", { length: 50 }).notNull(),
    inquiryType: varchar("inquiry_type", { length: 100 }).notNull().default("Customer Support"),
    message: text("message"),
    metadata: json("metadata").$type<Record<string, any>>(),
    status: varchar("status", { length: 50 }).notNull().default("unread"), // 'unread' | 'read' | 'in_progress' | 'resolved'
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    statusIdx: index("idx_inquiries_status").on(table.status),
    mobileIdx: index("idx_inquiries_mobile").on(table.mobile),
    createdIdx: index("idx_inquiries_created").on(table.createdAt),
  })
);

export type FeaturedProduct = typeof featuredProducts.$inferSelect;
export type NewFeaturedProduct = typeof featuredProducts.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;

export type ColorItem = typeof colors.$inferSelect;
export type NewColorItem = typeof colors.$inferInsert;

export type Dealer = typeof dealers.$inferSelect;
export type NewDealer = typeof dealers.$inferInsert;

export type Painter = typeof painters.$inferSelect;
export type NewPainter = typeof painters.$inferInsert;

export type CalculatorMaterial = typeof calculatorMaterials.$inferSelect;
export type NewCalculatorMaterial = typeof calculatorMaterials.$inferInsert;

export type CalculatorLead = typeof calculatorLeads.$inferSelect;
export type NewCalculatorLead = typeof calculatorLeads.$inferInsert;

export type MediaVideo = typeof mediaVideos.$inferSelect;
export type NewMediaVideo = typeof mediaVideos.$inferInsert;

export type CuratedPalette = typeof curatedPalettes.$inferSelect;
export type NewCuratedPalette = typeof curatedPalettes.$inferInsert;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type NewContactInquiry = typeof contactInquiries.$inferInsert;
