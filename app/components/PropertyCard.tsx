"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Heart,
  Wifi,
  Car,
  Shield,
  Droplets,
  Zap,
  Home,
} from "lucide-react";

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

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const getFeatureIcon = (feature: string) => {
    const lower = feature.toLowerCase();

    if (lower.includes("wifi")) return <Wifi className="w-3.5 h-3.5" />;
    if (lower.includes("water") || lower.includes("bill"))
      return <Droplets className="w-3.5 h-3.5" />;
    if (lower.includes("electric")) return <Zap className="w-3.5 h-3.5" />;
    if (lower.includes("security")) return <Shield className="w-3.5 h-3.5" />;
    if (lower.includes("parking")) return <Car className="w-3.5 h-3.5" />;
    if (lower.includes("furnish")) return <Home className="w-3.5 h-3.5" />;

    return null;
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">

      {/* IMAGE SECTION */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.images?.primary || "/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="bg-white/90 backdrop-blur-sm text-blue-700 font-semibold px-3 py-1.5 rounded-lg text-xs shadow-sm">
            {property.propertyType}
          </span>

          <button
            type="button"
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm"
          >
            <Heart className="w-4 h-4 text-gray-700 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* PRICE BADGE */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
            <span className="font-bold text-gray-900 text-lg">
              {property.pricing.currency}{" "}
              {property.pricing.amount.toLocaleString()}
            </span>
            <span className="text-xs text-gray-600 ml-1">
              /{property.pricing.period.toLowerCase()}
            </span>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="p-4">

        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px]">
          {property.description}
        </h3>

        {/* LOCATION */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h4 className="text-xs text-gray-600 mb-0.5">
              {property.location.distanceFromEUL} km from EUL
            </h4>
            <p className="text-sm text-gray-900 font-medium truncate">
              {property.location.addressText}
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {property.features?.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="text-blue-500">
                {getFeatureIcon(feature)}
              </div>
              <span className="text-xs text-gray-700 truncate">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* DETAILS BUTTON (Dynamic Routing) */}
        <Link href={`/properties/${property._id}`}>
          <button className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-black transition-colors duration-200 text-sm">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}