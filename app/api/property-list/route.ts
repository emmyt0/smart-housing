import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    // 🔥 MAKE SURE DB NAME MATCHES POST
    const db = client.db("testdb");

    const properties = await db
      .collection("properties")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    console.log("✅ Fetched properties:", properties.length);

    return NextResponse.json(properties);
  } catch (error: any) {
    console.error("❌ GET ERROR:", error.message);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db("testdb");

    const result = await db.collection("properties").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      message: "Deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error("❌ DELETE ERROR:", error.message);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}