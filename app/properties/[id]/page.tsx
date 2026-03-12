"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Home,
  Wifi,
  Droplets,
  Zap,
  Flame,
  CheckCircle,
  Heart,
  Share2,
  DollarSign,
  Check,
  X
} from "lucide-react";

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
  const [saved, setSaved] = useState(false);

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Parse features to check if utilities are included
  const isIncluded = (feature: string) => {
    return property.features.some(f => 
      f.toLowerCase().includes(feature.toLowerCase()) && 
      !f.toLowerCase().includes("not included") && 
      !f.toLowerCase().includes("not covered")
    );
  };

  const isNotIncluded = (feature: string) => {
    return property.features.some(f => 
      f.toLowerCase().includes(feature.toLowerCase()) && 
      (f.toLowerCase().includes("not included") || f.toLowerCase().includes("not covered"))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button & Actions */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to listings</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-lg transition-all ${
                saved ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              {/* Main Image */}
              <div className="relative h-96 rounded-xl overflow-hidden mb-4">
                <Image
                  src={mainImage}
                  alt={property.title || property.propertyType}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {property.propertyType}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={() => setMainImage(property.images.primary)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === property.images.primary ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={property.images.primary}
                    alt="primary"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
                {property.images.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`gallery-${index}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Title & Location */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {property.title || property.propertyType}
                </h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{property.location.addressText}</span>
                  {property.location.distanceFromEUL && (
                    <span className="ml-2 text-sm text-blue-600">
                      • {property.location.distanceFromEUL} min walk to EUL
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {property.pricing.currency} {property.pricing.amount.toLocaleString()}
                  </span>
                  <span className="text-gray-600">/{property.pricing.period}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Utilities Status */}
              <div className="mb-6">
                <h2 className="font-semibold text-gray-900 mb-3">Utilities</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      <span className="text-sm">WiFi</span>
                    </div>
                    {isIncluded("wifi") ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : isNotIncluded("wifi") ? (
                      <X className="w-4 h-4 text-red-500" />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">Water</span>
                    </div>
                    {isIncluded("water") ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : isNotIncluded("water") ? (
                      <X className="w-4 h-4 text-red-500" />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Electricity</span>
                    </div>
                    {isIncluded("electricity") ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : isNotIncluded("electricity") ? (
                      <X className="w-4 h-4 text-red-500" />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm">Gas</span>
                    </div>
                    {isIncluded("gas") ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : isNotIncluded("gas") ? (
                      <X className="w-4 h-4 text-red-500" />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* All Features */}
              <div>
                <h2 className="font-semibold text-gray-900 mb-3">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Home className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Property Type</p>
                      <p className="font-medium">{property.propertyType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Monthly Rent</p>
                      <p className="font-medium">{property.pricing.currency} {property.pricing.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Distance to EUL</p>
                      <p className="font-medium">{property.location.distanceFromEUL || 'N/A'} min walk</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium mb-1">Key features</p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {property.features.slice(0, 3).join(' • ')}
                      {property.features.length > 3 && ' ...'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Interested in this property?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact the landlord to schedule a viewing or ask questions.
                </p>
                <button className="w-full bg-black text-white py-3 rounded-lg  transition-colors font-medium">
                  <a href="https://wa.me/12345678?text=Hello%2C%20I'm%20interested%20in%20your%20property"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center"
                  >
                    Contact landlord
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}