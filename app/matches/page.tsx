"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

export default function MatchesPage() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("matches");

    if (stored) {
      setProperties(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50  ">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">

        <h1 className="text-3xl font-bold mb-2">
         Your Results
        </h1>

        <p className="text-gray-500 mb-8">
          Personalized apartment recommendations
        </p>

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
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
            <h2 className="text-xl font-semibold mb-2">
              No matches found
            </h2>

            <p className="text-gray-500">
              Try different filters in the chatbot.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}