import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "gravity123";

    if (username === expectedUser && password === expectedPass) {
      // Create session cookie
      const response = NextResponse.json({
        success: true,
        message: "Authenticated successfully",
        username: expectedUser,
      });

      // Set HTTP-only secure session cookie
      response.cookies.set("gravity_admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error during authentication" },
      { status: 500 }
    );
  }
}
