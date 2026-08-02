'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './guards';
import { getOrders, getOrderById, updateOrderStatus, deleteOrder, Order } from '@/services/ordersService';

export async function getOrdersAction() {
  await requireAdmin();
  return getOrders();
}

export async function getOrderByIdAction(id: number) {
  await requireAdmin();
  return getOrderById(id);
}

export async function updateOrderStatusAction(
  id: number,
  status: Order['status'],
  paymentStatus?: Order['paymentStatus']
) {
  await requireAdmin();
  await updateOrderStatus(id, status, paymentStatus);
  revalidatePath('/admin/orders');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteOrderAction(id: number) {
  await requireAdmin();
  await deleteOrder(id);
  revalidatePath('/admin/orders');
  revalidatePath('/admin');
  return { success: true };
}
