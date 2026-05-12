import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "secret";

export async function POST(req: Request) {
  try {
    const { email, password } =
      await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Email and password required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;

    const db = client.db("testdb");

    const users =
      db.collection("users");

    const user = await users.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    /* ================= JWT ================= */

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },

      JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    /* ================= RESPONSE ================= */

    const response =
      NextResponse.json(
        {
          message:
            "✅ Login successful",

          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        },
        { status: 200 }
      );

    /* ================= SAVE COOKIE ================= */

    response.cookies.set(
      "admin-token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "strict",

        path: "/",

        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (err) {
    console.error(
      "Login error:",
      err
    );

    return NextResponse.json(
      {
        error: "Login failed",
      },
      { status: 500 }
    );
  }
}