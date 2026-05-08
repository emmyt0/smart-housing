import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      budget,
      apartmentType,
      location,
    } = body;

    const client = await clientPromise;
    const db = client.db("testdb");

    const query: any = {};

    /* ================= PRICE ================= */

    if (budget === "low") {
      query["pricing.amount"] = {
        $gte: 1000,
        $lte: 3000,
      };
    }

    if (budget === "medium") {
      query["pricing.amount"] = {
        $gte: 3000,
        $lte: 6000,
      };
    }

    if (budget === "high") {
      query["pricing.amount"] = {
        $gte: 6000,
        $lte: 10000,
      };
    }

    /* ================= PROPERTY TYPE ================= */

    if (apartmentType) {
      const typeMap: Record<string, string> = {
        studio: "Studio (1+0)",
        "1+1": "1+1 Apartment",
        "2+1": "2+1 Apartment",
        "3+1": "3+1 Apartment",
        "single-room": "Single Room",
      };

      query.propertyType = typeMap[apartmentType];
    }

    /* ================= LOCATION ================= */

    if (location) {
      const locationMap: Record<string, string> = {
        yesilyurt: "Yeşilyurt",
        "lefke-merkezi": "Lefke Merkezi",
        doganci: "Doğancı",
        yedidalga: "Yedidalga",
        gemikonagi: "Gemikonagi",
      };

      query["location.addressText"] = {
        $regex: locationMap[location],
        $options: "i",
      };
    }

    /* ================= FETCH ================= */

    const properties = await db
      .collection("properties")
      .find(query)
      .limit(20)
      .toArray();

    const formatted = properties.map((property) => ({
      ...property,
      _id: property._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      properties: formatted,
    });

  } catch (error) {
    console.error("MATCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch matches",
      },
      {
        status: 500,
      }
    );
  }
}