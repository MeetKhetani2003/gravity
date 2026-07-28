import { NextResponse } from "next/server";
import { getGridFSBucket } from "@/lib/mongodb";
import { Readable } from "stream";

type Props = {
  params: Promise<{ filename: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const resolvedParams = await params;
    const filename = resolvedParams.filename;

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    const bucket = await getGridFSBucket("images");
    const files = await bucket.find({ filename }).toArray();

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStreamByName(filename);

    // Convert GridFS stream to Buffer or ReadableStream
    const chunks: Uint8Array[] = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Determine content type
    let contentType = "image/jpeg";
    if (filename.endsWith(".png")) contentType = "image/png";
    else if (filename.endsWith(".webp")) contentType = "image/webp";
    else if (filename.endsWith(".svg")) contentType = "image/svg+xml";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("GridFS Image fetch error:", error);
    return NextResponse.json({ error: "Server error fetching image" }, { status: 500 });
  }
}
