import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    // Make sure this DB name matches your POST route
    const db = client.db("testdb");

    const properties = await db
      .collection("properties")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    console.log("✅ Fetched properties:", properties.length);

    return NextResponse.json(properties);
  } catch (error: any) {
    console.error("❌ GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}