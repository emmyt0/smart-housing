import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { apartment, location, budget } = await req.json();

    const client = await clientPromise;
    const db = client.db("testdb");

    const properties = await db.collection("properties").find({}).toArray();

    // 🎯 budget logic
    const getBudgetRange = (budget: string) => {
      switch (budget) {
        case "low":
          return [0, 10000];
        case "medium":
          return [10000, 15000];
        case "high":
          return [15000, 20000];
        case "premium":
          return [20000, 999999];
        default:
          return [0, 999999];
      }
    };

    const [min, max] = getBudgetRange(budget);

    // 🎯 scoring system
    const scored = properties.map((p: any) => {
      let score = 0;

      if (p.propertyType.toLowerCase().includes(apartment)) score += 3;
      if (p.location.addressText.toLowerCase().includes(location)) score += 3;
      if (p.pricing.amount >= min && p.pricing.amount <= max) score += 4;

      return { ...p, score };
    });

    // sort best first
    const sorted = scored.sort((a, b) => b.score - a.score);

    return NextResponse.json(sorted.slice(0, 10));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Match failed" }, { status: 500 });
  }
}