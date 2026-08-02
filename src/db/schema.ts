import {
  mysqlTable,
  varchar,
  text,
  mysqlEnum,
  timestamp,
  double,
  int,
} from 'drizzle-orm/mysql-core';

export const collections = mysqlTable('collections', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  image: text('image'),
  status: mysqlEnum('status', ['Active', 'Archived']).default('Active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  sku: varchar('sku', { length: 128 }).notNull().unique(),
  collectionId: int('collection_id')
    .notNull()
    .references(() => collections.id, { onDelete: 'cascade' }),
  collectionSlug: varchar('collection_slug', { length: 255 }).notNull(),
  status: mysqlEnum('status', ['Active', 'Draft', 'Archived'])
    .default('Active')
    .notNull(),
  description: text('description'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = mysqlTable('orders', {
  id: int('id').primaryKey().autoincrement(),
  orderNumber: varchar('order_number', { length: 64 }).notNull().unique(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  totalAmount: double('total_amount').notNull().default(0),
  status: mysqlEnum('status', [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ])
    .default('Pending')
    .notNull(),
  paymentStatus: mysqlEnum('payment_status', ['Paid', 'Pending', 'Refunded'])
    .default('Pending')
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orderItems = mysqlTable('order_items', {
  id: int('id').primaryKey().autoincrement(),
  orderId: int('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: int('product_id'),
  title: varchar('title', { length: 255 }).notNull(),
  collectionName: varchar('collection_name', { length: 255 }),
  qty: int('qty').notNull().default(1),
  price: double('price').notNull().default(0),
});

export const customers = mysqlTable('customers', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 64 }),
  city: varchar('city', { length: 128 }),
  totalOrders: int('total_orders').notNull().default(0),
  totalSpent: double('total_spent').notNull().default(0),
  status: mysqlEnum('status', ['Active', 'Inactive'])
    .default('Active')
    .notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});
