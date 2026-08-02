'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './guards';
import {
  getCollections,
  getCollectionById,
  getCollectionBySlug,
  createCollection,
  updateCollection,
  deleteCollection,
} from '@/services/collectionsService';

export async function getCollectionsAction() {
  await requireAdmin();
  return getCollections();
}

export const getCategoriesAction = getCollectionsAction;

export async function getCollectionByIdAction(id: number) {
  await requireAdmin();
  return getCollectionById(id);
}

export const getCategoryByIdAction = getCollectionByIdAction;

export async function getCollectionBySlugAction(slug: string) {
  await requireAdmin();
  return getCollectionBySlug(slug);
}

export const getCategoryBySlugAction = getCollectionBySlugAction;

export async function createCollectionAction(formData: FormData) {
  await requireAdmin();

  const name = formData.get('name') as string;
  const slug = (formData.get('slug') as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const description = (formData.get('description') as string) || '';
  const image = (formData.get('image') as string) || '/hero1.png';
  const status = (formData.get('status') as any) || 'Active';

  if (!name) {
    return { error: 'Collection name is required.' };
  }

  await createCollection({
    name,
    slug,
    description,
    image,
    status,
  });

  revalidatePath('/admin/collections');
  revalidatePath('/admin/products');
  revalidatePath('/admin');
  return { success: true };
}

export const createCategoryAction = createCollectionAction;

export async function updateCollectionAction(id: number, formData: FormData) {
  await requireAdmin();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;
  const status = formData.get('status') as any;

  await updateCollection(id, {
    ...(name ? { name } : {}),
    ...(slug ? { slug } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(image ? { image } : {}),
    ...(status ? { status } : {}),
  });

  revalidatePath('/admin/collections');
  revalidatePath('/admin/products');
  revalidatePath('/admin');
  return { success: true };
}

export const updateCategoryAction = updateCollectionAction;

export async function deleteCollectionAction(id: number) {
  await requireAdmin();
  await deleteCollection(id);
  revalidatePath('/admin/collections');
  revalidatePath('/admin/products');
  revalidatePath('/admin');
  return { success: true };
}

export const deleteCategoryAction = deleteCollectionAction;
