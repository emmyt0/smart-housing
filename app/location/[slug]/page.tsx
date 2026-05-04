"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyCard from "@/app/components/PropertyCard";
import Navbar from "@/app/components/Navbar";
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

export default function LocationPage() {
  const { slug } = useParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Format slug nicely
  const locationName =
    typeof slug === "string"
      ? slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
      : "";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`/api/property/location/${slug}`);
        const data = await res.json();

        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProperties();
  }, [slug]);

  // 🔄 LOADING STATE (modern)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 text-sm">Finding apartments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">


        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Apartments in {locationName}
          </h1>

          <p className="text-gray-500 mt-2">
            {properties.length} available listings
          </p>
        </div>

        {/* GRID WITH YOUR CARD */}
        {properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🏡</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              No apartments found
            </h2>
            <p className="text-gray-500 text-sm">
              Try another location or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}