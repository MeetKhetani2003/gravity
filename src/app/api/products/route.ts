import { NextResponse } from "next/server";
import { products as defaultProducts } from "@/lib/site-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: defaultProducts.length,
    products: defaultProducts,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.action === "reset") {
      return NextResponse.json({
        success: true,
        message: "Products reset to factory default",
        products: defaultProducts,
      });
    }

    if (body.products && Array.isArray(body.products)) {
      return NextResponse.json({
        success: true,
        message: `Successfully stored ${body.products.length} products`,
        count: body.products.length,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid payload provided" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error processing request" },
      { status: 500 }
    );
  }
}
