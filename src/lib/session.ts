import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData, defaultSession } from './auth';

export async function getAdminSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

export async function setAdminSession(email: string) {
  const session = await getAdminSession();
  session.isAdmin = true;
  session.email = email;
  session.loggedInAt = new Date().toISOString();
  await session.save();
  return session;
}

export async function destroyAdminSession() {
  const session = await getAdminSession();
  session.destroy();
}
