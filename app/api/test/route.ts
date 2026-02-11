import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("testdb"); // change "testdb" to your db name

    console.log("✅ Successfully connected to MongoDB!");

    const collections = await db.listCollections().toArray();

    return new Response(
      JSON.stringify({ message: "Connected!", collections }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e);
    return new Response(JSON.stringify({ error: "Database connection failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
