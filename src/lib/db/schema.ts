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
