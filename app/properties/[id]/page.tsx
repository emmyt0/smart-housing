"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MapPin } from "lucide-react";

type Property = {
  _id: string;
  title: string;
  propertyType: string;
  description: string;
  pricing: {
    amount: number;
    currency: string;
    period: string;
  };
  location: {
    addressText: string;
    distanceFromEUL: number;
  };
  features: string[];
  images: {
    primary: string;
    gallery: string[];
  };
};

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(`/api/property/${id}`);
      const data = await res.json();

      setProperty(data);
      setMainImage(data.images.primary);
    };

    if (id) fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="p-10">Loading property...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">
        {property.propertyType}
      </h1>

      <div className="flex items-center text-gray-600 mb-6">
        <MapPin className="w-4 h-4 mr-2" />
        {property.location.addressText}
      </div>

      {/* IMAGE GALLERY */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">

        <div className="lg:col-span-3 relative h-96 rounded-xl overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[property.images.primary, ...property.images.gallery].map(
            (img, index) => (
              <button
                key={index}
                className="relative h-24 rounded-lg overflow-hidden"
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt="gallery"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </button>
            )
          )}
        </div>
      </div>

      {/* PRICE */}
      <div className="text-2xl font-bold mb-4">
        {property.pricing.currency}{" "}
        {property.pricing.amount.toLocaleString()}
        <span className="text-sm ml-2 text-blue-600">
          /{property.pricing.period.toLowerCase()}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-700 mb-6">
        {property.description}
      </p>

      {/* FEATURES */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {property.features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}