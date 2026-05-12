"use client";

import {
  useEffect,
  useState,
} from "react";

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

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse mt-2"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Image Skeleton */}
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PropertyTypePage() {
  const params = useParams();

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : "";

  const [properties, setProperties] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProperties =
      async () => {
        try {
          const res = await fetch(
            `/api/property/property-type/${slug}`
          );

          const data =
            await res.json();

          console.log(data);

          setProperties(
            data.properties || []
          );
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

    fetchProperties();
  }, [slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Property Listings
          </h1>

          <p className="text-gray-500 mt-2">
            {
              properties.length
            }{" "}
            available listings
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {properties.map(
              (property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                />
              )
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">
              No properties found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}