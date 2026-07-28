import { MongoClient, GridFSBucket } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local for MONGODB_URI
const envPath = path.join(__dirname, "../.env.local");
let uri = "";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const match = envContent.match(/MONGODB_URI=(.+)/);
  if (match) {
    uri = match[1].trim();
  }
}

if (!uri) {
  console.error("No MONGODB_URI found in .env.local");
  process.exit(1);
}

// Read site-data.ts products via parsing or dynamically
const siteDataPath = path.join(__dirname, "../src/lib/site-data.ts");
const siteDataContent = fs.readFileSync(siteDataPath, "utf-8");

console.log("Connecting to MongoDB Atlas...");
const client = new MongoClient(uri);

async function runSeed() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const db = client.db("gravity_db");
    const collection = db.collection("products");
    const bucket = new GridFSBucket(db, { bucketName: "images" });

    // Extract default products from site-data.ts by dynamic import or parsing
    // Trigger the internal API seed endpoint or local logic
    const publicDir = path.join(__dirname, "../public");
    const productsDir = path.join(publicDir, "images/products");

    let uploadedCount = 0;

    if (fs.existsSync(productsDir)) {
      const files = fs.readdirSync(productsDir);
      for (const file of files) {
        const filePath = path.join(productsDir, file);
        if (fs.statSync(filePath).isFile()) {
          const fileBuffer = fs.readFileSync(filePath);
          const ext = path.extname(file).toLowerCase();
          let contentType = "image/jpeg";
          if (ext === ".png") contentType = "image/png";
          else if (ext === ".webp") contentType = "image/webp";

          const existing = await bucket.find({ filename: file }).toArray();
          if (existing.length === 0) {
            const uploadStream = bucket.openUploadStream(file, { contentType });
            await new Promise((res, rej) => {
              Readable.from(fileBuffer)
                .pipe(uploadStream)
                .on("finish", res)
                .on("error", rej);
            });
            uploadedCount++;
            console.log(`Uploaded image to GridFS: ${file}`);
          }
        }
      }
    }

    console.log(`GridFS upload finished. Uploaded ${uploadedCount} images.`);

    // Trigger API seeder to populate all products in MongoDB
    console.log("Seeding product documents...");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await client.close();
  }
}

runSeed();
