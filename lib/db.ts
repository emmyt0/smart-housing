import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const uri: string = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend NodeJS.Global type to include _mongoClientPromise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

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
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export default clientPromise;