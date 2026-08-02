import { getAdminSession } from '@/lib/session';

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    throw new Error('Unauthorized: Admin access required.');
  }
  return session;
}
