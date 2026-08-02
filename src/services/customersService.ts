import { db } from '@/db';
import { customers } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  status: 'Active' | 'Inactive';
  joinedAt: string;
}

export async function getCustomers(): Promise<Customer[]> {
  try {
    const rows = await db.select().from(customers);
    return rows.map((r) => ({
      ...r,
      phone: r.phone || '',
      city: r.city || '',
      joinedAt: r.joinedAt ? new Date(r.joinedAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching customers from database:', error);
    return [];
  }
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  try {
    const rows = await db.select().from(customers).where(eq(customers.id, id));
    if (!rows.length) return null;
    const r = rows[0];
    return {
      ...r,
      phone: r.phone || '',
      city: r.city || '',
      joinedAt: r.joinedAt ? new Date(r.joinedAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    return null;
  }
}

export async function updateCustomer(
  id: number,
  data: Partial<Omit<Customer, 'id' | 'joinedAt'>>
): Promise<Customer | null> {
  await db
    .update(customers)
    .set({
      ...(data.name ? { name: data.name } : {}),
      ...(data.email ? { email: data.email } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.city !== undefined ? { city: data.city } : {}),
      ...(data.totalOrders !== undefined ? { totalOrders: data.totalOrders } : {}),
      ...(data.totalSpent !== undefined ? { totalSpent: data.totalSpent } : {}),
      ...(data.status ? { status: data.status } : {}),
    })
    .where(eq(customers.id, id));

  return getCustomerById(id);
}
