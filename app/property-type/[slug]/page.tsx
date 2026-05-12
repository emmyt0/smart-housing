"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import PropertyCard from "@/app/components/PropertyCard";

type Property = {
  _id: string;
  title: string;
  propertyType: string;

  pricing: {
    amount: number;
    currency: string;
    period: string;
  };

  location: {
    addressText: string;
    distanceFromEUL: number;
  };

  description: string;

  features: string[];

  images: {
    primary: string;
    gallery?: string[];
  };
};

export default function PropertyTypePage() {
  const params = useParams();

  // ✅ SAFE SLUG HANDLING
  const slug =
    typeof params?.slug === "string" ? params.slug : "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const propertyTypeName =
    slug
      ? slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
      : "";

  useEffect(() => {
    if (!slug) return; // ❗ stop undefined calls

    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties/property-type/${slug}`
        );

        const data = await res.json();

        console.log("API RESPONSE:", data);

        // ✅ IMPORTANT FIX
        setProperties(data.properties || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [slug]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 text-sm">
          Finding apartments...
        </p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {propertyTypeName} Apartments
          </h1>

          <p className="text-gray-500 mt-2">
            {properties.length} available listings
          </p>
        </div>

        {/* GRID */}
        {properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🏡</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              No apartments found
            </h2>
            <p className="text-gray-500 text-sm">
              Try another property type.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}