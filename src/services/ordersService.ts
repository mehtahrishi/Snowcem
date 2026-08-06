import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Set to false to disable DB calls (e.g. when MySQL is not available on the host).
// Re-enable once a working DATABASE_URL is configured on the deployment platform.
const DB_ENABLED = !!(process.env.DATABASE_URL);

export interface OrderItem {
  productId?: number;
  title: string;
  categoryName?: string;
  collectionName?: string;
  qty: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  createdAt: string;
}

export async function getOrders(): Promise<Order[]> {
  if (!DB_ENABLED) return [];
  try {
    const orderRows = await db.select().from(orders);
    const itemRows = await db.select().from(orderItems);

    return orderRows.map((o) => {
      const itemsForOrder = itemRows
        .filter((item) => item.orderId === o.id)
        .map((i) => ({
          productId: i.productId ?? undefined,
          title: i.title,
          categoryName: i.collectionName || undefined,
          collectionName: i.collectionName || undefined,
          qty: i.qty,
          price: i.price,
        }));

      return {
        ...o,
        items: itemsForOrder,
        createdAt: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching orders from database:', error);
    return [];
  }
}

export async function getOrderById(id: number): Promise<Order | null> {
  if (!DB_ENABLED) return null;
  try {
    const orderRows = await db.select().from(orders).where(eq(orders.id, id));
    if (!orderRows.length) return null;
    const o = orderRows[0];
    const itemRows = await db.select().from(orderItems).where(eq(orderItems.orderId, id));

    const itemsForOrder = itemRows.map((i) => ({
      productId: i.productId ?? undefined,
      title: i.title,
      categoryName: i.collectionName || undefined,
      collectionName: i.collectionName || undefined,
      qty: i.qty,
      price: i.price,
    }));

    return {
      ...o,
      items: itemsForOrder,
      createdAt: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return null;
  }
}

export async function updateOrderStatus(
  id: number,
  status: Order['status'],
  paymentStatus?: Order['paymentStatus']
): Promise<Order | null> {
  if (!DB_ENABLED) return null;
  await db
    .update(orders)
    .set({
      status,
      ...(paymentStatus ? { paymentStatus } : {}),
    })
    .where(eq(orders.id, id));

  return getOrderById(id);
}

export async function deleteOrder(id: number): Promise<boolean> {
  if (!DB_ENABLED) return false;
  try {
    await db.delete(orders).where(eq(orders.id, id));
    return true;
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    return false;
  }
}
