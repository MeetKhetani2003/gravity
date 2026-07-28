import { NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/mongodb";
import { ProductSpec } from "@/lib/site-data";

export async function GET() {
  try {
    const collection = await getProductsCollection();
    let dbProducts = await collection.find({}).toArray();

    // If MongoDB collection is empty, trigger initial seed
    if (!dbProducts || dbProducts.length === 0) {
      const seedRes = await fetch("http://localhost:3000/api/products/seed", {
        method: "POST",
      }).catch(() => null);

      if (seedRes && seedRes.ok) {
        dbProducts = await collection.find({}).toArray();
      }
    }

    // Clean MongoDB _id field for client cleanliness
    const cleaned = dbProducts.map(({ _id, ...rest }) => rest as ProductSpec);

    return NextResponse.json({
      success: true,
      count: cleaned.length,
      products: cleaned,
    });
  } catch (error) {
    console.error("Failed to fetch products from MongoDB:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching products from database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "reset") {
      const seedRes = await fetch("http://localhost:3000/api/products/seed", {
        method: "POST",
      });
      const data = await seedRes.json();
      return NextResponse.json(data);
    }

    if (body.product) {
      const collection = await getProductsCollection();
      const prod = body.product as ProductSpec;

      await collection.updateOne(
        { slug: prod.slug },
        { $set: prod },
        { upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: `Product "${prod.name}" saved to MongoDB`,
        product: prod,
      });
    }

    if (body.products && Array.isArray(body.products)) {
      const collection = await getProductsCollection();
      await collection.deleteMany({});
      await collection.insertMany(body.products);

      return NextResponse.json({
        success: true,
        message: `Imported ${body.products.length} products into MongoDB`,
        count: body.products.length,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid payload" },
      { status: 400 }
    );
  } catch (error) {
    console.error("MongoDB write error:", error);
    return NextResponse.json(
      { success: false, message: "Error writing to database" },
      { status: 500 }
    );
  }
}
