import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("testdb"); // 🔥 change if needed

    const properties = await db
      .collection("properties")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // 🔥 Convert ObjectId to string
    const formattedProperties = properties.map((property) => ({
      ...property,
      _id: property._id.toString(),
    }));

    return NextResponse.json(formattedProperties, { status: 200 });
  } catch (error: any) {
    console.error("❌ GET-PROPERTIES ERROR:", error.message);

    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}