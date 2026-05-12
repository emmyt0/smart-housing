// app/api/properties/property-type/[slug]/route.ts
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
        { error: "Property type slug is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("testdb");
    const properties = db.collection("properties");

    // Convert slug to the exact enum values from your schema
    let propertyType = "";
    
    switch (slug.toLowerCase()) {
      case "studio":
        propertyType = "Studio (1+0)";
        break;
      case "1+1":
      case "1plus1":
      case "1-1":
        propertyType = "1+1 Apartment";
        break;
      case "2+1":
      case "2plus1":
      case "2-1":
        propertyType = "2+1 Apartment";
        break;
      case "3+1":
      case "3plus1":
      case "3-1":
        propertyType = "3+1 Apartment";
        break;
      case "house":
        propertyType = "House";
        break;
      case "single-room":
      case "singleroom":
      case "room":
        propertyType = "Single Room";
        break;
      default:
        // If slug doesn't match any known type, try to match directly
        propertyType = slug.replace(/-/g, " ");
    }

    // Find matching properties by property type
    const results = await properties
      .find({
        propertyType: {
          $regex: `^${propertyType}$`,
          $options: "i", // case insensitive
        },
      })
      .toArray();

    if (results.length === 0) {
      return NextResponse.json(
        { message: "No properties found for this property type", properties: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({ 
      propertyType: propertyType,
      count: results.length,
      properties: results 
    }, { status: 200 });
    
  } catch (err) {
    console.error("❌ Fetch by property type error:", err);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}