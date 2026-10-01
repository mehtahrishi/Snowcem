import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const expectedUser = process.env.ADMIN_USER;
    const expectedPass = process.env.ADMIN_PASSWORD;

    if (!expectedUser || !expectedPass) {
      return NextResponse.json(
        { error: "Server authentication error: Admin credentials are not configured in environment variables." },
        { status: 500 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    const session = await getSession();
    session.isLoggedIn = true;
    session.username = username;
    session.loginTime = Date.now();
    await session.save();

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: { username },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
