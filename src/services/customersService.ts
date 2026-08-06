import { db } from '@/db';
import { customers } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Set to false to disable DB calls (e.g. when MySQL is not available on the host).
const DB_ENABLED = !!(process.env.DATABASE_URL);

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
  if (!DB_ENABLED) return [];
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
  if (!DB_ENABLED) return null;
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
  if (!DB_ENABLED) return null;
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
