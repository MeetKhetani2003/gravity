import { NextResponse } from "next/server";
import { getGridFSBucket } from "@/lib/mongodb";
import { Readable } from "stream";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = (formData.get("file") || formData.get("image")) as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase() || ".jpg";
    const cleanName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(ext, "");
    const filename = `${cleanName}_${Date.now()}${ext}`;

    const bucket = await getGridFSBucket("images");

    // Open upload stream to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { contentType: file.type || "image/jpeg" },
    });

    await new Promise<void>((resolve, reject) => {
      const readable = Readable.from(buffer);
      readable
        .pipe(uploadStream)
        .on("finish", () => resolve())
        .on("error", (err) => reject(err));
    });

    const imageUrl = `/api/images/${filename}`;

    return NextResponse.json({
      success: true,
      message: "Image uploaded to GridFS successfully",
      filename,
      url: imageUrl,
    });
  } catch (error) {
    console.error("GridFS Image upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload image to GridFS" },
      { status: 500 }
    );
  }
}
