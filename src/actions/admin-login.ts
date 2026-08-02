'use server';

import { redirect } from 'next/navigation';
import { setAdminSession, destroyAdminSession } from '@/lib/session';

export async function loginAdminAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validEmail = process.env.ADMIN_EMAIL || 'admin@snowcem.com';
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123456';

  if (email === validEmail && password === validPassword) {
    await setAdminSession(email);
    redirect('/admin');
  }

  return { error: 'Invalid email or password credentials.' };
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect('/admin/login');
}
