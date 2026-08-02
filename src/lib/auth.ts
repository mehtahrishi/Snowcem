import { SessionOptions } from 'iron-session';

export interface SessionData {
  isAdmin?: boolean;
  email?: string;
  loggedInAt?: string;
}

export const defaultSession: SessionData = {
  isAdmin: false,
  email: '',
  loggedInAt: '',
};

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    'snowcem_super_secret_session_key_32chars_min!',
  cookieName: 'snowcem_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
};
