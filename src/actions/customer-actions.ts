'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './guards';
import { getCustomers, getCustomerById, updateCustomer, Customer } from '@/services/customersService';

export async function getCustomersAction() {
  await requireAdmin();
  return getCustomers();
}

export async function getCustomerByIdAction(id: number) {
  await requireAdmin();
  return getCustomerById(id);
}

export async function updateCustomerStatusAction(
  id: number,
  status: Customer['status']
) {
  await requireAdmin();
  await updateCustomer(id, { status });
  revalidatePath('/admin/customers');
  revalidatePath('/admin');
  return { success: true };
}
