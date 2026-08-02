'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './guards';
import {
  getProducts,
  getProductById,
  getProductsByCollection,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/services/productsService';

export async function getProductsAction() {
  await requireAdmin();
  return getProducts();
}

export async function getProductByIdAction(id: number) {
  await requireAdmin();
  return getProductById(id);
}

export async function getProductsByCategoryAction(categorySlug: string) {
  await requireAdmin();
  return getProductsByCollection(categorySlug);
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const title = formData.get('title') as string;
  const sku = formData.get('sku') as string;
  const collectionIdStr = (formData.get('categoryId') || formData.get('collectionId')) as string;
  const collectionId = parseInt(collectionIdStr, 10);
  const status = (formData.get('status') as any) || 'Active';
  const description = (formData.get('description') as string) || '';
  const image = (formData.get('image') as string) || '/hero1.png';

  if (!title || !sku || isNaN(collectionId)) {
    return { error: 'Title, SKU, and Collection are required.' };
  }

  await createProduct({
    title,
    sku,
    collectionId,
    status,
    description,
    image,
  });

  revalidatePath('/admin/products');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateProductAction(id: number, formData: FormData) {
  await requireAdmin();

  const title = formData.get('title') as string;
  const sku = formData.get('sku') as string;
  const collectionIdStr = (formData.get('categoryId') || formData.get('collectionId')) as string;
  const collectionId = collectionIdStr ? parseInt(collectionIdStr, 10) : undefined;
  const status = (formData.get('status') as any) || 'Active';
  const description = (formData.get('description') as string) || '';
  const image = (formData.get('image') as string) || '/hero1.png';

  await updateProduct(id, {
    ...(title ? { title } : {}),
    ...(sku ? { sku } : {}),
    ...(collectionId ? { collectionId, categoryId: collectionId } : {}),
    ...(status ? { status } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(image ? { image } : {}),
  });

  revalidatePath('/admin/products');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteProductAction(id: number) {
  await requireAdmin();
  await deleteProduct(id);
  revalidatePath('/admin/products');
  revalidatePath('/admin');
  return { success: true };
}
