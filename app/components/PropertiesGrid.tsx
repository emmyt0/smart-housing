"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

type Property = {
  _id: string;
  title: string;
  propertyType: string;
  pricing: {
    amount: number;
    currency: "EUR" | "USD";
    period: "YEAR";
  };
  location: {
    addressText: string;
    distanceFromEUL: number;
  };
  description: string;
  features: string[];
  images: {
    primary: string;
    gallery: string[];
  };
};

export default function PropertiesGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/get-properties");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProperties(data);
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Available Properties
          </h2>
          <p className="text-gray-600 text-sm">
            {properties.length} properties available
          </p>
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No properties found.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}
        </div>
      </div>
    </div>
  );
}