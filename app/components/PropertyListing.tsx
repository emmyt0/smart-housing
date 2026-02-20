"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Star,
  Home,
} from "lucide-react";
import Image from "next/image";

type DBProperty = {
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
  };
  images: {
    primary: string;
  };
  createdAt?: string;
};

export default function PropertyListing() {
  const [properties, setProperties] = useState<DBProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch properties
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/property-list");
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId: string) => {
    setDeletingId(propertyId);

    try {
      await fetch("/api/properties", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: propertyId }),
      });

      // Remove from UI instantly
      setProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="p-6">Loading properties...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Property Listings
        </h1>
        <p className="text-gray-600">
          Manage your listed properties
        </p>
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <Home className="w-8 h-8 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">
            No Properties Listed
          </h3>
        </div>
      )}

      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border border-gray-200 rounded-lg hover:shadow-sm transition"
          >
            <div className="p-4 flex justify-between items-start gap-4">
              
              {/* LEFT SIDE */}
              <div className="flex gap-4 flex-1">

                {/* IMAGE */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  {property.images?.primary ? (
                    <Image
                      src={property.images.primary}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full" />
                  )}
                </div>

                {/* INFO */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {property.propertyType}
                    </span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.location?.addressText}
                    </div>
                  </div>

                  <div className="mt-2 text-xl font-bold text-gray-900">
                    {property.pricing.currency}
                    {property.pricing.amount.toLocaleString()}
                    <span className="text-sm text-blue-700 ml-2">
                      /year
                    </span>
                  </div>
                </div>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(property._id)}
                disabled={deletingId === property._id}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
              >
                {deletingId === property._id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {properties.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {properties.length}
          </span>{" "}
          properties
        </div>
      )}
    </div>
  );
}