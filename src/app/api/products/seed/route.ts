import { NextResponse } from "next/server";
import { getProductsCollection, getGridFSBucket } from "@/lib/mongodb";
import { products as defaultProducts, ProductSpec } from "@/lib/site-data";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export async function POST() {
  try {
    const collection = await getProductsCollection();
    const bucket = await getGridFSBucket("images");

    let uploadedImagesCount = 0;
    const seededProducts: ProductSpec[] = [];

    for (const prod of defaultProducts) {
      let gridFsImageUrl = prod.image;

      // Check if image exists locally in public folder
      if (prod.image && prod.image.startsWith("/")) {
        const localPath = path.join(process.cwd(), "public", prod.image);

        if (fs.existsSync(localPath)) {
          const fileBuffer = fs.readFileSync(localPath);
          const baseName = path.basename(prod.image);
          const gridFsFilename = `${prod.slug}-${baseName}`;

          // Check if file already in GridFS
          const existingFiles = await bucket.find({ filename: gridFsFilename }).toArray();

          if (existingFiles.length === 0) {
            // Upload to GridFS
            const ext = path.extname(baseName).toLowerCase();
            let contentType = "image/jpeg";
            if (ext === ".png") contentType = "image/png";
            else if (ext === ".webp") contentType = "image/webp";

            const uploadStream = bucket.openUploadStream(gridFsFilename, {
              metadata: { contentType },
            });
            await new Promise<void>((resolve, reject) => {
              Readable.from(fileBuffer)
                .pipe(uploadStream)
                .on("finish", () => resolve())
                .on("error", (err) => reject(err));
            });
            uploadedImagesCount++;
          }

          gridFsImageUrl = `/api/images/${gridFsFilename}`;
        }
      }

      const updatedProd: ProductSpec = {
        ...prod,
        image: gridFsImageUrl,
      };

      // Upsert product document into MongoDB
      await collection.updateOne(
        { slug: prod.slug },
        { $set: updatedProd },
        { upsert: true }
      );

      seededProducts.push(updatedProd);
    }

    return NextResponse.json({
      success: true,
      message: "Successfully seeded products and images into MongoDB & GridFS!",
      seededProductsCount: seededProducts.length,
      uploadedImagesCount,
      products: seededProducts,
    });
  } catch (error) {
    console.error("MongoDB seed error:", error);
    return NextResponse.json(
      { success: false, message: "Error seeding MongoDB and GridFS database" },
      { status: 500 }
    );
  }
}
