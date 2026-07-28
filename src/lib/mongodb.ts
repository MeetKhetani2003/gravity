import { MongoClient, Db, GridFSBucket } from "mongodb";
import { ProductSpec } from "./site-data";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("MONGODB_URI is not defined in environment variables.");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so connection is preserved across module reloads
  if (!global._mongoClientPromise && uri) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise || Promise.reject(new Error("Missing MONGODB_URI"));
} else {
  // In production mode
  if (uri) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  } else {
    clientPromise = Promise.reject(new Error("Missing MONGODB_URI"));
  }
}

export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

export async function getDatabase(dbName = "gravity_db"): Promise<Db> {
  const clientInstance = await getMongoClient();
  return clientInstance.db(dbName);
}

export async function getGridFSBucket(bucketName = "images"): Promise<GridFSBucket> {
  const db = await getDatabase();
  return new GridFSBucket(db, { bucketName });
}

export async function getProductsCollection() {
  const db = await getDatabase();
  return db.collection<ProductSpec>("products");
}
