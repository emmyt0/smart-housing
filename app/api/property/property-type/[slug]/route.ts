import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: Props
) {
  try {
    const { slug } = await params;

    console.log("SLUG:", slug);

    const client = await clientPromise;

    const db = client.db("testdb");

    const properties =
      db.collection("properties");

    let propertyType = "";

    // ✅ MATCH DATABASE VALUES
    switch (slug) {
      case "studio":
        propertyType =
          "Studio (1+0)";
        break;

      case "1-plus-1":
        propertyType =
          "1+1 Apartment";
        break;

      case "2-plus-1":
        propertyType =
          "2+1 Apartment";
        break;

      case "3-plus-1":
        propertyType =
          "3+1 Apartment";
        break;

      case "house":
        propertyType = "House";
        break;

      case "single-room":
        propertyType =
          "Single Room";
        break;

      default:
        return NextResponse.json(
          {
            error:
              "Invalid property type",
          },
          { status: 400 }
        );
    }

    console.log(
      "PROPERTY TYPE:",
      propertyType
    );

    // ✅ FIND PROPERTIES
    const results =
      await properties
        .find({
          propertyType:
            propertyType,
        })
        .toArray();

    console.log(
      "RESULTS:",
      results.length
    );

    return NextResponse.json(
      {
        success: true,
        properties: results,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error:
          "Failed to fetch properties",
      },
      { status: 500 }
    );
  }
}