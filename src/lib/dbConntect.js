import { MongoClient, ServerApiVersion } from "mongodb";

// ১. আপনার .env ফাইল থেকে ভেরিয়েবলগুলো আনছি
const uri = process.env.URI;
const dbName = process.env.DB_NAME;

// ২. URI চেক করা (না থাকলে এরর দেবে)
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}



let client;
let clientPromise;

// ৩. ডেভেলপমেন্ট মোডে গ্লোবাল ভেরিয়েবল ব্যবহার করে কানেকশন ঠিক রাখা
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // প্রোডাকশন মোড
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

// ৪. এই ফাংশনটিই আপনি অন্য ফাইল থেকে কল করবেন
export const getCollection = async (collectionName) => {
  const client = await clientPromise;

  // ডিবাগিং: যদি ক্লায়েন্ট না পাওয়া যায়, তবে কনসোলে জানাবে
  if (!client) {
    throw new Error("Database connection failed: Client is undefined");
  }

  // DB কানেক্ট করে কালেকশন রিটার্ন করা
  const db = client.db(dbName);
  return db.collection(collectionName);
};
