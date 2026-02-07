const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.URI;

// ১. ক্লায়েন্ট এবং কানেকশন ক্যাশ করার জন্য গ্লোবাল ভেরিয়েবল
let client;
let clientPromise;
if (!process.env.URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // ডেভেলপমেন্ট মোডে গ্লোবাল ভেরিয়েবল ব্যবহার করা হয়
  // যাতে হট-রিলোড হলেও কানেকশন নষ্ট না হয়।
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
} else {
  // প্রোডাকশনে সরাসরি কানেক্ট হবে
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export const getCollection = async (collectionName) => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return db.collection(collectionName);
};
