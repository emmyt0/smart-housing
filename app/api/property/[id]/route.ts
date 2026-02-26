import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ unwrap params
    const { id } = await context.params;

    const client = await clientPromise;
    const db = client.db("testdb");

    const property = await db.collection("properties").findOne({
      _id: new ObjectId(id),
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error: any) {
    console.error("❌ GET SINGLE ERROR:", error.message);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}