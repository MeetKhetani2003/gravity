import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

interface CategoryDoc {
  name: string;
  createdAt?: Date;
}

export async function getCategoriesCollection() {
  const db = await getDatabase();
  return db.collection<CategoryDoc>("categories");
}

export async function GET() {
  try {
    const collection = await getCategoriesCollection();
    const docs = await collection.find({}).toArray();
    const categories = docs.map((d) => d.name);

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Failed to fetch categories from MongoDB:", error);
    return NextResponse.json(
      { success: false, categories: [], message: "Error reading categories from DB" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, categories } = body;

    const collection = await getCategoriesCollection();

    if (categories && Array.isArray(categories)) {
      await collection.deleteMany({});
      if (categories.length > 0) {
        await collection.insertMany(
          categories.map((c: string) => ({ name: c, createdAt: new Date() }))
        );
      }
      return NextResponse.json({
        success: true,
        message: "Categories updated successfully",
      });
    }

    if (name && typeof name === "string") {
      const trimmed = name.trim();
      if (!trimmed) {
        return NextResponse.json(
          { success: false, message: "Category name cannot be empty" },
          { status: 400 }
        );
      }

      await collection.updateOne(
        { name: trimmed },
        { $set: { name: trimmed, updatedAt: new Date() } },
        { upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: `Category "${trimmed}" saved to database`,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid payload" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Failed to save category to MongoDB:", error);
    return NextResponse.json(
      { success: false, message: "Error saving category to database" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Category name required" },
        { status: 400 }
      );
    }

    const collection = await getCategoriesCollection();
    await collection.deleteOne({ name });

    return NextResponse.json({
      success: true,
      message: `Category "${name}" deleted from database`,
    });
  } catch (error) {
    console.error("Failed to delete category from MongoDB:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting category from database" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { oldName, newName } = body;

    if (!oldName || !newName) {
      return NextResponse.json(
        { success: false, message: "Both oldName and newName are required" },
        { status: 400 }
      );
    }

    const collection = await getCategoriesCollection();
    await collection.updateOne(
      { name: oldName },
      { $set: { name: newName, updatedAt: new Date() } }
    );

    // Also update products collection if needed
    const db = await getDatabase();
    const productsColl = db.collection("products");
    await productsColl.updateMany(
      { category: oldName },
      { $set: { category: newName } }
    );

    return NextResponse.json({
      success: true,
      message: `Renamed category "${oldName}" to "${newName}"`,
    });
  } catch (error) {
    console.error("Failed to rename category in MongoDB:", error);
    return NextResponse.json(
      { success: false, message: "Error renaming category in database" },
      { status: 500 }
    );
  }
}
