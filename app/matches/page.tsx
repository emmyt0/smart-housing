"use client";

import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
export default function MatchesPage() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("matches");
    if (data) {
      setProperties(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          🎯 Your Smart Matches
        </h1>
        <p className="text-gray-500 mb-8">
          Based on your preferences
        </p>

        {properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No matches found.
          </div>
        )}
      </div>
    </div>
  );
}