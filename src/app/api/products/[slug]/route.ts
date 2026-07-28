import { NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/mongodb";
import { ProductSpec } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const resolvedParams = await params;
    const collection = await getProductsCollection();
    const prod = await collection.findOne({ slug: resolvedParams.slug });

    if (!prod) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const { _id, ...cleaned } = prod;
    return NextResponse.json({ success: true, product: cleaned });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const collection = await getProductsCollection();

    await collection.updateOne(
      { slug: resolvedParams.slug },
      { $set: body },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Product updated in MongoDB" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const resolvedParams = await params;
    const collection = await getProductsCollection();
    await collection.deleteOne({ slug: resolvedParams.slug });

    return NextResponse.json({ success: true, message: "Product deleted from MongoDB" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 });
  }
}
