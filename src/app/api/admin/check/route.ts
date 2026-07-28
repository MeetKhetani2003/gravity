import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("gravity_admin_session");

  if (sessionToken?.value === "authenticated") {
    return NextResponse.json({
      authenticated: true,
      username: process.env.ADMIN_USERNAME || "admin",
    });
  }

  return NextResponse.json({
    authenticated: false,
  });
}
