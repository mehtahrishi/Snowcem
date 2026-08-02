import { db } from '@/db';
import { products, collections } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface Product {
  id: number;
  title: string;
  sku: string;
  collectionId: number;
  collectionSlug: string;
  // Backwards compatibility aliases
  categoryId?: number;
  categorySlug?: string;
  status: 'Active' | 'Draft' | 'Archived';
  description: string;
  image: string;
  createdAt: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await db.select().from(products);
    return rows.map((r) => ({
      ...r,
      categoryId: r.collectionId,
      categorySlug: r.collectionSlug,
      description: r.description || '',
      image: r.image || '',
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching products from database:', error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const rows = await db.select().from(products).where(eq(products.id, id));
    if (!rows.length) return null;
    const r = rows[0];
    return {
      ...r,
      categoryId: r.collectionId,
      categorySlug: r.collectionSlug,
      description: r.description || '',
      image: r.image || '',
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.collectionSlug, collectionSlug));
    return rows.map((r) => ({
      ...r,
      categoryId: r.collectionId,
      categorySlug: r.collectionSlug,
      description: r.description || '',
      image: r.image || '',
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error(`Error fetching products by collection ${collectionSlug}:`, error);
    return [];
  }
}

export const getProductsByCategory = getProductsByCollection;

export async function createProduct(
  data: Omit<Product, 'id' | 'createdAt' | 'collectionSlug' | 'categorySlug'> & {
    collectionSlug?: string;
    categorySlug?: string;
  }
): Promise<Product> {
  const colId = data.collectionId || data.categoryId || 1;
  let colSlug = data.collectionSlug || data.categorySlug || '';

  if (!colSlug && colId) {
    const colRows = await db.select().from(collections).where(eq(collections.id, colId));
    if (colRows.length) colSlug = colRows[0].slug;
  }

  const [result] = await db.insert(products).values({
    title: data.title,
    sku: data.sku,
    collectionId: colId,
    collectionSlug: colSlug || 'general',
    status: data.status,
    description: data.description,
    image: data.image,
  });

  const insertedId = (result as any).insertId || Date.now();
  return {
    id: Number(insertedId),
    title: data.title,
    sku: data.sku,
    collectionId: colId,
    collectionSlug: colSlug || 'general',
    categoryId: colId,
    categorySlug: colSlug || 'general',
    status: data.status,
    description: data.description,
    image: data.image,
    createdAt: new Date().toISOString(),
  };
}

export async function updateProduct(
  id: number,
  data: Partial<Omit<Product, 'id' | 'createdAt'>>
): Promise<Product | null> {
  const colId = data.collectionId || data.categoryId;
  let colSlug = data.collectionSlug || data.categorySlug;

  if (colId && !colSlug) {
    const colRows = await db.select().from(collections).where(eq(collections.id, colId));
    if (colRows.length) colSlug = colRows[0].slug;
  }

  await db
    .update(products)
    .set({
      ...(data.title ? { title: data.title } : {}),
      ...(data.sku ? { sku: data.sku } : {}),
      ...(colId ? { collectionId: colId } : {}),
      ...(colSlug ? { collectionSlug: colSlug } : {}),
      ...(data.status ? { status: data.status } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.image !== undefined ? { image: data.image } : {}),
    })
    .where(eq(products.id, id));

  return getProductById(id);
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    await db.delete(products).where(eq(products.id, id));
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    return false;
  }
}
