import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
  try {
    const {
      title,
      propertyType,
      pricing,
      location,
      description,
      features,
      images,
    } = await req.json();

    // 🔎 Basic Validation
    if (
      !title ||
      !propertyType ||
      !pricing?.amount ||
      !pricing?.currency ||
      !location?.addressText ||
      location?.distanceFromEUL === undefined ||
      !description ||
      !images?.primary
    ) {
      return NextResponse.json(
        { error: "Missing required property fields" },
        { status: 400 }
      );
    }

    // Optional safety validation
    if (images.gallery && images.gallery.length > 7) {
      return NextResponse.json(
        { error: "Maximum 7 gallery images allowed" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("testdb");
    const propertiesCollection = db.collection("properties");

    const newProperty = {
      title,
      propertyType,

      pricing: {
        amount: Number(pricing.amount),
        currency: pricing.currency,
        period: "YEAR",
      },

      location: {
        addressText: location.addressText,
        distanceFromEUL: Number(location.distanceFromEUL),
      },

      description,
      features: features || [],

      images: {
        primary: images.primary,
        gallery: images.gallery || [],
      },

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await propertiesCollection.insertOne(newProperty);

    return NextResponse.json(
      {
        message: "✅ Property added successfully",
        propertyId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Add property error:", err);
    return NextResponse.json(
      { error: "Something went wrong while creating property" },
      { status: 500 }
    );
  }
}
