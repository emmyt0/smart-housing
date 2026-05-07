import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { budget } = body;

    const client = await clientPromise;
    const db = client.db("testdb");

    const query: any = {};

    /* ================= PRICE MATCHING ================= */

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

    /* ================= FETCH ================= */

    const properties = await db
      .collection("properties")
      .find(query)
      .limit(20)
      .toArray();

    /* ================= FORMAT ================= */

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
        error: "Failed to match properties",
      },
      {
        status: 500,
      }
    );
  }
}