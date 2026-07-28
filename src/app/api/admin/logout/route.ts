import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear session cookie
  response.cookies.set("gravity_admin_session", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
