import { db } from '@/db';
import { collections } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: 'Active' | 'Archived';
  createdAt: string;
}

// Retain alias export for backwards compatibility
export type Category = Collection;

export async function getCollections(): Promise<Collection[]> {
  try {
    const rows = await db.select().from(collections);
    return rows.map((r) => ({
      ...r,
      description: r.description || '',
      image: r.image || '',
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching collections from database:', error);
    return [];
  }
}

export const getCategories = getCollections;

export async function getCollectionById(id: number): Promise<Collection | null> {
  try {
    const rows = await db.select().from(collections).where(eq(collections.id, id));
    if (!rows.length) return null;
    const r = rows[0];
    return {
      ...r,
      description: r.description || '',
      image: r.image || '',
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching collection ${id}:`, error);
    return null;
  }
}

export const getCategoryById = getCollectionById;

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const rows = await db.select().from(collections).where(eq(collections.slug, slug));
    if (!rows.length) return null;
    const r = rows[0];
    return {
      ...r,
      description: r.description || '',
      image: r.image || '',
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching collection by slug ${slug}:`, error);
    return null;
  }
}

export const getCategoryBySlug = getCollectionBySlug;

export async function createCollection(
  data: Omit<Collection, 'id' | 'createdAt'>
): Promise<Collection> {
  const [result] = await db.insert(collections).values({
    name: data.name,
    slug: data.slug,
    description: data.description,
    image: data.image,
    status: data.status,
  });

  const insertedId = (result as any).insertId || Date.now();
  return {
    id: Number(insertedId),
    ...data,
    createdAt: new Date().toISOString(),
  };
}

export const createCategory = createCollection;

export async function updateCollection(
  id: number,
  data: Partial<Omit<Collection, 'id' | 'createdAt'>>
): Promise<Collection | null> {
  await db
    .update(collections)
    .set({
      ...(data.name ? { name: data.name } : {}),
      ...(data.slug ? { slug: data.slug } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.image !== undefined ? { image: data.image } : {}),
      ...(data.status ? { status: data.status } : {}),
    })
    .where(eq(collections.id, id));

  return getCollectionById(id);
}

export const updateCategory = updateCollection;

export async function deleteCollection(id: number): Promise<boolean> {
  try {
    await db.delete(collections).where(eq(collections.id, id));
    return true;
  } catch (error) {
    console.error(`Error deleting collection ${id}:`, error);
    return false;
  }
}

export const deleteCategory = deleteCollection;
