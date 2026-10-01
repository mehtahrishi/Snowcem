import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface SessionData {
  isLoggedIn: boolean;
  username: string;
  loginTime?: number;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  username: "",
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "PLACEHOLDER_PLEASE_SET_SESSION_SECRET_IN_ENV_32CHARS",
  cookieName: "snowcem_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
};

/**
 * Retrieves the current iron-session from Next.js server components or route handlers.
 */
export async function getSession() {
  const cookieStore = cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
  }
  return session;
}

/**
 * Session getter for Edge/NextResponse middleware or custom response handlers
 */
export async function getSessionFromReqRes(req: NextRequest, res: NextResponse) {
  return getIronSession<SessionData>(req, res, sessionOptions);
}
