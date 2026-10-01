import {
  mysqlTable,
  varchar,
  text,
  int,
  decimal,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

// 1. Dealers Table
export const dealers = mysqlTable("dealers", {
  id: varchar("id", { length: 36 }).primaryKey(),
  customerCode: varchar("customer_code", { length: 100 }),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  pincode: varchar("pincode", { length: 20 }),
  landmark: varchar("landmark", { length: 255 }),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("4.8"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 2. Painters Table
export const painters = mysqlTable("painters", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  pincode: varchar("pincode", { length: 20 }),
  experienceYears: int("experience_years").default(3),
  specialization: varchar("specialization", { length: 150 }).default("Exterior Textures & Emulsions"),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("4.8"),
  status: varchar("status", { length: 50 }).default("active"), // 'active', 'pending', 'inactive'
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 3. Color Catalogue / Shades Table
export const colors = mysqlTable("colors", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  code: varchar("code", { length: 50 }).notNull(),
  hex: varchar("hex", { length: 10 }).notNull(),
  category: varchar("category", { length: 100 }).notNull().default("Uni-glosss"),
  finish: varchar("finish", { length: 50 }).default("Gloss"),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Dealer = typeof dealers.$inferSelect;
export type NewDealer = typeof dealers.$inferInsert;

export type Painter = typeof painters.$inferSelect;
export type NewPainter = typeof painters.$inferInsert;

export type ColorItem = typeof colors.$inferSelect;
export type NewColorItem = typeof colors.$inferInsert;
