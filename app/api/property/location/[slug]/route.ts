import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Location slug is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("testdb");
    const properties = db.collection("properties");

    // convert slug → normal text
    const locationName = slug.replace(/-/g, " ").toLowerCase();

    // 🔍 find matching properties
    const results = await properties
      .find({
        "location.addressText": {
          $regex: locationName,
          $options: "i", // case insensitive
        },
      })
      .toArray();

    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error("❌ Fetch by location error:", err);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}